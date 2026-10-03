# RESTful Web APIs: ResourceController, Content Negotiation & ResponseTrait

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 5:** RESTful Web APIs: ResourceController, Content Negotiation & ResponseTrait
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master `CodeIgniter\RESTful\ResourceController` scaffolding RESTful APIs with blazing velocity.
- Deploy `ResponseTrait` helpers: `respond()`, `respondCreated()`, `failNotFound()`, and `failValidationErrors()`.
- Configure complete resource routing via single-line `$routes->resource()` directives.
- Apply automated Content Negotiation across JSON and XML formats.

---

## Program: Student Report Card RESTful API for Parent Mobile App with ResponseTrait

```php
<?php
// app/Controllers/Api/StudentApiController.php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\StudentModel;

// ResourceController secara otomatis menyediakan method RESTful standar:
// index, show, create, update, delete
class StudentApiController extends ResourceController {
    // Model yang terikat otomatis
    protected $modelName = StudentModel::class;
    protected $format    = 'json'; // Format respons default

    // GET /api/v1/students
    public function index() {
        $students = $this->model->where('is_active', true)->findAll(20);
        
        // ResponseTrait helper: respond() menghasilkan JSON terstandarisasi dengan status 200 OK
        return $this->respond([
            'status'   => 200,
            'message'  => 'Daftar siswa aktif berhasil diambil.',
            'count'    => count($students),
            'data'     => $students,
        ]);
    }

    // GET /api/v1/students/(:num)
    public function show($id = null) {
        $student = $this->model->find($id);

        if (!$student) {
            // Helper failNotFound() otomatis mengembalikan HTTP 404
            return $this->failNotFound("Data siswa dengan ID {$id} tidak ditemukan.");
        }

        return $this->respond([
            'status' => 200,
            'data'   => [
                'nisn'       => $student->nisn,
                'name'       => $student->full_name,
                'grade'      => $student->grade_class,
                'gpa'        => $student->gpa,
                'honors'     => $student->getGraduationHonors(),
            ]
        ]);
    }

    // POST /api/v1/students
    public function create() {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();

        if (!$this->model->insert($data)) {
            // Helper failValidationErrors() otomatis mengembalikan HTTP 400 dengan pesan error model
            return $this->failValidationErrors($this->model->errors());
        }

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Siswa baru berhasil didaftarkan ke buku induk akademik!',
            'id'      => $this->model->getInsertID()
        ]);
    }
}

// Konfigurasi Routes.php:
// $routes->resource('api/v1/students', ['controller' => 'App\Controllers\Api\StudentApiController']);

echo "=== CODEIGNITER 4 RESTFUL RESOURCE CONTROLLER ACTIVE ===\n";
```

---

## Key Concepts

Many engineers underestimate CodeIgniter 4's capabilities as a high-throughput mobile RESTful API backend. CI4 packages a dedicated **ResourceController** streamlining API development.

### Semantic ResponseTrait Helpers
Rather than manually concatenating `json_encode()` outputs and configuring HTTP header status codes, `ResponseTrait` provisions semantic helpers:
- `$this->respond($data)`: Emits HTTP 200 OK with sanitized JSON.
- `$this->respondCreated($data)`: Emits HTTP 201 Created.
- `$this->failNotFound($message)`: Formats standard HTTP 404 Not Found payloads.
- `$this->failValidationErrors($errors)`: Emits HTTP 400 Bad Request with model validation bags.

### Single-Line Resource Routing
Declaring `$routes->resource('api/v1/students')` configures canonical RESTful verbs automatically:
- `GET /students` -> `index()`
- `GET /students/{id}` -> `show($id)`
- `POST /students` -> `create()`
- `PUT /students/{id}` -> `update($id)`
- `DELETE /students/{id}` -> `delete($id)`


---

---

## Beginner Friendly Explanation

Think of an automated bank teller terminal. Rather than explaining requests to clerks from scratch, the kiosk presents five standardized push buttons: View Balance (GET), Open Account (POST), Update Address (PUT), and Close Account (DELETE). Processing executes instantaneously.

## Experiments

- Transmit a POST payload with an existing NISN observing JSON error bags emitted by `failValidationErrors`.
- Send a GET request with `Accept: application/xml` and verify CI4 automatically serializes output to XML.
- Query a non-existent student ID and observe the structured JSON from `failNotFound`.

---

## Challenge

Add API Key authorization to the ResourceController validating an `X-API-KEY` header guarding parent mobile client access.

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

You have mastered CI4 ResourceController, ResponseTrait, and Content Negotiation. Next week we explore the Query Builder and atomic database transactions.
