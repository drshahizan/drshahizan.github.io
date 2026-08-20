document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('builder');
  const output=document.getElementById('builder-output');
  const copyButton=document.getElementById('copy-builder');
  const resetButton=document.getElementById('reset-builder');
  if(!form||!output)return;
  const value=id=>document.getElementById(id)?.value.trim()||'';
  const build=()=>{
    const task=value('task');
    if(!task){document.getElementById('task').focus();output.textContent='Sila nyatakan tugasan yang ingin diselesaikan.';return}
    const purpose=value('purpose'),audience=value('audience'),tone=value('tone'),language=value('language'),format=value('format'),length=value('length'),context=value('context');
    const parts=[
      'Bertindak sebagai pembantu profesional yang teliti dan bertanggungjawab.',
      `Tugasan: ${task}.`,
      purpose&&`Tujuan: ${purpose}.`,
      audience&&`Sasaran pembaca: ${audience}.`,
      context&&`Gunakan konteks dan fakta yang dibenarkan berikut sahaja:\n${context}`,
      `Hasilkan jawapan dalam ${language}, dengan nada ${tone.toLowerCase()}.`,
      `Gunakan format ${format.toLowerCase()} dan tahap penerangan ${length.toLowerCase()}.`,
      'Jangan mereka fakta, nama, tarikh, angka, polisi atau sumber. Tandakan maklumat yang tidak lengkap sebagai [PERLU DISAHKAN].',
      'Sebelum memberikan jawapan akhir, semak ketepatan, kejelasan, kesesuaian nada dan pematuhan kepada arahan.'
    ].filter(Boolean);
    output.textContent=parts.join('\n\n');
  };
  form.addEventListener('submit',event=>{event.preventDefault();build()});
  copyButton?.addEventListener('click',async()=>{
    const text=output.textContent;if(!text||text.startsWith('Lengkapkan')||text.startsWith('Sila nyatakan'))return;
    try{await navigator.clipboard.writeText(text)}catch(error){const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();document.execCommand('copy');area.remove()}
    const original=copyButton.textContent;copyButton.textContent='✓ Prompt disalin';setTimeout(()=>copyButton.textContent=original,1700);
  });
  resetButton?.addEventListener('click',()=>{form.reset();output.textContent='Lengkapkan maklumat di sebelah dan tekan “Jana Prompt”.';document.getElementById('task').focus()});
});
