# Arsitektur CSS — Lemari Rapi

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 10:** Arsitektur CSS

## Tujuan Pembelajaran

- `BEM` `.kartu__judul--promo` nama rapi, `utility` Tailwind vs `component`

---

## Program

```html
<!-- BEM -->
<div class="kartu kartu--promo">
  <h3 class="kartu__judul">Beras</h3>
  <p class="kartu__harga">Rp 62.000</p>
</div>

<style>
  .kartu { border: 1px solid #ddd; padding: 16px; }
  .kartu--promo { border-color: #2E5B44; }
  .kartu__judul { font-weight: bold; }
</style>
```

---

## Ringkasan

Minggu 10: **Lemari Rapi** — BEM.
