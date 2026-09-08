# HTML APIs — Fitur Canggih Tanpa JavaScript Berat

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 11:** HTML APIs

## Tujuan Pembelajaran

- `details` + `summary` FAQ buka-tutup murni HTML (sumber: MDN details)
- `dialog` + `showModal()` popup + `form method="dialog"` tutup (sumber: MDN dialog)
- `progress`/`meter` batang, `datalist` saran input

---

## Kenapa Ini Penting Buat Kamu?

FAQ 10 pertanyaan tanpa `details` = 10x JS toggle + 50 baris. Dengan `details`, 0 JS. Popup promo tanpa `dialog` = div + JS + z-index manual. Dengan `showModal()`, fokus otomatis + ESC tutup + backdrop.

---

## Program: FAQ & Popup Murni HTML

```html
<h2>FAQ Warung</h2>
<details>
  <summary>Apakah gratis ongkir?</summary>
  <p>Ya, jika belanja &gt;Rp 100.000 (RW 01-03).</p>
</details>
<details>
  <summary>Jam buka?</summary>
  <p>07.00 — 20.00 WIB tiap hari.</p>
</details>

<dialog id="promo">
  <h3>Promo 10% Hari Ini!</h3>
  <p>Kode: <code>WARUNG10</code></p>
  <form method="dialog"><button>Tutup</button></form>
</dialog>
<button onclick="promo.showModal()">Lihat Promo</button>

<label>Stok terjual:</label>
<progress value="70" max="100">70%</progress>
<input list="daftar" placeholder="Cari produk">
<datalist id="daftar">
  <option value="Beras"></option>
  <option value="Bayam"></option>
</datalist>
```

---

## Konsep Kunci

### `details` + `summary` = FAQ Lipat
Klik `summary` → buka/tutup. `open` atribut untuk buka default.

### `dialog` + `showModal()` = Popup Resmi
`showModal()` modal (fokus terkunci + ESC + `::backdrop`), `show()` biasa. `form method="dialog"` tutup tanpa JS.

### `progress`/`meter`/`datalist` = Kecil-Kecil Mantap
`progress` progres, `datalist` saran ketik.

---

## Penjelasan untuk Pemula

### Analogi: Kertas Lipat & Etalase Kaca
- **details = brosur lipat**: buka lipatan baca.
- **dialog = etalase kaca**: muncul di depan, ESC tutup.

### Langkah 0 — Siapkan Device
- VS Code + browser modern (`dialog` Baseline 2022 — Chrome 37+, Firefox 98+, Safari 15.4+).

### Cara Komputer Membaca
1. Klik `summary` → browser toggle `open` → tampil isi.
2. `showModal()` → lapisan modal + fokus ke dialog.

### 3 Istilah Wajib
1. **details/summary**: lipat/judul-lipat
2. **dialog/showModal**: popup/buka-modal

---

## Eksperimen

- **Hijau:** Tambah `open` di `details` → terbuka default?
- **Kuning:** `dialog` tanpa `showModal` (tag saja) → tidak tampil? (Wajib panggil!)
- **Merah:** `form` biasa (tanpa `method="dialog"`) di dialog → reload halaman? Ganti `dialog`.

---

## Tantangan

**Warung Interaktif Murni:** 5 FAQ `details` + 1 `dialog` promo (`showModal` + `method="dialog"`) + `progress` stok + `datalist` 6 produk. 0 JS kecuali 1 baris `onclick`.

---

## Glosarium Mini

- **details/dialog/progress**: lipat/popup/batang
- **showModal/backdrop**: buka-modal/latar

---

## Ringkasan

Minggu 11 dari 14: **Fitur Canggih Murni HTML** (Level: Lengkap). Tanpa JS berat. Minggu depan: **Aksesibilitas**.
