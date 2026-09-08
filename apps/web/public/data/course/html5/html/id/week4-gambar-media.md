# Gambar & Media — Etalase Foto

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 4:** Gambar & Media

## Tujuan Pembelajaran

- `img src alt width height` foto, `alt` wajib untuk tunanetra, `figure+figcaption` bingkai + caption
- `srcset`/`sizes` gambar responsif HP vs laptop (tetap HTML: `srcset="kecil.jpg 480w, besar.jpg 800w"`)

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
<img src="https://placehold.co/300" alt="Placeholder produk" width="300" height="200">
<p>Jika foto gagal, <code>alt</code> tampil: "Karung beras 5kg"</p>
```

**Wajib `alt`**: kosong `alt=""` jika hiasan, isi jika produk.

---

## Ringkasan

Minggu 4: **Foto** — `img` + `alt` + `figure`. Minggu depan: **List**.
