const content = document.querySelector('#markdown-content');
const toc = document.querySelector('#resource-toc');

content?.querySelectorAll('.copy-resource').forEach(button => {
  button.addEventListener('click', async () => {
    const text = button.parentElement.querySelector('pre').innerText;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement('textarea');
      field.value = text;
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    button.textContent = '✓ Disalin';
    setTimeout(() => button.textContent = 'Salin Prompt', 1600);
  });
});

if (content && toc) {
  const headings = [...content.querySelectorAll('h2,h3')];
  toc.innerHTML = '<strong>Dalam halaman ini</strong>' + headings
    .map(heading => `<a href="#${heading.id}">${heading.textContent}</a>`)
    .join('');
}
