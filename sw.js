/* ExecutiveOS offline app shell. All URLs stay inside this GitHub Pages project. */
const CACHE_PREFIX = "executiveos-shell-";
const CACHE_NAME = CACHE_PREFIX + "v4";
const CORE_FILES = ["", "index.html", "manifest.webmanifest", "favicon.svg", "icon-192.svg", "icon-512.svg"];
const absolute = path => new URL(path, self.registration.scope).href;

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_FILES.map(absolute));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response && response.ok) cache.put(request, response.clone());
        return response;
      } catch (error) {
        return (await cache.match(request)) || (await cache.match(absolute("index.html"))) || (await cache.match(absolute("")));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type === "basic") cache.put(request, response.clone());
      return response;
    } catch (error) {
      return new Response("Offline — this resource is not cached yet.", {status: 503, headers: {"Content-Type": "text/plain; charset=utf-8"}});
    }
  })());
});
