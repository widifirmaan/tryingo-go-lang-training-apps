# Functions Bertipe — Resep dengan Label Bahan

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 3:** Functions & Signatures

## Tujuan Pembelajaran

- Tulis fungsi bertipe: `(nama: string) => string`, `void` jika tidak return
- Parameter opsional `nama?: string` dan default `nama = "Tamu"`
- `Rest` bertipe `(...angka: number[])`
- Callback bertipe `(n: number) => number` dan `readonly` array
- Overload sederhana untuk `sapa` yang beda input

---

## Kenapa Ini Penting Buat Kamu?

Resep `hitungTotal` jika salah kirim `string` → total jadi `"6210"` (gabung teks). Dengan tipe `(harga: number)` salah kirim langsung merah. Callback `map` jika tidak bertipe, `n` jadi `any` → typo tidak ketahuan.

---

## Program: Dapur Fungsi Bertipe

```typescript
// 1. Fungsi dasar bertipe
function sapa(nama: string): string {
  return `Halo, ${nama}`;
}
console.log(sapa("Budi"));
// sapa(123); // ❌

// 2. Opsional & default
function sapa2(nama: string = "Tamu", gelar?: string): string {
  return gelar ? `${greeting} ${gelar} ${nama}` : `Halo ${nama}`;
  // gelar? = boleh tidak diisi (string | undefined)
}
console.log(sapa2());
console.log(sapa2("Siti", "Bu"));

// 3. Rest bertipe
function total(...angka: number[]): number {
  return angka.reduce((a, b) => a + b, 0);
}
console.log("\nTotal:", total(1, 2, 3, 4));

// 4. Callback bertipe
function proses(data: number[], kerja: (n: number) => number): number[] {
  return data.map(kerja);
}
console.log("Kali2:", proses([1, 2, 3], n => n * 2));

// 5. Readonly — jangan ubah rak orang lain
function cetak(harga: readonly number[]) {
  console.log("Harga:", harga);
  // harga.push(999); // ❌ Error: readonly
}
cetak([10000, 20000]);

// 6. Contoh nyata warung
type Keranjang = { harga: number; qty: number };
function hitungTotal(belanja: Keranjang[], diskon: number = 0): number {
  const subtotal = belanja.reduce((s, i) => s + i.harga * i.qty, 0);
  return subtotal * (1 - diskon / 100);
}
const keranjang: Keranjang[] = [{ harga: 62000, qty: 1 }, { harga: 5000, qty: 2 }];
console.log("\nTotal:", hitungTotal(keranjang));
console.log("Diskon 10%:", hitungTotal(keranjang, 10));
```

---

## Konsep Kunci

### `(a: string): string`
Di dalam kurung = tipe masuk, setelah kurung = tipe keluar. `void` = tidak return.

### `?:` & Default
`gelar?: string` boleh kosong, `nama = "Tamu"` isi default.

### `...angka: number[]`
Rest harus array bertipe. `number[]` = rak khusus number.

### Callback `(n: number) => number`
Tipe fungsi ditulis lengkap. `readonly number[]` tidak boleh `push`.

---

## Penjelasan untuk Pemula

### Analogi: Resep Berlabel

- **`(nama: string): string`** = label di wadah bahan dan piring hasil. Salah bahan → ditolak.
- **`readonly`** = papan "Jangan Diutak-atik".
- **Callback** = titip "potong sesuai pola ini" — pola harus `(bahan: number) => hasil`.

### 3 Istilah Wajib

1. **Signature**: bentuk fungsi `(a: string) => number`
2. **Optional `?:`**: boleh tidak ada
3. **Readonly**: tidak boleh ubah

---

## Eksperimen

- **Hijau:** `function kali(a:number,b:number):number { return a*b }` → `kali(2,3)`?
- **Kuning:** `total(1,2,"3")` → error? Harus number semua.
- **Merah:** `cetak` lalu `push` → error readonly.

---

## Tantangan

**Kalkulator Warung Bertipe:** `type Item={harga:number; qty:number}`, `function ongkir(berat:number,jarak:number):number`, `function struk(items: readonly Item[], jarak:number): string` return `` `Total Rp ${hitungTotal(items)}` ``. Coba kirim `harga:"62000"` → merah.

---

## Glosarium Mini

- **Signature**: tipe fungsi
- **void**: tidak return
- **readonly**: tidak boleh ubah

---

## Ringkasan

Minggu 3 dari 12: **Functions Bertipe** (Level: Lengkap). Resep aman berlabel. Minggu depan: **Interfaces** — cetak biru kartu.
