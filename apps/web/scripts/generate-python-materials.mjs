import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/python', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

// ===== PHASES (research-based: Scaler, MOOC.fi Helsinki, Real Python, DataCamp, CourseFacts,
//      That Le loop/collection syntheses, ACM/CIT misconceptions, CLT worked examples) =====
const PHASES = [
  { phase: 1, id: 'foundations', nameId: 'Foundasi Python', nameEn: 'Python Foundations' },
  { phase: 2, id: 'collections-functions', nameId: 'Koleksi & Fungsi', nameEn: 'Collections & Functions' },
  { phase: 3, id: 'oop-io', nameId: 'OOP & I/O', nameEn: 'OOP & I/O' },
  { phase: 4, id: 'real-world', nameId: 'Dunia Nyata', nameEn: 'Real-World Python' },
];

// StackBlitz WebContainers Python: stdlib-only (no pip/native packages).
// "python3" tersedia di shell; output console tampil di panel preview.
const BASE_PROJECT_FILES = {
  'package.json': JSON.stringify({
    name: 'python-lesson',
    version: '1.0.0',
    private: true,
    scripts: { dev: 'python3 index.py' },
  }, null, 2),
  'index.py': `print("Ganti dengan kode pelajaran")`,
};

// ===== PHASE 1: FOUNDATIONS (lessons 1-4) =====
const LESSONS_P1 = [
  {
    phase: 1, num: 1, topicId: 'pengenalan-variabel',
    titleId: 'Pengenalan Python & Variabel', titleEn: 'Python Intro & Variables',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `# Variabel adalah LABEL yang menunjuk ke sebuah nilai.
# Variabel BUKAN "kotak" yang menampung banyak nilai sekaligus.

name = "Ayu"
age = 26
height = 1.65
is_learner = True

print("Halo,", name, "!")
print(f"Umur: {age} tahun | Tinggi: {height} m | Pelajar: {is_learner}")

# Ekspresi dievaluasi saat program berjalan
print(f"Tahun depan: {age + 1}")
print(f"Umur dalam bulan: {age * 12}")

# Reassignment: nilai lama DIGANTI, bukan ditumpuk
score = 10
print(f"Score awal: {score}")
score = 20
print(f"Score baru: {score}")

# Tipe data: int, float, str, bool
print(type(42))     # <class 'int'>
print(type(3.14))   # <class 'float'>
print(type("42"))   # <class 'str'>  -- tanda kutip = string!
print(type(True))   # <class 'bool'>
`,
      };
    },
    objId: ['Memahami variabel sebagai label, bukan kotak', 'Mengenal 4 tipe data dasar: int, float, str, bool', 'Menulis output dengan f-strings', 'Memahami reassignment dan arti tanda kutip'],
    objEn: ['Understand variables as labels, not boxes', 'Know the 4 basic types: int, float, str, bool', 'Write output with f-strings', 'Understand reassignment and the meaning of quotes'],
    expId: `## Variabel = Label, Bukan Kotak
Riset misconception (Cabo, n=108) menemukan 37% pemula percaya variabel bisa menyimpan beberapa nilai sekaligus, dan 34% percaya nilai tidak bisa diganti. Faktanya: \`score = 10\` lalu \`score = 20\` — variabel menunjuk ke satu nilai; nilai lama diganti, tidak pernah menumpuk.
\n## Tipe Data
\`int\` (bilangan bulat), \`float\` (desimal), \`str\` (teks), \`bool\` (True/False). Gunakan \`type()\` untuk memeriksa. 46% pemula salah membedakan \`"2.5"\` (string!) dengan \`2.5\` (float) — tanda kutip menentukan tipe.
\n## f-strings
\`f"..."\` dengan \`{ekspresi}\` adalah satu-satunya cara format yang diajarkan di track ini (StackOverflow: "show only one method, stick to it"). Hindari \`+\` berantai dan legacy \`%\`/\`.format()\`.
\n## Reassignment & Komentar
Nama variabel case-sensitive dan harus deskriptif (\`is_learner\` bukan \`x\`). Komentar \`#\` menjelaskan "mengapa", bukan "apa".`,
    expEn: `## Variables = Labels, Not Boxes
Misconception research (Cabo, n=108) found 37% of beginners believe a variable can hold several values at once, and 34% believe values cannot be changed. In fact: \`score = 10\` then \`score = 20\` — a variable points to one value; the old value is replaced, never stacked.
\n## Data Types
\`int\` (integers), \`float\` (decimals), \`str\` (text), \`bool\` (True/False). Use \`type()\` to check. 46% of beginners misread \`"2.5"\` (a string!) vs \`2.5\` (a float) — quotes determine the type.
\n## f-strings
\`f"..."\` with \`{expression}\` is the only formatting approach taught in this track (StackOverflow: "show only one method, stick to it"). Avoid chained \`+\` and legacy \`%\`/\`.format()\`.
\n## Reassignment & Comments
Variable names are case-sensitive and should be descriptive (\`is_learner\`, not \`x\`). \`#\` comments explain "why", not "what".`,
    chId: 'Buat profil singkat dengan 4 variabel (str, int, float, bool) dan tampilkan dengan f-strings. Lalu prediksi output sebelum menjalankan: (1) \u0060a = 5; a = a + 3; print(a)\u0060, (2) \u0060b = "5"; print(b + 3)\u0060 — jelaskan kenapa (2) error (TypeError).',
    chEn: 'Create a short profile with 4 variables (str, int, float, bool) shown with f-strings. Then predict the output before running: (1) \u0060a = 5; a = a + 3; print(a)\u0060, (2) \u0060b = "5"; print(b + 3)\u0060 — explain why (2) errors (TypeError).',
    sumId: 'Variabel = label ke satu nilai. 4 tipe dasar + type(). f-strings untuk output. Reassignment mengganti, tidak menumpuk. Lanjut: tipe data & kondisi.',
    sumEn: 'Variables = labels to one value. 4 basic types + type(). f-strings for output. Reassignment replaces, never stacks. Next: data types & conditionals.',
  },
  {
    phase: 1, num: 2, topicId: 'tipe-data-kondisi',
    titleId: 'Tipe Data & Kondisi', titleEn: 'Data Types & Conditionals',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `# ---- Casting: mengubah antar tipe ----
age_str = "26"
age = int(age_str)
print(f"'{age_str}' -> int {age}, tahun depan {age + 1}")

price_str = "185000"
price = float(price_str)
print(f"Harga float: {price}, diskon 10%: {price * 0.10}")

# = vs == : = menugaskan, == membandingkan
total = 100
print(f"total = 100 -> {total}")
print(f"total == 100 -> {total == 100}")

# ---- Operator aritmatika ----
a, b = 7, 2
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}    (selalu float)")
print(f"{a} // {b} = {a // b}   (pembagian bulat)")
print(f"{a} % {b} = {a % b}    (sisa bagi)")
print(f"{a} ** {b} = {a ** b}  (pangkat)")

# ---- Kondisi: if / elif / else ----
umur = 24
if umur < 13:
    harga = 75000
elif umur <= 25:
    harga = 125000
elif umur <= 59:
    harga = 185000
else:
    harga = 100000
print(f"Umur {umur} -> tiket Rp {harga}")

# ---- Operator logika ----
kartu_member = True
if umur <= 25 and kartu_member:
    print("Bonus: dapat minuman gratis!")
if not kartu_member:
    print("Ajak teman untuk diskon kelompok")
`,
      };
    },
    objId: ['Melakukan casting antar tipe (int, float, str)', 'Menguasai operator aritmatika Python (//, %, **)', 'Membedakan = (assignment) dan == (perbandingan)', 'Menulis percabangan if/elif/else dengan logika'],
    objEn: ['Cast between types (int, float, str)', 'Master Python arithmetic operators (//, %, **)', 'Distinguish = (assignment) from == (comparison)', 'Write if/elif/else branching with logic'],
    expId: `## Casting
\`int("26")\`, \`float("185000")\`, \`str(42)\` mengubah tipe secara eksplisit. Input dari \`input()\` selalu string — lupa cast adalah sumber TypeError paling umum untuk pemula (Springer 2023: TypeError = error terbanyak kedua).
\n## Operator Aritmatika
\`/\` selalu menghasilkan float. \`//\` pembagian bulat, \`%\` sisa bagi, \`**\` pangkat. Urutan operasi: kurung dulu, lalu \`**\`, \`*\`/\`/\`//\`%\`, terakhir \`+\`/\`-\`.
\n## = vs ==
\`=\` menugaskan (hanya nama variabel di kiri!), \`==\` membandingkan. Menulis \`if harga = 100\` adalah SyntaxError — kesalahan khas dari kebiasaan matematika (riset Cabo: siswa menyamakan = dengan persamaan matematika).
\n## if / elif / else
Satu cabang yang cocok dieksekusi, urutan atas ke bawah. \`and\`/\`or\`/\`not\` menggabungkan kondisi. Aturan praktis: cek kasus paling spesifik/ekstrem paling atas.`,
    expEn: `## Casting
\`int("26")\`, \`float("185000")\`, \`str(42)\` convert types explicitly. Input from \`input()\` is always a string — forgetting to cast is the most common TypeError source for beginners (Springer 2023: TypeError is the 2nd most common error).
\n## Arithmetic Operators
\`/\` always produces a float. \`//\` floor division, \`%\` remainder, \`**\` power. Precedence: parentheses first, then \`**\`, \`*\`/\`/\`//\`%\`, finally \`+\`/\`-\`.
\n## = vs ==
\`=\` assigns (only a variable name on the left!), \`==\` compares. Writing \`if price = 100\` is a SyntaxError — a classic habit from math class (Cabo's research: students equate = with math equality).
\n## if / elif / else
The first matching branch runs, top to bottom. \`and\`/\`or\`/\`not\` combine conditions. Rule of thumb: check the most specific/extreme case first.`,
    chId: 'Buat kalkulator diskon toko: input harga asli dan tipe member (gold/silver/none). Diskon 20% gold, 10% silver. Jika total setelah diskon >= 500.000, tambah cashback 5%. Tampilkan rincian dengan f-strings.',
    chEn: 'Build a shop discount calculator: original price and member tier (gold/silver/none). 20% off gold, 10% silver. If the discounted total is >= 500,000, add 5% cashback. Show details with f-strings.',
    sumId: 'Casting, operator aritmatika, = vs ==, if/elif/else + logika. Common mistakes: satu = di kondisi, lupa cast input. Lanjut: perulangan for-first.',
    sumEn: 'Casting, arithmetic operators, = vs ==, if/elif/else + logic. Common mistakes: single = in conditions, forgetting to cast input. Next: for-first loops.',
  },
  {
    phase: 1, num: 3, topicId: 'perulangan',
    titleId: 'Perulangan: for-first', titleEn: 'Loops: for-first',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `# ===== FOR dulu, WHILE kedua (riset: That Le 2026) =====
# Di Python, for over iterable = konstruk kanonik.
# while = pengecualian, dipelajari belakangan.

# for x in range(n): menghasilkan 0..n-1
for i in range(5):
    print(f"range(5) -> {i}")

# range(start, stop, step) -- stop EXCLUSIVE (sumber off-by-one!)
print("range(2, 8, 2):")
for i in range(2, 8, 2):
    print(" ", i)

# Iterasi atas string
for ch in "tryngo":
    print(ch, end="-")
print()

# Iterasi atas list
for buah in ["apel", "mangga", "pisang"]:
    print(f"Buah: {buah}")

# Off-by-one: range(1, 4) = 1,2,3 -- BUKAN 4!
print("range(1, 4):", list(range(1, 4)))

# break & continue
for i in range(10):
    if i == 3:
        continue          # lewati 3
    if i == 7:
        break             # berhenti di 7
    print(i, end=" ")
print()

# while = kasus pengecualian: 3 komponen wajib
i = 0                    # 1. inisialisasi
while i < 5:             # 2. kondisi
    print("while:", i)
    i += 1               # 3. update -- lupa = infinite loop!

# FizzBuzz klasik (latihan standar industri)
for n in range(1, 16):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)
`,
      };
    },
    objId: ['Memahami mengapa for lebih dulu daripada while di Python', 'Menguasai range() dan boundary off-by-one', 'Menggunakan break dan continue', 'Menulis while sebagai kasus pengecualian (3 komponen)'],
    objEn: ['Understand why for comes before while in Python', 'Master range() and off-by-one boundaries', 'Use break and continue', 'Write while as the exception case (3 components)'],
    expId: `## Mengapa for Duluan?
Sintesis riset 4 dekade (That Le 2026, merangkum Soloway, Mselle, Sorva, Caceffo, Lister): tradisi "while first" adalah warisan C/Pascal/Java. Di Python, \`for x in iterable\` punya misconception density rendah — deterministik, tanpa miskonsepsi infinite loop, dan transfer mulus ke comprehensions.
\n## range() dan Off-by-One
\`range(stop)\` berhenti di \`stop - 1\` (exclusive). Riset ACM (2020): off-by-one umum dan menetap di kalangan mahasiswa. Latihan: selalu cek boundary — iterasi terbalik (\`range(5, 0, -1)\`) juga rawan error; sengaja dilatih di Eksperimen.
\n## break & continue
\`break\` menghentikan loop sepenuhnya; \`continue\` melompat ke iterasi berikutnya. Misconception tervalidasi instruktur: banyak yang mengira loop berhenti segera saat kondisi false — padahal body yang sedang berjalan diselesaikan dulu.
\n## while: Kasus Pengecualian
Gunakan \`while\` hanya saat iterasi bukan atas iterable (mis. sampai kondisi terpenuhi). Pola 3 komponen (py4e): inisialisasi -> kondisi -> update. Lupa update = infinite loop; StackOverflow: 90% program Python bisa tanpa while.`,
    expEn: `## Why for First?
A synthesis of 4 decades of research (That Le 2026, covering Soloway, Mselle, Sorva, Caceffo, Lister): the "while first" tradition is C/Pascal/Java heritage. In Python, \`for x in iterable\` has low misconception density — deterministic, no infinite-loop misconception, and it transfers cleanly to comprehensions.
\n## range() and Off-by-One
\`range(stop)\` stops at \`stop - 1\` (exclusive). ACM research (2020): off-by-one errors are common and persist among students. Practice: always check boundaries — reverse iteration (\`range(5, 0, -1)\`) is also error-prone; deliberately trained in Experiments.
\n## break & continue
\`break\` exits the loop entirely; \`continue\` jumps to the next iteration. An instructor-validated misconception: many think the loop stops as soon as the condition is false — but the current body finishes first.
\n## while: The Exception Case
Use \`while\` only when iteration is not over an iterable (e.g. until a condition holds). The 3-component pattern (py4e): initialize -> condition -> update. Forgetting the update = infinite loop; StackOverflow: 90% of Python programs can be written without while.`,
    chId: 'Buat pola segitiga asterisk: input tinggi segitiga (mis. 5), tampilkan baris 1..5 dengan jumlah * sesuai nomor baris (nested loop). Lalu tabel perkalian 1..5 x 1..5. Prediksi output sebelum menjalankan.',
    chEn: 'Build an asterisk triangle: input height (e.g. 5), show rows 1..5 with asterisks matching the row number (nested loops). Then a 1..5 x 1..5 multiplication table. Predict the output before running.',
    sumId: 'for-first: for x in range/iterable dulu, while belakangan. range stop-exclusive = sumber off-by-one. break/continue. Lanjut: proyek strings & list.',
    sumEn: 'for-first: for x in range/iterable first, while later. range stop is exclusive = off-by-one source. break/continue. Next: strings & lists project.',
  },
  {
    phase: 1, num: 4, topicId: 'strings-list-proyek',
    titleId: 'Proyek: Strings, List & Number Guessing', titleEn: 'Project: Strings, Lists & Number Guessing',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `import random

# ===== Strings & Lists =====
nama = "tryngo academy"
print(f"Panjang: {len(nama)} | Kapital: {nama.upper()}")
print(f"Split: {nama.split()}")

kata_kata = ["python", "belajar", "menyenangkan"]
print("Join:", " ".join(kata_kata))

teks = "   halo dunia   "
print(f"Strip: '{teks.strip()}'")
print(f"Replace: {teks.strip().replace('halo', 'hai')}")

# Slicing: [start:stop:step] -- stop EXCLUSIVE
pesan = "abcdef"
print(f"pesan[0:3] = {pesan[0:3]}")
print(f"pesan[::-1] = {pesan[::-1]} (terbalik)")
print(f"pesan[::2] = {pesan[::2]} (tiap 2 karakter)")

# String immutable: method mengembalikan string BARU
s = "abc"
s2 = s.upper()
print(f"s tetap '{s}', s2 = '{s2}'")

# List mutable: method mengubah langsung
angka = [3, 1, 4, 1, 5]
angka.append(9)
angka.sort()
print(f"List setelah append+sort: {angka}")

# ===== Number Guessing Game (simulasi auto-play) =====
# Versi interaktif memakai input(); di sini game "bermain sendiri"
# agar bisa dijalankan di preview. Strategi: bagi dua rentang.
secret = random.randint(1, 20)
tebakan = []
low, high = 1, 20
while True:
    guess = (low + high) // 2
    tebakan.append(guess)
    if guess == secret:
        break
    elif guess < secret:
        low = guess + 1
    else:
        high = guess - 1
print(f"\\nAngka rahasia: {secret}")
print(f"Tebakan: {tebakan} ({len(tebakan)} langkah)")
`,
      };
    },
    objId: ['Menguasai slicing string dan konsep immutability', 'Menggunakan split/join sebagai jembatan string-list', 'Memahami mutability list (append, sort, pop)', 'Menggabungkan loop + list + random dalam satu program'],
    objEn: ['Master string slicing and the immutability concept', 'Use split/join as the string-list bridge', 'Understand list mutability (append, sort, pop)', 'Combine loops + lists + random in one program'],
    expId: `## Slicing
\`teks[start:stop:step]\` — start inclusive, stop exclusive, step opsional. \`[::-1]\` membalik. Slicing tidak pernah melempar IndexError (datafield.dev): out-of-range ditangani diam-diam — indeks tunggal bisa error, slice tidak.
\n## Immutability: Threshold Concept
String tidak bisa diubah in-place; method mengembalikan string BARU. Ini "trips up nearly every beginner" (datafield) dan fondasi memahami references nanti (riset Glasgow: hanya 2% mahasiswa benar soal \`+=\` vs \`append\`).
\n## split/join: Jembatan Strings <-> List
\`.split()\` memecah string menjadi list; \`" ".join(list)\` menggabungkan kembali. Dua method paling powerful untuk pemrosesan teks — dipakai lagi di Contact Book dan Expense Tracker nanti.
\n## import random
\`import random\` memuat modul stdlib; \`random.randint(a, b)\` mengembalikan int acak inklusif. Memakai modul sejak dini tanpa lesson tersendiri adalah pola yang valid (Scaler: proyek #1 Number Guessing memakai random di modul 1-2).
\n## Common Mistakes
Method tanpa tanda kurung (\`s.upper\` bukan \`s.upper()\`), mengubah list saat diiterasi, \`pesan[3]\` di luar indeks (IndexError), memakai \`+\` untuk string di dalam loop besar (pakai join).`,
    expEn: `## Slicing
\`text[start:stop:step]\` — start inclusive, stop exclusive, step optional. \`[::-1]\` reverses. Slicing never raises IndexError (datafield.dev): out-of-range is handled silently — single indexing can error, slicing cannot.
\n## Immutability: A Threshold Concept
Strings cannot change in place; methods return NEW strings. This "trips up nearly every beginner" (datafield) and is the foundation for understanding references later (Glasgow research: only 2% of students got \`+=\` vs \`append\` right).
\n## split/join: The Strings <-> List Bridge
\`.split()\` breaks a string into a list; \`" ".join(list)\` reassembles it. The two most powerful text-processing methods — reused in the Contact Book and Expense Tracker later.
\n## import random
\`import random\` loads a stdlib module; \`random.randint(a, b)\` returns a random int, inclusive. Using a module early without a dedicated lesson is a valid pattern (Scaler: project #1 Number Guessing uses random in modules 1-2).
\n## Common Mistakes
Methods without parentheses (\`s.upper\` not \`s.upper()\`), mutating a list while iterating over it, \`message[3]\` out of range (IndexError), building strings with \`+\` inside big loops (use join).`,
    chId: 'Ubah ke versi interaktif: ganti \u0060random.randint\u0060 dengan \u0060input()\u0060 sehingga pemain menebak sendiri. Batasi 5 kesempatan, beri petunjuk "terlalu besar/kecil", tampilkan skor = sisa kesempatan. Bonus: simpan riwayat tebakan dalam list dan tampilkan di akhir.',
    chEn: 'Convert to the interactive version: replace the auto-guess loop with \u0060input()\u0060 so the player guesses. Limit to 5 tries, give "too high/low" hints, show score = tries left. Bonus: keep the guess history in a list and show it at the end.',
    sumId: 'Slicing & immutability string, split/join bridge, list mutable, import random, loop+list bersama. Fase 1 selesai: Anda bisa program utuh. Lanjut: fungsi.',
    sumEn: 'Slicing & string immutability, split/join bridge, mutable lists, import random, loops+lists together. Phase 1 done: you can write full programs. Next: functions.',
  },
];

