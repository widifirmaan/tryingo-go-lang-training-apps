# Classes & OOP — Pabrik Kartu TypeScript

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 6:** Classes & OOP

## Tujuan Pembelajaran

- `class Produk { constructor(nama: string, harga: number){} }` pabrik kartu, `private`, `public`, `extends`

---

## Kenapa Ini Penting Buat Kamu?

50 produk tanpa cetak biru → tulis `nama, harga, stok` 50x. Dengan `class` tulis sekali, `new` 50 kartu. `private stok` cegah ubah langsung dari luar (harus lewat method `diskon` yang validasi). `Member extends Produk` tambah `poin` tanpa tulis ulang.

---

## Program

```typescript
class Produk {
  constructor(public nama: string, public harga: number, private stok: number = 0){}
  info(): string { return `${this.nama}: Rp${this.harga} (stok ${this.stok})`; }
  diskon(persen: number){ this.harga -= this.harga * persen/100; }
}

class Member extends Produk {
  constructor(nama: string, harga: number, public poin: number){
    super(nama, harga);
  }
}

const beras = new Produk("Beras", 62000, 10);
console.log(beras.info());
beras.diskon(10);
console.log(beras.info());
console.log(new Member("Gula", 15000, 120).info());
```


---

## Konsep Kunci

### `class` + `constructor(public ...)` = Cetak Biru + Isi Otomatis
`constructor(public nama: string)` langsung jadi field — tanpa `this.nama = nama` manual.

### `private` vs `public` = Kunci vs Buka
`private stok` hanya method dalam class boleh ubah. `public nama` bebas.

### `extends` + `super()` = Warisan
`Member extends Produk` warisi semua + tambah `poin`. `super(nama, harga)` panggil constructor induk.

---

## Penjelasan untuk Pemula

### Analogi: Pabrik Kartu
- **class = cetak biru**, **new = cetak kartu**, **private = brankas** (hanya lewat kasir `diskon`).

### Langkah 0 — Siapkan Device
- Sama TS W1: `npx tsc file.ts && node file.js`.

### Cara Komputer Membaca
1. `new Produk("Beras", 62000, 10)` → alokasi + constructor isi 3 field.
2. `beras.diskon(10)` → `this` = beras → `harga` jadi 55800.

### 3 Istilah Wajib
1. **Class/constructor**: biru/isi-awal
2. **private/public**: kunci/buka
3. **extends/super**: warisan/induk

---

## Eksperimen

- **Hijau:** `new Produk("Gula", 15000)` → `info()`?
- **Kuning:** `beras.stok` dari luar → error `private`? Pakai method!
- **Merah:** `Member` tanpa `super(...)` → error `must call super`? Tambah.

---

## Tantangan

**Pabrik Lengkap:** `class Keranjang { items: Produk[] = []; tambah(p: Produk){...} total(): number {...} }` → isi 3 → `total()`.

---

## Glosarium Mini

- **class/new/private**: biru/kartu/kunci
- **extends/super**: warisan/induk

---

## Ringkasan

Minggu 6: **Pabrik Kartu** — `class` + `extends`. Minggu depan: **Utility Types**.
