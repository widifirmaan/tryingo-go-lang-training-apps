# Formulir Modern: Input Types, Labeling & Validasi Bawaan

> **Kategori:** HTML5 | **Level:** Formulir Modern, Aksesibilitas & Web API | **Minggu 5:** Formulir Modern: Input Types, Labeling & Validasi Bawaan
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menghubungkan elemen <label> dengan <input> menggunakan atribut for dan id yang identik
- Mengelompokkan input terkait menggunakan <fieldset> dan memberi judul kelompok dengan <legend>
- Memanfaatkan input spesifik HTML5: type="email", type="number", type="date", dan inputmode
- Menerapkan constraint validation bawaan browser: required, minlength, pattern (RegEx), min, dan max
- Memahami fungsi autocomplete untuk mempercepat pengisian otomatis data pengguna oleh browser

---

## Program: Formulir Registrasi Klien Enterprise dengan Validasi Native

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registrasi Rekanan Bisnis — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Pendaftaran Rekanan Bisnis Enterprise</h1>
      <p>Silakan isi formulir di bawah ini. Tanda bintang (<span aria-hidden="true">*</span>) menandakan kolom wajib.</p>

      <form action="/api/v1/partners" method="POST" novalidate>
        <fieldset>
          <legend>Informasi Perusahaan</legend>

          <p>
            <label for="company-name">Nama Legal Perusahaan: <span aria-hidden="true">*</span></label><br>
            <input type="text" id="company-name" name="companyName" required minlength="3" maxlength="100" placeholder="PT Contoh Teknologi Nusantara" autocomplete="organization">
          </p>

          <p>
            <label for="work-email">Alamat Email Resmi Perusahaan: <span aria-hidden="true">*</span></label><br>
            <input type="email" id="work-email" name="workEmail" required placeholder="admin@perusahaan.co.id" autocomplete="email">
          </p>

          <p>
            <label for="tax-id">Nomor Pokok Wajib Pajak (16 Digit Angka): <span aria-hidden="true">*</span></label><br>
            <input type="text" id="tax-id" name="taxId" required pattern="\d{16}" title="NPWP harus terdiri dari tepat 16 digit angka tanpa spasi atau tanda titik." placeholder="1234567890123456" inputmode="numeric">
          </p>
        </fieldset>

        <fieldset>
          <legend>Kebutuhan Layanan & Skala Tim</legend>

          <p>
            <label for="team-size">Jumlah Pengguna Sistem:</label><br>
            <input type="number" id="team-size" name="teamSize" min="1" max="10000" value="10">
          </p>

          <p>
            <label for="target-date">Target Tanggal Peluncuran Sistem:</label><br>
            <input type="date" id="target-date" name="targetDate" min="2026-01-01">
          </p>

          <p>
            <label for="service-tier">Paket Layanan Prioritas:</label><br>
            <select id="service-tier" name="serviceTier" required>
              <option value="">-- Pilih Paket Layanan --</option>
              <option value="standard">Standard Cloud Instance</option>
              <option value="enterprise" selected>Enterprise Dedicated Cluster</option>
              <option value="custom">Bespoke Hybrid Architecture</option>
            </select>
          </p>

          <p>
            <label for="notes">Catatan Spesifikasi Tambahan:</label><br>
            <textarea id="notes" name="notes" rows="4" cols="50" placeholder="Tuliskan kebutuhan khusus infrastruktur Anda..."></textarea>
          </p>

          <p>
            <input type="checkbox" id="terms" name="agreeTerms" required>
            <label for="terms">Saya menyetujui Perjanjian Kerahasiaan (NDA) dan Kebijakan Privasi Data.</label>
          </p>
        </fieldset>

        <p>
          <button type="submit">Kirim Berkas Pendaftaran</button>
          <button type="reset">Bersihkan Formulir</button>
        </p>
      </form>
    </article>
  </main>
