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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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
