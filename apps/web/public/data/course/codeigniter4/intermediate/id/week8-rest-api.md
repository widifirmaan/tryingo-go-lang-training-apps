# REST API — Warung Online CI4 Beneran

> **Kategori:** CodeIgniter | **Level:** Menengah | **Minggu 8:** REST API Development
> **Prasyarat:** Minggu 7 — **Authentication**.

## Tujuan Pembelajaran

- `ResourceController` + `$routes->resource('api/produk')` 5 pintu otomatis (sumber: codeigniter.com/user_guide/incoming/rest_api)
- `respond()`/`respondCreated()`/`failNotFound()` JSON + `$this->request->getJSON()` baca amplop

---

## Kenapa Ini Penting Buat Kamu?

HP butuh JSON, bukan HTML. Tanpa API, HP tidak bisa ambil stok. `resource()` 1 baris = 5 pintu (GET/POST/PUT/DELETE) — tanpa tulis 5 route manual.

---

## Program: API Warung Beneran

```php
// Routes.php — 1 baris 5 pintu!
$routes->resource('api/produk', ['controller' => 'Api\Produk']);
// GET api/produk, GET api/produk/1, POST, PUT api/produk/1, DELETE api/produk/1
```

```php
// Controllers/Api/Produk.php — beneran (bukan echo!)
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;

class Produk extends ResourceController {
  protected $modelName = 'App\Models\ProdukModel';
  protected $format = 'json';

  public function index() {
    return $this->respond($this->model->findAll());
  }

  public function show($id = null) {
    $p = $this->model->find($id);
    return $p ? $this->respond($p) : $this->failNotFound("Tidak ada $id");
  }

  public function create() {
    $data = $this->request->getJSON(true); // amplop JSON → array
    $id = $this->model->insert($data);
    return $this->respondCreated(["id" => $id] + $data);
  }

  public function delete($id = null) {
    $this->model->delete($id);
    return $this->respondDeleted(["id" => $id]);
  }
}
```

Test: `curl localhost:8080/api/produk` → JSON. `curl -X POST -H "Content-Type: application/json" -d '{"nama":"Gula","harga":15000}' ...` → `201`.

---

## Konsep Kunci

### `$routes->resource()` = 5 Pintu Sekaligus
`index/show/create/update/delete` otomatis.

### `respond()`/`failNotFound()` = Balas JSON Rapi
`respond($data)` 200, `respondCreated` 201, `failNotFound` 404 JSON (bukan HTML!).

### `getJSON(true)` = Buka Amplop
JSON body → array PHP.

---

## Penjelasan untuk Pemula

### Analogi: Drive-Thru JSON
- **resource() = 5 jendela drive-thru** sekaligus.
- **respond = struk JSON**, bukan halaman.

### Langkah 0 — Siapkan Device
- Sama W1 + `curl` atau Postman.

### Cara Komputer Membaca
1. `POST /api/produk` JSON → `create()` → `getJSON` → `insert` → `201`.
2. `GET /api/produk/99` → tidak ada → `404` JSON.

### 3 Istilah Wajib
1. **resource/respond**: 5-pintu/balas-JSON
2. **getJSON**: buka-amplop

---

## Eksperimen

- **Hijau:** `GET /api/produk/1` → JSON 1 barang?
- **Kuning:** `GET /api/produk/99` → 404 JSON (bukan HTML)?
- **Merah:** POST tanpa `Content-Type: application/json` → `getJSON` null? Tambah header.

---

## Tantangan

**Warung Online Lengkap:** `resource` + CRUD beneran + `curl` 5 perintah lulus (GET list/1/99, POST, DELETE).

---

## Glosarium Mini

- **resource/respond/fail**: 5-pintu/balas/gagal-JSON

---

## Ringkasan

Minggu 8 dari 10: **Drive-Thru JSON** (Level: Menengah). HP bisa belanja. Minggu depan: **Testing**.
