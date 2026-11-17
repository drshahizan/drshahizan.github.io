(() => {
  'use strict';
  // Copy buttons: <button class="wt-copy" data-copy-text="..."> or data-copy-target="#id">
  const copy = async (text, btn) => {
    try { await navigator.clipboard.writeText(text); }
    catch (e) { const ta = document.createElement('textarea'); ta.value = text; document.body.append(ta); ta.select(); try { document.execCommand('copy'); } catch (x) {} ta.remove(); }
    const old = btn.textContent; btn.textContent = 'Copied'; btn.classList.add('done');
    setTimeout(() => { btn.textContent = old; btn.classList.remove('done'); }, 1400);
  };
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wt-copy');
    if (!btn) return;
    const target = btn.dataset.copyTarget ? document.querySelector(btn.dataset.copyTarget) : null;
    const text = btn.dataset.copyText || (target ? (target.value !== undefined && target.tagName !== 'DIV' && target.tagName !== 'PRE' ? target.value : target.innerText) : '');
    if (text) copy(text.trim(), btn);
  });
  // Live filter: <input class="wt-search" data-filter="selector of items" data-groups="selector of groups">
  document.querySelectorAll('.wt-search[data-filter]').forEach((input) => {
    const items = () => Array.from(document.querySelectorAll(input.dataset.filter));
    const count = document.querySelector(input.dataset.count || '#none');
    const run = () => {
      const q = input.value.trim().toLowerCase(); let shown = 0;
      items().forEach((el) => { const hit = !q || el.textContent.toLowerCase().includes(q); el.hidden = !hit; if (hit) shown++; });
      if (input.dataset.groups) document.querySelectorAll(input.dataset.groups).forEach((g) => {
        g.hidden = !!q && !g.querySelector(input.dataset.filter + ':not([hidden])');
      });
      if (count) count.textContent = q ? shown + ' match' + (shown === 1 ? '' : 'es') : '';
    };
    input.addEventListener('input', run);
  });
})();
