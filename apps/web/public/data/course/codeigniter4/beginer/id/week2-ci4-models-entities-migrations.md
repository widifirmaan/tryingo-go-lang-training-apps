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

Kamu telah menguasai CI4 Models, Model Entities, dan Database Migrations. Minggu depan kita mempelajari View Layouts dan View Cells.
