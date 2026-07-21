# CORS (Cross-Origin Resource Sharing)

## Overview

CORS is a browser security mechanism that controls how resources can be requested from different origins.

### Same-Origin Policy

```txt
Same origin = same protocol + host + port

https://example.com/page1.html
https://example.com/page2.html   ✓ Same origin

https://api.example.com           ✗ Different subdomain
http://example.com                ✗ Different protocol
https://example.com:8080          ✗ Different port
https://other.com                 ✗ Different domain
```

## CORS Headers

### Server-Side CORS Configuration

```http
# Allow all origins (development only)
Access-Control-Allow-Origin: *

# Allow specific origin
Access-Control-Allow-Origin: https://example.com

# Allow multiple origins (must be dynamic)
Access-Control-Allow-Origin: https://app.example.com
Vary: Origin

# Allowed methods
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH

# Allowed headers
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With

# Expose headers to client
Access-Control-Expose-Headers: X-Total-Count, X-RateLimit-Remaining

# Allow credentials (cookies, auth headers)
Access-Control-Allow-Credentials: true

# Max age for preflight cache (seconds)
Access-Control-Max-Age: 86400
```

## CORS in Different Backends

### Node.js (Express)

```js
const express = require('express');
const cors = require('cors');
const app = express();

// Enable all CORS (development)
app.use(cors());

// Specific configuration
app.use(cors({
  origin: ['https://app.example.com', 'https://admin.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
  credentials: true,
  maxAge: 86400
}));

// Dynamic origin
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [/\.example\.com$/, /^https:\/\/app--/];

    if (!origin || allowed.some(p => p.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Per-route CORS
app.get('/api/public', cors(), (req, res) => {
  res.json({ message: 'Public data' });
});

app.get('/api/private', cors({
  origin: 'https://dashboard.example.com'
}), (req, res) => {
  res.json({ message: 'Private data' });
});
```

### Nginx CORS

```nginx
server {
    location /api/ {
        # Handle preflight
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://example.com';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
            add_header 'Access-Control-Max-Age' 86400;
            add_header 'Content-Length' 0;
            return 204;
        }

        add_header 'Access-Control-Allow-Origin' 'https://example.com' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Expose-Headers' 'X-Total-Count' always;
    }
}
```

## Preflight Requests

```js
// Browser sends OPTIONS request before actual request
// when:
// - Method is not GET, HEAD, or POST
// - Custom headers are set
// - Content-Type is not one of: text/plain, multipart/form-data, application/x-www-form-urlencoded

// Example: fetch with credentials and custom headers
fetch('https://api.example.com/data', {
  method: 'POST',           // Triggers preflight for non-standard method
  headers: {
    'Content-Type': 'application/json',  // Triggers preflight (not simple type)
    'X-Custom-Header': 'value'           // Triggers preflight
  },
  credentials: 'include'   // Send cookies
});

// Server must respond to OPTIONS with appropriate headers
```

## Client-Side CORS

```js
// Fetch with CORS
fetch('https://api.example.com/data', {
  mode: 'cors',           // default for cross-origin
  credentials: 'include', // send cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fetch with no-cors (opaque response)
fetch('https://other-origin.com/data', {
  mode: 'no-cors'  // Response is opaque, can't read content
});

// JSONP (old technique, avoid)
function loadJSONP(url) {
  return new Promise((resolve) => {
    const callback = `jsonp_${Date.now()}`;
    window[callback] = resolve;

    const script = document.createElement('script');
    script.src = `${url}?callback=${callback}`;
    document.body.appendChild(script);
  });
}
```

## Handling CORS Errors

```js
// Common CORS errors and solutions
async function fetchWithCORS(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
      console.error('CORS error: Server may not allow cross-origin requests');
      console.error('Check that the server has proper CORS headers');
    }
    throw err;
  }
}

// Debug CORS with logging
async function debugCORS(url) {
  console.log(`Testing CORS for: ${url}`);

  // 1. Check if same origin
  const isSameOrigin = new URL(url).origin === location.origin;
  console.log(`Same origin: ${isSameOrigin}`);

  if (isSameOrigin) {
    console.log('No CORS needed');
    return;
  }

  // 2. Try normal fetch
  try {
    const response = await fetch(url, { mode: 'cors' });
    const corsHeader = response.headers.get('access-control-allow-origin');
    console.log('CORS header:', corsHeader);
    console.log('CORS response:', corsHeader ? 'Allowed' : 'Blocked');
  } catch (err) {
    console.error('CORS blocked:', err.message);
  }
}
```

## Proxy Solutions

```js
// Development proxy (Vite)
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
};

// Development proxy (Webpack)
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
};

// CORS-proxy service (development only)
const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
fetch(proxyUrl).then(r => r.json());
```

## Practice

1. Configure CORS on a Node.js server to allow requests from two different origins with credentials.
2. Debug a CORS issue using browser DevTools Network tab — identify the blocked request and fix the server configuration.
3. Build a proxy endpoint on your server that forwards requests to a third-party API without CORS headers.
4. Create a CORS configuration for a multi-origin app (main site, admin panel, mobile app) with appropriate restrictions.
