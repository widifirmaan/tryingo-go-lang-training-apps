# Events & Async Programming

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 4:** Events & Async Programming

## Learning Objectives

- EventEmitter: on, emit, once, removeListener
- Callback pattern: error-first callback (Node.js convention)
- Promise: then, catch, finally, Promise.all
- Async/await: syntactic sugar for Promises
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

## Key Concepts

### EventEmitter
on, emit, once.

### Callbacks
Error-first pattern.

### Promises & Async/Await
Promise chains and async/await syntax.

---

## Experiments

- Create your own class extending EventEmitter
- Implement Promise.all with 3 promises
- Try setTimeout vs setImmediate
- Create retry logic with Promises and async/await

---

## Challenge

Build an event-driven logger: EventEmitter with levels (info, warn, error), write to file, and filter by level.

---

## Summary

Week 4 of 12: **Events & Async Programming** (Level: Beginner). Beginner phase complete! Next week: **Express.js & Web Server** (Intermediate).
