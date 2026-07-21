# HTTPS and TLS

## Overview

HTTPS encrypts communication between browser and server using TLS (Transport Layer Security).

### Why HTTPS Matters

```txt
- Encrypts all data in transit
- Authenticates the server
- Prevents man-in-the-middle attacks
- Required for HTTP/2, service workers, geolocation
- SEO ranking factor
- Required for many browser APIs
```

## Enforcing HTTPS

### HTML Level

```html
<!DOCTYPE html>
<head>
  <!-- Ensure HTTPS for all resources -->
  <meta http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests">
</head>

<!-- Always use https:// for external resources -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter">
```

### Server Level (Apache)

```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# HSTS header
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

### Server Level (Nginx)

```nginx
# nginx.conf
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
}
```

### Node.js (Express)

```js
const express = require('express');
const helmet = require('helmet');
const app = express();

// Force HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(301, `https://${req.hostname}${req.url}`);
  }
  next();
});

// Security headers
app.use(helmet());

// HSTS
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));
```

## Security Headers

```html
<!-- HTML equivalent (meta refresh) - not recommended, use headers -->
<meta http-equiv="Strict-Transport-Security"
      content="max-age=31536000; includeSubDomains">
```

```js
// Complete security headers
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  'Content-Security-Policy': "default-src 'self'",
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin'
};
```

## TLS Best Practices

```nginx
# Modern TLS configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets off;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 1.1.1.1 8.8.8.8 valid=300s;
resolver_timeout 5s;
```

## Checking HTTPS Configuration

```js
// Check if page is secure
if (window.isSecureContext) {
  console.log('Page is served over HTTPS');
} else {
  console.warn('Page is NOT served over HTTPS - some APIs may not work');
}

// Check certificate info (via API if available)
async function checkCert() {
  if ('securityLevel' in document) {
    console.log('Security level:', document.securityLevel);
  }
}

// Online checking tools
// https://www.ssllabs.com/ssltest/
// https://securityheaders.com/
```

## Practice

1. Configure a local development server with HTTPS using mkcert or self-signed certificates.
2. Implement HSTS headers on a test server and verify them with curl or browser DevTools.
3. Set up a complete security header configuration and test at securityheaders.com.
4. Create an HTTPS redirect for all HTTP traffic to HTTPS with a 301 redirect.
