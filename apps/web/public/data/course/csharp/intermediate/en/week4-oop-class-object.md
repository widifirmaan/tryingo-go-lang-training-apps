# OOP Class & Object — Cetak Biru C#

> **Kategori:** C# | **Level:** Menengah | **Minggu 4:** OOP Class & Object

## Tujuan Pembelajaran

- `class Produk { public string Nama; public int Harga; }` cetak biru, `new Produk()` kartu, `get; set;` properti

---

## Program

```csharp
class Produk {
  public string Nama { get; set; }
  public int Harga { get; set; }
  public int Stok { get; set; }
  public string Info() => $"{Nama}: Rp{Harga} (stok {Stok})";
  public void Diskon(int persen) => Harga -= Harga * persen / 100;
}

var beras = new Produk { Nama = "Beras", Harga = 62000, Stok = 10 };
Console.WriteLine(beras.Info());
beras.Diskon(10);
Console.WriteLine(beras.Info());
```

---

## Ringkasan

Minggu 4: **Cetak Biru C#** — `class` + `new`.
