# Error Handling — Alarm C#

> **Kategori:** C# | **Level:** Lanjutan | **Minggu 8:** Error Handling

## Tujuan Pembelajaran

- `try { ... } catch (Exception ex) { ... } finally { ... }` tangkap alarm

---

## Kenapa Ini Penting Buat Kamu?

Versi intermediate sudah bisa; versi advanced untuk produksi: custom Exception + throw + using + global handler. Tanpa ini, kode menengah jebol di edge-case produksi.

---

## Program

```csharp
try {
  int stok = 0;
  if (stok == 0) throw new Exception("Stok habis");
  Console.WriteLine("Jual");
} catch (Exception ex) {
  Console.WriteLine($"Gagal: {ex.Message}");
} finally {
  Console.WriteLine("Tutup kasir");
}
```



---

## Penjelasan untuk Pemula

### Analogi: Alarm Produksi Berlapis
- Lihat Program: tiap baris ada komentar. Jalankan `dotnet run`, ubah 1 angka, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama C# W1: `.NET SDK`, `dotnet run`.

### Cara Komputer Membaca
- `class KasirException : Exception` + middleware/handler global + log.

### 3 Istilah Wajib
- 1. **Custom/global/log**: khusus/pusat/catat

## Glosarium Mini

- **Lanjutan**: alarm lanjutan produksi

## Ringkasan

Minggu 8: **Alarm C#** — `try/catch`.
