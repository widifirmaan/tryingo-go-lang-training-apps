# Templates: DTL, Inheritance & Static Files

> Django | Fondasi Django | Pelajaran 4

## Tujuan Pembelajaran

- Menulis sintaks DTL: variable, tag, filter
- Memakai template inheritance (extends/block)
- Menghubungkan static files (css/js)
- Menghindari logika berat di template

---

## Program: Templates: DTL, Inheritance & Static Files

```python
{% extends 'katalog/base.html' %}

{% block title %}{{ judul }}{% endblock %}

{% block konten %}
  <h1>{{ judul }}</h1>
  <p>Jumlah produk: {{ produk|length }}</p>

  <table>
    <thead>
      <tr><th>Nama</th><th>Harga</th></tr>
    </thead>
    <tbody>
      {% for p in produk %}
        <tr>
          <td>{{ p.nama }}</td>
          <td>Rp {{ p.harga|floatformat:0 }}</td>
        </tr>
      {% empty %}
        <tr><td colspan="2">Belum ada produk.</td></tr>
      {% endfor %}
    </tbody>
  </table>
{% endblock %}
```

---

## Penjelasan

## DTL: Variabel, Tag, Filter
{{ produk|length }} = variabel + filter. {% for %}, {% if %}, {% empty %}, {% block %}, {% extends %}, {% load static %} = tag (dengan kurung kurawal + %). Filter: |length, |upper, |date, |floatformat, |default. DTL sengaja DIBATASI: tidak ada pemanggilan fungsi arbitrary - mencegah logika bisnis di tampilan. Jika butuh perhitungan, lakukan di view.
## Inheritance: Satu Kerangka, Banyak Halaman
base.html = kerangka (header, footer, css). Halaman lain {% extends 'katalog/base.html' %} dan mengisi {% block konten %}. Ubah navbar SEKALI di base → semua halaman ikut. Ini pola paling penting DTL: tanpa inheritance, setiap halaman mengulang boilerplate dan perbaikan navbar jadi pekerjaan 20 file.
## Static Files: CSS, JS, Gambar
Folder static/ (per app atau global via STATICFILES_DIRS) + {% load static %} + {% static 'css/style.css' %} → di development Django melayani langsung; di produksi collectstatic mengumpulkannya untuk Nginx/CDN (pelajaran 15). Aturan: aset yang TIDAK berubah per-user = static; konten per-data = template.
## Pola View-Template yang Sehat
View menyiapkan SEMUA data (context), template hanya MENAMPILKAN. Tanda template sehat: tidak ada perhitungan, tidak ada query, hanya loop + kondisi + format. Ini sama seperti komponen "presentational" di React/Vue - pisahkan data dan tampilan, dan keduanya mudah di-test dan diubah.

---

## Eksperimen

1. **DTL: Variabel, Tag, Filter**
2. **Inheritance: Satu Kerangka, Banyak Halaman**
3. **Static Files: CSS, JS, Gambar**
4. **Pola View-Template yang Sehat**

---

## Tantangan

Poles tampilan: (1) buat halaman kedua "Tentang" dengan extends base (route + view + template), (2) tambah block tambahan di base (misal {% block skrip %}) dan isi dari halaman daftar dengan JavaScript kecil, (3) tambah gambar statis (assets/logo.png) dan tampilkan di header, (4) buat filter harga dengan format titik ribuan (custom template filter di katalog/templatetags/).

---

## Ringkasan

DTL: {{ var }} + {% tag %} + filter. Inheritance = kerangka sekali. Static = aset. View siapkan data, template tampilkan. Lanjut: querysets.
