# File System & Path

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 3:** File System & Path

## Tujuan Pembelajaran

- Path module: join, resolve, basename, dirname, extname
- fs.readFileSync dan fs.writeFileSync untuk baca/tulis file
- fs.promises untuk async file operations
- JSON.parse dan JSON.stringify untuk data serialization
- Direktori: mkdir, readdir, stat untuk info file

---

## Program: Manajer File

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

## Konsep Kunci

### Path Module
join gabung path, resolve absolute path, parse decompose path.

### File System
Sync: readFileSync, writeFileSync. Async: fs.promises.readFile.

### JSON
JSON.parse(string) menjadi object. JSON.stringify(object) menjadi string.

---

## Eksperimen

- Baca file JSON dan tampilkan dalam format table
- Buat fungsi untuk cek apakah file exists
- Implementasikan copy file dari source ke destination
- Buat recursive directory listing

---

## Tantangan

Buat program manajemen catatan: baca/tulis file JSON, tambah/hapus catatan, cari berdasarkan judul.

---

## Ringkasan

Minggu 3 dari 12: **File System & Path** (Level: Pemula). Minggu depan: **Events & EventEmitter**.
