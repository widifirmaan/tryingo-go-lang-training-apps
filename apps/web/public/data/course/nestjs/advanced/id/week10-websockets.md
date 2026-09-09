# WebSocket — Bel Live Warung NestJS

> **Kategori:** NestJS | **Level:** Lanjutan | **Minggu 10:** WebSockets & Real-time
> **Prasyarat:** Minggu 9 — **Testing NestJS**.

## Tujuan Pembelajaran

- `@WebSocketGateway()` + `@SubscribeMessage("pesan")` dengar + `server.emit` siar (sumber: docs.nestjs.com/websockets/gateways)
- `socket.io` HP tetap tersambung (bukan refresh!)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa WebSocket, HP refresh tiap 5 detik cek pesanan (boros baterai). Dengan gateway, pesanan masuk → HP bunyi detik itu. Kasir + dapur + kurir sinkron live.

---

## Program: Bel Pesanan Warung

```bash
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
```

```typescript
// pesanan.gateway.ts — bel
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class PesananGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("pesan-baru")
  tangani(@MessageBody() data: any) {
    console.log("Pesanan:", data);
    this.server.emit("dapur", data); // siar ke SEMUA dapur!
    return { ok: true };
  }

  // Panggil dari service biasa (misal setelah save):
  siarStokHabis(nama: string) {
    this.server.emit("stok-habis", { nama });
  }
}
```

```javascript
// HP (socket.io-client): dengar terus, tanpa refresh!
socket.on("dapur", (data) => tampilkan(data));
socket.on("stok-habis", (d) => bunyikan(d.nama));
```

---

## Konsep Kunci

### `@WebSocketGateway` = Menara Siar
1 gateway, banyak HP tersambung WebSocket.

### `@SubscribeMessage` + `emit` = Dengar + Siar
`SubscribeMessage("pesan-baru")` dengar topik, `server.emit` siar ke semua.

---

## Penjelasan untuk Pemula

### Analogi: Radio Warung
- **Gateway = menara radio**, **emit = siar**, **HP = radio** menyala terus.

### Langkah 0 — Siapkan Device
- `npm install` paket di atas + 2 HP/browser tab untuk test siar.

### Cara Komputer Membaca
1. HP A `emit("pesan-baru")` → gateway → `tanggapi` → `server.emit("dapur")` → HP B + C terima.

### 3 Istilah Wajib
1. **Gateway/emit/subscribe**: menara/siar/dengar

---

## Eksperimen

- **Hijau:** 2 tab: A kirim → B terima?
- **Kuning:** Matikan 1 tab → lain tetap?
- **Merah:** Tanpa `cors` → HP beda domain ditolak? Tambah.

---

## Tantangan

**Warung Live:** Gateway `pesan-baru` + `stok-habis` + 2 tab dengar bareng screenshot.

---

## Glosarium Mini

- **Gateway/emit**: menara/siar

---

## Ringkasan

Minggu 10 dari 12: **Bel Live** (Level: Lanjutan). Tanpa refresh. Minggu depan: **Microservices**.
