# Introduction to HTML5: Web Foundations, Tag Anatomy, Document Structure & Quick Start

> **Category:** HTML5 | **Level:** Structure & Web Semantics | **Week 1:** HTML Introduction, Tag Anatomy, Document Structure & Quick Start
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step from zero)


## Learning Objectives

- Understand what HTML is and its fundamental role as the architectural skeleton of all web pages worldwide
- Master syntax anatomy: angle brackets (`< >`), opening tags, content, closing tags, and self-closing tags
- Learn attributes, values, and the critical roles of `class` and `id` for grouping and styling elements
- Set up your local development workspace with VS Code, a modern browser, and Live Server (Quick Start)
- Deconstruct the standard HTML document hierarchy: `<!DOCTYPE html>`, root `<html>`, `<head>`, and `<body>`
- Explore essential content elements: headings, paragraphs, lists, images, links, container `<div>`, and semantic sectioning
- Build a complete, functional personal portfolio webpage from scratch that runs instantly in browsers and the Tryngo Playground

---

## 1. What is HTML? Definition & Core Web Philosophy

**HTML** stands for **HyperText Markup Language**:
- **HyperText:** Digital text connected to other pages via clickable links (*hyperlinks*). When you click a link and navigate to another page, you are using the power of HyperText.
- **Markup:** The practice of "annotating" plain text with specialized markers so computer web browsers understand its role—whether text is a primary heading, a paragraph, an image, a button, or a list.
- **Language:** A standardized set of rules understood by every web browser in the world (such as Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge).

> 💡 **Key Concept to Remember:**  
> HTML **is not a programming language**. It does not perform mathematical calculations, conditional logic (*if-else*), or store mutable memory variables. HTML is a **structural markup language** whose sole job is to define and organize the anatomy of a document.

### The Three Pillars of the Web: Human Anatomy & Buildings
Every modern website is powered by three core technologies working in unison:
1. **HTML (Skeleton & Walls):** The skull, ribcage, and internal organs. HTML defines that there is a head (`<header>`), a body (`<main>`), arms, and feet (`<footer>`). Without HTML, nothing exists on screen.
2. **CSS (Face, Skin, & Clothing):** Hair color, fashion, makeup, room paint, and layout aesthetics. CSS beautifies the raw HTML skeleton.
3. **JavaScript (Muscles & Behavior):** Nerves and muscles that allow the body to jump, respond to clicks, open modal popups, and fetch live data without refreshing the page.

---

## 2. Syntax Anatomy: Angle Brackets (`< >`), Tags, & Elements

All HTML instructions are written using **angle brackets**—the less-than `<` and greater-than `>` symbols.

Browsers parse files from top to bottom. When encountering normal text like `Hello World`, it renders plain text. But when it encounters angle brackets like `<p>`, it recognizes an **actionable markup instruction**.

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

### Components of an HTML Element:
1. **Opening Tag:** Begins with `<`, followed by the tag name, and ends with `>`, for example `<p>`. Marks where the element begins.
2. **Content:** The text or nested elements located between the opening and closing tags.
3. **Closing Tag:** Matches the opening tag, but includes a forward slash (`/`) before the tag name, for example `</p>`. The slash commands the browser: *"This paragraph element ends here!"*
4. **Element:** The combined whole of the opening tag, content, and closing tag.

### Self-Closing & Void Tags
Not all elements contain text content. Some elements immediately insert an asset or instruction, requiring **no closing tag**:
- `<br>` : Inserts a line break.
- `<hr>` : Inserts a horizontal rule divider.
- `<img src="..." alt="...">` : Embeds an image.
- `<meta>` : Embeds metadata instructions inside `<head>`.

---

## 3. Attribute Anatomy: Values, Class, and ID

Tags often require supplementary data to function. These pieces of information are called **HTML Attributes**.

Attributes are **always placed inside the opening tag** before the closing `>` bracket, following the standard syntax: `name="value"`.

```html
<p class="description-text" id="primary-paragraph">Hello everyone!</p>
```

