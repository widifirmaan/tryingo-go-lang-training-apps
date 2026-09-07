# Testing — Uji Warung Laravel

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 9:** Testing

## Tujuan Pembelajaran

- `php artisan test` — `it("buat produk", fn()=> $this->post('/produk', ["nama"=>"Beras"])->assertStatus(302))`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa test, ubah route → 404 ketahuan pelanggan. Dengan `php artisan test` + `assertDatabaseHas`, ubah → merah → perbaiki.

---

## Program

```php
// tests/Feature/ProdukTest.php
public function test_buat(){
  $res = $this->post('/produk', ["nama"=>"Beras","harga"=>62000]);
  $res->assertRedirect('/produk');
  $this->assertDatabaseHas('produks', ["nama"=>"Beras"]);
}
```

`php artisan test` → PASS.


---

## Penjelasan untuk Pemula

### Analogi: Cicip Warung Laravel
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `$this->post(...)->assertRedirect()`; `assertDatabaseHas()` cek DB beneran.

### 3 Istilah Wajib
- 1. **test/assertDatabaseHas**: cicip/cek-DB

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 9: **Uji Laravel** — `php artisan test`.
