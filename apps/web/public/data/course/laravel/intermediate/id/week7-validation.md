# Validasi — Satpam Laravel Lanjutan

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 7:** Validasi

## Tujuan Pembelajaran

- `FormRequest` satpam terpisah: `php artisan make:request StoreProdukRequest` + `rules()` + `messages()`

---

## Program

```bash
php artisan make:request StoreProdukRequest
```

```php
// app/Http/Requests/StoreProdukRequest.php
public function rules(){
  return [
    'nama' => 'required|min:3',
    'harga' => 'required|numeric|min:1',
    'stok' => 'required|integer|min:0'
  ];
}
public function messages(){
  return ['nama.required' => 'Nama wajib', 'harga.min' => 'Harga minimal 1'];
}

// Controller
public function store(StoreProdukRequest $req){
  Produk::create($req->validated());
  return redirect('/produk');
}
```

View: `@error('nama') <span>{{ $message }}</span> @enderror`.

---

## Ringkasan

Minggu 7: **Satpam Terpisah** — FormRequest.
