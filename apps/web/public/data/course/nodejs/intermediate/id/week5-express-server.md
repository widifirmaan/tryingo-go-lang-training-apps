# Express.js & Web Server

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 5:** Express.js & Web Server

## Tujuan Pembelajaran

- Express.js: setup, routes, dan listen di port
- HTTP methods: GET, POST, PUT, DELETE
- Route parameters: req.params dan req.query
- Middleware: app.use, next(), error handler
- Request body parsing: express.json(), express.urlencoded()

---

## Program: Web Server Dasar

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di API!" });
});

app.get("/users", (req, res) => {
  const users = [{ id: 1, nama: "Budi" }, { id: 2, nama: "Siti" }];
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json({ id, nama: "User " + id });
});

app.post("/users", (req, res) => {
  const { nama, email } = req.body;
  res.status(201).json({ id: 3, nama, email });
});

app.listen(PORT, () => {
  console.log("Server berjalan di http://localhost:" + PORT);
});
```

---

## Konsep Kunci

### Express Setup
const app = express(), app.listen(port, callback).

### Routes
app.get(), app.post(), app.put(), app.delete().

### Middleware
app.use(middleware) global, app.get(path, mw1, mw2, handler) route-specific, next() lanjut ke middleware berikutnya.

---

## Eksperimen

- Tambah route PUT dan DELETE untuk users
- Buat middleware custom untuk logging request
- Implementasikan route dengan query string filter
- Tambah error handling middleware

---

## Tantangan

Buat REST API untuk Task Manager: CRUD tasks dengan Express, middleware logging, dan error handling.

---

## Ringkasan

Minggu 5 dari 12: **Express.js & Web Server** (Level: Menengah). Minggu depan: **REST API Design**.
