# Format Teks & Tipografi — Spanduk Warung yang Menarik

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 2:** Format Teks & Tipografi

## Tujuan Pembelajaran

- Tebalkan yang penting `<strong>` (bukan `<b>`), miringkan penekanan `<em>` (bukan `<i>`)
- Stabilo `<mark>`, garis bawah `<u>`, coret `<s>`, kecil bawah/atas `<sub>/<sup>` untuk H₂O dan x²
- Kutipan `<blockquote>` menjorok dan `<q>` dalam baris, plus `<abbr>` singkatan
- Tampilkan kode apa adanya `<pre>` + `<code>` agar spasi tidak hilang

---

## Kenapa Ini Penting Buat Kamu?

Spanduk warung " **GRATIS ONGKIR** " harus tebal, " *syarat berlaku* " miring, " H₂O " angka kecil bawah. Tanpa format, semua teks rata — pelanggan tidak lihat yang penting. Minggu ini bikin spanduk yang mata langsung tangkap promo.

---

## Program: Spanduk Promo Warung

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Promo Warung</title>
</head>
<body>
  <article style="font-family: sans-serif; max-width: 600px;">
    <h1><strong>Gratis Ongkir</strong> <em>Syarat Berlaku</em></h1>
    <p>Ditulis oleh <mark>Bu Siti</mark> | <time datetime="2026-08-25">25 Agustus 2026</time></p>
    <hr>

    <p>Ini <strong>tebal penting</strong>, <em>miring penekanan</em>, <u>garis bawah</u>, <s>coret harga lama Rp 70.000</s> → <mark>Rp 62.000</mark></p>

    <p>Rumus: Air H<sub>2</sub>O, Pangkat x<sup>2</sup></p>
    <p><abbr title="Warung Bu Siti">WBS</abbr> buka tiap hari.</p>

    <blockquote>
      <p>"Warung yang jujur, pelanggan betah."</p>
      <footer>— Bu Siti</footer>
    </blockquote>

    <p>Kode promo:</p>
    <pre><code>GRATIS-ONGKIR-2026</code></pre>
  </article>
</body>
</html>
```

---

## Konsep Kunci

### `<strong>` vs `<b>`, `<em>` vs `<i>`
- `<strong>` = penting (dibaca screen reader tegas), `<b>` hanya tebal visual — pakai `<strong>`
- `<em>` = penekanan, `<i>` hanya miring — pakai `<em>`

### `<mark>`, `<u>`, `<s>`
`mark` stabilo kuning, `u` garis bawah, `s` coret (harga lama).

### `<sub>`/`<sup>` dan `<abbr>`
`H<sub>2</sub>O` bawah, `x<sup>2</sup>` atas, `abbr` singkatan hover.

### `<blockquote>` vs `<q>` vs `<pre>`
- `blockquote` kutipan blok menjorok
- `q` kutipan dalam baris pakai kutip otomatis
- `pre` pertahankan spasi/baris + `code` untuk kode inline `const x = 1`

---

## Penjelasan untuk Pemula

### Analogi: Spanduk Pasar

- **`<strong>` = spidol tebal**: "GRATIS" tebal biar dari jauh kelihatan.
- **`<em>` = suara ditekankan**: "syarat *berlaku*".
- **`<mark>` = stabilo**: kuning untuk "Bu Siti".
- **`<sub>/<sup>` = angka kecil**: H₂O angka 2 kecil bawah.

### Cara Komputer Membaca

1. `<strong>Gratis</strong>` → browser tebalkan + screen reader baca tegas.
2. `<pre>GRATIS` → browser jangan rapikan spasi, tampil apa adanya.

### 3 Istilah Wajib

1. **Inline**: format dalam baris (`strong`, `em`) tidak bikin baris baru.
2. **Blockquote**: kutipan blok menjorok.
3. **Pre**: preformatted.

---

## Eksperimen

- **Hijau:** Ganti `<strong>Gratis Ongkir</strong>` jadi nama warungmu → tebal?
- **Kuning:** `H<sub>2</sub>O` ganti jadi `CO<sub>2</sub>` → bawah?
- **Merah:** Tulis `<b>` bukan `<strong>` → tetap tebal tapi screen reader tidak tegas (cek di `Konsep Kunci`).

---

## Tantangan

**Spanduk Warung Lengkap:** Judul `H1` **Promo**, penulis `mark` + `time`, paragraf dengan `strong/em/u/s`, `H2O` + `x2`, `blockquote` testimoni pelanggan, `pre+code` kode promo `WARUNG10`.

Kriteria: `strong/em/mark` + `sub/sup` + `blockquote` + `pre` semua ada, buka di browser terlihat spanduk.

---

## Glosarium Mini

- **strong/em**: penting/penekanan
- **mark/u/s**: stabilo/garis/coret
- **sub/sup**: bawah/atas
- **blockquote/q/pre**: kutipan

---

## Ringkasan

Minggu 2 dari 14: **Format Teks** (Level: Lengkap). Bisa bikin spanduk promo yang mata tangkap. Minggu depan: **Link & Navigasi** — sambung halaman warung.
