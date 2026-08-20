document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.copy-prompt[data-target]').forEach(button=>{
    const original=button.textContent;
    button.addEventListener('click',async()=>{
      const target=document.getElementById(button.dataset.target);
      const text=target?.textContent.trim();
      if(!text)return;
      try{await navigator.clipboard.writeText(text)}catch(error){
        const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();document.execCommand('copy');area.remove();
      }
      button.textContent='✓ Disalin';
      setTimeout(()=>button.textContent=original,1700);
    });
  });
});
