# Persistensi Data: CI4 Models, Model Entities & Database Forge

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 2:** Persistensi Data: CI4 Models, Model Entities & Database Forge
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Membedakan peran CI4 Model (akses tabel database) vs Entity (representasi baris data berbasis objek).
- Menggunakan properti `$returnType = StudentEntity::class` untuk hidrasi objek otomatis.
- Menerapkan aturan validasi terpusat pada properti `$validationRules` di tingkat model.
- Mengelola skema database secara terprogram menggunakan Database Migrations (`php spark migrate`).

---

## Program: Entitas Siswa & Model Nilai Akademik dengan Casting & Validasi Terpusat

```php
<?php
// app/Entities/StudentEntity.php
namespace App\Entities;

use CodeIgniter\Entity\Entity;

// Model Entity: Mewakili satu baris data siswa dengan business methods
class StudentEntity extends Entity {
    protected $dates = ['created_at', 'updated_at', 'birth_date'];

    protected $casts = [
        'id'        => 'integer',
        'nisn'      => 'string',
        'gpa'       => 'float',
        'is_active' => 'boolean',
    ];

    // Computed Attribute: Predikat Kelulusan Otomatis
    public function getGraduationHonors(): string {
        $gpa = (float) ($this->attributes['gpa'] ?? 0.0);
        return match (true) {
            $gpa >= 3.90 => 'Summa Cum Laude',
            $gpa >= 3.75 => 'Magna Cum Laude',
            $gpa >= 3.50 => 'Cum Laude',
            default      => 'Lulus Memuaskan',
        };
    }
}

// app/Models/StudentModel.php
namespace App\Models;

use CodeIgniter\Model;
use App\Entities\StudentEntity;

class StudentModel extends Model {
    protected $table            = 'students';
    protected $primaryKey       = 'id';
    protected $returnType       = StudentEntity::class; // Otomatis return objek Entity!
    protected $useTimestamps    = true;
    protected $allowedFields    = ['nisn', 'full_name', 'grade_class', 'gpa', 'is_active', 'birth_date'];

    // Aturan Validasi Terpusat di Tingkat Model
    protected $validationRules = [
        'nisn'        => 'required|alpha_numeric|min_length[7]|max_length[10]|is_unique[students.nisn,id,{id}]',
        'full_name'   => 'required|min_length[3]|max_length[120]',
        'grade_class' => 'required|max_length[20]',
        'gpa'         => 'required|decimal|greater_than_equal_to[0.0]|less_than_equal_to[4.0]',
    ];

    protected $validationMessages = [
        'nisn' => [
            'is_unique' => 'NISN ini sudah terdaftar di sistem buku induk!',
        ],
    ];
}

echo "=== CODEIGNITER 4 MODEL & ENTITY DENGAN VALIDASI ATRIBUT TERKONFIGURASI ===\n";
```

---

## Konsep Kunci

Salah satu lonjakan arsitektur terbesar di CodeIgniter 4 adalah hadirnya **Model Entities**. Di CI3 lawas, model hanya mengembalikan array asosiatif mentah tanpa metode bisnis apa pun.

### Keunggulan CI4 Model Entities
Entity (`CodeIgniter\Entity\Entity`) adalah kelas pembawa data cerdas:
- Secara otomatis mengonversi tipe data kolom melalui properti `$casts = ['gpa' => 'float']`.
- Mendukung penulisan logika bisnis komputasi langsung di dalam model, misalnya method `getGraduationHonors()`.
- Mengizinkan mutasi data dirty tracking: Entity hanya mengirimkan field yang benar-benar berubah saat method `$model->save($entity)` dipanggil.

### Validasi Terpusat di Model
Daripada menulis aturan validasi berulang di setiap controller form, CI4 memungkinkan penetapan `$validationRules` langsung di dalam kelas model. Ketika controller memanggil `$studentModel->save($data)`, validasi otomatis dievaluasi. Jika data gagal, `$studentModel->errors()` menyediakan daftar error lengkap.


---

---

## Penjelasan untuk Pemula

Bayangkan formulir rapor siswa. Di CI3 lama, rapor hanya selembar fotokopi biasa tanpa kalkulator. Di CI4 dengan Entity, rapor tersebut seperti rapor digital cerdas: begitu nilai dimasukkan, rapor otomatis menghitung sendiri apakah siswa mendapat predikat Juara Kelas (Cum Laude) tanpa guru perlu menghitung manual dengan kalkulator.

## Eksperimen

- Jalankan perintah `php spark make:migration CreateStudentsTable` dan definisikan kolom tabel dengan `$this->forge`.
- Coba simpan data siswa dengan IPK 4.5 dan amati bagaimana validasi `less_than_equal_to[4.0]` menolak data.
- Gunakan method `$studentModel->paginate(10)` untuk paginasi data otomatis.

---

## Tantangan

Tambahkan mutator method `setPassword(string $pass)` pada Entity yang secara otomatis melakukan hash password menggunakan `password_hash($pass, PASSWORD_ARGON2ID)` sebelum disimpan ke database.

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

Kamu telah menguasai CI4 Models, Model Entities, dan Database Migrations. Minggu depan kita mempelajari View Layouts dan View Cells.
