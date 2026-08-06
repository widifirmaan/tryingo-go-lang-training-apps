# Validation & Form Requests

> **Kategori:** Laravel | **Level:** undefined | **Minggu 7:** Validation & Form Requests

## Learning Objectives

- Validator::make and $request->validate()
- Validation rules: required, string, email, max, min, unique
- Form Request class for validation separated from controller
- Custom error messages and attribute names
- Custom validation rules with Rule class

---

## Program: Form Validation

```php
<?php
echo "=== Laravel Validation ===<br><br>";

echo "=== Validator Facade ===<br>";
echo "Validator::make($request->all(), [<br>";
echo "    'name' => 'required|string|max:255',<br>";
echo "    'email' => 'required|email|unique:users',<br>";
echo "    'password' => 'required|min:8|confirmed',<br>";
echo "    'age' => 'nullable|integer|min:17',<br>";
echo "]);<br><br>";

echo "=== Validate in Controller ===<br>";
echo "public function store(Request $request) {<br>";
echo "    $validated = $request->validate([<br>";
echo "        'title' => 'required|string|max:255',<br>";
echo "        'body' => 'required|string',<br>";
echo "        'published_at' => 'nullable|date',<br>";
echo "    ]);<br>";
echo "    Post::create($validated);<br>";
echo "}<br><br>";

echo "=== Form Request ===<br>";
echo "class StorePostRequest extends FormRequest {<br>";
echo "    public function rules(): array {<br>";
echo "        return [<br>";
echo "            'title' => 'required|string|max:255',<br>";
echo "            'body' => 'required|string',<br>";
echo "        ];<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Validation Simulation ===<br>";
$inputs = [
    "title" => "",
    "email" => "invalid-email",
    "password" => "123",
    "age" => "15",
];

$rules = [
    "title" => "required|string|max:255",
    "email" => "required|email",
    "password" => "required|min:8",
    "age" => "nullable|integer|min:17",
];

$errors = [];
if (empty($inputs['title'])) {
    $errors['title'][] = "The title field is required.";
}
if (!filter_var($inputs['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'][] = "The email must be a valid email address.";
}
if (strlen($inputs['password']) < 8) {
    $errors['password'][] = "The password must be at least 8 characters.";
}
if ($inputs['age'] !== null && (int)$inputs['age'] < 17) {
    $errors['age'][] = "The age must be at least 17.";
}

echo "Validation errors:<br>";
foreach ($errors as $field => $msgs) {
    foreach ($msgs as $msg) {
        echo "  - $field: $msg<br>";
    }
}

echo "<br>=== Custom Rules ===<br>";
echo "Rule::unique('users')->ignore($user->id);<br>";
echo "Rule::in(['admin', 'user', 'moderator']);<br>";
echo "Rule::password()->min(8)->mixedCase()->numbers();<br>";
>
```

---

## Key Concepts

### Validator
`$request->validate($rules)` — auto-redirects with errors on failure.

### Rules
`required`, `string`, `email`, `max:255`, `min:8`, `unique:table,column`.

### Form Request
Separate class for complex validation. `php artisan make:request`.

### Error Messages
Auto in `$errors` variable. `@error('field') {{ $message }} @enderror`.

### Custom Rules
`Rule::unique()->ignore($id)`, `Rule::password()->min(8)`.

---

## Experiments

- Create Form Request with 5+ rules
- Try conditional validation: required_if, prohibited_if
- Create custom rule object with php artisan make:rule
- Implement validation for array input
- Try sometimes for conditional validation

---

## Challenge

Create a registration form with complete validation: name, email (unique), password (confirmed, min 8), phone (optional, numeric). Use Form Request.

---

## Summary

Week 7 of 12: **Validation & Form Requests** (Level: Intermediate). Input sanitization. Next week: **File Storage**.
