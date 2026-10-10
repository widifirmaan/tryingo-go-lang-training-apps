# Testing with PHPUnit

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 10:** Testing with PHPUnit

## Learning Objectives

- PHPUnit: testing framework for PHP
- Test structure: class extends TestCase, method testXxx
- Assertions: assertEquals, assertTrue, assertContains
- Exception testing: expectException and try-catch
- Test runner: vendor/bin/phpunit and code coverage

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

## Key Concepts

### PHPUnit Setup
`composer require --dev phpunit/phpunit`. Test class extends `TestCase`.

### Test Methods
Prefix `test`: `public function testAdd()`.

### Assertions
`assertEquals()`, `assertTrue()`, `assertContains()`.

### Exception Testing
`$this->expectException()`.

### Running Tests
`vendor/bin/phpunit tests/`. `--coverage-html` for coverage.

---

## Experiments

- Create test with data provider: @dataProvider
- Try mock objects with createMock
- Create test with setUp and tearDown
- Test with multiple assertions
- Create integration test with database

---

## Challenge

Build a complete test suite for User class: registration validation, email format, password strength. Min 10 test cases.

---

## Summary

Week 10 of 12: **Testing with PHPUnit** (Level: Intermediate). Code quality guaranteed. Next week: **Design Patterns**.
