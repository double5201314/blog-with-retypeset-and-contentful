/* =========================================================
   LMDP 站点脚本
   1) 中英切换（默认中文，记忆在 localStorage）
   2) 移动端导航
   3) 论文页筛选（关键词 / 类型 / 年份）
   ========================================================= */
(function () {
  'use strict';

  var STORE_KEY = 'lmdp-lang';
  var current = 'zh';

  /* ---------------- 语言切换 ---------------- */

  function applyLang(lang) {
    current = lang === 'en' ? 'en' : 'zh';
    var key = 'data-' + current;

    document.documentElement.setAttribute('lang', current === 'en' ? 'en' : 'zh-CN');

    var nodes = document.querySelectorAll('[data-zh]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var value = el.getAttribute(key);
      if (value === null) continue;
      var tag = el.tagName;
      if (tag === 'META') {
        el.setAttribute('content', value);
      } else if (tag === 'TITLE') {
        el.textContent = value;
      } else if (tag === 'INPUT' || tag === 'TEXTAREA') {
        el.value = value;
      } else {
        el.innerHTML = value;
      }
    }

    var phs = document.querySelectorAll('[data-zh-ph]');
    for (var j = 0; j < phs.length; j++) {
      var ph = phs[j].getAttribute(current === 'en' ? 'data-en-ph' : 'data-zh-ph');
      if (ph !== null) phs[j].setAttribute('placeholder', ph);
    }

    var buttons = document.querySelectorAll('[data-lang]');
    for (var k = 0; k < buttons.length; k++) {
      buttons[k].setAttribute('aria-pressed', buttons[k].getAttribute('data-lang') === current ? 'true' : 'false');
    }

    try { localStorage.setItem(STORE_KEY, current); } catch (e) {}

    document.dispatchEvent(new CustomEvent('langchange', { detail: current }));
  }

  function initLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORE_KEY); } catch (e) {}
    var param = null;
    var match = window.location.search.match(/[?&]lang=(zh|en)/);
    if (match) param = match[1];

    applyLang(param || stored || 'zh');

    var buttons = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        applyLang(this.getAttribute('data-lang'));
      });
    }
  }

  /* ---------------- 移动端导航 ---------------- */

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------------- 论文筛选 ---------------- */

  function initPublications() {
    var list = document.getElementById('pubList');
    if (!list) return;

    var items = Array.prototype.slice.call(list.querySelectorAll('.pub'));
    var search = document.getElementById('pubSearch');
    var type = document.getElementById('pubType');
    var year = document.getElementById('pubYear');
    var count = document.getElementById('pubCount');
    var empty = document.getElementById('pubEmpty');

    function run() {
      var kw = (search && search.value ? search.value : '').trim().toLowerCase();
      var t = type ? type.value : 'all';
      var y = year ? year.value : 'all';
      var shown = 0;

      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var text = (it.textContent || '').toLowerCase();
        var ok = (t === 'all' || it.getAttribute('data-type') === t) &&
                 (y === 'all' || it.getAttribute('data-year') === y) &&
                 (kw === '' || text.indexOf(kw) > -1);
        it.hidden = !ok;
        if (ok) shown++;
      }

      if (count) {
        count.textContent = current === 'en'
          ? (shown === items.length ? items.length + ' papers' : shown + ' / ' + items.length + ' papers')
          : (shown === items.length ? '共 ' + items.length + ' 篇' : shown + ' / ' + items.length + ' 篇');
        count.removeAttribute('data-zh');
        count.removeAttribute('data-en');
      }
      if (empty) empty.hidden = shown > 0;
    }

    [search, type, year].forEach(function (el) {
      if (!el) return;
      el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', run);
    });

    document.addEventListener('langchange', run);
    run();
  }

  /* ---------------- 启动 ---------------- */

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initNav();
    initPublications();
  });
})();
