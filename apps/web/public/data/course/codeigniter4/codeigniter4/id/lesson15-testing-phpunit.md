# Testing with PHPUnit

> CodeIgniter 4 | Pelajaran 15

## Tujuan Pembelajaran

- Menulis test PHPUnit dengan CIUnitTestCase\n- Menggunakan FeatureTestTrait untuk test HTTP requests\n- Menggunakan assertEquals dan assertStringContainsString\n- Menjalankan test dengan vendor/bin/phpunit

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

## Penjelasan

## CI4 Testing
CIUnitTestCase — base class for all tests. FeatureTestTrait — enables $this->get(), $this->post(), $this->withOutputEnabled() for testing HTTP requests. ControllerTester — enables $this->controller() for testing controller methods directly.
## Test Methods
test_homepage_returns_200() — method name must start with test_. $this->get('/') — simulate GET request. $this->assertEquals(200, $result->getStatusCode()) — assert HTTP status. $this->assertStringContainsString('Blog', $result->getBody()) — assert response body contains text.
## Running Tests
vendor/bin/phpunit — run all tests. vendor/bin/phpunit --filter BlogTest — run specific test class. vendor/bin/phpunit --filter test_homepage_returns_200 — run specific test method. vendor/bin/phpunit --coverage-text — show code coverage.

---

## Eksperimen

1. **## CI4 Testing
CIUnitTestCase — base class for all tests. FeatureTestTrait — enables $this->get(), $this->post(), $this->withOutputEnabled() for testing HTTP requests. ControllerTester — enables $this->controller() for testing controller methods directly.
## Test Methods
test_homepage_returns_200() — method name must start with test_. $this->get('/') — simulate GET request. $this->assertEquals(200, $result->getStatusCode()) — assert HTTP status. $this->assertStringContainsString('Blog', $result->getBody()) — assert response body contains text.
## Running Tests
vendor/bin/phpunit — run all tests. vendor/bin/phpunit --filter BlogTest — run specific test class. vendor/bin/phpunit --filter test_homepage_returns_200 — run specific test method. vendor/bin/phpunit --coverage-text — show code coverage.**

---

## Tantangan

Tingkatkan testing: (1) tambah test untuk method store() yang menguji form submission dengan validasi berhasil dan gagal, (2) tambah test untuk method destroy() yang menguji delete post, (3) buat unit test untuk PostModel yang menguji getPosts() dan getPostBySlug(), (4) tambah test untuk CSRF protection dan authentication filter.

---

## Ringkasan

CIUnitTestCase = base test class. FeatureTestTrait = HTTP testing. assertEquals = assert status. vendor/bin/phpunit = run tests. Lanjut: proyek akhir.
