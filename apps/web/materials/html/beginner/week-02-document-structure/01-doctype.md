# DOCTYPE Declaration & HTML Element Structure

## The `<!DOCTYPE html>` Declaration

Every HTML5 document must begin with a DOCTYPE declaration. It tells the browser to render the page in standards mode rather than quirks mode.

```html
<!DOCTYPE html>
```

### Why It Matters

| Mode | Behavior |
|------|----------|
| Standards Mode | Browser renders according to modern CSS specifications |
| Quirks Mode | Browser emulates old IE behavior for backward compatibility |
| Almost Standards | Minor quirks; vertical sizing behaves differently |

Without a DOCTYPE, browsers may switch to quirks mode, causing layout inconsistencies.

## The `<html>` Element

The `<html>` element is the root element of every HTML document. All other elements are descendants of it.

### The `lang` Attribute

Always specify the document language using the `lang` attribute on the `<html>` tag. This benefits accessibility (screen readers), search engines, and browser translation features.

```html
<!DOCTYPE html>
<html lang="en">
  <!-- content -->
</html>
```

Common language codes:

| Code | Language |
|------|----------|
| `en` | English |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `ja` | Japanese |
| `ar` | Arabic |
| `zh` | Chinese |

### Complete Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- visible content goes here -->
</body>
</html>
```

## Practice

1. Create an HTML document with `lang="en"`.
2. Create another document with `lang="es"` (Spanish).
3. Experiment by removing the DOCTYPE and observe how browser DevTools show the rendering mode.
