const C="ft-v7",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:"no-store"}).then(r=>r.ok?c.put(u,r):null).catch(()=>null)))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  const key=e.request.mode==="navigate"?"index.html":u.pathname.split("/").pop()||"index.html";
  e.respondWith(fetch(u.origin+u.pathname,{cache:"no-store"}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(key,cp))}return r}).catch(()=>caches.match(key).then(r=>r||caches.match("index.html"))))});
