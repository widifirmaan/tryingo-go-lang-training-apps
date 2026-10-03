# OOP Tingkat Lanjut: Backed Enums, PHP 8 Attributes & Reflection

> **Kategori:** Modern PHP 8.3+ | **Level:** Pemula | **Minggu 2:** OOP Tingkat Lanjut: Backed Enums, PHP 8 Attributes & Reflection

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

## Ringkasan

Kamu telah menguasai PHP 8 Attributes, Backed Enums, dan Reflection API. Minggu depan kita mempelajari konektivitas database yang aman dengan PDO.
