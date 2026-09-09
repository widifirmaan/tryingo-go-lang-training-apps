# JSONB Semi-Structured — Mixed Box

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 7:** JSONB Semi-Struktural
> **Prerequisites:** Week 6 — **Window Functions**.

## Learning Objectives

- `JSONB` flexible column like Mongo: `data JSONB`, `->>` get text, `GIN` index

---

## Why This Matters (Non-IT)

Shop products sometimes have `color`, sometimes not — `JSONB` needs no `ALTER TABLE` for each new field.

---

## Program: Mixed Box

```sql
CREATE TABLE flexible_products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  data JSONB
);

INSERT INTO flexible_products (name, data) VALUES
  ('Rice', '{"price": 62000, "stock": 10}'),
  ('Spinach', '{"price": 5000, "color": "green"}');

SELECT name, data->>'price' AS price FROM flexible_products;
SELECT * FROM flexible_products WHERE data->>'color' = 'green';
CREATE INDEX idx_data_price ON flexible_products USING GIN (data);
```

---

## Key Concepts

### `JSONB` / `->>` / `GIN`
`JSONB` binary JSON column, `->>` extracts text, `GIN` index speeds key searches.

---

## Beginner Friendly Explanation

### Analogy: Mixed Box with Labels
- **`JSONB` = box where each item carries its own label** — no shelf rebuild per new label.

### Step 0 — Prepare Device
- Supabase / `psql`, run CREATE + INSERT + SELECT.

### How the Computer Reads It
1. `data->>'price'` → dive into JSON → return text `"62000"`.
2. `GIN (data)` → index all keys for fast `WHERE`.

### 3 Must-Know Terms
1. **JSONB/GIN**: flex-box/fast-index

---

## Experiments

- **Green:** `data->>'color'` on Rice (missing) → NULL?
- **Yellow:** `WHERE (data->>'price')::int > 10000` → cast + filter?
- **Red:** Query without `GIN` on 100k rows → slow? Add index.

---

## Challenge

**Flex Catalog:** 5 products with different keys + `->>` price list + `GIN` index + 1 filtered query.
- **Link-up (Week 6 — Window Functions):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **JSONB/->>/GIN**: flex/get/index

---

## Summary

Week 7: **Mixed Box** — flexible JSONB. Next: **Performance**.
