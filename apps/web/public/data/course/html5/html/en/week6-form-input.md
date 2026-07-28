# Forms & Input

> HTML5 | Module 6

## Learning Objectives

- Create forms with GET and POST methods
- Master various input types: text, email, password, number
- Use labels for form accessibility
- Create dropdowns with select and option
- Group forms with fieldset and legend

---

## Program: Registration Form

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Pendaftaran</title>
</head>
<body>
  <h1>Pendaftaran Kursus</h1>
  <form onsubmit="event.preventDefault(); alert('Pendaftaran berhasil! (Demo)');">
    <fieldset>
      <legend>Data Pribadi</legend>
      <p><label for="nama">Nama Lengkap:</label> <input type="text" id="nama" name="nama" required></p>
      <p><label for="email">Email:</label> <input type="email" id="email" name="email" required></p>
      <p><label for="telp">Telepon:</label> <input type="tel" id="telp" name="telp" placeholder="0812-xxxx-xxxx"></p>
      <p><label for="tgl">Tanggal Lahir:</label> <input type="date" id="tgl" name="tgl"></p>
    </fieldset>

    <fieldset>
      <legend>Pilihan Kursus</legend>
      <p><label for="kursus">Pilih Kursus:</label>
        <select id="kursus" name="kursus">
          <optgroup label="Frontend">
            <option value="html">HTML5</option>
            <option value="css">CSS3</option>
            <option value="js">JavaScript</option>
          </optgroup>
          <optgroup label="Backend">
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </optgroup>
        </select>
      </p>
      <p>Level:
        <label><input type="radio" name="level" value="beginner" checked> Pemula</label>
        <label><input type="radio" name="level" value="intermediate"> Menengah</label>
        <label><input type="radio" name="level" value="advanced"> Lanjutan</label>
      </p>
      <p>Fitur Tambahan:
        <label><input type="checkbox" name="fitur" value="sertifikat"> Sertifikat</label>
        <label><input type="checkbox" name="fitur" value="mentor"> Mentor Pribadi</label>
      </p>
    </fieldset>

    <fieldset>
      <legend>Informasi Tambahan</legend>
      <p><label for="pesan">Catatan:</label><br>
        <textarea id="pesan" name="pesan" rows="4" cols="50" placeholder="Tulis pesan..."></textarea>
      </p>
      <p><label for="warna">Warna Favorit:</label> <input type="color" id="warna" name="warna" value="#E34F26"></p>
      <p><label for="file">Upload CV:</label> <input type="file" id="file" name="file" accept=".pdf,.docx"></p>
    </fieldset>

    <p>
      <button type="submit">Kirim Pendaftaran</button>
      <button type="reset">Reset</button>
    </p>
  </form>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### Form Element
`<form>` — input container. Attributes: `action` (target URL), `method` (GET/POST). GET for search, POST for sensitive data.

### Input Types
`text` — plain text. `email` — email validation. `password` — hidden characters. `number` — numbers. `tel` — phone. `date` — date picker. `color` — color picker. `file` — file upload. `range` — slider. `radio` — single choice. `checkbox` — multiple choice.

### Label
Always use `<label>` for accessibility. Connect with `for` attribute matching input `id`.

### Select & Textarea
`<select>` — dropdown. `<optgroup>` — option groups. `<textarea>` — multi-line text.

---

## Experiments

Add an input type="range" field for rating,Use method="GET" and see the URL after submit,Add autofocus attribute to the name input,Create a form with fieldsets for 3 different categories

---

## Challenge

Create a complete course registration page with: personal data (name, email, phone, date of birth), course selection (checkbox with 6 options), skill level (radio buttons), city (dropdown with optgroup per province), CV upload, and additional notes. Use fieldsets for each category.

---

## Summary

Forms are the gateway for user interaction with websites. Various input types, labels, selects, and fieldsets allow you to collect data with good structure. Next module: **Form Validation** — how to ensure submitted data is valid.
