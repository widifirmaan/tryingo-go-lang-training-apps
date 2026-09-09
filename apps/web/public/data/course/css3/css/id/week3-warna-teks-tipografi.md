# Warna & Tipografi — Cat dan Huruf Warung

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 3:** Warna & Tipografi
> **Prasyarat:** Minggu 2 — **Box Model**.

## Tujuan Pembelajaran

- `color` tinta, `background` cat tembok, `#2E5B44` hex vs `red` nama vs `rgb()` (sumber: MDN color)
- `font-family`, `font-size: 16px` vs `1.2rem`, `line-height: 1.6` napas, `text-align` rata (sumber: MDN font)

---

## Kenapa Ini Penting Buat Kamu?

Teks abu terang di putih → pelanggan tua tidak bisa baca (kontras gagal). `line-height: 1` → baris nempel susah baca. Warna + huruf yang benar = warung terbaca semua umur + terlihat profesional.

---

## Program: Warung Berwarna & Rapi Huruf

```html
<h1 class="judul">Warung Bu Siti</h1>
<p class="deskripsi">Beras pulen, sayur segar tiap pagi dari petani lokal.</p>
<p class="promo">Promo: Gratis ongkir belanja &gt;Rp 100.000</p>
```

```css
.judul {
  color: #2E5B44;              /* hex hijau warung */
  font-family: Georgia, serif; /* cadangan serif jika Georgia hilang */
  font-size: 28px;
  text-align: center;
}
.deskripsi {
  color: #333;        /* abu tua, bukan #999 (terlalu terang!) */
  line-height: 1.6;   /* napas antar baris */
  font-size: 16px;
}
.promo {
  background: #EFECE6;
  color: #1a3326;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}
```

---

## Konsep Kunci

### `color` / `background` + 3 Cara Tulis Warna
- `red` nama (terbatas), `#2E5B44` hex (populer), `rgb(46,91,68)` angka.
- `hsl(150, 40%, 30%)` = rona/jenuh/cerah (lebih manusiawi dari rgb!). `hsl(150 40% 30% / 0.8)` pakai transparan.
- Gradasi: `background: linear-gradient(#2E5B44, #EFECE6);` (atas→bawah). `radial-gradient(circle, ...)` matahari.

### `font-family` + Cadangan
`Georgia, serif` — jika Georgia hilang, pakai serif apa saja.

### `font-size` + `line-height` + `text-align`
`16px` tetap, `1.2rem` ikut akar, `line-height: 1.6` napas, `center/left/justify` rata.

---

## Penjelasan untuk Pemula

### Analogi: Cat & Cetakan
- **color/background = tinta/kertas**, **font-family = jenis huruf spanduk**, **line-height = spasi baris buku**.

### Langkah 0 — Siapkan Device
- Sama W1: `style.css` + reload.

### Cara Komputer Membaca
1. `.judul { color: #2E5B44 }` → cari class `judul` → cat hijau.
2. `font-family: Georgia, serif` → ada Georgia? Pakai. Tidak? Serif.

### 3 Istilah Wajib
1. **Hex/rgb**: kode warna
2. **line-height**: napas baris
3. **Serif/sans**: berkait/polosan

---

## Eksperimen

- **Hijau:** `color: #999` di paragraf → susah baca? Ganti `#333`.
- **Kuning:** `line-height: 1` vs `2` → mana enak?
- **Merah:** `font-family: "HurufAneh"` (tidak ada) → fallback serif? Tambah cadangan.

---

## Tantangan

**Spanduk Warna Lengkap:** Judul hijau `28px center` + 2 paragraf (`#333`, `1.6`) + promo box (`background` + `bold`) + 1 warna `rgb()`.

---

## Glosarium Mini

- **color/background**: tinta/kertas
- **line-height/align**: napas/rata

---

## Ringkasan

Minggu 3 dari 12: **Cat & Huruf** (Level: Lengkap). Terbaca semua umur. Minggu depan: **Flexbox** — rak geser.
