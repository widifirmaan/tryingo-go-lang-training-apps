# Interceptors: Logging & Transformasi

> NestJS | Auth & Lanjutan | Pelajaran 11

## Tujuan Pembelajaran

- Menjelaskan interceptor: membungkus handler sebelum & sesudah
- Menulis LoggingInterceptor dengan RxJS (tap)
- Menulis TransformInterceptor untuk membentuk respons
- Memilih interceptor vs middleware vs guard vs pipe

---

## Program: Interceptors: Logging & Transformasi

```ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// Interceptor 2: membungkus respons menjadi { data, waktu, jalur }
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data,
        waktu: new Date().toISOString(),
        jalur: context.switchToHttp().getRequest().url,
      })),
    );
  }
}
```

---

## Penjelasan

## Interceptor: Dua Sisi Handler
Interceptor membungkus handler: kode sebelum next.handle() = SEBELUM handler, next.handle().pipe() = SESUDAH handler. Kuncinya RxJS: respons handler adalah stream observable - bisa diamati (tap), diubah (map), ditunda (delay), di-cache, bahkan dibatalkan. Inilah perbedaan dari middleware: interceptor punya akses KE RESPONS setelah handler selesai.
## Logging & Waktu Eksekusi
LoggingInterceptor mencatat metode, URL, dan durasi: mulai sebelum handler, selesai lewat tap() yang membaca Date.now() setelah stream selesai. Tanpa interceptor, ini harus ditulis ulang di setiap handler - dengan interceptor, satu kali untuk seluruh aplikasi.
## TransformInterceptor: Bentuk Respons yang Konsisten
map() mengubah hasil handler menjadi bentuk baku { data, waktu, jalur }. Konsistensi respons = frontend tidak perlu menebak bentuk tiap endpoint. Interceptor juga tempat yang tepat untuk: wrapping error, menambahkan header, paginasi global, cache (dengan RxJS), dan timeouts.
## Kapan Pakai Apa
Middleware: HTTP raw (body, headers, CORS) - di luar pipeline Nest. Guard: boleh/tidaknya akses. Pipe: validasi & transformasi INPUT. Interceptor: sebelum/sesudah handler, memodifikasi RESPONS atau perilaku stream. Aturan praktik: jika butuh hasil handler → interceptor; jika hanya butuh izin → guard; jika butuh HTTP murni → middleware.

---

## Eksperimen

1. **Interceptor: Dua Sisi Handler**
2. **Logging & Waktu Eksekusi**
3. **TransformInterceptor: Bentuk Respons yang Konsisten**
4. **Kapan Pakai Apa**

---

## Tantangan

Eksperimen dengan interceptor: (1) buat TimeoutInterceptor yang membatalkan request > 3 detik (race dengan timer RxJS), (2) buat CacheInterceptor sederhana: Map<url, data>, kembalikan cache jika ada (map dengan kondisi), (3) tambah header X-Response-Time di TransformInterceptor, (4) pasang interceptor hanya di satu route (@UseInterceptors) dan bandingkan perilakunya dengan global.

---

## Ringkasan

Interceptor = dua sisi handler via RxJS. tap untuk observasi, map untuk transformasi. Konsistensi respons. Pilih alat yang tepat. Lanjut: config, Swagger & logging.
