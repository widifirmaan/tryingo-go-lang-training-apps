# Design Patterns — Pola Warung Rapi C#

> **Kategori:** C# | **Level:** Lanjutan | **Minggu 9:** Design Patterns
> **Prasyarat:** Minggu 8 — **Error Handling**.

## Tujuan Pembelajaran

- `Strategy` colokan ganti cara bayar tanpa `if` 20x, `Singleton` 1 kasir utama, `Repository` tukang gudang (sumber: refactoring.guru/design-patterns/csharp)

---

## Kenapa Ini Penting Buat Kamu?

Tambah QRIS dengan `if` 20x → ubah 20 tempat, lupa 1 = bug. Dengan `Strategy`, tambah 1 class. `Repository` pisahkan SQL dari logika — ganti DB tanpa ubah kasir.

---

## Program: Pola Bayar Warung

```csharp
// Strategy: 1 colokan, banyak cara
interface IBayar { void Bayar(decimal total); }

class Tunai : IBayar {
  public void Bayar(decimal total) => Console.WriteLine($"Tunai Rp{total:N0}");
}
class Transfer : IBayar {
  public void Bayar(decimal total) => Console.WriteLine($"Transfer Rp{total:N0}");
}

class Kasir {
  private readonly IBayar _cara;
  public Kasir(IBayar cara) { _cara = cara; } // suntik colokan!
  public void Checkout(decimal total) => _cara.Bayar(total);
}

var k1 = new Kasir(new Tunai());
k1.Checkout(62000);
var k2 = new Kasir(new Transfer());
k2.Checkout(62000);

// Singleton: 1 kasir utama
class KasirUtama {
  private static KasirUtama? _satu;
  private KasirUtama() {}
  public static KasirUtama Ambil() => _satu ??= new KasirUtama();
}
Console.WriteLine(KasirUtama.Ambil() == KasirUtama.Ambil()); // True
```

---

## Konsep Kunci

### `Strategy` = Colokan
`Kasir(IBayar cara)` terima apa saja yang pas. Tambah `Qris` tanpa ubah `Kasir`.

### `Singleton` = 1 Saja
`private` constructor + `static Ambil()` — `new` dari luar ditolak.

### `Repository` = Tukang Gudang
`interface IRepo { List<Produk> Semua(); }` — kasir tidak tahu SQL.

---

## Penjelasan untuk Pemula

### Primer Interface 2 Menit (wajib sebelum pola!)
```csharp
interface IBayar { void Bayar(decimal total); } // KONTRAK: harus bisa Bayar!
class Tunai : IBayar { // tanda tangan kontrak
  public void Bayar(decimal total) => Console.WriteLine($"Tunai Rp{total:N0}");
}
// interface = janji tanpa isi; class WAJIB isi semua. Beda abstract class:
// interface boleh multi-warisi (class A : IA, IB), abstract class cuma 1 induk!
```

### Analogi: Colokan & Kasir Utama
- **Strategy = colokan listrik**: colok Tunai/Transfer, kasir sama.
- **Singleton = kasir utama**: cuma 1 di toko.

### Langkah 0 — Siapkan Device
- Sama W1: `dotnet run`.

### Cara Komputer Membaca
1. `new Kasir(new Tunai())` → simpan cara.
2. `Checkout(62000)` → panggil `cara.Bayar()` (polimorfisme).

### 3 Istilah Wajib
1. **Strategy/Singleton**: colokan/1-saja
2. **Interface**: kontrak colokan

---

## Eksperimen

- **Hijau:** Tambah `class Qris : IBayar` → `new Kasir(new Qris())` tanpa ubah `Kasir`?
- **Kuning:** `new KasirUtama()` langsung → error `private`?
- **Merah:** 20 `if` vs Strategy — tambah cara ke-21, mana 1 tempat?

---

## Tantangan

**Warung Pola Lengkap:** `IBayar` + 3 cara + `Kasir` + test 3 + `Singleton` log.

---

## Glosarium Mini

- **Strategy/Singleton/Repository**: colokan/1/tukang

---

## Ringkasan

Minggu 9 dari 12: **Pola Rapi** (Level: Lanjutan). Tambah tanpa ubah lama. Minggu depan: **Testing**.
