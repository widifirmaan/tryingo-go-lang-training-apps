# Testing, Debugging, Validation & Deployment

The final step is to test your project thoroughly, fix issues, and deploy it live.

## Testing

### Manual Testing Checklist

- [ ] All internal navigation links work on every page
- [ ] External links open in new tab with `rel="noopener noreferrer"`
- [ ] Images load and have correct `alt` text
- [ ] Form submits (even if to a dummy action)
- [ ] Video and audio play (if included)
- [ ] Table displays correctly with proper headers
- [ ] No broken images (check console for 404 errors)

### Responsive Testing

Test at these widths:

| Device | Width | Test |
|--------|-------|------|
| Mobile | 320px | iPhone SE |
| Mobile | 375px | iPhone |
| Tablet | 768px | iPad |
| Desktop | 1024px | Small laptop |
| Desktop | 1440px | Large desktop |

### Browser Testing

Test in at least 3 browsers:

| Browser | Notes |
|---------|-------|
| Chrome | Most common, full DevTools |
| Firefox | Good developer tools |
| Edge | Chromium-based, similar to Chrome |
| Safari | Important for iOS users |

## Debugging with DevTools

### Common Issues and Fixes

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Layout broken | Missing `box-sizing: border-box` | Add universal box-sizing |
| Image overflow | No `max-width: 100%` | Add to `img` reset |
| Gap between elements | Default margin on elements | Add reset CSS |
| Form not submitting | Missing `name` attributes | Add `name` to all inputs |
| Links not working | Wrong path (case-sensitive) | Check file paths |
| Sticky not working | Missing `top` value | Add `top: 0` |

### Using DevTools

1. **Elements panel**: Inspect HTML structure and computed styles
2. **Console**: Check for JavaScript errors (none expected in pure HTML/CSS)
3. **Network**: Verify all resources load (images, CSS)
4. **Lighthouse**: Run for performance, accessibility, SEO audit

```bash
# Common DevTools shortcuts
F12           # Open DevTools
Ctrl+Shift+C  # Inspect element
Ctrl+Shift+M  # Device emulation toggle
Ctrl+R        # Hard refresh
```

## Validation

### HTML Validation

Use the W3C Markup Validation Service: https://validator.w3.org/

```bash
# Upload your file or paste in the URL
# Common errors:
# - Missing closing tags
# - Duplicate IDs
# - Incorrectly nested elements
# - Missing required attributes (alt, for, etc.)
```

### CSS Validation

Use the W3C CSS Validation Service: https://jigsaw.w3.org/css-validator/

```bash
# Common errors:
# - Missing semicolons
# - Invalid property values
# - Unknown vendor prefixes
```

### Accessibility Check

```bash
# Run Lighthouse in DevTools → Lighthouse → Accessibility
# Aim for score of 90+
```

## Performance Optimization

```css
/* Lazy load images */
img {
  loading="lazy"  /* in HTML */
}

/* Font display */
@font-face {
  font-family: 'CustomFont';
  src: url('fonts/custom.woff2');
  font-display: swap;
}
```

## Deployment Options

| Platform | Free Tier | Domain |
|----------|-----------|--------|
| GitHub Pages | Yes | `username.github.io/repo` |
| Netlify | Yes | `project.netlify.app` |
| Vercel | Yes | `project.vercel.app` |
| Cloudflare Pages | Yes | `project.pages.dev` |

### Deploying to GitHub Pages

```bash
# 1. Create a GitHub repository
# 2. Push your code
# 3. Go to Settings → Pages → Source: main branch /docs folder or root
# 4. Your site is live at https://username.github.io/repo-name
```

### Deploying to Netlify

```bash
# 1. Go to netlify.com → New site from Git
# 2. Connect your repository
# 3. Build command: (none for static HTML)
# 4. Publish directory: . (root) or docs
# 5. Deploy — site is live at random-name.netlify.app
```

## Final Submission Checklist

- [ ] HTML validates with no errors
- [ ] CSS validates with no errors
- [ ] Responsive on mobile, tablet, and desktop
- [ ] All images have descriptive `alt` text
- [ ] Form labels are properly associated with inputs
- [ ] Navigation works on all pages
- [ ] No broken links or missing resources
- [ ] Deployed to a live URL
- [ ] Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 100
- [ ] Code is clean, indented, and readable with no commented-out code

## Practice

1. Run the W3C HTML Validator on all pages and fix any errors
2. Run Lighthouse and improve scores in all categories
3. Test your site on a real mobile device
4. Deploy your project to GitHub Pages or Netlify
5. Share the live URL with someone and ask for feedback
