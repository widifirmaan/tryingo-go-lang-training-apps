# CSS Variables — Palet Warung Sekali Ubah

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 9:** CSS Variables

## Tujuan Pembelajaran

- `:root { --hijau: #2E5B44; }` palet, `var(--hijau)` pakai, `dark` ubah 1 baris

---

## Program

```html
<style>
  :root { --hijau: #2E5B44; --krem: #EFECE6; }
  .tombol { background: var(--hijau); color: white; padding: 12px; border-radius: 8px; }
  .kartu { background: var(--krem); padding: 16px; border-radius: 12px; }
</style>
<button class="tombol">Beli</button>
<div class="kartu">Beras 5kg — Rp 62.000</div>
```

Ganti `--hijau` di `:root` → semua tombol ikut.

---

## Ringkasan

Minggu 9: **Palet Sekali Ubah** — `var(--)`.
