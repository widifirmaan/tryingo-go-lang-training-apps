import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// PHP CURRICULUM — pure research, zero framework influence
// Sources: PHP Official Docs, PHP The Right Way, Laracasts (PHP basics),
//          PHP Apprentice, Codecademy, W3Schools PHP
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 2 levels, 12 weeks total
//   Beginner (6w): syntax → types/control → functions → arrays → OOP → forms
//   Intermediate (6w): security → PDO/database → Composer → testing → patterns → project
// Total: 12 weeks
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('php', 'PHP');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar PHP: sintaks, tipe data, fungsi, array, OOP, dan penanganan form.',
    descEn: 'PHP fundamentals: syntax, types, functions, arrays, OOP, and form handling.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'PHP produksi: keamanan, PDO, Composer, testing, design pattern, proyek akhir.',
    descEn: 'Production PHP: security, PDO, Composer, testing, design patterns, final project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-6) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'sintaks-dasar',
    titleId: 'Sintaks Dasar & Variabel', titleEn: 'Basic Syntax & Variables',
    programId: 'Halo, PHP!', programEn: 'Hello, PHP!',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "Selamat datang di PHP!<br>";
echo "PHP adalah bahasa server-side populer.<br>";

$nama = "Budi";
$umur = 25;
$tinggi = 175.5;
$aktif = true;

echo "Nama: $nama<br>";
echo "Umur: $umur<br>";
echo "Tinggi: $tinggi<br>";
echo "Aktif: " . ($aktif ? "Ya" : "Tidak") . "<br>";
echo "Tipe: " . gettype($nama) . ", " . gettype($umur) . "<br>";
>`,
    objectivesId: [
      'Memahami peran PHP sebagai bahasa server-side (PHP Official Docs)',
      'Menulis tag PHP: <?php ... ?> dan echo untuk output',
      'Mendeklarasikan variabel dengan $ dan tipe dinamis',
      'Mengenal tipe dasar: string, int, float, bool, array, NULL',
      'String interpolation dan concatenation dengan .',
    ],
    objectivesEn: [
      'Understand PHP as a server-side language (PHP Official Docs)',
      'Write PHP tags: <?php ... ?> and echo for output',
      'Declare variables with $ and dynamic typing',
      'Learn basic types: string, int, float, bool, array, NULL',
      'String interpolation and concatenation with .',
    ],
    explanationId: '### Peran PHP\nPHP adalah bahasa scripting server-side yang dirancang untuk web development. Berbeda dengan JS yang jalan di browser, PHP dieksekusi di server — menghasilkan HTML yang dikirim ke klien.\n\n### Sintaks Dasar\nSetiap kode PHP dibungkus \`<?php ... ?>\`. \`echo\` untuk output. Variabel diawali \`$\` dengan tipe dinamis.\n\n### Tipe Data\nString, Integer, Float, Boolean, Array, NULL. \`gettype()\` untuk cek tipe.\n\n### String\nDouble-quote interpolasi: \`"Halo $nama"\`. Single-quote literal. Concatenate dengan \`.\`',
    explanationEn: '### PHP\'s Role\nPHP is a server-side scripting language. Executed on the server — produces HTML sent to client.\n\n### Basic Syntax\n\`<?php ... ?>\` tags. \`echo\` for output. Variables start with \`$\`.\n\n### Data Types\nString, Integer, Float, Boolean, Array, NULL.\n\n### Strings\nDouble-quote interpolation, single-quote literal, concatenation with \`.\`.',
    experimentsId: [
      'Ubah nilai variabel dan lihat perubahannya',
      'Buat operasi aritmatika: +, -, *, /, %',
      'Coba perbedaan single-quote vs double-quote',
      'Gunakan gettype() untuk cek berbagai tipe',
      'Buat konversi tipe: (int), (string), (bool)',
    ],
    experimentsEn: [
      'Change variable values and observe',
      'Create arithmetic operations: +, -, *, /, %',
      'Try single-quote vs double-quote difference',
      'Use gettype() to check various types',
      'Create type casting: (int), (string), (bool)',
    ],
    challengeId: 'Buat program profil siswa: nama, umur, nilai (array), dan status kelulusan. Tampilkan dengan format rapi menggunakan echo.',
    challengeEn: 'Build a student profile program: name, age, grades (array), and graduation status. Display with formatted echo.',
    summaryId: 'Minggu 1 dari 12: **Sintaks Dasar & Variabel** (Level: Pemula). Fondasi PHP dimulai di sini. Minggu depan: **Operator & Control Flow**.',
    summaryEn: 'Week 1 of 12: **Basic Syntax & Variables** (Level: Beginner). PHP foundation starts here. Next week: **Operators & Control Flow**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'operator-kontrol',
    titleId: 'Operator & Control Flow', titleEn: 'Operators & Control Flow',
    programId: 'Sistem Grade', programEn: 'Grade System',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
$nilai = 85;
$absen = 90;

echo "Nilai: $nilai, Absen: $absen<br>";

if ($nilai >= 90) {
    $grade = "A";
} elseif ($nilai >= 75) {
    $grade = "B";
} elseif ($nilai >= 60) {
    $grade = "C";
} else {
    $grade = "D";
}
echo "Grade: $grade<br>";

echo "<br>=== For Loop ===<br>";
for ($i = 1; $i <= 5; $i++) {
    echo "Iterasi $i<br>";
}

echo "<br>=== While Loop ===<br>";
$n = 1;
while ($n <= 3) {
    echo "While: $n<br>";
    $n++;
}

echo "<br>=== Switch ===<br>";
$hari = 3;
switch ($hari) {
    case 1: echo "Senin"; break;
    case 2: echo "Selasa"; break;
    case 3: echo "Rabu"; break;
    default: echo "Lainnya";
}
echo "<br>";

$hasil = ($nilai >= 60) ? "Lulus" : "Tidak Lulus";
echo "Status: $hasil<br>";

$nama = null;
$salam = $nama ?? "Tamu";
echo "Halo, $salam<br>";
>`,
    objectivesId: [
      'Operator aritmatika: +, -, *, /, %, ** (power)',
      'Operator perbandingan: ==, ===, !=, !==, <, >, <=, >=',
      'Operator logika: &&, ||, !, and, or, xor',
      'Control flow: if, elseif, else untuk percabangan',
      'Loop: for, while, do-while, dan switch case',
    ],
    objectivesEn: [
      'Arithmetic operators: +, -, *, /, %, ** (power)',
      'Comparison operators: ==, ===, !=, !==, <, >, <=, >=',
      'Logical operators: &&, ||, !, and, or, xor',
      'Control flow: if, elseif, else for branching',
      'Loops: for, while, do-while, and switch case',
    ],
    explanationId: '### Operator Aritmatika\n\`+\` tambah, \`-\` kurang, \`*\` kali, \`/\` bagi, \`%\` modulo, \`**\` power (PHP 5.6+).\n\n### Perbandingan & Logika\n\`==\` equals, \`===\` identical (tipe sama), \`&&\` AND, \`||\` OR, \`!\` NOT.\n\n### Control Flow\n\`if/elseif/else\` untuk percabangan. Ternary: \`? :\` untuk kondisi pendek.\n\n### Loop\n\`for\` untuk iterasi terhitung, \`while\` untuk kondisi, \`switch\` untuk multiple branch.',
    explanationEn: '### Arithmetic Operators\n\`+\`, \`-\`, \`*\`, \`/\`, \`%\`, \`**\` power.\n\n### Comparison & Logic\n\`==\` equals, \`===\` identical, \`&&\` AND, \`||\` OR.\n\n### Control Flow\n\`if/elseif/else\` for branching. Ternary: \`? :\`.\n\n### Loops\n\`for\` counted, \`while\` conditional, \`switch\` for branches.',
    experimentsId: [
      'Ubah nilai dan lihat grade berubah',
      'Buat nested if untuk validasi multi-kondisi',
      'Coba for loop dengan break dan continue',
      'Ganti switch dengan if/else — mana lebih readable?',
      'Gunakan null coalescing operator ?? untuk default value',
    ],
    experimentsEn: [
      'Change values and observe grade changes',
      'Create nested if for multi-condition validation',
      'Try for loop with break and continue',
      'Replace switch with if/else — which is more readable?',
      'Use null coalescing operator ?? for default values',
    ],
    challengeId: 'Buat kalkulator sederhana dengan switch case: tambah, kurang, kali, bagi. Validasi pembagian dengan nol.',
    challengeEn: 'Build a simple calculator with switch case: add, subtract, multiply, divide. Validate division by zero.',
    summaryId: 'Minggu 2 dari 12: **Operator & Control Flow** (Level: Pemula). Logika program dibangun di sini. Minggu depan: **Fungsi & Lingkup Variabel**.',
    summaryEn: 'Week 2 of 12: **Operators & Control Flow** (Level: Beginner). Program logic is built here. Next week: **Functions & Variable Scope**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'fungsi-scope',
    titleId: 'Fungsi & Lingkup Variabel', titleEn: 'Functions & Variable Scope',
    programId: 'Kalkulator Fungsi', programEn: 'Function Calculator',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
