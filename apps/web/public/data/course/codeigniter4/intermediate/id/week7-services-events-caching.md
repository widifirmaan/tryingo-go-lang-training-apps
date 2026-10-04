# Arsitektur Enterprise: Services Container, System Events & Caching

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 7:** Arsitektur Enterprise: Services Container, System Events & Caching
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai kontainer layanan terpusat CodeIgniter 4 (`Config\Services` dan helper `service()`).
- Menggunakan System Events (`Events::on` dan `Events::trigger`) untuk memisahkan logika efek samping.
- Mengonfigurasi Caching Engine bawaan CI4 dengan driver File, Redis, atau Memcached.
- Mengimplementasikan pola Singleton (`getSharedInstance`) untuk efisiensi memori layanan bersama.

---

## Program: Sistem Event Kelulusan Siswa & Cache Transkrip Nilai Akademik di CI4

```php
<?php
// app/Config/Events.php (CI4 System Events)
namespace Config;

use CodeIgniter\Events\Events;

// 1. Mendaftarkan Event Listener untuk Kelulusan Siswa
Events::on('student:graduated', static function (int $studentId, string $honorTitle) {
    echo "[EVENT TRIGGERED] Siswa ID #{$studentId} resmi dinyatakan LULUS dengan predikat: {$honorTitle}!\n";
    echo " -> Mengirim instruksi pencetakan ijazah fisik ke antrean tata usaha...\n";
});

// app/Config/Services.php (CI4 Central Services Factory)
namespace Config;

use CodeIgniter\Config\BaseService;
use App\Services\TranscriptCacheService;

class Services extends BaseService {
    // Daftarkan Service sebagai Shared Singleton di seluruh aplikasi
    public static function transcriptCache(bool $getShared = true): TranscriptCacheService {
        if ($getShared) {
            return static::getSharedInstance('transcriptCache');
        }
        return new TranscriptCacheService(service('cache'));
    }
}

// app/Services/TranscriptCacheService.php
namespace App\Services;

use CodeIgniter\Cache\CacheInterface;

class TranscriptCacheService {
    public function __construct(private CacheInterface $cache) {}

    public function getStudentTranscript(int $studentId): array {
        $cacheKey = "academic:transcript:student_{$studentId}";

        // 1. Cek apakah ada di cache (File atau Redis driver)
        $cachedData = $this->cache->get($cacheKey);
        if ($cachedData !== null) {
            echo "[CACHE HIT] Mengembalikan transkrip nilai siswa #{$studentId} dari Cache CI4.\n";
            return $cachedData;
        }

        // 2. Cache Miss: Kueri dari Database
        echo "[CACHE MISS] Mengkueri seluruh nilai raport 6 semester dari database untuk siswa #{$studentId}...\n";
        $transcript = [
            'student_id'   => $studentId,
            'total_credits' => 144,
            'final_gpa'    => 3.88,
            'generated_at' => date('Y-m-d H:i:s')
        ];

        // Simpan ke Cache selama 1 Jam (3600 Detik)
        $this->cache->save($cacheKey, $transcript, 3600);
        return $transcript;
    }
}

echo "=== CODEIGNITER 4 SERVICES, EVENTS & CACHING PIPELINE READY ===\n";
```

---

## Konsep Kunci

Meskipun CodeIgniter 4 dirancang sederhana, framework ini memiliki arsitektur enterprise yang sangat matang melalui kelas **Services** dan **System Events**.

### Services Container (Config\Services)
Di CI4, semua komponen inti (database connection, session, cache, router) dikelola oleh pabrik terpusat `Config\Services`. Alih-alih membuat instance baru setiap saat, kita memanggil `service('cache')` atau mendaftarkan custom service kita sendiri. Fitur `getSharedInstance` memastikan objek hanya dibuat satu kali di memori (Singleton).

### System Events di CI4
`CodeIgniter\Events\Events` menyediakan pola Publish-Subscribe bawaan. Ketika seorang siswa dinyatakan lulus, controller cukup memanggil:
`Events::trigger('student:graduated', $studentId, 'Summa Cum Laude');`
Seluruh listener (pengiriman SMS ke wali murid, pencetakan nomor ijazah di dinas pendidikan) otomatis dieksekusi tanpa membuat controller menjadi rumit.

### CI4 Caching Abstraction
Dengan antarmuka yang seragam (`$cache->get`, `$cache->save`, `$cache->delete`), Anda dapat beralih dari penyimpanan file lokal saat development ke server Redis berkecepatan tinggi saat production hanya dengan mengubah satu baris di file `.env`.


---

---

## Penjelasan untuk Pemula

Bayangkan kantor sekolah modern. Services Container seperti gudang perlengkapan sekolah terpusat tempat guru meminjam proyektor dan spidol (semua guru memakai alat yang sama secara bersama). System Events seperti bel pengumuman sekolah: ketika kepala sekolah mengumumkan "Lomba Dimulai", seluruh guru dan murid serentak melakukan tugas masing-masing tanpa kepala sekolah perlu mendatangi setiap kelas satu per satu.

## Eksperimen

- Panggil method `getStudentTranscript(101)` dua kali dan amati panggilan kedua memicu `[CACHE HIT]`.
- Ubah konfigurasi cache handler dari `File` ke `Redis` di `app/Config/Cache.php`.
- Daftarkan event listener kustom di `app/Config/Events.php` dan picu menggunakan `Events::trigger()`.

---

## Tantangan

Buat cache invalidation otomatis: ketika nilai siswa diperbarui di database, picu event `Events::trigger("grade:updated", $studentId)` yang otomatis menghapus cache transkrip siswa tersebut.

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

Kamu telah menguasai Services Container, System Events, dan Caching Engine di CI4. Minggu depan adalah Capstone Final: Sistem Informasi Manajemen Akademik Sekolah (SIS) Skala Penuh!
