# Arsitektur Event-Driven: Events, Listeners & Background Queues dengan Redis

> **Kategori:** Laravel Framework | **Level:** Menengah | **Minggu 6:** Arsitektur Event-Driven: Events, Listeners & Background Queues dengan Redis
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami pola Event-Driven Architecture (pemisahan logika bisnis dari efek samping sekunder).
- Menggunakan interface `ShouldQueue` untuk mengubah Listener sinkron menjadi tugas background otomatis.
- Mengonfigurasi driver antrean Redis berkinerja tinggi di `config/queue.php`.
- Menangani toleransi kegagalan: konfigurasi `$tries`, `$backoff`, dan pengelolaan tabel `failed_jobs`.

---

## Program: Pipeline Pemrosesan Pesanan Asinkron dengan Event & Antrean Redis

```php
<?php
// app/Events/OrderPlaced.php
namespace App\Events;

use App\Models\Order;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderPlaced {
    use Dispatchable, SerializesModels;

    public function __construct(public Order $order) {}
}

// app/Listeners/SendOrderInvoiceNotification.php
namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

// Interface ShouldQueue memberitahu Laravel untuk menjalankan listener ini di Background Worker!
class SendOrderInvoiceNotification implements ShouldQueue {
    use InteractsWithQueue;

    public int $tries = 3;             // Coba ulang maksimal 3 kali jika gagal
    public int $timeout = 60;          // Batas waktu eksekusi 60 detik
    public int $backoff = 15;          // Jeda waktu 15 detik sebelum mencoba ulang

    public function handle(OrderPlaced $event): void {
        $order = $event->order;
        echo "[BACKGROUND QUEUE WORKER] Memproses pengiriman kwitansi PDF untuk Pesanan #{$order->id}...\n";
        
        // Simulasi pengiriman email asinkron tanpa memblokir koneksi browser pembeli
        // Mail::to($order->buyer_email)->send(new OrderInvoiceMail($order));
        
        echo "[QUEUE WORKER SUCCESS] Email kwitansi berhasil dikirim ke {$order->buyer_email}!\n";
    }

    public function failed(OrderPlaced $event, \Throwable $exception): void {
        echo "[QUEUE JOB FAILED] Seluruh percobaan habis. Catat ke tabel failed_jobs: " . $exception->getMessage() . "\n";
    }
}

// Memicu Event di Controller (Hanya memakan waktu 3ms):
// OrderPlaced::dispatch($newOrder);

echo "=== LARAVEL QUEUED EVENT-DRIVEN ARCHITECTURE TERKONFIGURASI ===\n";
```

---

## Konsep Kunci

Ketika pembeli menekan tombol "Bayar Sekarang" di marketplace, ada banyak hal yang harus terjadi: mengurangi stok, mengirim email invoice PDF, mengirim notifikasi push ke aplikasi kurir, dan mengirim WhatsApp ke merchant. Jika seluruh proses ini dijalankan secara sinkron, browser pembeli akan berputar (loading) selama 10 detik.

### Pola Event-Driven di Laravel
1. Controller hanya fokus pada tugas utamanya: menyimpan pesanan ke database, lalu memancarkan event:
   `OrderPlaced::dispatch($order);`
   Controller langsung mengembalikan respons sukses ke pembeli dalam 5 milidetik.
2. Setiap listener yang mengimplementasikan **`ShouldQueue`** otomatis diubah oleh Laravel menjadi job serialized dan didorong ke antrean memori **Redis**.
3. **Queue Worker Process** (`php artisan queue:work redis`) yang berjalan terpisah di background mengambil job tersebut dan mengeksekusi pengiriman email satu per satu tanpa membebani server web utama.


---

---

## Penjelasan untuk Pemula

Bayangkan memesan makanan di kafe. Kasir memberikan nomor struk dalam 10 detik (Controller selesai). Kasir tidak menyuruh Anda berdiri di depan meja kasir selama 20 menit menunggu koki menggoreng kentang dan membuat kopi. Pesanan Anda dicatat di papan antrean dapur (Redis Queue), dan pelayan mengantarkannya ke meja Anda saat kopi siap (Queue Worker).

## Eksperimen

- Jalankan worker di terminal menggunakan `php artisan queue:work redis --queue=default`.
- Kirim event dan amati bagaimana log antrean muncul di terminal worker secara asinkron.
- Lemparkan exception di dalam listener dan buktikan job dicoba ulang sebanyak 3 kali sesuai nilai `$tries`.

---

## Tantangan

Gunakan fitur Job Chaining (`Bus::chain([...])`) untuk memastikan bahwa pembuatan invoice PDF harus sukses terlebih dahulu sebelum pekerjaan pengiriman email diizinkan berjalan.

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

### 1. Mass Assignment Exception
- **Gejala / Masalah:** Muncul error `Add [field] to fillable property to allow mass assignment` saat create/update model.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Daftarkan kolom yang aman di properti `protected $fillable = [...]` pada Model Eloquent.

### 2. Menyimpan Logika Bisnis di Controller (Fat Controller)
- **Gejala / Masalah:** Controller menjadi ribet, sulit diuji (*untestable*), dan melanggar prinsip Single Responsibility.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pindahkan logika bisnis ke Action Classes, Service Classes, atau Form Requests.

### 3. Lupa Menjalankan `php artisan config:cache` di Server Produksi
- **Gejala / Masalah:** Pembacaan file konfigurasi secara berulang memperlambat response time aplikasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Jalankan caching konfigurasi, route, dan view saat pipeline deployment produksi selesai.

---

## Ringkasan

Kamu telah menguasai Event-Driven Architecture, ShouldQueue, dan antrean Redis di Laravel. Minggu depan kita mempelajari integrasi pembayaran Stripe dan Laravel Cashier.
