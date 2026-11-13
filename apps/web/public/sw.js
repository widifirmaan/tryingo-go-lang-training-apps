/* Tryngo service worker - offline runtime caching (no precache manifest). */
const VERSION = 'v2';
const STATIC_CACHE = `tryngo-static-${VERSION}`;
const DATA_CACHE = `tryngo-data-${VERSION}`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(Promise.resolve());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k.startsWith('tryngo-') && k !== STATIC_CACHE && k !== DATA_CACHE).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res && res.ok) cache.put(request, res.clone());
  return res;
}

async function networkFirst(request, cacheName) {
  try {
    const res = await fetch(request);
    if (res && res.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, res.clone());
    }
    return res;
  } catch {
    const cache = await caches.open(cacheName);
    const hit = await cache.match(request);
    if (hit) return hit;
    throw new Error('Offline and not cached');
  }
}

async function networkFirstNav(request) {
  try {
    const res = await fetch(request);
    const cache = await caches.open(DATA_CACHE);
    cache.put(request, res.clone());
    return res;
  } catch {
    const cache = await caches.open(DATA_CACHE);
    return (
      (await cache.match(request)) ||
      (await cache.match('/')) ||
      new Response('<h1>Offline</h1><p>Materi belum tersedia offline.</p>', {
        status: 503,
        headers: { 'Content-Type': 'text/html' },
      })
    );
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/wasm/')) return; // 38 MB - don't cache

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNav(request));
    return;
  }
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE)); // hashed & immutable
    return;
  }
  if (
    url.pathname.startsWith('/data/') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.xml') ||
    url.pathname === '/' ||
    url.pathname.endsWith('.md')
  ) {
    event.respondWith(networkFirst(request, DATA_CACHE));
  }
});
