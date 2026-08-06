import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// C# CURRICULUM — pure research, zero framework influence
// Sources: Official C# Docs, C# in Depth (Skeet), Head First C#,
//          Microsoft Learn, C# Station, TutorialsTeacher, Pluralsight
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 12 weeks total
//   Beginner (4w): basics → types → control flow → OOP
//   Intermediate (4w): LINQ → async → generics → error handling
//   Advanced (4w): patterns → testing → APIs → project
// Total: 12 weeks
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('csharp', 'C#');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Fundamental C#: sintaks, tipe data, OOP, control flow — urutan resmi Microsoft Learn.',
    descEn: 'C# fundamentals: syntax, types, OOP, control flow — official Microsoft Learn order.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Idiomatic C#: LINQ, async/await, generics, error handling — C# in Depth pathway.',
    descEn: 'Idiomatic C#: LINQ, async/await, generics, error handling — C# in Depth pathway.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Production C#: design patterns, testing, Web API, capstone project.',
    descEn: 'Production C#: design patterns, testing, Web API, capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-4) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'setup-dan-sintaks',
    titleId: 'Setup, Toolchain & Sintaks Dasar', titleEn: 'Setup, Toolchain & Basic Syntax',
    programId: 'Halo, C#!', programEn: 'Hello, C#!',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'csharp',
    code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Selamat datang di C#!");
        Console.WriteLine("C# adalah bahasa modern dari Microsoft untuk .NET.");

        // Variabel dan tipe data
        string nama = "Budi";
        int umur = 25;
        double tinggi = 175.5;
        bool aktif = true;

        Console.WriteLine($"Nama: {nama}");
        Console.WriteLine($"Umur: {umur}");
        Console.WriteLine($"Tinggi: {tinggi}");
        Console.WriteLine($"Aktif: {aktif}");

        // Implicit typing
        var pesan = "Halo, Dunia!";
        var angka = 42;
        Console.WriteLine($"Pesan: {pesan}, Angka: {angka}");

        // Null dan nullable
        string? nullableStr = null;
        int? nullableInt = null;
        Console.WriteLine($"Nullable: {nullableStr ?? "kosong"}");

        // String interpolation
        Console.WriteLine($"{nama} berumur {umur} tahun");

        // Verbatim string
        string path = @"C:\\Users\\Budi\\Documents";
        Console.WriteLine($"Path: {path}");
    }
}`,
    objectivesId: [
      'Memahami peran C# sebagai bahasa modern untuk ekosistem .NET',
      'Menginstall .NET SDK dan menulis program pertama',
      'Mengenal tipe dasar: int, double, string, bool, var',
      'String interpolation dengan $ dan verbatim string dengan @',
      'Nullable types: T? untuk value type yang bisa null',
    ],
    objectivesEn: [
      'Understand C# as a modern language for the .NET ecosystem',
      'Install .NET SDK and write your first program',
      'Learn basic types: int, double, string, bool, var',
      'String interpolation with $ and verbatim strings with @',
      'Nullable types: T? for nullable value types',
    ],
    explanationId: '### Peran C#\nC# adalah bahasa modern, object-oriented dari Microsoft. Berjalan di .NET runtime — cross-platform, high-performance.\n\n### Toolchain\n- `dotnet new`: buat project baru\n- `dotnet run`: jalankan program\n- `dotnet build`: kompilasi\n- `dotnet test`: jalankan test\n\n### Tipe Dasar\n- Value type: int, double, bool, char, struct\n- Reference type: string, class, array, interface\n- `var`: implicit typing dengan type inference\n\n### String Interpolation\n`$"Hello {name}"` — lebih readable dari string concatenation.\n\n### Nullable\n`int?` atau `Nullable<int>` — value type yang bisa null.',
    explanationEn: '### C#\'s Role\nModern, object-oriented language by Microsoft. Runs on .NET runtime — cross-platform, high-performance.\n\n### Toolchain\n`dotnet new`, `dotnet run`, `dotnet build`, `dotnet test`\n\n### Basic Types\nValue types (int, double, bool), reference types (string, class), var for implicit typing.\n\n### String Interpolation\n`$"Hello {name}"` — readable string formatting.\n\n### Nullable\n`int?` — nullable value types.',
    experimentsId: [
      'Ubah nilai variabel dan lihat perubahannya',
      'Coba tipe data yang belum dicoba: decimal, long, char',
      'Eksperimen dengan string interpolation',
      'Buat nullable int dan cek HasValue',
      'Buat program kecil gabungan 2-3 konsep',
    ],
    experimentsEn: [
      'Change variable values and observe',
      'Try data types you haven\'t used: decimal, long, char',
      'Experiment with string interpolation',
      'Create nullable int and check HasValue',
      'Build a small program combining 2-3 concepts',
    ],
    challengeId: 'Buat program profil pengguna: nama, umur, email, alamat. Gunakan string interpolation untuk display. Validasi dengan if.',
    challengeEn: 'Build a user profile program: name, age, email, address. Use string interpolation for display. Validate with if.',
    summaryId: 'Minggu 1 dari 12: **Setup, Toolchain & Sintaks Dasar** (Level: Pemula). C# memberikan produktivitas tinggi dengan type safety. Minggu depan: **Tipe Data & Variabel**.',
    summaryEn: 'Week 1 of 12: **Setup, Toolchain & Basic Syntax** (Level: Beginner). C# delivers high productivity with type safety. Next week: **Data Types & Variables**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'tipe-data-variabel',
    titleId: 'Tipe Data & Variabel', titleEn: 'Data Types & Variables',
    programId: 'Konversi & Validasi', programEn: 'Conversion & Validation',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'csharp',
    code: `using System;

