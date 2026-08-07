import { BaseGenerator } from './lib/base-generator.mjs';

// Python curriculum generator
const gen = new BaseGenerator('python', 'Python');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar Python: syntax, tipe data, control flow, functions.',
    descEn: 'Python basics: syntax, data types, control flow, functions.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Python idiomatic: collections, OOP, file I/O, error handling.',
    descEn: 'Idiomatic Python: collections, OOP, file I/O, error handling.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Production Python: libraries, testing, CLI tools, capstone project.',
    descEn: 'Production Python: libraries, testing, CLI tools, capstone project.',
  },
];

const MODULES = [

  // Week 1 - Dasar Python & Sintaks
  {
    week: 1, level: 'beginer', topicId: 'dasar-python',
    titleId: 'Dasar Python & Sintaks', titleEn: 'Python Basics & Syntax',
    programId: 'Halo, Python!', programEn: 'Hello, Python!',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'python',
    code: `
    # Dasar Python & Sintaks
    print("Selamat datang di Python!")
    print("Python adalah bahasa interpreted, dynamically typed.")
    
    # Variabel — tidak perlu deklarasi tipe
    nama = "Pyverse"
    versi = 3.12
    aktif = True
    tahun = 2024
    
    # f-strings untuk formatting
    print(f"Nama: {nama}")
    print(f"Versi: {versi}")
    print(f"Aktif: {aktif}")
    print(f"Tahun: {tahun}")
    
    # Tipe data dengan type()
    print(f"\\nTipe variabel:")
    print(f"nama: {type(nama).__name__}")
    print(f"versi: {type(versi).__name__}")
    print(f"aktif: {type(aktif).__name__}")
    print(f"tahun: {type(tahun).__name__}")
    
    # Multiple assignment
    x, y, z = 10, 20, 30
    print(f"\\nx={x}, y={y}, z={z}")
    
    # Swap tanpa variabel temporary
    a, b = 5, 10
    a, b = b, a
    print(f"Setelah swap: a={a}, b={b}")
    
    # Konversi tipe
    angka_str = "42"
    angka_int = int(angka_str)
    angka_float = float(angka_str)
    print(f"\\nKonversi: '{angka_str}' -> int={angka_int}, float={angka_float}")
    `,
    objectivesId: [
      'Memahami Python sebagai bahasa interpreted, dynamically typed (Python.org tutorial)',
      'Menjalankan file Python dengan python command dan IDE',
      'Mendeklarasikan variabel tanpa tipe eksplisit — duck typing',
      'Mengenal tipe data dasar: int, float, str, bool, None',
      'Menggunakan f-strings untuk string formatting modern',
    ],
    objectivesEn: [
      'Understand Python as an interpreted, dynamically typed language (Python.org tutorial)',
      'Run Python files with python command and IDE',
      'Declare variables without explicit types — duck typing',
      'Learn basic data types: int, float, str, bool, None',
      'Use f-strings for modern string formatting',
    ],
    explanationId: '### Apa Itu Python\nPython adalah bahasa interpreted, dynamically typed yang dibuat Guido van Rossum. Tidak perlu kompilasi — kode dijalankan baris per baris. Indentation (spasi) menentukan blok kode, bukan kurung kurawal.\n\n### Variabel & Tipe Data\nTidak perlu deklarasi tipe: `x = 5` otomatis int. Python cek tipe saat runtime. Tipe dasar: `int`, `float`, `str`, `bool`, `None`.\n\n### f-strings\n`f"Hello {name}"` — cara modern formatting string di Python 3.6+. Lebih readable daripada `%` atau `.format()`.\n\n### Multiple Assignment\n`a, b = 10, 20` dan swap `a, b = b, a` — fitur elegan Python.\n\n### Konversi Tipe\n`int("42")`, `str(100)`, `float("3.14")` — konversi eksplisit antar tipe.',
    explanationEn: '### What is Python\nInterpreted, dynamically typed language by Guido van Rossum. No compilation needed — code runs line by line. Indentation defines code blocks.\n\n### Variables & Types\nNo type declaration needed: `x = 5` is auto int. Basic types: `int`, `float`, `str`, `bool`, `None`.\n\n### f-strings\n`f"Hello {name}"` — modern string formatting in Python 3.6+.\n\n### Multiple Assignment\n`a, b = 10, 20` and swap `a, b = b, a`.\n\n### Type Conversion\n`int("42")`, `str(100)`, `float("3.14")` — explicit type conversion.',
    experimentsId: [
      'Ubah nilai variabel dan lihat output berubah',
      'Coba type() pada berbagai variabel',
      'Buat konversi tipe: str ke float, int ke str',
      'Eksperimen dengan multiple assignment',
      'Buat program kecil gabungan 2-3 konsep',
    ],
    experimentsEn: [
      'Change variable values and observe output',
      'Try type() on different variables',
      'Create type conversions: str to float, int to str',
      'Experiment with multiple assignment',
      'Build a small program combining 2-3 concepts',
    ],
    challengeId: 'Buat program konversi mata uang: input Rupiah, konversi ke USD, EUR, JPY. Gunakan f-strings dan konversi tipe.',
    challengeEn: 'Build a currency converter: input Rupiah, convert to USD, EUR, JPY. Use f-strings and type conversion.',
    summaryId: 'Minggu 1 dari 12: **Dasar Python & Sintaks** (Level: Pemula). Python mudah dibaca dan ditulis. Minggu depan: **Data Types & Operasi**.',
    summaryEn: 'Week 1 of 12: **Python Basics & Syntax** (Level: Beginner). Python is readable and writable. Next week: **Data Types & Operations**.',
  },

  // Week 2 - Data Types & Operasi
  {
    week: 2, level: 'beginer', topicId: 'tipe-data-operasi',
    titleId: 'Data Types & Operasi', titleEn: 'Data Types & Operations',
    programId: 'Kalkulator Data', programEn: 'Data Calculator',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'python',
    code: `
    # Data Types & Operasi
    print("=== Numbers ===")
    a, b = 17, 5
    print(f"{a} + {b} = {a + b}")
    print(f"{a} - {b} = {a - b}")
    print(f"{a} * {b} = {a * b}")
    print(f"{a} / {b} = {a / b:.2f}")
    print(f"{a} // {b} = {a // b}")
    print(f"{a} % {b} = {a % b}")
    print(f"{a} ** {b} = {a ** b}")
    
    print("\\n=== Strings ===")
    s = "Python"
    print(f"Length: {len(s)}")
    print(f"Upper: {s.upper()}")
    print(f"Lower: {s.lower()}")
    print(f"Replace: {s.replace('Py', 'My')}")
    print(f"Slice [0:3]: {s[0:3]}")
    print(f"Slice [::2]: {s[::2]}")
    print(f"Reverse: {s[::-1]}")
    print(f"'th' in s: {'th' in s}")
    
    print("\\n=== Booleans ===")
    x, y = 10, 20
    print(f"{x} == {y}: {x == y}")
    print(f"{x} != {y}: {x != y}")
    print(f"{x} < {y}: {x < y}")
    print(f"True and False: {True and False}")
    print(f"True or False: {True or False}")
    print(f"not True: {not True}")
    
    print("\\n=== Comparison Chains ===")
    n = 15
    print(f"10 <= {n} <= 20: {10 <= n <= 20}")
    
    print("\\n=== None ===")
    hasil = None
    print(f"None: {hasil}, type: {type(hasil).__name__}")
    print(f"hasil is None: {hasil is None}")
    `,
    objectivesId: [
      'Operator aritmatika: +, -, *, /, //, %, **',
      'String methods: upper, lower, replace, strip, split',
      'String slicing: s[start:end:step], s[::-1] reverse',
      'Boolean operators: and, or, not, comparison chains',
      'None type dan identity check dengan is operator',
    ],
    objectivesEn: [
      'Arithmetic operators: +, -, *, /, //, %, **',
      'String methods: upper, lower, replace, strip, split',
      'String slicing: s[start:end:step], s[::-1] reverse',
      'Boolean operators: and, or, not, comparison chains',
      'None type and identity check with is operator',
    ],
    explanationId: '### Operator Aritmatika\n`/` float division, `//` floor division, `%` modulo, `**` power.\n\n### String Methods\n`upper()`, `lower()`, `replace()`, `strip()`, `split()`, `join()`.\n\n### String Slicing\n`s[start:end:step]`. `s[::-1]` reverse string. `s[::2]` setiap karakter kedua.\n\n### Boolean & Comparison\n`and`, `or`, `not`. Comparison chains: `10 <= x <= 20`.\n\n### None & Identity\n`None` = null Python. Cek dengan `is None`, bukan `== None`.',
    explanationEn: '### Arithmetic Operators\n`/` float div, `//` floor div, `%` modulo, `**` power.\n\n### String Methods\nCommon string operations.\n\n### String Slicing\n`s[start:end:step]`. Reverse with `s[::-1]`.\n\n### Boolean & Comparison\nLogical operators and chained comparisons.\n\n### None & Identity\n`None` = Python null. Check with `is None`.',
    experimentsId: [
      'Hitung BMI dengan operator aritmatika',
      'Balik string dengan slicing — cek palindrom',
      'Coba semua string methods pada teks panjang',
      'Buat truth table untuk and/or/not',
      'Eksperimen comparison chains',
    ],
    experimentsEn: [
      'Calculate BMI with arithmetic operators',
      'Reverse string with slicing — check palindrome',
      'Try all string methods on long text',
      'Build truth table for and/or/not',
      'Experiment with comparison chains',
    ],
    challengeId: 'Buat program validasi password: min 8 karakter, ada huruf besar, kecil, angka, simbol. Gunakan string methods dan boolean operators.',
    challengeEn: 'Build a password validator: min 8 chars, uppercase, lowercase, digit, symbol. Use string methods and boolean operators.',
    summaryId: 'Minggu 2 dari 12: **Data Types & Operasi** (Level: Pemula). Fondasi manipulasi data. Minggu depan: **Control Flow**.',
    summaryEn: 'Week 2 of 12: **Data Types & Operations** (Level: Beginner). Foundation for data manipulation. Next week: **Control Flow**.',
  },

  // Week 3 - Control Flow & Loops
  {
    week: 3, level: 'beginer', topicId: 'control-flow',
    titleId: 'Control Flow & Loops', titleEn: 'Control Flow & Loops',
    programId: 'Grade & Bilangan', programEn: 'Grades & Numbers',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'python',
    code: `
    # Control Flow & Loops
    print("=== If/Elif/Else ===")
    nilai = 85
    if nilai >= 90:
        grade = "A"
    elif nilai >= 80:
        grade = "B"
    elif nilai >= 70:
        grade = "C"
    elif nilai >= 60:
        grade = "D"
    else:
        grade = "E"
    print(f"Nilai {nilai} -> Grade {grade}")
    
    print("\\n=== Ternary Expression ===")
    status = "Lulus" if nilai >= 60 else "Tidak Lulus"
    print(f"Status: {status}")
    
    print("\\n=== For Loop ===")
    print("Range 5:")
    for i in range(5):
        print(f"  {i}", end="")
    print()
    
    print("Range(2, 10, 2):")
    for i in range(2, 10, 2):
        print(f"  {i}", end="")
    print()
    
    print("\\n=== Loop through List ===")
    buah = ["apel", "mangga", "pisang", "jeruk"]
    for i, item in enumerate(buah, 1):
        print(f"  {i}. {item}")
    
    print("\\n=== While Loop ===")
    n = 1
    while n <= 5:
        print(f"  While: {n}")
        n += 1
    
    print("\\n=== Break & Continue ===")
    for i in range(10):
        if i == 3:
            continue
        if i == 7:
            break
        print(f"  {i}", end="")
    print()
    
    print("\\n=== Nested Loop (Multiplication Table) ===")
    for i in range(1, 4):
        for j in range(1, 4):
            print(f"{i*j:3}", end="")
        print()
    
    print("\\n=== List Comprehension ===")
    kuadrat = [x**2 for x in range(1, 6)]
    genap = [x for x in range(10) if x % 2 == 0]
    print(f"Kuadrat: {kuadrat}")
    print(f"Genap: {genap}")
    `,
    objectivesId: [
      'If/elif/else dengan indentation sebagai pengganti kurung kurawal',
      'For loop dengan range() dan iterasi pada list/string/dict',
      'While loop dengan kondisi dan increment',
      'Break, continue, dan pass untuk kontrol loop',
      'List comprehension: [expr for x in iterable if cond]',
    ],
    objectivesEn: [
      'If/elif/else with indentation replacing curly braces',
      'For loops with range() and iteration over lists/strings/dicts',
      'While loops with conditions and increments',
      'Break, continue, and pass for loop control',
      'List comprehension: [expr for x in iterable if cond]',
    ],
    explanationId: '### If/Elif/Else\nIndentasi (4 spasi) menentukan blok. Tidak perlu kurung kurawal atau parentheses.\n\n### For Loop\n`range(n)` = 0..n-1. `range(start, stop, step)`. Iterasi langsung pada iterable.\n\n### enumerate\n`enumerate(list, start=1)` memberikan index + value sekaligus.\n\n### Break & Continue\n`break` keluar loop, `continue` skip ke iterasi berikutnya, `pass` dummy statement.\n\n### List Comprehension\n`[x**2 for x in range(5)]` — ringkas, cepat, Pythonic.\n\n### Ternary\n`value_if_true if condition else value_if_false`.',
    explanationEn: '### If/Elif/Else\nIndentation (4 spaces) defines blocks. No curly braces needed.\n\n### For Loop\n`range(n)` = 0..n-1. Iterate directly over iterables.\n\n### enumerate\n`enumerate(list, start=1)` gives index + value.\n\n### Break & Continue\n`break` exits loop, `continue` skips, `pass` is a no-op.\n\n### List Comprehension\nConcise way to create lists.\n\n### Ternary\n`value_if_true if condition else value_if_false`.',
    experimentsId: [
      'Ubah nilai dan lihat grade berubah',
      'Buat for loop dengan break pada kondisi tertentu',
      'Buat list comprehension yang filter + transform',
      'Implementasikan FizzBuzz dengan if/elif',
      'Coba nested loop untuk pola segitiga',
    ],
    experimentsEn: [
      'Change values and observe grade changes',
      'Create for loop with break on condition',
      'Build list comprehension that filters + transforms',
      'Implement FizzBuzz with if/elif',
      'Try nested loops for triangle patterns',
    ],
    challengeId: 'Buat program tebak angka: generate random 1-100, user diberi hint "lebih besar/kecil", hitung jumlah percobaan. Gunakan while loop.',
    challengeEn: 'Build a number guessing game: generate random 1-100, give "higher/lower" hints, count attempts. Use while loop.',
    summaryId: 'Minggu 3 dari 12: **Control Flow & Loops** (Level: Pemula). Logika program Anda. Minggu depan: **Functions**.',
    summaryEn: 'Week 3 of 12: **Control Flow & Loops** (Level: Beginner). Your program logic. Next week: **Functions**.',
  },

  // Week 4 - Functions & Modules
  {
    week: 4, level: 'beginer', topicId: 'functions',
    titleId: 'Functions & Modules', titleEn: 'Functions & Modules',
    programId: 'Kalkulator Modular', programEn: 'Modular Calculator',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'python',
    code: `
    # Functions & Modules
    import math
    import random
    from datetime import datetime
    
    # Basic Function
    def sapa(nama, greeting="Halo"):
        """Sapa orang dengan greeting yang bisa dikustomisasi."""
        return f"{greeting}, {nama}!"
    
    # Multiple Return Values
    def hitung(a, b):
        """Return jumlah, selisih, kali, bagi."""
        return a + b, a - b, a * b, a / b if b != 0 else None
    
    # *args dan **kwargs
    def tampilkan(*args, **kwargs):
        print(f"Positional: {args}")
        print(f"Keyword: {kwargs}")
    
    # Lambda Function
    kuadrat = lambda x: x ** 2
    pangkat = lambda a, b: a ** b
    
    # Decorator Sederhana
    def timer(func):
        def wrapper(*args, **kwargs):
            start = datetime.now()
            result = func(*args, **kwargs)
            elapsed = (datetime.now() - start).total_seconds()
            print(f"{func.__name__} took {elapsed:.4f}s")
            return result
        return wrapper
    
    @timer
    def jumlahkan(n):
        return sum(range(n))
    
    # Main Program
    print("=== Functions ===")
    print(sapa("Budi"))
    print(sapa("Siti", "Selamat pagi"))
    
    print("\\n=== Multiple Returns ===")
    j, s, k, b = hitung(10, 3)
    print(f"Jumlah: {j}, Selisih: {s}, Kali: {k}, Bagi: {b:.2f}")
    
    print("\\n=== *args & **kwargs ===")
    tampilkan(1, 2, 3, nama="Budi", umur=25)
    
    print("\\n=== Lambda ===")
    print(f"Kuadrat 5: {kuadrat(5)}")
    print(f"2 pangkat 10: {pangkat(2, 10)}")
    
    print("\\n=== Built-in Functions ===")
    angka = [3, 1, 4, 1, 5, 9, 2, 6]
    print(f"List: {angka}")
    print(f"Sorted: {sorted(angka)}")
    print(f"Reversed: {sorted(angka, reverse=True)}")
    print(f"Sum: {sum(angka)}")
    print(f"Max: {max(angka)}, Min: {min(angka)}")
    print(f"Map (x2): {list(map(lambda x: x*2, angka))}")
    print(f"Filter (genap): {list(filter(lambda x: x%2==0, angka))}")
    
    print("\\n=== Math Module ===")
    print(f"Pi: {math.pi:.6f}")
    print(f"Sqrt(144): {math.sqrt(144)}")
    print(f"Faktorial(5): {math.factorial(5)}")
    
    print("\\n=== Decorator ===")
    hasil = jumlahkan(1000000)
    print(f"Hasil: {hasil}")
    `,
    objectivesId: [
      'Membuat function dengan def, parameter, dan return value',
      'Default parameter, *args, **kwargs untuk fleksibilitas',
      'Lambda function untuk operasi satu baris',
      'Built-in functions: map, filter, sorted, sum, max, min',
      'Import module: import, from...import, alias',
    ],
    objectivesEn: [
      'Create functions with def, parameters, and return values',
      'Default parameters, *args, **kwargs for flexibility',
      'Lambda functions for one-line operations',
      'Built-in functions: map, filter, sorted, sum, max, min',
      'Import modules: import, from...import, alias',
    ],
    explanationId: '### Function Dasar\n`def nama(params):` dengan docstring `"""..."""`. Return multiple values -> tuple.\n\n### Parameter Fleksibel\n`*args` = tuple positional args. `**kwargs` = dict keyword args. Default: `def f(x=10)`.\n\n### Lambda\n`lambda x: x**2` — function anonymous satu baris. Cocok untuk callback.\n\n### Built-in Functions\n`map(func, list)`, `filter(func, list)`, `sorted(list)`, `sum()`, `enumerate()`, `zip()`.\n\n### Import Module\n`import math`, `from datetime import datetime`, `import numpy as np`.\n\n### Decorator\nFunction yang membungkus function lain. `@timer` syntax sugar.',
    explanationEn: '### Basic Functions\n`def name(params):` with docstring. Return multiple values -> tuple.\n\n### Flexible Parameters\n`*args` = positional tuple. `**kwargs` = keyword dict. Default: `def f(x=10)`.\n\n### Lambda\nAnonymous one-line functions.\n\n### Built-in Functions\n`map`, `filter`, `sorted`, `sum`, `enumerate`, `zip`.\n\n### Import Modules\nVarious import styles.\n\n### Decorators\nFunctions wrapping other functions.',
    experimentsId: [
      'Buat function dengan berbagai tipe parameter',
      'Coba map dan filter dengan lambda',
      'Buat decorator sendiri: @debug, @cache',
      'Eksperimen dengan zip dan enumerate',
      'Buat module sendiri dan import',
    ],
    experimentsEn: [
      'Create functions with different parameter types',
      'Try map and filter with lambda',
      'Build your own decorator: @debug, @cache',
      'Experiment with zip and enumerate',
      'Create your own module and import it',
    ],
    challengeId: 'Buat library matematika sendiri: function untuk faktorial, fibonacci, prima check, GCD, LCM. Gunakan docstring dan type hints.',
    challengeEn: 'Build your own math library: functions for factorial, fibonacci, prime check, GCD, LCM. Use docstrings and type hints.',
    summaryId: 'Minggu 4 dari 12: **Functions & Modules** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Collections** (Intermediate).',
    summaryEn: 'Week 4 of 12: **Functions & Modules** (Level: Beginner). Beginner phase complete! Next week: **Collections** (Intermediate).',
  },

  // Week 5 - Collections & Data Structures
  {
    week: 5, level: 'intermediate', topicId: 'collections',
    titleId: 'Collections & Data Structures', titleEn: 'Collections & Data Structures',
    programId: 'Manajemen Data', programEn: 'Data Manager',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'python',
    code: `
    # Collections & Data Structures
    from collections import Counter, defaultdict, namedtuple
    
    print("=== List ===")
    angka = [3, 1, 4, 1, 5, 9, 2, 6]
    angka.append(7)
    angka.insert(0, 0)
    angka.sort()
    print(f"List: {angka}")
    print(f"Pop: {angka.pop()}, setelah pop: {angka[-3:]}")
    
    print("\\n=== Tuple (Immutable) ===")
    coord = (10, 20)
    x, y = coord
    print(f"Coord: {x}, {y}")
    single = (42,)
    print(f"Single: {single}")
    
    print("\\n=== Dictionary ===")
    profil = {
        "nama": "Budi",
        "umur": 25,
        "kota": "Jakarta",
        "hobi": ["ngoding", "baca"]
    }
    print(f"Nama: {profil['nama']}")
    print(f"Get: {profil.get('email', 'N/A')}")
    profil["email"] = "budi@email.com"
    print(f"Keys: {list(profil.keys())}")
    print(f"Values: {list(profil.values())}")
    
    print("\\n=== Dict Comprehension ===")
    kuadrat = {x: x**2 for x in range(1, 6)}
    print(f"Kuadrat: {kuadrat}")
    
    print("\\n=== Set ===")
    a = {1, 2, 3, 4, 5}
    b = {4, 5, 6, 7, 8}
    print(f"Union: {a | b}")
    print(f"Intersection: {a & b}")
    print(f"Difference: {a - b}")
    print(f"Symmetric diff: {a ^ b}")
    
    print("\\n=== Counter ===")
    teks = "abracadabra"
    counter = Counter(teks)
    print(f"Counter: {counter}")
    print(f"Top 3: {counter.most_common(3)}")
    
    print("\\n=== defaultdict ===")
    groups = defaultdict(list)
    for buah in ["apel", "mangga", "alpukat", "pisang"]:
        groups[buah[0]].append(buah)
    print(f"Group by first letter: {dict(groups)}")
    
    print("\\n=== namedtuple ===")
    Point = namedtuple("Point", ["x", "y"])
    p = Point(3, 4)
    print(f"Point: ({p.x}, {p.y})")
    
    print("\\n=== Zip & Unzip ===")
    nama = ["Budi", "Siti", "Andi"]
    umur = [25, 23, 27]
    for n, u in zip(nama, umur):
        print(f"  {n}: {u}")
    `,
    objectivesId: [
      'List: mutable, ordered — append, insert, pop, sort, slice',
      'Tuple: immutable, hashable — unpacking dan namedtuple',
      'Dictionary: key-value pairs — get, keys, values, items',
      'Set: unique elements — union, intersection, difference',
      'collections module: Counter, defaultdict, namedtuple, deque',
    ],
    objectivesEn: [
      'List: mutable, ordered — append, insert, pop, sort, slice',
      'Tuple: immutable, hashable — unpacking and namedtuple',
      'Dictionary: key-value pairs — get, keys, values, items',
      'Set: unique elements — union, intersection, difference',
      'collections module: Counter, defaultdict, namedtuple, deque',
    ],
    explanationId: '### List vs Tuple\nList mutable `[]`, Tuple immutable `()`. Tuple bisa jadi dict key.\n\n### Dictionary\nKey-value dengan O(1) lookup. `get(key, default)` aman dari KeyError.\n\n### Dict Comprehension\n`{k: v for x in iterable}`.\n\n### Set\nOperasi matematika: union `|`, intersection `&`, difference `-`.\n\n### collections Module\n`Counter` untuk frekuensi, `defaultdict` auto-init key, `namedtuple` tuple dengan nama field.\n\n### Zip\n`zip(list1, list2)` menggabungkan iterable parallel.',
    explanationEn: '### List vs Tuple\nList mutable `[]`, Tuple immutable `()`. Tuples can be dict keys.\n\n### Dictionary\nKey-value with O(1) lookup. `get(key, default)` is safe.\n\n### Dict Comprehension\n`{k: v for x in iterable}`.\n\n### Set\nMathematical operations: union, intersection, difference.\n\n### collections Module\n`Counter` for frequency, `defaultdict` auto-init, `namedtuple` named fields.\n\n### Zip\nCombine iterables in parallel.',
    experimentsId: [
      'Buat program frekuensi kata dengan Counter',
      'Implementasikan cache sederhana dengan dict',
      'Coba set operations pada dua list',
      'Buat data processing pipeline dengan zip',
      'Eksperimen dengan deque untuk queue/stack',
    ],
    experimentsEn: [
      'Build word frequency program with Counter',
      'Implement simple cache with dict',
      'Try set operations on two lists',
      'Build data processing pipeline with zip',
      'Experiment with deque for queue/stack',
    ],
    challengeId: 'Buat program inventory: tambah/hapus produk (dict), kategori (set), riwayat transaksi (list). Gunakan Counter untuk laporan penjualan.',
    challengeEn: 'Build an inventory program: add/remove products (dict), categories (set), transaction history (list). Use Counter for sales reports.',
    summaryId: 'Minggu 5 dari 12: **Collections & Data Structures** (Level: Menengah). Struktur data harian Python. Minggu depan: **Object-Oriented Programming**.',
    summaryEn: 'Week 5 of 12: **Collections & Data Structures** (Level: Intermediate). Daily data structures in Python. Next week: **Object-Oriented Programming**.',
  },

  // Week 6 - Object-Oriented Programming
  {
    week: 6, level: 'intermediate', topicId: 'oop',
    titleId: 'Object-Oriented Programming', titleEn: 'Object-Oriented Programming',
    programId: 'Sistem Bank', programEn: 'Bank System',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'python',
    code: `
    # Object-Oriented Programming
    from abc import ABC, abstractmethod
    
    class BankAccount:
        """Rekening bank dengan OOP."""
        bank_name = "Python Bank"
    
        def __init__(self, owner: str, balance: float = 0):
            self.owner = owner
            self._balance = balance
            self.__id = id(self)
    
        def deposit(self, amount: float):
            if amount <= 0:
                raise ValueError("Jumlah deposit harus positif")
            self._balance += amount
            return self
    
        def withdraw(self, amount: float):
            if amount > self._balance:
                raise ValueError("Saldo tidak cukup")
            self._balance -= amount
            return self
    
        @property
        def balance(self):
            return self._balance
    
        def __str__(self):
            return f"{self.owner}: Rp{self._balance:,.0f}"
    
        def __repr__(self):
            return f"BankAccount('{self.owner}', {self._balance})"
    
    class SavingsAccount(BankAccount):
        """Rekening tabungan dengan bunga."""
    
        def __init__(self, owner: str, balance: float = 0, rate: float = 0.05):
            super().__init__(owner, balance)
            self.rate = rate
    
        def add_interest(self):
            interest = self._balance * self.rate
            self._balance += interest
            return interest
    
    class Shape(ABC):
        @abstractmethod
        def area(self): pass
    
        @abstractmethod
        def perimeter(self): pass
    
    class Rectangle(Shape):
        def __init__(self, width, height):
            self.width = width
            self.height = height
    
        def area(self): return self.width * self.height
        def perimeter(self): return 2 * (self.width + self.height)
        def __str__(self): return f"Rectangle({self.width}x{self.height})"
    
    # Main Program
    print("=== Bank Account ===")
    acc = BankAccount("Budi", 1000000)
    acc.deposit(500000)
    acc.withdraw(200000)
    print(f"Account: {acc}")
    print(f"Balance: Rp{acc.balance:,.0f}")
    
    print("\\n=== Savings Account ===")
    savings = SavingsAccount("Siti", 2000000)
    interest = savings.add_interest()
    print(f"Savings: {savings}")
    print(f"Bunga: Rp{interest:,.0f}")
    
    print("\\n=== Abstract Class ===")
    rect = Rectangle(5, 3)
    print(f"{rect} -> Area: {rect.area()}, Perimeter: {rect.perimeter()}")
    
    print("\\n=== isinstance checks ===")
    print(f"acc is BankAccount: {isinstance(acc, BankAccount)}")
    print(f"savings is BankAccount: {isinstance(savings, BankAccount)}")
    print(f"rect is Shape: {isinstance(rect, Shape)}")
    `,
    objectivesId: [
      'Membuat class dengan __init__, self, dan instance methods',
      'Inheritance: super() dan method overriding',
      'Abstract Base Class (ABC) dengan @abstractmethod',
      'Encapsulation: _protected, __private, @property',
      'Dunder methods: __str__, __repr__, __init__',
    ],
    objectivesEn: [
      'Create classes with __init__, self, and instance methods',
      'Inheritance: super() and method overriding',
      'Abstract Base Class (ABC) with @abstractmethod',
      'Encapsulation: _protected, __private, @property',
      'Dunder methods: __str__, __repr__, __init__',
    ],
    explanationId: '### Class & __init__\n`self` = instance. `__init__` = constructor. Method pertama param = self.\n\n### Inheritance\n`class Child(Parent)`. `super().__init__()` panggil parent constructor.\n\n### ABC\n`@abstractmethod` wajib diimplement subclass. Tidak bisa instantiate ABC langsung.\n\n### Encapsulation\n`_protected` convention, `__private` name mangling. `@property` untuk getter.\n\n### Dunder Methods\n`__str__` user-friendly, `__repr__` developer/debug. Lainnya: `__eq__`, `__len__`, `__getitem__`.',
    explanationEn: '### Class & __init__\n`self` = instance. `__init__` = constructor.\n\n### Inheritance\n`class Child(Parent)`. `super()` calls parent.\n\n### ABC\n`@abstractmethod` must be implemented by subclasses.\n\n### Encapsulation\n`_protected` convention, `__private` name mangling. `@property` for getters.\n\n### Dunder Methods\n`__str__` user-friendly, `__repr__` developer-friendly.',
    experimentsId: [
      'Buat class hierarchy: Animal -> Dog, Cat',
      'Coba @property untuk computed attribute',
      'Buat class dengan __eq__ dan __lt__',
      'Eksperimen dengan multiple inheritance',
      'Buat custom iterator dengan __iter__ dan __next__',
    ],
    experimentsEn: [
      'Create class hierarchy: Animal -> Dog, Cat',
      'Try @property for computed attribute',
      'Create class with __eq__ and __lt__',
      'Experiment with multiple inheritance',
      'Build custom iterator with __iter__ and __next__',
    ],
    challengeId: 'Buat sistem perpustakaan: class Book, Member, Library. Method: borrow, return, search. Gunakan inheritance dan encapsulation.',
    challengeEn: 'Build a library system: class Book, Member, Library. Methods: borrow, return, search. Use inheritance and encapsulation.',
    summaryId: 'Minggu 6 dari 12: **Object-Oriented Programming** (Level: Menengah). Python OOP yang powerful. Minggu depan: **File I/O & Error Handling**.',
    summaryEn: 'Week 6 of 12: **Object-Oriented Programming** (Level: Intermediate). Powerful Python OOP. Next week: **File I/O & Error Handling**.',
  },

  // Week 7 - File I/O & Error Handling
  {
    week: 7, level: 'intermediate', topicId: 'file-io',
    titleId: 'File I/O & Error Handling', titleEn: 'File I/O & Error Handling',
    programId: 'Manajemen File', programEn: 'File Manager',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'python',
    code: `
    # File I/O & Error Handling
    import json
    import csv
    import os
    from pathlib import Path
    
    # Writing Files
    print("=== Writing Files ===")
    data = ["Python", "JavaScript", "Go", "Rust"]
    with open("languages.txt", "w") as f:
        for lang in data:
            f.write(f"\\n- {lang}")
    print("Written: languages.txt")
    
    # Reading Files
    print("\\n=== Reading Files ===")
    with open("languages.txt", "r") as f:
        content = f.read()
    print(f"Content:\\n{content}")
    
    with open("languages.txt", "r") as f:
        lines = f.readlines()
    print(f"Lines: {len(lines)}")
    
    # JSON
    print("\\n=== JSON ===")
    users = [
        {"name": "Budi", "age": 25, "city": "Jakarta"},
        {"name": "Siti", "age": 23, "city": "Bandung"},
    ]
    with open("users.json", "w") as f:
        json.dump(users, f, indent=2)
    
    with open("users.json", "r") as f:
        loaded = json.load(f)
    print(f"Loaded {len(loaded)} users")
    for u in loaded:
        print(f"  {u['name']}: {u['age']}")
    
    # CSV
    print("\\n=== CSV ===")
    with open("data.csv", "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Nama", "Umur", "Kota"])
        writer.writerow(["Budi", 25, "Jakarta"])
        writer.writerow(["Siti", 23, "Bandung"])
    
    with open("data.csv", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            print(f"  {row['Nama']}: {row['Umur']} tahun")
    
    # Pathlib
    print("\\n=== Pathlib ===")
    p = Path("users.json")
    print(f"Exists: {p.exists()}")
    print(f"Name: {p.name}")
    print(f"Parent: {p.parent}")
    
    # Error Handling
    print("\\n=== Error Handling ===")
    def divide(a, b):
        try:
            result = a / b
        except ZeroDivisionError:
            print("Error: tidak bisa dibagi nol")
            return None
        except TypeError:
            print("Error: tipe data tidak valid")
            return None
        else:
            print(f"Berhasil: {a} / {b} = {result}")
            return result
        finally:
            print("  (finally selalu jalan)")
    
    divide(10, 3)
    divide(10, 0)
    
    # Custom Exception
    print("\\n=== Custom Exception ===")
    class ValidationError(Exception):
        def __init__(self, field, message):
            self.field = field
            self.message = message
            super().__init__(f"{field}: {message}")
    
    def validate_age(age):
        if not isinstance(age, int):
            raise ValidationError("age", "harus integer")
        if age < 0 or age > 150:
            raise ValidationError("age", "harus 0-150")
        return True
    
    try:
        validate_age(-5)
    except ValidationError as e:
        print(f"Validation error: {e}")
    
    # Cleanup
    os.remove("languages.txt")
    os.remove("users.json")
    os.remove("data.csv")
    print("\\nCleanup done")
    `,
    objectivesId: [
      'Membaca/menulis file dengan open() dan with statement',
      'JSON: json.dump dan json.load untuk structured data',
      'CSV: csv.writer dan csv.DictReader untuk tabular data',
      'pathlib.Path untuk operasi path modern',
      'try/except/else/finally dan custom Exception',
    ],
    objectivesEn: [
      'Read/write files with open() and with statement',
      'JSON: json.dump and json.load for structured data',
      'CSV: csv.writer and csv.DictReader for tabular data',
      'pathlib.Path for modern path operations',
      'try/except/else/finally and custom Exception',
    ],
    explanationId: '### with Statement\nAuto-close file. Lebih aman daripada manual open/close.\n\n### JSON\n`json.dump(data, f)` write, `json.load(f)` read. `json.loads(string)` dari string.\n\n### CSV\n`csv.writer` untuk write, `csv.DictReader` untuk read sebagai dict.\n\n### pathlib\n`Path("file.txt")`. Method: `exists()`, `read_text()`, `write_text()`, `glob()`.\n\n### Error Handling\n`try/except/else/finally`. `raise Exception()`. Custom exception extends `Exception`.\n\n### Best Practice\nCatch specific exceptions, bukan bare `except:`.',
    explanationEn: '### with Statement\nAuto-closes files. Safer than manual open/close.\n\n### JSON\n`json.dump(data, f)` write, `json.load(f)` read.\n\n### CSV\n`csv.writer` for writing, `csv.DictReader` for reading.\n\n### pathlib\nModern path operations.\n\n### Error Handling\n`try/except/else/finally`. Raise and catch exceptions.\n\n### Best Practice\nCatch specific exceptions, not bare `except:`.',
    experimentsId: [
      'Buat program catatan harian: tulis dan baca dari file',
      'Coba json.dumps dengan sort_keys dan indent',
      'Buat CSV reader yang filter berdasarkan kolom',
      'Implementasikan retry logic dengan try/except',
      'Buat context manager sendiri dengan __enter__/__exit__',
    ],
    experimentsEn: [
      'Create a diary program: write and read from file',
      'Try json.dumps with sort_keys and indent',
      'Create CSV reader that filters by column',
      'Implement retry logic with try/except',
      'Build custom context manager with __enter__/__exit__',
    ],
    challengeId: 'Buat program manajemen kontak: simpan ke JSON, load dari JSON, cari kontak, export ke CSV. Gunakan error handling yang proper.',
    challengeEn: 'Build a contact manager: save to JSON, load from JSON, search contacts, export to CSV. Use proper error handling.',
    summaryId: 'Minggu 7 dari 12: **File I/O & Error Handling** (Level: Menengah). Robust file processing. Minggu depan: **Decorators & Generators**.',
    summaryEn: 'Week 7 of 12: **File I/O & Error Handling** (Level: Intermediate). Robust file processing. Next week: **Decorators & Generators**.',
  },

  // Week 8 - Decorators & Generators
  {
    week: 8, level: 'intermediate', topicId: 'decorators-generators',
    titleId: 'Decorators & Generators', titleEn: 'Decorators & Generators',
    programId: 'Pythonic Patterns', programEn: 'Pythonic Patterns',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'python',
    code: `
    # Decorators & Generators
    import functools
    import time
    
    # Basic Decorator
    def debug(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print(f"Calling {func.__name__} with {args}, {kwargs}")
            result = func(*args, **kwargs)
            print(f"  -> {result}")
            return result
        return wrapper
    
    @debug
    def add(a, b): return a + b
    
    @debug
    def greet(name, greeting="Hello"): return f"{greeting}, {name}!"
    
    # Decorator with Arguments
    def repeat(n):
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                results = []
                for _ in range(n):
                    results.append(func(*args, **kwargs))
                return results
            return wrapper
        return decorator
    
    @repeat(3)
    def say_hello(): return "Hello!"
    
    # Timing Decorator
    def timer(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            result = func(*args, **kwargs)
            elapsed = time.perf_counter() - start
            print(f"{func.__name__} took {elapsed:.4f}s")
            return result
        return wrapper
    
    @timer
    def slow_function():
        time.sleep(0.1)
        return "done"
    
    # Generators
    print("=== Generators ===")
    def fibonacci(n):
        a, b = 0, 1
        for _ in range(n):
            yield a
            a, b = b, a + b
    
    print(f"Fibonacci(10): {list(fibonacci(10))}")
    
    def countdown(n):
        while n > 0:
            yield n
            n -= 1
    
    print(f"Countdown: {list(countdown(5))}")
    
    # Generator Expression
    print("\\n=== Generator Expression ===")
    squares = (x**2 for x in range(10))
    print(f"Squares: {list(squares)}")
    
    # yield from
    def combined():
        yield from range(3)
        yield from "abc"
        yield from [10, 20, 30]
    
    print(f"Combined: {list(combined())}")
    
    # Main
    print("\\n=== Decorator Results ===")
    add(2, 3)
    greet("Budi", greeting="Selamat pagi")
    print(f"Repeat: {say_hello()}")
    slow_function()
    `,
    objectivesId: [
      'Membuat decorator dengan @functools.wraps',
      'Decorator dengan arguments: @decorator(arg)',
      'Generator dengan yield untuk lazy evaluation',
      'Generator expression: (x for x in iterable)',
      'yield from untuk delegate ke sub-generator',
    ],
    objectivesEn: [
      'Create decorators with @functools.wraps',
      'Decorators with arguments: @decorator(arg)',
      'Generators with yield for lazy evaluation',
      'Generator expressions: (x for x in iterable)',
      'yield from to delegate to sub-generators',
    ],
    explanationId: '### Decorator\nFunction yang membungkus function lain. `@functools.wraps` preserve metadata.\n\n### Decorator dengan Arguments\nNested function: `decorator(arg)` -> `decorator(func)` -> `wrapper(*args, **kwargs)`.\n\n### Generator\n`yield` pause dan return value. Resume saat next() dipanggil. Memory-efficient.\n\n### Generator Expression\n`(x**2 for x in range(1000000))` — lazy, tidak langsung di-memory.\n\n### yield from\nDelegate ke sub-generator: `yield from iterable`.\n\n### Use Cases\n@timer, @debug, @cache, @login_required, @route.',
    explanationEn: '### Decorator\nFunction wrapping another function. `@functools.wraps` preserves metadata.\n\n### Decorators with Arguments\nNested functions for parameterized decorators.\n\n### Generator\n`yield` pauses and returns value. Resumes on next() call.\n\n### Generator Expression\nLazy evaluation with `(x for x in iterable)`.\n\n### yield from\nDelegate to sub-generators.\n\n### Use Cases\nTiming, debugging, caching, authentication.',
    experimentsId: [
      'Buat @cache decorator dengan dict',
      'Buat @retry decorator dengan max_attempts',
      'Implementasikan infinite generator: primes()',
      'Coba @property, @staticmethod, @classmethod',
      'Buat decorator yang bisa dipakai dengan atau tanpa arguments',
    ],
    experimentsEn: [
      'Build @cache decorator with dict',
      'Build @retry decorator with max_attempts',
      'Implement infinite generator: primes()',
      'Try @property, @staticmethod, @classmethod',
      'Build decorator usable with or without arguments',
    ],
    challengeId: 'Buat pipeline data processing: generator untuk read file, decorator untuk timing dan logging, generator expression untuk transformasi.',
    challengeEn: 'Build a data processing pipeline: generator for file reading, decorators for timing and logging, generator expression for transformations.',
    summaryId: 'Minggu 8 dari 12: **Decorators & Generators** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Libraries & Virtual Envs** (Advanced).',
    summaryEn: 'Week 8 of 12: **Decorators & Generators** (Level: Intermediate). Intermediate phase complete! Next week: **Libraries & Virtual Environments** (Advanced).',
  },

  // Week 9 - Libraries & Virtual Environments
  {
    week: 9, level: 'advanced', topicId: 'libraries',
    titleId: 'Libraries & Virtual Environments', titleEn: 'Libraries & Virtual Environments',
    programId: 'Ekosistem Python', programEn: 'Python Ecosystem',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'python',
    code: `
    # Libraries & Virtual Environments
    import sys
    import json
    from pathlib import Path
    from datetime import datetime, timedelta
    import itertools
    from functools import reduce, lru_cache
    import os
    import re
    
    print("=== Virtual Environment ===")
    print(f"Python: {sys.version}")
    print(f"Executable: {sys.executable}")
    print(f"sys.path: {sys.path[:3]}...")
    
    # Standard Library Highlights
    print("\\n=== Standard Library ===")
    
    # datetime
    now = datetime.now()
    future = now + timedelta(days=30)
    print(f"Now: {now:%Y-%m-%d %H:%M}")
    print(f"30 days later: {future:%Y-%m-%d}")
    
    # itertools
    print(f"Permutations: {list(itertools.permutations('ABC', 2))}")
    print(f"Combinations: {list(itertools.combinations('ABCD', 2))}")
    
    # functools
    product = reduce(lambda x, y: x * y, [1, 2, 3, 4, 5])
    print(f"Reduce (product): {product}")
    
    @lru_cache(maxsize=128)
    def fib(n):
        if n < 2: return n
        return fib(n-1) + fib(n-2)
    print(f"Fib(30): {fib(30)}")
    
    # os
    print(f"CWD: {os.getcwd()}")
    print(f"Files: {os.listdir('.')[:5]}")
    
    # re (regex)
    text = "Email: test@example.com, Phone: +6281234567890"
    emails = re.findall(r'[\w.+-]+@[\w-]+\.[\w.-]+', text)
    phones = re.findall(r'\+?\d{10,13}', text)
    print(f"Emails: {emails}")
    print(f"Phones: {phones}")
    
    # requirements.txt format
    print("\\n=== requirements.txt Example ===")
    requirements = [
        "requests>=2.28.0",
        "flask>=2.3.0",
        "sqlalchemy>=2.0.0",
        "pytest>=7.0.0",
        "black>=23.0.0",
    ]
    for req in requirements:
        print(f"  {req}")
    `,
    objectivesId: [
      'Membuat dan mengelola virtual environment (venv)',
      'pip: install, uninstall, freeze, requirements.txt',
      'Standard library: datetime, itertools, functools, os, re',
      'Third-party packages: requests, flask, pandas',
      'Struktur proyek Python modern: src layout, pyproject.toml',
    ],
    objectivesEn: [
      'Create and manage virtual environments (venv)',
      'pip: install, uninstall, freeze, requirements.txt',
      'Standard library: datetime, itertools, functools, os, re',
      'Third-party packages: requests, flask, pandas',
      'Modern Python project structure: src layout, pyproject.toml',
    ],
    explanationId: '### venv\n`python -m venv myenv` — isolated environment. Activate: `source myenv/bin/activate` atau `myenv\\Scripts\\activate`.\n\n### pip\n`pip install pkg`, `pip freeze > requirements.txt`, `pip install -r requirements.txt`.\n\n### Standard Library\n`datetime` untuk tanggal, `itertools` untuk iterasi advanced, `functools` untuk functional tools, `re` untuk regex.\n\n### Third-Party\n`requests` HTTP, `flask` web framework, `pandas` data analysis, `numpy` numerik.\n\n### Struktur Proyek\n`pyproject.toml` modern config. `src/` layout. `tests/` directory.',
    explanationEn: '### venv\n`python -m venv myenv` — isolated environment.\n\n### pip\nInstall, freeze, and manage dependencies.\n\n### Standard Library\nPowerful built-in modules.\n\n### Third-Party\nPopular packages for web, data, and more.\n\n### Project Structure\nModern Python project layout.',
    experimentsId: [
      'Buat venv baru dan install package',
      'Coba itertools: chain, product, groupby',
      'Buat regex untuk validasi email/phone',
      'Eksperimen dengan @lru_cache pada recursive function',
      'Buat proyek dengan pyproject.toml',
    ],
    experimentsEn: [
      'Create new venv and install packages',
      'Try itertools: chain, product, groupby',
      'Build regex for email/phone validation',
      'Experiment with @lru_cache on recursive functions',
      'Create project with pyproject.toml',
    ],
    challengeId: 'Buat proyek Python terstruktur: venv, requirements.txt, src layout, multiple modules. Install dan gunakan 3 third-party packages.',
    challengeEn: 'Build a structured Python project: venv, requirements.txt, src layout, multiple modules. Install and use 3 third-party packages.',
    summaryId: 'Minggu 9 dari 12: **Libraries & Virtual Environments** (Level: Lanjutan). Ekosistem Python yang luas. Minggu depan: **Testing & Quality**.',
    summaryEn: 'Week 9 of 12: **Libraries & Virtual Environments** (Level: Advanced). Vast Python ecosystem. Next week: **Testing & Quality**.',
  },

  // Week 10 - Testing & Quality
  {
    week: 10, level: 'advanced', topicId: 'testing',
    titleId: 'Testing & Quality', titleEn: 'Testing & Quality',
    programId: 'Unit Test & Pytest', programEn: 'Unit Test & Pytest',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'python',
    code: `
    # Testing & Quality
    def add(a: int, b: int) -> int: return a + b
    
    def divide(a: float, b: float) -> float:
        if b == 0: raise ValueError("Cannot divide by zero")
        return a / b
    
    def is_palindrome(s: str) -> bool:
        s = s.lower().replace(" ", "")
        return s == s[::-1]
    
    def fizzbuzz(n: int) -> str:
        if n % 15 == 0: return "FizzBuzz"
        if n % 3 == 0: return "Fizz"
        if n % 5 == 0: return "Buzz"
        return str(n)
    
    # Manual Test Simulation
    print("=== Manual Tests ===")
    tests = [
        ("add(2,3)", add(2, 3), 5),
        ("add(-1,1)", add(-1, 1), 0),
        ("divide(10,2)", divide(10, 2), 5.0),
        ("is_palindrome('racecar')", is_palindrome("racecar"), True),
        ("is_palindrome('hello')", is_palindrome("hello"), False),
        ("fizzbuzz(15)", fizzbuzz(15), "FizzBuzz"),
        ("fizzbuzz(9)", fizzbuzz(9), "Fizz"),
        ("fizzbuzz(10)", fizzbuzz(10), "Buzz"),
        ("fizzbuzz(7)", fizzbuzz(7), "7"),
    ]
    
    passed = 0
    for name, result, expected in tests:
        status = "PASS" if result == expected else "FAIL"
        if result == expected: passed += 1
        print(f"  {status}: {name} = {result} (expected {expected})")
    
    print(f"\\nResults: {passed}/{len(tests)} passed")
    
    # unittest Framework
    print("\\n=== unittest Framework ===")
    print("""
    import unittest
    
    class TestMath(unittest.TestCase):
        def test_add(self):
            self.assertEqual(add(2, 3), 5)
            self.assertEqual(add(-1, 1), 0)
    
        def test_divide(self):
            self.assertAlmostEqual(divide(10, 2), 5.0)
            with self.assertRaises(ValueError):
                divide(10, 0)
    
        def test_palindrome(self):
            self.assertTrue(is_palindrome("racecar"))
            self.assertFalse(is_palindrome("hello"))
    
    if __name__ == '__main__':
        unittest.main()
    """)
    
    # pytest Style
    print("\\n=== pytest Style ===")
    print("""
    # test_math.py
    def test_add():
        assert add(2, 3) == 5
        assert add(-1, 1) == 0
    
    def test_divide():
        assert divide(10, 2) == 5.0
        with pytest.raises(ValueError):
            divide(10, 0)
    
    @pytest.mark.parametrize("input,expected", [
        ("racecar", True),
        ("hello", False),
    ])
    def test_palindrome(input, expected):
        assert is_palindrome(input) == expected
    """)
    
    # Type Hints & Quality
    print("\\n=== Type Hints & Quality Tools ===")
    print("Tools: mypy, black, flake8, isort, pre-commit")
    print("Commands:")
    print("  mypy src/")
    print("  black src/ tests/")
    print("  flake8 src/")
    print("  pytest --cov=src tests/")
    `,
    objectivesId: [
      'unittest: TestCase, assertEqual, assertRaises, setUp',
      'pytest: fixture, parametrize, mark, conftest.py',
      'Test coverage: pytest-cov, coverage.py',
      'Type hints dan mypy untuk static type checking',
      'Code quality: black, flake8, isort, pre-commit',
    ],
    objectivesEn: [
      'unittest: TestCase, assertEqual, assertRaises, setUp',
      'pytest: fixture, parametrize, mark, conftest.py',
      'Test coverage: pytest-cov, coverage.py',
      'Type hints and mypy for static type checking',
      'Code quality: black, flake8, isort, pre-commit',
    ],
    explanationId: '### unittest\nBuilt-in testing framework. `TestCase` class, `assertEqual`, `assertRaises`, `setUp/tearDown`.\n\n### pytest\nLebih powerful: `fixture`, `@pytest.mark.parametrize`, `conftest.py` shared fixtures.\n\n### Coverage\n`pytest --cov=src --cov-report=html` — ukur berapa % kode yang ditest.\n\n### Type Hints\n`def f(x: int) -> str:`. `mypy` static checker. Tidak enforce saat runtime.\n\n### Quality Tools\n`black` formatter, `flake8` linter, `isort` import sorter, `pre-commit` hooks.\n\n### TDD Cycle\nRed -> Green -> Refactor. Write test first, watch it fail, make it pass, clean up.',
    explanationEn: '### unittest\nBuilt-in testing framework with TestCase class.\n\n### pytest\nMore powerful with fixtures and parametrize.\n\n### Coverage\nMeasure code coverage with pytest-cov.\n\n### Type Hints\nStatic type checking with mypy.\n\n### Quality Tools\nFormatters, linters, and pre-commit hooks.\n\n### TDD Cycle\nRed -> Green -> Refactor.',
    experimentsId: [
      'Buat test suite lengkap untuk fungsi sendiri',
      'Coba pytest parametrize dengan banyak input',
      'Buat fixture untuk setup/teardown',
      'Jalankan mypy pada project dan fix type errors',
      'Setup pre-commit dengan black dan flake8',
    ],
    experimentsEn: [
      'Build complete test suite for your functions',
      'Try pytest parametrize with many inputs',
      'Create fixtures for setup/teardown',
      'Run mypy on project and fix type errors',
      'Setup pre-commit with black and flake8',
    ],
    challengeId: 'Buat library dengan 100% test coverage: unit tests, edge cases, parametrized tests. Setup black + flake8 + mypy.',
    challengeEn: 'Build a library with 100% test coverage: unit tests, edge cases, parametrized tests. Setup black + flake8 + mypy.',
    summaryId: 'Minggu 10 dari 12: **Testing & Quality** (Level: Lanjutan). Kualitas kode produksi. Minggu depan: **CLI & Automation**.',
    summaryEn: 'Week 10 of 12: **Testing & Quality** (Level: Advanced). Production code quality. Next week: **CLI & Automation**.',
  },

  // Week 11 - CLI & Automation
  {
    week: 11, level: 'advanced', topicId: 'cli',
    titleId: 'CLI & Automation', titleEn: 'CLI & Automation',
    programId: 'Task CLI', programEn: 'Task CLI',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'python',
    code: `
    # CLI & Automation
    import argparse
    import json
    import os
    from datetime import datetime
    
    # argparse
    print("=== argparse ===")
    parser = argparse.ArgumentParser(
        description="Task CLI - Manage your tasks",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--version", action="version", version="%(prog)s 1.0")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    
    subparsers = parser.add_subparsers(dest="command")
    
    # Add command
    add_parser = subparsers.add_parser("add", help="Add a new task")
    add_parser.add_argument("title", help="Task title")
    add_parser.add_argument("--priority", "-p", choices=["low", "medium", "high"], default="medium")
    
    # List command
    subparsers.add_parser("list", help="List all tasks")
    
    # Done command
    done_parser = subparsers.add_parser("done", help="Mark task as done")
    done_parser.add_argument("id", type=int, help="Task ID")
    
    # Delete command
    delete_parser = subparsers.add_parser("delete", help="Delete a task")
    delete_parser.add_argument("id", type=int, help="Task ID")
    
    # Simulate parsing
    args = parser.parse_args(["add", "Learn Python", "--priority", "high"])
    print(f"Command: {args.command}")
    print(f"Title: {args.title}")
    print(f"Priority: {args.priority}")
    
    # Task Manager
    print("\\n=== Task Manager ===")
    TASKS_FILE = "tasks.json"
    
    def load_tasks():
        if os.path.exists(TASKS_FILE):
            with open(TASKS_FILE) as f: return json.load(f)
        return []
    
    def save_tasks(tasks):
        with open(TASKS_FILE, "w") as f: json.dump(tasks, f, indent=2)
    
    def add_task(title, priority="medium"):
        tasks = load_tasks()
        task = {
            "id": len(tasks) + 1,
            "title": title,
            "priority": priority,
            "done": False,
            "created": datetime.now().isoformat()
        }
        tasks.append(task)
        save_tasks(tasks)
        return task
    
    def mark_done(task_id):
        tasks = load_tasks()
        for t in tasks:
            if t["id"] == task_id:
                t["done"] = True
                save_tasks(tasks)
                return True
        return False
    
    # Demo
    add_task("Learn Python", "high")
    add_task("Build CLI", "medium")
    add_task("Write tests", "low")
    mark_done(1)
    
    tasks = load_tasks()
    print(f"Tasks ({len(tasks)}):")
    for t in tasks:
        status = "[x]" if t["done"] else "[ ]"
        print(f"  {status} {t['id']}. {t['title']} ({t['priority']})")
    
    # Cleanup
    os.remove(TASKS_FILE)
    print("\\nDemo complete")
    `,
    objectivesId: [
      'argparse: ArgumentParser, add_argument, subparsers',
      'CLI patterns: commands, flags, positional args',
      'JSON persistence untuk CLI apps',
      'click dan typer: alternatif argparse yang lebih modern',
      'Automation: schedule tasks, file watching, web scraping',
    ],
    objectivesEn: [
      'argparse: ArgumentParser, add_argument, subparsers',
      'CLI patterns: commands, flags, positional args',
      'JSON persistence for CLI apps',
      'click and typer: modern argparse alternatives',
      'Automation: scheduled tasks, file watching, web scraping',
    ],
    explanationId: '### argparse\n`ArgumentParser`, `add_argument`, `add_subparsers` untuk command-based CLI.\n\n### CLI Patterns\nCommands (add, list, delete), flags (--json, --verbose), positional args.\n\n### click & typer\n`@click.command()`, `@click.argument()`. typer: modern, type-hint based.\n\n### Persistence\nJSON file, SQLite, atau database untuk simpan state.\n\n### Automation\n`schedule` untuk periodic tasks, `watchdog` untuk file watching, `requests + BeautifulSoup` untuk scraping.\n\n### Best Practice\n`if __name__ == "__main__":` entry point. `setup.py` atau `pyproject.toml` console_scripts.',
    explanationEn: '### argparse\nStandard library CLI framework.\n\n### CLI Patterns\nCommands, flags, and positional arguments.\n\n### click & typer\nModern CLI frameworks.\n\n### Persistence\nJSON, SQLite, or database storage.\n\n### Automation\nScheduled tasks, file watching, web scraping.\n\n### Best Practice\nEntry points and console_scripts.',
    experimentsId: [
      'Buat CLI dengan subcommands: init, run, status',
      'Coba click untuk membuat CLI yang sama',
      'Buat progress bar dengan tqdm',
      'Implementasikan config file (YAML/TOML)',
      'Buat automation script: backup files, send email',
    ],
    experimentsEn: [
      'Create CLI with subcommands: init, run, status',
      'Try click to build the same CLI',
      'Build progress bar with tqdm',
      'Implement config file (YAML/TOML)',
      'Build automation script: backup files, send email',
    ],
    challengeId: 'Buat CLI tool lengkap: task manager dengan add/list/done/delete, JSON persistence, colored output, --json flag. Package dengan pyproject.toml.',
    challengeEn: 'Build a complete CLI tool: task manager with add/list/done/delete, JSON persistence, colored output, --json flag. Package with pyproject.toml.',
    summaryId: 'Minggu 11 dari 12: **CLI & Automation** (Level: Lanjutan). Tooling dan produktivitas. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **CLI & Automation** (Level: Advanced). Tooling and productivity. Next week: **Capstone Project**!',
  },

  // Week 12 - Capstone: Python Application
  {
    week: 12, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: Python Application', titleEn: 'Capstone: Python Application',
    programId: 'URL Shortener', programEn: 'URL Shortener',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'python',
    code: `
    # Capstone: URL Shortener
    import hashlib
    import json
    import os
    from datetime import datetime
    
    class URLShortener:
        """URL Shortener dengan persistence."""
    
        def __init__(self, db_file="urls.json"):
            self.db_file = db_file
            self.urls = {}
            self._load()
    
        def _load(self):
            if os.path.exists(self.db_file):
                with open(self.db_file) as f:
                    self.urls = json.load(f)
    
        def _save(self):
            with open(self.db_file, "w") as f:
                json.dump(self.urls, f, indent=2)
    
        def shorten(self, url: str, alias: str = None) -> str:
            if alias is None:
                short_code = hashlib.md5(url.encode()).hexdigest()[:6]
            else:
                short_code = alias
            self.urls[short_code] = {
                "url": url, "clicks": 0,
                "created": datetime.now().isoformat()
            }
            self._save()
            return short_code
    
        def expand(self, short_code: str) -> str:
            if short_code in self.urls:
                self.urls[short_code]["clicks"] += 1
                self._save()
                return self.urls[short_code]["url"]
            return None
    
        def stats(self, short_code: str) -> dict:
            return self.urls.get(short_code)
    
        def list_all(self) -> list:
            return [{"code": k, **v} for k, v in self.urls.items()]
    
        def delete(self, short_code: str) -> bool:
            if short_code in self.urls:
                del self.urls[short_code]
                self._save()
                return True
            return False
    
    # Demo
    print("=== URL Shortener Capstone ===")
    shortener = URLShortener()
    
    code1 = shortener.shorten("https://python.org/doc")
    code2 = shortener.shorten("https://github.com/python", alias="gh-py")
    code3 = shortener.shorten("https://realpython.com")
    
    print(f"Shortened URLs:")
    print(f"  python.org/doc -> {code1}")
    print(f"  github.com -> {code2}")
    print(f"  realpython.com -> {code3}")
    
    # Expand
    print(f"\\nExpanding:")
    print(f"  {code1} -> {shortener.expand(code1)}")
    print(f"  {code2} -> {shortener.expand(code2)}")
    print(f"  {code1} -> {shortener.expand(code1)}")
    
    # Stats
    print(f"\\nStats:")
    for code in [code1, code2, code3]:
        s = shortener.stats(code)
        print(f"  {code}: {s['clicks']} clicks, created {s['created'][:10]}")
    
    # List all
    print(f"\\nAll URLs ({len(shortener.list_all())}):")
    for item in shortener.list_all():
        print(f"  [{item['code']}] {item['url']}")
    
    # Delete
    shortener.delete(code3)
    print(f"\\nAfter delete: {len(shortener.list_all())} URLs")
    
    # Cleanup
    os.remove("urls.json")
    print("\\nCapstone demo complete!")
    `,
    objectivesId: [
      'Menggabungkan semua konsep: OOP, file I/O, error handling, testing',
      'Design patterns: Repository, Singleton, Factory',
      'Clean code: type hints, docstrings, modular design',
      'CLI + Library: dual interface untuk aplikasi',
      'Testing: unit test, integration test, coverage',
    ],
    objectivesEn: [
      'Combine all concepts: OOP, file I/O, error handling, testing',
      'Design patterns: Repository, Singleton, Factory',
      'Clean code: type hints, docstrings, modular design',
      'CLI + Library: dual interface for applications',
      'Testing: unit tests, integration tests, coverage',
    ],
    explanationId: '### Capstone Project\nMenggabungkan 12 minggu pembelajaran menjadi aplikasi nyata.\n\n### Design Patterns\nRepository (data access), Singleton (one instance), Factory (object creation).\n\n### Clean Code\nType hints, docstrings, modular file structure, separation of concerns.\n\n### Dual Interface\nLibrary (import dan pakai di code) + CLI (jalankan dari terminal).\n\n### Testing Strategy\nUnit test untuk functions, integration test untuk database/API, coverage report.\n\n### Project Ideas\nURL Shortener, Task Manager, Blog Engine, Chat Bot, Data Pipeline.',
    explanationEn: '### Capstone Project\nCombine 12 weeks of learning into a real application.\n\n### Design Patterns\nRepository, Singleton, Factory patterns.\n\n### Clean Code\nType hints, docstrings, modular structure.\n\n### Dual Interface\nLibrary + CLI interfaces.\n\n### Testing Strategy\nUnit, integration tests, and coverage.\n\n### Project Ideas\nURL Shortener, Task Manager, Blog Engine, Chat Bot, Data Pipeline.',
    experimentsId: [
      'Tambah expiry date untuk short URLs',
      'Implementasikan custom domain support',
      'Buat web interface dengan Flask',
      'Tambah analytics: referrer, browser, location',
      'Deploy ke cloud: Heroku, Railway, atau AWS',
    ],
    experimentsEn: [
      'Add expiry date for short URLs',
      'Implement custom domain support',
      'Build web interface with Flask',
      'Add analytics: referrer, browser, location',
      'Deploy to cloud: Heroku, Railway, or AWS',
    ],
    challengeId: 'Buat aplikasi capstone lengkap: pilih domain (URL Shortener, Task Manager, Blog), implementasikan dengan OOP, CLI, testing 80%+, dokumentasi.',
    challengeEn: 'Build a complete capstone application: choose domain (URL Shortener, Task Manager, Blog), implement with OOP, CLI, testing 80%+, documentation.',
    summaryId: 'Minggu 12 dari 12: **Capstone: Python Application** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Python dari nol hingga production-ready.',
    summaryEn: 'Week 12 of 12: **Capstone: Python Application** (Level: Advanced). Complete! 🎉 You\'ve mastered Python from scratch to production-ready.',
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
