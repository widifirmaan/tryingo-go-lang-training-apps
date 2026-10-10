# Documents & Basic CRUD

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 1:** Documents & Basic CRUD

## Learning Objectives

- Understand BSON documents
- Insert single/multiple documents
- Query with filters
- Operators $gt, $lt, $in, $regex
- Query nested documents

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **MongoDB for VS Code** (`mongodb.mongodb-vscode`): Browse collections, run queries, and execute MongoDB playgrounds

Or install all recommended extensions at once via terminal:
```bash
code --install-extension mongodb.mongodb-vscode
```

---

### 2. Runtime & Dependency Installation (MongoDB 7.0 (via Docker))
Make sure the required runtime or SDK is installed on your machine:

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

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
docker exec -it mongo-dev mongosh --version
```

Expected output:
```output
2.x.x
```

> 💡 **Prerequisite Note:** The official MongoDB Docker image includes the modern `mongosh` shell.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
docker exec -it mongo-dev mongosh -u root -p secret
```
- **Details:** Launches interactive mongosh shell session authenticated as root.
- **Navigate to the project directory:**
```bash
# Terhubung ke mongosh
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
db.users.find().pretty()
```
Open in browser or terminal: `mongodb://localhost:27017`

> ℹ️ Prints matching formatted JSON documents.

**Initial Entry File (`playground.mongodb.js`):**
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
Document insertion and aggregation pipeline in mongosh syntax.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
mongo-app/
├── scripts/
│   ├── seed.js          # Skrip populasi dokumen awal
│   └── indexes.js       # Pembuatan index koleksi
└── docker-compose.yml
```
MongoDB NoSQL project layout.

---

### 6. Beginner Tips & Best Practices
- Always add indexes via `createIndex()` to avoid costly collection scans.
- Use MongoDB Compass for interactive graphical schema and document inspection.

---

## Program: Document Operations

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

## Key Concepts

### BSON Documents
MongoDB stores data as BSON documents.

### Collections
Group of documents, like RDBMS tables.

### Insert
insertOne() for single, insertMany() for multiple.

### Queries
find() with filter object. Operators: $gt, $lt, $in, $regex.

### Nested Documents
Query with dot notation: specs.ram.

---

## Experiments

- Insert with custom _id
- Query with $or
- Query array elements
- Sort and limit

---

## Challenge

Books collection: insert 10 books, query by category and price.

---

## Summary

Week 1 of 10: **Documents & Basic CRUD** (Beginner).