class Program
{
    static void Main()
    {
        // Tipe nilai (value types)
        int integer = 42;
        double desimal = 3.14159;
        decimal uang = 1234.56m;
        bool flag = true;
        char karakter = 'A';

        Console.WriteLine($"int: {integer}");
        Console.WriteLine($"double: {desimal:F2}");
        Console.WriteLine($"decimal: {uang:C}");
        Console.WriteLine($"bool: {flag}");
        Console.WriteLine($"char: {karakter}");

        // Tipe referensi (reference types)
        string teks = "Halo, C#!";
        int[] array = { 1, 2, 3, 4, 5 };
        Console.WriteLine($"string: {teks}");
        Console.WriteLine($"array: [{string.Join(", ", array)}]");

        // Konversi tipe
        int i = 42;
        double d = i;          // implicit conversion
        int j = (int)d;        // explicit cast
        string s = i.ToString();
        int parsed = int.Parse("123");

        Console.WriteLine($"\\nKonversi: int {i} -> double {d}");
        Console.WriteLine($"Cast: double {d} -> int {j}");
        Console.WriteLine($"ToString: {s}");
        Console.WriteLine($"Parse: {parsed}");

        // TryParse
        if (int.TryParse("456", out int result))
        {
            Console.WriteLine($"TryParse berhasil: {result}");
        }

        // Constants
        const double PI = 3.14159;
        const int MAX_SIZE = 100;
        Console.WriteLine($"\\nConstants: PI={PI}, MAX={MAX_SIZE}");

        // Enum
        enum Hari { Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu };
        Hari hariIni = Hari.Jumat;
        Console.WriteLine($"Hari: {hariIni} ({(int)hariIni})");

        // DateTime
        DateTime sekarang = DateTime.Now;
        Console.WriteLine($"\\nSekarang: {sekarang:yyyy-MM-dd HH:mm:ss}");
        Console.WriteLine($"Tanggal: {sekarang.AddDays(7):yyyy-MM-dd}");
    }
}`,
    objectivesId: [
      'Membedakan value type (int, double, struct) vs reference type (string, class, array)',
      'Konversi tipe: implicit, explicit cast, ToString, Parse, TryParse',
      'Constants dengan const keyword',
      'Enum untuk kumpulan nilai tetap',
      'DateTime untuk manipulasi tanggal dan waktu',
    ],
    objectivesEn: [
      'Distinguish value types (int, double, struct) vs reference types (string, class, array)',
      'Type conversion: implicit, explicit cast, ToString, Parse, TryParse',
      'Constants with const keyword',
      'Enums for fixed value sets',
      'DateTime for date and time manipulation',
    ],
    explanationId: '### Value vs Reference Type\nValue type disimpan di stack (int, double, bool, struct). Reference type di heap (string, class, array).\n\n### Konversi Tipe\n- Implicit: `double d = i;` (aman, tidak kehilangan data)\n- Explicit: `int j = (int)d;` (cast, bisa kehilangan data)\n- Parse: `int.Parse("123")` — throw exception jika gagal\n- TryParse: `int.TryParse("123", out result)` — return bool\n\n### Constants\n`const double PI = 3.14;` — compile-time constant.\n\n### Enum\n`enum Hari { Senin, Selasa }` — kumpulan nilai integer bernama.\n\n### DateTime\n`DateTime.Now`, `AddDays`, format string `yyyy-MM-dd`.',
    explanationEn: '### Value vs Reference Types\nValue types on stack, reference types on heap.\n\n### Type Conversion\nImplicit (safe), explicit (cast), Parse (throws), TryParse (safe).\n\n### Constants\nCompile-time constants with const.\n\n### Enums\nNamed integer constants.\n\n### DateTime\nDate/time manipulation and formatting.',
    experimentsId: [
      'Coba konversi double ke int — perhatikan pembulatan',
      'Eksperimen dengan TryParse pada input invalid',
      'Buat enum dengan nilai custom',
      'Coba DateTime: AddMonths, AddYears, TimeSpan',
      'Buat struct sederhana',
    ],
    experimentsEn: [
      'Try double to int conversion — observe rounding',
      'Experiment with TryParse on invalid input',
      'Create enum with custom values',
      'Try DateTime: AddMonths, AddYears, TimeSpan',
      'Create simple struct',
    ],
    challengeId: 'Buat program konversi mata uang: IDR ↔ USD ↔ EUR. Gunakan decimal untuk mata uang, enum untuk pilihan mata uang.',
    challengeEn: 'Build a currency converter: IDR ↔ USD ↔ EUR. Use decimal for currency, enum for currency selection.',
    summaryId: 'Minggu 2 dari 12: **Tipe Data & Variabel** (Level: Pemula). Fondasi type system C#. Minggu depan: **Control Flow**.',
    summaryEn: 'Week 2 of 12: **Data Types & Variables** (Level: Beginner). C# type system foundation. Next week: **Control Flow**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'control-flow',
    titleId: 'Control Flow', titleEn: 'Control Flow',
    programId: 'Grade & Menu', programEn: 'Grades & Menu',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'csharp',
    code: `using System;

class Program
{
    static void Main()
    {
        // If-else
        int score = 85;
        if (score >= 90)
        {
            Console.WriteLine("Grade: A");
        }
        else if (score >= 75)
        {
            Console.WriteLine("Grade: B");
        }
        else if (score >= 60)
        {
            Console.WriteLine("Grade: C");
        }
        else
        {
            Console.WriteLine("Grade: D");
        }

        // Switch expression (C# 8+)
        string grade = score switch
        {
            >= 90 => "A",
            >= 75 => "B",
            >= 60 => "C",
            _ => "D"
        };
        Console.WriteLine($"Switch expression: {grade}");

        // For loop
        Console.Write("\\nFor: ");
        for (int i = 1; i <= 5; i++)
        {
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        // While loop
        int n = 1;
        Console.Write("While: ");
        while (n <= 3)
        {
            Console.Write($"{n} ");
            n++;
        }
        Console.WriteLine();

        // Do-while
        int m = 1;
        Console.Write("Do-while: ");
        do
        {
            Console.Write($"{m} ");
            m++;
        } while (m <= 3);
        Console.WriteLine();

        // Foreach
        string[] buah = { "apel", "mangga", "pisang" };
        Console.Write("Foreach: ");
        foreach (string b in buah)
        {
            Console.Write($"{b} ");
        }
        Console.WriteLine();

        // Break dan continue
        Console.Write("\\nBreak at 3: ");
        for (int i = 1; i <= 5; i++)
        {
            if (i == 3) break;
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        Console.Write("Continue at 3: ");
        for (int i = 1; i <= 5; i++)
        {
            if (i == 3) continue;
            Console.Write($"{i} ");
        }
        Console.WriteLine();

        // Pattern matching
        object obj = 42;
        if (obj is int num)
        {
            Console.WriteLine($"\\nis pattern: {num} adalah integer");
        }
    }
}`,
    objectivesId: [
      'If-else dengan kondisi kompleks',
      'Switch expression (C# 8+) dengan pattern matching',
      'For, while, do-while, foreach loop',
      'Break dan continue untuk kontrol loop',
      'Pattern matching dengan is keyword',
    ],
    objectivesEn: [
      'If-else with complex conditions',
      'Switch expressions (C# 8+) with pattern matching',
      'For, while, do-while, foreach loops',
      'Break and continue for loop control',
      'Pattern matching with is keyword',
    ],
    explanationId: '### If-Else\nKondisi boolean. Bisa nested dan dengan logical operators.\n\n### Switch Expression\nC# 8+: `x switch { >= 90 => "A", _ => "D" }` — lebih concise dari switch statement.\n\n### Loop\n- `for`: iterasi dengan counter\n- `while`: cek kondisi dulu\n- `do-while`: jalankan dulu, cek kondisi\n- `foreach`: iterasi koleksi\n\n### Break & Continue\n`break` keluar loop. `continue` skip ke iterasi berikutnya.\n\n### Pattern Matching\n`obj is int num` — cek tipe dan assign sekaligus.',
    explanationEn: '### If-Else\nBoolean conditions with logical operators.\n\n### Switch Expressions\nC# 8+ concise pattern matching syntax.\n\n### Loops\nfor, while, do-while, foreach for different iteration needs.\n\n### Break & Continue\nExit loop or skip iteration.\n\n### Pattern Matching\nType checking and assignment in one expression.',
    experimentsId: [
      'Ubah nilai score dan lihat grade berubah',
      'Coba switch expression dengan string pattern',
      'Buat nested loop untuk tabel perkalian',
      'Eksperimen dengan pattern matching pada object',
      'Buat menu interaktif dengan while + switch',
    ],
    experimentsEn: [
      'Change score values and observe grade changes',
      'Try switch expression with string patterns',
      'Create nested loop for multiplication table',
      'Experiment with pattern matching on objects',
      'Build interactive menu with while + switch',
    ],
    challengeId: 'Buat program kalkulator dengan menu: tambah, kurang, kali, bagi, pangkat. Gunakan switch expression dan validasi input.',
    challengeEn: 'Build a calculator with menu: add, subtract, multiply, divide, power. Use switch expression and input validation.',
    summaryId: 'Minggu 3 dari 12: **Control Flow** (Level: Pemula). Logika program di C#. Minggu depan: **OOP: Class & Object**.',
    summaryEn: 'Week 3 of 12: **Control Flow** (Level: Beginner). Program logic in C#. Next week: **OOP: Classes & Objects**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'oop-class-object',
    titleId: 'OOP: Class & Object', titleEn: 'OOP: Classes & Objects',
    programId: 'Sistem Toko', programEn: 'Store System',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'csharp',
    code: `using System;
using System.Collections.Generic;

class Product
{
    // Properties
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int Stock { get; set; }

    // Constructor
    public Product(int id, string name, double price)
    {
        Id = id;
        Name = name;
        Price = price;
        Stock = 0;
    }

    // Method
    public string Info()
    {
        return $"{Name}: Rp{Price:N0} (stok: {Stock})";
    }

    public void ApplyDiscount(double percent)
    {
        Price -= Price * (percent / 100);
    }

    public void Restock(int amount)
    {
        Stock += amount;
    }
}

// Inheritance
class Electronics : Product
{
    public int WarrantyYears { get; set; }

    public Electronics(int id, string name, double price, int warranty)
        : base(id, name, price)
    {
        WarrantyYears = warranty;
    }

    public new string Info()
    {
        return $"{base.Info()}, Garansi: {WarrantyYears} tahun";
    }
}

// Interface
interface IDiscountable
{
    void ApplyDiscount(double percent);
}

class Program
{
    static void Main()
    {
        // Object
        Product p1 = new Product(1, "Laptop", 15000000);
        p1.Restock(10);
        Console.WriteLine(p1.Info());

        p1.ApplyDiscount(10);
        Console.WriteLine($"Setelah diskon: {p1.Info()}");

        // Inheritance
        Electronics laptop = new Electronics(2, "Laptop Pro", 20000000, 3);
        Console.WriteLine(laptop.Info());

        // Collection
        List<Product> products = new List<Product>
        {
            p1,
            laptop,
            new Product(3, "Mouse", 250000)
        };

        Console.WriteLine("\\n=== Daftar Produk ===");
        foreach (var p in products)
        {
            Console.WriteLine(p.Info());
        }

        // Object initializer
        Product p4 = new Product(4, "Keyboard", 500000)
        {
            Stock = 15
        };
        Console.WriteLine(p4.Info());
    }
}`,
    objectivesId: [
      'Class dan object: properties, method, constructor',
      'Inheritance: base class dan derived class',
      'Interface: definisi kontrak method',
      'Collection: List<T> untuk kumpulan object',
      'Object initializer dan auto-properties',
    ],
    objectivesEn: [
      'Classes and objects: properties, methods, constructors',
      'Inheritance: base classes and derived classes',
      'Interfaces: method contract definitions',
      'Collections: List<T> for object collections',
      'Object initializers and auto-properties',
    ],
    explanationId: '### Class & Object\nClass adalah blueprint. Object adalah instance. Properties dengan get/set.\n\n### Constructor\nMethod khusus untuk inisialisasi object. Bisa multiple (overloading).\n\n### Inheritance\n`class Electronics : Product` — warisi semua member. `base()` untuk panggil parent constructor.\n\n### Interface\n`interface IDiscountable { void ApplyDiscount(); }` — kontrak yang harus diimplement.\n\n### List<T>\nGeneric collection. `Add`, `Remove`, `foreach`.\n\n### Object Initializer\n`new Product { Id = 1, Name = "X" }` — set property saat buat object.',
    explanationEn: '### Classes & Objects\nClasses are blueprints, objects are instances. Properties with get/set accessors.\n\n### Constructors\nSpecial methods for object initialization. Can be overloaded.\n\n\n### Inheritance\nDerived classes inherit from base classes. Use base() to call parent constructor.\n\n### Interfaces\nDefine method contracts that classes must implement.\n\n### List<T>\nGeneric collection with Add, Remove, foreach.\n\n### Object Initializers\nSet properties during object creation.',
    experimentsId: [
      'Tambah method baru pada Product',
      'Buat class baru yang inherit dari Product',
      'Eksperimen dengan interface implementation',
      'Coba List<T> dengan Sort dan Find',
      'Buat constructor overloading',
    ],
    experimentsEn: [
      'Add new method to Product',
      'Create new class inheriting from Product',
      'Experiment with interface implementation',
      'Try List<T> with Sort and Find',
      'Create constructor overloading',
    ],
    challengeId: 'Buat sistem perpustakaan: class Book, Member, Loan. Method: Borrow, Return, Search. Gunakan List<T> dan inheritance.',
    challengeEn: 'Build a library system: class Book, Member, Loan. Methods: Borrow, Return, Search. Use List<T> and inheritance.',
    summaryId: 'Minggu 4 dari 12: **OOP: Class & Object** (Level: Pemula). Selesai fase Beginner! Minggu depan: **LINQ** (Intermediate).',
    summaryEn: 'Week 4 of 12: **OOP: Classes & Objects** (Level: Beginner). Beginner phase complete! Next week: **LINQ** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 5-8) ──────────────────────────────────────────────
  {
    week: 5, level: 'intermediate', topicId: 'linq',
    titleId: 'LINQ', titleEn: 'LINQ',
    programId: 'Query Data', programEn: 'Querying Data',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'csharp',
    code: `using System;
using System.Collections.Generic;
using System.Linq;

class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public double Price { get; set; }
    public int Stock { get; set; }
}

class Program
{
    static void Main()
    {
        var products = new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Category = "Elektronik", Price = 15000000, Stock = 10 },
            new Product { Id = 2, Name = "Mouse", Category = "Elektronik", Price = 250000, Stock = 50 },
            new Product { Id = 3, Name = "Buku", Category = "Edukasi", Price = 75000, Stock = 100 },
            new Product { Id = 4, Name = "Keyboard", Category = "Elektronik", Price = 500000, Stock = 30 },
            new Product { Id = 5, Name = "Pensil", Category = "Edukasi", Price = 5000, Stock = 200 },
        };

