# Fungsi

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 4:** Fungsi

## Tujuan Pembelajaran

- Function declaration vs function expression vs arrow function
- Parameter, default parameter, rest parameter
- Return value dan early return
- Callback function sebagai argumen
- Closure: fungsi yang "mengingat" scope luar

---

## Program: Kalkulator Modular

```javascript
// Function Declaration
function sapa(nama) {
    return `Halo, ${nama}!`;
}
console.log(sapa("Budi"));

// Function Expression
const tambah = function(a, b) {
    return a + b;
};
console.log("Tambah:", tambah(5, 3));

// Arrow Function
const kali = (a, b) => a * b;
const bagi = (a, b) => {
    if (b === 0) return "Error: bagi nol";
    return a / b;
};
console.log("Kali:", kali(4, 3));
console.log("Bagi:", bagi(10, 2));

// Default Parameter
const sapaDefault = (nama = "Tamu") => `Halo, ${nama}!`;
console.log(sapaDefault());
console.log(sapaDefault("Siti"));

// Rest Parameter
const sumAll = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log("Sum:", sumAll(1, 2, 3, 4, 5));

// Callback
function proses(arr, callback) {
    return arr.map(callback);
}
const hasil = proses([1, 2, 3], n => n * n);
console.log("Callback:", hasil);

// Closure
function counter() {
    let count = 0;
    return function() {
        return ++count;
    };
}
const hitung = counter();
console.log("\n=== Closure ===");
console.log("Hitung:", hitung());
console.log("Hitung:", hitung());
console.log("Hitung:", hitung());
```

---

## Konsep Kunci

### Jenis Fungsi
`function decl()` hoisted. `const fn = function(){}` expression. `() => {}` arrow function.

### Parameter
Default: `function(x = 10)`. Rest: `function(...args)` — kumpulkan semua argumen ke array.

### Return
`return value` — keluar dari fungsi dengan nilai. Tanpa return = undefined.

### Callback
Fungsi yang diteruskan sebagai argumen ke fungsi lain.

### Closure
Fungsi dalam fungsi yang masih akses variabel outer scope setelah outer selesai.

---

## Eksperimen

- Buat fungsi rekursif untuk faktorial
- Coba higher-order function: fungsi yang return fungsi
- Eksperimen closure untuk private counter
- Buat fungsi dengan callback async simulasi
- Coba IIFE (Immediately Invoked Function Expression)

---

## Tantangan

Buat library matematika: tambah, kurang, kali, bagi, pangkat, faktorial — semua dengan arrow function dan error handling.

---

## Ringkasan

Minggu 4 dari 14: **Fungsi** (Level: Pemula). Modularitas kode. Minggu depan: **DOM Manipulation**.
