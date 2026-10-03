# Migrations Engine, QuerySets & Django Admin Customization

> **Kategori:** Django Web Framework | **Level:** Beginner | **Minggu 2:** Migrations Engine, QuerySets & Django Admin Customization

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

## Summary

You have mastered Migrations, QuerySet updates, and custom Django Admin. Next week we explore Class-Based Views and the Template Engine.
