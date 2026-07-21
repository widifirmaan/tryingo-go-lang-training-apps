# Web App Manifest

## Overview

The manifest is a JSON file that tells the browser about your PWA and how it should behave when installed.

### Basic Manifest

```json
{
  "name": "PWA News Reader",
  "short_name": "NewsReader",
  "description": "Read news articles offline with our progressive web app",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#3498db",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Link Manifest in HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="manifest" href="/manifest.json">

  <!-- Fallback meta tags for iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="NewsReader">
  <link rel="apple-touch-icon" href="/icons/icon-192.png">

  <!-- Tiles for Windows -->
  <meta name="msapplication-TileColor" content="#3498db">
  <meta name="msapplication-TileImage" content="/icons/icon-144.png">
</head>
```

## Manifest Properties

### Display Modes

```json
{
  "display": "fullscreen",
  "display": "standalone",
  "display": "minimal-ui",
  "display": "browser"
}
```

### Orientation

```json
{
  "orientation": "portrait-primary",
  "orientation": "portrait-secondary",
  "orientation": "landscape-primary",
  "orientation": "landscape-secondary",
  "orientation": "any",
  "orientation": "natural"
}
```

### Icons

```json
{
  "icons": [
    {
      "src": "/icons/icon-48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### Advanced Properties

```json
{
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "1080x1920",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Home page of NewsReader"
    },
    {
      "src": "/screenshots/article.png",
      "sizes": "1080x1920",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Article view"
    }
  ],
  "categories": ["news", "entertainment"],
  "lang": "en",
  "dir": "ltr",
  "iarc_rating_id": "e.g. 12345",
  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=com.example.app",
      "id": "com.example.app"
    }
  ],
  "prefer_related_applications": false
}
```

## Generating Icons

```html
<script>
  // Generate maskable icons programmatically
  function generateMaskableIcons() {
    const sizes = [48, 72, 96, 128, 144, 152, 192, 384, 512];
    const canvas = document.createElement('canvas');

    sizes.forEach(size => {
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Background
      ctx.fillStyle = '#3498db';
      ctx.fillRect(0, 0, size, size);

      // Icon content within safe zone (80% of size)
      const safeZone = size * 0.8;
      const offset = size * 0.1;

      // Draw your icon
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${size * 0.4}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', size / 2, size / 2);

      // Download
      const link = document.createElement('a');
      link.download = `icon-${size}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
</script>
```

## Manifest Validation

```js
// Check if manifest is properly loaded
if ('serviceWorker' in navigator) {
  const manifestLink = document.querySelector('link[rel="manifest"]');
  if (manifestLink) {
    console.log('Manifest linked:', manifestLink.href);
  }

  // Verify manifest properties
  fetch(manifestLink.href)
    .then(res => res.json())
    .then(manifest => {
      console.log('Manifest:', manifest);
      if (!manifest.icons || manifest.icons.length === 0) {
        console.warn('No icons defined in manifest');
      }
      if (manifest.display !== 'standalone') {
        console.warn('Display mode should be standalone');
      }
    });
}

// Check if PWA is installable
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('App is installable');
  e.preventDefault(); // Prevent automatic prompt
  deferredPrompt = e; // Save for later
  showInstallButton();
});
```

## Practice

1. Create a complete manifest.json with icons, screenshots, categories, and all display modes.
2. Generate all required icon sizes (48 to 512) for a PWA with a maskable icon.
3. Build an iOS-compatible PWA with apple-mobile-web-app meta tags and apple-touch-icons.
4. Implement a deferred install prompt that shows when the user performs a specific action.
