# XSS Prevention and Security Best Practices

## Overview

Cross-Site Scripting (XSS) is one of the most common web vulnerabilities. Prevention requires input sanitization, output encoding, and proper security practices.

### Types of XSS

```txt
- Reflected XSS: Malicious script in URL/request reflected in response
- Stored XSS: Malicious script stored in database, served to users
- DOM-based XSS: Client-side script vulnerability via DOM manipulation
```

## Input Sanitization

### HTML Entity Encoding

```js
// Encode HTML special characters
function escapeHtml(unsafe) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  return unsafe.replace(/[&<>"'/]/g, char => map[char]);
}

// Usage
const userInput = '<script>alert("xss")</script>';
const safe = escapeHtml(userInput);
// Output: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
```

### URL Sanitization

```js
function sanitizeUrl(url) {
  // Only allow http and https protocols
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];

  try {
    const parsed = new URL(url);

    if (!allowedProtocols.includes(parsed.protocol)) {
      return '';
    }

    // Check for javascript: in the path
    if (/javascript/i.test(parsed.pathname) ||
        /javascript/i.test(parsed.href)) {
      return '';
    }

    return parsed.href;
  } catch {
    return '';
  }
}

// Usage
sanitizeUrl('javascript:alert("xss")'); // ''
sanitizeUrl('https://example.com');      // 'https://example.com/'
sanitizeUrl(' javascript:alert(1)');     // '' (extra check needed)

// HTML sanitizer for user content
function sanitizeHtml(html) {
  // Remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/ on\w+="[^"]*"/gi, '')
    .replace(/ on\w+='[^']*'/gi, '')
    .replace(/ on\w+=\w+/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '');
}
```

## Safe DOM Manipulation

```html
<!-- ❌ UNSAFE: innerHTML with user input -->
<div id="content"></div>
<script>
  const userInput = getUserInput();
  document.getElementById('content').innerHTML = userInput;
</script>

<!-- ✅ SAFE: textContent -->
<script>
  document.getElementById('content').textContent = userInput;
</script>

<!-- ✅ SAFE: createElement + textContent -->
<script>
  const el = document.createElement('div');
  el.textContent = userInput;
  document.getElementById('content').appendChild(el);
</script>

<!-- ✅ SAFE: setAttribute (with validation) -->
<script>
  const img = document.getElementById('avatar');
  const safeUrl = sanitizeUrl(userInput);
  if (safeUrl) {
    img.setAttribute('src', safeUrl);
  }
</script>
```

## Safe Template Usage

```js
// ❌ UNSAFE: string concatenation
function renderUser(user) {
  return `<div class="user">
    <h2>${user.name}</h2>        <!-- XSS vulnerable -->
    <p>${user.bio}</p>           <!-- XSS vulnerable -->
    <img src="${user.avatar}">   <!-- XSS vulnerable -->
  </div>`;
}

// ✅ SAFE: escape all user data
function renderUserSafe(user) {
  return `<div class="user">
    <h2>${escapeHtml(user.name)}</h2>
    <p>${escapeHtml(user.bio)}</p>
    <img src="${sanitizeUrl(user.avatar)}">
  </div>`;
}

// ✅ SAFE: use DOMPurify for HTML content
function renderRichContent(html) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target']
  });
  return `<div class="content">${clean}</div>`;
}
```

## CSP for XSS Prevention

```http
# Strongest CSP XSS protection
Content-Security-Policy:
  default-src 'self';
  script-src 'nonce-{random}' 'strict-dynamic';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
```

## CSRF Prevention

```html
<!-- Include CSRF token in forms -->
<form action="/api/transfer" method="POST">
  <input type="hidden" name="_csrf" value="${csrfToken}">
  <input type="text" name="amount">
  <input type="text" name="destination">
  <button type="submit">Transfer</button>
</form>
```

```js
// CSRF token in fetch requests
async function fetchWithCSRF(url, options = {}) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');

  return fetch(url, {
    ...options,
    headers: {
      'X-CSRF-Token': csrfToken,
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'same-origin'
  });
}

// Server-side CSRF check (Express example)
function csrfProtection(req, res, next) {
  const token = req.headers['x-csrf-token'] || req.body._csrf;

  if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
    if (!token || token !== req.session.csrfToken) {
      return res.status(403).json({ error: 'CSRF validation failed' });
    }
  }

  next();
}
```

## Security Headers (Complete)

```js
const helmet = require('helmet');

// Complete security headers middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'nonce-abc123'", "'strict-dynamic'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "https:", "data:"],
      connectSrc: ["'self'", "https://api.example.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      formAction: ["'self'"],
      baseUri: ["'self'"],
      frameAncestors: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-origin" },
  dnsPrefetchControl: { allow: false },
  expectCt: { maxAge: 86400, enforce: true },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
}));
```

## Input Validation Patterns

```js
// Server-side validation patterns
const validators = {
  // Sanitize and validate text
  sanitizeText(input) {
    return escapeHtml(input.trim().slice(0, 1000));
  },

  // Validate email
  sanitizeEmail(input) {
    const email = input.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return '';
    if (email.length > 254) return '';
    return email;
  },

  // Validate URL
  sanitizeUrl(input) {
    try {
      const url = new URL(input.trim());
      if (!['http:', 'https:'].includes(url.protocol)) return '';
      return url.href;
    } catch {
      return '';
    }
  },

  // Validate phone
  sanitizePhone(input) {
    const phone = input.replace(/[\s\-\(\)\.]/g, '');
    if (/^\+?[\d]{7,15}$/.test(phone)) return phone;
    return '';
  },

  // Numeric IDs
  sanitizeId(input) {
    const num = parseInt(input);
    if (isNaN(num) || num < 0) return null;
    return num;
  },

  // UUID
  sanitizeUUID(input) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(input.trim()) ? input.trim() : '';
  }
};
```

## HTML Security Checklist

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Security: CSP -->
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:;">

  <!-- Security: CSRF token -->
  <meta name="csrf-token" content="${csrfToken}">

  <!-- Security: Referrer Policy -->
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <title>Secure Page</title>
</head>
<body>
  <!-- Security: Use rel="noopener" for external links -->
  <a href="https://external.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>

  <!-- Security: Form with CSRF -->
  <form action="/api/data" method="POST">
    <input type="hidden" name="_csrf" value="${csrfToken}">
    <input type="text" name="username" required minlength="3" maxlength="50"
           pattern="[a-zA-Z0-9_]+">
    <button type="submit">Submit</button>
  </form>

  <!-- Security: Protect cookies -->
  <script>
    // Set secure cookies via JS (server should set httpOnly)
    document.cookie = "session=abc123; Secure; HttpOnly; SameSite=Strict; Path=/";
  </script>
</body>
</html>
```

## Practice

1. Audit a web page for XSS vulnerabilities — test with `"><script>alert(1)</script>` in all input fields.
2. Build an HTML sanitizer that removes all dangerous tags and attributes while allowing safe formatting.
3. Implement CSRF protection on a form using tokens and verify it blocks forged requests.
4. Create a security-focused middleware that adds all recommended security headers to responses.
