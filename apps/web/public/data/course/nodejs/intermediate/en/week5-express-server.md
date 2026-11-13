# Express.js & Web Server

## Learning Objectives

- Express.js: setup, routes, and listen on port
- HTTP methods: GET, POST, PUT, DELETE
- Route parameters: req.params and req.query
- Middleware: app.use, next(), error handler
- Request body parsing: express.json(), express.urlencoded()

---

## Program: HTTP Server From Scratch, Then Express

The program builds a server with the plain http module, then moves to Express for routing, middleware, and error handling.

```javascript
// Part 1: a bare http server (simulated so it runs in the browser)
const routerMap = {
  '/': () => 'Hello from the Tryngo Node Server!',
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
handleRequest('GET', '/missing');

// Part 2: Mini-Express - router + middleware + error handling
const middlewareStack = [
  (req, next) => { console.log(`[logger] ${req.method} ${req.url}`); return next(); },
  (req, next) => (req.url === '/admin' ? 'Error: admins only!' : next()),
  (req, next) => `Data for ${req.url}`,
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

## Key Concepts

### Event loop & non-blocking I/O

Node single-threaded namun I/O asinkron: beban CPU-berat tetap menghambat; konsumsi memori rendah walau traffic tinggi (inilah daya saingnya terhadap Nginx).

### Middleware (Express)

Alur req -> [logger, body parser, auth] -> handler -> res. Setiap middleware bisa memanggil next(); tanpa next() rantai berhenti.

### Routing

Express menyederhanakan routing http: app.get('/api/:id', handler) memberi params dan query otomatis, jauh lebih nyaman daripada peta URL manual.

### Error handling

Middleware (err, req, res, next) menangkap exception: tanpa itu respons biner/mentah dizinkan lolos dan server bisa crash. Tambatkan satu sebagai filter terakhir.

---

## Experiments

- Add a route returning a small HTML page.
- Implement a dynamic route: /users/42 with manual URL parsing.
- Write an error middleware (err, ...) that answers with 500.

---

## Challenge

Upgrade '/health': add memory usage and a version number. Keep the whole middleware chain under 2 ms.

---

## Summary

This week's material has been covered: HTTP Server From Scratch, Then Express. Continue to the following week to deepen.
