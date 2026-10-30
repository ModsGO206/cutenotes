const C='gitnotes-v7',F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
const put=(r,x)=>{const c=x.clone();caches.open(C).then(k=>k.put(r,c)).catch(()=>{});return x};
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);
 if(u.origin===location.origin){
  e.respondWith(fetch(r).then(x=>x.ok?put(r,x):x).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));
 }else if(/fonts\.(googleapis|gstatic)\.com$/.test(u.host)){
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>put(r,x))));
 }
});
