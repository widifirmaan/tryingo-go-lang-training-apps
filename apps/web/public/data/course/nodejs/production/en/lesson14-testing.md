# API Testing: Jest & Supertest

> Node.js | Production & Capstone | Lesson 14

## Learning Objectives

- Distinguish unit tests and integration tests
- Write API tests with Jest and Supertest
- Test success AND error scenarios (404, 400)
- Explain reliable test patterns: descriptive, fast, independent

---

## Program: API Testing: Jest & Supertest

```js
// Aplikasi yang akan dites (dipisahkan dari server agar bisa di-supertest)
// Jalankan test: npm test

const express = require('express');
const app = express();
app.use(express.json());

// Data dengan fungsi terpisah agar mudah di-unit-test
const buatCatatan = (judul) => ({ id: Date.now(), judul, selesai: false });

const data = [
  { id: 1, judul: 'Belajar Jest', selesai: true },
  { id: 2, judul: 'Belajar Supertest', selesai: false },
];

app.get('/catatan', (req, res) => {
  const { selesai } = req.query;
  let hasil = data;
  if (selesai !== undefined) hasil = data.filter((c) => c.selesai === (selesai === 'true'));
  res.json(hasil);
});

app.get('/catatan/:id', (req, res) => {
  const item = data.find((c) => c.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(item);
});

app.post('/catatan', (req, res) => {
  const { judul } = req.body;
  if (!judul || typeof judul !== 'string') {
    return res.status(400).json({ error: 'judul wajib: string' });
  }
  const baru = buatCatatan(judul.trim());
  data.push(baru);
  res.status(201).json(baru);
});

app.delete('/catatan/:id', (req, res) => {
  const idx = data.findIndex((c) => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Tidak ditemukan' });
  data.splice(idx, 1);
  res.status(204).end();
});

module.exports = app; // ekspor untuk supertest (server listen di file lain)
module.exports.buatCatatan = buatCatatan; // ekspor helper untuk unit test
```

---

## Explanation

## Why Test? Confidence You Can Measure
Tests are not about "chasing 100% coverage" - they are what embolden you to change code. Without tests, refactoring is praying. With tests, you can move 50 lines and know exactly when behavior changes. Production bootcamps make tests part of the definition of "done", not a bonus.
## Unit vs Integration Tests
Unit: tests ONE pure function (buatCatatan) - fast, no network. Integration: tests the API end-to-end (supertest calls the Express app without listen) - verifies routing, middleware, status codes, and JSON responses. They complement each other: unit for logic, integration for the HTTP contract.
## Good Test Patterns (AAA)
Arrange (prepare input), Act (call the function/endpoint), Assert (check the result). Test descriptions should tell a story: 'returns 404 for a non-existent id'. Assert PRECISELY: check status code AND body, not just "no error". Testing errors matters as much as testing success - 400, 404, 401, 429 are API contracts.
## Independent & Deterministic
Every test must stand alone: never depend on execution order or another test's state (reset data in beforeEach). Dependent tests = tests that randomly fail for no reason. Run npm test in CI (lesson 16): any push that breaks a test = red build, protecting the whole team.

---

## Experiments

1. **Why Test? Confidence You Can Measure**
2. **Unit vs Integration Tests**
3. **Good Test Patterns (AAA)**
4. **Independent & Deterministic**

---

## Challenge

Write tests for uncovered scenarios: (1) POST /catatan with a numeric judul (400), (2) GET /catatan?selesai=false returning only unfinished items, (3) POST then DELETE a new note (full lifecycle), (4) a unit test for the buatCatatan helper (move it to a separate module so it can be required). Run npm test until everything is green.

---

## Summary

Tests = courage to refactor. Unit vs integration. AAA + storytelling descriptions. Testing errors = the API contract. Independent & deterministic. Next: performance & scalability.
