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
```output
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
```output
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
```output
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
```output
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

Kamu telah menguasai CI4 ResourceController, ResponseTrait, dan Content Negotiation. Minggu depan kita mempelajari Query Builder dan transaksi database atomik.
