# Box Model — Kardus Warung

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 2:** Box Model

## Tujuan Pembelajaran

- `content` isi, `padding` busa dalam, `border` kardus, `margin` jarak antar kardus, `box-sizing: border-box` biar ukuran tidak meledak

---

## Kenapa Ini Penting Buat Kamu?

Tanpa box model, kardus produk nempel, tidak ada jarak — berantakan.

---

## Program: Kardus CSS

```html
<div style="width: 200px; padding: 16px; border: 2px solid #2E5B44; margin: 12px; background: #EFECE6;">
  Beras 5kg — Rp 62.000
</div>
<style>
  * { box-sizing: border-box; } /* wajib */
  .kardus { width: 200px; padding: 16px; border: 2px solid #2E5B44; margin: 12px; }
</style>
```

**Wajib `box-sizing: border-box`**: `width` termasuk `padding+border`, tidak nambah.

---

## Ringkasan

Minggu 2: **Kardus** — content, padding, border, margin.
