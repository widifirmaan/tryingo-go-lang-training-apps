# Server Actions ('use server'): Mutasi Data, useActionState & Revalidasi Cache

> **Kategori:** Next.js | **Level:** Server Actions, Route Handlers & Edge Auth | **Minggu 5:** Server Actions ('use server'): Mutasi Data, useActionState & Revalidasi Cache
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami revolusi Server Actions ('use server') yang menghapus kebutuhan boilerplate REST API
- Menjalankan mutasi database langsung dari formulir HTML murni tanpa JavaScript client (*Progressive Enhancement*)
- Menggunakan hook React 19 useActionState untuk menangani feedback state form (loading, error, success)
- Menggunakan revalidatePath() dan revalidateTag() untuk memperbarui cache server seketika setelah mutasi
- Menerapkan validasi data sisi server yang tahan manipulasi DevTools browser

---

## Program: Checkout Keranjang Belanja dengan Server Action & Validasi Backend

```tsx
// ============================================================================
// File: app/checkout/actions.ts ('use server' - Fungsi Berjalan 100% di Server!)
// ============================================================================
"use server";

import { revalidatePath } from "next/cache";

export interface CheckoutState {
  sukses: boolean;
  pesan: string;
  orderId?: string;
}

export async function prosesCheckoutAction(
  prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  // Simulasi delay proses database
  await new Promise((resolve) => setTimeout(resolve, 800));

  const namaLengkap = formData.get("namaLengkap") as string;
  const alamatPengiriman = formData.get("alamatPengiriman") as string;
  const nominal = formData.get("totalBelanja") as string;

  // Validasi sisi server (Kritis: Jangan percaya input client!)
  if (!namaLengkap || namaLengkap.trim().length < 3) {
    return { sukses: false, pesan: "Nama lengkap wajib diisi minimal 3 karakter." };
  }

  if (!alamatPengiriman || alamatPengiriman.trim().length < 8) {
    return { sukses: false, pesan: "Alamat pengiriman terlalu pendek." };
  }

  const orderId = `NUSA-${Date.now()}`;
  console.log(`[Database] Transaksi ${orderId} berhasil diproses untuk: ${namaLengkap}, Total: Rp ${nominal}`);

  // Revalidasi cache halaman keranjang & inventaris agar data langsung sinkron
  revalidatePath("/checkout");
  revalidatePath("/katalog");

  return {
    sukses: true,
    pesan: `Pesanan berhasil dibuat! Nomor Invoice: ${orderId}`,
    orderId
  };
}
```

---

## Konsep Kunci

### Mengapa Server Actions Menggantikan REST API untuk Mutasi?
Di era lama, untuk memproses sebuah form submit:
1. Anda membuat endpoint `app/api/checkout/route.ts`.
2. Anda menulis `handleSubmit(e) { e.preventDefault(); fetch('/api/checkout', { method: 'POST', body: ... }) }`.
3. Anda menangani `json.parse`, status code, dan state manual.

Dengan **Server Actions**:
Cukup tandai fungsi dengan direktif `'use server'`.
Next.js secara otomatis membuat endpoint RPC (Remote Procedure Call) terenkripsi di balik layar!
Anda bisa memanggil fungsi server ini langsung di atribut `<form action={prosesCheckoutAction}>`.

### Progressive Enhancement (Bisa Jalan Tanpa JS!)
Jika koneksi internet pengguna lambat dan file JavaScript client belum selesai diunduh, form yang menggunakan Server Action **tetap bisa di-submit dan berfungsi normal** karena berbasis pengiriman form standar HTML!

### Revalidasi Cache Instan
Setelah database diperbarui di Server Action, panggil `revalidatePath('/katalog')`.
Next.js akan membersihkan cache halaman tersebut dan mengirimkan HTML terbaru ke pengguna tanpa perlu memanggil `window.location.reload()`.

---

---

## Penjelasan untuk Pemula

### Analogi: Surat Pos Bermeterai vs Pipa Tabung Pneumatik Bank
1. **REST API Lama** seperti Anda harus pergi ke kantor pos, membeli amplop, menulis alamat API, menempel perangko, lalu menunggu balasan surat pos 3 hari kemudian.
2. **Server Actions** seperti tabung pneumatik kapsul di drive-thru bank: Anda memasukkan uang dan formulir ke dalam tabung kaca di mobil (*form action*), tabung melesat langsung ke brankas teller di dalam gedung (*server*), dan uang Anda langsung tercatat di rekening dalam sekejap.

## Eksperimen

