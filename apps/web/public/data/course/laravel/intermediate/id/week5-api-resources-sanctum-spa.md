# RESTful API Enterprise: Eloquent API Resources & Laravel Sanctum

> **Kategori:** Laravel Framework | **Level:** Menengah | **Minggu 5:** RESTful API Enterprise: Eloquent API Resources & Laravel Sanctum
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran Eloquent API Resources sebagai layer transformasi pemisah antara database dan JSON.
- Mencegah kebocoran data sensitif (password hash, secret keys) dengan kontrol atribut eksplisit.
- Menggunakan metode `$this->whenLoaded("relation")` untuk mencegah query N+1 di API response.
- Mengamankan endpoint mobile dan SPA menggunakan token autentikasi ringan Laravel Sanctum.

---

## Program: API Katalog Produk Marketplace Terotentikasi Sanctum Token dengan API Resources

```php
<?php
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
use Illuminate\Support\Facades\Route;

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

echo "=== ELOQUENT API RESOURCES & SANCTUM MIDDLEWARE TERKONFIGURASI ===\n";
```

---

## Konsep Kunci

Mengembalikan model Eloquent langsung dari controller (`return Product::all();`) adalah kebiasaan buruk yang berbahaya. Jika ada penambahan kolom sensitif di tabel database, kolom tersebut bisa tidak sengaja bocor ke publik dalam respons JSON.

### Keunggulan Eloquent API Resources
**API Resources** bertindak sebagai filter dan transformator data resmi:
- Memformat angka harga menjadi format mata uang yang ramah pengguna.
- Membuka kontrol penuh atas nama field JSON tanpa harus mengubah nama kolom di database.
- Menyediakan method kondisional sakti `$this->whenLoaded('store')`: relasi toko hanya akan dimasukkan ke JSON jika query controller secara eksplisit melakukan eager loading (`Product::with('store')`), melindungi API dari kueri tersembunyi yang lambat.

### Autentikasi Modern dengan Laravel Sanctum
**Laravel Sanctum** menyediakan sistem otentikasi token yang sangat ringan untuk Single Page Applications (React, Vue) dan aplikasi mobile (Flutter, iOS, Android). Sanctum memungkinkan pengguna menghasilkan token API (Personal Access Tokens) dengan batasan izin (token abilities) tanpa kerumitan server OAuth2 yang berat.


---

---

## Penjelasan untuk Pemula

Bayangkan toko perhiasan mewah. Di gudang brankas belakang (Database), ada dokumen rahasia harga beli pabrik dan nomor sertifikat distributor. Resepsionis etalase depan (API Resource) hanya menunjukkan kalung emas, kartu nama toko, dan harga jual resmi ke calon pembeli, tanpa pernah memperlihatkan dokumen rahasia gudang kepada orang luar.

## Eksperimen

- Buat token Sanctum menggunakan `$user->createToken("mobile-app", ["products:read"])->plainTextToken`.
- Kirim request dengan header `Authorization: Bearer <token>` menggunakan cURL dan amati verifikasi Sanctum.
- Gunakan `ProductResource::collection($products)` untuk memformat koleksi data terpaginasi otomatis.

---

## Tantangan

Konfigurasikan pembatasan kemampuan token Sanctum (Token Abilities): buat token khusus kurir yang hanya memiliki izin `orders:update-status` dan tolak akses jika mencoba membuat produk baru.

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

### 1. Mass Assignment Exception
- **Gejala / Masalah:** Muncul error `Add [field] to fillable property to allow mass assignment` saat create/update model.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Daftarkan kolom yang aman di properti `protected $fillable = [...]` pada Model Eloquent.

### 2. Menyimpan Logika Bisnis di Controller (Fat Controller)
- **Gejala / Masalah:** Controller menjadi ribet, sulit diuji (*untestable*), dan melanggar prinsip Single Responsibility.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pindahkan logika bisnis ke Action Classes, Service Classes, atau Form Requests.

### 3. Lupa Menjalankan `php artisan config:cache` di Server Produksi
- **Gejala / Masalah:** Pembacaan file konfigurasi secara berulang memperlambat response time aplikasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Jalankan caching konfigurasi, route, dan view saat pipeline deployment produksi selesai.

---

## Ringkasan

Kamu telah menguasai Eloquent API Resources dan autentikasi token Laravel Sanctum. Minggu depan kita mempelajari Events, Listeners, dan Background Queues.
