# Transaksi ACID Multi-Dokumen & Write Concern

> **Kategori:** MongoDB | **Level:** Agregasi Lanjutan, Replikasi & Skalabilitas Sharding | **Minggu 6:** Transaksi ACID Multi-Dokumen & Write Concern
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami siklus transaksi multi-dokumen ACID (startTransaction, commitTransaction, abortTransaction)
- Membedakan peran tingkatan Write Concern: w: 1, w: "majority", dan parameter wtimeout
- Mengonfigurasi Read Concern (local, majority, linearizable, snapshot) dan Read Preference (primary, secondaryPreferred)
- Mengetahui batasan performa transaksi multi-dokumen dan kapan tetap mengutamakan desain dokumen embedded

---

## Program: Transfer Kepemilikan Perangkat Antar-Fasilitas Menggunakan Transaksi Multi-Dokumen Sesi

```javascript
// MongoDB Client Session & Multi-Document ACID Transaction
// Note: Requires Replica Set or Sharded Cluster topology
const session = db.getMongo().startSession();

// Configure strict transaction options
const transactionOptions = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority', wtimeout: 5000 } // Majority quorum durability
};

try {
  session.startTransaction(transactionOptions);

  const devicesColl = session.getDatabase("telemetry_db").devices;
  const facilitiesColl = session.getDatabase("telemetry_db").facilities;
  const auditColl = session.getDatabase("telemetry_db").device_transfers_audit;

  const targetDeviceId = "DEV-2026-TX";
  const sourceFacilityId = "FAC-JKT-01";
  const destFacilityId = "FAC-BDG-02";

  // Step 1: Verify device belongs to source facility and deduct count
  const sourceUpdate = facilitiesColl.updateOne(
    { _id: sourceFacilityId, activeDevicesCount: { $gt: 0 } },
    { $inc: { activeDevicesCount: -1 } },
    { session }
  );

  if (sourceUpdate.matchedCount === 0) {
    throw new Error("Source facility has no active devices or does not exist.");
  }

  // Step 2: Reassign device location
  const deviceUpdate = devicesColl.updateOne(
    { serialNumber: targetDeviceId, "location.facilityId": sourceFacilityId },
    { 
      $set: { 
        "location.facilityId": destFacilityId,
        "location.zone": "Staging Area" 
      } 
    },
    { session }
  );

  if (deviceUpdate.matchedCount === 0) {
    throw new Error("Device not found at designated source facility.");
  }

  // Step 3: Increment destination facility count
  facilitiesColl.updateOne(
    { _id: destFacilityId },
    { $inc: { activeDevicesCount: 1 } },
    { session }
  );

  // Step 4: Write audit journal
  auditColl.insertOne(
    {
      deviceId: targetDeviceId,
      fromFacility: sourceFacilityId,
      toFacility: destFacilityId,
      transferredAt: new Date(),
      status: "COMPLETED"
    },
    { session }
  );

  // Commit all mutations atomically across collections
  session.commitTransaction();
  print("Transaction successfully committed with majority quorum.");
} catch (error) {
  print("Transaction aborted due to error: " + error.message);
  session.abortTransaction();
} finally {
  session.endSession();
}
```

---

## Konsep Kunci

### Transaksi Multi-Dokumen ACID di MongoDB
Sejak MongoDB 4.0 (Replica Sets) dan 4.2 (Sharded Clusters), MongoDB mendukung penuh **transaksi multi-dokumen ACID**. Sebelum ada fitur ini, jaminan atomic hanya berlaku di tingkat dokumen tunggal. Melalui `ClientSession`, beberapa operasi update pada koleksi yang berbeda dapat dieksekusi secara atomic: seluruh operasi berhasil bersamaan atau dibatalkan sepenuhnya (`abortTransaction`).

### Jaminan Durabilitas dengan Write Concern
**Write Concern** menentukan tingkat konfirmasi yang diminta aplikasi sebelum MongoDB menyatakan operasi tulis berhasil:
- `w: 1`: Primary node mengonfirmasi data ditulis ke memorinya. Cepat, namun jika Primary crash sebelum menyinkronkan data ke node lain, data bisa hilang.
- `w: "majority"`: Operasi tulis wajib dikonfirmasi telah tersimpan di mayoritas anggota Replica Set (misal: 2 dari 3 node). Menjamin data tahan dari failover Primary.
- `wtimeout`: Batas waktu tunggu pengakuan kuorum untuk mencegah aplikasi macet jika terjadi partisi jaringan.

