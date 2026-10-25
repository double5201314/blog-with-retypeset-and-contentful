/* 站点交互：导航、滚动入场、筛选、页脚年份 */
(function () {
  'use strict';

  /* 标记 JS 可用：CSS 里的入场动画只对 .js 生效 */
  document.documentElement.classList.add('js');

  /* ---------- 页头滚动状态 ---------- */
  var header = document.querySelector('.site-header');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端导航 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- 当前栏目高亮 ---------- */
  var path = location.pathname.replace(/\/+$/, '') || '/index.html';
  var file = path.split('/').pop() || 'index.html';
  if (file.indexOf('.') === -1) file = 'index.html';   // 目录形式访问（/lab-site/）视为首页

  function fileOf(el) {
    return (el.getAttribute('href') || '').split('#')[0].split('/').pop();
  }

  // 二级项与侧边锚点：精确匹配
  document.querySelectorAll('.subnav a, .aside-nav a').forEach(function (a) {
    if (fileOf(a) === file) a.classList.add('is-active');
  });

  // 顶级项：自身命中，或任一子项命中，都算当前栏目
  document.querySelectorAll('.nav__item').forEach(function (item) {
    var link = item.querySelector('.nav__link');
    if (!link) return;
    var childHit = Array.prototype.some.call(
      item.querySelectorAll('.subnav a'),
      function (a) { return fileOf(a) === file; }
    );
    if (fileOf(link) === file || childHit) link.classList.add('is-active');
  });

  /* ---------- 滚动入场 ---------- */
  var items = document.querySelectorAll('.reveal');

  if (items.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 通用筛选：<div data-filter-group="year|category"> ---------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var name = group.getAttribute('data-filter-group');
    var targetSel = group.getAttribute('data-filter-target');
    var list = targetSel ? document.querySelector(targetSel) : null;
    if (!list) return;

    var rows = Array.prototype.slice.call(list.querySelectorAll('[data-' + name + ']'));
    var buttons = Array.prototype.slice.call(group.querySelectorAll('.filter-btn'));
    var counter = group.querySelector('[data-filter-count]');

    function apply(value) {
      var shown = 0;
      rows.forEach(function (row) {
        var match = value === 'all' || row.getAttribute('data-' + name) === value;
        row.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (counter) counter.textContent = '共 ' + shown + ' 条';
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        apply(btn.getAttribute('data-value') || 'all');
      });
    });

    var active = group.querySelector('.filter-btn.is-active');
    apply(active ? (active.getAttribute('data-value') || 'all') : 'all');
  });

  /* ---------- 首页通栏横幅（横向滑动图集） ---------- */
  var banner = document.querySelector('.banner');

  if (banner) {
    var viewport = banner.querySelector('.banner__viewport');
    var track = banner.querySelector('.banner__track');
    var slides = track ? Array.prototype.slice.call(track.children) : [];
    var dotsBox = banner.querySelector('.banner__dots');
    var prevBtn = banner.querySelector('.banner__arrow--prev');
    var nextBtn = banner.querySelector('.banner__arrow--next');
    var dots = [];
    var index = 0;
    var timer = null;
    var paused = false;
    var INTERVAL = 5500;
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var dragging = false;
    var moved = false;
    var startX = 0;
    var startY = 0;
    var baseX = 0;

    function slideWidth() { return viewport ? viewport.clientWidth : 0; }

    function setTransform(x, animate) {
      if (!track) return;
      track.style.transition = animate ? '' : 'none';
      track.style.transform = 'translate3d(' + x + 'px, 0, 0)';
    }

    function updateUI() {
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === index); });
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === index); });
    }

    function go(i, animate) {
      if (!slides.length) return;
      if (i < 0) i = 0;
      if (i > slides.length - 1) i = slides.length - 1;
      index = i;
      setTransform(-index * slideWidth(), animate !== false);
      updateUI();
    }

    function nextSlide() {
      go(index + 1 >= slides.length ? 0 : index + 1);
    }

    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }

    function startTimer() {
      stopTimer();
      if (reduceMotion || slides.length < 2) return;
      timer = setInterval(function () {
        if (!paused && !document.hidden && !dragging) nextSlide();
      }, INTERVAL);
    }

    if (viewport && track && slides.length) {
      if (dotsBox) {
        slides.forEach(function (s, i) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'banner__dot' + (i === 0 ? ' is-active' : '');
          dot.setAttribute('aria-label', '第 ' + (i + 1) + ' 张图片');
          dot.addEventListener('click', function () { go(i); startTimer(); });
          dotsBox.appendChild(dot);
          dots.push(dot);
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { go(index - 1); startTimer(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { go(index + 1); startTimer(); });

      /* 按下开始拖拽（鼠标与手指通用） */
      viewport.addEventListener('pointerdown', function (e) {
        if (e.button !== undefined && e.button !== 0) return;
        dragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        baseX = -index * slideWidth();
        track.style.transition = 'none';
        viewport.classList.add('is-dragging');
        paused = true;
        if (viewport.setPointerCapture) {
          try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
        }
      });

      /* 拖动中跟随手指位移 */
      viewport.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        if (!moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) moved = true;
        if (!moved) return;
        var x = baseX + dx;
        var min = -(slides.length - 1) * slideWidth();
        if (x > 0) x *= 0.35;                        /* 首端阻尼 */
        if (x < min) x = min + (x - min) * 0.35;     /* 末端阻尼 */
        setTransform(x, false);
      });

      function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        viewport.classList.remove('is-dragging');
        var dx = ((e && e.clientX) || startX) - startX;
        var threshold = Math.min(80, slideWidth() * 0.14);
        if (moved && Math.abs(dx) > threshold) {
          go(dx < 0 ? index + 1 : index - 1);        /* 左滑看下一张 */
        } else {
          go(index);                                  /* 没滑够就回弹 */
        }
        paused = false;
        startTimer();
      }

      viewport.addEventListener('pointerup', endDrag);
      viewport.addEventListener('pointercancel', endDrag);

      /* 拖动结束后拦截一次点击，避免误触跳转 */
      track.addEventListener('click', function (e) {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      }, true);

      /* 悬停暂停自动播放 */
      banner.addEventListener('mouseenter', function () { if (!dragging) paused = true; });
      banner.addEventListener('mouseleave', function () { paused = false; });

      /* 尺寸变化后重新对齐当前位置 */
      var resizeTimer = null;
      window.addEventListener('resize', function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { go(index, false); }, 120);
      });

      go(0, false);
      startTimer();
    }
  }

  /* ---------- 首页新闻区小图集（淡入切换） ---------- */
  document.querySelectorAll('.mini').forEach(function (mini) {
    var slides = Array.prototype.slice.call(mini.querySelectorAll('.mini__slide'));
    var dotsBox = mini.querySelector('.mini__dots');
    if (slides.length < 2) return;

    var dots = [];
    var at = 0;
    var timer = null;
    var paused = false;
    var reduceMotionMini = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(i) {
      at = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === at); });
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === at); });
    }

    function startMini() {
      stopMini();
      if (reduceMotionMini) return;
      timer = setInterval(function () {
        if (!paused && !document.hidden) show(at + 1);
      }, 5000);
    }

    function stopMini() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (dotsBox) {
      slides.forEach(function (s, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'mini__dot' + (i === 0 ? ' is-active' : '');
        b.setAttribute('aria-label', '第 ' + (i + 1) + ' 张图片');
        b.addEventListener('click', function () { show(i); startMini(); });
        dotsBox.appendChild(b);
        dots.push(b);
      });
    }

    mini.addEventListener('mouseenter', function () { paused = true; });
    mini.addEventListener('mouseleave', function () { paused = false; });
    startMini();
  });

  /* ---------- 页脚年份 ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
