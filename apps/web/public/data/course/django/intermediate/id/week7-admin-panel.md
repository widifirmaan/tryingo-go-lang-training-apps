# Admin Panel

> **Kategori:** Django | **Level:** Menengah | **Minggu 7:** Admin Panel

## Tujuan Pembelajaran

- Register model ke admin
- ModelAdmin: list_display, list_filter, search_fields
- list_editable untuk inline editing
- createsuperuser untuk akses admin
- Custom admin actions

---

## Program: Membangun Admin Panel

Program menyusun model toko (Produk, Pesanan), mendaftarkannya ke Django Admin lengkap dengan list_filter, search, dan inline.

```python
"""Django Admin: toko mini lengkap dengan filter & inline."""
from django.contrib import admin
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    def __str__(self): return self.name

class Order(models.Model):
    STATUS = (('new', 'Baru'), ('paid', 'Dibayar'), ('shipped', 'Dikirim'))
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

# Terhubung di urls.py: path('admin/', admin.site.urls)
print('Admin aktif: /admin/ — login dengan akun superuser dari createsuperuser')
```

---

## Konsep Kunci

### Auto CRUD admin

Cukup register() untuk UI lengkap: list, edit, create, delete, plus log audit; tanpa menulis template satu baris.

### list_display & search_fields

list_display menentukan kolom tabel; search_fields menjalankan LIKE di kolom terpilih; list_filter menambah sidebar filter bawaan.

### Inline

TabularInline menampilkan OrderItem dalam form Order — parent dan children diedit pada satu layar.

### on_delete

PROTECT mencegah penghapusan Product yang masih dipakai; CASCADE memusnahkan item ketika Order dihapus.

---

## Eksperimen

- Tambahkan field harga-jual di Product dan muat di list_display.
- Konfigurasikan action massal: set_status_paid untuk banyak order sekaligus.
- Ganti OrderItemInline ke StackedInline lalu bandingkan tampilannya.

---

## Tantangan

Tambahkan model Category + relasi M2M ke product — lalu saring pakai list_filter=('category__name',).

---

## Ringkasan

Materi minggu ini telah dibahas: Membangun Admin Panel. Lanjut ke pekan berikutnya untuk memperdalam.