// ===== PHASE 2: COLLECTIONS & FUNCTIONS (lessons 5-8) =====
const LESSONS_P2 = [
  {
    phase: 2, num: 5, topicId: 'fungsi-dasar',
    titleId: 'Fungsi Dasar', titleEn: 'Functions Basics',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `# ===== Definisi & pemanggilan =====
def sapa(nama):
    return f"Halo, {nama}!"

print(sapa("Ayu"))
print(sapa("Budi"))

# ===== Parameter vs Argument =====
# parameter = nama di def; argument = nilai saat dipanggil
def celsius_ke_fahrenheit(c):
    return c * 9 / 5 + 32

print(f"25C = {celsius_ke_fahrenheit(25)}F")

# ===== Keyword arguments =====
def perkenalan(nama, umur, kota):
    return f"{nama} ({umur}) dari {kota}"

print(perkenalan("Ayu", 26, "Jakarta"))                    # positional
print(perkenalan(kota="Bandung", umur=30, nama="Budi"))    # keyword, urutan bebas

# ===== Default values (wajib SETELAH non-default) =====
def sapa_v2(nama, sapaan="Halo"):
    return f"{sapaan}, {nama}!"

print(sapa_v2("Ayu"))
print(sapa_v2("Budi", "Selamat pagi"))

# ===== return vs print (perangkap klasik!) =====
def cetak_kuadrat(x):
    print(x * x)        # hanya menampilkan

def hasil_kuadrat(x):
    return x * x        # mengembalikan nilai

cetak_kuadrat(4)
nilai = hasil_kuadrat(4)
print(f"hasil_kuadrat(4) = {nilai}, bisa dipakai lagi: {nilai * 2}")

# print mengembalikan None:
x = print("ini print")
print(f"Nilai dari print: {x}")   # None!

# ===== Multiple returns =====
def min_max(data):
    return min(data), max(data)

daftar = [3, 8, 2, 9, 5]
terkecil, terbesar = min_max(daftar)
print(f"Min: {terkecil}, Max: {terbesar}")
`,
      };
    },
    objId: ['Mendefinisikan dan memanggil fungsi dengan def', 'Membedakan parameter (def) dan argument (call)', 'Menggunakan keyword arguments dan default values', 'Memahami perbedaan return dan print'],
    objEn: ['Define and call functions with def', 'Distinguish parameters (def) from arguments (call)', 'Use keyword arguments and default values', 'Understand the difference between return and print'],
    expId: `## Parameter vs Argument
Parameter = nama di baris \`def\`; argument = nilai saat dipanggil. Perbedaan ini penting untuk membaca error message (SkillWisor, bishrulhaq). Fungsi didefinisikan sekali, dipanggil berkali-kali — DRY.
\n## Keyword & Default
\`perkenalan(kota="Bandung", ...)\` membuat pemanggilan self-documenting. Default value membuat parameter opsional — aturan wajib: parameter ber-default harus SETELAH yang tanpa default, atau SyntaxError.
\n## return vs print
\`print\` menampilkan; \`return\` menyerahkan nilai ke pemanggil. Perangkap klasik: \`x = print("hi")\` membuat \`x\` berisi \`None\`! Fungsi yang "menghitung" harus return, bukan print (StackOverflow: "Forbid print() in functions").
\n## Multiple Returns
\`return a, b\` mengembalikan tuple; \`terkecil, terbesar = ...\` unpacking langsung. Pola ini dipakai di mana-mana di stdlib.
\n## Common Mistakes
Lupa return (fungsi mengembalikan None diam-diam), memanggil fungsi tanpa kurung, \`print(hasil_kuadrat)\` (mencetak objek fungsi, bukan hasil).`,
    expEn: `## Parameters vs Arguments
Parameters are the names in the \`def\` line; arguments are the values passed at the call. This distinction matters for reading error messages (SkillWisor, bishrulhaq). Define once, call many times — DRY.
\n## Keyword & Defaults
\`perkenalan(kota="Bandung", ...)\` makes calls self-documenting. Default values make parameters optional — hard rule: parameters with defaults must come AFTER those without, or SyntaxError.
\n## return vs print
\`print\` displays; \`return\` hands a value back to the caller. Classic trap: \`x = print("hi")\` leaves \`x\` holding \`None\`! Functions that "compute" must return, not print (StackOverflow: "Forbid print() in functions").
\n## Multiple Returns
\`return a, b\` returns a tuple; \`smallest, largest = ...\` unpacks directly. This pattern is everywhere in the stdlib.
\n## Common Mistakes
Forgetting return (functions silently return None), calling a function without parentheses, \`print(hasil_kuadrat)\` (printing the function object, not the result).`,
    chId: 'Buat fungsi \u0060hitung_imt(berat_kg, tinggi_m)\u0060 mengembalikan tuple (imt, kategori) dengan kategori dari if/elif. Buat fungsi \u0060konversi_uang(jumlah, kurs)\u0060 dengan default kurs 16000. Refactor: semua logika di Challenge sebelumnya dipindah ke fungsi.',
    chEn: 'Create \u0060hitung_imt(berat_kg, tinggi_m)\u0060 returning a tuple (imt, category) with the category from if/elif. Create \u0060konversi_uang(jumlah, kurs)\u0060 with kurs defaulting to 16000. Refactor: move previous Challenge logic into functions.',
    sumId: 'Fungsi: def, parameter vs argument, keyword/default, return vs print, multiple returns. Fondasi sebelum OOP. Lanjut: scope & lambda.',
    sumEn: 'Functions: def, parameters vs arguments, keyword/defaults, return vs print, multiple returns. The foundation before OOP. Next: scope & lambda.',
  },
  {
    phase: 2, num: 6, topicId: 'fungsi-lanjut',
    titleId: 'Fungsi Lanjutan & Scope', titleEn: 'Advanced Functions & Scope',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `# ===== Scope: lokal vs global =====
total = 0                      # global scope

def hitung(angka):
    total = angka * 2          # LOKAL: tidak mengubah global
    return total

print(f"Hasil fungsi: {hitung(5)}")
print(f"Global total tetap: {total}")

# LEGB: Local -> Enclosing -> Global -> Built-in
def luar():
    pesan = "dari luar"
    def dalam():
        return pesan           # membaca dari Enclosing scope
    return dalam()

print(luar())

# ===== *args dan **kwargs =====
def jumlahkan(*args):
    return sum(args)

print(f"jumlahkan(1,2,3,4) = {jumlahkan(1, 2, 3, 4)}")

def profil(**kwargs):
    return ", ".join(f"{k}={v}" for k, v in kwargs.items())

print(profil(nama="Ayu", umur=26, kota="Jakarta"))

# ===== Docstrings =====
def luas_persegi(sisi):
    """Menghitung luas persegi.

    Parameter:
        sisi (int/float): panjang sisi.
    Return:
        Luas = sisi * sisi.
    """
    return sisi * sisi

print(f"Luas: {luas_persegi(4)}")
print(f"Docstring: {luas_persegi.__doc__.strip().splitlines()[0]}")

# ===== Lambda =====
produk = [("Keyboard", 750000), ("Monitor", 3200000), ("Hub", 250000)]
produk.sort(key=lambda item: item[1])   # urutkan by harga
print("Produk termurah dulu:", produk)

# ===== Perangkap: mutable default argument =====
def tambah_item_bug(item, daftar=[]):     # BUG: default dievaluasi SEKALI
    daftar.append(item)
    return daftar

def tambah_item_aman(item, daftar=None):
    if daftar is None:
        daftar = []
    daftar.append(item)
    return daftar

print("Bug:", tambah_item_bug("a"), tambah_item_bug("b"))
print("Aman:", tambah_item_aman("a"), tambah_item_aman("b"))
`,
      };
    },
    objId: ['Memahami scope lokal vs global dan aturan LEGB', 'Menggunakan *args dan **kwargs', 'Menulis docstring yang baik', 'Memakai lambda sebagai fungsi kecil', 'Menghindari perangkap mutable default'],
    objEn: ['Understand local vs global scope and the LEGB rule', 'Use *args and **kwargs', 'Write good docstrings', 'Use lambda as a tiny function', 'Avoid the mutable default trap'],
    expId: `## Scope & LEGB
Nama dicari dengan urutan: Local -> Enclosing -> Global -> Built-in. Variabel yang di-assign di dalam fungsi adalah lokal — tidak mengubah variabel global dengan nama sama (MOOC.fi Part 6 menempatkan materi ini satu paket dengan error handling). \`global\` ada, tapi saran profesional: jangan.
\n## *args dan **kwargs
\`*args\` mengumpulkan argument posisi ekstra menjadi tuple; \`**kwargs\` argument keyword menjadi dict. Kamu akan jarang menulisnya, tapi sering membacanya di library (print sendiri memakai \`*args\`).
\n## Docstrings
\`"""..."""\` tepat setelah def: tujuan, parameter, return. Bukan komentar biasa — menjadi \`__doc__\` dan dibaca tooling. Lalu diakses dengan \`help()\`.
\n## Lambda
\`lambda x: x * 2\` = fungsi satu ekspresi tanpa nama. Hanya untuk callback singkat (sort key, filter). Lebih dari satu baris? Ubah jadi \`def\` — keterbacaan menang. Fungsi adalah nilai: bisa disimpan, dipassing, dikembalikan.
\n## Perangkap: Mutable Default
Default dievaluasi SEKALI saat def. \`daftar=[]\` dibagi semua pemanggilan — item menumpuk misterius. Idiom benar: \`daftar=None\` lalu buat list baru di dalam.`,
    expEn: `## Scope & LEGB
Names are resolved: Local -> Enclosing -> Global -> Built-in. Variables assigned inside a function are local — they do not change a same-named global (MOOC.fi Part 6 groups this with error handling). \`global\` exists, but the professional advice is blunt: don't.
\n## *args and **kwargs
\`*args\` packs extra positional arguments into a tuple; \`**kwargs\` keyword arguments into a dict. You will rarely write them, but constantly read them in libraries (print itself uses \`*args\`).
\n## Docstrings
\`"""..."""\` right after def: purpose, parameters, return. Not a regular comment — it becomes \`__doc__\` and tooling reads it. Access it with \`help()\`.
\n## Lambda
\`lambda x: x * 2\` = a single-expression anonymous function. Only for short callbacks (sort keys, filters). More than one line? Promote it to a \`def\` — readability wins. Functions are values: store them, pass them, return them.
\n## The Mutable Default Trap
Defaults are evaluated ONCE at definition time. \`daftar=[]\` is shared across calls — items mysteriously accumulate. The correct idiom: \`daftar=None\`, create the list inside.`,
    chId: 'Tulis \u0060rata_rata(*nilai)\u0060 (return rata-rata, raise ValueError jika kosong), \u0060filter_lebih_dari(daftar, ambang)\u0060 memakai lambda+filter, dan refactor program FizzBuzz sebelumnya menjadi fungsi \u0060fizzbuzz(n)\u0060 yang mengembalikan list hasil.',
    chEn: 'Write \u0060rata_rata(*nilai)\u0060 (return the average, raise ValueError if empty), \u0060filter_lebih_dari(daftar, ambang)\u0060 using lambda+filter, and refactor the earlier FizzBuzz into a \u0060fizzbuzz(n)\u0060 function returning a list of results.',
    sumId: 'Scope/LEGB, *args/**kwargs, docstrings, lambda, mutable default trap. Fungsi = nilai. Lanjut: dictionary, set & comprehensions.',
    sumEn: 'Scope/LEGB, *args/**kwargs, docstrings, lambda, mutable default trap. Functions = values. Next: dictionaries, sets & comprehensions.',
  },
  {
    phase: 2, num: 7, topicId: 'dictionary-set',
    titleId: 'Dictionary, Set & Comprehensions', titleEn: 'Dictionaries, Sets & Comprehensions',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `# ===== Masalah: parallel lists (MIT OCW) =====
nama = ["Ayu", "Budi", "Citra"]
nilai = [90, 78, 85]
# Menjaga 2 list sinkron itu rapuh -- DICTIONARY lebih bersih.

# ===== Dictionary: key -> value =====
nilai_siswa = {"Ayu": 90, "Budi": 78, "Citra": 85}
print(f"Nilai Ayu: {nilai_siswa['Ayu']}")
nilai_siswa["Dewi"] = 92          # tambah
nilai_siswa["Ayu"] = 95           # update
del nilai_siswa["Budi"]           # hapus
print(f"Setelah update: {nilai_siswa}")

# ===== KeyError & .get() =====
# nilai_siswa["Zainal"]  -> KeyError! (error dict paling umum)
print(f"get() aman: {nilai_siswa.get('Zainal')}")
print(f"get() + default: {nilai_siswa.get('Zainal', 0)}")
print(f"Cek key: {'Ayu' in nilai_siswa}")

# ===== Iterasi: keys, values, items =====
for nama_siswa in nilai_siswa:
    print(f"Key: {nama_siswa}")
for nama_siswa, nilai_angka in nilai_siswa.items():
    print(f"{nama_siswa}: {nilai_angka}")

# ===== Set: unik + membership cepat =====
warna = {"merah", "biru", "hijau", "merah"}
print(f"Set (duplikat hilang): {warna}")
print(f"'merah' in warna: {'merah' in warna}")
# {} membuat DICT kosong, bukan set!
set_kosong = set()
print(f"set() kosong: {set_kosong}, type: {type(set_kosong)}")

# ===== Word frequency (contoh klasik MIT) =====
lirik = "kita semua saudara kita semua sama kita satu"
kata_list = lirik.split()
frekuensi = {}
for kata in kata_list:
    frekuensi[kata] = frekuensi.get(kata, 0) + 1
print(f"Frekuensi kata: {frekuensi}")

# ===== Comprehensions =====
kuadrat = [n * n for n in range(1, 6)]
print(f"Kuadrat: {kuadrat}")
genap = [n for n in range(1, 11) if n % 2 == 0]
print(f"Genap: {genap}")
dua_kali = {n: n * 2 for n in range(3)}
print(f"Dict comp: {dua_kali}")
`,
      };
    },
    objId: ['Menyelesaikan masalah parallel lists dengan dict', 'Melakukan CRUD dan memahami KeyError + .get()', 'Mengiterasi keys, values, items', 'Memakai set untuk unique & membership', 'Menulis list/dict comprehensions'],
    objEn: ['Solve the parallel lists problem with dicts', 'Do CRUD and understand KeyError + .get()', 'Iterate keys, values, items', 'Use sets for uniqueness & membership', 'Write list/dict comprehensions'],
    expId: `## Motivasi: Parallel Lists
Tiga list paralel (nama, nilai) harus berubah bersamaan di setiap operasi — rapuh (MIT OCW Lecture 14). Dict menggabungkan data yang berelasi: \`nilai_siswa["Ayu"]\` langsung dapat nilai tanpa mencari index. Ordering: Python 3.7+ dict mempertahankan insertion order.
\n## KeyError & .get()
KeyError adalah error dict paling umum (datafield.dev): typo case-sensitive (\`"torch"\` vs \`"Torch"\`), mengasumsikan key ada, \`1\` vs \`"1"\` beda key. \`.get()\` untuk key yang boleh tidak ada (counting, config opsional); \`dict[key]\` saat key WAJIB ada — error lebih baik daripada bug diam-diam.
\n## Iterasi Dictionary
\`for k in d\` = keys. \`.items()\` untuk (key, value) — unpacking dua nama. Jangan \`.keys()\`+\`.values()\` terpisah jika bisa \`.items()\`.
\n## Set
Set = koleksi unik tanpa urutan; \`in\` O(1). \`{}\` membuat dict kosong — gotcha terkenal: set kosong wajib \`set()\`. Urutan tidak dijamin — jangan andalkan.
\n## Comprehensions
\`[ekspresi for x in iterable if kondisi]\` — ringkas dan idiomatis, transfer langsung dari for-first. Jangan memaksa: if/else kompleks atau nested loop -> pakai for biasa (datafield: "readability always wins").
\n## Pilih Struktur Data yang Tepat
Urutan + posisi -> list. Immutable -> tuple. Key-value lookup cepat -> dict. Unik + membership -> set. Hitung kemunculan -> dict + get(). Hapus duplikat -> set(list).`,
    expEn: `## The Parallel Lists Motivation
Three parallel lists (names, scores) must change together on every operation — fragile (MIT OCW Lecture 14). Dicts group related data: \`nilai_siswa["Ayu"]\` gets the score directly, no index search. Order: Python 3.7+ dicts preserve insertion order.
\n## KeyError & .get()
KeyError is the most common dict error (datafield.dev): case-sensitive typos (\`"torch"\` vs \`"Torch"\`), assuming a key exists, \`1\` vs \`"1"\` are different keys. Use \`.get()\` when a missing key is expected (counting, optional config); use \`dict[key]\` when the key MUST exist — an error beats a silent bug.
\n## Dict Iteration
\`for k in d\` = keys. \`.items()\` for (key, value) — unpack two names. Prefer \`.items()\` over separate \`.keys()\`+\`.values()\`.
\n## Sets
Sets are unordered unique collections; \`in\` is O(1). \`{}\` creates an empty dict — a famous gotcha: an empty set requires \`set()\`. Order is not guaranteed — never rely on it.
\n## Comprehensions
\`[expression for x in iterable if condition]\` — concise and idiomatic, a direct transfer from for-first. Don't force it: complex if/else or nested loops -> use a plain for (datafield: "readability always wins").
\n## Choose the Right Data Structure
Ordered sequence -> list. Immutable -> tuple. Fast key lookup -> dict. Unique + membership -> set. Count occurrences -> dict + get(). Deduplicate -> set(list).`,
    chId: 'Buat program penghitung kata unik: (1) baca kalimat, split, hitung frekuensi tiap kata dengan dict, (2) tampilkan 3 kata teratas urut frekuensi (sorted dengan key=lambda), (3) daftar kata unik dengan set, (4) buat inverted index sederhana: {kata: [indeks kalimat]}.',
    chEn: 'Build a unique-word counter: (1) read a sentence, split, count each word with a dict, (2) show the top 3 words by frequency (sorted with key=lambda), (3) unique words with a set, (4) a simple inverted index: {word: [sentence indices]}.',
    sumId: 'Dict = key-value lookup, KeyError/.get(), iterasi items, set unik, comprehensions. Siap untuk modul & error handling. Lanjut: Contact Book.',
    sumEn: 'Dicts = key-value lookup, KeyError/.get(), items() iteration, unique sets, comprehensions. Ready for modules & error handling. Next: Contact Book.',
  },
  {
    phase: 2, num: 8, topicId: 'modul-error-proyek',
    titleId: 'Proyek: Modul & Error Handling + Contact Book', titleEn: 'Project: Modules & Error Handling + Contact Book',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `import math
import random
import datetime

# ===== Modul & stdlib =====
print(f"pi = {math.pi:.4f}")
print(f"sqrt(144) = {math.sqrt(144)}")
print(f"Random 1-10: {random.randint(1, 10)}")
print(f"Hari ini: {datetime.date.today()}")

from math import floor, ceil
print(f"floor(3.7) = {floor(3.7)}, ceil(3.2) = {ceil(3.2)}")

# ===== Error handling: baca traceback dulu! =====
# SyntaxError: salah ketik sintaks
# TypeError: tipe tidak cocok (mis. "5" + 5)
# NameError: nama belum didefinisikan

try:
    angka = int("tiga")          # ValueError!
except ValueError as err:
    print(f"Tertangkap: {err}")
finally:
    print("finally selalu jalan")

try:
    hasil = 10 / 0               # ZeroDivisionError
except ZeroDivisionError:
    print("Pembagian nol! Cek logika anda.")
else:
    print(f"Hasil: {hasil}")

# raising
def cek_umur(umur):
    if umur < 0:
        raise ValueError("Umur tidak boleh negatif")
    return umur

print(f"Umur valid: {cek_umur(25)}")

# ===== Contact Book (dictionary + functions) =====
kontak = {
    "Ayu": "0812-3456-7890",
    "Budi": "0813-9876-5432",
}

def tampilkan(kontak):
    if not kontak:
        print("(kontak kosong)")
    for nama, no in kontak.items():
        print(f"  {nama}: {no}")

def tambah(kontak, nama, no):
    kontak[nama] = no
    print(f"  '{nama}' ditambahkan.")

def cari(kontak, nama):
    no = kontak.get(nama)
    if no is None:
        print(f"  '{nama}' tidak ditemukan.")
    else:
        print(f"  {nama}: {no}")

print("\\n=== Contact Book ===")
tampilkan(kontak)
tambah(kontak, "Citra", "0821-111-2222")
cari(kontak, "Citra")
cari(kontak, "Zainal")
`,
      };
    },
    objId: ['Menggunakan import dan from-import', 'Mengenal stdlib: math, random, datetime', 'Menangani error dengan try/except/else/finally', 'Melempar error sendiri dengan raise', 'Membangun Contact Book dengan dict + fungsi'],
    objEn: ['Use import and from-import', 'Know the stdlib: math, random, datetime', 'Handle errors with try/except/else/finally', 'Raise your own errors', 'Build a Contact Book with dicts + functions'],
    expId: `## Modul & Import
\`import math\` lalu \`math.pi\`; \`from math import floor\` untuk nama langsung. Stdlib = "baterai bawaan" Python: math, random, datetime, json, csv, os (MOOC.fi Part 7). Modul sendiri dipelajari di Phase 4.
\n## Membaca Traceback
Riset (Springer 2023): SyntaxError = 29% semua error pemula, lalu TypeError; hanya 35% siswa paham isi traceback. Baca dari BAWAH ke atas: baris terakhir = jenis error + pesan, di atasnya = lokasi. "Finding and fixing bugs" = tantangan terbesar pemula (Lahtinen 2005) — jadi keahlian ini dilatih eksplisit.
\n## try / except / else / finally
\`try\` blok berisiko; \`except\` menangkap (spesifik dulu!); \`else\` jalan saat TANPA error; \`finally\` selalu jalan (untuk cleanup). Tangkap \`ValueError\`, jangan \`except:\` telanjang yang menyembunyikan semua error.
\n## raise
Lempar error sendiri saat kontrak dilanggar (\`cek_umur(-1)\`). Error yang eksplisit > bug yang diam. Nanti dipakai di kelas (phase 3) untuk validasi saldo.
\n## Common Mistakes
Except telanjang, menangkap lalu diam (debugging mimpi buruk), \`except ValueError as err\` lupa as, mengabaikan traceback, membandingkan dengan \`==\` setelah get() tanpa cek None.`,
    expEn: `## Modules & Imports
\`import math\` then \`math.pi\`; \`from math import floor\` for direct names. The stdlib is Python's "batteries included": math, random, datetime, json, csv, os (MOOC.fi Part 7). Your own modules come in Phase 4.
\n## Reading Tracebacks
Research (Springer 2023): SyntaxError = 29% of all beginner errors, then TypeError; only 35% of students understand tracebacks. Read from BOTTOM to top: last line = error type + message, above = location. "Finding and fixing bugs" is the biggest novice challenge (Lahtinen 2005) — so this skill is trained explicitly.
\n## try / except / else / finally
\`try\` holds risky code; \`except\` catches (specific first!); \`else\` runs when NO error; \`finally\` always runs (cleanup). Catch \`ValueError\`, never a bare \`except:\` that hides everything.
\n## raise
Raise your own errors when a contract is violated (\`cek_umur(-1)\`). An explicit error beats a silent bug. Used later in classes (phase 3) for balance validation.
\n## Common Mistakes
Bare except, catching then staying silent (a debugging nightmare), forgetting \`as\` in \`except ValueError as err\`, ignoring tracebacks, comparing after get() without a None check.`,
    chId: 'Ubah Contact Book jadi menu interaktif (input): 1=tampilkan, 2=tambah, 3=cari, 4=hapus, 0=keluar. Validasi: nomor hanya angka (isdigit), nama tidak duplikat (lemparkan ValueError). Bonus: simpan kontak ke file JSON (lihat Phase 3) dan muat saat start.',
    chEn: 'Turn the Contact Book into an interactive menu (input): 1=show, 2=add, 3=search, 4=delete, 0=exit. Validate: digits-only numbers (isdigit), no duplicate names (raise ValueError). Bonus: persist contacts to JSON (see Phase 3) and load on start.',
    sumId: 'import/from, stdlib, baca traceback bottom-up, try/except/else/finally, raise. Contact Book: dict + fungsi + validasi. Lanjut: file I/O.',
    sumEn: 'import/from, stdlib, bottom-up traceback reading, try/except/else/finally, raise. Contact Book: dicts + functions + validation. Next: file I/O.',
  },
];

