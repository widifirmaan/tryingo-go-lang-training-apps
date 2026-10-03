# Django 5.1 MVT Architecture, Settings & Domain Model Declarations

> **Kategori:** Django Web Framework | **Level:** Beginner | **Minggu 1:** Django 5.1 MVT Architecture, Settings & Domain Model Declarations
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Django's "Batteries-Included" philosophy and Model-View-Template (MVT) architecture.
- Declare database entities via `models.Model`, `CharField`, `DecimalField`, and `TextChoices`.
- Configure relational foreign keys with `models.ForeignKey` and `related_name`.
- Automate SEO-friendly slug generation by overriding the model `save()` method.

---

## Program: LMS Course & Lesson Domain Models with Django ORM

```python
# Demonstrasi Model Domain LMS (models.py)
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator

class CourseLevel(models.TextChoices):
    BEGINNER = "BEGINNER", "Pemula"
    INTERMEDIATE = "INTERMEDIATE", "Menengah"
    ADVANCED = "ADVANCED", "Lanjutan"

class Course(models.Model):
    title = models.CharField(max_length=200, help_text="Judul lengkap kursus")
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0.00)]
    )
    level = models.CharField(
        max_length=20, 
        choices=CourseLevel.choices, 
        default=CourseLevel.BEGINNER
    )
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Kursus"
        verbose_name_plural = "Daftar Kursus"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.get_level_display()})"

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=200)
    video_url = models.URLField(blank=True)
    content = models.TextField(help_text="Materi markdown pelajaran")
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        unique_together = ["course", "order"]

    def __str__(self):
        return f"{self.course.title} - #{self.order}: {self.title}"

print("=== DJANGO LMS MODELS TERDEFINISI DENGAN VALIDASI & CHOICES ===")
```

---

## Key Concepts

Django stands as Python's flagship web framework, renowned for its **"Batteries-Included"** ethos: packaging ORM persistence, automated migrations, an administrative dashboard, authentication, and CSRF defense right out of the box.

### The MVT (Model-View-Template) Architecture
- **Model**: Encapsulates data schemas and business invariants mapped directly to relational database tables.
- **View**: Executes application logic, queries models, and coordinates responses.
- **Template**: Renders dynamic presentations (HTML) delivered to user agents.

### Django ORM & TextChoices
Rather than authoring raw SQL statements prone to injection vulnerabilities, models are declared as clean Python classes. Utilizing `models.TextChoices` provisions type-safe enums alongside built-in helper methods such as `course.get_level_display()`.

### Relational Foreign Key Integrity
Designating `models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")` sets up foreign key constraints within PostgreSQL. If a course is pruned, its associated lessons purge atomically via Cascade Deletion.


---

---

## Beginner Friendly Explanation

Imagine constructing an educational academy. Django represents a turn-key facility fully furnished with classrooms, administrative desks, security gates, and student records vaults (Batteries-Included). The Course and Lesson models act as pre-printed registration forms filed into steel vaults (the Database) without manual carpentry.

## Experiments

- Run `python manage.py makemigrations` and inspect the synthesized migration Python script.
- Instantiate a Course in the Django shell (`python manage.py shell`) and verify slug auto-generation.
- Attempt inserting two Lesson records with identical `order` keys within a single course to test `unique_together`.

---

## Challenge

Author an `Enrollment` model binding `User` and `Course`, tracking registration timestamps and payment states (PENDING, PAID, CANCELLED).

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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

You have mastered Django MVT architecture, ORM Models, and ForeignKey relations. Next week we explore the Migrations Engine and Django Admin customization.
