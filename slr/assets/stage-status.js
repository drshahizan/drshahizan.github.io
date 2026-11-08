(() => {
  'use strict';
  // Shows Completed / Today / Upcoming on stage cards, based on the visitor's local date.
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  document.querySelectorAll('[data-stage-date]').forEach((card) => {
    const date = parse(card.dataset.stageDate);
    const diff = Math.round((date - today) / 86400000);
    const badge = document.createElement('em');
    badge.className = 'stage-status ' + (diff < 0 ? 'is-done' : diff === 0 ? 'is-today' : 'is-next');
    badge.textContent = diff < 0 ? 'Completed' : diff === 0 ? 'Today' : (diff <= 14 ? `In ${diff} day${diff === 1 ? '' : 's'}` : 'Upcoming');
    const target = card.querySelector('[data-status-slot]') || card.firstElementChild;
    target.after(badge);
  });
  // "Next session" panel: show details for the next upcoming session, hide when none remain.
  const panel = document.getElementById('nextSession');
  if (panel) {
    const items = Array.from(panel.querySelectorAll('[data-session-date]'));
    const next = items.find((el) => parse(el.dataset.sessionDate) >= today);
    items.forEach((el) => { el.hidden = el !== next; });
    if (next) { panel.hidden = false; const d = panel.querySelector('[data-next-date]'); if (d) d.textContent = fmt(parse(next.dataset.sessionDate)); }
  }
})();
