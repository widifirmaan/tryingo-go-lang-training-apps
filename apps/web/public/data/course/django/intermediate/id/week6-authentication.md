# Authentication & Authorization

> **Kategori:** Django | **Level:** Menengah | **Minggu 6:** Authentication & Authorization

## Tujuan Pembelajaran

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

## Konsep Kunci

### Built-in Auth
`django.contrib.auth` - sistem auth bawaan Django.

### Auth Views
`LoginView`, `LogoutView`, `PasswordChangeView`.

### login_required
`@login_required` - redirect ke login jika belum auth.

### User Model
`create_user()` - buat user biasa. `create_superuser()` - buat admin.

---

## Eksperimen

- Setup auth di settings.py
- Buat login/logout views
- Protect views dengan login_required
- Buat registration view
- Coba password change

---

## Tantangan

Buat sistem auth: register, login, logout, dashboard (protected).

---

## Ringkasan

Minggu 6 dari 12: **Authentication** (Level: Menengah). Minggu depan: **Admin Panel**.
