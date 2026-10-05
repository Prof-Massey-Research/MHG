/* Shared site behaviour: mobile nav, scroll-spy sidebar, toolbox filters. */
(function () {
  'use strict';

  /* --- mobile nav ------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var tabs = document.querySelector('.tabs');
  if (toggle && tabs) {
    toggle.addEventListener('click', function () {
      var open = tabs.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* --- guidelines dropdown --------------------------------------------- */
  var group = document.querySelector('.tabs__group');
  if (group) {
    var caret = group.querySelector('.tabs__caret');
    var menu = group.querySelector('.submenu');

    var setOpen = function (open) {
      menu.hidden = !open;
      caret.setAttribute('aria-expanded', String(open));
    };

    caret.addEventListener('click', function (e) {
      e.preventDefault();
      setOpen(menu.hidden);
    });

    document.addEventListener('click', function (e) {
      if (!group.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); caret.focus(); }
    });

    // Close once focus leaves the group entirely (keyboard users tabbing out).
    group.addEventListener('focusout', function (e) {
      if (!group.contains(e.relatedTarget)) setOpen(false);
    });

    // Hover only where there is a precise pointer; touch uses the caret.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var closeTimer;
      group.addEventListener('mouseenter', function () {
        clearTimeout(closeTimer);
        setOpen(true);
      });
      group.addEventListener('mouseleave', function () {
        closeTimer = setTimeout(function () { setOpen(false); }, 180);
      });
    }
  }

  /* --- scroll-spy for in-page sidebars --------------------------------- */
  var spyLinks = Array.prototype.slice.call(
    document.querySelectorAll('[data-spy] a[href^="#"]')
  );
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    var targets = [];
    spyLinks.forEach(function (link) {
      var el = document.getElementById(link.getAttribute('href').slice(1));
      if (el) { byId[el.id] = link; targets.push(el); }
    });
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { visible.add(e.target.id); } else { visible.delete(e.target.id); }
      });
      var first = targets.filter(function (t) { return visible.has(t.id); })[0];
      if (!first) return;
      spyLinks.forEach(function (l) { l.classList.remove('is-active'); });
      if (byId[first.id]) byId[first.id].classList.add('is-active');
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* --- toolbox filters -------------------------------------------------- */
  var filterBar = document.querySelector('[data-filter-bar]');
  if (filterBar) {
    var tools = Array.prototype.slice.call(document.querySelectorAll('[data-guideline]'));
    var countEl = document.querySelector('[data-filter-count]');
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      var value = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      var shown = 0;
      tools.forEach(function (tool) {
        var match = value === 'all' || tool.getAttribute('data-guideline').split(' ').indexOf(value) > -1;
        tool.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (countEl) {
        countEl.textContent = shown + (shown === 1 ? ' resource' : ' resources');
      }
    });
  }

  /* --- copy-to-clipboard buttons --------------------------------------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var src = document.querySelector(btn.getAttribute('data-copy'));
    if (!src || !navigator.clipboard) return;
    navigator.clipboard.writeText(src.textContent.trim()).then(function () {
      var original = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = original; }, 1600);
    });
  });

  /* --- print buttons ---------------------------------------------------- */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-print]')) { e.preventDefault(); window.print(); }
  });
})();