        // Filter: Where
        var elektronik = products.Where(p => p.Category == "Elektronik");
        Console.WriteLine("=== Elektronik ===");
        foreach (var p in elektronik)
            Console.WriteLine($"  {p.Name}: Rp{p.Price:N0}");

        // Sort: OrderBy
        var sorted = products.OrderBy(p => p.Price);
        Console.WriteLine("\\n=== Sort by Price ===");
        foreach (var p in sorted)
            Console.WriteLine($"  {p.Name}: Rp{p.Price:N0}");

        // Select: projection
        var names = products.Select(p => p.Name);
        Console.WriteLine("\\n=== Names ===");
        Console.WriteLine($"  [{string.Join(", ", names)}]");

        // Aggregate
        double total = products.Sum(p => p.Price);
        double avg = products.Average(p => p.Price);
        int count = products.Count();
        Console.WriteLine($"\\n=== Aggregate ===");
        Console.WriteLine($"  Total: Rp{total:N0}");
        Console.WriteLine($"  Average: Rp{avg:N0}");
        Console.WriteLine($"  Count: {count}");

        // GroupBy
        var grouped = products.GroupBy(p => p.Category);
        Console.WriteLine("\\n=== Group by Category ===");
        foreach (var group in grouped)
        {
            Console.WriteLine($"  {group.Key}: {group.Count()} items");
            foreach (var p in group)
                Console.WriteLine($"    - {p.Name}");
        }

        // First, Single
        var first = products.First(p => p.Price > 1000000);
        Console.WriteLine($"\\nFirst expensive: {first.Name}");

        // Any, All
        bool anyExpensive = products.Any(p => p.Price > 10000000);
        bool allInStock = products.All(p => p.Stock > 0);
        Console.WriteLine($"Any expensive: {anyExpensive}");
        Console.WriteLine($"All in stock: {allInStock}");

        // Query syntax
        var query = from p in products
                    where p.Price > 100000
                    orderby p.Price descending
                    select new { p.Name, p.Price };

