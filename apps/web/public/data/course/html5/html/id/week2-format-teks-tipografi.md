# Format Teks & Tipografi

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 2:** Format Teks & Tipografi

## Tujuan Pembelajaran

- Elemen format inline: strong, em, u, s, mark, code
- Elemen semantik teks: blockquote, q, cite, abbr, time
- Subscript dan superscript: sub, sup untuk formula
- Elemen preformatted: pre untuk kode dan teks terformat
- Elemen kutipan: blockquote, q, cite untuk referensi

---

## Program: Artikel Berita

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Artikel Berita</title>
</head>
<body>
    <article>
        <h1><strong>Pentingnya</strong> <em>Belajar HTML</em></h1>
        <p>Ditulis oleh <mark>Redaksi</mark> | <time datetime="2026-08-06">6 Agustus 2026</time></p>
        <hr>
        <p>HTML adalah <abbr title="HyperText Markup Language">HTML</abbr> — fondasi web.</p>
        <p>Ini teks <strong>tebal</strong>, <em>miring</em>, <u>garis bawah</u>, dan <s>coret</s>.</p>
        <p>Rumus air: H<sub>2</sub>O. Pangkat: x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup></p>
        <blockquote>
            <p>"Web adalah untuk semua orang, bukan untuk sebagian orang."</p>
            <footer>— Tim Berners-Lee</footer>
        </blockquote>
        <pre>
function halo() {
    console.log("Halo, Dunia!");
}
        </pre>
        <code>const x = 42;</code>
    </article>
</body>
</html>
```

---

## Konsep Kunci

### Format Inline
`<strong>` penting (bold), `<em>` penekanan (italic), `<mark>` highlight, `<code>` kode inline.

### Kutipan
`<blockquote>` kutipan blok, `<q>` kutipan inline, `<cite>` sumber.

### Pre & Code
`<pre>` pertahankan spasi dan line break. `<code>` untuk kode inline.

---

## Penjelasan untuk Pemula

Minggu ini tentang memberi **gaya** pada kata. Bayangkan seperti menyorot kata di buku catatan.

**Kata-kata penting:**
- `<strong>` = teks penting, tampil **tebal**. `<em>` = penekanan, tampil *miring*. `<mark>` = seperti stabilo. `<u>` = garis bawah, `<s>` = coret.
- `<sub>` = huruf kecil di bawah (misal H₂O, angka 2 di bawah), `<sup>` = huruf kecil di atas (x², angka 2 di atas).
- `<blockquote>` = kutipan panjang, tampil menjorok. `<q>` = kutipan pendek di dalam satu baris.
- `<pre>` = teks apa adanya: spasi dan baris baru dipertahankan persis, jadi bagus untuk menampilkan kode.

**Coba di playground:** Ubah kata di antara `<strong>` dan `<em>`, lalu jalankan — bandingkan tampilan tiap tag sampai hafal bedanya.

---

## Eksperimen

- Buat paragraf dengan semua format inline berbeda
- Tambah blockquote dengan cite untuk artikel
- Coba pre dengan kode lebih panjang
- Eksperimen sub dan sup dengan formula matematika
- Buat daftar isi dengan abbr untuk istilah teknis

---

## Tantangan

Buat halaman artikel blog lengkap: judul, penulis, tanggal, paragraf dengan format, blockquote, kode, dan footer.

---

## Ringkasan

Minggu 2 dari 14: **Format Teks & Tipografi** (Level: HTML5 Lengkap). Kaya ekspresi dalam teks. Minggu depan: **Link & Navigasi**.
