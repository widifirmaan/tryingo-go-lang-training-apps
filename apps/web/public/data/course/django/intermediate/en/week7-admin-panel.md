# Admin Panel

> **Kategori:** Django | **Level:** Intermediate | **Minggu 7:** Admin Panel

## Learning Objectives

- Register models to admin
- ModelAdmin: list_display, list_filter, search_fields
- list_editable for inline editing
- createsuperuser for admin access
- Custom admin actions

---

## Program: Building the Admin Panel

The program sets up store models (Product, Order), registers them to Django Admin with list_filter, search, and inlines.

```python
"""Django Admin: a mini shop with filters and inlines."""
from django.contrib import admin
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    def __str__(self): return self.name

class Order(models.Model):
    STATUS = (('new', 'New'), ('paid', 'Paid'), ('shipped', 'Shipped'))
    customer = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS, default='new')
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    def __str__(self): return f'#{self.id} {self.customer}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    qty = models.PositiveIntegerField(default=1)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')
    search_fields = ('name',)
    list_filter = ('stock',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'status', 'total')
    list_filter = ('status',)
    ordering = ('-id',)
    inlines = (OrderItemInline,)

# Wire in urls.py: path('admin/', admin.site.urls)
print('Admin live at /admin/ — log in with an account created by createsuperuser')
```

---

## Key Concepts

### Auto CRUD admin

Cukup register() untuk UI lengkap: list, edit, create, delete, plus log audit; tanpa menulis template satu baris.

### list_display & search_fields

list_display menentukan kolom tabel; search_fields menjalankan LIKE di kolom terpilih; list_filter menambah sidebar filter bawaan.

### Inline

TabularInline menampilkan OrderItem dalam form Order — parent dan children diedit pada satu layar.

### on_delete

PROTECT mencegah penghapusan Product yang masih dipakai; CASCADE memusnahkan item ketika Order dihapus.

---

## Experiments

- Add a discount price field to Product and expose it in list_display.
- Configure bulk actions: set_status_paid for multiple orders.
- Switch OrderItemInline to StackedInline and compare the UI.

---

## Challenge

Add a Category model with M2M products — then filter via list_filter=("category__name",).

---

## Summary

This week's material has been covered: Building the Admin Panel. Continue to the following week to deepen.
