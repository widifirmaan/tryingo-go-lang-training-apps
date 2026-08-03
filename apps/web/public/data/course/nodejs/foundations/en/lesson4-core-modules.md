# Core Modules: fs, path, os, events

> Node.js | Node Foundations | Lesson 4

## Learning Objectives

- Read and write files with fs (async)
- Use path for cross-platform path handling
- Read system info with os
- Build event-driven architecture with EventEmitter

---

## Program: Core Modules: fs, path, os, events

```js
// Core modules: fs, path, os, events
// Jalankan: node server.js

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { EventEmitter } = require('node:events');

// --- fs: baca & tulis file (selalu versi async di server) ---
fs.writeFile('catatan.txt', 'Belajar Node: catatan pertama\n', (err) => {
  if (err) throw err;
  console.log('File catatan.txt ditulis.');
  fs.readFile('catatan.txt', 'utf-8', (err, data) => {
    console.log('Isi file:', data.trim());
  });
});

// --- path: manipulasi path lintas platform (Windows/Linux/Mac) ---
const filePath = path.join(__dirname, 'subfolder', 'app.js');
console.log('path.join:', filePath);
console.log('basename:', path.basename(filePath));
console.log('extname:', path.extname(filePath));

// --- os: informasi sistem ---
console.log('Platform:', os.platform());
console.log('CPU cores:', os.cpus().length);
console.log('Free memory:', Math.round(os.freemem() / 1024 / 1024) + 'MB');

// --- events: EventEmitter, pola observer ---
class PesanService extends EventEmitter {}
const pesan = new PesanService();
pesan.on('pesan-baru', (isi) => {
  console.log('Event diterima:', isi);
});
pesan.emit('pesan-baru', 'Halo dari EventEmitter!');

// EventEmitter adalah fondasi stream, http, dan Express.
```

---

## Explanation

## fs: The File System
fs.writeFile and fs.readFile are the foundation of apps that store data on disk. Always use the callback (async) version on the server - the Sync versions (readFileSync) block the event loop. Node 14+ has fs.promises (async/await) - the modern pattern. Bonus: streams (fs.createReadStream) for large files, lesson 13.
## path: The Cross-Platform Secret Weapon
'/' works on Linux/Mac but fails on Windows - path.join handles separators automatically. path.basename/extname/dirname for parsing. The most common bug in cross-platform Node codebases is hardcoding the '/' separator. Remember: __dirname = the current file's folder, __filename = the current file's full path.
## os: Read the Machine's Health
os.platform(), os.cpus(), os.freemem(), os.hostname() are used for monitoring, logging, and tuning behavior (e.g., worker count = CPU core count - relevant in lesson 15).
## events: Node's Most Important Design Pattern
EventEmitter implements the observer pattern: objects "emit" events, listeners "listen" for them. This is the foundation: the http server emits 'request', streams emit 'data'/'end', Express is built on it. Understanding the emitter means understanding half of Node's API. The event + listener pattern is also what makes server architecture modular.

---

## Experiments

1. **fs: The File System**
2. **path: The Cross-Platform Secret Weapon**
3. **os: Read the Machine's Health**
4. **events: Node's Most Important Design Pattern**

---

## Challenge

Build a mini-logger: create a Logger class extends EventEmitter with a "log" event carrying { level, message, time }. Write logInfo/logError functions that emit the event, and a listener that appends to app.log (fs.appendFile) and logs to the console. Simulate 5 user login activities. Run and inspect app.log.

---

## Summary

fs for files (async!), path across platforms, os for system info, events for event-driven architecture. These are the four pillars of the core modules. Next: web servers & HTTP.
