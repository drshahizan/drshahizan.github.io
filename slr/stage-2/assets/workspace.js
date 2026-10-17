(() => {
  'use strict';
  const KEY = 'slr_stage2_guided_v1';
  let data = {};
  try { data = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch {}
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(data));
    const status = $('#saveStatus');
    if (status) status.textContent = `Saved in this browser · ${new Date().toLocaleTimeString()}`;
  };
  const currentStep = Number(document.body.dataset.stageStep || 0);
  $$('[data-field]').forEach((field) => {
    field.value = data[field.dataset.field] ?? '';
    field.addEventListener('input', () => {
      data[field.dataset.field] = field.value;
      save();
      updatePrisma();
    });
  });
  $$('[data-stage-step]').forEach((link) => {
    if (Number(link.dataset.stageStep) === currentStep) link.dataset.active = 'true';
  });
  const progress = $('#stageProgressBar');
  if (progress) progress.style.width = `${currentStep === 8 ? 100 : Math.round(currentStep / 7 * 100)}%`;

  const numeric = (key) => {
    const value = data[key];
    return value === '' || value === undefined || value === null ? null : Number(value);
  };
  const getCounts = () => {
    const db = numeric('dbRecords');
    const other = numeric('otherRecords') ?? 0;
    const duplicates = numeric('duplicateRecords');
    const otherRemoved = numeric('otherRemoved') ?? 0;
    const unique = db === null || duplicates === null ? null : db + other - duplicates - otherRemoved;
    const screened = numeric('screenedRecords');
    const abstractExcluded = numeric('abstractExcluded');
    const sought = numeric('reportsSought');
    const notRetrieved = numeric('notRetrieved');
    const assessed = sought === null || notRetrieved === null ? null : sought - notRetrieved;
    const fullTextExcluded = numeric('fullTextExcluded');
    const included = assessed === null || fullTextExcluded === null ? null : assessed - fullTextExcluded;
    const candidates = screened === null || abstractExcluded === null ? null : screened - abstractExcluded;
    return { db, other, duplicates, otherRemoved, unique, screened, abstractExcluded, sought, notRetrieved, assessed, fullTextExcluded, included, candidates };
  };
  function updatePrisma() {
    const container = $('#prismaPreview');
    if (!container) return;
    const c = getCounts();
    const rows = [
      ['Records identified', c.db === null ? null : c.db + c.other],
      ['Duplicates removed', c.duplicates],
      ['Unique records after deduplication', c.unique],
      ['Records screened', c.screened],
      ['Excluded at title/abstract', c.abstractExcluded],
      ['Reports sought', c.sought ?? c.candidates],
      ['Reports not retrieved', c.notRetrieved],
      ['Full texts assessed', c.assessed],
      ['Excluded at full text', c.fullTextExcluded],
      ['Included studies', c.included]
    ];
    container.innerHTML = rows.map(([label, value]) => `<div><b>${value === null ? '—' : value}</b><span>${label}</span></div>`).join('');
    const message = $('#prismaMessage');
    if (!message) return;
    const issues = [];
    if (c.unique !== null && c.screened !== null && c.unique !== c.screened) issues.push(`Unique records after deduplication (${c.unique}) do not match records screened (${c.screened}).`);
    if (c.candidates !== null && c.sought !== null && c.candidates !== c.sought) issues.push(`Expected reports sought (${c.candidates}) do not match reports sought (${c.sought}).`);
    if (c.assessed !== null && c.fullTextExcluded !== null && c.included < 0) issues.push('Full-text exclusions exceed reports assessed.');
    message.className = issues.length ? 's2-warning' : 's2-pass';
    message.textContent = issues.length ? issues.join(' ') : 'Check source records and report/study definitions; entered figures appear arithmetically consistent.';
  }
  updatePrisma();

  const markdown = () => {
    const c = getCounts();
    const identified = c.db === null ? '—' : c.db + c.other;
    const sections = [
      ['Protocol and eligibility', `Protocol version/date: ${data.protocolVersion || ''}\nReview question: ${data.reviewQuestion || ''}\nInclusion criteria: ${data.inclusionCriteria || ''}\nExclusion criteria: ${data.exclusionCriteria || ''}\nAmendments: ${data.protocolChanges || ''}`],
      ['Deduplication', `Records from databases: ${data.dbRecords || ''}\nOther-method records: ${data.otherRecords || ''}\nDuplicates removed: ${data.duplicateRecords || ''}\nOther records removed before screening: ${data.otherRemoved || ''}\nDeduplication method: ${data.dedupMethod || ''}\nUnique records (calculated): ${c.unique ?? '—'}\nAudit notes: ${data.dedupNotes || ''}`],
      ['Title and abstract screening', `Records screened: ${data.screenedRecords || ''}\nExcluded: ${data.abstractExcluded || ''}\nDecision summary: ${data.abstractDecisionNotes || ''}\nPilot and reviewer plan: ${data.calibrationPlan || ''}\nDisagreements and rule clarifications: ${data.calibrationNotes || ''}`],
      ['Full-text screening', `Reports sought: ${data.reportsSought || ''}\nNot retrieved: ${data.notRetrieved || ''}\nFull-text exclusions: ${data.fullTextExcluded || ''}\nPrimary exclusion reasons and counts: ${data.exclusionReasons || ''}\nCalculated included reports: ${c.included ?? '—'}\nNotes: ${data.fullTextNotes || ''}`],
      ['PRISMA flow counts', `Identified: ${identified}; duplicates: ${c.duplicates ?? '—'}; records after dedup: ${c.unique ?? '—'}; records screened: ${c.screened ?? '—'}; title/abstract exclusions: ${c.abstractExcluded ?? '—'}; reports sought: ${c.sought ?? c.candidates ?? '—'}; not retrieved: ${c.notRetrieved ?? '—'}; full texts assessed: ${c.assessed ?? '—'}; full-text exclusions: ${c.fullTextExcluded ?? '—'}; included: ${c.included ?? '—'}\nCount review notes: ${data.countNotes || ''}`],
      ['Quality appraisal', `Instrument and version: ${data.appraisalInstrument || ''}\nCriteria and judgement rules: ${data.appraisalCriteria || ''}\nPilot sample: ${data.appraisalPilot || ''}\nObservations and changes: ${data.appraisalNotes || ''}`],
      ['Data extraction and synthesis preparation', `Extraction fields mapped to RQs: ${data.extractionFields || ''}\nPilot studies: ${data.extractionPilot || ''}\nSynthesis approach: ${data.synthesisApproach || ''}\nPatterns, contradictions and gaps: ${data.synthesisNotes || ''}`]
    ];
    return '# Stage 2 Review Portfolio\n\n' + sections.map(([heading, value]) => `## ${heading}\n${value || 'Not completed'}\n`).join('\n');
  };
  const preview = $('#portfolioPreview');
  if (preview) {
    markdown().split(/\n## /).slice(1).forEach((sectionText) => {
      const [heading, ...lines] = sectionText.split('\n');
      const section = document.createElement('section');
      section.className = 's2-preview';
      const title = document.createElement('h3');
      title.textContent = heading;
      const pre = document.createElement('pre');
      pre.textContent = lines.join('\n').trim();
      section.append(title, pre);
      preview.append(section);
    });
  }
  const download = (filename, content, type) => {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  };
  $('#downloadJson')?.addEventListener('click', () => download('slr-stage2-backup.json', JSON.stringify(data, null, 2), 'application/json'));
  $('#downloadMarkdown')?.addEventListener('click', () => download('slr-stage2-portfolio.md', markdown(), 'text/markdown'));
  $('#printPortfolio')?.addEventListener('click', () => window.print());
  $$('[data-save-next]').forEach((button) => button.addEventListener('click', () => {
    save();
    if (button.dataset.saveNext) location.href = button.dataset.saveNext;
  }));
})();
