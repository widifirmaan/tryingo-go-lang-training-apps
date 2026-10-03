# Caching Terdistribusi: CacheModule, Redis Store & Cache Invalidation

> **Kategori:** NestJS Enterprise Architecture | **Level:** Menengah | **Minggu 7:** Caching Terdistribusi: CacheModule, Redis Store & Cache Invalidation
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengonfigurasi `CacheModule` bawaan NestJS dengan backend terdistribusi Redis.
- Menerapkan pola Cache-Aside (Lazy Loading) untuk kueri pembacaan data tinggi.
- Menggunakan `CacheInterceptor` untuk auto-caching response endpoint GET.
- Mengelola strategi Cache Invalidation saat terjadi mutasi data (POST, PUT, DELETE).

---

## Program: Cache Terdistribusi Redis untuk Katalog Produk & Invalidation Otomatis

```typescript
// Menggunakan @nestjs/cache-manager dan cache-manager-redis-yet
import {
  Injectable, Controller, Get, Post, Param, Body, UseInterceptors
} from '@nestjs/common';

// Simulasi Antarmuka CacheManager
interface CacheStore {
  get<T>(key: string): Promise<T | undefined>;
  set(key: string, value: unknown, ttlMs?: number): Promise<void>;
  del(key: string): Promise<void>;
}

@Injectable()
export class MockCacheService implements CacheStore {
  private store = new Map<string, { val: unknown; expires: number }>();

  async get<T>(key: string): Promise<T | undefined> {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return undefined;
    }
    return entry.val as T;
  }

  async set(key: string, value: unknown, ttlMs = 60000): Promise<void> {
    this.store.set(key, { val: value, expires: Date.now() + ttlMs });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

// Service Katalog dengan Pola Cache-Aside
@Injectable()
export class CachedCatalogService {
  constructor(private readonly cache: MockCacheService) {}

  async getProductDetails(productId: string) {
    const cacheKey = `product:details:${productId}`;

    // 1. Periksa Cache Hit
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      console.log(`[CACHE HIT] Mengembalikan data ${productId} langsung dari Redis.`);
      return { ...cached as object, source: 'REDIS_CACHE' };
    }

    // 2. Cache Miss: Ambil dari Database PostgreSQL
    console.log(`[CACHE MISS] Mengkueri database PostgreSQL untuk produk: ${productId}...`);
    const dbResult = { id: productId, name: 'Premium Mechanical Keyboard', price: 1500000 };

    // Simpan ke Redis dengan TTL 60 detik
    await this.cache.set(cacheKey, dbResult, 60000);
    return { ...dbResult, source: 'POSTGRES_DB' };
  }

  async updateProductPrice(productId: string, newPrice: number) {
    console.log(`[DB UPDATE] Memperbarui harga produk ${productId} menjadi Rp ${newPrice}...`);
    // Invalidate cache agar pengguna tidak melihat data kadaluarsa
    const cacheKey = `product:details:${productId}`;
    await this.cache.del(cacheKey);
    console.log(`[CACHE INVALIDATED] Kunci ${cacheKey} berhasil dihapus dari Redis.`);
    return { success: true, updatedPrice: newPrice };
  }
}

console.log('=== POLA DISTRIBUTED CACHE-ASIDE DENGAN REDIS TERKONFIGURASI ===');
```

---

## Konsep Kunci

Dalam situs e-commerce berskala besar (terutama saat kampanye promo tanggal kembar atau Flash Sale), jutaan pengguna membuka halaman katalog produk secara bersamaan. Jika setiap kunjungan mengeksekusi kueri SQL ke PostgreSQL, database akan mengalami kehabisan connection pool dan server akan tumbang.

### Arsitektur Cache-Aside
Pola **Cache-Aside** bekerja dengan alur:
1. Aplikasi memeriksa apakah data tersedia di cache Redis. Jika ada (**Cache Hit**), data dikembalikan seketika dalam latensi sub-milidetik.
2. Jika tidak ada (**Cache Miss**), aplikasi mengambil data dari PostgreSQL, menyimpannya ke Redis dengan Time-To-Live (TTL) tertentu, lalu mengembalikannya ke pengguna.

### Tantangan Terbesar: Cache Invalidation
"Hanya ada dua hal sulit dalam Computer Science: cache invalidation dan penamaan variabel." (Phil Karlton).
Jika admin toko mengubah harga produk, cache di Redis harus segera dihapus (`await cache.del(...)`). Jika tidak dihapus, pembeli akan melihat harga lama yang sudah tidak berlaku (Stale Data).


---

---

## Penjelasan untuk Pemula

Bayangkan etalase kaca toko kue. Toko menaruh contoh kue terpopuler di etalase depan (Redis Cache) sehingga pembeli bisa langsung melihatnya tanpa harus menunggu pelayan berjalan ke dapur belakang (PostgreSQL Database). Namun jika resep kuenya diganti, pelayan harus segera membuang kue contoh di etalase dan menggantinya dengan kue resep baru (Cache Invalidation).

## Eksperimen

- Panggil `getProductDetails("1")` dua kali dan buktikan panggilan kedua menghasilkan flag `source: "REDIS_CACHE"`.
- Panggil `updateProductPrice("1", 2000000)` lalu panggil kembali getProductDetails dan buktikan cache miss terjadi.
- Gunakan decorator `@UseInterceptors(CacheInterceptor)` di atas controller method.

---

## Tantangan

Buat Custom Decorator `@InvalidateCache("product:details:*")` yang secara otomatis membersihkan cache terkait setelah method mutasi berhasil dieksekusi.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Scope Provider Default vs Request Scope
- **Gejala / Masalah:** Menggunakan Request Scope pada service membuat performa anjlok drastis karena bean dibuat ulang setiap request.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pertahankan Singleton Scope default kecuali jika benar-benar membutuhkan data spesifik per HTTP request.

### 2. Lupa Mendaftarkan Module di `imports: []`
- **Gejala / Masalah:** Error `Nest can't resolve dependencies of the Service` saat aplikasi dijalankan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pastikan module yang mengekspor provider tersebut telah dicantumkan di array `imports` pada modul pemanggil.

### 3. Lupa Mengaktifkan ValidationPipe Global
- **Gejala / Masalah:** Payload DTO tidak divalidasi dan data kotor masuk ke database tanpa tersaring.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu pasang `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` di `main.ts`.

---

## Ringkasan

Kamu telah menguasai CacheModule, Redis Store, dan strategi Cache Invalidation. Level 2 selesai! Di Level 3 kita mempelajari Microservices, Testing, dan Capstone E-Commerce.
