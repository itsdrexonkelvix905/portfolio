/* DREXON theme switcher — shared by the login pages and the portfolio.
   Stores only the theme NAME in localStorage (not a secret). Loaded in <head> to avoid a flash. */
(function () {
  var KEY = 'drexon-theme';
  var THEMES = ['orange', 'blue', 'lime'];

  function apply(theme) {
    if (THEMES.indexOf(theme) === -1) theme = 'orange';
    if (theme === 'orange') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-option').forEach(function (el) {
      var on = el.dataset.theme === theme;
      el.classList.toggle('active', on);
      el.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }
  function saved() { try { return localStorage.getItem(KEY) || 'orange'; } catch (e) { return 'orange'; } }

  apply(saved());

  document.addEventListener('DOMContentLoaded', function () {
    apply(saved());
    var btn = document.getElementById('themeBtn');
    var menu = document.getElementById('themeMenu');
    if (!btn || !menu) return;
    function setOpen(open) { menu.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!menu.classList.contains('open')); });
    menu.querySelectorAll('.theme-option').forEach(function (opt) {
      opt.addEventListener('click', function () { apply(opt.dataset.theme); setOpen(false); btn.focus(); });
    });
    document.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); btn.focus(); } });
  });
})();
