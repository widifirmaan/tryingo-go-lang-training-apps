# Form Validation

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 8:** Form Validation

## Learning Objectives

- Validation attributes: required, minlength, maxlength
- Number validation: min, max, step
- Pattern validation with regex
- Built-in HTML5 validation: email, url, tel
- title attribute for error tooltip messages

---

## Program: Form with Validation

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Validasi Form</title>
</head>
<body>
    <h1>Form dengan Validasi HTML5</h1>

    <form novalidate>
        <p>
            <label for="username">Username (3-20 karakter):</label><br>
            <input type="text" id="username" name="username"
                   required minlength="3" maxlength="20"
                   pattern="[a-zA-Z0-9_]+"
                   title="Hanya huruf, angka, dan underscore">
            <span class="hint">3-20 karakter, alphanumeric + underscore</span>
        </p>

        <p>
            <label for="email2">Email:</label><br>
            <input type="email" id="email2" name="email"
                   required placeholder="email@example.com">
        </p>

        <p>
            <label for="umur">Umur (13-120):</label><br>
            <input type="number" id="umur" name="umur"
                   required min="13" max="120" step="1">
        </p>

        <p>
            <label for="website">Website:</label><br>
            <input type="url" id="website" name="website"
                   placeholder="https://example.com">
        </p>

        <p>
            <label for="telepon">Telepon:</label><br>
            <input type="tel" id="telepon" name="telepon"
                   pattern="[0-9]{10,13}"
                   placeholder="08123456789">
        </p>

        <p>
            <label for="password2">Password (min 8, ada huruf besar & angka):</label><br>
            <input type="password" id="password2" name="password"
                   required minlength="8"
                   pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
                   title="Min 8 karakter, harus ada huruf besar dan angka">
        </p>

        <p>
            <label for="konfirmasi">Konfirmasi Password:</label><br>
            <input type="password" id="konfirmasi" name="konfirmasi" required>
        </p>

        <p>
            <label for="cari">Cari:</label><br>
            <input type="search" id="cari" name="cari"
                   aria-label="Cari konten">
        </p>

        <button type="submit">Kirim</button>
    </form>
</body>
</html>
```

---

## Key Concepts

### Required & Length
`required` mandatory. `minlength` and `maxlength` character limits.

### Numbers
`min`, `max`, `step` for number and range inputs.

### Pattern (Regex)
`pattern="[a-zA-Z0-9_]+"` validates with regular expression.

### Built-in Types
`type="email"`, `type="url"`, `type="tel"` have automatic validation.

### Title & Hint
`title` for error tooltip. Add span.hint for guidance.

---

## Beginner Friendly Explanation

Validation = rules so data is **correct before it is sent**. Imagine a doorman checking tickets.

- `required` = must be filled in.
- `minlength`/`maxlength` = character count limits.
- `min`/`max`/`step` = number limits.
- `type="email"`, `type="url"`, `type="tel"` = the browser automatically checks the format.
- `pattern` = checks against a pattern (e.g. `pattern="[0-9]{10,13}"` means 10-13 digits). `title` = the help text shown when the pattern fails.

**Try:** type a username with only 2 letters (even though `minlength="3"`) and click Submit — see the browser error message.

---

## Experiments

- Try pattern for student ID validation
- Create password validation with complex pattern
- Experiment min and max on date input
- Add input with multiple patterns
- Create form with all validation types

---

## Challenge

Build a login form with complete validation: email format, password strength, and password confirmation.

---

## Summary

Week 8 of 14: **Form Validation** (Level: Complete HTML5). Input security. Next week: **Semantic HTML**.
