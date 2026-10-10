# Forms and Input Validation

> **Category:** HTML5 | **Level:** Forms and Interaction | **Week 5:** Forms and Input Validation
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand form anatomy: <form action="..." method="..."> and the link between <label for="..."> and <input id="...">
- Master essential input types: text, email, password, number, tel, date, radio, checkbox, and file
- Use supplementary form tags: <select>, <option>, <optgroup>, <textarea>, and <button type="submit">
- Group related inputs using <fieldset> and <legend>
- Provide autocomplete suggestions using <datalist>
- Implement native browser validation: required, min, max, pattern, and placeholder

---

## 1. Form Element Anatomy (<form>)

Forms collect user input and transmit it to a destination endpoint:
- **`<form action="/submit" method="POST">`**:
  - `action`: Destination URL endpoint.
  - `method`: Transmission method (`GET` for searches, `POST` for private or payload data).

### Linking <label> with <input>:
Every input **must be paired with a label** for accessibility. Connect the label's `for` attribute to the input's `id`:
```html
<label for="email-field">Email Address:</label>
<input type="email" id="email-field" name="email" required>
```
Clicking the label immediately focuses the corresponding input element.

---

## 2. Core Input Types (<input>)
- `type="text"`: Standard single-line text.
- `type="email"`: Automatically validates email formatting upon submit.
- `type="password"`: Obscures typed characters.
- `type="number"`: Accepts numerical values with optional `min` and `max` constraints.
- `type="radio"`: Single-choice option (must share an identical `name` attribute).
- `type="checkbox"`: Multi-choice toggle checkbox.
- `type="date"`: Native calendar date picker.

---

## 3. Supplementary Form Elements
- **`<select>` & `<option>`**: Dropdown selector.
- **`<textarea rows="4">`**: Multi-line text field for longer messages.
- **`<fieldset>` & `<legend>`**: Visually and semantically groups related inputs.
- **`<datalist>`**: Autocomplete recommendation dropdown for standard text inputs.

---

## 4. Native Browser Validation
Modern browsers validate inputs without requiring JavaScript:
- `required`: Prevents submission if the field is empty.
- `placeholder="..."`: Ghost hint text displayed inside an empty field.
- `pattern="..."`: Validates against a regular expression pattern (e.g. phone numbers).

---

## Program: Service Inquiry Form with Native Browser Validation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hubungi Kami — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    form { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; margin-top: 16px; }
    fieldset { border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px; margin-bottom: 16px; }
    legend { font-weight: bold; padding: 0 8px; color: #0f172a; }
    .form-group { margin-bottom: 14px; }
    label { display: block; font-weight: 500; font-size: 14px; margin-bottom: 4px; }
    input[type="text"], input[type="email"], select, textarea { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
    button { background: #0284c7; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer; }
    button:hover { background: #0369a1; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Formulir Permintaan Proyek</h1>
    <p>Silakan lengkapi formulir di bawah ini untuk konsultasi pembuatan website:</p>
  </header>

  <main>
    <form action="#" method="POST">
      <fieldset>
        <legend>Informasi Kontak</legend>
        <div class="form-group">
          <label for="nama">Nama Lengkap:</label>
          <input type="text" id="nama" name="nama" placeholder="Contoh: Budi Santoso" required>
        </div>

        <div class="form-group">
          <label for="email">Alamat Email:</label>
          <input type="email" id="email" name="email" placeholder="nama@email.com" required>
        </div>
      </fieldset>

      <fieldset>
        <legend>Rincian Proyek</legend>
        <div class="form-group">
          <label for="paket">Pilihan Paket:</label>
          <select id="paket" name="paket" required>
            <option value="">-- Pilih Paket Layanan --</option>
            <option value="dasar">Paket Dasar (1-3 Halaman)</option>
            <option value="bisnis">Paket Bisnis (4-8 Halaman)</option>
            <option value="kustom">Paket Kustom (> 8 Halaman)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="pesan">Deskripsi Kebutuhan:</label>
          <textarea id="pesan" name="pesan" rows="4" placeholder="Ceritakan tujuan dan kebutuhan website Anda..." required></textarea>
        </div>
      </fieldset>

      <button type="submit">Kirim Permintaan</button>
    </form>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Berkas: <code>kontak.html</code></p>
  </footer>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 28: `<form action="#" method="POST">` encloses all interactive inputs.
- Line 29-40: `<fieldset>` and `<legend>` logically bundle user contact details.
- Line 31: Attribute `for="nama"` explicitly pairs with input `id="nama"`.
- Line 46-54: `<select>` presents a dropdown list of `<option>` entries.
- Line 56-59: `<textarea rows="4">` delivers a multi-line message field.
- Line 62: `<button type="submit">` triggers native browser form validation and submission.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 5 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Omitting the `name` attribute on inputs (servers cannot identify form fields without `name`).
- Mismatched label `for` attributes and input `id` attributes.
- Placing inputs outside of a `<form>` wrapper, disabling standard submit functionality.

---

## Summary

- Week 5 (Forms and Input Validation) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