// ===== PHASE 3: OOP & I/O (lessons 9-12) =====
const LESSONS_P3 = [
  {
    phase: 3, num: 9, topicId: 'file-io',
    titleId: 'File I/O & Data', titleEn: 'File I/O & Data',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `import json
import csv
from pathlib import Path

# ===== Menulis & membaca file teks =====
with open("catatan.txt", "w", encoding="utf-8") as f:
    f.write("baris pertama\\n")
    f.write("baris kedua\\n")

with open("catatan.txt", "r", encoding="utf-8") as f:
    isi = f.read()
print("Isi file:")
print(isi)

# with = context manager: file SELALU ditutup, bahkan saat error

# ===== Membaca per baris =====
with open("catatan.txt", "r", encoding="utf-8") as f:
    for baris in f:
        print(f"  Baris: {baris.strip()}")

# ===== pathlib =====
p = Path("catatan.txt")
print(f"Ada? {p.exists()} | Ukuran: {p.stat().st_size} byte | Nama: {p.name}")
p2 = Path("arsip") / "catatan.txt"     # gabung path aman lintas OS
print(f"Path gabung: {p2}")

# ===== JSON =====
data = {"nama": "Ayu", "nilai": [90, 78, 85], "lulus": True}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open("data.json", "r", encoding="utf-8") as f:
    dibaca = json.load(f)
print(f"JSON dibaca: {dibaca['nama']}, nilai {dibaca['nilai']}")

# ===== CSV =====
with open("nilai.csv", "w", newline="", encoding="utf-8") as f:
    penulis = csv.writer(f)
    penulis.writerow(["nama", "nilai"])
    penulis.writerow(["Ayu", 90])
    penulis.writerow(["Budi", 78])

with open("nilai.csv", "r", encoding="utf-8") as f:
    pembaca = csv.DictReader(f)
    for baris in pembaca:
        print(f"  {baris['nama']}: {baris['nilai']}")
`,
      };
    },
    objId: ['Membaca dan menulis file teks dengan with', 'Membaca file per baris', 'Menggunakan pathlib untuk path aman', 'Menyimpan dan memuat JSON', 'Membaca/menulis CSV dengan csv module'],
    objEn: ['Read and write text files with with', 'Read files line by line', 'Use pathlib for safe paths', 'Save and load JSON', 'Read/write CSV with the csv module'],
    expId: `## with: Context Manager
\`with open(...) as f:\` menjamin file ditutup otomatis, bahkan saat exception terjadi — tidak perlu \`f.close()\` manual (Scaler M5 menempatkan file handling bersama OOP; datafield di chapter terpisah — di sini mendahului OOP karena Expense Tracker butuh CSV).
\n## Membaca per Baris
\`for baris in f:\` mengiterasi file tanpa memuat semua ke memori — pola untuk file besar. \`.strip()\` membersihkan newline. \`f.read()\` sekali baca seluruh isi; \`f.readlines()\` list baris.
\n## pathlib
\`Path\` adalah cara modern: \`Path("arsip") / "catatan.txt"\` aman di semua OS (vs \\\\ di Windows). \`.exists()\`, \`.stat().st_size\`, \`.name\`, \`.mkdir(exist_ok=True)\`. Mencegah hardcode path — common mistake nomor satu automasi.
\n## JSON
\`json.dump(data, f)\` menulis; \`json.load(f)\` membaca. JSON = format pertukaran data paling umum (API, config). \`ensure_ascii=False\` agar karakter non-ASCII terbaca, \`indent=2\` agar rapi.
\n## CSV
\`csv.writer\`/\`csv.DictReader\` menangani pemisahan koma, kutipan, dan newline antar OS (\`newline=""\` penting!). Column header memungkinkan akses \`baris["nama"]\`.
\n## Common Mistakes
Lupa \`encoding="utf-8"\` (UnicodeDecodeError), menulis tanpa \`with\` (file terkunci), lupa \`newline=""\` untuk CSV di Windows, membaca baris lalu lupa strip.`,
    expEn: `## with: The Context Manager
\`with open(...) as f:\` guarantees the file closes automatically, even on exceptions — no manual \`f.close()\` needed (Scaler M5 places file handling with OOP; datafield in a separate chapter — here it precedes OOP because the Expense Tracker needs CSV).
\n## Reading Line by Line
\`for baris in f:\` iterates without loading the whole file into memory — the pattern for large files. \`.strip()\` removes newlines. \`f.read()\` reads everything once; \`f.readlines()\` returns a list of lines.
\n## pathlib
\`Path\` is the modern way: \`Path("arsip") / "catatan.txt"\` is safe on every OS (vs \\\\ on Windows). \`.exists()\`, \`.stat().st_size\`, \`.name\`, \`.mkdir(exist_ok=True)\`. It prevents hardcoded paths — the #1 automation mistake.
\n## JSON
\`json.dump(data, f)\` writes; \`json.load(f)\` reads. JSON is the most common data exchange format (APIs, config). \`ensure_ascii=False\` keeps non-ASCII characters readable, \`indent=2\` pretty-prints.
\n## CSV
\`csv.writer\`/\`csv.DictReader\` handle comma separation, quoting, and OS newlines (\`newline=""\` matters!). Column headers enable \`baris["nama"]\` access.
\n## Common Mistakes
Forgetting \`encoding="utf-8"\` (UnicodeDecodeError), writing without \`with\` (locked files), forgetting \`newline=""\` for CSV on Windows, reading lines then forgetting to strip.`,
    chId: 'Buat aplikasi catatan harian: (1) tambah entri (tanggal + teks) ke file teks, (2) tampilkan semua entri, (3) konverter CSV -> JSON: baca nilai.csv, ubah jadi list of dict, simpan nilai.json. Gabungkan dengan try/except untuk file yang tidak ada.',
    chEn: 'Build a daily journal app: (1) append entries (date + text) to a text file, (2) show all entries, (3) a CSV -> JSON converter: read nilai.csv, turn it into a list of dicts, save nilai.json. Combine with try/except for missing files.',
    sumId: 'with, per-baris, pathlib, JSON, CSV. Pola baca-tulis file siap untuk proyek. Lanjut: Expense Tracker.',
    sumEn: 'with, line-by-line, pathlib, JSON, CSV. File read/write patterns ready for projects. Next: Expense Tracker.',
  },
  {
    phase: 3, num: 10, topicId: 'proyek-expense',
    titleId: 'Proyek: Expense Tracker', titleEn: 'Project: Expense Tracker',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `import csv
from pathlib import Path

FILE_CSV = Path("pengeluaran.csv")

PENGELUARAN_AWAL = [
    ["2026-07-01", "Makanan", 45000],
    ["2026-07-02", "Transport", 25000],
    ["2026-07-03", "Makanan", 65000],
    ["2026-07-04", "Hiburan", 80000],
    ["2026-07-05", "Belanja", 120000],
]

# ===== Simpan ke CSV (hanya jika belum ada) =====
if not FILE_CSV.exists():
    with open(FILE_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["tanggal", "kategori", "jumlah"])
        writer.writerows(PENGELUARAN_AWAL)
    print("CSV dibuat dengan 5 entri contoh.")

# ===== Baca + validasi (error handling) =====
def baca_pengeluaran():
    daftar = []
    with open(FILE_CSV, "r", encoding="utf-8") as f:
        for baris in csv.DictReader(f):
            try:
                daftar.append({
                    "tanggal": baris["tanggal"],
                    "kategori": baris["kategori"],
                    "jumlah": int(baris["jumlah"]),
                })
            except (KeyError, ValueError) as err:
                print(f"Baris rusak dilewati: {baris} ({err})")
    return daftar

# ===== Analisis: total + per kategori (dict!) =====
data = baca_pengeluaran()
total = sum(d["jumlah"] for d in data)
per_kategori = {}
for d in data:
    per_kategori[d["kategori"]] = per_kategori.get(d["kategori"], 0) + d["jumlah"]

print(f"\\nTotal pengeluaran: Rp {total:,}")
print("Per kategori:")
for kategori, jumlah in sorted(per_kategori.items(), key=lambda x: -x[1]):
    porsi = jumlah / total * 100
    print(f"  {kategori:<12} Rp {jumlah:>10,}  ({porsi:.0f}%)")
`,
      };
    },
    objId: ['Membangun pipeline baca-validasi-analisis CSV', 'Menangani baris rusak dengan try/except', 'Mengagregasi data dengan dictionary', 'Memformat output angka dengan f-strings'],
    objEn: ['Build a read-validate-analyze CSV pipeline', 'Handle corrupt rows with try/except', 'Aggregate data with dictionaries', 'Format numeric output with f-strings'],
    expId: `## Pola Baca-Tulis CSV
Project ladder Scaler #3: Expense Tracker memakai file handling + data structures + analisis dasar. Pola produksi: tulis header sekali -> append baris -> baca dengan DictReader -> agregasi. \`if not FILE_CSV.exists()\` mencegah overwrite data user.
\n## Validasi Baris
Data file tidak bisa dipercaya: kolom hilang (KeyError), angka tidak valid (ValueError). Lewati baris rusak dan lanjutkan — bukan crash total. Ini pola ETL dasar yang dipakai data engineer (travisjneuman level 1: "input validation, CSV, JSON").
\n## Agregasi dengan Dictionary
\`per_kategori.get(k, 0) + 1\` idiom counting paling umum di Python (word frequency dari L7 diulang dengan data nyata = spacing/interleaving, ACM ICER 2019: +1.04% nilai per jam latihan tersebar).
\n## Format Angka
\`f"{total:,}"\` ribuan separator; \`{jumlah:>10,}\` rata kanan lebar 10; \`{porsi:.0f}%\` presisi desimal; \`{kategori:<12}\` rata kiri. Format spec f-string = alat tiap laporan.
\n## Proyek Milestone
Expense Tracker membuktikan: file I/O + error handling + dict + lambda sort + formatting — separuh jalan menuju Python siap-kerja.`,
    expEn: `## The CSV Read-Write Pattern
Scaler project ladder #3: the Expense Tracker uses file handling + data structures + basic analysis. The production pattern: write the header once -> append rows -> read with DictReader -> aggregate. \`if not FILE_CSV.exists()\` prevents overwriting user data.
\n## Row Validation
File data cannot be trusted: missing columns (KeyError), invalid numbers (ValueError). Skip corrupt rows and continue — not a total crash. This is the basic ETL pattern used by data engineers (travisjneuman level 1: "input validation, CSV, JSON").
\n## Dict Aggregation
\`per_kategori.get(k, 0) + 1\` is the most common counting idiom in Python (the L7 word frequency is repeated with real data = spacing/interleaving, ACM ICER 2019: +1.04% exam grade per spaced-practice hour).
\n## Number Formatting
\`f"{total:,}"\` thousands separators; \`{jumlah:>10,}\` right-aligned width 10; \`{porsi:.0f}%\` decimal precision; \`{kategori:<12}\` left-aligned. f-string format specs = the tool for every report.
\n## Project Milestone
The Expense Tracker proves: file I/O + error handling + dicts + lambda sort + formatting — halfway to job-ready Python.`,
    chId: 'Tambahkan: (1) filter laporan per bulan (parsing "2026-07"), (2) fungsi tambah_pengeluaran(tanggal, kategori, jumlah) yang meng-append baris baru ke CSV, (3) hapus semua entri dengan kategori tertentu, (4) tampilkan kategori dengan pengeluaran terbesar.',
    chEn: 'Add: (1) monthly report filtering (parse "2026-07"), (2) tambah_pengeluaran(tanggal, kategori, jumlah) appending a new CSV row, (3) delete all entries of a given category, (4) show the category with the highest spending.',
    sumId: 'Expense Tracker: CSV pipeline + validasi + agregasi dict + format angka. Separuh jalan. Lanjut: kelas & objek (OOP).',
    sumEn: 'Expense Tracker: CSV pipeline + validation + dict aggregation + number formatting. Halfway there. Next: classes & objects (OOP).',
  },
  {
    phase: 3, num: 11, topicId: 'kelas-dasar',
    titleId: 'Kelas & Objek', titleEn: 'Classes & Objects',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `# ===== Memakai method object dulu (dot-notation) =====
kata = "tryngo"
print(f"method: {kata.upper()}")
angka = [3, 1, 2]
angka.sort()
print(f"method: {angka}")
# .append(), .split(), .strip() -- kamu sudah memakai object sejak awal!
# (MOOC.fi Part 8: "objects and methods" DULU, definisi kelas belakangan)

# ===== Mendefinisikan kelas =====
class RekeningBank:
    """Contoh standar industri (Scaler): simpanan bank."""
    mata_uang = "IDR"            # class attribute: dibagi semua instance

    def __init__(self, pemilik, saldo=0):
        self.pemilik = pemilik    # instance attribute: unik per objek
        self.saldo = saldo

    def setor(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Jumlah setoran harus positif")
        self.saldo += jumlah
        return self.saldo

    def tarik(self, jumlah):
        if jumlah > self.saldo:
            raise ValueError("Saldo tidak cukup")
        self.saldo -= jumlah
        return self.saldo

    def info(self):
        return f"{self.pemilik}: Rp {self.saldo:,} ({self.mata_uang})"

# Instansiasi = memanggil kelas seperti fungsi
rekening_ayu = RekeningBank("Ayu", 500000)
rekening_budi = RekeningBank("Budi")          # saldo default 0

print(rekening_ayu.info())
rekening_ayu.setor(150000)
print(f"Setelah setor: {rekening_ayu.info()}")
rekening_ayu.tarik(200000)
print(f"Setelah tarik: {rekening_ayu.info()}")
print(rekening_budi.info())

# Class attribute dibagi; instance attribute unik
print(f"Semua pakai mata uang yang sama: {rekening_ayu.mata_uang}")

# Perangkap: tarik lebih besar dari saldo -> ValueError
try:
    rekening_budi.tarik(999999)
except ValueError as err:
    print(f"Tertangkap: {err}")
`,
      };
    },
    objId: ['Memakai object/method sebelum mendefinisikan kelas', 'Mendefinisikan class dengan __init__ dan self', 'Membedakan instance vs class attribute', 'Menulis methods yang memvalidasi (raise)'],
    objEn: ['Use objects/methods before defining classes', 'Define classes with __init__ and self', 'Distinguish instance vs class attributes', 'Write validating methods (raise)'],
    expId: `## Object & Method: Sudah Kamu Kenal
\`kata.upper()\`, \`angka.sort()\`, \`teks.split()\` — kamu memakai object & method sejak Pelajaran 4. MOOC.fi mengajarkan "Objects and Methods" sebagai Part 8 PERTAMA, sebelum definisi kelas: dot-notation adalah prasyarat. Riset ACM ("Some Trouble with Transparency") menemukan error OOP terbesar pemula = lupa \`self\` — berakar dari dot-notation yang tidak dikuasai.
\n## class, __init__, self
\`class\` = cetak biru; \`__init__\` menginisialisasi tiap instance baru (constructor); \`self\` = referensi instance saat method dipanggil — SELALU parameter pertama (konvensi, bukan keyword; jangan ganti). Instansiasi = \`RekeningBank("Ayu", 500000)\`.
\n## Instance vs Class Attribute
Instance attribute (\`self.saldo\`) unik per objek — didefinisikan di \`__init__\` (jangan di class body, kecuali immutable default). Class attribute (\`mata_uang\`) dibagi semua instance. Perangkap Boot.dev: mutable class attribute = versi class dari mutable default bug.
\n## Method & Validasi
Method = fungsi di dalam class yang beroperasi pada \`self\`. \`setor\`/\`tarik\` memvalidasi lalu raise ValueError — kontrak yang tegas (lanjutan L8). "Data + behavior berjalan bersama" = alasan utama OOP.
\n## Common Mistakes: self
Lupa \`self\` di parameter pertama, lupa \`self.\` saat mengakses attribute, mendefinisikan instance attribute di luar \`__init__\`, memanggil method tanpa tanda kurung. Ini error #1 pemula OOP (ACM 2016).`,
    expEn: `## Objects & Methods: You Already Know Them
\`kata.upper()\`, \`angka.sort()\`, \`teks.split()\` — you have been using objects & methods since Lesson 4. MOOC.fi teaches "Objects and Methods" as Part 8 FIRST, before class definitions: dot-notation is the prerequisite. ACM research ("Some Trouble with Transparency") found the biggest beginner OOP error = forgetting \`self\` — rooted in unmastered dot-notation.
\n## class, __init__, self
\`class\` = the blueprint; \`__init__\` initializes each new instance (the constructor); \`self\` = the instance reference when a method is called — always the first parameter (a convention, not a keyword; don't rename). Instantiation = \`RekeningBank("Ayu", 500000)\`.
\n## Instance vs Class Attributes
Instance attributes (\`self.saldo\`) are unique per object — defined in \`__init__\` (not in the class body, except immutable defaults). Class attributes (\`mata_uang\`) are shared by all instances. Boot.dev's trap: a mutable class attribute is the class version of the mutable default bug.
\n## Methods & Validation
Methods are functions inside a class operating on \`self\`. \`setor\`/\`tarik\` validate then raise ValueError — a strict contract (continuing L8). "Data + behavior travel together" = the main reason for OOP.
\n## Common Mistakes: self
Forgetting \`self\` as the first parameter, forgetting \`self.\` when accessing attributes, defining instance attributes outside \`__init__\`, calling methods without parentheses. This is the #1 beginner OOP error (ACM 2016).`,
    chId: 'Buat kelas \u0060Produk\u0060 (nama, harga, stok) dengan metode \u0060jual(jumlah)\u0060 (validasi stok cukup), \u0060restok(jumlah)\u0060, dan \u0060info()\u0060. Buat 3 produk, lakukan transaksi, dan tampilkan daftar produk yang stoknya menipis (< 5).',
    chEn: 'Create a \u0060Produk\u0060 class (nama, harga, stok) with \u0060jual(jumlah)\u0060 (validate sufficient stock), \u0060restok(jumlah)\u0060, and \u0060info()\u0060. Create 3 products, run transactions, and list products with low stock (< 5).',
    sumId: 'Object/method dulu, kelas belakangan. __init__ + self, instance vs class attribute, method memvalidasi. Perangkap self. Lanjut: references & inheritance.',
    sumEn: 'Objects/methods first, classes later. __init__ + self, instance vs class attributes, validating methods. The self trap. Next: references & inheritance.',
  },
  {
    phase: 3, num: 12, topicId: 'oop-lanjut',
    titleId: 'OOP Lanjutan & Special Methods', titleEn: 'Advanced OOP & Special Methods',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `# ===== Objects & References (riset Glasgow: hanya 2% benar!) =====
a = [1, 2, 3]
b = a                  # alias: b dan a menunjuk OBJEK yang sama
b.append(4)
print(f"a = {a}  (ikut berubah! alias, bukan salinan)")
c = a.copy()           # salinan: objek baru
c.append(5)
print(f"a = {a}, c = {c}")

# ===== Encapsulation: _private + @property =====
class Akun:
    def __init__(self, nama, saldo):
        self.nama = nama
        self._saldo = saldo        # konvensi: internal

    @property
    def saldo(self):
        return self._saldo

    def setor(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Harus positif")
        self._saldo += jumlah

# ===== Inheritance + super =====
class Tabungan(Akun):
    def __init__(self, nama, saldo, bunga_persen=5):
        super().__init__(nama, saldo)   # panggil parent
        self.bunga_persen = bunga_persen

    def bulanan(self):
        bunga = self._saldo * self.bunga_persen / 100
        self._saldo += bunga
        return bunga

tabungan = Tabungan("Ayu", 1000000)
print(f"Saldo awal: {tabungan.saldo}")
print(f"Bunga bulan ini: {tabungan.bulanan():.0f}")
print(f"Saldo baru: {tabungan.saldo}")

# ===== Special methods: __str__, __eq__ =====
class Produk:
    def __init__(self, nama, harga):
        self.nama = nama
        self.harga = harga

    def __str__(self):
        return f"{self.nama} (Rp {self.harga:,})"

    def __eq__(self, lain):
        return isinstance(lain, Produk) and self.nama == lain.nama and self.harga == lain.harga

p1 = Produk("Keyboard", 750000)
p2 = Produk("Keyboard", 750000)
print(str(p1))                    # pakai __str__
print(f"p1 == p2: {p1 == p2}")    # pakai __eq__

# ===== Kapan TIDAK memakai class (Real Python) =====
# Data-only -> dataclass/namedtuple/dict
# Satu method -> fungsi biasa
`,
      };
    },
    objId: ['Memahami references, aliasing, dan copying', 'Menerapkan encapsulation dengan _private dan @property', 'Menggunakan inheritance dan super()', 'Mengimplementasikan __str__ dan __eq__', 'Menilai kapan TIDAK memakai class'],
    objEn: ['Understand references, aliasing, and copying', 'Apply encapsulation with _private and @property', 'Use inheritance and super()', 'Implement __str__ and __eq__', 'Judge when NOT to use classes'],
    expId: `## References & Aliasing
\`b = a\` membuat dua nama menunjuk OBJEK yang sama — \`b.append(4)\` mengubah a juga! Riset Glasgow 2020: hanya 2% mahasiswa benar membedakan \`a + b\`, \`a.append(b)\`, \`a += b\`. Ini threshold concept: gunakan \`.copy()\` untuk salinan, pahami \`is\` vs \`==\`. MOOC.fi Part 9 menempatkan "Objects and References" sebelum materi OOP lanjutan.
\n## Encapsulation
Python tidak punya private sejati — konvensi: \`_saldo\` = "internal, jangan disentuh". \`@property\` membungkus attribute dengan method (getter) tanpa mengubah API pemanggil. Tujuannya: kendali (validasi), bukan keamanan (datafield.dev).
\n## Inheritance & super
\`class Tabungan(Akun)\` mewarisi attribute + method parent. \`super().__init__(...)\` memanggil constructor parent sebelum logika sendiri (urutan MOOC.fi: P9 references -> P10 hierarchies). Method di child override method parent; \`super()\` untuk memanggil versi parent.
\n## Special Methods
\`__str__\` untuk print/display, \`__eq__\` untuk == (default: identity!). \`__repr__\`, \`__len__\`, \`__lt__\` menyusul saat perlu. "Dunder" methods = integrasi objek dengan operator built-in.
\n## Kapan TIDAK Pakai Class
Real Python/datafield: data-only -> dataclass/namedtuple/dict; satu method -> fungsi. OOP untuk "benda" (noun: Student, BankAccount, Produk); prosedural untuk operasi (verb: calculate, parse). Kebanyakan program Python = campuran sehat.`,
    expEn: `## References & Aliasing
\`b = a\` creates two names pointing at the SAME object — \`b.append(4)\` changes a too! Glasgow research 2020: only 2% of students correctly distinguished \`a + b\`, \`a.append(b)\`, \`a += b\`. This is a threshold concept: use \`.copy()\` for copies, understand \`is\` vs \`==\`. MOOC.fi Part 9 places "Objects and References" before advanced OOP material.
\n## Encapsulation
Python has no true private — the convention: \`_saldo\` = "internal, don't touch". \`@property\` wraps an attribute with a method (getter) without changing the caller API. Its purpose: control (validation), not security (datafield.dev).
\n## Inheritance & super
\`class Tabungan(Akun)\` inherits the parent's attributes + methods. \`super().__init__(...)\` calls the parent constructor before your own logic (MOOC.fi order: P9 references -> P10 hierarchies). Child methods override parent ones; \`super()\` calls the parent version.
\n## Special Methods
\`__str__\` for print/display, \`__eq__\` for == (default: identity!). \`__repr__\`, \`__len__\`, \`__lt__\` come when needed. "Dunder" methods integrate objects with built-in operators.
\n## When NOT to Use Classes
Real Python/datafield: data-only -> dataclass/namedtuple/dict; single method -> function. OOP for "things" (nouns: Student, BankAccount, Produk); procedural for operations (verbs: calculate, parse). Most real Python = a healthy mix.`,
    chId: 'Buat kelas \u0060KoleksiBuku\u0060 dengan \u0060__str__\u0060 (daftar isi) dan \u0060__eq__\u0060 (isi sama). Tambah inheritance \u0060BukuDigital(KoleksiBuku)\u0060 dengan field ukuran_file. Bonus: cegah mutasi bersama (aliasing) dengan mengembalikan \u0060list.copy()\u0060 dari getter.',
    chEn: 'Create a \u0060KoleksiBuku\u0060 class with \u0060__str__\u0060 (content list) and \u0060__eq__\u0060 (same contents). Add inheritance \u0060BukuDigital(KoleksiBuku)\u0060 with a file-size field. Bonus: prevent shared mutation (aliasing) by returning \u0060list.copy()\u0060 from the getter.',
    sumId: 'References & aliasing (2%), encapsulation via _/@property, inheritance+super, __str__/__eq__, kapan tidak pakai class. Lanjut: venv & pip.',
    sumEn: 'References & aliasing (2%), encapsulation via _/@property, inheritance+super, __str__/__eq__, when not to use classes. Next: venv & pip.',
  },
];

