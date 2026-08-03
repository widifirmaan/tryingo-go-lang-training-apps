# Validation & Form Requests

> Laravel | Data & CRUD | Lesson 6

## Learning Objectives

- Write a FormRequest: rules(), messages(), authorize()
- Use $request->validated() as the only source of data
- Show validation errors and old() in blade
- Understand CSRF tokens and @csrf in forms

---

## Program: Validation & Form Requests

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProdukRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'min:3', 'max:200'],
            'harga' => ['required', 'numeric', 'min:0', 'max:1000000000'],
            'stok' => ['required', 'integer', 'min:0'],
            'tersedia' => ['sometimes', 'boolean'],
            'kategori_id' => ['required', 'exists:kategoris,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama produk wajib diisi.',
            'nama.min' => 'Nama minimal 3 karakter.',
            'harga.min' => 'Harga tidak boleh negatif.',
            'kategori_id.exists' => 'Kategori tidak valid.',
        ];
    }
}

```

---

## Explanation

## FormRequest: Validation as a Class
php artisan make:request ProdukRequest creates a dedicated class. rules() returns the rule array: required, min:3, max:200, numeric, integer, exists:kategoris,id. Laravel runs validation AUTOMATICALLY before the controller is called - bad data never reaches business logic.
## validated(): The Only Data Source
$request->validated() returns ONLY the columns that passed the rules - no sneaky inputs (a second mass-assignment layer on top of $fillable). Never read the request directly in a controller when a FormRequest exists.
## Errors & old()
On validation failure: automatic redirect back + errors in the session. $errors->all() shows them all, $errors->first('nama') per column. old('nama') refills inputs - users do not retype. 422 vs redirect: HTML forms get a redirect, APIs (lesson 13) receive JSON 422.
## CSRF: A Token in Every Form
@csrf inserts a secret token; the VerifyCsrfToken middleware compares it with the session. Without a token, POST is rejected (419). This closes cross-site request forgery - forms from other sites cannot submit data on the user's behalf.

---

## Experiments

1. **FormRequest: Validation as a Class**
2. **validated(): The Only Data Source**
3. **Errors & old()**
4. **CSRF: A Token in Every Form**

---

## Challenge

Strengthen validation: (1) add a unique:nama rule on update (ignore self: unique:produks,nama,'.$produk->id), (2) write a custom stok_genap rule via Rule::custom or a closure in rules(), (3) add per-field errors with @error('nama') in blade, (4) build a UlasanRequest for a review form (isi required min:10, bintang required integer between:1,5).

---

## Summary

FormRequest = the gate. validated() = the only source. CSRF = the POST shield. Next: CRUD blog.
