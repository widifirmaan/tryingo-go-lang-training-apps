# Performance Optimization

> **Kategori:** JavaScript | **Level:** Advanced | **Minggu 13:** Performance Optimization

## Learning Objectives

- Debounce: delay execution until user stops
- Throttle: limit execution rate
- Memoization: cache expensive function results
- Lazy loading: load resources when needed
- Web Workers: heavy computation in separate thread

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
// Hanya "appl" yang akan dijalankan setelah 300ms

console.log("\n=== Throttle ===");
const throttledScroll = throttle(() => console.log("Scroll event"), 1000);
throttledScroll(); // jalan
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
console.log("1. Debounce/throttle untuk events yang sering");
console.log("2. Memoization untuk fungsi mahal");
console.log("3. Lazy loading untuk resources besar");
console.log("4. Virtual DOM untuk update efisien");
console.log("5. Web Workers untuk heavy computation");
console.log("6. requestAnimationFrame untuk animasi");
console.log("7. Avoid memory leaks (cleanup listeners)");
```

---

## Key Concepts

### Debounce
Wait for user to stop typing before searching. 300ms delay.

### Throttle
Limit execution per time. Scroll handler max 1x per second.

### Memoization
Cache results by arguments. Fibonacci O(n) from O(2^n).

### Lazy Loading
Load image/component only when visible in viewport.

### Web Workers
Run heavy tasks in background thread. Doesn't block UI.

### RAF
`requestAnimationFrame` for smooth 60fps animations.

---

## Experiments

- Create debounce with immediate option
- Try throttle with trailing call
- Experiment memoization with cache size limit
- Create lazy loading for long list
- Try requestIdleCallback for low-priority work

---

## Challenge

Build a search component: debounced input, memoized results, lazy loaded list, with performance metrics.

---

## Summary

Week 13 of 14: **Performance Optimization** (Level: Advanced). Speed & efficiency. Next week: **Capstone Project**!
