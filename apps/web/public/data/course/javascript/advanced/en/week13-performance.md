# Performance Optimization

> **Kategori:** JavaScript | **Level:** Advanced | **Minggu 13:** Performance Optimization
> **Prerequisites:** Week 12 — **Testing JavaScript**.

## Learning Objectives

- Debounce: delay execution until the user stops
- Throttle: limit execution rate
- Memoization: cache expensive function results
- Lazy loading: load resources when needed
- Web Workers: heavy computation on a separate thread

---

## Why This Matters (Non-IT)

A 1000-item list without `memo`/`lazy` = gasping on a potato phone. With split + cache + `debounce` search, 5 seconds → 0.5.

---

## Program: Performance Optimization

```javascript
// Debounce
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Throttle
function throttle(fn, limit) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Memoization
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("  Cache hit for", key);
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Lazy Loading Pattern
class LazyImage {
    constructor(src) {
        this.src = src;
        this.loaded = false;
    }

    load() {
        if (this.loaded) return;
        console.log("Loading:", this.src);
        this.loaded = true;
    }
}

// Demo
console.log("=== Debounce ===");
const debouncedSearch = debounce((q) => console.log("Search:", q), 300);
debouncedSearch("a");
debouncedSearch("ap");
debouncedSearch("app");
debouncedSearch("appl");
// Only "appl" will run after 300ms

console.log("\n=== Throttle ===");
const throttledScroll = throttle(() => console.log("Scroll event"), 1000);
throttledScroll(); // runs
throttledScroll(); // skip
throttledScroll(); // skip

console.log("\n=== Memoization ===");
const expensiveCalc = memoize((n) => {
    console.log("  Computing fib(" + n + ")");
    if (n <= 1) return n;
    return expensiveCalc(n - 1) + expensiveCalc(n - 2);
});
console.log("Result:", expensiveCalc(10));
console.log("Result (cached):", expensiveCalc(10));

console.log("\n=== Performance Tips ===");
console.log("1. Debounce/throttle for frequent events");
console.log("2. Memoization for expensive functions");
console.log("3. Lazy loading for big resources");
console.log("4. Virtual DOM for efficient updates");
console.log("5. Web Workers for heavy computation");
console.log("6. requestAnimationFrame for animation");
console.log("7. Avoid memory leaks (cleanup listeners)");
```

---

## Key Concepts

### Debounce
Wait for the user to stop typing before searching. 300ms delay.

### Throttle
Limit execution per time. Scroll handler max 1x per second.

### Memoization
Cache results by arguments. Fibonacci O(n) from O(2^n).

### Lazy Loading
Load images/components only when visible in the viewport.

### Web Workers
Run heavy tasks on a background thread. Doesn't block UI.

### RAF
`requestAnimationFrame` for smooth 60fps animation.

---

## Experiments

- Build debounce with immediate option
- Try throttle with trailing call
- Experiment memoization with cache size limit
- Build lazy loading for long lists
- Try requestIdleCallback for low-priority work

---

## Challenge

Build a search component: debounced input, memoized results, lazy loaded list, with performance metrics.


---

## Beginner Friendly Explanation

### Analogy: Energy-Saving Shop
- **1 keystroke → 1000 cards re-render = wasteful**: potato phones gasp + batteries drain.
- **`debounce` = wait until typing stops** (saves 10 requests into 1). **`memo` = remember expensive answers**. **`lazy` = load when visible** (don't load page bottom first!).

### Step 0 — Prepare Device
- Same as JS W1: `node -v` / browser + `npm test` for W12.

### How the Computer Reads It
- `lazy()` splits; `useMemo` remembers; `debounce` waits for typing to stop; `Lighthouse` scores.

### 3 Must-Know Terms
- 1. **lazy/memo/debounce**: later/remember/wait

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 13 of 14: **Performance Optimization** (Level: Advanced). Speed & efficiency. Next: **Capstone Project**!
