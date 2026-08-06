import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('mongodb', 'MongoDB');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar MongoDB: dokumen, CRUD, index, aggregation.',
    descEn: 'MongoDB fundamentals: documents, CRUD, indexes, aggregation.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'MongoDB lanjutan: aggregation lanjut, schema design, replikasi, performa.',
    descEn: 'Advanced MongoDB: advanced aggregation, schema design, replication, performance.',
  },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'dokumen-crud',
    titleId: 'Dokumen & CRUD Dasar', titleEn: 'Documents & Basic CRUD',
    programId: 'Operasi Dokumen', programEn: 'Document Operations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// Koneksi ke MongoDB
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
main().catch(console.error);`,
    objectivesId: ["Memahami dokumen BSON","Insert satu/banyak dokumen","Query dengan filter","Operator $gt, $lt, $in, $regex","Query nested document"],
    objectivesEn: ["Understand BSON documents","Insert single/multiple documents","Query with filters","Operators $gt, $lt, $in, $regex","Query nested documents"],
    explanationId: `### Dokumen BSON
MongoDB menyimpan data sebagai dokumen BSON (Binary JSON).

### Collection
Grup dokumen, seperti tabel di RDBMS.

### Insert
insertOne() untuk satu, insertMany() untuk banyak.

### Query
find() dengan filter object. Operator: $gt, $lt, $in, $regex.

### Nested Document
Query dengan dot notation: spesifikasi.ram.`,
    explanationEn: `### BSON Documents
MongoDB stores data as BSON documents.

### Collections
Group of documents, like RDBMS tables.

### Insert
insertOne() for single, insertMany() for multiple.

### Queries
find() with filter object. Operators: $gt, $lt, $in, $regex.

