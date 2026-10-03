# RESTful Web APIs: ResourceController, Content Negotiation & ResponseTrait

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 5:** RESTful Web APIs: ResourceController, Content Negotiation & ResponseTrait
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai `CodeIgniter\RESTful\ResourceController` untuk pembuatan RESTful API secepat kilat.
- Menggunakan metode helper bawaan `ResponseTrait`: `respond()`, `respondCreated()`, `failNotFound()`, dan `failValidationErrors()`.
- Mengonfigurasi resource routing dengan satu baris `$routes->resource()`.
- Menerapkan Content Negotiation otomatis untuk format JSON dan XML.

---

## Program: RESTful API Raport Siswa untuk Aplikasi Mobile Wali Murid dengan ResponseTrait

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

## Konsep Kunci

Banyak developer terkejut mengetahui betapa hebatnya CodeIgniter 4 untuk membangun backend RESTful API aplikasi mobile. CI4 menyertakan kelas khusus **ResourceController** yang mengeliminasi seluruh kode boilerplate API.

### ResponseTrait Helper Methods
Alih-alih menulis `echo json_encode(...)` dan mengatur header HTTP status code secara manual, `ResponseTrait` menyediakan method semantik:
- `$this->respond($data)`: Mengembalikan HTTP 200 OK dengan format JSON.
- `$this->respondCreated($data)`: Mengembalikan HTTP 201 Created.
- `$this->failNotFound($message)`: Mengembalikan HTTP 404 Not Found terstruktur.
- `$this->failValidationErrors($errors)`: Mengembalikan HTTP 400 Bad Request lengkap dengan array validasi.

### Resource Routing dengan Satu Baris
Cukup tambahkan `$routes->resource('api/v1/students')` di file konfigurasi. CI4 secara otomatis memetakan seluruh kata kerja HTTP RESTful standar:
- `GET /students` -> `index()`
- `GET /students/{id}` -> `show($id)`
- `POST /students` -> `create()`
- `PUT /students/{id}` -> `update($id)`
- `DELETE /students/{id}` -> `delete($id)`


---

---

## Penjelasan untuk Pemula

Bayangkan loket kasir otomatis di bank. Daripada Anda harus berteriak dan menjelaskan apa yang Anda mau, loket sudah memiliki 5 tombol tombol standar: Tombol Lihat Saldo (GET), Tombol Buka Tabungan (POST), Tombol Ganti Alamat (PUT), dan Tombol Tutup Akun (DELETE). Semuanya berjalan cepat dan otomatis.

## Eksperimen

- Kirim request POST dengan data NISN yang sudah ada dan amati respons JSON error dari `failValidationErrors`.
- Kirim request GET dengan header `Accept: application/xml` dan buktikan CI4 otomatis mengubah respons ke XML.
- Kirim request GET ke ID siswa yang tidak ada dan amati format JSON dari `failNotFound`.

---

## Tantangan

Tambahkan autentikasi API Key pada ResourceController menggunakan header kustom `X-API-KEY` yang memverifikasi akses dari aplikasi mobile wali murid.

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

Kamu telah menguasai CI4 ResourceController, ResponseTrait, dan Content Negotiation. Minggu depan kita mempelajari Query Builder dan transaksi database atomik.
