# LINQ — Saringan Warung C#

> **Kategori:** C# | **Level:** Menengah | **Minggu 5:** LINQ

## Tujuan Pembelajaran

- `Where`, `Select`, `OrderBy` — saring rak seperti `map/filter` JS

---

## Program

```csharp
var produk = new[] { new { Nama="Beras", Harga=62000 }, new { Nama="Bayam", Harga=5000 } };
var murah = produk.Where(p => p.Harga < 20000).ToList();
var nama = produk.Select(p => p.Nama).ToList();
var urut = produk.OrderBy(p => p.Harga).ToList();

foreach(var p in murah) Console.WriteLine(p.Nama);
```

---

## Ringkasan

Minggu 5: **Saringan C#** — LINQ `Where/Select`.
