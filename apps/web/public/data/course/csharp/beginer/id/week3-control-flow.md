# Control Flow — Cabang & Ulang Warung C#

> **Kategori:** C# | **Level:** Pemula | **Minggu 3:** Control Flow
> **Prasyarat:** Minggu 2 — **Tipe Data & Variabel**.

## Tujuan Pembelajaran

- `if / else if / else`, `switch` dengan `break`, `for`, `while`, `foreach` untuk `List`/`array` (sumber: Microsoft Learn selection & iteration statements)

---

## Kenapa Ini Penting Buat Kamu?

Nilai 85 → B, stok 0 → "Habis", hitung 30 barang — tanpa `if`/`foreach` tulis manual. `switch` C# wajib `break` (tidak seperti Go) — lupa = error compile, aman.

---

## Program: Kasir Otomatis C#

```csharp
int nilai = 85;
if (nilai >= 90) Console.WriteLine("Grade: A");
else if (nilai >= 80) Console.WriteLine("Grade: B");
else Console.WriteLine("Grade: C");

string hari = "Jumat";
switch (hari) {
  case "Jumat": Console.WriteLine("Besok libur!"); break;
  case "Senin": Console.WriteLine("Semangat!"); break;
  default: Console.WriteLine("Hari kerja"); break;
}

Console.Write("Hitung 1-5: ");
for (int i = 1; i <= 5; i++) Console.Write($"{i} ");
Console.WriteLine();

string[] buah = { "apel", "mangga", "pisang" };
foreach (var b in buah) Console.WriteLine($"Buah: {b}");

// Nyata: total yang stok ada
var keranjang = new[] {
  new { Nama = "Beras", Harga = 62000, Ada = true },
  new { Nama = "Gula", Harga = 15000, Ada = false },
};
int total = 0;
foreach (var item in keranjang) {
  if (!item.Ada) continue;
  total += item.Harga;
}
Console.WriteLine($"Total beli: Rp {total:N0}");
```

---

## Konsep Kunci

### `if / else if / else` = Cabang
Cek atas → bawah, berhenti saat true.

### `switch` + `break` Wajib
C# error jika `case` tanpa `break` (kecuali kosong bertumpuk). Aman dari bocor JS.

### `for` vs `foreach`
- `for (int i=1; i<=5; i++)` tahu jumlah.
- `foreach (var b in buah)` langsung barang.

### `continue` / `break`
`continue` loncat 1, `break` keluar.

---

## Penjelasan untuk Pemula

### Analogi: Satpam & Cek Rak
- **`if` = satpam**: "Stok >0? Silakan."
- **`foreach` = cek rak**: ambil tiap barang.

### Langkah 0 — Siapkan Device
- Sama W1: `dotnet run`.

### Cara Komputer Membaca
1. `if (85>=90)`? tidak → `else if (85>=80)` ya → "B".
2. `foreach` 3x, `continue` loncat Gula (`Ada=false`).

### 3 Istilah Wajib
1. **Kondisi/loop**: tanya/ulang
2. **break/continue**: keluar/loncat
3. **foreach**: untuk tiap

---

## Eksperimen

- **Hijau:** `nilai = 95` → A? `hari = "Senin"` → Semangat?
- **Kuning:** `for (int i = 10; i >= 1; i--)` mundur?
- **Merah:** Hapus `break` di `case "Jumat"` → error compile `Control cannot fall through`? Pasang lagi.

---

## Tantangan

**Tebak Stok:** `int rahasia = 7; int[] tebak = {3, 9, 7}; foreach (int t in tebak) { if (t == rahasia) { Console.WriteLine("Benar!"); break; } else if (t < rahasia) Console.WriteLine($"{t} kekecilan"); else Console.WriteLine($"{t} kebesaran"); }`

---

## Glosarium Mini

- **if/switch**: cabang
- **for/foreach/while**: ulang
- **break/continue**: keluar/loncat

---

## Ringkasan

Minggu 3 dari 4: **Kontrol C#** (Level: Pemula). Bisa cabang & ulang. Minggu depan: **OOP** — cetak biru.
