# Providers & Services — Dapur Terpisah

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 2:** Providers & Services

## Tujuan Pembelajaran

- `service` = dapur yang masak, `controller` hanya antar — `Inject` dapur ke pelayan

---

## Program

```typescript
// produk.service.ts
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProdukService {
  private daftar = [{ id: 1, nama: "Beras", harga: 62000 }];
  semua(){ return this.daftar; }
  tambah(p){ this.daftar.push({ id: Date.now(), ...p }); return p; }
}

// produk.controller.ts
@Controller('produk')
export class ProdukController {
  constructor(private produkService: ProdukService) {}
  @Get() semua(){ return this.produkService.semua(); }
  @Post() tambah(@Body() body){ return this.produkService.tambah(body); }
}
```

---

## Ringkasan

Minggu 2: **Dapur Terpisah** — service di-inject ke controller.
