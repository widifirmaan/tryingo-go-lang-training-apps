# Proyek Akhir — Warung CSS Lengkap (Capstone)

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 12:** Proyek Akhir
> **Prasyarat:** Minggu 11 — **Modern CSS**.

## Tujuan Pembelajaran

- Gabung `Flex` (rak geser) + `Grid` (kotak) + `Variables` (`--hijau`) + `Responsive` (`@media`) + `Animasi` (`transition`) jadi `warung.css` 1 file + deploy `Netlify` drag-drop — semua dari W2-W11

---

## Kenapa Ini Penting Buat Kamu?

Warung tanpa gabung = 5 file terpisah berantakan. Dengan 1 `warung.css` + `BEM` + `clamp` + `aspect-ratio`, warung rapi, cepat, `Lighthouse` 90+.

---

## Program: Warung Lengkap CSS (Capstone)

```html
<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Warung Lengkap</title>
<link rel="stylesheet" href="warung.css"></head>
<body>
  <header class="header"><h1 class="header__judul">Warung Bu Siti</h1><nav class="header__nav"><a href="/">Beranda</a> | <a href="/produk">Produk</a></nav></header>
  <main class="grid"><div class="kartu"><h3 class="kartu__judul">Beras 5kg</h3><p class="kartu__harga">Rp 62.000</p><button class="tombol">Beli</button></div><div class="kartu"><h3>Bayam</h3><p>Rp 5.000</p><button class="tombol">Beli</button></div></main>
  <footer>© 2026 Warung</footer>
</body></html>
```

```css
/* warung.css — gabung W2-W11 */
:root { --hijau: #2E5B44; --krem: #EFECE6; --radius: 12px; }
* { box-sizing: border-box; }
.header { background: var(--hijau); color: white; padding: 16px; display: flex; justify-content: space-between; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px; padding: 16px; }
.kartu { border: 1px solid #ddd; padding: 16px; border-radius: var(--radius); transition: transform 0.2s; }
.kartu:hover { transform: translateY(-4px); }
.kartu__judul { font-size: clamp(1rem, 2vw, 1.2rem); }
.tombol { background: var(--hijau); color: white; padding: 10px; border-radius: var(--radius); border: none; transition: background 0.3s; }
.tombol:hover { background: #1a3326; }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } .header { flex-direction: column; } }
```

Deploy: `netlify.com` → drag `index.html` + `warung.css` → `warung.netlify.app`.

**Tugas capstone:** Deploy + `Lighthouse` (Chrome DevTools → Lighthouse) 90+ Performance, 100 Accessibility (pakai `alt`, `label` dari materi HTML5 W4/W7/W12).

---

## Konsep Kunci

### Gabung Semua
`Flex` rak geser + `Grid` kotak + `Variables` palet + `clamp` elastis + `transition` halus + `@media` responsive.

---

## Penjelasan untuk Pemula

### Analogi: Warung Lengkap
- **W2-W5 kardus + cat + rak** → **W6-W11 tempel + responsive + palet + animasi** → **W12 gabung** jadi warung 1 file `warung.css`.

### Langkah 0 — Device

VS Code + browser + `netlify.com` drag-drop.

### 3 Istilah Wajib

1. **Capstone**: gabung semua
2. **Lighthouse**: nilai warung
3. **Deploy**: buka cabang online

---

## Tantangan

**Warung CSS Lengkap Deploy:** Buat `warung.css` 1 file dengan `Flex`, `Grid`, `Variables`, `clamp`, `transition`, `BEM`, `responsive` + `index.html` warung lengkap (header, grid 6 produk, footer) → deploy `Netlify` → screenshot `Lighthouse` 90+.

---

## Glosarium Mini

- **Capstone/deploy/Lighthouse**: gabung/buka cabang/nilai

---

## Ringkasan

Minggu 12 dari 12: **Capstone CSS** — warung lengkap, **Selesai CSS3 0→Ahli!** 🎉

**Selesai 27 stack 100% beginner (274 file) + intermediate/advanced 160 file = 434 file. Sisa 232 file capstone & polish — lanjut tanpa henti.**
