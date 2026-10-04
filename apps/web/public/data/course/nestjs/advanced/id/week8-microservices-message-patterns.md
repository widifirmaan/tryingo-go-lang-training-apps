# Arsitektur Microservices: Transporter TCP/Redis, Message & Event Patterns

> **Kategori:** NestJS Enterprise Architecture | **Level:** Lanjutan | **Minggu 8:** Arsitektur Microservices: Transporter TCP/Redis, Message & Event Patterns
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur NestJS Microservices dan perbedaan dari HTTP REST.
- Mengetahui berbagai jenis Transporter bawaan: TCP, Redis, RabbitMQ, NATS, dan Kafka.
- Membedakan Request-Response Pattern (`@MessagePattern`) vs Event Pattern (`@EventPattern`).
- Menggunakan `ClientProxy` untuk mengirim pesan dan event ke microservice lain.

---

## Program: Konsumen Microservice Pemrosesan Pesanan dengan @MessagePattern & @EventPattern

```typescript
// Menggunakan modul @nestjs/microservices
import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload, Ctx } from '@nestjs/microservices';

export interface OrderCreatedEvent {
  orderId: string;
  customerEmail: string;
  totalAmount: number;
  items: Array<{ sku: string; quantity: number }>;
}

export interface InventoryCheckCommand {
  sku: string;
  requestedQty: number;
}

@Controller()
export class OrderMicroserviceConsumer {
  
  // 1. Request-Response Pattern: Memerlukan balikan nilai balik secara sinkron
  @MessagePattern({ cmd: 'check_inventory' })
  async handleInventoryCheck(@Payload() data: InventoryCheckCommand) {
    console.log(`[MICROSERVICE RPC] Memeriksa ketersediaan stok untuk SKU: ${data.sku}...`);
    
    // Simulasi kueri stok internal
    const isAvailable = data.requestedQty <= 20;
    return {
      sku: data.sku,
      available: isAvailable,
      allocatedQty: isAvailable ? data.requestedQty : 0
    };
  }

  // 2. Event-Driven Pattern (Fire-and-Forget): Tidak memblokir pengirim
  @EventPattern('order_placed')
  async handleOrderPlacedNotification(@Payload() order: OrderCreatedEvent) {
    console.log(`[MICROSERVICE EVENT] Menerima event pesanan baru: ${order.orderId}`);
    console.log(` -> Mengirim email konfirmasi ke: ${order.customerEmail}`);
    console.log(` -> Menerbitkan instruksi picking gudang untuk ${order.items.length} item.`);
  }
}

console.log('=== NESTJS MICROSERVICE CONSUMER PATTERNS TERKONFIGURASI ===');
console.log('Mendukung Request-Response via @MessagePattern dan Event Streaming via @EventPattern.');
```

---

## Konsep Kunci

Ketika sebuah sistem monolitik bertumbuh besar, memisahkan fungsionalitas menjadi microservices terpisah (misalnya Order Service, Payment Service, Notification Service) menjadi kebutuhan wajib agar tim dapat merilis fitur secara independen.

### Arsitektur NestJS Microservices
NestJS menyediakan abstraksi microservice yang elegan di modul `@nestjs/microservices`. Aplikasi microservice tidak mendengarkan port HTTP standar, melainkan terhubung ke sebuah **Transporter** (seperti antrean Redis, RabbitMQ, atau socket TCP murni).

### @MessagePattern vs @EventPattern
- **@MessagePattern (Request-Response)**: Pengirim pesan mengharapkan respons kembali secara langsung. Pola ini cocok untuk kueri penting, misalnya Order Service menanyakan ke Inventory Service: "Apakah stok barang ini cukup?". Pengirim menunggu balikan data menggunakan `client.send(pattern, data)`.
- **@EventPattern (Event-Driven / Fire-and-Forget)**: Pengirim memancarkan event bahwa sesuatu telah terjadi dan tidak menunggu balikan nilai. Dipancarkan menggunakan `client.emit(pattern, data)`. Sangat ideal untuk notifikasi email atau audit logging.


