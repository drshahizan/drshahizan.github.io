(() => {
  'use strict';
  const CFG = window.SLR_STAGE || { key: 'slr_stage_guided', stage: 0, steps: [] };
  const KEY = CFG.key;
  let data = {};
  try { data = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { data = {}; }
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* storage unavailable */ }
    const status = $('#saveStatus');
    if (status) status.textContent = `Saved in this browser · ${new Date().toLocaleTimeString()}`;
  };
  const currentStep = Number(document.body.dataset.stageStep || 0);

  // Bind fields (textarea, input, select, checkbox)
  $$('[data-field]').forEach((field) => {
    const k = field.dataset.field;
    if (field.type === 'checkbox') field.checked = data[k] === true;
    else field.value = data[k] ?? '';
    const handler = () => {
      data[k] = field.type === 'checkbox' ? field.checked : field.value;
      save();
      updateCounters();
    };
    field.addEventListener('input', handler);
    field.addEventListener('change', handler);
  });

  // Active step in sidebar + progress
  $$('[data-stage-step]').forEach((link) => {
    if (link.tagName === 'A' && Number(link.dataset.stageStep) === currentStep) link.dataset.active = 'true';
  });
  const bar = $('#stageProgressBar');
  if (bar && currentStep) bar.style.width = `${currentStep >= 8 ? 100 : Math.round(currentStep / 7 * 100)}%`;

  // Checklist counters
  function updateCounters() {
    $$('[data-counter]').forEach((el) => {
      const group = el.dataset.counter;
      const items = $$(`[data-group="${group}"]`);
      const done = items.filter((f) => (f.type === 'checkbox' ? f.checked : ['reported', 'na'].includes(f.value))).length;
      el.textContent = `${done} of ${items.length} complete`;
      const meter = document.querySelector(`[data-meter="${group}"]`);
      if (meter) meter.style.width = `${items.length ? Math.round(done / items.length * 100) : 0}%`;
    });
  }
  updateCounters();

  // Portfolio content
  const statusLabel = { reported: 'Reported', partial: 'Partly reported', missing: 'Missing', na: 'Not applicable' };
  const sections = () => CFG.steps.map((step) => {
    const lines = [];
    (step.fields || []).forEach(([k, label]) => lines.push(`${label}: ${data[k] || ''}`));
    if (step.checklist) {
      const [title, items] = step.checklist;
      const done = items.filter(([k]) => data[k] === true);
      lines.push(`${title}: ${done.length} of ${items.length} complete`);
      items.forEach(([k, label]) => lines.push(`  [${data[k] === true ? 'x' : ' '}] ${label}`));
    }
    if (step.prisma) {
      const done = step.prisma.filter(([n]) => ['reported', 'na'].includes(data[`prisma_${n}_status`])).length;
      lines.push(`PRISMA 2020 items addressed: ${done} of ${step.prisma.length}`);
      step.prisma.forEach(([n, name]) => {
        const st = data[`prisma_${n}_status`];
        lines.push(`  Item ${n} ${name}: ${st ? statusLabel[st] : '—'}${data[`prisma_${n}_loc`] ? ' · ' + data[`prisma_${n}_loc`] : ''}`);
      });
      if (step.abstract) {
        const a = step.abstract.filter(([k]) => data[`pa_${k}`] === true).length;
        lines.push(`PRISMA for Abstracts: ${a} of ${step.abstract.length} items present`);
      }
    }
    return [step.title, lines.join('\n')];
  });
  const markdown = () => `# Stage ${CFG.stage} Portfolio\n\n` + sections().map(([h, v]) => `## ${h}\n${v || 'Not completed'}\n`).join('\n');

  const preview = $('#portfolioPreview');
  if (preview) {
    sections().forEach(([heading, text]) => {
      const section = document.createElement('section');
      section.className = 's2-preview';
      const title = document.createElement('h3');
      title.textContent = heading;
      const pre = document.createElement('pre');
      pre.textContent = text.trim();
      section.append(title, pre);
      preview.append(section);
    });
  }
  const download = (filename, content, type) => {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  };
  $('#downloadJson')?.addEventListener('click', () => download(`slr-stage${CFG.stage}-backup.json`, JSON.stringify(data, null, 2), 'application/json'));
  $('#downloadMarkdown')?.addEventListener('click', () => download(`slr-stage${CFG.stage}-portfolio.md`, markdown(), 'text/markdown'));
  $('#printPortfolio')?.addEventListener('click', () => window.print());
  const importInput = $('#importJson');
  if (importInput) {
    importInput.addEventListener('change', () => {
      const file = importInput.files && importInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (typeof parsed !== 'object' || parsed === null) throw new Error('bad');
          data = Object.assign({}, data, parsed);
          save();
          location.reload();
        } catch (e) {
          const s = $('#saveStatus');
          if (s) s.textContent = 'Could not read that file. Choose a JSON backup exported from this stage.';
        }
      };
      reader.readAsText(file);
    });
  }
  $$('[data-save-next]').forEach((button) => button.addEventListener('click', () => {
    save();
    if (button.dataset.saveNext) location.href = button.dataset.saveNext;
  }));
})();