        Console.WriteLine("\\n=== Query Syntax ===");
        foreach (var item in query)
            Console.WriteLine($"  {item.Name}: Rp{item.Price:N0}");
    }
}`,
    objectivesId: [
      'LINQ method syntax: Where, OrderBy, Select, GroupBy',
      'LINQ query syntax: from...where...select',
      'Aggregate functions: Sum, Average, Count, Min, Max',
      'Filtering: First, Single, Any, All, Contains',
      'Projection: Select untuk transform data',
    ],
    objectivesEn: [
      'LINQ method syntax: Where, OrderBy, Select, GroupBy',
      'LINQ query syntax: from...where...select',
      'Aggregate functions: Sum, Average, Count, Min, Max',
      'Filtering: First, Single, Any, All, Contains',
      'Projection: Select for data transformation',
    ],
    explanationId: '### LINQ\nLanguage Integrated Query — query data langsung di C#.\n\n### Method Syntax\n`products.Where(p => p.Price > 100).OrderBy(p => p.Name)` — chain methods.\n\n### Query Syntax\n`from p in products where p.Price > 100 select p` — mirip SQL.\n\n### Aggregate\n`Sum`, `Average`, `Count`, `Min`, `Max` — operasi agregasi.\n\n### Filtering\n`First`, `Single`, `Any`, `All` — query dengan kondisi.\n\n### Projection\n`Select(p => new { p.Name, p.Price })` — transform ke bentuk baru.',
    explanationEn: '### LINQ\nLanguage Integrated Query — query data directly in C#.\n\n### Method Syntax\nChain extension methods for queries.\n\n### Query Syntax\nSQL-like query expressions.\n\n### Aggregation\nSum, Average, Count, Min, Max.\n\n### Filtering\nFirst, Single, Any, All for conditional queries.\n\n### Projection\nTransform data with Select.',
    experimentsId: [
      'Buat query LINQ dengan multiple Where',
      'Eksperimen dengan GroupBy + Aggregate',
      'Coba Select dengan anonymous type',
      'Buat query syntax vs method syntax — bandingkan',
      'Eksperimen dengan Skip dan Take untuk pagination',
    ],
    experimentsEn: [
      'Create LINQ query with multiple Where clauses',
      'Experiment with GroupBy + Aggregate',
      'Try Select with anonymous types',
      'Compare query syntax vs method syntax',
      'Experiment with Skip and Take for pagination',
    ],
    challengeId: 'Buat program analisis penjualan: data penjualan, query dengan LINQ untuk total per kategori, produk terlaris, rata-rata penjualan.',
    challengeEn: 'Build a sales analysis program: sales data, LINQ queries for total per category, best-selling product, average sales.',
    summaryId: 'Minggu 5 dari 12: **LINQ** (Level: Menengah). Query data dengan elegan. Minggu depan: **Async/Await**.',
    summaryEn: 'Week 5 of 12: **LINQ** (Level: Intermediate). Elegant data querying. Next week: **Async/Await**.',
  },
  {
    week: 6, level: 'intermediate', topicId: 'async-await',
    titleId: 'Async/Await', titleEn: 'Async/Await',
    programId: 'Download Paralel', programEn: 'Parallel Downloads',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'csharp',
    code: `using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static async Task Main()
    {
        // Async method
        Console.WriteLine("Memulai download...");

        // Sequential
        var start = DateTime.Now;
        await DownloadAsync("file1.zip");
        await DownloadAsync("file2.zip");
        await DownloadAsync("file3.zip");
        var seqTime = DateTime.Now - start;
        Console.WriteLine($"Sequential: {seqTime.TotalSeconds:F1}s\\n");

        // Parallel
        start = DateTime.Now;
        var tasks = new List<Task>
        {
            DownloadAsync("file1.zip"),
            DownloadAsync("file2.zip"),
            DownloadAsync("file3.zip")
        };
        await Task.WhenAll(tasks);
        var parTime = DateTime.Now - start;
        Console.WriteLine($"Parallel: {parTime.TotalSeconds:F1}s\\n");

        // Task dengan return value
        var content = await FetchContentAsync("https://example.com");
        Console.WriteLine($"Content length: {content.Length}");

        // Task.WhenAny
        var task1 = DownloadAsync("fast.zip");
        var task2 = DownloadAsync("slow.zip");
        var first = await Task.WhenAny(task1, task2);
        Console.WriteLine($"First completed: {first}");

        // CancellationToken (konseptual)
        // var cts = new CancellationTokenSource();
        // await LongRunningAsync(cts.Token);
        // cts.Cancel();

        // ConfigureAwait
        var data = await GetDataAsync().ConfigureAwait(false);
        Console.WriteLine($"Data: {data}");
    }

    static async Task DownloadAsync(string filename)
    {
        Console.WriteLine($"  Downloading {filename}...");
        await Task.Delay(100); // Simulasi I/O
        Console.WriteLine($"  {filename} selesai!");
    }

    static async Task<string> FetchContentAsync(string url)
    {
        await Task.Delay(50);
        return $"Content dari {url}";
    }

    static async Task<string> GetDataAsync()
    {
        await Task.Delay(50);
        return "data hasil async";
    }
}`,
    objectivesId: [
      'async/await untuk operasi asynchronous',
      'Task dan Task<T> untuk representasi async operation',
      'Task.WhenAll untuk paralelisasi multiple task',
      'Task.WhenAny untuk race condition',
      ' CancellationToken untuk pembatalan operasi',
    ],
    objectivesEn: [
      'async/await for asynchronous operations',
      'Task and Task<T> for async operation representation',
      'Task.WhenAll for parallelizing multiple tasks',
      'Task.WhenAny for race conditions',
      'CancellationToken for operation cancellation',
    ],
    explanationId: '### Async/Await\n`async Task Method()` — method asynchronous. `await` — tunggu hasil tanpa block thread.\n\n### Task\n`Task` = operasi async tanpa return. `Task<T>` = operasi async dengan return value.\n\n### Task.WhenAll\nTunggu semua task selesai. Paralel execution.\n\n### Task.WhenAny\nReturn task pertama yang selesai.\n\n### CancellationToken\nToken untuk cancel operasi async. `cts.Cancel()` untuk trigger.\n\n### Best Practices\n- Async all the way\n- ConfigureAwait(false) di library\n- Jangan async void (kecuali event handler)',
    explanationEn: '### Async/Await\n`async Task Method()` — async method. `await` — wait without blocking thread.\n\n### Task\n`Task` for void async, `Task<T>` for async with return value.\n\n### Task.WhenAll\nWait for all tasks to complete.\n\n### Task.WhenAny\nReturn first completed task.\n\n### CancellationToken\nToken for cancelling async operations.\n\n### Best Practices\nAsync all the way, ConfigureAwait(false) in libraries, avoid async void.',
    experimentsId: [
      'Buat async method dengan return value',
      'Eksperimen dengan Task.WhenAll vs sequential',
      'Coba Task.Delay sebagai simulasi I/O',
      'Buat async method dengan exception handling',
      'Eksperimen dengan CancellationToken',
    ],
    experimentsEn: [
      'Create async method with return value',
      'Experiment with Task.WhenAll vs sequential',
      'Try Task.Delay as I/O simulation',
      'Create async method with exception handling',
      'Experiment with CancellationToken',
    ],
    challengeId: 'Buat program download manager: download multiple file secara paralel, progress reporting, cancellation support.',
    challengeEn: 'Build a download manager: download multiple files in parallel, progress reporting, cancellation support.',
    summaryId: 'Minggu 6 dari 12: **Async/Await** (Level: Menengah). Non-blocking programming. Minggu depan: **Generics**.',
    summaryEn: 'Week 6 of 12: **Async/Await** (Level: Intermediate). Non-blocking programming. Next week: **Generics**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'generics',
    titleId: 'Generics', titleEn: 'Generics',
    programId: 'Repository Generik', programEn: 'Generic Repository',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'csharp',
    code: `using System;
using System.Collections.Generic;

// Generic class
class Repository<T> where T : class
{
    private List<T> _items = new List<T>();

    public void Add(T item) => _items.Add(item);
    public void Remove(T item) => _items.Remove(item);
    public List<T> GetAll() => _items;
    public T? Find(Predicate<T> predicate) => _items.Find(predicate);
}

// Generic method
class Utility
{
    public static T? FirstOrDefault<T>(List<T> items, Func<T, bool> predicate)
    {
        foreach (var item in items)
            if (predicate(item)) return item;
        return default;
    }

    public static List<TResult> Map<T, TResult>(List<T> items, Func<T, TResult> mapper)
    {
        var result = new List<TResult>();
        foreach (var item in items)
            result.Add(mapper(item));
        return result;
    }
}

// Generic interface
interface IRepository<T> where T : class
{
    void Add(T item);
    void Remove(T item);
    List<T> GetAll();
    T? FindById(int id);
}

