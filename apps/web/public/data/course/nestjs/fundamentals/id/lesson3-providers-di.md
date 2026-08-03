# Providers & Dependency Injection

> NestJS | Fondasi Nest | Pelajaran 3

## Tujuan Pembelajaran

- Menjelaskan DI container dan kenapa ia ada
- Mendaftarkan dan meng-inject provider
- Menggunakan value provider dengan token (useValue)
- Memahami scope provider: singleton, request, transient

---

## Program: Providers & Dependency Injection

```ts
import { Injectable, Inject } from '@nestjs/common';
import { NotificationService } from './notification.service';

// Token provider: bisa berupa class, string, atau symbol
export const POTONGAN_RATE = 'POTONGAN_RATE';

@Injectable()
export class OrderService {
  constructor(
    // 1) Inject provider class lain (hierarki dependency)
    private readonly notif: NotificationService,
    // 2) Inject VALUE provider (konstanta) via token
    @Inject(POTONGAN_RATE) private readonly potongan: number,
  ) {}

  buat(produk: string, qty: number) {
    const harga = qty * 50000;
    const total = harga - harga * this.potongan;
    this.notif.kirim('order-baru', { produk, total });
    return { produk, qty, potongan: this.potongan * 100 + '%', total };
  }
}
```

---

## Penjelasan

## DI: Kebalikan dari "Buat Sendiri"
Tanpa DI, OrderService harus new NotificationService() sendiri - dan tiap perubahan NotificationService memaksa OrderService berubah. Dengan DI, OrderService CUKUP mendeklarasikan kebutuhan di constructor: private readonly notif: NotificationService. Nest (container IoC) membuatkan instance dan menyuntikkannya. Konsekuensinya: mudah di-test (ganti provider dengan mock) dan mudah di-tukar (ganti implementasi tanpa sentuh pemakai).
## @Injectable() dan Registrasi
@Injectable() menandai class sebagai provider. Di module, daftarkan di array providers. Controller juga bisa di-inject ke... tidak - controller menerima provider; provider TIDAK boleh bergantung ke controller (arah dependency satu arah). Aturan praktik: registrasi yang terlewat = error "Nest can't resolve dependencies" - error paling umum NestJS.
## Value Provider: Konstanta via Token
Tidak semua provider harus class: useValue menginject konstanta (konfigurasi, koneksi, mock). Token berupa string/symbol (@Inject(POTONGAN_RATE)). Nest mendukung 4 bentuk: useClass, useValue, useFactory (pembuatan async - cocok untuk koneksi DB), useExisting (alias). Pola forRoot/forRootAsync di modul populer (ConfigModule, TypeOrmModule) adalah implementasi dynamic modules dengan useFactory.
## Scope: Umur Hidup Provider
DEFAULT: singleton - SATU instance dipakai semua request (state bersama, hati-hati!). REQUEST: instance baru per request (state per-user aman). TRANSIENT: instance baru setiap inject. 99% kasus singleton sudah benar; gunakan REQUEST hanya untuk state yang benar-benar per-request (misal user saat ini).

---

## Eksperimen

1. **DI: Kebalikan dari "Buat Sendiri"**
2. **@Injectable() dan Registrasi**
3. **Value Provider: Konstanta via Token**
4. **Scope: Umur Hidup Provider**

---

## Tantangan

Latihan "order dengan pajak": (1) buat TaxService dengan method hitung(total) yang memakai rate dari value provider PAJAK_RATE = 0.11, (2) OrderService menginject TaxService (bukan potongan manual), (3) tambahkan route GET /api/order/ringkasan yang mengembalikan daftar order tersimpan. Tuliskan dependency graph dari modul Anda.

---

## Ringkasan

DI = deklarasi kebutuhan, container yang membuat. @Injectable + registrasi di module. useClass/useValue/useFactory/useExisting. Scope: singleton > request > transient. Lanjut: modules.
