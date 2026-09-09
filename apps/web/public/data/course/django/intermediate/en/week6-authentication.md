# Authentication — Django ID

> **Kategori:** Django | **Level:** Intermediate | **Minggu 6:** Authentication
> **Prerequisites:** Week 5 — **Forms & Validation**.

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
- **`authenticate()` = match ID + password** against the resident book; match → `login()` straps a session wristband on the browser.
- **`@login_required` = door guard**: no wristband → kicked to `/login/` remembering the original goal (`?next=/admin/`).

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `authenticate()` checks; `login()` grants session; `@login_required` kicks session-less.

### 3 Must-Know Terms
- 1. **authenticate/login_required**: check/guard

### Bonus: Sessions — Remember Carts Without Login (MDN Django Auth chapter!)

`@login_required` for admins. Shopping carts? Use **sessions** (signed cookies, server-side DB by default):

```python
def add(request, id):
    cart = request.session.get("cart", [])  # read (default empty)
    cart.append(id)
    request.session["cart"] = cart          # write → auto-saved!
    request.session.modified = True         # force-save when unsure
    return redirect("list")

def view(request):
    ids = request.session.get("cart", [])
    products = Product.objects.filter(id__in=ids)
    return render(request, "shop/cart.html", {"products": products})
```
- Sessions survive browser restarts (until expiry). `request.session.flush()` = total logout (wipes all!).

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 6: **Django ID** — auth in 3 lines. Next: **Admin**.
