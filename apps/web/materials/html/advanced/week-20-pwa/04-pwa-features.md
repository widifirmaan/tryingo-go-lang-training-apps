# PWA Features

## Overview

Beyond manifest and service worker, PWAs can include installation prompts, push notifications, background sync, and more.

## Install Prompt

```html
<button id="installBtn" class="install-button" hidden>
  📲 Install App
</button>
```

```js
// main.js - Installation handling
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('installBtn');
  installBtn.hidden = false;

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === 'accepted') {
      console.log('User installed the PWA');
      trackEvent('pwa', 'installed');
    } else {
      console.log('User declined installation');
    }

    deferredPrompt = null;
    installBtn.hidden = true;
  });
});

// Track installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  const installBtn = document.getElementById('installBtn');
  if (installBtn) installBtn.hidden = true;

  // Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'install', {
      'event_category': 'PWA',
      'event_label': 'Installed'
    });
  }
});

// Check if already installed
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('Running in standalone mode');
  document.body.classList.add('pwa-mode');
}
```

## Push Notifications

### Request Permission and Subscribe

```js
// main.js - Push notification setup
class PushManager {
  constructor() {
    this.applicationServerKey = null;
    this.swRegistration = null;
  }

  async init() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      return;
    }

    this.swRegistration = await navigator.serviceWorker.ready;
    this.applicationServerKey = await this.getVapidPublicKey();

    if (Notification.permission === 'granted') {
      await this.subscribe();
    }
  }

  async requestPermission() {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      await this.subscribe();
      return true;
    } else {
      console.log('Push permission denied');
      return false;
    }
  }

  async subscribe() {
    if (!this.swRegistration) return;

    try {
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.applicationServerKey)
      });

      // Send to server
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      console.log('Push subscription successful');
      return subscription;
    } catch (err) {
      console.error('Push subscription failed:', err);
    }
  }

  async unsubscribe() {
    if (!this.swRegistration) return;

    const subscription = await this.swRegistration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint })
      });
    }
  }

  async getVapidPublicKey() {
    try {
      const res = await fetch('/api/push/vapid-key');
      const data = await res.json();
      return data.publicKey;
    } catch {
      return 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgD4Q==';
    }
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const output = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      output[i] = rawData.charCodeAt(i);
    }
    return output;
  }
}

const pushManager = new PushManager();
pushManager.init();

// UI: enable/disable notifications
document.getElementById('enableNotificationsBtn')
  .addEventListener('click', () => pushManager.requestPermission());

document.getElementById('disableNotificationsBtn')
  .addEventListener('click', () => pushManager.unsubscribe());
```

### Service Worker Push Handler

```js
// sw.js
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge.png',
    vibrate: data.vibrate || [200, 100, 200],
    data: {
      url: data.url || '/',
      timestamp: Date.now()
    },
    actions: data.actions || [
      { action: 'open', title: 'Open' },
      { action: 'dismiss', title: 'Dismiss' }
    ],
    tag: data.tag || 'default',
    renotify: data.renotify || false,
    requireInteraction: data.requireInteraction || false
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  const url = event.notification.data.url;

  if (action === 'dismiss') return;

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Focus existing window or open new one
      const existingClient = windowClients.find(client =>
        client.url.includes(url) && 'focus' in client
      );

      if (existingClient) {
        existingClient.focus();
      } else {
        clients.openWindow(url);
      }
    })
  );
});
```

## Background Sync

```js
// main.js - Background sync registration
async function registerSync() {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;

  // Check if sync is supported
  if ('sync' in registration) {
    await registration.sync.register('sync-comments');
    console.log('Background sync registered');
  }
}

// Auto-sync when online
window.addEventListener('online', () => {
  registerSync();
});

// Queue data when offline
async function saveComment(comment) {
  // Store locally
  const db = await openCommentsDB();
  await db.add('pending', comment);

  // Try to sync
  if (navigator.onLine) {
    await syncComments();
  } else {
    registerSync();
    showOfflineNotification();
  }
}
```

```js
// sw.js - Background sync handler
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-comments') {
    event.waitUntil(syncPendingComments());
  }

  if (event.tag === 'sync-articles') {
    event.waitUntil(syncFavoriteArticles());
  }
});

async function syncPendingComments() {
  const db = await openCommentsDB();
  const pending = await db.getAll('pending');

  for (const item of pending) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.data)
      });

      if (response.ok) {
        await db.delete('pending', item.id);
      }
    } catch (err) {
      console.error('Sync failed for comment:', item.id, err);
    }
  }
}
```

## Periodic Sync

```js
// sw.js - Periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-news') {
    event.waitUntil(fetchAndCacheNews());
  }
});

// main.js - Register periodic sync
async function registerPeriodicSync() {
  const registration = await navigator.serviceWorker.ready;

  if ('periodicSync' in registration) {
    try {
      await registration.periodicSync.register('update-news', {
        minInterval: 24 * 60 * 60 * 1000 // Once per day
      });
      console.log('Periodic sync registered');
    } catch (err) {
      console.error('Periodic sync failed:', err);
    }
  }
}
```

## Share Target API

```json
// manifest.json
{
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [
        {
          "name": "image",
          "accept": ["image/jpeg", "image/png"]
        }
      ]
    }
  }
}
```

```html
<!-- share.html - Handle shared content -->
<h1>Share received!</h1>
<div id="shared-content"></div>

<script>
  window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(location.search);
    const content = document.getElementById('shared-content');

    content.innerHTML = `
      <p><strong>Title:</strong> ${params.get('title') || 'N/A'}</p>
      <p><strong>Text:</strong> ${params.get('text') || 'N/A'}</p>
      <p><strong>URL:</strong> ${params.get('url') || 'N/A'}</p>
    `;
  });
</script>
```

## PWA Testing

```js
// Check PWA capabilities
const pwaCapabilities = {
  serviceWorker: 'serviceWorker' in navigator,
  pushManager: 'PushManager' in window,
  notification: 'Notification' in window,
  sync: 'sync' in ServiceWorkerRegistration.prototype,
  periodicSync: 'periodicSync' in ServiceWorkerRegistration.prototype,
  shareTarget: 'shareTarget' in window,
  badging: 'setAppBadge' in navigator,
  fileSystem: 'showDirectoryPicker' in window
};

console.table(pwaCapabilities);
```

## Practice

1. Implement the full install prompt flow: defer prompt, show custom button, handle user choice, track installation.
2. Build a push notification system with subscribe, unsubscribe, and notification click handling.
3. Create a background sync system for an offline comment form that syncs when online.
4. Implement share target API to allow sharing images/text from other apps to your PWA.