// Entity
class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
}

class Program
{
    static void Main()
    {
        // Generic class
        var repo = new Repository<Product>();
        repo.Add(new Product { Id = 1, Name = "Laptop", Price = 15000000 });
        repo.Add(new Product { Id = 2, Name = "Mouse", Price = 250000 });
        repo.Add(new Product { Id = 3, Name = "Keyboard", Price = 500000 });

        Console.WriteLine("=== Repository<Product> ===");
        foreach (var p in repo.GetAll())
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0}");

        // Find
        var found = repo.Find(p => p.Price > 1000000);
        Console.WriteLine($"\\nFound expensive: {found?.Name}");

        // Generic method
        var products = repo.GetAll();
        var first = Utility.FirstOrDefault(products, p => p.Name.StartsWith("M"));
        Console.WriteLine($"\\nFirst with M: {first?.Name}");

        // Map
        var names = Utility.Map(products, p => p.Name);
        Console.WriteLine($"Names: [{string.Join(", ", names)}]");

        // Generic constraints
        // where T : class — harus reference type
        // where T : struct — harus value type
        // where T : new() — harus punya parameterless constructor
        // where T : Product — harus turunan Product

        // Nullable reference types
        string? nullable = null;
        string notNull = "hola";
        Console.WriteLine($"\\nNullable: {nullable ?? "kosong"}");
        Console.WriteLine($"NotNull: {notNull}");
    }
}`,
    objectivesId: [
      'Generic class: class Repository<T> where T : class',
      'Generic method: static T FirstOrDefault<T>(List<T>, Func<T,bool>)',
      'Generic interface: IRepository<T>',
      'Generic constraints: where T : class, struct, new(), BaseClass',
      'Nullable reference types: T? untuk reference type nullable',
    ],
    objectivesEn: [
      'Generic class: class Repository<T> where T : class',
      'Generic method: static T FirstOrDefault<T>(List<T>, Func<T,bool>)',
      'Generic interface: IRepository<T>',
      'Generic constraints: where T : class, struct, new(), BaseClass',
      'Nullable reference types: T? for nullable reference types',
    ],
    explanationId: '### Generic Class\n`class Repository<T>` — class dengan type parameter. Bisa dipakai untuk tipe apapun.\n\n### Generic Method\n`static T FirstOrDefault<T>()` — method dengan type parameter sendiri.\n\n### Generic Interface\n`interface IRepository<T>` — interface generik.\n\n### Constraints\n- `where T : class` — reference type\n- `where T : struct` — value type\n- `where T : new()` — punya parameterless constructor\n- `where T : Product` — turunan Product\n\n### Nullable Reference Types\n`string?` — reference type yang bisa null. Di-enable di C# 8+.',
    explanationEn: '### Generic Classes\nType parameter for reusable, type-safe classes.\n\n### Generic Methods\nMethods with their own type parameters.\n\n### Generic Interfaces\nInterfaces with type parameters.\n\n### Constraints\nRestrict type parameters with where clauses.\n\n### Nullable Reference Types\n`string?` for nullable reference types.',
    experimentsId: [
      'Buat generic class Stack<T>',
      'Eksperimen dengan multiple constraints',
      'Buat generic method dengan Func<T, TResult>',
      'Coba generic interface implementation',
      'Eksperimen dengan covariance/contravariance',
    ],
    experimentsEn: [
      'Create generic class Stack<T>',
      'Experiment with multiple constraints',
      'Create generic method with Func<T, TResult>',
      'Try generic interface implementation',
      'Experiment with covariance/contravariance',
    ],
    challengeId: 'Buat generic Repository<T> dengan method: Add, Remove, FindById, Find semua. Implement untuk Product dan User.',
    challengeEn: 'Build generic Repository<T> with methods: Add, Remove, FindById, Find all. Implement for Product and User.',
    summaryId: 'Minggu 7 dari 12: **Generics** (Level: Menengah). Type-safe reusable code. Minggu depan: **Error Handling**.',
    summaryEn: 'Week 7 of 12: **Generics** (Level: Intermediate). Type-safe reusable code. Next week: **Error Handling**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'error-handling',
    titleId: 'Error Handling', titleEn: 'Error Handling',
    programId: 'Penanganan Exception', programEn: 'Exception Handling',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'csharp',
    code: `using System;

// Custom exception
class AppException : Exception
{
    public string ErrorCode { get; }

    public AppException(string message, string errorCode)
        : base(message)
    {
        ErrorCode = errorCode;
    }

    public AppException(string message, string errorCode, Exception inner)
        : base(message, inner)
    {
        ErrorCode = errorCode;
    }
}

class ProductNotFoundException : AppException
{
    public int ProductId { get; }

    public ProductNotFoundException(int id)
        : base($"Produk {id} tidak ditemukan", "PROD_NOT_FOUND")
    {
        ProductId = id;
    }
}

class Program
{
    static double Bagi(double a, double b)
    {
        if (b == 0)
            throw new DivideByZeroException("Tidak bisa dibagi nol");
        return a / b;
    }

    static int CariProduk(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID harus positif", nameof(id));
        if (id > 100)
            throw new ProductNotFoundException(id);
        return id;
    }

    static void Main()
    {
        // Try-catch
        try
        {
            var result = Bagi(10, 2);
            Console.WriteLine($"10 / 2 = {result}");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }

        // Multiple catch
        try
        {
            var result = Bagi(5, 0);
            Console.WriteLine($"Hasil: {result}");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Divide error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"General error: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Finally block selalu dijalankan");
        }

        // Custom exception
        try
        {
            CariProduk(200);
        }
        catch (ProductNotFoundException ex)
        {
            Console.WriteLine($"Custom error [{exErrorCode}]: {ex.Message}");
        }
        catch (AppException ex)
        {
            Console.WriteLine($"App error [{ex.ErrorCode}]: {ex.Message}");
        }

        // Try pattern (C# 7+)
        if (int.TryParse("42", out int parsed))
        {
            Console.WriteLine($"\\nParsed: {parsed}");
        }

        // Null check dengan throw
        string? name = null;
        try
        {
            string safeName = name ?? throw new ArgumentNullException(nameof(name));
            Console.WriteLine(safeName);
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"Null error: {ex.Message}");
        }

        // Using statement (IDisposable)
        using (var writer = new System.IO.StringWriter())
        {
            writer.WriteLine("Hello using statement");
            Console.WriteLine(writer.ToString());
        }
    }
}`,
    objectivesId: [
      'try-catch-finally untuk handle exception',
      'Multiple catch blocks dengan exception type spesifik',
      'Custom exception class dengan inheritance',
      'Throw expression dan null check',
      'Using statement untuk IDisposable pattern',
    ],
    objectivesEn: [
      'try-catch-finally for exception handling',
      'Multiple catch blocks with specific exception types',
      'Custom exception classes with inheritance',
      'Throw expressions and null checks',
      'Using statement for IDisposable pattern',
    ],
    explanationId: '### Try-Catch\n`try { ... } catch (ExceptionType ex) { ... }` — handle error.\n\n### Multiple Catch\nCatch spesifik dulu, umum di akhir. `finally` selalu dijalankan.\n\n### Custom Exception\nInherit dari `Exception`. Tambah properties spesifik.\n\n### Throw Expression\n`name ?? throw new ArgumentNullException()` — throw inline.\n\n### Using Statement\n`using (var x = new Disposable()) { ... }` — auto dispose saat keluar scope.',
    explanationEn: '### Try-Catch\nHandle exceptions with try-catch-finally.\n\n### Multiple Catch\nSpecific exceptions first, general last.\n\n### Custom Exceptions\nInherit from Exception for domain-specific errors.\n\n### Throw Expressions\nInline throw with null-coalescing operator.\n\n### Using Statement\nAutomatic disposal of IDisposable resources.',
    experimentsId: [
      'Buat custom exception dengan inner exception',
      'Eksperimen dengan multiple catch order',
      'Coba finally block dengan return statement',
      'Buat using declaration (C# 8+)',
      'Eksperimen dengan exception filter',
    ],
    experimentsEn: [
      'Create custom exception with inner exception',
      'Experiment with multiple catch order',
      'Try finally block with return statement',
      'Create using declaration (C# 8+)',
      'Experiment with exception filters',
    ],
    challengeId: 'Buat program manajemen produk dengan custom exception: ProductNotFoundException, InvalidPriceException, DuplicateProductException. Handle semua case.',
    challengeEn: 'Build a product management program with custom exceptions: ProductNotFoundException, InvalidPriceException, DuplicateProductException. Handle all cases.',
    summaryId: 'Minggu 8 dari 12: **Error Handling** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Design Patterns** (Advanced).',
    summaryEn: 'Week 8 of 12: **Error Handling** (Level: Intermediate). Intermediate phase complete! Next week: **Design Patterns** (Advanced).',
  },
  // ── ADVANCED (weeks 9-12) ────────────────────────────────────────────────
  {
    week: 9, level: 'advanced', topicId: 'design-patterns',
    titleId: 'Design Patterns', titleEn: 'Design Patterns',
    programId: 'Repository & Strategy', programEn: 'Repository & Strategy',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'csharp',
    code: `using System;
