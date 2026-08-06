# Models & ORM

> **Kategori:** Django | **Level:** Beginner | **Minggu 2:** Models & ORM

## Learning Objectives

- Create models with fields
- Field types: CharField, IntegerField, DecimalField
- ORM queries: all, filter, get, exclude
- Migrations: makemigrations and migrate
- __str__ method

---

## Program: First Model

```python
# Models
print("=== Django Models ===")
print("class Product(models.Model):")
print("    name = models.CharField(max_length=200)")
print("    price = models.DecimalField(max_digits=10, decimal_places=2)")
print("    is_available = models.BooleanField(default=True)")
print("    created_at = models.DateTimeField(auto_now_add=True)")
print("")
print("    def __str__(self):")
print("        return self.name")
print("")
print("=== Field Types ===")
fields = ["CharField", "IntegerField", "DecimalField", "BooleanField", "DateTimeField", "TextField", "ForeignKey"]
for f in fields:
    print(f"  - {f}")
print("")
print("=== ORM Queries ===")
print("Product.objects.all()")
print("Product.objects.get(id=1)")
print("Product.objects.filter(price__gt=100)")
print("Product.objects.order_by('-created_at')")
print("Product.objects.count()")

```

---

## Key Concepts

### Models
Database table representation as Python class.

### Field Types
`CharField`, `IntegerField`, `DecimalField`, `BooleanField`, `DateTimeField`.

### ORM
`Model.objects.all()`, `filter()`, `get()`, `exclude()`, `order_by()`.

### Migrations
`makemigrations` creates migration files. `migrate` applies to database.

---

## Experiments

- Create model with 5+ fields
- Try ORM queries in shell
- Create migration
- Add custom method
- Use Meta class

---

## Challenge

Create Product model with fields: name, price, is_available, created_at.

---

## Summary

Week 2 of 12: **Models & ORM** (Level: Beginner). Next week: **Views & URL Routing**.
