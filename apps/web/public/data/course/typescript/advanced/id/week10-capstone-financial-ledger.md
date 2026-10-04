# Capstone: Mesin Portofolio Keuangan & Audit Log Tipe-Ketat

> **Kategori:** TypeScript | **Level:** Sistem Tipe Lanjut & Capstone Portofolio | **Minggu 10:** Capstone: Mesin Portofolio Keuangan & Audit Log Tipe-Ketat
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh konsep TypeScript dari level pemula hingga level mahir dalam satu sistem utuh
- Menerapkan immutability ketat pada entitas finansial menggunakan readonly dan Object.freeze
- Membangun audit trail transaksional yang tahan manipulasi dengan TypeScript compilation check
- Menghitung matriks finansial (ROI, Capital Gain, Unrealized PnL) dengan presisi matematis
- Menghasilkan kode produksi TypeScript yang bersih, modular, dan siap diintegrasikan ke backend

---

## Program: Mesin Manajemen Portofolio Multi-Aset dengan Validasi Kompilasi Penuh

```typescript
// ============================================================================
// CAPSTONE: MESIN ANALITIK PORTOFOLIO KEUANGAN DENGAN KESELAMATAN TIPE PENUH
// ============================================================================

type KelasAset = "SAHAM" | "OBLIGASI" | "KRIPTO" | "KAS";

interface PosisiAset {
  readonly id: string;
  readonly simbol: string;
  readonly kelas: KelasAset;
  jumlahUnit: number;
  hargaPerolehanRataRata: number;
  hargaPasarSekarang: number;
}

type AksiTransaksi = "BELI" | "JUAL" | "DIVIDEN";

interface RekorAuditTransaksi {
  readonly idTransaksi: string;
  readonly waktu: Date;
  readonly aksi: AksiTransaksi;
  readonly simbol: string;
  readonly nominalTotal: number;
}

class MesinPortofolio {
  private posisiMap: Map<string, PosisiAset> = new Map();
  private auditLog: RekorAuditTransaksi[] = [];

  tambahPosisi(aset: PosisiAset): void {
    this.posisiMap.set(aset.simbol, { ...aset });
    this.catatAudit({
      idTransaksi: `TX-${Date.now()}`,
      waktu: new Date(),
      aksi: "BELI",
      simbol: aset.simbol,
      nominalTotal: aset.jumlahUnit * aset.hargaPerolehanRataRata
    });
  }

  private catatAudit(rekor: RekorAuditTransaksi): void {
    this.auditLog.push(Object.freeze(rekor));
  }

  hitungKinerja(): { totalModal: number; nilaiPasarSekarang: number; labaRugiNominal: number; roiPersen: number } {
    let totalModal = 0;
    let nilaiPasarSekarang = 0;

    for (const p of this.posisiMap.values()) {
      totalModal += p.jumlahUnit * p.hargaPerolehanRataRata;
      nilaiPasarSekarang += p.jumlahUnit * p.hargaPasarSekarang;
    }

    const labaRugiNominal = nilaiPasarSekarang - totalModal;
    const roiPersen = totalModal > 0 ? (labaRugiNominal / totalModal) * 100 : 0;

    return { totalModal, nilaiPasarSekarang, labaRugiNominal, roiPersen };
  }

  dapatkanAuditTrail(): readonly RekorAuditTransaksi[] {
    return this.auditLog;
  }
}

// Inisialisasi Portofolio Produksi
const portofolio = new MesinPortofolio();

portofolio.tambahPosisi({
  id: "AST-01",
  simbol: "BBCA",
  kelas: "SAHAM",
  jumlahUnit: 5000,
  hargaPerolehanRataRata: 9200,
  hargaPasarSekarang: 10100
});

portofolio.tambahPosisi({
  id: "AST-02",
  simbol: "BTC",
  kelas: "KRIPTO",
  jumlahUnit: 0.15,
  hargaPerolehanRataRata: 950_000_000,
  hargaPasarSekarang: 1_050_000_000
});

const kinerja = portofolio.hitungKinerja();
console.log("=== LAPORAN KINERJA PORTOFOLIO ===");
console.log("Total Modal Investasi : Rp", kinerja.totalModal.toLocaleString("id-ID"));
console.log("Nilai Pasar Terkini   : Rp", kinerja.nilaiPasarSekarang.toLocaleString("id-ID"));
console.log("Laba / Rugi Bersih    : Rp", kinerja.labaRugiNominal.toLocaleString("id-ID"));
console.log("ROI (Return on Invest):", kinerja.roiPersen.toFixed(2), "%");
console.log("Total Riwayat Audit   :", portofolio.dapatkanAuditTrail().length, "transaksi");
```

---

## Konsep Kunci

