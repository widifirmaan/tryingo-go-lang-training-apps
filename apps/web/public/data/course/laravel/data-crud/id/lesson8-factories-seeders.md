# Factories & Seeders: Data Dummy

> Laravel | Data & CRUD | Pelajaran 8

## Tujuan Pembelajaran

- Menulis Factory dengan Faker (fake())
- Merangkai relasi di factory: kategori_id => Kategori::factory()
- Menulis DatabaseSeeder dan menjalankan db:seed
- Membuat ulang database dengan migrate:fresh --seed

---

## Program: Factories & Seeders: Data Dummy

```php
<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Kategori::factory()->count(5)->create();
        Produk::factory()->count(30)->create();
    }
}

```

---

## Penjelasan

## Factory: Resep Data
Factory mendefinisikan 'resep' satu baris: fake()->name(), numberBetween(5000, 250000), randomElement([...]). Produk::factory()->count(30)->create() menghasilkan 30 baris realistik dalam hitungan detik. fake() = Faker - generator data palsu dalam 30+ bahasa (locale dari config app faker_locale).
## Relasi di Factory
'kategori_id' => Kategori::factory() membuat kategori baru secara implisit untuk tiap produk - data selalu konsisten (FK valid). Pola ini juga bekerja di test: panggil factory dan dapatkan objek lengkap dengan relasinya.
## Seeder: Data Awal Aplikasi
DatabaseSeeder::run() dijalankan dengan php artisan db:seed. Seed produsen data: kategori master + produk awal + user admin. Untuk tim: satu perintah = database berisi data yang sama untuk semua orang - menghilangkan setup manual.
## migrate:fresh: Reset Total
php artisan migrate:fresh --seed menghapus SEMUA tabel, menjalankan semua migration dari nol, lalu seed. Di development ini menghemat waktu; DI PRODUKSI JANGAN PERNAH - data asli hilang.

---

## Eksperimen

1. **Factory: Resep Data**
2. **Relasi di Factory**
3. **Seeder: Data Awal Aplikasi**
4. **migrate:fresh: Reset Total**

---

## Tantangan

Perkuat data dummy: (1) buat ArtikelFactory (judul kata-kata acak, isi paragraf(3), terbit boolean) dan 50 artikel di seeder, (2) buat factory state: Produk::factory()->habis() dengan state tersedia => false, (3) buat UserFactory dan user admin dengan email tetap admin@tryngo.test, (4) pecah seeder menjadi KelasSeeder terpisah dan panggil dengan $this->call([...]).

---

## Ringkasan

Factory = resep baris. Seeder = data awal tim. fresh --seed = reset cepat. Lanjut: authentication.
