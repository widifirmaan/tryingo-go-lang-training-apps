# Service Worker Deep Dive

## Overview

Service workers are the core of PWA functionality, enabling offline support, caching, and background operations.

### Registration with Updates

```js
// main.js - Robust service worker registration
class PWAInstaller {
  constructor() {
    this.swRegistration = null;
    this.deferredPrompt = null;
  }

  async init() {
    if (!('serviceWorker' in navigator)) {
      console.log('Service workers not supported');
      return;
    }

    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'  // Always check for updates
      });

      console.log('SW registered:', this.swRegistration.scope);

      this.setupUpdateHandling();
      this.setupInstallPrompt();
    } catch (err) {
      console.error('SW registration failed:', err);
    }
  }

  setupUpdateHandling() {
    this.swRegistration.addEventListener('updatefound', () => {
      const newWorker = this.swRegistration.installing;

      newWorker.addEventListener('statechange', () => {
        switch (newWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // New version available
              this.showUpdateNotification(newWorker);
            }
            break;
          case 'activated':
            console.log('New SW activated');
            break;
        }
      });
    });

    // Reload when new SW takes control
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }

  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.hideInstallButton();
      // Track installation
      if ('ga' in window) {
        ga('send', 'event', 'pwa', 'install');
      }
    });
  }

  showUpdateNotification(worker) {
    const banner = document.createElement('div');
    banner.className = 'update-banner';
    banner.innerHTML = `
      <p>A new version is available!</p>
      <button onclick="updateApp()">Update</button>
    `;
    document.body.appendChild(banner);

    window.updateApp = () => {
      worker.postMessage({ action: 'skipWaiting' });
    };
  }

  showInstallButton() {
    const btn = document.getElementById('installBtn');
    if (btn) {
      btn.hidden = false;
      btn.addEventListener('click', async () => {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const result = await this.deferredPrompt.userChoice;
        console.log('Install result:', result.outcome);
        this.deferredPrompt = null;
        btn.hidden = true;
      });
    }
  }

  hideInstallButton() {
    const btn = document.getElementById('installBtn');
    if (btn) btn.hidden = true;
  }
}

const pwa = new PWAInstaller();
pwa.init();
```

## Complete Service Worker

```js
// sw.js - Complete production-ready service worker
const CACHE_VERSION = 2;
const STATIC_CACHE = `static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-v${CACHE_VERSION}`;
const IMMUTABLE_CACHE = `immutable-v${CACHE_VERSION}`;
const API_CACHE = `api-v${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/pwa.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/fonts/inter-var.woff2'
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      self.skipWaiting();
    })
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![STATIC_CACHE, DYNAMIC_CACHE, IMMUTABLE_CACHE, API_CACHE]
            .includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip browser extension requests
  if (!url.protocol.startsWith('http')) return;

  // Static assets: cache-first
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Images: cache-first with fallback
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Fonts: cache-first (immutable)
  if (request.destination === 'font') {
    event.respondWith(cacheFirst(request, IMMUTABLE_CACHE));
    return;
  }

  // API calls: network-first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // Navigation: network-first, fallback to offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirst(request).catch(() => {
        return caches.match('/offline.html');
      })
    );
    return;
  }

  // Everything else: network-first
  event.respondWith(networkFirst(request));
});

// Caching strategies
async function cacheFirst(request, cacheName = STATIC_CACHE) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return fallback for images
    if (request.destination === 'image') {
      return caches.match('/icons/icon-192.png');
    }
    throw error;
  }
}

async function networkFirst(request, cacheName = DYNAMIC_CACHE) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

// Message handling
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }

  if (event.data.action === 'cacheUrls') {
    caches.open(STATIC_CACHE).then((cache) => {
      cache.addAll(event.data.urls);
    });
  }

  if (event.data.action === 'clearCache') {
    caches.keys().then((names) => {
      Promise.all(names.map(name => caches.delete(name)));
    });
  }
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-articles') {
    event.waitUntil(syncArticles());
  }
});

async function syncArticles() {
  const cache = await caches.open(API_CACHE);
  // Sync pending articles from IndexedDB
  const articles = await getPendingArticles();
  for (const article of articles) {
    const response = await fetch(`/api/articles/${article.id}`);
    if (response.ok) {
      cache.put(`/api/articles/${article.id}`, response);
    }
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'read', title: 'Read Article' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      const existing = windowClients.find(client =>
        client.url === url && 'focus' in client
      );

      if (existing) {
        existing.focus();
      } else {
        clients.openWindow(url);
      }
    })
  );
});
```

## Practice

1. Implement a service worker with a cache-first strategy for static assets and network-first for API calls.
2. Add background sync to queue form submissions when offline and sync when connectivity returns.
3. Implement push notification support with notification click handling.
4. Create a service worker update flow that shows a "New version available" banner and allows updating.
