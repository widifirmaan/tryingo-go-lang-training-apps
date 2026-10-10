# Formulir dan Validasi Input

> **Kategori:** HTML5 | **Level:** Form dan Interaksi | **Minggu 5:** Formulir dan Validasi Input
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami anatomi formulir: <form action="..." method="..."> dan keterkaitan <label for="..."> dengan <input id="...">
- Menguasai berbagai tipe input: text, email, password, number, tel, date, radio, checkbox, dan file
- Menggunakan tag input pendukung: <select>, <option>, <optgroup>, <textarea>, dan tombol <button type="submit">
- Mengelompokkan bagian form menggunakan <fieldset> dan <legend>
- Menyediakan fitur autocomplete menggunakan tag <datalist>
- Menerapkan validasi bawaan browser: required, min, max, pattern, dan placeholder

---

## 1. Anatomi Elemen Formulir (<form>)

Formulir digunakan untuk mengumpulkan data dari pengguna dan mengirimkannya ke server:
- **`<form action="/kirim" method="POST">`**:
  - `action`: Alamat URL server tujuan data dikirim.
  - `method`: Metode pengiriman (`GET` untuk pencarian, `POST` untuk data rahasia/panjang).

### Keterkaitan <label> dan <input>:
Setiap input **wajib memiliki label** agar ramah aksesibilitas. Hubungkan atribut `for` pada label dengan `id` pada input:
```html
<label for="input-email">Alamat Email:</label>
<input type="email" id="input-email" name="email" required>
```
Saat pengguna mengklik teks label, kursor otomatis aktif di dalam kotak input.

---

## 2. Beragam Tipe Input (<input>)
- `type="text"`: Teks satu baris standar.
- `type="email"`: Memvalidasi format email secara otomatis saat disubmit.
- `type="password"`: Menyembunyikan karakter teks yang diketik.
- `type="number"`: Hanya menerima angka, dapat diberi batas `min` dan `max`.
- `type="radio"`: Pilihan tunggal (harus memiliki atribut `name` yang sama).
- `type="checkbox"`: Pilihan ganda (centang kotak).
- `type="date"`: Pemilih kalender tanggal bawaan browser.

---

## 3. Tag Pendukung: Select, Textarea, Fieldset, dan Datalist
- **`<select>` & `<option>`**: Dropdown pilihan.
- **`<textarea rows="4">`**: Kotak teks panjang untuk pesan atau catatan.
- **`<fieldset>` & `<legend>`**: Membingkai kelompok input terkait secara rapi dan aksesibel.
- **`<datalist>`**: Menampilkan saran dropdown otomatis saat mengetik di input biasa.

---

## 4. Validasi Bawaan Browser
Browser modern dapat memvalidasi form tanpa perlu menulis kode JavaScript:
- `required`: Input wajib diisi sebelum form dapat disubmit.
- `placeholder="..."`: Teks contoh yang memudar di dalam kotak input.
- `pattern="[0-9]{10,12}"`: Memvalidasi format teks menggunakan pola regular expression (misal nomor telepon).

---

## Program: Formulir Permintaan Layanan dengan Validasi Bawaan

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

## Bedah Detail Kode Program

- Line 28: `<form action="#" method="POST">` membungkus seluruh input data pengguna.
- Line 29-40: `<fieldset>` dan `<legend>` mengelompokkan input informasi kontak.
- Line 31: Atribut `for="nama"` terhubung ke input dengan `id="nama"`.
- Line 46-54: Tag `<select>` menyediakan menu dropdown dengan nilai opsi `<option>`.
- Line 56-59: `<textarea rows="4">` menyediakan kotak input teks multi-baris.
- Line 62: `<button type="submit">` memicu proses submit dan validasi form.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 5 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa menulis atribut `name` pada input (data input tidak akan terkirim ke server tanpa atribut `name`).
- Menulis atribut `for` pada label yang tidak cocok dengan atribut `id` pada input.
- Lupa memberikan tag pembuka `<form>` sehingga tombol submit tidak berfungsi.

---

## Ringkasan

- Modul Minggu 5 (Formulir dan Validasi Input) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
