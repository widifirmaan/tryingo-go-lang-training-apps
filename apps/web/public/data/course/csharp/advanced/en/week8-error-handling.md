# Error Handling — Alarm C#

> **Kategori:** C# | **Level:** Lanjutan | **Minggu 8:** Error Handling

## Tujuan Pembelajaran

- `try { ... } catch (Exception ex) { ... } finally { ... }` tangkap alarm

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

## Ringkasan

Minggu 8: **Alarm C#** — `try/catch`.
