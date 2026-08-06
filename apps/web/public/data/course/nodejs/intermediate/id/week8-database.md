# Database & ORM

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 8:** Database & ORM

## Tujuan Pembelajaran

- CRUD operations: Create, Read, Update, Delete
- SQL dasar: SELECT, INSERT, UPDATE, DELETE
- ORM pattern: Model sebagai abstraction layer
- Relationships: one-to-many, many-to-many
- Migrations dan schema management

---

## Program: Data Access Layer

```javascript
console.log("=== Database Simulation ===");

const users = [
  { id: 1, nama: "Budi", email: "budi@mail.com", umur: 25 },
  { id: 2, nama: "Siti", email: "siti@mail.com", umur: 23 },
  { id: 3, nama: "Andi", email: "andi@mail.com", umur: 30 },
];

const UserModel = {
  findAll: () => users,
  findById: (id) => users.find(u => u.id === id),
  create: (data) => { const u = { id: users.length + 1, ...data }; users.push(u); return u; },
  update: (id, data) => { const i = users.findIndex(u => u.id === id); if (i >= 0) Object.assign(users[i], data); return users[i]; },
  delete: (id) => { const i = users.findIndex(u => u.id === id); if (i >= 0) users.splice(i, 1); return i >= 0; },
  where: (key, val) => users.filter(u => u[key] === val),
};

console.log("All users:", UserModel.findAll().length);
console.log("Find id=1:", UserModel.findById(1).nama);
console.log("Create:", UserModel.create({ nama: "Dewi", email: "dewi@mail.com", umur: 27 }));
console.log("Update:", UserModel.update(1, { umur: 26 }));
console.log("Where umur=30:", UserModel.where("umur", 30).map(u => u.nama));
console.log("Delete:", UserModel.delete(2));
console.log("Final count:", UserModel.findAll().length);

console.log("\n=== SQL Queries ===");
const queries = [
  "SELECT * FROM users",
  "SELECT * FROM users WHERE umur > 25",
  "INSERT INTO users (nama, email) VALUES ('Dewi', 'dewi@mail.com')",
  "UPDATE users SET umur = 26 WHERE id = 1",
  "DELETE FROM users WHERE id = 2",
];
for (const q of queries) console.log("  " + q);
```

---

## Konsep Kunci

### CRUD
Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE).

### ORM
Object-Relational Mapping: table menjadi Model class.

### Relationships
One-to-many (User has many Posts), Many-to-many (Users <-> Roles).

### Migrations
Version control untuk database schema.

---

## Eksperimen

- Buat model Post dengan relasi ke User
- Implementasikan pagination di findAll
- Tambah search/filter dengan where clause
- Buat seeding data untuk development

---

## Tantangan

Buat blog API dengan User, Post, Comment models. Implementasikan CRUD dan relationships.

---

## Ringkasan

Minggu 8 dari 12: **Database & ORM** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Testing** (Advanced).
