# Proyek Akhir — Warung CSS Lengkap

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 12:** Proyek Akhir

## Tujuan Pembelajaran

- Gabung `Flex` + `Grid` + `Variables` + `Responsive` + `Animasi` jadi `warung.css` 1 file + deploy

---

## Program: Warung Lengkap CSS

```html
<link rel="stylesheet" href="warung.css">
<div class="grid"><div class="kartu"><h3>Beras</h3><p>Rp 62.000</p><button class="tombol">Beli</button></div></div>
```

```css
/* warung.css */
:root { --hijau: #2E5B44; --krem: #EFECE6; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px; }
.kartu { border: 1px solid #ddd; padding: 16px; border-radius: 12px; transition: transform 0.2s; }
.kartu:hover { transform: translateY(-4px); }
.tombol { background: var(--hijau); color: white; padding: 10px; border-radius: 8px; }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
```

Deploy `Netlify` drag `index.html` + `warung.css`.

**Tugas capstone:** Deploy + `Lighthouse` 90+.

---

## Ringkasan

Minggu 12: **Capstone CSS** — warung lengkap, **Selesai CSS3 0→Ahli!**
