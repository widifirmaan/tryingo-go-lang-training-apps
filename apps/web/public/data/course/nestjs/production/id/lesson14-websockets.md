# WebSockets: Chat Realtime

> NestJS | Produksi & Capstone | Pelajaran 14

## Tujuan Pembelajaran

- Menjelaskan WebSocket vs HTTP (dua arah vs satu arah)
- Menulis gateway dengan @WebSocketGateway
- Menangani event dengan @SubscribeMessage
- Broadcast realtime ke semua client

---

## Program: WebSockets: Chat Realtime

```ts
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Gateway: endpoint WebSocket - komunikasi dua arah & realtime
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // server Socket.IO, bisa broadcast ke semua client

  handleConnection(client: Socket) {
    console.log(`Client terhubung: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client terputus: ${client.id}`);
  }

  @SubscribeMessage('kirimPesan')
  kirimPesan(@MessageBody() pesan: string): void {
    // broadcast ke SEMUA client yang terhubung
    this.server.emit('pesanBaru', {
      dari: 'server',
      pesan,
      waktu: new Date().toISOString(),
    });
  }
}
```

---

## Penjelasan

## WebSocket vs HTTP: Kenapa Harus Dua Arah
HTTP: client minta, server jawab, selesai - server TIDAK BISA menghubungi client duluan. Chat, notifikasi, live dashboard butuh push: server harus mengirim SEJAK ADA peristiwa. WebSocket = koneksi TCP yang tetap terbuka, dua arah, latensi rendah. Socket.IO (di belakang @nestjs/websockets) menambahkan fallback (reconnect otomatis, room, broadcast).
## Gateway: WebSocket Sebagai Provider Nest
ChatGateway didaftarkan sebagai provider biasa (di ChatModule) - tapi dengan decorators ia menjadi endpoint WebSocket. @WebSocketServer() menyuntikkan instance Socket.IO (server). handleConnection/handleDisconnect = lifecycle: siapa masuk/keluar. Gateway juga bisa inject service lain - berbagi logika bisnis dengan HTTP (misal: simpan pesan ke database).
## @SubscribeMessage: Event yang Dikirim Client
Client mengirim socket.emit('kirimPesan', 'halo') → server menjalankan kirimPesan(@MessageBody() pesan). Server lalu broadcast: server.emit('pesanBaru', data) ke SEMUA client - setiap client mendengarkan dengan socket.on('pesanBaru', ...). Ini pola chat klasik; untuk chat privat ada room (client.join('ruangA') + server.to('ruangA').emit(...)).
## Kapan WebSocket, Kapan REST
REST untuk permintaan-jawaban (CRUD, autentikasi). WebSocket untuk data yang BERUBAH tanpa diminta: chat, kolaborasi, notification, live tracking, game. Aplikasi nyata memakai KEDUANYA: REST untuk API, WebSocket untuk aliran realtime - seperti di chat dengan riwayat (REST) + pesan baru (WS).

---

## Eksperimen

1. **WebSocket vs HTTP: Kenapa Harus Dua Arah**
2. **Gateway: WebSocket Sebagai Provider Nest**
3. **@SubscribeMessage: Event yang Dikirim Client**
4. **Kapan WebSocket, Kapan REST**

---

## Tantangan

Perluas chat: (1) tambah room: event joinRuang (client.join) dan kirimPesanKeRuang yang broadcast ke room tertentu (server.to(ruang).emit), (2) server menyapa user baru dengan event selamatDatang ke client tersebut SAJA (client.emit, bukan server.emit), (3) integrasikan JwtAuthGuard: verifikasi token saat koneksi (guard gateway via APP_GUARD atau validasi manual di handleConnection), (4) tampilkan jumlah client online di UI (event dengan server.engine.clientsCount).

---

## Ringkasan

WebSocket = dua arah, realtime. Gateway = provider ber-decorator. Broadcast & room. REST + WS berdampingan. Lanjut: Docker & CI/CD.
