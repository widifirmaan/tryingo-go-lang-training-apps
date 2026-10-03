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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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
