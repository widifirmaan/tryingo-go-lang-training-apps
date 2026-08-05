import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/mongodb/mongodb');

const MODULES = [
  { id: 1, f: 'pengenalan-mongodb', lid: 'Pengenalan MongoDB & Setup', len: 'Introduction to MongoDB & Setup', pid: 'Hello MongoDB', pen: 'Hello MongoDB' },
  { id: 2, f: 'documents-crud', lid: 'Documents & CRUD Operations', len: 'Documents & CRUD Operations', pid: 'Basic Operations', pen: 'Basic Operations' },
  { id: 3, f: 'queries', lid: 'Querying Documents', len: 'Querying Documents', pid: 'Read Operations', pen: 'Read Operations' },
  { id: 4, f: 'projections', lid: 'Projections & Sorting', len: 'Projections & Sorting', pid: 'Data Selection', pen: 'Data Selection' },
  { id: 5, f: 'operators', lid: 'Query Operators', len: 'Query Operators', pid: 'Advanced Queries', pen: 'Advanced Queries' },
  { id: 6, f: 'aggregation', lid: 'Aggregation Pipeline', len: 'Aggregation Pipeline', pid: 'Data Pipelines', pen: 'Data Pipelines' },
  { id: 7, f: 'indexes', lid: 'Indexes & Performance', len: 'Indexes & Performance', pid: 'Query Optimization', pen: 'Query Optimization' },
  { id: 8, f: 'data-modeling', lid: 'Data Modeling Patterns', len: 'Data Modeling Patterns', pid: 'Schema Design', pen: 'Schema Design' },
  { id: 9, f: 'transactions', lid: 'Multi-Document Transactions', len: 'Multi-Document Transactions', pid: 'Data Integrity', pen: 'Data Integrity' },
  { id: 10, f: 'replica-sets', lid: 'Replica Sets & HA', len: 'Replica Sets & High Availability', pid: 'Replication', pen: 'Replication' },
  { id: 11, f: 'sharding', lid: 'Sharding & Scaling', len: 'Sharding & Horizontal Scaling', pid: 'Scale Out', pen: 'Scale Out' },
  { id: 12, f: 'change-streams', lid: 'Change Streams & Events', len: 'Change Streams & Events', pid: 'Real-time Data', pen: 'Real-time Data' },
  { id: 13, f: 'security', lid: 'Security & Authentication', len: 'Security & Authentication', pid: 'Access Control', pen: 'Access Control' },
  { id: 14, f: 'backup', lid: 'Backup & Restore', len: 'Backup & Restore', pid: 'Data Protection', pen: 'Data Protection' },
  { id: 15, f: 'driver', lid: 'Node.js Driver & Integration', len: 'Node.js Driver & Integration', pid: 'App Integration', pen: 'App Integration' },
  { id: 16, f: 'capstone', lid: 'Capstone: Blog API with MongoDB', len: 'Capstone: Blog API with MongoDB', pid: 'Full API Project', pen: 'Full API Project' },
];