</body>
</html>
```

---

## Konsep Kunci

### Pasangan Wajib: Label dan ID
Jangan pernah membuat kolom input tanpa elemen `<label>`. Menghubungkan `<label for="email">` dengan `<input id="email">` memberikan dua manfaat utama:
1. Ketika pengguna mengeklik teks label, fokus kursor otomatis berpindah ke kotak input.
2. Pengguna teknologi pembaca layar mendengar instruksi nama kolom dengan jelas.

### Pengelompokan Fieldset dan Legend
Tag `<fieldset>` menciptakan batas logis antara bagian formulir (misalnya "Informasi Pribadi" vs "Detail Pembayaran"), sedangkan `<legend>` adalah judul batas tersebut yang dibacakan oleh screen reader setiap kali pengguna masuk ke dalam kelompok tersebut.

### Validasi Bawaan (Constraint Validation)
Browser modern dapat memvalidasi input tanpa bantuan JavaScript:
- `required`: Memastikan kolom tidak boleh kosong saat dikirim.
- `pattern="\d{16}"`: Memvalidasi format string menggunakan Regular Expression (misal: tepat 16 angka).
- `min` dan `max`: Menentukan batas angka terendah dan tertinggi pada `type="number"`.
- `inputmode="numeric"`: Membuka keyboard virtual numerik di perangkat smartphone.

---

---

## Penjelasan untuk Pemula

### Analogi: Formulir Paspor di Kantor Imigrasi
1. **`<label>`** adalah tulisan cetak tebal di formulir: "NAMA LENGKAP SESUAI KTP". Tanpa label, Anda hanya melihat kotak putih kosong dan bingung mau diisi apa.
2. **`id` dan `for`** adalah garis penghubung tak terlihat antara tulisan label dan kotaknya.
3. **`<fieldset>`** adalah bingkai kotak besar bertuliskan "BAGIAN II: RIWAYAT PERJALANAN".
4. **`required`** seperti petugas imigrasi yang langsung mengembalikan berkas Anda jika ada kolom bertanda bintang yang belum ditandatangani.

## Eksperimen

- Hapus atribut for pada label, klik teks label di browser, dan perhatikan bahwa kursor input tidak lagi aktif secara otomatis.
- Coba kirim formulir tanpa mengisi kolom required dan perhatikan balon peringatan validasi bawaan browser yang muncul.
- Masukkan 15 digit angka ke dalam kolom NPWP dan amati bagaimana regex pattern="\d{16}" menolak pengiriman data.
- Buka halaman ini di ponsel atau aktifkan responsive device mode di DevTools, klik input dengan inputmode="numeric" dan amati keyboard yang muncul.

---

## Tantangan

Bangun formulir "Pemesanan Tiket Pesawat": sertakan fieldset identitas penumpang (nama lengkap, paspor 8 karakter, email), fieldset rute penerbangan (kota asal, kota tujuan dengan `<select>`, tanggal berangkat `type="date"`), checkbox persetujuan bagasi, dan tombol submit.

---

## Model Mental & Diagram Alur Visual

![Diagram Struktur DOM Tree HTML5](/diagrams/dom-tree.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="id">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Tampilan)   │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Judul Web</title>│ • <main>            │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `<!DOCTYPE html>`
- **Fungsi Utama:** Deklarasi standar dokumen HTML5.
- **Parameter / Atribut:** `Wajib di baris 1`.
- **Perilaku & Efek Sistem:** Mengaktifkan rendering Standard Mode pada peramban web modern.
- **Contoh Penggunaan Praktis:**
```javascript
<!DOCTYPE html>
<html lang="id">
  <head><title>Tryngo</title></head>
</html>
```
- **Hasil Output yang Diharapkan:**
```text
Halaman dirender sesuai spesifikasi HTML5 W3C
```

### 2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Fungsi Utama:** Pengaturan viewport perangkat mobile.
- **Parameter / Atribut:** `name, content`.
- **Perilaku & Efek Sistem:** Mengatur skala layar perangkat 1:1 agar website responsif tanpa zoom bawaan yang mengecilkan font.
- **Contoh Penggunaan Praktis:**
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- **Hasil Output yang Diharapkan:**
```text
Tampilan menyesuaikan lebar layar ponsel secara otomatis
```

### 3. `<header>, <main>, <footer>`
- **Fungsi Utama:** Elemen penanda semantik (Landmark Elements).
- **Parameter / Atribut:** `Global attributes (class, id, lang)`.
- **Perilaku & Efek Sistem:** Membagi dokumen menjadi banner navigasi, konten unik utama, dan informasi kaki untuk aksesibilitas screen reader.
- **Contoh Penggunaan Praktis:**
```javascript
<header><h1>Judul Portal</h1></header>
<main><p>Konten artikel utama.</p></main>
<footer>&copy; 2026 Tryngo</footer>
```
- **Hasil Output yang Diharapkan:**
```text
Struktur dokumen terbaca jelas oleh mesin pencari & pembaca tuna netra
```

### 4. `<form action="/api" method="POST">`
- **Fungsi Utama:** Kontainer pengumpulan data pengguna.
- **Parameter / Atribut:** `action (URL), method (GET/POST)`.
- **Perilaku & Efek Sistem:** Menyediakan form interaktif untuk mengirimkan data input ke server endpoint.
- **Contoh Penggunaan Praktis:**
```javascript
<form action="/submit" method="POST">
  <input type="text" name="username" required />
  <button type="submit">Kirim</button>
</form>
```
- **Hasil Output yang Diharapkan:**
```text
Formulir interaktif siap dikirimkan ke backend
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Tag bersarang tidak tertutup (Unclosed/Mismatched Tags)
- **Gejala / Masalah:** Tata letak halaman rusak atau elemen inline menelan elemen block.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu tutup tag berpasangan dan manfaatkan validator HTML5 atau auto-closing tag di VS Code.

### 2. Penggunaan tag <div> berlebihan (Div Soup)
- **Gejala / Masalah:** Website sulit diakses pembaca layar (screen reader) dan skor SEO menurun drastis.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan tag semantik seperti <header>, <nav>, <main>, <article>, dan <footer>.

### 3. Lupa atribut 'alt' pada <img> dan 'for' pada <label>
- **Gejala / Masalah:** Skor aksesibilitas (a11y) merah dan form sulit diklik pada perangkat layar sentuh.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu sertakan deskripsi alt yang bermakna dan hubungkan label dengan id input terkait.

---

## Ringkasan

Kamu telah menguasai perancangan formulir interaktif dengan pelabelan aksesibel dan validasi native tanpa JavaScript. Minggu depan kita akan mendalami standar aksesibilitas web internasional (WCAG 2.1 AA) dan atribut ARIA.
