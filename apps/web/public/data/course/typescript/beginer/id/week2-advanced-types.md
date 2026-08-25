# Tipe Lanjutan — Label Warna untuk Status

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 2:** Advanced Types

## Tujuan Pembelajaran

- `Union` untuk pilihan: `status: "ada" | "habis" | "preorder"`
- `Literal` + `type alias` untuk singkatan label
- `Intersection` (`&`) untuk gabung kartu: `Pelanggan & Member`
- `Narrowing` dengan `typeof` — TypeScript makin pintar setelah `if`
- `Discriminated union` untuk stok bentuk berbeda (kotak, karung, botol)

---

## Kenapa Ini Penting Buat Kamu?

Status warung hanya 3 kata: `ada/habis/preorder`, bukan bebas ketik `adA`. Tanpa literal, typo lolos. Dengan `type Status = "ada" | "habis"` typo langsung merah. Untuk produk beda bentuk (kotak vs karung), `discriminated union` cegah salah hitung stok.

---

## Program: Status & Bentuk Produk

```typescript
// 1. Union + Literal — stiker warna khusus
type Status = "ada" | "habis" | "preorder";
let s: Status = "ada";
// s = "adA"; // ❌ Error

function label(status: Status): string {
  if (status === "ada") return "✅ Tersedia";
  if (status === "habis") return "❌ Habis";
  return "⏳ Preorder";
}
console.log(label("ada"));

// 2. Intersection — gabung 2 kartu
type Nama = { nama: string };
type Umur = { umur: number };
type Orang = Nama & Umur; // harus punya keduanya
const budi: Orang = { nama: "Budi", umur: 25 };
console.log("\nOrang:", budi);

// 3. Narrowing — setelah cek, TS tahu tipe
function proses(id: string | number) {
  if (typeof id === "string") {
    // di sini TS tahu id = string → boleh .toUpperCase()
    console.log("ID String:", id.toUpperCase());
  } else {
    // di sini number → boleh .toFixed()
    console.log("ID Angka:", id.toFixed(0));
  }
}
proses("abc123");
proses(42);

// 4. Discriminated Union — bentuk berbeda, 1 rak
type Produk =
  | { jenis: "kotak"; isi: number; satuan: "pcs" }
  | { jenis: "karung"; berat: number; satuan: "kg" };

function stok(p: Produk): string {
  switch (p.jenis) {
    case "kotak": return `${p.isi} ${p.satuan}`;
    case "karung": return `${p.berat} ${p.satuan}`;
  }
}
console.log("\nStok kotak:", stok({ jenis: "kotak", isi: 12, satuan: "pcs" }));
console.log("Stok karung:", stok({ jenis: "karung", berat: 5, satuan: "kg" }));

// 5. Type Guard — satpam pemeriksa
function isString(x: unknown): x is string {
  return typeof x === "string";
}
const cek: unknown = "halo";
if (isString(cek)) {
  console.log("\nPanjang:", cek.length); // aman, TS tahu string
}
```

---

## Konsep Kunci

### `type Status = "ada" | "habis"`
Hanya 3 kata valid. Salah ketik langsung error — seperti stiker warna khusus.

### `type Orang = Nama & Umur`
`&` gabung → harus punya semua field dari keduanya.

### Narrowing `typeof`
Setelah `if (typeof id === "string")`, TS di dalam `if` tahu `id` adalah `string`.

### Discriminated Union
Tiap varian punya `jenis` pembeda. `switch(p.jenis)` TS tahu field yang ada.

---

## Penjelasan untuk Pemula

### Analogi

- **Literal = cap stempel**: hanya 3 cap `ada/habis/preorder`, tidak bisa cap `adA`.
- **Intersection = kartu gabungan**: KTP + Kartu Member = Orang.
- **Narrowing = senter**: setelah senter `typeof`, gelap jadi terang.
- **Discriminated union = rak campur**: kotak dan karung 1 rak, tapi label `jenis` bedakan cara hitung.

### 3 Istilah Wajib

1. **Union `|`**: atau
2. **Literal**: nilai jadi tipe
3. **Narrowing**: persempit tipe setelah cek

---

## Eksperimen

- **Hijau:** `type Hari = "Senin"|"Jumat"` → `let h: Hari = "Senin"` ✅, `"Minggu"` ❌?
- **Kuning:** `type A={a:string}&{b:number}` → buat objek harus dua-duanya.
- **Merah:** Hapus `typeof` di `proses`, coba `id.toUpperCase()` di luar if → error?

---

## Tantangan

**Mesin Status Pesanan:** `type Pesanan = { status: "baru" } | { status: "kirim", resi: string } | { status: "selesai" }`. Fungsi `info(p: Pesanan)` → switch status, jika `kirim` tampilkan `resi`. Coba `info({status:"kirim"})` tanpa `resi` → error, harus lengkap.

---

## Glosarium Mini

- **Union/Literal**: pilihan terbatas
- **Intersection**: gabung tipe
- **Narrowing/Guard**: cek tipe

---

## Ringkasan

Minggu 2 dari 12: **Tipe Lanjutan** (Level: Lengkap). Bisa batasi pilihan dan bedakan bentuk. Minggu depan: **Functions** bertipe.
