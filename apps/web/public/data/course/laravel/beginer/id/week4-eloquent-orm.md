# Eloquent ORM — Rak Otomatis Laravel

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 4:** Eloquent ORM

## Tujuan Pembelajaran

- `php artisan make:model Produk -m` buat model + migration, `php artisan migrate` bangun rak (sumber: laravel.com/docs/eloquent)
- `Produk::create()`, `all()`, `find()`, `where()->get()` isi & ambil
- `$fillable` anti mass-assignment nakal

---

## Kenapa Ini Penting Buat Kamu?

Tanpa Eloquent, tulis `INSERT INTO produk ...` SQL manual + koneksi manual. Dengan `Produk::create(["nama"=>"Beras"])` 1 baris — plus `created_at` otomatis. `$fillable` cegah hacker isi `is_admin=1` lewat form.

---

## Program: Rak Eloquent Warung

```bash
php artisan make:model Produk -m
php artisan migrate
```

```php
// database/migrations/xxxx_create_produks_table.php (cek, sudah jadi)
Schema::create('produks', function (Blueprint $table) {
  $table->id();
  $table->string('nama');
  $table->integer('harga');
  $table->integer('stok')->default(0);
  $table->timestamps();
});

// app/Models/Produk.php
class Produk extends Model {
  protected $fillable = ['nama', 'harga', 'stok']; // hanya ini boleh mass-assign
}

// Controller
use App\Models\Produk;

public function index() {
  return view('produk', ["produk" => Produk::orderBy('harga')->get()]);
}
public function simpan(Request $req) {
  Produk::create($req->only(['nama', 'harga', 'stok']));
  return redirect('/produk');
}

// Tinker coba cepat
// php artisan tinker → Produk::create(["nama"=>"Beras","harga"=>62000]) → Produk::all()
```

---

## Konsep Kunci

### `make:model -m` + `migrate` = Model + Rak
`-m` buatkan migration, `migrate` bangun tabel `produks` (jamak otomatis).

### `create/all/find/where` = Tukang Gudang
`Produk::create([...])`, `Produk::all()`, `Produk::find(1)`, `Produk::where('stok','>',5)->get()`.

### `$fillable` = Daftar Boleh
Hanya field di `$fillable` yang bisa `create($req->all())` — keamanan mass-assignment.

---

## Penjelasan untuk Pemula

### Analogi: Tukang Gudang Otomatis
- **Model = mandor**: `Produk::create()` perintahkan mandor, mandor tulis SQL.
- **$fillable = daftar belanja sah**: di luar daftar, ditolak.

### Langkah 0 — Siapkan Device
- Sama W1 + DB `.env` (`DB_DATABASE=warung`) → `php artisan migrate`.

### Cara Komputer Membaca
1. `Produk::create(["nama"=>"Beras"])` → cek `$fillable` → `INSERT INTO produks ...` → `created_at` otomatis.
2. `Produk::where('stok','>',5)->get()` → `SELECT * FROM produks WHERE stok > 5`.

### 3 Istilah Wajib
1. **Model/migration**: mandor/cetak biru
2. **fillable**: daftar sah
3. **tinker**: coba cepat

---

## Eksperimen

- **Hijau:** `Produk::create(["nama"=>"Kopi","harga"=>12000])` di tinker → `all()` ada 3?
- **Kuning:** `Produk::where('harga','>',20000)->get()` → hanya mahal?
- **Merah:** Hapus `$fillable` lalu `create` → error `MassAssignmentException`? Pasang lagi.

---

## Tantangan

**Rak Warung Lengkap:** `make:model Produk -m` + `migrate` → `tinker` isi 5 produk → `index()` `orderBy('harga')` → `simpan()` validasi + `create`. **Selesai Beginner Laravel!**

---

## Glosarium Mini

- **Model/migrate/fillable**: mandor/bangun/sah
- **tinker**: coba cepat

---

## Ringkasan

Minggu 4 dari 4: **Rak Otomatis** (Level: Pemula). **Selesai Beginner Laravel!** Lanjut: **Auth** (Menengah).
