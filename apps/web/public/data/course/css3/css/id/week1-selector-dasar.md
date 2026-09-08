# Selector & Basic Styling — Cat Warung Pertama

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 1:** Selector & Basic Styling

## Tujuan Pembelajaran

- 3 cara pasang cat: `style=""` (kuas langsung), `<style>` (kaleng di head), `style.css` + `<link>` (toko cat) (sumber: MDN CSS first steps)
- Bidik: `p` (semua), `.card` (kelas, titik), `#header` (satu, pagar), `.card p` (di dalam), `:hover` (saat sentuh)

---

## Kenapa Ini Penting Buat Kamu?

HTML tanpa CSS = warung bata telanjang. CSS = cat + dekor. Tanpa selector, ubah 1 paragraf harus edit 30 tempat. Dengan `.card`, 30 kartu 1 aturan.

---

## Program: Warung Bercat Pertama

`index.html` + `style.css` (2 file, cara profesional):

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Warung Bu Siti</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="header">
    <h1>Warung Bu Siti</h1>
    <p>Sayur segar tiap pagi</p>
  </div>

  <div class="card">
    <h2>Beras 5kg</h2>
    <p>Rp 62.000 — <a href="https://wa.me/62812">Pesan WA</a></p>
  </div>

  <div class="card">
    <h2>Bayam</h2>
    <p>Rp 5.000 — <a href="/produk">Lihat</a></p>
  </div>
</body>
</html>
```

```css
/* style.css — toko cat terpisah */
body { font-family: sans-serif; background: #FBF9F5; margin: 0; padding: 20px; }

#header { /* pagar = SATU saja */
  background: #2E5B44; color: white; padding: 24px;
  text-align: center; border-radius: 12px;
}

.card { /* titik = KELAS, boleh banyak */
  background: white; border-radius: 12px; padding: 16px; margin: 12px 0;
}

.card p { color: #555; } /* di dalam .card */
.card:hover { transform: translateY(-2px); } /* saat mouse sentuh */

a[href^="https"] { color: #2E5B44; font-weight: bold; } /* link luar */
```

---

## Konsep Kunci

### 3 Cara Pasang
- `style=""` kuas langsung (darurat saja).
- `<style>` kaleng di head (latihan).
- `<link href="style.css">` toko cat (produksi, bisa dipakai 10 halaman).

### Bidik: Elemen / `.kelas` / `#satu`
- `p {}` semua paragraf, `.card {}` kelas, `#header {}` satu-satunya.

### `.card p` / `:hover` / `[href^="https"]`
Di dalam / saat sentuh / atribut diawali.

### Cascade: Siapa Menang Jika Rebutan? (Inti The Odin Project!)
3 aturan (urutan penting!): **1. Specificity** — `#id` kalahkan `.class` kalahkan `p` (ingat: 100/10/1, TAPI ini cara-ingat saja — 11 class tetap kalah lawan 1 id!). **`!important` darurat saja!** **2. Urutan** — specificity sama → yang ditulis TERAKHIR menang. **3. Inheritance** — `color`/`font` di `body` turun ke anak otomatis (cek MDN: tiap properti tulis Inherited Yes/No).

```css
p { color: black; }        /* 1 */
.card p { color: #555; }   /* 1+10=11 → menang! */
#header p { color: white; } /* 100+1 → menang mutlak */
body { font-family: sans-serif; } /* anak ikut tanpa tulis ulang */
```

### Pseudo Sakti (ala freeCodeCamp Balance Sheet)
- `li:first-child` / `li:last-child` / `li:nth-child(2)` — anak ke-1/terakhir/2.
- `input:focus` — saat diketik (ganti border!). `:not(.promo)` — kecuali promo.
- `p::before { content: "★ "; }` — tempel bintang TANPA ubah HTML! (`::` = elemen palsu)

---

## Penjelasan untuk Pemula

### Analogi: Toko Cat & Stensil
- **CSS = cat**, **selector = stensil**: `.card` stensil kartu, tempel ke 30 kartu.
- **`#header` = papan nama toko**: cuma 1.

### Langkah 0 — Siapkan Device
- VS Code + browser. Buat folder `warung-css/` → `index.html` + `style.css` → buka `index.html` (`Ctrl+O`).

### Cara Komputer Membaca
1. `<link href="style.css">` → unduh/baca toko cat.
2. `<div class="card">` → cari `.card` → tempel aturan.

### 3 Istilah Wajib
1. **Selector/deklarasi**: bidik/aturan (`color: red`)
2. **Class/id**: titik/pagar
3. **External/internal/inline**: toko/kaleng/kuas
4. **Specificity/inherit**: nilai-bidik/warisan (`#id` 100 > `.class` 10 > tag 1)

---

## Eksperimen

- **Hijau:** Ganti `.card` background `yellow` → 2 kartu ikut?
- **Kuning:** `#header` dipakai 2x → tetap jalan tapi salah (id harus 1)! Ganti 1 jadi class.
- **Merah:** Hapus `<link>` → polos? Pasang lagi.
- **Bonus cascade:** `p{color:red}` + `.card p{color:green}` → hijau menang? Tambah `#x p{color:blue}` → biru!

---

## Tantangan

**Warung Bercat Lengkap:** `index.html` (header + 3 `.card` + link luar/dalam) + `style.css` (body, `#header`, `.card`, `.card:hover`, `a[href^="https"]`). Buka polos vs bercat screenshot.

---

## Glosarium Mini

- **Selector/class/id**: bidik/titik/pagar
- **link/style**: toko/kaleng

---

## Ringkasan

Minggu 1 dari 12: **Cat Pertama** (Level: Lengkap). Bisa bidik & cat. Minggu depan: **Box Model** — kardus.
