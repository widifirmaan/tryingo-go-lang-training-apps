# Content Security Policy (CSP)

## Overview

CSP is a security layer that helps detect and mitigate content injection attacks, including XSS.

### Basic CSP Header

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'">
```

```http
# HTTP Header
Content-Security-Policy: default-src 'self'
```

## CSP Directives

```http
# Complete CSP example
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://apis.example.com;
  style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
  img-src 'self' https://images.example.com data: blob:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com wss://ws.example.com;
  frame-src 'self' https://www.youtube.com;
  media-src 'self' https://videos.example.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  report-uri /csp-report;
```

### Source Directives

```http
# Source values
'self'          # Same origin
'none'          # Block everything
'unsafe-inline' # Allow inline scripts/styles
'unsafe-eval'   # Allow eval()
'strict-dynamic'# Trust scripts loaded by trusted scripts
'nonce-{value}' # Specific nonce
{SHA-hash}     # Specific hash of a script/style

https://example.com  # Specific domain
*.example.com       # Any subdomain
https://*.example.com # HTTPS subdomain
```

## Implementing CSP

### Nonce-Based CSP

```html
<!-- Server generates a unique nonce per request -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'nonce-abc123'">

<!-- Only scripts with matching nonce will execute -->
<script nonce="abc123">
  console.log('This script will execute');
</script>

<script>
  console.log('This script will NOT execute');
</script>
```

### Hash-Based CSP

```html
<!-- Calculate hash of the script content -->
<meta http-equiv="Content-Security-Policy"
      content="script-src 'sha256-ABC123DEF...'">

<!-- Script matching the hash will execute -->
<script>
  console.log('This script matches the hash and executes');
</script>
```

### Strict CSP (Recommended)

```http
Content-Security-Policy:
  script-src 'nonce-{random}' 'strict-dynamic';
  object-src 'none';
  base-uri 'none';
```

## CSP in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- CSP via meta tag (limited but useful) -->
  <meta http-equiv="Content-Security-Policy"
        content="
          default-src 'self';
          script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
          style-src 'self' 'unsafe-inline';
          img-src 'self' https: data:;
          font-src 'self' https://fonts.gstatic.com;
          connect-src 'self' https://api.example.com;
          frame-src 'none';
          object-src 'none';
          base-uri 'self';
          form-action 'self';
        ">

  <title>CSP Protected Page</title>
</head>
<body>
  <h1>Content Security Policy Demo</h1>
  <script nonce="${nonce}">
    console.log('Safe inline script');
  </script>
</body>
</html>
```

## CSP Reporting

```http
# Collect CSP violations
Content-Security-Policy-Report-Only:
  default-src 'self';
  report-uri /csp-report-endpoint;

# Enforce CSP with reporting
Content-Security-Policy:
  default-src 'self';
  report-uri /csp-report-endpoint;
```

```js
// CSP violation reporting endpoint
app.post('/csp-report-endpoint', (req, res) => {
  const report = req.body['csp-report'] || req.body;

  console.error('CSP Violation:', {
    'document-uri': report['document-uri'],
    'blocked-uri': report['blocked-uri'],
    'violated-directive': report['violated-directive'],
    'original-policy': report['original-policy'],
    'source-file': report['source-file'],
    'line-number': report['line-number']
  });

  // Store for monitoring
  storeViolation(report);

  res.status(204).end();
});

// Client-side CSP violation listener
document.addEventListener('securitypolicyviolation', (e) => {
  console.warn('CSP Violation:', {
    blockedURI: e.blockedURI,
    violatedDirective: e.violatedDirective,
    originalPolicy: e.originalPolicy,
    sourceFile: e.sourceFile,
    lineNumber: e.lineNumber,
    columnNumber: e.columnNumber
  });

  // Send to analytics
  navigator.sendBeacon('/csp-violation', JSON.stringify({
    blockedURI: e.blockedURI,
    violatedDirective: e.violatedDirective,
    documentURI: document.location.href
  }));
});
```

## CSP by Resource Type

```http
# Scripts
script-src 'nonce-abc' 'strict-dynamic';
# OR script-src 'self' https://cdn.example.com;

# Styles
style-src 'self' 'unsafe-inline';
# OR style-src 'self' https://fonts.googleapis.com;

# Images
img-src 'self' https: data: blob:;

# Fonts
font-src 'self' https://fonts.gstatic.com data:;

# Connections (fetch, XHR, WebSocket)
connect-src 'self' https://api.example.com wss://ws.example.com;

# Frames
frame-src 'self' https://www.youtube.com;

# Media (audio/video)
media-src 'self' https://videos.example.com;

# Workers
worker-src 'self' blob:;

# Manifest
manifest-src 'self';

# WebAssembly
wasm-unsafe-eval;
```

## Practice

1. Create a CSP policy that allows: same-origin scripts, Google Fonts, images from any HTTPS source, and YouTube embeds.
2. Implement CSP reporting to capture and log violations in a database.
3. Convert a site from 'unsafe-inline' to nonce-based CSP for scripts.
4. Build a CSP analysis tool that parses a CSP header and explains what each directive does.
