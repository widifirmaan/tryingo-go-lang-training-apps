# Pengantar HTML

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 1:** Pengantar HTML

## Tujuan Pembelajaran

- Memahami peran HTML sebagai bahasa markup struktur web
- Mengenal struktur dasar dokumen HTML5: DOCTYPE, html, head, body
- Memahami sistem tag: opening tag, closing tag, dan content
- Menggunakan elemen heading h1-h6 untuk hierarki judul
- Menggunakan elemen paragraf p untuk teks konten

---

## Program: Halaman Pertama

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Pertama Saya</title>
</head>
<body>
    <h1>Selamat Datang di HTML!</h1>
    <p>Ini adalah halaman web pertama saya.</p>
    <p>HTML adalah bahasa markup untuk membuat struktur halaman web.</p>
</body>
</html>
```

---

## Konsep Kunci

### Struktur Dokumen HTML5
`<!DOCTYPE html>` memberitahu browser ini dokumen HTML5. `<html>` adalah root element. `<head>` berisi metadata, `<body>` berisi konten visible.

### Tag & Elemen
Tag: `<p>` (opening) dan `</p>` (closing). Elemen = opening + content + closing.

### Heading & Paragraf
`<h1>` terbesar (utama), `<h6>` terkecil. `<p>` untuk paragraf teks.

---

## Penjelasan untuk Pemula

Materi ini untuk orang yang benar-benar baru. Anggap HTML seperti **kerangka rumah**: kita tentukan tata letak ruangannya, lalu browser yang mengecat dan mengisinya.

**3 istilah yang wajib dipahami dulu:**

1. **Tag** — perintah yang diapit `<` dan `>`. Contoh `<p>` = mulai paragraf, `</p>` = akhir paragraf.
2. **Elemen** — pasangan tag + isinya. `<p>Halo</p>` adalah satu elemen paragraf.
3. **Dokumen** — halaman lengkap diawali `<!DOCTYPE html>` (memberi tahu browser "ini HTML versi 5"), lalu `<html>`, lalu dibagi menjadi `<head>` (pengaturan, tidak terlihat) dan `<body>` (yang tampil di layar).

**Baca program minggu ini langkah demi langkah:**
- Baris 1: `<!DOCTYPE html>` — penanda yang dibaca browser.
- Baris 2: `<html lang="id">` — akar seluruh dokumen; `lang` memberi tahu bahasanya.
- Baris 5-8: `<head>` berisi `meta charset` (agar huruf Indonesia terbaca) dan `title` (judul tab browser).
- Baris 10-14: `<body>` berisi `h1` (judul besar) dan dua `p` (paragraf).

**Tips:** Jangan hafal semua tag. Salin kodenya ke playground, ubah teksnya, lalu jalankan — melihat hasilnya langsung adalah cara tercepat memahami fungsi tiap tag.

---

## Eksperimen

- Tambah heading level berbeda (h2, h3) di bawah h1
- Buat multiple paragraf dengan teks berbeda
- Ubah atribut lang dari "id" ke "en"
- Tambah meta description di dalam head
- Eksperimen dengan tag self-closing seperti <br> dan <hr>

---

## Tantangan

Buat halaman profil sederhana: nama, foto placeholder, biodata singkat, dan hobi. Gunakan heading, paragraf, br, dan hr.

---

## Ringkasan

Minggu 1 dari 14: **Pengantar HTML** (Level: HTML5 Lengkap). Fondasi setiap halaman web. Minggu depan: **Format Teks & Tipografi**.
