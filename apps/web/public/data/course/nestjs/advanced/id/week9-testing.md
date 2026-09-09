# Testing NestJS — Cicip Warung Beneran

> **Kategori:** NestJS | **Level:** Lanjutan | **Minggu 9:** Testing NestJS
> **Prasyarat:** Minggu 8 — **Error & Logging**.

## Tujuan Pembelajaran

- `Test.createTestingModule` + `compile()` + `useValue` mock (sumber: docs.nestjs.com/fundamentals/testing)
- E2E `supertest` `request(app).get("/produk").expect(200)` beneran (bukan `console.log`!)

---

## Kenapa Ini Penting Buat Kamu?

Simulasi `console.log("test...")` tidak menangkap bug (tidak dicek mesin!). Test beneran: ubah service → merah → perbaiki. E2E buktikan pintu + DB + auth jalan bareng.

---

## Program: Cicip Beneran NestJS

```bash
npm install --save-dev jest supertest @types/supertest
```

```typescript
// produk.service.spec.ts — unit + mock DB!
import { Test } from "@nestjs/testing";
import { ProdukService } from "./produk.service";

describe("ProdukService", () => {
  let service: ProdukService;

  beforeEach(async () => {
    const modul = await Test.createTestingModule({
      providers: [
        ProdukService,
        { provide: "REPO", useValue: { find: async () => [{ nama: "Beras" }] } },
      ],
    }).compile();
    service = modul.get(ProdukService);
  });

  it("semua ada Beras", async () => {
    expect((await service.semua())[0].nama).toBe("Beras");
  });
});
```

```typescript
// app.e2e-spec.ts — pintu beneran!
import * as request from "supertest";

it("GET /produk 200", () => {
  return request("http://localhost:3000").get("/produk").expect(200);
});
```

```bash
npm test  # HIJAU beneran
```

---

## Konsep Kunci

### `Test.createTestingModule` = Warung Bohongan
Bangun module khusus uji + `useValue` mock DB (tanpa Postgres beneran!).

### E2E `supertest` = Pelanggan Bohongan
HTTP beneran ke app jalan → `expect(200)`.

---

## Penjelasan untuk Pemula

### Analogi: Dapur Uji + Mystery Shopper
- **Unit = cicip dapur** (service + mock), **E2E = mystery shopper** (pintu beneran).

### Langkah 0 — Siapkan Device
- `npm install --save-dev jest supertest` + `npm test`.

### Cara Komputer Membaca
1. `createTestingModule` → DI bohongan → `service` pakai mock.
2. `supertest` → HTTP nyata → status cocok?

### 3 Istilah Wajib
1. **Unit/E2E/mock**: dapur/pintu/palsu

---

## Eksperimen

- **Hijau:** Ubah service rusak → merah?
- **Kuning:** Tanpa mock DB → test sentuh DB asli? (Jangan! Mock.)
- **Merah:** File tanpa `.spec.ts` → tidak jalan? Ganti nama.

---

## Tantangan

**Warung Teruji:** Unit service (mock) 3 test + E2E 2 pintu HIJAU + screenshot.

---

## Glosarium Mini

- **spec/mock/supertest**: uji/palsu/pintu-bohongan

---

## Ringkasan

Minggu 9 dari 12: **Cicip Beneran** (Level: Lanjutan). Tanpa simulasi. Minggu depan: **WebSocket**.
