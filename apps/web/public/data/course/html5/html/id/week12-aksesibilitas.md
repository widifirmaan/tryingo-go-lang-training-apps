# Aksesibilitas — Warung untuk Semua

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 12:** Aksesibilitas

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

## Ringkasan

Minggu 12: **Untuk Semua** — `alt`, `label`, `aria`.
