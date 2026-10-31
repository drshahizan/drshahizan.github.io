const menuButton = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Buka menu');
      menuButton.textContent = '☰';
    });
  });
}

document.querySelectorAll('.copy-prompt').forEach((button) => {
  button.addEventListener('click', async () => {
    const prompt = document.getElementById(button.dataset.copyTarget);
    if (!prompt) return;
    const originalLabel = button.textContent;
    try {
      await navigator.clipboard.writeText(prompt.textContent.trim());
      button.textContent = 'Disalin ✓';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(prompt);
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = 'Pilih dan salin';
    }
    window.setTimeout(() => { button.textContent = originalLabel; }, 2200);
  });
});
