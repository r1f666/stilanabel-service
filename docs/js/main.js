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
})();
