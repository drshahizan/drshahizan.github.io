document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-prompt-filter]').forEach((input) => {
    const section = input.closest('.shell');
    const cards = [...section.querySelectorAll('[data-prompt-card]')];
    const groups = [...section.querySelectorAll('.library-prompt-group')];
    const count = section.querySelector('[data-prompt-count]');
    input.addEventListener('input', () => {
      const query = input.value.trim().toLocaleLowerCase('ms');
      let visible = 0;
      cards.forEach((card) => {
        const match = !query || card.textContent.toLocaleLowerCase('ms').includes(query);
        card.hidden = !match;
        if (match) visible += 1;
      });
      groups.forEach((group) => {
        const hasVisible = !!group.querySelector('[data-prompt-card]:not([hidden])');
        group.hidden = !hasVisible;
        if (query && hasVisible) group.open = true;
      });
      if (count) count.textContent = query ? `${visible} prompt sepadan` : `${cards.length} prompt tersedia`;
    });
  });

  const form = document.getElementById('prompt-form');
  if (!form) return;
  const wrap = document.getElementById('builder-result-wrap');
  const output = document.getElementById('builder-result');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const d = new FormData(form);
    output.textContent = `Anda ialah pembantu tugasan pengurusan akademik.\n\nTUGASAN\n${d.get('task')}\n\nTUJUAN\n${d.get('purpose') || 'Hasilkan jawapan yang tepat dan boleh disemak.'}\n\nAUDIENS\n${d.get('audience') || 'Pengguna yang dinyatakan dalam tugasan.'}\n\nSUMBER DIBENARKAN\n${d.get('sources') || 'Gunakan hanya maklumat yang diberikan dalam perbualan ini.'}\n\nFORMAT HASIL\n${d.get('format') || 'Jawapan berstruktur dan mudah disemak.'}\n\nBAHASA DAN NADA\n${d.get('language')}; ${d.get('tone')}.\n\nKAWALAN\nJangan mereka fakta, nama, tarikh, angka atau keputusan. Nyatakan maklumat yang tiada sebagai “Tidak dinyatakan dalam sumber”. Bezakan fakta daripada cadangan. Lindungi data peribadi dan sulit. Sertakan bukti sumber dan minta semakan manusia sebelum hasil digunakan.`;
    wrap.hidden = false;
    wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  form.addEventListener('reset', () => { wrap.hidden = true; });
});
