# Capstone: CI4 Shop Grand Opening

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 10:** Capstone: Task Management API
> **Prerequisites:** Week 9 — **Testing**.

## Learning Objectives

- Combine W1-W9: `spark` + `MVC` + `validation` + `auth filter` + `REST resource` + `test` into a real shop API + web (not `echo`!)

---

## Why This Matters (Non-IT)

9 separate weeks — capstone proves the combination: HTML web + JSON API + login + tests, all truly running (`php spark serve` + `curl` + `php spark test`). Your "production-ready CI4" portfolio.

---

## Program: Grand Opening Shop (Checklist)

```bash
# 1. Foundation (W1-W5)
composer create-project codeigniter4/appstarter shop
php spark make:model ProductModel
php spark make:migration CreateProducts && php spark migrate
php spark db:seed FillProducts
```

```php
// 2. Web + validation (W2,W3,W6): routes + controller + view + validate
// 3. Auth (W7): AuthFilter guards /admin
// 4. API (W8): $routes->resource('api/products')
```

```bash
# 5. Test (W9) + prove
php spark test                    # GREEN?
php spark serve                   # :8080?
curl localhost:8080/api/products   # JSON?
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Sugar","price":15000}' localhost:8080/api/products  # 201?
```

**Capstone task:** All green + 4 screenshots (`test`, `serve`, `curl` GET/POST) + 1-min video. **CI4 0→Expert DONE!** 🎉

---

## Key Concepts

### Capstone = Combine 9 Weeks
`spark` + MVC + validation + auth + REST + test = real shop.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening
- **W1-W5 foundation** + **W6-W9 engine** = shop. **W10 = open**.

### Step 0 — Prepare Device
- CI4 project + `curl` + phone to verify.

### How the Computer Reads It
1. Checklist top-to-bottom → real running shop.
2. 4 screenshots + video → portfolio done.

### 3 Must-Know Terms
1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** `php spark test` GREEN?
- **Yellow:** `curl` GET returns JSON array?
- **Red:** POST without JSON header → rejected? Add header.

---

## Challenge

**Grand Opening:** All checklist + `README.md` how-to-run. **CI4 0→Expert DONE!** 🎉

---

## Mini Glossary

- **Capstone/deploy**: combine/open

---

## Summary

Week 10 of 10: **Grand Opening** (Level: Intermediate). **CI4 0→Expert from zero DONE!** 🎉
