# Pengenalan Django: MVT & Request Lifecycle

> Django | Fondasi Django | Pelajaran 1

## Tujuan Pembelajaran

- Menjelaskan kenapa Django: batteries included, admin, ORM, keamanan
- Membedakan project dan app
- Memahami MVT: Model, View, Template
- Mengikuti alur request dari URL sampai respons

---

## Program: Pengenalan Django: MVT & Request Lifecycle

```python
"""URLconf root: peta semua route proyek."""
from django.contrib import admin
from django.urls import include, path

from katalog import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Request masuk -> URLconf root -> dicocokkan dengan pola
    path('', views.beranda, name='beranda'),
    path('katalog/', include('katalog.urls')),  # delegasi ke app
]
```

---

## Penjelasan

## Kenapa Django? "Batteries Included"
Django adalah framework web Python yang paling lengkap: ORM, admin panel otomatis, auth system, forms, security (CSRF, XSS, SQL injection) SEMUA bawaan. Tidak seperti Express (pilih komponen sendiri) atau Flask (minimal), Django datang siap pakai - satu framework untuk seluruh backend. Inilah kenapa Django dipakai enterprise dan proyek pemerintah selama 20 tahun.
## Project vs App
Project = seluruh situs (settings, root urls, wsgi). App = satu fitur/domain (katalog, user, order). Satu project bisa berisi banyak app; satu app bisa dipakai di beberapa project. Aturan bootcamp: mulai dengan app per domain, bukan satu app raksasa.
## MVT: Bukan MVC
Model = struktur data (tabel DB). View = fungsi/class yang menerima request, memproses, mengembalikan response. Template = file HTML dengan Django Template Language. Bedanya dari MVC: View "controller"-nya ada di URLconf + view itu sendiri, dan Template bisa berisi logika tampilan sederhana. Flow: URL → View → (Model) → Template → HTML.
## Request Lifecycle: Satu Permintaan, Perjalanan Utuh
Request masuk → settings (middleware) → URLconf root (myproject/urls.py) → cocokkan pola → include() ke app urls → view dipanggil → view memakai Model/ORM kalau perlu → render Template → respons kembali lewat middleware. Menghafal jalur ini menjawab setengah pertanyaan wawancara Django.

---

## Eksperimen

1. **Kenapa Django? "Batteries Included"**
2. **Project vs App**
3. **MVT: Bukan MVC**
4. **Request Lifecycle: Satu Permintaan, Perjalanan Utuh**

---

## Tantangan

Buat app kedua bernama berita: (1) python manage.py startapp berita, (2) daftarkan di INSTALLED_APPS, (3) buat urls.py di app dan include dari root, (4) buat view daftar_berita yang merender daftar 3 berita (list Python di-view). Tuliskan struktur folder proyek Anda.

---

## Ringkasan

Django = batteries included. Project vs app. MVT: Model-View-Template. Alur: URL → View → Model → Template. Lanjut: URLs & views.
