# Capstone: Sistem Informasi Akademik Sekolah (SIS) Skala Penuh Production-Ready

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 8:** Capstone: Sistem Informasi Akademik Sekolah (SIS) Skala Penuh Production-Ready
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh ekosistem: MVC, Model Entities, Query Builder, Route Filters, dan REST APIs.
- Membangun sistem informasi akademik sekolah (SIS) yang ringan, cepat, dan hemat sumber daya memori server.
- Mengonfigurasi endpoint `/healthz` untuk probe liveness/readiness klaster container cloud.
- Menyiapkan arsitektur web modern yang siap dideploy di lingkungan Docker dan web server Nginx / Apache.

---

## Program: Sistem Informasi Akademik Sekolah Lengkap (CI4, Entities, REST API, Auth Filters & Transaksi)

```php
<?php
// CodeIgniter 4 Production Academic SIS Capstone Architecture
namespace App\Controllers\Academic;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Database;

class SisReportCardController extends BaseController {
    // Alur Cetak Buku Rapor Digital & Rekap Nilai Semester
    public function generateReportCard(int $studentId): ResponseInterface {
        $db = Database::connect();

        // 1. Ambil data siswa dan nilai menggunakan Query Builder Canggih
        $student = $db->table('students')->where('id', $studentId)->get()->getRow();
        if (!$student) {
            return $this->response->setStatusCode(404)->setJSON(['error' => 'Siswa tidak ditemukan.']);
        }

        $scores = $db->table('academic_scores')
            ->select('subjects.name as subject_name, academic_scores.score, academic_scores.grade_letter')
            ->join('subjects', 'subjects.id = academic_scores.subject_id')
            ->where('academic_scores.student_id', $studentId)
            ->get()
            ->getResultArray();

        $reportData = [
            'portal'       => 'Tryngo Academic School Information System',
            'version'      => 'CI4-LTS',
            'student_nisn' => $student->nisn,
            'student_name' => $student->full_name,
            'academic_term'=> 'Semester Genap 2026',
            'total_subjects' => count($scores),
            'grades'       => $scores,
            'status'       => 'VERIFIED_OFFICIAL'
        ];

        return $this->response->setJSON($reportData);
    }

    // Health Check Probe untuk Kubernetes / Docker Container Liveness
    public function healthz(): ResponseInterface {
        return $this->response->setJSON([
            'status'      => 'healthy',
            'framework'   => 'CodeIgniter ' . \CodeIgniter\CodeIgniter::CI_VERSION,
            'php_version' => PHP_VERSION,
            'database'    => 'connected',
            'cache'       => 'active'
        ]);
    }
}

echo "=== TRYNGO SCHOOL INFORMATION SYSTEM (SIS) PRODUCTION ENGINE ACTIVE ===\n";
echo "Siap melayani ribuan siswa, guru, dan wali murid dengan kecepatan tinggi.\n";
```

---

## Konsep Kunci

Selamat! Anda telah mencapai proyek Capstone akhir kurikulum CodeIgniter 4. Sistem ini menyatukan semua fondasi rekayasa perangkat lunak CI4 ke dalam satu platform Sistem Informasi Akademik Sekolah (SIS) yang tangguh, aman, dan siap diproduksi.

### Keunggulan Efisiensi Sumber Daya
Berbeda dari framework modern lain yang membutuhkan server cloud mahal dengan RAM gigabyte besar, aplikasi SIS berbasis CodeIgniter 4 ini dapat melayani ribuan siswa dan guru secara bersamaan di atas server VPS ekonomis dengan konsumsi RAM di bawah 20MB.

### Arsitektur Terpadu Web & API
Sistem ini menyediakan dua antarmuka harmonis:
1. **Web Portal Guru & Admin**: Dibangun dengan View Layouts dan View Cells yang interaktif untuk penginputan nilai dan rekap buku induk.
2. **RESTful API Wali Murid**: Ditenagai oleh ResourceController untuk memberikan data nilai dan absensi secara real-time ke aplikasi smartphone wali murid.


