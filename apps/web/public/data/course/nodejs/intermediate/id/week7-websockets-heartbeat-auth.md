# Komunikasi Real-Time: WebSockets (ws), Token Auth & Heartbeat Ping/Pong

> **Kategori:** Node.js Backend | **Level:** Menengah | **Minggu 7:** Komunikasi Real-Time: WebSockets (ws), Token Auth & Heartbeat Ping/Pong

## Tujuan Pembelajaran

- Menguasai protokol WebSocket (RFC 6455) dan handshake upgrade dari HTTP.
- Menerapkan autentikasi koneksi WebSocket menggunakan token atau cookie aman.
- Membangun mekanisme Heartbeat Ping/Pong untuk mendeteksi dan membersihkan koneksi mati (Zombie Connections).
- Mengoptimalkan penyiaran pesan (broadcasting) ke ribuan klien secara efisien.

---

## Program: Gateway WebSocket Telemetri dengan Deteksi Koneksi Zombie & Heartbeat

```javascript
// Arsitektur WebSocket Server Berkecepatan Tinggi (Menggunakan pustaka 'ws')
import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log('=== WEBSOCKET TELEMETRY GATEWAY AKTIF DI PORT 8080 ===');

// Pool Klien Terkoneksi
const clients = new Map();

// 1. Heartbeat Ping-Pong Interval (Pembersih Koneksi Zombie)
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      console.log(`[ZOMBIE DETECTED] Menghentikan koneksi mati untuk client: ${clients.get(ws)?.clientId}`);
      clients.delete(ws);
      return ws.terminate();
    }

    // Tandai false dan kirim Ping; client harus membalas Pong untuk mereset ke true
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => clearInterval(heartbeatInterval));

// 2. Koneksi Masuk & Autentikasi
wss.on('connection', (ws, req) => {
  // Ekstrak token dari query string: ws://localhost:8080?token=SECRET_KEY_99
  const url = new URL(req.url, 'http://localhost:8080');
  const token = url.searchParams.get('token');

  if (token !== 'GATEWAY_SECRET_2026') {
    ws.send(JSON.stringify({ error: 'UNAUTHORIZED: Token invalid!' }));
    return ws.close(1008, 'Policy Violation');
  }

  const clientId = `CLI-${Math.floor(Math.random() * 10000)}`;
  ws.isAlive = true;
  clients.set(ws, { clientId, connectedAt: Date.now() });

  console.log(`[CLIENT CONNECTED] ${clientId} berhasil terautentikasi.`);
  ws.send(JSON.stringify({ event: 'CONNECTED', clientId, message: 'Selamat datang di Tryngo Gateway' }));

  // Handler Pong Heartbeat
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Handler Pesan Masuk
  ws.on('message', (data, isBinary) => {
    const messageText = isBinary ? data : data.toString();
    console.log(`[MESSAGE RECEIVED] Dari ${clientId}:`, messageText);

    // Broadcast pesan ke seluruh client aktif lainnya
    for (const [clientWs, meta] of clients.entries()) {
      if (clientWs !== ws && clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ from: clientId, payload: messageText }));
      }
    }
  });

  ws.on('close', () => {
    console.log(`[CLIENT DISCONNECTED] ${clientId} keluar.`);
    clients.delete(ws);
  });
});
```

---

## Konsep Kunci

HTTP bersifat stateless (request-response). Namun untuk dasbor live telemetri, kolaborasi dokumen real-time, atau notifikasi kilat, klien dan server membutuhkan koneksi dua arah (bi-directional) berlatensi sangat rendah yang tetap terbuka secara terus-menerus: **WebSocket**.

### Handshake HTTP Upgrade
Koneksi WebSocket dimulai dengan request HTTP standar yang memuat header:
`Connection: Upgrade`
`Upgrade: websocket`
Jika server menerima, koneksi TCP di-*upgrade* menjadi socket biner dua arah penuh tanpa overhead header HTTP berulang pada setiap pengiriman data.

### Bahaya Koneksi Zombie
Di dunia nyata, pengguna mobile sering melewati terowongan, baterai ponsel habis, atau kabel LAN tiba-tiba dicabut tanpa mengirimkan frame penutupan TCP (FIN/RST). Jika server tidak memantau, koneksi tersebut akan tetap menggantung di memori server selamanya sebagai **Zombie Connection**, memakan kuota file descriptor dan RAM.

### Pola Heartbeat Ping/Pong
Protokol WebSocket memiliki opcode khusus: `Ping (0x9)` dan `Pong (0xA)`. Setiap 30 detik, server mengirim Ping ke klien. Jika klien tidak merespons dengan Pong sebelum interval berikutnya, server memanggil `ws.terminate()` untuk membebaskan soket dan memori secara instan.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda sedang berbicara lewat telepon dengan teman. Jika teman Anda tiba-tiba masuk ke dalam lift dan sinyalnya hilang tanpa mematikan telepon, Anda akan terus berbicara sendiri ke layar telepon yang hening (Zombie Connection). Untuk mengetahuinya, setiap 30 detik Anda bertanya: "Kamu masih di situ?" (Ping). Jika teman Anda tidak menjawab "Ya, masih!" (Pong), Anda langsung mematikan sambungan telepon.

## Eksperimen

- Hubungkan klien WebSocket via browser `const ws = new WebSocket("ws://localhost:8080?token=GATEWAY_SECRET_2026")`.
- Coba hubungkan klien dengan token salah dan perhatikan kode penutupan 1008 (Policy Violation).
- Matikan WiFi komputer klien dan amati bagaimana server mendeteksi zombie connection setelah 30 detik.

---

## Tantangan

Implementasikan sistem Channel Subscription: izinkan klien mengirim pesan `{ action: "SUBSCRIBE", channel: "telemetry:room_1" }` dan pastikan broadcast hanya dikirimkan ke subscriber channel yang relevan.

---

## Ringkasan

Kamu telah menguasai WebSockets, autentikasi handshake, dan pembersihan zombie dengan heartbeat. Level 2 selesai! Di Level 3 kita mempelajari V8 Memory Profiling, Security Hardening, dan Gateway Capstone.
