# Capstone: Type-Safe Warung API Client

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 12:** Capstone: Type-Safe API Client

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

## Glosarium Mini

- **apiGet/generics**: ambil-bertipe/serbaguna

---
## Ringkasan

Minggu 12: **Capstone TS** — client type-safe, **Selesai TypeScript 0→Ahli!**
