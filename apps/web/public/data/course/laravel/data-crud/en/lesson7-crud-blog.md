# CRUD Project: A Full Blog

> Laravel | Data & CRUD | Lesson 7

## Learning Objectives

- Build full CRUD with Route::resource
- Use paginate() + {{ $artikel->links() }}
- Send flash messages with with('sukses', ...)
- Auto-fill the slug with the creating model event

---

## Program: CRUD Project: A Full Blog

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

## Explanation

## Route::resource: CRUD in One Line
Route::resource('artikel', ArtikelController::class) creates 7 routes at once (index, create, store, show, edit, update, destroy) with conventional URLs and HTTP methods. ->only([...]) limits them. Check php artisan route:list: automatic route names (artikel.index, artikel.store, artikel.destroy...).
## Built-in Pagination
paginate(5) wraps the query: SELECT ... LIMIT 5 OFFSET 0 + a total count. {{ $artikel->links() }} renders the pager. Laravel produces correct pagination links without writing a single line - the most underrated feature.
## Flash Messages: One Request Only
with('sukses', 'Artikel berhasil dibuat') stores a message in the session for ONLY the next request (flash). after the redirect, session('sukses') shows it once and it disappears. The standard UX pattern: action → confirmation.
## Model Events: Automatic Slugs
The creating model event runs BEFORE the record is saved. Artikel::create without a slug → Str::slug($artikel->judul) fills it automatically. Self-managing columns belong in the model, not controllers - every creation path (form, tinker, factory) gets the same behavior.

---

## Experiments

1. **Route::resource: CRUD in One Line**
2. **Built-in Pagination**
3. **Flash Messages: One Request Only**
4. **Model Events: Automatic Slugs**

---

## Challenge

Extend the blog: (1) add a ?q= search on index (where('judul', 'like', '%'.$q.'%') with paginate->withQueryString()), (2) add a category filter (a kategori relation on artikel + a select in the form), (3) build a /artikel/draft page showing only unpublished articles, (4) add delete confirmation in blade (DELETE form + @method('DELETE')).

---

## Summary

Resource = 7 routes at once. Pagination = free. Flash = confirmation. Next: factories & seeders.