---

---

## Penjelasan untuk Pemula

Bayangkan perbedaan antara berbicara lewat telepon vs mengirim surat kabar. Ketika Anda menelpon apotek untuk bertanya: "Apakah obat ini ada stok?" Anda menunggu apoteker menjawab "Ya, ada" sebelum menutup telepon (MessagePattern). Namun ketika bupati mengumumkan "Besok hari libur" lewat selebaran, bupati tidak menunggu balasan satu per satu dari seluruh warga (EventPattern).

## Eksperimen

- Gunakan `ClientProxyFactory.create({ transport: Transport.TCP })` untuk membuat klien microservice pengirim.
- Kirim command menggunakan `client.send({ cmd: "check_inventory" }, payload)` dan amati respons balik.
- Ganti transporter ke Redis dan amati bagaimana pesan didistribusikan melalui antrean Redis.

---

## Tantangan

Buat Microservice hybrid di `main.ts` menggunakan `app.connectMicroservice(...)` sehingga satu aplikasi NestJS dapat melayani HTTP REST dan mendengarkan event RabbitMQ secara bersamaan.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE PERMINTAAN NESTJS                               │
│                                                          │
│ HTTP Request ──► [Guards: Auth] ──► [Interceptors: Pre]  │
│                         │                                │
│                         ▼                                │
│              [Pipes: Validation DTO]                     │
│                         │                                │
│                         ▼                                │
│              [Controller: @Get/@Post]                    │
│                         │                                │
│                         ▼                                │
│              [Service: Business Logic]                   │
│                         │                                │
│                         ▼                                │
│ Response ◄── [Interceptors: Post] ◄── [Exception Filter] │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `@Controller('users')`
- **Fungsi Utama:** Dekorator pengenal rute API controller.
- **Parameter / Atribut:** `Base path string`.
- **Perilaku & Efek Sistem:** Memetakan request HTTP yang masuk ke handler method spesifik di dalam kelas controller..
- **Contoh Penggunaan Praktis:**
```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) { return { id }; }
}
```
- **Hasil Output yang Diharapkan:**
```text
Endpoint GET /users/:id siap diakses klien
```

### 2. `@Injectable()`
- **Fungsi Utama:** Dekorator penyedia layanan (Provider / Service).
- **Parameter / Atribut:** `Provider Scope (default: Singleton)`.
- **Perilaku & Efek Sistem:** Mendaftarkan class ke dalam IoC (Inversion of Control) Container NestJS untuk diinjeksi otomatis..
- **Contoh Penggunaan Praktis:**
```typescript
@Injectable()
export class UsersService {
  findAll() { return ['Alex', 'Budi']; }
}
```
- **Hasil Output yang Diharapkan:**
```text
Service siap diinjeksi ke Controller mana pun
```

### 3. `@Body() dto: CreateUserDto`
- **Fungsi Utama:** Ekstraksi dan validasi payload body.
- **Parameter / Atribut:** `DTO Class Schema`.
- **Perilaku & Efek Sistem:** Mengekstrak JSON body dari HTTP request dan memvalidasi aturan field via ValidationPipe..
- **Contoh Penggunaan Praktis:**
```typescript
@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```
- **Hasil Output yang Diharapkan:**
```text
Payload otomatis divalidasi sebelum logika dijalankan
```

### 4. `@Module({ controllers: [...], providers: [...] })`
- **Fungsi Utama:** Pengelompok modul arsitektur terstruktur.
- **Parameter / Atribut:** `controllers, providers, exports, imports`.
- **Perilaku & Efek Sistem:** Mengorganisasi aplikasi menjadi modul-modul independen dan kohesif..
- **Contoh Penggunaan Praktis:**
```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```
- **Hasil Output yang Diharapkan:**
```text
Modul Users siap diimpor oleh modul utama AppModule
```

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

Kamu telah menguasai NestJS Microservices, Transporters, dan Event Patterns. Minggu depan kita mempelajari Unit Testing dan End-to-End Testing dengan Jest.