using System.Collections.Generic;
using System.Linq;

// Strategy Pattern
interface IPaymentStrategy
{
    void Pay(double amount);
}

class CreditCardPayment : IPaymentStrategy
{
    public void Pay(double amount) =>
        Console.WriteLine($"  Credit Card: Rp{amount:N0}");
}

class PayPalPayment : IPaymentStrategy
{
    public void Pay(double amount) =>
        Console.WriteLine($"  PayPal: Rp{amount:N0}");
}

class BankTransferPayment : IPaymentStrategy
{
    public void Pay(double amount) =>
        Console.WriteLine($"  Bank Transfer: Rp{amount:N0}");
}

class PaymentContext
{
    private IPaymentStrategy _strategy;

    public PaymentContext(IPaymentStrategy strategy) => _strategy = strategy;
    public void SetStrategy(IPaymentStrategy strategy) => _strategy = strategy;
    public void ExecutePayment(double amount) => _strategy.Pay(amount);
}

// Singleton Pattern
class DatabaseConnection
{
    private static DatabaseConnection? _instance;
    private static readonly object _lock = new();

    public string ConnectionString { get; }

    private DatabaseConnection()
    {
        ConnectionString = "Server=localhost;Database=mydb";
    }

    public static DatabaseConnection Instance
    {
        get
        {
            lock (_lock)
            {
                return _instance ??= new DatabaseConnection();
            }
        }
    }
}

// Factory Pattern
interface IProduct
{
    string Name { get; }
    double Price { get; }
}

class Book : IProduct
{
    public string Name => "Buku";
    public Price => 75000;
}

class Electronics : IProduct
{
    public string Name => "Laptop";
    public Price => 15000000;
}

class ProductFactory
{
    public static IProduct Create(string type) => type.ToLower() switch
    {
        "book" => new Book(),
        "electronics" => new Electronics(),
        _ => throw new ArgumentException($"Unknown type: {type}")
    };
}

class Program
{
    static void Main()
    {
        // Strategy
        Console.WriteLine("=== Strategy Pattern ===");
        var payment = new PaymentContext(new CreditCardPayment());
        payment.ExecutePayment(1000000);

        payment.SetStrategy(new PayPalPayment());
        payment.ExecutePayment(500000);

        payment.SetStrategy(new BankTransferPayment());
        payment.ExecutePayment(2000000);

        // Singleton
        Console.WriteLine("\\n=== Singleton Pattern ===");
        var db1 = DatabaseConnection.Instance;
        var db2 = DatabaseConnection.Instance;
        Console.WriteLine($"Same instance: {ReferenceEquals(db1, db2)}");
        Console.WriteLine($"Connection: {db1.ConnectionString}");

        // Factory
        Console.WriteLine("\\n=== Factory Pattern ===");
        var products = new List<IProduct>
        {
            ProductFactory.Create("book"),
            ProductFactory.Create("electronics")
        };

        foreach (var p in products)
            Console.WriteLine($"  {p.Name}: Rp{p.Price:N0}");
    }
}`,
    objectivesId: [
      'Strategy Pattern: family of algorithms yang bisa ditukar',
      'Singleton Pattern: satu instance global',
      'Factory Pattern: object creation tanpa expose logic',
      'Repository Pattern: abstraction untuk data access',
      'Dependency Injection: inject dependency dari luar',
    ],
    objectivesEn: [
      'Strategy Pattern: interchangeable family of algorithms',
      'Singleton Pattern: single global instance',
      'Factory Pattern: object creation without exposing logic',
      'Repository Pattern: abstraction for data access',
      'Dependency Injection: inject dependencies from outside',
    ],
    explanationId: '### Strategy Pattern\nFamily of algorithms yang bisa ditukar runtime. `IPaymentStrategy` dengan multiple implementation.\n\n### Singleton Pattern\nSatu instance global. Thread-safe dengan lock.\n\n### Factory Pattern\nObject creation tanpa expose logic. `Create()` return interface.\n\n### Repository Pattern\nAbstraction untuk data access. Decouple business logic dari data layer.\n\n### Dependency Injection\nInject dependency dari luar. Mudah test dan maintain.',
    explanationEn: '### Strategy Pattern\nInterchangeable algorithms at runtime.\n\n### Singleton Pattern\nSingle global instance with thread safety.\n\n### Factory Pattern\nObject creation without exposing logic.\n\n### Repository Pattern\nAbstraction for data access.\n\n### Dependency Injection\nInject dependencies from outside for testability.',
    experimentsId: [
      'Buat strategy pattern untuk sorting',
      'Eksperikan dengan singleton untuk config manager',
      'Buat factory pattern untuk notification',
      'Implementasikan repository pattern',
      'Coba dependency injection dengan interface',
    ],
    experimentsEn: [
      'Create strategy pattern for sorting',
      'Experiment with singleton for config manager',
      'Create factory pattern for notifications',
      'Implement repository pattern',
      'Try dependency injection with interfaces',
    ],
    challengeId: 'Buat sistem pembayaran dengan strategy pattern: CreditCard, PayPal, BankTransfer, Crypto. Tambah factory untuk create payment.',
    challengeEn: 'Build a payment system with strategy pattern: CreditCard, PayPal, BankTransfer, Crypto. Add factory for payment creation.',
    summaryId: 'Minggu 9 dari 12: **Design Patterns** (Level: Lanjutan). Solusi reusable untuk masalah umum. Minggu depan: **Testing**.',
    summaryEn: 'Week 9 of 12: **Design Patterns** (Level: Advanced). Reusable solutions for common problems. Next week: **Testing**.',
  },
  {
    week: 10, level: 'advanced', topicId: 'testing',
    titleId: 'Testing', titleEn: 'Testing',
    programId: 'Unit Test & Mock', programEn: 'Unit Tests & Mocks',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'csharp',
    code: `using System;
using System.Collections.Generic;

// Class yang akan diuji
class Calculator
{
    public int Add(int a, int b) => a + b;
    public double Divide(double a, double b)
    {
        if (b == 0) throw new DivideByZeroException();
        return a / b;
    }
    public bool IsEven(int n) => n % 2 == 0;
}

class ProductService
{
    private readonly List<Product> _products = new();

    public void Add(Product p) => _products.Add(p);
    public List<Product> GetAll() => _products;
    public Product? FindById(int id) => _products.Find(p => p.Id == id);
    public void Delete(int id)
    {
        var p = FindById(id);
        if (p != null) _products.Remove(p);
    }
}