### Why Do We Need the `class` Attribute?
Imagine you have 10 buttons on a webpage, and you want all 10 to share the exact same emerald green color and rounded corners.
- Rather than configuring each button individually, you attach a **shared grouping label** to each: `class="btn-green"`.
- **The `class` attribute is reusable** across hundreds of different elements on a single page.
- An element can even belong to multiple classes simultaneously by separating them with spaces: `class="card shadow rounded"`.

### Comparison: `class` vs `id`:
| Feature | `class` Attribute | `id` Attribute |
|---|---|---|
| **Purpose** | Shared classification label | Unique identifier (like a Passport / ID number) |
| **Usage Frequency** | Reusable across countless elements | **Strictly unique** (only 1 element per ID per page) |
| **Primary Use Case** | Consistent CSS styling and grouping | In-page bookmark links (`#about`) or targeted JS logic |
| **Example** | `<section class="feature-box">` | `<header id="main-header">` |

---

## 4. Quick Start Guide: Setup & Project Initialization

Before you start coding, prepare your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Live Server** (`ritwickdey.liveserver`): Launches a local dev server with real-time auto-reload on file save
- **Auto Close Tag** (`formulahendry.auto-close-tag`): Automatically adds matching closing tags as you type

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ritwickdey.liveserver --install-extension formulahendry.auto-close-tag
```

---

### 2. Runtime & Dependency Installation (Web Browser)
HTML does not require a compiler, special backend, or command-line runtime. You only need a modern web browser to execute your code:

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
Run this in terminal to confirm your editor is ready:
```bash
code --version
```

Expected output:
```output
1.9x.x
```

> 💡 **Prerequisite Note:** HTML is parsed directly by your web browser's rendering engine. No compilation step is required.

---

### 3. Initializing a Blank Project (Scaffolding)
Create your project workspace directory and primary entry file:

```bash
mkdir my-website && cd my-website
touch index.html
```
- **Details:** Creates a dedicated directory and generates `index.html` as the entrypoint.
- **Navigate to the project directory:**
```bash
cd my-website
```

---

### 4. Running the Local Dev Server & First Entry File
Open your `my-website` folder in VS Code, then open `index.html`:

```bash
Right-Click index.html -> Select "Open with Live Server"
```
Open in browser or terminal: `http://127.0.0.1:5500/index.html`

> ℹ️ Your webpage opens automatically in your default browser. Every time you save with `Ctrl + S`, the browser instantly refreshes (*Hot Reload*).

---

### 5. New Project Directory Structure
Standard file and folder anatomy for a beginner web project:

```text
my-website/
├── index.html       # Default root webpage loaded by web servers
├── css/             # Stylesheet folder (optional)
│   └── style.css
├── js/              # JavaScript interactivity folder (optional)
│   └── script.js
└── images/          # Image assets (logos, profile photos)
    └── profile.png
```
The filename `index.html` is a universal web server convention. Web servers automatically serve `index.html` as the default landing page whenever visitors visit your domain.

---

### 6. Beginner Tips & Best Practices
- **Boilerplate Shortcut:** In an empty `.html` file in VS Code, simply type `!` and press `Tab` or `Enter` to auto-generate the complete HTML5 structure!
- **Always Close Your Tags:** Ensure every opened tag has its matching closing tag to avoid broken layouts.
- **Use Lowercase Tags:** Always write tags and attributes in lowercase (`<p>`, never `<P>`).

---

## 5. Deconstructing the HTML File Hierarchy

