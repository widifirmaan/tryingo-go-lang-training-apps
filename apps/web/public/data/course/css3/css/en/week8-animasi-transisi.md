# Animasi & Transisi — Warung Bergerak Halus

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 8:** Animasi & Transisi

## Tujuan Pembelajaran

- `transition: all 0.3s` halus, `transform: scale(1.05)` membesar, `@keyframes` kedip

---

## Program

```html
<button style="transition: all 0.3s; padding: 12px 24px; background: #2E5B44; color: white; border: none; border-radius: 8px;"
  onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
  Beli Sekarang
</button>

<style>
  @keyframes kedip { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  .promo { animation: kedip 1s infinite; background: #EFECE6; padding: 8px; }
</style>
<div class="promo">Gratis ongkir hari ini!</div>
```

---

## Ringkasan

Minggu 8: **Gerak Halus** — `transition` + `keyframes`.
