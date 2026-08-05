# Multi-Document Transactions

> MongoDB | Modul 9

## Tujuan Pembelajaran

- Memahami multi-document transactions
- Menggunakan startTransaction, commit, abort
- Memahami write concerns
- Mengimplementasi transfer antar akun

---

## Program: Data Integrity

```javascript
const session = client.startSession();

session.withTransaction(async () => {
  const accounts = db.collection("accounts");
  
  await accounts.updateOne(
    { _id: "account1" },
    { $inc: { balance: -500000 } },
    { session }
  );
  
  await accounts.updateOne(
    { _id: "account2" },
    { $inc: { balance: 500000 } },
    { session }
  );
});
```

---

## Penjelasan

MongoDB adalah NoSQL document database yang menyimpan data dalam format JSON-like documents.
MongoDB mendukung aggregasi pipeline, indexing lanjutan, transaksi multi-document, dan sharding.
Gunakan mongosh atau MongoDB Compass untuk berinteraksi dengan database.

---

## Eksperimen

- Ubah query di atas dan lihat hasilnya
- Tambah document baru dan coba agregasi
- Coba buat index dan analisis performa query

---

## Tantangan

Buat skema database untuk aplikasi sederhana menggunakan konsep minggu ini.
Jalankan query dan verifikasi hasilnya di mongosh atau MongoDB Compass.

---

## Ringkasan

Modul 9 dari 16: **Multi-Document Transactions**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **10. Replica Sets & HA**.
