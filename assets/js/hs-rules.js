/* ==========================================================================
   Renders the state association table, and the jump-to-a-state control.

   Built from MHG_HS_ASSOCIATIONS at load rather than written into the page, so
   the directory lives in one file and the printed and Word versions are
   generated from the same rows the screen shows.
   ========================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function host(url) {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host_el = document.getElementById('assoc-table');
    var rows = window.MHG_HS_ASSOCIATIONS;
    if (!host_el) return;

    if (!rows || !rows.length) {
      host_el.innerHTML = '<div class="panel panel--alert"><p style="margin:0">' +
        'The association directory did not load. Reload the page; if it persists, ' +
        '<code>assets/js/hs-associations.js</code> is missing.</p></div>';
      return;
    }

    host_el.innerHTML =
      '<table class="doctable" id="assoc-rows">' +
      '<thead><tr><th style="width:22%">State</th><th>Association</th>' +
      '<th style="width:30%">Where the rules live</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr id="st-' + esc(r.state.toLowerCase().replace(/[^a-z]+/g, '-')) + '">' +
          '<td><strong>' + esc(r.state) + '</strong></td>' +
          '<td>' + esc(r.name) + '</td>' +
          '<td><a href="' + esc(r.url) + '" rel="noopener">' + esc(host(r.url)) + '</a></td>' +
          '</tr>';
      }).join('') +
      '</tbody></table>';

    var pick = document.getElementById('state-pick');
    if (!pick) return;
    pick.innerHTML = '<option value="">Select&hellip;</option>' +
      rows.map(function (r) {
        return '<option value="st-' + esc(r.state.toLowerCase().replace(/[^a-z]+/g, '-')) + '">' +
               esc(r.state) + '</option>';
      }).join('');

    pick.addEventListener('change', function () {
      if (!pick.value) return;
      var row = document.getElementById(pick.value);
      if (!row) return;
      row.scrollIntoView({ block: 'center', behavior: 'smooth' });
      /* A brief highlight, because scrolling a long table gives no other cue. */
      row.style.transition = 'background-color .3s';
      row.style.backgroundColor = 'var(--paper-2, #f2f2f0)';
      setTimeout(function () { row.style.backgroundColor = ''; }, 1600);
    });
  });
}());
