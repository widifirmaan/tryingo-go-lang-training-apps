# Factories & Seeders: Dummy Data

> Laravel | Data & CRUD | Lesson 8

## Learning Objectives

- Write Factories with Faker (fake())
- Chain relationships in factories: kategori_id => Kategori::factory()
- Write DatabaseSeeder and run db:seed
- Rebuild the database with migrate:fresh --seed

---

## Program: Factories & Seeders: Dummy Data

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

## Explanation

## Factories: Data Recipes
A factory defines a 'recipe' for one row: fake()->name(), numberBetween(5000, 250000), randomElement([...]). Produk::factory()->count(30)->create() produces 30 realistic rows in seconds. fake() = Faker - a fake-data generator in 30+ languages (locale from the app faker_locale config).
## Relationships in Factories
'kategori_id' => Kategori::factory() implicitly creates a category for each product - data stays consistent (valid FKs). The pattern also shines in tests: call a factory and get a complete object with its relations.
## Seeders: Initial App Data
DatabaseSeeder::run() executes with php artisan db:seed. Seed production data: master categories + initial products + an admin user. For teams: one command = the same populated database for everyone - no manual setup.
## migrate:fresh: Total Reset
php artisan migrate:fresh --seed drops ALL tables, runs every migration from zero, then seeds. In development this saves time; NEVER ON PRODUCTION - real data is lost.

---

## Experiments

1. **Factories: Data Recipes**
2. **Relationships in Factories**
3. **Seeders: Initial App Data**
4. **migrate:fresh: Total Reset**

---

## Challenge

Strengthen dummy data: (1) create an ArtikelFactory (random word judul, paragraf(3) isi, boolean terbit) and 50 articles in the seeder, (2) make a factory state: Produk::factory()->habis() with tersedia => false, (3) create a UserFactory and an admin user with a fixed email admin@tryngo.test, (4) split the seeder into separate Seeder classes called with $this->call([...]).

---

## Summary

Factories = row recipes. Seeders = shared initial data. fresh --seed = quick reset. Next: authentication.
