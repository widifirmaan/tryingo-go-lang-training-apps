# Multimedia — Foto, Audio, Video Warung

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 10:** Multimedia & Audio Video

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

## Ringkasan

Minggu 10: **Multimedia** — `audio`/`video` + `controls`.
