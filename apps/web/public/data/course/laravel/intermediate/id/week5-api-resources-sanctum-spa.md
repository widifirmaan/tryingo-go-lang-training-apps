# RESTful API Enterprise: Eloquent API Resources & Laravel Sanctum

> **Kategori:** Laravel Framework | **Level:** Menengah | **Minggu 5:** RESTful API Enterprise: Eloquent API Resources & Laravel Sanctum

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

## Ringkasan

Kamu telah menguasai Eloquent API Resources dan autentikasi token Laravel Sanctum. Minggu depan kita mempelajari Events, Listeners, dan Background Queues.
