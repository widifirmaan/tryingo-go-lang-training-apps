# Testing with PHPUnit

> PHP | Lesson 15

## Learning Objectives

- Write PHPUnit tests: assertEquals, assertTrue, expectException\n- Understand the test class structure extending TestCase\n- Test both success and failure behavior (edge cases)\n- Run tests in the terminal and read the results

---

## Program: Testing with PHPUnit

```php
<?php

namespace Tests\Feature;

use App\Models\Task;
use PHPUnit\Framework\TestCase;

class TaskTest extends TestCase
{
    public function test_task_dapat_dibuat(): void
    {
        $task = new Task("Belajar PHPUnit", "Tulis test pertama");

        $this->assertEquals("Belajar PHPUnit", $task->getJudul());
        $this->assertFalse($task->isSelesai());
    }

    public function test_task_dapat_diselesaikan(): void
    {
        $task = new Task("Tugas", "Deskripsi");
        $task->complete();

        $this->assertTrue($task->isSelesai());
    }

    public function test_judul_tidak_boleh_kosong(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        new Task("", "Deskripsi");
    }
}

```

---

## Explanation

## Tests: A Contract That Executes
assertEquals($expected, $actual) — compares values. assertTrue($condition) — ensures a condition is true. expectException(\InvalidArgumentException::class) — ensures the code throws a specific exception. Tests prove BEHAVIOR, not implementation details.
## Test Class Structure
class TaskTest extends TestCase { public function test_name(): void { ... } } — every method starting with test_ is one test case. PHPUnit runs each method independently.
## Red-Green-Refactor
Write a failing test (red), make the code pass (green), clean up (refactor). vendor/bin/phpunit runs all tests. vendor/bin/phpunit --filter test_name runs a single test.

---

## Experiments

1. **## Tests: A Contract That Executes
assertEquals($expected, $actual) — compares values. assertTrue($condition) — ensures a condition is true. expectException(\InvalidArgumentException::class) — ensures the code throws a specific exception. Tests prove BEHAVIOR, not implementation details.
## Test Class Structure
class TaskTest extends TestCase { public function test_name(): void { ... } } — every method starting with test_ is one test case. PHPUnit runs each method independently.
## Red-Green-Refactor
Write a failing test (red), make the code pass (green), clean up (refactor). vendor/bin/phpunit runs all tests. vendor/bin/phpunit --filter test_name runs a single test.**

---

## Challenge

Level up testing: (1) add a test for the complete() method that ensures a task can be completed multiple times without error, (2) add a @dataProvider to test various title inputs (empty, whitespace, very long), (3) create a test for the Task class that tests all methods at once (integration test), (4) add a coverage report: vendor/bin/phpunit --coverage-text and target at least 80%.

---

## Summary

assertEquals = compare values. expectException = test errors. Red-Green-Refactor = test workflow. Next: final project.
