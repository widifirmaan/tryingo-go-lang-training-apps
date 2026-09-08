# Authentication — Django ID

> **Kategori:** Django | **Level:** Intermediate | **Minggu 6:** Authentication

## Learning Objectives

- `django.contrib.auth` ID: `User`, `login()`, `logout()`, `@login_required` guards `/admin`

---

## Why This Matters (Non-IT)

Without `authenticate` + `login_required`, anyone opens `/admin`. Django guards everything in 3 lines.

---

## Program

```bash
python manage.py startapp accounts
```

```python
# accounts/views.py
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect, render

def login_view(request):
    if request.method == "POST":
        user = authenticate(request, username=request.POST["username"], password=request.POST["password"])
        if user:
            login(request, user)
            return redirect("list")
    return render(request, "accounts/login.html")

# shop/views.py
from django.contrib.auth.decorators import login_required
@login_required
def admin_shop(request):
    return render(request, "shop/admin.html")
```

`login.html`: `{% csrf_token %}` + `username`/`password`.


---

## Beginner Friendly Explanation

### Analogy: Django ID
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `authenticate()` checks; `login()` grants session; `@login_required` kicks session-less.

### 3 Must-Know Terms
- 1. **authenticate/login_required**: check/guard

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 6: **Django ID** — auth in 3 lines. Next: **Admin**.
