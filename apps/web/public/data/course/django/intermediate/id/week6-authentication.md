# Authentication — KTP Django

> **Kategori:** Django | **Level:** Menengah | **Minggu 6:** Authentication

## Tujuan Pembelajaran

- `django.contrib.auth` KTP: `User`, `login()`, `logout()`, `@login_required` jaga `/admin`

---

## Program

```bash
python manage.py startapp akun
```

```python
# akun/views.py
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect, render

def masuk(request):
    if request.method == "POST":
        user = authenticate(request, username=request.POST["username"], password=request.POST["password"])
        if user:
            login(request, user)
            return redirect("daftar")
    return render(request, "akun/login.html")

# warung/views.py
from django.contrib.auth.decorators import login_required
@login_required
def admin_warung(request):
    return render(request, "warung/admin.html")
```

`login.html`: `{% csrf_token %}` + `username`/`password`.

---

## Ringkasan

Minggu 6: **KTP Django** — `authenticate` + `login_required`.
