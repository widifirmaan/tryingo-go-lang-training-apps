# Web Workers

## Overview

Web Workers allow JavaScript to run in background threads, keeping the main thread responsive for UI interactions.

### Basic Worker

```js
// main.js
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage({ type: 'compute', data: [1, 2, 3, 4, 5] });

// Receive data from worker
worker.addEventListener('message', (e) => {
  console.log('Worker result:', e.data);
});

// Handle errors
worker.addEventListener('error', (e) => {
  console.error('Worker error:', e.message);
});
```

```js
// worker.js
self.addEventListener('message', (e) => {
  const { type, data } = e.data;

  switch (type) {
    case 'compute':
      const result = processData(data);
      self.postMessage(result);
      break;
    case 'heavy':
      // Long-running computation
      const heavyResult = performHeavyTask(data);
      self.postMessage(heavyResult);
      break;
  }
});

function processData(data) {
  // Simulate heavy computation
  return data.map(x => x * 2).reduce((a, b) => a + b, 0);
}
```

## Practical Examples

### Prime Number Calculator

```html
<div>
  <input type="number" id="primeLimit" value="100000" min="100" max="10000000">
  <button id="calcPrimeBtn">Find Primes</button>
  <button id="cancelPrimeBtn">Cancel</button>
  <p>Result: <span id="primeResult">--</span></p>
  <p>Time: <span id="primeTime">--</span>ms</p>
</div>
```

```js
// main.js
const primeWorker = new Worker('prime-worker.js');
const calcBtn = document.getElementById('calcPrimeBtn');
const cancelBtn = document.getElementById('cancelPrimeBtn');

calcBtn.addEventListener('click', () => {
  const limit = parseInt(document.getElementById('primeLimit').value);
  const startTime = performance.now();

  primeWorker.postMessage({ type: 'findPrimes', limit });

  primeWorker.onmessage = (e) => {
    const { count, primes } = e.data;
    const endTime = performance.now();
    document.getElementById('primeResult').textContent =
      `Found ${count} primes. Max: ${primes[primes.length - 1]}`;
    document.getElementById('primeTime').textContent =
      Math.round(endTime - startTime);
  };
});

cancelBtn.addEventListener('click', () => {
  primeWorker.terminate();
  document.getElementById('primeResult').textContent = 'Cancelled';
});
```

```js
// prime-worker.js
self.onmessage = (e) => {
  const { type, limit } = e.data;

  if (type === 'findPrimes') {
    const primes = [];
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i <= limit; i++) {
      if (isPrime[i]) {
        primes.push(i);
        for (let j = i * i; j <= limit; j += i) {
          isPrime[j] = false;
        }
      }
    }

    self.postMessage({ count: primes.length, primes });
  }
};
```

### Image Processing

```js
// main.js
const imageWorker = new Worker('image-worker.js');

function applyFilter(imageData, filterType) {
  return new Promise((resolve, reject) => {
    // Transfer imageData buffer (zero-copy)
    imageWorker.postMessage(
      { imageData, filterType },
      [imageData.data.buffer]
    );

    imageWorker.onmessage = (e) => resolve(e.data);
    imageWorker.onerror = (e) => reject(e);
  });
}

// Usage
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

applyFilter(imageData, 'grayscale').then(filteredData => {
  ctx.putImageData(filteredData, 0, 0);
});
```

```js
// image-worker.js
self.onmessage = (e) => {
  const { imageData, filterType } = e.data;

  switch (filterType) {
    case 'grayscale':
      applyGrayscale(imageData);
      break;
    case 'sepia':
      applySepia(imageData);
      break;
    case 'invert':
      applyInvert(imageData);
      break;
  }

  self.postMessage(imageData, [imageData.data.buffer]);
};

function applyGrayscale(data) {
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const gray = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
    pixels[i] = gray;     // R
    pixels[i + 1] = gray; // G
    pixels[i + 2] = gray; // B
  }
}

function applySepia(data) {
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    pixels[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    pixels[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    pixels[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
  }
}

function applyInvert(data) {
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255 - pixels[i];
    pixels[i + 1] = 255 - pixels[i + 1];
    pixels[i + 2] = 255 - pixels[i + 2];
  }
}
```

### Web Worker Pool

```js
class WorkerPool {
  constructor(workerScript, size = navigator.hardwareConcurrency || 4) {
    this.workers = [];
    this.queue = [];
    this.active = new Map();

    for (let i = 0; i < size; i++) {
      const worker = new Worker(workerScript);
      worker.id = i;
      worker.busy = false;
      worker.onmessage = (e) => this.handleResult(worker, e);
      worker.onerror = (e) => this.handleError(worker, e);
      this.workers.push(worker);
    }
  }

  runTask(data) {
    return new Promise((resolve, reject) => {
      const task = { data, resolve, reject };
      const availableWorker = this.workers.find(w => !w.busy);

      if (availableWorker) {
        this.executeTask(availableWorker, task);
      } else {
        this.queue.push(task);
      }
    });
  }

  executeTask(worker, task) {
    worker.busy = true;
    this.active.set(worker, task);
    worker.postMessage(task.data);
  }

  handleResult(worker, e) {
    const task = this.active.get(worker);
    if (task) {
      task.resolve(e.data);
      this.active.delete(worker);
    }

    worker.busy = false;
    if (this.queue.length > 0) {
      this.executeTask(worker, this.queue.shift());
    }
  }

  handleError(worker, e) {
    const task = this.active.get(worker);
    if (task) {
      task.reject(e);
      this.active.delete(worker);
    }
    worker.busy = false;
  }

  terminate() {
    this.workers.forEach(w => w.terminate());
    this.workers = [];
    this.queue = [];
    this.active.clear();
  }
}

// Usage
const pool = new WorkerPool('compute-worker.js');

async function processBatch(items) {
  const promises = items.map(item => pool.runTask(item));
  const results = await Promise.all(promises);
  return results;
}
```

## Worker Limitations

```js
// Workers cannot access:
// - DOM (document, window, parent)
// - Some APIs (localStorage, sessionStorage)
// - Canvas (but can use OffscreenCanvas)

// Workers can access:
// - fetch, XMLHttpRequest
// - IndexedDB
// - WebSockets
// - setTimeout, setInterval
// - importScripts (synchronous)
// - Wasm (WebAssembly)

// In worker:
importScripts('library.js', 'utils.js');

// Using results from imported script
console.log(MyLibrary.doSomething());

// OffscreenCanvas in worker
const offscreen = new OffscreenCanvas(256, 256);
const ctx = offscreen.getContext('2d');
// Draw something...
const blob = await offscreen.convertToBlob();
self.postMessage(blob);
```

## Practice

1. Create a word counter app that uses a Web Worker to count words, characters, and sentences in large text inputs.
2. Build a fractal renderer (Mandelbrot set) using a Web Worker so the UI stays responsive.
3. Implement a CSV parser that processes large files in a Web Worker and returns structured JSON.
4. Create a real-time data dashboard that uses a Web Worker to poll an API and process data without blocking the UI.
