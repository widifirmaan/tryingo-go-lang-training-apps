# The HTTP Module & Web Servers

> Node.js | Express & Web APIs | Lesson 5

## Learning Objectives

- Read a request: method, path, query, body
- Write a response: status code, headers, JSON
- Build manual routing with pure http
- Understand the limits of pure http (why Express exists)

---

## Program: The HTTP Module & Web Servers

```js
// Web server dengan modul http murni (tanpa framework)
// Jalankan: node server.js lalu buka preview

const http = require('node:http');
const { URL } = require('node:url');

// Data in-memory sederhana (belum database - pelajaran 9)
const catatan = [
  { id: 1, judul: 'Belajar Node', selesai: false },
  { id: 2, judul: 'Belajar Express', selesai: true },
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  const method = req.method;

  // Helper untuk kirim JSON
  const kirimJson = (status, data) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // ROUTING manual: method + path
  if (method === 'GET' && url.pathname === '/') {
    return kirimJson(200, { pesan: 'API Catatan Sederhana' });
  }

  if (method === 'GET' && url.pathname === '/catatan') {
    return kirimJson(200, catatan);
  }

  if (method === 'GET' && url.pathname.startsWith('/catatan/')) {
    const id = Number(url.pathname.split('/')[2]);
    const item = catatan.find((c) => c.id === id);
    if (!item) return kirimJson(404, { error: 'Catatan tidak ditemukan' });
    return kirimJson(200, item);
  }

  // Ambil body dari POST (manual - pelajaran 6 pakai express.json)
  if (method === 'POST' && url.pathname === '/catatan') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const baru = JSON.parse(body || '{}');
      baru.id = catatan.length + 1;
      catatan.push(baru);
      kirimJson(201, baru);
    });
    return;
  }

  kirimJson(404, { error: 'Route tidak ditemukan: ' + method + ' ' + url.pathname });
});

server.listen(3000, () => {
  console.log('Server http murni berjalan di http://localhost:3000');
});
```

---

## Explanation

## Anatomy of a Request & Response
Every request has: a method (GET/POST/PUT/DELETE), a url (path + query), headers, and a body (for POST/PUT). A response has: a status code (200 OK, 201 Created, 404 Not Found, 500 Error), headers (Content-Type), and a body. A good bootcamp trains this FIRST with pure http, before a framework hides it away.
## Status Codes You Must Memorize
2xx success (200 OK, 201 Created, 204 No Content), 3xx redirects, 4xx client errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), 5xx server errors (500). Correct APIs return the RIGHT status code - not just 200 for everything.
## Manual Routing: Educational Suffering
See how much code it takes for 5 routes? Each route needs: method check, path check, id parsing, JSON helper. Imagine 50 routes. This is exactly what Express automates. But you now UNDERSTAND what happens under the hood - most framework developers never grasp the request-response cycle.
## Manual Body Parsing
A POST body arrives as a stream (data/end) - you concatenate chunks then JSON.parse. This opens a key concept: the request body is a stream, not a ready string. express.json() does this for you, but now you know exactly what it does.

---

## Experiments

1. **Anatomy of a Request & Response**
2. **Status Codes You Must Memorize**
3. **Manual Routing: Educational Suffering**
4. **Manual Body Parsing**

---

## Challenge

Extend the notes API: (1) add PUT /catatan/:id to update the title, (2) DELETE /catatan/:id to delete, (3) validation: POST with an empty body returns 400. Test every route with curl/POST (in the playground terminal or fetch in preview). Write down the status code of each route.

---

## Summary

A request = method + url + headers + body. Status codes must be precise. Manual routing is expensive - that is why Express exists. The body is a stream. Next: Express and routing.