### Nested Documents
Query with dot notation: specs.ram.`,
    experimentsId: ["Insert dengan custom _id","Query dengan $or","Query array elements","Sort dan limit"],
    experimentsEn: ["Insert with custom _id","Query with $or","Query array elements","Sort and limit"],
    challengeId: `Koleksi buku: insert 10 buku, query berdasarkan kategori dan harga.`,
    challengeEn: `Books collection: insert 10 books, query by category and price.`,
    summaryId: `Minggu 1 dari 10: **Dokumen & CRUD Dasar** (Pemula).`,
    summaryEn: `Week 1 of 10: **Documents & Basic CRUD** (Beginner).`,
  },
  {
    week: 2, level: 'beginer', topicId: 'update-delete',
    titleId: 'Update & Delete Dokumen', titleEn: 'Update & Delete Documents',
    programId: 'Modifikasi Data', programEn: 'Data Modification',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const produk = client.db('toko_db').collection('produk');

    // UPDATE satu dokumen
    await produk.updateOne(
        { nama: 'Laptop ASUS' },
        { $set: { harga: 13000000, stok: 12 } }
    );

    // UPDATE banyak dokumen
    await produk.updateMany(
        { kategori: 'Aksesoris' },
        { $mul: { harga: 0.9 } }  // Diskon 10%
    );

    // UPDATE: tambah ke array
    await produk.updateOne(
        { nama: 'Laptop ASUS' },
        { $push: { tags: 'gaming' } }
    );

    // UPDATE: hapus dari array
    await produk.updateOne(
        { nama: 'Laptop ASUS' },
        { $pull: { tags: 'asus' } }
    );

    // UPSERT: update atau insert jika tidak ada
    await produk.updateOne(
        { nama: 'Webcam HD' },
        { $set: { harga: 650000, stok: 40, kategori: 'Aksesoris' } },
        { upsert: true }
    );

    // DELETE satu dokumen
    await produk.deleteOne({ nama: 'Headset Sony' });

    // DELETE banyak dokumen
    await produk.deleteMany({ stok: 0 });

    // REPLACE: ganti seluruh dokumen
    await produk.replaceOne(
        { nama: 'Mouse Logitech' },
        { nama: 'Mouse Logitech G502', harga: 450000, stok: 60, kategori: 'Aksesoris' }
    );

    const remaining = await produk.countDocuments();
    console.log('Sisa produk:', remaining);

    await client.close();
}
main().catch(console.error);`,
    objectivesId: ["updateOne dan updateMany","$set, $mul, $inc, $push, $pull","upsert: update atau insert","deleteOne dan deleteMany","replaceOne"],
    objectivesEn: ["updateOne and updateMany","$set, $mul, $inc, $push, $pull","upsert: update or insert","deleteOne and deleteMany","replaceOne"],
    explanationId: `### Update Operators
$set: ubah nilai, $mul: kali, $inc: tambah.

### Array Operators
$push: tambah ke array, $pull: hapus dari array.

### Upsert
Update jika ada, insert jika tidak ada.

### Delete
deleteOne: hapus satu, deleteMany: hapus banyak.

### Replace
Ganti seluruh dokumen dengan yang baru.`,
    explanationEn: `### Update Operators
$set: set value, $mul: multiply, $inc: increment.

### Array Operators
$push: add to array, $pull: remove from array.

### Upsert
Update if exists, insert if not.

### Delete
deleteOne: delete one, deleteMany: delete many.

### Replace
Replace entire document.`,
    experimentsId: ["$inc untuk stok","$addToSet (unique push)","deleteMany dengan filter","findAndModify"],
    experimentsEn: ["$inc for stock","$addToSet (unique push)","deleteMany with filter","findAndModify"],
    challengeId: `Sistem inventory: update stok, hapus expired, upsert produk baru.`,
    challengeEn: `Inventory system: update stock, delete expired, upsert new products.`,
    summaryId: `Minggu 2 dari 10: **Update & Delete Dokumen** (Pemula).`,
    summaryEn: `Week 2 of 10: **Update & Delete Documents** (Beginner).`,
  },
  {
    week: 3, level: 'beginer', topicId: 'index',
    titleId: 'Index & Performa', titleEn: 'Indexes & Performance',
    programId: 'Optimasi Query', programEn: 'Query Optimization',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const produk = client.db('toko_db').collection('produk');

    // Single field index
    await produk.createIndex({ kategori: 1 });
    await produk.createIndex({ harga: -1 });

    // Compound index
    await produk.createIndex({ kategori: 1, harga: -1 });

    // Multikey index (untuk array)
    await produk.createIndex({ tags: 1 });

    // Text index (untuk full-text search)
    await produk.createIndex({ nama: 'text' });

    // Unique index
    await produk.createIndex({ sku: 1 }, { unique: true });

    // Partial index
    await produk.createIndex(
        { harga: 1 },
        { partialFilterExpression: { stok: { $gt: 0 } } }
    );

    // TTL index (auto-delete setelah waktu)
    await produk.createIndex(
        { created_at: 1 },
        { expireAfterSeconds: 2592000 }  // 30 hari
    );

    // Lihat index
    const indexes = await produk.indexes();
    console.log('Indexes:', indexes.length);

    // Explain query plan
n    const plan = await produk.find({ kategori: 'Elektronik' }).explain('executionStats');
    console.log('Stage:', plan.queryPlanner.winningPlan.stage);
    console.log('Docs examined:', plan.executionStats.totalDocsExamined);
    console.log('Docs returned:', plan.executionStats.nReturned);

    // Cek index usage
    const stats = await produk.stats();
    console.log('Total docs:', stats.count);
    console.log('Index size:', stats.totalIndexSize);

    await client.close();
}
main().catch(console.error);`,
    objectivesId: ["Single field index","Compound index","Multikey index untuk array","Text index untuk search","Explain dan partial index"],
    objectivesEn: ["Single field index","Compound index","Multikey index for arrays","Text index for search","Explain and partial indexes"],
    explanationId: `### Single Field Index
Index pada satu field. 1 = ascending, -1 = descending.

### Compound Index
Index multi-field. Field order matters.

### Multikey Index
Otomatis dibuat untuk field array.

### Text Index
Full-text search pada field string.

### Explain
Melihat query plan dan statistik eksekusi.`,
    explanationEn: `### Single Field Index
Index on one field. 1 = ascending, -1 = descending.

### Compound Index
Multi-field index. Field order matters.

