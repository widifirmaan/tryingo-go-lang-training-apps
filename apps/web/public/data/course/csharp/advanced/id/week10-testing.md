# Testing — Cicip Warung C# Beneran

> **Kategori:** C# | **Level:** Lanjutan | **Minggu 10:** Testing

## Tujuan Pembelajaran

- `dotnet new xunit` + `[Fact]` + `Assert.Equal` cicip beneran (sumber: Microsoft Learn unit testing C#)
- `Theory` + `[InlineData]` cicip banyak sekaligus

---

## Kenapa Ini Penting Buat Kamu?

Simulasi `Console.WriteLine` tidak menangkap bug (tidak dicek mesin). xUnit beneran: ubah rumus → merah → perbaiki. Tanpa ini, "testing" pajangan.

---

## Program: Cicip Kasir Beneran

```bash
dotnet new xunit -n Warung.Test
dotnet add Warung.Test reference Warung
```

```csharp
// KasirTest.cs — beneran!
using Xunit;

public class KasirTest {
  [Fact]
  public void Hitung_DuaTambahTiga_Lima() {
    var k = new Kasir();
    Assert.Equal(5, k.Hitung(2, 3));
  }

  [Theory] // cicip banyak!
  [InlineData(62000, 10, 55800)]
  [InlineData(5000, 0, 5000)]
  [InlineData(5000, 100, 0)]
  public void Diskon_Benar(int harga, int persen, int mau) {
    var k = new Kasir();
    Assert.Equal(mau, k.Diskon(harga, persen));
  }

  [Fact]
  public void BagiNol_Meledak() {
    var k = new Kasir();
    Assert.Throws<DivideByZeroException>(() => k.Bagi(10, 0));
  }
}
```

```bash
dotnet test
# Passed! - Failed: 0, Passed: 5 — HIJAU beneran
```

---

## Konsep Kunci

### `[Fact]` / `[Theory]` = Cicip 1 / Banyak
`Fact` 1 kasus, `Theory` + `InlineData` banyak kasus 1 fungsi.

### `Assert.Equal/Throws` = Harap/Meledak
`Equal(5, hasil)` samakan, `Throws` harapkan meledak.

---

## Penjelasan untuk Pemula

### Analogi: Cicip Dapur
- **Test = cicip**: masak → cicip mesin → pas? Saji.

### Langkah 0 — Siapkan Device
- `dotnet new xunit` + `dotnet add reference` + `dotnet test`.

### Cara Komputer Membaca
1. `dotnet test` → cari `[Fact]`/`[Theory]` → jalankan → hijau/merah per kasus.

### 3 Istilah Wajib
1. **Fact/Theory/Assert**: 1/banyak/harap

---

## Eksperimen

- **Hijau:** Ubah rumus → merah? Betulkan.
- **Kuning:** Tambah `[InlineData]` ke-4 → ikut jalan?
- **Merah:** File tanpa `[Fact]` → tidak jalan? Tambah atribut.

---

## Tantangan

**Warung Teruji:** `Hitung/Diskon/Bagi` + 5 test HIJAU + screenshot.

---

## Glosarium Mini

- **xUnit/Fact/Theory**: dapur/1/banyak

---

## Ringkasan

Minggu 10 dari 12: **Cicip Beneran** (Level: Lanjutan). Tanpa simulasi. Minggu depan: **Web API**.
