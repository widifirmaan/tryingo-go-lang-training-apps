# HTML APIs — Fitur Canggih Warung

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 11:** HTML APIs

## Tujuan Pembelajaran

- `details/summary` buka-tutup FAQ tanpa JS, `dialog` popup, `canvas` gambar (MDN APIs)

---

## Program

```html
<details>
  <summary>Apakah gratis ongkir?</summary>
  <p>Ya, jika belanja >Rp 100.000</p>
</details>

<dialog id="promo">
  <p>Promo 10% hari ini!</p>
  <button onclick="promo.close()">Tutup</button>
</dialog>
<button onclick="promo.showModal()">Lihat Promo</button>
```

`details` + `summary` = FAQ buka-tutup, `dialog` + `showModal()` = popup.

---

## Ringkasan

Minggu 11: **Fitur Canggih** — `details` & `dialog`.
