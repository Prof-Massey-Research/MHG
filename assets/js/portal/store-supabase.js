/* Supabase adapter for MHG_STORE.
 *
 * Implements exactly the same contract as the local adapter in store.js, so
 * app.js does not care which one is loaded. The only behavioural difference
 * the UI must handle is sign-in: a magic link cannot return a session
 * synchronously, so signIn() resolves to { sent: true } and the session
 * arrives later, when the person follows the emailed link back to this page.
 *
 * Which organisation is "current" is kept in localStorage. That is a per-browser
 * convenience, not a security boundary — switching it cannot grant access,
 * because every query is still filtered by RLS against the caller's
 * memberships. A tampered value simply returns nothing.
 */
(function () {
  'use strict';

  var CFG     = window.MHG_SUPABASE || {};
  var ORG_KEY = 'mhg-portal-org';      // selected org id (UI preference only)
  var client  = null;
  var profileName = null;              // cached display name for updated_by_name

  function db() {
    if (client) return client;
    if (!window.supabase || !window.supabase.createClient) {
      throw new Error('The Supabase library did not load. Check your connection and reload.');
    }
    if (!CFG.url || !CFG.publishableKey) {
      throw new Error('Supabase is not configured for this build.');
    }
    client = window.supabase.createClient(CFG.url, CFG.publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        /* The magic link comes back with the tokens in the URL fragment; this
           consumes them and then the fragment is cleaned up in getSession(). */
        detectSessionInUrl: true
      }
    });
    return client;
  }

  function rememberedOrg() {
    try { return localStorage.getItem(ORG_KEY) || null; } catch (e) { return null; }
  }
  function rememberOrg(id) {
    try { id ? localStorage.setItem(ORG_KEY, id) : localStorage.removeItem(ORG_KEY); } catch (e) {}
  }

  function fail(error, fallback) {
    if (!error) return;
    throw new Error(error.message || fallback || 'Something went wrong.');
  }

  /* Turn a Supabase auth user into the shape app.js expects. */
  function shapeUser(u) {
    if (!u) return null;
    var name = profileName || (u.user_metadata && u.user_metadata.full_name) ||
               String(u.email || '').split('@')[0];
    return { id: u.id, email: u.email, name: name };
  }

  var SupabaseAdapter = {

    name: 'supabase',

    /* --- auth -------------------------------------------------------- */

    /* Takes an email address. The second argument exists only so the call
       signature matches the local adapter; it is ignored. */
    signIn: function (email) {
      return Promise.resolve().then(function () {
        var addr = String(email || '').trim();
        if (!addr || addr.indexOf('@') < 1) {
          throw new Error('Enter the email address your organisation was invited with.');
        }
        return db().auth.signInWithOtp({
          email: addr,
          options: {
            emailRedirectTo: window.location.origin + window.location.pathname,
            /* Invitation-only: do not create an account for an address that
               was never invited. Without this, anyone could sign themselves
               up — they would see nothing, but the account would exist. */
            shouldCreateUser: false
          }
        }).then(function (res) {
          if (res.error) {
            var m = String(res.error.message || '');
            if (/signups not allowed|user not found/i.test(m)) {
              throw new Error(
                'That address has not been invited to the portal. ' +
                'Check the spelling, or contact the research team.');
            }
            throw new Error(m || 'Could not send the sign-in link.');
          }
          return { sent: true, email: addr };
        });
      });
    },

    signOut: function () {
      return db().auth.signOut().then(function () {
        profileName = null;
        rememberOrg(null);
        return null;
      });
    },

    /* Resolves { user, org } or null. Also consumes the magic-link fragment
       on the first load after following the email. */
    getSession: function () {
      return db().auth.getSession().then(function (res) {
        var session = res.data && res.data.session;
        if (!session || !session.user) return null;

        /* Tidy the tokens out of the address bar so the link cannot be
           copied out of a browser history and reused. */
        if (window.location.hash && window.location.hash.indexOf('access_token') > -1) {
          try {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          } catch (e) {}
        }

        return db().from('profiles').select('full_name').eq('id', session.user.id).maybeSingle()
          .then(function (p) {
            if (p && p.data && p.data.full_name) profileName = p.data.full_name;
            return SupabaseAdapter.listOrgs();
          })
          .then(function (orgs) {
            var want = rememberedOrg();
            var org  = null;
            for (var i = 0; i < orgs.length; i++) if (orgs[i].id === want) org = orgs[i];
            if (!org) org = orgs[0] || null;
            if (org) rememberOrg(org.id);
            return { user: shapeUser(session.user), org: org };
          });
      });
    },

    /* --- organizations ------------------------------------------------ */

    /* RLS already restricts this to organisations the caller belongs to, so
       no client-side filtering is needed or trusted. */
    listOrgs: function () {
      return db().from('organizations').select('id,slug,name,url,created_at')
        .order('name', { ascending: true })
        .then(function (res) {
          fail(res.error, 'Could not load your organisations.');
          return res.data || [];
        });
    },

    /* Denied by policy: this is a closed pilot and organisations are seeded by
       the research team. See the commented-out org_insert policy in
       supabase/01-schema.sql if that ever changes. */
    createOrg: function () {
      return Promise.reject(new Error(
        'Organisations are set up by the research team. Contact them to add one.'));
    },

    switchOrg: function (orgId) {
      rememberOrg(orgId);
      return SupabaseAdapter.getSession();
    },

    /* --- responses ---------------------------------------------------- */

    /* Returns { item_key: { value, updated_at, updated_by } }. */
    getResponses: function (resourceKey) {
      var org = rememberedOrg();
      if (!org) return Promise.resolve({});
      return db().from('responses')
        .select('item_key,value,updated_at,updated_by_name')
        .eq('org_id', org).eq('resource_key', resourceKey)
        .then(function (res) {
          fail(res.error, 'Could not load your saved answers.');
          var out = {};
          (res.data || []).forEach(function (r) {
            out[r.item_key] = {
              value: r.value,
              updated_at: r.updated_at,
              updated_by: r.updated_by_name
            };
          });
          return out;
        });
    },

    saveResponse: function (resourceKey, itemKey, value) {
      var org = rememberedOrg();
      if (!org) return Promise.reject(new Error('No organization selected.'));
      return db().auth.getUser().then(function (u) {
        var user = u.data && u.data.user;
        if (!user) throw new Error('Your session has expired. Sign in again.');
        var row = {
          org_id: org,
          resource_key: resourceKey,
          item_key: itemKey,
          value: value,
          updated_by: user.id,
          updated_by_name: shapeUser(user).name
        };
        return db().from('responses')
          .upsert(row, { onConflict: 'org_id,resource_key,item_key' })
          .select().maybeSingle()
          .then(function (res) {
            fail(res.error, 'Could not save. Your answer is still on screen — try again.');
            return res.data || row;
          });
      });
    },

    clearResource: function (resourceKey) {
      var org = rememberedOrg();
      if (!org) return Promise.resolve();
      return db().from('responses').delete()
        .eq('org_id', org).eq('resource_key', resourceKey)
        .then(function (res) { fail(res.error, 'Could not clear this resource.'); });
    },

    /* --- data portability --------------------------------------------- */

    /* Partners must be able to take their data out. Part of the export and
       deletion promise, not a nice-to-have. */
    exportOrg: function () {
      var org = rememberedOrg();
      if (!org) return Promise.resolve(null);
      return Promise.all([
        db().from('organizations').select('*').eq('id', org).maybeSingle(),
        db().from('responses').select('*').eq('org_id', org)
      ]).then(function (r) {
        fail(r[0].error, 'Could not export.');
        fail(r[1].error, 'Could not export.');
        return {
          exported_at: new Date().toISOString(),
          organization: r[0].data || null,
          responses: r[1].data || []
        };
      });
    }
  };

  /* Only take over from the local adapter when this build is actually
     configured and the library loaded. If either is missing we leave
     window.MHG_STORE alone, so the portal degrades to the local demo
     rather than showing a broken page. */
  if (CFG.url && CFG.publishableKey && window.supabase && window.supabase.createClient) {
    window.MHG_STORE = SupabaseAdapter;
  } else if (window.console) {
    console.warn('[MHG] Supabase not configured or library missing — using the local demo store.');
  }
}());
