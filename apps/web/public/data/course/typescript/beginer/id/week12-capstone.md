# Capstone: Type-Safe Warung API Client

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 12:** Capstone: Type-Safe API Client

## Tujuan Pembelajaran

- Gabung `interface` + `fetch` bertipe + `generics` jadi client `api.get<Produk>("/produk")` type-safe

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

## Ringkasan

Minggu 12: **Capstone TS** — client type-safe, **Selesai TypeScript 0→Ahli!**
