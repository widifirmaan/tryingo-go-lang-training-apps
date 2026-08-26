# Tipe Data & Variabel — Kotak Berlabel C#

> **Kategori:** C# | **Level:** Pemula | **Minggu 2:** Tipe Data & Variabel

## Tujuan Pembelajaran

- `int`, `double`, `string`, `bool`, `var` tebak, `decimal` untuk uang

---

## Program

```csharp
int umur = 25;
double tinggi = 175.5;
string nama = "Budi";
bool aktif = true;
var harga = 62000; // tebak int
decimal uang = 62000.50m; // m = decimal untuk uang presisi

Console.WriteLine($"Umur {umur}, Tinggi {tinggi}, Aktif {aktif}");
Console.WriteLine($"Uang: Rp {uang:N0} tipe {uang.GetType().Name}");
```

---

## Ringkasan

Minggu 2: **Kotak C#** — `var` dan `decimal` untuk uang.
