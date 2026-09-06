# Generics — Rak Serbaguna C#

> **Kategori:** C# | **Level:** Lanjutan | **Minggu 7:** Generics

## Tujuan Pembelajaran

- `class Keranjang<T> { List<T> items; }` rak untuk `string` atau `int`, `where T : Produk` batas

---

## Kenapa Ini Penting Buat Kamu?

Versi intermediate sudah bisa; versi advanced untuk produksi: where T : new() + factory + variance dasar. Tanpa ini, kode menengah jebol di edge-case produksi.

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

## Penjelasan untuk Pemula

### Analogi: Rak Serbaguna Produksi
- Lihat Program: tiap baris ada komentar. Jalankan `dotnet run`, ubah 1 angka, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama C# W1: `.NET SDK`, `dotnet run`.

### Cara Komputer Membaca
- `where T : new()` + `Activator`/`new T()` + factory method `Buat<T>()`.

### 3 Istilah Wajib
- 1. **Generics/where/new()**: serbaguna/syarat/buat

## Glosarium Mini

- **Lanjutan**: rak generik lanjutan produksi

## Ringkasan

Minggu 7: **Rak Generik** — `Keranjang<T>`.