### Multikey Index
Auto-created for array fields.

### Text Index
Full-text search on string fields.

### Explain
View query plan and execution stats.`,
    experimentsId: ["Covered query","Index intersection","Wildcard index","Hashed index"],
    experimentsEn: ["Covered query","Index intersection","Wildcard index","Hashed index"],
    challengeId: `Koleksi besar: buat index yang tepat, ukur perbaikan performa.`,
    challengeEn: `Large collection: create appropriate indexes, measure performance improvement.`,
    summaryId: `Minggu 3 dari 10: **Index & Performa** (Pemula).`,
    summaryEn: `Week 3 of 10: **Indexes & Performance** (Beginner).`,
  },
  {
    week: 4, level: 'beginer', topicId: 'aggregation-basics',
    titleId: 'Aggregation Basics', titleEn: 'Aggregation Basics',
    programId: 'Pipeline Agregasi', programEn: 'Aggregation Pipeline',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const produk = client.db('toko_db').collection('produk');

    // $match: filter
    const elektronik = await produk.aggregate([
        { $match: { kategori: 'Elektronik' } }
    ]).toArray();
    console.log('Elektronik:', elektronik.length);

    // $group: kelompokkan dan agregasi
    const perKategori = await produk.aggregate([
        { $group: {
            _id: '$kategori',
            totalProduk: { $sum: 1 },
            rataHarga: { $avg: '$harga' },
            maxHarga: { $max: '$harga' },
            totalStok: { $sum: '$stok' }
        }},
        { $sort: { totalProduk: -1 } }
    ]).toArray();
    console.log('Per kategori:', perKategori);

    // $project: bentuk output
    const ringkas = await produk.aggregate([
        { $project: {
            nama: 1,
            harga: 1,
            kategori: 1,
            nilaiStok: { $multiply: ['$harga', '$stok'] },
            _id: 0
        }},
        { $sort: { nilaiStok: -1 } },
        { $limit: 5 }
    ]).toArray();
    console.log('Top 5 nilai stok:', ringkas);

    // $unwind: expand array
    const tags = await produk.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]).toArray();
    console.log('Tags:', tags);

    // $count
n    const total = await produk.aggregate([
        { $match: { harga: { $gt: 500000 } } },
        { $count: 'produk_mahal' }
    ]).toArray();
    console.log('Produk mahal:', total);

    await client.close();
}
main().catch(console.error);`,
    objectivesId: ["$match untuk filter","$group untuk agregasi","$project untuk bentuk output","$unwind untuk expand array","$sort dan $limit"],
    objectivesEn: ["$match for filtering","$group for aggregation","$project for shaping output","$unwind for expanding arrays","$sort and $limit"],
    explanationId: `### Aggregasi Pipeline
Tahapan transformasi data: $match -> $group -> $project.

### $match
Filter dokumen, seperti WHERE di SQL.

### $group
Kelompokkan dan agregasi: $sum, $avg, $max, $min.

### $project
Bentuk output: pilih field, hitung field baru.

### $unwind
Expand array menjadi dokumen terpisah.`,
    explanationEn: `### Aggregation Pipeline
Data transformation stages: $match -> $group -> $project.

### $match
Filter documents, like SQL WHERE.

### $group
Group and aggregate: $sum, $avg, $max, $min.

### $project
Shape output: select fields, compute new fields.

### $unwind
Expand array into separate documents.`,
    experimentsId: ["$bucket untuk binning","$facet untuk multi-aggregation","$addFields","Lookup sederhana"],
    experimentsEn: ["$bucket for binning","$facet for multi-aggregation","$addFields","Simple lookup"],
    challengeId: `Laporan penjualan: agregasi per kategori, top produk, statistik harga.`,
    challengeEn: `Sales report: aggregation per category, top products, price statistics.`,
    summaryId: `Minggu 4 dari 10: **Aggregation Basics** (Pemula).`,
    summaryEn: `Week 4 of 10: **Aggregation Basics** (Beginner).`,
  },
  {
    week: 5, level: 'beginer', topicId: 'schema-design',
    titleId: 'Schema Design Patterns', titleEn: 'Schema Design Patterns',
    programId: 'Pola Desain Schema', programEn: 'Schema Design Patterns',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// Pola Schema Design MongoDB

// 1. Embedding (1-to-Few)
const pelangganEmbedded = {
    _id: ObjectId('...'),
    nama: 'Budi Santoso',
    email: 'budi@email.com',
    alamat: [
        { jalan: 'Jl. Sudirman', kota: 'Jakarta', utama: true },
        { jalan: 'Jl. Thamrin', kota: 'Jakarta', utama: false }
    ]
};

// 2. Referencing (1-to-Many)
const pesananRef = {
    _id: ObjectId('...'),
    pelanggan_id: ObjectId('...'),  // Reference ke pelanggan
    tanggal: new Date(),
    items: [
        { produk_id: ObjectId('...'), nama: 'Laptop', qty: 1, harga: 12500000 },
        { produk_id: ObjectId('...'), nama: 'Mouse', qty: 2, harga: 350000 }
    ],
    total: 13200000
};

// 3. Lookup (join)
async function getPesananWithPelanggan() {
    const pesanan = client.db('toko_db').collection('pesanan');
    return await pesanan.aggregate([
        { $lookup: {
            from: 'pelanggan',
            localField: 'pelanggan_id',
            foreignField: '_id',
            as: 'pelanggan'
        }},
        { $unwind: '$pelanggan' },
        { $project: {
            'pelanggan.nama': 1,
            'pelanggan.email': 1,
            total: 1,
            tanggal: 1
        }}
    ]).toArray();
}

// 4. Pola Bucket (time-series)
const sensorReading = {
    sensor_id: 'temp-01',
    timestamp: new Date(),
    value: 25.5
};

// 5. Pola Outlier (pola subscription)
const userWithOutlier = {
    _id: ObjectId('...'),
    nama: 'Budi',
    subscription: 'premium'  // Outlier field
};`,
    objectivesId: ["Embedding vs Referencing","Pola embedding 1-to-Few","Pola referencing 1-to-Many","$lookup untuk join","Pola bucket dan outlier"],
    objectivesEn: ["Embedding vs Referencing","Embedding pattern 1-to-Few","Referencing pattern 1-to-Many","$lookup for joins","Bucket and outlier patterns"],
    explanationId: `### Embedding
Simpan data terkait dalam satu dokumen. Bagus untuk 1-to-Few.

### Referencing
Simpan reference (_id) ke dokumen lain. Bagus untuk 1-to-Many.

### $lookup
Left outer join antar collection.

### Bucket Pattern
Kelompokkan data time-series per waktu.

### Outlier Pattern
Field yang jarang dipakai di dokumen terpisah.`,
    explanationEn: `### Embedding
Store related data in one document. Good for 1-to-Few.

### Referencing
Store reference (_id) to another document. Good for 1-to-Many.

### $lookup
Left outer join between collections.

### Bucket Pattern
Group time-series data by time.

### Outlier Pattern
Rarely used fields in separate document.`,
    experimentsId: ["Subdocument vs reference","Array of references","Computed pattern","Schema versioning"],
    experimentsEn: ["Subdocument vs reference","Array of references","Computed pattern","Schema versioning"],
    challengeId: `Desain schema e-commerce: pelanggan, pesanan, produk dengan pola tepat.`,
    challengeEn: `Design e-commerce schema: customers, orders, products with appropriate patterns.`,
    summaryId: `Minggu 5 dari 10: **Schema Design Patterns** (Pemula).`,
    summaryEn: `Week 5 of 10: **Schema Design Patterns** (Beginner).`,
  },
  {
    week: 6, level: 'intermediate', topicId: 'aggregation-advanced',
    titleId: 'Aggregation Lanjutan', titleEn: 'Advanced Aggregation',
    programId: 'Pipeline Kompleks', programEn: 'Complex Pipelines',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const penjualan = client.db('toko_db').collection('penjualan');

    // $facet: multi-aggregation dalam satu query
    const facetResult = await penjualan.aggregate([
        { $facet: {
            perKategori: [
                { $group: { _id: '$kategori', total: { $sum: '$jumlah' } } },
                { $sort: { total: -1 } }
            ],
            statsHarga: [
                { $group: { _id: null,
                    avg: { $avg: '$harga' },
                    min: { $min: '$harga' },
                    max: { $max: '$harga' }
                }}
            ],
            topProduk: [
                { $sort: { jumlah: -1 } },
                { $limit: 5 }
            ]
        }}
    ]).toArray();

    // $bucket: binning data
    const buckets = await penjualan.aggregate([
        { $bucket: {
            groupBy: '$harga',
            boundaries: [0, 500000, 1000000, 5000000, 15000000],
            default: 'Lainnya',
            output: {
                count: { $sum: 1 },
                produk: { $push: '$nama' }
            }
        }}
    ]).toArray();

    // $addFields: tambah field computed
    const withMargin = await penjualan.aggregate([
        { $addFields: {
            hargaSetelahDiskon: { $multiply: ['$harga', 0.9] },
            kategoriHarga: {
                $switch: {
                    branches: [
                        { case: { $lt: ['$harga', 500000] }, then: 'Murah' },
                        { case: { $lt: ['$harga', 2000000] }, then: 'Sedang' }
                    ],
                    default: 'Mahal'
                }
            }
        }}
    ]).toArray();

    // $merge: output ke collection lain
    await penjualan.aggregate([
        { $group: {
            _id: '$kategori',
            totalPenjualan: { $sum: '$jumlah' },
            revenue: { $sum: { $multiply: ['$jumlah', '$harga'] } }
        }},
        { $merge: { into: 'laporan_kategori', whenMatched: 'replace' } }
    ]);

    await client.close();
}
main().catch(console.error);`,
    objectivesId: ["$facet untuk multi-aggregation","$bucket untuk binning","$addFields dan $switch","$merge ke collection lain","$setWindowFields"],
    objectivesEn: ["$facet for multi-aggregation","$bucket for binning","$addFields and $switch","$merge to collection","$setWindowFields"],
    explanationId: `### $facet
Multiple aggregation pipelines dalam satu query.

### $bucket
Binning data ke dalam kategori rentang.

### $addFields
Tambah field computed ke dokumen.

### $merge
Output aggregation ke collection lain.

### $setWindowFunctions
Window functions: $denseRank, $shift.`,
    explanationEn: `### $facet
Multiple aggregation pipelines in one query.

### $bucket
Binning data into range categories.

### $addFields
Add computed fields to documents.

### $merge
Output aggregation to another collection.

### $setWindowFields
Window functions: $denseRank, $shift.`,
    experimentsId: ["$redact untuk access control","$graphLookup untuk tree","$unionWith","Custom $function"],
    experimentsEn: ["$redact for access control","$graphLookup for trees","$unionWith","Custom $function"],
    challengeId: `Dashboard analytics: facet, bucket, merge ke laporan.`,
    challengeEn: `Analytics dashboard: facet, bucket, merge to reports.`,
    summaryId: `Minggu 6 dari 10: **Aggregation Lanjutan** (Menengah).`,
    summaryEn: `Week 6 of 10: **Advanced Aggregation** (Intermediate).`,
  },
  {
    week: 7, level: 'intermediate', topicId: 'replikasi',
    titleId: 'Replica Set & Sharding', titleEn: 'Replica Sets & Sharding',
    programId: 'High Availability', programEn: 'High Availability',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// Replica Set Configuration
// mongod --replSet rs0 --port 27017

// Inisialisasi replica set
rs.initiate({
    _id: 'rs0',
    members: [
        { _id: 0, host: 'mongo1:27017', priority: 2 },
        { _id: 1, host: 'mongo2:27017', priority: 1 },
        { _id: 2, host: 'mongo3:27017', priority: 1 },
        { _id: 3, host: 'mongo4:27017', arbiterOnly: true }
    ]
});

// Cek status replica set
rs.status();

// Read preference
const client = new MongoClient('mongodb://mongo1:27017,mongo2:27017/?replicaSet=rs0', {
    readPreference: 'secondaryPreferred',
    readConcern: { level: 'majority' },
    writeConcern: { w: 'majority', j: true, wtimeout: 5000 }
});

// Write concern
await db.collection('pesanan').insertOne(
    { nama: 'Order #1', total: 1000000 },
    { writeConcern: { w: 'majority', j: true } }
);

// Read concern
const data = await db.collection('produk')
    .find()
    .readConcern('majority')
    .readPreference('secondary')
    .toArray();

// Sharding (mongos router)
// sh.enableSharding('toko_db')
// sh.shardCollection('toko_db.produk', { kategori: 1 })
// sh.addShardTag('shard0000', 'elektronik')`,
    objectivesId: ["Replica set setup","Read preference","Write concern","Read concern","Sharding basics"],
    objectivesEn: ["Replica set setup","Read preference","Write concern","Read concern","Sharding basics"],
    explanationId: `### Replica Set
Set server MongoDB dengan primary dan secondaries.

### Read Preference
Pilih node untuk read: primary, secondary, nearest.

### Write Concern
Konfirmasi write: w=1 (primary), w=majority.

### Read Concern
Level isolasi: local, majority, linearizable.

### Sharding
Distribusi data ke multiple server.`,
    explanationEn: `### Replica Set
Set of MongoDB servers with primary and secondaries.

### Read Preference
Choose node for reads: primary, secondary, nearest.

### Write Concern
Write acknowledgment: w=1, w=majority.

### Read Concern
Isolation level: local, majority, linearizable.

### Sharding
Distribute data across multiple servers.`,
    experimentsId: ["Automatic failover","Sharding strategy","Zone sharding","Change streams"],
    experimentsEn: ["Automatic failover","Sharding strategy","Zone sharding","Change streams"],
    challengeId: `Setup replica set: 3 nodes + arbiter + monitoring.`,
    challengeEn: `Setup replica set: 3 nodes + arbiter + monitoring.`,
    summaryId: `Minggu 7 dari 10: **Replica Set & Sharding** (Menengah).`,
    summaryEn: `Week 7 of 10: **Replica Sets & Sharding** (Intermediate).`,
  },
  {
    week: 8, level: 'intermediate', topicId: 'performa-tuning',
    titleId: 'Performa & Tuning', titleEn: 'Performance & Tuning',
    programId: 'Optimasi MongoDB', programEn: 'MongoDB Optimization',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('toko_db');
    const produk = db.collection('produk');

    // Analisis query plan
    const plan = await produk.find({
        kategori: 'Elektronik',
        harga: { $gt: 1000000 }
    }).explain('allPlansExecution');

    console.log('Stage:', plan.queryPlanner.winningPlan.stage);
    console.log('Index used:', plan.queryPlanner.winningPlan.inputStage?.indexName);
    console.log('Docs examined:', plan.executionStats.totalDocsExamined);
    console.log('Execution time:', plan.executionStats.executionTimeMillis, 'ms');

    // Profiler
    db.setProfilingLevel(2);  // Profile semua query
    db.setProfilingLevel(1, { slowms: 100 });  // Query > 100ms

    const slowQueries = db.system.profile.find(
        { millis: { $gt: 100 } }
    ).sort({ millis: -1 }).limit(10).toArray();

    // Server status
    const serverStatus = await db.admin().serverStatus();
    console.log('Connections:', serverStatus.connections.current);
    console.log('Memory resident:', serverStatus.mem.resident, 'MB');
    console.log('Query executor:', serverStatus.metrics.queryExecutor.scanned);

    // Current operations
    const ops = await db.admin().command({ currentOp: 1 });
    const activeOps = ops.inprog.filter(op => op.secs_running > 1);
    console.log('Long running ops:', activeOps.length);

    // Compact collection
    await db.command({ compact: 'produk' });

    // Caching strategy
    // WiredTiger cache: 50% RAM - 1GB
    // wiredTigerCacheSizeGB: 4

    await client.close();
}
main().catch(console.error);`,
    objectivesId: ["Explain allPlansExecution","Database profiler","Server status monitoring","Current operations","Compact dan cache"],
    objectivesEn: ["Explain allPlansExecution","Database profiler","Server status monitoring","Current operations","Compact and cache"],
    explanationId: `### Explain
