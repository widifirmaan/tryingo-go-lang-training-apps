# Testing with PHPUnit

> CodeIgniter 4 | Lesson 15

## Learning Objectives

- Write PHPUnit tests with CIUnitTestCase\n- Use FeatureTestTrait for HTTP request testing\n- Use assertEquals and assertStringContainsString\n- Run tests with vendor/bin/phpunit

---

## Program: CodeIgniter 4

```php
<?php

namespace Tests\Feature;

use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Test\ControllerTester;
use CodeIgniter\Test\FeatureTestTrait;

class BlogTest extends CIUnitTestCase
{
    use FeatureTestTrait;
    use ControllerTester;

    public function test_homepage_returns_200(): void
    {
        $result = $this->withOutputEnabled()
            ->get('/');

        $this->assertEquals(200, $result->getStatusCode());
    }

    public function test_blog_index_returns_200(): void
    {
        $result = $this->get('/blog');

        $this->assertEquals(200, $result->getStatusCode());
        $this->assertStringContainsString('Blog', $result->getBody());
    }

    public function test_blog_view_returns_404_for_missing_post(): void
    {
        $result = $this->get('/blog/non-existent-post');

        $this->assertEquals(404, $result->getStatusCode());
    }

    public function test_login_page_loads(): void
    {
        $result = $this->get('/login');

        $this->assertEquals(200, $result->getStatusCode());
        $this->assertStringContainsString('Login', $result->getBody());
    }
}

```

---

## Explanation

## CI4 Testing
CIUnitTestCase — base class for all tests. FeatureTestTrait — enables $this->get(), $this->post(), $this->withOutputEnabled() for testing HTTP requests. ControllerTester — enables $this->controller() for testing controller methods directly.
## Test Methods
test_homepage_returns_200() — method name must start with test_. $this->get('/') — simulate GET request. $this->assertEquals(200, $result->getStatusCode()) — assert HTTP status. $this->assertStringContainsString('Blog', $result->getBody()) — assert response body contains text.
## Running Tests
vendor/bin/phpunit — run all tests. vendor/bin/phpunit --filter BlogTest — run specific test class. vendor/bin/phpunit --filter test_homepage_returns_200 — run specific test method. vendor/bin/phpunit --coverage-text — show code coverage.

---

## Experiments

1. **## CI4 Testing
CIUnitTestCase — base class for all tests. FeatureTestTrait — enables $this->get(), $this->post(), $this->withOutputEnabled() for testing HTTP requests. ControllerTester — enables $this->controller() for testing controller methods directly.
## Test Methods
test_homepage_returns_200() — method name must start with test_. $this->get('/') — simulate GET request. $this->assertEquals(200, $result->getStatusCode()) — assert HTTP status. $this->assertStringContainsString('Blog', $result->getBody()) — assert response body contains text.
## Running Tests
vendor/bin/phpunit — run all tests. vendor/bin/phpunit --filter BlogTest — run specific test class. vendor/bin/phpunit --filter test_homepage_returns_200 — run specific test method. vendor/bin/phpunit --coverage-text — show code coverage.**

---

## Challenge

Level up testing: (1) add test for store() method that tests form submission with valid and invalid data, (2) add test for destroy() method that tests post deletion, (3) create unit test for PostModel that tests getPosts() and getPostBySlug(), (4) add test for CSRF protection and authentication filter.

---

## Summary

CIUnitTestCase = base test class. FeatureTestTrait = HTTP testing. assertEquals = assert status. vendor/bin/phpunit = run tests. Next: final project.
