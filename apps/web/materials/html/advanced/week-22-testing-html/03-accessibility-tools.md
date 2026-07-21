# Accessibility Testing Tools

## Overview

Automated accessibility testing tools help identify barriers before manual testing.

### axe-core

```html
<!-- Browser extension: axe DevTools -->
<!-- CLI -->
<script src="https://unpkg.com/axe-core@4.8.2/axe.min.js"></script>
```

```js
// Run axe on the page
axe.run()
  .then(results => {
    console.log(`${results.violations.length} violations found`);

    results.violations.forEach(violation => {
      console.log(`❌ ${violation.help}`);
      console.log(`   Impact: ${violation.impact}`);
      console.log(`   Tags: ${violation.tags.join(', ')}`);

      violation.nodes.forEach(node => {
        console.log(`   Element: ${node.html}`);
        console.log(`   Selector: ${node.target.join(', ')}`);
        console.log(`   Fix: ${node.failureSummary}`);
      });
    });

    results.passes.forEach(pass => {
      console.log(`✅ ${pass.help}`);
    });

    results.incomplete.forEach(item => {
      console.log(`⚠️ ${item.help} (manual check needed)`);
    });
  })
  .catch(err => console.error(err));

// Run with options
axe.run({
  runOnly: ['wcag2a', 'wcag2aa'], // Only WCAG A and AA rules
  rules: {
    'color-contrast': { enabled: true },
    'region': { enabled: false } // Skip region rule
  },
  elementRef: true // Return element references
});

// Check specific element
axe.run(document.getElementById('myForm'));
```

### WAVE Evaluation

```html
<!-- WAVE browser extension: https://wave.webaim.org/ -->
<!-- WAVE API -->
```

```js
// WAVE API usage
async function runWAVE(url) {
  const response = await fetch(
    `https://wave.webaim.org/api/request?key=${API_KEY}&url=${encodeURIComponent(url)}`
  );
  const data = await response.json();

  return {
    errors: data.statistics.errores || 0,
    alerts: data.statistics.alertas || 0,
    features: data.statistics.features || 0,
    contrast: data.statistics.contrast || 0,
    details: data.categories
  };
}
```

## Comprehensive Accessibility Audit

```js
class AccessibilityAuditor {
  constructor() {
    this.results = {
      violations: [],
      warnings: [],
      passes: [],
      manual: []
    };
  }

  async runFullAudit() {
    await this.checkImages();
    await this.checkHeadings();
    await this.checkLandmarks();
    await this.checkForms();
    await this.checkColorContrast();
    await this.checkKeyboard();
    await this.checkARIA();
    await this.checkLinks();

    return this.results;
  }

  checkImages() {
    const images = document.querySelectorAll('img:not([role="presentation"])');

    images.forEach(img => {
      if (!img.hasAttribute('alt')) {
        this.results.violations.push({
          type: 'image-alt',
          element: img,
          html: img.outerHTML,
          message: 'Image missing alt text',
          fix: 'Add alt="[description]" or alt="" for decorative images'
        });
      }
    });
  }

  checkHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const levels = Array.from(headings).map(h => parseInt(h.tagName[1]));

    // Check for h1
    if (!document.querySelector('h1')) {
      this.results.violations.push({
        type: 'heading-structure',
        message: 'Page has no h1 element',
        fix: 'Add one h1 that describes the page content'
      });
    }

