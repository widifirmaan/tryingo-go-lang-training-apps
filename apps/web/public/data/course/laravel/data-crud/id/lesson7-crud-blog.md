# Proyek CRUD: Blog Lengkap

> Laravel | Data & CRUD | Pelajaran 7

## Tujuan Pembelajaran

- Membangun CRUD lengkap dengan Route::resource
- Menggunakan paginate() + {{ $artikel->links() }}
- Mengirim flash message dengan with('sukses', ...)
- Mengisi slug otomatis dengan model event creating

---

## Program: Proyek CRUD: Blog Lengkap

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArtikelRequest;
use App\Models\Artikel;

class ArtikelController extends Controller
{
    public function index()
    {
        $artikel = Artikel::where('terbit', true)->latest()->paginate(5);

        return view('artikel.index', compact('artikel'));
    }

    public function create()
    {
        return view('artikel.create');
    }

    public function store(ArtikelRequest $request)
    {
        Artikel::create($request->validated());

        return redirect()->route('artikel.index')->with('sukses', 'Artikel berhasil dibuat.');
    }

    public function show(Artikel $artikel)
    {
        return view('artikel.show', compact('artikel'));
    }

    public function edit(Artikel $artikel)
    {
        return view('artikel.edit', compact('artikel'));
    }

    public function update(ArtikelRequest $request, Artikel $artikel)
    {
        $artikel->update($request->validated());

        return redirect()->route('artikel.show', $artikel)->with('sukses', 'Artikel diperbarui.');
    }

    public function destroy(Artikel $artikel)
    {
        $artikel->delete();

        return redirect()->route('artikel.index')->with('sukses', 'Artikel dihapus.');
    }
}

```

---

## Penjelasan

## Route::resource: CRUD Sekali Jalan
Route::resource('artikel', ArtikelController::class) membuat 7 route sekaligus (index, create, store, show, edit, update, destroy) dengan URL dan method HTTP yang konvensi. ->only([...]) membatasi. Cek php artisan route:list: nama route otomatis (artikel.index, artikel.store, artikel.destroy...).
## Pagination Bawaan
paginate(5) membungkus query: SELECT ... LIMIT 5 OFFSET 0 + menghitung total. {{ $artikel->links() }} merender navigasi halaman. Laravel menghasilkan tautan pagination yang benar tanpa menulis satu baris pun - fitur yang paling diremehkan.
## Flash Message: Satu Request Saja
with('sukses', 'Artikel berhasil dibuat') menyimpan pesan di session HANYA untuk request berikutnya (flash). setelah redirect, session('sukses') menampilkannya sekali lalu hilang. Pola UX standar: aksi → konfirmasi.
## Model Event: Slug Otomatis
Model event creating dijalankan SEBELUM record disimpan. Artikel::create tanpa slug → Str::slug($artikel->judul) mengisi otomatis. Kolom yang 'hidup sendiri' lebih baik dikelola di model, bukan controller - setiap jalur pembuatan (form, tinker, factory) mendapat perilaku yang sama.

---

## Eksperimen

1. **Route::resource: CRUD Sekali Jalan**
2. **Pagination Bawaan**
3. **Flash Message: Satu Request Saja**
4. **Model Event: Slug Otomatis**

---

## Tantangan

Perluas blog: (1) tambah pencarian ?q= di index (where('judul', 'like', '%'.$q.'%') dengan paginate->withQueryString()), (2) tambah filter kategori (relasi kategori pada artikel + select di form), (3) buat draft page /artikel/draft yang hanya menampilkan artikel belum terbit, (4) tambahkan konfirmasi hapus di blade (form DELETE + @method('DELETE')).

---

## Ringkasan

Resource = 7 route sekali. Pagination = gratis. Flash = konfirmasi. Lanjut: factories & seeders.
