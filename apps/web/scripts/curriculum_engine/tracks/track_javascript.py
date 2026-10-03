# JavaScript Track: 12 Weeks (3 Levels)
# Final Product: Interactive Kanban Task Management Board with Drag & Drop, LocalStorage, and REST API Sync

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Dasar Logika & Struktur Data',
        'nameEn': 'Logic Fundamentals & Data Structures',
        'descId': 'Pondasi logika komputasi: variabel, tipe data, coercion, control flow, fungsi kelas satu, dan transformasi array modern.',
        'descEn': 'Computational logic foundations: variables, types, coercion, control flow, first-class functions, and modern array pipelines.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'DOM, Event & Arsitektur Objek',
        'nameEn': 'DOM, Events & Object Architecture',
        'descId': 'Manipulasi dokumen browser langsung, event bubbling/delegation, destrukturisasi objek, dan OOP dengan kelas ES6.',
        'descEn': 'Direct browser document mutation, event bubbling/delegation, object destructuring, and ES6 class-based OOP.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Asinkron, Storage & Proyek Kanban',
        'nameEn': 'Asynchronous, Storage & Kanban Project',
        'descId': 'Event loop V8, Promises, async/await, Fetch API, penyimpanan lokal persistent, dan capstone Kanban board interaktif.',
        'descEn': 'V8 event loop, Promises, async/await, Fetch API, persistent local storage, and the interactive Kanban board capstone.',
    },
]

