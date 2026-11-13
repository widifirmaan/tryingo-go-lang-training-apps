# Express.js & Web Server

## Tujuan Pembelajaran

- Express.js: setup, routes, dan listen di port
- HTTP methods: GET, POST, PUT, DELETE
- Route parameters: req.params dan req.query
- Middleware: app.use, next(), error handler
- Request body parsing: express.json(), express.urlencoded()

---

## Program: HTTP Server Native Lalu Express

Program membangun server dengan modul http murni lalu bermigrasi ke Express agar routing, middleware, dan error handling rapi.

```javascript
// Bagian 1: Server http murni (simulasi agar bisa jalan di browser)
const routerMap = {
  '/': () => 'Halo dari Tryngo Node Server!',
  '/health': () => JSON.stringify({ status: 'ok', uptime: '12h' }),
};

function handleRequest(method, url) {
  console.log(`[router] ${method} ${url}`);
  const handler = routerMap[url];
  if (!handler) { console.log('  -> 404 Not Found'); return; }
  console.log('  -> 200 OK:', handler());
}
handleRequest('GET', '/');
handleRequest('GET', '/health');
handleRequest('GET', '/tidak-ada');

// Bagian 2: Mini-Express - router + middleware + error handling
const middlewareStack = [
  (req, next) => { console.log(`[logger] ${req.method} ${req.url}`); return next(); },
  (req, next) => (req.url === '/admin' ? 'Error: hanya admin!' : next()),
  (req, next) => `Data untuk ${req.url}`,
];
function dispatch(req) {
  let i = 0;
  const next = () => (i < middlewareStack.length ? middlewareStack[i++](req, next) : '404');
  try {
    console.log('[response]', dispatchSafe(req, next));
  } catch (err) {
    console.log('[error handler]', err.message);
  }
}
function dispatchSafe(req, next) {
  const result = next();
  if (typeof result === 'string' && result.startsWith('Error:')) throw new Error(result);
  return result;
}
dispatch({ method: 'GET', url: '/api/users' });
dispatch({ method: 'GET', url: '/admin' });
```

---

## Konsep Kunci

### Event loop & non-blocking I/O

Node single-threaded namun I/O asinkron: beban CPU-berat tetap menghambat; konsumsi memori rendah walau traffic tinggi (inilah daya saingnya terhadap Nginx).

### Middleware (Express)

Alur req -> [logger, body parser, auth] -> handler -> res. Setiap middleware bisa memanggil next(); tanpa next() rantai berhenti.

### Routing

Express menyederhanakan routing http: app.get('/api/:id', handler) memberi params dan query otomatis, jauh lebih nyaman daripada peta URL manual.

### Error handling

Middleware (err, req, res, next) menangkap exception: tanpa itu respons biner/mentah dizinkan lolos dan server bisa crash. Tambatkan satu sebagai filter terakhir.

---

## Eksperimen

- Tambahkan route '/about' yang mengembalikan HTML kecil.
- Buat route dinamis: '/users/42' dengan parsing URL manual.
- Tulis middleware error (err, ...) yang menjawab status 500.

---

## Tantangan

Upgrade '/health': tambahkan penggunaan memori dan nomor versi. Jaga agar seluruh rantai middleware tetap di bawah 2 ms.

---

## Ringkasan

Materi minggu ini telah dibahas: HTTP Server Native Lalu Express. Lanjut ke pekan berikutnya untuk memperdalam.