const OBJ = {
  1: { id: ['Mengenal MongoDB sebagai NoSQL document database', 'Menginstall MongoDB dan MongoDB Compass', 'Memahami konsep document dan collection', 'Membuat database dan collection pertama'], en: ['Understand MongoDB as a NoSQL document database', 'Install MongoDB and MongoDB Compass', 'Understand documents and collections', 'Create your first database and collection'] },
  2: { id: ['Memahami struktur document MongoDB', 'Melakukan insert, find, update, delete', 'MemahamiObjectId dan data types', 'Menggunakan batch operations'], en: ['Understand MongoDB document structure', 'Perform insert, find, update, delete', 'Understand ObjectId and data types', 'Use batch operations'] },
  3: { id: ['Menulis query dasar dengan find()', 'Menggunakan filter operators', 'Menggunakan projection untuk select fields', 'Memahami query execution plan'], en: ['Write basic queries with find()', 'Use filter operators', 'Use projection to select fields', 'Understand query execution plan'] },
  4: { id: ['Menggunakan projection untuk efisiensi', 'Menggunakan sort() untuk ordering', 'Menggunakan limit() dan skip() untuk pagination', 'Memahami query optimization dasar'], en: ['Use projection for efficiency', 'Use sort() for ordering', 'Use limit() and skip() for pagination', 'Understand basic query optimization'] },
  5: { id: ['Menggunakan $gt, $lt, $gte, $lte', 'Menggunakan $in, $nin, $ne', 'Menggunakan $and, $or, $not', 'Menggunakan regex dan text search'], en: ['Use $gt, $lt, $gte, $lte operators', 'Use $in, $nin, $ne operators', 'Use $and, $or, $not operators', 'Use regex and text search'] },
  6: { id: ['Memahami aggregation pipeline', 'Menggunakan $match, $group, $project', 'Menggunakan $lookup untuk joins', 'Membuat pipeline yang kompleks'], en: ['Understand aggregation pipeline', 'Use $match, $group, $project', 'Use $lookup for joins', 'Create complex pipelines'] },
  7: { id: ['Memahami B-tree indexes di MongoDB', 'Membuat index pada fields frequently queried', 'Memahami compound indexes', 'Menganalisis query dengan explain()'], en: ['Understand B-tree indexes in MongoDB', 'Create indexes on frequently queried fields', 'Understand compound indexes', 'Analyze queries with explain()'] },
  8: { id: ['Memahami embedded documents pattern', 'Memahami referencing pattern', 'Memilih antara embedded dan referencing', 'Merancang schema untuk aplikasi nyata'], en: ['Understand embedded documents pattern', 'Understand referencing pattern', 'Choose between embedded and referencing', 'Design schema for real applications'] },
  9: { id: ['Memahami multi-document transactions', 'Menggunakan startTransaction, commit, abort', 'Memahami write concerns', 'Mengimplementasi transfer antar akun'], en: ['Understand multi-document transactions', 'Use startTransaction, commit, abort', 'Understand write concerns', 'Implement inter-account transfer'] },
  10: { id: ['Memahami replica sets', 'Mengatur primary dan secondary nodes', 'Memahami read preferences', 'Mengkonfigurasi automatic failover'], en: ['Understand replica sets', 'Configure primary and secondary nodes', 'Understand read preferences', 'Configure automatic failover'] },
  11: { id: ['Memahami sharding concepts', 'Mengatur shard keys', 'Menggunakan mongos router', 'Memahami chunk migration'], en: ['Understand sharding concepts', 'Configure shard keys', 'Use mongos router', 'Understand chunk migration'] },
  12: { id: ['Memahami change streams', 'Menggunakan watch() untuk real-time updates', 'Mengfilter change events', 'Membangun real-time notification system'], en: ['Understand change streams', 'Use watch() for real-time updates', 'Filter change events', 'Build real-time notification system'] },
  13: { id: ['Membuat user dan role', 'Memberikan CRUD privileges', 'Memahami role-based access control', 'Mengaktifkan authentication'], en: ['Create users and roles', 'Grant CRUD privileges', 'Understand role-based access control', 'Enable authentication'] },
  14: { id: ['Melakukan mongodump untuk backup', 'Menggunakan mongorestore untuk restore', 'Memahami point-in-time backup', 'Mengatur automated backup'], en: ['Use mongodump for backup', 'Use mongorestore for restore', 'Understand point-in-time backup', 'Set up automated backup'] },
  15: { id: ['Menginstall MongoDB Node.js driver', 'Menghubungkan ke MongoDB', 'Melakukan CRUD operations via driver', 'Menggunakan connection pooling'], en: ['Install MongoDB Node.js driver', 'Connect to MongoDB', 'Perform CRUD via driver', 'Use connection pooling'] },
  16: { id: ['Merancang Blog API lengkap', 'Menggabungkan semua konsep MongoDB', 'Mengoptimasi schema dan indexes', 'Mempersiapkan deployment'], en: ['Design a complete Blog API', 'Combine all MongoDB concepts', 'Optimize schema and indexes', 'Prepare for deployment'] },
};

