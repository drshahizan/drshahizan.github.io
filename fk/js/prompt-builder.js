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
    const domain=value('domain'),process=value('process'),purpose=value('purpose'),audience=value('audience'),source=value('source'),tone=value('tone'),language=value('language'),format=value('format'),context=value('context'),checks=value('checks');
    const parts=[
      `Bertindak sebagai pembantu pentadbiran yang teliti bagi ${domain}.`,
      `Skop proses: ${process}.`,
      `Tugasan: ${task}.`,
      purpose&&`Tujuan: ${purpose}.`,
      audience&&`Penerima hasil: ${audience}.`,
      source&&`Gunakan hanya sumber rujukan berikut: ${source}. Jika sumber tidak mencukupi, tandakan perkara tersebut untuk pengesahan.`,
      context&&`Gunakan konteks dan fakta yang dibenarkan berikut sahaja:\n${context}`,
      `Hasilkan jawapan dalam ${language}, dengan nada ${tone.toLowerCase()}.`,
      `Gunakan format ${format.toLowerCase()}.`,
      checks&&`Semakan wajib: ${checks}.`,
      'Jangan mereka fakta, kelayakan, keputusan, nama, tarikh, angka, polisi atau sumber. Jangan membuat keputusan bagi pihak pegawai atau panel dan jangan mengubah rekod rasmi. Tandakan maklumat tidak lengkap sebagai [PERLU DISAHKAN DALAM SISTEM/SUMBER RASMI].',
      'Lindungi kerahsiaan staf dan pelajar. Jika input mengandungi data peribadi atau sensitif, hentikan pemprosesan dan minta versi yang telah dinyahpengenal.',
      'Sebelum jawapan akhir, semak ketepatan, kelengkapan, nada, privasi, sumber rujukan dan tindakan susulan. Akhiri dengan bahagian “Perkara untuk Pengesahan Pegawai”.'
    ].filter(Boolean);
    output.textContent=parts.join('\n\n');
  };
  form.addEventListener('submit',event=>{event.preventDefault();build()});
  copyButton?.addEventListener('click',async()=>{
    const text=output.textContent;if(!text||text.startsWith('Lengkapkan')||text.startsWith('Sila nyatakan'))return;
    try{await navigator.clipboard.writeText(text)}catch(error){const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();document.execCommand('copy');area.remove()}
    const original=copyButton.textContent;copyButton.textContent='✓ Prompt disalin';setTimeout(()=>copyButton.textContent=original,1700);
  });
  resetButton?.addEventListener('click',()=>{form.reset();output.textContent='Lengkapkan maklumat di sebelah dan tekan “Jana Prompt Kerja”.';document.getElementById('task').focus()});
});
