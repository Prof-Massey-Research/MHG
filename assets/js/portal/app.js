/* ==========================================================================
   Partner portal UI.

   Talks only to MHG_STORE (assets/js/portal/store.js) and MHG_LADDER.
   It has no knowledge of how or where data is persisted, which is what makes
   the Supabase swap a one-file change.
   ========================================================================== */
(function () {
  'use strict';

  var Store = window.MHG_STORE;
  var Ladder = window.MHG_LADDER;
  var GROUPS = window.MHG_CHECKLIST || [];
  var RESOURCE = 'ladder-checklist';

  var Audit = window.MHG_AUDIT;
  var AUDIT_KEY = Audit ? Audit.key : 'safeguarding-audit';
  var Conduct = window.MHG_CONDUCT;
  var CONDUCT_KEY = Conduct ? Conduct.key : 'code-of-conduct';
  var Res = window.MHG_RESOURCES;
  var Mheap = window.MHG_MHEAP;
  var Ctrp  = window.MHG_CTRP;
  var MHEAP_KEY = Mheap ? Mheap.key : 'mheap';

  /* Both plan documents share one renderer: same block vocabulary, same print
     and Word paths. P is the plan currently on screen, set by render(). */
  var PLANS = [];
  if (Mheap) PLANS.push({ data: Mheap, key: Mheap.key, bucket: 'mheap' });
  if (Ctrp)  PLANS.push({ data: Ctrp,  key: Ctrp.key,  bucket: 'ctrp' });
  function planFor(key) {
    for (var i = 0; i < PLANS.length; i++) if (PLANS[i].key === key) return PLANS[i];
    return null;
  }
  var P = PLANS[0] || null;
  var RES_KEY = Res ? Res.key : 'local-resources';

  /* Which ladder item does an in-portal resource evidence? Read from the ladder
     data so the link and the auto-advance can never disagree. */
  function itemForResource(resourceKey) {
    var found = null;
    GROUPS.forEach(function (g) {
      Ladder.allItems(g).forEach(function (item) {
        (item.tools || []).forEach(function (t) {
          if (t.resource === resourceKey) found = item.id;
        });
      });
    });
    return found;
  }

  var root = document.getElementById('portal-root');
  if (!root || !Store || !Ladder) return;

  /* ?resource=safeguarding-audit sends you straight there after signing in,
     which is how the links out on the public site route people. */
  function requestedResource() {
    var m = /[?&]resource=([a-z0-9-]+)/i.exec(window.location.search);
    return m ? m[1] : null;
  }

  var state = {
    session: null, orgs: [], responses: {}, audit: {}, conduct: {}, res: {}, mheap: {}, ctrp: {},
    view: requestedResource() || 'dashboard'
  };

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function done(itemId) {
    var r = state.responses[itemId];
    return !!(r && r.value);
  }
  function fmtDate(iso) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString(undefined,
        { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return ''; }
  }
  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('is-on');
    setTimeout(function () { t.classList.remove('is-on'); }, 2000);
  }

  /* ---------- battery bar ---------- */
  function battery(stage) {
    var segs = Ladder.STAGES.map(function (s, i) {
      return '<span class="battery__seg' + (i < stage ? ' is-on' : '') +
             '" title="' + esc(s.label) + '"></span>';
    }).join('');
    return '<div class="battery" role="img" aria-label="Programme stage: ' +
           esc(Ladder.stageName(stage)) + '">' + segs + '</div>';
  }

  /* ---------- views ---------- */
  function signedOutView() {
    var wanted = requestedResource() === AUDIT_KEY;
    return '' +
    '<div class="portal-gate">' +
      '<p class="eyebrow">Partner portal</p>' +
      '<h1>Sign in</h1>' +
      (wanted
        ? '<p class="muted" style="max-width:46ch">The Safeguarding Audit Checklist is an ' +
          'interactive form kept inside your organization\u2019s portal. Sign in to open it.</p>'
        : '<p class="muted" style="max-width:46ch">Your organization\u2019s records are saved to ' +
          'your account, so they survive a cleared browser and follow you to another computer.</p>') +
      '<form id="signin-form" class="portal-form">' +
        '<label for="signin-user">Username</label>' +
        '<input type="text" id="signin-user" name="username" autocomplete="username" required>' +
        '<label for="signin-pass">Password</label>' +
        '<input type="password" id="signin-pass" name="password" autocomplete="current-password" required>' +
        '<button class="btn" type="submit">Sign in</button>' +
      '</form>' +
      '<p id="signin-error" class="portal-error" hidden role="alert"></p>' +
      '<div class="portal-note">' +
        '<p style="margin:0 0 .4rem"><strong>Demonstration only.</strong> Username <code>MHG</code>, ' +
          'password <code>DEMO</code>.</p>' +
        '<p style="margin:0">These credentials are checked in the browser, so this is a walkthrough ' +
          'of the experience rather than real protection. The live version authenticates on the ' +
          'server, with accounts created by invitation.</p>' +
      '</div>' +
    '</div>';
  }

  function needsOrgView() {
    return '' +
    '<div class="portal-gate">' +
      '<p class="eyebrow">One more step</p>' +
      '<h1>Name your organization</h1>' +
      '<p class="muted" style="max-width:46ch">Records are kept against the organization, not the ' +
        'person, so colleagues can pick up where you left off.</p>' +
      '<form id="org-form" class="portal-form">' +
        '<label for="org-name">Organization name</label>' +
        '<input type="text" id="org-name" name="name" required placeholder="Riverside Youth Soccer Club">' +
        '<button class="btn" type="submit">Create</button>' +
      '</form>' +
      '<p class="portal-note">In the hosted version you would be invited into an organization that ' +
        'already exists, rather than creating one.</p>' +
    '</div>';
  }

  function dashboardView() {
    var stage = Ladder.programStage(GROUPS, done);
    var totalItems = 0, doneItems = 0;
    GROUPS.forEach(function (g) {
      var items = Ladder.allItems(g);
      totalItems += items.length;
      doneItems += items.filter(function (i) { return done(i.id); }).length;
    });

    var orgOptions = state.orgs.map(function (o) {
      return '<option value="' + esc(o.id) + '"' +
             (state.session.org && o.id === state.session.org.id ? ' selected' : '') +
             '>' + esc(o.name) + '</option>';
    }).join('');

    var html = '' +
    '<div class="portal-bar">' +
      '<div class="portal-bar__org">' +
        (state.orgs.length > 1
          ? '<label class="sr-only" for="org-switch">Organization</label>' +
            '<select id="org-switch">' + orgOptions + '</select>'
          : '<span class="portal-bar__name">' + esc(state.session.org.name) + '</span>') +
      '</div>' +
      '<div class="portal-bar__user">' +
        '<span>' + esc(state.session.user.name) + '</span>' +
        '<button class="linkish" id="export-btn" type="button">Export</button>' +
        '<button class="linkish" id="signout-btn" type="button">Sign out</button>' +
      '</div>' +
    '</div>' +

    '<section class="portal-hero">' +
      '<p class="eyebrow">Your progress</p>' +
      '<h1>' + esc(state.session.org.name) + '</h1>' +
      battery(stage) +
      '<p class="battery__label"><strong>' + esc(Ladder.stageName(stage)) + '</strong> &middot; ' +
        doneItems + ' of ' + totalItems + ' items recorded</p>' +
      '<p class="muted" style="font-size:.85rem;max-width:56ch">Your programme reaches a stage once ' +
        '<em>all seven</em> guidelines have reached it — breadth before depth, as the guide ' +
        'recommends. Individual guidelines may be further ahead.</p>' +
    '</section>' +

    '<section class="portal-section">' +
      '<h2>Your ladder</h2>' +
      '<p class="muted" style="font-size:.88rem;max-width:60ch">Open a guideline to see its five ' +
        'stages. Where a template evidences a stage, it sits alongside it.</p>';

    GROUPS.forEach(function (g) { html += guidelineCard(g); });

    html += '</section>';

    return html;
  }

  /* One collapsible card per guideline: the summary row stays visible, the five
     stages fold away underneath it. */
  function guidelineCard(g) {
    var items = Ladder.allItems(g);
    var d = items.filter(function (i) { return done(i.id); }).length;
    var gs = Ladder.stageOf(g, done);

    var html = '<details class="gcard" data-guideline="' + esc(g.id) + '">' +
      '<summary class="gcard__head">' +
        '<span class="gcard__no">' + esc(g.number) + '</span>' +
        '<span class="gcard__name">' + esc(g.title) + '</span>' +
        '<span class="gcard__bar">' + battery(gs) + '</span>' +
        '<span class="gcard__stage">' + esc(Ladder.stageName(gs)) + '</span>' +
        '<span class="gcard__count">' + d + '/' + items.length + '</span>' +
      '</summary>' +
      '<div class="gcard__body">' +
        '<p class="muted" style="font-size:.86rem;margin-bottom:1.2rem">' + esc(g.statement) +
          ' <a href="' + esc(g.href) + '" style="white-space:nowrap">Read the guideline &rarr;</a></p>';

    Ladder.STAGES.forEach(function (st, si) {
      var list = g.stages[st.key] || [];
      if (!list.length) return;
      html += '<div class="ck-rung"><p class="ck-rung__label">' +
              '<span class="ck-rung__n">Stage ' + (si + 1) + '</span>' + esc(st.label) +
              (st.sub ? ' <span class="ck-rung__sub">' + esc(st.sub) + '</span>' : '') +
              '</p><ul class="ck-items">';
      list.forEach(function (item) {
        var r = state.responses[item.id];
        var meta = (r && r.value && r.updated_by)
          ? '<span class="ck-item__meta">Recorded by ' + esc(r.updated_by) +
            (r.updated_at ? ' &middot; ' + esc(fmtDate(r.updated_at)) : '') + '</span>'
          : '';
        html += '<li class="ck-item"><label>' +
          '<input type="checkbox" data-item="' + esc(item.id) + '"' +
          (done(item.id) ? ' checked' : '') + '>' +
          '<span><span class="ck-item__text">' + esc(item.text) + '</span>' +
          (item.note ? '<span class="ck-item__note">' + esc(item.note) + '</span>' : '') +
          meta +
          '</span></label>' + toolsHTML(item) + '</li>';
      });
      html += '</ul></div>';
    });

    return html + '</div></details>';
  }

  /* Maps a resource key to its loaded responses, so label stamps stay generic. */
  function resourceState(key) {
    if (key === AUDIT_KEY) return state.audit;
    if (key === CONDUCT_KEY) return state.conduct;
    if (key === RES_KEY) return state.res;
    var pl = planFor(key); if (pl) return state[pl.bucket];
    return null;
  }

  /* The resource that evidences an item sits with the item itself. */
  function toolsHTML(item) {
    if (!item.tools || !item.tools.length) return '';
    var links = item.tools.map(function (t) {
      /* Anything that lives inside the portal opens as a view, not a URL. Keyed off
         the presence of t.resource rather than off a specific key, so adding a third
         interactive resource does not silently render href="undefined". */
      if (t.resource) {
        var bucket = resourceState(t.resource);
        var stamp = bucket && bucket._submitted;
        var label = stamp && stamp.value
          ? esc(t.label) + ' \u2014 submitted ' + esc(fmtDate(stamp.value))
          : esc(t.label);
        return '<button class="step__tool" type="button" data-open-resource="' +
               esc(t.resource) + '">' + label + '</button>';
      }
      if (!t.href) return '';
      return '<a class="step__tool" href="' + esc(t.href) + '">' + esc(t.label) + '</a>';
    }).join('');
    if (!links) return '';
    return '<div class="ck-item__tools">' + links + '</div>';
  }

  /* ---------- safeguarding audit ---------- */
  function auditVal(id) {
    var r = state.audit[id];
    return r ? r.value : '';
  }

  function auditTally() {
    var t = { in_place: 0, in_progress: 0, not_in_place: 0, answered: 0, total: 0 };
    Audit.sections.forEach(function (sec) {
      sec.items.forEach(function (item) {
        t.total++;
        var v = auditVal(item.id);
        if (v && t.hasOwnProperty(v)) { t[v]++; t.answered++; }
      });
    });
    return t;
  }

  function auditSummaryText(t) {
    return '<strong>' + t.answered + ' of ' + t.total + '</strong> standards reviewed' +
           ' &middot; ' + t.in_place + ' in place &middot; ' + t.in_progress + ' in progress' +
           ' &middot; ' + t.not_in_place + ' not in place';
  }

  /* ---------- safeguarding audit: Word export ---------- */

  var AUDIT_LABEL = {
    in_place: 'In place',
    in_progress: 'In progress',
    not_in_place: 'Not in place'
  };

  /* Anything not fully in place is what the organisation actually has to act on,
     so the export ends with those rows gathered into one list. An audit that only
     records a score gives a board nothing to do; this gives them the work. */
  function auditGaps() {
    var gaps = [];
    Audit.sections.forEach(function (sec) {
      sec.items.forEach(function (item) {
        var v = auditVal(item.id);
        if (v === 'in_progress' || v === 'not_in_place') {
          gaps.push({ section: sec.title, text: item.text, status: AUDIT_LABEL[v] });
        }
      });
    });
    return gaps;
  }

  function auditBlocks() {
    var t = auditTally();
    var blocks = [];

    var detail = Audit.fields.map(function (f) {
      return [{ text: f.label, rPr: { b: true } }, { text: auditVal(f.id) || '—' }];
    });
    blocks.push({ t: 'table', cols: [2900, 6460], rows: detail });

    blocks.push({ t: 'h', text: 'Summary' });
    blocks.push({ t: 'table', cols: [2340, 2340, 2340, 2340],
      head: [{ text: 'Reviewed' }, { text: 'In place' },
             { text: 'In progress' }, { text: 'Not in place' }],
      rows: [[
        { text: t.answered + ' of ' + t.total },
        { text: String(t.in_place) },
        { text: String(t.in_progress) },
        { text: String(t.not_in_place), rPr: t.not_in_place ? { b: true } : null }
      ]]
    });

    Audit.sections.forEach(function (sec, i) {
      blocks.push({ t: 'section', n: i + 1, title: sec.title.replace(/^Section\s*\d+\s*·\s*/, '') });
      blocks.push({
        t: 'table', cols: [7160, 2200],
        head: [{ text: 'Standard' }, { text: 'Status' }],
        rows: sec.items.map(function (item) {
          var v = auditVal(item.id);
          var gap = v === 'not_in_place';
          return [
            { text: item.text },
            { text: v ? AUDIT_LABEL[v] : 'Not reviewed',
              rPr: gap ? { b: true } : null,
              shade: gap ? 'F6E9E8' : (v ? null : 'F6F6F4') }
          ];
        })
      });
    });

    var gaps = auditGaps();
    blocks.push({ t: 'section', n: Audit.sections.length + 1, title: 'Action plan', pageBreak: true });
    if (!gaps.length) {
      blocks.push({ t: 'p', html: t.answered === t.total
        ? 'Every standard was recorded as in place at the time of this audit.'
        : 'No gaps were recorded. Standards still marked as not reviewed should be completed before this audit is signed off.' });
    } else {
      blocks.push({ t: 'p', html: 'The standards below were not fully in place at the time of this audit. ' +
        'Assign an owner and a target date to each one.' });
      blocks.push({
        t: 'table', cols: [4300, 1500, 1800, 1760],
        head: [{ text: 'Standard' }, { text: 'Status' }, { text: 'Owner' }, { text: 'Target date' }],
        rows: gaps.map(function (g) {
          return [
            { text: g.text },
            { text: g.status, rPr: g.status === 'Not in place' ? { b: true } : null },
            { text: '' }, { text: '' }
          ];
        })
      });
    }

    blocks.push({ t: 'section', n: Audit.sections.length + 2, title: 'Sign-off' });
    blocks.push({ t: 'table', cols: [2900, 6460],
      rows: Audit.signoff.map(function (f) {
        return [{ text: f.label, rPr: { b: true } }, { text: auditVal(f.id) || '—' }];
      })
    });
    blocks.push({ t: 'note', text: 'Complete this audit annually, and again after any safeguarding incident.' });

    return blocks;
  }

  function doAuditWord() {
    if (!window.MHG_DOCX) { toast('The Word exporter did not load.'); return; }
    try {
      var org = auditVal('org_name') || (state.session.org ? state.session.org.name : '');
      var stamp = state.audit._submitted && state.audit._submitted.value;
      var blob = MHG_DOCX.build({
        title: Audit.title,
        org: org,
        adopted: stamp ? 'Submitted ' + fmtDate(stamp) : 'Draft — not yet submitted',
        blocks: auditBlocks()
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'safeguarding-audit-' +
        (org || 'organization').toLowerCase().replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') + '.docx';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast('Word document downloaded.');
    } catch (err) {
      toast('Could not build the document: ' + err.message);
    }
  }

  function auditView() {
    var t = auditTally();
    var pct = t.total ? Math.round((t.answered / t.total) * 100) : 0;

    var html = '' +
      '<p class="noprint" style="font-size:.82rem;margin-bottom:1.4rem">' +
        '<button class="linkish" id="back-dash" type="button">&larr; Back to your progress</button></p>' +
      '<section class="portal-hero noprint">' +
        '<p class="eyebrow">Interactive resource</p>' +
        '<h1>' + esc(Audit.title) + '</h1>' +
        '<p class="muted" style="max-width:62ch">' + esc(Audit.intro) + '</p>' +
        '<div class="auditbar">' +
          '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
          '<p class="battery__label" style="margin:.6rem 0 0">' + auditSummaryText(t) + '</p>' +
        '</div>' +
        '<div class="btn-row" style="margin-top:1.3rem">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-print>Print or save as PDF</button>' +
          '<button class="btn btn--ghost btn--sm" id="audit-word" type="button">Download as Word</button>' +
          '<button class="btn btn--ghost btn--sm" id="audit-export" type="button">Export answers</button>' +
        '</div>' +
      '</section>' +

      /* On paper this replaces the screen hero, so the audit reads as a record
         rather than as a tool someone was using. */
      '<header class="cdoc__head printonly">' +
        '<h1>' + esc(auditVal('org_name') ||
          (state.session.org ? state.session.org.name : 'Your organization')) + '</h1>' +
        '<p>' + esc(Audit.title) + '</p>' +
        '<p class="cdoc__tally">' + auditSummaryText(t) + '</p></header>' +

      '<section class="portal-section"><h2>Organization information</h2>' +
        '<div class="auditfields">';
    Audit.fields.forEach(function (f) {
      html += '<label class="auditfield"><span>' + esc(f.label) + '</span>' +
              '<input type="' + (f.type || 'text') + '" data-audit-field="' + esc(f.id) + '" ' +
              'value="' + esc(auditVal(f.id)) + '"></label>';
    });
    html += '</div></section>';

    Audit.sections.forEach(function (sec) {
      var reviewed = sec.items.filter(function (i) { return auditVal(i.id); }).length;
      html += '<section class="portal-section audit-sec">' +
        '<div class="ck-group__head"><h2 style="margin:0">' + esc(sec.title) + '</h2>' +
        '<span class="ck-group__count">' + reviewed + ' of ' + sec.items.length + ' reviewed</span></div>' +
        '<ul class="auditlist">';
      sec.items.forEach(function (item) {
        var v = auditVal(item.id);
        html += '<li class="audititem' + (v ? ' is-answered' : '') + '" data-item="' + esc(item.id) + '">' +
          '<p class="audititem__text">' + esc(item.text) + '</p>' +
          '<div class="audititem__opts" role="radiogroup" aria-label="' + esc(item.text) + '">';
        Audit.options.forEach(function (opt) {
          html += '<label class="opt opt--' + opt.value + '">' +
            '<input type="radio" name="' + esc(item.id) + '" value="' + opt.value + '"' +
            (v === opt.value ? ' checked' : '') + ' data-audit-item="' + esc(item.id) + '">' +
            '<span>' + esc(opt.label) + '</span></label>';
        });
        html += '</div></li>';
      });
      html += '</ul></section>';
    });

    html += '<section class="portal-section"><h2>Action planning</h2>' +
      '<p class="muted" style="font-size:.9rem;max-width:60ch">For each standard not yet in place, ' +
      'record what needs to happen, who owns it and by when.</p>' +
      '<div class="table-scroll"><table class="dotable"><thead><tr>' +
        '<th>Gap identified</th><th>Action required</th><th>Responsible</th><th>Target date</th>' +
      '</tr></thead><tbody>';
    for (var r = 1; r <= 6; r++) {
      html += '<tr>';
      ['gap', 'action', 'owner', 'due'].forEach(function (col) {
        var id = 'plan_' + r + '_' + col;
        html += '<td><input class="cellinput" type="' + (col === 'due' ? 'date' : 'text') + '" ' +
                'data-audit-field="' + id + '" value="' + esc(auditVal(id)) + '"' +
                ' aria-label="Row ' + r + ' ' + col + '"></td>';
      });
      html += '</tr>';
    }
    html += '</tbody></table></div></section>';

    html += '<section class="portal-section"><h2>Review and sign-off</h2><div class="auditfields">';
    Audit.signoff.forEach(function (f) {
      html += '<label class="auditfield"><span>' + esc(f.label) + '</span>' +
              '<input type="' + (f.type || 'text') + '" data-audit-field="' + esc(f.id) + '" ' +
              'value="' + esc(auditVal(f.id)) + '"></label>';
    });
    html += '</div></section>';

    var remaining = t.total - t.answered;
    var submitted = state.audit._submitted && state.audit._submitted.value;
    html += '<section class="portal-section auditdone">' +
      '<h2>Finish up</h2>' +
      (submitted
        ? '<p class="auditdone__stamp">Submitted ' + esc(fmtDate(submitted)) +
          '. You can keep editing \u2014 this stays a living document.</p>'
        : '') +
      '<p class="muted" style="font-size:.9rem;max-width:58ch">Answers save as you make them. ' +
        'Submitting records the audit as complete and moves Safeguarding up the ladder.</p>' +
      '<div class="btn-row" style="margin-top:1.2rem">' +
        '<button class="btn" id="audit-submit" type="button"' + (remaining ? ' disabled' : '') + '>' +
          (submitted ? 'Submit again' : 'Submit audit') + '</button>' +
        '<button class="btn btn--ghost" id="audit-later" type="button">Save and finish later</button>' +
      '</div>' +
      '<p class="auditdone__remaining"' + (remaining ? '' : ' hidden') + '>' +
        (remaining ? remaining + ' standard' + (remaining === 1 ? '' : 's') +
         ' still to review before you can submit.' : '') + '</p>' +
    '</section>';

    return html;
  }

  /* Patch the audit's counters in place so a click keeps focus and scroll. */
  function updateAuditUI(changedId) {
    var t = auditTally();
    var pct = t.total ? Math.round((t.answered / t.total) * 100) : 0;

    var bar = root.querySelector('.auditbar .bar > i');
    if (bar) bar.style.width = pct + '%';

    var label = root.querySelector('.auditbar .battery__label');
    if (label) label.innerHTML = auditSummaryText(t);

    if (changedId) {
      var li = root.querySelector('.audititem[data-item="' + changedId + '"]');
      if (li) li.classList.add('is-answered');
    }

    var submitBtn = document.getElementById('audit-submit');
    if (submitBtn) submitBtn.disabled = (t.answered < t.total);

    var rem = root.querySelector('.auditdone__remaining');
    if (rem) {
      var left = t.total - t.answered;
      rem.hidden = !left;
      if (left) {
        rem.textContent = left + ' standard' + (left === 1 ? '' : 's') +
                          ' still to review before you can submit.';
      }
    }

    var secs = root.querySelectorAll('.audit-sec');
    Audit.sections.forEach(function (sec, i) {
      if (!secs[i]) return;
      var reviewed = sec.items.filter(function (it) { return auditVal(it.id); }).length;
      var count = secs[i].querySelector('.ck-group__count');
      if (count) count.textContent = reviewed + ' of ' + sec.items.length + ' reviewed';
    });
  }

  function goDashboard() {
    state.view = 'dashboard';
    history.replaceState(null, '', 'portal.html');
    render();
    window.scrollTo(0, 0);
  }

  /* ---------- code of conduct ---------- */
  function cVal(id) {
    var r = state.conduct[id];
    return r && r.value !== undefined && r.value !== null ? String(r.value) : '';
  }

  /* Replace {{field}} tokens with inline inputs. The surrounding prose is
     trusted content from our own data file; field values are escaped. */
  function inlineFields(text) {
    return text.replace(/\{\{(\w+)\}\}/g, function (_, id) {
      var f = (Conduct.fields || {})[id] || {};
      var v = cVal(id);
      return '<span class="cf' + (v ? ' is-set' : '') + '">' +
        '<input type="text" data-conduct-field="' + esc(id) + '"' +
        ' size="' + (f.wide ? 46 : 28) + '"' +
        ' value="' + esc(v) + '"' +
        ' placeholder="' + esc(f.placeholder || '') + '"' +
        ' aria-label="' + esc(f.label || id) + '">' +
        '<span class="cf__print">' + (v ? esc(v) : '&nbsp;') + '</span>' +
        '</span>';
    });
  }

  /* The finished policy, with every choice already made and every field filled.
     Both the Word export and (conceptually) the printed page are this same
     document; keeping the resolution in one place is what stops the two from
     saying different things about what the organisation actually adopted. */
  function adoptedLine() {
    var stamp = state.conduct._submitted && state.conduct._submitted.value;
    return stamp ? 'Adopted ' + fmtDate(stamp) : 'Draft \u2014 not yet adopted';
  }

  function conductResolved() {
    var out = [];
    Conduct.sections.forEach(function (sec, i) {
      out.push({ t: 'section', n: i + 1, title: sec.title, pageBreak: !!sec.pageBreak });
      sec.blocks.forEach(function (b) {
        if (b.t === 'p') out.push({ t: 'p', html: fillFields(b.text) });
        else if (b.t === 'principle') out.push({ t: 'principle', html: fillFields(b.text) });
        else if (b.t === 'h') out.push({ t: 'h', text: b.text });
        else if (b.t === 'note') out.push({ t: 'note', text: b.text });
        else if (b.t === 'ul') {
          out.push({ t: 'ul', items: b.items.map(fillFields) });
        } else if (b.t === 'choice') {
          var picked = null;
          b.options.forEach(function (o) { if (cVal(b.id) === o.v) picked = o; });
          if (picked) out.push({ t: 'p', html: fillFields(picked.text) });
          else out.push({ t: 'warn', text: '[ ' + b.label +
            ' — choose one of the alternatives before circulating this document. ]' });
        } else if (b.t === 'optional') {
          if (cVal(b.id) === 'true') out.push({ t: 'p', html: fillFields(b.text) });
        } else if (b.t === 'sign') {
          out.push({ t: 'sign', rows: b.rows });
        }
      });
    });
    return out;
  }

  /* An unfilled detail becomes a rule to complete by hand, matching the print
     behaviour rather than silently dropping the sentence's subject. */
  function fillFields(text) {
    return text.replace(/\{\{(\w+)\}\}/g, function (_, id) {
      return cVal(id) || '__________________';
    });
  }

  function conductWordName() {
    var org = cVal('org_name') || (state.session.org ? state.session.org.name : 'organization');
    return 'code-of-conduct-' +
      org.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.docx';
  }

  function doConductWord() {
    if (!window.MHG_DOCX) { toast('The Word exporter did not load.'); return; }
    try {
      var stamp = state.conduct._submitted && state.conduct._submitted.value;
      var blob = MHG_DOCX.build({
        title: Conduct.title,
        org: cVal('org_name') || (state.session.org ? state.session.org.name : ''),
        adopted: stamp ? 'Adopted ' + fmtDate(stamp) : 'Draft — not yet adopted',
        blocks: conductResolved()
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = conductWordName();
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast('Word document downloaded.');
    } catch (err) {
      toast('Could not build the document: ' + err.message);
    }
  }

  function conductBlock(b) {
    if (b.t === 'h')  return '<h4 class="cdoc__h">' + b.text + '</h4>';
    if (b.t === 'p')  return '<p>' + inlineFields(b.text) + '</p>';
    if (b.t === 'principle') return '<p class="cdoc__principle">' + b.text + '</p>';
    if (b.t === 'note') return '<p class="cdoc__note">' + b.text + '</p>';
    if (b.t === 'ul') {
      return '<ul>' + b.items.map(function (i) {
        return '<li>' + inlineFields(i) + '</li>';
      }).join('') + '</ul>';
    }
    if (b.t === 'choice') {
      var chosen = cVal(b.id);
      return '<div class="cchoice' + (chosen ? ' is-chosen' : '') + '" data-choice="' + esc(b.id) + '">' +
        '<p class="cchoice__label">' + esc(b.label) + (chosen ? '' : ' <em>— choose one</em>') + '</p>' +
        b.options.map(function (o) {
          var on = chosen === o.v;
          return '<label class="copt' + (on ? ' is-on' : '') + '">' +
            '<input type="radio" name="' + esc(b.id) + '" value="' + esc(o.v) + '"' +
            (on ? ' checked' : '') + ' data-conduct-choice="' + esc(b.id) + '">' +
            '<span>' + o.text + '</span></label>';
        }).join('') +
        '</div>';
    }
    if (b.t === 'optional') {
      var on = cVal(b.id) === 'true';
      return '<div class="coptional' + (on ? ' is-on' : '') + '">' +
        '<label class="copt-toggle"><input type="checkbox" data-conduct-opt="' + esc(b.id) + '"' +
        (on ? ' checked' : '') + '><span>' + esc(b.label) + '</span></label>' +
        '<p class="coptional__text">' + b.text + '</p></div>';
    }
    if (b.t === 'sign') {
      return '<div class="csign">' + b.rows.map(function (row) {
        return row.map(function (lab) {
          return '<div class="csign__cell"><span class="csign__rule"></span>' +
                 '<span class="csign__lab">' + esc(lab) + '</span></div>';
        }).join('');
      }).join('') + '</div>';
    }
    return '';
  }

  function conductProgress() {
    var ids = Object.keys(Conduct.fields || {});
    var choices = [];
    Conduct.sections.forEach(function (sec) {
      sec.blocks.forEach(function (b) { if (b.t === 'choice') choices.push(b.id); });
    });
    var total = ids.length + choices.length;
    var done = ids.filter(function (i) { return cVal(i).trim(); }).length +
               choices.filter(function (i) { return cVal(i); }).length;
    return { done: done, total: total, left: total - done };
  }

  function conductView() {
    var pr = conductProgress();
    var pct = pr.total ? Math.round((pr.done / pr.total) * 100) : 0;
    var submitted = state.conduct._submitted && state.conduct._submitted.value;
    var orgLine = cVal('org_name') || (state.session.org ? state.session.org.name : '');

    var html = '' +
      '<p class="noprint" style="font-size:.82rem;margin-bottom:1.4rem">' +
        '<button class="linkish" id="back-dash" type="button">&larr; Back to your progress</button></p>' +

      '<section class="portal-hero noprint">' +
        '<p class="eyebrow">Interactive resource</p>' +
        '<h1>' + esc(Conduct.title) + '</h1>' +
        '<p class="muted" style="max-width:62ch">' + esc(Conduct.intro) + '</p>' +
        '<div class="auditbar">' +
          '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
          '<p class="battery__label" style="margin:.6rem 0 0" id="cdoc-count">' +
            '<strong>' + pr.done + ' of ' + pr.total + '</strong> details completed</p>' +
        '</div>' +
        '<div class="btn-row" style="margin-top:1.3rem">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-print>Print or save as PDF</button>' +
          '<button class="btn btn--ghost btn--sm" id="conduct-word" type="button">Download as Word</button>' +
          '<button class="btn btn--ghost btn--sm" id="conduct-export" type="button">Export answers</button>' +
        '</div>' +
      '</section>' +

      '<div class="cdoc">' +
      '<div class="cdoc__runhead"><span>' + esc(orgLine || 'Your organization') + '</span>' +
        '<span>' + esc(Conduct.title) + '</span></div>' +
      '<div class="cdoc__runfoot"><span>' + esc(adoptedLine()) + '</span>' +
        '<span>Mental Health Guidelines for Youth Sport</span></div>' +
      '<header class="cdoc__head"><h1>' + esc(orgLine || 'Your organization') + '</h1>' +
        '<p>' + esc(Conduct.title) + '</p></header>';

    Conduct.sections.forEach(function (sec, i) {
      html += '<section class="cdoc__sec' + (sec.pageBreak ? ' cdoc__sec--break' : '') + '">' +
        '<h3><span class="cdoc__num">' + (i + 1) + '</span>' + esc(sec.title) + '</h3>' +
        sec.blocks.map(conductBlock).join('') +
        '</section>';
    });

    html += '</div>';

    html += '<section class="portal-section auditdone noprint">' +
      '<h2>Finish up</h2>' +
      (submitted
        ? '<p class="auditdone__stamp">Adopted ' + esc(fmtDate(submitted)) +
          '. You can keep editing \u2014 this stays a living document.</p>' : '') +
      '<p class="muted" style="font-size:.9rem;max-width:58ch">Answers save as you type. Adopting ' +
        'records the code as complete and moves Safeguarding up the ladder.</p>' +
      '<div class="btn-row" style="margin-top:1.2rem">' +
        '<button class="btn" id="conduct-submit" type="button"' + (pr.left ? ' disabled' : '') + '>' +
          (submitted ? 'Adopt again' : 'Adopt this code') + '</button>' +
        '<button class="btn btn--ghost" id="conduct-later" type="button">Save and finish later</button>' +
      '</div>' +
      '<p class="auditdone__remaining"' + (pr.left ? '' : ' hidden') + '>' +
        (pr.left ? pr.left + ' detail' + (pr.left === 1 ? '' : 's') + ' still to complete before you can adopt it.' : '') +
      '</p></section>';

    return html;
  }

  function updateConductUI() {
    var pr = conductProgress();
    var bar = root.querySelector('.auditbar .bar > i');
    if (bar) bar.style.width = (pr.total ? Math.round(pr.done / pr.total * 100) : 0) + '%';
    var c = document.getElementById('cdoc-count');
    if (c) c.innerHTML = '<strong>' + pr.done + ' of ' + pr.total + '</strong> details completed';
    var btn = document.getElementById('conduct-submit');
    if (btn) btn.disabled = pr.left > 0;
    var rem = root.querySelector('.auditdone__remaining');
    if (rem) {
      rem.hidden = !pr.left;
      if (pr.left) rem.textContent = pr.left + ' detail' + (pr.left === 1 ? '' : 's') +
                                     ' still to complete before you can adopt it.';
    }
    var head = root.querySelector('.cdoc__head h1');
    if (head) head.textContent = cVal('org_name') || (state.session.org ? state.session.org.name : 'Your organization');
  }

  /* ---------- rendering ---------- */
  /* Shown when a resource is requested but its <script> did not load. */
  function missingResourceView(key) {
    var file = key === AUDIT_KEY ? 'assets/js/portal/audit-data.js'
             : key === RES_KEY   ? 'assets/js/portal/resources-data.js'
             : planFor(key)      ? 'assets/js/portal/' + key + '-data.js'
                                 : 'assets/js/portal/conduct-data.js';
    return '<div class="panel panel--alert">' +
      '<h2 style="margin-top:0">This resource could not be opened</h2>' +
      '<p>The portal loaded, but <code>' + esc(file) + '</code> did not. ' +
      'That file defines the form, so there is nothing to show.</p>' +
      '<p style="margin-bottom:0">Usually this is a cached copy of an older page: ' +
      'reload with <strong>Cmd-Shift-R</strong> (or Ctrl-Shift-R). If it persists, the ' +
      'file is missing from the server, or the page was opened from the file system ' +
      'rather than through the local server.</p>' +
      '<p><button class="btn btn--ghost btn--sm" id="back-dash" type="button">' +
      'Back to your progress</button></p></div>';
  }

  /* ---------- local resources ---------- */
  function rVal(id) { var r = state.res[id]; return r ? r.value : ''; }

  function rFieldId(g, i, c) { return g + (i + 1) + '_' + c; }

  /* A row only counts as filled when it has both a name and a way to reach it;
     a name with no number is exactly the entry that fails in a crisis. */
  function resTally() {
    var done = 0, total = 0;
    Res.groups.forEach(function (g) {
      for (var i = 0; i < g.rows; i++) {
        total++;
        if (rVal(rFieldId(g.id, i, 'name')) && rVal(rFieldId(g.id, i, 'contact'))) done++;
      }
    });
    return { done: done, total: total };
  }

  function resInput(id, label, wide) {
    return '<input type="text" data-res="' + esc(id) + '" value="' + esc(rVal(id)) + '"' +
           ' aria-label="' + esc(label) + '"' + (wide ? ' class="is-wide"' : '') + '>';
  }

  function resView() {
    var t = resTally();
    var pct = t.total ? Math.round((t.done / t.total) * 100) : 0;
    var org = rVal('org_name') || (state.session.org ? state.session.org.name : '');

    var html = '' +
      '<p class="noprint" style="font-size:.82rem;margin-bottom:1.4rem">' +
        '<button class="linkish" id="back-dash" type="button">&larr; Back to your progress</button></p>' +

      '<section class="portal-hero noprint">' +
        '<p class="eyebrow">Interactive resource</p>' +
        '<h1>' + esc(Res.title) + '</h1>' +
        '<p class="muted" style="max-width:62ch">' + esc(Res.intro) + '</p>' +
        '<div class="auditbar">' +
          '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
          '<p class="battery__label" style="margin:.6rem 0 0" id="res-count">' +
            '<strong>' + t.done + ' of ' + t.total + '</strong> contacts recorded</p>' +
        '</div>' +
        '<div class="btn-row" style="margin-top:1.3rem">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-print>Print or save as PDF</button>' +
          '<button class="btn btn--ghost btn--sm" id="res-word" type="button">Download as Word</button>' +
          '<button class="btn btn--ghost btn--sm" id="res-export" type="button">Export answers</button>' +
        '</div>' +
      '</section>' +

      '<header class="cdoc__head printonly">' +
        '<h1>' + esc(org || 'Your organization') + '</h1>' +
        '<p>' + esc(Res.title) + '</p>' +
        '<p class="cdoc__tally">Reviewed ' + esc(rVal('reviewed') || '—') +
        ' · next review ' + esc(rVal('next_review') || '—') + '</p></header>' +

      '<section class="portal-section"><h2>List details</h2><div class="fieldgrid">' +
      Res.header.map(function (f) {
        return '<label class="field"><span>' + esc(f.label) + '</span>' +
          '<input type="' + (f.type || 'text') + '" data-res="' + esc(f.id) + '" value="' +
          esc(rVal(f.id)) + '"></label>';
      }).join('') +
      '</div></section>' +

      '<section class="portal-section"><h2>Always available</h2>' +
      '<p class="muted" style="font-size:.9rem">These are the same everywhere in the US. They are on the list already.</p>' +
      '<table class="doctable"><thead><tr><th style="width:26%">Line</th><th style="width:24%">Contact</th><th>What they handle</th></tr></thead><tbody>' +
      Res.national.map(function (n) {
        return '<tr><td><strong>' + esc(n.name) + '</strong></td><td>' + esc(n.contact) +
               '</td><td>' + esc(n.handles) + '</td></tr>';
      }).join('') + '</tbody></table></section>';

    Res.groups.forEach(function (g) {
      html += '<section class="portal-section"><h2>' + esc(g.title) + '</h2>' +
        '<p class="muted" style="font-size:.9rem">' + esc(g.note) + '</p>' +
        '<table class="doctable doctable--res"><thead><tr>' +
        Res.cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('') +
        '</tr></thead><tbody>';
      for (var i = 0; i < g.rows; i++) {
        html += '<tr>' + Res.cols.map(function (c) {
          var id = rFieldId(g.id, i, c.id);
          var ph = (c.id === 'name' && g.hint[i]) ? g.hint[i] : '';
          return '<td>' + resInput(id, g.title + ' — ' + c.label, c.wide) +
                 (ph ? '<span class="res-hint noprint">' + esc(ph) + '</span>' : '') + '</td>';
        }).join('') + '</tr>';
      }
      html += '</tbody></table></section>';
    });

    html += '<section class="portal-section noprint"><div class="btn-row">' +
      '<button class="btn" id="res-done" type="button">Save and return</button>' +
      '</div></section>';

    return html;
  }

  function updateResUI() {
    var t = resTally();
    var el = document.getElementById('res-count');
    if (el) el.innerHTML = '<strong>' + t.done + ' of ' + t.total + '</strong> contacts recorded';
    var bar = document.querySelector('.auditbar .bar i');
    if (bar) bar.style.width = (t.total ? Math.round((t.done / t.total) * 100) : 0) + '%';
  }

  function resBlocks() {
    var blocks = [];
    blocks.push({ t: 'table', cols: [3000, 6360],
      rows: Res.header.map(function (f) {
        return [{ text: f.label, rPr: { b: true } }, { text: rVal(f.id) || '—' }];
      }) });

    blocks.push({ t: 'section', n: null, title: 'Always available' });
    blocks.push({ t: 'table', cols: [2600, 2400, 4360],
      head: [{ text: 'Line' }, { text: 'Contact' }, { text: 'What they handle' }],
      rows: Res.national.map(function (n) {
        return [{ text: n.name, rPr: { b: true } }, { text: n.contact }, { text: n.handles }];
      }) });

    Res.groups.forEach(function (g) {
      blocks.push({ t: 'section', n: null, title: g.title });
      var rows = [];
      for (var i = 0; i < g.rows; i++) {
        var name = rVal(rFieldId(g.id, i, 'name'));
        if (!name && !rVal(rFieldId(g.id, i, 'contact'))) continue;
        rows.push(Res.cols.map(function (c) {
          return { text: rVal(rFieldId(g.id, i, c.id)) };
        }));
      }
      if (!rows.length) {
        blocks.push({ t: 'warn', text: '[ Nothing recorded for ' + g.title.toLowerCase() +
          ' — complete this before circulating the list. ]' });
      } else {
        blocks.push({ t: 'table', cols: [3000, 2000, 2200, 2160],
          head: Res.cols.map(function (c) { return { text: c.label }; }),
          rows: rows });
      }
    });
    return blocks;
  }

  function mheapBlocks() {
    var blocks = [];
    blocks.push({ t: 'table', cols: [3000, 6360],
      rows: P.data.header.map(function (f) {
        return [{ text: f.label, rPr: { b: true } }, { text: mVal(f.id) || '—' }];
      }) });

    function fill(text) {
      return text.replace(/\{\{(\w+)\}\}/g, function (_, id) { return mVal(id) || '__________'; })
                 .replace(/&nbsp;/g, ' ');
    }

    P.data.sections.forEach(function (sec) {
      blocks.push({ t: 'section', n: sec.n, title: sec.title, pageBreak: !!sec.pageBreak });
      sec.blocks.forEach(function (b) {
        if (b.t === 'h') blocks.push({ t: 'h', text: b.text });
        else if (b.t === 'p') blocks.push({ t: 'p', html: fill(b.text) });
        else if (b.t === 'note') blocks.push({ t: 'note', text: fill(b.text) });
        else if (b.t === 'ul') blocks.push({ t: 'ul', items: b.items });
        else if (b.t === 'sign') blocks.push({ t: 'sign', rows: b.rows });
        else if (b.t === 'table') {
          var n = b.cols.length;
          var w = [], each = Math.floor(9360 / n);
          for (var i = 0; i < n; i++) w.push(each);
          w[0] += 9360 - each * n;
          blocks.push({ t: 'table', cols: w,
            head: b.cols.map(function (c) { return { text: c }; }),
            rows: b.rows.map(function (label, r) {
              var cells = [{ text: label, rPr: { b: true } }];
              for (var c = 1; c < n; c++) {
                var fixed = b.fixedCols && b.fixedCols[c] ? b.fixedCols[c][r] : null;
                var pre = (b.prefill && b.prefill[r] !== undefined && c === 1) ? b.prefill[r] : null;
                var val = (fixed !== null && fixed !== undefined) ? fixed
                        : (pre !== null ? pre : mVal(mCell(b.id, r, c)));
                cells.push({ text: val });
              }
              return cells;
            }) });
        }
      });
    });

    var card = P.data.card;
    if (!card) return blocks;
    blocks.push({ t: 'section', n: null, title: card.title, pageBreak: true });
    blocks.push({ t: 'p', html: '<strong>' + card.lead + '</strong>' });
    blocks.push({ t: 'ol', items: card.steps });
    blocks.push({ t: 'principle', html: card.closing });
    blocks.push({ t: 'h', text: 'Emergency contacts' });
    blocks.push({ t: 'ul', items: card.contacts.map(function (c) {
      return c.fixed ? c.fixed : c.label + ': ' + (mVal(c.id) || '__________');
    }) });
    return blocks;
  }

  function doMheapWord() {
    if (!window.MHG_DOCX) { toast('The Word exporter did not load.'); return; }
    try {
      var org = mVal('org_name') || (state.session.org ? state.session.org.name : '');
      var blob = MHG_DOCX.build({
        title: P.data.title, org: org,
        adopted: mVal('updated') ? 'Last updated ' + mVal('updated') : 'Draft',
        blocks: mheapBlocks()
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = P.key + '-' + (org || 'organization').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.docx';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast('Word document downloaded.');
    } catch (err) { toast('Could not build the document: ' + err.message); }
  }

  function doResWord() {
    if (!window.MHG_DOCX) { toast('The Word exporter did not load.'); return; }
    try {
      var org = rVal('org_name') || (state.session.org ? state.session.org.name : '');
      var blob = MHG_DOCX.build({
        title: Res.title, org: org,
        adopted: rVal('reviewed') ? 'Reviewed ' + rVal('reviewed') : 'Not yet reviewed',
        blocks: resBlocks()
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'local-mental-health-contacts-' +
        (org || 'organization').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.docx';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast('Word document downloaded.');
    } catch (err) { toast('Could not build the document: ' + err.message); }
  }

  /* ---------- mental health emergency action plan ---------- */
  function mVal(id) { var r = state[P.bucket][id]; return r ? r.value : ''; }
  function mCell(tid, row, col) { return tid + '_' + row + '_' + col; }

  function mheapFields() {
    var ids = [];
    P.data.header.forEach(function (f) { ids.push(f.id); });
    P.data.sections.forEach(function (sec) {
      sec.blocks.forEach(function (b) {
        if (b.t === 'table') {
          b.rows.forEach(function (_, r) {
            for (var c = 1; c < b.cols.length; c++) {
              if (b.prefill && b.prefill[r] !== undefined && c === 1) continue;
              if (b.fixedCols && b.fixedCols[c]) continue;
              ids.push(mCell(b.id, r, c));
            }
          });
        } else if (b.text) {
          (b.text.match(/\{\{(\w+)\}\}/g) || []).forEach(function (t) {
            ids.push(t.slice(2, -2));
          });
        }
      });
    });
    if (P.data.card) P.data.card.contacts.forEach(function (c) { if (c.id) ids.push(c.id); });
    return ids;
  }

  function mheapTally() {
    var ids = mheapFields(), done = 0;
    ids.forEach(function (id) { if (mVal(id)) done++; });
    return { done: done, total: ids.length };
  }

  function mInput(id, label) {
    return '<input type="text" data-mheap="' + esc(id) + '" value="' + esc(mVal(id)) +
           '" aria-label="' + esc(label) + '">';
  }

  function mFill(text) {
    return text.replace(/\{\{(\w+)\}\}/g, function (_, id) {
      return '<span class="cf' + (mVal(id) ? ' is-set' : '') + '">' +
             '<input type="text" data-mheap="' + esc(id) + '" size="30" value="' + esc(mVal(id)) +
             '" aria-label="' + esc(id.replace(/_/g, ' ')) + '">' +
             '<span class="cf__print">' + (mVal(id) ? esc(mVal(id)) : '&nbsp;') + '</span></span>';
    });
  }

  function mBlock(b) {
    if (b.t === 'h') return '<h4 class="cdoc__h">' + b.text + '</h4>';
    if (b.t === 'p') return '<p>' + mFill(b.text) + '</p>';
    if (b.t === 'note') return '<p class="cdoc__note">' + mFill(b.text) + '</p>';
    if (b.t === 'ul') return '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
    if (b.t === 'sign') {
      return '<div class="csign">' + b.rows.map(function (row) {
        return row.map(function (lab) {
          return '<div class="csign__cell"><span class="csign__rule"></span>' +
                 '<span class="csign__lab">' + esc(lab) + '</span></div>';
        }).join('');
      }).join('') + '</div>';
    }
    if (b.t === 'table') {
      return '<table class="doctable doctable--res"><thead><tr>' +
        b.cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') +
        '</tr></thead><tbody>' +
        b.rows.map(function (label, r) {
          var cells = '<td><strong>' + label + '</strong></td>';
          for (var c = 1; c < b.cols.length; c++) {
            var fixed = b.fixedCols && b.fixedCols[c] ? b.fixedCols[c][r] : null;
            var pre = (b.prefill && b.prefill[r] !== undefined && c === 1) ? b.prefill[r] : null;
            var val = fixed !== null && fixed !== undefined ? fixed : pre;
            cells += '<td>' + (val !== null && val !== undefined ? val
                     : mInput(mCell(b.id, r, c), b.cols[c] + ' for ' + label)) + '</td>';
          }
          return '<tr>' + cells + '</tr>';
        }).join('') +
        '</tbody></table>';
    }
    return '';
  }

  function mheapView() {
    var t = mheapTally();
    var pct = t.total ? Math.round((t.done / t.total) * 100) : 0;
    var org = mVal('org_name') || (state.session.org ? state.session.org.name : '');

    var html = '' +
      '<p class="noprint" style="font-size:.82rem;margin-bottom:1.4rem">' +
        '<button class="linkish" id="back-dash" type="button">&larr; Back to your progress</button></p>' +

      '<section class="portal-hero noprint">' +
        '<p class="eyebrow">Interactive resource</p>' +
        '<h1>' + esc(P.data.title) + '</h1>' +
        '<p class="muted" style="max-width:62ch">' + esc(P.data.intro) + '</p>' +
        '<div class="auditbar"><div class="bar"><i style="width:' + pct + '%"></i></div>' +
        '<p class="battery__label" style="margin:.6rem 0 0" id="mheap-count">' +
        '<strong>' + t.done + ' of ' + t.total + '</strong> details completed</p></div>' +
        '<div class="btn-row" style="margin-top:1.3rem">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-print>Print or save as PDF</button>' +
          '<button class="btn btn--ghost btn--sm" id="mheap-word" type="button">Download as Word</button>' +
          '<button class="btn btn--ghost btn--sm" id="mheap-export" type="button">Export answers</button>' +
        '</div>' +
      '</section>' +

      '<header class="cdoc__head printonly"><h1>' + esc(org || 'Your organization') + '</h1>' +
        '<p>' + esc(P.data.title) + '</p></header>' +

      '<section class="portal-section"><h2>Plan details</h2><div class="fieldgrid">' +
      P.data.header.map(function (f) {
        return '<label class="field"><span>' + esc(f.label) + '</span>' +
          '<input type="' + (f.type || 'text') + '" data-mheap="' + esc(f.id) + '" value="' +
          esc(mVal(f.id)) + '"></label>';
      }).join('') + '</div></section>' +

      '<div class="cdoc">';

    P.data.sections.forEach(function (sec) {
      html += '<section class="cdoc__sec' + (sec.pageBreak ? ' cdoc__sec--break' : '') + '">' +
        '<h3><span class="cdoc__num">' + sec.n + '</span>' + esc(sec.title) + '</h3>' +
        sec.blocks.map(mBlock).join('') + '</section>';
    });

    var card = P.data.card;
    if (card) html += '<section class="cdoc__sec cdoc__sec--break mheap-card">' +
      '<h3><span class="cdoc__num">&starf;</span>' + esc(card.title) + '</h3>' +
      '<p><strong>' + esc(card.lead) + '</strong></p><ol>' +
      card.steps.map(function (s2) { return '<li>' + s2 + '</li>'; }).join('') + '</ol>' +
      '<p class="cdoc__principle">' + esc(card.closing) + '</p>' +
      '<h4 class="cdoc__h">Emergency contacts</h4><ul>' +
      card.contacts.map(function (c) {
        return '<li>' + (c.fixed ? c.fixed : esc(c.label) + ': ' + mFill('{{' + c.id + '}}')) + '</li>';
      }).join('') + '</ul></section>';

    html += '</div>' +
      '<section class="portal-section noprint"><div class="btn-row">' +
      '<button class="btn" id="mheap-done" type="button">Save and return</button></div></section>';

    return html;
  }

  function updateMheapUI() {
    var t = mheapTally();
    var el = document.getElementById('mheap-count');
    if (el) el.innerHTML = '<strong>' + t.done + ' of ' + t.total + '</strong> details completed';
    var bar = document.querySelector('.auditbar .bar i');
    if (bar) bar.style.width = (t.total ? Math.round((t.done / t.total) * 100) : 0) + '%';
  }

  function render() {
    if (!state.session) { root.innerHTML = signedOutView(); return bind(); }
    if (!state.session.org) { root.innerHTML = needsOrgView(); return bind(); }
    if (state.view === AUDIT_KEY && Audit) root.innerHTML = auditView();
    else if (state.view === CONDUCT_KEY && Conduct) root.innerHTML = conductView();
    else if (state.view === RES_KEY && Res) root.innerHTML = resView();
    else if (planFor(state.view)) { P = planFor(state.view); root.innerHTML = mheapView(); }
    else if (state.view === AUDIT_KEY || state.view === CONDUCT_KEY || state.view === RES_KEY ||
             planFor(state.view)) {
      /* The view was asked for but its data module never loaded. Falling back to the
         dashboard here would look exactly like a click that did nothing, so say so. */
      root.innerHTML = missingResourceView(state.view);
    }
    else root.innerHTML = dashboardView();
    bind();
  }

  /* Patch only the nodes that depend on progress. Re-rendering the whole
     dashboard on every tick would destroy keyboard focus mid-list. */
  function paintBattery(el, stage) {
    if (!el) return;
    Array.prototype.forEach.call(el.querySelectorAll('.battery__seg'), function (seg, i) {
      seg.classList.toggle('is-on', i < stage);
    });
    el.setAttribute('aria-label', 'Programme stage: ' + Ladder.stageName(stage));
  }

  function updateProgress() {
    var stage = Ladder.programStage(GROUPS, done);
    var total = 0, count = 0;
    GROUPS.forEach(function (g) {
      var items = Ladder.allItems(g);
      total += items.length;
      count += items.filter(function (i) { return done(i.id); }).length;
    });

    paintBattery(root.querySelector('.portal-hero .battery'), stage);
    var label = root.querySelector('.battery__label');
    if (label) {
      label.innerHTML = '<strong>' + esc(Ladder.stageName(stage)) + '</strong> &middot; ' +
                        count + ' of ' + total + ' items recorded';
    }

    GROUPS.forEach(function (g) {
      var card = root.querySelector('.gcard[data-guideline="' + g.id + '"]');
      if (!card) return;
      var items = Ladder.allItems(g);
      var d = items.filter(function (x) { return done(x.id); }).length;
      var gs = Ladder.stageOf(g, done);
      paintBattery(card.querySelector('.gcard__bar .battery'), gs);
      card.querySelector('.gcard__stage').textContent = Ladder.stageName(gs);
      card.querySelector('.gcard__count').textContent = d + '/' + items.length;
    });
  }

  /* Show or remove the "recorded by" line under a single item. */
  function updateItemMeta(itemId) {
    var box = root.querySelector('input[data-item="' + itemId + '"]');
    if (!box) return;
    var label = box.nextElementSibling;
    if (!label) return;
    var existing = label.querySelector('.ck-item__meta');
    var r = state.responses[itemId];

    if (r && r.value && r.updated_by) {
      var html = 'Recorded by ' + esc(r.updated_by) +
                 (r.updated_at ? ' &middot; ' + esc(fmtDate(r.updated_at)) : '');
      if (existing) {
        existing.innerHTML = html;
      } else {
        var el = document.createElement('span');
        el.className = 'ck-item__meta';
        el.innerHTML = html;
        label.appendChild(el);
      }
    } else if (existing) {
      existing.parentNode.removeChild(existing);
    }
  }

  function bind() {
    var form = document.getElementById('signin-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var err = document.getElementById('signin-error');
        Store.signIn(document.getElementById('signin-user').value,
                     document.getElementById('signin-pass').value)
          .then(load)
          .catch(function (ex) {
            if (err) { err.textContent = ex.message; err.hidden = false; }
            document.getElementById('signin-pass').value = '';
            document.getElementById('signin-pass').focus();
          });
      });
    }

    var orgForm = document.getElementById('org-form');
    if (orgForm) {
      orgForm.addEventListener('submit', function (e) {
        e.preventDefault();
        Store.createOrg(document.getElementById('org-name').value)
          .then(load)
          .catch(function (err) { toast(err.message); });
      });
    }

    var out = document.getElementById('signout-btn');
    if (out) out.addEventListener('click', function () { Store.signOut().then(load); });

    var sw = document.getElementById('org-switch');
    if (sw) sw.addEventListener('change', function () { Store.switchOrg(sw.value).then(load); });

    var ex = document.getElementById('export-btn');
    if (ex) ex.addEventListener('click', doExport);

    Array.prototype.forEach.call(root.querySelectorAll('[data-open-resource]'), function (btn) {
      btn.addEventListener('click', function () {
        state.view = btn.getAttribute('data-open-resource');
        render();
        /* Cosmetic only, and it throws on a file:// origin. Must not block the view. */
        try {
          history.replaceState(null, '', 'portal.html?resource=' + state.view);
        } catch (e) { /* address bar stays put; the view is what matters */ }
        window.scrollTo(0, 0);
      });
    });

    var back = document.getElementById('back-dash');
    if (back) back.addEventListener('click', goDashboard);

    var aex = document.getElementById('audit-export');
    if (aex) aex.addEventListener('click', doExport);

    /* --- code of conduct --- */
    var saveConduct = function (id, value) {
      return Store.saveResponse(CONDUCT_KEY, id, value)
        .then(function () { return Store.getResponses(CONDUCT_KEY); })
        .then(function (c) { state.conduct = c; updateConductUI(); })
        .catch(function (err) { toast(err.message); });
    };

    Array.prototype.forEach.call(root.querySelectorAll('[data-conduct-field]'), function (input) {
      var timer;
      var persist = function () {
        var wrap = input.parentNode;
        var print = wrap.querySelector('.cf__print');
        if (print) print.innerHTML = input.value ? esc(input.value) : '&nbsp;';
        wrap.classList.toggle('is-set', !!input.value.trim());
        saveConduct(input.getAttribute('data-conduct-field'), input.value);
      };
      input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(persist, 500); });
      input.addEventListener('blur', function () { clearTimeout(timer); persist(); });
    });

    Array.prototype.forEach.call(root.querySelectorAll('[data-conduct-choice]'), function (radio) {
      radio.addEventListener('change', function () {
        var id = radio.getAttribute('data-conduct-choice');
        var box = root.querySelector('.cchoice[data-choice="' + id + '"]');
        if (box) {
          box.classList.add('is-chosen');
          var lab = box.querySelector('.cchoice__label em');
          if (lab) lab.parentNode.removeChild(lab);
          Array.prototype.forEach.call(box.querySelectorAll('.copt'), function (l) {
            l.classList.toggle('is-on', l.contains(radio));
          });
        }
        saveConduct(id, radio.value);
      });
    });

    Array.prototype.forEach.call(root.querySelectorAll('[data-conduct-opt]'), function (box) {
      box.addEventListener('change', function () {
        box.closest('.coptional').classList.toggle('is-on', box.checked);
        saveConduct(box.getAttribute('data-conduct-opt'), box.checked ? 'true' : '');
      });
    });

    var mw = document.getElementById('mheap-word');
    if (mw) mw.addEventListener('click', doMheapWord);

    var mex = document.getElementById('mheap-export');
    if (mex) mex.addEventListener('click', doExport);

    var mdone = document.getElementById('mheap-done');
    if (mdone) mdone.addEventListener('click', goDashboard);

    var mheapTimer = null;
    Array.prototype.forEach.call(root.querySelectorAll('[data-mheap]'), function (inp) {
      function save() {
        Store.saveResponse(P.key, inp.getAttribute('data-mheap'), inp.value)
          .then(function () { return Store.getResponses(P.key); })
          .then(function (m) { state[P.bucket] = m; updateMheapUI(); })
          .catch(function (err) { toast(err.message); });
      }
      inp.addEventListener('input', function () {
        clearTimeout(mheapTimer); mheapTimer = setTimeout(save, 500);
      });
      inp.addEventListener('blur', function () { clearTimeout(mheapTimer); save(); });
    });

    var rw = document.getElementById('res-word');
    if (rw) rw.addEventListener('click', doResWord);

    var rex = document.getElementById('res-export');
    if (rex) rex.addEventListener('click', doExport);

    var rdone = document.getElementById('res-done');
    if (rdone) rdone.addEventListener('click', goDashboard);

    /* Debounced like the conduct fields: saving on every keystroke would write
       far more often than the store needs, and blur catches the last edit. */
    var resTimer = null;
    Array.prototype.forEach.call(root.querySelectorAll('[data-res]'), function (inp) {
      function save() {
        /* saveResponse resolves with the single row, not the map, so re-read
           the resource before refreshing the count. */
        Store.saveResponse(RES_KEY, inp.getAttribute('data-res'), inp.value)
          .then(function () { return Store.getResponses(RES_KEY); })
          .then(function (r) { state.res = r; updateResUI(); })
          .catch(function (err) { toast(err.message); });
      }
      inp.addEventListener('input', function () {
        clearTimeout(resTimer);
        resTimer = setTimeout(save, 500);
      });
      inp.addEventListener('blur', function () { clearTimeout(resTimer); save(); });
    });

    var aw = document.getElementById('audit-word');
    if (aw) aw.addEventListener('click', doAuditWord);

    var cw = document.getElementById('conduct-word');
    if (cw) cw.addEventListener('click', doConductWord);

    var cex = document.getElementById('conduct-export');
    if (cex) cex.addEventListener('click', doExport);

    var cLater = document.getElementById('conduct-later');
    if (cLater) {
      cLater.addEventListener('click', function () {
        goDashboard();
        toast('Saved. Pick it up any time.');
      });
    }

    var cSubmit = document.getElementById('conduct-submit');
    if (cSubmit) {
      cSubmit.addEventListener('click', function () {
        var evidences = itemForResource(CONDUCT_KEY);
        cSubmit.disabled = true;
        Store.saveResponse(CONDUCT_KEY, '_submitted', new Date().toISOString())
          .then(function () { return evidences ? Store.saveResponse(RESOURCE, evidences, true) : null; })
          .then(function () { return Store.getResponses(CONDUCT_KEY); })
          .then(function (c) { state.conduct = c; return Store.getResponses(RESOURCE); })
          .then(function (r) {
            state.responses = r;
            goDashboard();
            toast('Code adopted \u2014 Safeguarding moved up the ladder.');
          })
          .catch(function (err) { cSubmit.disabled = false; toast(err.message); });
      });
    }

    var later = document.getElementById('audit-later');
    if (later) {
      later.addEventListener('click', function () {
        goDashboard();
        toast('Saved. Pick it up any time.');
      });
    }

    var submit = document.getElementById('audit-submit');
    if (submit) {
      submit.addEventListener('click', function () {
        var evidences = itemForResource(AUDIT_KEY);
        submit.disabled = true;
        Store.saveResponse(AUDIT_KEY, '_submitted', new Date().toISOString())
          .then(function () {
            /* finishing the resource ticks the ladder item it evidences */
            return evidences ? Store.saveResponse(RESOURCE, evidences, true) : null;
          })
          .then(function () { return Store.getResponses(AUDIT_KEY); })
          .then(function (a) { state.audit = a; return Store.getResponses(RESOURCE); })
          .then(function (r) {
            state.responses = r;
            goDashboard();
            toast('Audit submitted \u2014 Safeguarding moved up the ladder.');
          })
          .catch(function (err) { submit.disabled = false; toast(err.message); });
      });
    }

    /* radio answers */
    Array.prototype.forEach.call(root.querySelectorAll('input[data-audit-item]'), function (radio) {
      radio.addEventListener('change', function () {
        var id = radio.getAttribute('data-audit-item');
        Store.saveResponse(AUDIT_KEY, id, radio.value)
          .then(function () { return Store.getResponses(AUDIT_KEY); })
          .then(function (r) { state.audit = r; updateAuditUI(id); })
          .catch(function (err) { toast(err.message); });
      });
    });

    /* free-text and date fields — save when the field is left or after a pause */
    Array.prototype.forEach.call(root.querySelectorAll('[data-audit-field]'), function (input) {
      var timer;
      var persist = function () {
        var id = input.getAttribute('data-audit-field');
        Store.saveResponse(AUDIT_KEY, id, input.value)
          .then(function () { return Store.getResponses(AUDIT_KEY); })
          .then(function (r) { state.audit = r; })
          .catch(function (err) { toast(err.message); });
      };
      input.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(persist, 600);
      });
      input.addEventListener('blur', function () { clearTimeout(timer); persist(); });
    });

    Array.prototype.forEach.call(root.querySelectorAll('input[data-item]'), function (box) {
      box.addEventListener('change', function () {
        var id = box.getAttribute('data-item');
        Store.saveResponse(RESOURCE, id, box.checked)
          .then(function () { return Store.getResponses(RESOURCE); })
          .then(function (r) {
            state.responses = r;
            updateItemMeta(id);
            updateProgress();
          })
          .catch(function (err) {
            box.checked = !box.checked;   // roll the UI back if the save failed
            toast(err.message);
          });
      });
    });
  }

  function doExport() {
    Store.exportOrg().then(function (data) {
      if (!data) return;
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      var slug = (data.organization ? data.organization.name : 'organization')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      a.href = url;
      a.download = 'mhg-' + slug + '-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast('Data exported');
    });
  }

  /* ---------- boot ---------- */
  function load() {
    return Store.getSession()
      .then(function (session) {
        state.session = session;
        if (!session) { state.orgs = []; state.responses = {}; return; }
        return Store.listOrgs().then(function (orgs) {
          state.orgs = orgs;
          if (!session.org) return;
          return Store.getResponses(RESOURCE)
            .then(function (r) { state.responses = r; })
            .then(function () { return Store.getResponses(AUDIT_KEY); })
            .then(function (a) { state.audit = a; })
            .then(function () { return Store.getResponses(CONDUCT_KEY); })
            .then(function (c) { state.conduct = c; })
            .then(function () { return Store.getResponses(RES_KEY); })
            .then(function (r) { state.res = r; })
            .then(function () { return Store.getResponses('mheap'); })
            .then(function (m) { state.mheap = m; })
            .then(function () { return Store.getResponses('ctrp'); })
            .then(function (c) { state.ctrp = c; });
        });
      })
      .then(render)
      .catch(function (err) {
        root.innerHTML = '<div class="panel panel--alert"><p style="margin:0">Could not load the ' +
          'portal: ' + esc(err.message) + '</p></div>';
      });
  }

  load();
})();
