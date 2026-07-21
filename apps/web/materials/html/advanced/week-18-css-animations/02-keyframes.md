# Keyframe Animations

## Overview

`@keyframes` allows you to define complex multi-step animations with precise control over each stage.

### Basic Keyframe Structure

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes complex {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(100px, 0) rotate(90deg); }
  50% { transform: translate(100px, 100px) rotate(180deg); }
  75% { transform: translate(0, 100px) rotate(270deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}
```

## Animation Properties

```css
.element {
  /* Shorthand */
  animation: name duration timing-function delay iteration-count direction fill-mode play-state;

  /* Individual */
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: both;
  animation-play-state: running;
}
```

## Practical Animations

### Loading Spinners

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Three-dot bounce */
@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.dots {
  display: flex;
  gap: 8px;
}

.dots span {
  width: 12px;
  height: 12px;
  background: #3498db;
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite both;
}

.dots span:nth-child(1) { animation-delay: -0.32s; }
.dots span:nth-child(2) { animation-delay: -0.16s; }
.dots span:nth-child(3) { animation-delay: 0s; }
```

### Entrance Animations

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

.animate-fade-up { animation: fadeInUp 0.6s ease forwards; }
.animate-fade-scale { animation: fadeInScale 0.5s ease forwards; }
.animate-slide-left { animation: slideInLeft 0.4s ease forwards; }
.animate-zoom { animation: zoomIn 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
```

### Attention Grabbers

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes wobble {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(-5deg); }
  30% { transform: rotate(3deg); }
  45% { transform: rotate(-3deg); }
  60% { transform: rotate(2deg); }
  75% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
}

@keyframes flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}

.error-shake { animation: shake 0.5s ease; }
.wobble-hover:hover { animation: wobble 0.6s ease; }
.flash-attention { animation: flash 1s ease 3; }
```

### Continuous Animations

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.7;
  }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

.breathing-bg {
  animation: breathe 4s ease-in-out infinite;
}

.gradient-bg {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}
```

## Animation Events

```js
const element = document.querySelector('.animate-fade-up');

element.addEventListener('animationstart', (e) => {
  console.log('Animation started:', e.animationName);
});

element.addEventListener('animationend', (e) => {
  console.log('Animation ended:', e.animationName);
  console.log('Elapsed time:', e.elapsedTime);
  element.classList.remove('animate-fade-up');
});

element.addEventListener('animationiteration', (e) => {
  console.log('Animation iteration:', e.animationName);
});

// Chain animations
async function playSequence() {
  await animate(el1, 'fadeInUp');
  await animate(el2, 'slideInLeft');
  await animate(el3, 'zoomIn');
}

function animate(element, animationName) {
  return new Promise(resolve => {
    element.classList.add(animationName);
    element.addEventListener('animationend', () => {
      resolve();
    }, { once: true });
  });
}
```

## Staggered Animations with CSS Custom Properties

```css
.card {
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
  animation-delay: calc(var(--i, 0) * 0.1s);
}

.card:nth-child(1) { --i: 0; }
.card:nth-child(2) { --i: 1; }
.card:nth-child(3) { --i: 2; }
.card:nth-child(4) { --i: 3; }
.card:nth-child(5) { --i: 4; }
.card:nth-child(6) { --i: 5; }
```

## Practice

1. Build a complete page loading animation: logo appears first, then nav, then main content staggers in.
2. Create an animated background gradient that smoothly transitions through 4 colors.
3. Build a bouncing ball that respects gravity (use multiple keyframe steps with different easings).
4. Create a notification badge that pulses to draw attention, stops on hover, and shakes on click.
