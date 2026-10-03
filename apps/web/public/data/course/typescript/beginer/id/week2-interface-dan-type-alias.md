# Interface vs Type Alias, Optional, Readonly & Index Signatures

> **Kategori:** TypeScript | **Level:** Pondasi Tipe & Type Narrowing | **Minggu 2:** Interface vs Type Alias, Optional, Readonly & Index Signatures

## Tujuan Pembelajaran

- Memahami perbedaan dan kapan memilih interface vs type alias
- Menggunakan modifier readonly untuk menjamin data tidak bisa dimutasi sembarangan
- Menggunakan properti opsional (?) untuk menangani atribut yang belum tentu ada
- Menggabungkan kontrak data menggunakan Intersection Types (&) dan interface extends
- Membuat struktur kamus kunci-nilai dinamis dengan Index Signatures

---

## Program: Kontrak Profil Akun Pengguna & Kamus Kurs Dinamis

```typescript
// 1. Interface dengan Properti Opsional (?) dan Readonly
interface ProfilPengguna {
  readonly id: string;         // Tidak bisa diubah setelah dibuat
  nama: string;
  email: string;
  nomorTelepon?: string;      // Opsional (bisa undefined)
  tanggalDaftar: Date;
}

// 2. Type Alias dengan Intersection (&)
type MetadataAudit = {
  diubahTerakhir: Date;
  versi: number;
};

type AkunMember = ProfilPengguna & MetadataAudit & {
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
};

// 3. Index Signature untuk Dictionary Dinamis
interface TabelKursMataUang {
  readonly tanggalKurs: string;
  [kodeMataUang: string]: number | string; // Dinamis menampung kode valas apapun
}

const kursHariIni: TabelKursMataUang = {
  tanggalKurs: "2026-10-03",
  USD: 16250,
  EUR: 17500,
  SGD: 12200,
  JPY: 110.5
};

const user1: AkunMember = {
  id: "USR-001",
  nama: "Budi Pratama",
  email: "budi@nusa.id",
  tanggalDaftar: new Date(),
  diubahTerakhir: new Date(),
  versi: 1,
  tier: "GOLD"
};

console.log("Pengguna Terdaftar:", user1.nama, "| Tier:", user1.tier);
console.log("Kurs USD ke IDR:", kursHariIni["USD"]);
```

---

## Konsep Kunci

### Interface vs Type Alias
- **`interface`**: Digunakan terutama untuk mendefinisikan bentuk objek (*shape of an object*) dan kontrak OOP. Interface mendukung *declaration merging* (dapat dideklarasikan ulang untuk menambah properti).
- **`type alias`**: Jauh lebih fleksibel. Bisa merepresentasikan union, primitif, tuples, dan fungsi selain bentuk objek.
Sebagai aturan baku industri: gunakan `interface` untuk mendefinisikan entitas objek domain, dan gunakan `type` untuk union, fungsi, dan manipulasi tipe kompleks.

### Readonly & Optional Properties
- `readonly id: string`: Mencegah *re-assignment* `user.id = "lain"`. Memberikan kepastian integritas ID.
- `nomorTelepon?: string`: Menandai bahwa properti bisa bertipe `string | undefined`.

### Index Signatures
Saat Anda tidak mengetahui semua nama kunci di muka (misalnya tabel nilai tukar valuta asing atau cache memori), gunakan *index signature*:
```typescript
interface CacheStore {
  [key: string]: string | number;
}
```

---

---

## Penjelasan untuk Pemula

### Analogi: Formulir Paspor & Buku Alamat
1. **Interface** seperti formulir blangko pembuatan paspor: ada kolom wajib (Nama, NIK) dan kolom opsional (Gelar, Nama Panggilan). Kolom NIK bertuliskan tinta permanen (*readonly*).
2. **Index Signature** seperti buku catatan nomor telepon kosong: Anda bebas menulis nama kontak apa saja di sisi kiri (*key*), dan nomor telepon di sisi kanan (*value*).

## Eksperimen

- Coba ubah user1.id = "USR-999" dan perhatikan bagaimana TypeScript menolaknya.
- Hapus properti email dari user1 dan baca pesan eror missing property dari compiler.
- Tambahkan mata uang baru seperti "GBP": 20800 ke kursHariIni.
- Kombinasikan dua interface menggunakan kata kunci extends.

---

## Tantangan

Rancang interface `ProdukInventaris` dengan SKU readonly, nama, harga, stok, dan tag kategori opsional. Buat interface turunan `ProdukDiskon` yang menambahkan persentase diskon dan fungsi kalkulasi harga bersih.

---

## Ringkasan

Kamu telah menguasai Interface, Type Alias, Readonly, Optional, dan Index Signatures. Minggu depan kita mempelajari Type Narrowing dan Type Guards.