function tambah($a, $b) {
    return $a + $b;
}

function bagi($a, $b) {
    if ($b == 0) {
        return "Error: tidak bisa dibagi nol";
    }
    return $a / $b;
}

function sapa($nama = "Tamu", $salam = "Halo") {
    return "$salam, $nama!";
}

function &getReference() {
    static $value = 10;
    return $value;
}

echo "Tambah: " . tambah(10, 5) . "<br>";
echo "Bagi: " . bagi(10, 3) . "<br>";
echo "Bagi nol: " . bagi(5, 0) . "<br>";
echo sapa("Budi") . "<br>";
echo sapa("Siti", "Selamat pagi") . "<br>";

$hitung = 0;
function counter() {
    global $hitung;
    $hitung++;
    return $hitung;
}
counter(); counter(); counter();
echo "Counter: $hitung<br>";

$faktorial = function($n) {
    if ($n <= 1) return 1;
    return $n * ($faktorial($n - 1));
};
echo "Faktorial 5: " . $faktorial(5) . "<br>";

$angka = [3, 1, 4, 1, 5];
$doubled = array_map(fn($n) => $n * 2, $angka);
echo "Doubled: " . implode(", ", $doubled) . "<br>";
>`,
    objectivesId: [
      'Membuat fungsi dengan function keyword, parameter, dan return',
      'Default parameter value dan named arguments (PHP 8+)',
      'Variable scope: global, static, dan local',
      'Anonymous functions (closure) dan arrow functions (fn)',
      'Recursive function untuk perulangan mandiri',
    ],
    objectivesEn: [
      'Create functions with function keyword, parameters, and return',
      'Default parameter values and named arguments (PHP 8+)',
      'Variable scope: global, static, and local',
      'Anonymous functions (closures) and arrow functions (fn)',
      'Recursive functions for self-referencing loops',
    ],
    explanationId: '### Deklarasi Fungsi\n\`function nama($param) { return $value; }\`. Default value: \`$nama = "Tamu"\`.\n\n### Scope\nLocal (di dalam fungsi), \`global\` keyword untuk akses variabel global, \`static\` untuk pertahankan value.\n\n### Closure & Arrow\nAnonymous function: \`$f = function() {}\`. Arrow function: \`fn($x) => $x * 2\`.\n\n### Recursion\nFungsi memanggil dirinya sendiri. Base case untuk berhenti.',
    explanationEn: '### Function Declaration\n\`function name($param) { return $value; }\`. Default: \`$name = "Guest"\`.\n\n### Scope\nLocal inside functions, \`global\` keyword for access, \`static\` to persist.\n\n### Closures & Arrows\nAnonymous: \`$f = function() {}\`. Arrow: \`fn($x) => $x * 2\`.\n\n### Recursion\nFunction calls itself. Base case to stop.',
    experimentsId: [
      'Buat fungsi dengan type declaration: function tambah(int $a, int $b): int',
      'Coba variadic function: function sum(...$numbers)',
      'Buat closure dengan use() untuk capture variabel luar',
      'Implementasikan Fibonacci dengan recursion',
      'Gunakan array_filter dengan arrow function',
    ],
    experimentsEn: [
      'Create function with type declaration: function add(int $a, int $b): int',
      'Try variadic function: function sum(...$numbers)',
      'Create closure with use() to capture outer variable',
      'Implement Fibonacci with recursion',
      'Use array_filter with arrow function',
    ],
    challengeId: 'Buat library matematika: fungsi pangkat, faktorial, prima check, dan FizzBuzz. Gunakan recursion dan type hints.',
    challengeEn: 'Build a math library: power, factorial, prime check, and FizzBuzz functions. Use recursion and type hints.',
    summaryId: 'Minggu 3 dari 12: **Fungsi & Lingkup Variabel** (Level: Pemula). Modularitas kode dimulai. Minggu depan: **Array & Manipulasi**.',
    summaryEn: 'Week 3 of 12: **Functions & Variable Scope** (Level: Beginner). Code modularity begins. Next week: **Arrays & Manipulation**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'array-manipulasi',
    titleId: 'Array & Manipulasi', titleEn: 'Arrays & Manipulation',
    programId: 'Manajemen Data', programEn: 'Data Manager',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
$buah = ["apel", "mangga", "pisang"];
$buah[] = "jeruk";
echo "Buah: " . implode(", ", $buah) . "<br>";
echo "Jumlah: " . count($buah) . "<br>";

$nilai = [85, 92, 78, 90, 88];
echo "Max: " . max($nilai) . ", Min: " . min($nilai) . "<br>";
echo "Sum: " . array_sum($nilai) . ", Avg: " . (array_sum($nilai) / count($nilai)) . "<br>";

sort($nilai);
echo "Sorted: " . implode(", ", $nilai) . "<br>";

$siswa = [
    "nama" => "Budi",
    "umur" => 25,
    "nilai" => [90, 85, 88],
];
echo "Nama: " . $siswa["nama"] . "<br>";
$siswa["alamat"] = "Jakarta";

foreach ($siswa as $key => $value) {
    if (is_array($value)) {
        echo "$key: " . implode(", ", $value) . "<br>";
    } else {
        echo "$key: $value<br>";
    }
}

$matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
echo "<br>Matrix:<br>";
foreach ($matrix as $row) {
    echo implode(" ", $row) . "<br>";
}

$genap = array_filter($nilai, fn($n) => $n % 2 == 0);
echo "<br>Genap: " . implode(", ", $genap) . "<br>";

$doubled = array_map(fn($n) => $n * 2, $nilai);
echo "Doubled: " . implode(", ", $doubled) . "<br>";
>`,
    objectivesId: [
      'Indexed array: array dengan index numerik',
      'Associative array: array dengan key string',
      'Array manipulation: sort, array_filter, array_map, array_reduce',
      'Multi-dimensional array untuk data kompleks',
      'Loop array dengan foreach dan iterasi nested',
    ],
    objectivesEn: [
      'Indexed arrays: numerically indexed arrays',
      'Associative arrays: string-keyed arrays',
      'Array manipulation: sort, array_filter, array_map, array_reduce',
      'Multi-dimensional arrays for complex data',
      'Array loops with foreach and nested iteration',
    ],
    explanationId: '### Indexed & Associative\n\`["a", "b"]\` index numerik. \`["key" => "val"]\` key string.\n\n### Fungsi Array\n\`sort()\` urutkan, \`array_filter()\` filter, \`array_map()\` transformasi, \`array_reduce()\` gabung.\n\n### Multi-dimensional\nArray di dalam array: \`[[1,2], [3,4]]\` untuk matrix atau data tabel.\n\n### Foreach\n\`foreach ($arr as $key => $value)\` — cara utama iterasi array di PHP.',
    explanationEn: '### Indexed & Associative\n\`["a", "b"]\` numeric. \`["key" => "val"]\` string keys.\n\n### Array Functions\n\`sort()\`, \`array_filter()\`, \`array_map()\`, \`array_reduce()\`.\n\n### Multi-dimensional\nArrays within arrays for matrices/tables.\n\n### Foreach\n\`foreach ($arr as $key => $value)\` — primary array iteration.',
    experimentsId: [
      'Buat array_merge untuk gabungkan 2 array',
      'Coba array_unique untuk hapus duplikat',
      'Gunakan array_slice untuk ambil sebagian',
      'Implementasikan nested loop untuk matrix multiplication',
      'Buat fungsi flatten untuk nested array',
    ],
    experimentsEn: [
      'Create array_merge to combine 2 arrays',
      'Try array_unique to remove duplicates',
      'Use array_slice to extract partial array',
      'Implement nested loop for matrix multiplication',
      'Create flatten function for nested arrays',
    ],
    challengeId: 'Buat sistem inventory: tambah/hapus produk (associative array), urutkan berdasarkan harga, filter berdasarkan kategori.',
    challengeEn: 'Build an inventory system: add/remove products (associative array), sort by price, filter by category.',
    summaryId: 'Minggu 4 dari 12: **Array & Manipulasi** (Level: Pemula). Struktur data utama PHP. Minggu depan: **Object-Oriented Programming**.',
    summaryEn: 'Week 4 of 12: **Arrays & Manipulation** (Level: Beginner). PHP\'s primary data structure. Next week: **Object-Oriented Programming**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'oop-dasar',
    titleId: 'Object-Oriented Programming', titleEn: 'Object-Oriented Programming',
    programId: 'Class & Object', programEn: 'Class & Object',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
