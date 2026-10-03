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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `interface Name { prop: Type; }`
- **Fungsi Utama:** Mendefinisikan kontrak bentuk objek terstruktur.
- **Parameter / Atribut:** `Field names, Types, Optional (?)`.
- **Perilaku & Efek Sistem:** Menjamin seluruh objek yang dibuat mematuhi struktur tipe yang ditentukan secara ketat saat compile-time.
- **Contoh Penggunaan Praktis:**
```javascript
interface Student {
  id: string;
  name: string;
  gpa?: number;
}
const alex: Student = { id: 's1', name: 'Alex' };
```
- **Hasil Output yang Diharapkan:**
```text
Validasi kompilasi berhasil tanpa error type mismatch
```

### 2. `type Union = TypeA | TypeB`
- **Fungsi Utama:** Tipe gabungan multi-kondisi (Union Type).
- **Parameter / Atribut:** `Dua atau lebih definisi tipe`.
- **Perilaku & Efek Sistem:** Mengizinkan variabel memiliki salah satu dari sekumpulan nilai atau struktur tipe yang diizinkan.
- **Contoh Penggunaan Praktis:**
```javascript
type Status = 'pending' | 'success' | 'failed';
let currentStatus: Status = 'success';
```
- **Hasil Output yang Diharapkan:**
```text
Hanya menerima 3 kemungkinan string yang dideklarasikan
```

### 3. `function genericFn<T>(arg: T): T`
- **Fungsi Utama:** Fungsi tipe dinamis aman (Generics).
- **Parameter / Atribut:** `Type Parameter T`.
- **Perilaku & Efek Sistem:** Memungkinkan pembuatan fungsi atau struktur kelas yang dapat bekerja dengan beragam tipe data dengan tetap menjaga type-safety.
- **Contoh Penggunaan Praktis:**
```javascript
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
const firstNum = getFirst([10, 20]); // Type: number
```
- **Hasil Output yang Diharapkan:**
```text
10 (dengan inferensi tipe number murni)
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Fungsi Utama:** Tipe utilitas bawaan TypeScript.
- **Parameter / Atribut:** `Type T, Keys K`.
- **Perilaku & Efek Sistem:** Mentransformasi struktur tipe yang sudah ada menjadi opsional (`Partial`) atau mengambil subset field spesifik.
- **Contoh Penggunaan Praktis:**
```javascript
interface Product { id: string; name: string; price: number; }
type UpdateProductDto = Partial<Product>;
```
- **Hasil Output yang Diharapkan:**
```text
Semua properti Product berubah menjadi opsional untuk update
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
