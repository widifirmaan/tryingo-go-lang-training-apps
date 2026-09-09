# Setup & Sintaks C# — Warung Microsoft

> **Kategori:** C# | **Level:** Pemula | **Minggu 1:** Setup & Sintaks
> **Prasyarat:** Tidak ada — mulai dari nol.

## Tujuan Pembelajaran

- Instal `.NET SDK`, `dotnet --version`, `dotnet new console -n Warung`, `dotnet run`
- `Console.WriteLine`, `string nama = "Budi"`, `$"Halo {nama}"` interpolasi

---

## Kenapa Ini Penting Buat Kamu?

C# = warung Microsoft untuk kantor & toko desktop. `dotnet` seperti `cargo` Rust — 1 alat untuk semua.

---

## Program: Struk C#

```bash
dotnet new console -n Warung
cd Warung
dotnet run
```

```csharp
// Program.cs
string namaWarung = "Warung Bu Siti";
string pelanggan = "Budi";
int berasKg = 2;
int hargaPerKg = 12500;
int total = berasKg * hargaPerKg;

Console.WriteLine($"Warung: {namaWarung}");
Console.WriteLine($"Pelanggan: {pelanggan}, Total: Rp {total:N0}");
Console.WriteLine($"Tipe: {namaWarung.GetType().Name}, {berasKg.GetType().Name}");
```

`dotnet run` → lihat struk.

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Setup & Sintaks C# di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Naikkan 1 tingkat: tambah 1 kasus gagal + pesan error yang jelas.

## Ringkasan

Minggu 1: **Warung C#** — `dotnet run` struk. Minggu depan: **Tipe & Variabel**.
