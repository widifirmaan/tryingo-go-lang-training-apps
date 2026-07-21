# Lazy Loading

## Overview

Lazy loading defers loading of non-critical resources until they're needed, reducing initial page load and bandwidth.

## Native Lazy Loading

### Images

```html
<!-- Native lazy loading (browser-supported) -->
<img src="photo.jpg" alt="Gallery photo"
     loading="lazy"
     width="800" height="600"
     decoding="async">

<!-- Eager loading (default for above-fold images) -->
<img src="hero.jpg" alt="Hero banner"
     loading="eager"
     fetchpriority="high">

<!-- Auto (browser decides) -->
<img src="photo.jpg" alt="Photo" loading="auto">
```

### Iframes

```html
<!-- Lazy load iframes -->
<iframe src="widget.html"
        loading="lazy"
        width="400" height="300"
        title="Widget"></iframe>

<!-- Eager for critical iframes -->
<iframe src="payment.html"
        loading="eager"
        width="100%" height="500"></iframe>
```

## Intersection Observer Implementation

```html
<img data-src="large-photo.jpg"
     data-srcset="photo-400.jpg 400w, photo-800.jpg 800w"
     data-sizes="(max-width: 600px) 400px, 800px"
     alt="Lazy loaded image"
     class="lazy-img"
     width="800" height="600">
```

```js
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('.lazy-img');

  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      if (img.dataset.sizes) img.sizes = img.dataset.sizes;
    });
  } else {
    // Fallback: Intersection Observer
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          if (img.dataset.sizes) img.sizes = img.dataset.sizes;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px' // Start loading 200px before visible
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
});
```

## Lazy Loading Components

### Component Observer

```js
class LazyLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersect(entries),
      { rootMargin: '200px' }
    );
  }

  observe(element, callback) {
    this.observer.observe(element);
    element._lazyCallback = callback;
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el._lazyCallback) {
          el._lazyCallback(el);
        }
        this.observer.unobserve(el);
      }
    });
  }

  destroy() {
    this.observer.disconnect();
  }
}

const lazyLoader = new LazyLoader();

// Usage: lazy load heavy components
document.querySelectorAll('.lazy-component').forEach(el => {
  lazyLoader.observe(el, (element) => {
    element.innerHTML = '<div class="heavy-content">...</div>';
    element.classList.add('loaded');
  });
});
```

### Lazy Loading Scripts

```html
<script>
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

  // Load non-critical scripts when idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadScript('analytics.js');
      loadScript('chat-widget.js');
    });
  } else {
    setTimeout(() => {
      loadScript('analytics.js');
      loadScript('chat-widget.js');
    }, 2000);
  }

  // Load scripts on user interaction
  document.addEventListener('mouseover', () => {
    loadScript('tooltip-library.js');
  }, { once: true });

  document.addEventListener('scroll', () => {
    loadScript('scroll-effects.js');
  }, { once: true, passive: true });
</script>
```

## Progressive Image Loading

```css
/* Blur-up technique */
.img-wrapper {
  position: relative;
  overflow: hidden;
  background: #f0f0f0;
}

.img-wrapper::before {
  content: '';
  display: block;
  /* Aspect ratio placeholder to prevent CLS */
  padding-bottom: 56.25%; /* 16:9 */
}

.blur-placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.1);
  transition: opacity 0.5s ease;
}

.full-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.full-image.loaded {
  opacity: 1;
}

.blur-placeholder.loaded {
  opacity: 0;
}
```

```html
<div class="img-wrapper">
  <!-- Tiny placeholder (inline base64 or small JPEG) -->
  <img class="blur-placeholder"
       src="data:image/jpeg;base64,/9j/..."
       alt="" aria-hidden="true"
       width="800" height="450">

  <!-- Full image (lazy loaded) -->
  <img class="full-image"
       data-src="photo-hd.jpg"
       alt="High quality photo"
       width="800" height="450"
       loading="lazy">
</div>
```

```js
// Switch from placeholder to full image
const fullImg = document.querySelector('.full-image');
fullImg.addEventListener('load', () => {
  fullImg.classList.add('loaded');
  fullImg.previousElementSibling.classList.add('loaded');
});
```

## Practice

1. Create a photo gallery page with 50+ images using native lazy loading and a blur-up placeholder effect.
2. Build a long-form article page that lazy loads below-fold images, iframes, and embedded tweets.
3. Implement lazy loading for a comments section that loads when the user scrolls near it.
4. Create a profile page that defers loading of non-critical sections (friends list, photos, groups) until needed.
