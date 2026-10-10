# HTML Introduction and Document Structure

> **Category:** HTML5 | **Level:** HTML Basics | **Week 1:** HTML Introduction and Document Structure
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand what HTML is and its role as the foundational skeleton of web pages
- Understand how web browsers parse and render HTML documents
- Master syntax anatomy: angle brackets (< >), opening tags, content, closing tags, and void tags
- Distinguish between class attributes (group labels) and id attributes (unique identifiers)
- Set up a local development workspace with VS Code and Live Server (Quick Start)
- Deconstruct standard document structure: <!DOCTYPE html>, <html>, <head>, and <body>
- Use View Page Source (Ctrl + U) and Inspect Element (F12) to inspect webpage source code

---

## 1. What is HTML?

**HTML** stands for **HyperText Markup Language**:
- **HyperText:** Text that contains clickable links to navigate to other documents or web pages.
- **Markup:** Annotating plain text with specialized tags so browsers understand their role (heading, paragraph, list, image, or button).
- **Language:** A standardized set of rules understood by all web browsers worldwide (Chrome, Firefox, Safari, Edge).

> HTML **is not a programming language**. It does not perform mathematical computations, memory operations, or conditional branching (*if-else*). HTML is a **markup language** responsible for structuring documents.

### How Web Browsers Work
The primary purpose of a web browser is to read HTML documents and display them correctly:
1. The browser parses HTML code sequentially from top to bottom.
2. **Browsers never display HTML tags directly on screen**. They use tags as layout and formatting instructions.
3. Example: When encountering `<h1>Title</h1>`, the browser renders the word "Title" in large, bold text rather than showing the literal `<h1>` tag.

---

## 2. Syntax Anatomy: Angle Brackets, Tags, and Elements

All HTML directives are written inside **angle brackets** (`<` and `>`).

```text
       Opening Tag                   Text Content             Closing Tag
     ┌───────────┐             ┌───────────────────┐        ┌───────────┐
     │   <p>     │             │ Learning HTML is  │        │   </p>    │
     └───────────┘             │  super easy!      │        └───────────┘
           │                   └───────────────────┘              │
           └─────────────────────────────┬────────────────────────┘
                                         ▼
                               One Complete Element
                                  (HTML Element)
```

### HTML Element Anatomy Table:
| Start Tag | Content | End Tag | Element Type |
|---|---|---|---|
| `<h1>` | Welcome | `</h1>` | Normal Element |
| `<p>` | This is a text paragraph. | `</p>` | Normal Element |
| `<a href="contact.html">` | Contact Us | `</a>` | Element with Attributes |
| `<br>` | *none* | *none* | **Void / Empty Element** |
| `<hr>` | *none* | *none* | **Void / Empty Element** |

Tags without text content that do not require closing tags are called **Void Elements** (e.g., `<br>`, `<hr>`, `<img>`, `<meta>`).

---

## 3. HTML Document Structure Diagram

HTML documents follow a hierarchical nested structure:

```text
┌────────────────────────────────────────────────────────┐
│ <html> (Root Element - Encapsulates Whole Document)    │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <head> (Configuration & Behind-the-scenes Data)  │  │
│  │   <meta charset="UTF-8">                         │  │
│  │   <title>Browser Tab Title</title>               │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <body> (Visible Viewport Canvas)                 │  │
│  │   <h1>Page Heading</h1>                          │  │
│  │   <p>Page body paragraph.</p>                    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

- **`<!DOCTYPE html>`**: First line declaration informing browsers to use modern HTML5 parsing.
- **`<html lang="en">`**: Top root element. The `lang="en"` attribute specifies English as the primary document language.
- **`<head>`**: Houses technical metadata. Content inside head **does not appear on the visible page**, but configures tab titles, charset, and search engine parameters.
- **`<body>`**: Visible rendering canvas. All text, images, tables, and buttons visible to users reside inside this tag.

---

## 4. Attributes: Class and ID

Attributes provide extra configuration on elements, placed inside the opening tag using the format `name="value"`.

### Differences Between Class and ID:
- **`class`**: Reusable grouping label. A class name can be applied to dozens of elements across the same document. Example: `<p class="note">`.
- **`id`**: Unique identifier. Must be strictly **unique per page** (only 1 element can bear a given ID). Example: `<header id="main-header">`.

---

## 5. Quick Start Guide: Project Setup

Before writing code, configure your development environment:

### 1. VS Code Editor and Extensions
- Download and install [Visual Studio Code](https://code.visualstudio.com/).
- Open the Extensions tab (`Ctrl + Shift + X`) and install **Live Server** (`ritwickdey.liveserver`).
- Live Server automatically refreshes your browser when you save HTML files.

### 2. Scaffold Folder and Files
Create a new directory `my-website` and an entrypoint `index.html`:
```bash
mkdir my-website && cd my-website
touch index.html
```

### 3. Running the Project
1. Open the `my-website` folder in VS Code.
2. Open `index.html`.
3. Right-click inside the editor and choose **"Open with Live Server"**.
4. The page will load at `http://127.0.0.1:5500/index.html`.

