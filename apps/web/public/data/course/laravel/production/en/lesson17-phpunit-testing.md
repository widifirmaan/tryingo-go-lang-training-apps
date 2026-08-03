# PHPUnit Testing

> Laravel | Testing & Production | Lesson 17

## Learning Objectives

- Write API feature tests: simulated requests + response assertions
- Isolate tests with RefreshDatabase and in-memory SQLite
- Test success AND failure paths (validation, wrong credentials)
- Run tests in the terminal and read the results (failure/success)

---

## Program: PHPUnit Testing

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

## Explanation

## Tests: A Contract That Executes
$this->getJson('/api/produk') = a real HTTP request against the app (not an internal unit). Assertions: assertOk (200), assertCreated (201), assertJsonCount, assertJsonPath, assertJsonStructure. Tests prove BEHAVIOR, not implementation details - you may refactor code, tests must stay green.
## RefreshDatabase & In-memory SQLite
phpunit.xml forces DB_CONNECTION=sqlite + DB_DATABASE=:memory: - every test gets an empty database in RAM. RefreshDatabase runs all migrations at the start of each test. Result: fast, isolated tests that NEVER touch your development database.
## Assertions That Guide Design
assertUnprocessable (422) + assertJsonValidationErrors forces you to think: what happens when the data is invalid? assertDatabaseHas verifies the effect on the DATABASE, not just the response. Good tests write out client scenarios - and guide the API to be consistent.
## Lightweight TDD Workflow
Red-Green-Refactor: write a failing test (red), build the minimal feature to pass (green), clean up (refactor). vendor/bin/phpunit --filter NameTest runs a subset. Slow tests = a sign of bad design.

---

## Experiments

1. **Tests: A Contract That Executes**
2. **RefreshDatabase & In-memory SQLite**
3. **Assertions That Guide Design**
4. **Lightweight TDD Workflow**

---

## Challenge

Expand coverage: (1) write update & delete tests (PUT/DELETE /api/produk/{id}) including 404 for missing ids, (2) write a forced-401 test: POST /api/produk without an Authorization header, (3) add a kategori column and a test for the ?kategori= filter (assertJsonPath for the relation), (4) measure coverage: vendor/bin/phpunit --coverage-text and write the percentage in the README - target at least 70%.

---

## Summary

Feature tests = request + assertion. RefreshDatabase = isolation. Success & failure paths = complete. Next: caching & Redis.
