# Testing — Test Django Shop

> **Kategori:** Django | **Level:** Advanced | **Minggu 9:** Testing

## Learning Objectives

- `python manage.py test` — `TestCase` `assertEqual` `self.client.get("/products/")`

---

## Why This Matters (Non-IT)

Without `TestCase`, view edits → 500s found by customers. With `self.client.get` + `assertEqual`, edit → red → fix.

---

## Program

```python
# shop/tests.py
from django.test import TestCase
from .models import Product

class ProductTest(TestCase):
    def test_create(self):
        p = Product.objects.create(name="Rice", price=62000)
        self.assertEqual(p.name, "Rice")

    def test_list(self):
        Product.objects.create(name="Rice", price=62000)
        res = self.client.get("/products/")
        self.assertEqual(res.status_code, 200)
```

`python manage.py test` → OK.


---

## Beginner Friendly Explanation

### Analogy: Django Kitchen Taste
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `TestCase` prepares a test DB; `client.get/post` pretends browser; `assertEqual` tastes.

### 3 Must-Know Terms
- 1. **TestCase/client**: test-kitchen/pretend

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 9: **Test Django** — `TestCase`. Next: **Caching**.
