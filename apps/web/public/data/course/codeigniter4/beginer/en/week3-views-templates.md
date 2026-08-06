# Views & Templates

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 3:** Views & Templates

## Learning Objectives

- View: return view() to render templates
- Pass data to view: $data array
- Layouts: extend and section for template inheritance
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

## Key Concepts

### Views
`return view('home')` renders `app/Views/home.php`.

### Data
`return view('home', $data)` extracts $data to view variables.

### Layouts
`$this->extend('layouts/main')` inherits template. `$this->section('content')` injects content.

### View Cells
`view_cell('Class::method')` — reusable components.

### Render
`renderSection()` where content appears. `endSection()` closes section.

---

## Experiments

- Create view with data from database
- Create master layout with header, content, footer sections
- Implement partial views
- Create view cell for sidebar
- Try conditional display with if in view

---

## Challenge

Create a blog layout: header, footer, sidebar. Create home page displaying post list with foreach in view.

---

## Summary

Week 3 of 10: **Views & Templates** (Level: Beginner). View layer of CI4. Next week: **Models & Database**.
