# Events & Async Programming

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 4:** Events & Async Programming

## Tujuan Pembelajaran

- EventEmitter: on, emit, once, removeListener
- Callback pattern: error-first callback (Node.js convention)
- Promise: then, catch, finally, Promise.all
- Async/await: syntactic sugar untuk Promise
- Event loop: setTimeout, setImmediate, process.nextTick

---

## Program: Event Emitter

```javascript
const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(level, message) {
    const timestamp = new Date().toISOString();
    this.emit("log", { timestamp, level, message });
  }
}

const logger = new Logger();
logger.on("log", (data) => {
  console.log("[" + data.timestamp + "] " + data.level + ": " + data.message);
});
logger.log("INFO", "Aplikasi dimulai");
logger.log("WARN", "Memory usage tinggi");
logger.log("ERROR", "Koneksi database gagal");

console.log("\n=== Promise Pattern ===");
function getUser(id) {
  return new Promise((resolve, reject) => {
    if (id > 0) resolve({ id, nama: "User " + id });
    else reject(new Error("ID tidak valid"));
  });
}

getUser(1).then(user => {
  console.log("User:", user.nama);
  return getUser(2);
}).then(user => {
  console.log("User:", user.nama);
}).catch(err => {
  console.log("Error:", err.message);
});

console.log("\n=== Async/Await ===");
async function loadUsers() {
  const u1 = await getUser(1);
  const u2 = await getUser(2);
  console.log("Loaded:", u1.nama + ", " + u2.nama);
}
loadUsers();
```

---

## Konsep Kunci

### EventEmitter
on daftarkan listener, emit trigger event, once sekali dengar.

### Callback
Error-first: callback(err, result).

### Promise & Async/Await
Promise untuk async operation. async/await untuk synchronous-looking async code.

---

## Eksperimen

- Buat class sendiri yang extends EventEmitter
- Implementasikan Promise.all dengan 3 promise
- Coba setTimeout vs setImmediate
- Buat retry logic dengan Promise dan async/await

---

## Tantangan

Buat event-driven logger: EventEmitter dengan level (info, warn, error), write ke file, dan filter by level.

---

## Ringkasan

Minggu 4 dari 12: **Events & Async Programming** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Express.js & Web Server** (Intermediate).
