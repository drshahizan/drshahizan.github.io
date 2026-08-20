document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu');
  const links=document.querySelector('.hub-links');
  if(menu&&links){
    menu.addEventListener('click',()=>{
      const open=links.classList.toggle('open');
      menu.setAttribute('aria-expanded',String(open));
      menu.textContent=open?'×':'☰';
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      links.classList.remove('open');
      menu.setAttribute('aria-expanded','false');
      menu.textContent='☰';
    }));
  }
});
