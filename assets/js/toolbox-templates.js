/* ==========================================================================
   Blank printable templates for the two documents that are also interactive
   forms inside the partner portal.

   These render from the very same data files the portal uses
   (portal/audit-data.js, portal/conduct-data.js), so the public template and
   the partner form can never describe different standards or different clauses.
   What differs is only the state: here nothing is filled in and nothing saves,
   which is what makes the page usable by anyone without an account.

   Output is ordinary document markup inside `.doc`, so the toolbox print rules
   and the Word exporter both pick these up with no special handling.
   ========================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* A rule to write on, in both the printed page and the Word file. */
  function blank(width) {
    return '<span class="blank">' + new Array((width || 22) + 1).join('_') + '</span>';
  }

  /* ---------- Code of Conduct ---------- */
  function conduct(data) {
    var out = '';

    data.sections.forEach(function (sec, i) {
      out += '<h2>' + (i + 1) + '. ' + esc(sec.title) + '</h2>';

      sec.blocks.forEach(function (b) {
        if (b.t === 'p' || b.t === 'principle') {
          out += '<p' + (b.t === 'principle' ? ' class="lede"' : '') + '>' +
                 fill(b.text) + '</p>';
        } else if (b.t === 'h') {
          out += '<h4>' + b.text + '</h4>';
        } else if (b.t === 'note') {
          out += '<p class="muted">' + b.text + '</p>';
        } else if (b.t === 'ul') {
          out += '<ul>' + b.items.map(function (it) {
            return '<li>' + fill(it) + '</li>';
          }).join('') + '</ul>';
        } else if (b.t === 'choice') {
          out += '<div class="panel panel--plain">' +
            '<p class="panel__title">' + esc(b.label) + ' — choose one</p><ul>' +
            b.options.map(function (o) { return '<li>' + o.text + '</li>'; }).join('') +
            '</ul></div>';
        } else if (b.t === 'optional') {
          out += '<div class="panel panel--plain">' +
            '<p class="panel__title">Optional — include only if it applies</p>' +
            '<p>' + b.text + '</p></div>';
        } else if (b.t === 'sign') {
          out += '<table class="doctable doctable--sign"><tbody>' + b.rows.map(function (row) {
            return '<tr>' + row.map(function (lab) {
              return '<td><strong>' + esc(lab) + '</strong><br>' + blank(30) + '</td>';
            }).join('') + '</tr>';
          }).join('') + '</tbody></table>';
        }
      });
    });
    return out;

    function fill(text) {
      return String(text).replace(/\{\{(\w+)\}\}/g, function (_, id) {
        var f = (data.fields || {})[id] || {};
        return blank(f.wide ? 34 : 20);
      });
    }
  }

  /* ---------- Safeguarding Audit ---------- */
  function audit(data) {
    var out = '<h2>Organization information</h2><table class="doctable doctable--kv"><tbody>' +
      data.fields.map(function (f) {
        return '<tr><td><strong>' + esc(f.label) + '</strong></td><td>' + blank(34) + '</td></tr>';
      }).join('') + '</tbody></table>';

    data.sections.forEach(function (sec) {
      out += '<h2>' + esc(sec.title) + '</h2>' +
        '<table class="doctable doctable--tick"><thead><tr><th>Standard</th>' +
        data.options.map(function (o) {
          return '<th>' + esc(o.label) + '</th>';
        }).join('') + '</tr></thead><tbody>' +
        sec.items.map(function (item) {
          return '<tr><td>' + esc(item.text) + '</td>' +
            data.options.map(function () { return '<td></td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table>';
    });

    out += '<h2>Action plan</h2>' +
      '<p>List every standard that is not yet fully in place, and assign an owner and a target date.</p>' +
      '<table class="doctable"><thead><tr><th>Standard</th><th>Owner</th><th>Target date</th></tr></thead><tbody>' +
      new Array(11).join('<tr><td></td><td></td><td></td></tr>') +
      '</tbody></table>';

    out += '<h2>Sign-off</h2><table class="doctable doctable--kv"><tbody>' +
      data.signoff.map(function (f) {
        return '<tr><td><strong>' + esc(f.label) + '</strong></td><td>' + blank(34) + '</td></tr>';
      }).join('') + '</tbody></table>' +
      '<p class="muted">Complete this audit annually, and again after any safeguarding incident.</p>';

    return out;
  }

  /* ---------- Mental Health Emergency Action Plan ---------- */
  function mheap(data) {
    function fill(text) {
      return String(text).replace(/\{\{(\w+)\}\}/g, function () { return blank(26); });
    }
    var out = '<table class="doctable doctable--kv"><tbody>' +
      data.header.map(function (f) {
        return '<tr><td><strong>' + esc(f.label) + '</strong></td><td>' + blank(34) + '</td></tr>';
      }).join('') + '</tbody></table>';

    data.sections.forEach(function (sec) {
      out += '<h2>' + sec.n + '. ' + esc(sec.title) + '</h2>';
      sec.blocks.forEach(function (b) {
        if (b.t === 'h') out += '<h4>' + b.text + '</h4>';
        else if (b.t === 'p') out += '<p>' + fill(b.text) + '</p>';
        else if (b.t === 'note') out += '<p class="muted">' + fill(b.text) + '</p>';
        else if (b.t === 'ul') out += '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
        else if (b.t === 'sign') {
          out += '<table class="doctable doctable--sign"><tbody>' + b.rows.map(function (row) {
            return '<tr>' + row.map(function (lab) {
              return '<td><strong>' + esc(lab) + '</strong><br>' + blank(28) + '</td>';
            }).join('') + '</tr>';
          }).join('') + '</tbody></table>';
        } else if (b.t === 'table') {
          out += '<table class="doctable"><thead><tr>' +
            b.cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') +
            '</tr></thead><tbody>' +
            b.rows.map(function (label, r) {
              var cells = '<td><strong>' + label + '</strong></td>';
              for (var c = 1; c < b.cols.length; c++) {
                var fixed = b.fixedCols && b.fixedCols[c] ? b.fixedCols[c][r] : null;
                var pre = (b.prefill && b.prefill[r] !== undefined && c === 1) ? b.prefill[r] : '';
                cells += '<td>' + (fixed != null ? fixed : pre) + '</td>';
              }
              return '<tr>' + cells + '</tr>';
            }).join('') + '</tbody></table>';
        }
      });
    });

    var card = data.card;
    if (!card) return out;
    out += '<h2>' + esc(card.title) + '</h2>' +
      '<p><strong>' + esc(card.lead) + '</strong></p><ol>' +
      card.steps.map(function (s2) { return '<li>' + s2 + '</li>'; }).join('') + '</ol>' +
      '<p class="lede">' + esc(card.closing) + '</p>' +
      '<h4>Emergency contacts</h4><ul>' +
      card.contacts.map(function (c) {
        return '<li>' + (c.fixed ? c.fixed : esc(c.label) + ': ' + blank(24)) + '</li>';
      }).join('') + '</ul>';
    return out;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.querySelector('.doc[data-template]');
    if (!host) return;
    var which = host.getAttribute('data-template');

    if (which === 'conduct' && window.MHG_CONDUCT) host.innerHTML = conduct(window.MHG_CONDUCT);
    else if (which === 'audit' && window.MHG_AUDIT) host.innerHTML = audit(window.MHG_AUDIT);
    else if (which === 'mheap' && window.MHG_MHEAP) host.innerHTML = mheap(window.MHG_MHEAP);
    else if (which === 'ctrp' && window.MHG_CTRP) host.innerHTML = mheap(window.MHG_CTRP);
    else {
      host.innerHTML = '<div class="panel panel--alert"><p>This template could not be loaded. ' +
        'Reload the page; if it persists the template data file is missing.</p></div>';
    }
  });
}());
