# Tipe Data & Variabel — Kotak Berlabel C#

> **Kategori:** C# | **Level:** Pemula | **Minggu 2:** Tipe Data & Variabel

## Tujuan Pembelajaran

- Kotak berlabel: `int` bulat, `double` koma, `string` teks, `bool` ya/tidak, `decimal` uang presisi (sumber: Microsoft Learn C# types)
- `var` tebak otomatis: `var harga = 62000` → `int`
- `$"Halo {nama}"` interpolasi dan `GetType().Name` cek tipe

---

## Kenapa Ini Penting Buat Kamu?

Harga `62000` jika pakai `double` bisa `61999.9999` (presisi biner) — kasir rugi sen. C# punya `decimal` khusus uang (`62000.50m`). Salah tipe = struk salah.

---

## Program: Kotak Kasir C#

```bash
dotnet new console -n Kasir
cd Kasir
dotnet run
```

```csharp
// Program.cs
int umur = 25;
double tinggi = 175.5;
string nama = "Budi";
bool aktif = true;
var harga = 62000;          // tebak: int
decimal uang = 62000.50m;   // m = decimal, untuk uang!

Console.WriteLine($"Nama: {nama}, Umur: {umur}");
Console.WriteLine($"Harga: Rp {harga:N0} (tipe {harga.GetType().Name})");
Console.WriteLine($"Uang: Rp {uang:N0} (tipe {uang.GetType().Name})");
Console.WriteLine($"Aktif: {aktif}, Tinggi: {tinggi}");

// var tebak, tapi tetap ketat setelah tebak
// harga = "mahal"; // ERROR: tidak bisa string ke int
```

---

## Konsep Kunci

### `int/double/string/bool/decimal`
- `int` bulat, `double` koma (biner, jangan untuk uang), `decimal` koma presisi (`m`).
- `string` teks `"Budi"`, `bool` `true/false`.

### `var` = Tebak Sekali, Kunci Selamanya
`var harga = 62000` → `int` selamanya. Beda JS `let` yang longgar.

### `$"..."` + `:N0`
`$"Halo {nama}"` interpolasi, `{uang:N0}` format ribuan `62.000`.

---

## Penjelasan untuk Pemula

### Analogi: Kotak Berlabel Toko
- **`int` = kotak angka bulat**, **`decimal` = brankas uang** (presisi), **`var` = stempel tebak** yang langsung jadi label permanen.

### Langkah 0 — Siapkan Device
- Sama W1: `.NET SDK`, `dotnet --version` 8.x, `dotnet run`.

### Cara Komputer Membaca
1. `var harga = 62000` → tebak `int` → kunci.
2. `$"Rp {harga:N0}"` → ambil 62000 → format `62.000`.

### 3 Istilah Wajib
1. **decimal**: uang presisi (`m`)
2. **var**: tebak lalu kunci
3. **Interpolasi `$""`**: tempel variabel

---

## Eksperimen

- **Hijau:** `decimal ongkir = 8500.75m;` → cetak?
- **Kuning:** `var x = 5; x = "halo";` → error?
- **Merah:** `double d = 0.1 + 0.2; Console.WriteLine(d);` → `0.30000000000000004`? Ganti `decimal` → `0.3` pas!

---

## Tantangan

**Struk C#:** `string pelanggan = "Siti"; decimal beras = 62000, ongkir = 8500.50m; decimal total = beras + ongkir;` → `$"{pelanggan} total Rp {total:N0}"` + `GetType().Name` tiap variabel.

---

## Glosarium Mini

- **int/double/decimal**: bulat/koma/uang
- **var**: tebak tipe
- **$""**: interpolasi

---

## Ringkasan

Minggu 2 dari 4: **Tipe C#** (Level: Pemula). Bisa kotak berlabel + uang presisi. Minggu depan: **Control Flow** — cabang & ulang.
