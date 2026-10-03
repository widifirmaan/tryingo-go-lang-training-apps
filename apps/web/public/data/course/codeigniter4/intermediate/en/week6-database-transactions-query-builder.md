# Advanced Query Builder & Multi-Table Atomic Database Transactions

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 6:** Advanced Query Builder & Multi-Table Atomic Database Transactions

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

## Summary

You have mastered CI4 Query Builder, batch operations, and atomic transactions. Next week we cover the Services Container, Events, and Caching.
