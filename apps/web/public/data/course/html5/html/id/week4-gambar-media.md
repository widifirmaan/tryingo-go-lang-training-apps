# Gambar & Media — Etalase Foto

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 4:** Gambar & Media
> **Prasyarat:** Minggu 3 — **Link & Navigasi**.

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

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Gambar & Media di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Link & Navigasi** (Minggu 3): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- **img/alt/figure**: foto/label/bingkai

## Ringkasan

Minggu 4: **Foto** — `img` + `alt` + `figure`. Minggu depan: **List**.
