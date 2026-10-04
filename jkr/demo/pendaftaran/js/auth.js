const USERS={admin:{password:'admin123',name:'Nur Aina Ahmad',role:'Pentadbir'},penyelaras:{password:'jkr123',name:'Siti Farhana',role:'Penyelaras Program'},urusetia:{password:'jkr123',name:'Mohd Amirul',role:'Urus Setia'},pengurusan:{password:'jkr123',name:'Ir. Norazlan',role:'Pengurusan'}};
const form=document.querySelector('#loginForm');
const dialog=document.querySelector('#accountsDialog');
const usernameInput=document.querySelector('#username');
const passwordInput=document.querySelector('#password');
const rememberInput=document.querySelector('#remember');
const loginError=document.querySelector('#loginError');
const toggleButton=document.querySelector('#togglePassword');
const accountsButton=document.querySelector('#showAccounts');
function safeStorage(name){try{const storage=window[name];const test='__daftarkita_test__';storage.setItem(test,'1');storage.removeItem(test);return storage}catch{return null}}
// Halaman log masuk sentiasa dipaparkan apabila index.html dibuka.
toggleButton.onclick=()=>passwordInput.type=passwordInput.type==='password'?'text':'password';
accountsButton.onclick=()=>dialog.showModal();
document.querySelector('.dialog-close').onclick=()=>dialog.close();
document.querySelectorAll('.demo-list button').forEach(b=>b.onclick=()=>{usernameInput.value=b.dataset.user;passwordInput.value=b.dataset.pass;dialog.close()});
form.onsubmit=e=>{e.preventDefault();const u=usernameInput.value.trim(),r=USERS[u];if(!r||r.password!==passwordInput.value){loginError.textContent='ID pengguna atau kata laluan tidak sah.';return}const s={username:u,name:r.name,role:r.role,time:Date.now(),persistent:rememberInput.checked};for(const storage of [safeStorage('localStorage'),safeStorage('sessionStorage')]){try{storage&&storage.setItem('daftarkitaSession',JSON.stringify(s))}catch{}}location.assign('dashboard.html')};
