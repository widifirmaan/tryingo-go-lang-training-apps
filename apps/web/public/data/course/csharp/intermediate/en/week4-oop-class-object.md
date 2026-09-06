# OOP Class & Object — Cetak Biru Kartu Warung C#

> **Kategori:** C# | **Level:** Pemula | **Minggu 4:** OOP: Class & Object

## Tujuan Pembelajaran

- `class Produk { ... }` cetak biru, `new Produk(...)` kartu, `constructor` isi awal (sumber: Microsoft Learn classes)
- `{ get; set; }` properti, `public/private`, ` : Produk` warisan, `List<Produk>` rak kartu

---

## Kenapa Ini Penting Buat Kamu?

50 produk tanpa cetak biru → tulis `nama, harga, stok` 50x. Dengan `class` tulis sekali, `new` 50 kartu — ubah rumus diskon 1 tempat. `List<Produk>` rak khusus kartu (tidak campur).

---

## Program: Kartu Produk C#

```csharp
class Produk {
  public string Nama { get; set; } = "";  // properti auto
  public decimal Harga { get; set; }
  public int Stok { get; set; }

  public Produk(string nama, decimal harga, int stok = 0) { // constructor
    Nama = nama; Harga = harga; Stok = stok;
  }

  public string Info() => $"{Nama}: Rp{Harga:N0} (stok {Stok})";
  public void Diskon(int persen) => Harga -= Harga * persen / 100;
}

class Elektronik : Produk { // warisan
  public int Garansi { get; set; }
  public Elektronik(string nama, decimal harga, int stok, int garansi)
    : base(nama, harga, stok) { Garansi = garansi; }
}

var beras = new Produk("Beras 5kg", 62000, 10);
Console.WriteLine(beras.Info());
beras.Diskon(10);
Console.WriteLine("Setelah diskon: " + beras.Info());

// Rak kartu
var rak = new List<Produk> { beras, new Produk("Bayam", 5000, 20) };
foreach (var p in rak) Console.WriteLine(p.Info());
Console.WriteLine($"Total item: {rak.Count}");
```

---

## Konsep Kunci

### `class` + `new` + Constructor
`class` biru, `new Produk(...)` kartu, constructor `public Produk(...)` isi awal.

### `{ get; set; }` = Properti
`public string Nama { get; set; }` baca-tulis. `private` kunci.

### `: Produk` = Warisan
`Elektronik : Produk` punya semua + `Garansi`. `base(...)` panggil constructor induk.

### `List<Produk>` = Rak Kartu
`new List<Produk>()`, `Add()`, `Count`, `foreach`.

---

## Penjelasan untuk Pemula

### Analogi: Cetak Biru & Rak
- **class = cetak biru**, **new = cetak kartu**, **List = rak** khusus kartu.

### Langkah 0 — Siapkan Device
- Sama W1: `dotnet run`.

### Cara Komputer Membaca
1. `new Produk("Beras", 62000, 10)` → alokasi kartu → constructor isi 3 field.
2. `beras.Diskon(10)` → `Harga` kartu itu jadi 55800.

### 3 Istilah Wajib
1. **Class/object**: biru/kartu
2. **Properti/constructor**: akses/isi awal
3. **Inheritance/List**: warisan/rak

---

## Eksperimen

- **Hijau:** `new Produk("Gula", 15000)` → `Info()`?
- **Kuning:** `rak.Add(new Produk("Kopi", 12000, 5))` → `Count` 3?
- **Merah:** `beras.Harga = -100` bisa? (Ya, belum validasi — minggu validasi!) Coba `private set`.

---

## Tantangan

**Toko OOP:** `class Keranjang { public List<Produk> Items = new(); public void Tambah(Produk p) => Items.Add(p); public decimal Total() { decimal s = 0; foreach (var i in Items) s += i.Harga; return s; } }` → isi 3 → `Total()`. **Selesai Beginner C#!**

---

## Glosarium Mini

- **class/new/get-set**: biru/kartu/akses
- **base/List**: induk/rak

---

## Ringkasan

Minggu 4 dari 4: **OOP C#** (Level: Pemula). **Selesai Beginner C#!** Lanjut: **LINQ** (Menengah).
