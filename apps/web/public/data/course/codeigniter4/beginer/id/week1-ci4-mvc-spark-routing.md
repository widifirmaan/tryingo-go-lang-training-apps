# Arsitektur CodeIgniter 4: Spark CLI, Routing & Controller Namespacing

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 1:** Arsitektur CodeIgniter 4: Spark CLI, Routing & Controller Namespacing

## Tujuan Pembelajaran

- Memahami filosofi CodeIgniter 4: framework PHP teringan di dunia dengan jejak instalasi sangat kecil (< 15MB).
- Menggunakan Spark CLI (`php spark serve`, `php spark make:controller`) untuk otomatisasi pengembangan.
- Mengorganisir rute terstruktur menggunakan `$routes->group()` dan named routes.
- Menerapkan namespacing controller berbasis domain bisnis (`App\Controllers\Academic`).

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

## Ringkasan

Kamu telah menguasai arsitektur MVC CI4, Spark CLI, dan Controller Namespacing. Minggu depan kita masuk ke Model Entities dan Database Migrations.
