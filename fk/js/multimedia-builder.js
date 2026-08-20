document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('mm-builder');
  const output=document.getElementById('mm-output');
  const copyButton=document.getElementById('mm-copy');
  const resetButton=document.getElementById('mm-reset');
  if(!form||!output)return;
  const value=id=>document.getElementById(id)?.value.trim()||'';
  const build=()=>{
    const title=value('mm-title');
    if(!title){document.getElementById('mm-title').focus();output.textContent='Sila nyatakan tajuk atau tujuan utama bahan.';return}
    const message=value('mm-message');
    if(!message){document.getElementById('mm-message').focus();output.textContent='Sila nyatakan mesej utama, teks atau mood/genre.';return}
    const type=value('mm-type'),audience=value('mm-audience'),style=value('mm-style'),color=value('mm-color'),size=value('mm-size'),language=value('mm-language'),elements=value('mm-elements'),constraints=value('mm-constraints');
    const isMusic=type==='Muzik Latar';
    const parts=[
      isMusic?`Hasilkan ${type} menggunakan Google Gemini.`:`Reka ${type} menggunakan Google Gemini.`,
      `Tajuk/tujuan utama: ${title}.`,
      audience&&`Audiens sasaran: ${audience}.`,
      isMusic?`Mood, genre atau konsep muzik:\n${message}`:`Mesej utama atau teks yang perlu dipaparkan:\n${message}`,
      `Gaya${isMusic?' atau nada':' visual'}: ${style.toLowerCase()}.`,
      (!isMusic&&color)&&`Warna/tema: ${color}.`,
      (!isMusic&&size&&size!=='Tidak berkenaan (muzik)')&&`Saiz/nisbah bidang: ${size}.`,
      (!isMusic&&language&&language!=='Tidak berkenaan (muzik)')&&`Bahasa teks dalam imej: ${language}.`,
      elements&&`Elemen wajib: ${elements}.`,
      constraints&&`Kekangan: ${constraints}.`,
      isMusic
        ?'Jangan sertakan lirik dalam bahasa yang tidak disokong tanpa semakan; nyatakan jika muzik perlu bebas lirik. Pastikan tempoh dan mood sesuai untuk kegunaan tempat kerja.'
        :'Pastikan sebarang teks dalam imej jelas dibaca dan bebas kesilapan ejaan. Jangan cipta logo, jenama atau wajah individu sebenar tanpa kebenaran.',
      'Jika bahan mengandungi fakta, angka atau tarikh, tandakan sebagai [SAHKAN SEBELUM EDARAN]. Labelkan hasil sebagai kandungan janaan AI jika diedarkan secara rasmi.'
    ].filter(Boolean);
    output.textContent=parts.join('\n\n');
  };
  form.addEventListener('submit',event=>{event.preventDefault();build()});
  copyButton?.addEventListener('click',async()=>{
    const text=output.textContent;if(!text||text.startsWith('Lengkapkan')||text.startsWith('Sila nyatakan'))return;
    try{await navigator.clipboard.writeText(text)}catch(error){const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();document.execCommand('copy');area.remove()}
    const original=copyButton.textContent;copyButton.textContent='✓ Prompt disalin';setTimeout(()=>copyButton.textContent=original,1700);
  });
  resetButton?.addEventListener('click',()=>{form.reset();output.textContent='Lengkapkan maklumat di sebelah dan tekan “Jana Prompt Multimedia”.';document.getElementById('mm-title').focus()});
});
