import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/php', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PKG = (name, extraRequire = '', extraDev = '') => `{
    "name": "tryngo/${name}",
    "type": "project",
    "require": { "php": "^8.2"${extraRequire ? `,\n        ${extraRequire}` : ''} },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "phpunit/phpunit": "^11.0"${extraDev ? `,\n        ${extraDev}` : ''}
    },
    "autoload": { "psr-4": { "App\\": "src/" } },
    "minimum-stability": "stable",
    "prefer-stable": true
}
`;

const PKG_NODE = (name, dev) => `{
  "name": "${name}",
  "version": "1.0.0",
  "private": true,
  "scripts": { "dev": "${dev}" }
}
`;

const DEV_SERVE = 'php -S 0.0.0.0:3000';

const LESSONS = [
  {
    num: 1, topicId: 'pengenalan-php',
    titleId: 'Pengenalan PHP & Sintaks', titleEn: 'Introduction to PHP & Syntax',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\necho "Hello, Tryngo!";\n`,
      'composer.json': PKG('pengenalan-php'),
      'package.json': PKG_NODE('php-lesson-1', DEV_SERVE),
      'README.md': `# PHP Lesson 1 - Introduction\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Memahami posisi PHP: bahasa scripting server-side yang populer', 'Mengenal struktur file PHP (tag pembuka, kode, tag penutup)', 'Menjalankan PHP via built-in server dan melihat output di browser', 'Memahami perbedaan PHP dengan HTML: PHP diproses di server'],
    objEn: ['Understand PHP: the popular server-side scripting language', 'Learn the PHP file structure (opening tag, code, closing tag)', 'Run PHP via the built-in server and view output in the browser', 'Understand the difference between PHP (server-side) and HTML (client-side)'],
    expId: `## Sintaks Dasar\nSetiap file PHP dimulai dengan \`<?php\` dan diakhiri dengan \`?>\`. Kode di antara tag tersebut dieksekusi oleh server. \`echo\` mencetak teks ke output HTML.\n## Tag Pembuka & Penutup\n\`<?php\` wajib untuk setiap blok kode PHP. \`?>\` opsional — jika file hanya berisi PHP, penutup bisa dihilangkan.\n## Menjalankan PHP\n\`php -S 0.0.0.0:3000\` menjalankan server development bawaan PHP. Buka http://localhost:3000.`,
    expEn: `## Basic Syntax\nEvery PHP file starts with \`<?php\` and ends with \`?>\`. Code between those tags is executed by the server. \`echo\` prints text to HTML output.\n## Opening & Closing Tags\n\`<?php\` is required for every PHP code block. \`?>\` is optional — omitting it avoids accidental whitespace in output.\n## Running PHP\n\`php -S 0.0.0.0:3000\` starts PHP's built-in development server. Open http://localhost:3000.`,
    chId: 'Eksplorasi: (1) ubah "Hello, Tryngo!" menjadi "Selamat datang di PHP!" dengan variabel $selamat, (2) tambah 3 baris echo untuk mencetak nama, umur, dan kota Anda, (3) coba hapus tag penutup ?> dan amati apakah output berubah, (4) tambahkan komentar // di atas setiap echo.',
    chEn: 'Explore: (1) change "Hello, Tryngo!" to "Selamat datang di PHP!" using a $selamat variable, (2) add 3 echo lines printing your name, age, and city, (3) try removing the closing tag ?> and observe whether output changes, (4) add // comments above each echo.',
    sumId: 'echo = cetak output. <?php = tag pembuka. Server = PHP diproses di server. Lanjut: variabel & tipe data.',
    sumEn: 'echo = print output. <?php = opening tag. Server = PHP runs server-side. Next: variables & types.',
  },
  {
    num: 2, topicId: 'variabel-tipe',
    titleId: 'Variabel, Tipe Data & Type Casting', titleEn: 'Variables, Types & Type Casting',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\n$nama = "Tryngo";\n$umur = 25;\n$harga = 19999.50;\n$aktif = true;\n\nvar_dump($nama);\nvar_dump($umur);\nvar_dump($harga);\nvar_dump($aktif);\n`,
      'composer.json': PKG('variabel-tipe'),
      'package.json': PKG_NODE('php-lesson-2', DEV_SERVE),
      'README.md': `# PHP Lesson 2 - Variables & Types\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\nPerhatikan output var_dump — menunjukkan tipe dan nilai setiap variabel.\n`,
    },
    objId: ['Membuat variabel dengan $ dan memahami aturan penamaan', 'Mengenal tipe data: string, integer, float, boolean', 'Menggunakan var_dump() untuk debug tipe variabel', 'Memahami type juggling dan type casting eksplisit'],
    objEn: ['Create variables with $ and understand naming rules', 'Learn data types: string, integer, float, boolean', 'Use var_dump() to debug variable types', 'Understand type juggling and explicit type casting'],
    expId: `## Variabel: Simpan Data\nVariabel PHP diawali $ (contoh: $nama). Nama variabel dimulai huruf atau _, diikuti huruf/angka/_. PHP tidak mendeklarasikan tipe variabel — tipe ditentukan otomatis berdasarkan nilai yang diberikan (type juggling).\n## Tipe Data Primitif\nstring = teks ("Hello"), integer = bilangan bulat (25), float = bilangan desimal (19999.50), boolean = true/false.\n## var_dump(): Debug Tipe\nvar_dump($variabel) mencetak tipe DAN nilai variabel. Berguna untuk memastikan data bertipe sesuai harapan.\n## Type Casting\n(int) "25" → integer 25. (string) 25 → "25". (bool) 0 → false, (bool) "hello" → true. Cast eksplisit mengubah tipe dengan aman.`,
    expEn: `## Variables: Store Data\nPHP variables start with $ (e.g., $nama). Variable names start with a letter or _, followed by letters/numbers/_. PHP does not declare variable types — the type is determined automatically from the assigned value (type juggling).\n## Primitive Types\nstring = text ("Hello"), integer = whole number (25), float = decimal number (19999.50), boolean = true/false.\n## var_dump(): Debug Types\nvar_dump($variable) prints both the type AND value of a variable. Useful for ensuring data has the expected type.\n## Type Casting\n(int) "25" → integer 25. (string) 25 → "25". (bool) 0 → false, (bool) "hello" → true. Explicit casts safely change types.`,
    chId: 'Latih variabel: (1) buat 3 variabel: $nama (string), $nilai (integer), $lulus (boolean), lalu cetak dengan echo "Nama: $nama, Nilai: $nilai, Lulus: " . ($lulus ? "Ya" : "Tidak"), (2) ubah $nilai dari string "90" ke integer dengan (int), (3) coba jumlahkan string "5" + integer 3 dan amati hasilnya dengan var_dump, (4) buat variabel $harga = 50000 lalu cetak dengan number_format($harga, 0, ",", ".") untuk format Rupiah.',
    chEn: 'Practice variables: (1) create 3 variables: $nama (string), $nilai (integer), $lulus (boolean), then print with echo "Name: $nama, Score: $nilai, Pass: " . ($lulus ? "Yes" : "No"), (2) convert $nilai from string "90" to integer with (int), (3) try adding string "5" + integer 3 and observe the result with var_dump, (4) create $harga = 50000 and print with number_format($harga, 0, ",", ".") for Rupiah formatting.',
    sumId: 'Variabel = simpan data. var_dump = debug tipe. Type casting = ubah tipe. Lanjut: string & array.',
    sumEn: 'Variables = store data. var_dump = debug types. Type casting = change types. Next: strings & arrays.',
  },
  {
    num: 3, topicId: 'string-array',
    titleId: 'String & Array', titleEn: 'Strings & Arrays',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\n$nama = "Tryngo";\n$pesan = "Halo, $nama!";\n$panjang = strlen($nama);\n$upper = strtoupper($nama);\n\n$buah = ["apel", "jeruk", "mangga"];\n$buah[] = "pisang";\n\nforeach ($buah as $b) {\n    echo $b . "\\n";\n}\n\n$data = ["nama" => "Budi", "umur" => 25];\necho $data["nama"];\n`,
      'composer.json': PKG('string-array'),
      'package.json': PKG_NODE('php-lesson-3', DEV_SERVE),
      'README.md': `# PHP Lesson 3 - Strings & Arrays\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Menguasai fungsi string: strlen, strtoupper, substr, strpos', 'Membuat dan mengakses array indexed & associative', 'Menambahkan elemen array dengan [] dan foreach untuk iterasi', 'Memahami perbedaan string interpolation dengan concatenation (.)'],
    objEn: ['Master string functions: strlen, strtoupper, substr, strpos', 'Create and access indexed & associative arrays', 'Add elements with [] and iterate with foreach', 'Understand string interpolation vs concatenation (.)'],
    expId: `## String Functions\nstrlen($s) = panjang string. strtoupper/strtolower = ubah huruf besar/kecil. substr($s, 0, 5) = potong 5 karakter pertama. strpos($s, "Tryngo") = posisi substring (atau false jika tidak ditemukan).\n## Array: Daftar Terurut\n$arr = ["a", "b", "c"] — array indexed (kunci 0, 1, 2). $arr[] = "d" — tambah elemen di akhir. count($arr) = jumlah elemen. foreach ($arr as $val) — loop tanpa kunci. foreach ($arr as $k => $v) — loop dengan kunci.\n## Array Asosiatif\n$data = ["nama" => "Budi", "umur" => 25] — kunci string, bukan angka. Akses: $data["nama"]. Cocok untuk menyimpan record sebagai array PHP biasa.\n## Interpolasi vs Concatenation\n"Halo, $nama!" — PHP mengganti $nama di dalam double-quoted string. 'Halo, $nama!' — di single-quoted string, $nama TIDAK diganti (literal). Untuk objek/properti: "Nama: " . $user->nama (concatenation) atau "Nama: {$user->nama}" (interpolasi kurung kurawal).`,
    expEn: `## String Functions\nstrlen($s) = string length. strtoupper/strtolower = upper/lower case. substr($s, 0, 5) = first 5 chars. strpos($s, "Tryngo") = substring position (or false).\n## Arrays: Ordered Lists\n$arr = ["a", "b", "c"] — indexed array (keys 0, 1, 2). $arr[] = "d" — append. count($arr) = element count. foreach ($arr as $val) — loop without keys. foreach ($arr as $k => $v) — loop with keys.\n## Associative Arrays\n$data = ["nama" => "Budi", "umur" => 25] — string keys, not numbers. Access: $data["nama"]. Great for storing records as plain PHP arrays.\n## Interpolation vs Concatenation\n"Halo, $nama!" — PHP replaces $nama inside double-quoted strings. 'Halo, $nama!' — inside single-quoted strings, $nama is NOT replaced (literal). For object properties: "Nama: " . $user->nama (concatenation) or "Nama: {$user->nama}" (curly-brace interpolation).`,
    chId: 'Kembangkan string & array: (1) buat array $siswa dengan 3 nama, lalu cetak "Selamat datang, [nama]!" untuk setiap siswa menggunakan foreach, (2) buat string $kalimat = "Belajar PHP itu menyenangkan" dan gunakan strpos untuk mencari posisi kata "menyenangkan", (3) buat array asosiatif $mobil dengan kunci "merk", "tahun", "warna" lalu cetak semua nilainya, (4) ubah semua huruf di $kalimat menjadi uppercase dengan strtoupper dan cetak.',
    chEn: 'Expand strings & arrays: (1) create a $siswa array with 3 names, then print "Welcome, [name]!" for each student using foreach, (2) create $kalimat = "Belajar PHP itu menyenangkan" and use strpos to find the position of "menyenangkan", (3) create an associative $mobil array with keys "merk", "tahun", "warna" then print all values, (4) convert all letters in $kalimat to uppercase with strtoupper and print.',
    sumId: 'String = fungsi manipulasi teks. Array = daftar terurut & asosiatif. foreach = iterasi. Lanjut: control flow.',
    sumEn: 'Strings = text manipulation functions. Arrays = ordered & associative lists. foreach = iteration. Next: control flow.',
  },
  {
    num: 4, topicId: 'control-flow',
    titleId: 'Control Flow: if, Loop, Match', titleEn: 'Control Flow: if, Loops, Match',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\n$nilai = 85;\n\nif ($nilai >= 90) {\n    echo "A";\n} elseif ($nilai >= 80) {\n    echo "B";\n} elseif ($nilai >= 70) {\n    echo "C";\n} else {\n    echo "D";\n}\n\nfor ($i = 1; $i <= 5; $i++) {\n    echo "Perulangan ke-$i\\n";\n}\n\n$hari = 3;\nswitch ($hari) {\n    case 1: echo "Senin"; break;\n    case 2: echo "Selasa"; break;\n    default: echo "Hari lain";\n}\n\n$status = $nilai >= 70 ? "Lulus" : "Tidak Lulus";\necho $status;\n`,
      'composer.json': PKG('control-flow'),
      'package.json': PKG_NODE('php-lesson-4', DEV_SERVE),
      'README.md': `# PHP Lesson 4 - Control Flow\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Menggunakan if/elseif/else untuk pengambilan keputusan', 'Menguasai perulangan for dan foreach', 'Menggunakan switch untuk beberapa kondisi', 'Memahami ternary operator untuk kondisi singkat'],
    objEn: ['Use if/elseif/else for decision-making', 'Master for and foreach loops', 'Use switch for multiple conditions', 'Understand the ternary operator for concise conditions'],
    expId: `## if/elseif/else: Cabang Kondisi\nif ($kondisi) { ... } menjalankan blok jika benar. elseif menambah cabang. else untuk semua kasus lain. Kondisi menghasilkan boolean: perbandingan (>=, ===, !=), fungsi (empty, isset), ekspresi.\n## for & foreach: Perulangan\nfor ($i = 1; $i <= 5; $i++) — ulangi dengan counter. foreach ($arr as $val) — ulangi setiap elemen array. foreach ($arr as $k => $v) — dengan kunci. break keluar dari loop; continue lanjut ke iterasi berikutnya.\n## switch: Banyak Cabang\nswitch ($nilai) { case 1: ... break; ... default: ... } — lebih rapi dari if/elseif bertumpuk. break wajib di setiap case (atau gunakan return). default untuk kasus tak cocok.\n## Ternary & Null Coalescing\n$status = $nilai >= 70 ? "Lulus" : "Tidak Lulus" — if/else satu baris. $nama = $_GET['nama'] ?? 'Tamu' — null coalescing: gunakan kanan jika kiri null/undefined. Operator ?? sangat berguna untuk input GET/POST.`,
    expEn: `## if/elseif/else: Conditional Branching\nif ($condition) { ... } runs the block if true. elseif adds branches. else for everything else. Conditions produce booleans: comparisons (>=, ===, !=), functions (empty, isset), expressions.\n## for & foreach: Loops\nfor ($i = 1; $i <= 5; $i++) — repeat with a counter. foreach ($arr as $val) — repeat for each element. foreach ($arr as $k => $v) — with keys. break exits the loop; continue skips to the next iteration.\n## switch: Multiple Branches\nswitch ($val) { case 1: ... break; ... default: ... } — cleaner than stacked if/elseif. break is required in each case (or use return). default for unmatched cases.\n## Ternary & Null Coalescing\n$status = $nilai >= 70 ? "Lulus" : "Tidak Lulus" — one-line if/else. $nama = $_GET['nama'] ?? 'Guest' — null coalescing: use the right side if the left is null/undefined. The ?? operator is very useful for GET/POST input.`,
    chId: 'Kontrol alur lanjutan: (1) buat perulangan for yang mencetak tabel perkalian 1-10, (2) buat array $nilaiSiswa = [75, 82, 90, 60, 88] dan gunakan foreach + if untuk mengelompokkan jadi 2 array: $lulus dan $tidakLulus, (3) buat switch untuk hari kerja (1-5 = "Hari Kerja", 6-7 = "Weekend") dan cetak pesan berbeda, (4) gunakan ternary nested untuk grade: >=90 "A", >=80 "B", >=70 "C", lainnya "D".',
    chEn: 'Advanced control flow: (1) create a for loop that prints a 1-10 multiplication table, (2) create $nilaiSiswa = [75, 82, 90, 60, 88] and use foreach + if to group into 2 arrays: $lulus and $tidakLulus, (3) create a switch for weekdays (1-5 = "Weekday", 6-7 = "Weekend") and print different messages, (4) use nested ternary for grade: >=90 "A", >=80 "B", >=70 "C", else "D".',
    sumId: 'if = keputusan. for/foreach = perulangan. switch = banyak cabang. Ternary = singkat. Lanjut: fungsi.',
    sumEn: 'if = decisions. for/foreach = loops. switch = multiple branches. Ternary = concise. Next: functions.',
  },
  {
    num: 5, topicId: 'fungsi',
    titleId: 'Fungsi & Parameter', titleEn: 'Functions & Parameters',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\nfunction salam($nama) {\n    return "Halo, " . $nama . "!";\n}\n\necho salam("Budi");\n\nfunction hitung($a, $b, $operasi = "tambah") {\n    return match($operasi) {\n        "tambah" => $a + $b,\n        "kurang" => $a - $b,\n        "kali" => $a * $b,\n        default => 0,\n    };\n}\n\necho hitung(10, 5) . "\\n";\necho hitung(10, 5, "kurang") . "\\n";\n\n$fn = fn($x) => $x * 2;\necho $fn(7);\n`,
      'composer.json': PKG('fungsi'),
      'package.json': PKG_NODE('php-lesson-5', DEV_SERVE),
      'README.md': `# PHP Lesson 5 - Functions\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Membuat fungsi dengan parameter dan nilai kembalian (return)', 'Memahami parameter default dan parameter opsional', 'Menggunakan arrow functions (fn) untuk fungsi singkat', 'Mengenal match expression sebagai pengganti switch'],
    objEn: ['Create functions with parameters and return values', 'Understand default parameters and optional arguments', 'Use arrow functions (fn) for concise single-expression functions', 'Use the match expression as a switch replacement'],
    expId: `## Fungsi: Kode yang Dapat Digunakan Kembali\nfunction nama($param1, $param2 = default) { return ...; } — mendefinisikan fungsi. return mengembalikan nilai ke pemanggil. Fungsi dipanggil dengan nama($argumen). Parameter default: hitung($a, $b, "tambah") — "tambah" otomatis jika tidak diberikan.\n## return vs echo\nreturn mengembalikan nilai ke kode pemanggil (bisa disimpan di variabel). echo mencetak langsung ke output. Gunakan return untuk fungsi yang menghitung, echo untuk mencetak. return menghentikan eksekusi fungsi seketika.\n## Arrow Functions (fn)\n$fn = fn($x) => $x * 2; — fungsi satu baris tanpa kata kunci function. Cocok untuk callback pendek (array_map, array_filter). $x => $x * 2 — parameter tunggal tanpa kurung.\n## match Expression\nmatch ($ekspresi) { "k1" => hasil1, "k2" => hasil2, default => hasilDefault } — mirip switch tapi lebih ketat (tidak perlu break, pencocokan ketat ===). match mengembalikan nilai (bukan statement).`,
    expEn: `## Functions: Reusable Code\nfunction name($param1, $param2 = default) { return ...; } — defines a function. return sends a value back to the caller. Functions are called with name($arguments). Default parameters: hitung($a, $b, "tambah") — "tambah" is automatic if not given.\n## return vs echo\nreturn sends a value back to the calling code (can be stored in a variable). echo prints directly to output. Use return for computing functions, echo for printing. return stops function execution immediately.\n## Arrow Functions (fn)\n$fn = fn($x) => $x * 2; — a one-line function without the function keyword. Great for short callbacks (array_map, array_filter). $x => $x * 2 — single parameter without parentheses.\n## match Expression\nmatch ($expression) { "k1" => result1, "k2" => result2, default => defaultResult } — like switch but stricter (no break needed, strict === matching). match returns a value (not a statement).`,
    chId: 'Latih fungsi: (1) buat fungsi hitungLuasPersegiPanjang($panjang, $lebar) yang mengembalikan luas, (2) buat fungsi faktorial($n) rekursif dan panggil untuk 5, (3) gunakan array_map dengan arrow function untuk menggandakan semua elemen array [1,2,3,4,5], (4) buat fungsi formatRupiah($angka) yang mengembalikan string "Rp 1.000.000" menggunakan number_format.',
    chEn: 'Practice functions: (1) create hitungLuasPersegiPanjang($length, $width) that returns the area, (2) create a recursive faktorial($n) function and call it for 5, (3) use array_map with an arrow function to double all elements of [1,2,3,4,5], (4) create formatRupiah($amount) that returns "Rp 1.000.000" using number_format.',
    sumId: 'function = kode dapat dipakai ulang. return = kembalikan nilai. match = switch modern. fn = arrow function. Lanjut: array lanjutan.',
    sumEn: 'function = reusable code. return = send back a value. match = modern switch. fn = arrow function. Next: advanced arrays.',
  },
  {
    num: 6, topicId: 'array-lanjutan',
    titleId: 'Array Lanjutan & Callback', titleEn: 'Advanced Arrays & Callbacks',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\n$angka = [3, 1, 4, 1, 5, 9, 2, 6];\n\nsort($angka);\necho "Urut: " . implode(", ", $angka) . "\\n";\n\n$ganda = array_map(fn($x) => $x * 2, $angka);\necho "Ganda: " . implode(", ", $ganda) . "\\n";\n\n$genap = array_filter($angka, fn($x) => $x % 2 === 0);\necho "Genap: " . implode(", ", $genap) . "\\n";\n\n$total = array_reduce($angka, fn($carry, $x) => $carry + $x, 0);\necho "Total: $total\\n";\n\n$assoc = ["nama" => "Budi", "umur" => 25, "kota" => "Jakarta"];\n$keys = array_keys($assoc);\n$values = array_values($assoc);\n\n$nested = [\n    ["nama" => "Alice", "skor" => 90],\n    ["nama" => "Budi", "skor" => 85],\n];\nusort($nested, fn($a, $b) => $b["skor"] <=> $a["skor"]);\n`,
      'composer.json': PKG('array-lanjutan'),
      'package.json': PKG_NODE('php-lesson-6', DEV_SERVE),
      'README.md': `# PHP Lesson 6 - Advanced Arrays & Callbacks\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Menguasai fungsi array: sort, array_map, array_filter, array_reduce', 'Memahami callback dan arrow functions sebagai argumen fungsi', 'Mengakses array asosiatif dengan array_keys dan array_values', 'Mengurutkan array multidimensi dengan usort dan spaceship operator'],
    objEn: ['Master array functions: sort, array_map, array_filter, array_reduce', 'Understand callbacks and arrow functions as function arguments', 'Access associative arrays with array_keys and array_values', 'Sort multidimensional arrays with usort and the spaceship operator'],
    expId: `## array_map: Transform Setiap Elemen\narray_map(fn($x) => $x * 2, $arr) — menerapkan fungsi ke setiap elemen, mengembalikan array baru. Callback = fungsi yang diberikan sebagai argumen ke fungsi lain. Arrow function (fn) adalah callback ringkas satu ekspresi.\n## array_filter: Saring Elemen\narray_filter($arr, fn($x) => $x > 5) — menyimpan elemen yang callback-nya mengembalikan true. Tanpa callback kedua, menghapus elemen "falsy" (0, "", null, false).\n## array_reduce: Reduksi ke Satu Nilai\narray_reduce($arr, fn($carry, $x) => $carry + $x, 0) — menggabungkan semua elemen menjadi satu nilai. $carry = akumulasi dari iterasi sebelumnya. Berguna untuk total, string penggabungan, dll.\n## Sorting & Spaceship\nsort($arr) — urutkan ascending (mengubah array asli). usort($arr, fn($a, $b) => $b["skor"] <=> $a["skor"]) — urutkan array asosiatif dengan callback. Operator <=> (spaceship) mengembalikan -1, 0, atau 1 untuk perbandingan.`,
    expEn: `## array_map: Transform Every Element\narray_map(fn($x) => $x * 2, $arr) — applies a function to every element, returns a new array. A callback = a function passed as an argument to another function. Arrow function (fn) is a concise single-expression callback.\n## array_filter: Filter Elements\narray_filter($arr, fn($x) => $x > 5) — keeps elements where the callback returns true. Without a second callback, removes "falsy" elements (0, "", null, false).\n## array_reduce: Reduce to One Value\narray_reduce($arr, fn($carry, $x) => $carry + $x, 0) — combines all elements into one value. $carry = the accumulation from the previous iteration. Useful for totals, string concatenation, etc.\n## Sorting & the Spaceship\nsort($arr) — sort ascending (modifies original). usort($arr, fn($a, $b) => $b["score"] <=> $a["score"]) — sort associative array with callback. The <=> (spaceship) operator returns -1, 0, or 1 for comparison.`,
    chId: 'Kembangkan array: (1) buat array $transaksi dengan 5 item (nama, jumlah) lalu gunakan array_filter untuk filter yang jumlahnya > 100000, (2) gunakan array_reduce untuk menghitung total semua jumlah, (3) buat array $siswa dengan nilai dan urutkan descending menggunakan usort, (4) gunakan array_map dengan fn untuk mengubah semua nama jadi uppercase.',
    chEn: 'Expand arrays: (1) create a $transaksi array with 5 items (name, amount) then use array_filter to filter those over 100000, (2) use array_reduce to calculate the total of all amounts, (3) create a $siswa array with scores and sort descending using usort, (4) use array_map with fn to uppercase all names.',
    sumId: 'array_map = transform. array_filter = saring. array_reduce = reduksi. usort = urutkan. Lanjut: OOP.',
    sumEn: 'array_map = transform. array_filter = filter. array_reduce = reduce. usort = sort. Next: OOP.',
  },
  {
    num: 7, topicId: 'oop-kelas',
    titleId: 'OOP: Kelas & Objek', titleEn: 'OOP: Classes & Objects',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\nclass Produk {\n    public string $nama;\n    public float $harga;\n    public int $stok;\n\n    public function __construct(string $nama, float $harga, int $stok = 0) {\n        $this->nama = $nama;\n        $this->harga = $harga;\n        $this->stok = $stok;\n    }\n\n    public function info(): string {\n        return $this->nama . " - Rp " . number_format($this->harga, 0, ",", ".");\n    }\n\n    public function terjual(int $jumlah): void {\n        if ($jumlah > $this->stok) {\n            throw new Exception("Stok tidak cukup");\n        }\n        $this->stok -= $jumlah;\n    }\n}\n\n$p = new Produk("Kopi Gayo", 25000, 12);\necho $p->info() . "\\n";\n$p->terjual(3);\necho "Sisa stok: " . $p->stok . "\\n";\n`,
      'composer.json': PKG('oop-kelas'),
      'package.json': PKG_NODE('php-lesson-7', DEV_SERVE),
      'README.md': `# PHP Lesson 7 - OOP: Classes & Objects\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Membuat kelas dengan properti dan method', 'Memahami constructor (__construct) dan $this', 'Menggunakan visibility (public, protected, private)', 'Melempar exception saat kondisi tidak valid'],
    objEn: ['Create classes with properties and methods', 'Understand the constructor (__construct) and $this', 'Use visibility (public, protected, private)', 'Throw exceptions when conditions are invalid'],
    expId: `## Kelas & Objek\nclass Produk { ... } — mendefinisikan blueprint. new Produk(...) — membuat instance (objek). $this merujuk ke instance saat ini. Properti = data, method = perilaku.\n## Constructor & $this\n__construct() dipanggil otomatis saat new. $this = objek yang sedang aktif. Gunakan $this->nama untuk mengakses properti instance dalam method.\n## Visibility\npublic = bisa diakses dari mana saja. protected = hanya dalam kelas dan turunannya. private = hanya dalam kelas itu sendiri. Default adalah public. Enkapsulasi = sembunyikan detail internal, ekspos antarmuka publik.\n## Exception\nthrow new Exception("Pesan") — menghentikan eksekusi normal dan berpindah ke blok catch terdekat. Berguna untuk validasi (stok tidak cukup, input tidak valid).`,
    expEn: `## Classes & Objects\nclass Produk { ... } — defines a blueprint. new Produk(...) — creates an instance (object). $this refers to the current instance. Properties = data, methods = behavior.\n## Constructor & $this\n__construct() is called automatically on new. $this = the currently active object. Use $this->name to access instance properties inside methods.\n## Visibility\npublic = accessible from anywhere. protected = within the class and its children. private = within the class itself. Default is public. Encapsulation = hide internal details, expose a public interface.\n## Exception\nthrow new Exception("message") — stops normal execution and jumps to the nearest catch block. Useful for validation (insufficient stock, invalid input).`,
    chId: 'Kembangkan OOP: (1) tambah properti readonly $id (auto-increment static) ke kelas Produk, (2) buat kelas kedua Toko yang menyimpan array Produk dan punya method tambahProduk() serta daftarProduk(), (3) ubah visibility $stok dari public menjadi private dan tambah getter getStok(), (4) buat custom exception class StokHabisException yang extends Exception dan tangkap di method terjual().',
    chEn: 'Expand OOP: (1) add a readonly $id property (auto-increment static) to the Produk class, (2) create a second class Toko that holds an array of Produk and has tambahProduk() and daftarProduk() methods, (3) change $stok visibility from public to private and add a getStok() getter, (4) create a custom StokHabisException class extending Exception and catch it in the terjual() method.',
    sumId: 'class = blueprint. new = instance. $this = instance saat ini. throw = exception. Lanjut: pewarisan.',
    sumEn: 'class = blueprint. new = instance. $this = current instance. throw = exception. Next: inheritance.',
  },
  {
    num: 8, topicId: 'oop-lanjutan',
    titleId: 'OOP: Pewarisan & Interface', titleEn: 'OOP: Inheritance & Interfaces',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\nabstract class Bentuk {\n    abstract public function luas(): float;\n    abstract public function keliling(): float;\n\n    public function info(): string {\n        return static::class . ": luas=" . $this->luas() . ", keliling=" . $this->keliling();\n    }\n}\n\nclass Lingkaran extends Bentuk {\n    public function __construct(public float $jariJari) {}\n\n    public function luas(): float {\n        return M_PI * $this->jariJari ** 2;\n    }\n\n    public function keliling(): float {\n        return 2 * M_PI * $this->jariJari;\n    }\n}\n\nclass PersegiPanjang extends Bentuk {\n    public function __construct(public float $panjang, public float $lebar) {}\n\n    public function luas(): float {\n        return $this->panjang * $this->lebar;\n    }\n\n    public function keliling(): float {\n        return 2 * ($this->panjang + $this->lebar);\n    }\n}\n\n$bentuk = [new Lingkaran(5), new PersegiPanjang(4, 6)];\nforeach ($bentuk as $b) {\n    echo $b->info() . "\\n";\n}\n\ninterface Drawable {\n    public function draw(): string;\n}\n\nclass Segitiga extends Bentuk implements Drawable {\n    public function __construct(public float $alas, public float $tinggi) {}\n\n    public function luas(): float {\n        return 0.5 * $this->alas * $this->tinggi;\n    }\n\n    public function keliling(): float {\n        return $this->alas + $this->tinggi + sqrt($this->alas ** 2 + $this->tinggi ** 2);\n    }\n\n    public function draw(): string {\n        return "Segitiga (alas={$this->alas}, tinggi={$this->tinggi})";\n    }\n}\n`,
      'composer.json': PKG('oop-lanjutan'),
      'package.json': PKG_NODE('php-lesson-8', DEV_SERVE),
      'README.md': `# PHP Lesson 8 - OOP: Inheritance & Interfaces\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Memahami abstract class dan method abstract', 'Menggunakan extends untuk pewarisan dan static:: untuk late static binding', 'Mengimplementasikan interface (implements) pada kelas', 'Menggabungkan abstract class dan interface dalam satu kelas'],
    objEn: ['Understand abstract classes and abstract methods', 'Use extends for inheritance and static:: for late static binding', 'Implement interfaces (implements) on classes', 'Combine abstract classes and interfaces in a single class'],
    expId: `## Abstract Class\nabstract class Bentuk { abstract public function luas(): float; } — tidak bisa dibuat instance langsung (new Bentuk() gagal). Anak class HARUS mengimplementasikan semua method abstract.\n## extends & static::\nclass Lingkaran extends Bentuk — mewarisi semua method dan properti non-private. static::class mengembalikan nama class anak (bukan parent). Ini late static binding — penting untuk method info() yang bekerja untuk semua turunan.\n## Interface\ninterface Drawable { public function draw(): string; } — kontrak tanpa implementasi. class Segitiga implements Drawable — wajib implementasi draw(). Sebuah class bisa implements banyak interface (kontrak ganda).\n## Kombinasi\nclass Segitiga extends Bentuk implements Drawable — mewarisi dari Bentuk DAN mengimplementasikan Drawable. PHP hanya mengizinkan single inheritance (extends) tapi multi-interface (implements).`,
    expEn: `## Abstract Class\nabstract class Bentuk { abstract public function luas(): float; } — cannot be instantiated directly (new Bentuk() fails). Child classes MUST implement all abstract methods.\n## extends & static::\nclass Lingkaran extends Bentuk — inherits all non-private methods and properties. static::class returns the child class name (not parent). This is late static binding — important for the info() method that works for all descendants.\n## Interface\ninterface Drawable { public function draw(): string; } — a contract without implementation. class Segitiga implements Drawable — must implement draw(). A class can implement multiple interfaces (multiple contracts).\n## Combination\nclass Segitiga extends Bentuk implements Drawable — inherits from Bentuk AND implements Drawable. PHP allows only single inheritance (extends) but multi-interface (implements).`,
    chId: 'Perdalam OOP: (1) buat trait Logger dengan method log($pesan) dan gunakan di kedua kelas Bentuk, (2) buat interface Printable dengan method print() dan implementasikan di Segitiga, (3) buat class LingkaranFinal (final class — tidak bisa di-extends) dan amati error saat mencoba extends, (4) buat class static Utilitas dengan method static hitungLuasLingkaran($r) — panggil tanpa instance.',
    chEn: 'Deepen OOP: (1) create a Logger trait with a log($message) method and use it in both Bentuk classes, (2) create a Printable interface with a print() method and implement it in Segitiga, (3) create a LingkaranFinal class (final — cannot be extended) and observe the error when trying to extend it, (4) create a static Utilitas class with a static hitungLuasLingkaran($r) method — call without an instance.',
    sumId: 'abstract = blueprint tanpa instance. extends = pewarisan. interface = kontrak. trait = reuse kode. Lanjut: exception.',
    sumEn: 'abstract = blueprint without instances. extends = inheritance. interface = contract. trait = code reuse. Next: exceptions.',
  },
  {
    num: 9, topicId: 'exception-error',
    titleId: 'Exception & Error Handling', titleEn: 'Exception & Error Handling',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\nfunction bagi($a, $b) {\n    if ($b == 0) {\n        throw new InvalidArgumentException("Pembagi tidak boleh nol");\n    }\n    return $a / $b;\n}\n\ntry {\n    echo bagi(10, 2) . "\\n";\n    echo bagi(10, 0) . "\\n";\n} catch (InvalidArgumentException $e) {\n    echo "Error: " . $e->getMessage() . "\\n";\n} finally {\n    echo "Blok finally selalu jalan\\n";\n}\n\nset_error_handler(function ($errno, $errstr) {\n    echo "Warning ditangkap: $errstr\\n";\n    return true;\n});\necho $undefined_var . "\\n";\n`,
      'composer.json': PKG('exception-error'),
      'package.json': PKG_NODE('php-lesson-9', DEV_SERVE),
      'README.md': `# PHP Lesson 9 - Exception & Error Handling\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Melempar exception dengan throw new', 'Menangkap exception dengan try/catch', 'Menggunakan blok finally untuk kode yang selalu jalan', 'Mengubah handler error dengan set_error_handler'],
    objEn: ['Throw exceptions with throw new', 'Catch exceptions with try/catch', 'Use the finally block for code that always runs', 'Customize error handling with set_error_handler'],
    expId: `## throw & try/catch\nthrow new InvalidArgumentException("Pesan") — menghentikan eksekusi normal dan berpindah ke blok catch terdekat. try { ... } catch (ExceptionType $e) { ... } — menangkap exception spesifik. Beberapa catch bisa menangani tipe berbeda.\n## finally\nBlok finally selalu dieksekusi — apakah exception terjadi atau tidak. Berguna untuk cleanup: tutup file, tutup koneksi database, dll.\n## Custom Exception\nclass DatabaseException extends Exception {} — buat tipe exception sendiri. catch (DatabaseException $e) lebih spesifik daripada catch (Exception $e). Urutan catch: yang paling spesifik dulu.\n## Error Handler\nset_error_handler() mengubah bagaimana PHP menangani warnings/notices. Return true untuk menandakan handler telah menangani error (jangan tampilkan default).`,
    expEn: `## throw & try/catch\nthrow new InvalidArgumentException("message") — stops normal execution and searches for a matching catch block. try { ... } catch (ExceptionType $e) { ... } — catches a specific exception type. Multiple catch blocks can handle different types.\n## finally\nThe finally block always executes — whether an exception occurred or not. Useful for cleanup: close files, close database connections, etc.\n## Custom Exception\nclass DatabaseException extends Exception {} — create your own exception type. catch (DatabaseException $e) is more specific than catch (Exception $e). Order catch blocks: most specific first.\n## Error Handler\nset_error_handler() changes how PHP handles warnings/notices. Return true to indicate the handler has handled the error (suppress the default display).`,
    chId: 'Latih exception: (1) buat custom exception class ValidationException dengan properti $errors (array) dan override getMessage() untuk menampilkan semua error, (2) buat fungsi validateForm($data) yang melempar ValidationException jika nama kosong atau email tidak valid, (3) gunakan beberapa catch block: catch (InvalidArgumentException) untuk pembagian nol, catch (ValidationException) untuk form, catch (Exception $e) sebagai fallback, (4) buat fungsi bacaFile($path) yang try/catch FileNotFoundException dan mengembalikan null jika file tidak ditemukan.',
    chEn: 'Practice exceptions: (1) create a custom ValidationException class with an $errors (array) property and override getMessage() to display all errors, (2) create a validateForm($data) function that throws ValidationException if name is empty or email is invalid, (3) use multiple catch blocks: catch (InvalidArgumentException) for division by zero, catch (ValidationException) for form errors, catch (Exception $e) as fallback, (4) create a readFile($path) function that try/catches FileNotFoundException and returns null if the file is not found.',
    sumId: 'throw = lempar error. try/catch = tangkap. finally = selalu jalan. set_error_handler = custom handler. Lanjut: file I/O.',
    sumEn: 'throw = throw error. try/catch = catch. finally = always runs. set_error_handler = custom handler. Next: file I/O.',
  },
  {
    num: 10, topicId: 'file-json',
    titleId: 'File I/O & JSON', titleEn: 'File I/O & JSON',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\n$data = ["nama" => "Tryngo", "kota" => "Jakarta", "tags" => ["php", "web", "backend"]];\n\n$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);\necho "JSON:\\n" . $json . "\\n\\n";\n\nfile_put_contents("data.json", $json);\n\n$isi = file_get_contents("data.json");\n$decode = json_decode($isi, true);\n\necho "Dibaca dari file: " . $decode["nama"] . "\\n";\n\n$lines = file("data.json");\necho "Baris: " . count($lines) . "\\n";\n\nfile_put_contents("log.txt", "[" . date("Y-m-d H:i:s") . "] Data diakses\\n", FILE_APPEND);\n`,
      'composer.json': PKG('file-json'),
      'package.json': PKG_NODE('php-lesson-10', DEV_SERVE),
      'README.md': `# PHP Lesson 10 - File I/O & JSON\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\nPeriksa file data.json dan log.txt yang dibuat di folder project.\n`,
    },
    objId: ['Membaca dan menulis file dengan file_get_contents / file_put_contents', 'Mengenkode dan mendecode JSON (json_encode / json_decode)', 'Membaca file per baris dengan file()', 'Menambahkan ke file secara append dengan FILE_APPEND'],
    objEn: ['Read and write files with file_get_contents / file_put_contents', 'Encode and decode JSON (json_encode / json_decode)', 'Read file line by line with file()', 'Append to a file with FILE_APPEND'],
    expId: `## file_get_contents / file_put_contents\nfile_get_contents($path) = baca seluruh file menjadi string. file_put_contents($path, $data) = tulis string ke file (overwrite). Opsi: FILE_APPEND untuk tambah, LOCK_EX untuk exclusive lock.\n## json_encode / json_decode\njson_encode($data) = array/object ke JSON string. JSON_PRETTY_PRINT = format rapi. JSON_UNESCAPED_SLASHES = jangan escape /. json_decode($json, true) = JSON ke array asosiatif (tanpa true = jadi object stdClass).\n## file() & fwrite\nfile($path) = baca per baris (array). fopen/fwrite/fclose = kontrol lebih halus (tulis per baris, baca per chunk). Selalu tutup file dengan fclose atau gunakan file_put_contents untuk operasi sederhana.\n## Keamanan File\nJangan percaya nama file dari input user (path traversal: ../../etc/passwd). Gunakan basename() untuk sanitasi. Untuk produksi: batasi direktori dan gunakan is_writable() untuk cek.`,
    expEn: `## file_get_contents / file_put_contents\nfile_get_contents($path) = read entire file as a string. file_put_contents($path, $data) = write string to file (overwrite). Options: FILE_APPEND to append, LOCK_EX for exclusive lock.\n## json_encode / json_decode\njson_encode($data) = array/object to JSON string. JSON_PRETTY_PRINT = pretty format. JSON_UNESCAPED_SLASHES = don't escape /. json_decode($json, true) = JSON to associative array (without true = stdClass object).\n## file() & fwrite\nfile($path) = read line by line (array). fopen/fwrite/fclose = finer control (write line by line, read per chunk). Always close files with fclose or use file_put_contents for simple operations.\n## File Security\nNever trust file names from user input (path traversal: ../../etc/passwd). Use basename() for sanitization. For production: restrict directories and use is_writable() to check.`,
    chId: 'Kembangkan file I/O: (1) buat program sederhana: baca data.json, tambah item baru (nama, harga), tulis ulang ke data.json, (2) buat CSV exporter: array of data ke file .csv dengan fputcsv, (3) buat log viewer baca log.txt dan tampilkan per baris di HTML dengan nl2br, (4) tambah validasi: cek apakah data.json ada sebelum dibaca (file_exists) dan tampilkan pesan error jika tidak.',
    chEn: 'Expand file I/O: (1) build a simple program: read data.json, add a new item (name, price), write back to data.json, (2) create a CSV exporter: array of data to .csv file using fputcsv, (3) build a log viewer that reads log.txt and displays each line in HTML with nl2br, (4) add validation: check if data.json exists before reading (file_exists) and show an error message if not.',
    sumId: 'file_get_contents = baca. file_put_contents = tulis. json_encode/decode = pertukaran data. Lanjut: PDO database.',
    sumEn: 'file_get_contents = read. file_put_contents = write. json_encode/decode = data exchange. Next: PDO database.',
  },
  {
    num: 11, topicId: 'pdo-crud',
    titleId: 'PDO & CRUD Database', titleEn: 'PDO & Database CRUD',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\ntry {\n    $pdo = new PDO("sqlite:" . __DIR__ . "/app.db");\n    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n\n    $pdo->exec("CREATE TABLE IF NOT EXISTS tugas (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        judul TEXT NOT NULL,\n        selesai BOOLEAN DEFAULT 0,\n        dibuat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    )");\n\n    $stmt = $pdo->prepare("INSERT INTO tugas (judul) VALUES (:judul)");\n    $stmt->execute(["judul" => "Belajar PHP PDO"]);\n\n    $stmt = $pdo->query("SELECT * FROM tugas ORDER BY id DESC");\n    $semua = $stmt->fetchAll(PDO::FETCH_ASSOC);\n\n    echo "Tugas:\\n";\n    foreach ($semua as $t) {\n        $status = $t["selesai"] ? "✓" : "○";\n        echo "{$status} [{$t[\"id\"]}] {$t[\"judul\"]}\\n";\n    }\n} catch (PDOException $e) {\n    echo "Database error: " . $e->getMessage() . "\\n";\n}\n`,
      'composer.json': PKG('pdo-crud'),
      'package.json': PKG_NODE('php-lesson-11', DEV_SERVE),
      'README.md': `# PHP Lesson 11 - PDO & CRUD Database\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\nPerhatikan file app.db yang dibuat (SQLite database).\n`,
    },
    objId: ['Menghubungkan ke database SQLite menggunakan PDO', 'Membuat tabel dengan SQL CREATE TABLE', 'Menyisipkan data dengan prepared statements (aman dari SQL injection)', 'Membaca data dengan SELECT dan fetchAll'],
    objEn: ['Connect to a SQLite database using PDO', 'Create a table with SQL CREATE TABLE', 'Insert data with prepared statements (safe from SQL injection)', 'Read data with SELECT and fetchAll'],
    expId: `## PDO: PHP Data Objects\nPDO adalah abstraction layer untuk database — sama untuk MySQL, PostgreSQL, SQLite. Ganti DSN saja (mis. "mysql:host=localhost;dbname=tryngo") tanpa ubah kode PHP.\n## Connection & Error Mode\nnew PDO($dsn, $user, $pass) — buat koneksi. setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) — buat PDO melempar exception saat error (bukan silent fail). Tanpa ini, error PDO tidak terlihat.\n## Prepared Statements\n$pdo->prepare("INSERT INTO tugas (judul) VALUES (:judul)") — prepare statement. execute(["judul" => $judul]) — bind parameter. Prepared statements mencegah SQL injection: input user dimasukkan sebagai data, bukan bagian dari SQL string.\n## Fetch Modes\nfetchAll(PDO::FETCH_ASSOC) = array asosiatif (key = nama kolom). fetch() = satu baris. fetchColumn() = satu nilai. PDO::FETCH_CLASS = map ke object kelas.`,
    expEn: `## PDO: PHP Data Objects\nPDO is an abstraction layer for databases — works the same for MySQL, PostgreSQL, SQLite. Just change the DSN (e.g., "mysql:host=localhost;dbname=tryngo") without changing PHP code.\n## Connection & Error Mode\nnew PDO($dsn, $user, $pass) — create a connection. setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) — make PDO throw exceptions on errors (not silent fail). Without this, PDO errors are invisible.\n## Prepared Statements\n$pdo->prepare("INSERT INTO tugas (judul) VALUES (:judul)") — prepare statement. execute(["judul" => $judul]) — bind parameters. Prepared statements prevent SQL injection: user input is treated as data, not part of the SQL string.\n## Fetch Modes\nfetchAll(PDO::FETCH_ASSOC) = associative array (key = column name). fetch() = one row. fetchColumn() = one value. PDO::FETCH_CLASS = map to a class object.`,
    chId: 'Kembangkan PDO CRUD: (1) tambah fungsi updateTugas($id, $judul) dan hapusTugas($id) dengan prepared statement, (2) tambah kolom prioritas (enum: rendah, sedang, tinggi) dan query filter berdasarkan prioritas, (3) buat pagination: SELECT * FROM tugas LIMIT 10 OFFSET $offset, (4) tambah transaksi: $pdo->beginTransaction() → beberapa insert → $pdo->commit() atau $pdo->rollBack() jika gagal.',
    chEn: 'Expand PDO CRUD: (1) add updateTugas($id, $judul) and deleteTugas($id) functions with prepared statements, (2) add a priority column (enum: low, medium, high) and filter query by priority, (3) build pagination: SELECT * FROM tugas LIMIT 10 OFFSET $offset, (4) add transactions: $pdo->beginTransaction() → multiple inserts → $pdo->commit() or $pdo->rollBack() on failure.',
    sumId: 'PDO = abstraction database. Prepared statement = aman dari SQL injection. Fetch mode = bentuk data. Lanjut: keamanan.',
    sumEn: 'PDO = database abstraction. Prepared statements = safe from SQL injection. Fetch mode = data shape. Next: security.',
  },
  {
    num: 12, topicId: 'keamanan',
    titleId: 'Keamanan Aplikasi', titleEn: 'Application Security',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\n// 1. Password Hashing\n$password = "rahasia123";\n$hash = password_hash($password, PASSWORD_DEFAULT);\necho "Hash: $hash\\n";\necho "Verifikasi benar: " . (password_verify($password, $hash) ? "ya" : "tidak") . "\\n";\necho "Verifikasi salah: " . (password_verify("salah", $hash) ? "ya" : "tidak") . "\\n";\n\n// 2. XSS Protection\n$inputUser = "<script>alert('xss')</script>";\n$aman = htmlspecialchars($inputUser, ENT_QUOTES, "UTF-8");\necho "Tanpa perlindungan: $inputUser\\n";\necho "Dilindungi: $aman\\n";\n\n// 3. CSRF Token\nsession_start();\nif (empty($_SESSION["csrf_token"])) {\n    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));\n}\n$token = $_SESSION["csrf_token"];\necho "CSRF Token: " . substr($token, 0, 16) . "...\\n";\n\n// 4. Input Validation\n$email = "user@example.com";\nif (filter_var($email, FILTER_VALIDATE_EMAIL)) {\n    echo "Email valid\\n";\n} else {\n    echo "Email tidak valid\\n";\n}\n`,
      'composer.json': PKG('keamanan'),
      'package.json': PKG_NODE('php-lesson-12', DEV_SERVE),
      'README.md': `# PHP Lesson 12 - Application Security\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Mengamankan password dengan password_hash / password_verify', 'Melindungi dari XSS dengan htmlspecialchars', 'Memahami CSRF token dan session', 'Validasi input dengan filter_var'],
    objEn: ['Secure passwords with password_hash / password_verify', 'Protect against XSS with htmlspecialchars', 'Understand CSRF tokens and sessions', 'Validate input with filter_var'],
    expId: `## Password Hashing\npassword_hash($password, PASSWORD_DEFAULT) = hash bcrypt dengan salt otomatis. Tidak bisa di-reverse (one-way). password_verify($input, $hash) = cek apakah input cocok dengan hash. JANGAN gunakan md5/sha1 untuk password — terlalu cepat dan tanpa salt.\n## XSS Protection\nhtmlspecialchars($input, ENT_QUOTES, "UTF-8") = mengubah <, >, ", ' menjadi HTML entities. Mencegah eksekusi script di browser. SELALU escape output yang berasal dari user sebelum ditampilkan di HTML.\n## CSRF Token\nSession-based CSRF token: generate dengan random_bytes(32), simpan di $_SESSION, sertakan di setiap form sebagai hidden input, verifikasi di server saat form dikirim. Mencegah serangan cross-site request forgery.\n## Input Validation\nfilter_var($email, FILTER_VALIDATE_EMAIL) = validasi email bawaan PHP. FILTER_VALIDATE_INT, FILTER_SANITIZE_SPECIAL_CHARS. Validasi di sisi server adalah keamanan sesungguhnya — validasi di sisi klien (HTML5) hanya untuk UX.`,
    expEn: `## Password Hashing\npassword_hash($password, PASSWORD_DEFAULT) = hash bcrypt with automatic salt. Cannot be reversed (one-way). password_verify($input, $hash) = check if input matches the hash. NEVER use md5/sha1 for passwords — too fast and no salt.\n## XSS Protection\nhtmlspecialchars($input, ENT_QUOTES, "UTF-8") = converts <, >, ", ' to HTML entities. Prevents script execution in the browser. ALWAYS escape user-derived output before displaying in HTML.\n## CSRF Token\nSession-based CSRF token: generate with random_bytes(32), store in $_SESSION, include in every form as a hidden input, verify on the server when the form is submitted. Prevents cross-site request forgery attacks.\n## Input Validation\nfilter_var($email, FILTER_VALIDATE_EMAIL) = PHP built-in email validation. FILTER_VALIDATE_INT, FILTER_SANITIZE_SPECIAL_CHARS. Server-side validation is the real security — client-side (HTML5) validation is only for UX.`,
    chId: 'Tingkatkan keamanan: (1) buat form login sederhana dengan session dan proteksi brute-force (hitung percobaan gagal di session, lock 5 menit setelah 5 gagal), (2) tambahkan prepared statement untuk query SELECT dengan WHERE id = :id dan amati bahwa input "1 OR 1=1" tidak menghasilkan data palsu, (3) buat middleware sederhana yang memeriksa CSRF token pada setiap POST request, (4) tulis README: daftar 10 keamanan dasar PHP yang harus diterapkan di setiap project.',
    chEn: 'Level up security: (1) build a simple login form with session and brute-force protection (count failed attempts in session, lock for 5 minutes after 5 failures), (2) add a prepared statement for a SELECT query with WHERE id = :id and observe that input "1 OR 1=1" does not produce fake data, (3) build a simple middleware that checks the CSRF token on every POST request, (4) write a README: a checklist of 10 basic PHP security practices for every project.',
    sumId: 'password_hash = aman. htmlspecialchars = anti-XSS. CSRF token = proteksi form. filter_var = validasi. Lanjut: composer.',
    sumEn: 'password_hash = safe. htmlspecialchars = anti-XSS. CSRF token = form protection. filter_var = validation. Next: composer.',
  },
  {
    num: 13, topicId: 'composer-autoload',
    titleId: 'Composer & Autoloading', titleEn: 'Composer & Autoloading',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\nrequire_once __DIR__ . "/vendor/autoload.php";\n\nuse App\\Models\\Task;\nuse App\\Services\\Logger;\n\n$task = new Task("Belajar Composer", "Pelajari autoloading PSR-4");\n$task->complete();\n\nLogger::info("Task diselesaikan: " . $task->getJudul());\n`,
      'src/Models/Task.php': `<?php\n\nnamespace App\\Models;\n\nclass Task {\n    private string $judul;\n    private string $deskripsi;\n    private bool $selesai = false;\n\n    public function __construct(string $judul, string $deskripsi) {\n        $this->judul = $judul;\n        $this->deskripsi = $deskripsi;\n    }\n\n    public function complete(): void {\n        $this->selesai = true;\n    }\n\n    public function getJudul(): string {\n        return $this->judul;\n    }\n\n    public function isSelesai(): bool {\n        return $this->selesai;\n    }\n}\n`,
      'src/Services/Logger.php': `<?php\n\nnamespace App\\Services;\n\nclass Logger {\n    public static function info(string $pesan): void {\n        echo "[INFO] " . date("Y-m-d H:i:s") . " - " . $pesan . "\\n";\n    }\n}\n`,
      'composer.json': PKG('composer-autoload'),
      'package.json': PKG_NODE('php-lesson-13', DEV_SERVE),
      'README.md': `# PHP Lesson 13 - Composer & Autoloading\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n\nPSR-4 autoloading: namespace App\\Models → src/Models/, namespace App\\Services → src/Services/.\n`,
    },
    objId: ['Memahami autoloading PSR-4 dan struktur direktori', 'Menggunakan namespace dan use statement', 'Membuat class yang otomatis dimuat oleh Composer', 'Membedakan autoload (runtime) dan require manual'],
    objEn: ['Understand PSR-4 autoloading and directory structure', 'Use namespaces and use statements', 'Create classes that Composer autoloads automatically', 'Distinguish autoloading (runtime) from manual require'],
    expId: `## PSR-4: Standar Autoloading\nNamespace App\\Models memetakan ke direktori src/Models/. Composer menggunakan aturan: ganti \\ dengan /, tambahkan .php. Jadi App\\Models\\Task → src/Models/Task.php. Tanpa autoload: manual require untuk setiap file — tidak scalable.\n## composer.json Autoload\n"autoload": { "psr-4": { "App\\": "src/" } } — mendefinisikan mapping namespace ke direktori. Setelah edit composer.json, jalankan composer dump-autoload untuk memperbarui mapping.\n## Namespace & Use\nnamespace App\\Models; — deklarasi namespace di awal file. use App\\Models\\Task; — import class agar bisa dipakai tanpa prefix lengkap. Tanpa use: new \\App\\Models\\Task(...) — fully qualified name.\n## Static Method\nLogger::info() — memanggil method statis tanpa membuat instance. Cocok untuk utility class (Logger, Validator, Helper). Tidak perlu $this karena tidak ada state instance.`,
    expEn: `## PSR-4: The Autoloading Standard\nThe namespace App\\Models maps to the src/Models/ directory. Composer uses the rule: replace \\ with /, append .php. So App\\Models\\Task → src/Models/Task.php. Without autoloading: manual require for every file — not scalable.\n## composer.json Autoload\n"autoload": { "psr-4": { "App\\": "src/" } } — defines the namespace-to-directory mapping. After editing composer.json, run composer dump-autoload to update the mapping.\n## Namespace & Use\nnamespace App\\Models; — declare the namespace at the top of the file. use App\\Models\\Task; — import the class so it can be used without the full prefix. Without use: new \\App\\Models\\Task(...) — fully qualified name.\n## Static Method\nLogger::info() — call a static method without creating an instance. Great for utility classes (Logger, Validator, Helper). No $this needed because there is no instance state.`,
    chId: 'Kembangkan Composer: (1) tambah dependency fakerphp/faker di composer.json dan gunakan di seeder untuk membuat 10 tugas dummy, (2) buat script CLI custom di composer.json (scripts.post-install-cmd) yang menjalankan migration otomatis, (3) buat class App\\Services\\Database yang menggunakan singleton pattern (private static $instance), (4) tulis README tentang perbedaan autoload (runtime) vs compile (opcache).',
    chEn: 'Expand Composer: (1) add the fakerphp/faker dependency in composer.json and use it in a seeder to create 10 dummy tasks, (2) create a custom CLI script in composer.json (scripts.post-install-cmd) that runs migrations automatically, (3) create an App\\Services\\Database class using the singleton pattern (private static $instance), (4) write a README about the difference between autoload (runtime) and compile (opcache).',
    sumId: 'Composer = autoload dependency. PSR-4 = namespace ke direktori. use = import class. static = tanpa instance. Lanjut: PHP 8.',
    sumEn: 'Composer = autoload dependencies. PSR-4 = namespace to directory. use = import class. static = without instance. Next: PHP 8.',
  },
  {
    num: 14, topicId: 'php8-fitur',
    titleId: 'PHP 8: Enum, Match & Attributes', titleEn: 'PHP 8: Enum, Match & Attributes',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\nenum Status: string {\n    case Pending = "pending";\n    case InProgress = "in_progress";\n    case Done = "done";\n\n    public function label(): string {\n        return match($this) {\n            self::Pending => "Menunggu",\n            self::InProgress => "Dalam Proses",\n            self::Done => "Selesai",\n        };\n    }\n}\n\n#[Attribute]\nclass Todo {\n    public function __construct(public string $priority) {}\n}\n\n#[Todo("high")]\nclass BuatLaporan {\n    public function jalankan(): string {\n        return "Laporan prioritas tinggi selesai";\n    }\n}\n\n$status = Status::Pending;\necho $status->label() . "\\n";\n\n$ref = new ReflectionClass(BuatLaporan::class);\n$attr = $ref->getAttributes(Todo::class)[0] ?? null;\nif ($attr) {\n    echo "Priority: " . $attr->newInstance()->priority . "\\n";\n}\n\n$nilai = 85;\n$result = match(true) {\n    $nilai >= 90 => "A",\n    $nilai >= 80 => "B",\n    $nilai >= 70 => "C",\n    default => "D",\n};\necho "Grade: $result\\n";\n`,
      'composer.json': PKG('php8-fitur'),
      'package.json': PKG_NODE('php-lesson-14', DEV_SERVE),
      'README.md': `# PHP Lesson 14 - PHP 8: Enum, Match & Attributes\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000\n`,
    },
    objId: ['Menggunakan enum bertipe (backed enum) dengan method', 'Membuat custom attribute dengan #[Attribute]', 'Membaca attribute via ReflectionClass', 'Menggunakan match(true) untuk kondisi kompleks'],
    objEn: ['Use backed enums with methods', 'Create custom attributes with #[Attribute]', 'Read attributes via ReflectionClass', 'Use match(true) for complex conditions'],
    expId: `## Enum: Tipe dengan Himpunan Nilai Tetap\nenum Status: string { case Pending = "pending"; ... } — backed enum: setiap case punya nilai string. $status = Status::Pending; $status->value = "pending". Tambahkan method (label(), color()) langsung di enum — enum bukan sekadar konstanta, tapi class pertama.\n## Attribute: Metadata Kode\n#[Attribute] class Todo { public function __construct(public string $priority) {} } — mendefinisikan custom attribute. #[Todo("high")] di atas class — metadata yang bisa dibaca saat runtime via ReflectionClass. Attribute = cara deklaratif menambahkan metadata tanpa mengubah logika.\n## match(true): Switch Modern\nmatch(true) { $nilai >= 90 => "A", ... } — mengevaluasi kondisi boolean berurutan. Cocok untuk range checks (lebih rapi dari if/elseif bertumpuk). match mengembalikan nilai (bukan statement).`,
    expEn: `## Enum: A Type with a Fixed Set of Values\nenum Status: string { case Pending = "pending"; ... } — a backed enum: each case has a string value. $status = Status::Pending; $status->value = "pending". Add methods (label(), color()) directly in the enum — enums are not just constants, but first-class classes.\n## Attribute: Code Metadata\n#[Attribute] class Todo { public function __construct(public string $priority) {} } — defines a custom attribute. #[Todo("high")] above a class — metadata readable at runtime via ReflectionClass. Attributes = a declarative way to add metadata without changing logic.\n## match(true): The Modern Switch\nmatch(true) { $nilai >= 90 => "A", ... } — evaluates boolean conditions in order. Great for range checks (cleaner than stacked if/elseif). match returns a value (not a statement).`,
    chId: 'Eksplorasi PHP 8: (1) buat enum Priority: string dengan method color() yang mengembalikan hex color, (2) buat attribute #[Route("/api/tugas", methods: ["GET"])] dan baca method serta path via ReflectionClass, (3) gunakan named arguments saat memanggil constructor: new BuatLaporan(priority: "high"), (4) gunakan nullsafe operator (?->) untuk chaining: $user?->getTask()?->getStatus()?->label().',
    chEn: 'Explore PHP 8: (1) create a Priority enum with a color() method that returns a hex color, (2) create a #[Route("/api/tasks", methods: ["GET"])] attribute and read the method and path via ReflectionClass, (3) use named arguments when calling the constructor: new BuatLaporan(priority: "high"), (4) use the nullsafe operator (?->) for chaining: $user?->getTask()?->getStatus()?->label().',
    sumId: 'Enum = tipe tetap. Attribute = metadata. match(true) = switch modern. nullsafe = chaining aman. Lanjut: testing.',
    sumEn: 'Enum = fixed type. Attribute = metadata. match(true) = modern switch. nullsafe = safe chaining. Next: testing.',
  },
  {
    num: 15, topicId: 'testing-phpunit',
    titleId: 'Testing dengan PHPUnit', titleEn: 'Testing with PHPUnit',
    codeFile: 'tests/Feature/TaskTest.php',
    files: {
      'phpunit.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"\n         bootstrap="vendor/autoload.php"\n         colors="true">\n    <testsuites>\n        <testsuite name="Feature">\n            <directory>tests/Feature</directory>\n        </testsuite>\n    </testsuites>\n    <php>\n        <env name="APP_ENV" value="testing"/>\n        <env name="DB_CONNECTION" value="sqlite"/>\n        <env name="DB_DATABASE" value=":memory:"/>\n    </php>\n</phpunit>\n`,
      'tests/TestCase.php': `<?php\n\nnamespace Tests;\n\nuse PHPUnit\\Framework\\TestCase;\n\nabstract class TestCase extends TestCase\n{\n}\n`,
      'tests/Feature/TaskTest.php': `<?php\n\nnamespace Tests\\Feature;\n\nuse App\\Models\\Task;\nuse PHPUnit\\Framework\\TestCase;\n\nclass TaskTest extends TestCase\n{\n    public function test_task_dapat_dibuat(): void\n    {\n        $task = new Task("Belajar PHPUnit", "Tulis test pertama");\n\n        $this->assertEquals("Belajar PHPUnit", $task->getJudul());\n        $this->assertFalse($task->isSelesai());\n    }\n\n    public function test_task_dapat_diselesaikan(): void\n    {\n        $task = new Task("Tugas", "Deskripsi");\n        $task->complete();\n\n        $this->assertTrue($task->isSelesai());\n    }\n\n    public function test_judul_tidak_boleh_kosong(): void\n    {\n        $this->expectException(\\InvalidArgumentException::class);\n\n        new Task("", "Deskripsi");\n    }\n}\n`,
      'src/Models/Task.php': `<?php\n\nnamespace App\\Models;\n\nclass Task\n{\n    private string $judul;\n    private string $deskripsi;\n    private bool $selesai = false;\n\n    public function __construct(string $judul, string $deskripsi)\n    {\n        if (empty($judul)) {\n            throw new \\InvalidArgumentException("Judul tidak boleh kosong");\n        }\n\n        $this->judul = $judul;\n        $this->deskripsi = $deskripsi;\n    }\n\n    public function complete(): void\n    {\n        $this->selesai = true;\n    }\n\n    public function getJudul(): string\n    {\n        return $this->judul;\n    }\n\n    public function isSelesai(): bool\n    {\n        return $this->selesai;\n    }\n}\n`,
      'composer.json': PKG('testing-phpunit', '', '"phpunit/phpunit": "^11.0"'),
      'package.json': PKG_NODE('php-lesson-15', DEV_SERVE),
      'README.md': `# PHP Lesson 15 - Testing with PHPUnit\n\nJalankan: composer install && vendor/bin/phpunit\n\nTest memverifikasi bahwa kode berperilaku sesuai harapan.\n`,
    },
    objId: ['Menulis test PHPUnit: assertEquals, assertTrue, expectException', 'Memahami struktur test class yang extends TestCase', 'Menguji perilaku sukses dan gagal (edge case)', 'Menjalankan test di terminal dan membaca hasilnya'],
    objEn: ['Write PHPUnit tests: assertEquals, assertTrue, expectException', 'Understand the test class structure extending TestCase', 'Test both success and failure behavior (edge cases)', 'Run tests in the terminal and read the results'],
    expId: `## Test: Kontrak yang Dieksekusi\nassertEquals($expected, $actual) — membandingkan nilai. assertTrue($condition) — memastikan kondisi benar. expectException(\\InvalidArgumentException::class) — memastikan kode melempar exception tertentu. Test membuktikan PERILAKU, bukan detail implementasi.\n## Test Class Structure\nclass TaskTest extends TestCase { public function test_nama_tes(): void { ... } } — setiap method yang diawali test_ adalah satu test case. PHPUnit menjalankan setiap method secara independen.\n## Red-Green-Refactor\nTulis test yang gagal (red), buat kode agar lewat (green), rapikan (refactor). vendor/bin/phpunit menjalankan semua test. vendor/bin/phpunit --filter test_nama_tes menjalankan satu test.`,
    expEn: `## Tests: A Contract That Executes\nassertEquals($expected, $actual) — compares values. assertTrue($condition) — ensures a condition is true. expectException(\\InvalidArgumentException::class) — ensures the code throws a specific exception. Tests prove BEHAVIOR, not implementation details.\n## Test Class Structure\nclass TaskTest extends TestCase { public function test_name(): void { ... } } — every method starting with test_ is one test case. PHPUnit runs each method independently.\n## Red-Green-Refactor\nWrite a failing test (red), make the code pass (green), clean up (refactor). vendor/bin/phpunit runs all tests. vendor/bin/phpunit --filter test_name runs a single test.`,
    chId: 'Tingkatkan testing: (1) tambah test untuk method complete() yang memastikan tugas bisa di-complete berkali-kali tanpa error, (2) tambah data provider (@dataProvider) untuk menguji berbagai input judul (kosong, spasi, sangat panjang), (3) buat test untuk kelas Task yang menguji semua method sekaligus (integration test), (4) tambahkan coverage report: vendor/bin/phpunit --coverage-text dan targetkan minimal 80%.',
    chEn: 'Level up testing: (1) add a test for the complete() method that ensures a task can be completed multiple times without error, (2) add a @dataProvider to test various title inputs (empty, whitespace, very long), (3) create a test for the Task class that tests all methods at once (integration test), (4) add a coverage report: vendor/bin/phpunit --coverage-text and target at least 80%.',
    sumId: 'assertEquals = bandingkan nilai. expectException = uji error. Red-Green-Refactor = alur test. Lanjut: proyek akhir.',
    sumEn: 'assertEquals = compare values. expectException = test errors. Red-Green-Refactor = test workflow. Next: final project.',
  },
  {
    num: 16, topicId: 'proyek-akhir',
    titleId: 'Proyek Akhir: Task Manager CLI', titleEn: 'Final Project: Task Manager CLI',
    codeFile: 'index.php',
    files: {
      'index.php': `<?php\n\nrequire_once __DIR__ . "/vendor/autoload.php";\n\nuse App\\Models\\Task;\nuse App\\Services\\TaskService;\n\n$service = new TaskService();\n\necho "=== Task Manager CLI ===\\n";\necho "Perintah: add, list, done, delete, quit\\n\\n";\n\nwhile (true) {\n    echo "> ";\n    $input = trim(fgets(STDIN));\n    $parts = explode(" ", $input, 2);\n    $cmd = $parts[0];\n    $arg = $parts[1] ?? "";\n\n    match ($cmd) {\n        "add" => $service->add($arg),\n        "list" => $service->list(),\n        "done" => $service->complete((int) $arg),\n        "delete" => $service->remove((int) $arg),\n        "quit" => exit("Selesai.\\n"),\n        default => echo "Perintah tidak dikenal: $cmd\\n",\n    };\n}\n`,
      'src/Models/Task.php': `<?php\n\nnamespace App\\Models;\n\nclass Task\n{\n    private static int $nextId = 1;\n\n    public function __construct(\n        public readonly int $id,\n        public string $judul,\n        public bool $selesai = false,\n    ) {\n        $this->id = $nextId++;\n    }\n}\n`,
      'src/Services/TaskService.php': `<?php\n\nnamespace App\\Services;\n\nuse App\\Models\\Task;\n\nclass TaskService\n{\n    /** @var Task[] */\n    private array $tasks = [];\n\n    public function add(string $judul): void\n    {\n        $this->tasks[] = new Task($judul);\n        echo "Ditambah: $judul\\n";\n    }\n\n    public function list(): void\n    {\n        if (empty($this->tasks)) {\n            echo "Belum ada tugas.\\n";\n            return;\n        }\n\n        foreach ($this->tasks as $t) {\n            $status = $t->selesai ? "✓" : "○";\n            echo "{$status} [{$t->id}] {$t->judul}\\n";\n        }\n    }\n\n    public function complete(int $id): void\n    {\n        foreach ($this->tasks as $t) {\n            if ($t->id === $id) {\n                $t->selesai = true;\n                echo "Selesai: {$t->judul}\\n";\n                return;\n            }\n        }\n        echo "Tugas #$id tidak ditemukan.\\n";\n    }\n\n    public function remove(int $id): void\n    {\n        foreach ($this->tasks as $i => $t) {\n            if ($t->id === $id) {\n                unset($this->tasks[$i]);\n                $this->tasks = array_values($this->tasks);\n                echo "Dihapus: #$id\\n";\n                return;\n            }\n        }\n        echo "Tugas #$id tidak ditemukan.\\n";\n    }\n}\n`,
      'composer.json': PKG('proyek-akhir'),
      'package.json': PKG_NODE('php-lesson-16', DEV_SERVE),
      'README.md': `# PHP Lesson 16 - Final Project: Task Manager CLI\n\nJalankan: composer install && npm run dev\nCoba: http://localhost:3000 (atau jalankan di terminal)\n\nFitur:\n- add "Tugas baru" — tambah tugas\n- list — tampilkan semua tugas\n- done [id] — tandai selesai\n- delete [id] — hapus tugas\n- quit — keluar\n\nKonsep yang dipakai: OOP (class Task, class TaskService), namespace, autoloading, match expression, array manipulation, CLI input (fgets/STDIN).\n`,
    },
    objId: ['Merangkai semua konsep PHP ke dalam satu proyek CLI', 'Menerapkan OOP dengan class Task dan class TaskService', 'Menggunakan match expression untuk routing perintah CLI', 'Membaca input dari CLI dengan fgets(STDIN)'],
    objEn: ['Assemble all PHP concepts into one CLI project', 'Apply OOP with Task class and TaskService class', 'Use match expression for CLI command routing', 'Read CLI input with fgets(STDIN)'],
    expId: `## Proyek Akhir: Menyatukan Semua\n20 pelajaran PHP dirangkum di sini: variabel & tipe (Lesson 2), string & array (Lesson 3), control flow (Lesson 4), fungsi (Lesson 5), OOP (Lesson 7-8), exception (Lesson 9), file & JSON (Lesson 10), PDO (Lesson 11), keamanan (Lesson 12), Composer (Lesson 13), PHP 8 features (Lesson 14), testing (Lesson 15). CLI Task Manager menggunakan semuanya.\n## Desain CLI\nfgets(STDIN) membaca input baris dari terminal. match($cmd) { ... } mengarahkan perintah ke method TaskService yang sesuai. Loop while(true) menjaga aplikasi berjalan sampai pengguna mengetik "quit".\n## OOP dalam Proyek Nyata\nTask (model data — id, judul, selesai) dan TaskService (logika bisnis — add, list, complete, remove). Pemisahan ini memudahkan pengujian dan pengembangan fitur baru (mis. tambah fitur prioritas hanya di TaskService, bukan di Task).\n## Dari CLI ke Web\nCLI adalah latihan yang bagus. Untuk proyek web sesungguhnya: ganti fgets(STDIN) dengan route handler (seperti di Laravel), simpan tugas di database (PDO dari Lesson 11), dan tambah HTML template.`,
    expEn: `## Final Project: Bringing It All Together\n20 PHP lessons summarized here: variables & types (Lesson 2), strings & arrays (Lesson 3), control flow (Lesson 4), functions (Lesson 5), OOP (Lessons 7-8), exceptions (Lesson 9), file & JSON (Lesson 10), PDO (Lesson 11), security (Lesson 12), Composer (Lesson 13), PHP 8 features (Lesson 14), testing (Lesson 15). The CLI Task Manager uses all of them.\n## CLI Design\nfgets(STDIN) reads a line of input from the terminal. match($cmd) { ... } routes the command to the appropriate TaskService method. The while(true) loop keeps the app running until the user types "quit".\n## OOP in a Real Project\nTask (data model — id, title, done) and TaskService (business logic — add, list, complete, remove). This separation makes it easy to test and add new features (e.g., add priority feature only in TaskService, not in Task).\n## From CLI to Web\nCLI is great practice. For a real web project: replace fgets(STDIN) with a route handler (like in Laravel), store tasks in a database (PDO from Lesson 11), and add an HTML template.`,
    chId: 'Tingkatkan proyek akhir: (1) tambah fitur edit: edit [id] "judul baru" untuk mengubah judul tugas, (2) tambah fitur filter: filter selesai/belum selesai, (3) simpan tugas ke file JSON (Lesson 10) agar data tetap ada setelah aplikasi ditutup, (4) tambah unit test untuk TaskService menggunakan PHPUnit (Lesson 15) — minimal 4 test: add, list, complete, delete.',
    chEn: 'Level up the final project: (1) add an edit feature: edit [id] "new title" to change a task title, (2) add a filter feature: filter done/undone, (3) save tasks to a JSON file (Lesson 10) so data persists after the app closes, (4) add unit tests for TaskService using PHPUnit (Lesson 15) — minimum 4 tests: add, list, complete, delete.',
    sumId: 'CLI = semua konsep dalam satu proyek. OOP = pemisahan model & service. match = routing. fgets = input CLI. Anda siap PHP!',
    sumEn: 'CLI = all concepts in one project. OOP = separate model & service. match = routing. fgets = CLI input. You are PHP-ready!',
  },
];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const levelDir = 'php';
  const mdDir = path.join(BASE_DIR, levelDir);
  fs.mkdirSync(mdDir, { recursive: true });

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\\n');

  for (const lang of ['id', 'en']) {
    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> PHP | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${title}

\`\`\`php
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\\s*/, '')}**`).join('\\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\\nGenerated ${total} PHP curriculum files (${LESSONS.length} lessons x 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);
