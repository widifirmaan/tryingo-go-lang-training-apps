# Validation & Form Handling

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 6:** Validation & Form Handling

## Learning Objectives

- Validation rules: required, min_length, max_length, valid_email
- Validate in controller: $this->validate()
- Display errors: $this->validator->getErrors()
- Custom error messages per field
- Flash data: withInput, with errors

---

## Program: Form Validation

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

## Key Concepts

### Validation Rules
`required`, `min_length[3]`, `valid_email`, `matches[field]`.

### Validate
`$this->validate($rules)` returns false on failure.

### Errors
`$this->validator->getErrors()` — array of error messages.

### Flash Data
`withInput()` retains input, `with('errors', $errors)` stores errors.

### Display
Loop `session('errors')` in view. `esc()` for output escaping.

---

## Experiments

- Create form with 5+ validation rules
- Try custom validation class
- Implement AJAX validation
- Create regex_match for custom formats
- Try permit_empty for optional fields

---

## Challenge

Create a registration form with complete validation: username (min 3), email (valid, unique), password (min 8), password confirm (matches).

---

## Summary

Week 6 of 10: **Validation & Form Handling** (Level: Intermediate). Input sanitization. Next week: **Authentication**.