Melihat query plan dan membandingkan index.

### Profiler
Catat query lambat untuk analisis.

### Server Status
Monitoring koneksi, memory, dan operasi.

### Current Op
Lihat operasi yang sedang berjalan.

### Compact
Defragmentasi storage WiredTiger.`,
    explanationEn: `### Explain
View query plan and compare indexes.

### Profiler
Log slow queries for analysis.

### Server Status
Monitor connections, memory, operations.

### Current Ops
View running operations.

### Compact
Defragment WiredTiger storage.`,
    experimentsId: ["Index intersection","Covered queries","Projection optimization","Batch operations"],
    experimentsEn: ["Index intersection","Covered queries","Projection optimization","Batch operations"],
    challengeId: `Optimasi: identifikasi slow query, tambah index, setup profiler.`,
    challengeEn: `Optimize: identify slow queries, add indexes, setup profiler.`,
    summaryId: `Minggu 8 dari 10: **Performa & Tuning** (Menengah).`,
    summaryEn: `Week 8 of 10: **Performance & Tuning** (Intermediate).`,
  },
  {
    week: 9, level: 'intermediate', topicId: 'change-streams',
    titleId: 'Change Streams & Transactions', titleEn: 'Change Streams & Transactions',
    programId: 'Realtime & ACID', programEn: 'Realtime & ACID',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `async function main() {
    const client = new MongoClient('mongodb://localhost:27017/?replicaSet=rs0');
    await client.connect();
    const db = client.db('toko_db');
    const produk = db.collection('produk');
    const pesanan = db.collection('pesanan');

    // Change Streams: realtime monitoring
    const changeStream = produk.watch([
        { $match: { operationType: { $in: ['insert', 'update'] } } }
    ]);

    changeStream.on('change', (change) => {
        console.log('Operation:', change.operationType);
        console.log('Document:', change.fullDocument);
        console.log('Updated fields:', change.updateDescription?.updatedFields);
    });

    // Multi-document ACID transaction
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            // Buat pesanan
            await pesanan.insertOne({
                pelanggan_id: ObjectId('...'),
                items: [{ produk_id: ObjectId('...'), qty: 1, harga: 12500000 }],
                total: 12500000,
                status: 'pending'
            }, { session });

            // Update stok
            await produk.updateOne(
                { _id: ObjectId('...') },
                { $inc: { stok: -1 } },
                { session }
            );

            // Update status
            await pesanan.updateOne(
                { pelanggan_id: ObjectId('...') },
                { $set: { status: 'completed' } },
                { session }
            );
        }, {
            readConcern: { level: 'snapshot' },
            writeConcern: { w: 'majority' },
            readPreference: 'primary'
        });
        console.log('Transaction committed');
    } catch (err) {
        console.error('Transaction aborted:', err);
    } finally {
        await session.endSession();
    }

    await client.close();
}
main().catch(console.error);`,
    objectivesId: ["Change streams untuk realtime","Multi-document ACID","withTransaction","Read/write concern di transaksi","Session management"],
    objectivesEn: ["Change streams for realtime","Multi-document ACID","withTransaction","Read/write concern in transactions","Session management"],
    explanationId: `### Change Streams
