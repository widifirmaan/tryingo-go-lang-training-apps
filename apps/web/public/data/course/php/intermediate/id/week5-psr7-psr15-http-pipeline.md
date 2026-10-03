# Arsitektur Pipeline HTTP: Standar PSR-7 & PSR-15 Middleware

> **Kategori:** Modern PHP 8.3+ | **Level:** Menengah | **Minggu 5:** Arsitektur Pipeline HTTP: Standar PSR-7 & PSR-15 Middleware

## Tujuan Pembelajaran

- Memahami standar representasi pesan HTTP terdistribusi: PSR-7 HTTP Messages.
- Menguasai arsitektur Middleware berantai standar industri: PSR-15 Server Middleware.
- Memahami konsep immutability pada PSR-7 (`$response->withHeader(...)` mengembalikan clone baru).
- Membangun Dispatcher Pipeline HTTP untuk eksekusi berurutan (Onion Architecture).

---

## Program: Pipeline Middleware HTTP PSR-15 Kustom (Auth, Timing & Security Headers)

```php
<?php
declare(strict_types=1);

// Abstraksi Sederhana Berdasarkan Standar Resmi PSR-7 & PSR-15
interface ResponseInterface {
    public function getStatusCode(): int;
    public function getHeader(string $name): ?string;
    public function withHeader(string $name, string $value): self;
    public function getBody(): string;
}

interface ServerRequestInterface {
    public function getMethod(): string;
    public function getUri(): string;
    public function getHeader(string $name): ?string;
}

interface RequestHandlerInterface {
    public function handle(ServerRequestInterface $request): ResponseInterface;
}

interface MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface;
}

// Implementasi Respons HTTP PSR-7 Minimal
class SimpleResponse implements ResponseInterface {
    public function __construct(
        private int $status = 200,
        private string $body = '',
        private array $headers = []
    ) {}

    public function getStatusCode(): int { return $this->status; }
    public function getHeader(string $name): ?string { return $this->headers[$name] ?? null; }
    public function withHeader(string $name, string $value): self {
        $clone = clone $this;
        $clone->headers[$name] = $value;
        return $clone;
    }
    public function getBody(): string { return $this->body; }
}

// 1. PSR-15 Middleware: Mengukur Waktu Eksekusi Request
class TimingMiddleware implements MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {
        $startTime = microtime(true);
        
        // Teruskan ke middleware berikutnya dalam pipeline
        $response = $handler->handle($request);
        
        $durationMs = (microtime(true) - $startTime) * 1000;
        return $response->withHeader('X-Execution-Time-Ms', sprintf('%.2f', $durationMs));
    }
}

// 2. PSR-15 Middleware: Menambahkan Security Headers
class SecurityHeadersMiddleware implements MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {
        $response = $handler->handle($request);
        return $response
            ->withHeader('X-Content-Type-Options', 'nosniff')
            ->withHeader('X-Frame-Options', 'DENY');
    }
}

// 3. Dispatcher Pipeline PSR-15
class MiddlewarePipeline implements RequestHandlerInterface {
    /** @param MiddlewareInterface[] $middlewares */
    public function __construct(
        private array $middlewares,
        private RequestHandlerInterface $fallbackHandler
    ) {}

    public function handle(ServerRequestInterface $request): ResponseInterface {
        if (empty($this->middlewares)) {
            return $this->fallbackHandler->handle($request);
        }

        $middleware = array_shift($this->middlewares);
        return $middleware->process($request, $this);
    }
}

echo "=== ARSITEKTUR PIPELINE HTTP PSR-15 TERKONFIGURASI LENGKAP ===\n";
```

---

## Konsep Kunci

Dalam pengembangan microservices modern, framework web tidak boleh terikat erat dengan fungsi global PHP bawaan seperti `$_GET`, `$_POST`, atau `header()`. Standar **PSR-7** dan **PSR-15** dari PHP-FIG menciptakan antarmuka HTTP universal yang dapat dipakai bersama di semua framework modern.

### Immutability pada PSR-7
Objek PSR-7 bersifat **Immutable**. Method seperti `$response->withHeader('Content-Type', 'application/json')` tidak mengubah objek asli yang ada di memori, melainkan mengembalikan salinan baru (clone). Karakteristik ini mencegah bug efek samping yang tidak terduga saat request melewati puluhan layer middleware.

### Pola Onion (Bawang Berlapis) pada PSR-15
Middleware PSR-15 membungkus handler aplikasi seperti lapisan kulit bawang:
1. Request masuk melewati middleware terluar (misal `TimingMiddleware`), mencatat waktu awal.
2. Request diteruskan ke dalam (`$handler->handle($request)`).
3. Setelah handler inti selesai menghasilkan response, kontrol kembali mengalir keluar melewati middleware yang sama, menyuntikkan header durasi ke respons sebelum dikirim ke client.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda mengirim surat penting lewat kurir pos. Sebelum dimasukkan ke amplop kurir, surat Anda diperiksa kelengkapannya oleh asisten Anda (Middleware 1), lalu dimasukkan ke kantong plastik anti-air oleh petugas ekspedisi (Middleware 2). Setiap petugas membungkus lapisan pelindung baru tanpa pernah merusak surat asli di dalamnya.

## Eksperimen

- Tambahkan `AuthenticationMiddleware` yang memeriksa header `Authorization: Bearer SECRET` dan mengembalikan respons 401 jika token tidak cocok.
- Ubah urutan middleware dalam pipeline dan amati bagaimana urutan eksekusi mempengaruhi modifikasi respons.
- Buktikan bahwa `$response1 !== $response1->withHeader(...)` membuktikan pembuatan objek clone baru.

---

## Tantangan

Buat CorsMiddleware yang menangani preflight request `OPTIONS` secara otomatis dan menambahkan header `Access-Control-Allow-Origin: *`.

---

## Ringkasan

Kamu telah menguasai PSR-7 HTTP Messages dan PSR-15 Middleware Pipeline. Minggu depan kita membangun Dependency Injection Container dengan Reflection.
