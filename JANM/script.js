const menuButton=document.querySelector('.hamb'),nav=document.querySelector('.nav nav');menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰'});nav.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'});document.querySelectorAll('[data-day]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-day]').forEach(x=>x.classList.toggle('active',x===button));document.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=panel.dataset.panel!==button.dataset.day)}));const topButton=document.querySelector('.to-top');addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--scroll',`${max?scrollY/max*100:0}%`);topButton.classList.toggle('show',scrollY>600)});topButton.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

// Pastikan imej utama muat mengikut lebar skrin tanpa mendominasi halaman.
const heroArt=document.querySelector('.hero-art');
if(heroArt){
  heroArt.style.width='min(100%, 620px)';
  heroArt.style.justifySelf='center';
  const heroImage=heroArt.querySelector('img');
  if(heroImage){
    heroImage.style.width='100%';
    heroImage.style.height='auto';
    heroImage.style.objectFit='contain';
  }
}
document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="enhanced.css?v=20260811-1">');
const enhancedScript=document.createElement('script');enhancedScript.src='enhanced.js?v=20260811-1';enhancedScript.defer=true;document.head.appendChild(enhancedScript);
