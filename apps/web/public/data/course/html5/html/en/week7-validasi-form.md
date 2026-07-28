# Form Validation

> HTML5 | Module 7

## Learning Objectives

- Apply HTML5 built-in validation: required, minlength, pattern
- Use min, max, step attributes for number inputs
- Show custom error messages with Constraint Validation API
- Validate email and URLs automatically
- Prevent invalid form submission

---

## Program: Smart Validation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Validasi Form</title>
</head>
<body>
  <h1>Form Validasi HTML5</h1>
  <form id="daftar">
    <fieldset>
      <legend>Validasi Otomatis</legend>
      <p>
        <label for="nama">Nama (min 3 karakter):</label>
        <input type="text" id="nama" name="nama" required minlength="3" maxlength="50" placeholder="Min. 3 huruf">
      </p>
      <p>
        <label for="email">Email (format valid):</label>
        <input type="email" id="email" name="email" required placeholder="contoh@email.com">
      </p>
      <p>
        <label for="website">Website (URL valid):</label>
        <input type="url" id="website" name="website" placeholder="https://contoh.com">
      </p>
      <p>
        <label for="umur">Umur (18-100 tahun):</label>
        <input type="number" id="umur" name="umur" min="18" max="100" required>
      </p>
      <p>
        <label for="telp">Telepon (10-13 digit):</label>
        <input type="tel" id="telp" name="telp" pattern="[0-9]{10,13}" required placeholder="081234567890">
        <small>Hanya angka, 10-13 digit</small>
      </p>
      <p>
        <label for="password">Password (min 8 karakter):</label>
        <input type="password" id="password" name="password" required minlength="8">
      </p>
      <p>
        <label for="tgl">Tanggal Acara:</label>
        <input type="date" id="tgl" name="tgl" required>
      </p>
      <p>
        <label for="kuantitas">Kuantitas (1-10):</label>
        <input type="range" id="kuantitas" name="kuantitas" min="1" max="10" value="1">
        <output id="qtyDisplay">1</output>
      </p>
      <p>
        <label for="warna">Pilih Warna:</label>
        <input type="color" id="warna" name="warna" value="#E34F26">
      </p>
    </fieldset>
    <p>
      <button type="submit">Kirim</button>
      <button type="reset">Reset</button>
    </p>
  </form>
  <p id="errorMsg" style="color:#c00"></p>

  <script>
    document.getElementById("kuantitas").addEventListener("input", function() {
      document.getElementById("qtyDisplay").textContent = this.value;
    });
    document.getElementById("daftar").addEventListener("submit", function(e) {
      if (!this.checkValidity()) {
        document.getElementById("errorMsg").textContent = "Mohon perbaiki input yang tidak valid.";
        e.preventDefault();
      } else {
        document.getElementById("errorMsg").textContent = "✓ Data valid!";
      }
    });
    document.getElementById("daftar").addEventListener("reset", function() {
      document.getElementById("errorMsg").textContent = "";
    });
  </script>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### Built-in Validation
`required` — mandatory field. `minlength` / `maxlength` — text length. `min` / `max` — number limits. `pattern` — regex. `type` — automatic validation (email, url, number).

### Constraint Validation API
`checkValidity()` — check all fields. `validationMessage` — error message. `setCustomValidity()` — custom error message.

### CSS Pseudoclasses
`:valid` — valid field. `:invalid` — invalid field. `:required` — required field. Use for styling.

### Error Messages
Browser shows automatic messages. Use `title` on `pattern` for hints. Customize with JavaScript.

---

## Experiments

Add a regex pattern for username validation (letters and numbers only),Use input type="url" for website validation,Implement password must contain a number,Show custom error messages for each field

---

## Challenge

Create a registration form with strict validation: username (lowercase letters and numbers, 5-20 chars), password (min 8, must contain uppercase, lowercase, number), password confirmation, phone number (Indonesia format: +62), and date of birth. Show custom error messages for each field.

---

## Summary

Form validation ensures submitted data meets expectations. HTML5 provides powerful built-in validation without needing JavaScript. Next module: **Semantic HTML** — elements that give meaning to page structure.
