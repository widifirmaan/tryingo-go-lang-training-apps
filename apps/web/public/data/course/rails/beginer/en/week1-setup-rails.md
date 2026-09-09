# Rails Setup — Convention-Speed Shop

> **Kategori:** Ruby on Rails | **Level:** Beginner | **Minggu 1:** Setup Rails
> **Prerequisites:** None — start from zero.

## Learning Objectives

- Install `gem install rails`, `rails new shop --database=postgresql`, `rails server` on `3000`
- Rails = **speedy shop**: `convention over configuration` — no setup, follow name rules

---

## Why This Matters (Non-IT)

Rails builds online shops from zero fastest: 1 command `rails generate scaffold Product name:string price:integer` instantly yields CRUD + DB + views.

---

## Program: Speedy Shop

```bash
rails new shop --database=postgresql
cd shop
rails generate scaffold Product name:string price:integer stock:integer
rails db:migrate
rails server
# Open http://localhost:3000/products
```

Open `http://localhost:3000/products` → instant CRUD! Add products without coding.

---

## Key Concepts

### `scaffold` = Instant Shop
1 command yields Model + View + Controller + DB.

### Convention
`product.rb` file auto-maps `products` table, `Product` class.

---

## Beginner Friendly Explanation

### Analogy: Instant Shop Kit
- **Scaffold = furniture kit**: 1 box, whole shop assembled.

### Step 0 — Prepare Device
- Ruby + Rails installed (`rails -v`), Postgres running, `rails server` on 3000.

### How the Computer Reads It
1. `generate scaffold` → creates model + migration + controller + views.
2. `db:migrate` → builds table → `/products` CRUD live.

### 3 Must-Know Terms
1. **scaffold/convention**: instant-kit/naming-rules

---

## Experiments

- **Green:** Add a product via browser → listed?
- **Yellow:** `rails routes` → products routes listed?
- **Red:** Skip `db:migrate` → table missing error? Run it.

---

## Challenge

**Instant Shop:** Scaffold `Customer(name, email)` + migrate + add 2 via browser + `/products` screenshot.

---

## Mini Glossary

- **scaffold/routes**: instant-kit/doors

---

## Summary

Week 1: **Speedy Rails Shop** — `scaffold` instantly done. Next: **MVC**.
