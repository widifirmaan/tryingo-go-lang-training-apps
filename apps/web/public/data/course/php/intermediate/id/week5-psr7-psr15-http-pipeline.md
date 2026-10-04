# Arsitektur Pipeline HTTP: Standar PSR-7 & PSR-15 Middleware

> **Kategori:** Modern PHP 8.3+ | **Level:** Menengah | **Minggu 5:** Arsitektur Pipeline HTTP: Standar PSR-7 & PSR-15 Middleware
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ SIKLUS HIDUP REQUEST PHP 8.3+ FPM                        │
│                                                          │
│ Nginx / Web Server ──(FastCGI)──► PHP-FPM Worker Pool    │
│                                         │                │
│                                         ▼                │
│                                    OPcache Engine        │
│                                    (Bytecode Preload)    │
│                                         │                │
│                                         ▼                │
│                                    Zend Engine Eksekusi  │
│                                    (Clean State per Req) │
│                                         │                │
│                                         ▼                │
│ HTTP Response Output ◄───────── Garbage Collection       │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `declare(strict_types=1);`
- **Fungsi Utama:** Penegakan tipe data ketat PHP 8+.
- **Parameter / Atribut:** `Wajib di baris 1 berkas PHP`.
- **Perilaku & Efek Sistem:** Mencegah type coercion tak terduga dan memastikan kompilasi menolak ketidaksesuaian tipe..
- **Contoh Penggunaan Praktis:**
```php
<?php
declare(strict_types=1);
function add(int $a, int $b): int {
    return $a + $b;
}
echo add(5, 10);
```
- **Hasil Output yang Diharapkan:**
```text
15
```

### 2. `readonly class UserDto { public function __construct(...) }`
- **Fungsi Utama:** Constructor Promotion & Readonly Class.
- **Parameter / Atribut:** `public readonly properties`.
- **Perilaku & Efek Sistem:** Menyederhanakan pembuatan class immutable transfer data tanpa boilerplate penulisan getter..
- **Contoh Penggunaan Praktis:**
```php
<?php
readonly class UserDto {
    public function __construct(
        public string $id,
        public string $email
    ) {}
}
$user = new UserDto('u1', 'alex@example.com');
```
- **Hasil Output yang Diharapkan:**
```text
Objek data transfer immutable tercipta bersih
```

### 3. `match($status) { 'paid' => 200, default => 400 }`
- **Fungsi Utama:** Ekspresi pencocokan nilai PHP 8 (Match Expression).
- **Parameter / Atribut:** `Target value, Arms pattern`.
- **Perilaku & Efek Sistem:** Alternatif modern untuk switch-case dengan perbandingan identik (`===`) dan nilai kembalian instan..
- **Contoh Penggunaan Praktis:**
```php
<?php
$statusCode = 'paid';
$code = match($statusCode) {
    'paid' => 200,
    'pending' => 202,
    default => 400
};
echo $code;
```
- **Hasil Output yang Diharapkan:**
```text
200
```

### 4. `PDO::prepare('SELECT * FROM tbl WHERE id = ?')`
- **Fungsi Utama:** Prepared statements pencegah SQL Injection.
- **Parameter / Atribut:** `SQL query berparameter, Execute bindings`.
- **Perilaku & Efek Sistem:** Memisahkan instruksi SQL dari data pengguna untuk menjamin keamanan database mutlak..
- **Contoh Penggunaan Praktis:**
```php
<?php
$stmt = $pdo->prepare('SELECT name FROM users WHERE id = :id');
$stmt->execute(['id' => 1]);
$user = $stmt->fetch();
```
- **Hasil Output yang Diharapkan:**
```text
Query aman bebas dari celah serangan injeksi
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. SQL Injection Akibat String Concatenation
- **Gejala / Masalah:** Peretas dapat memanipulasi query SQL dan mencuri seluruh isi database.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan Prepared Statements dengan PDO atau MySQLi parameterized query.

### 2. Mengabaikan Strict Types
- **Gejala / Masalah:** PHP melakukan konversi tipe data otomatis yang memicu bug logika angka/string.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tambahkan `declare(strict_types=1);` di baris pertama setiap berkas PHP modern.

### 3. Memasukkan Output Mentah ke HTML (XSS Vulnerability)
- **Gejala / Masalah:** Skrip berbahaya dieksekusi di browser pengunjung.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus variabel output dengan fungsi `htmlspecialchars($str, ENT_QUOTES, 'UTF-8')`.

---

## Ringkasan

Kamu telah menguasai PSR-7 HTTP Messages dan PSR-15 Middleware Pipeline. Minggu depan kita membangun Dependency Injection Container dengan Reflection.
