/* ==========================================================================
   Minimal .docx writer.

   A .docx is a ZIP of XML parts, so this needs no library: the ZIP entries are
   written with method 0 (stored), which Word accepts, and the only binary work
   is a CRC-32. Keeping it dependency-free matters here because the portal has
   to keep working for partner organisations long after this build, and a CDN
   that disappears would take the export with it.

   Word is the target rather than PDF because a code of conduct is a document an
   organisation formally adopts: they need to add their letterhead, run it past a
   board or an attorney, and re-save it. Page numbering also actually works here
   (PAGE / NUMPAGES fields), which browser print CSS cannot do.

   Input is the resolved block list from app.js — choices already collapsed to
   the option that was picked, optional clauses already included or dropped — so
   the Word file and the printed page cannot disagree about what the policy says.
   ========================================================================== */
window.MHG_DOCX = (function () {
  'use strict';

  /* ---------- zip ---------- */
  var CRC = (function () {
    var t = new Int32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  }());

  function crc32(bytes) {
    var c = -1;
    for (var i = 0; i < bytes.length; i++) c = (c >>> 8) ^ CRC[(c ^ bytes[i]) & 0xFF];
    return (c ^ -1) >>> 0;
  }

  function zip(files) {
    var enc = new TextEncoder();
    var parts = [], central = [], offset = 0;

    function u16(v) { return [v & 0xFF, (v >>> 8) & 0xFF]; }
    function u32(v) { return [v & 0xFF, (v >>> 8) & 0xFF, (v >>> 16) & 0xFF, (v >>> 24) & 0xFF]; }

    files.forEach(function (f) {
      var name = enc.encode(f.name);
      var data = enc.encode(f.data);
      var crc = crc32(data);
      var local = [].concat(
        u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0),
        u32(crc), u32(data.length), u32(data.length),
        u16(name.length), u16(0)
      );
      parts.push(new Uint8Array(local), name, data);

      central.push([].concat(
        u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0),
        u32(crc), u32(data.length), u32(data.length),
        u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset)
      ), f.name);

      offset += local.length + name.length + data.length;
    });

    var cdStart = offset, cdLen = 0;
    central.forEach(function (c, i) {
      if (i % 2 === 0) {
        var head = new Uint8Array(c);
        var nm = enc.encode(central[i + 1]);
        parts.push(head, nm);
        cdLen += head.length + nm.length;
      }
    });

    parts.push(new Uint8Array([].concat(
      u32(0x06054b50), u16(0), u16(0),
      u16(files.length), u16(files.length), u32(cdLen), u32(cdStart), u16(0)
    )));

    return new Blob(parts, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
  }

  /* ---------- xml ---------- */
  function x(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  /* The source prose carries <strong>/<em> only; turn it into Word runs. */
  function runs(html, base) {
    var out = '', re = /<(\/?)(strong|b|em|i)>/gi, last = 0, bold = 0, ital = 0, m;
    function push(text) {
      if (!text) return;
      var props = '';
      if (bold || (base && base.b)) props += '<w:b/>';
      if (ital || (base && base.i)) props += '<w:i/>';
      if (base && base.color) props += '<w:color w:val="' + base.color + '"/>';
      if (base && base.sz) props += '<w:sz w:val="' + base.sz + '"/>';
      out += '<w:r>' + (props ? '<w:rPr>' + props + '</w:rPr>' : '') +
             '<w:t xml:space="preserve">' + x(text) + '</w:t></w:r>';
    }
    while ((m = re.exec(html))) {
      push(decode(html.slice(last, m.index)));
      var open = !m[1], tag = m[2].toLowerCase();
      if (tag === 'strong' || tag === 'b') bold += open ? 1 : -1;
      else ital += open ? 1 : -1;
      last = m.index + m[0].length;
    }
    push(decode(html.slice(last)));
    return out;
  }

  function decode(s) {
    return String(s)
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–');
  }

  function p(style, content, extra) {
    return '<w:p><w:pPr><w:pStyle w:val="' + style + '"/>' + (extra || '') +
           '</w:pPr>' + content + '</w:p>';
  }

  /* ---------- package parts ---------- */
  var CT = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
    '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>' +
    '<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' +
    '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' +
    '</Types>';

  var RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '</Relationships>';

  var DOCRELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>' +
    '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>' +
    '<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>' +
    '</Relationships>';

  var W = ' xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';

  function style(id, name, opts) {
    return '<w:style w:type="paragraph" w:styleId="' + id + '">' +
      '<w:name w:val="' + name + '"/>' +
      '<w:pPr>' + (opts.spacing || '') + (opts.ind || '') + (opts.jc || '') +
        (opts.border || '') + (opts.keep ? '<w:keepNext/><w:keepLines/>' : '') +
        (opts.outline || '') + '</w:pPr>' +
      '<w:rPr>' + (opts.rPr || '') + '</w:rPr></w:style>';
  }

  var STYLES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:styles' + W + '>' +
    '<w:docDefaults><w:rPrDefault><w:rPr>' +
      '<w:rFonts w:ascii="Georgia" w:hAnsi="Georgia"/><w:sz w:val="21"/></w:rPr></w:rPrDefault>' +
      '<w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault>' +
    '</w:docDefaults>' +
    style('Normal', 'Normal', {}) +
    style('DocTitle', 'Document Title', {
      spacing: '<w:spacing w:after="40"/>',
      rPr: '<w:b/><w:sz w:val="40"/>'
    }) +
    style('DocSub', 'Document Subtitle', {
      spacing: '<w:spacing w:after="360"/>',
      border: '<w:pBdr><w:bottom w:val="single" w:sz="12" w:space="6" w:color="000000"/></w:pBdr>',
      rPr: '<w:caps/><w:sz w:val="18"/><w:color w:val="555555"/>'
    }) +
    style('SecHead', 'Section Heading', {
      spacing: '<w:spacing w:before="320" w:after="140"/>', keep: true,
      outline: '<w:outlineLvl w:val="0"/>',
      border: '<w:pBdr><w:bottom w:val="single" w:sz="4" w:space="4" w:color="BBBBBB"/></w:pBdr>',
      rPr: '<w:b/><w:sz w:val="26"/>'
    }) +
    style('SubHead', 'Subheading', {
      spacing: '<w:spacing w:before="200" w:after="80"/>', keep: true,
      outline: '<w:outlineLvl w:val="1"/>',
      rPr: '<w:b/><w:sz w:val="21"/>'
    }) +
    style('Principle', 'Principle', {
      spacing: '<w:spacing w:before="80" w:after="160"/>',
      ind: '<w:ind w:left="284"/>',
      border: '<w:pBdr><w:left w:val="single" w:sz="12" w:space="8" w:color="888888"/></w:pBdr>',
      rPr: '<w:i/><w:color w:val="444444"/>'
    }) +
    style('Note', 'Note', {
      spacing: '<w:spacing w:before="240"/>',
      rPr: '<w:sz w:val="18"/><w:color w:val="666666"/>'
    }) +
    style('Warn', 'Needs a decision', {
      spacing: '<w:spacing w:after="160"/>',
      rPr: '<w:i/><w:color w:val="A4231C"/>'
    }) +
    style('Bullet', 'List Bullet', {
      spacing: '<w:spacing w:after="80"/>',
      ind: '<w:ind w:left="360" w:hanging="360"/>'
    }) +
    style('HeaderStyle', 'header', {
      spacing: '<w:spacing w:after="0"/>',
      border: '<w:pBdr><w:bottom w:val="single" w:sz="4" w:space="4" w:color="CCCCCC"/></w:pBdr>',
      rPr: '<w:sz w:val="16"/><w:color w:val="666666"/>'
    }) +
    style('FooterStyle', 'footer', {
      spacing: '<w:spacing w:before="0" w:after="0"/>',
      rPr: '<w:sz w:val="16"/><w:color w:val="666666"/>'
    }) +
    '</w:styles>';

  var NUMBERING = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:numbering' + W + '>' +
    '<w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0">' +
      '<w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/>' +
      '<w:lvlJc w:val="left"/>' +
      '<w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr>' +
      '<w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:hint="default"/></w:rPr>' +
    '</w:lvl></w:abstractNum>' +
    '<w:abstractNum w:abstractNumId="1"><w:lvl w:ilvl="0">' +
      '<w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/>' +
      '<w:lvlJc w:val="left"/>' +
      '<w:pPr><w:ind w:left="360" w:hanging="360"/></w:pPr>' +
    '</w:lvl></w:abstractNum>' +
    '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>' +
    '<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>' +
    '</w:numbering>';

  var TAB = '<w:tabs><w:tab w:val="right" w:pos="9360"/></w:tabs>';

  function header(org, title) {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:hdr' + W + '>' +
      '<w:p><w:pPr><w:pStyle w:val="HeaderStyle"/>' + TAB + '</w:pPr>' +
      '<w:r><w:t xml:space="preserve">' + x(org) + '</w:t></w:r>' +
      '<w:r><w:tab/><w:t xml:space="preserve">' + x(title) + '</w:t></w:r>' +
      '</w:p></w:hdr>';
  }

  function fld(instr) {
    return '<w:r><w:fldChar w:fldCharType="begin"/></w:r>' +
      '<w:r><w:instrText xml:space="preserve"> ' + instr + ' </w:instrText></w:r>' +
      '<w:r><w:fldChar w:fldCharType="separate"/></w:r>' +
      '<w:r><w:t>1</w:t></w:r>' +
      '<w:r><w:fldChar w:fldCharType="end"/></w:r>';
  }

  function footer(left) {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:ftr' + W + '>' +
      '<w:p><w:pPr><w:pStyle w:val="FooterStyle"/>' + TAB + '</w:pPr>' +
      '<w:r><w:t xml:space="preserve">' + x(left) + '</w:t></w:r>' +
      '<w:r><w:tab/><w:t xml:space="preserve">Page </w:t></w:r>' + fld('PAGE') +
      '<w:r><w:t xml:space="preserve"> of </w:t></w:r>' + fld('NUMPAGES') +
      '</w:p></w:ftr>';
  }

  /* ---------- document body ---------- */
  function body(blocks) {
    var out = '';
    blocks.forEach(function (b) {
      if (b.t === 'section') {
        /* Numbered when the caller supplies one (the audit and the code of
           conduct are numbered documents); plain otherwise, since a toolbox
           page's headings carry no numbering of their own. */
        var heading = (b.n === null || b.n === undefined)
          ? String(b.title == null ? '' : b.title)
          : b.n + '.  ' + b.title;
        out += p('SecHead',
          '<w:r><w:t xml:space="preserve">' + x(heading) + '</w:t></w:r>',
          b.pageBreak ? '<w:pageBreakBefore/>' : '');
      } else if (b.t === 'h') {
        out += p('SubHead', runs(b.text));
      } else if (b.t === 'p') {
        out += p('Normal', runs(b.html));
      } else if (b.t === 'principle') {
        out += p('Principle', runs(b.html));
      } else if (b.t === 'note') {
        out += p('Note', runs(b.text));
      } else if (b.t === 'warn') {
        out += p('Warn', runs(b.text));
      } else if (b.t === 'ul') {
        b.items.forEach(function (i) {
          out += p('Bullet', runs(i),
            '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>');
        });
      } else if (b.t === 'sign') {
        out += signTable(b.rows);
      } else if (b.t === 'ol') {
        b.items.forEach(function (i) {
          out += p('Bullet', runs(i),
            '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr>');
        });
      } else if (b.t === 'table') {
        out += table(b);
      }
    });
    return out;
  }

  /* A ruled table, used for the audit's standards-and-status grid. Rows carry
     `shade` for the standards that need attention, so a reviewer can find the
     gaps by flicking through the paper rather than reading every line. */
  function table(spec) {
    var cols = spec.cols;
    var total = cols.reduce(function (a, b) { return a + b; }, 0);

    function tc(content, w, opts) {
      opts = opts || {};
      return '<w:tc><w:tcPr><w:tcW w:w="' + w + '" w:type="dxa"/>' +
        (opts.shade ? '<w:shd w:val="clear" w:color="auto" w:fill="' + opts.shade + '"/>' : '') +
        '<w:tcMar><w:top w:w="60" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/>' +
        '<w:left w:w="90" w:type="dxa"/><w:right w:w="90" w:type="dxa"/></w:tcMar>' +
        '<w:vAlign w:val="center"/></w:tcPr>' + content + '</w:tc>';
    }

    function row(cells, opts) {
      opts = opts || {};
      return '<w:tr><w:trPr><w:cantSplit/>' +
        (opts.head ? '<w:tblHeader/>' : '') + '</w:trPr>' +
        cells.map(function (c, i) {
          var base = opts.head ? { b: true, sz: '15' } : (c.rPr || null);
          var para = '<w:p><w:pPr><w:spacing w:before="20" w:after="20"/>' +
            (c.right ? '<w:jc w:val="right"/>' : '') +
            (opts.head ? '<w:keepNext/>' : '') + '</w:pPr>' +
            runs(c.text == null ? c : String(c.text), base) + '</w:p>';
          return tc(para, cols[i], { shade: opts.head ? 'F0F0EE' : c.shade });
        }).join('') + '</w:tr>';
    }

    var border = function (e) {
      return '<w:' + e + ' w:val="single" w:sz="4" w:space="0" w:color="D8D8D4"/>';
    };

    return '<w:tbl><w:tblPr><w:tblW w:w="' + total + '" w:type="dxa"/>' +
      '<w:tblBorders>' +
      ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(border).join('') +
      '</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr>' +
      '<w:tblGrid>' + cols.map(function (w) {
        return '<w:gridCol w:w="' + w + '"/>';
      }).join('') + '</w:tblGrid>' +
      (spec.head ? row(spec.head, { head: true }) : '') +
      spec.rows.map(function (r) { return row(r.cells || r, { }); }).join('') +
      '</w:tbl>' +
      /* Word glues consecutive tables together; a thin spacer keeps them apart. */
      '<w:p><w:pPr><w:spacing w:after="0" w:line="120" w:lineRule="exact"/></w:pPr></w:p>';
  }

  /* Signature lines as a borderless table: cells cannot split across a page,
     so a name never ends up on one sheet and its rule on the next. */
  function signTable(rows) {
    var cell = function (label) {
      return '<w:tc><w:tcPr><w:tcW w:w="4680" w:type="dxa"/>' +
        '<w:tcMar><w:top w:w="280" w:type="dxa"/><w:right w:w="220" w:type="dxa"/></w:tcMar>' +
        '</w:tcPr>' +
        '<w:p><w:pPr><w:spacing w:before="360" w:after="0"/>' +
          '<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="2" w:color="000000"/></w:pBdr>' +
        '</w:pPr></w:p>' +
        '<w:p><w:pPr><w:spacing w:before="40" w:after="240"/></w:pPr>' +
        '<w:r><w:rPr><w:caps/><w:sz w:val="15"/><w:color w:val="666666"/></w:rPr>' +
        '<w:t xml:space="preserve">' + x(label) + '</w:t></w:r></w:p></w:tc>';
    };
    return '<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/>' +
      '<w:tblBorders>' +
      ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(function (e) {
        return '<w:' + e + ' w:val="none" w:sz="0" w:space="0" w:color="auto"/>';
      }).join('') +
      '</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr>' +
      '<w:tblGrid><w:gridCol w:w="4680"/><w:gridCol w:w="4680"/></w:tblGrid>' +
      rows.map(function (r) {
        return '<w:tr><w:trPr><w:cantSplit/></w:trPr>' +
               r.map(cell).join('') + '</w:tr>';
      }).join('') + '</w:tbl>';
  }

  /* ---------- entry point ---------- */
  function build(opts) {
    var org = opts.org || 'Your organization';
    var titleBlock =
      p('DocTitle', '<w:r><w:t xml:space="preserve">' + x(org) + '</w:t></w:r>') +
      p('DocSub', '<w:r><w:t xml:space="preserve">' + x(opts.title) + '</w:t></w:r>');

    var sectPr = '<w:sectPr>' +
      '<w:headerReference w:type="default" r:id="rId3"/>' +
      '<w:footerReference w:type="default" r:id="rId4"/>' +
      '<w:pgSz w:w="12240" w:h="15840"/>' +
      '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" ' +
        'w:header="720" w:footer="720" w:gutter="0"/>' +
      '</w:sectPr>';

    var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document' + W +
      ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      '<w:body>' + titleBlock + body(opts.blocks) + sectPr + '</w:body></w:document>';

    return zip([
      { name: '[Content_Types].xml', data: CT },
      { name: '_rels/.rels', data: RELS },
      { name: 'word/_rels/document.xml.rels', data: DOCRELS },
      { name: 'word/styles.xml', data: STYLES },
      { name: 'word/numbering.xml', data: NUMBERING },
      { name: 'word/header1.xml', data: header(org, opts.title) },
      { name: 'word/footer1.xml', data: footer(opts.adopted || '') },
      { name: 'word/document.xml', data: doc }
    ]);
  }

  return { build: build, zip: zip };
}());