    // Check for skipped levels
    for (let i = 0; i < levels.length; i++) {
      if (i > 0 && levels[i] - levels[i - 1] > 1) {
        this.results.warnings.push({
          type: 'heading-structure',
          element: headings[i],
          message: `Heading level skipped from h${levels[i-1]} to h${levels[i]}`,
          fix: `Use h${levels[i-1] + 1} instead of h${levels[i]}`
        });
      }
    }
  }

  checkLandmarks() {
    const hasMain = document.querySelector('main') ||
                   document.querySelector('[role="main"]');
    const hasNav = document.querySelector('nav') ||
                   document.querySelector('[role="navigation"]');
    const hasBanner = document.querySelector('header') ||
                      document.querySelector('[role="banner"]');
    const hasContentInfo = document.querySelector('footer') ||
                           document.querySelector('[role="contentinfo"]');

    if (!hasMain) {
      this.results.warnings.push({
        type: 'landmarks',
        message: 'No main landmark found',
        fix: 'Add <main> element or role="main"'
      });
    }
  }

  checkForms() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`) ||
                       input.closest('label') ||
                       input.hasAttribute('aria-label') ||
                       input.hasAttribute('aria-labelledby');

      if (!hasLabel && input.type !== 'hidden' && input.type !== 'submit') {
        this.results.violations.push({
          type: 'form-label',
          element: input,
          message: `Form control missing label: ${input.name || input.id || 'unnamed'}`,
          fix: 'Add a <label> element with for attribute matching the input id'
        });
      }
    });
  }

  checkColorContrast() {
    // Check computed colors for text elements
    const textElements = document.querySelectorAll('p, span, a, h1, h2, h3, label, li');

    textElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const color = style.color;
      const fontSize = parseFloat(style.fontSize);
      const isBold = style.fontWeight >= 700;

      // Calculate contrast ratio
      const ratio = this.getContrastRatio(bg, color);

      if (ratio) {
        const requiredRatio = (isBold || fontSize >= 18) ? 3 : 4.5;

        if (ratio < requiredRatio) {
          this.results.warnings.push({
            type: 'color-contrast',
            element: el,
            message: `Low contrast ratio: ${ratio.toFixed(2)}:1 (need ${requiredRatio}:1)`,
            fix: `Darken text or lighten background to achieve ${requiredRatio}:1 ratio`
          });
        }
      }
    });
  }

  checkKeyboard() {
    // Check for interactive elements without keyboard handling
    const interactive = document.querySelectorAll(
      '[onclick]:not(button):not(a):not(input):not(select):not(textarea)'
    );

    interactive.forEach(el => {
      if (el.getAttribute('tabindex') === null) {
        this.results.warnings.push({
          type: 'keyboard',
          element: el,
          message: 'Clickable element may not be keyboard accessible',
          fix: 'Add tabindex="0" and keyboard event handlers'
        });
      }
    });
  }

  checkARIA() {
    // Check for misused ARIA
    const ariaEls = document.querySelectorAll('[role]');

    ariaEls.forEach(el => {
      const role = el.getAttribute('role');

      // Check for redundant roles
      switch (role) {
        case 'banner':
          if (el.tagName === 'HEADER' && !el.closest('header, aside'))
            this.warnRedundantRole(el, role);
          break;
        case 'navigation':
          if (el.tagName === 'NAV')
            this.warnRedundantRole(el, role);
          break;
        case 'main':
          if (el.tagName === 'MAIN')
            this.warnRedundantRole(el, role);
          break;
        case 'contentinfo':
          if (el.tagName === 'FOOTER' && !el.closest('aside, main, nav'))
            this.warnRedundantRole(el, role);
          break;
      }
    });
  }

  checkLinks() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
      const text = link.textContent.trim().toLowerCase();

      // Check for uninformative link text
      if (['click here', 'here', 'read more', 'more', 'link', 'this']
        .includes(text)) {
        this.results.warnings.push({
          type: 'link-text',
          element: link,
          message: `Uninformative link text: "${link.textContent.trim()}"`,
          fix: 'Use descriptive link text that makes sense out of context'
        });
      }
    });
  }

  warnRedundantRole(el, role) {
    this.results.warnings.push({
      type: 'redundant-aria',
      element: el,
      message: `Redundant role="${role}" on ${el.tagName.toLowerCase()} element`,
      fix: `Remove role="${role}" as it is implicit`
    });
  }

  getContrastRatio(bg, fg) {
    // Simplified contrast calculation
    // Returns false if can't parse colors
    try {
      const bgRgb = this.parseColor(bg);
      const fgRgb = this.parseColor(fg);
      if (!bgRgb || !fgRgb) return false;

      const bgLum = this.getRelativeLuminance(bgRgb);
      const fgLum = this.getRelativeLuminance(fgRgb);

      const lighter = Math.max(bgLum, fgLum);
      const darker = Math.min(bgLum, fgLum);

      return (lighter + 0.05) / (darker + 0.05);
    } catch {
      return false;
    }
  }

  parseColor(color) {
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
      };
    }
    if (color.startsWith('rgb')) {
      const match = color.match(/[\d.]+/g);
      if (match) {
        return {
          r: parseInt(match[0]),
          g: parseInt(match[1]),
          b: parseInt(match[2])
        };
      }
    }
    return null;
  }

  getRelativeLuminance(rgb) {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
}

// Usage
const auditor = new AccessibilityAuditor();
const results = await auditor.runFullAudit();
console.log('Violations:', results.violations.length);
console.log('Warnings:', results.warnings.length);
console.log('Passes:', results.passes.length);
```

## Generating a Report

```js
function generateAccessibilityReport(results) {
  let report = `# Accessibility Audit Report\n\n`;
  report += `- **Date:** ${new Date().toISOString().split('T')[0]}\n`;
  report += `- **URL:** ${window.location.href}\n`;
  report += `- **Violations:** ${results.violations.length}\n`;
  report += `- **Warnings:** ${results.warnings.length}\n\n`;

  if (results.violations.length > 0) {
    report += `## Violations\n\n`;
    results.violations.forEach((v, i) => {
      report += `### ${i + 1}. ${v.type}: ${v.message}\n\n`;
      report += `- **Fix:** ${v.fix}\n`;
      if (v.html) {
        report += `- **Element:** \`${v.html}\`\n`;
      }
      report += '\n';
    });
  }

  if (results.warnings.length > 0) {
    report += `## Warnings\n\n`;
    results.warnings.forEach((w, i) => {
      report += `### ${i + 1}. ${w.type}: ${w.message}\n\n`;
      report += `- **Fix:** ${w.fix}\n\n`;
    });
  }

  return report;
}
```

## Practice

1. Run an axe-core audit on your project and fix all violations (critical and serious).
2. Build a color contrast checker that scans the page and reports all elements with insufficient contrast.
3. Create a form accessibility test that checks for labels, error messages, and ARIA attributes.
4. Build an accessibility dashboard that runs axe, checks color contrast, and validates heading structure.
