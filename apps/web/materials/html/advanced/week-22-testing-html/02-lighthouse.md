# Lighthouse Audits

## Overview

Lighthouse is an automated auditing tool for performance, accessibility, SEO, and best practices.

### Running Lighthouse

```bash
# Chrome DevTools: Lighthouse tab
# CLI:
npm install -g lighthouse
lighthouse https://example.com --view
lighthouse https://example.com --output=json --output-path=./report.json
lighthouse https://example.com --preset=desktop
lighthouse https://example.com --preset=perf

# Programmatic API
npm install lighthouse
```

```js
// Programmatic Lighthouse audit
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox']
  });

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
    port: chrome.port
  };

  const runnerResult = await lighthouse(url, options);

  await chrome.kill();

  return runnerResult.lhr;
}

// Usage
runLighthouse('https://example.com').then(report => {
  const { categories } = report;
  console.log('Performance:', categories.performance.score * 100);
  console.log('Accessibility:', categories.accessibility.score * 100);
  console.log('SEO:', categories.seo.score * 100);
  console.log('Best Practices:', categories['best-practices'].score * 100);
});
```

## Interpreting Scores

```js
function interpretScore(category, score) {
  const scorePercent = Math.round(score * 100);

  let rating;
  if (scorePercent >= 90) rating = 'good';
  else if (scorePercent >= 50) rating = 'needs-improvement';
  else rating = 'poor';

  return {
    category,
    score: scorePercent,
    rating,
    color: rating === 'good' ? '#0cce6b' :
           rating === 'needs-improvement' ? '#ffa400' : '#ff4e42'
  };
}

// Parse Lighthouse JSON report
function parseLighthouseReport(report) {
  const categories = report.categories;
  const audits = report.audits;

  const results = Object.entries(categories).map(([key, category]) => ({
    name: category.title,
    score: Math.round(category.score * 100),
    description: category.description,
    audits: category.auditRefs.map(ref => ({
      name: ref.group || 'Other',
      title: audits[ref.id].title,
      score: audits[ref.id].score,
      description: audits[ref.id].description,
      details: audits[ref.id].details
    }))
  }));

  return results;
}
```

## Key Metrics

```js
function extractMetrics(report) {
  const audits = report.audits;

  return {
    // Performance
    fcp: audits['first-contentful-paint']?.numericValue,
    lcp: audits['largest-contentful-paint']?.numericValue,
    tbt: audits['total-blocking-time']?.numericValue,
    cls: audits['cumulative-layout-shift']?.numericValue,
    si: audits['speed-index']?.numericValue,

    // SEO
    hasMetaDescription: audits['meta-description']?.score === 1,
    hasViewport: audits['viewport']?.score === 1,
    hasCanonical: audits['canonical']?.score === 1,
    hasHreflang: audits['hreflang']?.score === 1,

    // Accessibility
    hasAltText: audits['image-alt']?.score === 1,
    hasLabels: audits['label']?.score === 1,
    hasHeadingStructure: audits['heading-order']?.score === 1,
    colorContrast: audits['color-contrast']?.score === 1
  };
}
```

## Improving Scores

```js
// Performance improvements
const performanceTips = {
  lcp: [
    'Preload hero image',
    'Minimize render-blocking resources',
    'Optimize server response time (TTFB)',
    'Use CDN for static assets'
  ],
  cls: [
    'Set explicit dimensions on all images',
    'Reserve space for ads and embeds',
    'Use font-display: swap',
    'Don\'t insert content above existing content'
  ],
  tbt: [
    'Break up long tasks',
    'Use Web Workers for heavy computation',
    'Defer non-critical JavaScript',
    'Code-split large bundles'
  ]
};

// Accessibility improvements
const accessibilityTips = {
  contrast: [
    'Ensure text contrast ratio of at least 4.5:1',
    'Ensure large text contrast of at least 3:1'
  ],
  labels: [
    'All form controls must have associated labels',
    'Use aria-label for elements without visible text'
  ],
  headings: [
    'Page must have one h1',
    'Heading levels should not be skipped'
  ]
};

// SEO improvements
const seoTips = {
  meta: [
    'Add meta description (150-160 chars)',
    'Set descriptive title (under 60 chars)',
    'Add Open Graph and Twitter Card meta tags'
  ],
  structured: [
    'Add JSON-LD structured data',
    'Include breadcrumbs markup',
    'Add product/article schema where applicable'
  ]
};
```

## Automated Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Lighthouse
        run: |
          npm install -g @lhci/cli
          lhci autorun --upload.target=temporary-public-storage
```

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "puppeteerScript": "puppeteer.js",
      "settings": {
        "preset": "desktop",
        "onlyCategories": ["performance", "accessibility", "seo"]
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

## Practice

1. Run a Lighthouse audit on your project and create an action plan for all categories scoring below 90.
2. Build a Lighthouse report viewer that loads a JSON report and displays scores with color coding.
3. Set up Lighthouse CI in a GitHub Actions workflow that blocks PRs if scores drop below thresholds.
4. Compare desktop vs mobile Lighthouse scores and identify mobile-specific optimizations.
