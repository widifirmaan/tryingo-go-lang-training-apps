import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// JAVASCRIPT CURRICULUM — pure research, zero framework influence
// Sources: MDN, Eloquent JS, freeCodeCamp, JavaScript.info
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 14 weeks
// Beginner (5w): Basics, Types, Control Flow, Functions, DOM
// Intermediate (5w): Events, Async, ES6+, Modules, Error Handling
// Advanced (4w): Patterns, Testing, Performance, Project
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('javascript', 'JavaScript');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dari nol: sintaks, tipe data, fungsi, dan manipulasi DOM.',
    descEn: 'From scratch: syntax, data types, functions, and DOM manipulation.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'JavaScript modern: async, ES6+, modules, dan error handling.',
    descEn: 'Modern JavaScript: async, ES6+, modules, and error handling.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Production JS: design patterns, testing, performa, dan proyek capstone.',
    descEn: 'Production JS: design patterns, testing, performance, and capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-5) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'dasar-sintaks',
    titleId: 'Dasar Sintaks JavaScript', titleEn: 'JavaScript Syntax Basics',
    programId: 'Halo JavaScript', programEn: 'Hello JavaScript',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// Variabel dan Tipe Data
const nama = "Budi";
let umur = 25;
const aktif = true;

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Aktif:", aktif);
console.log("Tipe nama:", typeof nama);
console.log("Tipe umur:", typeof umur);

// Operator
const a = 10;
const b = 3;
console.log("\\n=== Operator ===");
console.log("a + b =", a + b);
console.log("a - b =", a - b);
console.log("a * b =", a * b);
console.log("a / b =", a / b);
console.log("a % b =", a % b);
console.log("a ** b =", a ** b);

// Template Literal
const sapa = \`Halo, \${nama}! Umur Anda \${umur} tahun.\`;
console.log("\\n" + sapa);

// Null & Undefined
let kosong = null;
let belumDiisi;
console.log("\\nnull:", kosong);
console.log("undefined:", belumDiisi);`,
    objectivesId: [
      'Mendeklarasikan variabel dengan const, let, var',
      'Tipe data primitif: string, number, boolean, null, undefined, symbol',
      'Operator aritmatika: +, -, *, /, %, **',
      'Template literal dengan backtick dan ekspresi ${}',
      'typeof operator untuk cek tipe data',
    ],
    objectivesEn: [
      'Declare variables with const, let, var',
      'Primitive types: string, number, boolean, null, undefined, symbol',
      'Arithmetic operators: +, -, *, /, %, **',
      'Template literals with backtick and ${} expressions',
      'typeof operator to check data types',
    ],
    explanationId: '### Variabel\n`const` immutable, `let` mutable, `var` (hindari - function scope).\n\n### Tipe Data Primitif\n`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.\n\n### Operator\nAritmatika: `+ - * / % **`. Perbandingan: `=== !== > < >= <=`.\n\n### Template Literal\nBacktick `` ` `` dengan `${expr}` untuk string interpolation.\n\n### typeof\n`typeof "hello"` = "string", `typeof 42` = "number".',
    explanationEn: '### Variables\n`const` immutable, `let` mutable, `var` (avoid - function scope).\n\n### Primitive Types\n`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.\n\n### Operators\nArithmetic: `+ - * / % **`. Comparison: `=== !== > < >= <=`.\n\n### Template Literals\nBacktick `` ` `` with `${expr}` for string interpolation.\n\n### typeof\n`typeof "hello"` = "string", `typeof 42` = "number".',
    experimentsId: [
      'Ubah nilai variabel let dan const — apa yang terjadi?',
      'Coba operator perbandingan: 5 === "5"',
      'Buat template literal dengan ekspresi aritmatika',
      'Coba typeof pada null, array, dan object',
      'Eksperimen dengan operator logika && dan ||',
    ],
    experimentsEn: [
      'Change let and const values — what happens?',
      'Try comparison: 5 === "5"',
      'Create template literal with arithmetic expression',
      'Try typeof on null, array, and object',
      'Experiment with logical operators && and ||',
    ],
    challengeId: 'Buat program kalkulator sederhana: input dua angka, output semua operasi aritmatika dengan template literal.',
    challengeEn: 'Build a simple calculator: input two numbers, output all arithmetic operations with template literals.',
    summaryId: 'Minggu 1 dari 14: **Dasar Sintaks JavaScript** (Level: Pemula). Fondasi bahasa. Minggu depan: **Tipe Data & Struktur Data**.',
    summaryEn: 'Week 1 of 14: **JavaScript Syntax Basics** (Level: Beginner). Language foundation. Next week: **Data Types & Data Structures**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'tipe-data-struktur',
    titleId: 'Tipe Data & Struktur Data', titleEn: 'Data Types & Data Structures',
    programId: 'Array & Object', programEn: 'Arrays & Objects',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// Array
const buah = ["apel", "mangga", "pisang"];
console.log("Buah:", buah);
console.log("Panjang:", buah.length);
console.log("Pertama:", buah[0]);
console.log("Terakhir:", buah[buah.length - 1]);

buah.push("jeruk");
buah.pop();
buah.unshift("anggur");
console.log("Setelah modifikasi:", buah);

console.log("\\n=== Array Methods ===");
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
console.log("\\n=== Object ===");
console.log("Nama:", mahasiswa.nama);
console.log("Umur:", mahasiswa["umur"]);

mahasiswa.semester = 4;
delete mahasiswa.aktif;
console.log("Setelah update:", mahasiswa);

// Destructuring
const { nama, jurusan } = mahasiswa;
console.log("\\nDestructuring:", nama, "-", jurusan);

