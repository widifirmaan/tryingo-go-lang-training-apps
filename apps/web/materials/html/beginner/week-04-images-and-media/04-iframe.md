# iframes

The `<iframe>` element embeds another HTML page within the current page.

```html
<iframe src="https://example.com" title="Example site"></iframe>
```

## Attributes

| Attribute | Description |
|-----------|-------------|
| `src` | URL of the page to embed |
| `srcdoc` | Inline HTML to render instead of `src` |
| `title` | Accessibility label (required) |
| `width` | Width in pixels or percentage |
| `height` | Height in pixels |
| `sandbox` | Restricts capabilities |
| `loading` | `lazy` or `eager` |
| `allow` | Feature policy for the embedded content |
| `referrerpolicy` | Referrer information sent |
| `name` | Target name for links |

## Security with `sandbox`

The `sandbox` attribute applies restrictions to the iframe content.

```html
<iframe src="widget.html" sandbox="allow-scripts" title="Widget"></iframe>
```

| Value | Allows |
|-------|--------|
| (empty) | All restrictions |
| `allow-scripts` | Run scripts |
| `allow-same-origin` | Treat as same origin |
| `allow-forms` | Submit forms |
| `allow-popups` | Open popup windows |
| `allow-presentation` | Use Presentation API |

```html
<!-- Most permissive (avoid when possible) -->
<iframe
  src="https://example.com"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  title="Untrusted content"
></iframe>
```

## `srcdoc` Attribute

Embeds inline HTML instead of loading from a URL.

```html
<iframe
  srcdoc="<h2>Hello from inside an iframe</h2><p>This content is inline.</p>"
  title="Inline iframe"
></iframe>
```

## Embedding YouTube Videos

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video player"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy"
></iframe>
```

### YouTube Player Parameters

```html
<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&controls=1"
  title="YouTube video"
  allow="autoplay; encrypted-media"
></iframe>
```

| Parameter | Effect |
|-----------|--------|
| `autoplay=1` | Auto-play on load |
| `rel=0` | Limit related videos |
| `controls=1` | Show player controls |
| `loop=1` | Loop the video |
| `mute=1` | Mute by default |

## Embedding Google Maps

```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!..."
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Google Maps location"
></iframe>
```

## Responsive iframe (CSS)

```css
.responsive-iframe {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
}

.responsive-iframe iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

```html
<div class="responsive-iframe">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video" loading="lazy"></iframe>
</div>
```

## Practice

1. Embed a YouTube video with a responsive wrapper
2. Add a Google Maps iframe showing a location
3. Create a sandboxed iframe with limited permissions
4. Experiment with `srcdoc` to create an inline iframe with HTML content
