# Control Flow

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 3:** Control Flow

## Tujuan Pembelajaran

- If/else if/else untuk kondisi bertingkat
- Ternary operator: condition ? true : false
- Switch case untuk multiple kondisi
- Loop: for, while, do-while, for-of, for-in
- Break dan continue untuk kontrol loop

---

## Program: Sistem Nilai

```javascript
// If/Else
const nilai = 85;

if (nilai >= 90) {
    console.log("Grade: A");
} else if (nilai >= 80) {
    console.log("Grade: B");
} else if (nilai >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: D");
}

// Ternary
const status = nilai >= 70 ? "Lulus" : "Tidak Lulus";
console.log("Status:", status);

// Switch
const hari = "Senin";
switch (hari) {
    case "Senin":
        console.log("Mulai kerja!");
        break;
    case "Jumat":
        console.log("Hampir weekend!");
        break;
    default:
        console.log("Hari biasa.");
}

// For Loop
console.log("\n=== For Loop ===");
for (let i = 1; i <= 5; i++) {
    console.log("Iterasi ke-" + i);
}

// For...Of (Array)
const warna = ["merah", "hijau", "biru"];
console.log("\n=== For...Of ===");
for (const w of warna) {
    console.log("Warna:", w);
}

// For...In (Object)
const user = { nama: "Budi", umur: 25 };
console.log("\n=== For...In ===");
for (const key in user) {
    console.log(key + ":", user[key]);
}

// While & Do-While
console.log("\n=== While ===");
let n = 1;
while (n <= 3) {
    console.log("While:", n);
    n++;
}

// Break & Continue
console.log("\n=== Break & Continue ===");
for (let i = 1; i <= 10; i++) {
    if (i === 5) break;
    if (i % 2 === 0) continue;
    console.log("Ganjil (sebelum 5):", i);
}
```

---

## Konsep Kunci

### If/Else
Kondisi bertingkat. Evaluasi dari atas, berhenti saat true.

### Ternary
`condition ? valueIfTrue : valueIfFalse` — shorthand untuk if/else sederhana.

### Switch
Cocok untuk banyak kondisi dengan value tetap. Jangan lupa `break`.

### Loop
`for` classic, `while` kondisi dulu, `do-while` jalankan dulu. `for-of` untuk iterable, `for-in` untuk object keys.

### Break & Continue
`break` keluar loop, `continue` skip ke iterasi berikutnya.

---

## Eksperimen

- Buat program FizzBuzz dengan for dan if
- Coba switch dengan multiple case
- Eksperimen for-of pada string
- Buat loop dengan break pada kondisi tertentu
- Coba nested loop untuk tabel perkalian

---

## Tantangan

Buat program tebak angka: generate random, user tebak, hint lebih besar/kecil, limit 5 percobaan.

---

## Ringkasan

Minggu 3 dari 14: **Control Flow** (Level: Pemula). Logika program. Minggu depan: **Fungsi**.
