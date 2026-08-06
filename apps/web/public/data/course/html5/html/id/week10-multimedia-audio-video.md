# Multimedia: Audio & Video

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 10:** Multimedia: Audio & Video

## Tujuan Pembelajaran

- Elemen video: controls, autoplay, loop, muted, poster
- Elemen audio: controls, autoplay, loop
- Multiple source untuk format fallback
- Elemen track untuk subtitle/caption
- Elemen iframe untuk embed konten eksternal

---

## Program: Pemutar Media

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Pemutar Media</title>
</head>
<body>
    <h1>Pemutar Media HTML5</h1>

    <h2>Video Player</h2>
    <video controls width="640" height="360"
           poster="https://picsum.photos/640/360"
           preload="metadata">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        <source src="https://www.w3schools.com/html/mov_bbb.webm" type="video/webm">
        <track kind="subtitles" src="subtitles_id.vtt" srclang="id" label="Indonesia">
        <track kind="subtitles" src="subtitles_en.vtt" srclang="en" label="English">
        Browser Anda tidak mendukung video HTML5.
    </video>

    <h2>Audio Player</h2>
    <audio controls preload="metadata">
        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
        Browser Anda tidak mendukung audio HTML5.
    </audio>

    <h2>Embed YouTube</h2>
    <iframe width="560" height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Video YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>

    <h2>Embed Peta</h2>
    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=106.8,-6.2,106.9,-6.1"
            width="425" height="350"
            title="Peta Jakarta">
    </iframe>
</body>
</html>
```

---

## Konsep Kunci

### Video
`<video controls poster="..." preload="metadata">` — controls tampilkan player, poster thumbnail, preload metadata saja.

### Audio
`<audio controls>` — player audio sederhana.

### Multiple Source
`<source src="..." type="video/mp4">` — browser pilih format yang didukung.

### Track
`<track kind="subtitles" src="subs.vtt" srclang="id">` — subtitle file VTT.

### Iframe
Embed konten eksternal: YouTube, Maps, dll.

---

## Eksperimen

- Tambah video dengan autoplay dan muted
- Coba loop pada audio
- Buat playlist video dengan multiple source
- Tambah track subtitle dalam 2 bahasa
- Embed konten berbeda: Spotify, CodePen

---

## Tantangan

Buat halaman media gallery: 2 video, 2 audio, 1 YouTube embed, dengan kontrol custom.

---

## Ringkasan

Minggu 10 dari 14: **Multimedia: Audio & Video** (Level: HTML5 Lengkap). Konten kaya. Minggu depan: **HTML APIs**.
