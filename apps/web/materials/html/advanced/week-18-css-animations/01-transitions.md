# Advanced Transitions

## Overview

CSS transitions smoothly change property values over a specified duration.

### Transition Properties

```css
.element {
  /* Shorthand: property duration timing-function delay */
  transition: transform 0.3s ease 0.1s;

  /* Multiple transitions */
  transition:
    transform 0.3s ease,
    opacity 0.5s ease 0.1s,
    background 0.3s ease;

  /* All properties */
  transition: all 0.3s ease;

  /* Individual properties */
  transition-property: transform, opacity;
  transition-duration: 0.3s, 0.5s;
  transition-timing-function: ease, ease-in;
  transition-delay: 0s, 0.1s;
}
```

## Timing Functions

```css
/* Standard */
.linear { transition-timing-function: linear; }
.ease { transition-timing-function: ease; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }

/* Steps (for frame-by-frame animation) */
.step-start { transition-timing-function: step-start; }
.step-end { transition-timing-function: step-end; }
.steps-4 { transition-timing-function: steps(4); }
.steps-jump { transition-timing-function: steps(4, jump-none); }

/* Custom cubic bezier */
.bounce {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.smooth-in {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.dramatic {
  transition-timing-function: cubic-bezier(0.6, -0.28, 0.74, 0.05);
}
```

## Practical Examples

### Interactive Cards

```html
<div class="card-grid">
  <div class="interactive-card">
    <img src="photo1.jpg" alt="Card image" class="card-img">
    <div class="card-overlay">
      <h3>Card Title</h3>
      <p>Card description</p>
      <button>Learn More</button>
    </div>
  </div>
</div>
```

```css
.interactive-card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
}

.card-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.interactive-card:hover .card-img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: #fff;
  transform: translateY(60%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.interactive-card:hover .card-overlay {
  transform: translateY(0);
}

.card-overlay button {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
}

.interactive-card:hover .card-overlay button {
  opacity: 1;
  transform: translateY(0);
}
```

### Staggered List Item Transitions

```css
.list-item {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.list-item:nth-child(1) { transition-delay: 0.05s; }
.list-item:nth-child(2) { transition-delay: 0.1s; }
.list-item:nth-child(3) { transition-delay: 0.15s; }
.list-item:nth-child(4) { transition-delay: 0.2s; }
.list-item:nth-child(5) { transition-delay: 0.25s; }
.list-item:nth-child(6) { transition-delay: 0.3s; }

.list-item.visible {
  opacity: 1;
  transform: translateX(0);
}
```

### Subtle UI Transitions

```css
/* Button press effect */
.btn-press {
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.btn-press:active {
  transform: scale(0.95);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Accordion content */
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  padding: 0 16px;
}

.accordion.open .accordion-content {
  max-height: 500px;
  opacity: 1;
  padding: 16px;
}

/* Skeleton shimmer */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
```

## Transition Events

```js
const element = document.querySelector('.interactive-card');

element.addEventListener('transitionstart', () => {
  console.log('Transition started');
});

element.addEventListener('transitionrun', () => {
  console.log('Transition is running (before delay)');
});

element.addEventListener('transitionend', (e) => {
  console.log(`Transition ended for property: ${e.propertyName}`);
  console.log(`Duration: ${e.elapsedTime}s`);
});

element.addEventListener('transitioncancel', () => {
  console.log('Transition cancelled');
});
```

## Best Practices

```css
/* Only transition compositor properties for performance */
.good {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Avoid layout-triggering properties */
.bad {
  transition: margin 0.3s ease, width 0.3s ease, height 0.3s ease;
}

/* Use will-change for known animations */
.will-animate {
  will-change: transform, opacity;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Practice

1. Create a navigation menu where links have an underline that transitions from left to right on hover.
2. Build a modal that slides in from the top with a bounce effect using cubic-bezier.
3. Create an image gallery where hovering an image scales it up while dimming neighboring images.
4. Build a notification toast that slides in from the right, pauses on hover, and slides out after 5 seconds.
