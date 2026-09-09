# Utility Types — Alat Potong Warung (typescriptlang.org)

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 7:** Utility Types
> **Prasyarat:** Minggu 6 — **Classes & OOP**.

## Tujuan Pembelajaran

- `Pick<Produk, "nama" | "harga">` ambil 2, `Omit<Produk, "stok">` buang 1, `Partial` jadi opsional, `Required` wajib (sumber: typescriptlang.org/docs/handbook/utility-types)

---

## Kenapa Ini Penting Buat Kamu?

Produk punya 5 field, tapi kartu ringkas hanya butuh `nama` + `harga` — tanpa `Pick`, tulis ulang `interface Ringkas { nama, harga }` duplikat. Dengan `Pick`, 1 baris.

---

## Program: Alat Potong Warung (typescriptlang.org)

```typescript
interface Produk { id: number; nama: string; harga: number; stok: number; kategori: string; }

type Ringkas = Pick<Produk, "nama" | "harga">; // hanya nama & harga
const r: Ringkas = { nama: "Beras", harga: 62000 };

type TanpaStok = Omit<Produk, "stok">; // semua kecuali stok
type Opsional = Partial<Produk>; // semua jadi ?
type Wajib = Required<Opsional>; // semua wajib lagi

// Contoh warung: update hanya nama
function update(produk: Produk, patch: Partial<Produk>): Produk {
  return { ...produk, ...patch };
}
console.log(update({ id: 1, nama: "Beras", harga: 62000, stok: 10, kategori: "Sembako" }, { harga: 65000 }));
```

**Sumber:** `typescriptlang.org/docs/handbook/utility-types` — `Pick`, `Omit`, `Partial`.

---

## Konsep Kunci

### `Pick`/`Omit` = Potong
`Pick` ambil, `Omit` buang.

### `Partial`/`Required` = Opsional/Wajib
`Partial` semua `?`, `Required` semua wajib.

---

## Penjelasan untuk Pemula

### Analogi: Alat Potong Kertas

- **`Pick` = gunting**: potong `nama` dan `harga` saja.
- **`Omit` = buang**: buang `stok`.
- **`Partial` = pensil tipis**: semua opsional.

### Langkah 0 — Device

`npx tsc` cek, `tsc --version` 5.x (sudah W1).

### 3 Istilah Wajib

1. **Pick/Omit**: ambil/buang
2. **Partial/Required**: opsional/wajib

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `update` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `update` dan `Ringkas` → masih jalan atau error?
- **Merah:** Salah ketik 1 huruf pada `update` → pesan error apa? Betulkan.

## Tantangan

**Warung Potong Lengkap:** `Produk` 5 field → `Ringkas = Pick<Produk, "nama"|"harga">` + `TanpaStok = Omit<Produk,"stok">` + `update(produk, Partial<Produk>)`.
- **Sambungan (Minggu 6 — Classes & OOP):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Pick/Omit/Partial**: potong/buang/opsional

---

## Ringkasan

Minggu 7 dari 12: **Alat Potong** — `Pick`/`Omit`. Minggu depan: **Config**.
