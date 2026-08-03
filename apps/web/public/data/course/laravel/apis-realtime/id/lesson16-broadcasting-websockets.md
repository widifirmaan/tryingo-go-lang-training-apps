# Broadcasting & WebSockets

> Laravel | API & Realtime | Pelajaran 16

## Tujuan Pembelajaran

- Memahami pola broadcast vs polling untuk data real-time
- Membuat Event ShouldBroadcast dengan channel dan broadcastAs
- Menjalankan server WebSocket Reverb dan klien Laravel Echo
- Memilih channel publik vs private/presence

---

## Program: Broadcasting & WebSockets

```php
<?php

namespace App\Events;

use App\Models\Pesanan;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PesananBaru implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Pesanan $pesanan)
    {
    }

    public function broadcastOn(): array
    {
        return [new Channel('pesanan')];
    }

    public function broadcastAs(): string
    {
        return 'pesanan.baru';
    }
}

```

---

## Penjelasan

## Real-time: Dua Pendekatan
Polling = klien bertanya tiap 5 detik (boros, telat). WebSocket = koneksi permanen, server PUSH saat ada kejadian (seketika, efisien). Laravel broadcast = lapisan yang membuat app Anda bisa push tanpa tahu protokolnya: Reverb lokal atau Pusher/Soketi di produksi.
## Event: ShouldBroadcast
class PesananBaru implements ShouldBroadcast = "kejadian ini harus disiarkan". broadcastOn() = channel tujuan (Channel('pesanan') = publik). broadcastAs() = nama event di sisi klien ('.pesanan.baru' dengan titik = jangan tambahkan namespace default). dispatch() dari controller = siarkan ke semua pendengar channel.
## Server & Klien
Server: php artisan reverb:start (server WebSocket berbasis Laravel, protokol kompatibel Pusher). Klien: Laravel Echo + pusher.js di browser. Echo.channel('pesanan').listen('.pesanan.baru', cb) - callback dipanggil SETIAP kali event terbit, tanpa refresh.
## Memilih Channel
Channel = publik (Channel). PrivateChannel = hanya user terotorisasi (routes/channels.php: auth callback). PresenceChannel = private + daftar siapa yang online. Mulai dari publik, naik ke private saat ada data pribadi.

---

## Eksperimen

1. **Real-time: Dua Pendekatan**
2. **Event: ShouldBroadcast**
3. **Server & Klien**
4. **Memilih Channel**

---

## Tantangan

Bangun real-time yang lebih dalam: (1) ubah ke PrivateChannel pesanan.{user} - tambahkan routes/channels.php dengan auth callback yang memverifikasi user, dan Echo.private('pesanan.' + userId) di klien, (2) buat presence channel kehadiran dengan counter "X sedang melihat panel" (Echo.join('presensi.panel')), (3) tambah kolom terkirim_at di pesanans dan kirim event kedua PesananDiproses 5 detik setelahnya (delay via queue), (4) README: jelaskan beda deployment - Reverb di server sendiri vs Pusher managed.

---

## Ringkasan

Broadcast = server push, bukan polling. Reverb = server, Echo = klien. Channel publik vs private. Lanjut: PHPUnit testing.