- Kirimkan formulir dengan nama kurang dari 3 huruf dan amati pesan validasi server dikembalikan ke UI.
- Isi data lengkap dan perhatikan orderId unik tercipta di log konsol terminal server.
- Gunakan useFormStatus() di komponen tombol untuk menampilkan teks "Sedang Memproses..." secara otomatis.
- Panggil redirect("/pesanan-sukses") di akhir Server Action untuk memindahkan halaman secara aman.

---

## Tantangan

Kembangkan Server Action `batalkanPesananAction(orderId)` yang memeriksa apakah pesanan masih berstatus "PENDING", lalu update statusnya di database simulasi dan panggil revalidatePath.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ NEXT.JS APP ROUTER ARCHITECTURE                          │
│                                                          │
│ [Server Component] (Default: Keamanan & DB Direct Access)│
│  • page.tsx / layout.tsx                                 │
│  • Fetch data di server tanpa CORS / Waterfalls          │
│       │                                                  │
│       ▼ Mengirim RSC Payload                             │
│ [Client Component] ('use client')                        │
│  • State lokal, onClick, animasi interaktif              │
│       │                                                  │
│       ▼ Server Actions ('use server')                    │
│  Mutasi langsung ke database & Revalidasi Path           │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `export default async function Page()`
- **Fungsi Utama:** Server Component asinkron bawaan.
- **Parameter / Atribut:** `Props (params, searchParams)`.
- **Perilaku & Efek Sistem:** Merender halaman di server dengan akses database langsung tanpa paparan secret ke browser..
- **Contoh Penggunaan Praktis:**
```typescript
export default async function Page() {
  const data = await db.query('SELECT * FROM items');
  return <main>{data.map(i => <p key={i.id}>{i.name}</p>)}</main>;
}
```
- **Hasil Output yang Diharapkan:**
```output
HTML statis siap saji dikirimkan ke peramban klien
```

### 2. `'use client'`
- **Fungsi Utama:** Direktif penanda Komponen Klien.
- **Parameter / Atribut:** `Ditulis di baris pertama`.
- **Perilaku & Efek Sistem:** Mengizinkan penggunaan hook interaktif browser seperti `useState`, `useEffect`, dan event listener..
- **Contoh Penggunaan Praktis:**
```typescript
'use client';
import { useState } from 'react';
export default function Counter() {
  const [val, setVal] = useState(0);
  return <button onClick={() => setVal(v => v + 1)}>{val}</button>;
}
```
- **Hasil Output yang Diharapkan:**
```output
Komponen interaktif beroperasi di browser klien
```

### 3. `'use server' (Server Actions)`
- **Fungsi Utama:** Mutasi data server langsung dari form.
- **Parameter / Atribut:** `Form data / arguments`.
- **Perilaku & Efek Sistem:** Mengeksekusi mutasi database di sisi server langsung dari event form klien tanpa endpoint REST terpisah..
- **Contoh Penggunaan Praktis:**
```typescript
async function createItem(formData: FormData) {
  'use server';
  const name = formData.get('name');
  await db.items.create({ name });
  revalidatePath('/items');
}
```
- **Hasil Output yang Diharapkan:**
```output
Data tersimpan di server dan halaman otomatis di-revalidasi
```

### 4. `<Link href="/dashboard">`
- **Fungsi Utama:** Navigasi halaman cepat tanpa reload.
- **Parameter / Atribut:** `href (Path route)`.
- **Perilaku & Efek Sistem:** Melakukan pre-fetching rute di latar belakang dan transisi halaman instan (SPA feel)..
- **Contoh Penggunaan Praktis:**
```typescript
import Link from 'next/link';
<Link href="/about" className="btn">Tentang Kami</Link>
```
- **Hasil Output yang Diharapkan:**
```output
Halaman berpindah instan tanpa muat ulang browser
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Menggunakan Hook Browser di Server Component
- **Gejala / Masalah:** Error kompilasi `useState can only be used in a Client Component`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tambahkan direktif `'use client'` di baris paling atas berkas komponen yang memerlukan interaktivitas browser.

### 2. Waterfalls Fetching Data yang Tidak Perlu
- **Gejala / Masalah:** Loading halaman menjadi sangat lambat karena request dilakukan berurutan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `Promise.all([fetchA(), fetchB()])` untuk menjalankan pemanggilan API secara paralel di server.

### 3. Caching yang Terlalu Agresif
- **Gejala / Masalah:** Data baru di database tidak muncul di browser pengguna.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tentukan revalidasi yang tepat via `fetch(url, { next: { revalidate: 60 } })` atau panggil `revalidatePath()`.

---

## Ringkasan

Kamu telah menguasai Server Actions, Progressive Enhancement, useActionState, dan revalidatePath. Minggu depan kita mempelajari Route Handlers untuk REST API publik.
