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

Kamu telah menguasai Route Filters, proteksi CSRF, dan RBAC di CI4. Level 1 selesai! Di Level 2 kita mempelajari RESTful APIs, Database Transactions, dan SIS Capstone.
