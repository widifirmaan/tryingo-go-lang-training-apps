# Capstone: Complete Laravel Store

> **Kategori:** Laravel | **Level:** Advanced | **Minggu 12:** Capstone Project
> **Prerequisites:** Week 11 — **REST API**.

## Learning Objectives

- Combine `Eloquent` + `Blade` + `Auth` + `Storage` + `Queue` + `deploy` into a store with `products` + `cart` + `orders`

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination: Blade + API + auth + queue + tests + deploy become a store. Laravel portfolio.

---

## Program: Laravel Capstone Store

Features: product `CRUD` `Eloquent` + `Blade` + `Breeze` auth + `Storage` photos + `Queue` email + `apiResource`.

Deploy `Vercel`/`Forge` + `php artisan storage:link`.

**Task:** Deploy `shop-laravel.vercel.app` + video.



```php
<?php
// Capstone Toko: Eloquent+Blade+Auth+Storage+Queue+API dalam 1 file demo
// (asli: Model/Controller/Blade terpisah; di sini logika intinya, bisa di-run)
$produk = [
    ["id" => 1, "nama" => "Beras 5kg", "harga" => 62000, "foto" => "beras.jpg"],
    ["id" => 2, "nama" => "Minyak 2L", "harga" => 48000, "foto" => "minyak.jpg"],
];
// Eloquent stand-in: where() + create() (asli: Produk::where()->get())
function cari_produk($list, $kata) {
    $out = [];
    foreach ($list as $p) {
        if (strpos(strtolower($p["nama"]), strtolower($kata)) !== false) { $out[] = $p; }
    }
    return $out;
}
// Auth Breeze stand-in: token beri + cek (asli: Sanctum createToken/auth:sanctum)
function beri_token($nama) { return "wristband-" . $nama . "-ok"; }
function cek_token($token) { return strpos($token, "wristband-") === 0; }
// Queue stand-in: dispatch() antre, queue:work jalan belakangan (asli: Jobs)
$antrean = [];
function kirim_nota($antrean, $pesan) { $antrean[] = $pesan; return $antrean; }
// API stand-in: apiResource 5 pintu (asli: Route::apiResource)
function api_produk($list) {
    $ringkas = [];
    foreach ($list as $p) { $ringkas[] = ["id" => $p["id"], "nama" => $p["nama"]]; }
    return $ringkas;
}
// Storage (asli: store('produk','public') + storage:link)
$foto = "storage/produk/" . $produk[0]["foto"];
$token = beri_token("budi");
echo "Cari 'beras': " . count(cari_produk($produk, "beras")) . " ketemu\n";
echo "Token valid: " . (cek_token($token) ? "ya" : "tidak") . "\n";
$antrean = kirim_nota($antrean, "Nota #1 ke budi");
echo "Antrean jalan: " . count($antrean) . " nota terkirim\n";
echo "Foto: " . $foto . "\n";
echo "API: " . count(api_produk($produk)) . " produk\n";
```

*Paste into the playground → Run, see search + token + queue + API results.*

---

## Beginner Friendly Explanation

### Analogy: Laravel Store Grand Opening
- **11 weeks = building a mall**: showcase (Blade), warehouse (Eloquent), IDs (Breeze), photos (Storage), couriers (Queue), drive-thru (API).
- **Capstone = grand opening**: everything opens together + queues running + deploy. 1 jam (dead queue?) → opening fails — check the checklist!

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- CHECKLIST (CRUD + auth + API + test + deploy) then URL + video.

### 3 Must-Know Terms
- 1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** Search 'minyak' → 1 hit? Search 'kopi' → 0?
- **Yellow:** Token `'wristband-siti-ok'` → valid? `'salah'` → not?
- **Red:** Change `strpos(...)!==false` to `==true` → search breaks? Revert.

## Challenge

****Laravel Store Grand Opening:** combine `cari_produk` + `cek_token` + queue: add `keranjang` + `checkout` (check token → queue nota → clear cart).**

Green: checkout queues a nota. Yellow: no token → rejected. Red: map each function to real files (Model/Controller/Blade/Job) + deploy (Task).

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 12: **Laravel Capstone** — complete store, **Laravel 0→Expert DONE!**
