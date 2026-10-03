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
