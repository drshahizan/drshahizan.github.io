(() => {
  'use strict';
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.hub-links');
  menu?.addEventListener('click', () => {
    const open = links?.classList.toggle('open') || false;
    menu.setAttribute('aria-expanded', String(open));
  });
  links?.addEventListener('click', () => {
    links.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  });
})();
document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="enhanced.css?v=20260811-1">');
const enhancedScript=document.createElement('script');
enhancedScript.src='enhanced.js?v=20260811-1';
enhancedScript.defer=true;
document.head.appendChild(enhancedScript);
if(location.pathname.endsWith('/latihan.html')||location.pathname.endsWith('latihan.html')){const exerciseScript=document.createElement('script');exerciseScript.src='latihan-enhanced.js?v=20260811-1';document.head.appendChild(exerciseScript)}
