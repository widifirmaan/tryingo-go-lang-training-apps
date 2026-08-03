# Queues & Jobs

> Laravel | API & Realtime | Pelajaran 15

## Tujuan Pembelajaran

- Memindahkan kerja berat keluar dari request dengan Jobs (ShouldQueue)
- Memahami queue: sync vs database + worker (queue:work)
- Mengatur percobaan ulang: $tries dan $backoff
- Menangani kegagalan: tabel failed_jobs dan queue:retry

---

## Program: Queues & Jobs

```php
<?php

namespace App\Jobs;

use App\Models\Pesanan;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class KirimEmailPesananJob implements ShouldQueue
{
    use Queueable;

    public $tries = 3;

    public $backoff = 5;

    public function __construct(public Pesanan $pesanan)
    {
    }

    public function handle(): void
    {
        sleep(2);

        logger('Email konfirmasi dikirim ke '.$this->pesanan->email.' untuk '.$this->pesanan->produk);

        $this->pesanan->update(['status' => 'terkirim']);
    }
}

```

---

## Penjelasan

## Kenapa Queue?
Request HTTP punya batas waktu; klien menunggu response. Email/SMS/PDF/resize gambar = lambat. Queue memisahkan: request menyimpan PESANAN (cepat), pekerjaan lain (kirim email) dijalankan LATER oleh worker. User tidak menunggu hal yang tidak penting.
## Sync vs Queue Sungguhan
QUEUE_CONNECTION=sync: job jalan langsung di request (untuk development/test - sederhana tapi tetap memakai kode yang sama). database: job masuk tabel jobs, worker (php artisan queue:work) mengambil dan menjalankannya. Kode app TIDAK berubah - hanya konfigurasi.
## ShouldQueue & handle()
class ... implements ShouldQueue = tanda "kerjakan nanti". handle() berisi kerja sebenarnya. dispatch() = masukkan ke queue. Constructor berisi data job (serializable) - jangan masukkan resource/connection. public $tries = 3: kalau handle() melempar exception, coba ulang sampai 3x dengan jeda backoff.
## Kegagalan: Bukannya Hilang
Setelah percobaan habis, job pindah ke failed_jobs dengan exception lengkap. queue:failed (daftar), queue:retry (jalankan ulang), queue:forget (hapus satu), queue:flush (bersihkan). Kegagalan = data, bukan kejadian yang hilang.

---

## Eksperimen

1. **Kenapa Queue?**
2. **Sync vs Queue Sungguhan**
3. **ShouldQueue & handle()**
4. **Kegagalan: Bukannya Hilang**

---

## Tantangan

Latih queue dengan skenario nyata: (1) ubah job agar menghitung $this->attempt() dan log "Percobaan ke-N" - lalu tambah exception acak (if ($this->attempt() < 3) throw) dan amati retry + failed_jobs, (2) tunda pengiriman: KirimEmailPesananJob::dispatch($pesanan)->delay(now()->addSeconds(30)) dan buktikan lewat timestamp di log, (3) buat job kedua KirimWhatsappJob dan jalankan berantai dengan Bus::chain([...])->dispatch(), (4) pasang failed job handler di README: queue:retry all lalu jelaskan skenario pembayaran yang butuh idempotency.

---

## Ringkasan

Queue = request cepat, kerja ditunda. Worker = pengeksekusi. failed_jobs = jaring pengaman. Lanjut: broadcasting & WebSockets.
