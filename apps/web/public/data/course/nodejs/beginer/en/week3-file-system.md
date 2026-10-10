# File System & Path

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 3:** File System & Path

## Learning Objectives

- Path module: join, resolve, basename, dirname, extname
- fs.readFileSync and fs.writeFileSync for file read/write
- fs.promises for async file operations
- JSON.parse and JSON.stringify for data serialization
- Directories: mkdir, readdir, stat for file info

---

## Program: File Manager

```javascript
const path = require("path");

console.log("=== Path Operations ===");
console.log("Filename:", path.basename("data/users/budi.json"));
console.log("Dirname:", path.dirname("data/users/budi.json"));
console.log("Extname:", path.extname("data/users/budi.json"));
console.log("Joined:", path.join("data", "users", "budi.json"));
console.log("Resolved:", path.resolve("data", "users"));

console.log("\n=== File List Simulation ===");
const files = [
  { name: "data.txt", size: 1024, type: "text/plain" },
  { name: "foto.jpg", size: 204800, type: "image/jpeg" },
  { name: "video.mp4", size: 10485760, type: "video/mp4" },
];
for (const f of files) {
  const sizeKB = (f.size / 1024).toFixed(1);
  console.log("  " + f.name + " (" + sizeKB + " KB) - " + f.type);
}

console.log("\n=== JSON Parse ===");
const jsonString = '{"nama":"Budi","umur":25,"hobi":["ngoding","membaca"]}';
const parsed = JSON.parse(jsonString);
console.log("Nama:", parsed.nama, "Hobi:", parsed.hobi.join(", "));

console.log("\n=== JSON Output ===");
const newData = { nama: "Siti", umur: 23, hobi: ["desain", "memasak"] };
console.log(JSON.stringify(newData, null, 2));
```

---

## Key Concepts

### Path Module
join, resolve, parse.

### File System
Sync and async operations.

### JSON
Parse and stringify.

---

## Experiments

- Read JSON file and display in table format
- Create function to check if file exists
- Implement copy file from source to destination
- Create recursive directory listing

---

## Challenge

Build a note management program: read/write JSON files, add/delete notes, search by title.

---

## Summary

Week 3 of 12: **File System & Path** (Level: Beginner). Next week: **Events & EventEmitter**.
