# Models & Database — Rak CI4 Beneran

> **Kategori:** CodeIgniter | **Level:** Pemula | **Minggu 4:** Models & Database

## Tujuan Pembelajaran

- `php spark make:model ProdukModel` + `protected $table` + `$allowedFields` anti mass-assignment (sumber: codeigniter.com/user_guide/models/model)
- `findAll()`, `find($id)`, `where()->findAll()`, `save()`, `delete()` (sumber: user_guide/models/model)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa Model, tiap controller tulis SQL mentah 10x (typo 1 = error 10 tempat). Dengan `ProdukModel`, 1 rak dipakai 10 controller. `$allowedFields` cegah hacker isi `is_admin` lewat form (seperti `$fillable` Laravel).

---

## Program: Rak Produk CI4 Beneran

```bash
php spark make:model ProdukModel
```

```php
// app/Models/ProdukModel.php — rak
namespace App\Models;
use CodeIgniter\Model;

class ProdukModel extends Model {
  protected $table = 'produk';
  protected $primaryKey = 'id';
  protected $allowedFields = ['nama', 'harga', 'stok']; // HANYA ini boleh save()!
  protected $returnType = 'array';
}
```

```php
// Controller — pakai rak
$model = new \App\Models\ProdukModel();

// Baca
$data["semua"] = $model->findAll();
$data["satu"] = $model->find(1);
$data["murah"] = $model->where('harga <', 20000)->findAll();
$data["cari"] = $model->like('nama', 'beras')->findAll();

// Tulis (hanya allowedFields lolos!)
$model->save(["nama" => "Kopi", "harga" => 12000, "is_admin" => 1]); // is_admin DITOLAK!

// Hapus
$model->delete(99);

return view('produk', $data);
```

Atur DB di `app/Config/Database.php` (`database` = `warung`) + pastikan tabel ada (W5 migration).

---

## Konsep Kunci

### `Model` + `$table` = Rak Siap
`extends Model` + `$table = 'produk'` → `findAll/save` langsung jalan.

### `$allowedFields` = Daftar Sah
Di luar daftar, `save()` buang diam-diam (aman!).

### `where/like/find` = Tukang Cari
`where('harga <', 20000)->findAll()`, `like('nama','beras')`, `find(1)`.

---

## Penjelasan untuk Pemula

### Analogi: Rak dengan Penjaga
- **Model = rak + penjaga**: ambil/simpan lewat penjaga.
- **$allowedFields = daftar tamu**: di luar daftar, tolak.

### Langkah 0 — Siapkan Device
- Sama W1 + tabel `produk` ada (W5 atau SQL manual).

### Cara Komputer Membaca
1. `$model->where(...)->findAll()` → bangun `SELECT ... WHERE ...` → jalankan → array.
2. `save(["is_admin"=>1])` → saring allowedFields → buang `is_admin`.

### 3 Istilah Wajib
1. **Model/allowedFields**: rak/daftar-sah
2. **findAll/save**: ambil/simpan

---

## Eksperimen

- **Hijau:** `find(1)` → 1 barang? `findAll()` → semua?
- **Kuning:** `save` dengan `is_admin` → kolom tidak ada (ditolak)?
- **Merah:** `$table` salah ketik → error `Table not found`? Betulkan.

---

## Tantangan

**Rak Lengkap:** `ProdukModel` + `findAll` + `where stok>5` + `like` cari + `save` 2 + `delete` 1 + tampil di view.

---

## Glosarium Mini

- **Model/allowedFields/findAll**: rak/sah/ambil

---

## Ringkasan

Minggu 4 dari 5: **Rak Beneran** (Level: Pemula). Tanpa SQL mentah. Minggu depan: **Migrations** — cetak biru.
