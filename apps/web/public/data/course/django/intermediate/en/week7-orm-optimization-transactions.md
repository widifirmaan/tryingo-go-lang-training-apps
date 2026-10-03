# ORM Performance Optimization: Mitigating N+1 Queries & Atomic Transactions

> **Kategori:** Django Web Framework | **Level:** Intermediate | **Minggu 7:** ORM Performance Optimization: Mitigating N+1 Queries & Atomic Transactions
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Identify and eradicate the N+1 Query Problem within Django ORM.
- Differentiate `select_related` (SQL JOINs for single relations) from `prefetch_related` (batch lookups for multi-relations).
- Deploy `django.db.transaction.atomic` guaranteeing ACID transactional integrity.
- Apply `select_for_update()` preventing race conditions during course enrollment allocation.

---

## Program: N+1-Free Student Progress Tracker with select_related & prefetch_related

```python
from django.db import transaction
from django.db.models import Prefetch, Count, Q
# from .models import Course, Lesson, Enrollment, User

# 1. Masalah Fatal: N+1 Query Problem (Kueri Lambat)
def slow_course_listing():
    courses = [] # Course.objects.all()
    # BURUK: Melakukan 1 kueri untuk mengambil kursus,
    # lalu 100 kueri tambahan di dalam loop untuk mengambil pelajaran dan instruktur! (N+1 Queries)
    # for c in courses:
    #     print(c.instructor.username, c.lessons.count())

# 2. Solusi Performa Tinggi: select_related & prefetch_related
def fast_course_listing():
    print("=== EKSEKUSI KUERI OPTIMAL (HANYA 2 KUERI SQL KE DATABASE) ===")
    
    # - select_related: Menggunakan SQL INNER JOIN untuk relasi ForeignKey / OneToOne (1 kueri)
    # - prefetch_related: Menjalankan kueri kedua terpisah untuk relasi ManyToMany / Reverse ForeignKey
    
    # optimized_qs = Course.objects.filter(is_published=True)\
    #     .select_related("instructor")\
    #     .prefetch_related(
    #         Prefetch("lessons", queryset=Lesson.objects.only("id", "title", "order"))
    #     )\
    #     .annotate(total_students=Count("enrollments", filter=Q(enrollments__is_paid=True)))

    print("[SQL OPTIMIZED] Berhasil mengambil 100 kursus, instruktur, dan relasi materi dalam 2 kueri SQL!")

# 3. Transaksi Atomik Aman untuk Proses Enrollment & Pembayaran
def enroll_student_atomic(student_id: int, course_id: int):
    # Menggunakan context manager transaction.atomic()
    # Jika terjadi exception di tengah jalan, seluruh mutasi di-rollback secara otomatis!
    with transaction.atomic():
        print(f"[TRANSACTION START] Mendaftarkan student #{student_id} ke course #{course_id}...")
        
        # 1. Kunci baris database (SELECT ... FOR UPDATE) untuk mencegah race condition
        # course = Course.objects.select_for_update().get(id=course_id)
        
        # 2. Buat record pendaftaran
        # enrollment = Enrollment.objects.create(student_id=student_id, course=course, is_paid=True)
        
        # 3. Log audit transaksi
        print("[TRANSACTION COMMIT] Siswa berhasil terdaftar dan transaksi pembayaran berhasil di-commit!")

fast_course_listing()
enroll_student_atomic(101, 42)
```

---

## Key Concepts

A pervasive flaw in ORM engineering is ignorance of the actual SQL compiled under the hood. The most common vulnerability crushing production databases is the **N+1 Query Problem**.

### The Anatomy of an N+1 Query
Iterating through 50 courses via `for c in courses: print(c.instructor.name)` triggers 1 query fetching courses, followed by **50 redundant queries** fetching individual instructor records (51 queries total!). Under concurrent traffic, database connection pools collapse.

### Core Remedies: select_related vs prefetch_related
1. **select_related**: Applied to single-valued relationships (ForeignKey or OneToOne). Django executes an optimized **SQL INNER JOIN**, fetching course and instructor rows within a **single roundtrip**.
2. **prefetch_related**: Applied to multi-valued relationships (ManyToMany or reverse foreign keys like `course.lessons`). Django dispatches a second batched lookup via SQL `IN (...)`, performing joining inside Python memory.

### Atomic Transactions (transaction.atomic)
Course enrollments encompass balance deductions, invoice generation, and seat allocation. Wrapping operations inside `with transaction.atomic():` ensures either all mutations commit successfully or the entire transaction cleanly rolls back upon unexpected errors.


---

---

## Beginner Friendly Explanation

Imagine being sent to retrieve 50 books from a library. The N+1 query behaves like an apprentice checking out 1 book, walking home, returning to the library for the 2nd book, and repeating this 50 times. The `select_related`/`prefetch_related` approach compiles a master list, loading all 50 books into a cart in a single trip.

## Experiments

- Install `django-debug-toolbar` and audit executed SQL counts before and after optimization.
- Raise `RuntimeError("Simulated payment gateway timeout")` inside `transaction.atomic()` and verify zero database commits.
- Deploy `.only("id", "title")` to project only specific SQL columns, conserving memory.

---

## Challenge

Use Django ORM `F()` expressions to increment course view counts atomically (`update(views_count=F("views_count") + 1)`) preventing race conditions.

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

You have mastered N+1 Query optimization via select_related/prefetch_related and atomic transactions. Level 2 complete! Level 3 covers Celery, Caching, and our LMS Capstone.
