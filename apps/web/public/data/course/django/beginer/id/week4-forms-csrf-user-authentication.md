# Formulir Aman: ModelForm, Proteksi CSRF & Django Authentication

> **Kategori:** Django Web Framework | **Level:** Pemula | **Minggu 4:** Formulir Aman: ModelForm, Proteksi CSRF & Django Authentication
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran `ModelForm` dalam menghubungkan formulir HTML dengan model database secara otomatis.
- Menerapkan proteksi Cross-Site Request Forgery (CSRF) menggunakan token `{% csrf_token %}`.
- Menulis validasi kustom formulir dengan method `clean_<field>()`.
- Mengamankan halaman aplikasi menggunakan decorator `@login_required` dan sistem autentikasi bawaan Django.

---

## Program: Formulir Ulasan Kursus & Alur Pendaftaran Siswa dengan ModelForm

```python
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
# from .models import Course, Review

# 1. ModelForm Otomatis dengan Validasi Bawaan
class CourseReviewForm(forms.Form):
    rating = forms.ChoiceField(
        choices=[(1, "1 - Buruk"), (2, "2 - Cukup"), (3, "3 - Baik"), (4, "4 - Sangat Baik"), (5, "5 - Luar Biasa")],
        widget=forms.Select(attrs={"class": "form-select"})
    )
    comment = forms.CharField(
        widget=forms.Textarea(attrs={"class": "form-control", "rows": 4, "placeholder": "Tulis ulasan Anda..."}),
        min_length=10,
        max_length=1000
    )

    def clean_comment(self):
        comment = self.cleaned_data.get("comment", "")
        if "spam" in comment.lower():
            raise forms.ValidationError("Ulasan memuat kata yang dilarang (spam).")
        return comment

# 2. View dengan Proteksi Autentikasi @login_required
@login_required(login_url="/accounts/login/")
def submit_review_view(request, course_slug):
    # course = get_object_or_404(Course, slug=course_slug)

    if request.method == "POST":
        form = CourseReviewForm(request.POST)
        if form.is_valid():
            # Proses penyimpanan aman
            rating = form.cleaned_data["rating"]
            comment = form.cleaned_data["comment"]
            print(f"[NEW REVIEW] User: {request.user.username} | Rating: {rating} | Comment: {comment}")
            return redirect(f"/courses/{course_slug}/")
    else:
        form = CourseReviewForm()

    return render(request, "courses/submit_review.html", {"form": form, "course_slug": course_slug})

# Snippet Template dengan Token CSRF Wajib:
CSRF_FORM_TEMPLATE = """
<form method="POST" action="">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit" class="btn btn-primary">Kirim Ulasan</button>
</form>
"""

print("=== MODELFORM & SISTEM AUTENTIKASI DJANGO TERKONFIGURASI ===")
```

---

## Konsep Kunci

Memproses input formulir dari browser pengguna secara manual adalah pekerjaan rawan bug dan bahaya keamanan. Django Forms menangani rendering formulir, validasi tipe data, pembersihan input (cleaning), dan perlindungan keamanan secara terpadu.

### Keharusan Token CSRF ({% csrf_token %})
Serangan **CSRF (Cross-Site Request Forgery)** terjadi ketika situs jahat memperdaya browser pengguna yang sedang login untuk mengirimkan request mutasi data rahasia. Django mewajibkan tag `{% csrf_token %}` di dalam setiap form POST. Token kriptografis ini diverifikasi oleh middleware Django; jika token tidak cocok atau absen, request langsung ditolak dengan status HTTP 403 Forbidden.

### Metode Pembersihan clean_<field>()
Ketika method `form.is_valid()` dipanggil, Django menjalankan serangkaian validasi. Kita dapat menambahkan aturan validasi bisnis kustom (seperti mendeteksi spam kata-kata terlarang) dengan mendefinisikan method `clean_comment()`. Data yang telah lolos validasi dapat diakses secara aman melalui dictionary `form.cleaned_data`.

### Sistem Autentikasi Bawaan (django.contrib.auth)
Django menyertakan model `User`, hashing password berstandar industri (PBKDF2 dengan SHA-256), session management, dan sistem izin (permissions). Decorator `@login_required` memastikan bahwa hanya pengguna yang sudah login yang dapat mengakses halaman pengiriman ulasan atau pembelajaran.


---

---

## Penjelasan untuk Pemula

Bayangkan formulir transfer bank fisik. Anda harus membubuhkan stempel hologram bank anti-palsu ({% csrf_token %}). Petugas loket (clean_comment) memeriksa apakah formulir Anda dicoret-coret atau menggunakan kata kasar. Jika Anda belum menunjukkan kartu tanda pengenal nasabah (@login_required), Anda disuruh mengantre di loket pembuatan akun terlebih dahulu.

