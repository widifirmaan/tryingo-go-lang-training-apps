# Testing — Uji Warung Laravel

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 9:** Testing

## Tujuan Pembelajaran

- `php artisan test` — `it("buat produk", fn()=> $this->post('/produk', ["nama"=>"Beras"])->assertStatus(302))`

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

## Ringkasan

Minggu 9: **Uji Laravel** — `php artisan test`.
