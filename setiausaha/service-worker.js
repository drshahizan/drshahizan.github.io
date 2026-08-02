const CACHE='setiausaha-utm-v9';
const CORE=['./index.html','./prompt-ai.html','./panduan-ai.html','./sumber-ai.html','./style.css','./prompts.js','./prompt-ai.js','./panduan-ai.js','./sumber-ai.js','./script.js','./manifest.json','./assets/slides/slide-01.jpg','./assets/slides/slide-24.jpg','./assets/slides/slide-41.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok&&e.request.method==='GET'){const y=x.clone();
caches.open(CACHE).then(c=>c.put(e.request,y))}return x}).catch(()=>caches.match('./index.html')))));
