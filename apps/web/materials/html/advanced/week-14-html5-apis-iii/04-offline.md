# Offline Support

## Overview

Building offline-first applications ensures users can access content even without an internet connection. This combines service workers, IndexedDB, and cache APIs.

## Offline Detection

```html
<div id="onlineStatus" class="status-bar">
  <span id="statusText">Online</span>
</div>
```

```js
// Check initial state
function updateOnlineStatus() {
  const status = document.getElementById('statusText');
  const bar = document.getElementById('onlineStatus');

  if (navigator.onLine) {
    status.textContent = 'Online';
    bar.className = 'status-bar online';
    syncPendingData();
  } else {
    status.textContent = 'Offline';
    bar.className = 'status-bar offline';
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();
```

```css
.status-bar {
  padding: 8px 16px;
  text-align: center;
  font-weight: bold;
  transition: background 0.3s;
}

.status-bar.online {
  background: #2ecc71;
  color: #fff;
}

.status-bar.offline {
  background: #e74c3c;
  color: #fff;
}
```

## Offline-First Architecture

### App Shell Pattern

```html
<!-- index.html - App Shell -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offline News Reader</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <header class="app-header">
    <h1>📰 Offline News</h1>
    <span class="sync-status" id="syncStatus">Synced</span>
  </header>

  <main id="content">
    <div class="loading">Loading...</div>
  </main>

  <script src="app.js"></script>
</body>
</html>
```

### Service Worker with App Shell

```js
// sw.js
const CACHE_NAME = 'app-shell-v2';
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/offline.html',
  '/icons/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(SHELL_ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    // Network-first for pages: try network, fall back to cache
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  } else if (SHELL_ASSETS.includes(new URL(event.request.url).pathname)) {
    // Cache-first for app shell
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request);
      })
    );
  } else {
    // Network-only for API calls
    event.respondWith(networkFirst(event.request));
  }
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open('dynamic-v1');
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}
```

## Offline Data Sync

### IndexedDB Queue

```js
// db.js - Offline queue for data sync
class OfflineQueue {
  constructor(dbName = 'OfflineQueue') {
    this.dbName = dbName;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('queue')) {
          const store = db.createObjectStore('queue', {
            keyPath: 'id',
            autoIncrement: true
          });
          store.createIndex('status', 'status', { unique: false });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  async enqueue(action, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['queue'], 'readwrite');
      const store = transaction.objectStore('queue');
      const request = store.add({
        action,
        data,
        status: 'pending',
        created: new Date().toISOString(),
        retries: 0
      });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getPending() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['queue'], 'readonly');
      const store = transaction.objectStore('queue');
      const index = store.index('status');
      const request = index.getAll('pending');

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async markCompleted(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['queue'], 'readwrite');
      const store = transaction.objectStore('queue');
      const request = store.put({ id, status: 'completed' });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async incrementRetry(id, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['queue'], 'readwrite');
      const store = transaction.objectStore('queue');
      const request = store.put({ ...data, retries: data.retries + 1 });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async sync() {
    const pending = await this.getPending();

    for (const item of pending) {
      try {
        const response = await fetch(`/api/${item.action}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.data)
        });

        if (response.ok) {
          await this.markCompleted(item.id);
        }
      } catch (err) {
        console.error('Sync failed:', item.id, err);
        await this.incrementRetry(item.id, item);
      }
    }
  }
}

// Usage
const queue = new OfflineQueue();
await queue.init();

// Add to queue when offline
async function saveData(collection, data) {
  if (navigator.onLine) {
    try {
      await fetch(`/api/${collection}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch {
      await queue.enqueue(collection, data);
    }
  } else {
    await queue.enqueue(collection, data);
  }
}

// Sync when online
window.addEventListener('online', async () => {
  const syncStatus = document.getElementById('syncStatus');
  syncStatus.textContent = 'Syncing...';

  await queue.sync();

  syncStatus.textContent = 'Synced';
  setTimeout(() => { syncStatus.textContent = ''; }, 3000);
});
```

## Offline Page

```html
<!-- offline.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Offline</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f0f4f8;
    }
    .offline-card {
      text-align: center;
      padding: 48px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      max-width: 400px;
    }
    .offline-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
    h1 { color: #2c3e50; margin-bottom: 8px; }
    p { color: #7f8c8d; line-height: 1.5; }
    .cached-pages {
      margin-top: 24px;
      text-align: left;
    }
    .cached-pages a {
      display: block;
      padding: 8px 12px;
      color: #3498db;
      text-decoration: none;
      border-radius: 6px;
    }
    .cached-pages a:hover {
      background: #f0f4f8;
    }
  </style>
</head>
<body>
  <div class="offline-card">
    <div class="offline-icon">📡</div>
    <h1>No Internet Connection</h1>
    <p>You're currently offline. You can still browse cached pages.</p>
    <div class="cached-pages">
      <a href="/">🏠 Home</a>
      <a href="/about">ℹ️ About</a>
      <a href="/offline.html">📋 Saved Articles</a>
    </div>
    <p style="margin-top: 24px; font-size: 0.9em;">
      Some content may not be available until you reconnect.
    </p>
  </div>
</body>
</html>
```

## Background Sync

```js
// sw.js - Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-articles') {
    event.waitUntil(syncArticles());
  }

  if (event.tag === 'sync-comments') {
    event.waitUntil(syncComments());
  }
});

async function syncArticles() {
  const cache = await caches.open('articles-v1');
  const urls = await getPendingArticleUrls();

  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (err) {
      console.error('Failed to sync:', url, err);
    }
  }
}

// main.js - Register a sync
async function registerSync() {
  const registration = await navigator.serviceWorker.ready;

  try {
    await registration.sync.register('sync-articles');
    console.log('Background sync registered');
  } catch (err) {
    console.error('Background sync failed:', err);
  }
}
```

## Practice

1. Build an offline-first todo app that queues changes in IndexedDB when offline and syncs when connectivity returns.
2. Create a caching strategy for a news site: cache the homepage and article pages, show offline page for uncached content.
3. Implement background sync for a comment form so comments are submitted when the user comes back online.
4. Build an offline map viewer that caches map tiles and allows panning without internet.
