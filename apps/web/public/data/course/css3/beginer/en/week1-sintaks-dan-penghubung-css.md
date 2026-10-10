# CSS Introduction and Linking Stylesheets

> **Category:** CSS3 | **Level:** CSS Basics & Box Model | **Week 1:** CSS Introduction and Linking Stylesheets
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand the role of CSS in separating structure (HTML) from visual presentation
- Master the anatomy of CSS rules: selector, property, value, and declaration blocks
- Learn 3 CSS inclusion methods: external stylesheet, internal style, and inline style
- Set up standard web project file architecture (index.html and styles.css)
- Construct a fundamental CSS Reset using universal selector (*) and box-sizing

---

## 1. What is CSS and its Syntax Anatomy?

CSS (**Cascading Style Sheets**) is a declarative styling language directing browsers how to render and visually format HTML elements.

Every CSS rule adheres to a standard anatomy:

```text
   Selector       Declaration Block
   ┌──────┐  ┌─────────────────────────┐
   h1        { color: #2E5B44; font-size: 24px; }
               └─────────────┘ └──────────────┘
                  Property          Value
```

- **Selector**: Targets the HTML elements to style (e.g., `h1`, `p`, `.card`).
- **Property**: The visual aspect being adjusted (e.g., `color`, `font-size`, `background`).
- **Value**: The specific parameter assigned (e.g., `#2E5B44`, `16px`).
- **Declaration Block**: Curly braces `{ ... }` grouping declarations separated by semicolons (`;`).

---

## 2. Project File Architecture and 3 Inclusion Methods

In production development, project structure cleanly separates markup from visual presentation:

```text
my-css-project/
├── index.html       # HTML document structure
├── styles.css       # Visual presentation rules
└── images/          # Supplementary assets
```

There are 3 standard methods to connect CSS into HTML:

### A. External Stylesheet (Production Standard)
CSS rules reside in an external `styles.css` file referenced inside the HTML `<head>`:
```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```
*Benefit:* Cached across page visits and reused across hundreds of templates.

### B. Internal Style
Defined directly within `<style>` tags inside the document `<head>`:
```html
<head>
  <style>
    body { background-color: #F8FAF9; }
  </style>
</head>
```
*Benefit:* Ideal for single-page isolated prototypes or interactive playgrounds.

### C. Inline Style
Defined directly via the `style` attribute on an element:
```html
<p style="color: #2E5B44; font-weight: bold;">Directly styled text</p>
```
*Warning:* Avoid inline styles in production as they tightly couple layout with markup and break maintainability.

---

## 3. Foundational CSS Reset
Browsers apply built-in user agent stylesheets with inconsistent default margins. To ensure cross-browser uniformity, every professional project initiates with a reset:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Live Server** (`ritwickdey.liveserver`): Realtime styling preview in browser
- **HTML CSS Support** (`ecmel.vscode-html-css`): CSS class name autocomplete in HTML

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ritwickdey.liveserver --install-extension ecmel.vscode-html-css
```

---

### 2. Runtime & Dependency Installation (Web Browser & VS Code)
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
code --version
```

**macOS (Terminal / Homebrew):**
```bash
code --version
```

**Linux (Ubuntu/Debian / bash):**
```bash
code --version
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
code --version
```

Expected output:
```output
1.9x.x
```

> 💡 **Prerequisite Note:** CSS is executed directly by the browser rendering engine.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-css-project && cd my-css-project
touch index.html styles.css
```
- **Details:** Create an HTML file and link an external styles.css stylesheet.
- **Navigate to the project directory:**
```bash
cd my-css-project
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
Klik Kanan index.html -> "Open with Live Server"
```
Open in browser or terminal: `http://127.0.0.1:5500`

> ℹ️ Browser immediately renders the Flexbox layout and theme colors.

**Initial Entry File (`styles.css`):**
```css
:root {
  --primary-color: #2E5B44;
  --bg-color: #F8FAF9;
  --text-color: #1A202C;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  max-width: 400px;
  border: 1px solid #E2E8F0;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}
```
Card layout styling using CSS Custom Properties, Flexbox, and hover transitions.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-css-project/
├── index.html       # Markup halaman
└── styles.css       # Aturan tata letak & warna
```
Separation of markup structure (HTML) and visual styling (CSS).

---

### 6. Beginner Tips & Best Practices
- Use CSS Variables (`--var-name`) for frictionless dark mode switching and consistent palettes.
- Adopt a mobile-first approach using `@media (min-width: 768px)` breakpoints.

---

## Program: First CSS Project Structure with Reset and Header Banner

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Langkah Pertama CSS</title>
  <style>
    /* 1. CSS Reset Dasar */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* 2. Styling Elemen Body */
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F4F6F4;
      color: #2D3748;
      line-height: 1.6;
      padding: 24px;
    }

    /* 3. Header Banner */
    .header-banner {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 32px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 24px;
    }

    .header-banner h1 {
      font-size: 28px;
      margin-bottom: 8px;
    }

    .header-banner p {
      font-size: 16px;
      opacity: 0.9;
    }

    /* 4. Kontainer Konten */
    .konten-box {
      background-color: #FFFFFF;
      padding: 24px;
      border-radius: 8px;
      border: 1px solid #E2E8F0;
    }

    .konten-box h2 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>

  <header class="header-banner">
    <h1>Studio Web Mandiri</h1>
    <p>Membangun antarmuka terstruktur dengan standar CSS3 murni.</p>
  </header>

  <main class="konten-box">
    <h2>Langkah 1: Memisahkan Struktur dan Gaya</h2>
    <p>HTML menyediakan kerangka semantik, sementara CSS bertugas mengatur tata letak, jarak, tipografi, dan warna dokumen.</p>
  </main>

</body>
</html>
```

---

## Detailed Code Breakdown

- `* { margin: 0; padding: 0; box-sizing: border-box; }`: Universal reset removing default browser margins and securing predictable sizing.
- `body { font-family: ...; line-height: 1.6; }`: Configures system typography and vertical reading rhythm across the whole document.
- `.header-banner`: Class selector styling the forest green header card with curved 12px corners.
- `.konten-box`: White content container with subtle border frame separating text sections.
- `padding` vs `margin`: Padding creates breathing room inside containers, while margin establishes external spacing between elements.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 1 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Missing semicolon (;): Each property declaration must conclude with a semicolon, or subsequent properties will fail to parse.
- Excessive inline styles: Embedding style attributes directly into HTML destroys code maintainability as projects expand.
- Omitting rel="stylesheet" on <link>: Without the rel attribute, browsers will ignore linked CSS files.
- Mismatched curly braces: Every declaration block must be cleanly opened and closed with matching braces { }.

---

## Summary

- Week 1 (CSS Introduction and Linking Stylesheets) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
