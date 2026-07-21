# Browser DevTools & Editors

## Chrome DevTools Overview

Chrome DevTools is a set of web developer tools built into the Chrome browser. Press `F12` or `Ctrl+Shift+I` to open it.

### Elements Panel

Inspect and modify the HTML and CSS of any page in real time.

```html
<!-- Open DevTools → Elements tab -->
<!-- You'll see the page's HTML tree like this: -->
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Click on any element to select it</p>
  </body>
</html>

<!-- Try: right-click any text on a webpage → Inspect -->
```

### Console Panel

The Console lets you run JavaScript and see errors or log messages.

```html
<!-- Open DevTools → Console tab -->
<!-- Type this and press Enter: -->
<!-- console.log("Hello from DevTools!"); -->
```

### Network Panel

Shows all network requests the browser makes — HTML, CSS, images, API calls.

```html
<!-- Open DevTools → Network tab -->
<!-- Refresh the page -->
<!-- You'll see each resource: -->
<!-- - index.html        Status: 200 -->
<!-- - style.css         Status: 200 -->
<!-- - photo.jpg         Status: 200 -->
```

## VS Code Setup

VS Code is a free code editor with excellent HTML support.

### Recommended Extensions

- **Live Server** — Right-click HTML → Open with Live Server (auto-reloads on save)
- **Prettier** — Auto-formats your code
- **HTML CSS Support** — Intellisense for CSS classes

### Creating Your First Project

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>My DevTools Test</title>
</head>
<body>
    <h1>Testing DevTools</h1>
    <p>Open this page, then press F12 to inspect it.</p>
    <ul>
        <li>Inspect this list in the Elements panel</li>
        <li>Try editing text directly in the browser</li>
    </ul>
</body>
</html>
```

## Live Preview

Live Server creates a local development server and refreshes the browser automatically when you save changes.

### Using Live Server

1. Install the Live Server extension in VS Code
2. Right-click your `index.html` file
3. Select **Open with Live Server**
4. A browser tab opens at `http://127.0.0.1:5500`

```html
<!-- Save this file while Live Server is running -->
<!-- The browser will refresh automatically -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Live Server Demo</title>
</head>
<body>
    <h1>Edit this heading</h1>
    <p>Change this text and save — the page updates instantly!</p>
</body>
</html>
```

## Practice

1. Open Chrome DevTools on any webpage (press F12)
2. Go to the **Elements** tab and edit some text directly in the browser
3. Go to the **Network** tab and refresh the page — observe the list of requests
4. Install Live Server in VS Code and open an HTML file with it
5. Make a change to the HTML file, save it, and watch the browser auto-reload