// Spread
const buahBaru = [...buah, "durian", "manggis"];
console.log("Spread:", buahBaru);`,
    objectivesId: [
      'Array: push, pop, shift, unshift, length',
      'Array methods: map, filter, reduce, find, some, every',
      'Object: property access dengan dot dan bracket notation',
      'Destructuring: ekstrak nilai dari array dan object',
      'Spread operator: ... untuk copy dan merge',
    ],
    objectivesEn: [
      'Array: push, pop, shift, unshift, length',
      'Array methods: map, filter, reduce, find, some, every',
      'Objects: property access with dot and bracket notation',
      'Destructuring: extract values from arrays and objects',
      'Spread operator: ... for copying and merging',
    ],
    explanationId: '### Array\nOrdered list. `push`/`pop` di akhir, `shift`/`unshift` di awal.\n\n### Array Methods\n`map` transform, `filter` pilih, `reduce` akumulasi, `find` cari pertama.\n\n### Object\nKey-value pairs. Akses: `obj.key` atau `obj["key"]`.\n\n### Destructuring\n`const { nama } = obj` — ekstrak property ke variabel.\n\n### Spread\n`[...arr1, ...arr2]` — gabung array. `{...obj1, ...obj2}` — gabung object.',
    explanationEn: '### Arrays\nOrdered lists. `push`/`pop` at end, `shift`/`unshift` at start.\n\n### Array Methods\n`map` transform, `filter` select, `reduce` accumulate, `find` search first.\n\n### Objects\nKey-value pairs. Access: `obj.key` or `obj["key"]`.\n\n### Destructuring\n`const { nama } = obj` — extract property to variable.\n\n### Spread\n`[...arr1, ...arr2]` — merge arrays. `{...obj1, ...obj2}` — merge objects.',
    experimentsId: [
      'Buat array 2D dan iterasi dengan nested forEach',
      'Coba reduce untuk hitung rata-rata',
      'Eksperimen destructuring nested object',
      'Buat copy object dengan spread vs Object.assign',
      'Coba array methods chaining: filter().map().reduce()',
    ],
    experimentsEn: [
      'Create 2D array and iterate with nested forEach',
      'Try reduce to calculate average',
      'Experiment destructuring nested objects',
      'Create object copy with spread vs Object.assign',
      'Try array method chaining: filter().map().reduce()',
    ],
    challengeId: 'Buat program manajemen kontak: tambah, hapus, cari, filter berdasarkan kategori — gunakan array of objects.',
    challengeEn: 'Build a contact management program: add, delete, search, filter by category — use array of objects.',
    summaryId: 'Minggu 2 dari 14: **Tipe Data & Struktur Data** (Level: Pemula). Organisasi data. Minggu depan: **Control Flow**.',
    summaryEn: 'Week 2 of 14: **Data Types & Data Structures** (Level: Beginner). Data organization. Next week: **Control Flow**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'control-flow',
    titleId: 'Control Flow', titleEn: 'Control Flow',
    programId: 'Sistem Nilai', programEn: 'Grade System',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// If/Else
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
console.log("\\n=== For Loop ===");
for (let i = 1; i <= 5; i++) {
    console.log("Iterasi ke-" + i);
}

// For...Of (Array)
const warna = ["merah", "hijau", "biru"];
console.log("\\n=== For...Of ===");
for (const w of warna) {
    console.log("Warna:", w);
}

// For...In (Object)
const user = { nama: "Budi", umur: 25 };
console.log("\\n=== For...In ===");
for (const key in user) {
    console.log(key + ":", user[key]);
}

// While & Do-While
console.log("\\n=== While ===");
let n = 1;
while (n <= 3) {
    console.log("While:", n);
    n++;
}

// Break & Continue
console.log("\\n=== Break & Continue ===");
for (let i = 1; i <= 10; i++) {
    if (i === 5) break;
    if (i % 2 === 0) continue;
    console.log("Ganjil (sebelum 5):", i);
}`,
    objectivesId: [
      'If/else if/else untuk kondisi bertingkat',
      'Ternary operator: condition ? true : false',
      'Switch case untuk multiple kondisi',
      'Loop: for, while, do-while, for-of, for-in',
      'Break dan continue untuk kontrol loop',
    ],
    objectivesEn: [
      'If/else if/else for multi-level conditions',
      'Ternary operator: condition ? true : false',
      'Switch case for multiple conditions',
      'Loops: for, while, do-while, for-of, for-in',
      'Break and continue for loop control',
    ],
    explanationId: '### If/Else\nKondisi bertingkat. Evaluasi dari atas, berhenti saat true.\n\n### Ternary\n`condition ? valueIfTrue : valueIfFalse` — shorthand untuk if/else sederhana.\n\n### Switch\nCocok untuk banyak kondisi dengan value tetap. Jangan lupa `break`.\n\n### Loop\n`for` classic, `while` kondisi dulu, `do-while` jalankan dulu. `for-of` untuk iterable, `for-in` untuk object keys.\n\n### Break & Continue\n`break` keluar loop, `continue` skip ke iterasi berikutnya.',
    explanationEn: '### If/Else\nMulti-level conditions. Evaluates top-down, stops at first true.\n\n### Ternary\n`condition ? valueIfTrue : valueIfFalse` — shorthand for simple if/else.\n\n### Switch\nGood for many conditions with fixed values. Don\'t forget `break`.\n\n### Loops\n`for` classic, `while` condition first, `do-while` run first. `for-of` for iterables, `for-in` for object keys.\n\n### Break & Continue\n`break` exits loop, `continue` skips to next iteration.',
    experimentsId: [
      'Buat program FizzBuzz dengan for dan if',
      'Coba switch dengan multiple case',
      'Eksperimen for-of pada string',
      'Buat loop dengan break pada kondisi tertentu',
      'Coba nested loop untuk tabel perkalian',
    ],
    experimentsEn: [
      'Create FizzBuzz program with for and if',
      'Try switch with multiple cases',
      'Experiment for-of on string',
      'Create loop with break on specific condition',
      'Try nested loop for multiplication table',
    ],
    challengeId: 'Buat program tebak angka: generate random, user tebak, hint lebih besar/kecil, limit 5 percobaan.',
    challengeEn: 'Build a number guessing game: generate random, user guesses, hint higher/lower, limit 5 attempts.',
    summaryId: 'Minggu 3 dari 14: **Control Flow** (Level: Pemula). Logika program. Minggu depan: **Fungsi**.',
    summaryEn: 'Week 3 of 14: **Control Flow** (Level: Beginner). Program logic. Next week: **Functions**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'fungsi',
    titleId: 'Fungsi', titleEn: 'Functions',
    programId: 'Kalkulator Modular', programEn: 'Modular Calculator',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// Function Declaration
function sapa(nama) {
    return \`Halo, \${nama}!\`;
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
const sapaDefault = (nama = "Tamu") => \`Halo, \${nama}!\`;
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
console.log("\\n=== Closure ===");
console.log("Hitung:", hitung());
console.log("Hitung:", hitung());
console.log("Hitung:", hitung());`,
    objectivesId: [
      'Function declaration vs function expression vs arrow function',
      'Parameter, default parameter, rest parameter',
      'Return value dan early return',
      'Callback function sebagai argumen',
      'Closure: fungsi yang "mengingat" scope luar',
    ],
    objectivesEn: [
      'Function declaration vs function expression vs arrow function',
      'Parameters, default parameters, rest parameters',
      'Return values and early returns',
      'Callback functions as arguments',
      'Closures: functions that "remember" outer scope',
    ],
    explanationId: '### Jenis Fungsi\n`function decl()` hoisted. `const fn = function(){}` expression. `() => {}` arrow function.\n\n### Parameter\nDefault: `function(x = 10)`. Rest: `function(...args)` — kumpulkan semua argumen ke array.\n\n### Return\n`return value` — keluar dari fungsi dengan nilai. Tanpa return = undefined.\n\n### Callback\nFungsi yang diteruskan sebagai argumen ke fungsi lain.\n\n### Closure\nFungsi dalam fungsi yang masih akses variabel outer scope setelah outer selesai.',
    explanationEn: '### Function Types\n`function decl()` hoisted. `const fn = function(){}` expression. `() => {}` arrow function.\n\n### Parameters\nDefault: `function(x = 10)`. Rest: `function(...args)` — collect all args to array.\n\n### Return\n`return value` — exit function with value. No return = undefined.\n\n### Callbacks\nFunction passed as argument to another function.\n\n### Closures\nInner function that still accesses outer scope variables after outer completes.',
    experimentsId: [
      'Buat fungsi rekursif untuk faktorial',
      'Coba higher-order function: fungsi yang return fungsi',
      'Eksperimen closure untuk private counter',
      'Buat fungsi dengan callback async simulasi',
      'Coba IIFE (Immediately Invoked Function Expression)',
    ],
    experimentsEn: [
      'Create recursive function for factorial',
      'Try higher-order function: function that returns function',
      'Experiment closure for private counter',
      'Create function with async callback simulation',
      'Try IIFE (Immediately Invoked Function Expression)',
    ],
    challengeId: 'Buat library matematika: tambah, kurang, kali, bagi, pangkat, faktorial — semua dengan arrow function dan error handling.',
    challengeEn: 'Build a math library: add, subtract, multiply, divide, power, factorial — all with arrow functions and error handling.',
    summaryId: 'Minggu 4 dari 14: **Fungsi** (Level: Pemula). Modularitas kode. Minggu depan: **DOM Manipulation**.',
    summaryEn: 'Week 4 of 14: **Functions** (Level: Beginner). Code modularity. Next week: **DOM Manipulation**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'dom-manipulation',
    titleId: 'DOM Manipulation', titleEn: 'DOM Manipulation',
    programId: 'To-Do List Sederhana', programEn: 'Simple To-Do List',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// Simulasi DOM (untuk playground non-browser)
// Di browser, gunakan document.querySelector dll.

// Simulasi elemen DOM
const fakeDOM = {
    elements: {},
    createElement(tag) {
        return { tag, children: [], textContent: "", classList: [] };
    },
    appendChild(parent, child) {
        parent.children.push(child);
        return child;
    }
};

// Simulasi To-Do List
class TodoList {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }

    add(text) {
        const todo = { id: this.nextId++, text, done: false };
        this.todos.push(todo);
        return todo;
    }

    toggle(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) todo.done = !todo.done;
        return todo;
    }

    remove(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    getAll() {
        return this.todos;
    }

    getCompleted() {
        return this.todos.filter(t => t.done);
    }

    getPending() {
        return this.todos.filter(t => !t.done);
    }
}

