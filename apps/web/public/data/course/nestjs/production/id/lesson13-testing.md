# Testing: Unit & E2E

> NestJS | Produksi & Capstone | Pelajaran 13

## Tujuan Pembelajaran

- Membedakan unit test dan e2e test
- Menulis unit test service dengan Test.createTestingModule
- Menulis e2e test dengan Supertest (HTTP asli)
- Menjalankan test secara otomatis dan di CI

---

## Program: Testing: Unit & E2E

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CatatanService } from './catatan.service';

// Unit test: menguji service TANPA HTTP, TANPA database
describe('CatatanService', () => {
  let service: CatatanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatatanService],
    }).compile();
    service = module.get<CatatanService>(CatatanService);
  });

  it('membuat catatan baru dengan selesai=false', () => {
    const catatan = service.buat('Tes unit pertama');
    expect(catatan.judul).toBe('Tes unit pertama');
    expect(catatan.selesai).toBe(false);
  });

  it('melempar NotFoundException untuk id yang tidak ada', () => {
    expect(() => service.detail(999)).toThrow(NotFoundException);
  });

  it('menandai catatan selesai', () => {
    const dibuat = service.buat('Kerjakan PR');
    const selesai = service.tandaiSelesai(dibuat.id);
    expect(selesai.selesai).toBe(true);
  });
});
```

---

## Penjelasan

## Unit Test: Service Tanpa Aplikasi
Test.createTestingModule({ providers: [CatatanService] }).compile() membangun HANYA service - tanpa HTTP, tanpa database, tanpa modul lain. Cepat dan isolatif: kegagalan pasti dari kode yang diuji, bukan tetangganya. Sebelum tiap test, module dibuat ulang (beforeEach) - tiap test dimulai dari keadaan bersih, tidak bergantung urutan.
## E2E Test: Aplikasi Utuh Lewat HTTP
app.init() menyalakan aplikasi asli di memori; Supertest (request(app.getHttpServer())) mengirim HTTP sungguhan: GET, POST, header, status code, body. Di sini ValidationPipe global ikut bekerja - POST tanpa judul dijamin 400. E2E lambat tapi jujur: ia menguji kontrak yang DILIHAT client.
## Piramida Test: Banyak Unit, Sedikit E2E
Paling bawah: unit test (puluhan, cepat). Tengah: integration test (modul + database nyata). Atas: e2e (beberapa, jalan penuh). Arahkan sebagian besar usaha ke unit test - e2e yang banyak membuat suite lambat dan rapuh. Nest scaffolding membaginya rapi: *.spec.ts untuk unit, test/*.e2e-spec.ts untuk e2e.
## Test di CI: Pintu Gerbang Produksi
Test yang tidak dijalankan otomatis = test yang perlahan diabaikan. Pasang npm test di pipeline CI (pelajaran 15): setiap push yang memecahkan test menghentikan deployment. Ini budaya bootcamp: merah di CI lebih murah daripada insiden di produksi.

---

## Eksperimen

1. **Unit Test: Service Tanpa Aplikasi**
2. **E2E Test: Aplikasi Utuh Lewat HTTP**
3. **Piramida Test: Banyak Unit, Sedikit E2E**
4. **Test di CI: Pintu Gerbang Produksi**

---

## Tantangan

Perkuat suite test: (1) tambah unit test untuk tandaiSelesai dengan id tidak ada (harus throw), (2) tambah e2e test: PUT /catatan/:id/selesai (tambah route-nya dulu di controller) → 200 dan body selesai=true, (3) buat test untuk ValidationPipe: kirim judul 2 karakter → 400, (4) refactor service agar data awal kosong dan seed lewat method - jelaskan kenapa test lebih stabil dengan pola ini.

---

## Ringkasan

Unit = cepat & isolatif. E2E = kontrak asli lewat HTTP. Piramida: banyak unit, sedikit e2e. CI = pintu gerbang. Lanjut: WebSockets.
