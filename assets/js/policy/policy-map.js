/* ==========================================================================
   Policy tracker map.

   Draws the US states with d3 + topojson when they are available, and falls
   back to a working dropdown when they are not. The state list and the detail
   panel are built independently of d3 on purpose: the previous version built
   the dropdown inside the d3 path, so when the CDN failed the page promised a
   dropdown that was empty.
   ========================================================================== */
(function () {
  'use strict';

  var FIPS = {
    "01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE",
    "11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA",
    "20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN",
    "28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM",
    "36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI",
    "45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA",
    "54":"WV","55":"WI","56":"WY"
  };

  var STATE_NAMES = {
    AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California",
    CO:"Colorado", CT:"Connecticut", DE:"Delaware", DC:"District of Columbia",
    FL:"Florida", GA:"Georgia", HI:"Hawaii", ID:"Idaho", IL:"Illinois",
    IN:"Indiana", IA:"Iowa", KS:"Kansas", KY:"Kentucky", LA:"Louisiana",
    ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Michigan", MN:"Minnesota",
    MS:"Mississippi", MO:"Missouri", MT:"Montana", NE:"Nebraska", NV:"Nevada",
    NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York",
    NC:"North Carolina", ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon",
    PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
    TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA:"Virginia",
    WA:"Washington", WV:"West Virginia", WI:"Wisconsin", WY:"Wyoming"
  };

  var LABEL = {
    enacted:    'Mental health law in force',
    introduced: 'Mental health bill pending',
    baseline:   'No mental health law'
  };

  var DATA = window.POLICY_DATA || {};
  var panel = document.getElementById('detail-panel');
  var select = document.getElementById('state-select');
  var svgEl = document.getElementById('us-map');
  var current = null;
  var paintSelection = function () {};   // replaced once the map draws

  function statusOf(abbr) {
    return DATA[abbr] ? DATA[abbr].status : 'baseline';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- detail panel (works with or without the map) ---------- */
  function billHTML(b) {
    return '<div class="bill">' +
      '<h4>' + esc(b.name) + '</h4>' +
      '<p class="bill__meta">' + esc(b.stage) + (b.topic ? ' &middot; ' + esc(b.topic) : '') + '</p>' +
      '<p>' + esc(b.summary) + '</p>' +
      (b.link ? '<a href="' + esc(b.link) + '" rel="noopener">Bill text &#8599;</a>' : '') +
      '</div>';
  }

  function renderPanel(abbr) {
    if (!panel) return;
    var name = STATE_NAMES[abbr] || abbr;
    var d = DATA[abbr];
    var st = d ? d.status : 'baseline';

    var html = '<p class="dp-state">' + esc(name) + '</p>' +
               '<span class="status-badge status-badge--' + st + '">' +
               '<i></i>' + LABEL[st] + '</span>';

    if (!d) {
      html += '<p class="dp-empty">' + esc(window.POLICY_BASELINE_NOTE || '') + '</p>';
      panel.innerHTML = html;
      return;
    }

    if (d.headline) html += '<p class="dp-headline">' + esc(d.headline) + '</p>';

    if (d.bills && d.bills.length) {
      html += '<p class="dp-group">Mental health</p>' + d.bills.map(billHTML).join('');
    }

    if (d.related && d.related.length) {
      html += '<details class="dp-related"' + (d.bills && d.bills.length ? '' : ' open') + '>' +
        '<summary>Related protections in force (' + d.related.length + ')</summary>' +
        '<p class="dp-note">Safeguarding, abuse reporting and coach-training laws that support the ' +
        'guidelines, though they are not mental-health-specific.</p>' +
        d.related.map(billHTML).join('') +
        '</details>';
    }

    if (!(d.bills && d.bills.length)) {
      html += '<p class="dp-empty">' + esc(window.POLICY_BASELINE_NOTE || '') + '</p>';
    }

    panel.innerHTML = html;
  }

  function choose(abbr) {
    if (!STATE_NAMES[abbr]) return;
    current = abbr;
    renderPanel(abbr);
    paintSelection(abbr);
    if (select && select.value !== abbr) select.value = abbr;
  }

  /* ---------- dropdown: built first, so it works even if d3 never loads ---------- */
  if (select) {
    var opts = Object.keys(STATE_NAMES).map(function (a) {
      return { abbr: a, name: STATE_NAMES[a] };
    }).sort(function (a, b) { return a.name.localeCompare(b.name); });

    select.innerHTML = '<option value="">Choose a state…</option>' +
      opts.map(function (o) {
        return '<option value="' + o.abbr + '">' + esc(o.name) + '</option>';
      }).join('');

    select.addEventListener('change', function () {
      if (this.value) choose(this.value);
    });
  }

  /* ---------- the map itself ---------- */
  function drawMap() {
    if (typeof d3 === 'undefined' || typeof topojson === 'undefined' || !window.US_TOPO || !svgEl) {
      var fb = document.getElementById('map-fallback');
      if (fb) fb.hidden = false;
      if (svgEl) svgEl.hidden = true;
      return;
    }

    var topo = window.US_TOPO;
    var fc = topojson.feature(topo, topo.objects.states);
    fc.features = fc.features.filter(function (f) { return FIPS[f.id]; });
    fc.features.forEach(function (f) { f.abbr = FIPS[f.id]; });

    var width = 960, height = 600;
    var svg = d3.select('#us-map')
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    var path = d3.geoPath().projection(d3.geoAlbersUsa().fitSize([width, height], fc));
    var tip = d3.select('#map-tip');

    var paths = svg.selectAll('path')
      .data(fc.features)
      .join('path')
      .attr('d', path)
      .attr('class', function (d) { return 'state state--' + statusOf(d.abbr); })
      .attr('data-state', function (d) { return d.abbr; })
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', function (d) {
        return (STATE_NAMES[d.abbr] || d.abbr) + ' — ' + LABEL[statusOf(d.abbr)];
      })
      .on('mousemove', function (event, d) {
        tip.style('opacity', 1)
           .html('<strong>' + esc(STATE_NAMES[d.abbr] || d.abbr) + '</strong><br>' +
                 LABEL[statusOf(d.abbr)])
           .style('left', (event.clientX + 14) + 'px')
           .style('top', (event.clientY + 14) + 'px');
      })
      .on('mouseleave', function () { tip.style('opacity', 0); })
      .on('click', function (event, d) { choose(d.abbr); })
      .on('keydown', function (event, d) {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(d.abbr); }
      });

    paintSelection = function (abbr) {
      paths.classed('is-selected', function (d) { return d.abbr === abbr; });
    };
    if (current) paintSelection(current);
  }

  /* Open on a state that actually has something to show. */
  function start() {
    drawMap();
    var enacted = Object.keys(DATA).filter(function (k) { return DATA[k].status === 'enacted'; });
    choose(enacted[0] || Object.keys(DATA)[0] || 'OH');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