// ===== PHASE 4: REAL-WORLD (lessons 13-16) =====
const LESSONS_P4 = [
  {
    phase: 4, num: 13, topicId: 'lingkungan-paket',
    titleId: 'venv, pip & Packages', titleEn: 'venv, pip & Packages',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'helpers.py': `def rata_rata(angka):
    return sum(angka) / len(angka)

def median(angka):
    urut = sorted(angka)
    n = len(urut)
    tengah = n // 2
    if n % 2 == 1:
        return urut[tengah]
    return (urut[tengah - 1] + urut[tengah]) / 2
`,
        'index.py': `# ===== Modul sendiri: organisasi kode lintas file =====
import helpers

nilai = [85, 92, 78, 90, 88]
print(f"Rata-rata: {helpers.rata_rata(nilai):.1f}")
print(f"Median: {helpers.median(nilai)}")

# ===== if __name__ == "__main__" =====
# Kode di bawah hanya jalan saat index.py dieksekusi LANGSUNG,
# bukan saat di-import sebagai modul.
def main():
    print("Program dimulai dari index.py (bukan saat di-import)")

if __name__ == "__main__":
    main()

# ===== venv & pip (jalankan di terminal lokal / StackBlitz) =====
# python -m venv venv
# venv\\Scripts\\activate          (Windows)
# source venv/bin/activate        (macOS / Linux)
# pip install requests
# pip freeze > requirements.txt
# pip install -r requirements.txt
`,
      };
    },
    objId: ['Memisahkan kode ke modul sendiri', 'Memahami if __name__ == "__main__"', 'Membuat dan mengaktifkan virtual environment', 'Mengelola dependensi dengan pip dan requirements.txt'],
    objEn: ['Split code into your own modules', 'Understand if __name__ == "__main__"', 'Create and activate virtual environments', 'Manage dependencies with pip and requirements.txt'],
    expId: `## Modul Sendiri
File .py = modul. \`import helpers\` mengeksekusi helpers.py dan memberi namespace. Ini cara profesional mengorganisasi: logika di helpers.py, "cerita" di index.py. Scaler M3 menempatkan modules bersama functions; travisjneuman level 3 menambah packaging.
\n## if __name__ == "__main__"
Saat file di-import, kode level-atas TURUT dieksekusi — kecuali dijaga guard ini. \`__name__\` = \`"__main__"\` hanya saat dieksekusi langsung. Setiap file dengan perilaku perlu guard ini.
\n## Virtual Environment
\`venv\` = lingkungan Python terisolasi per project: versi package project A tidak merusak project B. Setiap project serius WAJIB venv (Scaler, DataCamp, travisjneuman). \`venv\\Scripts\\activate\` (Windows) / \`source venv/bin/activate\` (Unix).
\n## pip & requirements.txt
\`pip install <pkg>\` memasang dari PyPI; \`pip freeze > requirements.txt\` mencatat dependensi + versi; \`pip install -r requirements.txt\` mengembalikan environment di mesin lain / CI. StackBlitz WebContainers saat ini hanya stdlib (python3 vanilla) — install pip di lingkungan lokal kamu.
\n## Common Mistakes
Import di tengah fungsi (biasanya tanda design buruk), circular import, tidak pakai venv (dependency hell), meng-commit venv/ folder (pakai .gitignore), \`pip\` vs \`pip3\` salah versi Python.`,
    expEn: `## Your Own Modules
A .py file = a module. \`import helpers\` executes helpers.py and provides a namespace. This is the professional way to organize: logic in helpers.py, the "story" in index.py. Scaler M3 places modules with functions; travisjneuman level 3 adds packaging.
\n## if __name__ == "__main__"
When a file is imported, top-level code RUNS — unless guarded. \`__name__\` equals \`"__main__"\` only when executed directly. Every behavioral file needs this guard.
\n## Virtual Environments
\`venv\` = an isolated Python environment per project: project A's package versions never break project B. Every serious project REQUIRES venv (Scaler, DataCamp, travisjneuman). \`venv\\Scripts\\activate\` (Windows) / \`source venv/bin/activate\` (Unix).
\n## pip & requirements.txt
\`pip install <pkg>\` installs from PyPI; \`pip freeze > requirements.txt\` records dependencies + versions; \`pip install -r requirements.txt\` restores the environment on other machines / CI. StackBlitz WebContainers is currently stdlib-only (vanilla python3) — run pip installs in your local environment.
\n## Common Mistakes
Imports inside functions (usually a design smell), circular imports, no venv (dependency hell), committing the venv/ folder (use .gitignore), \`pip\` vs \`pip3\` wrong Python version.`,
    chId: 'Refactor: pindahkan fungsi statistika (rata-rata, median, modus) ke modul \u0060statistik.py\u0060, tulis index.py yang import dan menjalankan laporan, lalu buat requirements.txt kosong untuk project. Latih: buat venv lokal, install satu package, freeze.',
    chEn: 'Refactor: move the statistics functions (mean, median, mode) into a \u0060statistik.py\u0060 module, write index.py importing and running a report, then create an empty requirements.txt for the project. Practice: create a local venv, install one package, freeze.',
    sumId: 'Modul sendiri + __name__ guard + venv + pip/requirements.txt = fondasi project nyata. Lanjut: CLI & automasi.',
    sumEn: 'Own modules + __name__ guard + venv + pip/requirements.txt = real project foundations. Next: CLI & automation.',
  },
  {
    phase: 4, num: 14, topicId: 'cli-automasi',
    titleId: 'CLI & Automasi', titleEn: 'CLI & Automation',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `import argparse
import os
import shutil
import tempfile
from pathlib import Path

# ===== argparse: CLI profesional =====
# (jalankan: python3 index.py --dir <path> --dry-run)

ATURAN = {
    ".txt": "Dokumen", ".md": "Dokumen",
    ".png": "Gambar", ".jpg": "Gambar",
    ".csv": "Data", ".json": "Data",
}

def organisir(target_dir, dry_run=False):
    target = Path(target_dir)
    for file in target.iterdir():
        if file.is_dir():
            continue
        kategori = ATURAN.get(file.suffix.lower(), "Lainnya")
        folder = target / kategori
        print(f"  {file.name} -> {kategori}/")
        if not dry_run:
            folder.mkdir(exist_ok=True)
            shutil.move(str(file), str(folder / file.name))

def demo():
    demo_dir = Path(tempfile.mkdtemp(prefix="tryngo_"))
    for nama in ["laporan.txt", "foto.png", "data.csv", "catatan.md", "random.bin"]:
        (demo_dir / nama).write_text("contoh", encoding="utf-8")
    print(f"Demo dir: {demo_dir}")
    print("Sebelum:", sorted(f.name for f in demo_dir.iterdir()))
    organisir(demo_dir, dry_run=True)
    print("(rencana organisasi di atas, dry-run)")

def main():
    parser = argparse.ArgumentParser(description="Organisir file berdasarkan ekstensi")
    parser.add_argument("--dir", default=".", help="Direktori target")
    parser.add_argument("--dry-run", action="store_true", help="Hanya tampilkan rencana")
    args = parser.parse_args()
    organisir(args.dir, args.dry_run)

if __name__ == "__main__":
    demo()
    # Uncomment baris ini untuk CLI sungguhan:
    # main()
`,
      };
    },
    objId: ['Membangun CLI dengan argparse', 'Memanipulasi file dengan os dan shutil', 'Menggunakan pathlib vs os secara sadar', 'Menerapkan pola dry-run yang aman'],
    objEn: ['Build CLIs with argparse', 'Manipulate files with os and shutil', 'Use pathlib vs os deliberately', 'Apply the safe dry-run pattern'],
    expId: `## argparse: CLI yang Benar
\`argparse\` = cara standar membuat command-line interface: flag (\`--dir\`), opsi boolean (\`--dry-run\`), help otomatis (\`--help\`). Ini bentuk 73-74% tool Python yang dikirim developer (research jalur karier: CLI + HTTP service). Asmorix menaruh otomasi + Git di minggu 6-8 kurikulumnya.
\n## os & shutil
\`os.rename\`, \`os.walk\` (jelajah rekursif), \`shutil.move\`, \`shutil.copy\`, \`shutil.rmtree\`. shutil = operasi level tinggi di atas os. Kombinasi keduanya = "Automate the Boring Stuff" (kurikulum automasi paling terkenal, gratis di automatetheboringstuff.com).
\n## pathlib vs os
\`Path\` modern dan ekspresif; \`os\` murah dan ada di mana-mana. Python 3.6+ menganjurkan pathlib untuk path, os untuk operasi sistem. Konsisten lebih penting daripada "benar".
\n## Pola Dry-Run
Tampilkan rencana SEBELUM mengeksekusi — pola produksi yang mencegah bencana (hapus file salah). \`action="store_true"\` membuat flag boolean. Demo di program memakai \`tempfile.mkdtemp\` agar aman di lingkungan apa pun.
\n## Common Mistakes
Mengubah file di direktori kerja tanpa cek is_dir, hardcode path, lupa mode file, dry-run yang tetap menulis, \`shutil.move\` ke folder yang belum dibuat (pakai mkdir(exist_ok=True)).`,
    expEn: `## argparse: The Proper CLI
\`argparse\` is the standard way to build command-line interfaces: flags (\`--dir\`), boolean options (\`--dry-run\`), automatic help (\`--help\`). This is the shape of 73-74% of shipped Python tools (career-path research: CLI + HTTP services). Asmorix places automation + Git in weeks 6-8 of its curriculum.
\n## os & shutil
\`os.rename\`, \`os.walk\` (recursive traversal), \`shutil.move\`, \`shutil.copy\`, \`shutil.rmtree\`. shutil = high-level operations on top of os. The pair = "Automate the Boring Stuff" (the most famous automation curriculum, free at automatetheboringstuff.com).
\n## pathlib vs os
\`Path\` is modern and expressive; \`os\` is cheap and everywhere. Python 3.6+ recommends pathlib for paths, os for system operations. Consistency beats "being right".
\n## The Dry-Run Pattern
Show the plan BEFORE executing — a production pattern that prevents disasters (deleting the wrong files). \`action="store_true"\` makes a boolean flag. The demo uses \`tempfile.mkdtemp\` so it is safe in any environment.
\n## Common Mistakes
Modifying files in the working directory without an is_dir check, hardcoded paths, forgetting file modes, dry-runs that still write, \`shutil.move\` into a folder that doesn't exist yet (use mkdir(exist_ok=True)).`,
    chId: 'Buat tool \u0060renama_batch.py\u0060: argparse --prefix dan --dir, rename semua file .txt menjadi \u0060{prefix}_{nama}.txt\u0060 dengan os.rename, dry-run default true, opsi --apply untuk eksekusi nyata. Tampilkan ringkasan sebelum/sesudah.',
    chEn: 'Build \u0060renama_batch.py\u0060: argparse --prefix and --dir, rename all .txt files to \u0060{prefix}_{nama}.txt\u0060 with os.rename, dry-run true by default, --apply for real execution. Show before/after summaries.',
    sumId: 'argparse CLI, os/shutil automasi, pathlib, dry-run pattern. Siap membuat tool nyata. Lanjut: testing & Git.',
    sumEn: 'argparse CLIs, os/shutil automation, pathlib, the dry-run pattern. Ready to build real tools. Next: testing & Git.',
  },
  {
    phase: 4, num: 15, topicId: 'testing-git',
    titleId: 'Testing & Git', titleEn: 'Testing & Git',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'calculator.py': `def tambah(a, b):
    return a + b

def kurang(a, b):
    return a - b

def kali(a, b):
    return a * b

def bagi(a, b):
    if b == 0:
        raise ValueError("Tidak bisa dibagi nol")
    return a / b
`,
        'index.py': `# ===== Pengujian dasar: assert =====
import calculator

def uji():
    hasil = []
    hasil.append(("tambah", calculator.tambah(2, 3) == 5))
    hasil.append(("kurang", calculator.kurang(10, 4) == 6))
    hasil.append(("kali", calculator.kali(3, 4) == 12))
    hasil.append(("bagi", calculator.bagi(9, 3) == 3))
    try:
        calculator.bagi(1, 0)
        hasil.append(("bagi-nol", False))
    except ValueError:
        hasil.append(("bagi-nol", True))
    return hasil

hasil = uji()
for nama, ok in hasil:
    print(f"  [{'PASS' if ok else 'FAIL'}] {nama}")
print(f"\\n{sum(ok for _, ok in hasil)}/{len(hasil)} lolos")

# ===== pytest (tool sungguhan, jalankan lokal) =====
# Buat file test_calculator.py:
#
#   from calculator import tambah, bagi
#   import pytest
#
#   def test_tambah():
#       assert tambah(2, 3) == 5
#
#   def test_bagi_nol():
#       with pytest.raises(ValueError):
#           bagi(1, 0)
#
# Jalankan:  pytest test_calculator.py -v

# ===== Git (konsep inti, jalankan lokal) =====
# git init
# git add calculator.py test_calculator.py
# git commit -m "feat: kalkulator + test"
# git branch -M main
# git remote add origin <url>
# git push -u origin main
# git log --oneline
`,
      };
    },
    objId: ['Menulis test berbasis assert', 'Menstrukturkan test sebagai fungsi', 'Memahami pytest dan fixtures dasar', 'Mengenal alur kerja Git: add, commit, push'],
    objEn: ['Write assert-based tests', 'Structure tests as functions', 'Understand pytest and basic fixtures', 'Know the Git workflow: add, commit, push'],
    expId: `## assert & Test Function
\`assert\` memeriksa kebenaran dan melempar AssertionError saat gagal. Struktur test: satu fungsi per perilaku, nama deskriptif (\`test_tambah\`). Pola 3 tahap: arrange (siapkan) -> act (panggil) -> assert (periksa). DataCamp menempatkan testing di bulan 3-4 roadmap 12 bulannya; travisjneuman level 3: "packages, logging, test-driven development".
\n## pytest
\`pytest\` = framework test de facto: temukan fungsi \`test_*\`, jalankan, lapor merah/hijau. \`pytest.raises(ValueError)\` untuk menguji error. Assertion bawaannya membaca pesan yang jelas — riset Springer: error message yang jelas menurunkan frustrasi pemula 73%.
\n## TDD Ringkas
TDD: tulis test yang gagal dulu, lalu implementasi minimal sampai hijau, lalu refactor. Untuk track ini: cukup tulis test BERSAMA implementasi — kebiasaan mengetes apa yang kamu bangun jauh lebih penting daripada urutannya.
\n## Git & GitHub
\`git add\` (staging) -> \`git commit\` (snapshot + pesan) -> \`git push\` (ke remote). \`git log --oneline\` melihat riwayat. Git muncul di hampir semua kurikulum riset: DataCamp bulan 1-2, Asmorix minggu 8, travisjneuman "Git Basics".
\n## Common Mistakes
Test menguji implementasi, bukan perilaku (menguji internal, bukan input->output), lupa edge case (bagi nol!), test yang selalu lolos, menge-commit file tidak relevan, commit tanpa pesan deskriptif.`,
    expEn: `## assert & Test Functions
\`assert\` checks truthiness and raises AssertionError on failure. Test structure: one function per behavior, descriptive names (\`test_tambah\`). The 3-phase pattern: arrange (prepare) -> act (call) -> assert (check). DataCamp places testing in months 3-4 of its 12-month roadmap; travisjneuman level 3: "packages, logging, test-driven development".
\n## pytest
\`pytest\` is the de facto test framework: finds \`test_*\` functions, runs them, reports red/green. \`pytest.raises(ValueError)\` tests errors. Its built-in assertions read clear messages — Springer research: clear error messages reduced beginner frustration by 73%.
\n## Concise TDD
TDD: write a failing test first, then minimal implementation until green, then refactor. For this track: writing tests WITH the implementation is enough — the habit of testing what you build matters far more than the order.
\n## Git & GitHub
\`git add\` (staging) -> \`git commit\` (snapshot + message) -> \`git push\` (to remote). \`git log --oneline\` views history. Git appears in nearly every researched curriculum: DataCamp months 1-2, Asmorix week 8, travisjneuman "Git Basics".
\n## Common Mistakes
Tests asserting implementation rather than behavior (testing internals, not input->output), missing edge cases (divide by zero!), always-passing tests, committing irrelevant files, commits without descriptive messages.`,
    chId: 'Tambah fungsi \u0060pangkat(a, b)\u0060 dan \u0060sisa(a, b)\u0060 ke calculator.py, tulis test-nya di index.py, lalu buat test_calculator.py versi pytest dan jalankan lokal. Setelah hijau: git init, commit, buat repo GitHub, push.',
    chEn: 'Add \u0060pangkat(a, b)\u0060 and \u0060sisa(a, b)\u0060 to calculator.py, write their tests in index.py, then create the pytest version test_calculator.py and run it locally. Once green: git init, commit, create a GitHub repo, push.',
    sumId: 'assert + test functions, pytest, TDD ringkas, Git workflow. Kode teruji + ter-version-control = siap produksi. Lanjut: proyek akhir.',
    sumEn: 'assert + test functions, pytest, concise TDD, the Git workflow. Tested + version-controlled code = production ready. Next: the final project.',
  },
  {
    phase: 4, num: 16, topicId: 'proyek-akhir',
    titleId: 'Proyek Akhir: Library Manager CLI', titleEn: 'Final Project: Library Manager CLI',
    codeFile: 'index.py',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'index.py': `import json
from pathlib import Path

FILE_DATA = Path("perpustakaan.json")

class Buku:
    def __init__(self, judul, penulis, tahun):
        self.judul = judul
        self.penulis = penulis
        self.tahun = tahun
        self.dipinjam = False

    def __str__(self):
        status = "dipinjam" if self.dipinjam else "tersedia"
        return f"[{status}] {self.judul} ({self.penulis}, {self.tahun})"

    def to_dict(self):
        return {"judul": self.judul, "penulis": self.penulis,
                "tahun": self.tahun, "dipinjam": self.dipinjam}

    @classmethod
    def from_dict(cls, data):
        buku = cls(data["judul"], data["penulis"], data["tahun"])
        buku.dipinjam = data["dipinjam"]
        return buku

class Perpustakaan:
    def __init__(self, file_data=FILE_DATA):
        self.file_data = Path(file_data)
        self.buku = {}                # key: judul -> Buku
        self._muat()

    def tambah(self, buku):
        self.buku[buku.judul] = buku
        self._simpan()

    def cari(self, kata):
        return [b for b in self.buku.values()
                if kata.lower() in b.judul.lower()
                or kata.lower() in b.penulis.lower()]

    def pinjam(self, judul):
        buku = self.buku.get(judul)
        if buku is None:
            raise KeyError(f"'{judul}' tidak ditemukan")
        if buku.dipinjam:
            raise ValueError(f"'{judul}' sudah dipinjam")
        buku.dipinjam = True
        self._simpan()

    def kembalikan(self, judul):
        buku = self.buku.get(judul)
        if buku is None:
            raise KeyError(f"'{judul}' tidak ditemukan")
        buku.dipinjam = False
        self._simpan()

    def daftar(self):
        return sorted(self.buku.values(), key=lambda b: b.judul)

    def _simpan(self):
        with open(self.file_data, "w", encoding="utf-8") as f:
            json.dump([b.to_dict() for b in self.buku.values()], f, indent=2, ensure_ascii=False)

    def _muat(self):
        if not self.file_data.exists():
            return
        with open(self.file_data, "r", encoding="utf-8") as f:
            for data in json.load(f):
                buku = Buku.from_dict(data)
                self.buku[buku.judul] = buku

def demo():
    perpus = Perpustakaan("perpustakaan_demo.json")
    perpus.tambah(Buku("Belajar Python", "Ayu", 2025))
    perpus.tambah(Buku("Go untuk Pemula", "Budi", 2024))
    perpus.tambah(Buku("Rust Essentials", "Citra", 2026))

    print("=== Perpustakaan ===")
    for b in perpus.daftar():
        print(f"  {b}")

    print("\\nTransaksi:")
    perpus.pinjam("Belajar Python")
    perpus.kembalikan("Belajar Python")
    perpus.pinjam("Go untuk Pemula")

    print("Setelah transaksi (tersimpan ke JSON):")
    for b in perpus.daftar():
        print(f"  {b}")

    print("\\nPencarian 'python':")
    for b in perpus.cari("python"):
        print(f"  {b}")

if __name__ == "__main__":
    demo()
`,
      };
    },
    objId: ['Mengintegrasikan kelas, dict, JSON, dan error handling', 'Menerapkan pola persistence baca-simpan', 'Menggunakan classmethod untuk deserialisasi', 'Menilai jalur karier setelah track selesai'],
    objEn: ['Integrate classes, dicts, JSON, and error handling', 'Apply read-save persistence patterns', 'Use classmethods for deserialization', 'Assess career paths after the track'],
    expId: `## Arsitektur Proyek
Capstone ini memakai SEMUA materi: class (Buku, Perpustakaan), special methods (__str__), dict storage, JSON persistence, sorted + lambda, try/except (KeyError, ValueError), if __name__ guard. Ini pola "domain object + repository" yang sama dengan aplikasi produksi — hanya tanpa framework.
\n## JSON Persistence
\`to_dict()\` serialisasi, \`from_dict()\` deserialisasi (classmethod: membangun instance dari data mentah). \`_simpan()\` menulis setelah setiap mutasi; \`_muat()\` membaca saat konstruksi. Data hidup lebih lama dari program — pola yang dipakai di todo apps, config, save files.
\n## Pemisahan Demo & UI
\`demo()\` memisahkan contoh jalan dari struktur domain. Challenge: ganti demo() dengan menu input() atau argparse CLI (tambah/pinjam/kembalikan/cari/daftar) — mengombinasikan L8 menu + L14 argparse.
\n## Setelah Track Ini (peta karier riset)
Research semua sumber (CourseFacts, DataCamp, Scaler, Asmorix): setelah inti Python, PILIH satu jalur — (A) Web: Flask/FastAPI/Django + database; (B) Data: NumPy/Pandas/Matplotlib/Jupyter; (C) Automasi & CLI: os/shutil/subprocess/requests + scheduling; (D) AI: LLM API (Gemini SDK dll). Satu jalur dalam, bukan semua dangkal. Tambahan universal: Git, SQL, terminal.`,
    expEn: `## Project Architecture
This capstone uses ALL the material: classes (Buku, Perpustakaan), special methods (__str__), dict storage, JSON persistence, sorted + lambda, try/except (KeyError, ValueError), the if __name__ guard. This is the same "domain object + repository" pattern used in production apps — just without frameworks.
\n## JSON Persistence
\`to_dict()\` serializes, \`from_dict()\` deserializes (a classmethod: builds instances from raw data). \`_simpan()\` writes after every mutation; \`_muat()\` reads on construction. Data outlives the program — the pattern used by todo apps, configs, save files.
\n## Demo vs UI Separation
\`demo()\` separates the runnable example from the domain structure. Challenge: replace demo() with an input() menu or an argparse CLI (add/borrow/return/search/list) — combining the L8 menu with L14 argparse.
\n## After This Track (researched career map)
All sources agree (CourseFacts, DataCamp, Scaler, Asmorix): after core Python, PICK ONE path — (A) Web: Flask/FastAPI/Django + database; (B) Data: NumPy/Pandas/Matplotlib/Jupyter; (C) Automation & CLI: os/shutil/subprocess/requests + scheduling; (D) AI: LLM APIs (Gemini SDK etc.). One path deep, not all shallow. Universal additions: Git, SQL, terminal.`,
    chId: 'Sempurnakan proyek: (1) CLI argparse penuh: tambah, pinjam, kembalikan, cari, daftar, statistik; (2) statistik koleksi: jumlah buku, persentase dipinjam, buku tertua; (3) test pytest untuk Perpustakaan (tambah, pinjam dua kali harus error); (4) commit + push ke GitHub dan bagikan.',
    chEn: 'Polish the project: (1) a full argparse CLI: add, borrow, return, search, list, stats; (2) collection stats: book count, borrowed percentage, oldest book; (3) pytest tests for Perpustakaan (add, double borrow must error); (4) commit + push to GitHub and share it.',
    sumId: 'Capstone selesai: kelas + dict + JSON + error handling + CLI = tool Python nyata. Lanjut pilih jalur: web/data/automasi/AI. Selamat, track Python selesai!',
    sumEn: 'Capstone done: classes + dicts + JSON + error handling + CLI = a real Python tool. Next, pick your path: web/data/automation/AI. Congratulations, the Python track is complete!',
  },
];

const LESSONS = [...LESSONS_P1, ...LESSONS_P2, ...LESSONS_P3, ...LESSONS_P4];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find((p) => p.phase === lesson.phase);
  const levelDir = phase.id;
  const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\n');

  for (const lang of ['id', 'en']) {
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const phaseName = isId ? phase.nameId : phase.nameEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> Python | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${title}

\`\`\`python
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${lesson.expId.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\s*/, '')}**`).join('\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    // Write project files JSON for StackBlitz playground
    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\n✓ Generated ${total} Python curriculum files (${LESSONS.length} lessons × 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);
