# Enterprise Architecture: Services Container, System Events & Caching

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 7:** Enterprise Architecture: Services Container, System Events & Caching
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master CodeIgniter 4 centralized service container (`Config\Services` and the `service()` helper).
- Utilize System Events (`Events::on` and `Events::trigger`) to decouple auxiliary workflows.
- Configure CI4 native Caching Engines across File, Redis, or Memcached drivers.
- Implement Singleton patterns (`getSharedInstance`) optimizing shared service memory.

---

## Program: Student Graduation Event System & Cached Academic Transcripts in CI4

```php
<?php
// app/Config/Events.php (CI4 System Events)
namespace Config;

use CodeIgniter\Events\Events;

// 1. Mendaftarkan Event Listener untuk Kelulusan Siswa
Events::on('student:graduated', static function (int $studentId, string $honorTitle) {
    echo "[EVENT TRIGGERED] Siswa ID #{$studentId} resmi dinyatakan LULUS dengan predikat: {$honorTitle}!\n";
    echo " -> Mengirim instruksi pencetakan ijazah fisik ke antrean tata usaha...\n";
});

// app/Config/Services.php (CI4 Central Services Factory)
namespace Config;

use CodeIgniter\Config\BaseService;
use App\Services\TranscriptCacheService;

class Services extends BaseService {
    // Daftarkan Service sebagai Shared Singleton di seluruh aplikasi
    public static function transcriptCache(bool $getShared = true): TranscriptCacheService {
        if ($getShared) {
            return static::getSharedInstance('transcriptCache');
        }
        return new TranscriptCacheService(service('cache'));
    }
}

// app/Services/TranscriptCacheService.php
namespace App\Services;

use CodeIgniter\Cache\CacheInterface;

class TranscriptCacheService {
    public function __construct(private CacheInterface $cache) {}

    public function getStudentTranscript(int $studentId): array {
        $cacheKey = "academic:transcript:student_{$studentId}";

        // 1. Cek apakah ada di cache (File atau Redis driver)
        $cachedData = $this->cache->get($cacheKey);
        if ($cachedData !== null) {
            echo "[CACHE HIT] Mengembalikan transkrip nilai siswa #{$studentId} dari Cache CI4.\n";
            return $cachedData;
        }

        // 2. Cache Miss: Kueri dari Database
        echo "[CACHE MISS] Mengkueri seluruh nilai raport 6 semester dari database untuk siswa #{$studentId}...\n";
        $transcript = [
            'student_id'   => $studentId,
            'total_credits' => 144,
            'final_gpa'    => 3.88,
            'generated_at' => date('Y-m-d H:i:s')
        ];

        // Simpan ke Cache selama 1 Jam (3600 Detik)
        $this->cache->save($cacheKey, $transcript, 3600);
        return $transcript;
    }
}

echo "=== CODEIGNITER 4 SERVICES, EVENTS & CACHING PIPELINE READY ===\n";
```

---

## Key Concepts

Despite its compact size, CodeIgniter 4 delivers sophisticated enterprise primitives through **Services** and **System Events**.

### Centralized Services Container (Config\Services)
In CI4, core capabilities (database pools, sessions, cache managers, routers) are governed by the `Config\Services` factory. Instead of manual instantiations, developers call `service('cache')` or register custom providers. Utilizing `getSharedInstance` ensures singletons instantiate once per request cycle.

### CI4 System Events
The `CodeIgniter\Events\Events` engine provisions native Publish-Subscribe mechanics. When graduation milestones occur, controllers simply broadcast:
`Events::trigger('student:graduated', $studentId, 'Summa Cum Laude');`
Registered listeners (SMS alerts to guardians, graduation roll logging) execute seamlessly without polluting primary controller flows.

### CI4 Caching Abstractions
Exposing uniform methods (`$cache->get`, `$cache->save`, `$cache->delete`), backends toggle from local file caches in development to high-throughput Redis instances in production by altering one line in `.env`.


---

---

## Beginner Friendly Explanation

Imagine a modern school facility. The Services Container represents the centralized equipment depot where staff check out projectors and markers (shared singletons). System Events function like the school-wide intercom: when the principal announces "Exam Period Commences", all faculty and students coordinate actions immediately without the principal visiting each classroom individually.

## Experiments

