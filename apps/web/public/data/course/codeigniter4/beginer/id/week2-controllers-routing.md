# Controllers & Routing

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 2:** Controllers & Routing

## Tujuan Pembelajaran

- Membuat controller dengan extends BaseController
- Routing: get, post, put, delete methods
- Route parameters: (:num), (:alpha), (:any)
- Redirect: redirect()->to() dan redirect()->route()
- Named routes dengan as option

---

## Program: Route & Controller

```php
<?php
echo "=== CI4 Controllers ===<br><br>";

echo "=== Basic Controller ===<br>";
echo "namespace App\Controllers;<br>";
echo "use CodeIgniter\Controller;<br>";
echo "class Home extends BaseController {<br>";
echo "    public function index() {<br>";
echo "        return view('welcome');<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Routing ===<br>";
echo "// app/Config/Routes.php<br>";
echo "$routes->get('/', 'Home::index');<br>";
echo "$routes->get('/about', 'Page::about');<br>";
echo "$routes->get('/users', 'User::index');<br>";
echo "$routes->get('/users/(:num)', 'User::show/$1');<br>";
echo "$routes->post('/users', 'User::store');<br>";
echo "$routes->put('/users/(:num)', 'User::update/$1');<br>";
echo "$routes->delete('/users/(:num)', 'User::delete/$1');<br><br>";

echo "=== Route Simulation ===<br>";
$routes = [
    ["GET", "/", "Home::index"],
    ["GET", "/about", "Page::about"],
    ["GET", "/users", "User::index"],
    ["GET", "/users/1", "User::show (id: 1)"],
    ["POST", "/users", "User::store"],
];

foreach ($routes as [$method, $uri, $action]) {
    echo "$method $uri → $action<br>";
}

echo "<br>=== Controller with Parameters ===<br>";
echo "public function show($id) {<br>";
echo "    $data['user'] = $this->userModel->find($id);<br>";
echo "    return view('user/show', $data);<br>";
echo "}<br><br>";

echo "=== Redirect & Named Routes ===<br>";
echo "return redirect()->to('/home');<br>";
echo "$routes->add('login', 'Auth::login', ['as' => 'login']);<br>";
echo "return redirect()->route('login');<br>";
>
```

---

## Konsep Kunci

### Controller
`class Home extends BaseController`. Method `index()` sebagai default.

### Routing
`$routes->get($uri, $handler)`. Parameter: `(:num)` digit, `(:alpha)` huruf, `(:any)` apapun.

### Parameters
Route `/users/(:num)` → controller method `show($1)`.

### Redirect
`redirect()->to('/url')`, `redirect()->route('name')`, `redirect()->back()`.

### Named Routes
`$routes->add('uri', 'handler', ['as' => 'name'])`. Generate URL dengan `route()`.

---

## Eksperimen

- Buat controller dengan multiple methods
- Coba route parameters dengan (:num)
- Buat route group dengan namespace
- Implementasikan redirect after form submit
- Buat custom 404 override

---

## Tantangan

Buat controller Product dengan 5 methods: index, show, create, store, destroy. Definisikan routes untuk semua methods.

---

## Ringkasan

Minggu 2 dari 10: **Controllers & Routing** (Level: Pemula). Heart of CI4. Minggu depan: **Views & Templates**.
