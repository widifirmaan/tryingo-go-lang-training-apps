# Microservices — Warung Bercabang NestJS

> **Kategori:** NestJS | **Level:** Lanjutan | **Minggu 11:** Microservices

## Tujuan Pembelajaran

- `@MessagePattern("hitung")` tanya-jawab + `@EventPattern("pesan")` siar-lupa via TCP (sumber: docs.nestjs.com/microservices/basics)
- `ClientProxy` telepon cabang dari gateway

---

## Kenapa Ini Penting Buat Kamu?

1 server untuk 10.000 pelanggan = antre. Pecah: `gateway` (pintu) + `produk` (rak) + `pesanan` (kasir) — sibuk 1, lain tetap. Cabang mati 1 → lain jalan.

---

## Program: 2 Cabang TCP Warung

```bash
npm install @nestjs/microservices
```

```typescript
// CABANG produk (port 3001): main.ts
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function mulai() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProdukModule, {
    transport: Transport.TCP,
    options: { port: 3001 },
  });
  await app.listen();
}
mulai();
```

```typescript
// produk.controller.ts (cabang) — jawab pola
import { MessagePattern, EventPattern } from "@nestjs/microservices";

@Controller()
export class ProdukController {
  @MessagePattern("cari-produk")   // tanya → TUNGGU jawab
  cari(data: any) {
    return { nama: "Beras", harga: 62000 };
  }

  @EventPattern("stok-habis")      // siar → TIDAK tunggu
  catat(data: any) {
    console.log("Stok habis:", data);
  }
}
```

```typescript
// GATEWAY (port 3000): telepon cabang
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

const cabang = ClientProxyFactory.create({
  transport: Transport.TCP,
  options: { port: 3001 },
});

@Get("cari")
async cari() {
  return cabang.send("cari-produk", {}); // tunggu jawab
}
```

---

## Konsep Kunci

### `MessagePattern` vs `EventPattern` = Telepon vs Pengeras
`MessagePattern` tanya-tunggu jawab. `EventPattern` siar-lupa.

### TCP Transport = Kabel Telepon
`port: 3001` cabang dengar. Nanti ganti Redis/RabbitMQ tanpa ubah pola!

---

## Penjelasan untuk Pemula

### Analogi: Kantor Cabang
- **Gateway = resepsionis**, **cabang = divisi**, **MessagePattern = telepon**, **EventPattern = pengeras**.

### Langkah 0 — Siapkan Device
- 2 terminal: `cabang` (3001) + `gateway` (3000).

### Cara Komputer Membaca
1. `GET /cari` → gateway `send("cari-produk")` → TCP ke 3001 → cabang jawab → gateway balas.

### 3 Istilah Wajib
1. **Message/Event**: telepon/pengeras
2. **Gateway/cabang**: resepsionis/divisi

---

## Eksperimen

- **Hijau:** Matikan cabang → gateway timeout? (Butuh retry! W12.)
- **Kuning:** `EventPattern` → gateway tidak tunggu (langsung balas)?
- **Merah:** Port cabang salah → `ECONNREFUSED`? Betulkan 3001.

---

## Tantangan

**Warung Bercabang:** Gateway + 2 cabang (`produk`, `pesanan`) + `MessagePattern` 2 + `EventPattern` 1 + `curl` lulus.

---

## Glosarium Mini

- **Message/Event/TCP**: telepon/pengeras/kabel

---

## Ringkasan

Minggu 11 dari 12: **Bercabang** (Level: Lanjutan). Anti antre. Minggu depan: **Capstone**.
