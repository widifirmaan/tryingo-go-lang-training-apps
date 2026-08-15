# Multimedia: Audio & Video

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 10:** Multimedia: Audio & Video

## Learning Objectives

- Video element: controls, autoplay, loop, muted, poster
- Audio element: controls, autoplay, loop
- Multiple sources for format fallback
- Track element for subtitles/captions
- Iframe element for embedding external content

---

## Program: Media Player

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

## Key Concepts

### Video
`<video controls poster="..." preload="metadata">` — controls show player, poster thumbnail, preload metadata only.

### Audio
`<audio controls>` — simple audio player.

### Multiple Sources
`<source src="..." type="video/mp4">` — browser picks supported format.

### Track
`<track kind="subtitles" src="subs.vtt" srclang="id">` — VTT subtitle file.

### Iframe
Embed external content: YouTube, Maps, etc.

---

## Beginner Friendly Explanation

HTML5 video and audio = **media players right on the page**, no extra apps needed.

- `<video controls>` = a video player with play/pause buttons. `poster` = a front image, `preload="metadata"` = download light info first.
- `<audio controls>` = an audio player.
- Use multiple `<source>` for format fallback (mp4, webm, ogg) — the browser picks the one it supports.
- `<track>` = subtitles (a .vtt file).
- `<iframe>` = embed another page/content (YouTube, maps).

**Try:** Run the "Media Player" program in the playground and play the video/audio. Remove the `controls` attribute, then run again — media becomes silent playback without buttons.

---

## Experiments

- Add video with autoplay and muted
- Try loop on audio
- Create video playlist with multiple sources
- Add subtitle track in 2 languages
- Embed different content: Spotify, CodePen

---

## Challenge

Build a media gallery page: 2 videos, 2 audios, 1 YouTube embed, with custom controls.

---

## Summary

Week 10 of 14: **Multimedia: Audio & Video** (Level: Complete HTML5). Rich content. Next week: **HTML APIs**.
