# Multimedia — Foto, Audio, Video Warung

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 10:** Multimedia & Audio Video
> **Prasyarat:** Minggu 9 — **Semantic HTML**.

## Tujuan Pembelajaran

- `audio controls src` + `video controls poster` + `source` multi-format, `alt` untuk `audio` fallback text

---

## Kenapa Ini Penting Buat Kamu?

Warung butuh video masak, audio testimoni — `controls` biar pelanggan play/pause tanpa JS.

---

## Program

```html
<audio controls src="testimoni.mp3">Browser tidak support audio</audio>
<video controls poster="warung.jpg" width="320">
  <source src="masak.mp4" type="video/mp4">
  <source src="masak.webm" type="video/webm">
  Browser tidak support video
</video>
```

`controls` wajib, `poster` sampul, `source` 2 format untuk browser beda.

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Multimedia di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Semantic HTML** (Minggu 9): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 10: **Multimedia** — `audio`/`video` + `controls`. Minggu depan: **HTML APIs**.