// Demo
const todo = new TodoList();
todo.add("Belajar JavaScript");
todo.add("Buat To-Do App");
todo.add("Push ke GitHub");

console.log("=== Semua Todo ===");
console.log(todo.getAll());

todo.toggle(1);
console.log("\\n=== Setelah toggle #1 ===");
console.log("Completed:", todo.getCompleted());
console.log("Pending:", todo.getPending());

todo.remove(2);
console.log("\\n=== Setelah hapus #2 ===");
console.log(todo.getAll());

// DOM API yang di browser:
// document.querySelector("#id") — pilih elemen
// document.createElement("div") — buat elemen baru
// element.textContent = "text" — ubah teks
// element.classList.add("active") — tambah class
// element.addEventListener("click", fn) — event handler
// element.innerHTML = "<span>html</span>" — ubah HTML`,
    objectivesId: [
      'Memahami DOM tree dan node types',
      'querySelector dan querySelectorAll untuk pilih elemen',
      'createElement dan appendChild untuk buat elemen baru',
      'textContent, innerHTML, classList untuk manipulasi',
      'Event listener: addEventListener untuk interaksi',
    ],
    objectivesEn: [
      'Understand DOM tree and node types',
      'querySelector and querySelectorAll to select elements',
      'createElement and appendChild to create new elements',
      'textContent, innerHTML, classList for manipulation',
      'Event listeners: addEventListener for interaction',
    ],
    explanationId: '### DOM Tree\nDocument Object Model — representasi tree dari HTML. Setiap node adalah object.\n\n### Select Elemen\n`querySelector(".class")` — CSS selector. `getElementById("id")` — by ID.\n\n### Create & Append\n`document.createElement("div")` — buat. `parent.appendChild(child)` — tambah.\n\n### Manipulasi\n`textContent` teks aman, `innerHTML` parse HTML, `classList.add/remove/toggle`.\n\n### Events\n`element.addEventListener("click", handler)` — responsif terhadap user action.',
    explanationEn: '### DOM Tree\nDocument Object Model — tree representation of HTML. Each node is an object.\n\n### Select Elements\n`querySelector(".class")` — CSS selector. `getElementById("id")` — by ID.\n\n### Create & Append\n`document.createElement("div")` — create. `parent.appendChild(child)` — add.\n\n### Manipulation\n`textContent` safe text, `innerHTML` parses HTML, `classList.add/remove/toggle`.\n\n### Events\n`element.addEventListener("click", handler)` — responsive to user actions.',
    experimentsId: [
      'Buat elemen div dengan JavaScript dan tambah ke body',
      'Coba classList.toggle untuk show/hide',
      'Eksperimen event delegation pada list',
      'Buat form input yang menambah item ke list',
      'Coba dataset attributes untuk simpan data',
    ],
    experimentsEn: [
      'Create div element with JavaScript and add to body',
      'Try classList.toggle for show/hide',
      'Experiment event delegation on list',
      'Create form input that adds items to list',
      'Try dataset attributes to store data',
    ],
    challengeId: 'Buat to-do list app: tambah, toggle selesai, hapus, filter — dengan DOM manipulation dan event listeners.',
    challengeEn: 'Build a to-do list app: add, toggle complete, delete, filter — with DOM manipulation and event listeners.',
    summaryId: 'Minggu 5 dari 14: **DOM Manipulation** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Events & Event Handling** (Intermediate).',
    summaryEn: 'Week 5 of 14: **DOM Manipulation** (Level: Beginner). Beginner phase complete! Next week: **Events & Event Handling** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 6-10) ──────────────────────────────────────────────
  {
    week: 6, level: 'intermediate', topicId: 'events-handling',
    titleId: 'Events & Event Handling', titleEn: 'Events & Event Handling',
    programId: 'Event System', programEn: 'Event System',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// Simulasi Event System
class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event]
            .filter(cb => cb !== callback);
    }

    emit(event, ...args) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(cb => cb(...args));
    }

    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
}

// Demo Event System
const emitter = new EventEmitter();

// Subscribe
const unsub = emitter.on("user:login", (user) => {
    console.log("User login:", user);
});

emitter.on("user:login", (user) => {
    console.log("Log activity:", user);
});

emitter.once("app:start", () => {
    console.log("App started (once)");
});

// Emit events
console.log("=== Emit Events ===");
emitter.emit("app:start");
emitter.emit("app:start"); // tidak trigger once lagi
emitter.emit("user:login", "Budi");

// Unsubscribe
unsub();
console.log("\\n=== After unsubscribe ===");
emitter.emit("user:login", "Siti"); // hanya 1 listener

// Event phases (browser):
// 1. Capture phase: dari target ke atas
// 2. Target phase: di elemen target
// 3. Bubble phase: dari target ke atas
// stopPropagation() — hentikan propagasi
// preventDefault() — cegah default behavior

// Event delegation pattern:
// parent.addEventListener("click", (e) => {
//     if (e.target.matches(".child-selector")) {
//         // handle child click
//     }
// });`,
    objectivesId: [
      'Event phases: capture, target, bubble',
      'Event delegation: handle event di parent',
      'Custom events dengan EventEmitter pattern',
      'stopPropagation dan preventDefault',
      'once listener dan unsubscribe pattern',
    ],
    objectivesEn: [
      'Event phases: capture, target, bubble',
      'Event delegation: handle events on parent',
      'Custom events with EventEmitter pattern',
      'stopPropagation and preventDefault',
      'Once listeners and unsubscribe patterns',
    ],
    explanationId: '### Event Phases\n1. Capture: window → target. 2. Target: elemen target. 3. Bubble: target → window.\n\n### Event Delegation\nSatu listener di parent untuk banyak child. Cek `e.target.matches(selector)`.\n\n### Custom Events\n`EventEmitter` pattern: `on`, `off`, `emit`, `once`.\n\n### Propagation\n`stopPropagation()` hentikan bubbling. `preventDefault()` cegah default behavior.\n\n### Unsubscribe\nReturn fungsi unsubscribe dari `on()` untuk cleanup.',
    explanationEn: '### Event Phases\n1. Capture: window → target. 2. Target: target element. 3. Bubble: target → window.\n\n### Event Delegation\nOne listener on parent for many children. Check `e.target.matches(selector)`.\n\n### Custom Events\n`EventEmitter` pattern: `on`, `off`, `emit`, `once`.\n\n### Propagation\n`stopPropagation()` stops bubbling. `preventDefault()` prevents default behavior.\n\n### Unsubscribe\nReturn unsubscribe function from `on()` for cleanup.',
    experimentsId: [
      'Buat event bus untuk komunikasi antar module',
      'Coba capture phase dengan addEventListener third arg',
      'Eksperimen event delegation pada table',
      'Buat custom event dengan detail data',
      'Implementasikan throttle pada scroll event',
    ],
    experimentsEn: [
      'Create event bus for inter-module communication',
      'Try capture phase with addEventListener third arg',
      'Experiment event delegation on table',
      'Create custom event with detail data',
      'Implement throttle on scroll event',
    ],
    challengeId: 'Buat keyboard shortcut system: register shortcut, trigger action, dengan EventEmitter pattern.',
    challengeEn: 'Build a keyboard shortcut system: register shortcut, trigger action, with EventEmitter pattern.',
    summaryId: 'Minggu 6 dari 14: **Events & Event Handling** (Level: Menengah). Interaksi pengguna. Minggu depan: **Async JavaScript**.',
    summaryEn: 'Week 6 of 14: **Events & Event Handling** (Level: Intermediate). User interaction. Next week: **Async JavaScript**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'async-javascript',
    titleId: 'Async JavaScript', titleEn: 'Async JavaScript',
    programId: 'Promise & Async/Await', programEn: 'Promises & Async/Await',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// Simulasi Async Operations
