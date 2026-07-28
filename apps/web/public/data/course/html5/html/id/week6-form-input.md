# Form & Input

> HTML5 | Modul 6

## Tujuan Pembelajaran

- Membuat form dengan method GET dan POST
- Menguasai berbagai tipe input: text, email, password, number
- Menggunakan label untuk aksesibilitas form
- Membuat dropdown dengan select dan option
- Mengelompokkan form dengan fieldset dan legend

---

## Program: Form Pendaftaran

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

## Penjelasan

Berikut penjelasan detail materi:

### Elemen Form
`<form>` — wadah input. Atribut: `action` (URL tujuan), `method` (GET/POST). GET untuk pencarian, POST untuk data sensitif.

### Input Types
`text` — teks biasa. `email` — validasi email. `password` — karakter tersembunyi. `number` — angka. `tel` — telepon. `date` — tanggal. `color` — pemilih warna. `file` — upload file. `range` — slider. `radio` — pilihan satu. `checkbox` — pilihan banyak.

### Label
Selalu gunakan `<label>` untuk aksesibilitas. Hubungkan dengan `for` attribute yang cocok dengan `id` input.

### Select & Textarea
`<select>` — dropdown. `<optgroup>` — kelompok opsi. `<textarea>` — teks multi-baris.

---

## Eksperimen

Tambah field input type="range" untuk rating,Gunakan method="GET" dan lihat URL setelah submit,Tambah atribut autofocus pada input nama,Buat form dengan fieldset untuk 3 kategori berbeda

---

## Tantangan

Buat halaman pendaftaran course yang lengkap dengan: data diri (nama, email, telepon, tanggal lahir), pilihan course (checkbox dengan 6 opsi), level keahlian (radio button), kota (dropdown dengan optgroup per provinsi), upload CV, dan catatan tambahan. Gunakan fieldset untuk setiap kategori.

---

## Ringkasan

Form adalah pintu interaksi pengguna dengan website. Berbagai tipe input, label, select, dan fieldset memungkinkan Anda mengumpulkan data dengan struktur yang baik. Modul selanjutnya: **Validasi Form** — cara memastikan data yang dikirim valid.
