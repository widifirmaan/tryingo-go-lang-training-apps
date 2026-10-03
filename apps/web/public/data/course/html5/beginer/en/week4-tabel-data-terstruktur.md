# Structured Data Tables: Thead, Tbody, Scope & Captioning

> **Kategori:** HTML5 | **Level:** Structure & Web Semantics | **Minggu 4:** Structured Data Tables: Thead, Tbody, Scope & Captioning
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Recognize that <table> is reserved strictly for tabular relationships, never for layout positioning
- Provide accessible context and titles using the <caption> element
- Organize tabular data into structural partitions: <thead>, <tbody>, and <tfoot>
- Associate header cells with corresponding data points using scope="col" and scope="row"
- Properly span cells across dimensions using colspan and rowspan without breaking grid geometry

---

## Program: Semantic Financial Statement Data Table

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Kinerja Keuangan — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Transparansi Kinerja Keuangan Perusahaan</h1>
      <p>Data audit keuangan tahun berjalan yang telah diverifikasi oleh akuntan publik independen.</p>

      <table border="1">
        <caption>Laporan Pendapatan dan Alokasi Biaya Infrastruktur (Q1 - Q4 2025)</caption>
        <thead>
          <tr>
            <th scope="col">Kuartal</th>
            <th scope="col">Pendapatan Bruto (Miliar IDR)</th>
            <th scope="col">Biaya Cloud (Miliar IDR)</th>
            <th scope="col">Laba Operasional (Miliar IDR)</th>
            <th scope="col">Status Audit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Q1 2025</th>
            <td>12.4</td>
            <td>3.1</td>
            <td>9.3</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q2 2025</th>
            <td>14.8</td>
            <td>3.4</td>
            <td>11.4</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q3 2025</th>
            <td>16.2</td>
            <td>3.8</td>
            <td>12.4</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q4 2025</th>
            <td>19.5</td>
            <td>4.2</td>
            <td>15.3</td>
            <td>Dalam Proses</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total Akumulasi</th>
            <td>62.9</td>
            <td>14.5</td>
            <td>48.4</td>
            <td>Konsolidasi</td>
          </tr>
        </tfoot>
      </table>
    </article>
  </main>
</body>
</html>
```

---

## Key Concepts

### Tabular Data Principles
HTML tables exist strictly to represent two-dimensional relational datasets (metrics, schedules, financial figures). Using tables for layout purposes is an anti-pattern that severely degrades screen reader usability.

### Semantic Table Anatomy
- `<caption>`: Provides an accessible heading and overview of the dataset.
- `<thead>`: Encapsulates primary column header rows.
- `<tbody>`: Houses the primary relational data payload.
- `<tfoot>`: Wraps summary totals and aggregated statistics.

### The Scope Attribute
The `scope` attribute on `<th>` elements disambiguates directional association:
- `scope="col"`: Clarifies header ownership over all cells in that vertical column.
- `scope="row"`: Clarifies header ownership over cells along that horizontal row.
Assistive devices can thus speak contextual pairs like: *"Quarter Q1 2025, Cloud Cost: 3.1 Billion IDR"* when navigating cell coordinates.

---

---

## Beginner Friendly Explanation

### Analogy: An Audited Excel Spreadsheet
Think of an HTML table as a clean Microsoft Excel worksheet:
1. **`<caption>`** is the sheet title at the top: "Annual Budget 2026".
2. **`<thead>`** is the highlighted top header row defining columns (Item, Unit Cost, Qty).
3. **`scope="col"`** tells the machine that every cell descending below is a financial dollar value.
4. **`scope="row"`** identifies the primary entity of that row (e.g. "Dell Workstation 15").
5. **`<tfoot>`** is the bottom summary row holding your `=SUM()` totals.

## Experiments

- Remove the <caption> element and observe how the table loses its formal descriptive identity.
- Apply colspan="2" to a cell and verify how neighboring cells overflow if total grid coordinates are mismatched.
- Inspect table rendering with tfoot declared before tbody to confirm how modern browsers still place it visually at the bottom.
- Demote <th> elements to ordinary <td> tags and note the loss of both default styling and accessibility roles.

---

## Challenge

Build an airport flight departure board table: include a `<caption>`, `<thead>` with `scope="col"`, at least 4 flight records in `<tbody>` with `scope="row"` identifying flight numbers, destinations, airlines, departure times, and flight statuses.

---

## Visual Mental Model & Architecture Flow

![Diagram Struktur DOM Tree HTML5](/diagrams/dom-tree.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="en">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Visible UI) │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Document</title>│ • <main>             │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `<!DOCTYPE html>`
- **Core Functionality:** Document type preamble.
- **Parameters / Attributes:** `Must be placed on line 1`.
- **System Behavior & Return:** Instructs web browsers to render the document in modern Standard Mode, avoiding legacy Quirks Mode rendering quirks.
- **Practical Code Example:**
```javascript
<!DOCTYPE html>
<html lang="en">
  <head><title>Tryngo Platform</title></head>
</html>
```
- **Expected Execution Output:**
```text
Page renders strictly compliant with W3C HTML5 standards
```

### 2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Core Functionality:** Responsive mobile viewport configuration.
- **Parameters / Attributes:** `name, content`.
- **System Behavior & Return:** Aligns viewport coordinates 1:1 with device physical pixels, preventing mobile browsers from shrinking text.
- **Practical Code Example:**
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- **Expected Execution Output:**
```text
Layout adapts dynamically to mobile, tablet, and desktop viewports
```

### 3. `<header>, <main>, <footer>`
- **Core Functionality:** Semantic ARIA landmark structural elements.
- **Parameters / Attributes:** `Global attributes (class, id, lang)`.
- **System Behavior & Return:** Partitions documents into navigation headers, main content, and footer regions for accessibility screen readers.
- **Practical Code Example:**
```javascript
<header><h1>News Feed</h1></header>
<main><p>Primary article content.</p></main>
<footer>&copy; 2026 Tryngo</footer>
```
- **Expected Execution Output:**
```text
Provides accessible landmark navigation for screen readers and SEO crawlers
```

### 4. `<form action="/api" method="POST">`
- **Core Functionality:** Interactive user input container.
- **Parameters / Attributes:** `action (target URL), method (GET/POST)`.
- **System Behavior & Return:** Collects and packages validated user form inputs for HTTP submission to server endpoints.
- **Practical Code Example:**
```javascript
<form action="/submit" method="POST">
  <input type="text" name="username" required />
  <button type="submit">Submit</button>
</form>
```
- **Expected Execution Output:**
```text
Form inputs serialized and transmitted on submit
```


---

## Common Pitfalls & Debugging Tips

### 1. Unclosed or Mismatched Tags
- **Symptom / Issue:** Breaks page layout and causes unexpected DOM tree nesting.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always close matching pairs and validate HTML using linters or browser developer tools.

### 2. Overusing Generic <div> Containers (Div Soup)
- **Symptom / Issue:** Harms accessibility (screen readers) and lowers search engine ranking.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Prefer semantic markup elements like <header>, <nav>, <main>, <article>, and <footer>.

### 3. Missing 'alt' on Images and 'for' on Labels
- **Symptom / Issue:** Fails accessibility audits and creates bad UX on mobile touch targets.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always provide descriptive alt attributes and bind input fields explicitly to form labels.

---

## Summary

You have mastered semantic, accessible relational table authoring. Next week we enter Level 2: modern interactive forms, browser validation, and user inputs.
