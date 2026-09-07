# Performance Optimization

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 13:** Performance Optimization

## Tujuan Pembelajaran

- Debounce: delay execution sampai user berhenti
- Throttle: limit execution rate
- Memoization: cache hasil fungsi mahal
- Lazy loading: load resources saat dibutuhkan
- Web Workers: heavy computation di thread terpisah

---

## Kenapa Ini Penting Buat Kamu?

Daftar 1000 tanpa `memo`/`lazy` = ngos-ngosan di HP kentang. Dengan split + cache + `debounce` cari, 5 detik → 0.5.

---

## Program: Optimasi Performa

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

## Konsep Kunci

### Debounce
Tunggu user berhenti mengetik sebelum search. Delay 300ms.

### Throttle
Limit execution per waktu. Scroll handler max 1x per detik.

### Memoization
Cache hasil berdasarkan argumen. Fibonacci O(n) dari O(2^n).

### Lazy Loading
Load image/component hanya saat terlihat di viewport.

### Web Workers
Jalankan heavy task di background thread. Tidak block UI.

### RAF
`requestAnimationFrame` untuk animasi smooth 60fps.

---

## Eksperimen

- Buat debounce dengan immediate option
- Coba throttle dengan trailing call
- Eksperimen memoization dengan cache size limit
- Buat lazy loading untuk list panjang
- Coba requestIdleCallback untuk low-priority work

---

## Tantangan

Buat search component: debounced input, memoized results, lazy loaded list, dengan performance metrics.


---

## Penjelasan untuk Pemula

### Analogi: Warung Hemat Energi
- Lihat Program: jalankan (`node`/browser), ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama JS W1: `node -v` / browser + `npm test` untuk W12.

### Cara Komputer Membaca
- `lazy()` split; `useMemo` ingat; `debounce` tunggu ketik berhenti; `Lighthouse` nilai.

### 3 Istilah Wajib
- 1. **lazy/memo/debounce**: nanti/ingat/tunggu

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 13 dari 14: **Performance Optimization** (Level: Lanjutan). Kecepatan & efisiensi. Minggu depan: **Capstone Project**!
