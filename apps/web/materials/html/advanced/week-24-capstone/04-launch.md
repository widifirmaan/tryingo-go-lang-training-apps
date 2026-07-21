# Launch and Deployment

## Pre-Launch Checklist

### HTML Validation

```bash
# Validate all HTML files
npx html-validate "**/*.html"

# W3C Nu checker
java -jar vnu.jar --format json src/**/*.html
```

### Accessibility Audit

```bash
# Run axe-core CLI
npx @axe-core/cli https://staging.example.com

# Lighthouse CI
npx lhci autorun
```

### Performance Verification

```bash
# Lighthouse desktop
lighthouse https://staging.example.com --preset=desktop --output=json --output-path=./reports/desktop.json

# Lighthouse mobile (simulated 4G)
lighthouse https://staging.example.com --preset=perf --output=json --output-path=./reports/mobile.json
```

### Security Check

```bash
# Check security headers
curl -sI https://staging.example.com | grep -i "strict-transport-security\|content-security-policy\|x-frame-options\|x-content-type-options"

# SSL Labs test (online)
# https://www.ssllabs.com/ssltest/analyze.html?d=example.com
```

## Deployment

### Build Process

```js
// build.js - Production build script
const fs = require('fs-extra');
const htmlmin = require('html-minifier');
const csso = require('csso');
const terser = require('terser');
const critical = require('critical');

async function build() {
  console.log('🛠 Starting build...');

  // 1. Clean dist
  await fs.emptyDir('./dist');

  // 2. Copy static assets
  await fs.copy('./src/assets', './dist/assets');

  // 3. Build CSS
  const css = await fs.readFile('./src/css/styles.css', 'utf-8');
  const minifiedCSS = csso.minify(css).css;
  await fs.writeFile('./dist/css/styles.css', minifiedCSS);

  // 4. Build JS
  const js = await fs.readFile('./src/js/app.js', 'utf-8');
  const minifiedJS = await terser.minify(js);
  await fs.writeFile('./dist/js/app.js', minifiedJS.code);

  // 5. Process HTML with critical CSS
  const html = await fs.readFile('./src/index.html', 'utf-8');
  const result = await critical.generate({
    html,
    base: './src',
    width: 1300,
    height: 900,
    minify: true,
    inline: true
  });
  await fs.writeFile('./dist/index.html', result);

  // 6. Copy other pages (with minification)
  const pages = ['about.html', 'projects.html', 'blog.html', 'contact.html'];
  for (const page of pages) {
    let content = await fs.readFile(`./src/pages/${page}`, 'utf-8');
    content = htmlmin.minify(content, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    });
    await fs.writeFile(`./dist/${page}`, content);
  }

  // 7. Generate sitemap
  await generateSitemap();

  // 8. Copy PWA files
  await fs.copy('./src/manifest.json', './dist/manifest.json');
  await fs.copy('./src/sw.js', './dist/sw.js');

  console.log('✅ Build complete!');
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
```

### Deployment Options

```yaml
# GitHub Actions: Deploy to Netlify
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

```yaml
# Deploy to Cloudflare Pages
name: Deploy to Cloudflare
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: portfolio
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### Vercel Configuration

```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/assets/(.*)", "headers": { "cache-control": "public, max-age=31536000, immutable" } },
    { "src": "/(.*)", "dest": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

## Monitoring

### Analytics

```html
<!-- Privacy-focused analytics (Plausible/Umami) -->
<script defer data-domain="jane.dev"
        src="https://plausible.io/js/script.js"></script>
```

### Error Tracking

```js
// Client-side error logging
window.addEventListener('error', (event) => {
  logError({
    message: event.message,
    source: event.filename,
    line: event.lineno,
    column: event.colno,
    stack: event.error?.stack,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
});

window.addEventListener('unhandledrejection', (event) => {
  logError({
    message: event.reason?.message || 'Unhandled promise rejection',
    stack: event.reason?.stack,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
});

function logError(error) {
  // Send to logging service
  fetch('/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(error),
    keepalive: true
  });
}
```

### Performance Monitoring

```js
// Report Core Web Vitals
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    url: window.location.href,
    timestamp: Date.now()
  };

  navigator.sendBeacon('/api/vitals', JSON.stringify(body));
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

## Post-Launch

### Ongoing Tasks

```txt
Daily:
- Monitor error logs
- Check analytics for issues

Weekly:
- Review Lighthouse scores
- Check for new security vulnerabilities
- Update dependencies

Monthly:
- Content updates (new projects, blog posts)
- Accessibility audit
- Performance review
- SEO check (search console)

Quarterly:
- Full security audit
- Cross-browser compatibility check
- PWA audit
- Update to latest standards
```

## Final Checklist

```txt
Pre-Launch:
[ ] HTML validated (W3C, html-validate)
[ ] CSS validated
[ ] JavaScript linted
[ ] Lighthouse scores ≥ 95 on all categories
[ ] Accessibility tested with axe-core
[ ] Keyboard navigation tested
[ ] Screen reader tested (NVDA/VoiceOver)
[ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
[ ] Mobile responsive tested
[ ] PWA installable and working offline
[ ] Service worker registered and caching
[ ] All forms have validation
[ ] Security headers configured
[ ] CSP implemented
[ ] HTTPS enforced
[ ] SSL certificate valid
[ ] Sitemap submitted to search engines
[ ] robots.txt configured
[ ] Open Graph tags verified
[ ] Structured data valid (Rich Results Test)
[ ] Analytics configured
[ ] Error tracking configured
[ ] Performance monitoring configured
[ ] All redirects working
[ ] Custom 404 page
[ ] Backup strategy in place

Launch:
[ ] DNS records updated
[ ] CDN configured
[ ] SSL certificate active
[ ] Deploy to production
[ ] Monitor error rates
[ ] Verify all functionality in production
[ ] Submit to search consoles (Google, Bing)
[ ] Announce launch

Post-Launch:
[ ] Monitor Core Web Vitals
[ ] Check search console for issues
[ ] Review Lighthouse scores weekly
[ ] Update content regularly
[ ] Keep dependencies updated
[ ] Regular accessibility audits
```

## Practice

1. Create a complete deployment pipeline using GitHub Actions that builds and deploys to Netlify or Cloudflare Pages.
2. Configure security headers and CSP for the production deployment and verify with securityheaders.com.
3. Set up monitoring with Core Web Vitals reporting and error tracking.
4. Perform a final pre-launch audit covering all checklist items and fix any remaining issues.