Here is the foundational scaffold present in every standard HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Welcome to my first website.</p>
</body>
</html>
```

Let's dissect each layer:

### A. The `<!DOCTYPE html>` Declaration
- **What is it?** The very first line of any valid modern HTML file.
- **Function:** Informs the browser: *"Please parse and render this document using modern HTML5 standards!"*
- Without it, browsers fall back into legacy **quirks mode**, causing 1990s layout inconsistencies.

### B. The Root Element `<html lang="en">`
- **What is it?** The top-level root container encapsulating all HTML code.
- **Attribute `lang="en"`:** Informs search engines and screen-readers that the primary language is English, enabling accurate text-to-speech pronunciation and automated translation.

### C. The `<head>` Block: Behind-the-Scenes Metadata
Contents inside `<head>` **ARE NOT DISPLAYED DIRECTLY ON THE VISIBLE WEB PAGE**. It acts like an envelope carrying technical directives:
1. `<meta charset="UTF-8">`: Universal character encoding. Enables accurate rendering of Latin letters, Chinese, Arabic, mathematical symbols, and emojis (😀, 🚀, 💻).
2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: The foundation of responsive design! Commands mobile browsers to match viewport width with physical screen width at a 1:1 scale.
3. `<title>My First Website</title>`: Defines the title displayed on the **browser tab** and search engine results.

### D. The `<body>` Block: The Visual Canvas
The `<body>` represents the visible stage. **Everything inside `<body>` is rendered onto the user's screen**.

---

## 6. Core Elements Inside `<body>`

Inside `<body>`, we assemble elements to construct rich content:

### 1. Heading Hierarchy (`<h1>` to `<h6>`)
HTML provides 6 levels of headings:
- `<h1>`: The primary topic of the page. **Best Practice:** Exactly **one** `<h1>` per page for clean SEO.
- `<h2>`: Major section headings (e.g., "About Me", "My Services").
- `<h3>`: Sub-topics within `<h2>` sections.
- `<h4>`, `<h5>`, `<h6>`: Granular sub-headings.

### 2. Paragraphs & Text Formatting
- `<p>`: Standard body paragraphs.
- `<strong>`: Bold text indicating strong semantic importance.
- `<em>`: Italicized text indicating vocal emphasis.

### 3. Semantic Sectioning
Instead of relying solely on generic `<div>` boxes, HTML5 provides semantic landmarks:
- `<header>`: Introductory header containing branding and top navigation.
- `<nav>`: Navigation links.
- `<main>`: Central, unique content of the page (only one `<main>` per document).
- `<section>`: Thematic groupings of content.
- `<article>`: Self-contained independent pieces of content (e.g., blog posts, project cards).
- `<aside>`: Auxiliary sidebar content.
- `<footer>`: Closing footer containing copyright, contact links, and legal notes.

### 4. Utility Containers (`<div>` and `<span>`)
- `<div class="...">`: Generic block container used for grouping items for CSS layout.
- `<span class="...">`: Generic inline container used for styling isolated words within a paragraph.

### 5. Media, Links, and Lists
- `<a href="https://example.com" target="_blank">`: Clickable links.
- `<img src="photo.jpg" alt="Profile Picture">`: Images (`alt` provides accessibility fallback).
- `<ul>` and `<li>`: Unordered bulleted lists.
- `<ol>` and `<li>`: Ordered numbered lists.

---

## Program: Complete Starter Project — Personal Developer Portfolio

Here is a full, valid, self-contained HTML5 webpage integrating all discussed concepts: angle brackets, tag pairs, `<head>` metadata, semantic landmarks, and clean `class` attributes.

You can preview, edit, and experiment with this code directly in the Playground on the right:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio • Alex Rivera</title>
  <style>
    /* Clean integrated styling for instant visual preview */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background-color: #0f172a; color: #f8fafc; line-height: 1.6; padding: 24px 16px; }
    .container { max-width: 720px; margin: 0 auto; }
    .site-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 16px; margin-bottom: 24px; }
    .brand-logo { font-size: 20px; font-weight: bold; color: #10b981; }
    .nav-links { display: flex; gap: 16px; list-style: none; }
    .nav-links a { color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 500; }
    .nav-links a:hover { color: #38bdf8; }
    .hero-section { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #334155; border-radius: 16px; padding: 28px; margin-bottom: 24px; }
    .badge { display: inline-block; background: #065f46; color: #34d399; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
    .hero-title { font-size: 28px; font-weight: 800; margin-bottom: 8px; color: #ffffff; }
    .hero-desc { color: #cbd5e1; font-size: 15px; margin-bottom: 18px; }
    .btn-action { display: inline-block; background: #10b981; color: #022c22; font-weight: bold; padding: 8px 18px; border-radius: 8px; text-decoration: none; font-size: 14px; }
    .section-title { font-size: 20px; margin-bottom: 16px; color: #38bdf8; border-left: 4px solid #38bdf8; padding-left: 10px; }
    .content-box { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin-top: 10px; }
    .skills-list li { background: #334155; color: #f1f5f9; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; }
    .project-card { border-left: 3px solid #10b981; padding-left: 14px; margin-bottom: 16px; }
    .project-card h3 { font-size: 16px; color: #f8fafc; }
    .project-card p { font-size: 13px; color: #94a3b8; }
    .site-footer { text-align: center; border-top: 1px solid #334155; padding-top: 20px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">

    <!-- 1. HEADER & TOP NAVIGATION -->
    <header class="site-header">
      <div class="brand-logo">Alex.dev</div>
      <nav>
        <ul class="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
        </ul>
      </nav>
    </header>

    <!-- 2. MAIN DOCUMENT CONTENT -->
    <main>
      <!-- Hero Intro Banner -->
      <section class="hero-section">
        <span class="badge">Open for Freelance</span>
        <h1 class="hero-title">Hi, I'm Alex Rivera 👋</h1>
        <p class="hero-desc">
          Junior Frontend Developer crafting clean, accessible, and high-performance websites using <strong>Semantic HTML5</strong> and modern web fundamentals.
        </p>
        <a href="mailto:alex@example.com" class="btn-action">Contact Me</a>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="content-box">
        <h2 class="section-title">Technical Skills</h2>
        <p>Core web technologies I use to build modern browser experiences:</p>
        <ul class="skills-list">
          <li>Semantic HTML5</li>
          <li>Modern CSS3</li>
          <li>JavaScript ES6</li>
          <li>Git & GitHub</li>
          <li>Responsive Web Design</li>
        </ul>
      </section>

      <!-- Featured Projects Section -->
      <section id="projects" class="content-box">
        <h2 class="section-title">Featured Projects</h2>
        
        <article class="project-card">
          <h3>Tryngo Education Platform</h3>
          <p>Created interactive coding curriculum modules structured for accessibility and screen reader navigation.</p>
        </article>

        <article class="project-card">
          <h3>Local Restaurant Showcase</h3>
          <p>Engineered a responsive menu landing page featuring semantic typography and SEO-optimized markup.</p>
        </article>
      </section>
    </main>

    <!-- 3. FOOTER -->
    <footer class="site-footer">
      <p>&copy; 2026 Alex Rivera. Built with pure HTML5 on Tryngo.</p>
    </footer>

  </div>
</body>
</html>
```

