(() => {
  'use strict';
  // Switches the home page between phases by date (visitor's clock; the server still enforces the deadline):
  //   open   – before the submission deadline (config.stage34DeadlineISO)
  //   closed – deadline passed, before Stage 3
  //   live   – Stage 3 and Stage 4 days
  //   after  – programme completed
  const cfg = window.SLR_CONFIG || {};
  const deadline = new Date(cfg.stage34DeadlineISO || '2026-11-30T17:00:00+08:00');
  const stage3 = new Date('2026-12-16T00:00:00+08:00');
  const finished = new Date('2026-12-18T00:00:00+08:00');
  const phaseAt = (now) => (now < deadline ? 'open' : now < stage3 ? 'closed' : now < finished ? 'live' : 'after');
  const apply = () => {
    const phase = phaseAt(new Date());
    document.documentElement.dataset.homePhase = phase;
    document.querySelectorAll('[data-phase]').forEach((el) => {
      el.hidden = !el.dataset.phase.split(/\s+/).includes(phase);
    });
    return phase;
  };
  const countdown = document.getElementById('homeCountdown');
  const tick = () => {
    if (apply() !== 'open' || !countdown) return false;
    const ms = deadline - Date.now();
    const d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4);
    countdown.textContent = (!d && !h && !m) ? 'Closes in less than 1 minute'
      : 'Closes in ' + (d ? d + ' day' + (d > 1 ? 's ' : ' ') : '') + (h || d ? h + ' hour' + (h === 1 ? ' ' : 's ') : '') + m + ' min' + (m === 1 ? '' : 's');
    return true;
  };
  if (tick()) { const iv = setInterval(() => { if (!tick()) clearInterval(iv); }, 30000); }
})();