class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Simulasi Unit Test ===");

        // Test Calculator
        var calc = new Calculator();

        // Test Add
        int result = calc.Add(2, 3);
        Console.WriteLine(result == 5
            ? "✓ Add(2,3) = 5"
            : $"✗ Add(2,3) = {result}, expected 5");

        result = calc.Add(-1, -1);
        Console.WriteLine(result == -2
            ? "✓ Add(-1,-1) = -2"
            : $"✗ Add(-1,-1) = {result}, expected -2");

        // Test Divide
        double divResult = calc.Divide(10, 2);
        Console.WriteLine(Math.Abs(divResult - 5.0) < 0.001
            ? "✓ Divide(10,2) = 5.0"
            : $"✗ Divide(10,2) = {divResult}");

        // Test IsEven
        Console.WriteLine(calc.IsEven(4)
            ? "✓ IsEven(4) = true"
            : "✗ IsEven(4) failed");

        // Test ProductService
        Console.WriteLine("\\n=== ProductService Test ===");
        var service = new ProductService();
        service.Add(new Product { Id = 1, Name = "Laptop", Price = 15000000 });
        service.Add(new Product { Id = 2, Name = "Mouse", Price = 250000 });

        Console.WriteLine(service.GetAll().Count == 2
            ? "✓ GetAll returns 2 products"
            : "✗ GetAll failed");

        var found = service.FindById(1);
        Console.WriteLine(found?.Name == "Laptop"
            ? "✓ FindById(1) = Laptop"
            : "✗ FindById failed");

        service.Delete(1);
        Console.WriteLine(service.GetAll().Count == 1
            ? "✓ Delete(1) — 1 product left"
            : "✗ Delete failed");

        Console.WriteLine("\\n=== Semua test passed! ===");
        Console.WriteLine("xunit: dotnet test");
        Console.WriteLine("nunit: dotnet test");
        Console.WriteLine("moq: Install-Package Moq");
    }
}`,
    objectivesId: [
      'Unit testing dengan xUnit/NUnit',
      'Test class dan method dengan [Fact]/[Test]',
      'Assert: Equal, True, False, Throws',
      'Mock dengan Moq untuk dependency',
      'Integration test dengan WebApplicationFactory',
    ],
    objectivesEn: [
      'Unit testing with xUnit/NUnit',
      'Test classes and methods with [Fact]/[Test]',
      'Assert: Equal, True, False, Throws',
      'Mocking with Moq for dependencies',
      'Integration tests with WebApplicationFactory',
    ],
    explanationId: '### Unit Test\n`[Fact]` attribute (xUnit) atau `[Test]` (NUnit). Method test.\n\n### Assert\n`Assert.Equal(expected, actual)`, `Assert.True(condition)`, `Assert.Throws<T>()`.\n\n### Mock\n`Mock<IRepository>()` — buat fake object untuk dependency.\n\n### Integration Test\n`WebApplicationFactory<T>` — test API end-to-end.\n\n### Best Practices\n- Arrange-Act-Assert pattern\n- One assertion per test\n- Test edge cases',
    explanationEn: '### Unit Tests\n[Fact] (xUnit) or [Test] (NUnit) attributes for test methods.\n\n### Assert\nEqual, True, Throws for verification.\n\n### Mocking\nCreate fake dependencies with Moq.\n\n### Integration Tests\nTest APIs end-to-end with WebApplicationFactory.\n\n### Best Practices\nArrange-Act-Assert pattern, one assertion per test.',
    experimentsId: [
      'Buat test untuk Calculator dengan edge cases',
      'Eksperimen dengan Assert.Throws untuk exception',
      'Buat mock object untuk repository',
      'Coba test dengan [Theory] dan [InlineData]',
      'Buat integration test untuk API',
    ],
    experimentsEn: [
      'Create tests for Calculator with edge cases',
      'Experiment with Assert.Throws for exceptions',
      'Create mock objects for repositories',
      'Try tests with [Theory] and [InlineData]',
      'Create integration tests for APIs',
    ],
    challengeId: 'Buat library calculator dengan unit test: add, subtract, multiply, divide, power, factorial. Minimal 10 test cases.',
    challengeEn: 'Build a calculator library with unit tests: add, subtract, multiply, divide, power, factorial. Minimum 10 test cases.',
    summaryId: 'Minggu 10 dari 12: **Testing** (Level: Lanjutan). Kualitas kode dan keandalan. Minggu depan: **Web API**.',
    summaryEn: 'Week 10 of 12: **Testing** (Level: Advanced). Code quality and reliability. Next week: **Web API**.',
  },
  {
    week: 11, level: 'advanced', topicId: 'web-api',
    titleId: 'Web API', titleEn: 'Web API',
    programId: 'REST API', programEn: 'REST API',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'csharp',
    code: `using System;
using System.Collections.Generic;
using System.Linq;

// Model
class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
    public int Stock { get; set; }
}

// Controller (simulasi)
class ProductController
{
    private static List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop", Price = 15000000, Stock = 10 },
        new Product { Id = 2, Name = "Mouse", Price = 250000, Stock = 50 },
    };
    private static int _nextId = 3;

    // GET /api/products
    public static List<Product> GetAll() => _products;

    // GET /api/products/{id}
    public static Product? GetById(int id) =>
        _products.FirstOrDefault(p => p.Id == id);

    // POST /api/products
    public static Product Create(Product product)
    {
        product.Id = _nextId++;
        _products.Add(product);
        return product;
    }

    // PUT /api/products/{id}
    public static Product? Update(int id, Product updated)
    {
        var product = GetById(id);
        if (product == null) return null;
        product.Name = updated.Name;
        product.Price = updated.Price;
        product.Stock = updated.Stock;
        return product;
    }

    // DELETE /api/products/{id}
    public static bool Delete(int id)
    {
        var product = GetById(id);
        if (product == null) return false;
        _products.Remove(product);
        return true;
    }
}

// Middleware (simulasi)
class LoggingMiddleware
{
    public static void Log(string method, string path)
    {
        Console.WriteLine($"  [{DateTime.Now:HH:mm:ss}] {method} {path}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== REST API Simulation ===");

        // GET all
        LoggingMiddleware.Log("GET", "/api/products");
        var products = ProductController.GetAll();
        Console.WriteLine($"GET /api/products -> {products.Count} items");
        foreach (var p in products)
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0}");

        // GET by id
        LoggingMiddleware.Log("GET", "/api/products/1");
        var product = ProductController.GetById(1);
        Console.WriteLine($"\\nGET /api/products/1 -> {product?.Name}");

        // POST
        LoggingMiddleware.Log("POST", "/api/products");
        var newProduct = ProductController.Create(new Product
        {
            Name = "Keyboard",
            Price = 500000,
            Stock = 30
        });
        Console.WriteLine($"\\nPOST /api/products -> Created: {newProduct.Id}: {newProduct.Name}");

        // PUT
        LoggingMiddleware.Log("PUT", "/api/products/1");
        var updated = ProductController.Update(1, new Product
        {
            Name = "Laptop Pro",
            Price = 20000000,
            Stock = 5
        });
        Console.WriteLine($"\\nPUT /api/products/1 -> Updated: {updated?.Name}");

        // DELETE
        LoggingMiddleware.Log("DELETE", "/api/products/2");
        bool deleted = ProductController.Delete(2);
        Console.WriteLine($"\\nDELETE /api/products/2 -> {deleted}");