class Produk {
    public string $nama;
    public float $harga;
    public int $stok;

    public function __construct(string $nama, float $harga, int $stok = 0) {
        $this->nama = $nama;
        $this->harga = $harga;
        $this->stok = $stok;
    }

    public function info(): string {
        return "{$this->nama}: Rp" . number_format($this->harga, 0) . " (stok: {$this->stok})";
    }

    public function diskon(float $persen): void {
        $this->harga -= $this->harga * ($persen / 100);
    }
}

class Elektronik extends Produk {
    public int $garansi;

    public function __construct(string $nama, float $harga, int $stok, int $garansi) {
        parent::__construct($nama, $harga, $stok);
        $this->garansi = $garansi;
    }

    public function info(): string {
        return parent::info() . " [Garansi: {$this->garansi} tahun]";
    }
}

$produk = new Produk("Mouse", 250000, 10);
echo $produk->info() . "<br>";

$produk->diskon(10);
echo "Setelah diskon: " . $produk->info() . "<br>";

$laptop = new Elektronik("Laptop Pro", 20000000, 5, 3);
echo $laptop->info() . "<br>";

echo "Class: " . get_class($laptop) . "<br>";
echo "Instanceof: " . ($laptop instanceof Elektronik ? "Ya" : "Tidak") . "<br>";
>`,
    objectivesId: [
      'Membuat class dengan property dan method',
      'Constructor: __construct untuk inisialisasi object',
      'Visibility: public, protected, private',
      'Inheritance: extends untuk pewarisan class',
      'Method overriding dan parent:: untuk akses parent',
    ],
    objectivesEn: [
      'Create classes with properties and methods',
      'Constructor: __construct for object initialization',
      'Visibility: public, protected, private',
      'Inheritance: extends for class inheritance',
      'Method overriding and parent:: for parent access',
    ],
    explanationId: '### Class & Object\n\`class\` blueprint, \`new ClassName()\` membuat object. Property dan method diakses dengan \`->\`.\n\n### Constructor\n\`__construct()\` dipanggil otomatis saat \`new\`. Type declaration di property (PHP 7.4+).\n\n### Visibility\n\`public\` (akses mana saja), \`protected\` (class + turunan), \`private\` (hanya class sendiri).\n\n### Inheritance\n\`extends\` untuk waris. \`parent::method()\` untuk akses method parent. Override untuk customize.',
    explanationEn: '### Class & Object\n\`class\` blueprint, \`new ClassName()\` creates object. Access with \`->\`.\n\n### Constructor\n\`__construct()\` called on \`new\`. Property type declarations (PHP 7.4+).\n\n### Visibility\n\`public\` (anywhere), \`protected\` (class + children), \`private\` (class only).\n\n### Inheritance\n\`extends\` to inherit. \`parent::method()\` for parent access. Override to customize.',
    experimentsId: [
      'Buat class trait untuk method reusable',
      'Coba abstract class dengan abstract method',
      'Buat interface dan implement di class',
      'Tambah static property dan method',
      'Gunakan __toString untuk string representation',
    ],
    experimentsEn: [
      'Create trait class for reusable methods',
      'Try abstract class with abstract method',
      'Create interface and implement in class',
      'Add static property and method',
      'Use __toString for string representation',
    ],
    challengeId: 'Buat sistem perpustakaan: class Buku, Anggota, Peminjaman. Gunakan inheritance, encapsulation, dan method chaining.',
    challengeEn: 'Build a library system: class Book, Member, Loan. Use inheritance, encapsulation, and method chaining.',
    summaryId: 'Minggu 5 dari 12: **Object-Oriented Programming** (Level: Pemula). Paradigma modern PHP. Minggu depan: **Form Handling & Validasi**.',
    summaryEn: 'Week 5 of 12: **Object-Oriented Programming** (Level: Beginner). Modern PHP paradigm. Next week: **Form Handling & Validation**.',
  },
  {
    week: 6, level: 'beginer', topicId: 'form-handling',
    titleId: 'Form Handling & Validasi', titleEn: 'Form Handling & Validation',
    programId: 'Form Registrasi', programEn: 'Registration Form',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
function sanitize(string $input): string {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

$errors = [];
$nama = $email = "";

if (true) {
    $input_nama = "  Budi Santoso  ";
    $input_email = "budi@example.com";

    $nama = sanitize($input_nama);
    $email = sanitize($input_email);

    if (empty($nama)) {
        $errors[] = "Nama wajib diisi";
    } elseif (strlen($nama) < 3) {
        $errors[] = "Nama minimal 3 karakter";
    }

    if (empty($email)) {
        $errors[] = "Email wajib diisi";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Format email tidak valid";
    }
}

echo "=== Hasil Validasi ===<br>";
if (empty($errors)) {
    echo "Registrasi berhasil!<br>";
    echo "Nama: $nama<br>";
    echo "Email: $email<br>";
} else {
    echo "Terjadi error:<br>";
    foreach ($errors as $error) {
        echo "- $error<br>";
    }
}

$password = "rahasia123";
$hashed = password_hash($password, PASSWORD_DEFAULT);
echo "<br>Password hash: " . substr($hashed, 0, 20) . "...<br>";
echo "Verify: " . (password_verify($password, $hashed ? "Valid" : "Invalid")) . "<br>";
>`,
    objectivesId: [
      'Superglobals: $_GET, $_POST, $_SERVER untuk data request',
      'Sanitasi input: htmlspecialchars, strip_tags, trim',
      'Validasi: empty, strlen, filter_var untuk email',
      'Password hashing: password_hash dan password_verify',
      'CSRF token dan keamanan form dasar',
    ],
    objectivesEn: [
      'Superglobals: $_GET, $_POST, $_SERVER for request data',
      'Input sanitization: htmlspecialchars, strip_tags, trim',
      'Validation: empty, strlen, filter_var for email',
      'Password hashing: password_hash and password_verify',
      'CSRF tokens and basic form security',
    ],
    explanationId: '### Superglobals\n\`$_POST\` data form POST, \`$_GET\` query string, \`$_SERVER\` info server.\n\n### Sanitasi\n\`trim()\` hapus spasi, \`strip_tags()\` hapus HTML, \`htmlspecialchars()\` escape XSS.\n\n### Validasi\n\`empty()\` cek kosong, \`strlen()\` panjang, \`filter_var($email, FILTER_VALIDATE_EMAIL)\`.\n\n### Password\n\`password_hash()\` dengan \`PASSWORD_DEFAULT\`. Verifikasi dengan \`password_verify()\`.',
    explanationEn: '### Superglobals\n\`$_POST\` form data, \`$_GET\` query string, \`$_SERVER\` server info.\n\n### Sanitization\n\`trim()\`, \`strip_tags()\`, \`htmlspecialchars()\` for XSS prevention.\n\n### Validation\n\`empty()\`, \`strlen()\`, \`filter_var()\` for email.\n\n### Passwords\n\`password_hash()\` with \`PASSWORD_DEFAULT\`. Verify with \`password_verify()\`.',
    experimentsId: [
      'Validasi dengan regex: preg_match untuk format khusus',
      'Buat fungsi validateRequired untuk multiple field',
      'Coba $_FILES untuk upload file',
      'Implementasikan CSRF token sederhana',
      'Gunakan filter_input untuk sanitasi otomatis',
    ],
    experimentsEn: [
      'Validate with regex: preg_match for custom formats',
      'Create validateRequired function for multiple fields',
      'Try $_FILES for file upload',
      'Implement simple CSRF token',
      'Use filter_input for automatic sanitization',
    ],
    challengeId: 'Buat form login lengkap: validasi email/username, password, remember me, dengan error messages per field.',
    challengeEn: 'Build a complete login form: email/username validation, password, remember me, with per-field error messages.',
    summaryId: 'Minggu 6 dari 12: **Form Handling & Validasi** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Keamanan PHP** (Intermediate).',
    summaryEn: 'Week 6 of 12: **Form Handling & Validation** (Level: Beginner). Beginner phase complete! Next week: **PHP Security** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 7-12) ──────────────────────────────────────────────
  {
    week: 7, level: 'intermediate', topicId: 'keamanan-php',
    titleId: 'Keamanan PHP', titleEn: 'PHP Security',
    programId: 'Security Check', programEn: 'Security Check',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
$user_input = '<script>alert("XSS")</script>Hello';
$safe = htmlspecialchars($user_input, ENT_QUOTES, 'UTF-8');
echo "XSS Safe: $safe<br>";

$search = "Budi";
$safe_search = urlencode($search);
echo "URL Safe: $safe_search<br>";

$email = "user@example.com";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email valid: $email<br>";
}