Monitor perubahan data secara realtime.

### ACID Transactions
Multi-document transactions dengan session.

### withTransaction
Wrapper untuk commit/rollback otomatis.

### Concerns
Read concern dan write concern di transaksi.

### Session
Client session untuk transaksi.`,
    explanationEn: `### Change Streams
Monitor data changes in realtime.

### ACID Transactions
Multi-document transactions with sessions.

### withTransaction
Wrapper for auto commit/rollback.

### Concerns
Read and write concern in transactions.

### Sessions
Client sessions for transactions.`,
    experimentsId: ["Resume token","Transaction retry","Bulk in transaction","Capped collection"],
    experimentsEn: ["Resume tokens","Transaction retry","Bulk in transaction","Capped collections"],
    challengeId: `Sistem order: transaction + change stream notification.`,
    challengeEn: `Order system: transaction + change stream notification.`,
    summaryId: `Minggu 9 dari 10: **Change Streams & Transactions** (Menengah).`,
    summaryEn: `Week 9 of 10: **Change Streams & Transactions** (Intermediate).`,
  },
  {
    week: 10, level: 'intermediate', topicId: 'capstone-project',
    titleId: 'Capstone: E-Commerce MongoDB', titleEn: 'Capstone: E-Commerce MongoDB',
    programId: 'Database Production-Ready', programEn: 'Production-Ready Database',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// CAPSTONE: E-Commerce MongoDB Production-Ready

// 1. Schema Validation
const produkValidator = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['nama', 'harga', 'kategori'],
        properties: {
            nama: { bsonType: 'string', description: 'Nama produk wajib' },
            harga: { bsonType: 'double', minimum: 0 },
            stok: { bsonType: 'int', minimum: 0 },
            kategori: { enum: ['Elektronik','Aksesoris','Audio','Storage'] },
            tags: { bsonType: 'array', items: { bsonType: 'string' } },
            created_at: { bsonType: 'date' }
        }
    }
};

await db.createCollection('produk', { validator: produkValidator });

// 2. Indexes
await produk.createIndex({ kategori: 1, harga: -1 });
await produk.createIndex({ nama: 'text' });
await produk.createIndex({ tags: 1 });
await produk.createIndex({ sku: 1 }, { unique: true });

// 3. Aggregation pipeline laporan
const laporan = await db.collection('order_items').aggregate([
    { $lookup: {
        from: 'produk',
        localField: 'produk_id',
        foreignField: '_id',
        as: 'produk'
    }},
    { $unwind: '$produk' },
    { $group: {
        _id: '$produk.kategori',
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: { $multiply: ['$qty', '$harga'] } },
        avgOrderValue: { $avg: { $multiply: ['$qty', '$harga'] } }
    }},
    { $sort: { totalRevenue: -1 } },
    { $merge: { into: 'laporan_kategori', whenMatched: 'replace' } }
]).toArray();

// 4. View
await db.createView('v_top_produk', 'order_items', [
    { $group: { _id: '$produk_id', totalSold: { $sum: '$qty' } } },
    { $sort: { totalSold: -1 } },
    { $limit: 10 }
]);

// 5. Change stream untuk notifikasi
const stream = db.collection('pesanan').watch([
    { $match: { operationType: 'insert' } }
]);
stream.on('change', (doc) => console.log('New order:', doc.fullDocument));`,
    objectivesId: ["Schema validation","Indexes optimal","Aggregation pipeline kompleks","View dari pipeline","Change streams"],
    objectivesEn: ["Schema validation","Optimal indexes","Complex aggregation pipeline","Views from pipelines","Change streams"],
    explanationId: `### Schema Validation
Validasi dokumen dengan JSON Schema.

### Indexes
Compound, text, unique, multikey indexes.

### Aggregation
Pipeline kompleks dengan lookup, group, merge.

### View
Read-only view dari aggregation pipeline.

### Change Streams
Realtime monitoring untuk notifikasi.`,
    explanationEn: `### Schema Validation
Document validation with JSON Schema.

### Indexes
Compound, text, unique, multikey indexes.

### Aggregation
Complex pipeline with lookup, group, merge.

### Views
Read-only views from aggregation pipelines.

### Change Streams
Realtime monitoring for notifications.`,
    experimentsId: ["Time series collection","Atlas search","Data lake","Custom roles"],
    experimentsEn: ["Time series collections","Atlas search","Data lake","Custom roles"],
    challengeId: `Deploy MongoDB e-commerce: schema, indexes, aggregation, views, change streams.`,
    challengeEn: `Deploy MongoDB e-commerce: schema, indexes, aggregation, views, change streams.`,
    summaryId: `Minggu 10 dari 10: **Capstone: E-Commerce MongoDB** (Menengah). Selesai!`,
    summaryEn: `Week 10 of 10: **Capstone: E-Commerce MongoDB** (Intermediate). Complete!`,
  },
];

for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
