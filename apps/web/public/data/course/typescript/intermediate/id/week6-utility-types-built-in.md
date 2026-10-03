# Utility Types Bawaan: Partial, Required, Pick, Omit, Record & ReturnType

> **Kategori:** TypeScript | **Level:** Generics & Utility Types Modern | **Minggu 6:** Utility Types Bawaan: Partial, Required, Pick, Omit, Record & ReturnType
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menggunakan Partial<T> untuk membangun payload mutasi data (HTTP PATCH)
- Menggunakan Required<T> untuk memastikan integritas data sebelum persistensi database
- Memanfaatkan Pick<T, K> dan Omit<T, K> untuk transformasi DTO (Data Transfer Object)
- Menggunakan Record<K, T> untuk kamus tipe ketat dengan validasi kelengkapan kunci
- Mengekstrak tipe fungsi secara otomatis menggunakan ReturnType<T> dan Parameters<T>

---

## Program: Transformasi Skema Data Pengguna & Registry Konfigurasi

```typescript
interface AkunNasabah {
  id: string;
  namaLengkap: string;
  email: string;
  nomorKTP: string;
  saldoTabungan: number;
  alamatTinggal?: string;
}

// 1. Partial: Membuat semua properti menjadi opsional (Cocok untuk fitur UPDATE / PATCH)
type PayloadUpdateNasabah = Partial<AkunNasabah>;

// 2. Required: Memaksa semua properti (termasuk yang aslinya opsional) menjadi wajib
type NasabahLengkapValidasi = Required<AkunNasabah>;

// 3. Pick: Mengambil sebagian kecil properti untuk skema publik
type KartuNasabahRingkas = Pick<AkunNasabah, "id" | "namaLengkap" | "saldoTabungan">;

// 4. Omit: Membuang properti sensitif sebelum dikirim ke browser luar
type NasabahPublik = Omit<AkunNasabah, "nomorKTP" | "saldoTabungan">;

// 5. Record: Membuat peta kamus aman berbasis kunci tertentu
type RolePetugas = "SUPER_ADMIN" | "OPERATOR_KASIR" | "AUDITOR";
const izinAksesMenu: Record<RolePetugas, string[]> = {
  SUPER_ADMIN: ["DASHBOARD", "MUTASI", "SETOR", "TARIK", "HAPUS_USER"],
  OPERATOR_KASIR: ["DASHBOARD", "MUTASI", "SETOR"],
  AUDITOR: ["DASHBOARD", "MUTASI"]
};

// 6. ReturnType: Menangkap tipe nilai kembalian dari suatu fungsi
function buatSesiLogin(idUser: string) {
  return { token: "JWT-XYZ-" + idUser, kedaluwarsaDetik: 3600, waktuDibuat: Date.now() };
}
type ResponSesi = ReturnType<typeof buatSesiLogin>;

const kartu: KartuNasabahRingkas = {
  id: "NSB-99",
  namaLengkap: "Siti Rahma",
  saldoTabungan: 15_750_000
};

console.log("Ringkasan Kartu:", kartu);
console.log("Izin Petugas Kasir:", izinAksesMenu.OPERATOR_KASIR);
```

---

## Konsep Kunci

### Mengapa Utility Types Penting?
Dalam rekayasa perangkat lunak skala besar, Anda **tidak boleh mendefinisikan ulang interface yang mirip berkali-kali**. Jika model database Anda memiliki 20 kolom, Anda tidak perlu membuat `InterfaceUpdate` secara manual dengan menulis ulang 20 baris bertanda tanda tanya `?`.
TypeScript menyediakan koleksi utilitas tipe meta bawaan yang mentransformasikan bentuk interface yang ada menjadi bentuk baru secara instan.

### Ringkasan Utilitas Utama:
1. `Partial<T>`: Mengubah semua kunci menjadi `key?: type`.
2. `Required<T>`: Menghilangkan semua `?` sehingga semua wajib ada.
3. `Readonly<T>`: Mengunci semua properti agar tidak bisa dimutasi.
4. `Pick<T, K>`: Memilih subset kunci tertentu dari tipe `T`.
5. `Omit<T, K>`: Menyingkirkan kunci tertentu dari tipe `T`.
6. `Record<Keys, Values>`: Memetakan kumpulan union kunci menjadi nilai tipe tertentu.

---

---

## Penjelasan untuk Pemula

### Analogi: Mengedit Formulir & Fotokopi Sensor
1. **`Partial`** seperti formulir ubah data alamat: Anda hanya perlu mengisi kolom yang ingin diperbarui tanpa perlu menulis ulang seluruh riwayat hidup Anda.
2. **`Omit`** seperti fotokopi KTP yang bagian nomor NIK-nya disensor spidol hitam sebelum diserahkan ke pihak ketiga demi keamanan data.

## Eksperimen

- Hapus salah satu peran dari objek izinAksesMenu dan lihat bagaimana Record mendeteksi properti yang kurang.
- Coba masukkan nomorKTP ke dalam objek bertipe NasabahPublik dan amati eror compiler.
- Gunakan Readonly<AkunNasabah> dan coba modifikasi saldoTabungan.
- Gunakan utilitas Parameters<typeof buatSesiLogin> untuk melihat tipe argumen fungsi.

---

## Tantangan

Diberikan interface `ProdukECommerce`. Buat tipe `ProdukDraft` (semua opsional kecuali judul), tipe `ProdukDisplay` (tanpa hargaGrosir dan supplierId), dan tipe `StokPerGudang` yang memetakan id gudang ("JKT-01" | "SBY-02" | "BDG-03") ke angka stok.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Penyalahgunaan Tipe 'any'
- **Gejala / Masalah:** Menghilangkan seluruh keamanan pengecekan compile-time TypeScript.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `unknown` jika tipe data belum pasti, lalu persempit dengan type guards (`typeof`, `instanceof`).

### 2. Non-Null Assertion Operator (!) Sembarangan
- **Gejala / Masalah:** Terjadi runtime error `Cannot read properties of undefined` saat nilai ternyata null.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan optional chaining (`?.`) atau pengecekan kondisional eksplisit `if (val != null)`.

### 3. Interface vs Type yang Tidak Konsisten
- **Gejala / Masalah:** Membingungkan arsitektur tim dan menyulitkan declaration merging saat menulis library.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `interface` untuk struktur objek extensible dan `type` untuk union, tuple, atau primitive alias.

---

## Ringkasan

Kamu telah menguasai Utility Types bawaan untuk transformasi skema data. Minggu depan kita mempelajari Conditional Types dan kata kunci infer.
