# Tipe Data & Struktur Data

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 2:** Tipe Data & Struktur Data

## Tujuan Pembelajaran

- Array: push, pop, shift, unshift, length
- Array methods: map, filter, reduce, find, some, every
- Object: property access dengan dot dan bracket notation
- Destructuring: ekstrak nilai dari array dan object
- Spread operator: ... untuk copy dan merge

---

## Program: Array & Object

```javascript
// Array
const buah = ["apel", "mangga", "pisang"];
console.log("Buah:", buah);
console.log("Panjang:", buah.length);
console.log("Pertama:", buah[0]);
console.log("Terakhir:", buah[buah.length - 1]);

buah.push("jeruk");
buah.pop();
buah.unshift("anggur");
console.log("Setelah modifikasi:", buah);

console.log("\n=== Array Methods ===");
const angka = [1, 2, 3, 4, 5];
const doubled = angka.map(n => n * 2);
const evens = angka.filter(n => n % 2 === 0);
const sum = angka.reduce((acc, n) => acc + n, 0);
console.log("Original:", angka);
console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);

// Object
const mahasiswa = {
    nama: "Budi",
    umur: 20,
    jurusan: "Informatika",
    aktif: true
};
console.log("\n=== Object ===");
console.log("Nama:", mahasiswa.nama);
console.log("Umur:", mahasiswa["umur"]);

mahasiswa.semester = 4;
delete mahasiswa.aktif;
console.log("Setelah update:", mahasiswa);

// Destructuring
const { nama, jurusan } = mahasiswa;
console.log("\nDestructuring:", nama, "-", jurusan);

// Spread
const buahBaru = [...buah, "durian", "manggis"];
console.log("Spread:", buahBaru);
```

---

## Konsep Kunci

### Array
Ordered list. `push`/`pop` di akhir, `shift`/`unshift` di awal.

### Array Methods
`map` transform, `filter` pilih, `reduce` akumulasi, `find` cari pertama.

### Object
Key-value pairs. Akses: `obj.key` atau `obj["key"]`.

### Destructuring
`const { nama } = obj` — ekstrak property ke variabel.

### Spread
`[...arr1, ...arr2]` — gabung array. `{...obj1, ...obj2}` — gabung object.

---

## Eksperimen

- Buat array 2D dan iterasi dengan nested forEach
- Coba reduce untuk hitung rata-rata
- Eksperimen destructuring nested object
- Buat copy object dengan spread vs Object.assign
- Coba array methods chaining: filter().map().reduce()

---

## Tantangan

Buat program manajemen kontak: tambah, hapus, cari, filter berdasarkan kategori — gunakan array of objects.

---

## Ringkasan

Minggu 2 dari 14: **Tipe Data & Struktur Data** (Level: Pemula). Organisasi data. Minggu depan: **Control Flow**.
