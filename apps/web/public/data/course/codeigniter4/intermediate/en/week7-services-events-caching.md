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
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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
