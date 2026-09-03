# File Storage — Gudang Foto Laravel

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 8:** File Storage

## Tujuan Pembelajaran

- `Storage::disk('public')->put()` simpan foto produk, `php artisan storage:link` buka ke public

---

## Program

```php
// Controller
use Illuminate\Support\Facades\Storage;

public function simpan(Request $req){
  $path = $req->file('foto')->store('produk', 'public');
  Produk::create(["nama"=>$req->nama, "foto"=>$path]);
  return redirect('/produk');
}

// View: <form enctype="multipart/form-data"><input type="file" name="foto">
```

```bash
php artisan storage:link
# Buka http://localhost:8000/storage/produk/xxx.jpg
```

---

## Ringkasan

Minggu 8: **Gudang Foto** — Storage Laravel.
