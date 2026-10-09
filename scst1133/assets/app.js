const brandMark=document.querySelector('.brand-mark');
if(brandMark)brandMark.textContent='FC';
const siteNav=document.querySelector('.site-header nav');
if(siteNav&&![...siteNav.querySelectorAll('a')].some(link=>link.textContent.trim()==='Students')){
  const homeHref=siteNav.querySelector('a')?.getAttribute('href')||'index.html';
  const studentHref=homeHref.startsWith('../')?'../students/index.html':'students/index.html';
  const studentLink=document.createElement('a');
  studentLink.href=studentHref;studentLink.textContent='Students';
  const announcements=[...siteNav.querySelectorAll('a')].find(link=>link.textContent.trim()==='Announcements');
  siteNav.insertBefore(studentLink,announcements||siteNav.querySelector('.survey-link'));
}
document.querySelector('.menu')?.addEventListener('click',()=>siteNav?.classList.toggle('open'));
