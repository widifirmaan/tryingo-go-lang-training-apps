# Service Workers

## Overview

A service worker is a script that runs in the background, separate from the web page, enabling features like offline support, push notifications, and background sync.

### Lifecycle

```txt
Installing → Installed → Activating → Activated → (Idle / Fetch)
                        ↓
                   Redundant (on update)
```

## Registering a Service Worker

```js
// main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/' // Default: relative to script location
      });

      console.log('SW registered:', registration.scope);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            showUpdateNotification();
          }
        });
      });

    } catch (err) {
      console.error('SW registration failed:', err);
    }
  });
}
```

## Service Worker Lifecycle Events

```js
// sw.js
const CACHE_NAME = 'my-app-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/app.js',
  '/images/logo.png',
  '/offline.html'
];

// Install event: cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        // Force activation without waiting for page reload
        return self.skipWaiting();
      })
  );
});

// Activate event: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all open pages
      return self.clients.claim();
    })
  );
});

// Fetch event: intercept network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cache the response for future
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(() => {
          // If network fails, return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});
```

## Caching Strategies

### Cache First (Offline-first)

```js
// sw.js - Cache First Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Return cached version immediately, then update in background
      const fetchPromise = fetch(event.request).then((response) => {
        // Update cache
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
        });
        return response;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
```

### Network First (Stale-while-revalidate)

```js
// sw.js - Network First
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache the fresh response
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        // Fall back to cache
        return caches.match(event.request);
      })
  );
});
```

### Network Only

```js
// sw.js - Network Only
self.addEventListener('fetch', (event) => {
  // Just pass through to network
  event.respondWith(fetch(event.request));
});
```

### Cache Only

```js
// sw.js - Cache Only
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request));
});
```

## Message Passing

```js
// main.js
// Send message to service worker
navigator.serviceWorker.controller.postMessage({
  type: 'SKIP_WAITING'
});

// Listen for messages from service worker
navigator.serviceWorker.addEventListener('message', (event) => {
  console.log('Message from SW:', event.data);
  if (event.data.type === 'UPDATE_AVAILABLE') {
    showUpdateBanner();
  }
});
```

```js
// sw.js
// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CACHE_URLS') {
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(event.data.urls);
    });
  }

  // Send response to client
  event.ports[0].postMessage({ status: 'done' });
});

// Periodic sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-news') {
    event.waitUntil(fetchAndCacheNews());
  }
});
```

## Push Notifications

```js
// main.js
// Request permission and subscribe
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  // Send subscription to server
  await fetch('/api/push/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'Content-Type': 'application/json' }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
```

```js
// sw.js
self.addEventListener('push', (event) => {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url,
      dateOfArrival: Date.now()
    },
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'close', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
```

## Update Flow

```js
// main.js - Handle service worker updates
let swRegistration = null;

async function setupSW() {
  swRegistration = await navigator.serviceWorker.register('/sw.js');

  swRegistration.addEventListener('updatefound', () => {
    const newWorker = swRegistration.installing;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        showUpdateToast('New version available!', () => {
          newWorker.postMessage({ type: 'SKIP_WAITING' });
        });
      }
    });
  });

  // Reload page when new SW takes over
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}

setupSW();
```

## Practice

1. Create a service worker that caches all pages of a simple website and serves them offline.
2. Implement a "Cache then Network" strategy for a blog where the cached version shows immediately, then updates when the network responds.
3. Build a service worker that caches images separately with a different cache name and deletes old image caches on activate.
4. Create a service worker with push notification support: subscribe, display notifications, and handle notification clicks.
