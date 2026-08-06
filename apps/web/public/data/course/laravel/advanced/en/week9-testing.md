# Testing with PHPUnit

> **Kategori:** Laravel | **Level:** undefined | **Minggu 9:** Testing with PHPUnit

## Learning Objectives

- Unit Test: test classes separate from database
- Feature Test: test HTTP requests and database
- RefreshDatabase: reset database each test
- Assertions: assertStatus, assertViewIs, assertDatabaseHas
- Mocking: mock dependencies with MockInterface

---

## Program: Feature & Unit Test

```php
<?php
echo "=== Laravel Testing ===<br><br>";

echo "=== Unit Test ===<br>";
echo "class CalculatorTest extends TestCase {<br>";
echo "    public function test_add() {<br>";
echo "        $result = app(Calculator::class)->add(2, 3);<br>";
echo "        $this->assertEquals(5, $result);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Feature Test ===<br>";
echo "class PostTest extends TestCase {<br>";
echo "    use RefreshDatabase;<br>";
echo "    <br>";
echo "    public function test_create_post() {<br>";
echo "        $user = User::factory()->create();<br>";
echo "        $response = $this->actingAs($user)->post('/posts', [<br>";
echo "            'title' => 'Test Post',<br>";
echo "            'body' => 'Content here',<br>";
echo "        ]);<br>";
echo "        $response->assertStatus(201);<br>";
echo "        $this->assertDatabaseHas('posts', ['title' => 'Test Post']);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== HTTP Tests ===<br>";
echo "$response = $this->get('/posts');<br>";
echo "$response->assertStatus(200);<br>";
echo "$response->assertViewIs('posts.index');<br>";
echo "$response->assertSee('Belajar Laravel');<br>";
echo "$response->assertJson(['status' => 'ok']);<br><br>";

echo "=== Database Testing ===<br>";
echo "$this->assertDatabaseHas('users', ['email' => 'test@mail.com']);<br>";
echo "$this->assertDatabaseMissing('users', ['email' => 'gone@mail.com']);<br>";
echo "$this->assertSoftDeleted('posts', ['id' => 1]);<br><br>";

echo "=== Mocking ===<br>";
echo "$mock = $this->mock(PaymentService::class, function ($mock) {<br>";
echo "    $mock->shouldReceive('charge')->once()->andReturn('success');<br>";
echo "});<br><br>";

echo "=== Test Simulation ===<br>";
$tests = [
    ["test_create_post", "PASS"],
    ["test_list_posts", "PASS"],
    ["test_update_post", "PASS"],
    ["test_delete_post", "PASS"],
    ["test_unauthorized_access", "PASS"],
];

foreach ($tests as [$name, $result]) {
    echo "  $result: $name<br>";
}
echo "<br>All 5 tests passed!<br>";
>
```

---

## Key Concepts

### Unit Test
Test logic without HTTP/database. Extend `TestCase`.

### Feature Test
Test full HTTP requests: `$this->get()`, `post()`. With `RefreshDatabase`.

### Acting As
`$this->actingAs($user)` — authenticate user for tests.

### Assertions
`assertStatus()`, `assertViewIs()`, `assertSee()`, `assertDatabaseHas()`.

### Mocking
`$this->mock(Service::class, fn($mock) => ...)`.

---

## Experiments

- Create factory for Post model
- Test with actingAs and various roles
- Try file upload test
- Create test for API endpoint
- Implement test with database transactions

---

## Challenge

Create a complete test suite for Post CRUD: create, read, update, delete, unauthorized access, validation errors. Min 10 test cases.

---

## Summary

Week 9 of 12: **Testing with PHPUnit** (Level: Advanced). Code quality guaranteed. Next week: **Queues & Jobs**.
