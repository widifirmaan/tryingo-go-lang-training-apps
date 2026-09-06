# Change Streams & Transactions — Mata & Paket Aman MongoDB

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 9:** Change Streams & Transactions

## Tujuan Pembelajaran

- `watch()` dengar tiap tulis (untuk live/notif) — butuh replica set! (sumber: mongodb.com/docs/manual/changeStreams)
- `session.withTransaction()` paket all-or-nothing untuk multi-dokumen

---

## Kenapa Ini Penting Buat Kamu?

Stok kurang + pesanan tambah harus bareng (gagal 1 = batal semua). Tanpa transaction, stok kurang tapi pesanan gagal → selisih! Change streams untuk dasbor live tanpa polling tiap detik.

---

## Program: Dengar & Paket Aman

```javascript
// 1. Dengar (butuh replica set, W7!)
const stream = db.produk.watch([{ $match: { operationType: "update" } }]);
// (di driver Node: stream.on("change", c => console.log(c.fullDocument)))

// Test: update 1 produk di shell lain → stream terima!

// 2. Paket aman (transaksi multi-dokumen)
const session = db.getMongo().startSession();
session.startTransaction();
try {
  db.produk.updateOne({ nama: "Beras" }, { $inc: { stok: -2 } }, { session });
  db.pesanan.insertOne({ produk: "Beras", qty: 2 }, { session });
  session.commitTransaction(); // sahkan keduanya
} catch (e) {
  session.abortTransaction();  // batalkan keduanya!
}
session.endSession();
```

---

## Konsep Kunci

### `watch()` = Mata Live
Dengar insert/update/delete real-time. Butuh replica set (oplog).

### Transaction = Paket Batal-Bareng
`startTransaction` → tulis 2 tempat → `commit` (sah) / `abort` (batal semua).

---

## Penjelasan untuk Pemula

### Analogi: CCTV & Paket Bank
- **Change stream = CCTV**: ada gerak → bunyi.
- **Transaction = transfer bank**: debit+kredit 1 paket.

### 3 Istilah Wajib
1. **watch/oplog**: mata/catatan
2. **commit/abort**: sah/batal

---

## Eksperimen

- **Hijau:** `watch()` + update manual → terima?
- **Kuning:** Transaction gagalkan sengaja → 2 tempat batal?
- **Merah:** `watch` di standalone (tanpa replica) → error? (Butuh W7!)

---

## Tantangan

**Toko Aman Live:** Transaction jual (kurang stok + tambah pesanan) + `watch` log tiap update. Gagalkan 1 → buktikan batal semua.

---

## Glosarium Mini

- **watch/transaction**: mata/paket

---

## Ringkasan

Minggu 9 dari 10: **Mata & Paket Aman** (Level: Menengah). Live + konsisten. Minggu depan: **Capstone**.
