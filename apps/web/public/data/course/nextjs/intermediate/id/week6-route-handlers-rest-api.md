# Route Handlers (route.ts): REST API, NextRequest/NextResponse & Webhooks

> **Kategori:** Next.js | **Level:** Server Actions, Route Handlers & Edge Auth | **Minggu 6:** Route Handlers (route.ts): REST API, NextRequest/NextResponse & Webhooks

## Tujuan Pembelajaran

- Memahami peran Route Handlers (route.ts) untuk melayani klien eksternal (Mobile App, Webhook)
- Menggunakan objek NextRequest dan NextResponse untuk manipulasi headers, cookies, dan status code
- Menangani berbagai metode HTTP standar: GET, POST, PUT, PATCH, DELETE
- Membangun endpoint Webhook yang aman dengan validasi cryptographic signature
- Mengonfigurasi Edge Runtime (`export const runtime = "edge"`) untuk eksekusi berlatensi sangat rendah

---

## Program: REST API Gateway E-Commerce & Handler Webhook Pembayaran Stripe

```ts
// ============================================================================
// File: app/api/v1/webhook/pembayaran/route.ts (Route Handler Modern)
// ============================================================================
import { NextRequest, NextResponse } from "next/server";

// 1. GET Handler: Healthcheck & Query Param Parsing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get("api_key");

  if (secretKey !== "secret-nusa-token-2026") {
    return NextResponse.json(
      { sukses: false, pesan: "Akses ditolak: Kunci API tidak valid." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: "HEALTHY",
    gateway: "Nusa Payment Hook Engine",
    timestamp: new Date().toISOString()
  });
}

// 2. POST Handler: Menerima Webhook Callback dari Payment Gateway (Stripe/Midtrans)
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-payment-signature");
    if (!signature) {
      return NextResponse.json(
        { sukses: false, pesan: "Missing signature header." },
        { status: 400 }
      );
    }

    const payload = await request.json();
    const { orderId, statusPembayaran, nominal } = payload;

    console.log(`[Webhook Diterima] Order: ${orderId} | Status: ${statusPembayaran} | Rp ${nominal}`);

    // Update status database di sini...

    return NextResponse.json({
      diterima: true,
      orderId,
      statusTerbaru: statusPembayaran === "PAID" ? "SETTLED" : "FAILED",
      diprosesPada: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { sukses: false, pesan: "Format payload JSON rusak atau tidak valid." },
      { status: 400 }
    );
  }
}
```

---

## Konsep Kunci

### Kapan Menggunakan Route Handlers vs Server Actions?
- **Server Actions**: Gunakan untuk interaksi dari form UI aplikasi Next.js Anda sendiri (checkout, login, update profil). Lebih aman, tanpa perlu konfigurasi endpoint URL publik.
- **Route Handlers (`route.ts`)**: Gunakan saat Anda perlu menyediakan **REST API publik** yang akan diakses oleh pihak ketiga:
  1. Webhook dari Payment Gateway (Stripe, Midtrans, PayPal).
  2. Aplikasi Mobile Android/iOS yang membutuhkan format data JSON murni.
  3. Integrasi cron job eksternal atau microservices lain.

### Aturan Berkas `route.ts`
File `route.ts` tidak boleh berada di folder yang sama dengan `page.tsx` karena akan terjadi konflik rute.
Setiap fungsi di-ekspor sesuai nama metode HTTP dalam huruf besar: `export async function GET()`, `POST()`, `DELETE()`.
Anda dapat membaca parameter URL secara instan melalui objek `NextRequest`.

---

---

## Penjelasan untuk Pemula

### Analogi: Pintu Masuk Tamu vs Dermaga Bongkar Muat Kargo
1. **Server Actions** seperti pintu masuk utama lobi hotel: dikhususkan untuk tamu hotel yang menginap (*pengguna aplikasi Anda*) yang memesan kopi via resepsionis.
2. **Route Handlers (`route.ts`)** seperti dermaga bongkar muat kargo di bagian belakang hotel: memiliki pintu gerbang standar dengan tanda pengenal barcode (*API Key & Webhook Signature*) agar truk kurir eksternal bisa memasukkan pasokan barang secara otomatis.

## Eksperimen

- Kirimkan permintaan GET via curl atau Postman tanpa api_key dan verifikasi respons status 401 Unauthorized.
- Kirimkan permintaan POST dengan header x-payment-signature dan payload JSON untuk melihat konfirmasi sukses 200.
- Coba letakkan route.ts dan page.tsx di dalam folder yang sama untuk melihat peringatan konflik rute.
- Tambahkan header CORS (Access-Control-Allow-Origin) pada NextResponse untuk mengizinkan akses dari domain luar.

---

## Tantangan

Buat Route Handler `app/api/v1/katalog/route.ts` yang menerima query parameter `?min_harga=100000` dan mengembalikan JSON produk yang difilter dengan pagination `limit` dan `page`.

---

## Ringkasan

Kamu telah menguasai Route Handlers, NextRequest/NextResponse, dan Webhook payload verification. Minggu depan kita mempelajari Edge Middleware dan Autentikasi.
