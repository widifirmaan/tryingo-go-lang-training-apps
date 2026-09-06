# Positioning — Stiker Tempel Warung

> **Kategori:** CSS3 | **Level:** Pemula | **Minggu 6:** Positioning

## Tujuan Pembelajaran

- `relative` jangkar, `absolute` tempel ke jangkar (`top/right`), `fixed` tempel layar, `sticky` tempel saat scroll, `z-index` tumpukan (sumber: MDN position)

---

## Kenapa Ini Penting Buat Kamu?

Badge "Promo" harus di pojok kartu (bukan geser layout), tombol WA nempel kanan-bawah saat scroll. Tanpa positioning, badge dorong teks berantakan. `z-index` cegah popup tertutup header.

---

## Program: Badge + Tombol WA Nempel

```html
<div class="kartu">
  Beras 5kg — Rp 62.000
  <span class="badge">Promo</span>
</div>

<a class="wa" href="https://wa.me/62812">WA</a>

<nav class="menu">Beranda | Produk | Kontak</nav>
<p>Scroll... (isi panjang)</p>
```

```css
.kartu { position: relative; border: 1px solid #ddd; padding: 16px; border-radius: 12px; }
.badge {
  position: absolute; top: 8px; right: 8px; /* tempel ke .kartu (relative!) */
  background: #C53030; color: white; padding: 2px 8px; border-radius: 8px; font-size: 12px;
}
.wa {
  position: fixed; bottom: 16px; right: 16px; /* tempel LAYAR */
  background: #2E5B44; color: white; padding: 12px 16px; border-radius: 50px; z-index: 100;
}
.menu { position: sticky; top: 0; background: white; z-index: 50; } /* nempel saat scroll lewat */
```

**Aturan emas:** `absolute` cari induk `relative` terdekat — tanpa itu, tempel ke body (nyasar)!

---

## Konsep Kunci

### `static` / `relative` / `absolute` / `fixed` / `sticky` = 5 Posisi
- `static` default (tidak bisa `top`).
- `relative` jangkar (tetap di tempat).
- `absolute` tempel ke jangkar.
- `fixed` tempel layar (scroll ikut).
- `sticky` campur: normal sampai scroll → nempel.

### `z-index` = Tumpukan
Angka besar di atas. `WA z:100` di atas `menu z:50`.

---

## Penjelasan untuk Pemula

### Analogi: Stiker & Papan
- **relative = papan**: tempat tempel.
- **absolute = stiker**: tempel di pojok papan.
- **fixed = tato di kacamata**: ikut ke mana pun.
- **z-index = tumpukan kertas**: atas/bawah.

### Langkah 0 — Siapkan Device
- Sama W1.

### Cara Komputer Membaca
1. `.badge absolute` → cari induk `relative` (`.kartu`) → `top:8px right:8px` dari kartu.
2. Tanpa `relative` di kartu → tempel ke body!

### 3 Istilah Wajib
1. **relative/absolute**: jangkar/tempel
2. **fixed/sticky**: layar/scroll
3. **z-index**: tumpukan

---

## Eksperimen

- **Hijau:** Hapus `relative` di `.kartu` → badge nyasar ke body? Pasang lagi.
- **Kuning:** `z-index` badge 1 vs WA 100 → WA di atas?
- **Merah:** `position: fixed` tanpa `bottom/right` → nempel di tempat asal (aneh)? Tambah koordinat.

---

## Tantangan

**Warung Nempel Lengkap:** Kartu + `badge Promo` absolute + tombol `WA` fixed + `nav` sticky + `z-index` benar (WA > nav > badge).

---

## Glosarium Mini

- **relative/absolute/fixed/sticky**: jangkar/tempel/layar/scroll
- **z-index/top/left**: tumpuk/koordinat

---

## Ringkasan

Minggu 6 dari 12: **Stiker Tempel** (Level: Pemula). Badge & WA nempel benar. Minggu depan: **Responsive** — HP vs laptop.
