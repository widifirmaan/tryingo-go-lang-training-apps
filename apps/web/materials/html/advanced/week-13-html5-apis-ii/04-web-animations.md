# Web Animations API

## Overview

The Web Animations API (WAAPI) provides a unified way to create animations with JavaScript, combining the power of CSS animations with programmatic control.

### Basic Usage

```js
const element = document.querySelector('.box');

const animation = element.animate([
  { transform: 'translateX(0)', opacity: 0 },
  { transform: 'translateX(300px)', opacity: 1 }
], {
  duration: 1000,
  easing: 'ease-in-out',
  fill: 'forwards'
});
```

## Keyframe Formats

### Array of Keyframes

```js
// Simple keyframes
element.animate([
  { opacity: 0 },
  { opacity: 1 }
], 1000);

// Multiple properties
element.animate([
  { transform: 'scale(1)', background: '#3498db' },
  { transform: 'scale(1.5)', background: '#e74c3c', offset: 0.5 },
  { transform: 'scale(1)', background: '#2ecc71' }
], {
  duration: 2000,
  easing: 'ease'
});
```

### Object with Offsets

```js
element.animate({
  transform: ['translateX(0)', 'translateX(100px)', 'translateX(0)'],
  background: ['#3498db', '#e74c3c', '#2ecc71'],
  offset: [0, 0.5, 1] // Control timing of each keyframe
}, {
  duration: 2000,
  easing: 'ease-in-out'
});
```

## Timing Options

```js
element.animate(keyframes, {
  // Duration in ms
  duration: 1000,

  // Delay before starting
  delay: 500,

  // End delay
  endDelay: 300,

  // Timing function
  easing: 'ease-in-out',
  // or custom bezier
  easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',

  // Number of times to repeat
  iterations: 3,
  // or Infinity
  iterations: Infinity,

  // Direction
  direction: 'alternate',

  // Fill mode
  fill: 'forwards',

  // Auto reverse with alternate direction
  iterationStart: 0
});
```

## Animation Control

```js
const animation = element.animate(keyframes, options);

// Play controls
animation.play();
animation.pause();
animation.reverse();
animation.finish();
animation.cancel();

// State
console.log(animation.playState); // 'idle' | 'pending' | 'running' | 'paused' | 'finished'

// Seek to a specific time (ms)
animation.currentTime = 500;

// Change playback rate (2 = double speed, 0.5 = half)
animation.playbackRate = 2;

// Start time
console.log(animation.startTime);
```

## Events

```js
animation.addEventListener('finish', () => {
  console.log('Animation completed');
});

animation.addEventListener('cancel', () => {
  console.log('Animation was cancelled');
});

animation.addEventListener('remove', () => {
  console.log('Animation removed from element');
});

animation.finished.then(() => {
  console.log('Animation promise resolved');
});

animation.ready.then(() => {
  console.log('Animation is ready to play');
});
```

## Practical Examples

### Fade In on Scroll

```js
function animateOnScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate([
        { opacity: 0, transform: 'translateY(30px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 600,
        easing: 'ease-out',
        fill: 'forwards'
      });
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(animateOnScroll, {
  threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

### Toggle Animation

```js
const panel = document.querySelector('.panel');
const toggleBtn = document.getElementById('toggleBtn');
let isOpen = false;
let currentAnimation = null;

toggleBtn.addEventListener('click', () => {
  if (currentAnimation) {
    currentAnimation.cancel();
  }

  if (isOpen) {
    // Close
    currentAnimation = panel.animate([
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(100%)', opacity: 0 }
    ], {
      duration: 300,
      easing: 'ease-in',
      fill: 'forwards'
    });
  } else {
    // Open
    panel.animate([
      { transform: 'translateY(100%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards'
    });
  }

  isOpen = !isOpen;
});
```

### Progress-Based Animation

```js
const progressBar = document.querySelector('.progress-bar');

function updateProgress(percent) {
  const animation = progressBar.animate([
    { width: progressBar.style.width || '0%' },
    { width: `${percent}%` }
  ], {
    duration: 300,
    easing: 'ease-out',
    fill: 'forwards'
  });
  animation.onfinish = () => {
    progressBar.style.width = `${percent}%`;
  };
}

// Usage
updateProgress(50);
// Later
updateProgress(100);
```

### Complex Choreography

```js
async function runChoreography() {
  const el1 = document.querySelector('.el1');
  const el2 = document.querySelector('.el2');
  const el3 = document.querySelector('.el3');

  // Run first animation
  await el1.animate([
    { transform: 'scale(0)', opacity: 0 },
    { transform: 'scale(1)', opacity: 1 }
  ], { duration: 500, fill: 'forwards' }).finished;

  // Run two in parallel
  await Promise.all([
    el2.animate([
      { transform: 'translateX(-100px)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ], { duration: 400, fill: 'forwards' }).finished,

    el1.animate([
      { transform: 'scale(1)', opacity: 0.5 },
      { transform: 'scale(1.1)', opacity: 1 }
    ], { duration: 400, fill: 'forwards' }).finished
  ]);

  // Run third
  await el3.animate([
    { transform: 'translateY(30px)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ], { duration: 300, fill: 'forwards' }).finished;
}

runChoreography();
```

### Scroll-Linked Animation

```js
const progressElement = document.querySelector('.scroll-progress');
const animation = progressElement.animate([
  { width: '0%' },
  { width: '100%' }
], {
  duration: 1000, // Full scroll range mapped to 1 second
  fill: 'forwards'
});

// Pause and control via scroll
animation.pause();

document.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight);
  animation.currentTime = animation.effect.getTiming().duration * scrollPercent;
});
```

## Performance Considerations

```js
// Use composite modes for GPU acceleration
element.animate(keyframes, {
  composite: 'replace', // Default: replaces the property
  // composite: 'add', // Adds to existing transform
  // composite: 'accumulate', // Accumulates with existing
});

// Avoid animating many elements simultaneously
// Use a single animation on a container when possible
// Prefer transform and opacity over layout properties

// Clean up animations
const animations = element.getAnimations();
animations.forEach(anim => anim.cancel());

// Check if reduced motion is preferred
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Skip animations or use instant transitions
}
```

## Practice

1. Build a notification toast system where toasts slide in, pause on hover, and slide out after 3 seconds.
2. Create a drag-to-refresh animation that follows the user's finger/touch position.
3. Implement a skeleton loading screen with shimmer animations using WAAPI.
4. Build a page transition system where content fades out before navigating and fades in after loading.
