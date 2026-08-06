# Testing dengan PHPUnit

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 9:** Testing dengan PHPUnit

## Tujuan Pembelajaran

- Unit Test: test class terpisah dari database
- Feature Test: test HTTP request dan database
- RefreshDatabase: reset database setiap test
- Assertions: assertStatus, assertViewIs, assertDatabaseHas
- Mocking: mock dependencies dengan MockInterface

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

## Konsep Kunci

### Unit Test
Test logic tanpa HTTP/database. Extend `TestCase`.

### Feature Test
Test full HTTP request: `$this->get()`, `post()`, `put()`, `delete()`. Dengan `RefreshDatabase`.

### Acting As
`$this->actingAs($user)` — authenticate user untuk test.

### Assertions
`assertStatus(200)`, `assertViewIs()`, `assertSee()`, `assertDatabaseHas()`.

### Mocking
`$this->mock(Service::class, fn($mock) => $mock->shouldReceive('method'))`.

---

## Eksperimen

- Buat factory untuk model Post
- Test dengan actingAs dan berbagai role
- Coba test upload file
- Buat test untuk API endpoint
- Implementasikan test dengan database transactions

---

## Tantangan

Buat test suite lengkap untuk CRUD Post: create, read, update, delete, unauthorized access, validation errors. Min 10 test cases.

---

## Ringkasan

Minggu 9 dari 12: **Testing dengan PHPUnit** (Level: Lanjutan). Kualitas kode terjamin. Minggu depan: **Queues & Jobs**.
