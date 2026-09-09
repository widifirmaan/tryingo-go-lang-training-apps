# Testing — Test Django Shop

> **Kategori:** Django | **Level:** Advanced | **Minggu 9:** Testing
> **Prerequisites:** Week 8 — **REST API**.

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
- **`TestCase` = separate test kitchen**: every test starts with an empty DB + gets thrown away after — tests never pollute real data/open stores.
- **`self.client` = mock customer**: clicks/gets/posts for real through URLs, `assertEqual` tastes status + content. Red = broken recipe, fix BEFORE customers complain.

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `TestCase` prepares a test DB; `client.get/post` pretends browser; `assertEqual` tastes.

### 3 Must-Know Terms
- 1. **TestCase/client**: test-kitchen/pretend

---

## Challenge

**Testing in Your Shop:** use `/products/`, `test_create`, `test_list` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/products/`, `test_create`, `test_list`; predict the output BEFORE running, then compare.
- **Red:** Combine with **REST API** (Week 8): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 9: **Test Django** — `TestCase`. Next: **Caching**.
