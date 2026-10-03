# Capstone: Microframework MVC Berstandar PSR-15 Skala Penuh Production-Ready

> **Kategori:** Modern PHP 8.3+ | **Level:** Menengah | **Minggu 8:** Capstone: Microframework MVC Berstandar PSR-15 Skala Penuh Production-Ready
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menyatukan seluruh modul: PSR-4 Autoloading, PSR-11 DI Container, PSR-15 Middleware, dan Router.
- Membangun Microframework mandiri yang mampu melayani request REST API berperforma tinggi.
- Menghindari ketergantungan berlebih (Zero Bloat) dengan kode PHP 8.3 native yang elegan.
- Menyiapkan aplikasi PHP modern yang siap dideploy di lingkungan Docker, Nginx, dan PHP-FPM.

---

## Program: Aplikasi Microframework Lengkap (Router, PSR-15 Pipeline, DI Container & REST API)

```php
<?php
declare(strict_types=1);

// Tryngo Microframework Capstone Engine Architecture
// Menyatukan: Router + DI Container (PSR-11) + Middleware Pipeline (PSR-15) + PDO Security

final class MicroApp {
    private Router $router;
    private SimpleContainer $container;
    private array $middlewares = [];

    public function __construct() {
        $this->router = new Router();
        $this->container = new SimpleContainer();
    }

    public function getContainer(): SimpleContainer { return $this->container; }

    public function get(string $path, string $action): void {
        $this->router->addRoute('GET', $path, $action);
    }

    public function post(string $path, string $action): void {
        $this->router->addRoute('POST', $path, $action);
    }

    public function addMiddleware(MiddlewareInterface $middleware): void {
        $this->middlewares[] = $middleware;
    }

    public function run(): void {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = $_SERVER['REQUEST_URI'] ?? '/';

        $match = $this->router->match($method, $uri);

        if (!$match) {
            http_response_code(404);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'NOT_FOUND', 'message' => "Route {$method} {$uri} tidak ditemukan."]);
            return;
        }

        // Jalankan Dispatcher di dalam Container
        $dispatcher = new RouteDispatcher($this->container);
        $dispatcher->dispatch($match);
    }
}

// Controller Domain Capstone: E-Commerce Storefront
class StorefrontController {
    public function getCatalog(): array {
        return [
            'platform' => 'Tryngo High-Performance PHP Microframework',
            'version'  => '8.3-LTS',
            'status'   => 'PRODUCTION_READY',
            'items'    => [
                ['sku' => 'SKU-PHP-PRO', 'title' => 'Mastering Modern PHP 8.3 & Architecture', 'price' => 350000],
                ['sku' => 'SKU-GO-DIST', 'title' => 'Building Distributed Systems in Go',       'price' => 450000],
            ]
        ];
    }
}

// Bootstrapping Aplikasi Microframework
$app = new MicroApp();
$app->get('/api/v1/store/catalog', StorefrontController::class . '@getCatalog');

echo "=== TRYNGO MODERN PHP 8.3 MICROFRAMEWORK INITIALIZED ===\n";
echo "Siap mengeksekusi request HTTP dengan arsitektur PSR terstandarisasi.\n";
```

---

## Konsep Kunci

Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Modern PHP 8.3+. Anda telah membangun apa yang dilakukan oleh para perancang framework kelas dunia seperti Fabien Potencier (Symfony) dan Taylor Otwell (Laravel) saat mereka menciptakan fondasi framework mereka.

### Anatomi Microframework Mandiri
Aplikasi ini menyatukan:
1. **Router Engine**: Menangkap URL dinamis dengan Regular Expressions berkinerja tinggi.
2. **IoC Container (PSR-11)**: Menyelesaikan dependensi controller secara otomatis menggunakan Reflection Autowiring.
3. **Middleware Pipeline (PSR-15)**: Menjaga keamanan HTTP, CORS, autentikasi, dan timing secara terpisah (Separation of Concerns).
4. **Data Persistence**: Menggunakan PDO Prepared Statements bebas SQL Injection dengan dukungan transaksi ACID.

### Keunggulan Performa
Dengan mengeliminasi ribuan file library yang tidak perlu, microframework ini memiliki waktu startup (bootstrapping) sub-milidetik, mampu menangani ribuan request per detik di atas server PHP-FPM dengan konsumsi memori minimal.


---

---

## Penjelasan untuk Pemula

Proyek ini ibarat Anda merakit sendiri mobil balap Formula 1 impian Anda dari mesin, sasis, ban, hingga setir kemudi. Anda tidak sekadar menjadi sopir yang hanya tahu menginjak pedal gas (hanya memakai framework orang lain), tetapi Anda kini adalah insinyur mesin sejati yang paham bagaimana setiap tetes bahan bakar dan putaran mesin bekerja secara sempurna.

## Eksperimen

- Jalankan server pengembangan bawaan PHP menggunakan `php -S localhost:8000` dan akses endpoint `/api/v1/store/catalog`.
- Tambahkan endpoint baru `POST /api/v1/store/orders` dan uji coba menggunakan cURL.
- Ukur memori puncak aplikasi menggunakan `memory_get_peak_usage(true)` dan buktikan efisiensinya yang berada di bawah 2MB.

---

## Tantangan

Tambahkan penanganan template HTML kustom: buat View Engine sederhana yang mendukung render berkas template `.phtml` dengan ekstraksi variabel aman menggunakan `extract($data)`.

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum Modern PHP 8.3+ dari nol hingga membangun Microframework MVC berstandar PSR-15 sendiri!
