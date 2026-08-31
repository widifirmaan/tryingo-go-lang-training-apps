# Relationships — Tali Antar Rak Laravel

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 6:** Relationships

## Tujuan Pembelajaran

- `hasMany`, `belongsTo` — `Produk hasMany Pesanan`, `Pesanan belongsTo Produk`

---

## Program

```php
// app/Models/Produk.php
class Produk extends Model {
  public function pesanans(){ return $this->hasMany(Pesanan::class); }
}
// app/Models/Pesanan.php
class Pesanan extends Model {
  public function produk(){ return $this->belongsTo(Produk::class); }
}

$produk = Produk::with('pesanans')->find(1);
echo $produk->nama . " dipesan " . $produk->pesanans->count() . "x";

$pesanan = Pesanan::with('produk')->first();
echo $pesanan->produk->nama;
```

---

## Ringkasan

Minggu 6: **Tali Rak** — `hasMany`/`belongsTo`.
