# Arsitektur CodeIgniter 4: Spark CLI, Routing & Controller Namespacing

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 1:** Arsitektur CodeIgniter 4: Spark CLI, Routing & Controller Namespacing
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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