## Eksperimen

- Hapus tag `{% csrf_token %}` dari form dan amati penolakan HTTP 403 CSRF Verification Failed.
- Kirim ulasan yang memuat kata "spam" dan amati pesan error validasi muncul di bawah kolom input komentar.
- Gunakan generic view `django.contrib.auth.views.LoginView` untuk membuat halaman login dalam 5 baris kode.

---

## Tantangan

Buat formulir registrasi siswa baru `StudentSignUpForm` yang mewarisi `UserCreationForm`, menambahkan field wajib `full_name` dan `phone_number`.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MODEL-TEMPLATE-VIEW (MTV) DJANGO              │
│                                                          │
│ Browser Request ──► urls.py (URL Router)                 │
│                            │                             │
│                            ▼                             │
│                       views.py (Logika Bisnis)           │
│                         │         │                      │
│             Query DB    ▼         ▼   Render HTML        │
│        models.py (ORM) ◄           ► templates/*.html    │
│               │                            │             │
│               ▼                            ▼             │
│          Database Relasional           HTTP Response     │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `class Model(models.Model)`
- **Fungsi Utama:** Definisi entitas ORM database.
- **Parameter / Atribut:** `Field Types (CharField, IntegerField, ForeignKey)`.
- **Perilaku & Efek Sistem:** Memetakan struktur tabel database langsung dari class Python dengan migrasi bawaan..
- **Contoh Penggunaan Praktis:**
```python
from django.db import models
class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
```
- **Hasil Output yang Diharapkan:**
```text
Skema tabel Product siap dimigrasi ke database
```

### 2. `Product.objects.filter(price__gt=50000)`
- **Fungsi Utama:** ORM QuerySet Fluent API.
- **Parameter / Atribut:** `Field lookups (__gt, __icontains, __in)`.
- **Perilaku & Efek Sistem:** Menyusun query SQL relasional berkinerja tinggi secara lazy tanpa menulis SQL mentah..
- **Contoh Penggunaan Praktis:**
```python
cheap_products = Product.objects.filter(price__lte=100000).order_by('-created_at')[:5]
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan 5 baris produk termurah
```

### 3. `def view(request): return render(request, 'home.html', ctx)`
- **Fungsi Utama:** View Handler berbasis fungsi/kelas.
- **Parameter / Atribut:** `HttpRequest, Template name, Context dict`.
- **Perilaku & Efek Sistem:** Menerima permintaan pengguna, memproses data, dan mengembalikan HTML yang ter-render..
- **Contoh Penggunaan Praktis:**
```python
from django.shortcuts import render
def home_view(request):
    items = Product.objects.all()
    return render(request, 'home.html', {'items': items})
```
- **Hasil Output yang Diharapkan:**
```text
Halaman web ter-render sempurna untuk pengguna
```

### 4. `path('products/<int:id>/', views.detail, name='product-detail')`
- **Fungsi Utama:** Pendaftaran URL Pattern terstruktur.
- **Parameter / Atribut:** `Route string, View function, Unique name`.
- **Perilaku & Efek Sistem:** Menghubungkan pola URL yang diminta peramban ke fungsi view yang sesuai..
- **Contoh Penggunaan Praktis:**
```python
from django.urls import path
from . import views
urlpatterns = [
    path('products/<int:id>/', views.detail, name='product-detail')
]
```
- **Hasil Output yang Diharapkan:**
```text
Rute /products/123 dipetakan ke views.detail
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Lupa Menjalankan Migration setelah Mengubah Model
- **Gejala / Masalah:** Database tidak sinkron dengan kode Python, memicu error `ProgrammingError: relation does not exist`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu jalankan `python manage.py makemigrations` lalu `python manage.py migrate`.

### 2. N+1 Query Problem di Django ORM
- **Gejala / Masalah:** Template me-render list dengan mengeksekusi query database berulang kali untuk setiap relasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `select_related()` untuk Foreign Key satu-ke-satu dan `prefetch_related()` untuk Many-to-Many.

### 3. Expose SECRET_KEY atau DEBUG=True di Produksi
- **Gejala / Masalah:** Informasi credential rentan dibobol dan halaman debug menampilkan variabel lingkungan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Simpan rahasia di environment variable dan pastikan `DEBUG = False` di lingkungan produksi.

---

## Ringkasan

Kamu telah menguasai ModelForm, validasi data, proteksi CSRF, dan sistem Autentikasi. Level 1 selesai! Di Level 2 kita masuk ke Django REST Framework dan optimasi ORM.
