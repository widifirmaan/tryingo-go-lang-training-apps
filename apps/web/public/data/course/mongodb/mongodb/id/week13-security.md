# Security & Authentication

> MongoDB | Modul 13

## Tujuan Pembelajaran

- Membuat user dan role
- Memberikan CRUD privileges
- Memahami role-based access control
- Mengaktifkan authentication

---

## Program: Access Control

```javascript
// Create user with roles
db.createUser({
  user: "app_user",
  pwd: "secure_password",
  roles: [
    { role: "readWrite", db: "mydb" }
  ]
})

// Create custom role
db.createRole({
  role: "readOnly",
  privileges: [{
    resource: { db: "mydb", collection: "" },
    actions: ["find"]
  }],
  roles: []
})
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

Modul 13 dari 16: **Security & Authentication**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **14. Backup & Restore**.
