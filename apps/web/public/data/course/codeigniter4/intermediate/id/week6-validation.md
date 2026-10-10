# Validation & Form Handling

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 6:** Validation & Form Handling

## Tujuan Pembelajaran

- Validation rules: required, min_length, max_length, valid_email
- Validate di controller: $this->validate()
- Display errors: $this->validator->getErrors()
- Custom error messages per field
- Flash data: withInput, with errors

---

## Program: Validasi Form

```php
<?php
echo "=== CI4 Validation ===<br><br>";

echo "=== Validation Rules ===<br>";
echo "$rules = [<br>";
echo "    'username' => 'required|min_length[3]|max_length[20]',<br>";
echo "    'email' => 'required|valid_email',<br>";
echo "    'password' => 'required|min_length[8]',<br>";
echo "    'pass_confirm' => 'required|matches[password]',<br>";
echo "];<br><br>";

echo "=== Validate in Controller ===<br>";
echo "public function store() {<br>";
echo "    if (!$this->validate($rules)) {<br>";
echo "        return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());<br>";
echo "    }<br>";
echo "    // Process data<br>";
echo "}<br><br>";

echo "=== Validation Simulation ===<br>";
$inputs = [
    "username" => "",
    "email" => "invalid-email",
    "password" => "123",
];

$errors = [];
if (empty($inputs['username'])) {
    $errors[] = "The username field is required.";
}
if (!filter_var($inputs['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "The email field must contain a valid email address.";
}
if (strlen($inputs['password']) < 8) {
    $errors[] = "The password field must be at least 8 characters in length.";
}

echo "Validation errors:<br>";
foreach ($errors as $error) {
    echo "  - $error<br>";
}

echo "<br>=== Custom Rules ===<br>";
echo "$custom = [<br>";
echo "    'slug' => 'required|regex_match[a-z0-9-]+',<br>";
echo "    'age' => 'required|numeric|greater_than[17]',<br>";
echo "];<br><br>";

echo "=== Displaying Errors ===<br>";
echo "<?php if (session()->has('errors')) : ?><br>";
echo "    <?php foreach (session('errors') as $error) : ?><br>";
echo "        <p><?= esc($error) ?></p><br>";
echo "    <?php endforeach ?><br>";
echo "<?php endif ?><br>";
>
```

---

## Konsep Kunci

### Validation Rules
`required`, `min_length[3]`, `max_length[20]`, `valid_email`, `matches[field]`.

### Validate
`$this->validate($rules)` — return false jika gagal. Auto-redirect.

### Errors
`$this->validator->getErrors()` — array error messages.

### Flash Data
`withInput()` retain input, `with('errors', $errors)` store errors.

### Display
Loop `session('errors')` di view. `esc()` untuk escape output.

---

## Eksperimen

- Buat form dengan 5+ validation rules
- Coba custom validation class
- Implementasikan AJAX validation
- Buat regex_match untuk format khusus
- Coba permit_empty untuk field optional

---

## Tantangan

Buat form registrasi dengan validasi lengkap: username (min 3), email (valid, unique), password (min 8), password confirm (matches).

---

## Ringkasan

Minggu 6 dari 10: **Validation & Form Handling** (Level: Menengah). Input sanitization. Minggu depan: **Authentication**.
