# Eloquent Relationships: 1-N & N-N

> Laravel | Data & CRUD | Lesson 5

## Learning Objectives

- Define hasMany, belongsTo, and belongsToMany relationships
- Use relationships as properties: $produk->kategori (lazy loading)
- Avoid N+1 with with() (eager loading)
- Use scopes for reusable query filters

---

## Program: Eloquent Relationships: 1-N & N-N

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
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function scopeTersedia($query)
    {
        return $query->where('tersedia', true);
    }
}

```

---

## Explanation

## Relationships as a Language
Produk belongsTo Kategori (holds kategori_id), Kategori hasMany Produk (one category has many products), Produk belongsToMany Tag (many-to-many through the produk_tag pivot table). Once defined, relationships are used like properties: $produk->kategori returns a Kategori object, $produk->tags returns a Collection.
## Eager Loading vs N+1
Looping 30 products + touching $produk->kategori inside = 1 product query + 30 category queries = 31 queries (the N+1 problem). Produk::with('kategori') loads everything in 2 queries via a JOIN. Rule: inside @foreach, use with() in the controller - and watch query counts with debugbar/telescope.
## Relationship Queries
$kategori->produk()->where('tersedia', true)->get() filters the relationship's children (the full query builder remains available). Relationships chain: Produk::with('kategori.produk')->get().
## Scopes: Named Queries
scopeTersedia() enables Produk::tersedia()->get() - a filter wrapped in a descriptive name, reused across controllers. This is a key pattern of clean Eloquent code.

---

## Experiments

1. **Relationships as a Language**
2. **Eager Loading vs N+1**
3. **Relationship Queries**
4. **Scopes: Named Queries**

---

## Challenge

Strengthen relations: (1) build a Ulasan relation (produk hasMany ulasan, ulasan belongsTo produk + user) and show the average rating via withAvg, (2) add a kategoris relation on Tag (belongsToMany kategori) - yes, pivot-to-pivot relations are fine, (3) build a stats page showing product counts per category with withCount, (4) add a scopeHargaBawah(15000) and use it on a route.

---

## Summary

Relations = language. with() vs N+1. Scopes = named queries. Next: validation & form requests.
