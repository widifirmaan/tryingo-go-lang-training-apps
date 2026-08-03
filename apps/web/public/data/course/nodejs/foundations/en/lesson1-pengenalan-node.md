# Node.js Intro: JavaScript on the Server

> Node.js | Node Foundations | Lesson 1

## Learning Objectives

- Explain what Node.js is and how it differs from browser JavaScript
- Run JavaScript programs with node
- Get to know V8, the runtime, and the REPL
- Create a first HTTP server in 10 lines of code

---

## Program: Node.js Intro: JavaScript on the Server

```js
// Program pertama Anda di Node.js
// Jalankan dengan: node server.js

const nama = 'Budi';
const tahun = 2026;

// console.log ke terminal adalah "print" di dunia Node
console.log('Halo dunia dari Node.js!');
console.log('Nama saya ' + nama + ' dan sekarang tahun ' + tahun);

// Node bisa melakukan hal yang tidak bisa dilakukan browser:
// baca file, akses sistem, buat server.

// Server HTTP pertama - 10 baris saja!
const http = require('node:http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Halo dari server Node.js!');
});

server.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
```

---

## Explanation

## What Is Node.js?
Node.js is a server-side JavaScript runtime built on the V8 engine (the same engine that runs JavaScript in Chrome). Consequence: one language for frontend and backend. Before Node (2009, Ryan Dahl), JavaScript could only run in the browser. Node opened a new world: file access, networking, databases, and web servers.
## JavaScript in the Browser vs in Node
Browsers provide the DOM (document, window). Node provides server APIs: fs (file system), http (networking), os (operating system), process. There is no DOM in Node - no document.getElementById. What exists: globals like console, process, Buffer. This mental model matters: Node is not "a browser without tabs", it is a different runtime environment.
## V8, the Runtime, and the REPL
V8 compiles JavaScript to machine code (JIT). The Node runtime adds libuv (async I/O), buffers, and core modules. The REPL (Read-Eval-Print Loop) is an interactive terminal: type node without a file, and every line executes immediately - great for quick experiments. Run node -v to check the version, node to enter the REPL.
## An HTTP Server in 10 Lines
The sample code: require('node:http'), createServer with a callback (req, res), listen(3000). This is the foundation of every Node web framework (Express, Nest). Master this level before climbing to a framework - most courses skip it, which is why many developers do not understand how servers actually work.

---

## Experiments

1. **What Is Node.js?**
2. **JavaScript in the Browser vs in Node**
3. **V8, the Runtime, and the REPL**
4. **An HTTP Server in 10 Lines**

---

## Challenge

Run the project in the playground. Then modify the server: (1) add an /about route responding "About Us", (2) change Content-Type to application/json and send the JSON object { name: "Budi", role: "student" }, (3) change the port to 4000. Restart and test in the preview. Write down what changed with each edit.

---

## Summary

Node.js = JavaScript on the server via V8. No DOM; there is fs, http, os, process. The REPL is for experiments. An HTTP server = createServer + listen. Next: the event loop, Node's heart.
