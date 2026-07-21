# CSS Animations

## Overview

CSS animations allow elements to transition between CSS style configurations over time using keyframes.

## CSS Transitions

### Basic Transition

```css
.box {
  width: 100px;
  height: 100px;
  background: #3498db;
  transition: background 0.3s ease, transform 0.5s ease-in-out;
}

.box:hover {
  background: #e74c3c;
  transform: scale(1.2) rotate(45deg);
}
```

### Transition Properties

```css
.element {
  /* Property duration timing-function delay */
  transition: opacity 0.3s ease 0.1s;

  /* Multiple transitions */
  transition:
    transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    background 0.3s ease,
    box-shadow 0.3s ease;

  /* All properties */
  transition: all 0.3s ease;
}
```

### Timing Functions

```css
.ease       { transition-timing-function: ease; }
.ease-in    { transition-timing-function: ease-in; }
.ease-out   { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }
.linear     { transition-timing-function: linear; }

/* Custom cubic-bezier */
.bounce     { transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55); }
.overshoot  { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
```

### Triggering Transitions

```js
const el = document.querySelector('.box');

// Via class change
el.addEventListener('click', () => {
  el.classList.toggle('active');
});

// Via inline style
el.addEventListener('click', () => {
  el.style.transform = 'translateX(200px)';
});
```

```css
.box.active {
  transform: translateX(200px) scale(1.1);
  background: #2ecc71;
  box-shadow: 0 8px 24px rgba(46, 204, 113, 0.3);
}
```

## @keyframes

### Basic Keyframe

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}
```

### Multi-Step Keyframe

```css
@keyframes bounce {
  0% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  25% {
    transform: translateY(-60px);
    animation-timing-function: ease-in;
  }
  50% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  75% {
    transform: translateY(-30px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
}

.bouncing-ball {
  width: 50px;
  height: 50px;
  background: #e74c3c;
  border-radius: 50%;
  animation: bounce 1s ease infinite;
}
```

### Complex Animations

```css
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-100px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateX(20px) scale(1.05);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.4); }
  50% { box-shadow: 0 0 0 20px rgba(52, 152, 219, 0); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.notification {
  animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}

.pulse-button {
  animation: pulse 2s infinite;
}

.spinner {
  animation: spin 1s linear infinite;
}
```

## Animation Properties

```css
.animated-element {
  /* Shorthand */
  animation: name duration timing-function delay iteration-count direction fill-mode play-state;

  /* Individual properties */
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
}
```

### Animation Direction

```css
.normal  { animation-direction: normal; }
.reverse { animation-direction: reverse; }
.alternate { animation-direction: alternate; }
.alternate-reverse { animation-direction: alternate-reverse; }
```

### Animation Fill Mode

```css
/* none: no styles applied before/after */
.none { animation-fill-mode: none; }

/* forwards: retains end state */
.forwards { animation-fill-mode: forwards; }

/* backwards: applies start state during delay */
.backwards { animation-fill-mode: backwards; }

/* both: combines forwards and backwards */
.both { animation-fill-mode: both; }
```

## Staggered Animations

```html
<ul class="stagger-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
  <li>Item 5</li>
</ul>
```

```css
@keyframes slideInList {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.stagger-list li {
  animation: slideInList 0.4s ease forwards;
  opacity: 0;
}

.stagger-list li:nth-child(1) { animation-delay: 0.05s; }
.stagger-list li:nth-child(2) { animation-delay: 0.1s; }
.stagger-list li:nth-child(3) { animation-delay: 0.15s; }
.stagger-list li:nth-child(4) { animation-delay: 0.2s; }
.stagger-list li:nth-child(5) { animation-delay: 0.25s; }
```

## Keyframe Events

```js
const element = document.querySelector('.animated-element');

element.addEventListener('animationstart', () => {
  console.log('Animation started');
});

element.addEventListener('animationend', () => {
  console.log('Animation ended');
  // Do something after animation completes
  element.classList.remove('animated-element');
});

element.addEventListener('animationiteration', () => {
  console.log('Animation iteration completed');
});
```

## Performance Best Practices

```css
/* Only animate transform and opacity for GPU acceleration */
.gpu-accelerated {
  will-change: transform, opacity;
  /* or */
  transform: translateZ(0); /* Old trick, avoid when possible */
}

/* Avoid animating layout-triggering properties */
/* Bad: causes layout recalculations */
.bad {
  animation: move 1s ease;
}
@keyframes move {
  from { margin-left: 0; }  /* Layout trigger */
  to { margin-left: 100px; } /* Layout trigger */
}

/* Good: only compositor-triggering */
.good {
  animation: transform 1s ease;
}
@keyframes transform {
  from { transform: translateX(0); } /* Compositor */
  to { transform: translateX(100px); } /* Compositor */
}
```

## Practice

1. Create a loading spinner with three dots that bounce sequentially.
2. Build a card flip animation (3D transform) that reveals content on click.
3. Create an animated progress bar that fills from 0% to 100% over 3 seconds.
4. Implement a staggered entrance animation for a grid of 12 items using CSS custom properties for delays.
