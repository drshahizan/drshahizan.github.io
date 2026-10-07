document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.copyable-prompt').forEach((box,index)=>{
    const button=document.createElement('button');
    button.type='button';
    button.className='copy-video-prompt';
    button.textContent=`Salin Prompt ${index+1}`;
    button.addEventListener('click',async()=>{
      const text=[...box.childNodes].filter(node=>node!==button).map(node=>node.textContent).join('').trim();
      try{await navigator.clipboard.writeText(text)}catch{const area=document.createElement('textarea');area.value=text;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove()}
      button.textContent='Prompt Disalin';button.classList.add('copied');
      setTimeout(()=>{button.textContent=`Salin Prompt ${index+1}`;button.classList.remove('copied')},1600);
    });
    box.appendChild(button);
  });
});
