/* ==========================================================================
   Portal storage layer.

   THIS FILE IS THE SWAP POINT. Everything above it (app.js) talks only to the
   MHG_STORE interface below, never to localStorage directly. To go live, write
   a Supabase adapter with the same method signatures and change ADAPTER at the
   bottom. No other file needs to change.

   The local adapter deliberately stores ROWS, shaped like the Postgres tables
   they will become:

     organizations (id, name, created_at)
     users         (id, email, name)
     memberships   (user_id, org_id, role)
     responses     (org_id, resource_key, item_key, value, updated_at, updated_by)

   Every method is async and returns a Promise, so call sites already work the
   way a network-backed adapter will.
   ========================================================================== */
window.MHG_STORE = (function () {
  'use strict';

  /* Bumped to v2 when the pilot cohort replaced the invented demo orgs, so a
     browser that already held the old seed picks up the new one. */
  var KEY = 'mhg-portal-v2';

  /* ---------- local persistence helpers ---------- */
  function blank() {
    return { users: [], organizations: [], memberships: [], responses: [], session: null };
  }

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var db = JSON.parse(raw);
      // tolerate a partially-written or older shape
      return {
        users: db.users || [],
        organizations: db.organizations || [],
        memberships: db.memberships || [],
        responses: db.responses || [],
        session: db.session || null
      };
    } catch (e) {
      return blank();
    }
  }

  function write(db) {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* private mode */ }
  }

  function uid(prefix) {
    return prefix + '_' + Math.random().toString(36).slice(2, 10);
  }

  function nowISO() { return new Date().toISOString(); }

  /* ---------- the local adapter ---------- */
  var LocalAdapter = {

    name: 'local',

    /* --- auth -------------------------------------------------------- */

    /* DEMO CREDENTIALS ONLY.
       A username and password checked in client-side JavaScript is a gate, not
       security — anyone can read it in view-source. This exists so partners can
       be walked through the flow. The Supabase adapter replaces it with real
       server-side auth (magic link or password), where the check happens on the
       server and Row Level Security decides what each account may read. */
    DEMO_USER: 'MHG',
    DEMO_PASS: 'DEMO',

    signIn: function (username, password) {
      return Promise.resolve().then(function () {
        var u = String(username || '').trim();
        var p = String(password || '');
        if (!u || !p) throw new Error('Enter both a username and a password.');
        if (u.toUpperCase() !== LocalAdapter.DEMO_USER || p.toUpperCase() !== LocalAdapter.DEMO_PASS) {
          throw new Error('Incorrect username or password.');
        }

        return LocalAdapter._seed().then(function () {
          var db = read();
          var user = db.users[0];
          var mine = db.memberships.filter(function (m) { return m.user_id === user.id; });
          db.session = { user_id: user.id, org_id: mine.length ? mine[0].org_id : null };
          write(db);
          return LocalAdapter.getSession();
        });
      });
    },

    signOut: function () {
      var db = read();
      db.session = null;
      write(db);
      return Promise.resolve(null);
    },

    getSession: function () {
      var db = read();
      if (!db.session) return Promise.resolve(null);
      var user = db.users.filter(function (u) { return u.id === db.session.user_id; })[0];
      if (!user) return Promise.resolve(null);
      var org = db.organizations.filter(function (o) { return o.id === db.session.org_id; })[0] || null;
      return Promise.resolve({ user: user, org: org });
    },

    /* --- organizations ------------------------------------------------ */

    listOrgs: function () {
      var db = read();
      if (!db.session) return Promise.resolve([]);
      var mine = db.memberships
        .filter(function (m) { return m.user_id === db.session.user_id; })
        .map(function (m) { return m.org_id; });
      return Promise.resolve(
        db.organizations.filter(function (o) { return mine.indexOf(o.id) > -1; })
      );
    },

    /* In production, organizations are created by you when inviting a partner,
       not self-served. This exists so the local build has something to work on. */
    createOrg: function (name) {
      return Promise.resolve().then(function () {
        name = String(name || '').trim();
        if (!name) throw new Error('Enter an organization name.');
        var db = read();
        if (!db.session) throw new Error('Not signed in.');
        var org = { id: uid('org'), name: name, created_at: nowISO() };
        db.organizations.push(org);
        db.memberships.push({ user_id: db.session.user_id, org_id: org.id, role: 'admin' });
        db.session.org_id = org.id;
        write(db);
        return org;
      });
    },

    switchOrg: function (orgId) {
      var db = read();
      if (!db.session) return Promise.resolve(null);
      var allowed = db.memberships.some(function (m) {
        return m.user_id === db.session.user_id && m.org_id === orgId;
      });
      if (allowed) { db.session.org_id = orgId; write(db); }
      return LocalAdapter.getSession();
    },

    /* --- responses ---------------------------------------------------- */

    /* Returns { item_key: { value, updated_at, updated_by } } for the current org. */
    getResponses: function (resourceKey) {
      var db = read();
      if (!db.session || !db.session.org_id) return Promise.resolve({});
      var out = {};
      db.responses.forEach(function (r) {
        if (r.org_id === db.session.org_id && r.resource_key === resourceKey) {
          out[r.item_key] = {
            value: r.value,
            updated_at: r.updated_at,
            updated_by: r.updated_by
          };
        }
      });
      return Promise.resolve(out);
    },

    saveResponse: function (resourceKey, itemKey, value) {
      return Promise.resolve().then(function () {
        var db = read();
        if (!db.session || !db.session.org_id) throw new Error('No organization selected.');
        var user = db.users.filter(function (u) { return u.id === db.session.user_id; })[0];
        var row = db.responses.filter(function (r) {
          return r.org_id === db.session.org_id &&
                 r.resource_key === resourceKey &&
                 r.item_key === itemKey;
        })[0];

        if (!row) {
          row = {
            org_id: db.session.org_id,
            resource_key: resourceKey,
            item_key: itemKey,
            value: value,
            updated_at: nowISO(),
            updated_by: user ? user.name : null
          };
          db.responses.push(row);
        } else {
          row.value = value;
          row.updated_at = nowISO();
          row.updated_by = user ? user.name : null;
        }
        write(db);
        return row;
      });
    },

    clearResource: function (resourceKey) {
      var db = read();
      if (!db.session || !db.session.org_id) return Promise.resolve();
      db.responses = db.responses.filter(function (r) {
        return !(r.org_id === db.session.org_id && r.resource_key === resourceKey);
      });
      write(db);
      return Promise.resolve();
    },

    /* --- data portability --------------------------------------------- */

    /* Partners must be able to take their data out. Keep this in the Supabase
       adapter too — it is part of the deletion/export promise. */
    exportOrg: function () {
      var db = read();
      if (!db.session || !db.session.org_id) return Promise.resolve(null);
      var org = db.organizations.filter(function (o) { return o.id === db.session.org_id; })[0];
      return Promise.resolve({
        exported_at: nowISO(),
        organization: org,
        responses: db.responses.filter(function (r) { return r.org_id === db.session.org_id; })
      });
    },

    /* Local-build convenience only; no production equivalent. */
    _reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      return Promise.resolve();
    },

    _seed: function () {
      var db = read();
      if (db.organizations.length && db.users.length) return Promise.resolve(false);
      /* The pilot cohort. These are organization records, not accounts: this
         adapter has one shared gate and stores everything in this browser's
         localStorage, so a per-partner password here would be readable by
         anyone viewing source and would not carry a partner's data to another
         device. Real per-partner sign-in arrives with the hosted backend. */
      var demo = [
        { id: 'org_asphalt_green',   name: 'Asphalt Green',                          url: 'https://www.asphaltgreen.org/', created_at: nowISO() },
        { id: 'org_access_youth',    name: 'Access Youth Academy',                   url: 'https://www.accessyouthacademy.org/', created_at: nowISO() },
        { id: 'org_ceva',            name: 'Columbia Empire Volleyball Association', url: 'https://cevaregion.org/', created_at: nowISO() },
        { id: 'org_gotr',            name: 'Girls on the Run',                       url: 'https://www.girlsontherun.org/', created_at: nowISO() },
        { id: 'org_hearts_of_pine',  name: 'Hearts of Pine',                         url: 'https://www.heartsofpine.com/', created_at: nowISO() },
        { id: 'org_lifesports',      name: 'LiFEsports Summer Camp',                 url: 'https://lifesports.osu.edu/youth-programs/outreach/elementary-middle-school-programs/lifesports-summer-camp/', created_at: nowISO() },
        { id: 'org_oregon_swim',     name: 'Oregon Swimming',                        url: 'https://www.oregonswimming.org/page/home', created_at: nowISO() },
        { id: 'org_coach_beyond',    name: 'Coach Beyond \u2014 Ohio Athletic Association / State Advisory Board', url: 'https://lifesports.osu.edu/coach-beyond/coach-beyond-2/', created_at: nowISO() },
        { id: 'org_tippecanoe',      name: 'Tippecanoe School Corporation',          url: 'https://www.tsc.k12.in.us/', created_at: nowISO() },
        { id: 'org_wichita',         name: 'Wichita Public Schools',                 url: 'https://www.usd259.org/', created_at: nowISO() },
        { id: 'org_squashsmarts',    name: 'SquashSmarts',                           url: 'https://www.squashsmarts.org/', created_at: nowISO() },
        { id: 'org_sea_hpt',         name: 'Squash Education Alliance \u2014 High Performance Team', url: 'https://squashandeducation.org/', created_at: nowISO() }
      ];
      var user = { id: 'usr_demo', email: 'demo@example.org', name: 'Pilot Coordinator' };
      db.organizations = demo;
      db.users = [user];
      db.memberships = demo.map(function (o) {
        return { user_id: user.id, org_id: o.id, role: 'admin' };
      });
      write(db);
      return Promise.resolve(true);
    }
  };

  /* --------------------------------------------------------------------
     To go live: implement SupabaseAdapter with the same methods and set
     ADAPTER to it. Nothing else in the app changes.
     -------------------------------------------------------------------- */
  var ADAPTER = LocalAdapter;

  return ADAPTER;
})();