const CODE = {
  1: `// Connect to MongoDB\nmongosh "mongodb://localhost:27017"\n\n// Create a database and collection\nuse mydb\n db.createCollection("users")\n\n// Insert a document\ndb.users.insertOne({\n  name: "Budi",\n  email: "budi@example.com",\n  createdAt: new Date()\n})\n\n// Query all\ndb.users.find().pretty()`,
  2: `// Insert multiple documents\ndb.users.insertMany([\n  { name: "Alice", email: "alice@example.com", age: 25 },\n  { name: "Bob", email: "bob@example.com", age: 30 }\n])\n\n// Find with filter\ndb.users.find({ age: { $gte: 25 } })\n\n// Update\ndb.users.updateOne(\n  { name: "Alice" },\n  { $set: { age: 26 } }\n)\n\n// Delete\ndb.users.deleteOne({ name: "Bob" })`,
  3: `// Basic find\ndb.users.find({ active: true })\n\n// Filter with operators\ndb.users.find({ age: { $gte: 21, $lte: 30 } })\n\n// Regex search\ndb.users.find({ name: /^A/ })\n\n// Text search\ndb.users.find({ $text: { $search: "Alice" } })`,
  4: `// Projection - select specific fields\ndb.users.find(\n  { active: true },\n  { name: 1, email: 1, _id: 0 }\n)\n\n// Sort and paginate\ndb.users.find()\n  .sort({ createdAt: -1 })\n  .skip(10)\n  .limit(10)`,
  5: `// Compound conditions\ndb.users.find({\n  $and: [\n    { age: { $gte: 21 } },\n    { status: "active" }\n  ]\n})\n\n// $in operator\ndb.users.find({ name: { $in: ["Alice", "Bob"] } })\n\n// $or operator\ndb.users.find({\n  $or: [\n    { role: "admin" },\n    { role: "moderator" }\n  ]\n})`,
  6: `// Aggregation pipeline\ndb.orders.aggregate([\n  { $match: { status: "completed" } },\n  { $group: {\n      _id: "$userId",\n      totalSpent: { $sum: "$amount" },\n      orderCount: { $sum: 1 }\n    }\n  },\n  { $sort: { totalSpent: -1 } }\n])`,
  7: `// Create index\ndb.users.createIndex({ email: 1 }, { unique: true })\n\n// Compound index\ndb.orders.createIndex({ userId: 1, createdAt: -1 })\n\n// Analyze query\ndb.users.find({ email: "alice@example.com" }).explain("executionStats")`,
  8: `// Embedded document pattern\n{\n  _id: ObjectId("..."),\n  name: "Alice",\n  address: {\n    street: "Jl. Merdeka No. 1",\n    city: "Jakarta",\n    country: "Indonesia"\n  }\n}\n\n// Referencing pattern\n{\n  _id: ObjectId("..."),\n  name: "Order #1",\n  userId: ObjectId("..."),\n  items: [\n    { productId: ObjectId("..."), qty: 2 }\n  ]\n}`,
  9: `const session = client.startSession();\n\nsession.withTransaction(async () => {\n  const accounts = db.collection("accounts");\n  \n  await accounts.updateOne(\n    { _id: "account1" },\n    { $inc: { balance: -500000 } },\n    { session }\n  );\n  \n  await accounts.updateOne(\n    { _id: "account2" },\n    { $inc: { balance: 500000 } },\n    { session }\n  );\n});`,
  10: `// Replica set configuration\nrs.initiate({\n  _id: "rs0",\n  members: [\n    { _id: 0, host: "node1:27017", priority: 2 },\n    { _id: 1, host: "node2:27017", priority: 1 },\n    { _id: 2, host: "node3:27017", priority: 1, arbiterOnly: true }\n  ]\n})\n\n// Read from secondary\n db.users.find().readPref("secondaryPreferred")`,
  11: `// Enable sharding\nsh.enableSharding("mydb")\n\n// Shard a collection\nsh.shardCollection(\n  "mydb.users",\n  { userId: "hashed" }\n)\n\n// Add shards\nsh.addShard("replicaSet1/host1:27017")`,
  12: `// Watch for changes\nconst changeStream = db.collection("users").watch([\n  { $match: { "operationType": "insert" } }\n])\n\nchangeStream.on("change", (change) => {\n  console.log("New document:", change.fullDocument)\n})`,
  13: `// Create user with roles\ndb.createUser({\n  user: "app_user",\n  pwd: "secure_password",\n  roles: [\n    { role: "readWrite", db: "mydb" }\n  ]\n})\n\n// Create custom role\ndb.createRole({\n  role: "readOnly",\n  privileges: [{\n    resource: { db: "mydb", collection: "" },\n    actions: ["find"]\n  }],\n  roles: []\n})`,
  14: `// Backup\nmongodump --uri="mongodb://localhost:27017/mydb" --out=./backup\n\n// Restore\nmongorestore --uri="mongodb://localhost:27017" ./backup/mydb\n\n// Backup with compression\nmongodump --uri="mongodb://localhost:27017/mydb" --gzip --out=./backup`,
  15: `const { MongoClient } = require("mongodb");\n\nconst client = new MongoClient("mongodb://localhost:27017");\n\nasync function main() {\n  await client.connect();\n  const db = client.db("mydb");\n  const users = db.collection("users");\n  \n  // Insert\n  await users.insertOne({ name: "Alice", email: "alice@example.com" });\n  \n  // Find\n  const user = await users.findOne({ name: "Alice" });\n  console.log(user);\n  \n  await client.close();\n}\n\nmain();`,
  16: `// Blog API with MongoDB\n// Collections: users, posts, comments, categories\n// Features:\n// - User registration and authentication\n// - CRUD posts with categories\n// - Comments on posts\n// - Aggregation for analytics\n// - Change streams for real-time updates\n// - Indexes for performance`,
};

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => '- ' + o).join('\n');
  const code = CODE[mod.id];
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? mod.id + 1 + '. ' + nextModule.lid : nextModule.len)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const summary = isId
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. MongoDB is a flexible and scalable NoSQL document database. Next week: **${nextWeek}**.`;

  return '# ' + title + '\n\n'
    + '> MongoDB | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```javascript\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + (isId
      ? 'MongoDB adalah NoSQL document database yang menyimpan data dalam format JSON-like documents.\nMongoDB mendukung aggregasi pipeline, indexing lanjutan, transaksi multi-document, dan sharding.\nGunakan mongosh atau MongoDB Compass untuk berinteraksi dengan database.'
      : 'MongoDB is a NoSQL document database that stores data in JSON-like documents.\nMongoDB supports aggregation pipelines, advanced indexing, multi-document transactions, and sharding.\nUse mongosh or MongoDB Compass to interact with the database.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + '- ' + (isId ? 'Ubah query di atas dan lihat hasilnya' : 'Change the query above and see the results') + '\n'
    + '- ' + (isId ? 'Tambah document baru dan coba agregasi' : 'Add a new document and try aggregation') + '\n'
    + '- ' + (isId ? 'Coba buat index dan analisis performa query' : 'Try creating an index and analyze query performance') + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + (isId
      ? 'Buat skema database untuk aplikasi sederhana menggunakan konsep minggu ini.\nJalankan query dan verifikasi hasilnya di mongosh atau MongoDB Compass.'
      : 'Build a database schema for a simple application using this weeks concepts.\nRun queries and verify results in mongosh or MongoDB Compass.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Ringkasan' : 'Summary') + '\n\n'
    + summary + '\n';
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', 'week' + mod.id + '-' + mod.f + '.md'), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', 'week' + mod.id + '-' + mod.f + '.md'), enContent, 'utf8');
  console.log('  ' + mod.id + '. ' + mod.lid + ' / ' + mod.len);
}

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' MongoDB curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);