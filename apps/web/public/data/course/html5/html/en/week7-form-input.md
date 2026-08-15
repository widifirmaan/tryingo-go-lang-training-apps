# Forms & Inputs

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 7:** Forms & Inputs

## Learning Objectives

- Form elements: action, method, fieldset, legend
- Input types: text, email, password, date, file
- Select and option for dropdowns
- Radio buttons and checkboxes for choices
- Textarea for long text, label for accessibility

---

## Program: Registration Form

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Form Registrasi</title>
</head>
<body>
    <h1>Form Registrasi</h1>

    <form action="/register" method="POST">
        <fieldset>
            <legend>Data Pribadi</legend>

            <p>
                <label for="nama">Nama Lengkap:</label><br>
                <input type="text" id="nama" name="nama" required placeholder="Masukkan nama">
            </p>

            <p>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required placeholder="email@example.com">
            </p>

            <p>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required minlength="8">
            </p>

            <p>
                <label for="tanggal">Tanggal Lahir:</label><br>
                <input type="date" id="tanggal" name="tanggal_lahir">
            </p>
        </fieldset>

        <fieldset>
            <legend>Preferensi</legend>

            <p>
                <label for="kota">Kota:</label><br>
                <select id="kota" name="kota">
                    <option value="">-- Pilih Kota --</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                    <option value="surabaya">Surabaya</option>
                </select>
            </p>

            <p>
                <label>Jenis Kelamin:</label><br>
                <input type="radio" id="lk" name="gender" value="laki">
                <label for="lk">Laki-laki</label><br>
                <input type="radio" id="pr" name="gender" value="perempuan">
                <label for="pr">Perempuan</label>
            </p>

            <p>
                <label>Hobi:</label><br>
                <input type="checkbox" id="baca" name="hobi" value="baca">
                <label for="baca">Membaca</label><br>
                <input type="checkbox" id="olahraga" name="hobi" value="olahraga">
                <label for="olahraga">Olahraga</label><br>
                <input type="checkbox" id="musik" name="hobi" value="musik">
                <label for="musik">Musik</label>
            </p>

            <p>
                <label for="bio">Bio:</label><br>
                <textarea id="bio" name="bio" rows="4" cols="40" placeholder="Ceritakan tentang Anda..."></textarea>
            </p>

            <p>
                <label for="foto">Foto Profil:</label><br>
                <input type="file" id="foto" name="foto" accept="image/*">
            </p>

            <p>
                <input type="checkbox" id="setuju" name="setuju" required>
                <label for="setuju">Saya setuju dengan syarat dan ketentuan</label>
            </p>

            <p>
                <button type="submit">Daftar</button>
                <button type="reset">Reset</button>
            </p>
        </fieldset>
    </form>
</body>
</html>
```

---

## Key Concepts

### Form Structure
`<form action="url" method="POST">` — action = destination, method = GET/POST.

### Input Types
`text`, `email`, `password`, `date`, `file`, `number`, `tel`, `url`.

### Select & Option
`<select><option value="x">Label</option></select>`.

### Radio & Checkbox
Radio: same name, different value. Checkbox: same name, multiple values.

### Label & Accessibility
`<label for="id">` connects to input via id.

---

## Beginner Friendly Explanation

A form is a web form, like a registration form: text boxes, choices, and a submit button.

- `<form>` = the container. `<input>` = a text box; its type is set by `type` (text, email, password, date, file).
- `<select>` + `<option>` = a dropdown menu.
- `<textarea>` = a long text box.
- Radio = pick **one** of several. Checkbox = pick **many**.
- `<label for="id">` connects the caption to its input box — always include it for easy clicking and screen readers.

**Try:** Fill in the "Registration Form" program and click Register — notice the browser rejects required boxes that are empty.

---

## Experiments

- Add input type="range" for slider
- Create form with autocomplete="off"
- Try input type="color" for color picker
- Add datalist for custom autocomplete
- Create multi-step form with different fieldsets

---

## Challenge

Build a complete checkout form: address, payment, order items, with all input types.

---

## Summary

Week 7 of 14: **Forms & Inputs** (Level: Complete HTML5). User interaction. Next week: **Form Validation**.
