# Validasi Form

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 8:** Validasi Form

## Tujuan Pembelajaran

- Atribut validasi: required, minlength, maxlength
- Validasi angka: min, max, step
- Validasi pattern dengan regex
- Validasi email, url, tel bawaan HTML5
- title attribute untuk pesan error tooltip

---

## Program: Form dengan Validasi

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

## Konsep Kunci

### Required & Length
`required` wajib diisi. `minlength` dan `maxlength` batas karakter.

### Angka
`min`, `max`, `step` untuk input number dan range.

### Pattern (Regex)
`pattern="[a-zA-Z0-9_]+"` validasi dengan regular expression.

### Tipe Bawaan
`type="email"`, `type="url"`, `type="tel"` punya validasi otomatis.

### Title & Hint
`title` untuk tooltip error. Tambah span.hint untuk panduan.

---

## Penjelasan untuk Pemula

Validasi = aturan agar data **benar sebelum dikirim**. Bayangkan penjaga pintu yang memeriksa tiket masuk.

- `required` = wajib diisi.
- `minlength`/`maxlength` = batas jumlah karakter.
- `min`/`max`/`step` = batas angka.
- `type="email"`, `type="url"`, `type="tel"` = browser otomatis memeriksa formatnya.
- `pattern` = memeriksa cocok dengan pola tertentu (misal `pattern="[0-9]{10,13}"` berarti 10-13 digit angka). `title` = teks bantuan yang tampil saat pola gagal.

**Coba:** Ketik username hanya 2 huruf (padahal `minlength="3"`) lalu klik Kirim — lihat pesan error dari browser.

---

## Eksperimen

- Coba pattern untuk validasi NIM/NPM
- Buat validasi password dengan pattern kompleks
- Eksperimen min dan max pada input date
- Tambah input dengan multiple pattern
- Buat form dengan semua jenis validasi

---

## Tantangan

Buat form login dengan validasi lengkap: email format, password strength, dan konfirmasi password.

---

## Ringkasan

Minggu 8 dari 14: **Validasi Form** (Level: HTML5 Lengkap). Keamanan input. Minggu depan: **Semantic HTML**.
