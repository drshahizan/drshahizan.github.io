(() => {
  'use strict';
  const start = () => {
    const dataElement = document.getElementById('prompt-data');
    const grid = document.getElementById('prompt-grid');
    const search = document.getElementById('prompt-search');
    const count = document.getElementById('prompt-count');
    const empty = document.getElementById('prompt-empty');
    const filters = Array.from(document.querySelectorAll('.filter[data-filter]'));
    if (!dataElement || !grid || !search || !count) return;

    const escapeHTML = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    const normalise = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('ms').trim();
    let prompts;
    try {
      prompts = JSON.parse(dataElement.textContent || '[]');
      if (!Array.isArray(prompts)) throw new Error('Format data tidak sah');
    } catch (error) {
      grid.innerHTML = '<p class="notice">Prompt tidak dapat dipaparkan. Sila muat semula halaman.</p>';
      count.textContent = '0 prompt ditemui';
      return;
    }

    grid.innerHTML = prompts.map(({ c, l, t, p }, index) => `<article class="card prompt-card" data-category="${escapeHTML(c)}" data-search="${escapeHTML(normalise(`${l} ${t} ${p}`))}"><span class="tag">${escapeHTML(l)}</span><h3>${escapeHTML(t)}</h3><div class="prompt-text">${escapeHTML(p)}</div><button type="button" class="copy" data-copy-index="${index}">Salin Prompt</button></article>`).join('');
    const cards = Array.from(grid.querySelectorAll('.prompt-card'));
    let activeCategory = 'semua';

    const applyFilters = () => {
      const query = normalise(search.value);
      let visible = 0;
      cards.forEach((card) => {
        const show = (activeCategory === 'semua' || card.dataset.category === activeCategory) && (!query || (card.dataset.search || '').includes(query));
        card.hidden = !show;
        if (show) visible += 1;
      });
      count.textContent = query || activeCategory !== 'semua' ? `${visible} prompt ditemui` : `${prompts.length} prompt tersedia`;
      if (empty) empty.hidden = visible !== 0;
    };

    search.addEventListener('input', applyFilters);
    search.addEventListener('search', applyFilters);
    filters.forEach((button) => button.addEventListener('click', () => {
      activeCategory = button.dataset.filter || 'semua';
      filters.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      applyFilters();
    }));

    grid.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-copy-index]');
      if (!button) return;
      const prompt = prompts[Number(button.dataset.copyIndex)]?.p || '';
      try { await navigator.clipboard.writeText(prompt); }
      catch (error) {
        const area = document.createElement('textarea');
        area.value = prompt; area.setAttribute('readonly', ''); area.style.position = 'fixed'; area.style.opacity = '0';
        document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove();
      }
      const toast = document.querySelector('.toast');
      toast?.classList.add('show');
      window.setTimeout(() => toast?.classList.remove('show'), 1800);
    });
    applyFilters();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
