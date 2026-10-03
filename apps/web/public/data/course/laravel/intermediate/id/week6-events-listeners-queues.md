# Arsitektur Event-Driven: Events, Listeners & Background Queues dengan Redis

> **Kategori:** Laravel Framework | **Level:** Menengah | **Minggu 6:** Arsitektur Event-Driven: Events, Listeners & Background Queues dengan Redis

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

## Ringkasan

Kamu telah menguasai Event-Driven Architecture, ShouldQueue, dan antrean Redis di Laravel. Minggu depan kita mempelajari integrasi pembayaran Stripe dan Laravel Cashier.
