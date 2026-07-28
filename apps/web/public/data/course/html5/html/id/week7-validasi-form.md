# Validasi Form

> HTML5 | Modul 7

## Tujuan Pembelajaran

- Menerapkan validasi HTML5 built-in: required, minlength, pattern
- Menggunakan atribut min, max, step untuk input number
- Menampilkan pesan error kustom dengan Constraint Validation API
- Memvalidasi email dan URL secara otomatis
- Mencegah submit form yang tidak valid

---

## Program: Validasi Cerdas

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

## Penjelasan

Berikut penjelasan detail materi:

### Validasi Built-in
`required` — field wajib. `minlength` / `maxlength` — panjang teks. `min` / `max` — batas angka. `pattern` — regex. `type` — validasi otomatis (email, url, number).

### Constraint Validation API
`checkValidity()` — cek semua field. `validationMessage` — pesan error. `setCustomValidity()` — pesan error kustom.

### Pseudoclass CSS
`:valid` — field valid. `:invalid` — field tidak valid. `:required` — field wajib. Gunakan untuk styling.

### Pesan Error
Browser menampilkan pesan otomatis. Gunakan `title` pada `pattern` untuk petunjuk. Kustomisasi dengan JavaScript.

---

## Eksperimen

Tambah pola regex untuk validasi username (huruf dan angka saja),Gunakan input type="url" untuk validasi website,Implementasi validasi password harus mengandung angka,Tampilkan pesan error kustom untuk setiap field

---

## Tantangan

Buat form registrasi dengan validasi ketat: username (huruf kecil dan angka, 5-20 karakter), password (min 8, harus mengandung huruf kapital, huruf kecil, angka), konfirmasi password, nomor telepon (format Indonesia: +62), dan tanggal lahir. Tampilkan pesan error kustom untuk setiap field.

---

## Ringkasan

Validasi form memastikan data yang dikirim sesuai dengan yang diharapkan. HTML5 menyediakan validasi built-in yang kuat tanpa perlu JavaScript. Modul selanjutnya: **HTML Semantik** — elemen yang memberi makna pada struktur halaman.
