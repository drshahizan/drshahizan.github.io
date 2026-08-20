document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('ad-builder');
  const output=document.getElementById('ad-output');
  const copyButton=document.getElementById('ad-copy');
  const resetButton=document.getElementById('ad-reset');
  if(!form||!output)return;
  const value=id=>document.getElementById(id)?.value.trim()||'';
  const build=()=>{
    const topic=value('ad-topic');
    if(!topic){document.getElementById('ad-topic').focus();output.textContent='Sila nyatakan topik atau tujuan utama.';return}
    const details=value('ad-details');
    if(!details){document.getElementById('ad-details').focus();output.textContent='Sila nyatakan soalan, keperluan atau konsep utama.';return}
    const type=value('ad-type'),audience=value('ad-audience'),source=value('ad-source'),format=value('ad-format'),language=value('ad-language'),constraints=value('ad-constraints');
    let opening,detailLabel,closingTip;
    if(type==='Deep Research'){
      opening=`Jalankan Deep Research mengenai ${topic}.`;
      detailLabel='Soalan kajian utama';
      closingTip='Gunakan hanya sumber yang boleh dipercayai dan sertakan rujukan bernombor bagi setiap dapatan penting. Jangan reka fakta atau angka; tandakan maklumat yang tidak disahkan sebagai [PERLU DISAHKAN]. Sertakan senarai rujukan di penghujung laporan.';
    }else if(type==='Canvas'){
      opening=`Buka Canvas dan bina ${topic}.`;
      detailLabel='Keperluan atau struktur';
      closingTip='Selepas draf pertama, saya akan tanda bahagian tertentu untuk diperhalusi secara berasingan tanpa menjana semula keseluruhan dokumen.';
    }else if(type==='Gems'){
      opening=`Cipta Gem bernama "${topic}".`;
      detailLabel='Peranan dan tugas Gem';
      closingTip='Gem mesti sentiasa ikut format ini secara konsisten setiap kali digunakan, dan tidak boleh mereka fakta, angka atau keputusan.';
    }else{
      opening=`Aktifkan Guided Learning untuk membantu saya faham ${topic}.`;
      detailLabel='Konsep atau soalan yang ingin difahami';
      closingTip='Terangkan langkah demi langkah, guna gambar, rajah atau kuiz jika membantu, dan uji kefahaman saya dengan soalan ringkas di akhir.';
    }
    const parts=[
      opening,
      audience&&`Audiens/penerima: ${audience}.`,
      `${detailLabel}:\n${details}`,
      source&&`Gunakan hanya sumber atau data berikut: ${source}.`,
      format&&`Format output: ${format.toLowerCase()}.`,
      language&&`Bahasa: ${language}.`,
      constraints&&`Kekangan: ${constraints}.`,
      closingTip,
      'Jika bahan mengandungi fakta, angka atau tarikh, tandakan sebagai [SAHKAN SEBELUM EDARAN]. AI menyediakan analisis dan cadangan sahaja — pegawai bertanggungjawab mesti mengesahkan sebelum keputusan rasmi dibuat.'
    ].filter(Boolean);
    output.textContent=parts.join('\n\n');
  };
  form.addEventListener('submit',event=>{event.preventDefault();build()});
  copyButton?.addEventListener('click',async()=>{
    const text=output.textContent;if(!text||text.startsWith('Lengkapkan')||text.startsWith('Sila nyatakan'))return;
    try{await navigator.clipboard.writeText(text)}catch(error){const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();document.execCommand('copy');area.remove()}
    const original=copyButton.textContent;copyButton.textContent='✓ Prompt disalin';setTimeout(()=>copyButton.textContent=original,1700);
  });
  resetButton?.addEventListener('click',()=>{form.reset();output.textContent='Lengkapkan maklumat di sebelah dan tekan “Jana Prompt Analisis Data”.';document.getElementById('ad-topic').focus()});
});
