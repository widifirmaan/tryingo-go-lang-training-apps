# Video & Audio

## The `<video>` Element

Embed video content directly in the page.

```html
<video src="movie.mp4" controls width="640" height="360">
  Your browser does not support the video element.
</video>
```

### Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `src` | URL | Video file path |
| `controls` | (boolean) | Show play/pause/volume controls |
| `autoplay` | (boolean) | Start playing automatically |
| `muted` | (boolean) | Mute audio by default |
| `loop` | (boolean) | Restart after completion |
| `poster` | URL | Thumbnail before playback |
| `preload` | `none`, `metadata`, `auto` | How much to load before play |
| `width` | pixels | Display width |
| `height` | pixels | Display height |

### Multiple Sources

```html
<video controls width="640" height="360" poster="thumbnail.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  <source src="movie.ogv" type="video/ogg">
  <p>Your browser does not support video playback.</p>
</video>
```

### Autoplay with Muted

Most browsers require `muted` for autoplay to work.

```html
<video autoplay muted loop playsinline>
  <source src="background.mp4" type="video/mp4">
</video>
```

## The `<audio>` Element

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  <p>Your browser does not support audio playback.</p>
</audio>
```

### Attributes

| Attribute | Description |
|-----------|-------------|
| `controls` | Show playback controls |
| `autoplay` | Start playing automatically |
| `muted` | Start muted |
| `loop` | Loop playback |
| `preload` | `none`, `metadata`, `auto` |

## Video & Audio Formats

### Video

| Format | Codec | Best For |
|--------|-------|----------|
| MP4 | H.264 | Universal compatibility |
| WebM | VP8/VP9 | Modern browsers, smaller files |
| OGG | Theora | Open format fallback |

### Audio

| Format | Best For |
|--------|----------|
| MP3 | Universal compatibility |
| AAC | Better quality than MP3 |
| OGG Vorbis | Open format |
| WAV | Uncompressed, high quality |

## Complete Media Page Example

```html
<figure>
  <video controls width="100%" poster="presentation-poster.jpg">
    <source src="presentation.mp4" type="video/mp4">
    <source src="presentation.webm" type="video/webm">
    Your browser does not support video.
  </video>
  <figcaption>Course introduction video</figcaption>
</figure>

<figure>
  <figcaption>Podcast Episode 42: HTML5 Deep Dive</figcaption>
  <audio controls>
    <source src="episode42.mp3" type="audio/mpeg">
    <source src="episode42.ogg" type="audio/ogg">
  </audio>
</figure>
```

## Practice

1. Embed a video with MP4 and WebM sources and a poster image
2. Add an audio player with MP3 and OGG sources
3. Create an autoplay muted loop video for a hero background section
4. Test across Chrome, Firefox, and Safari to verify format support
