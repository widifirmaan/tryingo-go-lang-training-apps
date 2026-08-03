# The Event Loop & Non-Blocking I/O

> Node.js | Node Foundations | Lesson 2

## Learning Objectives

- Explain the event loop: one thread, many tasks
- Distinguish blocking and non-blocking operations
- Understand the order: sync → microtask → timers → check
- Explain why Node suits I/O-heavy workloads (web servers)

---

## Program: The Event Loop & Non-Blocking I/O

```js
// Event loop: urutan eksekusi di Node
// Jalankan: node server.js

console.log('1. Mulai (sync)');

// Timers: dijadwalkan, bukan langsung jalan
setTimeout(() => {
  console.log('3. setTimeout 0ms - masuk fase timers');
}, 0);

setImmediate(() => {
  console.log('4. setImmediate - fase check');
});

// Microtask: prioritas tertinggi setelah operasi sync
Promise.resolve().then(() => {
  console.log('2. Promise microtask - dijalankan SEBELUM timers!');
});

// Simulasi I/O non-blocking: baca file besar
const fs = require('node:fs');
fs.readFile(__filename, 'utf-8', (err, data) => {
  console.log('5. File dibaca: ' + data.length + ' karakter (callback I/O)');
});

// Baris ini SELALU jalan terakhir dari kode sync
console.log('6. Selesai (sync) - event loop sekarang mengurus sisanya');

// Non-blocking = server bisa layani ribuan request
const http = require('node:http');
http.createServer((req, res) => {
  // Dua request "berat" tidak saling memblokir
  setTimeout(() => {
    res.end('Request selesai: ' + new Date().toISOString());
  }, 100);
}).listen(3000, () => console.log('Server siap di :3000 (non-blocking)'));
```

---

## Explanation

## One Thread, Many Tasks
JavaScript in Node runs on a SINGLE main thread. The paradox: a Node server can serve thousands of connections at once. The answer is the event loop. The main thread does not wait for I/O - it hands the work to libuv (a C library), then goes back to processing other tasks. When the I/O finishes, the result is queued as a callback.
## Blocking vs Non-Blocking
Blocking: a code line halts execution until it finishes (readFileSync, heavy CPU work). Non-blocking: the code hands off the task and moves on; the result arrives via a callback (readFile, http request). Golden rule: on a server, ALWAYS use the async version for I/O. The sample uses readFile (async) - imagine if it used readFileSync: every other request would have to wait.
## Execution Order (Crucial)
The order in the sample: (1) sync code runs immediately, (2) microtasks (Promises) - run AFTER sync but BEFORE timers, (3) timers (setTimeout/setInterval), (4) I/O callbacks, (5) check (setImmediate). Most "weird bugs" in Node are developers guessing this order wrong. Run it and watch the 1-6 output.
## Why This Matters for Web Servers
One event loop + non-blocking I/O = a single server handling thousands of connections with small resources. A blocking server (sync version) queues every request behind the slow one. This is why Node dominates backend APIs: I/O (databases, network, disk) is the main work of APIs, and Node is optimized exactly for that.

---

## Experiments

1. **One Thread, Many Tasks**
2. **Blocking vs Non-Blocking**
3. **Execution Order (Crucial)**
4. **Why This Matters for Web Servers**

---

## Challenge

Run and observe the log order. Then modify: (1) add a second setTimeout with a 100ms delay - where does it appear? (2) add a second Promise.resolve().then - where does it appear? (3) predict the order BEFORE running, write down your prediction, then compare with the actual output.

---

## Summary

One thread + event loop + libuv = non-blocking I/O. Order: sync → microtask → timers → check. APIs are I/O-bound, and Node is optimized for that. Next: modules and npm.
