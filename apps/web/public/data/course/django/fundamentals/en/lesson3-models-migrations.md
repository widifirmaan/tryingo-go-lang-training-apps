# Models & Migrations: The Database Without SQL

> Django | Django Fundamentals | Lesson 3

## Learning Objectives

- Write models: field types, choices, relations
- Run makemigrations & migrate
- Use the Django admin for automatic CRUD
- Use get_object_or_404 and basic QuerySets

---

## Program: Models & Migrations: The Database Without SQL

```python
from django.db import models


class Kategori(models.Model):
    """Satu model = satu tabel database."""
    nama = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['nama']

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    tersedia = models.BooleanField(default=True)
    # Relasi: banyak produk -> satu kategori (ForeignKey)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-dibuat']

    def __str__(self):
        return self.nama
```

---

## Explanation

## Model = Table, Class = Schema
One class = one table; one attribute = one column. CharField → VARCHAR, DecimalField → DECIMAL, ForeignKey → an id column + a constraint. Django translates classes to SQL; you never write CREATE TABLE. Models are also the validation center: the field type decides what may enter the database.
## Migrations: Versioned Schema
makemigrations compares models.py with the database and creates a migration file (the schema change history). migrate applies it. The magic: the schema is versioned in git, rollbackable, and TEAMS evolve the schema together without conflicts. Rule: change the model → makemigrations → migrate. Never alter tables manually - let Django own the schema.
## Admin: Free CRUD
Register a model in admin.py → the /admin panel instantly has create/read/update/delete + search + filters (list_display, list_filter, search_fields). The admin is an "internal tool" born automatically from models. For internal projects, the admin is often enough - no need to build CRUD UIs from scratch.
## Relations: FK, One-to-Many
ForeignKey(Kategori) = many products to one category; related_name='produk' makes kategori.produk.all() available (reverse). get_object_or_404(Produk, id=...) = ORM + 404 in one line. Produk.objects.filter(...) returns a QuerySet - studied in depth in lesson 5.

---

## Experiments

1. **Model = Table, Class = Schema**
2. **Migrations: Versioned Schema**
3. **Admin: Free CRUD**
4. **Relations: FK, One-to-Many**

---

## Challenge

Extend the models: (1) add a Ulasan model (produk FK, penulis CharField, isi TextField, bintang PositiveSmallIntegerField with 1-5 choices), (2) add a diskon_persen field to Produk (nullable DecimalField), (3) create and apply the migration, (4) show the average rating on the product detail page (an Avg aggregate - studied in lesson 5).

---

## Summary

Models = the schema. Migrations = versioned schema. Admin = automatic CRUD. FK = relations. Never touch tables manually. Next: templates.