- Invoke `getStudentTranscript(101)` twice and observe the second call triggering a `[CACHE HIT]`.
- Swap cache handlers from `File` to `Redis` in `app/Config/Cache.php`.
- Register a custom event listener in `app/Config/Events.php` and invoke via `Events::trigger()`.

---

## Challenge

Build an automated cache invalidation listener: when student grades update, trigger `Events::trigger("grade:updated", $studentId)` clearing the cached transcript.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MVC RINGAN CODEIGNITER 4                      │
│                                                          │
│ Public Ingress (public/index.php)                        │
│       │                                                  │
│       ▼                                                  │
│ URI Routing (app/Config/Routes.php)                      │
│       │                                                  │
│       ▼ Filters (Auth/CSRF/CORS)                         │
│ Controller (extends BaseController)                      │
│       │                          │                       │
│       ▼                          ▼                       │
│ Model (Entity & Validation)    View (Render Buffer)      │
│       │                          │                       │
│       ▼                          ▼                       │
│ Database Output ──────────────► Browser Response         │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `$routes->get('items', 'Items::index')`
- **Core Functionality:** Routing URI CodeIgniter 4.
- **Parameters / Attributes:** `HTTP verb, URI string, Controller::method`.
- **System Behavior & Return:** Menghubungkan URL browser ke controller CodeIgniter 4 dengan namespace terorganisir..
- **Practical Code Example:**
```php
<?php
$routes->get('catalog', 'CatalogController::index');
$routes->post('catalog/create', 'CatalogController::create');
```
- **Expected Execution Output:**
```text
Endpoint CI4 siap menerima koneksi HTTP
```

### 2. `class ProductModel extends Model { protected $allowedFields = [...]; }`
- **Core Functionality:** Model CI4 dengan Query Builder bawaan.
- **Parameters / Attributes:** `$table, $primaryKey, $allowedFields`.
- **System Behavior & Return:** Provides operasi database aman dengan proteksi field otomatis tanpa query SQL mentah..
- **Practical Code Example:**
```php
<?php
namespace App\Models;
use CodeIgniter\Model;
class ProductModel extends Model {
    protected $table = 'products';
    protected $allowedFields = ['name', 'price'];
}
```
- **Expected Execution Output:**
```text
Model siap menjalankan method findAll() dan save()
```

### 3. `return view('template_name', $data)`
- **Core Functionality:** Helper render antarmuka View CI4.
- **Parameters / Attributes:** `View path, Data array`.
- **System Behavior & Return:** Mengurai berkas view PHP di dalam direktori `app/Views/` dan menyajikannya ke layar klien..
- **Practical Code Example:**
```php
<?php
$data = ['title' => 'Katalog Produk', 'items' => $items];
return view('products/list', $data);
```
- **Expected Execution Output:**
```text
Halaman web disajikan melalui buffering respons
```

### 4. `$this->request->getPost('fieldName')`
- **Core Functionality:** Retrieval of input request aman CI4.
- **Parameters / Attributes:** `Field identifier, Filter flag`.
- **System Behavior & Return:** Membaca payload POST yang masuk dengan pembersihan sanitasi XSS bawaan framework..
- **Practical Code Example:**
```php
<?php
$title = $this->request->getPost('title', FILTER_SANITIZE_SPECIAL_CHARS);
```
- **Expected Execution Output:**
```text
Input terbaca dengan pembersihan karakter berbahaya
```

---

## Common Pitfalls & Debugging Tips

### 1. Incorrect `baseURL` in `.env`
- **Symptom / Issue:** Assets and navigation redirect to incorrect hosts or fail to load.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure `app.baseURL` to match your exact local or production host address.

### 2. Overlooking CSRF Form Tokens
- **Symptom / Issue:** Leaves form submissions vulnerable to Cross-Site Request Forgery.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Enable CSRF filters in `Filters.php` and include `<?= csrf_field() ?>` inside HTML forms.

### 3. Case-Sensitivity Mismatches in Namespaces
- **Symptom / Issue:** Fails class autoloading on Linux servers due to uppercase/lowercase discrepancies.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Follow strict PSR-4 casing matching folder and file names identically.

---

## Summary

You have mastered Services Container, System Events, and Caching in CI4. Next week is our Final Capstone: Full-Scale School Information Management System (SIS)!
