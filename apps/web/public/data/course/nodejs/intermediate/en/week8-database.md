# Database & ORM

> **Kategori:** Node.js | **Level:** Intermediate | **Minggu 8:** Database & ORM

## Learning Objectives

- CRUD operations: Create, Read, Update, Delete
- SQL basics: SELECT, INSERT, UPDATE, DELETE
- ORM pattern: Model as abstraction layer
- Relationships: one-to-many, many-to-many
- Migrations and schema management

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

## Key Concepts

### CRUD
Create, Read, Update, Delete operations.

### ORM
Models as abstraction over tables.

### Relationships
One-to-many, many-to-many.

### Migrations
Database schema versioning.

---

## Experiments

- Create Post model with User relation
- Implement pagination in findAll
- Add search/filter with where clause
- Create data seeding for development

---

## Challenge

Build a blog API with User, Post, Comment models. Implement CRUD and relationships.

---

## Summary

Week 8 of 12: **Database & ORM** (Level: Intermediate). Intermediate phase complete! Next week: **Testing** (Advanced).
