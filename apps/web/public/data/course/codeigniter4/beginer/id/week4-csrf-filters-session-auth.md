# Keamanan Portal: Proteksi CSRF, Session & Route Filters Keamanan

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 4:** Keamanan Portal: Proteksi CSRF, Session & Route Filters Keamanan
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai arsitektur Route Filters (`FilterInterface`) di CodeIgniter 4.
- Memahami siklus `before()` (mencegat request) dan `after()` (menyuntikkan security headers ke respons).
- Mengamankan form input menggunakan proteksi CSRF bawaan CI4 (`csrf_field()`).
- Menerapkan Role-Based Access Control (RBAC) pada modul nilai raport menggunakan argumen filter.

---

## Program: Filter Autentikasi Peran Guru & Siswa dengan FilterInterface di CI4

```php
<?php
// app/Filters/RoleAuthFilter.php (CodeIgniter 4 Route Filter)
namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class RoleAuthFilter implements FilterInterface {
    // Dieksekusi SEBELUM Controller dipanggil (Penjaga Gerbang)
    public function before(RequestInterface $request, $arguments = null) {
        $session = session();

        // 1. Periksa apakah user sudah login
        if (!$session->get('is_logged_in')) {
            return redirect()->to('/login')
                ->with('error', 'Sesi Anda telah berakhir. Harap login kembali.');
        }

        // 2. Periksa Peran Pengguna (Role-Based Access Control)
        $userRole = $session->get('user_role'); // 'TEACHER', 'STUDENT', 'ADMIN'
        
        // $arguments dilewatkan dari konfigurasi rute: ['filter' => 'role:TEACHER,ADMIN']
        if (!empty($arguments) && !in_array($userRole, $arguments, true)) {
            // Pengguna login tetapi tidak memiliki hak akses ke modul ini
            return redirect()->to('/portal/unauthorized')
                ->with('error', 'Akses ditolak! Halaman penginputan nilai hanya untuk Guru.');
        }

        return null; // Lanjutkan ke Controller
    }

    // Dieksekusi SETELAH Controller selesai (Pascabedah Respons)
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {
        // Terapkan Security Headers
        $response->setHeader('X-Frame-Options', 'DENY');
        $response->setHeader('X-Content-Type-Options', 'nosniff');
        return $response;
    }
}

// app/Config/Filters.php (Registrasi Filter)
// public array $aliases = [
//     'role' => \App\Filters\RoleAuthFilter::class,
// ];

// Penggunaan di Routes.php:
// $routes->group('grades', ['filter' => 'role:TEACHER,ADMIN'], static function ($routes) {
//     $routes->post('input', 'GradeController::store');
// });

echo "=== CODEIGNITER 4 SECURITY FILTER & RBAC TERKONFIGURASI ===\n";
```

---

## Konsep Kunci

Di CodeIgniter 3 lama, pengembang sering kali menulis `if (!isset($_SESSION['user'])) exit;` di setiap method controller secara manual—cara yang sangat rapuh dan mudah terlupakan saat ada penambahan fitur baru.

### Route Filters di CodeIgniter 4
CodeIgniter 4 menyediakan **Filters** (pengganti middleware di framework lain). Filter mengimplementasikan `FilterInterface`:
- **before()**: Berjalan sebelum controller dipanggil. Jika user belum login atau perannya tidak cocok, filter langsung mengalihkan (redirect) pengguna ke halaman login dengan pesan error. Controller tidak akan pernah dieksekusi!
- **after()**: Berjalan setelah controller menghasilkan output, sangat ideal untuk menyuntikkan header keamanan HTTP seperti anti-Clickjacking (`X-Frame-Options: DENY`).

### Proteksi CSRF Otomatis
CI4 memiliki proteksi CSRF native yang dapat diaktifkan secara global di `app/Config/Filters.php`. Anda cukup menyisipkan tag `<?= csrf_field() ?>` di dalam form HTML Anda. CI4 akan memverifikasi token dan meregenerasinya secara aman pada setiap request.


---

---

## Penjelasan untuk Pemula

Bayangkan ruang guru di sekolah. Satpam di pintu gerbang utama (Filter Before) memeriksa apakah Anda memakai seragam guru. Siswa dilarang masuk ke ruang guru dan disuruh kembali ke kelas. Dan begitu tamu selesai berkunjung, petugas kebersihan memastikan pintu gerbang selalu terkunci rapat kembali (Filter After).

## Eksperimen

- Akses URL `/grades/input` tanpa login dan buktikan filter otomatis me-redirect Anda ke `/login`.
- Simulasikan login sebagai siswa dan buktikan filter menolak akses ke halaman guru dengan pesan peringatan.
- Aktifkan opsi `$csrf->regenerate = true;` di `app/Config/Security.php` untuk keamanan token tingkat tinggi.

---

## Tantangan

Buat Throttle Filter kustom yang membatasi percobaan login maksimal 5 kali per IP dalam waktu 1 menit menggunakan CI4 Cache Engine untuk mencegah serangan Brute-Force Password.

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

Kamu telah menguasai Route Filters, proteksi CSRF, dan RBAC di CI4. Level 1 selesai! Di Level 2 kita mempelajari RESTful APIs, Database Transactions, dan SIS Capstone.
