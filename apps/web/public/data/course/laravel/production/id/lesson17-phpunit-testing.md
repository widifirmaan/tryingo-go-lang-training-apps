# Testing dengan PHPUnit

> Laravel | Testing & Produksi | Pelajaran 17

## Tujuan Pembelajaran

- Menulis feature test API: request simulasi + assertion response
- Mengisolasi test dengan RefreshDatabase dan SQLite in-memory
- Menguji jalur sukses DAN jalur gagal (validasi, kredensial salah)
- Menjalankan test di terminal dan membaca hasil (failure/success)

---

## Program: Testing dengan PHPUnit

```php
<?php

namespace Tests\Feature;

use App\Models\Produk;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProdukApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_daftar_produk_dapat_diambil(): void
    {
        Produk::create(['nama' => 'Kopi Gayo', 'harga' => 25000, 'stok' => 10, 'tersedia' => true]);

        $this->getJson('/api/produk')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.nama', 'Kopi Gayo');
    }

    public function test_produk_baru_dapat_dibuat(): void
    {
        $response = $this->postJson('/api/produk', [
            'nama' => 'Teh Melati',
            'harga' => 12000,
            'stok' => 5,
            'tersedia' => true,
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('produks', ['nama' => 'Teh Melati']);
    }

    public function test_produk_validasi_gagal_tanpa_nama(): void
    {
        $this->postJson('/api/produk', ['harga' => 5000])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('nama');
    }
}

```

---

## Penjelasan

## Test: Kontrak yang Dieksekusi
$this->getJson('/api/produk') = request HTTP sungguhan terhadap aplikasi (bukan unit internal). Assertion: assertOk (200), assertCreated (201), assertJsonCount, assertJsonPath, assertJsonStructure. Test membuktikan PERILAKU, bukan detail implementasi - boleh refactor kode, test harus tetap hijau.
## RefreshDatabase & SQLite In-memory
phpunit.xml memaksa DB_CONNECTION=sqlite + DB_DATABASE=:memory: - setiap test dapat database kosong di RAM. RefreshDatabase menjalankan semua migration di awal tiap test. Hasil: test cepat, terisolasi, dan TIDAK menyentuh database development.
## Assertion yang Menuntun Desain
assertUnprocessable (422) + assertJsonValidationErrors memaksa Anda berpikir: apa yang terjadi kalau data invalid? assertDatabaseHas memverifikasi efek ke DATABASE, bukan hanya response. Test yang baik menuliskan skenario klien - dan menuntun API agar konsisten.
## Alur Kerja TDD Ringan
Red-Green-Refactor: tulis test yang gagal (red), buat fitur minimal agar lewat (green), rapikan (refactor). vendor/bin/phpunit --filter NamaTest menjalankan sebagian. Test yang lambat = tanda desain bermasalah.

---

## Eksperimen

1. **Test: Kontrak yang Dieksekusi**
2. **RefreshDatabase & SQLite In-memory**
3. **Assertion yang Menuntun Desain**
4. **Alur Kerja TDD Ringan**

---

## Tantangan

Perluas coverage: (1) tulis test edit & hapus produk (PUT/DELETE /api/produk/{id}) lengkap dengan 404 untuk id tak ada, (2) tulis test yang memaksa kegagalan 401: akses /api/produk POST tanpa header Authorization, (3) tambah kolom kategori dan test filter ?kategori= (assertJsonPath untuk relasi), (4) hitung coverage: vendor/bin/phpunit --coverage-text dan tulis persentasenya di README - target minimum 70%.

---

## Ringkasan

Feature test = request + assertion. RefreshDatabase = isolasi. Jalur sukses & gagal = lengkap. Lanjut: caching & Redis.