---

## Detailed Code Breakdown (Tags, Brackets, & Classes)

1. **Tag Pairs and Nesting:**
   - Every container like `<header>` has its matching `</header>`, preventing elements from overflowing into lower sections.
2. **The `class` Attribute for Reusable Styling:**
   - `.container` constrains content width on large monitors.
   - `.project-card` is used across **both project articles**. Because they share the same class, both items automatically inherit matching emerald accent borders (`border-left`) without duplicate CSS declarations!
3. **The `id` Attribute for Anchor Navigation:**
   - In `<header>`, notice `<a href="#skills">Skills</a>`.
   - Lower on the page, we have `<section id="skills">`.
   - Clicking that link in your browser immediately scrolls the window directly to the target element.
4. **Semantic Architecture:**
   - Replacing generic `<div>` wrappers with `<header>`, `<main>`, `<article>`, and `<footer>` clarifies content roles for search engines and assistive software.

---

## Key Concepts

### 1. Tags vs Elements vs Attributes
- **Tag:** Syntax tokens enclosed in angle brackets (`<p>` or `</p>`).
- **Element:** The complete unit consisting of the opening tag, content, and closing tag: `<p class="lead">Hello World</p>`.
- **Attribute:** Configuration settings defined inside the opening tag: `class="lead"`.

### 2. Core Best Practices
- **Proper Nesting:** Close inner elements before outer elements:
  - ✅ Correct: `<strong><em>Important Note</em></strong>`
  - ❌ Incorrect: `<strong><em>Important Note</strong></em>`
- **Use Lowercase:** Always write `<section>`, never `<SECTION>`.
- **Quote All Attribute Values:** Write `class="card"`, not `class=card`.

---

## Beginner Explanation

