/* ExecutiveOS offline app shell. All URLs stay inside this GitHub Pages project. */
const CACHE_PREFIX = "executiveos-shell-";
const CACHE_NAME = CACHE_PREFIX + "v46";
const CORE_FILES = ["", "index.html", "manifest.webmanifest", "favicon.svg", "manifest.webmanifest?v=45", "favicon.svg?v=45", "icon-192.svg", "icon-512.svg", "world-sim.js", "executiveos-ui.css", "three-card-depth.js", "three.module.min.js", "three.core.min.js", "executiveos-ui.css?v=46", "three-card-depth.js?v=46", "world-sim.js?v=44"];
const absolute = path => new URL(path, self.registration.scope).href;

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const requests = CORE_FILES.map(path => new Request(absolute(path), {cache: "reload"}));
    const responses = await Promise.all(requests.map(async request => {
      const response = await fetch(request);
      if (!response.ok) throw new Error("Unable to refresh app shell: " + request.url);
      return [request, response];
    }));
    await Promise.all(responses.map(([request, response]) => cache.put(request, response)));
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
        const response = await fetch(request, {cache: "no-store"});
        if (response && response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        return (await cache.match(request)) || (await cache.match(absolute("index.html"))) || (await cache.match(absolute("")));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const isAppCode = ["style", "script", "document"].includes(request.destination) ||
      request.url.includes(".module.js");
    if (isAppCode) {
      try {
        const fresh = await fetch(request, {cache: "no-store"});
        if (fresh && fresh.ok && fresh.type === "basic") {
          await cache.put(request, fresh.clone());
          return fresh;
        }
      } catch (error) {
        // Offline: use the latest copy installed into this cache version.
      }
      const cached = await cache.match(request);
      return cached || new Response("Offline — this app resource is not cached.", {
        status: 503, headers: {"Content-Type": "text/plain; charset=utf-8"}
      });
    }
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type === "basic") await cache.put(request, response.clone());
      return response;
    } catch (error) {
      return new Response("Offline — this resource is not cached yet.", {status: 503, headers: {"Content-Type": "text/plain; charset=utf-8"}});
    }
  })());
});