### Read Concern dan Read Preference
- **Read Preference**: Menentukan ke mana query baca diarahkan (`primary` untuk konsistensi mutlak, `secondaryPreferred` untuk mendistribusikan beban analitik baca ke replika).
- **Read Concern**:
  - `local`: Mengembalikan data lokal node tanpa jaminan data sudah di-commit mayoritas.
  - `majority`: Menjamin data yang dibaca telah diakui oleh mayoritas node dan tidak akan di-rollback.
  - `snapshot`: Menjamin konsistensi snapshot transaksi ACID terisolasi.

---

---

## Penjelasan untuk Pemula

Bayangkan transaksi multi-dokumen seperti kurir yang membawa 3 amplop rahasia ke 3 kantor berbeda. Kurir memiliki instruksi ketat: jika salah satu kantor tutup atau menolak menerima amplop, kurir harus menarik kembali 2 amplop lainnya dan membawanya pulang tanpa meninggalkan jejak apapun.

Write Concern `w: majority` seperti meminta tanda tangan tanda terima dari minimal 2 saksi terpercaya, bukan hanya percaya pada satu satpam di pos depan.

## Eksperimen

- Sengaja picu error pada langkah ke-3 dan amati bahwa langkah 1 dan 2 dibatalkan secara bersih (rollback)
- Uji penulisan dengan Write Concern w: "majority" pada replica set lokal dan amati latensi pengakuan
- Simulasikan network timeout dengan mengatur wtimeout: 10 dan amati WriteConcernError yang dilempar
- Uji pembacaan dari secondary node menggunakan Read Preference secondaryPreferred

---

## Tantangan

Bangun sistem transfer poin loyalitas antar pengguna: gunakan transaksi multi-dokumen, validasi saldo poin pengirim tidak boleh negatif, dan terapkan pola transient transaction error retry logic otomatis.

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

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Fungsi Utama:** Mendefinisikan skema tabel relasional.
- **Parameter / Atribut:** `Nama tabel, definisi kolom, batasan (PK, FK, NOT NULL)`.
- **Perilaku & Efek Sistem:** Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data.
- **Contoh Penggunaan Praktis:**
```javascript
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
- **Hasil Output yang Diharapkan:**
```text
Tabel users siap menerima baris data
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Fungsi Utama:** Query pembacaan dan penyaringan data.
- **Parameter / Atribut:** `Daftar kolom, kondisi WHERE, klausa urutan dan limit`.
- **Perilaku & Efek Sistem:** Mengambil rekaman data yang memenuhi kriteria pengujian secara efisien.
- **Contoh Penggunaan Praktis:**
```javascript
SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan 10 baris pengguna terbaru
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Fungsi Utama:** Penyisipan baris baru dengan pengembalian nilai instan.
- **Parameter / Atribut:** `Kolom target, data masukan, klausa RETURNING`.
- **Perilaku & Efek Sistem:** Menyimpan data baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis (seperti ID atau timestamp).
- **Contoh Penggunaan Praktis:**
```javascript
INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan ID UUID yang baru dibuat
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Fungsi Utama:** Penggabungan relasi antar tabel (Join).
- **Parameter / Atribut:** `Nama tabel, kondisi pencocokan kunci relasi ON`.
- **Perilaku & Efek Sistem:** Menggabungkan baris dari dua tabel berdasarkan relasi foreign key.
- **Contoh Penggunaan Praktis:**
```javascript
SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;
```
- **Hasil Output yang Diharapkan:**
```text
Daftar transaksi pesanan beserta email pemilik akun
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Desain Dokumen Tanpa Batas (Unbounded Array Anti-Pattern)
- **Gejala / Masalah:** Ukuran dokumen melebihi batas keras 16MB MongoDB saat array anak terus membesar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan teknik referensi ID (`bucketing` atau koleksi terpisah) jika data relasi diproyeksikan tumbuh tanpa batas.

### 2. Tidak Menggunakan Indeks pada Query Sering
- **Gejala / Masalah:** Operasi pencarian melakukan pemeriksaan seluruh koleksi (*COLLSCAN*) yang boros IOPS memori.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Buat compound index via `db.collection.createIndex({ status: 1, createdAt: -1 })`.

### 3. Tipe Data Object ID vs String pada Pencarian
- **Gejala / Masalah:** Query tidak mengembalikan data apa pun karena mencari ID dengan tipe string mentah.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Konversikan string input ke objek `new ObjectId(id)` sebelum melakukan query.

---

## Ringkasan

Anda telah menguasai transaksi multi-dokumen ACID di MongoDB, konfigurasi durabilitas kuorum Write Concern, dan spektrum konsistensi Read Concern serta Read Preference.
