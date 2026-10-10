# Validation & Form Requests

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 7:** Validation & Form Requests

## Tujuan Pembelajaran

- Validator::make dan $request->validate()
- Validation rules: required, string, email, max, min, unique
- Form Request class untuk validasi terpisah dari controller
- Custom error messages dan attribute names
- Custom validation rules dengan Rule class

---

## Program: Validasi Form

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

## Konsep Kunci

### Validator
`$request->validate($rules)` — auto-redirect dengan errors jika gagal.

### Rules
`required`, `string`, `email`, `max:255`, `min:8`, `unique:table,column`, `confirmed`.

### Form Request
Class terpisah untuk validasi complex. `php artisan make:request StorePostRequest`.

### Error Messages
Otomatis di `$errors` variable di Blade. `@error('field') {{ $message }} @enderror`.

### Custom Rules
`Rule::unique('users')->ignore($id)`, `Rule::password()->min(8)`.

---

## Eksperimen

- Buat Form Request dengan 5+ rules
- Coba conditional validation: required_if, prohibited_if
- Buat custom rule object dengn php artisan make:rule
- Implementasikan validation untuk array input
- Coba sometimes untuk conditional validation

---

## Tantangan

Buat form registrasi dengan validasi lengkap: name, email (unique), password (confirmed, min 8), phone (optional, numeric). Gunakan Form Request.

---

## Ringkasan

Minggu 7 dari 12: **Validation & Form Requests** (Level: Menengah). Input sanitization. Minggu depan: **File Storage**.
