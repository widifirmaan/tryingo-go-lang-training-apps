# Models & ORM

> **Kategori:** Django | **Level:** Pemula | **Minggu 2:** Models & ORM

## Tujuan Pembelajaran

- Membuat model dengan field
- Field types: CharField, IntegerField, DecimalField
- ORM queries: all, filter, get, exclude
- Migration: makemigrations dan migrate
- Method __str__

---

## Program: Model Pertama

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

## Konsep Kunci

### Model
Representasi tabel database sebagai class Python.

### Field Types
`CharField`, `IntegerField`, `DecimalField`, `BooleanField`, `DateTimeField`.

### ORM
`Model.objects.all()`, `filter()`, `get()`, `exclude()`, `order_by()`.

### Migration
`makemigrations` - buat file migrasi. `migrate` - apply ke database.

---

## Eksperimen

- Buat model dengan 5+ field
- Coba ORM queries di shell
- Buat migration
- Tambah method custom
- Gunakan Meta class

---

## Tantangan

Buat model Product dengan field: name, price, is_available, created_at.

---

## Ringkasan

Minggu 2 dari 12: **Models & ORM** (Level: Pemula). Minggu depan: **Views & URL Routing**.