### Arsitektur Capstone Portofolio Keuangan
Proyek capstone ini mendemonstrasikan bagaimana TypeScript melindungi integritas data finansial bernilai tinggi:
1. **Immutability pada Riwayat Transaksi**: Rekor audit didefinisikan dengan `readonly RekorAuditTransaksi[]` dan disegel dengan `Object.freeze`. Tidak ada komponen lain yang bisa mengubah catatan sejarah transaksi masa lalu secara tidak sah.
2. **Discriminated Union & Tipe Terikat**: Kelas aset dibatasi secara ketat pada `"SAHAM" | "OBLIGASI" | "KRIPTO" | "KAS"`. Menolak masuknya instrumen yang tidak terdaftar.
3. **Pemisahan Antara State Aktif dan Audit Log**: State aset dapat dimutasi nilainya saat harga pasar berfluktuasi, namun riwayat perubahannya tercatat permanen di dalam append-only ledger.

### Transisi Menuju Frontend Frameworks
Dengan menguasai sistem tipe statis TypeScript hingga tahap ini, Anda kini memiliki fondasi terkuat untuk membangun aplikasi React, Next.js, Vue, atau backend Node.js/NestJS enterprise dengan standar industri tertinggi.

---

---

## Penjelasan untuk Pemula

### Analogi: Brankas Bank Digital dengan Pembukuan Berlapis
Sistem portofolio ini seperti brankas bank modern:
1. **Posisi Aset** adalah rak penyimpanan fisik di mana nilai nominal bisa bertambah atau berkurang sesuai harga pasar emas dan valuta.
2. **Audit Trail** adalah kamera CCTV 24 jam dan buku besar akuntan bermeterai: setiap kali ada emas yang masuk atau keluar, tanggal, detik, dan paraf petugas dicatat dengan tinta permanen yang mustahil dihapus.

## Eksperimen

- Coba ubah auditLog dari luar method dapatkanAuditTrail() dan perhatikan proteksi readonly.
- Tambahkan aset baru berupa OBLIGASI negara dengan bunga kupon tetap.
- Simulasikan penurunan harga pasar untuk melihat perhitungan kerugian (ROI minus).
- Tulis method baru untuk menghitung persentase alokasi masing-masing kelas aset terhadap total portofolio.

---

## Tantangan

Kembangkan MesinPortofolio dengan method `rebalancePortofolio(targetAlokasi: Record<KelasAset, number>)`: hitung berapa nominal unit yang harus dijual atau dibeli untuk mencapai target alokasi tersebut dengan type safety penuh.

---

## Model Mental & Diagram Alur Visual

```diagram
┌───────────────────────────────┐
│     KODE SUMBER TYPESCRIPT    │ (Strict Type Annotations)
│ interface User { id: UUID; }  │
└──────────────┬────────────────┘
               │ TYPE CHECKING (tsc) ──► Menemukan bug sebelum runtime!
               ▼
┌───────────────────────────────┐
│     JAVASCRIPT HASIL COMPILE  │ (Tipe dihapus / Type Erasure)
│ function getUser(user) { ... }│
└───────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `interface Name { prop: Type; }`
- **Fungsi Utama:** Mendefinisikan kontrak bentuk objek terstruktur.
- **Parameter / Atribut:** `Field names, Types, Optional (?)`.
- **Perilaku & Efek Sistem:** Menjamin seluruh objek mematuhi struktur tipe data saat compile-time..
- **Contoh Penggunaan Praktis:**
```typescript
interface User {
  id: string;
  name: string;
  isActive?: boolean;
}
const u: User = { id: 'u1', name: 'Alex' };
```
- **Hasil Output yang Diharapkan:**
```text
Validasi kompilasi sukses 100% aman
```

### 2. `type Union = TypeA | TypeB`
- **Fungsi Utama:** Tipe gabungan multi-kondisi.
- **Parameter / Atribut:** `Dua atau lebih varian tipe data`.
- **Perilaku & Efek Sistem:** Membatasi variabel hanya boleh menerima salah satu nilai yang sah..
- **Contoh Penggunaan Praktis:**
```typescript
type Status = 'idle' | 'loading' | 'success';
let current: Status = 'loading';
```
- **Hasil Output yang Diharapkan:**
```text
Menolak nilai di luar 3 opsi literal yang ditentukan
```

### 3. `function genericFn<T>(arg: T): T`
- **Fungsi Utama:** Fungsi tipe dinamis aman (Generics).
- **Parameter / Atribut:** `Type Parameter T`.
- **Perilaku & Efek Sistem:** Membuat fungsi yang dapat menangani berbagai tipe data dengan tetap menjaga type safety..
- **Contoh Penggunaan Praktis:**
```typescript
function wrap<T>(val: T): { data: T } {
  return { data: val };
}
const box = wrap('Tryngo');
```
- **Hasil Output yang Diharapkan:**
```text
{ data: 'Tryngo' }
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Fungsi Utama:** Tipe utilitas transformasi bawaan.
- **Parameter / Atribut:** `Base Type T, Keys K`.
- **Perilaku & Efek Sistem:** Mengubah properti menjadi opsional (`Partial`) atau mengambil subset kolom tertentu..
- **Contoh Penggunaan Praktis:**
```typescript
interface Task { id: string; title: string; done: boolean; }
type UpdateDto = Partial<Task>;
```
- **Hasil Output yang Diharapkan:**
```text
Semua kolom Task berubah menjadi opsional
```

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum TypeScript dari dasar hingga mahir dengan membangun Mesin Portofolio Keuangan yang kuat dan tipe-ketat.
