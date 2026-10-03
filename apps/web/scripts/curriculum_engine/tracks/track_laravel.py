"""
Laravel Track Curriculum Generator (10 Weeks, 3 Levels)
Product: High-Scalability Multi-Vendor E-Commerce Marketplace (Laravel 11 + Reverb + Stripe + Horizon)
"""

def get_track():
    return {
        'slug': 'laravel',
        'track_name': 'Laravel Framework',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (Laravel 11 Foundations & Eloquent ORM)',
                'nameEn': 'Beginner (Laravel 11 Foundations & Eloquent ORM)',
                'descId': 'Struktur ramping Laravel 11, Artisan CLI, routing, Blade components, Eloquent ORM, dan form validation.',
                'descEn': 'Laravel 11 streamlined structure, Artisan CLI, routing, Blade components, Eloquent ORM, and form validation.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (API Resources, Sanctum & Queued Events)',
                'nameEn': 'Intermediate (API Resources, Sanctum & Queued Events)',
                'descId': 'RESTful API dengan Sanctum, API Resources, arsitektur event-driven, antrean background jobs Redis, dan Stripe billing.',
                'descEn': 'RESTful APIs with Sanctum, API Resources, event-driven architecture, Redis background queues, and Stripe billing.',
            },
            {
                'levelId': 'advanced',
                'nameId': 'Lanjutan (Reverb WebSockets, Scout & Marketplace Capstone)',
                'nameEn': 'Advanced (Reverb WebSockets, Scout & Marketplace Capstone)',
                'descId': 'WebSockets real-time dengan Laravel Reverb, pencarian full-text Scout, queue worker Horizon, dan marketplace multi-vendor.',
                'descEn': 'Real-time WebSockets with Laravel Reverb, Scout full-text search, Horizon queue monitoring, and multi-vendor marketplace.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'laravel11-artisan-routing-blade',
                'titleId': 'Modern Laravel 11: Struktur Ramping, Artisan & Komponen Blade',
                'titleEn': 'Modern Laravel 11: Streamlined Structure, Artisan & Blade Components',
                'programId': 'Katalog Etalase Marketplace dengan Komponen Blade & Routing Dinamis',
                'programEn': 'Marketplace Storefront Catalog with Blade Components & Dynamic Routing',
                'language': 'php',
                'code': '''<?php
// routes/web.php (Laravel 11: Konfigurasi Ramping Tanpa Kernel.php)
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    $featuredProducts = [
        ['id' => 1, 'slug' => 'vps-cloud-pro', 'name' => 'High-Speed Cloud VPS 8GB', 'price' => 350000, 'vendor' => 'IndoCloud'],
        ['id' => 2, 'slug' => 'mechanical-kb',  'name' => 'Custom Mechanical Keyboard', 'price' => 1250000, 'vendor' => 'KeyCraft Store'],
        ['id' => 3, 'slug' => '4k-monitor-pro', 'name' => 'UltraSharp 27" 4K Monitor',  'price' => 6400000, 'vendor' => 'Digital Tech'],
    ];

    return view('marketplace.catalog', compact('featuredProducts'));
})->name('catalog.home');

// resources/views/components/product-card.blade.php (Blade Component System)
$bladeComponentSample = <<<'BLADE'
@props(['product'])

<div class="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white">
    <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
            {{ $product['vendor'] }}
        </span>
        <span class="font-bold text-slate-900 text-lg">
            Rp {{ number_format($product['price'], 0, ',', '.') }}
        </span>
    </div>
    <h3 class="font-bold text-slate-800 text-base mb-4">{{ $product['name'] }}</h3>
    <a href="/products/{{ $product['slug'] }}" 
       class="block text-center w-full py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800">
        Beli Sekarang
    </a>
</div>
BLADE;

echo "=== LARAVEL 11 STREAMLINED ROUTING & BLADE COMPONENTS INITIALIZED ===\\n";
''',
                'objectivesId': [
                    'Memahami struktur direktori ramping Laravel 11 (penghapusan `Kernel.php` dan migrasi middleware ke `bootstrap/app.php`).',
                    'Menguasai Artisan CLI untuk pembuatan controller, model, dan migration secara otomatis.',
                    'Membangun sistem UI modular menggunakan Blade Components (`<x-product-card />`) dan `@props()`.',
                    'Mengonfigurasi named routes dan URL generation yang fleksibel.',
                ],
                'objectivesEn': [
                    'Understand Laravel 11 streamlined directory layout (retirement of `Kernel.php` into `bootstrap/app.php`).',
                    'Master Artisan CLI automating scaffolding for controllers, models, and migrations.',
                    'Construct modular UI component architectures using Blade Components (`<x-product-card />`) and `@props()`.',
                    'Configure named routes and dynamic URL generator helpers.',
                ],
                'explanationId': '''Laravel adalah framework PHP paling populer di dunia, dicintai jutaan developer karena sintaksnya yang elegan, produktivitas tinggi, dan ekosistemnya yang sangat kaya.

### Evolusi Struktur Laravel 11
Laravel 11 merampingkan arsitektur secara radikal:
- Menghapus folder `app/Http/Middleware/` dan file `Kernel.php`.
- Seluruh konfigurasi middleware, routing, dan exception handling terpusat secara deklaratif di satu file bersih: `bootstrap/app.php`.
- Mengurangi file konfigurasi bawaan di `config/`, hanya memuat konfigurasi yang benar-benar Anda modifikasi.

### Blade Component System
Blade di Laravel modern bukan sekadar template engine jadul dengan `@include`. Dengan **Blade Components**, kita dapat membuat komponen seperti `<x-product-card :product="$item" />`. Parameter dilewatkan secara type-safe melalui direktif `@props(['product'])`, memungkinkan pembuatan design system antarmuka marketplace yang sangat rapi dan reusable.
''',
                'explanationEn': '''Laravel stands as the world\'s premier PHP framework, celebrated for developer ergonomics, rapid feature velocity, and unmatched ecosystem cohesion.

### Laravel 11 Architectural Streamlining
Laravel 11 radically declutters the root codebase:
- Retires legacy `app/Http/Middleware/` boilerplate and `Kernel.php`.
- Centralizes routing pipelines, global middleware, and exception handling declaratively inside `bootstrap/app.php`.
- Prunes root `config/` directories, lazy-loading framework defaults under the hood.

### The Blade Component Engine
Modern Blade transcends legacy `@include` snippets. Utilizing **Blade Components**, developers compose declarative tags: `<x-product-card :product="$item" />`. Attributes bind explicitly via `@props(['product'])`, facilitating component-driven design systems across marketplace storefronts.
''',
                'beginnerId': '''Bayangkan Anda membangun toko mainan. Laravel 11 seperti paket furnitur toko modern yang sudah terakit rapi di dinding tanpa kabel-kabel berserakan (struktur ramping). Dan Blade Component seperti balok etalase kaca portabel yang bisa Anda pasang di 10 sudut toko berbeda tanpa perlu membuat etalasenya dari kayu mentah berulang kali.''',
                'beginnerEn': '''Imagine opening a toy store. Laravel 11 represents a minimalist showroom layout with pre-assembled display units and concealed wiring (streamlined architecture). Blade Components act like modular glass display cases duplicated across ten showroom corners without carving raw timber each time.''',
                'experimentsId': [
                    'Jalankan perintah `php artisan make:component ProductCard` dan amati berkas view yang dihasilkan.',
                    'Daftarkan route baru di `routes/web.php` yang menerima parameter dinamis `{slug}`.',
                    'Gunakan helper `route("catalog.home")` di dalam template Blade untuk menghasilkan tautan absolut aman.',
                ],
                'experimentsEn': [
                    'Execute `php artisan make:component ProductCard` and inspect the generated component view.',
                    'Register a new route in `routes/web.php` binding dynamic `{slug}` route parameters.',
                    'Deploy `route("catalog.home")` within Blade views to synthesize secure absolute anchors.',
                ],
                'challengeId': 'Buat Blade Component layout induk `<x-layout.marketplace>` yang menyertakan navigasi keranjang belanja dinamis dan slot utama `{{ $slot }}`.',
                'challengeEn': 'Build a master `<x-layout.marketplace>` Blade Component encapsulating dynamic cart counters and main `{{ $slot }}` injections.',
                'summaryId': 'Kamu telah menguasai struktur baru Laravel 11, Artisan CLI, dan Blade Components. Minggu depan kita masuk ke Eloquent ORM dan relasi database antar-tabel.',
                'summaryEn': 'You have mastered Laravel 11 streamlined architecture, Artisan, and Blade Components. Next week we explore Eloquent ORM and multi-table relational persistence.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'eloquent-orm-migrations-relations',
                'titleId': 'Eloquent ORM: Migrasi Skema, Model Relationships & Database Factories',
                'titleEn': 'Eloquent ORM: Schema Migrations, Model Relationships & Database Factories',
                'programId': 'Relasi Toko Multi-Vendor, Produk & Kategori dengan Eloquent ORM',
                'programEn': 'Multi-Vendor Store, Product & Category Relationships with Eloquent ORM',
                'language': 'php',
                'code': '''<?php
// app/Models/Store.php & app/Models/Product.php (Eloquent ORM)
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Store extends Model {
    use HasFactory;

    protected $fillable = ['user_id', 'store_name', 'slug', 'is_verified'];

    // Relasi Satu Toko Memiliki Banyak Produk (One-to-Many)
    public function products(): HasMany {
        return $this->hasMany(Product::class);
    }
}

class Product extends Model {
    use HasFactory;

    protected $fillable = ['store_id', 'category_id', 'title', 'slug', 'price', 'stock'];

    // Casts atribut otomatis di Laravel 11 (method casts() menggantikan properti $casts)
    protected function casts(): array {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function store(): BelongsTo {
        return $this->belongsTo(Store::class);
    }
}

// Simulasi Kueri Eloquent Berperforma Tinggi
// $verifiedStoreProducts = Store::where('is_verified', true)
//     ->with(['products' => fn($q) => $q->where('stock', '>', 0)])
//     ->get();

echo "=== MODEL ELOQUENT LARAVEL 11 DENGAN METHOD CASTS() TERKONFIGURASI ===\\n";
''',
                'objectivesId': [
                    'Menguasai Eloquent ORM: Active Record pattern paling intuitif dan ekspresif di dunia web.',
                    'Mendefinisikan relasi database: `hasMany`, `belongsTo`, `belongsToMany`, dan `hasManyThrough`.',
                    'Menggunakan method baru `casts()` di Laravel 11 untuk casting atribut model secara type-safe.',
                    'Membuat Database Seeders dan Factories untuk menghasilkan ribuan data dummy pengujian realistis.',
                ],
                'objectivesEn': [
                    'Master Eloquent ORM: the web industry\'s most expressive Active Record persistence layer.',
                    'Declare relational graphs: `hasMany`, `belongsTo`, `belongsToMany`, and `hasManyThrough`.',
                    'Deploy Laravel 11\'s modern `casts()` method for type-safe attribute hydration.',
                    'Author Database Seeders and Factories populating thousands of realistic test records.',
                ],
                'explanationId': '''Eloquent ORM adalah jantung dari ekosistem Laravel. Berbeda dari Data Mapper (seperti Doctrine atau Hibernate) yang memisahkan entitas dari database, Eloquent menerapkan pola **Active Record**: setiap model mewakili satu baris data di tabel dan memiliki method bawaan untuk menyimpan, memperbarui, dan mencari relasi data.

### Method casts() Baru di Laravel 11
Sebelum Laravel 11, casting atribut dilakukan melalui properti array `$casts = [...]`. Di Laravel 11, casting dipindahkan ke method `protected function casts(): array`. Ini memungkinkan pemanggilan fungsi dinamis, validasi enum native PHP 8.1+, dan penulisan casting kustom yang jauh lebih fleksibel.

### Mengatasi N+1 Query dengan Eager Loading (with)
Jika Anda mengambil 50 toko dan memanggil `$store->products`, tanpa optimasi Laravel akan menjalankan 51 kueri database (Lazy Loading). Dengan menambahkan `Store::with('products')->get()`, Eloquent menjalankan **Eager Loading**: seluruh produk diambil hanya dalam **2 kueri SQL super cepat**, menghemat 95% beban memori database.
''',
                'explanationEn': '''Eloquent ORM represents the engine powering Laravel. Unlike Data Mappers (Doctrine/Hibernate) divorcing models from persistence mechanics, Eloquent embraces the **Active Record** paradigm: model instances directly embody table rows equipped with database persistence and relational accessors.

### The Modern casts() Method in Laravel 11
Prior to Laravel 11, attribute casting was designated via the `$casts = [...]` property. Laravel 11 migrates this to a dedicated `protected function casts(): array` method. This unlocks dynamic callable expressions, native PHP 8 backed enums, and clean static type assertions.

### Eradicating N+1 Bottlenecks with Eager Loading (with)
Iterating through 50 stores invoking `$store->products` incurs 51 database roundtrips under naive Lazy Loading. Prepending `Store::with('products')->get()` triggers **Eager Loading**: Eloquent resolves related products via two batched SQL queries, slashing database latency by 95%.
''',
                'beginnerId': '''Bayangkan buku katalog toko serba ada. Tanpa Eloquent (SQL mentah), Anda harus menulis tabel koordinat gudang rumit setiap kali ingin memeriksa stok barang. Dengan Eloquent, Anda cukup memanggil kalimat manusiawi: Toko ini -> ambil semua produknya ($store->products). Eloquent yang otomatis mencari dan mengambilkan barangnya dari gudang untuk Anda.''',
                'beginnerEn': '''Think of a department store merchandise catalog. Without Eloquent (raw SQL), you write manual warehouse grid coordinates for every stock check. With Eloquent, you invoke intuitive expressions: `$store->products`. Eloquent navigates the stockroom shelves and retrieves the items automatically.''',
                'experimentsId': [
                    'Jalankan perintah `php artisan make:model Category -mfs` untuk membuat Model, Migration, Factory, dan Seeder sekaligus.',
                    'Gunakan `Model::preventLazyLoading(!app()->isProduction())` di `AppServiceProvider` untuk mendeteksi bug N+1 saat development.',
                    'Tulis Factory untuk menghasilkan 50 produk dummy dengan harga acak menggunakan pustaka Faker bawaan.',
                ],
                'experimentsEn': [
                    'Run `php artisan make:model Category -mfs` to scaffold a Model, Migration, Factory, and Seeder simultaneously.',
                    'Enable `Model::preventLazyLoading(!app()->isProduction())` in `AppServiceProvider` auditing N+1 queries during local dev.',
                    'Author a Factory populating 50 randomized dummy products via integrated Faker libraries.',
                ],
                'challengeId': 'Buat relasi `hasManyThrough`: hubungkan model `Vendor` ke `Order` melalui model perantara `Product` sehingga vendor dapat melihat seluruh pesanan barang mereka secara langsung.',
                'challengeEn': 'Build a `hasManyThrough` relationship: bind `Vendor` to `Order` through intermediary `Product` entities allowing vendors direct order auditing.',
                'summaryId': 'Kamu telah menguasai Eloquent ORM, relasi database, casts() Laravel 11, dan eager loading. Minggu depan kita mempelajari Form Requests dan validasi input.',
                'summaryEn': 'You have mastered Eloquent ORM, relationships, Laravel 11 casts(), and eager loading. Next week we explore Form Requests and input validation.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'form-requests-validation-sessions',
                'titleId': 'Validasi Aman: Form Requests, Session State & Otentikasi Pengguna',
                'titleEn': 'Secure Validation: Form Requests, Session State & User Authentication',
                'programId': 'Form Request Pembuatan Produk Merchant dengan Validasi Gambar & Aturan Bisnis',
                'programEn': 'Merchant Product Creation Form Request with Image Validation & Rules',
                'language': 'php',
                'code': '''<?php
// app/Http/Requests/StoreProductRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest {
    // 1. Otorisasi Request (Hanya merchant terverifikasi yang boleh upload)
    public function authorize(): bool {
        return $this->user() !== null && $this->user()->is_merchant === true;
    }

    // 2. Aturan Validasi Deklaratif
    public function rules(): array {
        return [
            'title'       => ['required', 'string', 'min:5', 'max:150'],
            'sku'         => ['required', 'string', 'regex:/^[A-Z0-9-]+$/', 'unique:products,sku'],
            'price'       => ['required', 'numeric', 'min:1000', 'max:500000000'],
            'stock'       => ['required', 'integer', 'min:0', 'max:10000'],
            'image'       => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:2048'], // Maks 2MB
            'category_id' => ['required', 'integer', Rule::exists('categories', 'id')],
        ];
    }

    // Pesan Kesalahan Bahasa Indonesia Kustom
    public function messages(): array {
        return [
            'sku.unique' => 'SKU produk ini sudah terdaftar di toko lain!',
            'price.min'  => 'Harga produk minimal adalah Rp 1.000,00.',
            'image.max'  => 'Ukuran foto produk tidak boleh melebihi 2MB.',
        ];
    }
}

// Controller Handler Ramping (Otomatis Tervalidasi sebelum Method Dieksekusi)
class ProductManagementController {
    public function store(StoreProductRequest $request) {
        $validatedData = $request->validated();
        
        // Simpan produk ke database
        // $product = $request->user()->store->products()->create($validatedData);

        return redirect()->route('merchant.products.index')
            ->with('success', 'Produk berhasil dipublikasikan ke marketplace!');
    }
}

echo "=== FORM REQUEST TERISOLASI DENGAN VALIDASI ATRIBUT LENGKAP ===\\n";
''',
                'objectivesId': [
                    'Memisahkan logika validasi dari Controller menggunakan dedicated `FormRequest` classes.',
                    'Menerapkan aturan validasi canggih: `Rule::exists()`, validasi format berkas upload gambar, dan regex.',
                    'Mengamankan form submission melalui otorisasi request otomatis di method `authorize()`.',
                    'Menggunakan Session Flash Messages (`with("success", ...)`) untuk notifikasi toast pengguna.',
                ],
                'objectivesEn': [
                    'Decouple validation rules from Controller handlers into dedicated `FormRequest` classes.',
                    'Apply advanced validation constraints: `Rule::exists()`, uploaded image mime checks, and regex.',
                    'Govern submission security via request authorization logic in `authorize()`.',
                    'Deploy Session Flash Messages (`with("success", ...)`) for UI toast notifications.',
                ],
                'explanationId': '''Salah satu kesalahan paling sering dilakukan developer pemula adalah menumpuk aturan validasi 50 baris langsung di dalam method Controller. Pendekatan ini membuat controller menjadi "gemuk" (Fat Controllers) dan sulit dipelihara.

### Kekuatan Form Requests di Laravel
Kelas `FormRequest` bertindak sebagai penjaga gerbang sebelum request mencapai controller:
1. **Otorisasi Otomatis**: Method `authorize()` mengecek apakah pengguna yang sedang login memiliki hak istimewa (misal hanya user dengan `is_merchant = true`). Jika mengembalikan `false`, Laravel langsung menolak request dengan status HTTP 403 Forbidden.
2. **Validasi Otomatis**: Method `rules()` memvalidasi payload. Jika validasi gagal:
   - Pada request web HTML, Laravel otomatis mengarahkan kembali pengguna ke halaman formulir sebelumnya dengan pesan error dan data input lama (`old()`).
   - Pada request API JSON, Laravel otomatis mengembalikan respons `HTTP 422 Unprocessable Content` dengan struktur JSON error.
3. Method controller hanya menerima data yang sudah 100% bersih dan aman melalui `$request->validated()`.
''',
                'explanationEn': '''A pervasive flaw among junior developers is littering 50 lines of validation assertions directly inside controller actions, yielding bloated "Fat Controllers".

### The Architectural Role of Form Requests
`FormRequest` classes act as specialized gatekeepers executing before controller invocation:
1. **Automated Authorization**: The `authorize()` method evaluates caller privileges (e.g., verifying `is_merchant === true`). Yielding `false` immediately emits HTTP 403 Forbidden.
2. **Automated Validation & Redirection**: The `rules()` method inspects payloads. Upon failure:
   - For standard HTML requests, Laravel redirects back to the origin form, repopulating flashed input (`old()`) alongside error bags.
   - For JSON API requests, Laravel returns an HTTP 422 Unprocessable Content JSON response.
3. Controller actions interact strictly with sanitized, validated data via `$request->validated()`.
''',
                'beginnerId': '''Bayangkan loket pendaftaran pedagang di pasar resmi. Petugas loket depan (FormRequest) memeriksa KTP Anda dan kelengkapan berkas izin usaha Anda. Jika berkas Anda belum lengkap atau foto buram, petugas depan langsung menyuruh Anda melengkapi berkasnya. Anda tidak diizinkan masuk ke ruangan direktur pasar (Controller) sebelum berkas Anda 100% sempurna.''',
                'beginnerEn': '''Imagine registering as a licensed vendor at a municipal market hall. The reception intake officer (FormRequest) audits your business permits and tax documents. If forms are missing or images smudged, the intake clerk immediately turns you back to correct them. You never step into the managing director's private office (the Controller) until documents are flawless.''',
                'experimentsId': [
                    'Kirim form dengan harga Rp 500 dan perhatikan pesan error kustom "Harga produk minimal adalah Rp 1.000,00." muncul di Blade.',
                    'Uji coba upload file non-gambar (misal file .exe atau .pdf) dan amati penolakan oleh validator `image`.',
                    'Tampilkan flash message sukses di template Blade menggunakan direktif `@if (session("success"))`.',
                ],
                'experimentsEn': [
                    'Submit a form with price Rp 500 and verify the custom message "Harga produk minimal adalah Rp 1.000,00." renders.',
                    'Attempt uploading an executable (.exe) or PDF and observe rejection by the `image` validator.',
                    'Render flash messages within Blade templates utilizing `@if (session("success"))`.',
                ],
                'challengeId': 'Buat Custom Validation Rule `ValidIndonesianPhoneNumber` menggunakan perintah `php artisan make:rule` yang memverifikasi nomor telepon seluler berformat valid Indonesia (`+62` atau `08`).',
                'challengeEn': 'Build a `ValidIndonesianPhoneNumber` custom validation rule via `php artisan make:rule` validating cellular numbers conforming to Indonesian formats (`+62` or `08`).',
                'summaryId': 'Kamu telah menguasai Form Requests, validasi berkas upload, dan pesan flash session. Minggu depan kita mempelajari Middleware, Policies, dan Gates.',
                'summaryEn': 'You have mastered Form Requests, file validation, and session flash messages. Next week we cover Middleware, Policies, and Gates.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'middleware-policies-gates',
                'titleId': 'Otorisasi & Keamanan: Middleware Pipeline, Gates & Eloquent Policies',
                'titleEn': 'Authorization & Security: Middleware Pipeline, Gates & Eloquent Policies',
                'programId': 'Sistem Otorisasi Kepemilikan Toko dengan Eloquent Policies & Middleware',
                'programEn': 'Store Ownership Authorization System with Eloquent Policies & Middleware',
                'language': 'php',
                'code': '''<?php
// app/Policies/ProductPolicy.php
namespace App\Policies;

use App\\Models\\User;
use App\Models\Product;

class ProductPolicy {
    // Administrator sistem memiliki akses penuh tanpa batas (Super Admin Bypass)
    public function before(User $user, string $ability): ?bool {
        if ($user->is_super_admin) {
            return true;
        }
        return null; // Lanjutkan evaluasi method policy spesifik
    }

    // Hanya pemilik toko yang bersangkutan yang boleh mengedit produk miliknya
    public function update(User $user, Product $product): bool {
        return $user->id === $product->store->user_id;
    }

    // Hanya pemilik toko yang boleh menghapus produk
    public function delete(User $user, Product $product): bool {
        return $user->id === $product->store->user_id;
    }
}

// Controller yang Dilindungi oleh Policy
class ProductController {
    public function edit(Product $product) {
        // Otomatis memicu ProductPolicy::update, melempar 403 Forbidden jika bukan pemilik!
        // $this->authorize('update', $product);

        return view('merchant.products.edit', compact('product'));
    }
}

// Penggunaan Otorisasi di Template Blade:
$bladeAuthSnippet = <<<'BLADE'
@can('update', $product)
    <a href="/products/{{ $product->id }}/edit" class="btn btn-warning">Edit Produk</a>
@endcan

@can('delete', $product)
    <form action="/products/{{ $product->id }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit" class="btn btn-danger">Hapus</button>
    </form>
@endcan
BLADE;

echo "=== ELOQUENT POLICY & BLADE @CAN DIRECTIVE TERDEFINISI ===\\n";
''',
                'objectivesId': [
                    'Memahami perbedaan peran Autentikasi ("Siapa Anda?") vs Otorisasi ("Apa yang boleh Anda lakukan?").',
                    'Menggunakan Eloquent Policies untuk memusatkan aturan hak akses per model domain.',
                    'Menerapkan otorisasi deklaratif di Controller menggunakan `$this->authorize("update", $product)`.',
                    'Menyembunyikan tombol aksi sensitif di template Blade menggunakan direktif `@can` dan `@cannot`.',
                ],
                'objectivesEn': [
                    'Understand Authentication ("Who are you?") versus Authorization ("What permissions do you hold?").',
                    'Deploy Eloquent Policies centralizing domain model authorization invariants.',
                    'Enforce declarative controller authorization using `$this->authorize("update", $product)`.',
                    'Conditionally toggle UI controls within Blade templates utilizing `@can` and `@cannot`.',
                ],
                'explanationId': '''Salah satu celah peretasan paling umum di aplikasi e-commerce adalah **IDOR (Insecure Direct Object Reference)**: pengguna A mengubah parameter URL `/products/42/edit` menjadi `/products/43/edit` dan berhasil mengubah harga produk milik toko pengguna B karena backend lupa memeriksa kepemilikan data.

### Solusi Elegan: Eloquent Policies
Laravel memecahkan celah IDOR melalui **Eloquent Policies**. Policy adalah kelas khusus yang memetakan method ke model tertentu (misal `ProductPolicy`). Di dalam method `update()`, kita cukup menulis:
`return $user->id === $product->store->user_id;`

### Penegakan di Berbagai Lapisan
Aturan policy yang sama dapat digunakan di mana saja secara seragam:
1. Di Controller: `$this->authorize('update', $product);` (otomatis melempar HTTP 403 Forbidden).
2. Di Blade Template: `@can('update', $product)` (tombol edit hanya muncul untuk pemilik asli).
3. Di Route Middleware: `->can('update', 'product')`.
''',
                'explanationEn': '''A prevalent vulnerability in commercial web platforms is **IDOR (Insecure Direct Object Reference)**: Merchant A mutates `/products/42/edit` to `/products/43/edit`, unlawfully altering Merchant B\'s inventory pricing due to missing backend ownership audits.

### The Remedy: Eloquent Policies
Laravel eradicates IDOR vulnerabilities through **Eloquent Policies**. Policies isolate authorization logic within dedicated classes matching domain models (`ProductPolicy`). In `update()`, we declare:
`return $user->id === $product->store->user_id;`

### Multi-Tiered Authorization Enforcement
A unified policy seamlessly governs multiple application boundaries:
1. In Controllers: `$this->authorize('update', $product);` (throwing HTTP 403 upon breach).
2. In Blade Views: `@can('update', $product)` (hiding action buttons from non-owners).
3. In Route Pipelines: `->can('update', 'product')`.
''',
                'beginnerId': '''Bayangkan loker penyimpanan barang di stasiun kereta. Tiket Anda (Autentikasi) membuktikan Anda penumpang yang sah. Namun untuk membuka loker nomor 14 (Otorisasi Policy), kunci fisik di tangan Anda harus cocok dengan lubang kunci loker nomor 14. Anda tidak diizinkan membuka loker nomor 15 milik orang lain meskipun Anda sama-sama penumpang stasiun.''',
                'beginnerEn': '''Think of station luggage lockers. Your boarding pass (Authentication) verifies you are a legitimate traveler. However, accessing locker #14 (Authorization Policy) requires holding the exact brass key cut for cylinder #14. You are barred from opening locker #15 belonging to another passenger, despite both holding valid station tickets.''',
                'experimentsId': [
                    'Uji coba manipulasi ID produk via cURL menggunakan akun merchant lain dan amati respons penolakan HTTP 403 Forbidden.',
                    'Manfaatkan method `before()` di Policy untuk memberikan hak akses bypass otomatis kepada Super Admin.',
                    'Terapkan helper `@cannot("delete", $product)` untuk menampilkan badge status "Terkunci".',
                ],
                'experimentsEn': [
                    'Simulate tampering with product IDs via cURL using another merchant token and verify the HTTP 403 Forbidden response.',
                    'Utilize the `before()` policy hook to grant seamless administrative overrides to Super Admins.',
                    'Deploy the `@cannot("delete", $product)` Blade helper displaying a "Locked" badge.',
                ],
                'challengeId': 'Buat middleware kustom `EnsureStoreIsActive` yang memeriksa apakah toko merchant sedang dibekukan oleh admin karena pelanggaran, memblokir akses ke dashboard merchant jika toko nonaktif.',
                'challengeEn': 'Build an `EnsureStoreIsActive` custom middleware auditing whether merchant stores are suspended, blocking access to merchant panels when inactive.',
                'summaryId': 'Kamu telah menguasai Eloquent Policies, mitigasi IDOR, dan penegakan otorisasi di Blade. Level 1 selesai! Di Level 2 kita mempelajari API Resources, Sanctum, dan Background Queues.',
                'summaryEn': 'You have mastered Eloquent Policies, IDOR mitigation, and Blade authorization. Level 1 complete! Level 2 covers API Resources, Sanctum, and Background Queues.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'api-resources-sanctum-spa',
                'titleId': 'RESTful API Enterprise: Eloquent API Resources & Laravel Sanctum',
                'titleEn': 'Enterprise RESTful APIs: Eloquent API Resources & Laravel Sanctum',
                'programId': 'API Katalog Produk Marketplace Terotentikasi Sanctum Token dengan API Resources',
                'programEn': 'Sanctum-Authenticated Product Catalog API with Eloquent API Resources',
                'language': 'php',
                'code': '''<?php
// app/Http/Resources/ProductResource.php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource {
    // Transformasi Model Eloquent menjadi JSON Terstandarisasi
    public function toArray(Request $request): array {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'price_idr'    => (float) $this->price,
            'formatted'    => 'Rp ' . number_format((float) $this->price, 0, ',', '.'),
            'stock'        => (int) $this->stock,
            'is_in_stock'  => $this->stock > 0,
            
            // Relasi hanya dimuat jika sudah di-eager load (mencegah N+1 di API)
            'store'        => new StoreResource($this->whenLoaded('store')),
            
            'links'        => [
                'self' => url("/api/v1/products/{$this->slug}"),
            ]
        ];
    }
}

// routes/api.php dengan Proteksi Sanctum & Rate Limiting
use Illuminate\\Support\\Facades\\Route;

Route::middleware(['auth:sanctum', 'throttle:api'])->prefix('v1')->group(function () {
    Route::get('/user/profile', function (Request $request) {
        return response()->json($request->user());
    });

    // Endpoint Katalog Produk Publik (Cached & Throttled)
    Route::get('/products', function () {
        // $products = Product::with('store')->where('stock', '>', 0)->paginate(15);
        // return ProductResource::collection($products);
        return response()->json(['status' => 'OK', 'message' => 'API Resources Active']);
    });
});

echo "=== ELOQUENT API RESOURCES & SANCTUM MIDDLEWARE TERKONFIGURASI ===\\n";
''',
                'objectivesId': [
                    'Memahami peran Eloquent API Resources sebagai layer transformasi pemisah antara database dan JSON.',
                    'Mencegah kebocoran data sensitif (password hash, secret keys) dengan kontrol atribut eksplisit.',
                    'Menggunakan metode `$this->whenLoaded("relation")` untuk mencegah query N+1 di API response.',
                    'Mengamankan endpoint mobile dan SPA menggunakan token autentikasi ringan Laravel Sanctum.',
                ],
                'objectivesEn': [
                    'Understand Eloquent API Resources as transformation layers separating database models from JSON contracts.',
                    'Prevent sensitive data leaks (password hashes, secret keys) through explicit attribute projection.',
                    'Deploy `$this->whenLoaded("relation")` avoiding N+1 regressions in API responses.',
                    'Secure mobile and SPA endpoints using lightweight Laravel Sanctum bearer tokens.',
                ],
                'explanationId': '''Mengembalikan model Eloquent langsung dari controller (`return Product::all();`) adalah kebiasaan buruk yang berbahaya. Jika ada penambahan kolom sensitif di tabel database, kolom tersebut bisa tidak sengaja bocor ke publik dalam respons JSON.

### Keunggulan Eloquent API Resources
**API Resources** bertindak sebagai filter dan transformator data resmi:
- Memformat angka harga menjadi format mata uang yang ramah pengguna.
- Membuka kontrol penuh atas nama field JSON tanpa harus mengubah nama kolom di database.
- Menyediakan method kondisional sakti `$this->whenLoaded('store')`: relasi toko hanya akan dimasukkan ke JSON jika query controller secara eksplisit melakukan eager loading (`Product::with('store')`), melindungi API dari kueri tersembunyi yang lambat.

### Autentikasi Modern dengan Laravel Sanctum
**Laravel Sanctum** menyediakan sistem otentikasi token yang sangat ringan untuk Single Page Applications (React, Vue) dan aplikasi mobile (Flutter, iOS, Android). Sanctum memungkinkan pengguna menghasilkan token API (Personal Access Tokens) dengan batasan izin (token abilities) tanpa kerumitan server OAuth2 yang berat.
''',
                'explanationEn': '''Returning raw Eloquent models directly from controllers (`return Product::all();`) exposes severe security risks: adding sensitive columns to tables inadvertently leaks internal attributes into public JSON responses.

### The Role of Eloquent API Resources
**API Resources** serve as the definitive contract transformation barrier:
- Formats financial values into localized currency presentations.
- Decouples client-facing JSON keys from internal database schema names.
- Leverages conditional relation inclusion: `$this->whenLoaded('store')` embeds related entities only if the controller eager-loaded them (`with('store')`), shielding APIs from hidden N+1 regressions.

### Lightweight Security with Laravel Sanctum
**Laravel Sanctum** provides featherweight token authentication tailored for Single Page Applications (Next.js/Vue) and mobile clients. Sanctum provisions cryptographically signed Personal Access Tokens with granular abilities, avoiding the heavy overhead of full OAuth2 servers.
''',
                'beginnerId': '''Bayangkan toko perhiasan mewah. Di gudang brankas belakang (Database), ada dokumen rahasia harga beli pabrik dan nomor sertifikat distributor. Resepsionis etalase depan (API Resource) hanya menunjukkan kalung emas, kartu nama toko, dan harga jual resmi ke calon pembeli, tanpa pernah memperlihatkan dokumen rahasia gudang kepada orang luar.''',
                'beginnerEn': '''Think of a luxury jewelry boutique. In the private vault (the Database), records track wholesale acquisition invoices and distributor contracts. The front showroom display (API Resource) presents only the polished gold necklace and the retail price tag to visitors, guarding internal wholesale ledger sheets.''',
                'experimentsId': [
                    'Buat token Sanctum menggunakan `$user->createToken("mobile-app", ["products:read"])->plainTextToken`.',
                    'Kirim request dengan header `Authorization: Bearer <token>` menggunakan cURL dan amati verifikasi Sanctum.',
                    'Gunakan `ProductResource::collection($products)` untuk memformat koleksi data terpaginasi otomatis.',
                ],
                'experimentsEn': [
                    'Synthesize a Sanctum token via `$user->createToken("mobile-app", ["products:read"])->plainTextToken`.',
                    'Submit requests with `Authorization: Bearer <token>` via cURL observing seamless token authorization.',
                    'Deploy `ProductResource::collection($products)` to serialize paginated collections automatically.',
                ],
                'challengeId': 'Konfigurasikan pembatasan kemampuan token Sanctum (Token Abilities): buat token khusus kurir yang hanya memiliki izin `orders:update-status` dan tolak akses jika mencoba membuat produk baru.',
                'challengeEn': 'Configure Sanctum Token Abilities: issue a courier token restricted to `orders:update-status`, rejecting unauthorized catalog mutations.',
                'summaryId': 'Kamu telah menguasai Eloquent API Resources dan autentikasi token Laravel Sanctum. Minggu depan kita mempelajari Events, Listeners, dan Background Queues.',
                'summaryEn': 'You have mastered Eloquent API Resources and Laravel Sanctum token authentication. Next week we explore Events, Listeners, and Background Queues.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'events-listeners-queues',
                'titleId': 'Arsitektur Event-Driven: Events, Listeners & Background Queues dengan Redis',
                'titleEn': 'Event-Driven Architecture: Events, Listeners & Background Queues with Redis',
                'programId': 'Pipeline Pemrosesan Pesanan Asinkron dengan Event & Antrean Redis',
                'programEn': 'Asynchronous Order Processing Pipeline with Events & Redis Queues',
                'language': 'php',
                'code': '''<?php
// app/Events/OrderPlaced.php
namespace App\Events;

use App\Models\Order;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderPlaced {
    use Dispatchable, SerializesModels;

    public function __construct(public Order $order) {}
}

// app/Listeners/SendOrderInvoiceNotification.php
namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

// Interface ShouldQueue memberitahu Laravel untuk menjalankan listener ini di Background Worker!
class SendOrderInvoiceNotification implements ShouldQueue {
    use InteractsWithQueue;

    public int $tries = 3;             // Coba ulang maksimal 3 kali jika gagal
    public int $timeout = 60;          // Batas waktu eksekusi 60 detik
    public int $backoff = 15;          // Jeda waktu 15 detik sebelum mencoba ulang

    public function handle(OrderPlaced $event): void {
        $order = $event->order;
        echo "[BACKGROUND QUEUE WORKER] Memproses pengiriman kwitansi PDF untuk Pesanan #{$order->id}...\\n";
        
        // Simulasi pengiriman email asinkron tanpa memblokir koneksi browser pembeli
        // Mail::to($order->buyer_email)->send(new OrderInvoiceMail($order));
        
        echo "[QUEUE WORKER SUCCESS] Email kwitansi berhasil dikirim ke {$order->buyer_email}!\\n";
    }

    public function failed(OrderPlaced $event, \\Throwable $exception): void {
        echo "[QUEUE JOB FAILED] Seluruh percobaan habis. Catat ke tabel failed_jobs: " . $exception->getMessage() . "\\n";
    }
}

// Memicu Event di Controller (Hanya memakan waktu 3ms):
// OrderPlaced::dispatch($newOrder);

echo "=== LARAVEL QUEUED EVENT-DRIVEN ARCHITECTURE TERKONFIGURASI ===\\n";
''',
                'objectivesId': [
                    'Memahami pola Event-Driven Architecture (pemisahan logika bisnis dari efek samping sekunder).',
                    'Menggunakan interface `ShouldQueue` untuk mengubah Listener sinkron menjadi tugas background otomatis.',
                    'Mengonfigurasi driver antrean Redis berkinerja tinggi di `config/queue.php`.',
                    'Menangani toleransi kegagalan: konfigurasi `$tries`, `$backoff`, dan pengelolaan tabel `failed_jobs`.',
                ],
                'objectivesEn': [
                    'Understand Event-Driven Architecture (decoupling domain operations from secondary side-effects).',
                    'Implement the `ShouldQueue` interface converting synchronous listeners into background jobs.',
                    'Configure high-throughput Redis queue drivers within `config/queue.php`.',
                    'Govern fault tolerance: configuring `$tries`, `$backoff`, and managing `failed_jobs` tables.',
                ],
                'explanationId': '''Ketika pembeli menekan tombol "Bayar Sekarang" di marketplace, ada banyak hal yang harus terjadi: mengurangi stok, mengirim email invoice PDF, mengirim notifikasi push ke aplikasi kurir, dan mengirim WhatsApp ke merchant. Jika seluruh proses ini dijalankan secara sinkron, browser pembeli akan berputar (loading) selama 10 detik.

### Pola Event-Driven di Laravel
1. Controller hanya fokus pada tugas utamanya: menyimpan pesanan ke database, lalu memancarkan event:
   `OrderPlaced::dispatch($order);`
   Controller langsung mengembalikan respons sukses ke pembeli dalam 5 milidetik.
2. Setiap listener yang mengimplementasikan **`ShouldQueue`** otomatis diubah oleh Laravel menjadi job serialized dan didorong ke antrean memori **Redis**.
3. **Queue Worker Process** (`php artisan queue:work redis`) yang berjalan terpisah di background mengambil job tersebut dan mengeksekusi pengiriman email satu per satu tanpa membebani server web utama.
''',
                'explanationEn': '''When shoppers click "Place Order" on a marketplace checkout, numerous downstream actions trigger: inventory reservation, invoice PDF generation, push alerts to dispatch couriers, and SMS pings to merchants. Executing these synchronously forces browsers to hang for ten seconds.

### Event-Driven Dynamics in Laravel
1. The Controller focuses strictly on primary transactional boundaries: committing the order and dispatching the domain event:
   `OrderPlaced::dispatch($order);`
   The HTTP action returns an order confirmation receipt within 5 milliseconds.
2. Any event listener implementing **`ShouldQueue`** serializes into an asynchronous job pushed to **Redis**.
3. Dedicated **Queue Worker Processes** (`php artisan queue:work redis`) consuming queues concurrently execute emails and downstream integrations without starving web threads.
''',
                'beginnerId': '''Bayangkan memesan makanan di kafe. Kasir memberikan nomor struk dalam 10 detik (Controller selesai). Kasir tidak menyuruh Anda berdiri di depan meja kasir selama 20 menit menunggu koki menggoreng kentang dan membuat kopi. Pesanan Anda dicatat di papan antrean dapur (Redis Queue), dan pelayan mengantarkannya ke meja Anda saat kopi siap (Queue Worker).''',
                'beginnerEn': '''Imagine ordering at a coffee house. The cashier hands you a receipt buzzer in ten seconds (Controller completed). They do not force you to stand blocking the cash register for 20 minutes while baristas roast beans and steam milk. The ticket queues on the kitchen order board (Redis Queue), and servers deliver it when prepared (Queue Worker).''',
                'experimentsId': [
                    'Jalankan worker di terminal menggunakan `php artisan queue:work redis --queue=default`.',
                    'Kirim event dan amati bagaimana log antrean muncul di terminal worker secara asinkron.',
                    'Lemparkan exception di dalam listener dan buktikan job dicoba ulang sebanyak 3 kali sesuai nilai `$tries`.',
                ],
                'experimentsEn': [
                    'Launch an active worker in your terminal via `php artisan queue:work redis --queue=default`.',
                    'Dispatch an event and observe job execution logs appearing asynchronously in the worker terminal.',
                    'Raise an exception inside the listener and observe the worker retrying three times as configured by `$tries`.',
                ],
                'challengeId': 'Gunakan fitur Job Chaining (`Bus::chain([...])`) untuk memastikan bahwa pembuatan invoice PDF harus sukses terlebih dahulu sebelum pekerjaan pengiriman email diizinkan berjalan.',
                'challengeEn': 'Deploy Job Chaining (`Bus::chain([...])`) guaranteeing PDF invoice rendering finishes successfully prior to dispatching the delivery email job.',
                'summaryId': 'Kamu telah menguasai Event-Driven Architecture, ShouldQueue, dan antrean Redis di Laravel. Minggu depan kita mempelajari integrasi pembayaran Stripe dan Laravel Cashier.',
                'summaryEn': 'You have mastered Event-Driven Architecture, ShouldQueue, and Redis queues in Laravel. Next week we explore Stripe payment processing and Laravel Cashier.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'stripe-cashier-subscriptions',
                'titleId': 'Monetisasi & Pembayaran: Integrasi Stripe, Webhooks & Laravel Cashier',
                'titleEn': 'Monetization & Billing: Stripe Integration, Webhooks & Laravel Cashier',
                'programId': 'Checkout Langganan Toko Merchant & Penanganan Webhook Stripe Otomatis',
                'programEn': 'Merchant Store Subscription Checkout & Automated Stripe Webhook Handler',
                'language': 'php',
                'code': '''<?php
// app/Http/Controllers/SubscriptionCheckoutController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubscriptionCheckoutController {
    // 1. Mengarahkan Merchant ke Stripe Hosted Checkout Session
    public function checkout(Request $request) {
        $user = $request->user();
        $planPriceId = 'price_tier_merchant_pro_monthly';

        // Menggunakan Laravel Cashier (Stripe SDK Wrapper)
        // return $user->newSubscription('default', $planPriceId)
        //     ->checkout([
        //         'success_url' => route('merchant.billing.success'),
        //         'cancel_url'  => route('merchant.billing.cancel'),
        //     ]);

        return response()->json([
            'checkout_url' => 'https://checkout.stripe.com/c/pay/cs_test_simulated_token',
            'plan' => 'Merchant Pro Tier',
            'amount_monthly' => 299000
        ]);
    }

    // 2. Penanganan Webhook Stripe Asinkron & Idempotent
    public function handleStripeWebhook(Request $request) {
        $payload = $request->all();
        $eventType = $payload['type'] ?? 'unknown';

        Log::info("[STRIPE WEBHOOK RECEIVED] Event: {$eventType}");

        // Verifikasi Event Pembayaran Langganan Sukses
        if ($eventType === 'customer.subscription.created' || $eventType === 'invoice.payment_succeeded') {
            $customerStripeId = $payload['data']['object']['customer'] ?? null;
            
            // Temukan merchant berdasarkan Stripe ID dan aktifkan badge "Verified Merchant"
            Log::info("[BILLING ACTIVE] Langganan aktif untuk Stripe Customer: {$customerStripeId}");
            
            return response()->json(['status' => 'handled', 'event' => $eventType]);
        }

        return response()->json(['status' => 'ignored']);
    }
}

echo "=== SISTEM BILLING STRIPE & PENANGANAN WEBHOOK SIAP DIGUNAKAN ===\\n";
''',
                'objectivesId': [
                    'Menguasai integrasi gateway pembayaran internasional menggunakan Stripe API & Laravel Cashier.',
                    'Membangun alur Hosted Checkout Sessions yang aman tanpa menyentuh data kartu kredit di server lokal (PCI-DSS Compliant).',
                    'Mengonfigurasi penanganan Webhook Stripe dengan verifikasi cryptographic signature.',
                    'Mengelola siklus hidup langganan berulang (Recurring Subscriptions, Upgrades, Cancellations, dan Grace Periods).',
                ],
                'objectivesEn': [
                    'Master international payment gateway integration leveraging Stripe API and Laravel Cashier.',
                    'Build secure Hosted Checkout Sessions bypassing local credit card data handling (PCI-DSS Compliant).',
                    'Configure Stripe Webhook pipelines verifying cryptographic signatures.',
                    'Govern recurring subscription lifecycles (renewals, tier upgrades, cancellations, and grace periods).',
                ],
                'explanationId': '''Menerima pembayaran kartu kredit secara langsung di server sendiri mewajibkan sertifikasi keamanan perbankan yang sangat mahal (PCI-DSS). Cara standar industri terbaik adalah menggunakan **Stripe Hosted Checkout** dan paket resmi **Laravel Cashier**.

### Mengapa Laravel Cashier?
Laravel Cashier membungkus seluruh kerumitan integrasi Stripe menjadi method Eloquent yang sangat ekspresif:
`$user->newSubscription('default', 'price_tier_pro')->checkout();`
Cashier otomatis mengelola tabel langganan, pelacakan masa percobaan gratis (Trial Periods), penanganan gagal bayar (Incomplete Payments), dan pembuatan invoice PDF otomatis.

### Kunci Sukses: Penanganan Webhook Idempotent
Pembayaran tidak dikonfirmasi di halaman redirect browser pengguna (karena koneksi pengguna bisa putus tepat setelah membayar). Konfirmasi resmi selalu datang dari server Stripe melalui **Webhook**. Endpoint webhook harus bersifat **Idempotent**: jika Stripe mengirimkan event sukses yang sama 3 kali karena jeda jaringan, sistem kita hanya mengaktifkan langganan sekali tanpa menduplikasi data.
''',
                'explanationEn': '''Handling raw credit card numbers on local web servers mandates grueling financial security compliance (PCI-DSS). Industry leaders bypass this liability utilizing **Stripe Hosted Checkout** powered by the official **Laravel Cashier** suite.

### Why Deploy Laravel Cashier?
Laravel Cashier abstracts Stripe\'s recurring billing engine into expressive Eloquent primitives:
`$user->newSubscription('default', 'price_tier_pro')->checkout();`
Cashier governs subscription persistence, trial period tracking, incomplete payment challenge handling, and automated PDF invoice generation.

### Idempotent Webhook Resilience
Transactions must never finalize based on client-side browser redirects (shoppers frequently close mobile browsers prematurely). Authoritative confirmation dispatches asynchronously via **Stripe Webhooks**. Webhook handlers must enforce **Idempotency**: if Stripe re-transmits an event three times due to network timeouts, the system applies the subscription state transition exactly once.
''',
                'beginnerId': '''Bayangkan Anda membeli tiket bioskop online. Daripada memasukkan nomor kartu kredit di formulir toko yang meragukan, Anda dialihkan ke loket resmi bank dengan pengawalan satpam (Stripe Checkout). Setelah pembayaran selesai di loket bank, bank mengirimkan telegram rahasia berstempel resmi ke bioskop (Webhook) untuk mencetak tiket Anda.''',
                'beginnerEn': '''Imagine purchasing theater tickets. Rather than scribbling card numbers on unverified merchant forms, you step into a fortified bank teller kiosk (Stripe Checkout). Once your payment clears, the bank transmits a verified encrypted wire to the cinema box office (Webhook) authorizing ticket release.''',
                'experimentsId': [
                    'Gunakan Stripe CLI (`stripe listen --forward-to localhost:8000/stripe/webhook`) untuk meneruskan webhook lokal.',
                    'Uji coba simulasi kartu kredit gagal bayar (`4002 ...`) dan amati penanganan status incomplete di Laravel.',
                    'Bebaskan route webhook dari proteksi CSRF di `bootstrap/app.php` menggunakan `validateCsrfTokens(except: ["stripe/*"])`.',
                ],
                'experimentsEn': [
                    'Deploy the Stripe CLI (`stripe listen --forward-to localhost:8000/stripe/webhook`) forwarding live test hooks locally.',
                    'Simulate a declining payment card (`4002 ...`) and observe Cashier\'s incomplete state handling.',
                    'Exempt webhook routes from CSRF verification in `bootstrap/app.php` via `validateCsrfTokens(except: ["stripe/*"])`.',
                ],
                'challengeId': 'Tambahkan penanganan event `customer.subscription.deleted` untuk secara otomatis mencabut status toko terverifikasi dan mengirimkan email perpisahan ke merchant.',
                'challengeEn': 'Add a `customer.subscription.deleted` handler automatically revoking merchant tier privileges and dispatching cancellation surveys.',
                'summaryId': 'Kamu telah menguasai Stripe Checkout, Laravel Cashier, dan penanganan Webhook. Level 2 selesai! Di Level 3 kita mempelajari Reverb WebSockets, Scout Search, dan Marketplace Capstone.',
                'summaryEn': 'You have mastered Stripe Checkout, Laravel Cashier, and Webhooks. Level 2 complete! Level 3 covers Reverb WebSockets, Scout Search, and our Marketplace Capstone.',
            },

            # Week 8
            {
                'week': 8,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'reverb-websockets-broadcasting',
                'titleId': 'Komunikasi Real-Time: Laravel Reverb WebSockets & Event Broadcasting',
                'titleEn': 'Real-Time Communication: Laravel Reverb WebSockets & Event Broadcasting',
                'programId': 'Ticker Flash Sale Stok Real-Time dengan Laravel Reverb & Laravel Echo',
                'programEn': 'Real-Time Flash Sale Stock Ticker with Laravel Reverb & Laravel Echo',
                'language': 'php',
                'code': '''<?php
// app/Events/StockUpdatedEvent.php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

// ShouldBroadcastNow: Langsung siarkan ke WebSocket detik ini juga tanpa antrean queue
class StockUpdatedEvent implements ShouldBroadcastNow {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public int $productId,
        public string $sku,
        public int $remainingStock
    ) {}

    // Channel Publik yang didengarkan oleh ribuan pembeli di browser
    public function broadcastOn(): array {
        return [
            new Channel('marketplace.flash-sale'),
        ];
    }

    public function broadcastAs(): string {
        return 'stock.ticker.updated';
    }
}

// Client-Side Frontend (JavaScript dengan Laravel Echo):
$frontendEchoSnippet = <<<'JS'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

// Dengarkan pembaruan stok real-time tanpa reload halaman!
window.Echo.channel('marketplace.flash-sale')
    .listen('.stock.ticker.updated', (event) => {
        console.log(`[LIVE UPDATE] Stok SKU ${event.sku} berkurang menjadi: ${event.remainingStock} unit!`);
        document.getElementById(`stock-${event.productId}`).textContent = event.remainingStock;
    });
JS;

echo "=== LARAVEL REVERB REAL-TIME EVENT BROADCASTING TERKONFIGURASI ===\\n";
''',
                'objectivesId': [
                    'Memahami arsitektur server WebSocket resmi Laravel: Laravel Reverb (berkinerja sangat tinggi, ribuan koneksi per detik).',
                    'Menggunakan interface `ShouldBroadcast` dan `ShouldBroadcastNow` pada Event kelas Laravel.',
                    'Membedakan jenis Channel Broadcasting: Public Channel, Private Channel, dan Presence Channel.',
                    'Menghubungkan frontend browser secara real-time menggunakan pustaka client `laravel-echo`.',
                ],
                'objectivesEn': [
                    'Understand Laravel\'s first-party WebSocket server: Laravel Reverb (high-throughput, thousands of concurrent sockets).',
                    'Implement `ShouldBroadcast` and `ShouldBroadcastNow` on native Laravel Event classes.',
                    'Differentiate Broadcasting Channel types: Public, Private, and Presence Channels.',
                    'Wire frontend browser interfaces reactively utilizing client-side `laravel-echo`.',
                ],
                'explanationId': '''Di masa lalu, developer Laravel terpaksa membayar layanan pihak ketiga yang mahal (seperti Pusher) atau memasang server socket Node.js terpisah untuk menambahkan fitur real-time. Mulai Laravel 11, Laravel merilis **Laravel Reverb**: server WebSocket resmi first-party yang ditulis khusus untuk ekosistem Laravel.

### Mengapa Laravel Reverb Mengubah Segalanya?
Reverb berjalan langsung di infrastruktur server Anda, mampu menangani puluhan ribu koneksi WebSocket konkuren dengan latensi rendah dan konsumsi memori minimal.

### Mekanisme Event Broadcasting
1. Ketika transaksi penjualan flash-sale terjadi, controller memanggil `StockUpdatedEvent::dispatch($productId, $sku, $stock)`.
2. Laravel memeriksa method `broadcastOn()` yang mengembalikan `new Channel('marketplace.flash-sale')`.
3. Event langsung diteruskan ke Reverb WebSocket Server.
4. Reverb menyiarkan frame JSON ke seluruh browser pembeli yang sedang membuka halaman produk via **Laravel Echo**, memperbarui angka sisa stok di layar dalam milidetik tanpa perlu me-refresh halaman web!
''',
                'explanationEn': '''Historically, Laravel developers relied on expensive third-party hosted providers (Pusher) or spun up standalone Node.js socket microservices to achieve real-time reactivity. Laravel 11 transforms this landscape via **Laravel Reverb**: an ultra-fast, first-party native WebSocket server tailored for Laravel.

### The Power of Laravel Reverb
Reverb executes directly within your hosting cluster, sustaining tens of thousands of concurrent WebSocket connections with minimal resource utilization and sub-millisecond dispatch times.

### Event Broadcasting Pipeline
1. When flash-sale checkout transactions commit, controllers trigger `StockUpdatedEvent::dispatch()`.
2. Laravel inspects the event\'s `broadcastOn()` payload targeting `new Channel('marketplace.flash-sale')`.
3. Events dispatch into the Reverb WebSocket daemon.
4. Reverb broadcasts JSON frames to all connected browser clients via **Laravel Echo**, decrementing stock indicators on customer viewports without browser reloads.
''',
                'beginnerId': '''Bayangkan ruang lelang barang antik. Ketika juru lelang mengetuk palu (Event), juru lelang tidak menelpon satu per satu 500 tamu lelang lewat telepon. Juru lelang berbicara lewat mikrofon ruang lelang (Laravel Reverb) dan seluruh tamu yang memegang alat penerima nirkabel (Laravel Echo) mendengar angka tawaran terbaru pada detik yang sama persis.''',
                'beginnerEn': '''Imagine a high-stakes auction room. When the auctioneer raises the bidding hammer (the Event), they do not place 500 individual phone calls. They speak into the hall loudspeaker (Laravel Reverb), and every bidder holding wireless earpieces (Laravel Echo) hears the new bid instantaneously.''',
                'experimentsId': [
                    'Jalankan server WebSocket Reverb di terminal menggunakan perintah `php artisan reverb:start`.',
                    'Buka dua tab browser berbeda dan amati bagaimana perubahan stok di tab 1 langsung ter-update di tab 2.',
                    'Gunakan `PrivateChannel` dan konfigurasikan otorisasi channel di `routes/channels.php`.',
                ],
                'experimentsEn': [
                    'Start the Reverb WebSocket daemon in your terminal via `php artisan reverb:start`.',
                    'Open two browser windows side-by-side observing mutations in window A reflecting instantaneously in window B.',
                    'Deploy `PrivateChannel` configurations auditing authorization rules inside `routes/channels.php`.',
                ],
                'challengeId': 'Gunakan Presence Channel (`new PresenceChannel("store.live-shoppers." . $storeId)`) untuk menghitung dan menampilkan jumlah pembeli yang sedang aktif melihat etalase toko secara live.',
                'challengeEn': 'Deploy a Presence Channel (`new PresenceChannel("store.live-shoppers." . $storeId)`) rendering live counts of active concurrent shoppers on store pages.',
                'summaryId': 'Kamu telah menguasai Laravel Reverb WebSockets dan Event Broadcasting real-time. Minggu depan kita mempelajari Full-Text Search dengan Laravel Scout dan optimasi Horizon.',
                'summaryEn': 'You have mastered Laravel Reverb WebSockets and real-time Event Broadcasting. Next week we cover Full-Text Search with Laravel Scout and Horizon optimization.',
            },

            # Week 9
            {
                'week': 9,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'scout-fulltext-search-redis',
                'titleId': 'Pencarian Cepat: Laravel Scout, Meilisearch & Queue Monitoring Horizon',
                'titleEn': 'High-Speed Search: Laravel Scout, Meilisearch & Horizon Queue Monitoring',
                'programId': 'Mesin Pencari Produk Marketplace Toleran Typo dengan Laravel Scout',
                'programEn': 'Typo-Tolerant Marketplace Product Search Engine with Laravel Scout',
                'language': 'php',
                'code': '''<?php
// app/Models/Product.php (Menggunakan Laravel Scout)
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Product extends Model {
    use Searchable; // Mengaktifkan sinkronisasi otomatis ke search engine

    // Menentukan array atribut yang diindeks untuk pencarian teks penuh
    public function toSearchableArray(): array {
        return [
            'id'          => (int) $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'price'       => (float) $this->price,
            'vendor_name' => $this->store?->store_name,
            'in_stock'    => $this->stock > 0,
        ];
    }
}

// Controller Handler Pencarian Instan
class ProductSearchController {
    public function search(string $keyword) {
        // Melakukan pencarian full-text dengan toleransi salah ketik (typo-tolerance)
        // melalui Meilisearch / Algolia engine
        $results = Product::search($keyword)
            ->where('in_stock', true)
            ->paginate(20);

        return response()->json([
            'query' => $keyword,
            'total_hits' => $results->total(),
            'hits' => $results->items()
        ]);
    }
}

// Konfigurasi Laravel Horizon (Dashboard Pemantau Antrean Redis Real-Time)
// config/horizon.php:
// 'environments' => [
//     'production' => [
//         'supervisor-1' => [
//             'connection' => 'redis',
//             'queue' => ['high', 'default', 'low'],
//             'balance' => 'auto',
//             'maxProcesses' => 16,
//             'tries' => 3,
//         ],
//     ],
// ]

echo "=== LARAVEL SCOUT FULL-TEXT SEARCH & HORIZON MONITOR TERKONFIGURASI ===\\n";
''',
                'objectivesId': [
                    'Mengintegrasikan Laravel Scout untuk pencarian full-text berkecepatan tinggi dengan Meilisearch / Algolia.',
                    'Mengonfigurasi trait `Searchable` dan kustomisasi payload `toSearchableArray()`.',
                    'Menerapkan fitur pencarian toleran saltik (Typo-Tolerance) dan faceted filtering.',
                    'Mengonfigurasi Laravel Horizon untuk memantau performa antrean Redis dan job metrics secara grafis.',
                ],
                'objectivesEn': [
                    'Integrate Laravel Scout for high-throughput full-text search backed by Meilisearch or Algolia.',
                    'Configure the `Searchable` trait and customize index projections via `toSearchableArray()`.',
                    'Implement typo-tolerant fuzzy search queries and faceted attribute filters.',
                    'Deploy Laravel Horizon monitoring Redis queue throughput, job latencies, and worker health visually.',
                ],
                'explanationId': '''Ketika sebuah marketplace menampung 500.000 produk dari ribuan vendor, menggunakan kueri SQL `WHERE title LIKE '%keyword%'` adalah resep bencana: kueri tersebut memicu Full Table Scan yang membuat database PostgreSQL/MySQL macet seketika dan tidak mendukung toleransi salah ketik (typo tolerance).

### Laravel Scout & Meilisearch
**Laravel Scout** menyediakan abstraksi pencarian deklaratif untuk Eloquent. Dengan menambahkan trait `Searchable`, setiap kali produk dibuat, diperbarui, atau dihapus, Scout secara otomatis menyinkronkan data ke search engine khusus seperti **Meilisearch** di background via queues. Meilisearch memberikan hasil pencarian dalam waktu di bawah 10 milidetik dan tetap menemukan produk meskipun pengguna salah mengetik huruf.

### Monitoring Produksi dengan Laravel Horizon
Pada sistem skala enterprise dengan jutaan job antrean per hari, Anda butuh visibilitas penuh. **Laravel Horizon** menyediakan dashboard grafis real-time yang memantau throughput job per menit, metrik kegagalan antrean, dan secara otomatis melakukan auto-scaling jumlah proses worker saat terjadi lonjakan pesanan.
''',
                'explanationEn': '''When a multi-vendor catalog scales past 500,000 SKUs, issuing database `WHERE title LIKE '%keyword%'` queries causes catastrophic full table scans, locking database pools and failing on typographical errors.

### Laravel Scout & The Meilisearch Engine
**Laravel Scout** injects declarative full-text indexing directly into Eloquent. Decorating models with the `Searchable` trait automatically queues synchronization pipelines to search engines like **Meilisearch** upon entity mutations. Meilisearch delivers sub-10ms search responses equipped with native typo-tolerance.

### Enterprise Observability via Laravel Horizon
When servicing millions of queued jobs daily, visibility is paramount. **Laravel Horizon** delivers a real-time web console monitoring throughput rates, job latencies, and failure logs, while automatically scaling worker processes during flash-sale traffic surges.
''',
                'beginnerId': '''Bayangkan mencari nama teman di buku telepon tebal 1.000 halaman. Kueri SQL LIKE seperti membaca baris per baris dari halaman 1 sampai halaman 1.000 (sangat lambat dan lelah). Laravel Scout dan Meilisearch seperti mengetik nama teman di kontak smartphone: dalam 0,01 detik nomor teleponnya langsung muncul, bahkan jika Anda salah mengetik satu huruf sekalipun.''',
                'beginnerEn': '''Imagine searching for a contact in a 1,000-page paper phone directory. An SQL LIKE query reads line-by-line from page 1 to page 1,000 (exhausting and sluggish). Laravel Scout and Meilisearch function like smartphone contact search: in 0.01 seconds the contact appears, even if you misspell a vowel.''',
                'experimentsId': [
                    'Jalankan perintah `php artisan scout:import "App\\Models\\Product"` untuk mengindeks seluruh data database ke search engine.',
                    'Akses dashboard Laravel Horizon di browser pada `/horizon` dan pantau metrik worker antrean.',
                    'Uji coba pencarian dengan kata kunci salah ketik (misal: "mchanicil kybord") dan buktikan produk tetap ditemukan.',
                ],
                'experimentsEn': [
                    'Execute `php artisan scout:import "App\\Models\\Product"` to bulk-index existing models into the search cluster.',
                    'Access the Laravel Horizon dashboard at `/horizon` inspecting active worker telemetry.',
                    'Test a search query with intentional typos (e.g., "mchanicil kybord") and verify accurate hits.',
                ],
                'challengeId': 'Konfigurasikan faceted filter di Meilisearch sehingga pengguna dapat memfilter hasil pencarian berdasarkan rentang harga (`price <= 500000`) dan rating toko secara bersamaan.',
                'challengeEn': 'Configure faceted filter attributes in Meilisearch allowing buyers to filter search hits across price ranges and merchant review ratings simultaneously.',
                'summaryId': 'Kamu telah menguasai Laravel Scout full-text search dan monitoring antrean dengan Horizon. Minggu depan adalah Capstone Final: Multi-Vendor Marketplace Platform Skala Penuh!',
                'summaryEn': 'You have mastered Laravel Scout search and Horizon queue observability. Next week is our Final Capstone: Full-Scale Multi-Vendor Marketplace Platform!',
            },

            # Week 10
            {
                'week': 10,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'capstone-multivendor-marketplace',
                'titleId': 'Capstone: Platform Marketplace Multi-Vendor Skala Penuh Production-Ready',
                'titleEn': 'Capstone: Production-Ready Full-Scale Multi-Vendor Marketplace Platform',
                'programId': 'Platform Marketplace Lengkap (Laravel 11, Reverb, Stripe, Horizon & Docker Sail)',
                'programEn': 'Complete Marketplace Platform (Laravel 11, Reverb, Stripe, Horizon & Docker Sail)',
                'language': 'php',
                'code': '''<?php
// Laravel 11 Production Multi-Vendor Marketplace Capstone Architecture
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\OrderPlaced;

class MarketplaceOrderController {
    // Alur Checkout Transaksional Multi-Vendor Atomik
    public function processCheckout(Request $request) {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        // 1. Eksekusi Transaksi Database Atomik (Anti Race Condition & Anti Overdraft Stok)
        $order = DB::transaction(function () use ($validated, $user) {
            $totalAmount = 0;
            $orderItemsData = [];

            foreach ($validated['items'] as $item) {
                // Kunci baris stok produk (SELECT ... FOR UPDATE)
                // $product = Product::where('id', $item['product_id'])->lockForUpdate()->firstOrFail();
                // if ($product->stock < $item['quantity']) {
                //     throw new \\Exception("Stok produk {$product->title} tidak mencukupi!");
                // }
                // $product->decrement('stock', $item['quantity']);
                $totalAmount += 350000 * $item['quantity'];
            }

            // Buat record Order utama
            return (object) [
                'id' => 'ORD-' . strtoupper(bin2hex(random_bytes(4))),
                'buyer_id' => $user?->id ?? 1,
                'total_amount' => $totalAmount,
                'status' => 'PAID',
                'created_at' => now()->toIso8601String()
            ];
        });

        // 2. Pancarkan Event Asinkron ke Antrean Redis & WebSocket Reverb
        // OrderPlaced::dispatch($order);

        return response()->json([
            'status' => 'SUCCESS',
            'message' => 'Pesanan berhasil dikonfirmasi dan sedang diproses oleh vendor.',
            'order' => $order
        ], 201);
    }
}

// Endpoint Pemeriksaan Kesiapan Server (Kubernetes Health Probe)
class HealthCheckController {
    public function ping() {
        return response()->json([
            'status' => 'healthy',
            'framework' => 'Laravel 11.x',
            'php_version' => PHP_VERSION,
            'database' => 'connected',
            'redis_queues' => 'active',
            'reverb_ws' => 'listening'
        ]);
    }
}

echo "=== TRYNGO HIGH-SCALABILITY MULTI-VENDOR MARKETPLACE INITIALIZED ===\\n";
echo "Siap melayani jutaan transaksi dengan arsitektur enterprise Laravel 11.\\n";
''',
                'objectivesId': [
                    'Mengintegrasikan seluruh ekosistem: Laravel 11, Reverb WebSockets, Stripe, Horizon, dan Redis.',
                    'Menerapkan transaksi database atomik dengan pessimistic row locking (`lockForUpdate`).',
                    'Mengonfigurasi endpoint `/api/healthz` untuk probe liveness/readiness klaster container cloud.',
                    'Menyiapkan arsitektur monolitik modern berkemampuan tinggi yang siap dideploy di lingkungan cloud production.',
                ],
                'objectivesEn': [
                    'Integrate the complete ecosystem: Laravel 11, Reverb WebSockets, Stripe, Horizon, and Redis.',
                    'Enforce atomic database transactions with pessimistic row locking (`lockForUpdate`).',
                    'Configure `/api/healthz` endpoints for cloud container liveness and readiness probes.',
                    'Ship an enterprise-grade modern monolith architecture ready for production deployment.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Laravel Framework. Sistem ini menyatukan semua fondasi rekayasa perangkat lunak enterprise ke dalam satu platform marketplace multi-vendor yang tangguh, aman, dan siap diproduksi.

### Arsitektur Transaksional Zero-Overdraft
Ketika ribuan pembeli berebut barang diskon pada detik yang sama di Flash Sale, method `DB::transaction` dikombinasikan dengan `lockForUpdate()` mengunci baris data stok di database PostgreSQL/MySQL. Ini menjamin stok barang tidak akan pernah minus atau terdebit ganda.

### Pemisahan Transaksi dan Distribusi Event
Setelah transaksi database di-commit, event `OrderPlaced` dipancarkan ke antrean Redis yang dipantau oleh Laravel Horizon, sementara Laravel Reverb langsung memperbarui angka sisa stok di seluruh layar pembeli lain tanpa me-refresh browser.

### Kesiapan Cloud Production
Aplikasi dilengkapi endpoint `/api/healthz` untuk probe orchestrator Kubernetes, siap dijalankan di dalam container Docker berstandar industri dengan Nginx dan PHP-FPM.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern Laravel 11 enterprise engineering patterns into a high-throughput, production-ready multi-vendor marketplace platform.

### Zero-Overdraft Transactional Architecture
When thousands of shoppers contend for limited inventory during flash-sale bursts, `DB::transaction` paired with `lockForUpdate()` locks database rows exclusively. This strictly prevents negative inventory balances and double-checkout anomalies.

### Decoupled Operations & Event Distribution
Once database updates commit, the `OrderPlaced` event offloads to Redis queues observed by Laravel Horizon, while Laravel Reverb updates live inventory counters across all client browsers instantaneously.

### Production Cloud Readiness
The platform exposes an `/api/healthz` probe for Kubernetes container orchestrators, configured for containerized execution atop Nginx and PHP-FPM.
''',
                'beginnerId': '''Proyek ini ibarat pasar modern raksasa yang serba otomatis. Ada kasir terpercaya yang menghitung uang dan mencatat stok tanpa pernah salah hitung (Database Transaction & lockForUpdate), pengeras suara canggih yang langsung mengumumkan barang habis ke seluruh pengunjung (Reverb WebSockets), dan robot kurir di ruang belakang yang langsung mengemas barang pesanan pembeli (Horizon Queues).''',
                'beginnerEn': '''This project mirrors a state-of-the-art automated mega-exchange. It features infallible registers tracking balances and stock without accounting errors (Database Transactions & lockForUpdate), digital public announcement speakers updating buyers instantaneously (Reverb WebSockets), and automated robotic fulfillment sorting parcels in the warehouse (Horizon Queues).''',
                'experimentsId': [
                    'Jalankan simulasi alur checkout pesanan lengkap dan amati respons JSON 201 Created.',
                    'Periksa kesehatan aplikasi di browser melalui endpoint `/api/healthz`.',
                    'Gunakan Apache Benchmark (`ab -n 100 -c 10`) untuk menguji daya tahan endpoint checkout di bawah beban konkuren.',
                ],
                'experimentsEn': [
                    'Execute a simulated full checkout workflow observing the 201 Created receipt.',
                    'Inspect application cluster health via the `/api/healthz` route in your browser.',
                    'Deploy Apache Benchmark (`ab -n 100 -c 10`) to stress-test checkout resilience under concurrent traffic.',
                ],
                'challengeId': 'Tambahkan penanganan multi-vendor settlement: bagi total pembayaran pelanggan menjadi sub-order terpisah untuk masing-masing vendor dan hitung komisi marketplace 5% secara otomatis.',
                'challengeEn': 'Build a multi-vendor split settlement subsystem: partition order totals into distinct vendor sub-orders, automatically withholding a 5% marketplace commission.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Laravel Framework dari nol hingga platform marketplace multi-vendor enterprise berskala produksi!',
                'summaryEn': 'Congratulations! You have completed the entire Laravel Framework curriculum from zero to an enterprise production multi-vendor marketplace platform!',
            },
        ]
    }
