# Scroll-Driven Animations

## Overview

Scroll-driven animations link animation progress to scroll position, creating parallax effects and scroll-triggered transitions.

## CSS Scroll-Driven Animations

### scroll() Function

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.element {
  /* Link animation to scroll progress */
  animation: fadeIn linear;
  animation-timeline: scroll();
}

.progress-bar {
  animation: grow linear;
  animation-timeline: scroll();
  transform-origin: left;
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: #3498db;
  width: 100%;
}
```

### scroll() Parameters

```css
/* Default: nearest scrollable ancestor, block direction */
.element {
  animation: anim linear;
  animation-timeline: scroll();
}

/* Specific scroll container */
.element {
  animation-timeline: scroll(nearest);
  animation-timeline: scroll(root);     /* Document scroll */
  animation-timeline: scroll(self);     /* Self scroll */
  animation-timeline: scroll(nearest, block);  /* Block direction */
  animation-timeline: scroll(nearest, inline); /* Inline direction */
  animation-timeline: scroll(nearest, y);      /* Vertical */
  animation-timeline: scroll(nearest, x);      /* Horizontal */
}
```

### view() Function

```js
/* Link animation to when element enters viewport */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-100px); }
  to { opacity: 1; transform: translateX(0); }
}

.reveal {
  animation: slideIn linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### animation-range

```css
/* Control when animation starts/stops relative to scroll */
.element {
  animation: fadeIn linear;
  animation-timeline: scroll(root);
  animation-range: 0% 50%; /* Animate during first 50% of scroll */
}

.reveal-card {
  animation: fadeInUp 0.5s ease;
  animation-timeline: view();
  animation-range: entry 0% entry 100%; /* Start when entering, end when fully visible */
  animation-range: cover 0% cover 50%;  /* Cover = from entering to leaving */
}

/* Named ranges: entry, exit, cover */
@keyframes parallax {
  from { transform: translateY(0); }
  to { transform: translateY(-100px); }
}

.parallax-element {
  animation: parallax linear;
  animation-timeline: scroll(root);
  animation-range: 0% 100%;
}

/* Different ranges for different effects */
.fade-in-on-scroll {
  animation: fadeIn linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

.fade-out-on-scroll {
  animation: fadeOut linear;
  animation-timeline: view();
  animation-range: exit 0% exit 100%;
}
```

## Parallax Scrolling

```html
<section class="parallax-section">
  <div class="parallax-bg"></div>
  <div class="parallax-content">
    <h2>Scroll Effect</h2>
    <p>Background moves slower than content.</p>
  </div>
</section>
```

```css
.parallax-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parallax-bg {
  position: absolute;
  inset: -100px; /* Extend beyond for movement */
  background: url('mountains.jpg') center/cover;
  animation: parallaxMove linear;
  animation-timeline: scroll(root);
  animation-range: 0% 100%;
  z-index: 0;
}

@keyframes parallaxMove {
  from { transform: translateY(0); }
  to { transform: translateY(100px); }
}

.parallax-content {
  position: relative;
  z-index: 1;
  text-align: center;
  animation: contentFade linear;
  animation-timeline: scroll(root);
  animation-range: 0% 50%;
}

@keyframes contentFade {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-50px); }
}
```

## Scroll-Triggered Element Reveal

```html
<div class="reveal-container">
  <div class="reveal-item" data-delay="0">
    <h3>Item 1</h3>
    <p>Content that reveals on scroll.</p>
  </div>
  <div class="reveal-item" data-delay="1">
    <h3>Item 2</h3>
    <p>Content that reveals on scroll.</p>
  </div>
  <div class="reveal-item" data-delay="2">
    <h3>Item 3</h3>
    <p>Content that reveals on scroll.</p>
  </div>
</div>
```

```css
.reveal-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: calc(attr(data-delay number, 0) * 0.2s);
}

/* Using view timeline */
.reveal-item {
  animation: revealAnim linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes revealAnim {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## View Timeline with Offset

```css
/* Image before/after comparison on scroll */
.image-compare {
  position: relative;
  animation: revealImage linear;
  animation-timeline: view();
  animation-range: entry -10% entry 100%; /* Start before entering */
}

@keyframes revealImage {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

## Scroll Progress Bar

```html
<div class="scroll-progress" id="scrollProgress"></div>
```

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 1000;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transform-origin: left;
  animation: progressAnim linear;
  animation-timeline: scroll(root);
}

@keyframes progressAnim {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

## JavaScript Scroll-Driven Animations (Intersection Observer)

```js
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally unobserve after trigger
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
  observer.observe(el);
});

// Parallax with scroll listener
function parallaxElements() {
  const elements = document.querySelectorAll('.js-parallax');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    elements.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.5;
      const rect = el.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = scrollY * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
  }, { passive: true });
}

parallaxElements();

// Smooth scroll progress
window.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight);
  document.getElementById('scrollProgress').style.transform =
    `scaleX(${scrollPercent})`;
}, { passive: true });
```

## Practice

1. Build a reading progress bar that fills as the user scrolls down an article.
2. Create a parallax hero section where the background image moves slower than the foreground text.
3. Implement scroll-triggered reveals for a grid of 12 items that fade in as they enter the viewport.
4. Build a timeline/history page where each event card slides in from alternating sides as you scroll.
