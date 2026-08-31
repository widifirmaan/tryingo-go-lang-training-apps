# Models & Database — Rak CI4

> **Kategori:** CodeIgniter | **Level:** Pemula | **Minggu 4:** Models & Database

## Tujuan Pembelajaran

- `php spark make:model Produk` + `Model` `findAll()`, `where()->findAll()`, `save()`

---

## Program

```php
// app/Models/ProdukModel.php
namespace App\Models;
use CodeIgniter\Model;
class ProdukModel extends Model {
  protected $table = 'produk';
  protected $allowedFields = ['nama','harga','stok'];
}

// Controller
$model = new \App\Models\ProdukModel();
$data["produk"] = $model->where('stok >', 5)->findAll();
return view('produk', $data);
```

`app/Config/Database.php` atur `database` + `php spark migrate`.

---

## Ringkasan

Minggu 4: **Rak CI4** — Model `findAll`.
