(function () {
  'use strict';

  // Год в футере
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Цели аналитики: клики по телефону, Viber, Telegram, почте.
  // Работает, если подключена Яндекс.Метрика (ym) и/или GA4 (gtag).
  // Номер счётчика Метрики впишите в YM_ID.
  var YM_ID = 0;

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-goal]');
    if (!el) return;
    var goal = el.getAttribute('data-goal');
    try {
      if (typeof window.ym === 'function' && YM_ID) window.ym(YM_ID, 'reachGoal', goal);
      if (typeof window.gtag === 'function') window.gtag('event', goal, { event_category: 'contact' });
    } catch (err) { /* аналитика не должна ломать сайт */ }
  });

  // Бургер-меню
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    var menuOpen = false;
    var scrollThreshold = 100;
    var ticking = false;

    burger.addEventListener('click', function () {
      menuOpen = !menuOpen;
      burger.setAttribute('aria-expanded', String(menuOpen));
      mobileNav.hidden = !menuOpen;
    });

    // Закрыть при клике на ссылку
    mobileNav.addEventListener('click', function () {
      menuOpen = false;
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });

    // Сбросить при ресайзе выше 900px
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        menuOpen = false;
        burger.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
    });

    // Мобильное меню появляется при прокрутке вниз
    function updateMobileNavVisibility() {
      var scrollY = window.scrollY;
      if (scrollY > scrollThreshold) {
        mobileNav.hidden = !menuOpen;
      } else {
        menuOpen = false;
        burger.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateMobileNavVisibility);
        ticking = true;
      }
    });
  }
})();
