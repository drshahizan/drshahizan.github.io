const guideTheme=document.querySelector('#guideTheme');
if(localStorage.theme==='dark')document.body.classList.add('dark');
guideTheme.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.theme=document.body.classList.contains('dark')?'dark':'light'});
const topButton=document.querySelector('#guideTop');window.addEventListener('scroll',()=>topButton.classList.toggle('show',scrollY>600));topButton.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
