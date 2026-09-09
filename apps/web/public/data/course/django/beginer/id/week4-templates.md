# Templates — Meja Warung Django yang Cantik

> **Kategori:** Django | **Level:** Pemula | **Minggu 4:** Templates & Template Language
> **Prasyarat:** Minggu 3 — **Views & URLs**.

## Tujuan Pembelajaran

- `{{ nama }}` tampilkan, `{% for %}` ulang, `{% if %}` putuskan, `|length` filter (sumber: docs.djangoproject.com/topics/templates)
- Warisan `{% extends "base.html" %}` + `{% block content %}` — tulis header 1x, pakai 10 halaman

---

## Kenapa Ini Penting Buat Kamu?

Tanpa warisan, header/footer ditulis di 10 file — ganti nomor WA, ubah 10x. Dengan `extends`, ubah `base.html` 1x → 10 halaman ikut. `{% empty %}` tampilkan "kosong" otomatis, tidak perlu `if` manual.

---

## Program: Meja Warisi Bingkai

```html
<!-- warung/templates/base.html — bingkai (tulis sekali) -->
<!DOCTYPE html>
<html lang="id">
<body>
  <header><h1>Warung Bu Siti</h1><nav><a href="/produk/">Produk</a></nav></header>
  <main>{% block content %}{% endblock %}</main>
  <footer>WA 0812 — {{ tahun|default:"2026" }}</footer>
</body>
</html>
```

```html
<!-- warung/templates/warung/daftar.html — isi (warisi) -->
{% extends "base.html" %}
{% block content %}
<h2>Katalog ({{ produk|length }} item)</h2>
{% if produk %}
<ul>
  {% for p in produk %}
  <li>{{ p.nama }} - Rp{{ p.harga }}{% if p.stok == 0 %} (habis){% endif %}</li>
  {% empty %}
  <li>Belum ada produk</li>
  {% endfor %}
</ul>
{% else %}
<p>Kosong</p>
{% endif %}
{% endblock %}
```

---

## Konsep Kunci

### `{{ }}` vs `{% %}` vs `|`
- `{{ nama }}` tampilkan, `{% for %}`/`{% if %}` logika, `{{ daftar|length }}` filter.

### `extends` + `block` = Warisan
`base.html` bingkai + `{% block content %}` lubang → anak isi lubang.

### `{% empty %}` = Jika Kosong
Di dalam `for`, tampil jika daftar kosong.

---

## Penjelasan untuk Pemula

### Analogi: Bingkai Foto & Isi
- **base.html = bingkai**: header/footer tetap.
- **daftar.html = foto**: ganti tiap halaman.
- **Filter `|length` = penghitung**: hitung otomatis.

### Langkah 0 — Siapkan Device
- Sama W1-W3: `runserver`, buka `/produk/`.

### Cara Komputer Membaca
1. `{% extends "base.html" %}` → ambil bingkai.
2. `{% block content %}` → tempel isi anak ke lubang bingkai.

### 3 Istilah Wajib
1. **extends/block**: warisi/lubang
2. **for/empty**: ulang/kosong
3. **Filter `|`**: olah tampil

---

## Eksperimen

- **Hijau:** `{{ "beras"|upper }}` → "BERAS"? `{{ produk|length }}` → 3?
- **Kuning:** Hapus `extends` → header hilang? Pasang lagi.
- **Merah:** `{% for p in produkkosong %}` tanpa `empty` → kosong melompong? Tambah `empty`.

---

### Bonus: File Statis — CSS/Logo Sendiri (bab MDN Django Tutorial!)

Template tanpa CSS = polos. `{% static %}` ambil dari `static/` (bukan tulis path manual!).

```html
{% load static %}
<link rel="stylesheet" href="{% static 'warung/style.css' %}">
<img src="{% static 'warung/logo.png' %}" alt="Logo" width="120">
```
```
warung/
  static/warung/style.css   # CSS Quinn
  static/warung/logo.png
  templates/warung/daftar.html
```
- `{% load static %}` wajib tiap file! Produksi: `python manage.py collectstatic` kumpulkan 1 folder.

---

## Tantangan

**Warung Meja Lengkap:** `base.html` (header/nav/footer) + `daftar.html` (`extends`, `for` + `empty`, `if stok==0`) + `detail.html` (`{{ p.nama }}` + `|date:"d M Y"` untuk `dibuat`). **Selesai Beginner Django!**

---

## Glosarium Mini

- **extends/block/for**: warisi/lubang/ulang
- **filter/date**: olah/tanggal

---

## Ringkasan

Minggu 4 dari 4: **Meja Cantik** (Level: Pemula). **Selesai Beginner Django!** Lanjut: **Forms** (Menengah).
