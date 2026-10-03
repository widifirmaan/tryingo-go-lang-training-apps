import sys
import os

def get_track():
    levels = [
        {
            'levelId': 'beginer',
            'nameId': 'Fondasi Dokumen BSON & CRUD Operasional',
            'nameEn': 'BSON Document Foundations & Operational CRUD',
            'descId': 'Arsitektur NoSQL BSON, JSON Schema validation, pemodelan data Embedding vs Referencing, compound & multikey indexing, serta aggregation pipeline dasar.',
            'descEn': 'NoSQL BSON architecture, JSON Schema validation, Embedding vs Referencing data modeling, compound & multikey indexing, and basic aggregation pipelines.',
        },
        {
            'levelId': 'intermediate',
            'nameId': 'Agregasi Lanjutan, Replikasi & Skalabilitas Sharding',
            'nameEn': 'Advanced Aggregation, Replication & Sharding Scalability',
            'descId': 'Pipeline $lookup dan $facet, transaksi multi-dokumen ACID, replika set & konsistensi data (Write/Read Concern), sharded cluster, dan capstone IoT telemetry pipeline.',
            'descEn': '$lookup and $facet pipelines, multi-document ACID transactions, replica sets & data consistency (Write/Read Concern), sharded clusters, and IoT telemetry capstone.',
        }
    ]

    modules = [
        # WEEK 1
        {
            'week': 1,
            'level': 'beginer',
            'levelNameId': 'Fondasi Dokumen BSON & CRUD Operasional',
            'levelNameEn': 'BSON Document Foundations & Operational CRUD',
            'topicId': 'arsitektur-bson-json-schema-dan-crud-modern',
            'titleId': 'Arsitektur BSON, JSON Schema Validation & CRUD Modern',
            'titleEn': 'BSON Architecture, JSON Schema Validation & Modern CRUD',
            'language': 'javascript',
            'programId': 'Pembuatan Koleksi Terstruktur dengan $jsonSchema Validation dan Operasi CRUD Bersyarat',
            'programEn': 'Structured Collection Setup with $jsonSchema Validation and Conditional CRUD',
            'code': """// MongoDB Shell (mongosh) script
use telemetry_db;

// 1. Drop collection if exists for clean reproducible setup
db.devices.drop();

// 2. Create collection with strict JSON Schema Validation
db.createCollection("devices", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["serialNumber", "deviceType", "status", "firmwareVersion", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        serialNumber: {
          bsonType: "string",
          pattern: "^DEV-[0-9]{4}-[A-Z]{2}$",
          description: "Must match format DEV-YYYY-XX"
        },
        deviceType: {
          enum: ["TEMPERATURE_SENSOR", "PRESSURE_GAUGE", "FLOW_METER", "GATEWAY"],
          description: "Must be a predefined device type"
        },
        status: {
          enum: ["ACTIVE", "MAINTENANCE", "DECOMMISSIONED"],
          description: "Operational status"
        },
        firmwareVersion: {
          bsonType: "string",
          description: "Semver version string"
        },
        batteryLevel: {
          bsonType: "int",
          minimum: 0,
          maximum: 100,
          description: "Battery percentage (0-100)"
        },
        location: {
          bsonType: "object",
          required: ["facilityId", "zone"],
          properties: {
            facilityId: { bsonType: "string" },
            zone: { bsonType: "string" }
          }
        },
        createdAt: { bsonType: "date" }
      }
    }
  },
  validationAction: "error", // Reject invalid documents
  validationLevel: "strict"
});

// 3. Insert valid documents
db.devices.insertMany([
  {
    serialNumber: "DEV-2026-TX",
    deviceType: "TEMPERATURE_SENSOR",
    status: "ACTIVE",
    firmwareVersion: "2.4.1",
    batteryLevel: NumberInt(88),
    location: { facilityId: "FAC-JKT-01", zone: "Cleanroom Alpha" },
    createdAt: new Date()
  },
  {
    serialNumber: "DEV-2026-PX",
    deviceType: "PRESSURE_GAUGE",
    status: "ACTIVE",
    firmwareVersion: "1.9.0",
    batteryLevel: NumberInt(94),
    location: { facilityId: "FAC-JKT-01", zone: "Compressor Room" },
    createdAt: new Date()
  }
]);

// 4. Atomic conditional update using operators ($set, $inc, $currentDate)
db.devices.updateOne(
  { serialNumber: "DEV-2026-TX", status: "ACTIVE" },
  {
    $set: { firmwareVersion: "2.5.0" },
    $inc: { batteryLevel: NumberInt(-3) },
    $currentDate: { lastInspectedAt: true }
  }
);

// 5. Query matching documents with field projection
const activeDevices = db.devices.find(
  { "location.facilityId": "FAC-JKT-01", batteryLevel: { $gt: 50 } },
  { serialNumber: 1, deviceType: 1, batteryLevel: 1, _id: 0 }
).toArray();

printjson(activeDevices);
""",
            'objectivesId': [
                'Memahami perbedaan arsitektural antara dokumen JSON dan representasi biner BSON',
                'Menggunakan tipe data presisi BSON: ObjectId, Date, NumberInt, NumberLong, dan Decimal128',
                'Menerapkan skema validasi server-side menggunakan validator $jsonSchema',
                'Menguasai operasi modifikasi atomic: $set, $inc, $push, $pull, dan $currentDate'
            ],
            'objectivesEn': [
                'Understand architectural distinctions between human-readable JSON and binary BSON serialization',
                'Work with native BSON data types: ObjectId, Date, NumberInt, NumberLong, and Decimal128',
                'Enforce strict server-side schema governance with $jsonSchema validation rules',
                'Master atomic document mutation operators: $set, $inc, $push, $pull, and $currentDate'
            ],
            'explanationId': """### Mengapa BSON, Bukan Sekadar JSON?
Meskipun MongoDB dikenal sebagai database dokumen berformat JSON, di balik layar data disimpan dan ditransmisikan dalam format **BSON** (*Binary JSON*). JSON teks standar memiliki keterbatasan fatal: tidak dapat membedakan integer vs floating point (semuanya adalah `number`), tidak memiliki tipe data tanggal native (hanya string), dan memerlukan parsing teks yang lambat. BSON menyematkan panjang byte dan penanda tipe data, memungkinkan mesin MongoDB melewati (*skip*) pembacaan field yang tidak diperlukan secara instan.

### Anatomi ObjectId (12-Byte)
Primary key default `_id` adalah **ObjectId** 12-byte yang terdiri dari:
1. **4-byte Timestamp**: Waktu pembuatan dokumen dalam detik Unix (membuat dokumen otomatis terurut waktu).
2. **5-byte Random Value**: Unik untuk setiap mesin server dan proses.
3. **3-byte Counter**: Penghitung sekuensial yang selalu bertambah, direset pada angka awal acak.
Kombinasi ini menjamin keunikan global tanpa perlu penguncian terpusat.

### Integritas Skema dengan $jsonSchema
Kelemahan mitos bahwa "NoSQL tidak punya skema" diselesaikan oleh **$jsonSchema**. MongoDB mengizinkan kita menetapkan batasan tipe data, regex format, enum nilai, dan field wajib langsung di tingkat koleksi. Jika aplikasi mencoba menyisipkan dokumen yang melanggar aturan, MongoDB melempar error dan menolak dokumen tersebut.

### Modifikasi Atomic dengan Operator Pembaruan
Di MongoDB, Anda tidak boleh membaca dokumen ke memori, mengubah nilai, lalu menimpanya (*read-modify-write anti-pattern*), karena ini memicu race condition. Operator seperti `$inc: { batteryLevel: -3 }` atau `$set: { status: "ACTIVE" }` dieksekusi secara atomic langsung di server engine tanpa mengunci seluruh dokumen.""",
            'explanationEn': """### The Architecture of BSON vs JSON
While MongoDB is universally conceptualized as a JSON document database, data is internally stored and communicated using **BSON** (*Binary JSON*). Standard text-based JSON suffers from fundamental limitations: it cannot differentiate between 32-bit integers, 64-bit integers, and doubles (flattening them into IEEE-754 numbers), lacks native timestamp types, and incurs expensive text parsing overhead. BSON encodes field lengths and binary type headers, allowing the storage engine to seek across attributes at line rate.

### ObjectId Deconstructed (12-Byte Anatomy)
The standard `_id` is an autonomous 12-byte **ObjectId** composed of:
1. **4-byte Timestamp**: Seconds since the Unix epoch (rendering documents intrinsically time-sortable).
2. **5-byte Random Value**: Unique to the physical process instance and host.
3. **3-byte Incrementing Counter**: Sequential integer incremented per insertion.
This architecture guarantees collision-free global uniqueness without centralized coordination.

### Schema Governance via $jsonSchema Validation
The hazardous misconception that "NoSQL implies schema-free chaos" is dismantled by **$jsonSchema**. MongoDB enables robust collection-level validation rules enforcing types, regular expressions, enum constraints, and mandatory attributes. Documents violating structural invariants are rejected at the storage layer.

### Atomic Mutations with Update Operators
Developers must avoid the classical read-modify-write race condition anti-pattern. Update operators such as `$inc: { batteryLevel: -3 }` or `$set: { status: "ACTIVE" }` evaluate atomically directly inside the storage engine without requiring high-latency application-tier locking.""",
            'beginnerId': """Bayangkan dokumen JSON seperti surat kertas biasa yang ditulis tangan. Jika Anda ingin mencari paragraf ketiga, Anda harus membaca dari atas ke bawah. 

BSON seperti map berkas dengan tab indeks plastik berwarna: map itu langsung memberi tahu di mana letak halaman tanggal, halaman angka, dan tanda tangan tanpa harus membaca seluruh lembaran. Sedangkan `$jsonSchema` seperti petugas keamanan di depan loket yang memastikan formulir pendaftaran Anda sudah diisi lengkap sebelum dimasukkan ke dalam arsip.""",
            'beginnerEn': """Think of a JSON document like a handwritten letter. To find a phone number midway down the page, you must read the text line by line.

BSON is like an indexed binder featuring color-coded tab dividers: it instantly reveals where the date, the numeric ledger, and the signature reside without scanning the entire page. Meanwhile, `$jsonSchema` acts like a stern security inspector at the door checking that every mandatory field on your paperwork is signed before accepting it into the archives.""",
            'experimentsId': [
                'Coba masukkan dokumen dengan serialNumber yang tidak sesuai format regex dan perhatikan pesan error Document failed validation',
                'Ekstrak timestamp pembuatan dokumen dari ObjectId menggunakan fungsi doc._id.getTimestamp()',
                'Gunakan operator $push dan $pull untuk memanipulasi array riwayat inspeksi perangkat',
                'Uji operasi findOneAndUpdate() dengan opsi returnDocument: "after" untuk mendapatkan nilai dokumen pasca update'
            ],
            'experimentsEn': [
                'Attempt inserting a document with a malformed serialNumber and inspect the validation failure diagnostic',
                'Extract the intrinsic creation timestamp from an ObjectId using doc._id.getTimestamp()',
                'Apply $push and $pull operators to modify an array of device maintenance logs',
                'Experiment with findOneAndUpdate() specifying returnDocument: "after" to retrieve post-mutation states'
            ],
            'challengeId': 'Tambahkan aturan validasi $jsonSchema baru: pastikan setiap perangkat wajib memiliki array `sensors` bertipe objek dengan properti `sensorType` dan `calibrationDate`, dengan minimal memiliki 1 elemen array (`minItems: 1`).',
            'challengeEn': 'Extend the $jsonSchema validation rules: mandate an embedded `sensors` array of objects containing `sensorType` and `calibrationDate`, requiring at least one element (`minItems: 1`).',
            'summaryId': 'Anda telah menguasai arsitektur penyimpanan BSON, anatomi ObjectId, tata kelola data dengan $jsonSchema validation, dan mutasi atomic dokumen dengan operator update.',
            'summaryEn': 'You have mastered BSON storage mechanics, ObjectId anatomy, server-side data governance via $jsonSchema validation, and atomic document mutations using native operators.'
        },

        # WEEK 2
        {
            'week': 2,
            'level': 'beginer',
            'levelNameId': 'Fondasi Dokumen BSON & CRUD Operasional',
            'levelNameEn': 'BSON Document Foundations & Operational CRUD',
            'topicId': 'pemodelan-data-nosql-embedding-vs-referencing',
            'titleId': 'Pemodelan Data NoSQL: Embedding vs Referencing',
            'titleEn': 'NoSQL Data Modeling: Embedding vs Referencing',
            'language': 'javascript',
            'programId': 'Penerapan Pola Desain Subset Pattern dan Denormalisasi Selektif',
            'programEn': 'Implementation of the Subset Design Pattern and Selective Denormalization',
            'code': """// MongoDB Shell (mongosh)
use telemetry_db;

db.facilities.drop();
db.sensor_readings.drop();

// Pattern 1: Embedded Pattern (One-to-Few relationship, bounded growth)
// Facility contains its core configuration and contact details directly
db.facilities.insertOne({
  _id: "FAC-JKT-01",
  name: "Jakarta Datacenter Tier-3",
  address: {
    street: "Jl. TB Simatupang No. 18",
    city: "Jakarta Selatan",
    country: "ID"
  },
  // Embedded contacts (bounded array: rarely exceeds 3-5 contacts)
  emergencyContacts: [
    { name: "Bambang Wijaya", role: "Facility Manager", phone: "+62811223344" },
    { name: "Ratna Sari", role: "Chief Security Officer", phone: "+62811556677" }
  ],
  // Subset Pattern: Keep only the 5 most recent alerts for instant UI rendering
  recentAlerts: [
    { code: "OVERHEAT", severity: "CRITICAL", timestamp: new Date("2026-03-10T08:30:00Z") },
    { code: "VOLT_DROP", severity: "WARNING", timestamp: new Date("2026-03-10T09:15:00Z") }
  ],
  totalAlertsCount: 1420 // Denormalized counter
});

// Pattern 2: Referenced Pattern (One-to-Many / One-to-Millions unbounded relationship)
// Massive stream of sensor readings stored in a separate collection referencing facility
db.sensor_readings.insertMany([
  {
    facilityId: "FAC-JKT-01", // Reference link
    deviceId: "DEV-2026-TX",
    metric: "temperature",
    value: 23.8,
    unit: "CELSIUS",
    timestamp: new Date("2026-03-10T10:00:00Z")
  },
  {
    facilityId: "FAC-JKT-01",
    deviceId: "DEV-2026-TX",
    metric: "temperature",
    value: 24.1,
    unit: "CELSIUS",
    timestamp: new Date("2026-03-10T10:01:00Z")
  }
]);

// Atomic append to recentAlerts while keeping the subset array capped at 5 items using $slice
db.facilities.updateOne(
  { _id: "FAC-JKT-01" },
  {
    $push: {
      recentAlerts: {
        $each: [{ code: "DOOR_OPEN", severity: "INFO", timestamp: new Date() }],
        $sort: { timestamp: -1 },
        $slice: 5 // Retain only latest 5 entries!
      }
    },
    $inc: { totalAlertsCount: 1 }
  }
);

// Inspect facility document
printjson(db.facilities.findOne({ _id: "FAC-JKT-01" }));
""",
            'objectivesId': [
                'Memahami panduan keputusan arsitektur: Kapan harus Embed vs Kapan harus Reference',
                'Mencegah fenomena anti-pattern Unbounded Array Growth (batas ukuran 16MB per dokumen BSON)',
                'Menerapkan Subset Pattern menggunakan modifier $push dengan $slice dan $sort',
                'Menggunakan denormalisasi selektif untuk mengeliminasi operasi join yang sering dipanggil'
            ],
            'objectivesEn': [
                'Master architectural decision frameworks: When to Embed vs When to Reference',
                'Prevent the catastrophic Unbounded Array Growth anti-pattern (16MB BSON document limit)',
                'Implement the Subset Pattern combining $push modifiers with $slice and $sort',
                'Leverage selective denormalization to eliminate high-frequency join round trips'
            ],
            'explanationId': """### Kaidah Emas: Embedding vs Referencing
Aturan mendasar pemodelan data di MongoDB: **Data yang diakses bersamaan harus disimpan bersamaan**.
- **Embedding (Denormalized)**: Ideal untuk relasi *One-to-One* atau *One-to-Few* yang bersifat terbatas (bounded), seperti alamat dan kontak darurat. Keunggulannya adalah performa baca sekali akses (*single disk seek*) tanpa perlu join.
- **Referencing (Normalized)**: Wajib digunakan untuk relasi *One-to-Many* yang tidak terbatas (*unbounded*), seperti riwayat sensor jutaan baris. Menyimpan jutaan array di satu dokumen akan menabrak **batas ukuran maksimal 16MB dokumen BSON**.

### Subset Pattern dan Modifier $slice
Bila sebuah entitas memiliki ribuan riwayat transaksi atau peringatan (*alerts*), aplikasi pengguna biasanya hanya membutuhkan 5 atau 10 peringatan terkini untuk ditampilkan di dashboard. **Subset Pattern** menyimpan 5 peringatan terakhir langsung di dalam dokumen fasilitas utama, sementara riwayat lengkap disimpan di koleksi terpisah. Operator `$push: { $each: [...], $sort: { timestamp: -1 }, $slice: 5 }` secara otomatis memotong array agar tidak pernah melebihi 5 elemen.

### Denormalisasi Selektif
Alih-alih menjalankan query agregasi `count()` yang mahal setiap kali halaman dimuat, kita menduplikasi nilai agregat sederhana seperti `totalAlertsCount` langsung di dokumen induk dan memperbaruinya secara atomic dengan `$inc: { totalAlertsCount: 1 }`.""",
            'explanationEn': """### The Golden Rule: Embedding vs Referencing
The foundational axiom of document data modeling is: **Data that is accessed together should be stored together**.
- **Embedding (Denormalized)**: Best suited for *One-to-One* or *One-to-Few* bounded relationships (e.g. shipping addresses, emergency contacts). Guarantees single-seek read performance without multi-collection joins.
- **Referencing (Normalized)**: Essential for *One-to-Squillions* unbounded relationships (e.g. streaming sensor telemetries). Storing unbounded arrays within a single document quickly breaches MongoDB's hard **16MB BSON document limit**.

### The Subset Pattern and $slice Modifiers
While historical events can scale into millions, operational dashboards exclusively present the most recent 5 to 10 alerts. The **Subset Pattern** embeds the top 5 recent events directly into the parent document while persisting full telemetry in a dedicated collection. Utilizing `$push: { $each: [...], $sort: { timestamp: -1 }, $slice: 5 }` guarantees the embedded array remains strictly capped at 5 elements.

### Selective Denormalization
Instead of triggering an expensive `count()` scan across millions of child documents on every dashboard load, applications selectively denormalize a counter `totalAlertsCount` in the parent document, updating it atomically using `$inc: { totalAlertsCount: 1 }`.""",
            'beginnerId': """Bayangkan dokumen pasien rumah sakit. Golongan darah, alamat rumah, dan nomor telepon wali sebaiknya ditulis langsung di sampul map pasien (Embedding) karena tidak akan berubah banyak dan selalu dibaca dokter saat darurat.

Tetapi, hasil tes darah dan rekam medis harian selama 10 tahun tidak boleh diselipkan di sampul map yang sama, karena map tersebut akan robek dan terlalu tebal (batas 16MB). Rekam medis harian disimpan di lemari arsip tersendiri dengan kode referensi nomor pasien (Referencing).""",
            'beginnerEn': """Imagine a hospital patient's physical chart. Blood type, home address, and emergency contact numbers belong directly on the binder cover (Embedding) because they are compact and needed instantly during emergencies.

However, 10 years of daily laboratory blood test results cannot be crammed into that same folder cover; the physical binder would burst its seams (the 16MB limit). Daily logs are filed in dedicated archives referenced by the patient's ID number (Referencing).""",
            'experimentsId': [
                'Jalankan skrip update berulang kali dan amati bahwa array recentAlerts tidak pernah bertambah melebihi 5 item',
                'Gunakan fungsi Object.bsonsize(db.facilities.findOne()) untuk melihat ukuran byte dokumen BSON aktual',
                'Simulasikan dokumen yang melebihi batas 16MB untuk melihat pesan error Document exceeds maximum allowed BSON size',
                'Bandingkan waktu respon membaca 1 dokumen embedded vs membaca referensi dengan query kedua'
            ],
            'experimentsEn': [
                'Execute the update statement repeatedly and confirm recentAlerts strictly caps at 5 entries',
                'Utilize Object.bsonsize(db.facilities.findOne()) to inspect the actual byte footprint of the BSON document',
                'Simulate a payload exceeding the 16MB threshold to observe the BSON size limit exception',
                'Benchmark response latency of a single embedded document read versus two sequential relational lookups'
            ],
            'challengeId': 'Rancang skema e-commerce dengan Extended Reference Pattern: tabel `orders` yang menyimpan referensi `customerId`, namun menyalin nama, email, dan tier customer pada saat transaksi dibuat agar riwayat invoice tidak berubah jika profil customer diupdate di masa depan.',
            'challengeEn': 'Architect an e-commerce schema using the Extended Reference Pattern: an `orders` collection referencing `customerId` while embedding a static snapshot of customer name, email, and loyalty tier at order creation time.',
            'summaryId': 'Anda telah menguasai pemodelan data NoSQL: trade-off Embedding vs Referencing, pencegahan batas 16MB BSON, Subset Pattern dengan $slice, dan denormalisasi selektif.',
            'summaryEn': 'You have mastered NoSQL data modeling: Embedding vs Referencing trade-offs, 16MB BSON limit defense, Subset Pattern via $slice, and selective denormalization.'
        },

        # WEEK 3
        {
            'week': 3,
            'level': 'beginer',
            'levelNameId': 'Fondasi Dokumen BSON & CRUD Operasional',
            'levelNameEn': 'BSON Document Foundations & Operational CRUD',
            'topicId': 'strategi-indexing-compound-multikey-dan-ttl',
            'titleId': 'Indexing: Compound, Multikey, TTL & explain("executionStats")',
            'titleEn': 'Indexing: Compound, Multikey, TTL & explain("executionStats")',
            'language': 'javascript',
            'programId': 'Implementasi Indeks Compound ESM, TTL Auto-Expire, dan Profiling ExecutionStats',
            'programEn': 'Compound ESR Indexing, TTL Auto-Expire, and ExecutionStats Profiling',
            'code': """// MongoDB Shell (mongosh)
use telemetry_db;

db.device_events.drop();

// 1. Create realistic events collection
db.device_events.insertMany([
  {
    facilityId: "FAC-JKT-01",
    severity: "CRITICAL",
    tags: ["network", "hardware", "firmware"],
    eventCode: "DISCONNECT",
    createdAt: new Date(),
    expireAt: new Date(Date.now() + 3600 * 1000) // 1 hour from now
  },
  {
    facilityId: "FAC-JKT-01",
    severity: "INFO",
    tags: ["heartbeat"],
    eventCode: "PING",
    createdAt: new Date(),
    expireAt: new Date(Date.now() + 3600 * 1000)
  }
]);

// 2. Compound Index adhering strictly to the ESR Rule:
// Equality: facilityId
// Sort: createdAt (-1)
// Range: severity
db.device_events.createIndex(
  { facilityId: 1, createdAt: -1, severity: 1 },
  { name: "idx_facility_created_severity" }
);

// 3. Multikey Index: Indexing array fields (tags)
db.device_events.createIndex(
  { tags: 1 },
  { name: "idx_event_tags_multikey" }
);

// 4. TTL Index (Time-To-Live): MongoDB background thread automatically purges expired documents
db.device_events.createIndex(
  { expireAt: 1 },
  { expireAfterSeconds: 0, name: "idx_auto_purge_ttl" }
);

// 5. Query execution profiling using executionStats
const explainStats = db.device_events.find({
  facilityId: "FAC-JKT-01",
  severity: "CRITICAL"
})
.sort({ createdAt: -1 })
.explain("executionStats");

print("--- EXPLAIN EXECUTION METRICS ---");
print("Execution Stage: " + explainStats.executionStats.executionStages.stage);
print("Total Documents Examined: " + explainStats.executionStats.totalDocsExamined);
print("Total Keys Examined: " + explainStats.executionStats.totalKeysExamined);
print("nReturned: " + explainStats.executionStats.nReturned);
""",
            'objectivesId': [
                'Menguasai aturan emas ESR Rule (Equality, Sort, Range) dalam merancang Compound Index',
                'Memahami cara kerja Multikey Index saat mengindeks elemen di dalam Array BSON',
                'Mengotomatisasi penghapusan log sementara menggunakan TTL (Time-To-Live) Index',
                'Mendiagnosis metrik explain("executionStats"): IXSCAN vs COLLSCAN dan rasio nReturned vs totalDocsExamined'
            ],
            'objectivesEn': [
                'Master the fundamental ESR Rule (Equality, Sort, Range) for compound index ordering',
                'Understand Multikey Index mechanics when indexing array values in BSON documents',
                'Automate data lifecycle retention using TTL (Time-To-Live) auto-expiring indexes',
                'Interpret explain("executionStats") telemetry: IXSCAN vs COLLSCAN and nReturned to totalDocsExamined ratios'
            ],
            'explanationId': """### Aturan Emas Indeks: ESR Rule
Saat merancang Compound Index di MongoDB, urutan kolom menentukan segalanya. Gunakan aturan **ESR (Equality, Sort, Range)**:
1. **Equality (E)**: Letakkan field yang dicari dengan pencocokan exact (`facilityId: "FAC-JKT-01"`) di urutan paling awal.
2. **Sort (S)**: Letakkan field yang digunakan untuk pengurutan (`sort({ createdAt: -1 })`) di posisi kedua, agar dokumen dapat dibaca secara sekuensial dari index tanpa memicu in-memory sort yang boros RAM.
3. **Range (R)**: Letakkan filter rentang (`$gt`, `$lt`, `$in`) di posisi terakhir.

### Multikey Index untuk Array
Ketika Anda mengindeks field yang berisi array (seperti `tags: ["network", "hardware"]`), MongoDB secara otomatis membuat **Multikey Index**. Mesin database membuat entri terpisah di pohon B-Tree untuk setiap elemen di dalam array tersebut. Ini memungkinkan pencarian seperti `{ tags: "hardware" }` berjalan ultra-cepat. *Catatan*: MongoDB melarang pembuatan compound index di mana lebih dari satu field berupa array.

### TTL Index untuk Siklus Hidup Data
Data log telemetri dan sesi otentikasi seringkali hanya relevan selama beberapa jam atau hari. Menghapus log lama dengan cron job query `deleteMany()` membebani CPU database. **TTL Index** (`expireAfterSeconds: 0`) memanfaatkan thread latar belakang MongoDB yang bangun setiap 60 detik untuk menghapus dokumen yang nilai tanggalnya di kolom `expireAt` telah terlewati secara otomatis tanpa membebani performa aplikasi.

### Membaca explain("executionStats")
- `COLLSCAN`: Full Collection Scan. MongoDB membaca seluruh dokumen dari disk (sangat buruk di skala besar).
- `IXSCAN`: Index Scan. MongoDB menelusuri pohon B-Tree index.
- `Rasio Sehat`: Jika `totalDocsExamined == nReturned`, index Anda sempurna (100% selektif). Jika `totalDocsExamined` mencapai 10.000 sementara `nReturned` hanya 2, berarti index Anda tidak efisien.""",
            'explanationEn': """### The Golden Standard: The ESR Rule
When designing compound indexes in MongoDB, key ordering dictates performance. Follow the **ESR Rule (Equality, Sort, Range)**:
1. **Equality (E)**: Position attributes matched via exact equality predicates (`facilityId: "FAC-JKT-01"`) at the forefront.
2. **Sort (S)**: Place fields governing the sort ordering (`sort({ createdAt: -1 })`) in the middle, allowing the engine to traverse index leaf nodes in pre-sorted order, eliminating expensive in-memory sort stages.
3. **Range (R)**: Append range operators (`$gt`, `$lt`, `$in`) at the final position.

### Multikey Indexes on BSON Arrays
Indexing an array attribute (e.g. `tags: ["network", "hardware"]`) causes MongoDB to instantiate a **Multikey Index**. The engine creates distinct B-Tree leaf entries for every element in the array, making array queries like `{ tags: "hardware" }` instantaneous. *Constraint*: Compound indexes cannot contain more than one array field.

### TTL (Time-To-Live) Lifecycle Automation
Telemetries and session tokens often outlive operational utility within days. Executing application-driven `deleteMany()` jobs consumes high write locks and CPU. A **TTL Index** (`expireAfterSeconds: 0`) delegates deletion to an internal background thread waking every 60 seconds to automatically prune documents whose date attributes have expired.

### Interpreting explain("executionStats")
- `COLLSCAN`: Full collection scan reading every block from disk. Detrimental at scale.
- `IXSCAN`: Index scan traversing the B-Tree keys.
- `Selectivity Ratio`: If `totalDocsExamined == nReturned`, your index achieves ideal selectivity. If `totalDocsExamined` hits 10,000 while `nReturned` is 2, index coverage is broken.""",
            'beginnerId': """Bayangkan Anda mencari nama teman di buku kontak telepon. Buku kontak diurutkan berdasarkan Abjad Nama (Indeks B-Tree). 

Jika buku kontak Anda tidak memiliki urutan abjad (COLLSCAN), Anda harus membaca setiap nama dari halaman pertama sampai halaman terakhir. TTL Index seperti kertas catatan rahasia di film mata-mata: ada jam pasir kecil di sampingnya, dan saat waktu habis, kertas itu terbakar sendiri tanpa Anda perlu repot merobeknya!""",
            'beginnerEn': """Imagine searching for a contact in a phone book. The book is sorted alphabetically (a B-Tree Index).

If the phone book had no alphabetical sorting (COLLSCAN), you would have to read every single name from page 1 to the end. A TTL Index is like a self-destructing secret memo in a spy movie: a miniature hourglass counts down, and when time expires, the page quietly disintegrates on its own without manual shredding!""",
            'experimentsId': [
                'Bandingkan executionStats query sebelum dan sesudah dibuatkan index dan perhatikan perbedaan totalDocsExamined',
                'Buat dokumen dengan expireAt 10 detik ke depan dan perhatikan dokumen terhapus otomatis oleh TTL thread',
                'Uji aturan ESR dengan menukar posisi Sort dan Range, lalu amati apakah muncul stage SORT di executionStages',
                'Buat index parsial menggunakan partialFilterExpression untuk mengindeks dokumen yang memiliki severity: "CRITICAL" saja'
            ],
            'experimentsEn': [
                'Compare executionStats before and after index creation and inspect the variance in totalDocsExamined',
                'Insert a document with an expireAt timestamp set 10 seconds ahead and witness automated TTL purge',
                'Violate the ESR rule by swapping Sort and Range positions, observing whether an in-memory SORT stage appears',
                'Construct a partial index leveraging partialFilterExpression to index strictly severity: "CRITICAL" events'
            ],
            'challengeId': 'Bangun Text Index pada field `title` dan `description` untuk pencarian full-text bahasa Inggris dengan bobot relevansi (`weights`), dan jalankan query `$text` dengan evaluasi skor teks meta `$meta: "textScore"`.',
            'challengeEn': 'Construct a Text Index across `title` and `description` with weighted scoring (`weights`), executing a `$text` query ordered by relevance score via `$meta: "textScore"`.',
            'summaryId': 'Anda telah menguasai aturan ESR Compound Index, Multikey Index pada array, pembersihan otomatis dokumen dengan TTL Index, dan evaluasi profil query dengan explain("executionStats").',
            'summaryEn': 'You have mastered the ESR compound indexing framework, Multikey array indexes, automated data retention with TTL indexes, and query execution diagnostics via explain("executionStats").'
        },

        # WEEK 4
        {
            'week': 4,
            'level': 'beginer',
            'levelNameId': 'Fondasi Dokumen BSON & CRUD Operasional',
            'levelNameEn': 'BSON Document Foundations & Operational CRUD',
            'topicId': 'aggregation-framework-pipeline-dasar',
            'titleId': 'Aggregation Framework: $match, $group, $project & $sort',
            'titleEn': 'Aggregation Framework: $match, $group, $project & $sort',
            'language': 'javascript',
            'programId': 'Pipeline Agregasi Metrik Perangkat: Rata-Rata, Suhu Maksimum, dan Status Kesehatan',
            'programEn': 'Device Metric Aggregation Pipeline: Averages, Maximum Temperature, and Health Status',
            'code': """// MongoDB Shell (mongosh)
use telemetry_db;

// Clean and seed realistic telemetry stream
db.telemetries.drop();

db.telemetries.insertMany([
  { deviceId: "DEV-01", type: "TEMP", value: 24.5, battery: 80, timestamp: new Date("2026-03-10T08:00:00Z") },
  { deviceId: "DEV-01", type: "TEMP", value: 28.2, battery: 78, timestamp: new Date("2026-03-10T09:00:00Z") },
  { deviceId: "DEV-01", type: "TEMP", value: 31.0, battery: 75, timestamp: new Date("2026-03-10T10:00:00Z") },
  { deviceId: "DEV-02", type: "TEMP", value: 19.8, battery: 95, timestamp: new Date("2026-03-10T08:30:00Z") },
  { deviceId: "DEV-02", type: "TEMP", value: 20.4, battery: 93, timestamp: new Date("2026-03-10T09:30:00Z") },
  { deviceId: "DEV-03", type: "VIBRATION", value: 0.05, battery: 40, timestamp: new Date("2026-03-10T08:00:00Z") }
]);

// Analytical Aggregation Pipeline
const pipeline = [
  // Stage 1: Filter temperature readings strictly ($match utilizes indexes!)
  {
    $match: {
      type: "TEMP",
      timestamp: {
        $gte: new Date("2026-03-10T00:00:00Z"),
        $lte: new Date("2026-03-10T23:59:59Z")
      }
    }
  },

  // Stage 2: Group by deviceId and calculate mathematical aggregates
  {
    $group: {
      _id: "$deviceId",
      readingsCount: { $sum: 1 },
      avgTemperature: { $avg: "$value" },
      maxTemperature: { $max: "$value" },
      minTemperature: { $min: "$value" },
      latestBatteryLevel: { $last: "$battery" }
    }
  },

  // Stage 3: Project transformed output fields and conditional health evaluation
  {
    $project: {
      _id: 0,
      deviceId: "$_id",
      totalSamples: "$readingsCount",
      avgTempCelsius: { $round: ["$avgTemperature", 2] },
      peakTempCelsius: "$maxTemperature",
      tempSpread: { $round: [{ $subtract: ["$maxTemperature", "$minTemperature"] }, 2] },
      batteryRemaining: "$latestBatteryLevel",
      operationalStatus: {
        $cond: {
          if: { $gte: ["$maxTemperature", 30.0] },
          then: "WARNING_OVERHEAT",
          else: "OPTIMAL"
        }
      }
    }
  },

  // Stage 4: Sort descending by peak temperature
  {
    $sort: { peakTempCelsius: -1 }
  }
];

const results = db.telemetries.aggregate(pipeline).toArray();
printjson(results);
""",
            'objectivesId': [
                'Memahami konsep pipeline perakitan data pada MongoDB Aggregation Framework',
                'Menggunakan tahapan pemrosesan dasar: $match, $group, $project, $sort, dan $limit',
                'Melakukan kalkulasi matematika akumulatif: $sum, $avg, $max, $min, $round, dan $subtract',
                'Menggunakan operator logika kondisional $cond untuk evaluasi percabangan dinamis'
            ],
            'objectivesEn': [
                'Understand stream-based data transformation in the MongoDB Aggregation Framework',
                'Construct foundational aggregation stages: $match, $group, $project, $sort, and $limit',
                'Perform accumulator computations: $sum, $avg, $max, $min, $round, and $subtract',
                'Apply conditional expression operators like $cond for dynamic document branching'
            ],
            'explanationId': """### Paradigma Aggregation Framework
**Aggregation Framework** di MongoDB bekerja seperti ban berjalan di pabrik perakitan (*assembly line*). Dokumen mengalir dari satu tahap (*stage*) ke tahap berikutnya. Setiap tahap menerima sekumpulan dokumen sebagai masukan, melakukan transformasi atau penyaringan, lalu meneruskan hasilnya ke tahap berikutnya.

### Tahap $match: Posisi Menentukan Performa
Tahap `$match` memfilter dokumen berdasarkan kondisi tertentu. Sangat esensial untuk selalu meletakkan `$match` di posisi **paling awal** dalam pipeline. Ketika `$match` berada di tahap pertama, MongoDB dapat memanfaatkan index B-Tree yang ada (IXSCAN) untuk memangkas jutaan dokumen sejak awal, sehingga tahap berikutnya seperti `$group` hanya memproses sedikit dokumen di memori.

### Tahap $group dan Akumulator
Tahap `$group` mengelompokkan dokumen berdasarkan kunci `_id` tertentu (misalnya `_id: "$deviceId"`). Di dalam `$group`, Anda dapat menggunakan ekspresi akumulator:
- `$sum: 1`: Menghitung frekuensi dokumen (seperti `COUNT(*)` di SQL).
- `$avg: "$value"`: Menghitung nilai rata-rata numerik.
- `$first` dan `$last`: Mengambil nilai dari dokumen pertama atau terakhir dalam urutan.

### Transformasi dengan $project dan $cond
Tahap `$project` memungkinkan Anda membentuk ulang struktur dokumen: menyembunyikan field yang tidak perlu (`_id: 0`), membuat field hasil kalkulasi baru, dan menggunakan operator kondisional `$cond: { if: ..., then: ..., else: ... }` untuk menyematkan status peringatan bisnis secara otomatis.""",
            'explanationEn': """### The Aggregation Assembly Pipeline Paradigm
The **Aggregation Framework** models an industrial assembly line. Collections flow sequentially through successive pipeline *stages*. Each stage consumes an incoming document stream, executes specific filters or geometric transformations, and yields a mutated stream to the succeeding stage.

### Early Filtering with $match
The `$match` stage selects documents satisfying explicit query predicates. Placing `$match` as the **first stage** in any pipeline is a mandatory optimization axiom: it enables the query planner to leverage B-Tree indexes (IXSCAN) at the collection boundary, discarding millions of irrelevant records before memory-heavy stages like `$group` execute.

### The $group Stage and Accumulators
The `$group` stage groups incoming documents by an expression specified in `_id` (e.g. `_id: "$deviceId"`). Inside `$group`, accumulators calculate aggregate dimensions:
- `$sum: 1`: Counts matching instances (equivalent to SQL `COUNT(*)`).
- `$avg: "$value"`: Computes exact arithmetic averages.
- `$first` and `$last`: Preserves initial or final state values.

### Projections and Conditional Expressions with $cond
The `$project` stage reshapes the output envelope: suppressing unwanted attributes (`_id: 0`), computing mathematical derivatives (`$subtract`, `$round`), and applying conditional ternary branching using `$cond: { if: ..., then: ..., else: ... }` to generate contextual business alerts.""",
            'beginnerId': """Bayangkan pabrik pemilah buah apel. 
Tahap 1 ($match): Petugas menyingkirkan semua buah yang bukan apel (hanya apel yang boleh masuk ban berjalan).
Tahap 2 ($group): Apel dikelompokkan ke dalam keranjang berdasarkan kebun asalnya, lalu ditimbang berat rata-ratanya ($avg) dan dicari apel yang paling besar ($max).
Tahap 3 ($project): Keranjang diberi label rapi: jika berat apel di atas 300 gram, tempel stiker 'Grade A Super' ($cond).
Tahap 4 ($sort): Keranjang ditata di truk dari yang paling berat ke yang paling ringan.""",
            'beginnerEn': """Imagine an automated apple packaging plant.
Stage 1 ($match): Sorters reject anything that isn't an apple (only apples proceed down the conveyor).
Stage 2 ($group): Apples are sorted into crates by orchard origin, weighed for average size ($avg), and inspected for the heaviest specimen ($max).
Stage 3 ($project): Crates receive printed labels: if an apple exceeds 300 grams, stamp a 'Grade A Luxury' badge on the crate ($cond).
Stage 4 ($sort): Crates are stacked into delivery trucks ordered from heaviest to lightest.""",
            'experimentsId': [
                'Pindahkan tahap $project sebelum $group dan amati bagaimana ketiadaan field mempengaruhi kalkulasi',
                'Tambahkan operator $round untuk membulatkan rata-rata temperatur menjadi 1 angka di belakang koma',
                'Uji operator akumulator $push di dalam $group untuk mengumpulkan seluruh nilai pembacaan ke dalam satu array',
                'Jalankan explain() pada agregasi untuk melihat apakah tahap $match menggunakan Index Scan'
            ],
            'experimentsEn': [
                'Relocate $project prior to $group and observe how field shedding affects accumulator calculations',
                'Apply the $round operator to constrain average temperature calculations to one decimal precision',
                'Experiment with the $push accumulator inside $group to aggregate raw readings into an embedded array',
                'Run explain() on the pipeline to verify that the initial $match stage is satisfied via an Index Scan'
            ],
            'challengeId': 'Tuliskan pipeline agregasi yang menghitung metrik konsumsi baterai: hitung selisih antara nilai baterai pertama kali tercatat (`$first`) dan nilai baterai terakhir (`$last`) untuk setiap perangkat dalam kurun waktu 24 jam.',
            'challengeEn': 'Craft an aggregation pipeline measuring battery depletion rate: calculate the delta between the earliest recorded battery level (`$first`) and latest recorded level (`$last`) per device over a 24-hour window.',
            'summaryId': 'Anda telah menguasai dasar Aggregation Framework: alur perakitan pipeline, pengoptimalan $match di awal, kalkulasi akumulator $group, transformasi $project, dan evaluasi kondisi dengan $cond.',
            'summaryEn': 'You have mastered foundational Aggregation Framework concepts: pipeline stage sequencing, early $match index utilization, $group accumulator arithmetic, $project reshaping, and $cond branching.'
        },

        # WEEK 5
        {
            'week': 5,
            'level': 'intermediate',
            'levelNameId': 'Agregasi Lanjutan, Replikasi & Skalabilitas Sharding',
            'levelNameEn': 'Advanced Aggregation, Replication & Sharding Scalability',
            'topicId': 'agregasi-lanjutan-lookup-unwind-dan-facet',
            'titleId': 'Agregasi Lanjutan: $lookup, $unwind & $facet',
            'titleEn': 'Advanced Aggregation: $lookup, $unwind & $facet',
            'language': 'javascript',
            'programId': 'Multi-Collection Joins dengan $lookup Pipeline dan Pencarian Multi-Faceted dengan $facet',
            'programEn': 'Multi-Collection Joins with $lookup Pipelines and Multi-Faceted Analytics via $facet',
            'code': """// MongoDB Shell (mongosh)
use telemetry_db;

// Multi-Collection Join using modern $lookup with custom pipeline
const complexPipeline = [
  // Match active industrial facilities
  { $match: { _id: "FAC-JKT-01" } },

  // Stage: Correlated $lookup joining telemetry readings
  {
    $lookup: {
      from: "telemetries",
      let: { facility_id: "$_id" },
      pipeline: [
        // Sub-pipeline inside the joined collection
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$type", "TEMP"] },
                { $gte: ["$value", 25.0] } // Alerting threshold
              ]
            }
          }
        },
        { $sort: { timestamp: -1 } },
        { $limit: 3 }
      ],
      as: "criticalReadings"
    }
  },

  // Stage: $unwind array to process emergency contacts individually
  { $unwind: "$emergencyContacts" },

  // Stage: Multi-Faceted Analytics ($facet allows multiple independent pipelines in one pass!)
  {
    $facet: {
      // Facet A: Contact Distribution by Role
      "contactsByRole": [
        {
          $group: {
            _id: "$emergencyContacts.role",
            count: { $sum: 1 },
            contactNames: { $push: "$emergencyContacts.name" }
          }
        }
      ],
      // Facet B: Overall Facility Incident Summary
      "incidentOverview": [
        {
          $project: {
            facilityName: "$name",
            highTempAlertsCount: { $size: "$criticalReadings" },
            hasEmergencyLead: {
              $cond: {
                if: { $regexMatch: { input: "$emergencyContacts.role", regex: /Manager/i } },
                then: true,
                else: false
              }
            }
          }
        }
      ]
    }
  }
];

const facetedReport = db.facilities.aggregate(complexPipeline).toArray();
printjson(facetedReport);
""",
            'objectivesId': [
                'Menguasai penggabungan antar-koleksi menggunakan $lookup dengan sub-pipeline terfilter (klausa let & $expr)',
                'Membongkar elemen array menjadi aliran dokumen individual menggunakan $unwind',
                'Mengeksekusi multi-faceted analytics secara paralel dalam satu query tunggal dengan $facet',
                'Mengelompokkan data ke dalam rentang numerik otomatis menggunakan tahap $bucket'
            ],
            'objectivesEn': [
                'Master cross-collection joins utilizing $lookup with sub-pipelines (let clauses and $expr)',
                'Flatten and destructure embedded array elements into distinct documents with $unwind',
                'Execute parallel multi-faceted reporting in a single database pass using $facet',
                'Categorize numeric distributions into bucketed frequency histograms using $bucket'
            ],
            'explanationId': """### Kekuatan $lookup Modern dengan Sub-Pipeline
Di versi lawas, `$lookup` hanya melakukan join sederhana berdasarkan kesamaan nilai dua field (`localField` dan `foreignField`). Di MongoDB modern, `$lookup` mendukung sintaks ekspresif dengan `let` dan `pipeline`. Anda dapat menyaring, mengurutkan, dan membatasi data koleksi target *sebelum* data digabungkan ke dokumen utama, menghemat alokasi memori secara signifikan.

### Membongkar Array dengan $unwind
Jika dokumen memiliki array kontak `emergencyContacts: [A, B, C]`, tahap `$unwind: "$emergencyContacts"` akan menduplikasi dokumen tersebut menjadi 3 dokumen terpisah, di mana masing-masing dokumen memegang satu elemen kontak individual. Ini memungkinkan kita menjalankan operasi `$group` atau filter lanjutan pada field internal array tersebut.

### Analitik Multi-Faset dengan $facet
Dalam halaman e-commerce atau dashboard analitik, pengguna sering melihat beberapa widget analitik sekaligus: widget kategori produk, widget filter harga, dan widget rating bintang. Menjalankan 3 query agregasi terpisah akan membebani jaringan dan database. Tahap `$facet` memungkinkan Anda mendefinisikan beberapa sub-pipeline independen yang dieksekusi secara simultan dalam satu lintasan baca (*single pass*) data.""",
            'explanationEn': """### Expressive $lookup with Sub-Pipelines
In legacy MongoDB releases, `$lookup` merely executed basic equality matches between `localField` and `foreignField`. Modern MongoDB introduces expressive `$lookup` pipelines pairing `let` bindings with nested `pipeline` arrays. This allows filtering, sorting, and slicing foreign collection records *prior* to joining them to the root document, preventing in-memory memory bloat.

### Destructuring Arrays via $unwind
When a document contains an array `emergencyContacts: [A, B, C]`, executing `$unwind: "$emergencyContacts"` emits three distinct clone documents, each holding one isolated contact item. This unlocks the ability to perform deep `$group` aggregations and mathematical operations across array elements.

### Multi-Faceted Analysis with $facet
Modern search and analytics dashboards simultaneously render disparate faceted panels: category breakdowns, price distribution histograms, and customer rating distributions. Executing separate queries generates network churn and multiple disk scans. The `$facet` stage executes multiple parallel aggregation sub-pipelines within a single unified pass over the working dataset.""",
            'beginnerId': """Bayangkan Anda membuka toko online sepatu. 
$lookup seperti memanggil asisten gudang untuk mengambilkan kotak sepatu yang cocok dengan pesanan pelanggan.
$unwind seperti membuka satu paket bingkisan berisi 3 pasang kaus kaki dan menjajarkannya satu per satu di atas meja.
$facet seperti sekali melihat etalase toko dan langsung menghitung 3 hal bersamaan: 'Ada berapa sepatu warna merah, berapa yang harganya di bawah 500 ribu, dan berapa yang bermerek Nike'.""",
            'beginnerEn': """Imagine shopping at an online shoe store.
$lookup is like sending a stock clerk to the back warehouse to fetch matching shoeboxes.
$unwind is like taking a multi-pack bundle containing 3 pairs of socks and laying them out side-by-side on the table.
$facet is like glancing at the storefront window once and simultaneously counting three distinct metrics: 'How many red shoes exist, how many cost under $50, and how many are manufactured by Nike'.""",
            'experimentsId': [
                'Tambahkan opsi preserveNullAndEmptyArrays: true pada $unwind dan amati perilaku saat dokumen memiliki array kosong',
                'Gunakan tahap $bucketAuto untuk membagi pembacaan temperatur ke dalam 4 ember persentil otomatis',
                'Gunakan operator $size pada hasil $lookup untuk menghitung jumlah relasi tanpa melakukan unwind',
                'Uji batas konsumsi memori 100MB pada agregasi dan tambahkan opsi allowDiskUse: true'
            ],
            'experimentsEn': [
                'Incorporate preserveNullAndEmptyArrays: true inside $unwind and observe documents holding empty arrays',
                'Apply the $bucketAuto stage to partition temperature readings into 4 automatic percentile buckets',
                'Utilize the $size operator on $lookup results to count joined elements without requiring an unwind pass',
                'Trigger the 100MB aggregation memory ceiling and verify resolution using allowDiskUse: true'
            ],
            'challengeId': 'Bangun pipeline pencarian produk faset lengkap: terima teks pencarian, gunakan `$facet` untuk menghasilkan (1) daftar produk 10 teratas dengan paginasi, (2) daftar merek dan jumlah produknya, dan (3) rentang harga minimum-maksimum.',
            'challengeEn': 'Build a production faceted product search pipeline: take a search query, and use `$facet` to output (1) the top 10 paginated products, (2) brand distribution with item counts, and (3) global min-max price ranges.',
            'summaryId': 'Anda telah menguasai agregasi lanjutan di MongoDB: join koleksi modern dengan $lookup sub-pipeline, pembongkaran array dengan $unwind, dan analitik multi-dimensi paralel dengan $facet.',
            'summaryEn': 'You have mastered advanced MongoDB aggregation: expressive cross-collection $lookup sub-pipelines, array destructuring with $unwind, and parallel multi-dimensional analytics via $facet.'
        },

        # WEEK 6
        {
            'week': 6,
            'level': 'intermediate',
            'levelNameId': 'Agregasi Lanjutan, Replikasi & Skalabilitas Sharding',
            'levelNameEn': 'Advanced Aggregation, Replication & Sharding Scalability',
            'topicId': 'transaksi-acid-multi-dokumen-dan-write-concern',
            'titleId': 'Transaksi ACID Multi-Dokumen & Write Concern',
            'titleEn': 'Multi-Document ACID Transactions & Write Concern',
            'language': 'javascript',
            'programId': 'Transfer Kepemilikan Perangkat Antar-Fasilitas Menggunakan Transaksi Multi-Dokumen Sesi',
            'programEn': 'Cross-Facility Device Ownership Transfer Using Multi-Document Session Transactions',
            'code': """// MongoDB Client Session & Multi-Document ACID Transaction
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
""",
            'objectivesId': [
                'Memahami siklus transaksi multi-dokumen ACID (startTransaction, commitTransaction, abortTransaction)',
                'Membedakan peran tingkatan Write Concern: w: 1, w: "majority", dan parameter wtimeout',
                'Mengonfigurasi Read Concern (local, majority, linearizable, snapshot) dan Read Preference (primary, secondaryPreferred)',
                'Mengetahui batasan performa transaksi multi-dokumen dan kapan tetap mengutamakan desain dokumen embedded'
            ],
            'objectivesEn': [
                'Master multi-document ACID transaction lifecycles (startTransaction, commitTransaction, abortTransaction)',
                'Differentiate Write Concern durability guarantees: w: 1, w: "majority", and wtimeout parameters',
                'Configure Read Concern levels (local, majority, linearizable, snapshot) and Read Preferences (primary, secondaryPreferred)',
                'Assess multi-document transaction performance costs and understand when to favor embedded document paradigms'
            ],
            'explanationId': """### Transaksi Multi-Dokumen ACID di MongoDB
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
  - `snapshot`: Menjamin konsistensi snapshot transaksi ACID terisolasi.""",
            'explanationEn': """### Multi-Document ACID Transactions
Since MongoDB 4.0 (Replica Sets) and 4.2 (Sharded Clusters), MongoDB provides full **multi-document ACID transactions**. Historically, atomicity was constrained to individual document boundaries. Leveraging a `ClientSession`, distinct operations spanning disparate collections evaluate atomically: either every modification succeeds, or the entire batch rolls back via `abortTransaction`.

### Durability Guarantees with Write Concern
**Write Concern** governs acknowledgment semantics required before MongoDB acknowledges a write operation as successful:
- `w: 1`: Confirmed once written to the Primary node in-memory journal. Fast, but primary crashes prior to replication risk rollbacks.
- `w: "majority"`: Requires verification that the write has been durably recorded across a strict quorum majority of replica set nodes (e.g. 2 of 3 nodes). Guarantees failover survival.
- `wtimeout`: Timeout safeguard preventing threads from blocking indefinitely during network partitioning.

### Read Concern and Read Preference Dynamics
- **Read Preference**: Dictates cluster routing destinations (`primary` for strict read-your-writes consistency, `secondaryPreferred` to offload analytical workloads to read replicas).
- **Read Concern**:
  - `local`: Returns node-local data without validating replica quorum consensus.
  - `majority`: Guarantees inspected records have achieved quorum durability and cannot be rolled back.
  - `snapshot`: Enforces isolated point-in-time snapshot visibility throughout multi-document transactions.""",
            'beginnerId': """Bayangkan transaksi multi-dokumen seperti kurir yang membawa 3 amplop rahasia ke 3 kantor berbeda. Kurir memiliki instruksi ketat: jika salah satu kantor tutup atau menolak menerima amplop, kurir harus menarik kembali 2 amplop lainnya dan membawanya pulang tanpa meninggalkan jejak apapun.

Write Concern `w: majority` seperti meminta tanda tangan tanda terima dari minimal 2 saksi terpercaya, bukan hanya percaya pada satu satpam di pos depan.""",
            'beginnerEn': """Think of a multi-document transaction like a courier delivering three linked legal agreements to three distinct offices. The courier follows a strict protocol: if any office rejects their document, the courier immediately retrieves the other two agreements, voiding the entire transaction without leaving a trace.

Write Concern `w: majority` is like requiring physical counter-signatures from a majority of boardroom members before authorizing an asset transfer, rather than trusting the word of a single security guard.""",
            'experimentsId': [
                'Sengaja picu error pada langkah ke-3 dan amati bahwa langkah 1 dan 2 dibatalkan secara bersih (rollback)',
                'Uji penulisan dengan Write Concern w: "majority" pada replica set lokal dan amati latensi pengakuan',
                'Simulasikan network timeout dengan mengatur wtimeout: 10 dan amati WriteConcernError yang dilempar',
                'Uji pembacaan dari secondary node menggunakan Read Preference secondaryPreferred'
            ],
            'experimentsEn': [
                'Intentionally throw an exception at stage 3 and verify that stages 1 and 2 roll back cleanly',
                'Benchmark write operations with Write Concern w: "majority" against local replica nodes to observe confirmation latencies',
                'Simulate network timeouts by enforcing wtimeout: 10 and observe the resulting WriteConcernError',
                'Perform queries directed to secondary replica members utilizing Read Preference secondaryPreferred'
            ],
            'challengeId': 'Bangun sistem transfer poin loyalitas antar pengguna: gunakan transaksi multi-dokumen, validasi saldo poin pengirim tidak boleh negatif, dan terapkan pola transient transaction error retry logic otomatis.',
            'challengeEn': 'Build a peer-to-peer loyalty points transfer engine: enforce multi-document transactions, validate non-negative balance checks, and implement automated transient error retry handling.',
            'summaryId': 'Anda telah menguasai transaksi multi-dokumen ACID di MongoDB, konfigurasi durabilitas kuorum Write Concern, dan spektrum konsistensi Read Concern serta Read Preference.',
            'summaryEn': 'You have mastered multi-document ACID transactions, quorum durability with Write Concern, and consistency tuning via Read Concern and Read Preferences in MongoDB.'
        },

        # WEEK 7
        {
            'week': 7,
            'level': 'intermediate',
            'levelNameId': 'Agregasi Lanjutan, Replikasi & Skalabilitas Sharding',
            'levelNameEn': 'Advanced Aggregation, Replication & Sharding Scalability',
            'topicId': 'replikasi-sharded-clusters-dan-shard-key-strategy',
            'titleId': 'Replica Sets, Sharded Clusters & Strategi Shard Key',
            'titleEn': 'Replica Sets, Sharded Clusters & Shard Key Strategy',
            'language': 'javascript',
            'programId': 'Arsitektur Sharding Horisontal: Pemilihan Hashed vs Ranged Shard Key dan Chunk Balancing',
            'programEn': 'Horizontal Sharding Architecture: Hashed vs Ranged Shard Key Selection and Chunk Balancing',
            'code': """// MongoDB Shell commands for Sharding Administration (admin database)
use admin;

// 1. Check current cluster sharding status
sh.status();

// 2. Enable sharding on database
sh.enableSharding("telemetry_db");

// 3. Strategy Comparison:
// Strategy A: Ranged Sharding on monotonically increasing keys (e.g. createdAt)
// WARNING: Leads to Monotonic Insert Hotspots! All new writes hit the highest chunk on a single shard!

// Strategy B: Hashed Sharding for even, uniform write distribution across all shards
// Hashes the deviceId to distribute incoming concurrent writes perfectly
sh.shardCollection(
  "telemetry_db.device_telemetries",
  { deviceId: "hashed" },
  false, // Unique constraint flag
  { numInitialChunks: 10 }
);

// Strategy C: Compound Shard Key (Targeted Queries + Even Distribution)
// Prefix with facilityId for targeted routing, suffix with hashed eventId to avoid hotspots
// sh.shardCollection("telemetry_db.facility_events", { facilityId: 1, eventId: "hashed" });

// 4. Inspect Shard Distribution and Data Placement
use telemetry_db;
db.device_telemetries.getShardDistribution();

// 5. Query execution targeting verification:
// A targeted query (specifying the shard key) routes to ONLY ONE shard!
const targetedExplain = db.device_telemetries.find({ deviceId: "DEV-2026-TX" }).explain();
print("Targeted Query Routing: Shards Contacted = 1");

// A scatter-gather query (omitting shard key) forces mongos to query ALL shards!
const scatterExplain = db.device_telemetries.find({ metric: "temperature" }).explain();
print("Scatter-Gather Query Routing: Contacted All Shards (Expensive!)");
""",
            'objectivesId': [
                'Memahami topologi Sharded Cluster: mongos router, Config Server replica set, dan data shard nodes',
                'Membedakan strategi Ranged Sharding vs Hashed Sharding',
                'Mencegah Monotonic Write Hotspot pada key yang bertambah sekuensial (seperti Timestamp atau ObjectId)',
                'Menghindari anti-pattern Scatter-Gather Query dengan memastikan query menyertakan Shard Key'
            ],
            'objectivesEn': [
                'Understand Sharded Cluster topology: mongos routers, Config Server replica sets, and data shard nodes',
                'Differentiate Ranged Sharding versus Hashed Sharding strategies',
                'Prevent Monotonic Write Hotspots on sequential keys (e.g. Timestamps or ObjectIds)',
                'Eliminate expensive Scatter-Gather queries by mandating Shard Key predicates in application queries'
            ],
            'explanationId': """### Komponen Arsitektur Sharded Cluster
Ketika ukuran data melampaui kapasitas satu server tunggal (puluhan terabyte), MongoDB melakukan partisi horizontal (**Sharding**):
1. **Shards**: Node-node (berupa Replica Set) yang menyimpan subset pecahan data aktual.
2. **Config Database**: Menyimpan metadata konfigurasi cluster dan pemetaan chunk ke masing-masing shard.
3. **mongos**: Router aplikasi tanpa status (*stateless router*). Aplikasi web hanya berbicara dengan `mongos`, dan `mongos` yang menentukan shard mana yang menyimpan data yang dicari.

### Bahaya Monotonic Insert Hotspot
Jika Anda memilih field tanggal `createdAt` sebagai Shard Key dalam Ranged Sharding, setiap dokumen baru akan selalu memiliki nilai tanggal paling mutakhir. Akibatnya, 100% operasi tulis baru akan membanjiri shard terakhir (*hotspot*), sementara shard lainnya menganggur. Skalabilitas horisontal menjadi gagal total.

### Hashed Sharding vs Compound Shard Key
- **Hashed Sharding**: Menggunakan fungsi hash MD5 internal pada key (misal: `{ deviceId: "hashed" }`). Nilai hash terdistribusi acak seragam, memastikan beban tulis terbagi rata ke seluruh node shard di dunia.
- **Targeted vs Scatter-Gather Query**: Jika query menyertakan shard key (`find({ deviceId: "..." })`), `mongos` langsung mengarahkan query ke 1 shard yang tepat (**Targeted Query**). Jika tidak, `mongos` terpaksa mengirim query ke seluruh shard (**Scatter-Gather Query**) lalu menggabungkan hasilnya di memori, membebani jaringan cluster secara drastis.""",
            'explanationEn': """### Sharded Cluster Topology Deconstructed
When datasets exceed single-node disk or RAM boundaries (multi-terabyte scale), MongoDB partitions data horizontally (**Sharding**):
1. **Shards**: Physical Replica Sets holding isolated chunks of the overall collection.
2. **Config Servers**: Specialized replica set maintaining cluster topology metadata and routing tables mapping chunks to shards.
3. **mongos**: Stateless query routing layer. Application drivers connect exclusively to `mongos`, which transparently directs queries to target shards.

### The Monotonic Insert Hotspot Hazard
Selecting a monotonically increasing attribute (such as `createdAt` or standard sequential integers) as a ranged shard key guarantees that 100% of incoming write throughput floods the highest chunk on a single shard. The cluster collapses into a single-node bottleneck while other shards remain idle.

### Hashed Sharding and Query Routing Patterns
- **Hashed Sharding**: Computes an internal hash over the shard key (`{ deviceId: "hashed" }`). Hash distributions guarantee pseudo-random uniformity, dispersing high-throughput writes across all cluster nodes.
- **Targeted vs Scatter-Gather Queries**: Supplying the shard key in the query predicate (`find({ deviceId: "..." })`) enables `mongos` to route requests exclusively to the hosting shard (**Targeted Query**). Omitting the shard key forces `mongos` to broadcast the request to every shard in the cluster (**Scatter-Gather Query**), generating massive network amplification.""",
            'beginnerId': """Bayangkan Anda memiliki 10 lemari arsip (10 Shard) dan seorang resepsionis di lobi (mongos).
Jika Anda menyusun arsip berdasarkan tanggal masuk (Ranged Sharding), lemari nomor 10 akan penuh sesak setiap hari sampai pintunya jebol, sementara lemari 1-9 kosong melompong.
Dengan Hashed Sharding, nama surat diacak dengan rumus matematika sehingga lemari 1 sampai 10 terisi secara merata. Saat mencari surat, jika Anda memberi tahu resepsionis kode suratnya, dia langsung menuju ke lemari nomor 3 (Targeted Query) tanpa harus membuka ke-10 lemari sekaligus (Scatter-Gather).""",
            'beginnerEn': """Imagine managing 10 massive filing cabinets (10 Shards) with a concierge at the front desk (mongos).
If you file folders strictly by today's date (Ranged Sharding), Cabinet #10 will overflow every single day while Cabinets #1 through #9 sit completely empty.
With Hashed Sharding, folder IDs pass through a mathematical scrambler, distributing incoming files evenly across all 10 cabinets. When looking up a file, if you provide the exact ID, the concierge walks directly to Cabinet #3 (Targeted Query) rather than searching through all 10 cabinets simultaneously (Scatter-Gather).""",
            'experimentsId': [
                'Jalankan perintah sh.status() pada cluster sharded dan amati informasi chunk boundaries',
                'Bandingkan execution plan query bertarget (dengan shard key) vs query scatter-gather di explain()',
                'Amati proses chunk balancing otomatis saat data yang disisipkan melewati ambang batas chunk size',
                'Uji konfigurasi Compound Shard Key yang menggabungkan field kategori dan hashed UUID'
            ],
            'experimentsEn': [
                'Execute sh.status() across a sharded cluster and inspect physical chunk range partitions',
                'Compare execution plans between a targeted shard key lookup versus a scatter-gather query in explain()',
                'Observe the automated chunk migration balancer as inserted volumes cross chunk thresholds',
                'Design and evaluate a Compound Shard Key merging a regional tenant identifier and hashed UUID'
            ],
            'challengeId': 'Rancang skema sharding untuk sistem perpesanan chat berskala 100 juta pengguna: pilih shard key optimal untuk koleksi `messages` agar query riwayat percakapan grup (`conversationId`) selalu tertarget pada 1 shard tunggal.',
            'challengeEn': 'Architect a sharded collection schema for a messaging system supporting 100M users: select the optimal shard key for `messages` guaranteeing group conversation lookups (`conversationId`) execute as targeted queries.',
            'summaryId': 'Anda telah menguasai arsitektur penskalaan horisontal MongoDB: topologi sharded cluster (mongos, config servers, shards), pencegahan hotspot dengan Hashed Sharding, dan optimasi Targeted vs Scatter-Gather queries.',
            'summaryEn': 'You have mastered MongoDB horizontal scaling: sharded cluster topology (mongos, config servers, shards), write distribution with Hashed Sharding, and Targeted vs Scatter-Gather query mechanics.'
        },

        # WEEK 8 - CAPSTONE
        {
            'week': 8,
            'level': 'intermediate',
            'levelNameId': 'Agregasi Lanjutan, Replikasi & Skalabilitas Sharding',
            'levelNameEn': 'Advanced Aggregation, Replication & Sharding Scalability',
            'topicId': 'capstone-realtime-iot-telemetry-aggregation-pipeline',
            'titleId': 'Capstone Project: Real-Time IoT Telemetry Pipeline',
            'titleEn': 'Capstone Project: Real-Time IoT Telemetry Pipeline',
            'language': 'javascript',
            'programId': 'Pipeline Telemetri IoT Lengkap: Koleksi Time-Series, Deteksi Anomali Outlier, dan Rollup Agregasi',
            'programEn': 'End-to-End IoT Telemetry Pipeline: Time-Series Collections, Outlier Anomaly Detection, and Rollups',
            'code': """// CAPSTONE PROJECT: Real-Time IoT Sensor Telemetry & Event Aggregation Pipeline
// Demonstrates Time-Series Collections, JSON Schema, Aggregation Pipelines, and Outlier Tracking
use iot_production_hub;

// 1. Create Native MongoDB Time-Series Collection (Engineered specifically for high-throughput sensor telemetry)
db.createCollection("sensor_time_series", {
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "seconds"
  },
  expireAfterSeconds: 86400 * 30 // Auto-purge telemetry older than 30 days
});

// 2. Outliers / Anomalies collection for deep root-cause forensic analysis
db.outlier_alerts.drop();
db.createCollection("outlier_alerts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceId", "metric", "anomalyValue", "threshold", "severity", "detectedAt"],
      properties: {
        deviceId: { bsonType: "string" },
        metric: { bsonType: "string" },
        anomalyValue: { bsonType: "double" },
        threshold: { bsonType: "double" },
        severity: { enum: ["HIGH", "CRITICAL"] },
        detectedAt: { bsonType: "date" }
      }
    }
  }
});

// 3. Seed real-time streaming telemetry batches
db.sensor_time_series.insertMany([
  {
    timestamp: new Date("2026-03-10T12:00:00Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 42.1,
    voltage: 3.3
  },
  {
    timestamp: new Date("2026-03-10T12:00:05Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 43.8,
    voltage: 3.3
  },
  {
    timestamp: new Date("2026-03-10T12:00:10Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 104.5, // Extreme anomaly! Outlier detected
    voltage: 3.1
  }
]);

// 4. Industrial Telemetry Rollup & Anomaly Dispatch Pipeline
const anomalyDetectionPipeline = [
  // Stage A: Filter readings within recent evaluation window
  {
    $match: {
      timestamp: {
        $gte: new Date("2026-03-10T12:00:00Z"),
        $lte: new Date("2026-03-10T12:05:00Z")
      }
    }
  },

  // Stage B: Calculate rolling statistics per device
  {
    $group: {
      _id: {
        deviceId: "$metadata.deviceId",
        facility: "$metadata.facility",
        metricType: "$metadata.type"
      },
      readingsCount: { $sum: 1 },
      avgReading: { $avg: "$reading" },
      peakReading: { $max: "$reading" },
      minReading: { $min: "$reading" },
      readingsSamples: { $push: { val: "$reading", ts: "$timestamp" } }
    }
  },

  // Stage C: Project metrics and detect statistical variance
  {
    $project: {
      _id: 0,
      deviceId: "$_id.deviceId",
      facility: "$_id.facility",
      metricType: "$_id.metricType",
      samples: "$readingsCount",
      avgValue: { $round: ["$avgReading", 2] },
      peakValue: "$peakReading",
      isCriticalAnomaly: { $gt: ["$peakReading", 80.0] } // Outlier criteria
    }
  }
];

const telemetryReport = db.sensor_time_series.aggregate(anomalyDetectionPipeline).toArray();
print("--- TELEMETRY ROLLUP ANALYSIS ---");
printjson(telemetryReport);
""",
            'objectivesId': [
                'Mengintegrasikan seluruh materi kurikulum MongoDB dalam sebuah capstone IoT telemetry pipeline siap produksi',
                'Menggunakan koleksi Native Time-Series MongoDB untuk mengompresi data sensor secara optimal di disk',
                'Menerapkan Outlier Pattern untuk memisahkan anomali ekstrem ke koleksi investigasi forensik',
                'Membangun pipeline agregasi analitik streaming roll-up untuk dashboard pemantauan pabrik cerdas'
            ],
            'objectivesEn': [
                'Synthesize all MongoDB disciplines into a production-grade IoT telemetry pipeline capstone',
                'Deploy native MongoDB Time-Series collections achieving high-density columnar disk compression',
                'Implement the Outlier Pattern to segregate anomalous spikes into dedicated forensic investigation collections',
                'Build streaming aggregation rollup pipelines powering smart factory observability dashboards'
            ],
            'explanationId': """### Arsitektur Capstone IoT Telemetry Pipeline
Proyek capstone ini membangun pipeline analitik telemetri data streaming skala industri:
1. **Koleksi Native Time-Series**: MongoDB menyediakan koleksi khusus time-series (`timeseries: { timeField, metaField, granularity }`). Di tingkat disk, MongoDB mengelompokkan data berdasarkan rentang waktu ke dalam blok kompresi columnar (seperti parquet), memangkas konsumsi storage hingga 70%+ dan mempercepat query rentang waktu.
2. **Pola Outlier (Outlier Pattern)**: Dalam jutaan pembacaan sensor normal, hanya 0.01% data yang merupakan anomali berbahaya (getaran mesin berlebih atau lonjakan suhu). Daripada membebani seluruh pipeline dengan field exception yang jarang muncul, pipeline mendeteksi lonjakan tersebut dan mencatatnya ke koleksi `outlier_alerts` terpisah.
3. **Agregasi Rollup Cerdas**: Tahap `$group` dan `$project` mengubah data sensor berkecepatan tinggi menjadi ringkasan statistik bermakna (rata-rata, puncak, status kritis) yang siap dikonsumsi langsung oleh sistem SCADA atau dashboard grafis.""",
            'explanationEn': """### Capstone IoT Telemetry Pipeline Architecture
This capstone establishes an industrial-grade streaming telemetry analytics engine:
1. **Native Time-Series Collections**: MongoDB incorporates specialized time-series storage engines (`timeseries: { timeField, metaField, granularity }`). Documents are transparently organized into columnar compressed buckets on disk, shrinking storage footprints by 70%+ while dramatically accelerating range scans.
2. **The Outlier Pattern**: Amid millions of standard operating signals, merely 0.01% represent catastrophic hardware faults (excess vibration, thermal runaway). Rather than polluting uniform telemetry schemas with sparse exception flags, the pipeline isolates high-severity spikes into a dedicated `outlier_alerts` collection.
3. **Smart Rollup Aggregations**: Upstream `$group` and `$project` stages transform high-frequency raw telemetry signals into executive statistical rollups (averages, peaks, critical status flags) ready for consumption by SCADA operators.""",
            'beginnerId': """Selamat! Anda telah membangun sistem pemantauan pabrik pintar kelas dunia. 
Koleksi Time-Series seperti kamera berkecepatan tinggi yang merekam ribuan data getaran mesin pabrik setiap detik dengan format file terkompresi hemat ruang. 
Pipeline analitik bertindak seperti insinyur pintar yang mengamati layar komputer: jika ada mesin yang tiba-tiba bergetar terlalu keras (anomali outlier), sistem langsung membunyikan sirene tanda bahaya dan mencatat insiden tersebut ke buku laporan darurat!""",
            'beginnerEn': """Congratulations! You have constructed a world-class smart factory telemetry engine.
The Time-Series collection acts like an ultra-high-speed camera logging thousands of machine vibration readings per second into a compressed, storage-efficient format.
The analytical pipeline acts like a vigilant engineer watching the monitor: the moment any machine exhibits violent tremors (an outlier anomaly), the system triggers safety alarms and logs the incident into the emergency forensic ledger!""",
            'experimentsId': [
                'Jalankan pipeline agregasi dan verifikasi deteksi anomali pada sensor dengan getaran di atas 80Hz',
                'Inspeksi ukuran kompresi internal koleksi time-series menggunakan db.sensor_time_series.stats()',
                'Simulasikan auto-expire TTL dengan memeriksa dokumen yang timestamp-nya telah melampaui batas retention',
                'Uji query rentang waktu spesifik dan amati bahwa query hanya membaca bucket waktu yang relevan'
            ],
            'experimentsEn': [
                'Execute the aggregation pipeline and verify anomaly detection flags on sensors exceeding 80Hz',
                'Inspect the internal columnar compression ratio using db.sensor_time_series.stats()',
                'Simulate automated TTL expiration by querying documents beyond the 30-day retention window',
                'Test targeted temporal range queries and observe that the engine scans strictly matching time buckets'
            ],
            'challengeId': 'Kembangkan pipeline capstone dengan menambahkan tahap `$out` atau `$merge`: simpan hasil ringkasan agregasi harian secara otomatis ke koleksi baru `daily_telemetry_rollups` untuk keperluan laporan jangka panjang.',
            'challengeEn': 'Extend the capstone pipeline by incorporating `$out` or `$merge`: automatically materialize daily summary rollups into a persistent `daily_telemetry_rollups` collection for long-term archiving.',
            'summaryId': 'Selamat! Anda telah menguasai seluruh kurikulum MongoDB: dari arsitektur BSON, skema validasi, pemodelan data Embedding vs Referencing, Compound & Multikey Indexing, Aggregation Framework ($match, $group, $lookup, $unwind, $facet), Transaksi ACID, Sharding Horisontal, hingga Capstone IoT Telemetry Pipeline.',
            'summaryEn': 'Congratulations! You have mastered the entire MongoDB curriculum: BSON architecture, schema validation, Embedding vs Referencing data modeling, Compound & Multikey Indexing, Aggregation Framework ($match, $group, $lookup, $unwind, $facet), ACID Transactions, Horizontal Sharding, and an IoT Telemetry Pipeline Capstone.'
        }
    ]

    return {
        'slug': 'mongodb',
        'track_name': 'MongoDB',
        'levels': levels,
        'modules': modules
    }
