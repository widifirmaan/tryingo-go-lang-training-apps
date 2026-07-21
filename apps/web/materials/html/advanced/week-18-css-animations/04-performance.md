# Animation Performance

## Overview

Animation performance is critical for smooth user experiences. Understanding what triggers layout, paint, and composite operations helps create performant animations.

## The Rendering Pipeline

```txt
JavaScript → Style → Layout → Paint → Composite
                  ↓         ↓        ↓
              (Expensive)  (Costly)  (Cheap)
```

### High-Performance Properties

```css
/* ✅ Composite only (GPU-accelerated) */
transform: translate(), scale(), rotate(), skew();
opacity: 0 to 1;

/* ⚠️ Paint + Composite (moderate) */
color, background, box-shadow (changing), border-radius, outline, clip-path;

/* ❌ Layout + Paint + Composite (expensive) */
width, height, margin, padding, top, left, right, bottom,
display, position, float, font-size, line-height, text-align, border-width;
```

## Performance Best Practices

### 1. Animate Transform and Opacity

```css
/* ❌ Bad: animates layout properties */
.card {
  transition: left 0.3s ease, width 0.3s ease, height 0.3s ease;
}
.card.active {
  left: 100px;
  width: 200px;
  height: 300px;
}

/* ✅ Good: animates composite properties */
.card {
  transition: transform 0.3s ease;
}
.card.active {
  transform: translateX(100px) scale(1.2);
}
```

### 2. Use will-change

```css
/* Hint browser about upcoming changes */
.animated-element {
  will-change: transform, opacity;
}

/* Remove after animation (JS) */
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
});

/* Don't overuse - creates a new layer */
/* ❌ Bad */
.too-many-layers {
  will-change: transform, opacity, filter;
}

/* ✅ Good: specific and temporary */
.specific-animation {
  will-change: transform;
}
```

### 3. Avoid Animating Between Display States

```css
/* ❌ Bad: causes reflow */
.element {
  transition: display 0.3s ease, opacity 0.3s ease;
}

/* ✅ Good: use opacity and visibility */
.element {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.element.visible {
  opacity: 1;
  visibility: visible;
}
```

### 4. Use transform for Positioning

```css
/* ❌ Bad: animating position */
.box {
  position: absolute;
  left: 0;
  transition: left 0.3s ease;
}
.box.moved {
  left: 200px;
}

/* ✅ Good: animating transform */
.box {
  position: absolute;
  left: 0;
  transition: transform 0.3s ease;
}
.box.moved {
  transform: translateX(200px);
}
```

### 5. Debounce Scroll Events

```js
// ❌ Bad: fires on every scroll frame
window.addEventListener('scroll', () => {
  updateParallax();
});

// ✅ Good: use passive listener + requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
```

### 6. Layer Promotion

```css
/* Promote element to its own layer */
.promoted-layer {
  transform: translateZ(0);   /* Old approach */
  will-change: transform;     /* Modern approach */
}

/* Safari-specific */
.promoted-layer {
  -webkit-transform: translateZ(0);
}
```

## Measuring Performance

### Chrome DevTools

```txt
1. Performance tab → Record interactions
2. Look for: Frames (red = dropped), Layout events, Paint events
3. Summary: check if Layout triggers exist in animation
4. Layers tab: verify layer promotion
5. Rendering tab: 
   - Paint flashing: shows painted areas
   - Layer borders: shows layer boundaries
   - FPS meter: real-time frame rate
```

### Performance Observer API

```js
// Check for long tasks
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('Long task detected:', entry.duration, 'ms');
  });
});
observer.observe({ entryTypes: ['longtask'] });

// Check layout shifts
const clsObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('Cumulative layout shift:', entry.value);
  });
});
clsObserver.observe({ type: 'layout-shift', buffered: true });
```

## CSS Containment

```css
/* Limit browser's rendering work */
.component {
  /* No containment */
  contain: none;

  /* Style containment: limits style recalc */
  contain: style;

  /* Layout containment: isolates layout */
  contain: layout;

  /* Paint containment: clips to bounds */
  contain: paint;

  /* Size containment: requires explicit size */
  contain: size;

  /* All containments */
  contain: strict;

  /* Most useful combination */
  contain: layout style paint;
}

/* Practical use: widget isolation */
.dashboard-widget {
  contain: layout style;
  /* Changes inside won't affect outside */
}
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    /* Stop all animations */
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Progressive enhancement */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    animation: fadeIn 0.5s ease;
  }

  .scroll-animate {
    animation: reveal linear;
    animation-timeline: view();
  }
}
```

## Best Practices Checklist

```css
/* ✅ DO */
.performance {
  transition: transform 0.3s ease, opacity 0.3s ease;
  will-change: transform, opacity;
  contain: layout style;
}

/* ❌ DON'T */
.bad-performance {
  transition: all 0.3s ease;
  animation: expensiveAnim 1s infinite;
}
```

```txt
Performance Checklist:
- [ ] Animate only transform and opacity
- [ ] Use will-change sparingly and temporarily
- [ ] Avoid layout-triggering properties during animation
- [ ] Use requestAnimationFrame for JS animations
- [ ] Debounce scroll/resize handlers
- [ ] Use passive event listeners
- [ ] Check for dropped frames in DevTools
- [ ] Test on low-end devices
- [ ] Implement reduced motion preference
- [ ] Use contain property for isolated components
- [ ] Avoid animating large numbers of elements simultaneously
- [ ] Prefer CSS animations over JS for simple effects
```

## Practice

1. Profile a CSS animation in DevTools Performance tab. Identify layout thrashing and optimize it.
2. Convert an animation that animates `left`/`top` to use `transform: translate()` instead. Measure improvement.
3. Build a page with 100 animated elements and optimize it using `will-change` and `contain` properties.
4. Implement a reduced-motion preference that replaces animations with instant transitions.
