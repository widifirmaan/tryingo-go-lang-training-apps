# Authentication — KTP Django

> **Kategori:** Django | **Level:** Menengah | **Minggu 6:** Authentication

## Tujuan Pembelajaran

- `django.contrib.auth` KTP: `User`, `login()`, `logout()`, `@login_required` jaga `/admin`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `authenticate` + `login_required`, `/admin` dibuka siapa saja. Django 3 baris jaga semua.

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

## Penjelasan untuk Pemula

### Analogi: KTP Django
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `authenticate()` cek; `login()` beri session; `@login_required` tendang tanpa session.

### 3 Istilah Wajib
- 1. **authenticate/login_required**: cek/jaga

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 6: **KTP Django** — `authenticate` + `login_required`.
