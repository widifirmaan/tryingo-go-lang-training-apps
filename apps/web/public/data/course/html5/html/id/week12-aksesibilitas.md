# Aksesibilitas — Warung untuk Semua

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 12:** Aksesibilitas
> **Prasyarat:** Minggu 11 — **HTML APIs**.

## Tujuan Pembelajaran

- `alt` wajib di `img`, `label for`, `aria-label` jika icon, `lang="id"` di `html` (MDN a11y)

---

## Kenapa Ini Penting Buat Kamu?

Tunanetra pakai screen reader — tanpa `alt="Karung beras 5kg"`, mereka dengar "image". Tanpa `label for`, tunanetra tidak tahu input untuk apa.

---

## Program: Warung Aksesibel

```html
<html lang="id">
<img src="beras.jpg" alt="Karung beras 5kg, Rp 62.000">
<label for="nama">Nama</label><input id="nama" name="nama">
<button aria-label="Tambah ke keranjang">🛒</button>
```

Test dengan `WAVE` extension Chrome.

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Aksesibilitas di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **HTML APIs** (Minggu 11): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 12: **Untuk Semua** — `alt`, `label`, `aria`. Minggu depan: **SEO & Meta**.
