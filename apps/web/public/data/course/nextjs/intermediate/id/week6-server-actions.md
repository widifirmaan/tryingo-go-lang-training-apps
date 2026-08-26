# Server Actions — Kirim Pesanan Tanpa API Manual

> **Kategori:** Next.js | **Level:** Menengah | **Minggu 6:** Server Actions & Mutations

## Tujuan Pembelajaran

- `"use server"` di `actions.js` — fungsi di server, dipanggil dari Client `form` tanpa `fetch` manual
- `revalidatePath("/produk")` segarkan daftar setelah tambah

---

## Kenapa Ini Penting Buat Kamu?

Form tambah produk tanpa Server Actions = bikin `fetch("/api/produk", {method:"POST"})` manual + `route.ts`. Dengan Actions = tulis fungsi `tambah(formData)` di server, di Client `action={tambah}` — selesai.

---

## Program: Tambah Produk via Action

```jsx
// app/produk/actions.js — di server
"use server";
import { revalidatePath } from "next/cache";

let produk = [{ id: 1, nama: "Beras", harga: 62000 }];

export async function tambah(formData) {
  const nama = formData.get("nama");
  const harga = Number(formData.get("harga"));
  if (!nama || !harga) throw new Error("Isi nama & harga");
  produk.push({ id: Date.now(), nama, harga });
  revalidatePath("/produk"); // segarkan cache /produk
}

// app/produk/page.js — Server
import { tambah } from "./actions";

export default async function ProdukPage() {
  // ... ambil produk
  return (
    <div>
      <form action={tambah}>
        <input name="nama" placeholder="Nama" required />
        <input name="harga" type="number" placeholder="Harga" required />
        <button>Tambah</button>
      </form>
      {/* daftar */}
    </div>
  );
}
```

---

## Konsep Kunci

### `"use server"` = Dapur
Fungsi jalan di server, aman akses DB, tidak kirim ke browser.

### `form action={tambah}` = Pesan Antar
Klik Tambah → browser kirim `FormData` ke server → `tambah` jalan → `revalidatePath` segarkan.

---

## Ringkasan

Minggu 6: **Kirim Tanpa API** — Server Actions. Minggu depan: **Loading & Error**.