$age = "25";
if (filter_var($age, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1, "max_range" => 150]])) {
    echo "Age valid: $age<br>";
}

$ip = "192.168.1.1";
if (filter_var($ip, FILTER_VALIDATE_IP)) {
    echo "IP valid: $ip<br>";
}

$token = bin2hex(random_bytes(32));
echo "CSRF Token: " . substr($token, 0, 16) . "...<br>";

session_start();
$_SESSION['user_id'] = 123;
$_SESSION['token'] = $token;
echo "Session started: user_id=" . $_SESSION['user_id'] . "<br>";

$password = "user_password";
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
echo "Bcrypt: " . substr($hash, 0, 20) . "...<br>";
echo "Verify: " . (password_verify($password, $hash) ? "Valid" : "Invalid") . "<br>";
>`,
    objectivesId: [
      'XSS Prevention: htmlspecialchars untuk output encoding',
      'SQL Injection: prepared statements dan parameterized queries',
      'CSRF Protection: token generation dan validation',
      'Input Validation: filter_var dengan berbagai filter',
      'Session Security: session_start, regenerate_id, HTTP-only',
    ],
    objectivesEn: [
      'XSS Prevention: htmlspecialchars for output encoding',
      'SQL Injection: prepared statements and parameterized queries',
      'CSRF Protection: token generation and validation',
      'Input Validation: filter_var with various filters',
      'Session Security: session_start, regenerate_id, HTTP-only',
    ],
    explanationId: '### XSS Prevention\n\`htmlspecialchars()\` convert \`<>\` ke entity. Selalu escape output ke HTML.\n\n### SQL Injection\nPrepared statements: \`$pdo->prepare("SELECT * FROM u WHERE id = ?")\`. Jangan concatenate input ke query.\n\n### CSRF Token\nGenerate token random (random_bytes), simpan di session, validasi setiap POST request.\n\n### Session Security\n\`session_regenerate_id()\` setelah login. Set cookie HTTP-only dan Secure.',
    explanationEn: '### XSS Prevention\n\`htmlspecialchars()\` converts \`<>\` to entities. Always escape output.\n\n### SQL Injection\nPrepared statements with placeholders. Never concatenate input.\n\n### CSRF Tokens\nGenerate random tokens (random_bytes), store in session, validate on POST.\n\n### Session Security\n\`session_regenerate_id()\` after login. HTTP-only and Secure cookies.',
    experimentsId: [
      'Buat fungsi antiXSS untuk output aman',
      'Coba SQL injection pada query tidak aman vs prepared statement',
      'Implementasikan CSRF token di form',
      'Set cookie dengan setcookie() dan params aman',
      'Buat rate limiting sederhana dengan session',
    ],
    experimentsEn: [
      'Create antiXSS function for safe output',
      'Try SQL injection on unsafe query vs prepared statement',
      'Implement CSRF token in form',
      'Set cookie with setcookie() and secure params',
      'Create simple rate limiting with sessions',
    ],
    challengeId: 'Buat sistem login aman: CSRF token, password hash, session management, dan protection terhadap brute force.',
    challengeEn: 'Build a secure login system: CSRF token, password hashing, session management, and brute force protection.',
    summaryId: 'Minggu 7 dari 12: **Keamanan PHP** (Level: Menengah). Keamanan adalah prioritas produksi. Minggu depan: **PDO & Database**.',
    summaryEn: 'Week 7 of 12: **PHP Security** (Level: Intermediate). Security is a production priority. Next week: **PDO & Database**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'pdo-database',
    titleId: 'PDO & Database', titleEn: 'PDO & Database',
    programId: 'CRUD Database', programEn: 'Database CRUD',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== PDO Database Simulation ===<br><br>";

$users = [
    ["id" => 1, "nama" => "Budi", "email" => "budi@example.com"],
    ["id" => 2, "nama" => "Siti", "email" => "siti@example.com"],
    ["id" => 3, "nama" => "Andi", "email" => "andi@example.com"],
];

echo "SELECT * FROM users<br>";
foreach ($users as $user) {
    echo "  {$user['id']}: {$user['nama']} ({$user['email']})<br>";
}

echo "<br>SELECT WHERE id = 1<br>";
$found = null;
foreach ($users as $u) {
    if ($u['id'] == 1) { $found = $u; break; }
}
echo "  Found: {$found['nama']}<br>";

echo "<br>INSERT INTO users<br>";
$newId = max(array_column($users, 'id')) + 1;
$users[] = ["id" => $newId, "nama" => "Dewi", "email" => "dewi@example.com"];
echo "  Added: Dewi (id: $newId)<br>";

echo "<br>UPDATE users SET nama WHERE id = 2<br>";
foreach ($users as &$u) {
    if ($u['id'] == 2) { $u['nama'] = "Siti Updated"; break; }
}
echo "  Updated: id=2 nama=Siti Updated<br>";

echo "<br>DELETE FROM users WHERE id = 3<br>";
$users = array_filter($users, fn($u) => $u['id'] != 3);
$users = array_values($users);
echo "  Remaining: " . count($users) . " users<br><br>";

echo "=== PDO Connection String ===<br>";
$dsn = "mysql:host=localhost;dbname=myapp;charset=utf8mb4";
echo "DSN: $dsn<br>";
echo "Options: PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION<br>";
echo "Options: PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC<br>";
>`,
    objectivesId: [
      'PDO: PHP Data Object untuk akses database universal',
      'Connection: DSN string, username, password, options',
      'Prepared Statements: prepare, bindParam, execute',
      'CRUD Operations: SELECT, INSERT, UPDATE, DELETE',
      'Error handling: PDO::ERRMODE_EXCEPTION dan try-catch',
    ],
    objectivesEn: [
      'PDO: PHP Data Object for universal database access',
      'Connection: DSN string, username, password, options',
      'Prepared Statements: prepare, bindParam, execute',
      'CRUD Operations: SELECT, INSERT, UPDATE, DELETE',
      'Error handling: PDO::ERRMODE_EXCEPTION and try-catch',
    ],
    explanationId: '### PDO Connection\n\`new PDO($dsn, $user, $pass, $options)\`. DSN: \`mysql:host=localhost;dbname=test\`.\n\n### Prepared Statements\n\`$stmt = $pdo->prepare("SELECT * FROM u WHERE id = :id")\`. Bind: \`->bindParam(\':id\', $id)\`.\n\n### CRUD\n\`query()\` untuk SELECT, \`exec()\` untuk INSERT/UPDATE/DELETE. \`fetch()\` untuk result.\n\n### Error Mode\n\`PDO::ERRMODE_EXCEPTION\` untuk throw exception saat error.',
    explanationEn: '### PDO Connection\n\`new PDO($dsn, $user, $pass, $options)\`. DSN: \`mysql:host=localhost;dbname=test\`.\n\n### Prepared Statements\n\`$pdo->prepare()\` with named params. \`bindParam()\` to bind.\n\n### CRUD\n\`query()\` for SELECT, \`exec()\` for INSERT/UPDATE/DELETE.\n\n### Error Mode\n\`PDO::ERRMODE_EXCEPTION\` throws exceptions on errors.',
    experimentsId: [
      'Buat class Database wrapper untuk PDO',
      'Coba fetchAll() vs fetch() per row',
      'Implementasikan transaction dengan beginTransaction',
      'Buat pagination dengan LIMIT dan OFFSET',
      'Gunakan PDO::FETCH_CLASS untuk map ke object',
    ],
    experimentsEn: [
      'Create Database wrapper class for PDO',
      'Try fetchAll() vs fetch() per row',
      'Implement transactions with beginTransaction',
      'Create pagination with LIMIT and OFFSET',
      'Use PDO::FETCH_CLASS to map to objects',
    ],
    challengeId: 'Buat CRUD app lengkap: users table dengan PDO, prepared statements, pagination, search, dan error handling.',
    challengeEn: 'Build a complete CRUD app: users table with PDO, prepared statements, pagination, search, and error handling.',
    summaryId: 'Minggu 8 dari 12: **PDO & Database** (Level: Menengah). Database adalah backbone aplikasi. Minggu depan: **Composer & Autoloading**.',
    summaryEn: 'Week 8 of 12: **PDO & Database** (Level: Intermediate). Database is the application backbone. Next week: **Composer & Autoloading**.',
  },
  {
    week: 9, level: 'intermediate', topicId: 'composer-autoloading',
    titleId: 'Composer & Autoloading', titleEn: 'Composer & Autoloading',
    programId: 'Dependency Manager', programEn: 'Dependency Manager',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== Composer Autoload Simulation ===<br><br>";

spl_autoload_register(function ($class) {
    $prefix = "App\\\\";
    $baseDir = __DIR__ . "/src/";

    if (strpos($class, $prefix) === 0) {
        $relative = str_replace("\\\\", "/", substr($class, strlen($prefix)));
        $file = $baseDir . $relative . ".php";
        echo "Loading: $class -> $file<br>";
    }
});

echo "Autoload registered for App\\\\ namespace<br><br>";

echo "=== Namespace Simulation ===<br>";

namespace App\\Models {
    class User {
        public string $name;
        public function __construct(string $name) {
            $this->name = $name;
        }
        public function greet(): string {
            return "Hello, {$this->name}!";
        }
    }
}

namespace App\\Services {
    class UserService {
        private array $users = [];
        public function add(string $name): void {
            $this->users[] = $name;
        }
        public function list(): array {
            return $this->users;
        }
    }
}

namespace {
    $service = new \\App\\Services\\UserService();
    $service->add("Budi");
    $service->add("Siti");
    $service->add("Andi");

    echo "Users: " . implode(", ", $service->list()) . "<br>";

    $user = new \\App\\Models\\User("Budi");
    echo $user->greet() . "<br>";

    echo "<br>=== Composer Commands ===<br>";
    echo "composer init — buat composer.json<br>";
    echo "composer install — install dependencies<br>";
    echo "composer dump-autoload — regenerate autoload<br>";
}
>`,
    objectivesId: [
      'Composer: dependency manager untuk PHP',
      'composer.json: konfigurasi project dan dependencies',
      'Autoloading: PSR-4 standard dan spl_autoload_register',
      'Namespace: organisasi class dengan use dan as',
      'Composer commands: init, install, require, dump-autoload',
    ],
    objectivesEn: [
      'Composer: dependency manager for PHP',
      'composer.json: project configuration and dependencies',
      'Autoloading: PSR-4 standard and spl_autoload_register',
      'Namespaces: organize classes with use and as',
      'Composer commands: init, install, require, dump-autoload',
    ],
    explanationId: '### Composer\nDependency manager PHP. \`composer.json\` define dependencies. \`vendor/\` untuk installed packages.\n\n### PSR-4 Autoloading\nNamespace map ke folder: \`App\\` => \`src/\`. \`composer dump-autoload\` regenerate.\n\n### Namespace\n\`namespace App\\Models\` deklarasi. \`use App\\Models\\User\` import. \`as\` untuk alias.\n\n### Commands\n\`composer init\` buat config, \`composer require pkg\` tambah dependency.',
    explanationEn: '### Composer\nPHP dependency manager. \`composer.json\` defines deps. \`vendor/\` for installed packages.\n\n### PSR-4 Autoloading\nNamespace maps to folder: \`App\\` => \`src/\`. \`composer dump-autoload\` regenerates.\n\n### Namespaces\n\`namespace App\\Models\` declaration. \`use App\\Models\\User\` import. \`as\` for alias.\n\n### Commands\n\`composer init\` for config, \`composer require pkg\` to add dependency.',
    experimentsId: [
      'Buat 3 file dengan namespace berbeda dan autoload',
      'Coba use dan as untuk alias namespace',
      'Buat composer.json dengan PSR-4 autoload',
      'Install package via composer (simulasi)',
      'Buat interface dan implement di namespace berbeda',
    ],
    experimentsEn: [
      'Create 3 files with different namespaces and autoload',
      'Try use and as for namespace alias',
      'Create composer.json with PSR-4 autoload',
      'Install package via composer (simulation)',
      'Create interface and implementation in different namespaces',
    ],
    challengeId: 'Buat aplikasi kecil dengan struktur MVC: namespace App\\Controllers, App\\Models, App\\Views. Gunakan autoloading.',
    challengeEn: 'Build a small app with MVC structure: namespace App\\Controllers, App\\Models, App\\Views. Use autoloading.',
    summaryId: 'Minggu 9 dari 12: **Composer & Autoloading** (Level: Menengah). Modern PHP development. Minggu depan: **Testing dengan PHPUnit**.',
    summaryEn: 'Week 9 of 12: **Composer & Autoloading** (Level: Intermediate). Modern PHP development. Next week: **Testing with PHPUnit**.',
  },
  {
    week: 10, level: 'intermediate', topicId: 'testing-phpunit',
    titleId: 'Testing dengan PHPUnit', titleEn: 'Testing with PHPUnit',
    programId: 'Unit Test', programEn: 'Unit Test',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== PHPUnit Test Simulation ===<br><br>";

class Calculator {
    public function add($a, $b) { return $a + $b; }
    public function divide($a, $b) {
        if ($b == 0) throw new \\InvalidArgumentException("Cannot divide by zero");
        return $a / $b;
    }
    public function isEven($n) { return $n % 2 == 0; }
}

$calc = new Calculator();

$tests = [
    ["add(2,3)", $calc->add(2,3), 5],
    ["add(-1,1)", $calc->add(-1,1), 0],
    ["add(0,0)", $calc->add(0,0), 0],
    ["divide(10,2)", $calc->divide(10,2), 5],
    ["divide(7,2)", $calc->divide(7,2), 3.5],
    ["isEven(4)", $calc->isEven(4), true],
    ["isEven(7)", $calc->isEven(7), false],
];

$passed = 0;
$failed = 0;
foreach ($tests as [$name, $actual, $expected]) {
    if ($actual === $expected) {
        echo "PASS: $name = $actual<br>";
        $passed++;
    } else {
        echo "FAIL: $name (expected $expected, got $actual)<br>";
        $failed++;
    }
}

echo "<br>=== Exception Test ===<br>";
try {
    $calc->divide(5, 0);
    echo "FAIL: expected exception<br>";
    $failed++;
} catch (\\InvalidArgumentException $e) {
    echo "PASS: exception thrown: {$e->getMessage()}<br>";
    $passed++;
}

echo "<br>=== Results ===<br>";
echo "Passed: $passed, Failed: $failed<br>";
echo "Total: " . ($passed + $failed) . " tests<br>";
>`,
    objectivesId: [
      'PHPUnit: framework testing untuk PHP',
      'Test structure: class extends TestCase, method testXxx',
      'Assertions: assertEquals, assertTrue, assertContains',
      'Exception testing: expectException dan try-catch',
      'Test runner: vendor/bin/phpunit dan code coverage',
    ],
    objectivesEn: [
      'PHPUnit: testing framework for PHP',
      'Test structure: class extends TestCase, method testXxx',
      'Assertions: assertEquals, assertTrue, assertContains',
      'Exception testing: expectException and try-catch',
      'Test runner: vendor/bin/phpunit and code coverage',
    ],
    explanationId: '### PHPUnit Setup\n\`composer require --dev phpunit/phpunit\`. Test class extends \`PHPUnit\\Framework\\TestCase\`.\n\n### Test Method\nPrefix \`test\`: \`public function testAdd()\`. Atau annotation \`@test\`.\n\n### Assertions\n\`assertEquals($expected, $actual)\`, \`assertTrue($cond)\`, \`assertContains($needle, $haystack)\`.\n\n### Exception Test\n\`$this->expectException(\\InvalidArgumentException::class)\`.\n\n### Run Tests\n\`vendor/bin/phpunit tests/\`. \`--coverage-html\` untuk coverage report.',
    explanationEn: '### PHPUnit Setup\n\`composer require --dev phpunit/phpunit\`. Test class extends \`TestCase\`.\n\n### Test Methods\nPrefix \`test\`: \`public function testAdd()\`.\n\n### Assertions\n\`assertEquals()\`, \`assertTrue()\`, \`assertContains()\`.\n\n### Exception Testing\n\`$this->expectException()\`.\n\n### Running Tests\n\`vendor/bin/phpunit tests/\`. \`--coverage-html\` for coverage.',
    experimentsId: [
      'Buat test dengan data provider: @dataProvider',
      'Coba mock object dengin createMock',
      'Buat test dengan setUp dan tearDown',
      'Test dengan multiple assertions',
      'Buat integration test dengan database',
    ],
    experimentsEn: [
      'Create test with data provider: @dataProvider',
      'Try mock objects with createMock',
      'Create test with setUp and tearDown',
      'Test with multiple assertions',
      'Create integration test with database',
    ],
    challengeId: 'Buat test suite lengkap untuk class User: registration validation, email format, password strength. Min 10 test cases.',
    challengeEn: 'Build a complete test suite for User class: registration validation, email format, password strength. Min 10 test cases.',
    summaryId: 'Minggu 10 dari 12: **Testing dengan PHPUnit** (Level: Menengah). Kualitas kode terjamin. Minggu depan: **Design Patterns**.',
    summaryEn: 'Week 10 of 12: **Testing with PHPUnit** (Level: Intermediate). Code quality guaranteed. Next week: **Design Patterns**.',
  },
  {
    week: 11, level: 'intermediate', topicId: 'design-patterns',
    titleId: 'Design Patterns', titleEn: 'Design Patterns',
    programId: 'Pattern Implementation', programEn: 'Pattern Implementation',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== Design Patterns in PHP ===<br><br>";

interface PaymentMethod {
    public function pay(float $amount): string;
}

class CreditCard implements PaymentMethod {
    public function pay(float $amount): string {
        return "Paid Rp" . number_format($amount, 0) . " via Credit Card";
    }
}

class PayPal implements PaymentMethod {
    public function pay(float $amount): string {
        return "Paid Rp" . number_format($amount, 0) . " via PayPal";
    }
}

class PaymentProcessor {
    public function process(PaymentMethod $method, float $amount): string {
        return $method->pay($amount);
    }
}

$processor = new PaymentProcessor();
echo $processor->process(new CreditCard(), 500000) . "<br>";
echo $processor->process(new PayPal(), 300000) . "<br>";

class Database {
    private static ?Database $instance = null;
    private function __construct() {}
    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
    public function query(string $sql): string {
        return "Executing: $sql";
    }
}

$db1 = Database::getInstance();
$db2 = Database::getInstance();
echo "<br>Singleton same? " . ($db1 === $db2 ? "Yes" : "No") . "<br>";
echo $db1->query("SELECT * FROM users") . "<br>";

interface Logger {
    public function log(string $msg): void;
}

class FileLogger implements Logger {
    public function log(string $msg): void {
        echo "File: [$msg]<br>";
    }
}

class App {
    private Logger $logger;
    public function __construct(Logger $logger) {
        $this->logger = $logger;
    }
    public function run(): void {
        $this->logger->log("App started");
        $this->logger->log("Processing...");
        $this->logger->log("App finished");
    }
}

$app = new App(new FileLogger());
$app->run();
>`,
    objectivesId: [
      'Strategy Pattern: interface + multiple implementations',
      'Singleton Pattern: single instance dengan static property',
      'Dependency Injection: inject dependency via constructor',
      'Factory Pattern: object creation terpusat',
      'Observer Pattern: event-driven architecture',
    ],
    objectivesEn: [
      'Strategy Pattern: interface + multiple implementations',
      'Singleton Pattern: single instance with static property',
      'Dependency Injection: inject dependency via constructor',
      'Factory Pattern: centralized object creation',
      'Observer Pattern: event-driven architecture',
    ],
    explanationId: '### Strategy Pattern\nInterface + multiple class implement. Client pilih strategy saat runtime.\n\n### Singleton\nPrivate constructor, \`getInstance()\` static. Pastikan satu instance global.\n\n### Dependency Injection\nInject dependency lewat constructor, bukan buat di dalam class.\n\n### Factory Pattern\nSatu class/fungsi untuk buat object kompleks. Client tidak perlu tahu detail.\n\n### Observer\nSubject maintain list notifier. Event terjadi → semua observer notified.',
    explanationEn: '### Strategy Pattern\nInterface + multiple implementations. Client picks strategy at runtime.\n\n### Singleton\nPrivate constructor, static \`getInstance()\`. Ensures single global instance.\n\n### Dependency Injection\nInject dependencies via constructor, don\'t create inside class.\n\n### Factory Pattern\nSingle class/function to create complex objects.\n\n### Observer\nSubject maintains notifier list. Event fires → all observers notified.',
    experimentsId: [
      'Buat Factory Pattern untuk PaymentMethod',
      'Implementasikan Observer dengan SplSubject/SplObserver',
      'Coba Decorator Pattern untuk Logger',
      'Buat Repository Pattern untuk database access',
      'Implementasikan Chain of Responsibility',
    ],
    experimentsEn: [
      'Create Factory Pattern for PaymentMethod',
      'Implement Observer with SplSubject/SplObserver',
      'Try Decorator Pattern for Logger',
      'Create Repository Pattern for database access',
      'Implement Chain of Responsibility',
    ],
    challengeId: 'Buat aplikasi e-commerce kecil dengan: Strategy (payment methods), Singleton (database), Factory (product creation), DI (service container).',
    challengeEn: 'Build a small e-commerce app with: Strategy (payment methods), Singleton (database), Factory (product creation), DI (service container).',
    summaryId: 'Minggu 11 dari 12: **Design Patterns** (Level: Menengah). Arsitektur kode profesional. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **Design Patterns** (Level: Intermediate). Professional code architecture. Next week: **Capstone Project**!',
  },
  {
    week: 12, level: 'intermediate', topicId: 'capstone-project',
    titleId: 'Capstone: Aplikasi Blog', titleEn: 'Capstone: Blog Application',
    programId: 'Blog System', programEn: 'Blog System',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== Capstone: Blog Application ===<br><br>";

class BlogPost {
    public int $id;
    public string $title;
    public string $content;
    public string $author;
    public string $created_at;

    public function __construct(int $id, string $title, string $content, string $author) {
        $this->id = $id;
        $this->title = $title;
        $this->content = $content;
        $this->author = $author;
        $this->created_at = date("Y-m-d H:i:s");
    }

    public function excerpt(int $len = 100): string {
        return strlen($this->content) > $len
            ? substr($this->content, 0, $len) . "..."
            : $this->content;
    }
}

class BlogRepository {
    private array $posts = [];
    private int $nextId = 1;

    public function create(string $title, string $content, string $author): BlogPost {
        $post = new BlogPost($this->nextId++, $title, $content, $author);
        $this->posts[] = $post;
        return $post;
    }

    public function find(int $id): ?BlogPost {
        foreach ($this->posts as $p) {
            if ($p->id === $id) return $p;
        }
        return null;
    }

    public function all(): array {
        return array_reverse($this->posts);
    }

    public function delete(int $id): bool {
        foreach ($this->posts as $i => $p) {
            if ($p->id === $id) {
                array_splice($this->posts, $i, 1);
                return true;
            }
        }
        return false;
    }

    public function search(string $query): array {
        return array_filter($this->posts, fn($p) =>
            stripos($p->title, $query) !== false ||
            stripos($p->content, $query) !== false
        );
    }
}

$blog = new BlogRepository();
$blog->create("Belajar PHP", "PHP adalah bahasa server-side yang populer...", "Budi");
$blog->create("OOP di PHP", "Object-Oriented Programming di PHP...", "Siti");
$blog->create("Keamanan Web", "XSS, CSRF, dan SQL Injection...", "Budi");

echo "=== All Posts ===<br>";
foreach ($blog->all() as $post) {
    echo "<b>{$post->title}</b> by {$post->author}<br>";
    echo $post->excerpt(50) . "<br><br>";
}

echo "=== Search: PHP ===<br>";
$results = $blog->search("PHP");
foreach ($results as $post) {
    echo "- {$post->title}<br>";
}
echo "<br>Found: " . count($results) . " posts<br>";
>`,
    objectivesId: [
      'Menggabungkan semua konsep: OOP, PDO, Composer, Testing',
      'Repository Pattern: pemisahan data access dan business logic',
      'CRUD lengkap: Create, Read, Update, Delete dengan validasi',
      'Search functionality dengan filtering',
      'Clean architecture: separation of concerns',
    ],
    objectivesEn: [
      'Combine all concepts: OOP, PDO, Composer, Testing',
      'Repository Pattern: separate data access and business logic',
      'Full CRUD: Create, Read, Update, Delete with validation',
      'Search functionality with filtering',
      'Clean architecture: separation of concerns',
    ],
    explanationId: '### Repository Pattern\nPemisahan data access (query DB) dan business logic (validasi, transformasi).\n\n### CRUD Lengkap\nCreate: validasi input, insert. Read: fetch single/all. Update: find + modify. Delete: find + remove.\n\n### Search\nFilter posts berdasarkan title/content dengan \`stripos\` (case-insensitive).\n\n### Architecture\nController (handle request) → Service (business logic) → Repository (data access).',
    explanationEn: '### Repository Pattern\nSeparate data access (DB queries) and business logic (validation, transformation).\n\n### Full CRUD\nCreate: validate input, insert. Read: fetch single/all. Update: find + modify. Delete: find + remove.\n\n### Search\nFilter posts by title/content with \`stripos\` (case-insensitive).\n\n### Architecture\nController (handle request) → Service (business logic) → Repository (data access).',
    experimentsId: [
      'Tambah method Update untuk BlogPost',
      'Implementasikan pagination untuk list posts',
      'Buat kategori dan tagging system',
      'Tambah comment system dengan relasi',
      'Buat API endpoint untuk blog posts',
    ],
    experimentsEn: [
      'Add Update method for BlogPost',
      'Implement pagination for post listing',
      'Create category and tagging system',
      'Add comment system with relations',
      'Create API endpoint for blog posts',
    ],
    challengeId: 'Buat aplikasi blog lengkap: CRUD posts, kategori, komentar, search, pagination. Gunakan semua konsep yang dipelajari.',
    challengeEn: 'Build a complete blog application: CRUD posts, categories, comments, search, pagination. Use all concepts learned.',
    summaryId: 'Minggu 12 dari 12: **Capstone: Aplikasi Blog** (Level: Menengah). Selesai! 🎉 Anda sudah menguasai PHP dari dasar hingga produksi.',
    summaryEn: 'Week 12 of 12: **Capstone: Blog Application** (Level: Intermediate). Complete! 🎉 You\'ve mastered PHP from basics to production.',
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
