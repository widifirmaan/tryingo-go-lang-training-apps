# API Resources & Filtering

> Laravel | API & Realtime | Pelajaran 14

## Tujuan Pembelajaran

- Membentuk respons JSON dengan API Resource (JsonResource)
- Menggunakan whenLoaded untuk relasi tanpa N+1
- Menambahkan filter, pencarian, dan sorting lewat query parameter
- Membaca struktur pagination Laravel (data, links, meta)

---

## Program: API Resources & Filtering

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdukResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'harga' => (int) $this->harga,
            'stok' => $this->stok,
            'tersedia' => $this->tersedia,
            'kategori' => $this->whenLoaded('kategori', fn () => $this->kategori->nama),
            'dibuat' => $this->created_at?->toDateTimeString(),
        ];
    }
}

```

---

## Penjelasan

## Resource: Kontrak API
ProdukResource menentukan BENTUK JSON. Model punya kolom lain (created_at dll) - API menentukan yang mana yang boleh keluar dan bagaimana penamaannya ('dibuat' bukan 'created_at'). Ubah struktur DB tanpa memecah klien API: cukup edit resource. Resource = antarmuka stabil ke dunia luar.
## whenLoaded: N+1 yang Benar
$this->whenLoaded('kategori') hanya menyertakan relasi jika SUDAH di-load. Controller memakai Produk::with('kategori') - satu query join, bukan satu query per baris. Tanpa keduanya: 1 + N query. Dengan keduanya: 2 query. Ketidakcocokan (with tanpa whenLoaded = data kelebihan; whenLoaded tanpa with = field hilang).
## Filter, Cari, Urut
Semua lewat query parameter: kategori (relasi dengan whereHas), cari (LIKE), urut/arah (orderBy). $request->filled() membedakan 'tidak dikirim' dan 'kosong'. Berhati-hatilah: orderBy menerima input USER - dalam produksi batasi whitelist kolom yang boleh diurutkan.
## Pagination: Bagian dari Kontrak
paginate(10) menghasilkan data + links + meta - klien tahu total, halaman, dan URL halaman berikutnya. Halaman berikutnya = ?page=2. Konsumen API (aplikasi mobile) tidak perlu tahu cara kerja internal - cukup ikuti links.

---

## Eksperimen

1. **Resource: Kontrak API**
2. **whenLoaded: N+1 yang Benar**
3. **Filter, Cari, Urut**
4. **Pagination: Bagian dari Kontrak**

---

## Tantangan

Tingkatkan API: (1) tambah whitelist sorting (hanya nama/harga/stok/created_at) dengan in_array, kalau bukan -> 422, (2) buat endpoint /api/kategori (KategoriResource: id, nama, jumlah_produk dari withCount) + filter ?kategori_id di /api/produk, (3) tambah ProdukLiteResource (tanpa relasi) untuk daftar dan ProdukResource penuh untuk detail - bentuk berbeda, satu sumber data, (4) tulis README berisi contoh response JSON sebelum dan sesudah resource dipakai.

---

## Ringkasan

Resource = kontrak API. whenLoaded = relasi tepat. Pagination = bagian kontrak. Lanjut: queues & jobs.
