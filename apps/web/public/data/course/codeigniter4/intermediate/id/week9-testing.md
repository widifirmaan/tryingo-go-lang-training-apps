# Testing dengan PHPUnit

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 9:** Testing dengan PHPUnit

## Tujuan Pembelajaran

- CIUnitTestCase: base class untuk unit test
- FeatureTestTrait: test HTTP request
- Database testing: seeInDatabase, dontSeeInDatabase
- Test helpers: model(), db_connect(), seed()
- Assertions: assertStatus, assertJSON, assertIsArray

---

## Program: Unit & Feature Test

```php
<?php
echo "=== CI4 Testing ===<br><br>";

echo "=== Unit Test ===<br>";
echo "use CodeIgniter\Test\CIUnitTestCase;<br>";
echo "class ProductModelTest extends CIUnitTestCase {<br>";
echo "    protected $refresh = true;<br><br>";
echo "    public function testFindAll() {<br>";
echo "        $model = new ProductModel();<br>";
echo "        $result = $model->findAll();<br>";
echo "        $this->assertIsArray($result);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Feature Test ===<br>";
echo "use CodeIgniter\Test\FeatureTestTrait;<br>";
echo "class ProductControllerTest extends CIUnitTestCase {<br>";
echo "    use FeatureTestTrait;<br><br>";
echo "    public function testIndex() {<br>";
echo "        $result = $this->get('/api/products');<br>";
echo "        $result->assertStatus(200);<br>";
echo "        $result->assertJSON();<br>";
echo "    }<br><br>";
echo "    public function testCreate() {<br>";
echo "        $result = $this->post('/api/products', [<br>";
echo "            'name' => 'Test Product',<br>";
echo "            'price' => 100000,<br>";
echo "        ]);<br>";
echo "        $result->assertStatus(201);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Test Simulation ===<br>";
$tests = [
    ["testFindAll", "PASS"],
    ["testFindById", "PASS"],
    ["testCreate", "PASS"],
    ["testUpdate", "PASS"],
    ["testDelete", "PASS"],
];

foreach ($tests as [$name, $result]) {
    echo "  $result: $name<br>";
}

echo "<br>=== Database Testing ===<br>";
echo "$this->seeInDatabase('products', ['name' => 'Test Product']);<br>";
echo "$this->dontSeeInDatabase('products', ['name' => 'Deleted']);<br>";
echo "$this->hasInDatabase('products', ['name' => 'New', 'price' => 50]);<br><br>";

echo "=== Test Helpers ===<br>";
echo "model('ProductModel') — Get model instance<br>";
echo "db_connect() — Get database connection<br>";
echo "$this->seed('ProductSeeder') — Run seeder<br>";
>
```

---

## Konsep Kunci

### CIUnitTestCase
Base class untuk test. `$refresh = true` untuk reset database.

### FeatureTestTrait
Test HTTP: `$this->get()`, `$this->post()`, dengan assertion methods.

### Database Test
`seeInDatabase()` cek record exists. `dontSeetInDatabase()` cek tidak exists.

### Helpers
`model()` get model, `db_connect()` get DB, `seed()` run seeder.

### Assertions
`assertStatus(200)`, `assertJSON()`, `assertIsArray()`.

---

## Eksperimen

- Buat test untuk model CRUD
- Test controller dengan FeatureTestTrait
- Coba database assertion
- Buat test dengan seeder
- Implementasikan test dengan mocking

---

## Tantangan

Buat test suite lengkap untuk CRUD Product: model test, controller test, database assertion. Min 10 test cases.

---

## Ringkasan

Minggu 9 dari 10: **Testing dengan PHPUnit** (Level: Menengah). Kualitas kode terjamin. Minggu depan: **Capstone Project**!
