# Models & ORM — Automatic Django Racks

> **Kategori:** Django | **Level:** Beginner | **Minggu 2:** Models & ORM
> **Prerequisites:** Week 1 — **Django Setup**.

## Learning Objectives

- `class Product(models.Model)` writes Python racks → Django builds SQL tables (source: docs.djangoproject.com/topics/db/models)
- `CharField`, `DecimalField`, `IntegerField`, `ForeignKey` rack labels
- `makemigrations` (blueprint) + `migrate` (build racks) — mandatory 2 steps
- `objects.create()`, `all()`, `filter(name__icontains=...)` fill & fetch (source: docs.djangoproject.com/topics/db/queries)

---

## Why This Matters (Non-IT)

Without ORM, hand-write `CREATE TABLE products (...)` SQL — 1 column typo, error. With `models.py`, write Python you already know → Django translates + builds free admin CRUD buttons. Model change (add `discount`)? `makemigrations` again, old data safe.

---

## Program: Shop ORM Rack

```python
# shop/models.py — write Python, becomes SQL tables
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    category = models.CharField(max_length=50, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Rp{self.price}"

class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    city = models.CharField(max_length=50, blank=True)
```

```bash
# Mandatory 2 steps (never reversed!)
python manage.py makemigrations  # write blueprint (0001_initial.py file)
python manage.py migrate         # build racks in DB
```

```bash
# Try in shell
python manage.py shell
>>> from shop.models import Product
>>> Product.objects.create(name="Rice 5kg", price=62000, stock=10)
>>> Product.objects.all()
>>> Product.objects.filter(category="Veggies")
>>> Product.objects.filter(name__icontains="rice")  # icontains = fuzzy find
>>> exit()
```

Register to admin in `shop/admin.py`: `from .models import Product, Customer` + `admin.site.register(Product)` → open `http://localhost:8000/admin` → add products without coding!

---

## Key Concepts

### `models.Model` = Write Python, Becomes Tables
`class Product(models.Model)` → `shop_product` table automatically.

### `makemigrations` vs `migrate`
- `makemigrations` = draws the blueprint (migration file).
- `migrate` = builds racks per blueprint. Model change → repeat both.

### ORM `objects` = Warehouse Worker
`create()` fills, `all()` all, `filter()` strains, `get(id=1)` one.

---

## Beginner Friendly Explanation

### Analogy: Worker + Translator
- **You = architect**: draws Python racks.
- **Django = worker + translator**: translates to SQL + builds + creates admin.

### Step 0 — Prepare Device
- Same as W1: `store` + `shop` app present, `pip install django`, `python manage.py runserver`.

### How the Computer Reads It
1. `makemigrations` → reads `models.py` → writes `migrations/0001_initial.py`.
2. `migrate` → runs `CREATE TABLE shop_product (...)` SQL.
3. `Product.objects.create(...)` → `INSERT INTO shop_product ...`.

### 3 Must-Know Terms
1. **Model**: Python rack blueprint
2. **Migration**: blueprint → build (2 steps)
3. **ORM**: automatic SQL worker

---

## Experiments

- **Green:** `Product.objects.create(name="Coffee", price=12000)` → `all()` shows 3?
- **Yellow:** `filter(price__gte=20000)` (`gte` = >=) → pricey only?
- **Red:** Model change adding `discount`, forgetting `makemigrations` → `filter(discount=10)` `no such column` error? Run the 2 steps.

---

## Challenge

**Library Rack:** `Book(title, stock)` + `Member(name, unique email)` → `makemigrations` + `migrate` → `create` 3 books → `filter(stock__lt=5)` (< 5) → register in `admin.py`.

---

## Mini Glossary

- **Model/migrate**: blueprint/build
- **objects.create/all/filter**: fill/all/strain
- **admin.site.register**: register to cashier

---

## Summary

Week 2 of 4: **ORM Racks** (Level: Beginner). Python becomes tables + free admin. Next: **Views & URLs** — waiters & doors.
