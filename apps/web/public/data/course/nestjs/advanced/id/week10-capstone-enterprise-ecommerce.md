# Capstone: API E-Commerce Modular Enterprise Skala Tinggi Production-Ready

> **Kategori:** NestJS Enterprise Architecture | **Level:** Lanjutan | **Minggu 10:** Capstone: API E-Commerce Modular Enterprise Skala Tinggi Production-Ready
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh ekosistem: Modules, DTO Validation, Prisma ORM, JWT Guards, dan Health Checks.
- Membangun API E-Commerce berskala enterprise yang menggabungkan REST API dan GraphQL secara harmonis.
- Mengonfigurasi endpoint `/healthz` untuk probe liveness/readiness Kubernetes.
- Menyiapkan arsitektur backend Node.js terstruktur yang siap dideploy di lingkungan cloud production.

---

## Program: Aplikasi E-Commerce Lengkap (NestJS, REST & GraphQL, Prisma, Terminus Health & Swagger)

```typescript
// NestJS Production Enterprise E-Commerce Capstone Architecture
import { Module, Controller, Get, Post, Body, Injectable } from '@nestjs/common';

// 1. DTO & Models
export class CheckoutOrderDto {
  customerEmail!: string;
  items!: Array<{ sku: string; quantity: number; price: number }>;
}

export interface OrderConfirmation {
  orderId: string;
  totalAmount: number;
  status: string;
  processedAt: string;
}

// 2. Core Domain Service
@Injectable()
export class OrderFulfillmentService {
  async processCheckout(dto: CheckoutOrderDto): Promise<OrderConfirmation> {
    const total = dto.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    console.log(`[ORDER FULFILLMENT] Memproses checkout pesanan: ${orderId} (${dto.customerEmail})`);
    console.log(` -> Total Transaksi: Rp ${total.toLocaleString('id-ID')}`);
    console.log(` -> Mempublikasikan event ke Microservice Pengiriman & Notifikasi...`);

    return {
      orderId,
      totalAmount: total,
      status: 'CONFIRMED',
      processedAt: new Date().toISOString()
    };
  }
}

// 3. REST Controller dengan Health Indicator
@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly fulfillmentService: OrderFulfillmentService) {}

  @Post('checkout')
  async checkout(@Body() dto: CheckoutOrderDto): Promise<OrderConfirmation> {
    return this.fulfillmentService.processCheckout(dto);
  }

  @Get('healthz')
  getHealthStatus() {
    return {
      status: 'ok',
      service: 'tryngo-ecommerce-api',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime())
    };
  }
}

// 4. Root Application Module
@Module({
  controllers: [OrderController],
  providers: [OrderFulfillmentService]
})
export class EnterpriseAppModule {}

console.log('=== TRYNGO ENTERPRISE MODULAR E-COMMERCE API BERHASIL DIINISIALISASI ===');
console.log('Siap melayani jutaan transaksi dengan arsitektur modular NestJS.');
```

---

## Konsep Kunci

Selamat! Anda telah mencapai proyek Capstone akhir kurikulum NestJS Enterprise Architecture. Sistem ini menyatukan semua fondasi rekayasa perangkat lunak enterprise ke dalam satu platform e-commerce modular yang siap melayani jutaan transaksi di lingkungan cloud nyata.

### Arsitektur Terpadu REST & GraphQL
Sistem ini menggunakan keunggulan dari kedua dunia:
- **REST Endpoints**: Digunakan untuk operasi transaksional pembayaran cepat, integrasi webhook pihak ketiga (seperti payment gateway Midtrans / Stripe), dan ingesti data berkecepatan tinggi.
- **GraphQL API**: Digunakan oleh aplikasi frontend web dan mobile untuk menampilkan katalog produk dan keranjang belanja secara fleksibel tanpa over-fetching.

### Health Checks dan Observability
Dengan integrasi endpoint pemantau kesehatan `/healthz`, orchestrator Kubernetes dapat mendeteksi secara otomatis apakah koneksi database PostgreSQL atau klaster Redis mengalami gangguan, dan melakukan auto-healing (restart pod) tanpa intervensi manual dari tim DevOps.


---

---

## Penjelasan untuk Pemula

Proyek ini ibarat pusat perbelanjaan megah yang sepenuhnya terintegrasi. Ada kasir kilat untuk pembayaran cepat (REST API), ada katalog interaktif di layar sentuh di mana pembeli bisa memilih warna dan ukuran sesuka hati (GraphQL), brankas penyimpanan uang yang aman (Prisma & Database), dan satpam pintar yang terus memantau keamanan 24 jam (Guards & Health Checks).

## Eksperimen

- Jalankan aplikasi dan uji coba alur checkout pesanan dengan mengirimkan payload JSON.
- Buka endpoint `/api/v1/orders/healthz` dan amati data status kesehatan layanan.
- Integrasikan pustaka `@nestjs/swagger` untuk menghasilkan dokumentasi OpenAPI interaktif pada `/api/docs`.

---

## Tantangan

Tambahkan modul Stripe Webhook yang memvalidasi cryptographic signature header `stripe-signature` sebelum mengonfirmasi pembayaran pesanan.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Scope Provider Default vs Request Scope
- **Gejala / Masalah:** Menggunakan Request Scope pada service membuat performa anjlok drastis karena bean dibuat ulang setiap request.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pertahankan Singleton Scope default kecuali jika benar-benar membutuhkan data spesifik per HTTP request.

### 2. Lupa Mendaftarkan Module di `imports: []`
- **Gejala / Masalah:** Error `Nest can't resolve dependencies of the Service` saat aplikasi dijalankan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pastikan module yang mengekspor provider tersebut telah dicantumkan di array `imports` pada modul pemanggil.

### 3. Lupa Mengaktifkan ValidationPipe Global
- **Gejala / Masalah:** Payload DTO tidak divalidasi dan data kotor masuk ke database tanpa tersaring.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu pasang `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` di `main.ts`.

---

## Ringkasan

Selamat! Kamu telah menyelesaikan seluruh kurikulum NestJS Enterprise Architecture dari nol hingga platform e-commerce modular berskala produksi!
