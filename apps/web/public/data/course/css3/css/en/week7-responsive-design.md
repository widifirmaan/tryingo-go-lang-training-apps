# Responsive — Warung di HP & Laptop

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 7:** Responsive Design

## Tujuan Pembelajaran

- `@media (max-width: 600px)` HP 1 kolom, `min-width: 600px` laptop 3 kolom, `viewport` meta

---

## Program

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
</style>
<div class="grid"><div>Beras</div><div>Bayam</div><div>Telur</div></div>
```

Kecilkan browser → 1 kolom, besarkan → 3 kolom.

---

## Ringkasan

Minggu 7: **Responsive** — `@media`.
