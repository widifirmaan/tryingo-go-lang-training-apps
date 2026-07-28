# Multimedia & Embed

> HTML5 | Module 9

## Learning Objectives

- Add audio and video with HTML5
- Use multiple source formats for compatibility
- Control playback with controls, autoplay, loop
- Embed external content with iframe
- Add subtitles with track element

---

## Program: Media Player

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

## Explanation

Here is a detailed explanation of the material:

### Audio Element
`<audio controls>` — audio player. Attributes: `controls` — show controls. `autoplay` — auto-play. `loop` — repeat. Provide multiple `<source>` for different formats.

### Video Element
`<video controls>` — video player. Attributes: `width`, `height`, `poster` — thumbnail. `muted` — mute (required for autoplay).

### Track
`<track kind="subtitles">` — subtitles. `kind` can be: subtitles, captions, descriptions, chapters, metadata.

### Iframe
Embeds external pages. Attributes: `src` — URL, `allowfullscreen`, `loading="lazy"`. Use `sandbox` for security.

### Formats
**Audio**: MP3, OGG, WAV, AAC. **Video**: MP4 (H.264), WebM, OGV.

---

## Experiments

Add autoplay (muted) to video for preview,Replace video source with local files,Embed a Google Map with your city location,Add a subtitle track to the video (even if file is missing)

---

## Challenge

Create a multimedia player page displaying: audio playlist with 3 songs (each with MP3 and OGG sources), tutorial video with poster image, YouTube embed for trailer, and Google Maps embed for studio location. Include controls for each media.

---

## Summary

Multimedia makes web pages richer and more interactive. Audio, video, iframes, and track elements allow you to embed various media types. Next module: **Metadata & SEO** — how to optimize pages for search engines and social media.
