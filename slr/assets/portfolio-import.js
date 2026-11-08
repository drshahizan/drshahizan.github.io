(() => {
  'use strict';
  // Adds an "Import JSON backup" button next to the existing JSON download button.
  const script = document.currentScript;
  const KEY = script && script.dataset.key;
  const anchor = document.getElementById('downloadJson') || document.getElementById('downloadPortfolio');
  if (!KEY || !anchor) return;
  const label = document.createElement('label');
  label.className = anchor.className;
  label.style.cssText = 'cursor:pointer;display:inline-flex;align-items:center;margin:0;width:auto';
  label.textContent = 'Import JSON backup';
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'application/json,.json'; input.hidden = true; input.style.display = 'none';
  label.append(input);
  anchor.after(label);
  const note = document.createElement('p');
  note.className = 'portfolio-storage-note';
  note.textContent = 'Your answers are stored only in this browser. Download a JSON backup regularly, and import it to continue on another computer.';
  label.closest('div, section, p')?.after(note);
  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const incoming = JSON.parse(reader.result);
        if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) throw new Error('invalid');
        let current = {};
        try { current = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { current = {}; }
        localStorage.setItem(KEY, JSON.stringify(Object.assign(current, incoming)));
        location.reload();
      } catch (e) {
        note.textContent = 'That file could not be read. Choose the JSON backup downloaded from this portfolio.';
      }
    };
    reader.readAsText(file);
  });
})();
