# Caching Strategies

## Overview

Choosing the right caching strategy for each resource type is critical for PWA performance and offline reliability.

## Strategy Comparison

| Strategy | Use Case | Freshness | Speed | Offline |
|----------|----------|-----------|-------|---------|
| Cache First | Static assets | Stale | Fastest | ✓ |
| Network First | API data, pages | Fresh | Fast if cached | ✓ |
| Stale-While-Revalidate | News, profiles | Eventual | Fast | ✓ |
| Network Only | Forms, auth | Always fresh | Slow | ✗ |
| Cache Only | Offline assets | Stale | Fastest | ✓ |

## Implementation Patterns

### Cache First

```js
// sw.js - Cache First Strategy
async function cacheFirst(request, cacheName = 'static-v1') {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return fallback if available
    if (request.destination === 'image') {
      return caches.match('/images/fallback.png');
    }
    throw error;
  }
}
```

### Network First

```js
// sw.js - Network First Strategy
async function networkFirst(request, cacheName = 'dynamic-v1') {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // For navigation requests, return offline page
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }

    throw error;
  }
}
```

### Stale-While-Revalidate

```js
// sw.js - Stale-While-Revalidate Strategy
async function staleWhileRevalidate(request, cacheName = 'dynamic-v1') {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  // Return cached immediately, or wait for network if no cache
  return cachedResponse || fetchPromise;
}
```

### Cache Only

```js
// sw.js - Cache Only Strategy
async function cacheOnly(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || new Response('Not found in cache', {
    status: 404,
    statusText: 'Not Found'
  });
}
```

### Network Only

```js
// sw.js - Network Only Strategy
function networkOnly(request) {
  return fetch(request);
}
```

## Mixed Strategy Example

```js
// sw.js - Selective caching based on resource type
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Same-origin requests
  if (url.origin === location.origin) {
    // App shell (cache first)
    if (request.mode === 'navigate' ||
        STATIC_ASSETS.includes(url.pathname)) {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
      return;
    }

    // API calls (network first)
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirst(request, API_CACHE));
      return;
    }

    // Images (stale while revalidate)
    if (request.destination === 'image') {
      event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
      return;
    }

    // Default: network first
    event.respondWith(networkFirst(request));
    return;
  }

  // Third-party requests
  // Google Fonts (cache first)
  if (url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONTS_CACHE));
    return;
  }

  // CDN resources (stale while revalidate)
  if (url.hostname.includes('cdn')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Analytics (network only, don't cache)
  if (url.hostname === 'www.google-analytics.com') {
    event.respondWith(networkOnly(request));
    return;
  }
});
```

## Cache Management

```js
// Cache size management
const MAX_CACHE_SIZE = 50; // Max items per dynamic cache

async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    // Delete oldest items
    const toDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(toDelete.map(key => cache.delete(key)));
    console.log(`Trimmed ${toDelete.length} items from ${cacheName}`);
  }
}

// Periodic cache cleanup
async function cleanCaches() {
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
  const cacheNames = await caches.keys();

  for (const name of cacheNames) {
    if (name.startsWith('dynamic-') || name.startsWith('api-')) {
      const cache = await caches.open(name);
      const requests = await cache.keys();

      for (const request of requests) {
        const response = await cache.match(request);
        const date = response.headers.get('date');

        if (date) {
          const age = Date.now() - new Date(date).getTime();
          if (age > maxAge) {
            await cache.delete(request);
          }
        }
      }
    }
  }
}

// Run cleanup periodically
self.addEventListener('activate', (event) => {
  event.waitUntil(cleanCaches());
});
```

## Cache Preloading

```js
// sw.js - Navigation preload
self.addEventListener('activate', (event) => {
  // Enable navigation preload
  event.waitUntil(
    self.registration.navigationPreload.enable()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try network with preload
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;
          return caches.match('/offline.html');
        }
      })()
    );
  }
});
```

## Practice

1. Implement all five caching strategies for different resource types (static, API, images, fonts, pages).
2. Build a cache management system that limits dynamic cache to 100 items and clears items older than 30 days.
3. Create a strategy that serves cached content immediately while fetching fresh content in the background (stale-while-revalidate).
4. Implement navigation preload to reduce navigation request latency.