        // Final state
        Console.WriteLine("\\n=== Final State ===");
        foreach (var p in ProductController.GetAll())
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0}");

        Console.WriteLine("\\n=== ASP.NET Core Web API ===");
        Console.WriteLine("dotnet new webapi -n MyApi");
        Console.WriteLine("dotnet run");
    }
}`,
    objectivesId: [
      'ASP.NET Core Web API: Controller, Action, Routing',
      'HTTP methods: GET, POST, PUT, DELETE',
      'Model binding dan validation',
      'Middleware pipeline',
      'Dependency injection di ASP.NET Core',
    ],
    objectivesEn: [
      'ASP.NET Core Web API: Controllers, Actions, Routing',
      'HTTP methods: GET, POST, PUT, DELETE',
      'Model binding and validation',
      'Middleware pipeline',
      'Dependency injection in ASP.NET Core',
    ],
    explanationId: '### Web API\nASP.NET Core Web API untuk build REST API.\n\n### Controller\nClass dengan method untuk handle HTTP request. Attribute routing.\n\n### HTTP Methods\nGET (read), POST (create), PUT (update), DELETE (delete).\n\n### Middleware\nPipeline untuk process request/response. Logging, auth, CORS.\n\n### DI\nDependency injection built-in. Register service di Program.cs.',
    explanationEn: '### Web API\nASP.NET Core for building REST APIs.\n\n### Controllers\nClasses with methods to handle HTTP requests.\n\n### HTTP Methods\nGET, POST, PUT, DELETE for CRUD operations.\n\n### Middleware\nRequest/response processing pipeline.\n\n### DI\nBuilt-in dependency injection.',
    experimentsId: [
      'Tambah endpoint dengan query parameter',
      'Buat middleware untuk authentication',
      'Coba model validation dengan Data Annotations',
      'Buat endpoint dengan pagination',
      'Eksperimen dengan minimal API',
    ],
    experimentsEn: [
      'Add endpoint with query parameters',
      'Create middleware for authentication',
      'Try model validation with Data Annotations',
      'Create endpoint with pagination',
      'Experiment with minimal APIs',
    ],
    challengeId: 'Buat REST API lengkap untuk Task Manager: CRUD endpoints, validation, logging middleware, proper HTTP status codes.',
    challengeEn: 'Build a complete REST API for Task Manager: CRUD endpoints, validation, logging middleware, proper HTTP status codes.',
    summaryId: 'Minggu 11 dari 12: **Web API** (Level: Lanjutan). Backend development dengan C#. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **Web API** (Level: Advanced). Backend development with C#. Next week: **Capstone Project**!',
  },
  {
    week: 12, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: Full Stack App', titleEn: 'Capstone: Full Stack App',
    programId: 'E-Commerce API', programEn: 'E-Commerce API',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'csharp',
    code: `using System;
using System.Collections.Generic;
using System.Linq;

// Models
class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
    public int Stock { get; set; }
}

class Order
{
    public int Id { get; set; }
    public List<OrderItem> Items { get; set; } = new();
    public double Total => Items.Sum(i => i.Subtotal);
    public string Status { get; set; } = "Pending";
}

class OrderItem
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = "";
    public int Quantity { get; set; }
    public double Price { get; set; }
    public double Subtotal => Quantity * Price;
}

// Repository
class ProductRepository
{
    private List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop", Price = 15000000, Stock = 10 },
        new Product { Id = 2, Name = "Mouse", Price = 250000, Stock = 50 },
        new Product { Id = 3, Name = "Keyboard", Price = 500000, Stock = 30 },
    };
    private int _nextId = 4;

    public List<Product> GetAll() => _products;
    public Product? GetById(int id) => _products.FirstOrDefault(p => p.Id == id);
    public Product Create(Product p) { p.Id = _nextId++; _products.Add(p); return p; }
    public bool Delete(int id) => _products.RemoveAll(p => p.Id == id) > 0;
}

// Service
class OrderService
{
    private ProductRepository _productRepo;
    private List<Order> _orders = new();
    private int _nextOrderId = 1;

    public OrderService(ProductRepository repo) => _productRepo = repo;

    public Order CreateOrder(List<OrderItem> items)
    {
        var order = new Order { Id = _nextOrderId++, Items = items };
        _orders.Add(order);
        return order;
    }

    public List<Order> GetAllOrders() => _orders;
    public Order? GetOrder(int id) => _orders.FirstOrDefault(o => o.Id == id);
}

class Program
{
    static void Main()
    {
        var productRepo = new ProductRepository();
        var orderService = new OrderService(productRepo);

        // Display products
        Console.WriteLine("=== Products ===");
        foreach (var p in productRepo.GetAll())
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0} (stok: {p.Stock})");

        // Create order
        Console.WriteLine("\\n=== Create Order ===");
        var items = new List<OrderItem>
        {
            new OrderItem { ProductId = 1, ProductName = "Laptop", Quantity = 1, Price = 15000000 },
            new OrderItem { ProductId = 2, ProductName = "Mouse", Quantity = 2, Price = 250000 },
        };

        var order = orderService.CreateOrder(items);
        Console.WriteLine($"Order #{order.Id}");
        foreach (var item in order.Items)
            Console.WriteLine($"  {item.ProductName} x{item.Quantity} = Rp{item.Subtotal:N0}");
        Console.WriteLine($"Total: Rp{order.Total:N0}");

        // List orders
        Console.WriteLine("\\n=== All Orders ===");
        foreach (var o in orderService.GetAllOrders())
            Console.WriteLine($"  Order #{o.Id}: Rp{o.Total:N0} ({o.Status})");

        // Add product
        Console.WriteLine("\\n=== Add Product ===");
        var newProduct = productRepo.Create(new Product { Name = "Monitor", Price = 3000000, Stock = 15 });
        Console.WriteLine($"Added: {newProduct.Id}: {newProduct.Name}");

        Console.WriteLine("\\n=== Final Products ===");
        foreach (var p in productRepo.GetAll())
            Console.WriteLine($"  {p.Id}: {p.Name} - Rp{p.Price:N0}");

        Console.WriteLine("\\n=== CLI Simulation ===");
        Console.WriteLine("dotnet run -- list-products");
        Console.WriteLine("dotnet run -- create-order --product 1 --qty 2");
        Console.WriteLine("dotnet run -- list-orders");
    }
}`,
    objectivesId: [
      'Menggabungkan semua konsep: OOP, LINQ, async, generics, error handling',
      'Repository pattern: pemisahan data access dan business logic',
      'Service layer: business logic terpisah dari controller',
      'Dependency injection: inject service ke controller',
      'Testing: unit test, integration test',
    ],
    objectivesEn: [
      'Combine all concepts: OOP, LINQ, async, generics, error handling',
      'Repository pattern: separate data access and business logic',
      'Service layer: business logic separate from controllers',
      'Dependency injection: inject services into controllers',
      'Testing: unit tests, integration tests',
    ],
    explanationId: '### Repository Pattern\nPemisahan data access dan business logic.\n\n### Service Layer\nBusiness logic terpisah dari controller. Mudah test.\n\n### DI\nInject service ke controller via constructor.\n\n### Testing\nUnit test, integration test, mock.\n\n### Best Practices\n- SOLID principles\n- Clean architecture\n- CQRS pattern',
    explanationEn: '### Repository Pattern\nSeparate data access from business logic.\n\n### Service Layer\nBusiness logic separate from controllers.\n\n### DI\nConstructor injection for dependencies.\n\n### Testing\nUnit and integration tests with mocking.\n\n### Best Practices\nSOLID principles, clean architecture.',
    experimentsId: [
      'Tambah method Update untuk ProductRepository',
      'Implementasikan async method di service',
      'Buat unit test untuk OrderService',
      'Tambah validation untuk OrderItem',
      'Implementasikan pagination untuk GetAll',
    ],
    experimentsEn: [
      'Add Update method for ProductRepository',
      'Implement async methods in service',
      'Create unit tests for OrderService',
      'Add validation for OrderItem',
      'Implement pagination for GetAll',
    ],
    challengeId: 'Buat aplikasi capstone lengkap: Web API + Service + Repository + Testing. Pilih domain: E-Commerce, Blog, atau Task Manager.',
    challengeEn: 'Build a complete capstone application: Web API + Service + Repository + Testing. Choose domain: E-Commerce, Blog, or Task Manager.',
    summaryId: 'Minggu 12 dari 12: **Capstone: Full Stack App** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai C# dari nol hingga production-ready.',
    summaryEn: 'Week 12 of 12: **Capstone: Full Stack App** (Level: Advanced). Complete! 🎉 You\'ve mastered C# from scratch to production-ready.',
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
