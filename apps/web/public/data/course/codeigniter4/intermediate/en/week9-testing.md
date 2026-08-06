# Testing with PHPUnit

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 9:** Testing with PHPUnit

## Learning Objectives

- CIUnitTestCase: base class for unit tests
- FeatureTestTrait: test HTTP requests
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

## Key Concepts

### CIUnitTestCase
Base test class. `$refresh = true` resets database.

### FeatureTestTrait
Test HTTP: `$this->get()`, `$this->post()`.

### Database Tests
`seeInDatabase()` checks record exists. `dontSeeInDatabase()` checks absence.

### Helpers
`model()`, `db_connect()`, `seed()`.

### Assertions
`assertStatus()`, `assertJSON()`, `assertIsArray()`.

---

## Experiments

- Create test for model CRUD
- Test controller with FeatureTestTrait
- Try database assertions
- Create test with seeder
- Implement test with mocking

---

## Challenge

Create a complete test suite for Product CRUD: model test, controller test, database assertions. Min 10 test cases.

---

## Summary

Week 9 of 10: **Testing with PHPUnit** (Level: Intermediate). Code quality guaranteed. Next week: **Capstone Project**!
