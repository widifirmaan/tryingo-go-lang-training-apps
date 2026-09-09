# Capstone: Type-Safe Warung API Client

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 12:** Capstone: Type-Safe API Client
> **Prasyarat:** Minggu 11 — **Advanced Types**.

## Tujuan Pembelajaran

- Gabung `interface` + `fetch` bertipe + `generics` jadi client `api.get<Produk>("/produk")` type-safe

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: `fetch` bertipe + `interface` + `generics` jadi client yang autocomplete + tolak typo SEBELUM run. Ini portfolio "TypeScript production-ready".

---

## Program: Client Type-Safe

```typescript
interface Produk { id: number; nama: string; harga: number; }

async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal");
  return res.json() as T;
}

async function main(){
  const produk = await apiGet<Produk[]>("/produk");
  console.log(produk[0].nama); // autocomplete, typo langsung merah
}

main();
```

**Tugas capstone:** Buat `apiClient` generik untuk `Produk` + `Pelanggan` + `Pesanan` dengan `interface` masing-masing, `fetch` + `try/catch`.


---

## Penjelasan untuk Pemula

### Analogi: Penerjemah Type-Safe
- **`apiGet<Produk>` = penerjemah**: URL mentah → objek bertipe. Salah field → merah sebelum run.

### Langkah 0 — Siapkan Device
- Sama TS W1: `npx tsc` + `node` (atau `tsx` untuk langsung).

### Cara Komputer Membaca
1. `apiGet<Produk[]>("/produk")` → fetch → `as T` → `produk[0].nama` autocomplete.

### 3 Istilah Wajib
1. **Generics/fetch**: serbaguna/ambil

---

### Bonus: Pecah Modul export/import (bab Modules di Handbook!)

1 file 300 baris = sesat. Pecah 3 file (butuh `"type": "module"` di `package.json` atau `.mts`!):

```typescript
// types.ts — cetak biru (export agar bisa dipinjam!)
export interface Produk { id: number; nama: string; harga: number; }
```

```typescript
// api.ts — tukang ambil (import + export lagi!)
import type { Produk } from "./types.js"; // .js BUKAN .ts (aturan NodeNext!)
export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal");
  return res.json() as T;
}
export type DaftarProduk = Produk[];
```

```typescript
// app.ts — pakai keduanya
import { apiGet } from "./api.js";
import type { Produk } from "./types.js";
const produk = await apiGet<Produk[]>("/produk");
console.log(produk[0].nama);
```

- `export` = bagi, `import` = pinjam. `import type` khusus tipe (hilang saat compile, ringan!).
- Jebakan #1: `from "./types"` tanpa `.js` → error NodeNext! Tulis `.js` meski file `.ts`.
- Jebakan #2: tanpa `"type": "module"`, `import` ditolak → pakai `require` (CommonJS lama).

---

## Eksperimen

- **Hijau:** Buka `/produk` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah huruf besar-kecil `res` dan `produk` → masih jalan atau error?
- **Merah:** Salah ketik 1 huruf pada `res` → pesan error apa? Betulkan.

## Tantangan

**Capstone: Type-Safe Warung API Client di Warungmu:** pakai `/produk`, `apiGet`, `main` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`, `apiGet`, `main`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Advanced Types** (Minggu 11): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- **apiGet/generics**: ambil-bertipe/serbaguna
- **export/import**: bagi/pinjam

---
## Ringkasan

Minggu 12: **Capstone TS** — client type-safe, **Selesai TypeScript 0→Ahli!**
