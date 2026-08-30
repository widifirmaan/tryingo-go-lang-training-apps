# Gambar & Media — Etalase Foto

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 4:** Gambar & Media

## Tujuan Pembelajaran

- `img src alt width height` foto, `alt` wajib untuk tunanetra, `figure+figcaption` bingkai + caption
- `srcset` untuk HP vs laptop (nanti CSS)

---

## Kenapa Ini Penting Buat Kamu?

Warung tanpa foto = pelanggan tidak percaya. `alt` = deskripsi jika foto gagal load / dibaca screen reader.

---

## Program: Etalase Foto

```html
<figure>
  <img src="beras.jpg" alt="Karung beras 5kg" width="300" height="200">
  <figcaption>Beras 5kg — Rp 62.000</figcaption>
</figure>
<img src="https://via.placeholder.com/300" alt="Placeholder produk" width="300" height="200">
<p>Jika foto gagal, <code>alt</code> tampil: "Karung beras 5kg"</p>
```

**Wajib `alt`**: kosong `alt=""` jika hiasan, isi jika produk.

---

## Ringkasan

Minggu 4: **Foto** — `img` + `alt` + `figure`. Minggu depan: **List**.
