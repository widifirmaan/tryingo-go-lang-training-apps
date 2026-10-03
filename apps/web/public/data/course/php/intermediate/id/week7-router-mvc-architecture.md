# Arsitektur MVC: Router Engine Berkecepatan Tinggi & Controller Dispatcher

> **Kategori:** Modern PHP 8.3+ | **Level:** Menengah | **Minggu 7:** Arsitektur MVC: Router Engine Berkecepatan Tinggi & Controller Dispatcher
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Membangun engine routing dinamis berbasis regex named capture groups (`(?P<id>[^/]+)`).
- Memisahkan URL Path dari query parameters secara aman menggunakan `parse_url`.
- Mengintegrasikan Router Matcher dengan Controller Dispatcher dan DI Container.
- Menerapkan arsitektur Model-View-Controller (MVC) terpisah yang bersih dan modular.

---

## Program: Router Regex Dinamis & Dispatcher Controller dengan Dukungan Parameter URL

```php
<?php
declare(strict_types=1);

// 1. Router Engine Berbasis Regular Expressions
class Router {
    private array $routes = [];

    public function addRoute(string $method, string $pattern, string $controllerAction): void {
        // Konversi pattern seperti '/products/{id}' menjadi regex '#^/products/(?P<id>[^/]+)$#'
        $regex = preg_replace('#\{([a-zA-Z0-9_]+)\}#', '(?P<$1>[^/]+)', $pattern);
        $regex = '#^' . $regex . '$#';

        $this->routes[] = [
            'method' => strtoupper($method),
            'regex'  => $regex,
            'action' => $controllerAction,
        ];
    }

    public function match(string $requestMethod, string $requestUri): ?array {
        $requestMethod = strtoupper($requestMethod);
        $path = parse_url($requestUri, PHP_URL_PATH) ?? '/';

        foreach ($this->routes as $route) {
            if ($route['method'] !== $requestMethod) {
                continue;
            }

            if (preg_match($route['regex'], $path, $matches)) {
                // Saring hanya parameter bernama (named capture groups)
                $params = array_filter($matches, fn($key) => !is_int($key), ARRAY_FILTER_USE_KEY);
                return [
                    'action' => $route['action'],
                    'params' => $params,
                ];
            }
        }

        return null;
    }
}

// 2. Controller Target
class ProductApiController {
    public function getDetails(string $id): array {
        return [
            'status' => 'OK',
            'productId' => $id,
            'name' => 'High-Performance Cloud Router',
            'stock' => 45
        ];
    }
}

// 3. Dispatcher Controller Terintegrasi dengan DI Container
class RouteDispatcher {
    public function __construct(private readonly SimpleContainer $container) {}

    public function dispatch(array $matchResult): void {
        [$controllerClass, $methodName] = explode('@', $matchResult['action']);

        // Selesaikan controller dari DI Container
        $controllerInstance = $this->container->get($controllerClass);
        $params = $matchResult['params'];

        // Eksekusi method controller dengan parameter dinamis
        $response = $controllerInstance->$methodName(...$params);

        header('Content-Type: application/json');
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
}

// Eksekusi Demonstrasi
$router = new Router();
$router->addRoute('GET', '/api/v1/products/{id}', ProductApiController::class . '@getDetails');

$match = $router->match('GET', '/api/v1/products/PROD-9981');
echo "=== HASIL ROUTE MATCHING DENGAN REGEX NAMED GROUPS ===\n";
print_r($match);
```

---

## Konsep Kunci

Inti dari setiap web framework (seperti Laravel, Symfony, atau Express) adalah **Router**: komponen yang memeriksa method HTTP (`GET`, `POST`) dan URL path yang diminta pengguna, lalu meneruskannya ke fungsi controller yang tepat.

### Cara Kerja Router Regex Dinamis
Ketika kita mendefinisikan rute `/products/{id}`, URL tersebut tidak dapat dicocokkan dengan perbandingan string biasa (`===`) karena `{id}` bersifat dinamis (bisa `1`, `42`, atau `SKU-A`).
Router mengubah `{id}` menjadi regex named group:
`#^/products/(?P<id>[^/]+)$#`
Ketika pengguna membuka `/products/PROD-9981`, fungsi `preg_match` secara ajaib mengekstrak array `['id' => 'PROD-9981']`.

### Integrasi Dispatcher dan DI Container
Dispatcher menerima nama aksi controller (misal `ProductApiController@getDetails`). Alih-alih membuat `new ProductApiController()`, Dispatcher meminta controller dari **DI Container**. Controller otomatis terinjeksi dengan seluruh service database dan loggernya, lalu method dieksekusi menggunakan operator unpacking `...$params`.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda berada di stasiun kereta api sentral. Router seperti wesel rel kereta api otomatis. Ketika kereta dengan nomor rute #9981 tiba, wesel rel langsung menggeser jalurnya dan mengarahkan kereta tersebut tepat ke peron jalur 3 (Controller Action) tanpa ada tabrakan dengan kereta lain.

## Eksperimen

- Tambahkan rute dengan dua parameter dinamis `/categories/{cat}/products/{id}` dan uji coba ekstraksinya.
- Kirim request dengan method `POST` ke rute `GET` dan amati bahwa matcher mengembalikan `null` (404/405).
- Tambahkan fallback 404 handler yang mengembalikan respons JSON `{ "error": "NOT_FOUND" }`.

---

## Tantangan

Optimalkan pencocokan rute menggunakan tree structure (Trie Prefix Tree) untuk meningkatkan kecepatan matching saat router memiliki lebih dari 1.000 daftar rute terdaftar.

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

Kamu telah menguasai dynamic regex routing dan controller dispatching. Minggu depan adalah Capstone Final: Microframework PSR-15 Lengkap Production-Ready!
