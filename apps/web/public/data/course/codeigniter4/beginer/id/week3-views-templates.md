# Views & Templates

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 3:** Views & Templates

## Tujuan Pembelajaran

- View: return view() untuk render template
- Pass data ke view: $data array
- Layout: extend dan section untuk template inheritance
- View Cells: reusable view components
- Render sections: renderSection, endSection

---

## Program: View Layer

```php
<?php
echo "=== CI4 Views ===<br><br>";

echo "=== Basic View ===<br>";
echo "public function index() {<br>";
echo "    return view('home');<br>";
echo "}<br>";
echo "File: app/Views/home.php<br><br>";

echo "=== View with Data ===<br>";
echo "$data = [<br>";
echo "    'title' => 'Home Page',<br>";
echo "    'users' => $this->userModel->findAll(),<br>";
echo "];<br>";
echo "return view('home', $data);<br><br>";

echo "=== View Simulation ===<br>";
$users = [
    ["id" => 1, "name" => "Budi", "email" => "budi@mail.com"],
    ["id" => 2, "name" => "Siti", "email" => "siti@mail.com"],
];

echo "<h1>Users</h1><br>";
echo "<table border='1'><br>";
echo "<tr><th>ID</th><th>Name</th><th>Email</th></tr><br>";
foreach ($users as $user) {
    echo "<tr><br>";
    echo "  <td>{$user['id']}</td><br>";
    echo "  <td>{$user['name']}</td><br>";
    echo "  <td>{$user['email']}</td><br>";
    echo "</tr><br>";
}
echo "</table><br><br>";

echo "=== Layout/Template ===<br>";
echo "// app/Views/layouts/main.php<br>";
echo "<!DOCTYPE html><br>";
echo "<html><head><title><?= $title ?></title></head><br>";
echo "<body><br>";
echo "    <?= $this->renderSection('content') ?><br>";
echo "</body></html><br><br>";

echo "=== Extending Layout ===<br>";
echo "<?php $this->extend('layouts/main') ?><br>";
echo "<?php $this->section('content') ?><br>";
echo "    <h1>Welcome</h1><br>";
echo "<?php $this->endSection() ?><br><br>";

echo "=== View Cells ===<br>";
echo "<?= view_cell('Blog::recentPosts') ?><br>";
>
```

---

## Konsep Kunci

### View
`return view('home')` — render `app/Views/home.php`.

### Data
`return view('home', $data)` — extract $data ke variabel di view.

### Layout
`$this->extend('layouts/main')` inherit template. `$this->section('content')` inject content.

### View Cells
`view_cell('Class::method')` — reusable component dengan logic.

### Render
`renderSection()` tempat content muncul. `endSection()` tutup section.

---

## Eksperimen

- Buat view dengan data dari database
- Buat layout master dengan section header, content, footer
- Implementasikan partial views
- Buat view cell untuk sidebar
- Coba conditional display dengan if di view

---

## Tantangan

Buat layout blog: header, footer, sidebar. Buat halaman home menampilkan daftar posts dengan foreach di view.

---

## Ringkasan

Minggu 3 dari 10: **Views & Templates** (Level: Pemula). View layer CI4. Minggu depan: **Models & Database**.
