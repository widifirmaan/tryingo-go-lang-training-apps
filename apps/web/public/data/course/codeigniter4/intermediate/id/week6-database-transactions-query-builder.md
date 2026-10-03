# Query Builder Canggih & Transaksi Database Multi-Tabel Atomik

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 6:** Query Builder Canggih & Transaksi Database Multi-Tabel Atomik
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai Query Builder CI4 berkecepatan tinggi: joins, aggregates, batch inserts, dan sub-queries.
- Memahami manajemen transaksi database ACID di CI4: `transBegin()`, `transCommit()`, dan `transRollback()`.
- Menggunakan metode pengecekan status transaksi `$this->db->transStatus()`.
- Mencegah data keuangan parsial (inkonsistensi saldo) saat koneksi terputus di tengah jalan.

---

## Program: Transaksi Pembayaran SPP Sekolah & Aktivasi KRS Siswa Bebas Race Condition

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

## Konsep Kunci

Ketika aplikasi menangani pembayaran uang sekolah (SPP) atau pencatatan nilai rapor semester, satu kegagalan query tidak boleh meninggalkan data dalam kondisi menggantung (misal: uang sudah tercatat masuk di tabel pembayaran, tetapi status pendaftaran siswa tetap berstatus "Belum Lunas").

### Query Builder Berperforma Tinggi
Query Builder CodeIgniter 4 dirancang untuk kecepatan murni tanpa overhead memori yang besar. Sintaksnya seperti `$this->db->table('students')->where(...)->update(...)` menghasilkan kueri SQL parameter-bound yang kebal terhadap SQL Injection.

### Transaksi Database Manual di CI4
CI4 menyediakan kontrol transaksi yang sangat fleksibel:
1. `$this->db->transBegin()`: Membuka transaksi database.
2. Seluruh kueri dieksekusi secara terisolasi.
3. `$this->db->transStatus()`: Memeriksa apakah ada salah satu kueri yang mengalami syntax error atau constraint violation.
4. Jika aman, `$this->db->transCommit()` membukukan seluruh perubahan secara atomik. Jika ada exception, `$this->db->transRollback()` mengembalikan database ke kondisi awal seolah-olah tidak ada yang pernah terjadi.


---

---

## Penjelasan untuk Pemula

Bayangkan transaksi pembelian tiket kereta api di kasir. Anda menyerahkan uang tunai Rp 100.000 ke kasir, dan kasir mencetak tiket untuk Anda. Jika mesin cetak tiket tiba-tiba kehabisan tinta dan tiket gagal keluar (Error), kasir wajib mengembalikan uang Rp 100.000 Anda kembali ke tangan Anda (Rollback), bukan menyimpan uang Anda tanpa memberikan tiket.

## Eksperimen

- Uji coba transfer dengan nominal kurang dari tagihan dan buktikan mekanisme `transRollback()` membatalkan perubahan status.
- Gunakan metode batch insert `$this->db->table("grades")->insertBatch($gradesArray)` untuk memasukkan 100 nilai siswa sekaligus dalam 1 kueri.
- Gunakan query builder `$this->db->table("students")->selectAvg("gpa")` untuk menghitung rata-rata nilai sekolah.

---

## Tantangan

Gunakan metode Automatic Strict Transactions di CI4 (`$this->db->transStrict(true); $this->db->transStart(); ... $this->db->transComplete();`) untuk menyederhanakan alur transaksi.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Lupa Menyesuaikan `baseURL` di File `.env`
- **Gejala / Masalah:** Aset CSS/JS tidak termuat atau link navigasi redirect ke alamat yang keliru.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pastikan variabel `app.baseURL = 'http://localhost:8080/'` telah disesuaikan dengan domain yang aktif.

### 2. Mengabaikan Fitur CSRF Protection Bawaan
- **Gejala / Masalah:** Formulir POST rentan serangan Cross-Site Request Forgery.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Aktifkan filter CSRF di `app/Config/Filters.php` dan sertakan `<?= csrf_field() ?>` di setiap form.

### 3. Salah Penamaan Namespace Controller & Model
- **Gejala / Masalah:** Framework gagal memuat class dengan pesan `Class not found` akibat inkonsistensi huruf kapital.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Patuhi konvensi penamaan PSR-4 dan pastikan nama folder/berkas sesuai persis dengan namespace.

---

## Ringkasan

Kamu telah menguasai CI4 Query Builder, batch operations, dan transaksi database atomik. Minggu depan kita mempelajari Services Container, Events, dan Caching.
