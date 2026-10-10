# Arsitektur CodeIgniter 4: Spark CLI, Routing & Controller Namespacing

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 1:** Arsitektur CodeIgniter 4: Spark CLI, Routing & Controller Namespacing
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi CodeIgniter 4: framework PHP teringan di dunia dengan jejak instalasi sangat kecil (< 15MB).
- Menggunakan Spark CLI (`php spark serve`, `php spark make:controller`) untuk otomatisasi pengembangan.
- Mengorganisir rute terstruktur menggunakan `$routes->group()` dan named routes.
- Menerapkan namespacing controller berbasis domain bisnis (`App\Controllers\Academic`).

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **PHP Intelephense** (`bmewburn.vscode-intelephense-client`): Autocomplete kode PHP

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension bmewburn.vscode-intelephense-client
```

---

### 2. Instalasi Runtime & Dependency (PHP 8.1+ & Composer)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install PHP.PHP.8.3 && winget install Composer.Composer
```

**macOS (Terminal / Homebrew):**
```bash
brew install php composer
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y php-cli php-intl composer
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
php -v && composer -v
```

Output yang diharapkan:
```output
PHP 8.x
Composer 2.x
```

> 💡 **Tips Prasyarat:** Pastikan ekstensi php-intl dan php-mbstring aktif di php.ini.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
composer create-project codeigniter4/appstarter my-ci4-app
cd my-ci4-app
```
- **Keterangan:** Mengunduh starter resmi CodeIgniter 4 dengan struktur direktori siap pakai.
- **Pindah ke direktori project:**
```bash
cd my-ci4-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
php spark serve
```
Akses di browser atau terminal: `http://localhost:8080`

> ℹ️ Server CodeIgniter Spark aktif di port 8080.

**File Titik Masuk Utama (`app/Controllers/Home.php`):**
```php
<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return $this->response->setJSON([
            'framework' => 'CodeIgniter 4',
            'status' => 'running',
            'message' => 'Halo dari CodeIgniter 4 Spark!'
        ]);
    }
}
```
Controller default CodeIgniter 4 mengembalikan JSON.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-ci4-app/
├── app/
│   ├── Controllers/     # Controller logika HTTP
│   ├── Models/          # Model query database
│   └── Views/           # Template tampilan HTML
├── public/              # Document root web server
├── spark                # Script CLI CodeIgniter
└── env                  # File contoh konfigurasi (rename ke .env)
```
Arsitektur MVC ramping CodeIgniter 4.

---

### 6. Tips & Best Practice untuk Pemula
- Ubah nama file `env` menjadi `.env` dan atur `CI_ENVIRONMENT = development` untuk mengaktifkan Debug Toolbar.
- Gunakan perintah `php spark make:controller User` untuk membuat controller baru dengan cepat.

---

## Program: Portal Akademik Sekolah dengan Spark CLI & Route Groups Terstruktur

```php
<?php
// app/Config/Routes.php (CodeIgniter 4 Modern Routing)
use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Pengelompokan Rute Portal Akademik Berdasarkan Namespace
$routes->group('portal/academic', ['namespace' => 'App\Controllers\Academic'], static function ($routes) {
    $routes->get('/', 'DashboardController::index', ['as' => 'academic.dashboard']);
    $routes->get('students', 'StudentController::index', ['as' => 'academic.students.list']);
    $routes->get('students/(:num)', 'StudentController::show/$1', ['as' => 'academic.students.show']);
    $routes->post('students/enroll', 'StudentController::enroll', ['as' => 'academic.students.enroll']);
});

// app/Controllers/Academic/StudentController.php
namespace App\Controllers\Academic;

use App\Controllers\BaseController;

class StudentController extends BaseController {
    public function index(): string {
        $data = [
            'title'       => 'Buku Induk Siswa & Akademik',
            'active_term' => 'Semester Ganjil 2026/2027',
            'students'    => [
                ['nisn' => '1029481', 'name' => 'Aditya Pratama', 'grade' => 'XII-RPL-1', 'gpa' => 3.85],
                ['nisn' => '1029482', 'name' => 'Siti Nurhaliza', 'grade' => 'XII-RPL-1', 'gpa' => 3.92],
            ]
        ];

        return view('academic/student_list', $data);
    }

    public function show(int $nisn): string {
        return view('academic/student_detail', ['nisn' => $nisn]);
    }
}

echo "=== CODEIGNITER 4 MVC SPARK ROUTING & CONTROLLER NAMESPACING ACTIVE ===\n";
```

---

## Konsep Kunci

CodeIgniter 4 (CI4) adalah framework PHP modern yang ditulis ulang sepenuhnya dari nol untuk mendukung PHP 8. CI4 mempertahankan reputasinya yang legendaris: **sangat cepat**, ramah terhadap server berspesifikasi hemat (shared hosting), dan tidak membutuhkan dependensi npm atau Node.js yang rumit.

### Spark CLI
CI4 dilengkapi dengan CLI bawaan bernama **Spark** (`php spark`). Spark menyediakan puluhan perintah otomatis untuk membuat Controller, Model, Migration, Seeder, hingga menjalankan server lokal pengembangan (`php spark serve`).

### Routing Modern dan Namespacing
Di CI4 modern, auto-routing lama yang tidak aman dinonaktifkan secara default. Kita mendefinisikan rute eksplisit di `app/Config/Routes.php`. Menggunakan `$routes->group()` dengan opsi `'namespace'`, kita memisahkan Controller modul akademik, keuangan, dan admin sekolah ke dalam sub-folder rapi tanpa konflik penamaan kelas.


---

---

## Penjelasan untuk Pemula

Bayangkan perbedaan antara truk trailer besar yang butuh jalan tol lebar (framework berat) vs sepeda motor gesit yang bisa melewati gang sempit dan sampai tujuan dalam 3 menit (CodeIgniter 4). CI4 sangat ringan, tidak membebani memori server sekolah, dan dapat langsung dipasang di server murah sekalipun.

## Eksperimen

- Jalankan perintah `php spark routes` di terminal untuk melihat seluruh peta rute yang aktif.
- Gunakan placeholder `(:segment)` atau `(:num)` untuk membatasi tipe parameter URL yang diizinkan.
- Ubah environment ke `development` di file `.env` untuk mengaktifkan Debug Toolbar grafis CI4.

---

## Tantangan

Buat Subdomain Routing di CI4: arahkan request dari `admin.sekolah.sch.id` langsung ke controller grup `App\Controllers\Admin\` secara terisolasi.

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

Kamu telah menguasai arsitektur MVC CI4, Spark CLI, dan Controller Namespacing. Minggu depan kita masuk ke Model Entities dan Database Migrations.
