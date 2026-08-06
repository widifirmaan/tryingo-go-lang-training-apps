# Form & Input

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 7:** Form & Input

## Tujuan Pembelajaran

- Elemen form: action, method, fieldset, legend
- Input types: text, email, password, date, file
- Select dan option untuk dropdown
- Radio button dan checkbox untuk pilihan
- Textarea untuk teks panjang, label untuk aksesibilitas

---

## Program: Form Registrasi

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

## Konsep Kunci

### Struktur Form
`<form action="url" method="POST">` — action = tujuan, method = GET/POST.

### Input Types
`text`, `email`, `password`, `date`, `file`, `number`, `tel`, `url`.

### Select & Option
`<select><option value="x">Label</option></select>`.

### Radio & Checkbox
Radio: sama name, beda value. Checkbox: sama name, multiple value.

### Label & Aksesibilitas
`<label for="id">` terhubung ke input via id.

---

## Eksperimen

- Tambah input type="range" untuk slider
- Buat form dengan autocomplete="off"
- Coba input type="color" untuk pilih warna
- Tambah datalist untuk autocomplete custom
- Buat form multi-step dengan fieldset berbeda

---

## Tantangan

Buat form checkout lengkap: alamat, pembayaran, item pesanan, dengan semua jenis input.

---

## Ringkasan

Minggu 7 dari 14: **Form & Input** (Level: HTML5 Lengkap). Interaksi pengguna. Minggu depan: **Validasi Form**.
