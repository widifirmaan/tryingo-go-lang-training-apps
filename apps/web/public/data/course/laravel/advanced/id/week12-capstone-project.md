# Capstone: Toko Laravel Lengkap

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 12:** Capstone Project
> **Prasyarat:** Minggu 11 — **REST API**.

## Tujuan Pembelajaran

- Gabung `Eloquent` + `Blade` + `Auth` + `Storage` + `Queue` + `deploy` jadi toko `produk` + `keranjang` + `pesanan`

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: Blade + API + auth + queue + test + deploy jadi toko. Portfolio Laravel.

---

## Program: Toko Capstone Laravel

Fitur: `produk` CRUD `Eloquent` + `Blade` + `Breeze` auth + `Storage` foto + `Queue` email + `apiResource`.

Deploy `Vercel`/`Forge` + `php artisan storage:link`.

**Tugas:** Deploy `warung-laravel.vercel.app` + video.



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

*Tempel di playground → Run, lihat hasil cari + token + antrean + API.*

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Toko Laravel
- **11 minggu = bangun mal**: etalase (Blade), gudang (Eloquent), KTP (Breeze), foto (Storage), kurir (Queue), drive-thru (API).
- **Capstone = grand opening**: semua buka bareng + antrean jalan + deploy. 1 macet (queue mati?) → opening gagal — cek checklist!

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- CHECKLIST (CRUD + auth + API + test + deploy) lalu URL + video.

### 3 Istilah Wajib
- 1. **Capstone/deploy**: gabung/buka

---

## Eksperimen

- **Hijau:** Cari 'minyak' → 1 ketemu? Cari 'kopi' → 0?
- **Kuning:** Token `'wristband-siti-ok'` → valid? Token `'salah'` → tidak?
- **Merah:** Hapus `strpos(...)!==false` jadi `==true` → cari gagal? Kembalikan.

## Tantangan

****Toko Laravel Grand Opening:** gabungkan `cari_produk` + `cek_token` + antrean: tambah `keranjang` + `checkout` (cek token → antre nota → kosongkan keranjang).**

Hijau: checkout isi nota antrean. Kuning: tanpa token → ditolak. Merah: petakan tiap fungsi ke file asli (Model/Controller/Blade/Job) + deploy (Tugas).

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 12: **Capstone Laravel** — toko lengkap, **Selesai Laravel 0→Ahli!**
