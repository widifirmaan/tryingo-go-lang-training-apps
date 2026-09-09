# Error Handling — Alarm Anti-Panik C#

> **Kategori:** C# | **Level:** Menengah | **Minggu 8:** Error Handling
> **Prasyarat:** Minggu 7 — **Generics**.

## Tujuan Pembelajaran

- `try/catch/finally` tangkap + `Exception` spesifik dulu (`FormatException` sebelum `Exception`) (sumber: Microsoft Learn exceptions)
- `throw new` buat alarm + `using` tutup otomatis (`IDisposable`)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `try/catch`, input "abc" ke harga → crash + tutup aplikasi kasir. Dengan tangkap, tampil "Harga salah" → lanjut. `using` pastikan file tertutup meski error (tanpa ini file terkunci!).

---

## Program: Kasir Anti-Crash C#

```csharp
try {
  Console.Write("Harga: ");
  int harga = int.Parse(Console.ReadLine() ?? "0"); // bisa meledak!
  if (harga <= 0) throw new Exception("Harga harus > 0");
  Console.WriteLine($"OK: Rp{harga:N0}");
}
catch (FormatException) {
  Console.WriteLine("Itu bukan angka!");
}
catch (Exception ex) {
  Console.WriteLine($"Gagal: {ex.Message}");
}
finally {
  Console.WriteLine("Kasir siap lagi");
}

// using: tutup otomatis meski error
using (var file = new StreamWriter("struk.txt")) {
  file.WriteLine("Beras 62000");
} // tertutup otomatis di sini!
```

---

## Konsep Kunci

### `try/catch/finally` = Coba/Tangkap/Selalu
`try` coba, `catch` tangkap per tipe (spesifik dulu!), `finally` selalu jalan.

### `throw new` = Bunyikan Alarm
`throw new Exception("...")` lempar ke `catch` terdekat.

### `using` = Tutup Otomatis
`using (var x = ...)` → `Dispose()` otomatis (file, koneksi DB).

---

## Penjelasan untuk Pemula

### Analogi: Jaring Pengaman Sirkus
- **try = atraksi**, **catch = jaring**, **finally = sapu panggung** (selalu).
- **using = pintu otomatis**: tutup sendiri.

### Langkah 0 — Siapkan Device
- Sama W1.

### Cara Komputer Membaca
1. `int.Parse("abc")` → lempar `FormatException` → cari `catch` cocok.
2. `using` selesai → `Dispose()` meski ada error.

### 3 Istilah Wajib
1. **try/catch/finally**: coba/tangkap/selalu
2. **throw/using**: alarm/tutup-otomatis

---

## Eksperimen

- **Hijau:** Input "abc" → "Itu bukan angka"?
- **Kuning:** `catch (Exception)` dulu baru `FormatException` → warning unreachable? Urutkan!
- **Merah:** Tanpa `using`, error sebelum `Close()` → file terkunci? Pakai `using`.

---

### Bonus: Anti-Null + Debugging (modul debugging ala freeCodeCamp!)

`NullReferenceException` = error #1 C#. Senjata: `?.` + `??` + `!` (yakin tidak null).

```csharp
string? nama = null; // string BOLEH null (nullable reference!)
Console.WriteLine(nama?.Length ?? 0); // 0, tidak meledak!
// nama.Length // ❌ NullReferenceException!
```

Debug di VS (bukan Console saja!): **F9** = breakpoint merah di baris → **F5** jalan → berhenti → arahkan mouse intip variabel → **F10** baris-berikutnya, **F11** masuk-fungsi. Error `int.Parse` tadi temukan dalam 10 detik, bukan 10 menit!

---

## Tantangan

**Kasir Aman Lengkap:** Loop input harga + `try/catch` 2 tipe + `throw` untuk <= 0 + `using` tulis struk file. **Selesai Menengah C#!**

---

## Glosarium Mini

- **try/catch/throw/using**: coba/tangkap/alarm/otomatis

---

## Ringkasan

Minggu 8 dari 12: **Alarm Anti-Panik** (Level: Menengah). **Selesai Menengah C#!** Lanjut: **Generics Lanjutan** (Advanced).
