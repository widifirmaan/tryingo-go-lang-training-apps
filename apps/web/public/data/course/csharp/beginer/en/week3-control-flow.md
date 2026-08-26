# Control Flow — Cabang C#

> **Kategori:** C# | **Level:** Pemula | **Minggu 3:** Control Flow

## Tujuan Pembelajaran

- `if / else if / else`, `switch`, `for`, `foreach`, `while`

---

## Program

```csharp
int nilai = 85;
if (nilai >= 90) Console.WriteLine("A");
else if (nilai >= 80) Console.WriteLine("B");
else Console.WriteLine("C");

string hari = "Jumat";
switch (hari){
  case "Jumat": Console.WriteLine("Besok libur"); break;
  default: Console.WriteLine("Kerja"); break;
}

for(int i=1; i<=5; i++) Console.WriteLine(i);
string[] buah = {"apel","mangga"};
foreach(var b in buah) Console.WriteLine(b);
```

---

## Ringkasan

Minggu 3: **Cabang C#** — `if` dan `foreach` untuk keranjang.
