# Generics — Rak Serbaguna C#

> **Kategori:** C# | **Level:** Lanjutan | **Minggu 7:** Generics

## Tujuan Pembelajaran

- `class Keranjang<T> { List<T> items; }` rak untuk `string` atau `int`, `where T : Produk` batas

---

## Program

```csharp
class Keranjang<T> {
  public List<T> Items = new();
  public void Tambah(T item) => Items.Add(item);
}

var keranjangString = new Keranjang<string>();
keranjangString.Tambah("Beras");
Console.WriteLine(string.Join(", ", keranjangString.Items));

var keranjangInt = new Keranjang<int>();
keranjangInt.Tambah(62000);
```

---

## Ringkasan

Minggu 7: **Rak Generik** — `Keranjang<T>`.
