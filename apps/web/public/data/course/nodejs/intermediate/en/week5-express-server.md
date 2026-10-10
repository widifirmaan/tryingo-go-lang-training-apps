# Express.js & Web Server

> **Kategori:** Node.js | **Level:** Intermediate | **Minggu 5:** Express.js & Web Server

## Learning Objectives

- Express.js: setup, routes, and listen on port
- HTTP methods: GET, POST, PUT, DELETE
- Route parameters: req.params and req.query
- Middleware: app.use, next(), error handler
- Request body parsing: express.json(), express.urlencoded()

---

## Program: Basic Web Server

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

## Key Concepts

### Express Setup
express() and app.listen().

### Routes
HTTP method handlers.

### Middleware
Global and route-specific middleware with next().

---

## Experiments

- Add PUT and DELETE routes for users
- Create custom middleware for request logging
- Implement route with query string filter
- Add error handling middleware

---

## Challenge

Build a REST API for Task Manager: CRUD tasks with Express, logging middleware, and error handling.

---

## Summary

Week 5 of 12: **Express.js & Web Server** (Level: Intermediate). Next week: **REST API Design**.
