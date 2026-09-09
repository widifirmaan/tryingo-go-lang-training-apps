# Relationships — Tali Antar Rak Laravel

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 6:** Relationships
> **Prasyarat:** Minggu 5 — **Authentication**.

## Tujuan Pembelajaran

- `hasMany`, `belongsTo` — `Produk hasMany Pesanan`, `Pesanan belongsTo Produk`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa relasi, `pesanan` + `pelanggan` = 2 query + gabung manual. Dengan `hasMany/belongsTo` + `with()`, 2 query otomatis + anti-N+1.

---

## Program

```php
// app/Models/Produk.php
class Produk extends Model {
  public function pesanans(){ return $this->hasMany(Pesanan::class); }
}
// app/Models/Pesanan.php
class Pesanan extends Model {
  public function produk(){ return $this->belongsTo(Produk::class); }
}

$produk = Produk::with('pesanans')->find(1);
echo $produk->nama . " dipesan " . $produk->pesanans->count() . "x";

$pesanan = Pesanan::with('produk')->first();
echo $pesanan->produk->nama;
```


---

## Penjelasan untuk Pemula

### Analogi: Tali Antar Rak Laravel
- **`hasMany` = tali keluar**: 1 produk diikat BANYAK pesanan (`$produk->pesanans`).
- **`belongsTo` = tali balik**: tiap pesanan milik 1 produk (`$pesanan->produk`). `with('pesanans')` = tarik tali sekaligus (tanpa ini: 1 + N query = lambat!).

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `$produk->pesanans` otomatis; `Produk::with('pesanans')->get()` 2 query (bukan 101).

### 3 Istilah Wajib
- 1. **hasMany/belongsTo/with**: punya/milik/ikut

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `Produk` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `Produk` dan `Pesanan` → masih jalan atau error?
- **Merah:** Salah ketik 1 huruf pada `Produk` → pesan error apa? Betulkan.

## Tantangan

**Relationships di Warungmu:** pakai `Produk`, `Pesanan`, `pesanans` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `Produk`, `Pesanan`, `pesanans`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Authentication** (Minggu 5): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 6: **Tali Rak** — `hasMany`/`belongsTo`. Minggu depan: **Validasi**.
