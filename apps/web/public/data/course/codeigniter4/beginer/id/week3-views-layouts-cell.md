# Antarmuka Modular: View Layouts, View Partials & View Cells

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 3:** Antarmuka Modular: View Layouts, View Partials & View Cells
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai sistem pewarisan View Layouts di CI4 (`$this->extend()` dan `$this->renderSection()`).
- Memahami konsep View Cells (`view_cell()`): widget independen yang memiliki controller mini sendiri.
- Menghindari duplikasi markup header, footer, dan sidebar di seluruh halaman web.
- Mengirim parameter dinamis ke View Cell untuk rendering widget modular.

---

## Program: Dashboard Akademik dengan View Layouts & Widget Ringkasan Nilai ViewCell

```php
<?php
// app/Cells/AcademicSummaryCell.php (CodeIgniter 4 View Cell)
namespace App\Cells;

class AcademicSummaryCell {
    public function render(array $params = []): string {
        $gradeClass = $params['grade'] ?? 'XII-RPL';
        
        // Dalam implementasi nyata: kueri rata-rata kelas dari database
        $averageGpa = 3.82;
        $totalStudents = 34;

        return view('cells/academic_summary', [
            'gradeClass'    => $gradeClass,
            'averageGpa'    => $averageGpa,
            'totalStudents' => $totalStudents,
        ]);
    }
}

// app/Views/layouts/academic_master.php (View Layout Induk)
$masterLayoutSnippet = <<<'HTML'
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title><?= $this->renderSection('title') ?> - Portal Akademik CI4</title>
    <link rel="stylesheet" href="/assets/css/academic.css">
</head>
<body class="bg-gray-50">
    <header class="navbar">Portal Sekolah Menengah Kejuruan</header>
    
    <main class="container">
        <!-- Konten Halaman Spesifik Diinjeksikan ke Section Ini -->
        <?= $this->renderSection('content') ?>
    </main>
</body>
</html>
HTML;

// app/Views/academic/dashboard.php (Halaman Anak)
$childViewSnippet = <<<'HTML'
<?= $this->extend('layouts/academic_master') ?>

<?= $this->section('title') ?>Dashboard Siswa<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <h2>Selamat Datang di Portal Nilai Akademik</h2>
    
    <!-- Memanggil View Cell Independen secara Modular -->
    <?= view_cell('App\Cells\AcademicSummaryCell::render', ['grade' => 'XII-RPL-1']) ?>
<?= $this->endSection() ?>
HTML;

echo "=== VIEW LAYOUTS & VIEW CELL SYSTEM TERDEFINISI DENGAN BERSIH ===\n";
```

---

## Konsep Kunci

Di CodeIgniter 3 lama, pengembang harus memuat view secara terpotong-potong menggunakan `$this->load->view('header'); $this->load->view('content'); $this->load->view('footer');`. Jika ada 20 halaman, urutan include ini harus diulang 20 kali.

### View Layouts di CodeIgniter 4
CI4 memperkenalkan sistem pewarisan layout modern:
1. Halaman master (`layouts/academic_master.php`) menentukan kerangka utama dan menyediakan slot section: `<?= $this->renderSection('content') ?>`.
2. Halaman spesifik (`dashboard.php`) cukup mendeklarasikan `<?= $this->extend('layouts/academic_master') ?>` dan membungkus isinya di dalam `<?= $this->section('content') ?>`.

### Inovasi Cemerlang: View Cells
**View Cell** adalah fitur paling inovatif di UI CI4. Bayangkan sebuah widget statistik rata-rata kelas yang muncul di 5 halaman berbeda. Jika menggunakan partial view biasa, controller di kelima halaman tersebut harus mengkueri database secara manual. Dengan View Cell (`view_cell('App\Cells\AcademicSummaryCell::render')`), widget memiliki controller mini sendiri yang mengambil datanya secara mandiri tanpa mencemari controller utama!


---

---

## Penjelasan untuk Pemula

Bayangkan koran dinding sekolah. View Layout seperti papan kayu induk yang sudah ditempeli logo sekolah di atasnya. View Cell seperti jam dinding digital mandiri yang ditempel di sudut papan: jam tersebut memiliki baterai sendiri dan terus berjalan tanpa perlu diatur manual oleh guru setiap kali ada pengumuman baru.

## Eksperimen

- Jalankan perintah `php spark make:cell AcademicSummary` untuk membuat View Cell otomatis.
- Tambahkan parameter kedua pada View Cell untuk meng-cache output HTML selama 5 menit (`["ttl" => 300]`).
- Gunakan section bersyarat untuk menyuntikkan file JavaScript khusus hanya pada halaman tertentu.

---

## Tantangan

Bangun View Cell `StudentAttendanceBadgeCell` yang menampilkan persentase kehadiran siswa hari ini lengkap dengan warna indikator hijau/kuning/merah.

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

Kamu telah menguasai View Layouts, template inheritance, dan modular View Cells di CI4. Minggu depan kita mempelajari CSRF, Session, dan Route Filters keamanan.
