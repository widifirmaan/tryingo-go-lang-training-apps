# API Resources & Filtering

> Laravel | APIs & Real-time | Lesson 14

## Learning Objectives

- Shape JSON responses with an API Resource (JsonResource)
- Use whenLoaded for relations without N+1
- Add filtering, search, and sorting via query parameters
- Read Laravel pagination structure (data, links, meta)

---

## Program: API Resources & Filtering

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProdukResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'harga' => (int) $this->harga,
            'stok' => $this->stok,
            'tersedia' => $this->tersedia,
            'kategori' => $this->whenLoaded('kategori', fn () => $this->kategori->nama),
            'dibuat' => $this->created_at?->toDateTimeString(),
        ];
    }
}

```

---

## Explanation

## Resource: The API Contract
ProdukResource defines the JSON SHAPE. Models have other columns (created_at etc.) - the API decides which ones leave and how they are named ('dibuat' not 'created_at'). Change the DB structure without breaking API clients: just edit the resource. A resource = the stable interface to the outside world.
## whenLoaded: Correct N+1
$this->whenLoaded('kategori') includes the relation only if it is ALREADY loaded. The controller uses Produk::with('kategori') - one join query, not one query per row. Without both: 1 + N queries. With both: 2 queries. Mismatches (with without whenLoaded = bloated data; whenLoaded without with = missing field).
## Filter, Search, Sort
All via query parameters: kategori (relation with whereHas), cari (LIKE), urut/arah (orderBy). $request->filled() distinguishes 'not sent' from 'empty'. Be careful: orderBy accepts USER input - in production, whitelist the sortable columns.
## Pagination: Part of the Contract
paginate(10) yields data + links + meta - clients know the total, the page, and the next-page URL. The next page = ?page=2. API consumers (mobile apps) do not need to know internals - just follow the links.

---

## Experiments

1. **Resource: The API Contract**
2. **whenLoaded: Correct N+1**
3. **Filter, Search, Sort**
4. **Pagination: Part of the Contract**

---

## Challenge

Level up the API: (1) add a sort whitelist (only nama/harga/stok/created_at) with in_array, otherwise -> 422, (2) create a /api/kategori endpoint (KategoriResource: id, nama, jumlah_produk from withCount) plus a ?kategori_id filter on /api/produk, (3) add a ProdukLiteResource (no relations) for lists and the full ProdukResource for details - different shapes, one data source, (4) write a README with example JSON responses before and after using resources.

---

## Summary

Resources = the API contract. whenLoaded = precise relations. Pagination = part of the contract. Next: queues & jobs.
