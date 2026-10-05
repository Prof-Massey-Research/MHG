/* ==========================================================================
   Toolbox document export.

   Every toolbox page is the same shape — a `.tpl-head` with the title, and a
   `.doc` holding the document itself — so one walker can turn any of them into
   a Word file rather than each page carrying its own export code. Read the DOM
   rather than a data file: what the visitor sees on screen is then exactly what
   they download, and a page edited by hand cannot drift from its export.

   PDF is deliberately not generated here. The browser's own print already makes
   a good PDF now that the break rules are in place, and shipping a PDF engine
   to every toolbox page would cost more than it returns.
   ========================================================================== */
(function () {
  'use strict';

  var PAGE = 9360;           /* printable width in twips at Letter, 1in margins */
  var SKIP = /^(script|style|button|nav|form)$/i;

  function txt(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); }

  /* Inline HTML, reduced to what the Word writer understands. */
  function inline(el) {
    var h = el.innerHTML || '';
    return h
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/?(a|span|small|code)\b[^>]*>/gi, '')
      .replace(/<[^>]*>/g, function (t) {
        return /^<\/?(strong|b|em|i)\b/i.test(t) ? t : '';
      })
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tableBlock(tbl) {
    var rows = Array.prototype.slice.call(tbl.querySelectorAll('tr'));
    if (!rows.length) return null;

    var widest = 0;
    rows.forEach(function (r) { widest = Math.max(widest, r.children.length); });
    if (!widest) return null;

    /* A first column carrying the question or standard needs the room; even
       columns look wrong when one of them holds a sentence and the rest a word. */
    var cols;
    if (widest === 2) cols = [Math.round(PAGE * 0.62), PAGE - Math.round(PAGE * 0.62)];
    else {
      var each = Math.floor(PAGE / widest);
      cols = [];
      for (var i = 0; i < widest; i++) cols.push(each);
      cols[0] += PAGE - each * widest;
    }

    var head = null, body = [];
    rows.forEach(function (r, i) {
      var cells = Array.prototype.slice.call(r.children).map(function (c) {
        return { text: inline(c) };
      });
      while (cells.length < widest) cells.push({ text: '' });
      if (i === 0 && r.querySelector('th')) head = cells;
      else body.push(cells);
    });
    if (!body.length) { body = head ? [head] : []; head = null; }
    return { t: 'table', cols: cols, head: head, rows: body };
  }

  function listItems(list) {
    return Array.prototype.slice.call(list.children)
      .filter(function (li) { return li.tagName === 'LI'; })
      .map(inline)
      .filter(Boolean);
  }

  /* Walks the document in order, so the Word file matches the reading order of
     the page rather than a guess at its structure. */
  function walk(root, blocks, depth) {
    Array.prototype.forEach.call(root.children, function (el) {
      var tag = el.tagName.toLowerCase();
      if (SKIP.test(tag) || el.classList.contains('noprint')) return;

      if (tag === 'h2') {
        blocks.push({ t: 'section', n: null, title: txt(el) });
      } else if (tag === 'h3') {
        blocks.push({ t: 'h', text: inline(el) });
      } else if (tag === 'h4' || el.classList.contains('panel__title')) {
        blocks.push({ t: 'h', text: inline(el) });
      } else if (tag === 'p') {
        var t = inline(el);
        if (t) blocks.push({ t: el.classList.contains('muted') ? 'note' : 'p', html: t, text: t });
      } else if (tag === 'ul') {
        var u = listItems(el);
        if (u.length) blocks.push({ t: 'ul', items: u });
      } else if (tag === 'ol') {
        var o = listItems(el);
        if (o.length) blocks.push({ t: 'ol', items: o });
      } else if (tag === 'table') {
        var tb = tableBlock(el);
        if (tb) blocks.push(tb);
      } else if (tag === 'blockquote') {
        blocks.push({ t: 'principle', html: inline(el) });
      } else if (depth < 8) {
        walk(el, blocks, depth + 1);      /* wrappers: .doc, .panel, .grid, … */
      }
    });
  }

  function collect() {
    var doc = document.querySelector('.doc');
    if (!doc) return null;
    var blocks = [];
    walk(doc, blocks, 0);
    return blocks.length ? blocks : null;
  }

  function fileName(title) {
    return (title || 'document').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) + '.docx';
  }

  function download() {
    if (!window.MHG_DOCX) { alert('The Word exporter did not load. Reload the page and try again.'); return; }
    var blocks = collect();
    if (!blocks) { alert('Nothing to export on this page.'); return; }

    var h1 = document.querySelector('.tpl-head h1');
    var title = h1 ? txt(h1) : document.title;
    try {
      var blob = MHG_DOCX.build({
        org: title,
        title: 'Mental Health Guidelines for Youth Sport',
        adopted: '',
        blocks: blocks
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = fileName(title);
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    } catch (err) {
      alert('Could not build the Word file: ' + err.message);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.querySelector('.tpl-actions');
    if (!host || !document.querySelector('.doc')) return;

    var btn = document.createElement('button');
    btn.className = 'btn btn--ghost btn--sm';
    btn.type = 'button';
    btn.textContent = 'Download as Word';
    btn.addEventListener('click', download);

    var printBtn = host.querySelector('[data-print]');
    if (printBtn && printBtn.nextSibling) host.insertBefore(btn, printBtn.nextSibling);
    else host.appendChild(btn);
  });
}());
