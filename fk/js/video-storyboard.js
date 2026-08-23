document.addEventListener('DOMContentLoaded',()=>{
  const carousel=document.querySelector('[data-story-carousel]');
  if(!carousel)return;
  const panels=[...carousel.querySelectorAll('.story-panel')];
  const dots=carousel.querySelector('.story-dots');
  let current=0;
  const buttons=panels.map((_,index)=>{
    const button=document.createElement('button');
    button.type='button';
    button.setAttribute('aria-label',`Buka storyboard ${index+1}`);
    button.addEventListener('click',()=>show(index));
    dots.append(button);
    return button;
  });
  function show(index){
    current=(index+panels.length)%panels.length;
    panels.forEach((panel,i)=>{panel.hidden=i!==current;panel.classList.toggle('active',i===current)});
    buttons.forEach((button,i)=>button.classList.toggle('active',i===current));
  }
  carousel.querySelector('.prev').addEventListener('click',()=>show(current-1));
  carousel.querySelector('.next').addEventListener('click',()=>show(current+1));
  carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')show(current-1);if(event.key==='ArrowRight')show(current+1)});
  show(0);
});