function fetchData(url) {
    return new Promise((resolve, reject) => {
        console.log("Fetching:", url);
        setTimeout(() => {
            if (url.includes("error")) {
                reject(new Error("Network error"));
            } else {
                resolve({ data: "Response from " + url, status: 200 });
            }
        }, 100);
    });
}

// Promise Chain
console.log("=== Promise Chain ===")
fetchData("/api/users")
    .then(res => {
        console.log("Step 1:", res.data);
        return fetchData("/api/posts");
    })
    .then(res => {
        console.log("Step 2:", res.data);
        return fetchData("/api/comments");
    })
    .then(res => {
        console.log("Step 3:", res.data);
    })
    .catch(err => {
        console.error("Error:", err.message);
    });

// Async/Await
async function loadUserData() {
    try {
        console.log("\\n=== Async/Await ===")
        const users = await fetchData("/api/users");
        console.log("Users:", users.data);

        const posts = await fetchData("/api/posts");
        console.log("Posts:", posts.data);

        return { users, posts };
    } catch (error) {
        console.error("Failed:", error.message);
    }
}

// Parallel Execution
async function loadDashboard() {
    console.log("\\n=== Parallel Execution ===")
    const start = Date.now();

    const [users, posts, stats] = await Promise.all([
        fetchData("/api/users"),
        fetchData("/api/posts"),
        fetchData("/api/stats")
    ]);

    console.log("All loaded in", Date.now() - start, "ms");
    console.log("Results:", users.data, "|", posts.data, "|", stats.data);
}

// Run demos
setTimeout(() => {
    loadUserData().then(() => {
        loadDashboard();
    });
}, 200);