MODULES = [
    # Level 1: Dasar Logika & Struktur Data (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'variabel-tipe-data-dan-operator',
        'titleId': 'Variabel Modern (const/let), 7 Tipe Primitif & Type Coercion',
        'titleEn': 'Modern Variables (const/let), 7 Primitive Types & Coercion',
        'programId': 'Kalkulator Kasir & Verifikasi Tipe Data Primitif',
        'programEn': 'Cashier Register & Primitive Type Verifier',
        'levelNameId': 'Dasar Logika & Struktur Data',
        'levelNameEn': 'Logic Fundamentals & Data Structures',
        'language': 'javascript',
        'code': """// 1. Deklarasi Modern: const (default) vs let (re-assignable)
const namaToko = "Nusa Tech Store";
let kuotaStok = 45;
kuotaStok = kuotaStok - 5; // Valid dengan let

// 2. Tujuh Tipe Data Primitif JavaScript
const hargaProduk = 1250000;              // number
const pajakPersen = 0.11;                 // number (float)
const namaBarang = 'Monitor 24" 100Hz';   // string
const sedangPromo = true;                 // boolean
let diskonKhusus = null;                  // null (sengaja kosong)
let catatanKasir;                         // undefined (belum diisi)
const idUnik = Symbol("id-transaksi");     // symbol (pasti unik)
const tokenBig = 9007199254740991n + 5n;  // bigint (angka raksasa)

// 3. Kalkulasi dan Pengecekan Tipe Data
const nominalPajak = hargaProduk * pajakPersen;
const totalAkhir = hargaProduk + nominalPajak;

console.log("=== Struk Transaksi " + namaToko + " ===");
console.log("Barang      : " + namaBarang);
console.log("Harga Dasar : Rp " + hargaProduk.toLocaleString("id-ID"));
console.log("Pajak (11%) : Rp " + nominalPajak.toLocaleString("id-ID"));
console.log("Total Bayar : Rp " + totalAkhir.toLocaleString("id-ID"));

// 4. Bahaya Type Coercion (Konversi Implisit) & Solusi Strict Equality (===)
console.log("\\n=== Evaluasi Tipe & Strict Equality ===");
console.log("type of hargaProduk :", typeof hargaProduk); // "number"
console.log("type of namaBarang  :", typeof namaBarang);  // "string"
console.log("type of diskonKhusus:", typeof diskonKhusus); // "object" (kebiasaan historis JS)

const angka = 42;
const teks = "42";
console.log("angka == teks  (Loose equality):", angka == teks);   // true (koersi otomatis berbahaya)
console.log("angka === teks (Strict equality):", angka === teks); // false (tipe beda ditolak!)
""",
        'objectivesId': [
            'Memahami alasan pelarangan var dan selalu menggunakan const secara default serta let jika nilai berubah',
            'Menguasai 7 tipe data primitif JavaScript: string, number, bigint, boolean, undefined, symbol, dan null',
            'Memahami fenomena Type Coercion dan mengapa loose equality (==) berbahaya bagi logika bisnis',
            'Selalu menggunakan operator kesetaraan ketat (=== dan !==) dalam setiap percabangan logika',
            'Menggunakan typeof untuk memeriksa tipe data variabel secara runtime',
        ],
        'objectivesEn': [
            'Deprecate legacy var in favor of const by default and let only when mutation is mandatory',
            'Master the seven primitive JavaScript types: string, number, bigint, boolean, undefined, symbol, and null',
            'Understand implicit Type Coercion pitfalls and why loose equality (==) introduces production vulnerabilities',
            'Enforce strict equality operators (=== and !==) across all computational decision branches',
            'Inspect runtime data types deterministically using the typeof operator',
        ],
        'explanationId': """### Kematian var: const vs let
Di JavaScript modern (ES6+), keyword \`var\` sudah ditinggalkan karena memiliki cakupan fungsi (*function-scoped*) yang rentan bocor dan mengizinkan deklarasi ulang variabel yang sama tanpa peringatan.
- **\`const\`**: Gunakan untuk 90% variabel Anda. Nilainya tidak dapat di-reassign, melindungi integritas memori.
- **\`let\`**: Gunakan hanya jika nilai variabel memang akan diubah ulang di alur berikutnya (misal: pencacah loop atau total akumulasi).

### 7 Tipe Primitif di Memori
Tipe data primitif disimpan langsung di stack memori secara *immutable* (nilainya tidak bisa diubah di tempat):
1. \`number\`: Merepresentasikan bilangan bulat dan desimal berbasis IEEE 754 64-bit float.
2. \`string\`: Rangkaian karakter teks.
3. \`boolean\`: Nilai logika \`true\` atau \`false\`.
4. \`undefined\`: Variabel telah dideklarasikan tetapi belum pernah diberi nilai.
5. \`null\`: Nilai kosong yang sengaja diberikan untuk menandakan "tidak ada objek".
6. \`bigint\`: Menangani bilangan bulat di atas batas aman \`Number.MAX_SAFE_INTEGER\` ($2^{53} - 1$).
7. \`symbol\`: Pengenal unik yang dijamin tidak akan pernah bentrok.

### Mengapa Selalu Pakai === ?
Operator \`==\` (*loose equality*) melakukan konversi tipe data otomatis secara diam-diam di belakang layar. Contohnya: \`"" == 0\` bernilai \`true\`, dan \`false == "0"\` bernilai \`true\`! Ini adalah celah bug terbesar dalam JavaScript pemula. Operator \`===\` (*strict equality*) memeriksa tipe data DAN nilainya sekaligus tanpa toleransi.""",
        'explanationEn': """### The Deprecation of var: const vs let
In modern ECMAScript, \`var\` is abandoned due to function-scoping leaks and silent re-declaration hazards.
- **\`const\`**: Default choice for 90% of bindings. Prevents accidental reassignment and locks reference identities.
- **\`let\`**: Reserved exclusively for bindings requiring reassignment (loop counters, accumulators).

### The Seven Primitive Memory Types
Primitives are stored directly on the execution stack as immutable values:
1. \`number\`: Double-precision 64-bit binary format IEEE 754 floats.
2. \`string\`: UTF-16 code unit text sequences.
3. \`boolean\`: Binary logical truth values: \`true\` or \`false\`.
4. \`undefined\`: State of a declared binding that has not yet been assigned a value.
5. \`null\`: Intentional representation of non-existence or absent object reference.
6. \`bigint\`: Arbitrary-precision integers exceeding \`Number.MAX_SAFE_INTEGER\` ($2^{53} - 1$).
7. \`symbol\`: Guaranteed globally unique primitive object keys.

### Strict Equality (===) vs Loose Coercion (==)
Loose equality (\`==\`) triggers implicit type coercion algorithms under the hood (e.g. \`"" == 0\` evaluates to \`true\`, and \`false == "0"\` evaluates to \`true\`). Strict equality (\`===\`) compares both type identity and value without coercion, eliminating catastrophic logical edge cases.""",
        'beginnerId': """### Analogi: Kotak Brankas dan Label Wadah
1. **`const`** seperti kotak brankas kaca bersegel: Anda memasukkan emas ke dalamnya dan menguncinya permanen. Anda bisa melihat isinya, tapi tidak bisa mengganti emas tersebut dengan benda lain.
2. **`let`** seperti toples kue di dapur: hari ini bisa diisi biskuit cokelat, besok kuenya habis bisa diisi ulang kacang mede.
3. **`undefined` vs `null`**: \`undefined\` adalah toples kosong yang baru Anda beli dari toko dan belum pernah Anda sentuh; \`null\` adalah toples yang sengaja Anda buka dan bersihkan untuk menandakan: "Toples ini sengaja saya kosongkan untuk pesanan besok".
4. **`===`** seperti petugas keamanan bank yang memeriksa KTP asli DAN mencocokkan wajah orangnya langsung, bukan sekadar melihat foto fotokopian buram (\`==\`).""",
        'beginnerEn': """### Analogy: Sealed Glass Vaults and Pantry Jars
1. **`const`** is a sealed tempered-glass vault: you place your gold watch inside and lock it. You can inspect it, but you cannot swap the watch for a book.
2. **`let`** is a pantry snack jar: today it holds almonds; tomorrow when emptied, you refill it with pretzels.
3. **`undefined` vs `null`**: \`undefined\` is an unopened box arriving from the warehouse with unknown contents; \`null\` is an intentional placard inside the box reading: "This box is deliberately vacant".
4. **`===`** is a biometric passport scanner validating both digital RFID credentials AND facial biometric scans, refusing to accept an unverified photocopy (\`==\`).""",
        'experimentsId': [
            'Coba ubah nilai variabel const namaToko di baris bawahnya dan amati pesan error TypeError: Assignment to constant variable.',
            'Uji operasi "5" - 2 dan "5" + 2 di konsol, amati bagaimana tanda minus memicu matematika (hasil 3) sedangkan tanda plus memicu penggabungan teks (hasil "52").',
            'Periksa typeof NaN (Not a Number) di konsol dan temukan fakta unik bahwa tipenya adalah "number".',
            'Bandingkan null == undefined (true) dengan null === undefined (false) untuk membuktikan perbedaan operator kesetaraan.',
        ],
        'experimentsEn': [
            'Attempt to reassign the const namaToko binding and observe the runtime TypeError: Assignment to constant variable.',
            'Evaluate "5" - 2 versus "5" + 2 in your console; observe how minus coerces to numeric subtraction (3) while plus concatenates string tokens ("52").',
            'Check typeof NaN in DevTools console and discover that its formal type classification is "number".',
            'Compare null == undefined (true) against null === undefined (false) to evaluate strict equality parsing.',
        ],
        'challengeId': 'Buat kalkulator konversi mata uang: tetapkan `const kursUsd = 16250`. Buat variabel saldo rupiah, hitung nilai konversi ke USD, gunakan `Math.floor()` untuk membulatkan, dan cetak perbandingan tipe data menggunakan operator `===`.',
        'challengeEn': 'Build a currency exchange calculator: declare `const kursUsd = 16250`. Declare an IDR balance, calculate the USD conversion, round with `Math.floor()`, and log strict type assertions using the `===` operator.',
        'summaryId': 'Kamu telah menguasai variabel modern const/let, 7 tipe data primitif, dan pencegahan bug type coercion. Minggu depan kita akan mendalami struktur kontrol alur percabangan dan perulangan modern.',
        'summaryEn': 'You have mastered modern const/let bindings, the 7 primitive types, and eradicated implicit coercion bugs. Next week, we examine control flow branches and modern loop structures.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'kontrol-alur-dan-perulangan',
        'titleId': 'Kontrol Alur: Percabangan Logika, Ternary & Perulangan for...of',
        'titleEn': 'Control Flow: Logic Branching, Ternary & for...of Loops',
        'programId': 'Sistem Filter Transaksi & Verifikasi Hak Akses',
        'programEn': 'Transaction Filtering System & Role-Based Access Verifier',
        'levelNameId': 'Dasar Logika & Struktur Data',
        'levelNameEn': 'Logic Fundamentals & Data Structures',
        'language': 'javascript',
        'code': """// 1. Array Data Transaksi Sederhana
const transaksi = [
  { id: "TRX-01", nominal: 450000, status: "SUCCESS" },
  { id: "TRX-02", nominal: 1200000, status: "PENDING" },
  { id: "TRX-03", nominal: 850000, status: "SUCCESS" },
  { id: "TRX-04", nominal: 2500000, status: "FAILED" },
  { id: "TRX-05", nominal: 300000, status: "SUCCESS" }
];

console.log("=== Laporan Audit Transaksi ===");

let totalPendapatan = 0;
let jumlahSukses = 0;

// 2. Perulangan Modern for...of (Bersih & Mudah Dibaca)
for (const item of transaksi) {
  // 3. Percabangan dengan Operator Logika Bersarang
  if (item.status === "SUCCESS") {
    totalPendapatan += item.nominal;
    jumlahSukses++;
    console.log("[LUNAS]  " + item.id + " : Rp " + item.nominal.toLocaleString("id-ID"));
  } else if (item.status === "PENDING") {
    console.log("[MENUNGGU] " + item.id + " : Menunggu konfirmasi gateway");
  } else {
    console.log("[GAGAL]  " + item.id + " : Transaksi ditolak bank");
  }
}

// 4. Operator Ternary Modern untuk Keputusan Cepat
const statusSistem = jumlahSukses >= 3 ? "Kondisi Sehat" : "Peringatan Anomali";
console.log("\\nStatus Operasional Gateway:", statusSistem);
console.log("Total Kas Masuk           : Rp " + totalPendapatan.toLocaleString("id-ID"));

// 5. Evaluasi Hak Akses dengan Switch Case
const peranPengguna = "ADMIN";

switch (peranPengguna) {
  case "SUPERADMIN":
  case "ADMIN":
    console.log("Otorisasi: Akses penuh untuk merevisi dan menghapus transaksi.");
    break;
  case "AUDITOR":
    console.log("Otorisasi: Hak akses baca (read-only) untuk laporan keuangan.");
    break;
  default:
    console.log("Otorisasi: Akses ditolak. Silakan hubungi tim IT Security.");
    break;
}
""",
        'objectivesId': [
            'Menguasai percabangan if, else if, dan else dengan operator logika Boolean (&&, ||, !)',
            'Menggunakan Operator Ternary (? :) secara bersih untuk penugasan nilai ringkas tanpa if bertumpuk',
            'Menulis perulangan modern for...of untuk menjelajah elemen array secara elegan',
            'Memahami evaluasi switch-case dengan penanganan multi-kondisi dan klausul default wajib',
            'Memahami konsep Truthy dan Falsy values dalam evaluasi kondisi JavaScript',
        ],
        'objectivesEn': [
            'Master if, else if, and else branching governed by Boolean logic operators (&&, ||, !)',
            'Deploy the ternary operator (? :) cleanly for concise conditional variable bindings',
            'Author modern for...of loops to iterate across iterable arrays with clean readability',
            'Structure switch-case statements with grouped conditions and mandatory default fallbacks',
            'Deconstruct Truthy and Falsy evaluations in JavaScript conditional contexts',
        ],
        'explanationId': """### Falsy Values di JavaScript
Dalam percabangan \`if (kondisi)\`, JavaScript mengevaluasi nilai menjadi Boolean. Ada tepat **8 nilai yang selalu Falsy** (dianggap salah):
1. \`false\`
2. \`0\` dan \`-0\`
3. \`0n\` (BigInt nol)
4. \`""\` (string kosong)
5. \`null\`
6. \`undefined\`
7. \`NaN\` (Not-a-Number)
8. \`document.all\` (historis)
Semua nilai selain 8 nilai di atas (termasuk array kosong \`[]\` dan objek kosong \`{}\`) dianggap **Truthy**!

### Operator Ternary: Ringkas & Bersih
Alih-alih menulis 5 baris:
\`\`\`javascript
let pesan;
if (umur >= 17) { pesan = "Dewasa"; } else { pesan = "Anak-anak"; }
\`\`\`
Gunakan ternary dalam 1 baris ekspresi:
\`\`\`javascript
const pesan = umur >= 17 ? "Dewasa" : "Anak-anak";
\`\`\`

### Mengapa for...of Menggantikan for Tradisional?
Perulangan \`for (let i = 0; i < arr.length; i++)\` rawan kesalahan perhitungan indeks (*off-by-one error*). Sintaks \`for (const item of koleksi)\` langsung mengekstrak objek item tanpa perlu mengelola variabel pencacah indeks manual.""",
        'explanationEn': """### The Eight Falsy Primitives
When parsing \`if (condition)\`, JavaScript coerces expressions into booleans. Exactly **eight values evaluate as Falsy**:
1. \`false\`
2. \`0\` and \`-0\`
3. \`0n\` (BigInt zero)
4. \`""\` (empty string)
5. \`null\`
6. \`undefined\`
7. \`NaN\`
8. \`document.all\`
Every other value in existence—including empty arrays \`[]\` and empty objects \`{}\`—evaluates as **Truthy**!

### Ternary Expressions: Concise & Functional
Rather than imperatively assigning variables via mutable let statements:
\`\`\`javascript
const status = score >= 75 ? "Passed" : "Retake";
\`\`\`
Ternaries are expressions that return values, enabling direct \`const\` assignments.

### Why for...of Trumps Legacy Index Loops
Legacy \`for (let i = 0; i < arr.length; i++)\` loops invite off-by-one index arithmetic bugs. The modern \`for (const item of collection)\` syntax delivers immediate element binding with optimal cognitive clarity.""",
        'beginnerId': """### Analogi: Gerbang Tol Otomatis
1. **`if/else`** seperti gardu pintu tol: palang tol membaca kartu e-toll Anda. JIKA saldo cukup, palang terbuka hijau. JIKA TIDAK, alarm merah menyala dan mobil harus menepi.
2. **`for...of`** seperti deretan mobil yang antre masuk tol: setiap mobil dipanggil bergiliran satu demi satu dari depan sampai mobil paling belakang selesai dilayani.
3. **Operator Ternary** seperti lampu indikator sederhana di dashboard: mesin menyala hijau atau mati merah, hanya dua kemungkinan instan.""",
        'beginnerEn': """### Analogy: Automated Highway Toll Gates
1. **`if/else`** is an automated toll barrier: the RFID scanner reads your vehicle transponder. IF balance suffices, the gate lifts green. ELSE, an alert chime sounds and you divert to customer service.
2. **`for...of`** is the queue of cars passing the gate: each vehicle is processed sequentially one after another until the line clears.
3. **The Ternary Operator** is a single dashboard warning bulb: either the parking brake is engaged or disengaged.""",
        'experimentsId': [
            'Uji Truthy/Falsy: ganti kondisi if dengan if ([]) dan perhatikan bahwa array kosong dievaluasi sebagai true.',
            'Lupa menulis kata kunci break pada salah satu case di switch, dan amati fenomena fall-through di mana case di bawahnya ikut dieksekusi tanpa sengaja.',
            'Ganti for...of dengan perulangan for klasik menggunakan indeks i, lalu bandingkan kemudahan pembacaan kodenya.',
            'Ubah status semua transaksi menjadi FAILED dan amati bagaimana operator ternary mengubah status operasional menjadi "Peringatan Anomali".',
        ],
        'experimentsEn': [
            'Test truthiness: run if ([]) and confirm that empty arrays evaluate as true.',
            'Intentionally omit a break keyword inside the switch block to witness accidental fall-through execution into adjacent cases.',
            'Rewrite the for...of block as a legacy index-based for loop and compare code readability.',
            'Flip all transaction states to FAILED to verify that the ternary flips to the anomaly alert string.',
        ],
        'challengeId': 'Buat sistem penilaian kelulusan siswa: buat array berisi 5 objek siswa (nama, nilai matematika, nilai coding). Gunakan perulangan `for...of` dan ternary untuk menentukan apakah siswa lulus (keduanya $\ge 70$), hitung rata-rata kelas, dan cetak daftar nama siswa berprestasi.',
        'challengeEn': 'Build a student graduation grader: create an array of 5 student objects (name, math score, coding score). Use a `for...of` loop and a ternary to verify passing status (both scores $\ge 70$), compute class averages, and print honors recipients.',
        'summaryId': 'Kamu telah menguasai percabangan logika, evaluasi Truthy/Falsy, operator ternary, dan perulangan for...of. Minggu depan kita akan mendalami fungsi modern, arrow functions, scope, dan closures.',
        'summaryEn': 'You have mastered logical branching, Truthy/Falsy evaluation, ternary expressions, and for...of iteration. Next week, we examine modern functions, arrow syntax, scope, and closures.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'fungsi-arrow-scope-dan-closures',
        'titleId': 'Fungsi Kelas Satu, Arrow Functions, Scope & Closures',
        'titleEn': 'First-Class Functions, Arrow Syntax, Scope & Closures',
        'programId': 'Pabrik Generator Diskon (Discount Factory) dengan Closure',
        'programEn': 'Custom Discount Calculator Engine via Lexical Closures',
        'levelNameId': 'Dasar Logika & Struktur Data',
        'levelNameEn': 'Logic Fundamentals & Data Structures',
        'language': 'javascript',
        'code': """// 1. Function Declaration Tradisional vs Arrow Function Modern
function hitungTotal(harga, kuantitas = 1) {
  return harga * kuantitas;
}

// Arrow function ringkas dengan implicit return
const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

// 2. Fungsi sebagai First-Class Citizen (Bisa dijadikan argumen)
const terapkanBiayaLayanan = (subtotal, fungsiFormat, tarifAdmin = 5000) => {
  const totalAkhir = subtotal + tarifAdmin;
  return fungsiFormat(totalAkhir);
};

console.log("Total Belanja Dasar  :", formatRupiah(hitungTotal(75000, 2)));
console.log("Dengan Biaya Layanan :", terapkanBiayaLayanan(150000, formatRupiah));

// 3. Konsep Lanjutan: Lexical Scope & Closure
// Fungsi luar mengingat variabel lingkungannya meskipun sudah selesai dieksekusi!
function buatKalkulatorDiskon(persenDiskon) {
  const faktorPengali = 1 - (persenDiskon / 100);

  // Fungsi anak (closure) mempertahankan akses ke faktorPengali
  return function(hargaAsli) {
    const hargaDiskon = hargaAsli * faktorPengali;
    return formatRupiah(hargaDiskon);
  };
}

// Membuat generator diskon khusus
const diskonMemberVIP = buatKalkulatorDiskon(20); // Diskon 20%
const diskonFlashSale = buatKalkulatorDiskon(50); // Diskon 50%

console.log("\\n=== Eksekusi Engine Closure ===");
const hargaLaptop = 10000000;
console.log("Harga Normal :", formatRupiah(hargaLaptop));
console.log("Member VIP   :", diskonMemberVIP(hargaLaptop)); // Memakai diskon 20%
console.log("Flash Sale   :", diskonFlashSale(hargaLaptop)); // Memakai diskon 50%
""",
        'objectivesId': [
            'Memahami bahwa fungsi di JavaScript adalah First-Class Citizens (dapat disimpan di variabel dan dioper sebagai argumen)',
            'Menguasai sintaks Arrow Functions, parameter default, dan fitur implicit return',
            'Memahami Lexical Scope: bagaimana fungsi mengakses variabel di lingkungan tempat ia didefinisikan',
            'Menguasai konsep Closure: kemampuan fungsi dalam mengingat variabel luar bahkan setelah fungsi luar selesai dijalankan',
            'Membuat fungsi pabrik (Factory Functions) untuk enkapsulasi state privat tanpa variabel global',
        ],
        'objectivesEn': [
            'Understand functions as First-Class Citizens (assignable to variables and passable as higher-order arguments)',
            'Master Arrow Function syntax, default parameters, and concise implicit returns',
            'Grasp Lexical Scope: how inner functions query outer lexical scopes across resolution chains',
            'Demystify Closures: the retention of outer scope memory environments post-execution',
            'Construct Factory Functions for state encapsulation free of global scope pollution',
        ],
        'explanationId': """### First-Class Functions
Di JavaScript, fungsi diperlakukan sama seperti tipe data lainnya: dapat disimpan di dalam variabel, dimasukkan ke dalam array, menjadi properti objek, dan dioperkan ke dalam fungsi lain sebagai argumen (*callback*).

### Arrow Functions vs Deklarasi Tradisional
Arrow functions (\`() => {}\`) diperkenalkan di ES6 dengan dua keunggulan utama:
1. **Sintaks Ringkas**: Jika fungsi hanya memiliki 1 baris ekspresi, tanda kurung kurawal dan kata kunci \`return\` dapat dihilangkan (*implicit return*).
2. **Lexical \`this\`**: Arrow function tidak membuat konteks \`this\` sendiri, melainkan mewarisi \`this\` dari lingkungan luar tempat ia dibuat.

### Misteri Closure
Closure adalah salah satu konsep terpenting dalam JavaScript. Ketika sebuah fungsi didefinisikan di dalam fungsi lain, fungsi dalam tersebut **mengikat salinan memori lingkungan luar tempat ia lahir (*lexical environment*)**. 
Meskipun fungsi \`buatKalkulatorDiskon()\` sudah selesai dieksekusi dan keluar dari call stack, variabel \`faktorPengali\` tetap hidup di heap memori karena masih direferensikan oleh fungsi anak. Inilah dasar dari encapsulation dan privasi data di JavaScript!""",
        'explanationEn': """### First-Class Functions Explained
In JavaScript, functions are first-class citizens: they can be bound to identifiers, nested within arrays, assigned as object properties, and dispatched into higher-order functions as callbacks.

### Arrow Functions vs Declarations
Arrow syntax (\`() => {}\`) provides two structural advantages:
1. **Conciseness**: Single-expression bodies omit curly braces and the \`return\` keyword via implicit returns.
2. **Lexical \`this\` Binding**: Arrow functions do not bind their own execution context (\`this\`), adopting the enclosing lexical context automatically.

### The Closure Mechanism
A closure is the combination of a function bundled together with references to its surrounding lexical environment. When an inner function is declared, it **captures and preserves its outer scope's variables in heap memory**. Even after \`buatKalkulatorDiskon()\` terminates and pops from the call stack, the captured variable \`faktorPengali\` remains alive for subsequent invocations. This enables true state encapsulation.""",
        'beginnerId': """### Analogi: Mesin Pembuat Stempel Otomatis
1. **Fungsi Biasa** seperti kalkulator saku: Anda memencet angka, hasilnya keluar, lalu kalkulator lupa angka tadi.
2. **Closure** seperti memesan stempel kustom di percetakan: Anda memesan "Tolong buatkan stempel diskon 20%". Percetakan mencetak stempel berlabel '20%' (**`buatKalkulatorDiskon(20)`**). Kapan pun stempel itu Anda bawa pulang dan Anda capkan ke buku nota apapun, stempel itu selalu mengingat rumus 20% miliknya sendiri.""",
        'beginnerEn': """### Analogy: Custom Rubber Stamp Manufacturer
1. **Standard Functions** are hand-held pocket calculators: you enter numbers, read the result, and the register clears.
2. **Closures** are ordered custom rubber stamps: you order a stamp calibrated to "20% Discount" (**`buatKalkulatorDiskon(20)`**). Whenever you stamp an invoice months later, the stamp permanently remembers its internal 20% calibration.""",
        'experimentsId': [
            'Buat kalkulator diskon baru diskonKaryawan = buatKalkulatorDiskon(30) dan uji apakah nilainya independen dari diskon VIP.',
            'Coba ubah arrow function implicit return menjadi kurung kurawal {} tanpa kata kunci return, dan amati mengapa hasilnya menjadi undefined.',
            'Periksa variabel faktorPengali langsung dari luar fungsi console.log(faktorPengali) untuk memverifikasi bahwa variabel tersebut privat dan terlindungi dari scope global.',
            'Buat fungsi pencacah id otomatis menggunakan closure: setiap kali dipanggil, angka id bertambah +1.',
        ],
        'experimentsEn': [
            'Instantiate diskonKaryawan = buatKalkulatorDiskon(30) to verify state isolation from previous instances.',
            'Wrap an arrow function body in curly braces {} while omitting return to observe undefined return values.',
            'Attempt to log faktorPengali directly from global scope to verify lexical private encapsulation.',
            'Engineer an auto-incrementing ID counter factory using a closure counter variable.',
        ],
        'challengeId': 'Buat fungsi pabrik rekening bank `buatAkunBank(nama, saldoAwal)`: simpan saldo di dalam closure privat. Kembalikan objek yang memiliki method `setor(jumlah)`, `tarik(jumlah)`, dan `cekSaldo()`. Pastikan saldo tidak bisa diubah langsung dari luar tanpa melalui method.',
        'challengeEn': 'Build a bank account factory `buatAkunBank(owner, initialBalance)`: retain the balance within a private closure. Return an object exposing `setor(amount)`, `tarik(amount)`, and `cekSaldo()`. Guarantee the balance cannot be modified externally.',
        'summaryId': 'Kamu telah menguasai fungsi kelas satu, arrow functions, lexical scope, dan closures. Minggu depan kita akan mendalami manipulasi data array modern menggunakan pipeline fungsional map, filter, dan reduce.',
        'summaryEn': 'You have mastered first-class functions, arrow syntax, lexical scope, and closures. Next week, we examine functional array data manipulation with map, filter, and reduce.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'array-dan-metode-fungsional',
        'titleId': 'Array Modern: Transformasi Data dengan Map, Filter & Reduce',
        'titleEn': 'Modern Arrays: Functional Pipelines with Map, Filter & Reduce',
        'programId': 'Pipeline Pengolahan Data Penjualan E-Commerce',
        'programEn': 'E-Commerce Sales Data Processing Pipeline',
        'levelNameId': 'Dasar Logika & Struktur Data',
        'levelNameEn': 'Logic Fundamentals & Data Structures',
        'language': 'javascript',
        'code': """// Kumpulan Data Produk E-Commerce
const katalog = [
  { id: 101, nama: "Mechanical Keyboard", kategori: "Aksesoris", harga: 850000, stok: 12 },
  { id: 102, nama: "Monitor UltraWide 34\\"", kategori: "Display", harga: 6500000, stok: 4 },
  { id: 103, nama: "Mouse Wireless Ergonomis", kategori: "Aksesoris", harga: 450000, stok: 0 },
  { id: 104, nama: "Standing Desk Elektrik", kategori: "Furnitur", harga: 4200000, stok: 6 },
  { id: 105, nama: "USB-C Multiport Dock", kategori: "Aksesoris", harga: 750000, stok: 18 }
];

console.log("=== Pipeline Pengolahan Data Fungsional ===");

// 1. FILTER: Ambil hanya produk aksesoris yang tersedia stoknya
const aksesorisTersedia = katalog.filter((item) => {
  return item.kategori === "Aksesoris" && item.stok > 0;
});
console.log("Aksesoris Siap Kirim (Total:", aksesorisTersedia.length, "item)");

// 2. MAP: Transformasi data menjadi format ringkas untuk tampilan katalog
const kartuKatalog = aksesorisTersedia.map((item) => {
  return {
    namaProduk: item.nama,
    hargaFormat: "Rp " + item.harga.toLocaleString("id-ID"),
    statusGudang: item.stok > 10 ? "Stok Melimpah" : "Stok Terbatas"
  };
});
console.log("Format Tampilan:", kartuKatalog);

// 3. REDUCE: Hitung total nilai inventaris seluruh barang di gudang
// rumus: akumulator + (harga * stok)
const totalNilaiAsetGudang = katalog.reduce((total, item) => {
  return total + (item.harga * item.stok);
}, 0); // 0 adalah nilai awal akumulator

console.log("\\nTotal Nilai Aset Gudang : Rp " + totalNilaiAsetGudang.toLocaleString("id-ID"));

// 4. FIND & SOME: Pencarian Cepat
const produkMahal = katalog.find((item) => item.harga > 5000000);
console.log("Item Premium Ditemukan  :", produkMahal ? produkMahal.nama : "Tidak ada");

const adaStokHabis = katalog.some((item) => item.stok === 0);
console.log("Apakah ada barang kosong?:", adaStokHabis ? "Ya, segera re-order!" : "Semua aman");
""",
        'objectivesId': [
            'Memahami paradigma pemrograman fungsional pada array: immutability (tidak mengubah array asli)',
            'Menggunakan Array.prototype.map() untuk mentransformasikan setiap elemen menjadi format data baru',
            'Menggunakan Array.prototype.filter() untuk menyaring elemen berdasarkan kondisi logika pengujian',
            'Menguasai Array.prototype.reduce() untuk mengagregasi kumpulan data menjadi nilai tunggal (angka, objek)',
            'Memanfaatkan Array.prototype.find() dan some() / every() untuk pencarian dan validasi cepat',
        ],
        'objectivesEn': [
            'Embrace functional array processing tenets: immutability without mutating original source data',
            'Deploy Array.prototype.map() to project elements into transformed data schemas',
            'Deploy Array.prototype.filter() to extract items fulfilling Boolean criteria',
            'Master Array.prototype.reduce() to aggregate collections into scalar values, maps, or objects',
            'Leverage Array.prototype.find(), some(), and every() for rapid querying and boolean assertions',
        ],
        'explanationId': """### Prinsip Immutability pada Array Modern
Metode lama seperti \`splice()\` atau mengedit indeks secara langsung merusak data asli (*mutation*). Metode fungsional modern (\`map\`, \`filter\`, \`slice\`) selalu **menghasilkan array baru** dan membiarkan array sumber tetap utuh. Ini adalah pondasi wajib dalam pengembangan web modern dan framework reaktif seperti React.

### Tiga Serangkai: Map, Filter, Reduce
1. **\`filter(predicate)\`**: Menguji setiap elemen. Jika fungsi mengembalikan \`true\`, elemen tersebut dimasukkan ke dalam array hasil baru.
2. **\`map(transform)\`**: Mengubah setiap elemen menjadi bentuk lain dengan panjang array hasil yang persis sama dengan array awal.
3. **\`reduce(accumulator, current, initialValue)\`**: Mengalirkan seluruh data ke dalam satu nilai akumulasi (misalnya menjumlahkan total harga belanjaan atau mengelompokkan item berdasarkan kategori).

### Pencarian: find vs filter
- \`filter()\` selalu mengembalikan array (bisa kosong, bisa banyak).
- \`find()\` berhenti mencari begitu menemukan kecocokan pertama dan langsung mengembalikan objek elemen tersebut (atau \`undefined\` jika tidak ada).""",
        'explanationEn': """### Immutability in Modern Arrays
Mutating methods like \`splice()\` alter underlying data structures. Functional array methods (\`map\`, \`filter\`, \`slice\`) **produce new immutable collections**, leaving source datasets untouched. This is the structural foundation of reactive frontend architectures.

### The Big Three: Map, Filter, Reduce
1. **\`filter(predicate)\`**: Evaluates each element against a boolean condition, collecting matches into a new array.
2. **\`map(transform)\`**: Projects every element through a transformation function, preserving identical array length.
3. **\`reduce(accumulator, current, initialValue)\`**: Collapses an entire dataset into a single accumulator target (scalar sum, hashmap, grouped object).

### Querying: find vs filter
- \`filter()\` always returns an array collection (empty or populated).
- \`find()\` short-circuits upon the first match, returning the item reference directly (or \`undefined\`).""",
        'beginnerId': """### Analogi: Pabrik Pengolahan Kopi
1. **`filter`** seperti saringan kopi: hanya biji kopi berkualitas super yang lolos saringan, biji kopi yang pecah atau busuk ditahan di atas saringan.
2. **`map`** seperti mesin pemanggang dan pembungkus: setiap biji kopi yang masuk diubah bentuknya menjadi satu bungkus bubuk kopi harum.
3. **`reduce`** seperti mesin timbangan gudang: semua karung kopi yang datang ditimbang dan diakumulasikan menjadi satu angka total berat dalam kilogram di buku kas.""",
        'beginnerEn': """### Analogy: A Gourmet Coffee Roastery
1. **`filter`** is the mechanical sorter: only whole specialty beans pass the sieve; broken pebbles are filtered out.
2. **`map`** is the roasting and packaging assembly line: every raw bean is roasted and sealed into branded foil pouches.
3. **`reduce`** is the terminal shipping scale: all outgoing crates are aggregated into a single gross shipment tonnage weight.""",
        'experimentsId': [
            'Lupa memberikan nilai awal 0 pada reduce, amati apakah hasilnya berbeda dan pahami bahayanya jika array-nya kosong.',
            'Rangkai metode secara berantai (method chaining): katalog.filter(...).map(...) dan amati keindahan alur fungsionalnya.',
            'Coba ubah filter agar mencari kategori "Furnitur" dan perhatikan hasil array yang baru.',
            'Uji katalog.every(item => item.harga > 100000) untuk memverifikasi apakah semua barang harganya di atas 100 ribu.',
        ],
        'experimentsEn': [
            'Omit the initialValue argument 0 in reduce to observe how empty array handling breaks.',
            'Construct a method chain: katalog.filter(...).map(...) to experience declarative stream processing.',
            'Update the category predicate to "Furnitur" and verify filtered outputs.',
            'Assert katalog.every(item => item.harga > 100000) to confirm collective validation.',
        ],
        'challengeId': 'Buat pipeline data analitik e-commerce: hitung total pendapatan dari hanya transaksi yang berstatus "PAID", lalu hasilkan objek ringkasan `{ totalOmset: ..., jumlahTransaksi: ..., rataRata: ... }` hanya menggunakan metode fungsional array.',
        'challengeEn': 'Build an analytics data pipeline: compute total revenue strictly from "PAID" transactions, returning a summary object `{ totalOmset: ..., jumlahTransaksi: ..., rataRata: ... }` leveraging functional array methods.',
        'summaryId': 'Kamu telah menguasai logika dasar, tipe data, closures, dan manipulasi array fungsional. Minggu depan kita memasuki Level 2: manipulasi DOM browser langsung dan arsitektur event interaktif.',
        'summaryEn': 'You have mastered computational logic, data types, closures, and functional array pipelines. Next week we enter Level 2: direct browser DOM manipulation and interactive event architectures.',
    },
]

from .track_javascript_p2 import MODULES_P2
from .track_javascript_p3 import MODULES_P3

ALL_MODULES = MODULES + MODULES_P2 + MODULES_P3

def get_track():
    return {
        'slug': 'javascript',
        'track_name': 'JavaScript',
        'levels': LEVELS,
        'modules': ALL_MODULES,
    }
