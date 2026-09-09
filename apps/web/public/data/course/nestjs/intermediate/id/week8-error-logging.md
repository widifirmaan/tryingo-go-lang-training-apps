# Error & Logging — Alarm + CCTV Warung NestJS

> **Kategori:** NestJS | **Level:** Menengah | **Minggu 8:** Error Handling & Logging
> **Prasyarat:** Minggu 7 — **ORM Relations**.

## Tujuan Pembelajaran

- `@Catch()` + `ExceptionFilter` satpam error global + `HttpException` kode rapi (sumber: docs.nestjs.com/exception-filters)
- `Logger` CCTV (`log/warn/error`) — bukan `console.log` buta

---

## Kenapa Ini Penting Buat Kamu?

Tanpa filter, error jadi HTML 500 acak → HP crash tidak jelas. Dengan filter, semua error JSON `{ status, pesan }` konsisten. Tanpa log, bug produksi = tebak-tebakan. Dengan `Logger`, jejak jelas.

---

## Program: Alarm + CCTV Warung

```typescript
// filter global — 1 satpam semua error
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class SemuaErrorFilter implements ExceptionFilter {
  private log = new Logger("Error");

  catch(err: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const status = err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const pesan = err instanceof HttpException ? err.message : "Server sibuk, coba lagi";
    this.log.error(pesan); // CCTV catat!
    res.status(status).json({ status, pesan, kapan: new Date() });
  }
}
```

```typescript
// main.ts — pasang 1x
app.useGlobalFilters(new SemuaErrorFilter());
```

```typescript
// pakai di controller
import { NotFoundException } from "@nestjs/common";

satu(id: number) {
  const p = this.cari(id);
  if (!p) throw new NotFoundException(`Produk ${id} tidak ada`); // → 404 JSON rapi!
}
```

---

## Konsep Kunci

### `@Catch()` = Jaring Pengaman Global
Tangkap semua error tak tertangani → JSON rapi (bukan HTML 500).

### `HttpException` = Alarm Berkode
`NotFoundException` (404), `BadRequestException` (400), `UnauthorizedException` (401).

### `Logger` = CCTV Beda Level
`log` info, `warn` waspada, `error` bahaya (beda warna + filter).

---

## Penjelasan untuk Pemula

### Analogi: Satpam + CCTV Mal
- **Filter = satpam pusat**: semua masalah lapor 1 pintu, format sama.
- **Logger = CCTV**: rekam tiap kejadian per level.

### Langkah 0 — Siapkan Device
- Sama W1. Lihat terminal: log Nest berwarna.

### Cara Komputer Membaca
1. `throw new NotFoundException` → filter tangkap → `404 { status, pesan }`.
2. Error asing → `500 { pesan: "Server sibuk" }` (sembunyikan detail ke hacker!).

### 3 Istilah Wajib
1. **Filter/Catch**: jaring/tangkap
2. **Logger/log-warn-error**: CCTV/level

---

## Eksperimen

- **Hijau:** Tanpa filter, `throw` → HTML 500? Dengan → JSON?
- **Kuning:** `Logger` `error` vs `log` → warna beda di terminal?
- **Merah:** Bocorkan `err.stack` ke client? Jangan! (Hacker baca struktur!)

---

### Bonus: Interceptor — CCTV + Penerjemah (bab Interceptors docs.nestjs.com!)

Filter tangkap ERROR. Interceptor bungkus SUKSES: catat waktu + ubah bentuk balikan. Pasang global 1x!

```typescript
// waktu.interceptor.ts — stopwatch semua pintu
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class WaktuInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, lanjut: CallHandler): Observable<any> {
    const mulai = Date.now();
    const req = ctx.switchToHttp().getRequest();
    return lanjut.handle().pipe(
      tap(() => console.log(`${req.method} ${req.url} — ${Date.now() - mulai}ms`))
    );
  }
}

// main.ts — pasang 1x untuk semua!
// app.useGlobalInterceptors(new WaktuInterceptor());
```
- `intercept()` terima + teruskan `lanjut.handle()` + `pipe(tap())` catat. Bedakan: Middleware = mentah (req/res), Interceptor = kaya (context + ubah balikan)!

---

## Tantangan

**Warung Aman Terpantau:** Filter global + 3 `HttpException` beda + `Logger` tiap aksi + `curl` cek JSON rapi semua. **Selesai Menengah NestJS!**

---

## Glosarium Mini

- **Filter/Logger/HttpException**: jaring/CCTV/alarm-berkode

---

## Ringkasan

Minggu 8 dari 12: **Alarm + CCTV** (Level: Menengah). **Selesai Menengah NestJS!** Lanjut: **Testing** (Lanjutan).
