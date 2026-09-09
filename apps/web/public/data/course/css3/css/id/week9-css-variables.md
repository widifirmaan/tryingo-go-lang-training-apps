# CSS Variables — Palet Warung Sekali Ubah (MDN)

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 9:** CSS Variables
> **Prasyarat:** Minggu 8 — **Animasi & Transisi**.

## Tujuan Pembelajaran

- `:root { --hijau: #2E5B44; }` palet di akar, `var(--hijau)` pakai di mana saja, `var(--hijau, #000)` fallback jika tidak ada (sumber: MDN Using custom properties)
- `@property --hijau { syntax: "<color>"; initial-value: #2E5B44; inherits: false; }` untuk tipe + fallback `initial-value`

---

## Kenapa Ini Penting Buat Kamu?

Warung ganti tema dari hijau ke biru — tanpa variabel, ubah 30 file `background: #2E5B44` manual. Dengan `--hijau` di `:root`, ubah 1 baris → semua tombol, kartu ikut.

---

## Program: Palet Sekali Ubah (MDN)

```html
<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>Palet Warung</title>
<style>
  :root {
    --hijau: #2E5B44;
    --krem: #EFECE6;
    --radius: 12px;
  }
  /* @property untuk tipe + initial (MDN) */
  @property --hijau {
    syntax: "<color>";
    inherits: false;
    initial-value: #2E5B44;
  }

  .tombol { background: var(--hijau); color: white; padding: 12px; border-radius: var(--radius); border: none; }
  .tombol:hover { background: var(--hijau, #1a3326); } /* fallback jika --hijau invalid */
  .kartu { background: var(--krem); padding: 16px; border-radius: var(--radius); border: 1px solid var(--hijau); }
  /* Ganti tema: ubah :root saja */
</style></head>
<body>
  <button class="tombol">Beli</button>
  <div class="kartu">Beras 5kg — Rp 62.000</div>
</body></html>
```

**Sumber:** MDN `var(--hijau, fallback)` dan `@property syntax`.

---

## Konsep Kunci

### `--hijau` di `:root` + `var(--hijau)`
`--hijau: #2E5B44` di `:root` warisi ke semua, `var(--hijau)` pakai, `var(--hijau, #000)` fallback jika tidak ada.

### `@property` = Daftar Tipe
`@property --hijau { syntax: "<color>"; initial-value: #2E5B44; }` cegah `var(--hijau)` jadi `16px` (invalid).

---

## Penjelasan untuk Pemula

### Analogi: Palet Cat Toko

- **`--hijau` = kaleng cat hijau**: taruh di gudang `:root`, semua tukang ambil `var(--hijau)`.
- **`var(--hijau, #000)` = cat cadangan**: jika kaleng hilang, pakai hitam.

### Langkah 0 — Device

VS Code + browser, buat `palet.html`, buka, ubah `--hijau` di `:root` → semua ikut.

### Cara Komputer Membaca

1. `:root { --hijau: #2E5B44 }` → simpan di akar.
2. `.tombol { background: var(--hijau) }` → ambil `#2E5B44`.

### 3 Istilah Wajib

1. **--var**: custom property
2. **var()**: pakai + fallback
3. **@property**: daftar tipe

---

## Eksperimen

- **Hijau:** Ganti `--hijau: #2E5B44` jadi `#1572B6` (biru) → semua tombol biru?
- **Kuning:** Hapus `--hijau` → `var(--hijau, #000)` jadi hitam?
- **Merah:** `var(--hijau, red, blue)` → fallback `red, blue`?

---

## Tantangan

**Warung 2 Tema:** `:root { --hijau: #2E5B44 }` + tombol `Ganti Tema` yang `document.documentElement.style.setProperty('--hijau', '#E34F26')` (JS) → klik ganti hijau→orange.

---

## Glosarium Mini

- **--var/var()/@property**: variabel/pakai/daftar

---

## Ringkasan

Minggu 9 dari 12: **Palet Sekali Ubah** (Level: Lengkap). Bisa ganti tema 1 baris. Minggu depan: **Arsitektur** — BEM.
