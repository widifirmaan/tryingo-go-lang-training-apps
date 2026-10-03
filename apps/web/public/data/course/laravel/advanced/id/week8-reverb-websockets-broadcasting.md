# Komunikasi Real-Time: Laravel Reverb WebSockets & Event Broadcasting

> **Kategori:** Laravel Framework | **Level:** Lanjutan | **Minggu 8:** Komunikasi Real-Time: Laravel Reverb WebSockets & Event Broadcasting
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur server WebSocket resmi Laravel: Laravel Reverb (berkinerja sangat tinggi, ribuan koneksi per detik).
- Menggunakan interface `ShouldBroadcast` dan `ShouldBroadcastNow` pada Event kelas Laravel.
- Membedakan jenis Channel Broadcasting: Public Channel, Private Channel, dan Presence Channel.
- Menghubungkan frontend browser secara real-time menggunakan pustaka client `laravel-echo`.

---

## Program: Ticker Flash Sale Stok Real-Time dengan Laravel Reverb & Laravel Echo

```php
<?php
// app/Events/StockUpdatedEvent.php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

// ShouldBroadcastNow: Langsung siarkan ke WebSocket detik ini juga tanpa antrean queue
class StockUpdatedEvent implements ShouldBroadcastNow {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public int $productId,
        public string $sku,
        public int $remainingStock
    ) {}

    // Channel Publik yang didengarkan oleh ribuan pembeli di browser
    public function broadcastOn(): array {
        return [
            new Channel('marketplace.flash-sale'),
        ];
    }

    public function broadcastAs(): string {
        return 'stock.ticker.updated';
    }
}

// Client-Side Frontend (JavaScript dengan Laravel Echo):
$frontendEchoSnippet = <<<'JS'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

// Dengarkan pembaruan stok real-time tanpa reload halaman!
window.Echo.channel('marketplace.flash-sale')
    .listen('.stock.ticker.updated', (event) => {
        console.log(`[LIVE UPDATE] Stok SKU ${event.sku} berkurang menjadi: ${event.remainingStock} unit!`);
        document.getElementById(`stock-${event.productId}`).textContent = event.remainingStock;
    });
JS;

echo "=== LARAVEL REVERB REAL-TIME EVENT BROADCASTING TERKONFIGURASI ===\n";
```

---

## Konsep Kunci

Di masa lalu, developer Laravel terpaksa membayar layanan pihak ketiga yang mahal (seperti Pusher) atau memasang server socket Node.js terpisah untuk menambahkan fitur real-time. Mulai Laravel 11, Laravel merilis **Laravel Reverb**: server WebSocket resmi first-party yang ditulis khusus untuk ekosistem Laravel.

### Mengapa Laravel Reverb Mengubah Segalanya?
Reverb berjalan langsung di infrastruktur server Anda, mampu menangani puluhan ribu koneksi WebSocket konkuren dengan latensi rendah dan konsumsi memori minimal.

### Mekanisme Event Broadcasting
1. Ketika transaksi penjualan flash-sale terjadi, controller memanggil `StockUpdatedEvent::dispatch($productId, $sku, $stock)`.
2. Laravel memeriksa method `broadcastOn()` yang mengembalikan `new Channel('marketplace.flash-sale')`.
3. Event langsung diteruskan ke Reverb WebSocket Server.
4. Reverb menyiarkan frame JSON ke seluruh browser pembeli yang sedang membuka halaman produk via **Laravel Echo**, memperbarui angka sisa stok di layar dalam milidetik tanpa perlu me-refresh halaman web!


---

---

## Penjelasan untuk Pemula

Bayangkan ruang lelang barang antik. Ketika juru lelang mengetuk palu (Event), juru lelang tidak menelpon satu per satu 500 tamu lelang lewat telepon. Juru lelang berbicara lewat mikrofon ruang lelang (Laravel Reverb) dan seluruh tamu yang memegang alat penerima nirkabel (Laravel Echo) mendengar angka tawaran terbaru pada detik yang sama persis.

## Eksperimen

- Jalankan server WebSocket Reverb di terminal menggunakan perintah `php artisan reverb:start`.
- Buka dua tab browser berbeda dan amati bagaimana perubahan stok di tab 1 langsung ter-update di tab 2.
- Gunakan `PrivateChannel` dan konfigurasikan otorisasi channel di `routes/channels.php`.

---

## Tantangan

Gunakan Presence Channel (`new PresenceChannel("store.live-shoppers." . $storeId)`) untuk menghitung dan menampilkan jumlah pembeli yang sedang aktif melihat etalase toko secara live.

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

Kamu telah menguasai Laravel Reverb WebSockets dan Event Broadcasting real-time. Minggu depan kita mempelajari Full-Text Search dengan Laravel Scout dan optimasi Horizon.
