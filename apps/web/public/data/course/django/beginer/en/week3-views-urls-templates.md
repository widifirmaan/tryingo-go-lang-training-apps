# Class-Based Views (CBV), URL Routing & Django Template Engine

> **Kategori:** Django Web Framework | **Level:** Beginner | **Minggu 3:** Class-Based Views (CBV), URL Routing & Django Template Engine
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Differentiate Function-Based Views (FBV) from Class-Based Views (CBV).
- Utilize enterprise standard Generic CBVs: `ListView` and `DetailView`.
- Master Django Template Language (DTL): template inheritance (`{% extends %}`), loops, and filters.
- Configure URL dispatchers with type-safe slug parameters (`<slug:slug>`).

---

## Program: Course Catalog & Lesson Viewer with Generic Class-Based Views

```python
# Demonstrasi Views & URL Dispatcher (views.py & urls.py)
from django.views.generic import ListView, DetailView
from django.urls import path
# from .models import Course

class CourseListView(ListView):
    # Mengambil daftar semua kursus yang dipublikasikan dengan paginasi
    # model = Course
    template_name = "courses/course_list.html"
    context_object_name = "courses"
    paginate_by = 6

    def get_queryset(self):
        # Filter hanya kursus yang sudah dipublikasikan
        return super().get_queryset().filter(is_published=True).prefetch_related("lessons")

class CourseDetailView(DetailView):
    # model = Course
    template_name = "courses/course_detail.html"
    context_object_name = "course"
    slug_field = "slug"
    slug_url_kwarg = "slug"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Tambahkan data ekstra ke template
        context["total_lessons"] = self.object.lessons.count()
        return context

urlpatterns = [
    path("", CourseListView.as_view(), name="course_list"),
    path("<slug:slug>/", CourseDetailView.as_view(), name="course_detail"),
]

# Snippet Template DTL (courses/course_list.html):
SAMPLE_DTL_TEMPLATE = """
{% extends "base.html" %}

{% block title %}Katalog Kursus - Tryngo LMS{% endblock %}

{% block content %}
<div class="course-grid">
  {% for course in courses %}
    <div class="course-card">
      <h3><a href="{% url 'course_detail' course.slug %}">{{ course.title }}</a></h3>
      <p>{{ course.description|truncatewords:20 }}</p>
      <span class="badge">{{ course.get_level_display }}</span>
      <span class="price">Rp {{ course.price|floatformat:0 }}</span>
    </div>
  {% empty %}
    <p>Belum ada kursus yang dipublikasikan.</p>
  {% endfor %}
</div>
{% endblock %}
"""

print("=== CLASS-BASED VIEWS & TEMPLATE ROUTING TERKONFIGURASI ===")
```

---

## Key Concepts

Rather than authoring repetitive boilerplate querying models, managing pagination slices, and rendering HTML views, Django provides **Generic Class-Based Views (CBVs)**.

### The Power of Generic CBVs
- **ListView**: Automatically fetches models, coordinates pagination slicing (e.g., 6 items per page), and exposes datasets to templates within `courses`.
- **DetailView**: Resolves a unique record using URL slugs or primary keys, automatically generating 404 responses if records do not exist.

### Template Inheritance in DTL
The Django Template Language (DTL) revolves around template inheritance (`{% extends "base.html" %}`). A foundational `base.html` template houses global headers, footers, and design assets. Child views inject specific contents via `{% block content %}`, eliminating template redundancy.

### DTL Formatting Filters & Native XSS Immunity
DTL incorporates expressive filters like `|truncatewords:20` and `|floatformat:0`. By default, DTL auto-escapes all context variables, neutralizing Cross-Site Scripting (XSS) injection vectors.


---

---

## Beginner Friendly Explanation

Think of a newspaper printing press. The master plate (base.html) already stamps the masthead and page numbers at the margins. You simply slot the daily article copy into the central column block (`{% block content %}`). You never redesign the newspaper template for each new story.

## Experiments

- Adjust `paginate_by = 2` and navigate to page 2 via `?page=2` in your browser.
- Deploy `{% url "course_detail" course.slug %}` to generate robust dynamic URLs immune to path refactoring.
- Override `get_context_data` injecting top-rated instructors into the catalog view.

---

## Challenge

Build a `CourseSearchView(ListView)` querying courses based on `?q=python` using Q-objects (`Q(title__icontains=q) | Q(description__icontains=q)`).

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered Class-Based Views, URL routing, and the Django Template Language. Next week we explore Forms, CSRF, and Authentication.
