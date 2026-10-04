# OOP Tingkat Lanjut: Backed Enums, PHP 8 Attributes & Reflection

> **Kategori:** Modern PHP 8.3+ | **Level:** Pemula | **Minggu 2:** OOP Tingkat Lanjut: Backed Enums, PHP 8 Attributes & Reflection
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami fitur native PHP 8 Attributes (menggantikan komentar DocBlock `@Route` lama).
- Menggunakan `ReflectionClass` dan `ReflectionMethod` untuk membaca metadata kode saat runtime.
- Menggunakan Backed Enums dengan method bawaan untuk logika domain yang kaya.
- Membangun framework routing deklaratif otomatis bergaya framework modern (Symfony / Laravel).

---

## Program: Router Metadata Deklaratif dengan PHP 8 Attributes & Engine Reflection

```php
<?php
declare(strict_types=1);

// 1. PHP 8 Attributes (Anotasi Native di Tingkat Bahasa)
#[Attribute(Attribute::TARGET_METHOD | Attribute::TARGET_CLASS)]
readonly class Route {
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}

// 2. Controller dengan Metadata Atribut
class CatalogApiController {
    #[Route(path: '/api/v1/products', method: 'GET')]
    public function listProducts(): array {
        return [
            ['id' => 1, 'name' => 'Mechanical Keyboard Pro', 'price' => 1_250_000],
            ['id' => 2, 'name' => 'Curved Gaming Monitor',   'price' => 4_500_000]
        ];
    }

    #[Route(path: '/api/v1/products', method: 'POST')]
    public function createProduct(): array {
        return ['status' => 'CREATED', 'productId' => 99];
    }
}

// 3. Engine Parser Route Berbasis Reflection API
class AttributeRouteCollector {
    public function extractRoutes(string $controllerClass): array {
        $reflectionClass = new ReflectionClass($controllerClass);
        $routes = [];

        foreach ($reflectionClass->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            // Ambil semua atribut #[Route] pada method
            $attributes = $method->getAttributes(Route::class);

            foreach ($attributes as $attribute) {
                /** @var Route $routeInstance */
                $routeInstance = $attribute->newInstance();
                $routes[] = [
                    'http_method' => $routeInstance->method,
                    'path'        => $routeInstance->path,
                    'action'      => $controllerClass . '@' . $method->getName(),
                ];
            }
        }

        return $routes;
    }
}

// Eksekusi
$collector = new AttributeRouteCollector();
$discoveredRoutes = $collector->extractRoutes(CatalogApiController::class);

echo "=== RUTE OTOMATIS DIEKSTRAK DENGAN REFLECTION & ATTRIBUTES ===\n";
foreach ($discoveredRoutes as $r) {
    echo sprintf("[% -4s] % -22s -> %s\n", $r['http_method'], $r['path'], $r['action']);
}
```

---

## Konsep Kunci

Sebelum PHP 8, framework terpaksa membaca komentar dokumen (DocBlock parsing via Regex) untuk menambahkan metadata route atau validasi—cara yang sangat lambat, rapuh, dan tidak diverifikasi oleh kompilator.

### Revolusi PHP 8 Attributes
**Attributes** adalah metadata terstruktur bawaan yang didekorasikan langsung di atas kelas, method, atau properti dengan sintaks `#[Route('/path')]`. Atribut dievaluasi langsung oleh engine internal PHP C-core, menjadikannya sangat cepat dan type-safe.

### Reflection API di PHP
Modul **Reflection API** (`ReflectionClass`, `ReflectionMethod`, `ReflectionParameter`) memungkinkan aplikasi menginspeksi struktur kodenya sendiri saat runtime:
- Mengetahui method apa saja yang ada di sebuah controller.
- Mengambil instance atribut yang menempel pada method tersebut (`$method->getAttributes(Route::class)`).
- Mengetahui tipe dependensi parameter pada konstruktor untuk keperluan Dependency Injection otomatis.


---

---

## Penjelasan untuk Pemula

Bayangkan pintu-pintu ruangan di sebuah rumah sakit besar. Daripada menulis petunjuk ruangan di kertas stiker tipis yang mudah copot (DocBlock lama), rumah sakit memasang plakat kuningan permanen resmi di atas pintu (PHP 8 Attributes: #[PoliGigi]). Robot navigasi (Reflection API) dapat memindai plakat kuningan tersebut dan langsung mengarahkan pasien ke dokter yang tepat.

## Eksperimen

- Tambahkan method baru di `CatalogApiController` dengan method `DELETE` dan amati hasil ekstraksi rute.
- Ubah target attribute menjadi `Attribute::TARGET_CLASS` dan gunakan attribute tersebut di level controller untuk mendefinisikan URL prefix grup.
- Gunakan `ReflectionNamedType` untuk membaca tipe balikan method secara otomatis.

---

## Tantangan

Buat Custom Attribute `#[Validate(min: 5, max: 100)]` dan buat fungsi validator berbasis Reflection yang memverifikasi panjang string properti objek secara otomatis.

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

Kamu telah menguasai PHP 8 Attributes, Backed Enums, dan Reflection API. Minggu depan kita mempelajari konektivitas database yang aman dengan PDO.
