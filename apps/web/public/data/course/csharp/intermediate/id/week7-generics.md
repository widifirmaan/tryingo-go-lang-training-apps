# Generics — Rak Serbaguna C#

> **Kategori:** C# | **Level:** Menengah | **Minggu 7:** Generics
> **Prasyarat:** Minggu 6 — **Async/Await**.

## Tujuan Pembelajaran

- `class Keranjang<T>` rak untuk tipe apa saja + `where T : Produk` batas (sumber: Microsoft Learn generics)
- Method generik `T Pertama<T>(List<T> list)`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa generics, `KeranjangString` + `KeranjangInt` 2 class sama (duplikat!). Dengan `<T>` 1 rak untuk semua + tetap ketat tipe (tidak `object` longgar yang perlu cast).

---

## Program: Rak Generik Warung

```csharp
class Keranjang<T> {
  public List<T> Items = new();
  public void Tambah(T item) => Items.Add(item);
  public T Pertama() => Items[0];
}

var ks = new Keranjang<string>();
ks.Tambah("Beras");
Console.WriteLine(string.Join(", ", ks.Items));

var ki = new Keranjang<int>();
ki.Tambah(62000);

// Batas: hanya Produk ke bawah
class Gudang<T> where T : Produk {
  public void StokRendah(List<T> list) {
    foreach (var p in list) if (p.Stok < 5) Console.WriteLine(p.Nama);
  }
}

// Method generik
static T AmbilPertama<T>(List<T> list) => list[0];
Console.WriteLine(AmbilPertama(new List<string> { "a", "b" }));
```

---

## Konsep Kunci

### `<T>` = Label Sementara
`Keranjang<string>` → `T` jadi `string` di mana-mana. Ketat, tanpa cast.

### `where T : ...` = Syarat Rak
`where T : Produk` (harus turunan), `where T : new()` (bisa `new T()`).

---

## Penjelasan untuk Pemula

### Analogi: Rak Serbaguna
- **Generics = rak adjustable**: setel `string` untuk teks, `int` untuk angka — 1 rak.

### Langkah 0 — Siapkan Device
- Sama W1.

### Cara Komputer Membaca
1. `new Keranjang<string>()` → buat versi string khusus.
2. `Tambah(123)` → error (bukan string)!

### 3 Istilah Wajib
1. **Generics/<T>/where**: serbaguna/label/syarat

---

## Eksperimen

- **Hijau:** `Keranjang<int>` + `Tambah("x")` → error?
- **Kuning:** `where T : new()` + `new T()` di dalam → bisa?
- **Merah:** Pakai `object` + cast manual vs generics → mana aman compile-time?

---

## Tantangan

**Gudang Generik:** `Keranjang<T>` + `Total<T>(List<T>, Func<T,int>)` + `where T : Produk` + 2 tipe beda.
- **Sambungan (Minggu 6 — Async/Await):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Generics/where**: serbaguna/syarat

---

## Ringkasan

Minggu 7 dari 12: **Rak Serbaguna** (Level: Menengah). 1 rak semua tipe. Minggu depan: **Error Handling**.
