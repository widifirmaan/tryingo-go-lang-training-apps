# Dokumen & CRUD Dasar

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 1:** Dokumen & CRUD Dasar

## Tujuan Pembelajaran

- Memahami dokumen BSON
- Insert satu/banyak dokumen
- Query dengan filter
- Operator $gt, $lt, $in, $regex
- Query nested document

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **MongoDB for VS Code** (`mongodb.mongodb-vscode`): Jelajahi database, koleksi, dokumen, dan jalankan MongoDB playground langsung

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension mongodb.mongodb-vscode
```

---

### 2. Instalasi Runtime & Dependency (MongoDB 7.0 (via Docker))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
docker run -d --name mongo-dev -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret -v mongodata:/data/db mongo:7.0
```

**macOS (Terminal / Homebrew):**
```bash
brew tap mongodb/brew && brew install mongodb-community@7.0 && brew services start mongodb-community@7.0
```

**Linux (Ubuntu/Debian / bash):**
```bash
docker run -d --name mongo-dev -p 27017:27017 mongo:7.0
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
docker exec -it mongo-dev mongosh --version
```

Output yang diharapkan:
```output
2.x.x
```

> 💡 **Tips Prasyarat:** Docker container MongoDB sudah menyertakan `mongosh` modern.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
docker exec -it mongo-dev mongosh -u root -p secret
```
- **Keterangan:** Membuka shell interaktif mongosh untuk manipulasi koleksi dan dokumen BSON.
- **Pindah ke direktori project:**
```bash
# Terhubung ke mongosh
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
db.users.find().pretty()
```
Akses di browser atau terminal: `mongodb://localhost:27017`

> ℹ️ Mencetak dokumen JSON/BSON tersimpan.

**File Titik Masuk Utama (`playground.mongodb.js`):**
```js
use('shopdb');

// Insert dokumen dengan array dan subdokumen bersarang
db.orders.insertOne({
  orderId: "ORD-9912",
  customer: { name: "Budi Santoso", email: "budi@example.com" },
  items: [
    { product: "Laptop Stand", qty: 1, price: 35.00 },
    { product: "USB-C Cable", qty: 2, price: 12.50 }
  ],
  status: "PAID",
  createdAt: new Date()
});

// Aggregation Pipeline untuk menghitung total penjualan
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$status", totalRevenue: { $sum: { $multiply: ["$items.qty", "$items.price"] } } } }
]);
```
Operasi dokumen dan aggregation pipeline MongoDB.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
mongo-app/
├── scripts/
│   ├── seed.js          # Skrip populasi dokumen awal
│   └── indexes.js       # Pembuatan index koleksi
└── docker-compose.yml
```
Struktur project NoSQL berbasis MongoDB.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `db.collection.createIndex({ field: 1 })` untuk mencegah full-collection scan pada koleksi besar.
- Gunakan MongoDB Compass sebagai GUI desktop resmi untuk visualisasi data interaktif.

---

## Program: Operasi Dokumen

```javascript
// Koneksi ke MongoDB
const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('toko_db');
    const produk = db.collection('produk');

    // CREATE: Insert dokumen
    await produk.insertMany([
        { nama: 'Laptop ASUS', harga: 12500000, stok: 15, kategori: 'Elektronik',
          tags: ['laptop', 'asus'], spesifikasi: { ram: '16GB', cpu: 'i7' } },
        { nama: 'Mouse Logitech', harga: 350000, stok: 50, kategori: 'Aksesoris',
          tags: ['mouse', 'logitech'], spesifikasi: { dpi: 1600 } },
        { nama: 'Keyboard Mechanical', harga: 850000, stok: 30, kategori: 'Aksesoris',
          tags: ['keyboard', 'mechanical'], spesifikasi: { switch: 'blue' } },
        { nama: 'Monitor LG 24', harga: 2800000, stok: 20, kategori: 'Elektronik',
          tags: ['monitor', 'lg'], spesifikasi: { resolusi: '1080p' } },
    ]);

    // READ: Query dokumen
    const all = await produk.find().toArray();
    console.log('Semua produk:', all.length);

    const elektronik = await produk.find({ kategori: 'Elektronik' }).toArray();
    console.log('Elektronik:', elektronik.length);

    const mahal = await produk.find({ harga: { $gt: 1000000 } }).toArray();
    console.log('Harga > 1jt:', mahal.length);

    // READ: Query nested
    const ram16 = await produk.find({ 'spesifikasi.ram': '16GB' }).toArray();
    console.log('RAM 16GB:', ram16.length);

    await client.close();
}
main().catch(console.error);
```

---

## Konsep Kunci

### Dokumen BSON
MongoDB menyimpan data sebagai dokumen BSON (Binary JSON).

### Collection
Grup dokumen, seperti tabel di RDBMS.

### Insert
insertOne() untuk satu, insertMany() untuk banyak.

### Query
find() dengan filter object. Operator: $gt, $lt, $in, $regex.

### Nested Document
Query dengan dot notation: spesifikasi.ram.

---

## Eksperimen

- Insert dengan custom _id
- Query dengan $or
- Query array elements
- Sort dan limit

---

## Tantangan

Koleksi buku: insert 10 buku, query berdasarkan kategori dan harga.

---

## Ringkasan

Minggu 1 dari 10: **Dokumen & CRUD Dasar** (Pemula).