// Promise Utilities
console.log("\\n=== Promise Utilities ===");
console.log("Promise.all — semua harus berhasil");
console.log("Promise.race — yang pertama selesai");
console.log("Promise.allSettled — semua hasil (success/fail)");
console.log("Promise.any — yang pertama berhasil");`,
    objectivesId: [
      'Callback vs Promise vs Async/Await',
      'Promise states: pending, fulfilled, rejected',
      'Promise.all, Promise.race, Promise.allSettled',
      'Error handling: try/catch dengan async/await',
      'Parallel vs sequential execution',
    ],
    objectivesEn: [
      'Callbacks vs Promises vs Async/Await',
      'Promise states: pending, fulfilled, rejected',
      'Promise.all, Promise.race, Promise.allSettled',
      'Error handling: try/catch with async/await',
      'Parallel vs sequential execution',
    ],
    explanationId: '### Callback → Promise → Async/Await\nCallback hell → Promise chain → async/await (cleanest).\n\n### Promise States\n`pending` → `fulfilled` (resolve) atau `rejected` (reject).\n\n### Promise.all\nSemua promise harus berhasil. Jika satu gagal, semua gagal.\n\n### Promise.race\nReturn promise pertama yang selesai (success atau fail).\n\n### Async/Await\n`async function` return Promise. `await` tunggu Promise selesai.\n\n### Parallel\n`Promise.all([p1, p2, p3])` — jalankan bersamaan, bukan sequential.',
    explanationEn: '### Callback → Promise → Async/Await\nCallback hell → Promise chain → async/await (cleanest).\n\n### Promise States\n`pending` → `fulfilled` (resolve) or `rejected` (reject).\n\n### Promise.all\nAll promises must succeed. If one fails, all fail.\n\n### Promise.race\nReturns first promise to complete (success or fail).\n\n### Async/Await\n`async function` returns Promise. `await` waits for Promise to complete.\n\n### Parallel\n`Promise.all([p1, p2, p3])` — run concurrently, not sequentially.',
    experimentsId: [
      'Buat Promise yang reject setelah timeout',
      'Coba Promise.allSettled dengan mix success/fail',
      'Eksperimen Promise.race untuk timeout pattern',
      'Buat retry logic dengan async/await',
      'Implementasikan Promise.all dengan concurrency limit',
    ],
    experimentsEn: [
      'Create Promise that rejects after timeout',
      'Try Promise.allSettled with mix success/fail',
      'Experiment Promise.race for timeout pattern',
      'Create retry logic with async/await',
      'Implement Promise.all with concurrency limit',
    ],
    challengeId: 'Buat data loader: fetch 3 API secara parallel, handle errors per-request, dengan retry logic.',
    challengeEn: 'Build a data loader: fetch 3 APIs in parallel, handle errors per-request, with retry logic.',
    summaryId: 'Minggu 7 dari 14: **Async JavaScript** (Level: Menengah). Non-blocking code. Minggu depan: **ES6+ Features**.',
    summaryEn: 'Week 7 of 14: **Async JavaScript** (Level: Intermediate). Non-blocking code. Next week: **ES6+ Features**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'es6-features',
    titleId: 'ES6+ Features', titleEn: 'ES6+ Features',
    programId: 'Modern JS Syntax', programEn: 'Modern JS Syntax',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: '// Destructuring\nconst [a, b, ...rest] = [1, 2, 3, 4, 5];\nconst { nama, umur, ...lain } = { nama: "Budi", umur: 25, kota: "Jakarta" };\nconsole.log("Array:", a, b, rest);\nconsole.log("Object:", nama, umur, lain);\n\n// Default + Rename\nconst { nama: name, aktif: active = true } = { nama: "Siti" };\nconsole.log("Rename:", name, active);\n\n// Modules (simulasi)\n// export const PI = 3.14;\n// export function add(a, b) { return a + b; }\n// export default class Calculator {}\n// import Calculator, { PI, add } from "./math.js";\n\n// Classes\nclass Animal {\n    constructor(name) {\n        this.name = name;\n    }\n    speak() {\n        return `${this.name} makes a sound`;\n    }\n}\n\nclass Dog extends Animal {\n    constructor(name, breed) {\n        super(name);\n        this.breed = breed;\n    }\n    speak() {\n        return `${this.name} barks!`;\n    }\n}\n\nconst dog = new Dog("Buddy", "Labrador");\nconsole.log("\\n=== Classes ===");\nconsole.log(dog.speak());\nconsole.log("Breed:", dog.breed);\n\n// Optional Chaining\nconst user = { profile: { email: "budi@mail.com" } };\nconsole.log("\\n=== Optional Chaining ===");\nconsole.log("Email:", user?.profile?.email);\nconsole.log("Phone:", user?.profile?.phone); // undefined, no error\nconsole.log("Nested:", user?.address?.street); // undefined, no error\n\n// Nullish Coalescing\nconst value1 = null ?? "default";\nconst value2 = 0 ?? "default";\nconst value3 = "" ?? "default";\nconsole.log("\\n=== Nullish Coalescing ===");\nconsole.log("null ??", value1);\nconsole.log("0 ??", value2); // 0 (bukan null/undefined)\nconsole.log("empty ??", value3); // "" (bukan null/undefined)\n\n// Logical Assignment\nlet x = null;\nx ??= "fallback";\nconsole.log("\\n=== Logical Assignment ===");\nconsole.log("x ??= fallback:", x);\n\nlet count = 5;\ncount ||= 10; // hanya jika falsy\nconsole.log("count ||= 10:", count);',
    objectivesId: [
      'Destructuring: array dan object dengan rest pattern',
      'Classes: constructor, extends, super, method',
      'Optional chaining: ?. untuk akses property aman',
      'Nullish coalescing: ?? untuk default value',
      'Logical assignment: ||=, &&=, ??=',
    ],
    objectivesEn: [
      'Destructuring: arrays and objects with rest pattern',
      'Classes: constructor, extends, super, methods',
      'Optional chaining: ?. for safe property access',
      'Nullish coalescing: ?? for default values',
      'Logical assignment: ||=, &&=, ??=',
    ],
    explanationId: '### Destructuring\n`const [a, ...rest] = arr` — ekstrak array. `const { nama } = obj` — ekstrak object.\n\n### Classes\n`class` syntax di atas prototype. `extends` inheritance, `super()` parent constructor.\n\n### Optional Chaining\n`obj?.prop?.method?.()` — return undefined jika chain null/undefined, tidak throw error.\n\n### Nullish Coalescing\n`value ?? default` — default hanya jika null/undefined (bukan 0 atau "").\n\n### Logical Assignment\n`x ??= val` — assign hanya jika x nullish. `x ||= val` — assign hanya jika x falsy.',
    explanationEn: '### Destructuring\n`const [a, ...rest] = arr` — extract array. `const { nama } = obj` — extract object.\n\n### Classes\n`class` syntax over prototype. `extends` inheritance, `super()` parent constructor.\n\n### Optional Chaining\n`obj?.prop?.method?.()` — returns undefined if chain null/undefined, no error thrown.\n\n### Nullish Coalescing\n`value ?? default` — default only if null/undefined (not 0 or "").\n\n### Logical Assignment\n`x ??= val` — assign only if x nullish. `x ||= val` — assign only if x falsy.',
    experimentsId: [
      'Buat class hierarchy: Vehicle → Car → ElectricCar',
      'Coba optional chaining dengan method call',
      'Eksperimen ?? vs || pada berbagai value',
      'Buat swap variable dengan destructuring',
      'Coba private class fields dengan #',
    ],
    experimentsEn: [
      'Create class hierarchy: Vehicle → Car → ElectricCar',
      'Try optional chaining with method calls',
      'Experiment ?? vs || on various values',
      'Create swap variables with destructuring',
      'Try private class fields with #',
    ],
    challengeId: 'Buat class Library: Book, Member, Transaction — dengan inheritance, optional chaining, dan nullish coalescing.',
    challengeEn: 'Create a Library class: Book, Member, Transaction — with inheritance, optional chaining, and nullish coalescing.',
    summaryId: 'Minggu 8 dari 14: **ES6+ Features** (Level: Menengah). JavaScript modern. Minggu depan: **Modules**.',
    summaryEn: 'Week 8 of 14: **ES6+ Features** (Level: Intermediate). Modern JavaScript. Next week: **Modules**.',
  },
  {
    week: 9, level: 'intermediate', topicId: 'modules',
    titleId: 'Modules', titleEn: 'Modules',
    programId: 'ES Modules', programEn: 'ES Modules',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// Simulasi ES Modules (di browser/native Node)
// File: math.js
// export const PI = 3.14159;
// export function add(a, b) { return a + b; }
// export function multiply(a, b) { return a * b; }
// export default class Calculator { ... }

// File: main.js
// import Calculator, { PI, add, multiply } from "./math.js";
// import * as MathUtils from "./math.js";

// Simulasi module system
const MathUtils = (() => {
    const PI = 3.14159;

    function add(a, b) { return a + b; }
    function multiply(a, b) { return a * b; }
    function subtract(a, b) { return a - b; }

    class Calculator {
        #result = 0; // private field

        add(n) { this.#result += n; return this; }
        subtract(n) { this.#result -= n; return this; }
        getResult() { return this.#result; }
    }

    // Named exports
    return { PI, add, multiply, subtract, Calculator };
})();

// Gunakan module
console.log("=== ES Modules Simulation ===");
console.log("PI:", MathUtils.PI);
console.log("Add:", MathUtils.add(5, 3));
console.log("Multiply:", MathUtils.multiply(4, 7));

const calc = new MathUtils.Calculator();
calc.add(10).subtract(3).add(5);
console.log("Calculator:", calc.getResult());

// Dynamic import (simulasi)
async function loadModule(moduleName) {
    console.log("\\n=== Dynamic Import ===");
    console.log("Loading module:", moduleName);
    // const module = await import("./" + moduleName + ".js");
    return MathUtils;
}

loadModule("math").then(mod => {
    console.log("Loaded, PI:", mod.PI);
});

// Module patterns:
// 1. ES Modules (modern): import/export
// 2. CommonJS (Node): require/module.exports
// 3. AMD (legacy): define/require
// 4. UMD: universal module

// Tree shaking: bundler hapus unused exports
// Bundlers: Webpack, Rollup, Vite, esbuild`,
    objectivesId: [
      'ES Modules: import dan export syntax',
      'Named exports vs default exports',
      'Dynamic import() untuk lazy loading',
      'Private class fields dengan #',
      'Module patterns: ES Modules vs CommonJS',
    ],
    objectivesEn: [
      'ES Modules: import and export syntax',
      'Named exports vs default exports',
      'Dynamic import() for lazy loading',
      'Private class fields with #',
      'Module patterns: ES Modules vs CommonJS',
    ],
    explanationId: '### ES Modules\n`export const x` named export. `export default class` default export. `import { x } from "mod"`.\n\n### Named vs Default\nNamed: multiple per module, harus pakai kurung kurawal. Default: satu per module, bebas nama.\n\n### Dynamic Import\n`await import("./module.js")` — load module saat dibutuhkan (lazy loading).\n\n### Private Fields\n`#field` — benar-benar private, tidak bisa diakses dari luar class.\n\n### Bundlers\nWebpack, Rollup, Vite — bundle modules untuk production. Tree shaking hapus unused code.',
    explanationEn: '### ES Modules\n`export const x` named export. `export default class` default export. `import { x } from "mod"`.\n\n### Named vs Default\nNamed: multiple per module, needs curly braces. Default: one per module, any name.\n\n### Dynamic Import\n`await import("./module.js")` — load module when needed (lazy loading).\n\n### Private Fields\n`#field` — truly private, not accessible outside class.\n\n### Bundlers\nWebpack, Rollup, Vite — bundle modules for production. Tree shaking removes unused code.',
    experimentsId: [
      'Buat module dengan multiple named exports',
      'Coba dynamic import dengan conditional',
      'Eksperimen private fields dan methods',
      'Buat barrel file (index.js) untuk re-export',
      'Coba circular dependency — apa yang terjadi?',
    ],
    experimentsEn: [
      'Create module with multiple named exports',
      'Try dynamic import with conditional',
      'Experiment private fields and methods',
      'Create barrel file (index.js) for re-export',
      'Try circular dependency — what happens?',
    ],
    challengeId: 'Buat module library: math, string, date utilities — dengan named exports, default export, dan dynamic import.',
    challengeEn: 'Create a module library: math, string, date utilities — with named exports, default export, and dynamic import.',
    summaryId: 'Minggu 9 dari 14: **Modules** (Level: Menengah). Organisasi kode. Minggu depan: **Error Handling**.',
    summaryEn: 'Week 9 of 14: **Modules** (Level: Intermediate). Code organization. Next week: **Error Handling**.',
  },
  {
    week: 10, level: 'intermediate', topicId: 'error-handling',
    titleId: 'Error Handling', titleEn: 'Error Handling',
    programId: 'Robust Error Handling', programEn: 'Robust Error Handling',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// Custom Error Classes
class ValidationError extends Error {
    constructor(field, message) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(status, message) {
        super(message);
        this.name = "NetworkError";
        this.status = status;
    }
}

// Try/Catch/Finally
function validateUser(data) {
    if (!data.email) throw new ValidationError("email", "Email wajib");
    if (!data.email.includes("@")) throw new ValidationError("email", "Email tidak valid");
    if (!data.nama) throw new ValidationError("nama", "Nama wajib");
    if (data.umur < 0 || data.umur > 150) throw new ValidationError("umur", "Umur tidak valid");
    return true;
}

// Demo
console.log("=== Error Handling ===");

const testCases = [
    { email: "", nama: "Budi", umur: 25 },
    { email: "invalid", nama: "Siti", umur: 30 },
    { email: "budi@mail.com", nama: "", umur: 25 },
    { email: "budi@mail.com", nama: "Budi", umur: -5 },
    { email: "budi@mail.com", nama: "Budi", umur: 25 }
];

testCases.forEach((data, i) => {
    try {
        validateUser(data);
        console.log(\`Test \${i+1}: ✓ Valid\`);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(\`Test \${i+1}: ✗ \${error.field} - \${error.message}\`);
        } else {
            console.log(\`Test \${i+1}: ✗ Unexpected: \${error.message}\`);
        }
    } finally {
        console.log(\`  (test \${i+1} completed)\`);
    }
});

// Async Error Handling
async function fetchUser(id) {
    if (id <= 0) throw new NetworkError(400, "Invalid ID");
    if (id > 100) throw new NetworkError(404, "User not found");
    return { id, name: "User " + id };
}

console.log("\\n=== Async Error Handling ===");
async function loadUsers() {
    const ids = [1, -5, 50, 200];
    const results = await Promise.allSettled(
        ids.map(id => fetchUser(id))
    );

    results.forEach((result, i) => {
        if (result.status === "fulfilled") {
            console.log(\`User \${ids[i]}: ✓ \`, result.value);
        } else {
            console.log(\`User \${ids[i]}: ✗ \`, result.reason.message);
        }
    });
}

loadUsers();

// Global Error Handler
// window.addEventListener("error", (e) => { ... });
// window.addEventListener("unhandledrejection", (e) => { ... });`,
    objectivesId: [
      'Custom error classes dengan extends Error',
      'try/catch/finally untuk handle error',
      'instanceof untuk cek tipe error',
      'Promise.allSettled untuk handle multiple async errors',
      'Global error handler: window.onerror, unhandledrejection',
    ],
    objectivesEn: [
      'Custom error classes with extends Error',
      'try/catch/finally for error handling',
      'instanceof to check error type',
      'Promise.allSettled for multiple async error handling',
      'Global error handlers: window.onerror, unhandledrejection',
    ],
    explanationId: '### Custom Error\n`class MyError extends Error` — tambah property custom seperti field, status.\n\n### Try/Catch/Finally\n`try` jalankan, `catch` handle error, `finally` selalu jalan.\n\n### instanceof\n`error instanceof ValidationError` — cek tipe error untuk handling berbeda.\n\n### Async Errors\n`Promise.allSettled` — tidak berhenti saat satu gagal, return semua hasil.\n\n### Global Handler\n`window.onerror` untuk sync errors, `unhandledrejection` untuk Promise.',
    explanationEn: '### Custom Errors\n`class MyError extends Error` — add custom properties like field, status.\n\n### Try/Catch/Finally\n`try` execute, `catch` handle error, `finally` always runs.\n\n### instanceof\n`error instanceof ValidationError` — check error type for different handling.\n\n### Async Errors\n`Promise.allSettled` — doesn\'t stop when one fails, returns all results.\n\n### Global Handlers\n`window.onerror` for sync errors, `unhandledrejection` for Promises.',
    experimentsId: [
      'Buat custom error untuk setiap field form',
      'Coba error wrapping: throw new Error("context", { cause: original })',
      'Eksperimen error boundary pattern',
      'Buat retry logic dengan exponential backoff',
      'Coba global error logging',
    ],
    experimentsEn: [
      'Create custom error for each form field',
      'Try error wrapping: throw new Error("context", { cause: original })',
      'Experiment error boundary pattern',
      'Create retry logic with exponential backoff',
      'Try global error logging',
    ],
    challengeId: 'Buat form validator: custom errors per field, async validation, error aggregation, dan user-friendly messages.',
    challengeEn: 'Build a form validator: custom errors per field, async validation, error aggregation, and user-friendly messages.',
    summaryId: 'Minggu 10 dari 14: **Error Handling** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Design Patterns** (Advanced).',
    summaryEn: 'Week 10 of 14: **Error Handling** (Level: Intermediate). Intermediate phase complete! Next week: **Design Patterns** (Advanced).',
  },
  // ── ADVANCED (weeks 11-14) ────────────────────────────────────────────────
  {
    week: 11, level: 'advanced', topicId: 'design-patterns',
    titleId: 'Design Patterns', titleEn: 'Design Patterns',
    programId: 'Pattern Implementation', programEn: 'Pattern Implementation',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'javascript',
    code: `// Singleton Pattern
class Database {
    static #instance = null;

    constructor() {
        if (Database.#instance) return Database.#instance;
        this.connection = "connected";
        Database.#instance = this;
    }

    query(sql) {
        return "Result of: " + sql;
    }
}

// Factory Pattern
class UserFactory {
    static create(type, data) {
        switch (type) {
            case "admin": return { ...data, role: "admin", permissions: ["all"] };
            case "editor": return { ...data, role: "editor", permissions: ["read", "write"] };
            case "viewer": return { ...data, role: "viewer", permissions: ["read"] };
            default: throw new Error("Unknown type: " + type);
        }
    }
}

// Observer Pattern
class Store {
    #state = {};
    #listeners = new Set();

    getState() { return { ...this.#state }; }

    setState(newState) {
        this.#state = { ...this.#state, ...newState };
        this.#listeners.forEach(fn => fn(this.#state));
    }

    subscribe(fn) {
        this.#listeners.add(fn);
        return () => this.#listeners.delete(fn);
    }
}

// Strategy Pattern
const strategies = {
    bubble: (arr) => { /* bubble sort */ return arr.slice().sort((a, b) => a - b); },
    quick: (arr) => { /* quick sort */ return arr.slice().sort((a, b) => a - b); },
    merge: (arr) => { /* merge sort */ return arr.slice().sort((a, b) => a - b); }
};

class Sorter {
    constructor(strategy = "bubble") {
        this.strategy = strategies[strategy];
    }
    sort(arr) { return this.strategy(arr); }
}

// Demo
console.log("=== Singleton ===");
const db1 = new Database();
const db2 = new Database();
console.log("Same instance:", db1 === db2);
console.log(db1.query("SELECT * FROM users"));

console.log("\\n=== Factory ===");
const admin = UserFactory.create("admin", { nama: "Budi" });
const viewer = UserFactory.create("viewer", { nama: "Siti" });
console.log(admin);
console.log(viewer);

console.log("\\n=== Observer ===");
const store = new Store();
store.subscribe(state => console.log("Listener 1:", state));
store.subscribe(state => console.log("Listener 2:", state.count || "no count"));
store.setState({ user: "Budi" });
store.setState({ count: 5 });

console.log("\\n=== Strategy ===");
const sorter = new Sorter("quick");
console.log("Sorted:", sorter.sort([3, 1, 4, 1, 5, 9, 2, 6]));`,
    objectivesId: [
      'Singleton: satu instance global',
      'Factory: buat object tanpa expose logic',
      'Observer: subscribe/notify pattern',
      'Strategy: interchangeable algorithms',
      'Module pattern dengan IIFE dan closure',
    ],
    objectivesEn: [
      'Singleton: single global instance',
      'Factory: create objects without exposing logic',
      'Observer: subscribe/notify pattern',
      'Strategy: interchangeable algorithms',
      'Module pattern with IIFE and closures',
    ],
    explanationId: '### Singleton\nSatu instance untuk seluruh app. Database connection, config manager.\n\n### Factory\nBuat object berdasarkan type. Tidak perlu tahu class spesifik.\n\n### Observer\nSubscribe ke perubahan state. Notifikasi otomatis saat state berubah.\n\n### Strategy\nBisa ganti algorithm runtime. Sort strategy, payment strategy.\n\n### Module Pattern\nIIFE + closure untuk encapsulation. Private variables, public API.',
    explanationEn: '### Singleton\nSingle instance for entire app. Database connection, config manager.\n\n### Factory\nCreate objects based on type. Don\'t need to know specific class.\n\n### Observer\nSubscribe to state changes. Auto-notification when state changes.\n\n### Strategy\nSwap algorithms at runtime. Sort strategy, payment strategy.\n\n### Module Pattern\nIIFE + closure for encapsulation. Private variables, public API.',
    experimentsId: [
      'Buat singleton logger dengan levels',
      'Coba abstract factory untuk UI components',
      'Eksperimen mediator pattern',
      'Buat decorator pattern dengan higher-order function',
      'Implementasikan command pattern',
    ],
    experimentsEn: [
      'Create singleton logger with levels',
      'Try abstract factory for UI components',
      'Experiment mediator pattern',
      'Create decorator pattern with higher-order function',
      'Implement command pattern',
    ],
    challengeId: 'Buat state management library: singleton store, observer pattern, actions/reducers, middleware support.',
    challengeEn: 'Build a state management library: singleton store, observer pattern, actions/reducers, middleware support.',
    summaryId: 'Minggu 11 dari 14: **Design Patterns** (Level: Lanjutan). Solusi teruji. Minggu depan: **Testing**.',
    summaryEn: 'Week 11 of 14: **Design Patterns** (Level: Advanced). Proven solutions. Next week: **Testing**.',
  },
  {
    week: 12, level: 'advanced', topicId: 'testing',
    titleId: 'Testing JavaScript', titleEn: 'Testing JavaScript',
    programId: 'Unit & Integration Test', programEn: 'Unit & Integration Tests',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'javascript',
    code: `// Simple Test Framework (simulasi)
class TestRunner {
    #tests = [];
    #passed = 0;
    #failed = 0;

    test(name, fn) {
        this.#tests.push({ name, fn });
    }

    async run() {
        console.log("=== Running Tests ===");
        for (const { name, fn } of this.#tests) {
            try {
                await fn();
                this.#passed++;
                console.log("  ✓", name);
            } catch (err) {
                this.#failed++;
                console.log("  ✗", name);
                console.log("   ", err.message);
            }
        }
        console.log(\`\\nResults: \${this.#passed} passed, \${this.#failed} failed\`);
    }
}

// Assertions
function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(\`Expected \${expected}, got \${actual}\`);
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(\`Expected \${JSON.stringify(expected)}, got \${JSON.stringify(actual)}\`);
            }
        },
        toBeGreaterThan(n) {
            if (actual <= n) {
                throw new Error(\`\${actual} is not greater than \${n}\`);
            }
        },
        toContain(item) {
            if (!actual.includes(item)) {
                throw new Error(\`"\${actual}" does not contain "\${item}"\`);
            }
        },
        toThrow(fn) {
            try { fn(); }
            catch { return; }
            throw new Error("Expected function to throw");
        }
    };
}

// Test subject
function add(a, b) { return a + b; }
function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}
function isPalindrome(str) {
    return str === str.split("").reverse().join("");
}

// Run tests
const runner = new TestRunner();

runner.test("add: 2 + 3 = 5", () => {
    expect(add(2, 3)).toBe(5);
});

runner.test("add: -1 + 1 = 0", () => {
    expect(add(-1, 1)).toBe(0);
});

runner.test("divide: 10 / 2 = 5", () => {
    expect(divide(10, 2)).toBe(5);
});

runner.test("divide: throws on zero", () => {
    expect(() => divide(5, 0)).toThrow();
});

runner.test("isPalindrome: racecar", () => {
    expect(isPalindrome("racecar")).toBe(true);
});

runner.test("isPalindrome: hello", () => {
    expect(isPalindrome("hello")).toBe(false);
});

runner.run();

// Real testing frameworks:
// Jest: test(), expect(), describe()
// Vitest: compatible dengan Jest, faster
// Mocha + Chai: flexible
// Testing Library: DOM testing`,
    objectivesId: [
      'Unit test: test fungsi individual',
      'Assertions: toBe, toEqual, toBeGreaterThan, toContain',
      'Test runner: jalankan semua test, report hasil',
      'Setup dan teardown: beforeEach, afterEach',
      'Testing frameworks: Jest, Vitest, Mocha',
    ],
    objectivesEn: [
      'Unit tests: test individual functions',
      'Assertions: toBe, toEqual, toBeGreaterThan, toContain',
      'Test runners: run all tests, report results',
      'Setup and teardown: beforeEach, afterEach',
      'Testing frameworks: Jest, Vitest, Mocha',
    ],
    explanationId: '### Unit Test\nTest fungsi terisolasi. Input → Output. Tidak ada side effects.\n\n### Assertions\n`toBe` (===), `toEqual` (deep equal), `toContain`, `toThrow`.\n\n### Test Runner\nKumpulkan tests, jalankan, report passed/failed.\n\n### Setup/Teardown\n`beforeEach` sebelum setiap test, `afterEach` setelah. Untuk clean state.\n\n### Frameworks\nJest: batteries included. Vitest: fast, Vite-native. Mocha: flexible + Chai.',
    explanationEn: '### Unit Tests\nTest isolated functions. Input → Output. No side effects.\n\n### Assertions\n`toBe` (===), `toEqual` (deep equal), `toContain`, `toThrow`.\n\n### Test Runners\nCollect tests, run them, report passed/failed.\n\n### Setup/Teardown\n`beforeEach` before each test, `afterEach` after. For clean state.\n\n### Frameworks\nJest: batteries included. Vitest: fast, Vite-native. Mocha: flexible + Chai.',
    experimentsId: [
      'Buat test untuk async function',
      'Coba mock function untuk isolate dependencies',
      'Eksperimen parameterized tests',
      'Buat test untuk error cases',
      'Coba snapshot testing',
    ],
    experimentsEn: [
      'Create test for async function',
      'Try mock function to isolate dependencies',
      'Experiment parameterized tests',
      'Create test for error cases',
      'Try snapshot testing',
    ],
    challengeId: 'Buat test suite untuk utility library: 20+ tests covering normal, edge, dan error cases.',
    challengeEn: 'Build a test suite for a utility library: 20+ tests covering normal, edge, and error cases.',
    summaryId: 'Minggu 12 dari 14: **Testing JavaScript** (Level: Lanjutan). Kualitas kode. Minggu depan: **Performance Optimization**.',
    summaryEn: 'Week 12 of 14: **Testing JavaScript** (Level: Advanced). Code quality. Next week: **Performance Optimization**.',
  },
  {
    week: 13, level: 'advanced', topicId: 'performance',
    titleId: 'Performance Optimization', titleEn: 'Performance Optimization',
    programId: 'Optimasi Performa', programEn: 'Performance Optimization',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'javascript',
    code: `// Debounce
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Throttle
function throttle(fn, limit) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Memoization
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("  Cache hit for", key);
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Lazy Loading Pattern
class LazyImage {
    constructor(src) {
        this.src = src;
        this.loaded = false;
    }

    load() {
        if (this.loaded) return;
        console.log("Loading:", this.src);
        this.loaded = true;
    }
}

// Demo
console.log("=== Debounce ===");
const debouncedSearch = debounce((q) => console.log("Search:", q), 300);
debouncedSearch("a");
debouncedSearch("ap");
debouncedSearch("app");
debouncedSearch("appl");
// Hanya "appl" yang akan dijalankan setelah 300ms

console.log("\\n=== Throttle ===");
const throttledScroll = throttle(() => console.log("Scroll event"), 1000);
throttledScroll(); // jalan
throttledScroll(); // skip
throttledScroll(); // skip

console.log("\\n=== Memoization ===");
const expensiveCalc = memoize((n) => {
    console.log("  Computing fib(" + n + ")");
    if (n <= 1) return n;
    return expensiveCalc(n - 1) + expensiveCalc(n - 2);
});
console.log("Result:", expensiveCalc(10));
console.log("Result (cached):", expensiveCalc(10));

console.log("\\n=== Performance Tips ===");
console.log("1. Debounce/throttle untuk events yang sering");
console.log("2. Memoization untuk fungsi mahal");
console.log("3. Lazy loading untuk resources besar");
console.log("4. Virtual DOM untuk update efisien");
console.log("5. Web Workers untuk heavy computation");
console.log("6. requestAnimationFrame untuk animasi");
console.log("7. Avoid memory leaks (cleanup listeners)");`,
    objectivesId: [
      'Debounce: delay execution sampai user berhenti',
      'Throttle: limit execution rate',
      'Memoization: cache hasil fungsi mahal',
      'Lazy loading: load resources saat dibutuhkan',
      'Web Workers: heavy computation di thread terpisah',
    ],
    objectivesEn: [
      'Debounce: delay execution until user stops',
      'Throttle: limit execution rate',
      'Memoization: cache expensive function results',
      'Lazy loading: load resources when needed',
      'Web Workers: heavy computation in separate thread',
    ],
    explanationId: '### Debounce\nTunggu user berhenti mengetik sebelum search. Delay 300ms.\n\n### Throttle\nLimit execution per waktu. Scroll handler max 1x per detik.\n\n### Memoization\nCache hasil berdasarkan argumen. Fibonacci O(n) dari O(2^n).\n\n### Lazy Loading\nLoad image/component hanya saat terlihat di viewport.\n\n### Web Workers\nJalankan heavy task di background thread. Tidak block UI.\n\n### RAF\n`requestAnimationFrame` untuk animasi smooth 60fps.',
    explanationEn: '### Debounce\nWait for user to stop typing before searching. 300ms delay.\n\n### Throttle\nLimit execution per time. Scroll handler max 1x per second.\n\n### Memoization\nCache results by arguments. Fibonacci O(n) from O(2^n).\n\n### Lazy Loading\nLoad image/component only when visible in viewport.\n\n### Web Workers\nRun heavy tasks in background thread. Doesn\'t block UI.\n\n### RAF\n`requestAnimationFrame` for smooth 60fps animations.',
    experimentsId: [
      'Buat debounce dengan immediate option',
      'Coba throttle dengan trailing call',
      'Eksperimen memoization dengan cache size limit',
      'Buat lazy loading untuk list panjang',
      'Coba requestIdleCallback untuk low-priority work',
    ],
    experimentsEn: [
      'Create debounce with immediate option',
      'Try throttle with trailing call',
      'Experiment memoization with cache size limit',
      'Create lazy loading for long list',
      'Try requestIdleCallback for low-priority work',
    ],
    challengeId: 'Buat search component: debounced input, memoized results, lazy loaded list, dengan performance metrics.',
    challengeEn: 'Build a search component: debounced input, memoized results, lazy loaded list, with performance metrics.',
    summaryId: 'Minggu 13 dari 14: **Performance Optimization** (Level: Lanjutan). Kecepatan & efisiensi. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 13 of 14: **Performance Optimization** (Level: Advanced). Speed & efficiency. Next week: **Capstone Project**!',
  },
  {
    week: 14, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: Task Manager App', titleEn: 'Capstone: Task Manager App',
    programId: 'Task Manager Lengkap', programEn: 'Complete Task Manager',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'javascript',
    code: `// Capstone: Task Manager Application
// Menggabungkan semua konsep: OOP, async, modules, patterns, testing

// === Store Module (Observer Pattern) ===
class TaskStore {
    #tasks = [];
    #listeners = new Set();
    #nextId = 1;

    subscribe(fn) {
        this.#listeners.add(fn);
        return () => this.#listeners.delete(fn);
    }

    #notify() {
        this.#listeners.forEach(fn => fn(this.getAll()));
    }

    add(task) {
        const newTask = {
            id: this.#nextId++,
            title: task.title,
            description: task.description || "",
            priority: task.priority || "medium",
            done: false,
            createdAt: new Date().toISOString()
        };
        this.#tasks.push(newTask);
        this.#notify();
        return newTask;
    }

    toggle(id) {
        const task = this.#tasks.find(t => t.id === id);
        if (task) {
            task.done = !task.done;
            this.#notify();
        }
        return task;
    }

    remove(id) {
        this.#tasks = this.#tasks.filter(t => t.id !== id);
        this.#notify();
    }

    getAll() { return [...this.#tasks]; }
    getCompleted() { return this.#tasks.filter(t => t.done); }
    getPending() { return this.#tasks.filter(t => !t.done); }

    getStats() {
        return {
            total: this.#tasks.length,
            completed: this.getCompleted().length,
            pending: this.getPending().length
        };
    }
}

// === Demo ===
const store = new TaskStore();

// Subscribe to changes
store.subscribe(tasks => {
    console.log("Tasks updated:", tasks.length, "items");
});

// Add tasks
console.log("=== Adding Tasks ===");
store.add({ title: "Belajar JavaScript", priority: "high" });
store.add({ title: "Buat Task Manager", priority: "high" });
store.add({ title: "Push ke GitHub", priority: "medium" });
store.add({ title: "Tulis dokumentasi", priority: "low" });

// Toggle completion
console.log("\\n=== Toggle Task #1 ===");
store.toggle(1);

// Show stats
console.log("\\n=== Stats ===");
const stats = store.getStats();
console.log("Total:", stats.total);
console.log("Completed:", stats.completed);
console.log("Pending:", stats.pending);

// Show pending tasks
console.log("\\n=== Pending Tasks ===");
store.getPending().forEach(t => {
    console.log(\`  [\${t.priority}] \${t.title}\`);
});

// Remove task
console.log("\\n=== Remove Task #3 ===");
store.remove(3);
console.log("Remaining:", store.getAll().length);

// === Architecture Summary ===
console.log("\\n=== Architecture ===");
console.log("1. Observer Pattern: store.subscribe()");
console.log("2. Private Fields: #tasks, #listeners");
console.log("3. Immutable Returns: [...this.#tasks]");
console.log("4. Method Chaining: store.add().toggle()");
console.log("5. Separation of Concerns: Store vs UI");
console.log("6. Error Handling: validation, fallbacks");
console.log("7. Performance: efficient updates, minimal re-renders");`,
    objectivesId: [
      'Menggabungkan semua konsep: OOP, async, modules, patterns',
      'Observer pattern untuk state management',
      'Private fields untuk encapsulation',
      'Immutable data flow',
      'Separation of concerns: data vs presentation',
    ],
    objectivesEn: [
      'Combine all concepts: OOP, async, modules, patterns',
      'Observer pattern for state management',
      'Private fields for encapsulation',
      'Immutable data flow',
      'Separation of concerns: data vs presentation',
    ],
    explanationId: '### Proyek Capstone\nTask Manager yang menggabungkan semua 13 minggu pembelajaran.\n\n### Arsitektur\n- Observer Pattern: reactive state\n- Private Fields: encapsulation\n- Immutable: predictable state\n- Modular: separation of concerns\n\n### Fitur\n- CRUD tasks\n- Toggle completion\n- Filter by status\n- Statistics\n- Priority levels\n\n### Best Practices\n- Clean code\n- Error handling\n- Performance optimization\n- Testable architecture',
    explanationEn: '### Capstone Project\nTask Manager combining all 13 weeks of learning.\n\n### Architecture\n- Observer Pattern: reactive state\n- Private Fields: encapsulation\n- Immutable: predictable state\n- Modular: separation of concerns\n\n### Features\n- CRUD tasks\n- Toggle completion\n- Filter by status\n- Statistics\n- Priority levels\n\n### Best Practices\n- Clean code\n- Error handling\n- Performance optimization\n- Testable architecture',
    experimentsId: [
      'Tambah filter by priority',
      'Buat undo/redo dengan command pattern',
      'Tambah localStorage persistence',
      'Buat sorting by date/priority',
      'Tambah due date dan reminder',
    ],
    experimentsEn: [
      'Add filter by priority',
      'Create undo/redo with command pattern',
      'Add localStorage persistence',
      'Create sorting by date/priority',
      'Add due date and reminders',
    ],
    challengeId: 'Buat Task Manager lengkap: CRUD, filter, sort, priority, persistence, testing — production-ready.',
    challengeEn: 'Build a complete Task Manager: CRUD, filter, sort, priority, persistence, testing — production-ready.',
    summaryId: 'Minggu 14 dari 14: **Capstone: Task Manager App** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai JavaScript dari nol hingga production-ready.',
    summaryEn: 'Week 14 of 14: **Capstone: Task Manager App** (Level: Advanced). Complete! 🎉 You\'ve mastered JavaScript from scratch to production-ready.',
  },
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
