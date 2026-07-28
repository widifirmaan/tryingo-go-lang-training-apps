# Multimedia & Embed

> HTML5 | Modul 9

## Tujuan Pembelajaran

- Menambahkan audio dan video dengan HTML5
- Menggunakan multiple source formats untuk kompatibilitas
- Mengatur kontrol, autoplay, dan loop pada media
- Menyematkan konten eksternal dengan iframe
- Menambahkan subtitle dengan track element

---

## Program: Pemutar Media

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multimedia Player</title>
</head>
<body>
  <h1>Pemutar Media HTML5</h1>

  <h2>Audio Player</h2>
  <p>Suara alam untuk relaksasi:</p>
  <audio controls>
    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
    Browser Anda tidak mendukung elemen audio.
  </audio>

  <h2>Video Player</h2>
  <p>Video contoh dengan kontrol:</p>
  <video controls width="560" poster="https://placehold.co/560x315/E34F26/fff?text=Video+Player">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
    <track kind="subtitles" src="subtitles_id.vtt" srclang="id" label="Indonesia">
    Browser Anda tidak mendukung elemen video.
  </video>

  <h2>YouTube Embed (iframe)</h2>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  <h2>Google Maps Embed</h2>
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.39822095582!2d115.14099985!3d-8.64701695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd240878731fed1%3A0x4030bfbca7d3a20!2sBali!5e0!3m2!1sid!2sid!4v1" width="560" height="315" style="border:0;" allowfullscreen loading="lazy"></iframe>

  <p><small>Catatan: Beberapa konten mungkin diblokir oleh CORS di lingkungan lokal. Gunakan Live Server untuk hasil maksimal.</small></p>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Elemen Audio
`<audio controls>` — pemutar audio. Atribut: `controls` — tampilkan kontrol. `autoplay` — putar otomatis. `loop` — ulang. Sediakan multiple `<source>` untuk format berbeda.

### Elemen Video
`<video controls>` — pemutar video. Atribut: `width`, `height`, `poster` — thumbnail. `muted` — bisu (diperlukan untuk autoplay).

### Track
`<track kind="subtitles">` — subtitle. `kind` bisa: subtitles, captions, descriptions, chapters, metadata.

### Iframe
Menyematkan halaman eksternal. Atribut: `src` — URL, `allowfullscreen`, `loading="lazy"`. Gunakan `sandbox` untuk keamanan.

### Format
**Audio**: MP3, OGG, WAV, AAC. **Video**: MP4 (H.264), WebM, OGV.

---

## Eksperimen

Tambah autoplay (muted) pada video untuk preview,Ganti sumber video dengan file lokal,Embed peta dari Google Maps dengan lokasi kota Anda,Tambah track subtitle ke video (walaupun file tidak ada)

---

## Tantangan

Buat halaman multimedia player yang menampilkan: playlist audio dengan 3 lagu (masing-masing dengan source MP3 dan OGG), video tutorial dengan poster image, YouTube embed untuk trailer, dan embed Google Maps untuk lokasi studio. Sertakan kontrol untuk setiap media.

---

## Ringkasan

Multimedia membuat halaman web lebih kaya dan interaktif. Audio, video, iframe, dan track element memungkinkan Anda menyematkan berbagai jenis media. Modul selanjutnya: **Metadata & SEO** — cara mengoptimalkan halaman untuk mesin pencari dan social media.
