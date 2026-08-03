# Migrations & Eloquent Basics

> Laravel | Laravel Fundamentals | Lesson 4

## Learning Objectives

- Create tables with migrations (schema versioning) and run them
- Write an Eloquent Model: $fillable, $casts, basic queries
- Use route model binding: {produk} → Produk $produk
- Run the make:migration and tinker artisan commands

---

## Program: Migrations & Eloquent Basics

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia', 'kategori_id'];

    protected $casts = [
        'tersedia' => 'boolean',
        'harga' => 'decimal:2',
    ];
}

```

---

## Explanation

## Migration: Schema as Version Control
A migration = a PHP file describing a schema change, executed with php artisan migrate. Tables are built from code, not hand-written SQL. This keeps teams in sync: everyone runs migrate and gets the same database. down() undoes the change (rollback).
## Eloquent: Model = Table
class Produk extends Model → a Produk object represents a row of the produks table. Zero config: pluralized class name = table name (Produk → produks). $fillable = the columns allowed for mass assignment (mass-assignment security). $casts = automatic transformation: tersedia becomes boolean, harga becomes decimal.
## A Human Query Builder
Produk::all() (all rows), Produk::find(1), Produk::where('stok', '>', 0)->get(), count(), firstOrFail(). Every query returns a Collection - loop it directly in blade.
## Route Model Binding
{produk} + type hint Produk $produk → Laravel automatically looks up Produk::findOrFail($id) - missing records auto-404. Without binding you would hand-write lookups in every controller.

---

## Experiments

1. **Migration: Schema as Version Control**
2. **Eloquent: Model = Table**
3. **A Human Query Builder**
4. **Route Model Binding**

---

## Challenge

Build a second model: (1) create an ulasans table migration (produk_id FK, isi text, bintang 1-5) + an Ulasan model, (2) show reviews on the product detail page with @forelse, (3) add scopeTersedia() to Produk and use it on the /produk route, (4) add a diskon_persen (nullable) column via a NEW migration - never edit old migrations!

---

## Summary

Migrations = versioned schema. Eloquent = tables as objects. Binding = auto-404. Next: relationships.
