# Authentication & Authorization

> **Kategori:** Django | **Level:** Intermediate | **Minggu 6:** Authentication & Authorization

## Learning Objectives

- Built-in auth: django.contrib.auth
- Auth views: LoginView, LogoutView
- login_required decorator
- User model: create_user, create_superuser
- Auth checks: is_authenticated, is_superuser

---

## Program: Login System

```python
# Auth
print("=== Django Authentication ===")
print("=== Built-in Auth ===")
print("INSTALLED_APPS += ["django.contrib.auth"]")
print("")
print("=== Auth Views ===")
print("from django.contrib.auth import views as auth_views")
print("urlpatterns = [")
print("    path("login/", auth_views.LoginView.as_view(), name="login"),")
print("    path("logout/", auth_views.LogoutView.as_view(), name="logout"),")
print("]")
print("")
print("=== Login Required ===")
print("from django.contrib.auth.decorators import login_required")
print("@login_required")
print("def dashboard(request):")
print("    return render(request, "dashboard.html")")
print("")
print("=== User Model ===")
print("from django.contrib.auth.models import User")
print("user = User.objects.create_user("budi", "budi@mail.com", "pass123")")
print("user = User.objects.create_superuser("admin", "admin@mail.com", "admin123")")

```

---

## Key Concepts

### Built-in Auth
`django.contrib.auth` - Django built-in auth system.

### Auth Views
`LoginView`, `LogoutView`, `PasswordChangeView`.

### login_required
`@login_required` redirects to login if unauthenticated.

### User Model
`create_user()` creates regular user. `create_superuser()` creates admin.

---

## Experiments

- Setup auth in settings.py
- Create login/logout views
- Protect views with login_required
- Create registration view
- Try password change

---

## Challenge

Create auth system: register, login, logout, dashboard (protected).

---

## Summary

Week 6 of 12: **Authentication** (Level: Intermediate). Next week: **Admin Panel**.