### Analogy: Official Postal Registration Form
Think of an HTML document like an official government registration form:
1. **`<!DOCTYPE html>`** is the official postal seal in the upper corner confirming this is the current official edition.
2. **`<head>`** is the *"For Office Use Only"* section: tracking barcodes and filing codes not read by the applicant, but critical for the post office.
3. **`<body>`** is the actual form text you fill out and read.
4. **Tags `<h1>` through `<p>`** are the form titles and question prompts.
5. **Classes** are highlighter colors: all warning fields highlighted in yellow (`class="warning"`), and all signatures outlined in red (`class="signature"`).

---

## Playground Experiments

Try these modifications in the Playground panel to the right:
1. **Personalize Your Name:** Change the text inside `<h1>Hi, I'm Alex Rivera 👋</h1>` to your own name.
2. **Add a New Skill:** Insert a new `<li>` item inside `<ul class="skills-list">`, such as `<li>Figma Prototyping</li>`. Watch it instantly appear with uniform pill styling!
3. **Create a Third Project Card:** Duplicate one of the `<article class="project-card">` blocks and customize the title and description for your own dream project.
4. **Deliberate Error Test:** Delete the closing bracket `>` or omit `</main>` to observe how the browser behaves.

---

## Hands-On Challenge

Create a brand-new HTML document featuring:
1. A valid `<!DOCTYPE html>`, `<html>`, and `<head>` with your favorite café's `<title>`.
2. Inside `<body>`, a `<header>` with an `<h1>Café Name</h1>` and `<p>Tagline</p>`.
3. A `<main>` containing two `<section>` blocks:
   - First section: A coffee beverage menu using `<ul>` and `<li>`.
   - Second section: Address and operating hours using `<p class="hours">`.
4. A `<footer>` displaying copyright information.

---

## Native Syntax Reference Catalog (W3Schools Style)

### 1. `<!DOCTYPE html>`
- **Primary Function:** Informs browser engines to use modern HTML5 rendering standards.
- **Placement:** First line of the document before any tags.
- **Effect:** Eliminates quirks mode rendering inconsistencies.

### 2. `<html lang="...">`
- **Primary Function:** Root container encapsulating the entire document.
- **Key Attributes:** `lang="en"` (English) or `lang="id"` (Indonesian).
- **Effect:** Sets document language for automated translation tools and screen readers.

### 3. `<head>` and `<title>`
- **Primary Function:** Houses technical metadata and browser tab titles.
- **Mandatory Children:** `<meta charset="UTF-8">`, `<meta name="viewport" ...>`, `<title>`.
- **Effect:** Invisible on the main visual viewport canvas.

### 4. `<body>`
- **Primary Function:** The visible rendering canvas for all user-facing content.
- **Permitted Children:** All text elements, structural landmarks, links, images, tables, and forms.

### 5. Attributes `class` and `id`
- **Primary Function:** Identification and grouping hooks for CSS selectors and JavaScript logic.
- **Key Distinction:** `class` is reusable across many elements; `id` is strictly unique per page.

---

## Common Pitfalls & Debugging

1. **Missing Slash on Closing Tags:**
   - Writing `<p>Hello<p>` instead of `<p>Hello</p>` leads to unclosed elements.
2. **Mixed Capitalization:**
   - Writing `<Div Class="Card">` is invalid practice. Always use clean lowercase: `<div class="card">`.
3. **Multiple `<h1>` Headings:**
   - Having multiple `<h1>` elements on a single page harms Google SEO rankings. Keep to one `<h1>` per page.
4. **Placing Body Content Inside `<head>`:**
   - Never put visible elements like `<p>` or `<h1>` inside `<head>`. All visible content belongs strictly in `<body>`.

---

## Summary

- **HTML** provides structural page architecture, working alongside **CSS** (presentation) and **JavaScript** (behavior).
- Syntax consists of **angle brackets (`< >`)**, **opening tags**, **content**, and **closing tags (`</...>`)**.
- Content-free elements like `<img>` and `<br>` are **void tags** and require no closing tag.
- The `class` attribute provides reusable styling labels, while `id` identifies a single unique element.
- Every valid HTML document follows the hierarchy: `<!DOCTYPE html>`, root `<html>`, metadata `<head>`, and visible `<body>`.
- Next week, we'll dive deeper into semantic text hierarchies, inter-page navigation links, and typographic structure!