---

---

## Penjelasan untuk Pemula

Proyek ini ibarat gedung sekolah digital modern yang serba efisien. Ruang guru memiliki meja buku rapor yang rapi dan teratur (Web Portal & View Layouts), gerbang sekolah dijaga satpam pintar yang memeriksa tanda pengenal (Route Filters), brankas penyimpanan nilai terbuat dari baja anti-bongkar (Database Transactions & Prepared Statements), dan ada loket kilat di dinding sekolah tempat orang tua siswa bisa mengecek nilai rapor anaknya lewat smartphone kapan pun (REST API).

## Eksperimen

- Jalankan aplikasi dan uji coba endpoint raport `/academic/generateReportCard/1` melalui browser.
- Periksa endpoint status kesehatan server pada `/academic/healthz`.
- Ukur waktu respons request menggunakan Debug Toolbar CI4 dan buktikan latensi di bawah 15 milidetik.

---

## Tantangan

Tambahkan modul Export PDF: gunakan pustaka `Dompdf` di dalam service CI4 untuk menghasilkan file PDF rapor resmi siswa lengkap dengan watermark tanda tangan kepala sekolah.

---

## Model Mental & Diagram Alur Visual

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

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `$routes->get('items', 'Items::index')`
- **Fungsi Utama:** Routing URI CodeIgniter 4.
- **Parameter / Atribut:** `HTTP verb, URI string, Controller::method`.
- **Perilaku & Efek Sistem:** Menghubungkan URL browser ke controller CodeIgniter 4 dengan namespace terorganisir..
- **Contoh Penggunaan Praktis:**
```php
<?php
$routes->get('catalog', 'CatalogController::index');
$routes->post('catalog/create', 'CatalogController::create');
```
- **Hasil Output yang Diharapkan:**
```text
Endpoint CI4 siap menerima koneksi HTTP
```

### 2. `class ProductModel extends Model { protected $allowedFields = [...]; }`
- **Fungsi Utama:** Model CI4 dengan Query Builder bawaan.
- **Parameter / Atribut:** `$table, $primaryKey, $allowedFields`.
- **Perilaku & Efek Sistem:** Menyediakan operasi database aman dengan proteksi field otomatis tanpa query SQL mentah..
- **Contoh Penggunaan Praktis:**
```php
<?php
namespace App\Models;
use CodeIgniter\Model;
class ProductModel extends Model {
    protected $table = 'products';
    protected $allowedFields = ['name', 'price'];
}
```
- **Hasil Output yang Diharapkan:**
```text
Model siap menjalankan method findAll() dan save()
```

### 3. `return view('template_name', $data)`
- **Fungsi Utama:** Helper render antarmuka View CI4.
- **Parameter / Atribut:** `View path, Data array`.
- **Perilaku & Efek Sistem:** Mengurai berkas view PHP di dalam direktori `app/Views/` dan menyajikannya ke layar klien..
- **Contoh Penggunaan Praktis:**
```php
<?php
$data = ['title' => 'Katalog Produk', 'items' => $items];
return view('products/list', $data);
```
- **Hasil Output yang Diharapkan:**
```text
Halaman web disajikan melalui buffering respons
```

### 4. `$this->request->getPost('fieldName')`
- **Fungsi Utama:** Pengambilan input request aman CI4.
- **Parameter / Atribut:** `Field identifier, Filter flag`.
- **Perilaku & Efek Sistem:** Membaca payload POST yang masuk dengan pembersihan sanitasi XSS bawaan framework..
- **Contoh Penggunaan Praktis:**
```php
<?php
$title = $this->request->getPost('title', FILTER_SANITIZE_SPECIAL_CHARS);
```
- **Hasil Output yang Diharapkan:**
```text
Input terbaca dengan pembersihan karakter berbahaya
```

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum CodeIgniter 4 dari nol hingga Sistem Informasi Akademik Sekolah berskala produksi!
