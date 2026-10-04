# Migrations Engine, QuerySets & Django Admin Customization

> **Kategori:** Django Web Framework | **Level:** Beginner | **Minggu 2:** Migrations Engine, QuerySets & Django Admin Customization
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Django migration lifecycles (`makemigrations`, `migrate`, `showmigrations`).
- Customize Django Admin visual dashboards with `list_display`, `list_filter`, and `search_fields`.
- Deploy `TabularInline` editing child relationships (Lessons) directly inside parent forms (Course).
- Author custom bulk administrative actions executing atomic state transitions with one click.

---

## Program: Interactive Course Admin Dashboard with Search, Filter & Bulk Actions

```python
# Demonstrasi Kustomisasi Django Admin (admin.py)
from django.contrib import admin
# from .models import Course, Lesson

class LessonInline(admin.TabularInline):
    # Memungkinkan penambahan/pengeditan materi pelajaran langsung di halaman kursus
    # model = Lesson
    extra = 1
    fields = ["order", "title", "video_url"]

class CourseAdmin(admin.ModelAdmin):
    list_display = ["title", "level", "price", "is_published", "lesson_count", "created_at"]
    list_filter = ["is_published", "level", "created_at"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    # inlines = [LessonInline]
    actions = ["publish_courses", "unpublish_courses"]

    # Custom Calculated Column
    @admin.display(description="Jumlah Pelajaran")
    def lesson_count(self, obj):
        # Dalam implementasi nyata: obj.lessons.count()
        return 12

    # Custom Bulk Action untuk Admin
    @admin.action(description="Publikasikan kursus terpilih ke publik")
    def publish_courses(self, request, queryset):
        updated = queryset.update(is_published=True)
        self.message_user(request, f"{updated} kursus berhasil dipublikasikan!")

    @admin.action(description="Tarik kursus terpilih dari publik (Draft)")
    def unpublish_courses(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f"{updated} kursus diubah kembali menjadi draf.")

# admin.site.register(Course, CourseAdmin)
print("=== DJANGO ADMIN DASHBOARD SIAP DENGAN INLINE EDITING & BULK ACTIONS ===")
```

---

## Key Concepts

A decisive factor driving engineering leadership to choose Django is the **Django Admin**. Without authoring custom frontends for operational staff, Django delivers an enterprise back-office management console automatically.

### The Migrations Pipeline
When Python models update, `makemigrations` detects schema diffs, generating declarative migration files. Running `migrate` translates these operations into DDL statements on PostgreSQL. Django tracks migration lineage within `django_migrations`, guaranteeing repeatable deployments.

### ModelAdmin Customization
Subclassing `ModelAdmin` transforms the administrative console into an intuitive management hub:
- `search_fields`: Injects full-text search bars utilizing SQL `LIKE/ILIKE` indexing.
- `list_filter`: Generates sidebar filters segmenting models across categories or dates.
- `inlines`: Enables operators to manage child records (`Lesson`) directly inside the parent edit view (`Course`).

### Scalable Bulk Actions
The `publish_courses` action leverages `queryset.update(is_published=True)`. This compiles down to a single optimized SQL statement (`UPDATE courses SET is_published = true WHERE id IN (...)`), updating 10,000 records within milliseconds.


---

---

## Beginner Friendly Explanation

Imagine opening a department store. In other frameworks, you must spend months building internal managerial software and stock dashboards from scratch. In Django, the moment you define your inventory items, a fully functional manager back-office with search bars, filters, and reports is instantly available from day one.

## Experiments

- Generate an administrative user via `python manage.py createsuperuser` and access `/admin`.
- Test the `publish_courses` bulk action across multiple draft courses in the admin dashboard.
- Leverage `prepopulated_fields` observing the slug populating reactively as you type course titles.

---

## Challenge

Build a custom CSV export action in `CourseAdmin` downloading selected course datasets alongside aggregated enrollment revenue.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MODEL-TEMPLATE-VIEW (MTV) DJANGO              │
│                                                          │
│ Browser Request ──► urls.py (URL Router)                 │
│                            │                             │
│                            ▼                             │
│                       views.py (Logika Bisnis)           │
│                         │         │                      │
│             Query DB    ▼         ▼   Render HTML        │
│        models.py (ORM) ◄           ► templates/*.html    │
│               │                            │             │
│               ▼                            ▼             │
│          Database Relasional           HTTP Response     │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `class Model(models.Model)`
- **Core Functionality:** Definisi entitas ORM database.
- **Parameters / Attributes:** `Field Types (CharField, IntegerField, ForeignKey)`.
- **System Behavior & Return:** Memetakan struktur tabel database langsung dari class Python dengan migrasi bawaan..
- **Practical Code Example:**
```python
from django.db import models
class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
```
- **Expected Execution Output:**
```text
Skema tabel Product siap dimigrasi ke database
```

### 2. `Product.objects.filter(price__gt=50000)`
- **Core Functionality:** ORM QuerySet Fluent API.
- **Parameters / Attributes:** `Field lookups (__gt, __icontains, __in)`.
- **System Behavior & Return:** Menyusun query SQL relasional berkinerja tinggi secara lazy tanpa menulis SQL mentah..
- **Practical Code Example:**
```python
cheap_products = Product.objects.filter(price__lte=100000).order_by('-created_at')[:5]
```
- **Expected Execution Output:**
```text
Mengembalikan 5 baris produk termurah
```

### 3. `def view(request): return render(request, 'home.html', ctx)`
- **Core Functionality:** View Handler berbasis fungsi/kelas.
- **Parameters / Attributes:** `HttpRequest, Template name, Context dict`.
- **System Behavior & Return:** Menerima permintaan pengguna, memproses data, dan mengembalikan HTML yang ter-render..
- **Practical Code Example:**
```python
from django.shortcuts import render
def home_view(request):
    items = Product.objects.all()
    return render(request, 'home.html', {'items': items})
```
- **Expected Execution Output:**
```text
Halaman web ter-render sempurna untuk pengguna
```

### 4. `path('products/<int:id>/', views.detail, name='product-detail')`
- **Core Functionality:** Pendaftaran URL Pattern terstruktur.
- **Parameters / Attributes:** `Route string, View function, Unique name`.
- **System Behavior & Return:** Menghubungkan pola URL yang diminta peramban ke fungsi view yang sesuai..
- **Practical Code Example:**
```python
from django.urls import path
from . import views
urlpatterns = [
    path('products/<int:id>/', views.detail, name='product-detail')
]
```
- **Expected Execution Output:**
```text
Rute /products/123 dipetakan ke views.detail
```

---

## Common Pitfalls & Debugging Tips

### 1. Unapplied Model Migrations
- **Symptom / Issue:** Triggers database errors: `ProgrammingError: relation does not exist`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always run `python manage.py makemigrations` followed by `python manage.py migrate`.

### 2. N+1 Queries in Django ORM Templates
- **Symptom / Issue:** Templates trigger a separate SQL query per item rendered.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `select_related()` for foreign keys and `prefetch_related()` for many-to-many.

### 3. Exposing Sensitive Secrets in Settings
- **Symptom / Issue:** Leaking SECRET_KEY or running `DEBUG = True` in production environments.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Load secrets from environment variables and ensure `DEBUG = False` in production.

---

## Summary

You have mastered Migrations, QuerySet updates, and custom Django Admin. Next week we explore Class-Based Views and the Template Engine.