---

## 6. Developer Tools in Browsers
You can inspect the source code of any live webpage:
- **View Page Source (`Ctrl + U`):** Shows raw HTML returned from the web server.
- **Inspect Element (`F12` or Right-click -> Inspect):** Opens browser Developer Tools to inspect DOM elements and styles live.

---

## 7. Short History of HTML
- **1989:** Tim Berners-Lee invents the World Wide Web (WWW).
- **1991:** Tim Berners-Lee releases the initial HTML specification.
- **1999:** HTML 4.01 specification released.
- **2014:** W3C formally standardizes HTML5 with cleaner doctypes and semantic elements.

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Live Server** (`ritwickdey.liveserver`): Launch local dev server with auto-reload
- **Auto Close Tag** (`formulahendry.auto-close-tag`): Automatically add closing HTML tags

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ritwickdey.liveserver --install-extension formulahendry.auto-close-tag
```

---

### 2. Runtime & Dependency Installation (Web Browser (Chrome, Firefox, Safari, Edge))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install Google.Chrome
```

**macOS (Terminal / Homebrew):**
```bash
brew install --cask google-chrome
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install google-chrome-stable
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

> 💡 **Prerequisite Note:** HTML runs natively in any browser with zero compilers or backend required.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-website && cd my-website
touch index.html
```
- **Details:** Create a project folder and add index.html as the primary document.
- **Navigate to the project directory:**
```bash
cd my-website
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
Klik Kanan index.html -> "Open with Live Server"
```
Open in browser or terminal: `http://127.0.0.1:5500/index.html`

> ℹ️ The webpage opens automatically in your default browser.

**Initial Entry File (`index.html`):**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Semantik</title>
</head>
<body style="font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px;">
  <header>
    <h1>🌐 Selamat Datang di Web Semantik</h1>
  </header>
  <main>
    <article>
      <h2>Mengapa HTML5 Semantik Penting?</h2>
      <p>Tag seperti &lt;header&gt;, &lt;main&gt;, &lt;article&gt;, dan &lt;footer&gt; membuat web ramah SEO dan mudah dibaca oleh screen reader (aksesibilitas).</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2026 - Dibuat dengan Tryngo HTML5 Track</p>
  </footer>
</body>
</html>
```
Complete semantic HTML5 document boilerplate.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-website/
├── index.html       # Dokumen struktur web
├── styles.css       # File stylesheet
└── images/          # Direktori gambar & aset
```
Standard architecture for static web pages.

---

### 6. Beginner Tips & Best Practices
- Type `!` and hit `Tab` in VS Code to generate an instant HTML5 boilerplate.
- Always include the `alt` attribute on `<img>` tags for screen readers and SEO.

---

## Program: First Valid HTML Document Structure

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Profil Alex</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px; }
    h1 { color: #0f172a; margin-bottom: 6px; }
    .status-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: bold; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header id="header-utama">
    <h1>Alex Pratama</h1>
    <span class="status-badge">Terbuka untuk Proyek Web</span>
  </header>

  <main>
    <section class="card">
      <h2>Tentang Saya</h2>
      <p>Halo! Saya sedang mempelajari dasar-dasar <strong>HTML</strong> untuk membangun website yang rapi dan terstruktur.</p>
    </section>

    <section class="card">
      <h2>Target Pembelajaran Minggu Ini</h2>
      <p>Memahami struktur tag, membedakan class dan id, serta menyiapkan file index.html pertama.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Dibuat dengan HTML standar.</p>
  </footer>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 1: `<!DOCTYPE html>` informs browsers to parse under HTML5 standards.
- Line 2: `<html lang="en">` wraps all document content with English language metadata.
- Line 3-15: `<head>` defines UTF-8 encoding, mobile viewport, tab title, and styling rules.
- Line 16-36: `<body>` contains visual elements: header, main, sections, and footer.
- The attribute `id="header-utama"` uniquely identifies the header element.
- The attribute `class="card"` is reused across both sections to provide identical container styling.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 1 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Omitting closing tags (e.g. writing `<p>Text` without `</p>`).
- Placing visual body content inside `<head>` (all visible elements belong in `<body>`).
- Reusing the same ID across multiple elements on one page (IDs must remain unique).

---

## Summary

- Week 1 (HTML Introduction and Document Structure) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
