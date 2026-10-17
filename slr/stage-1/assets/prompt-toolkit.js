document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const field = document.getElementById(button.dataset.copy);
  const status = button.parentElement.querySelector('.copy-status');
  if (!field) return;
  try {
    await navigator.clipboard.writeText(field.value);
    if (status) status.textContent = 'Copied';
    button.textContent = 'Copied';
  } catch (_) {
    field.focus(); field.select();
    const ok = document.execCommand('copy');
    if (status) status.textContent = ok ? 'Copied' : 'Select and copy the prompt';
    button.textContent = ok ? 'Copied' : 'Select prompt';
  }
  window.setTimeout(() => { button.textContent = button.dataset.label || 'Copy prompt'; if (status) status.textContent = ''; }, 1800);
});
