# Async/Await — Pesan Antar C#

> **Kategori:** C# | **Level:** Menengah | **Minggu 6:** Async/Await

## Tujuan Pembelajaran

- `async Task`, `await` tunggu tanpa freeze, `Task.WhenAll` bareng

---

## Program

```csharp
async Task<Produk> Ambil(string nama){
  await Task.Delay(800); // simulasi ojek
  return new Produk { Nama=nama, Harga=62000 };
}

async Task Belanja(){
  var beras = await Ambil("Beras");
  Console.WriteLine(beras.Nama);
  var tasks = new[] { Ambil("Beras"), Ambil("Bayam") };
  var semua = await Task.WhenAll(tasks);
  Console.WriteLine($"Dapat {semua.Length}");
}

await Belanja();
```

---

## Ringkasan

Minggu 6: **Pesan Antar C#** — `async/await`.
