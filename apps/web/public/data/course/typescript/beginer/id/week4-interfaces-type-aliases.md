# Interfaces & Type Aliases — Cetak Biru Kartu

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 4:** Interfaces & Type Aliases

## Tujuan Pembelajaran

- Bedakan `type` vs `interface` — kapan pakai mana
- Buat cetak biru `interface Produk { nama: string; harga: number; stok?: number }`
- `extends` untuk warisan: `Member extends Pelanggan`
- `readonly` dan `optional` field
- Index signature untuk kamus `Record<string, number>`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa cetak biru, tiap kartu produk tulis manual `nama: string, harga: number` 20x — typo `harag` lolos. Dengan `interface Produk` tulis sekali, semua kartu ikut stiker yang sama. Ubah `harga` jadi `hargaJual`, error muncul di semua tempat yang lupa ganti — aman.

---

## Program: Kartu Warung Bercetak Biru

```typescript
// 1. Interface — cetak biru kartu
interface Produk {
  readonly id: number;      // tidak boleh ubah setelah buat
  nama: string;
  harga: number;
  stok?: number;            // ? = boleh tidak ada
  kategori: "sembako" | "sayur" | "protein";
}

const beras: Produk = {
  id: 1,
  nama: "Beras 5kg",
  harga: 62000,
  kategori: "sembako",
  // stok tidak wajib
};
console.log("Produk:", beras);
// beras.id = 2; // ❌ readonly

// 2. Extends — warisan
interface Pelanggan {
  nama: string;
  hp: string;
}
interface Member extends Pelanggan {
  poin: number;
  level: "silver" | "gold";
}
const member: Member = { nama: "Budi", hp: "081", poin: 120, level: "gold" };
console.log("\nMember:", member);

// 3. Type alias untuk singkatan & union
type Status = "ada" | "habis";
type Harga = number; // alias

// 4. Index signature — kamus stok
type StokMap = { [nama: string]: number }; // kunci string, nilai number
const stok: StokMap = { beras: 10, telur: 5 };
console.log("\nStok beras:", stok["beras"]);

// 5. Contoh nyata: hitung pakai cetak biru
function totalBelanja(items: Produk[]): number {
  return items.reduce((s, p) => s + p.harga * (p.stok ?? 1), 0);
  // p.stok ?? 1 → jika stok undefined pakai 1
}
console.log("\nTotal:", totalBelanja([beras, { id: 2, nama: "Bayam", harga: 5000, kategori: "sayur", stok: 2 }]));

// 6. Pick & Omit preview (minggu 7 detail)
type Ringkas = Pick<Produk, "nama" | "harga">; // hanya 2 field
const ringkas: Ringkas = { nama: "Gula", harga: 15000 };
console.log("Ringkas:", ringkas);
```

---

## Konsep Kunci

### `interface` vs `type`
- `interface` untuk **objek/bentuk**, bisa `extends` dan di-merge.
- `type` untuk **alias, union, tuple, fungsi**.
- Untuk kartu warung, **pakai `interface`** lebih idiomatik.

### `readonly` & `?`
- `readonly id` tidak boleh ubah.
- `stok?: number` boleh tidak ada (`number | undefined`).

### `extends`
`Member extends Pelanggan` → punya semua field Pelanggan + tambahan.

### Index Signature
`{ [key: string]: number }` kamus bebas kunci string.

---

## Penjelasan untuk Pemula

### Analogi: Cetak Biru

- **Interface = cetak biru rumah**: gambar `nama`, `harga`, `kategori` — tukang (TS) cek tiap rumah ikut biru.
- **`extends` = cetak biru tambahan**: rumah Member = rumah Pelanggan + lantai 2 (poin).
- **`readonly` = fondasi cor**: tidak bisa geser setelah jadi.
- **`?` = opsional**: garasi boleh ada/tidak.

### 3 Istilah Wajib

1. **Interface**: cetak biru objek
2. **Extends**: warisan
3. **Optional `?`**: boleh tidak ada

---

## Eksperimen

- **Hijau:** Buat `interface Buku { judul: string; halaman: number }` → buat 1 buku.
- **Kuning:** `stok?: number` → buat produk tanpa stok, `totalBelanja` pakai `?? 1`?
- **Merah:** Ubah `beras.id = 9` → error readonly.

---

## Tantangan

**Kartu Siswa Bertingkat:** `interface Orang { nama: string; umur: number }`, `interface Siswa extends Orang { nis: string; nilai: number }`, `type Status = "lulus" | "remidi"`. Buat `function status(s: Siswa): Status { return s.nilai >= 70 ? "lulus" : "remidi" }` dan array `Siswa[]` hitung rata-rata.

---

## Glosarium Mini

- **interface/type**: cetak biru
- **extends**: warisan
- **readonly/?**: tetap/opsional

---

## Ringkasan

Minggu 4 dari 12: **Interfaces** (Level: Lengkap). Punya cetak biru kartu yang aman. Selesai fondasi TS! Minggu depan: **Generics** — cetak biru untuk rak apa saja.
