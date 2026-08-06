# Testing dengan PHPUnit

> **Kategori:** PHP | **Level:** Menengah | **Minggu 10:** Testing dengan PHPUnit

## Tujuan Pembelajaran

- PHPUnit: framework testing untuk PHP
- Test structure: class extends TestCase, method testXxx
- Assertions: assertEquals, assertTrue, assertContains
- Exception testing: expectException dan try-catch
- Test runner: vendor/bin/phpunit dan code coverage

---

## Program: Unit Test

```php
<?php
echo "=== PHPUnit Test Simulation ===<br><br>";

class Calculator {
    public function add($a, $b) { return $a + $b; }
    public function divide($a, $b) {
        if ($b == 0) throw new \InvalidArgumentException("Cannot divide by zero");
        return $a / $b;
    }
    public function isEven($n) { return $n % 2 == 0; }
}

$calc = new Calculator();

$tests = [
    ["add(2,3)", $calc->add(2,3), 5],
    ["add(-1,1)", $calc->add(-1,1), 0],
    ["add(0,0)", $calc->add(0,0), 0],
    ["divide(10,2)", $calc->divide(10,2), 5],
    ["divide(7,2)", $calc->divide(7,2), 3.5],
    ["isEven(4)", $calc->isEven(4), true],
    ["isEven(7)", $calc->isEven(7), false],
];

$passed = 0;
$failed = 0;
foreach ($tests as [$name, $actual, $expected]) {
    if ($actual === $expected) {
        echo "PASS: $name = $actual<br>";
        $passed++;
    } else {
        echo "FAIL: $name (expected $expected, got $actual)<br>";
        $failed++;
    }
}

echo "<br>=== Exception Test ===<br>";
try {
    $calc->divide(5, 0);
    echo "FAIL: expected exception<br>";
    $failed++;
} catch (\InvalidArgumentException $e) {
    echo "PASS: exception thrown: {$e->getMessage()}<br>";
    $passed++;
}

echo "<br>=== Results ===<br>";
echo "Passed: $passed, Failed: $failed<br>";
echo "Total: " . ($passed + $failed) . " tests<br>";
>
```

---

## Konsep Kunci

### PHPUnit Setup
`composer require --dev phpunit/phpunit`. Test class extends `PHPUnit\Framework\TestCase`.

### Test Method
Prefix `test`: `public function testAdd()`. Atau annotation `@test`.

### Assertions
`assertEquals($expected, $actual)`, `assertTrue($cond)`, `assertContains($needle, $haystack)`.

### Exception Test
`$this->expectException(\InvalidArgumentException::class)`.

### Run Tests
`vendor/bin/phpunit tests/`. `--coverage-html` untuk coverage report.

---

## Eksperimen

- Buat test dengan data provider: @dataProvider
- Coba mock object dengin createMock
- Buat test dengan setUp dan tearDown
- Test dengan multiple assertions
- Buat integration test dengan database

---

## Tantangan

Buat test suite lengkap untuk class User: registration validation, email format, password strength. Min 10 test cases.

---

## Ringkasan

Minggu 10 dari 12: **Testing dengan PHPUnit** (Level: Menengah). Kualitas kode terjamin. Minggu depan: **Design Patterns**.
