# Advanced Query Builder & Multi-Table Atomic Database Transactions

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 6:** Advanced Query Builder & Multi-Table Atomic Database Transactions
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master high-throughput CI4 Query Builder: joins, aggregates, batch inserts, and sub-queries.
- Understand ACID database transaction mechanics in CI4: `transBegin()`, `transCommit()`, and `transRollback()`.
- Deploy transaction health assertions via `$this->db->transStatus()`.
- Prevent corrupt partial state (financial balance desynchronization) during unexpected failures.

---

## Program: Tuition Settlement Transaction & Enrollment Activation with ACID Guarantees

```php
<?php
// app/Services/TuitionPaymentService.php
namespace App\Services;

use CodeIgniter\Database\BaseConnection;
use Config\Database;
use Exception;

class TuitionPaymentService {
    private BaseConnection $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function settleTuitionFee(int $studentId, float $amount, string $invoiceRef): bool {
        // 1. Memulai Transaksi Database Manual di CodeIgniter 4
        $this->db->transBegin();

        try {
            // A. Gunakan Query Builder Canggih untuk Mencari Tagihan yang Menggantung
            $bill = $this->db->table('tuition_bills')
                ->where('student_id', $studentId)
                ->where('is_paid', false)
                ->get()
                ->getRow();

            if (!$bill) {
                throw new Exception("Tidak ada tagihan SPP aktif untuk siswa ID: {$studentId}.");
            }

            if ($amount < $bill->amount_due) {
                throw new Exception("Nominal pembayaran (Rp {$amount}) kurang dari total tagihan (Rp {$bill->amount_due})!");
            }

            // B. Perbarui Status Tagihan Menjadi Lunas
            $this->db->table('tuition_bills')
                ->where('id', $bill->id)
                ->update([
                    'is_paid'     => true,
                    'paid_at'     => date('Y-m-d H:i:s'),
                    'invoice_ref' => $invoiceRef,
                ]);

            // C. Aktifkan Status Hak Akses KRS Siswa di Semester Baru
            $this->db->table('students')
                ->where('id', $studentId)
                ->update(['enrollment_status' => 'ACTIVE']);

            // D. Catat Audit Log Finansial
            $this->db->table('payment_audit_logs')->insert([
                'student_id'   => $studentId,
                'amount'       => $amount,
                'reference'    => $invoiceRef,
                'processed_at' => date('Y-m-d H:i:s'),
            ]);

            // Cek status transaksi: jika ada query yang gagal di tengah jalan, rollback otomatis!
            if ($this->db->transStatus() === false) {
                $this->db->transRollback();
                return false;
            }

            // Seluruh 3 query berhasil -> COMMIT perubahan permanen ke database
            $this->db->transCommit();
            echo "[SUCCESS] Pembayaran SPP siswa #{$studentId} berhasil diproses dan status KRS aktif!\n";
            return true;

        } catch (Exception $e) {
            $this->db->transRollback();
            echo "[ROLLBACK TRIGGERED] Pembayaran SPP dibatalkan: " . $e->getMessage() . "\n";
            return false;
        }
    }
}

echo "=== CODEIGNITER 4 TRANSACTIONAL SERVICE ACTIVE ===\n";
```

---

## Key Concepts

When processing tuition settlements or semester report card finalizations, a single query fault must never leave records in a corrupt state (e.g., recording an incoming wire transfer without clearing the student's active hold).

### High-Throughput Query Builder
The CodeIgniter 4 Query Builder executes with blazing speed and near-zero memory bloat. Chained calls like `$this->db->table('students')->where()->update()` compile into parameter-bound SQL statements immune to injection exploits.

### Manual Database Transactions in CI4
CI4 delivers deterministic transaction control:
1. `$this->db->transBegin()`: Initializes an isolated database transaction.
2. Intermediate SQL operations execute in staging.
3. `$this->db->transStatus()`: Audits whether any query triggered constraint violations or execution errors.
4. If healthy, `$this->db->transCommit()` commits all mutations atomically. Upon failure, `$this->db->transRollback()` reverts changes instantly to pristine state.


---

---

## Beginner Friendly Explanation

Imagine purchasing a train ticket at a ticket counter. You slide a Rp 100,000 banknote across the counter, and the clerk prints your travel pass. If the ticket printer jams and fails to print (an Error), the clerk must slide your banknote back into your hand (Rollback), rather than keeping your cash without delivering the ticket.

## Experiments

- Attempt payment with insufficient funds and verify `transRollback()` cancels status modifications.
- Deploy batch inserts via `$this->db->table("grades")->insertBatch($gradesArray)` inserting 100 grades in a single SQL operation.
- Deploy `$this->db->table("students")->selectAvg("gpa")` computing school-wide average GPAs.

---

## Challenge

Deploy Automatic Strict Transactions in CI4 (`$this->db->transStrict(true); $this->db->transStart(); ... $this->db->transComplete();`) streamlining transaction logic.

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
```output
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
```output
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
```output
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
```output
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

You have mastered CI4 Query Builder, batch operations, and atomic transactions. Next week we cover the Services Container, Events, and Caching.
