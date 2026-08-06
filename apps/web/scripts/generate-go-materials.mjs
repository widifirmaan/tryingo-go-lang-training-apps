import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// GO CURRICULUM — pure research, zero framework influence
// Sources: Scaler, LevelUpGo (Anthony GG), roadmap.sh, Go Bootcamp (Aimonetti),
//          Official Go Tour, Effective Go, Go by Example, Gophercises,
//          Coursera (Colorado), Caltech EdX
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 12-14 weeks total
//   Beginner (5w): syntax → types/control → functions → collections → structs
//   Intermediate (4w): interfaces → pointers/packages → concurrency → context
//   Advanced (4w): stdlib → encoding → HTTP → testing + capstone
// Total: 13 weeks (within research range of 12-14)
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('golang', 'Go');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dari nol: toolchain, sintaks, tipe data, fungsi, koleksi, struct — urutan resmi Go Tour.',
    descEn: 'From scratch: toolchain, syntax, types, functions, collections, structs — official Go Tour order.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Idiomatic Go: interface, pointer, package, concurrency, context — LevelUpGo pathway.',
    descEn: 'Idiomatic Go: interfaces, pointers, packages, concurrency, context — LevelUpGo pathway.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Production Go: stdlib, encoding, HTTP server, testing, capstone project.',
    descEn: 'Production Go: stdlib, encoding, HTTP server, testing, capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-5) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'setup-dan-sintaks',
    titleId: 'Setup, Toolchain & Sintaks Dasar', titleEn: 'Setup, Toolchain & Basic Syntax',
    programId: 'Halo, Go!', programEn: 'Hello, Go!',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'go',
    code: `package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Go adalah bahasa compiled, statically typed.")

    var nama string = "Gopher"
    versi := 1.24
    aktif := true

    fmt.Printf("Nama: %s\\n", nama)
    fmt.Printf("Versi: %.2f\\n", versi)
    fmt.Printf("Aktif: %t\\n", aktif)
    fmt.Printf("Tipe: %T %T %T\\n", nama, versi, aktif)
}`,
    objectivesId: [
      'Memahami peran Go sebagai bahasa compiled untuk backend (roadmap.sh phase 1)',
      'Menginstall Go dan menulis program pertama (Go Tour: Basics)',
      'Mengenal toolchain: go run, build, fmt, test, vet (Effective Go)',
      'Memahami struktur file .go: package, import, func main (Go Tour)',
      'Menggunakan fmt.Println, fmt.Printf dengan format verb %v, %s, %d, %T',
    ],
    objectivesEn: [
      'Understand Go as a compiled backend language (roadmap.sh phase 1)',
      'Install Go and write your first program (Go Tour: Basics)',
      'Learn the toolchain: go run, build, fmt, test, vet (Effective Go)',
      'Understand .go file structure: package, import, func main (Go Tour)',
      'Use fmt.Println, fmt.Printf with format verbs %v, %s, %d, %T',
    ],
    explanationId: '### Peran Go\\nGo adalah bahasa compiled, statically typed yang dikembangkan Google. Berbeda dengan Python/JS yang interpreted, Go dikompilasi langsung ke binary mesin — menghasilkan eksekusi cepat dan distribusi mudah (single binary).\\n\\n### Toolchain Utama\\n- \`go run\`: jalankan file .go langsung\\n- \`go build\`: kompilasi ke binary\\n- \`go fmt\`: format kode otomatis\\n- \`go test\`: jalankan test\\n- \`go vet\`: analisis potensi bug\\n\\n### Struktur File Go\\nSetiap file .go: \`package\` declaration, \`import\`, \`func main()\` sebagai entry point.\\n\\n### Format Verb\\n\`%s\` string, \`%d\` integer, \`%f\` float, \`%t\` boolean, \`%T\` tipe data, \`%v\` default.',
    explanationEn: '### Go\'s Role\\nGo is a compiled, statically typed language by Google. Compiles directly to machine binary — fast execution, easy distribution.\\n\\n### Main Toolchain\\n\`go run\`, \`go build\`, \`go fmt\`, \`go test\`, \`go vet\`\\n\\n### File Structure\\n\`package\`, \`import\`, \`func main()\` entry point.\\n\\n### Format Verbs\\n\`%s\` string, \`%d\` int, \`%f\` float, \`%t\` bool, \`%T\` type, \`%v\` default.',
    experimentsId: [
      'Ubah nilai variabel dan lihat perubahannya',
      'Tambah fungsi baru dengan tipe return berbeda',
      'Ganti for loop dengan range',
      'Coba tipe data yang belum dicoba',
      'Buat program kecil gabungan 2-3 konsep',
    ],
    experimentsEn: [
      'Change variable values and observe',
      'Add a new function with different return types',
      'Replace for loops with range',
      'Try data types you haven\'t used',
      'Build a small program combining 2-3 concepts',
    ],
    challengeId: 'Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan \`go run\`.',
    challengeEn: 'Build a program applying this week\'s concepts in a real case study. Use proper error handling. Ensure the code runs with \`go run\`.',
    summaryId: 'Minggu 1 dari 13: **Setup, Toolchain & Sintaks Dasar** (Level: Pemula). Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **Variabel, Tipe & Control Flow**.',
    summaryEn: 'Week 1 of 13: **Setup, Toolchain & Basic Syntax** (Level: Beginner). Go delivers high performance with simple syntax. Next week: **Variables, Types & Control Flow**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'variabel-tipe-kontrol',
    titleId: 'Variabel, Tipe & Control Flow', titleEn: 'Variables, Types & Control Flow',
    programId: 'Bilangan & Grade', programEn: 'Numbers & Grades',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'go',
    code: `package main

import "fmt"

func main() {
    var name string = "Budi"
    age := 25
    height := 175.5
    fmt.Printf("Nama: %s, Umur: %d, Tinggi: %.1f\\n", name, age, height)

    var zeroInt int
    var zeroStr string
    var zeroBool bool
    fmt.Printf("Zero: int=%d, str=%q, bool=%t\\n", zeroInt, zeroStr, zeroBool)

    score := 85
    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 75 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: C")
    }

    fmt.Print("For: ")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    n := 1
    fmt.Print("While: ")
    for n <= 3 {
        fmt.Printf("%d ", n)
        n++
    }
    fmt.Println()

    day := 3
    switch day {
    case 1: fmt.Println("Senin")
    case 2: fmt.Println("Selasa")
    case 3: fmt.Println("Rabu")
    default: fmt.Println("Hari lain")
    }

    x := 10
    switch {
    case x < 10: fmt.Println("Kecil")
    case x == 10: fmt.Println("Tepat 10")
    default: fmt.Println("Besar")
    }
}`,
    objectivesId: [
      'Mendeklarasikan variabel dengan var dan := (short declaration)',
      'Mengenal tipe dasar: int, float64, string, bool, rune',
      'Memahami zero values dan type inference (Go Tour: Zero Values)',
      'Menerapkan if/else dengan short statement dan for loop 3 bentuk',
      'Menggunakan switch tanpa break — case berhenti otomatis (Effective Go)',
    ],
    objectivesEn: [
      'Declare variables with var and := (short declaration)',
      'Learn basic types: int, float64, string, bool, rune',
      'Understand zero values and type inference (Go Tour: Zero Values)',
      'Apply if/else with short statement and for loop 3 forms',
      'Use switch without break — cases stop automatically (Effective Go)',
    ],
    explanationId: '### Variabel & Tipe\n`var` eksplisit, `:=` short declaration dengan inference. Zero values: 0, "", false.\n\n### Control Flow\n- if dengan short statement: `if x := 10; x > 5 {}`\n- for 3 bentuk: classic, while-style, infinite\n- switch tanpa break — case otomatis berhenti\n- tagless switch untuk kondisi kompleks',
    explanationEn: '### Variables & Types\n`var` explicit, `:=` short declaration. Zero values: 0, "", false.\n\n### Control Flow\nif short statement, for 3 forms, switch no-break, tagless switch.',
    experimentsId: [
      'Ubah nilai score dan lihat grade berubah',
      'Tambah nested if untuk validasi',
      'Buat for loop dengan break pada kondisi tertentu',
      'Ganti switch dengan if/else — mana yang lebih readable?',
    ],
    experimentsEn: [
      'Change score values and observe grade changes',
      'Add nested if for validation',
      'Create for loop with break on condition',
      'Replace switch with if/else — which is more readable?',
    ],
    challengeId: 'Buat program konversi suhu (Celsius ↔ Fahrenheit ↔ Kelvin) dengan menu pilihan menggunakan switch. Validasi input dengan if.',
    challengeEn: 'Build a temperature converter (Celsius ↔ Fahrenheit ↔ Kelvin) with menu using switch. Validate input with if.',
    summaryId: 'Minggu 2 dari 13: **Variabel, Tipe & Control Flow** (Level: Pemula). Dasar yang harus dikuasai sebelum lanjut. Minggu depan: **Fungsi & Error Handling**.',
    summaryEn: 'Week 2 of 13: **Variables, Types & Control Flow** (Level: Beginner). Essential foundations. Next week: **Functions & Error Handling**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'fungsi-error',
    titleId: 'Fungsi & Error Handling', titleEn: 'Functions & Error Handling',
    programId: 'Kalkulator', programEn: 'Calculator',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'go',
    code: `package main

import (
    "errors"
    "fmt"
)

func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa dibagi nol")
    }
    return a / b, nil
}

func hitung(a, b int) (jumlah int, kali int) {
    jumlah = a + b
    kali = a * b
    return
}

func rataRata(angka ...float64) float64 {
    total := 0.0
    for _, n := range angka {
        total += n
    }
    return total / float64(len(angka))
}

func main() {
    defer fmt.Println("Program selesai")

    hasil, err := bagi(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("10 / 2 = %.1f\\n", hasil)
    }

    _, err = bagi(5, 0)
    if err != nil {
        fmt.Println("Error:", err)
    }

    j, k := hitung(4, 5)
    fmt.Printf("Jumlah: %d, Kali: %d\\n", j, k)

    r := rataRata(80, 90, 75, 85)
    fmt.Printf("Rata-rata: %.1f\\n", r)
}`,
    objectivesId: [
      'Membuat fungsi dengan parameter dan return value',
      'Multiple return values dan named return (Go Tour: Functions)',
      'Mengenal tipe error dan idiom: if err != nil { return err }',
      'Membuat custom error dengan fmt.Errorf dan %w wrapping',
      'Defer untuk cleanup, variadic function func(nums ...int)',
    ],
    objectivesEn: [
      'Create functions with parameters and return values',
      'Multiple returns and named returns (Go Tour: Functions)',
      'Learn the error type and idiom: if err != nil { return err }',
      'Create custom errors with fmt.Errorf and %w wrapping',
      'Defer for cleanup, variadic functions func(nums ...int)',
    ],
    explanationId: '### Fungsi\nMultiple return values, named return, variadic `func(nums ...int)`.\n\n### Error Handling\nIdiom: `if err != nil { return err }`. `fmt.Errorf` dengan `%w` untuk wrapping.\n\n### Defer\nDijadwalkan setelah fungsi selesai (LIFO). Dipakai untuk cleanup.',
    explanationEn: '### Functions\nMultiple returns, named returns, variadic.\n\n### Error Handling\n`if err != nil { return err }`. `fmt.Errorf` with `%w`.\n\n### Defer\nScheduled after function returns (LIFO). Used for cleanup.',
    experimentsId: [
      'Tambah fungsi baru: pangkat(a, b float64)',
      'Buat custom error dengan struct sendiri',
      'Coba defer multiple — perhatikan urutan LIFO',
      'Ubah rataRata untuk handle slice kosong',
    ],
    experimentsEn: [
      'Add new function: power(a, b float64)',
      'Create custom error with your own struct',
      'Try multiple defers — observe LIFO order',
      'Modify rataRata to handle empty slice',
    ],
    challengeId: 'Buat program kalkulator scientific dengan fungsi: tambah, kurang, kali, bagi, pangkat, faktorial. Gunakan error handling untuk validasi.',
    challengeEn: 'Build a scientific calculator with functions: add, subtract, multiply, divide, power, factorial. Use error handling for validation.',
    summaryId: 'Minggu 3 dari 13: **Fungsi & Error Handling** (Level: Pemula). Fondasi menulis kode modular. Minggu depan: **Koleksi: Slice, Map & String**.',
    summaryEn: 'Week 3 of 13: **Functions & Error Handling** (Level: Beginner). Foundation for modular code. Next week: **Collections: Slices, Maps & Strings**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'koleksi-slice-map',
    titleId: 'Koleksi: Slice, Map & String', titleEn: 'Collections: Slices, Maps & Strings',
    programId: 'Manajemen Data', programEn: 'Data Manager',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'go',
    code: `package main

import "fmt"

func main() {
    fruits := []string{"apel", "mangga", "pisang"}
    fruits = append(fruits, "jeruk")
    fmt.Println("Slice:", fruits)
    fmt.Printf("Len: %d, Cap: %d\\n", len(fruits), cap(fruits))

    angka := []int{10, 20, 30, 40, 50}
    sub := angka[1:4]
    fmt.Println("Sub-slice [1:4]:", sub)

    ages := make(map[string]int)
    ages["Budi"] = 25
    ages["Siti"] = 23

    val, ok := ages["Budi"]
    if ok {
        fmt.Printf("Umur Budi: %d\\n", val)
    }

    delete(ages, "Siti")

    text := "  Go Programming Language  "
    fmt.Println("Trimmed:", len(text), "->", len(text))
    fmt.Println("Fields:", len(text))

    fmt.Println("\\n=== Range ===")
    for i, v := range fruits {
        fmt.Printf("%d: %s\\n", i, v)
    }
    for key, val := range ages {
        fmt.Printf("%s -> %d\\n", key, val)
    }
}`,
    objectivesId: [
      'Membedakan array fixed-size [N]T vs slice dinamis []T',
      'Menggunakan append, make, len, cap untuk manipulasi slice',
      'Map: map[string]int dengan ok idiom untuk cek keberadaan',
      'Manipulasi string: TrimSpace, ReplaceAll, Fields, Split',
      'Iterasi dengan range pada slice, map, dan string',
    ],
    objectivesEn: [
      'Distinguish fixed-size arrays [N]T vs dynamic slices []T',
      'Use append, make, len, cap for slice manipulation',
      'Maps: map[string]int with ok idiom for existence checks',
      'String manipulation: TrimSpace, ReplaceAll, Fields, Split',
      'Iterate with range over slices, maps, and strings',
    ],
    explanationId: '### Slice vs Array\nArray fixed-size, slice dynamic (backbone Go). `append`, `make`, `len`, `cap`.\n\n### Map\n`map[string]int` dengan ok idiom: `val, ok := m["key"]`.\n\n### String & Range\n`TrimSpace`, `ReplaceAll`, `Fields`, `Split`. `for i, v := range slice`.',
    explanationEn: '### Slice vs Array\nArray fixed, slice dynamic. `append`, `make`, `len`, `cap`.\n\n### Maps\n`map[string]int` with ok idiom.\n\n### Strings & Range\nString methods and range iteration.',
    experimentsId: [
      'Buat slice 2D (matrix) dan iterasi dengan nested range',
      'Tambah dan hapus multiple key di map',
      'Coba strings.HasPrefix, HasSuffix, Contains',
      'Urutkan slice dengan sort.Strings',
    ],
    experimentsEn: [
      'Create 2D slice (matrix) and iterate with nested range',
      'Add and remove multiple keys in map',
      'Try strings.HasPrefix, HasSuffix, Contains',
      'Sort slice with sort.Strings',
    ],
    challengeId: 'Buat program inventory: tambah/hapus produk (map), daftar produk (slice), cari produk (range + if).',
    challengeEn: 'Build an inventory program: add/remove products (map), list products (slice), search products (range + if).',
    summaryId: 'Minggu 4 dari 13: **Koleksi: Slice, Map & String** (Level: Pemula). Struktur data harian Go. Minggu depan: **Struct & Method**.',
    summaryEn: 'Week 4 of 13: **Collections: Slices, Maps & Strings** (Level: Beginner). Daily data structures in Go. Next week: **Structs & Methods**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'struct-method',
    titleId: 'Struct & Method', titleEn: 'Structs & Methods',
    programId: 'Data Produk', programEn: 'Product Data',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'go',
    code: `package main

import "fmt"

type Product struct {
    ID    int
    Name  string
    Price float64
    Stock int
}

func (p Product) Info() string {
    return fmt.Sprintf("%s: Rp%.0f (stok: %d)", p.Name, p.Price, p.Stock)
}

func (p *Product) ApplyDiscount(percent float64) {
    p.Price -= p.Price * (percent / 100)
}

type Electronics struct {
    Product
    WarrantyYears int
}

func NewProduct(id int, name string, price float64) *Product {
    return &Product{ID: id, Name: name, Price: price, Stock: 0}
}

func main() {
    p1 := Product{ID: 1, Name: "Laptop", Price: 15000000, Stock: 10}
    fmt.Println(p1.Info())

    p1.ApplyDiscount(10)
    fmt.Println("Setelah diskon:", p1.Info())

    laptop := Electronics{
        Product:       Product{ID: 2, Name: "Laptop Pro", Price: 20000000, Stock: 5},
        WarrantyYears: 3,
    }
    fmt.Println(laptop.Info())
    fmt.Printf("Garansi: %d tahun\\n", laptop.WarrantyYears)

    p2 := NewProduct(3, "Mouse", 250000)
    fmt.Println(p2.Info())
}`,
    objectivesId: [
      'Mendefinisikan struct dengan field dan named types',
      'Method: value receiver vs pointer receiver (Go Tour: Methods)',
      'Embedded fields untuk komposisi (Go tidak punya inheritance)',
      'Struct tags: `json:"name"` untuk metadata encoding',
      'Constructor function: NewT() *T pattern',
    ],
    objectivesEn: [
      'Define structs with fields and named types',
      'Methods: value receiver vs pointer receiver (Go Tour: Methods)',
      'Embedded fields for composition (Go has no inheritance)',
      'Struct tags: `json:"name"` for encoding metadata',
      'Constructor functions: NewT() *T pattern',
    ],
    explanationId: '### Struct\nMengelompokkan field. Value receiver vs pointer receiver.\n\n### Embedding\nKomposisi bukan inheritance. Struct otomatis punya method parent.\n\n### Constructor & Tags\n`NewT() *T` pattern. Tag: `json:"name"` untuk metadata.',
    explanationEn: '### Structs\nGroup fields. Value vs pointer receiver.\n\n### Embedding\nComposition over inheritance.\n\n### Constructors & Tags\n`NewT() *T`. Tags: `json:"name"`.',
    experimentsId: [
      'Tambah method Discount untuk Electronics',
      'Coba ubah value receiver ke pointer — apa efeknya?',
      'Buat struct baru dengan embedded Product',
      'Tambah struct tag `json:"price"` dan coba Marshal',
    ],
    experimentsEn: [
      'Add Discount method for Electronics',
      'Try changing value receiver to pointer — what\'s the effect?',
      'Create new struct with embedded Product',
      'Add struct tag `json:"price"` and try Marshal',
    ],
    challengeId: 'Buat sistem toko: struct Product, Cart, Customer. Method: AddToCart, Checkout, ApplyDiscount. Gunakan constructor.',
    challengeEn: 'Build a store system: struct Product, Cart, Customer. Methods: AddToCart, Checkout, ApplyDiscount. Use constructors.',
    summaryId: 'Minggu 5 dari 13: **Struct & Method** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Interface & Generics** (Intermediate).',
    summaryEn: 'Week 5 of 13: **Structs & Methods** (Level: Beginner). Beginner phase complete! Next week: **Interfaces & Generics** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 6-9) ──────────────────────────────────────────────
  {
    week: 6, level: 'intermediate', topicId: 'interface-generics',
    titleId: 'Interface & Generics', titleEn: 'Interfaces & Generics',
    programId: 'Polimorfisme', programEn: 'Polymorphism',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'go',
    code: `package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Dog struct{ Name string }
func (d Dog) Speak() string { return "Woof! I'm " + d.Name }

type Cat struct{ Name string }
func (c Cat) Speak() string { return "Meow! I'm " + c.Name }

func MakeSound(s Speaker) {
    fmt.Println(s.Speak())
}

func PrintAny(v any) {
    switch val := v.(type) {
    case int: fmt.Printf("Integer: %d\\n", val)
    case string: fmt.Printf("String: %s\\n", val)
    default: fmt.Printf("Unknown: %T - %v\\n", val, val)
    }
}

func First[T any](items []T) T {
    return items[0]
}

type Stack[T any] struct { items []T }
func (s *Stack[T]) Push(item T) { s.items = append(s.items, item) }

func main() {
    MakeSound(Dog{"Buddy"})
    MakeSound(Cat{"Kitty"})

    PrintAny(42)
    PrintAny("hello")
    PrintAny(3.14)

    fmt.Println("First int:", First([]int{10, 20, 30}))
    fmt.Println("First string:", First([]string{"a", "b"}))

    stack := Stack[string]{}
    stack.Push("Go")
    stack.Push("Rust")
    fmt.Println("Stack:", stack.items)
}`,
    objectivesId: [
      'Interface implisit — struct implement tanpa kata kunci implements',
      'Interface sebagai parameter polimorfik (Go Tour: Interfaces)',
      'Type assertion x.(T) dan type switch untuk cek tipe konkret',
      'Generics Go 1.18+: type parameters [T any], constraints',
      'Empty interface any / interface{} untuk tipe apapun',
    ],
    objectivesEn: [
      'Implicit interfaces — structs implement without implements keyword',
      'Interfaces as polymorphic parameters (Go Tour: Interfaces)',
      'Type assertion x.(T) and type switch for concrete type checks',
      'Generics Go 1.18+: type parameters [T any], constraints',
      'Empty interface any / interface{} for any type',
    ],
    explanationId: '### Interface Implisit\nTidak perlu `implement` — struct otomatis memenuhi jika punya methodnya.\n\n### Type Assertion & Switch\n`x.(T)` dan `switch v := x.(type)`.\n\n### Generics\n`[T any]` type parameter. Constraints: `comparable`, `ordered`.',
    explanationEn: '### Implicit Interfaces\nNo `implement` keyword needed.\n\n### Type Assertion & Switch\n`x.(T)` and type switch.\n\n### Generics\n`[T any]` type parameters with constraints.',
    experimentsId: [
      'Buat interface Shape dengan method Area() — implement Circle, Rectangle',
      'Coba type assertion dengan ok idiom: v, ok := x.(T)',
      'Buat generic function Min[T constraints.Ordered]',
      'Buat generic Map function: Map[T, U]([]T, func(T) U) []U',
    ],
    experimentsEn: [
      'Create Shape interface with Area() — implement Circle, Rectangle',
      'Try type assertion with ok idiom: v, ok := x.(T)',
      'Create generic Min[T constraints.Ordered]',
      'Create generic Map function: Map[T, U]([]T, func(T) U) []U',
    ],
    challengeId: 'Buat sistem pembayaran: interface PaymentMethod (ProcessPayment), implement CreditCard, PayPal, BankTransfer. Gunakan generics untuk repository.',
    challengeEn: 'Build a payment system: interface PaymentMethod (ProcessPayment), implement CreditCard, PayPal, BankTransfer. Use generics for repository.',
    summaryId: 'Minggu 6 dari 13: **Interface & Generics** (Level: Menengah). Go bukan OOP klasik — ini kekuatan utamanya. Minggu depan: **Pointer, Memory & Package**.',
    summaryEn: 'Week 6 of 13: **Interfaces & Generics** (Level: Intermediate). Go isn\'t classic OOP — this is its strength. Next week: **Pointers, Memory & Packages**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'pointer-package',
    titleId: 'Pointer, Memory & Package', titleEn: 'Pointers, Memory & Packages',
    programId: 'Struktur Proyek', programEn: 'Project Structure',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'go',
    code: `package main

import (
    "fmt"
    "math"
    "strings"
)

func Greet(name string) string {
    return "Hello, " + name + "!"
}

func formatNumber(n float64) string {
    return fmt.Sprintf("%.2f", n)
}

func main() {
    x := 42
    p := &x
    fmt.Printf("x=%d, *p=%d\\n", x, *p)
    *p = 21
    fmt.Printf("After *p=21: x=%d\\n", x)

    fmt.Println("Pi:", math.Pi)
    fmt.Println("Sqrt(16):", math.Sqrt(16))

    text := "Go Programming Language"
    fmt.Println("Upper:", strings.ToUpper(text))
    fmt.Println("Contains 'Go':", strings.Contains(text, "Go"))

    msg := Greet("Budi")
    fmt.Println(msg)
    fmt.Println("Formatted:", formatNumber(3.14159))

    fmt.Println("\\nModule: contoh-module")
    fmt.Println("Go version: go 1.22")
}`,
    objectivesId: [
      'Memahami operator & (address-of) dan * (dereference)',
      'Pass by value vs pass by pointer — kapan pakai pointer',
      'Membuat package sendiri dan struktur folder proyek',
      'Visibility: huruf besar = exported, huruf kecil = unexported',
      'go.mod: module path, go mod init, go mod tidy',
    ],
    objectivesEn: [
      'Understand & (address-of) and * (dereference) operators',
      'Pass by value vs pass by pointer — when to use pointers',
      'Create your own packages and project folder structure',
      'Visibility: uppercase = exported, lowercase = unexported',
      'go.mod: module path, go mod init, go mod tidy',
    ],
    explanationId: '### Pointer\n`&` address-of, `*` dereference. Pass by value vs pointer.\n\n### Package & Visibility\nHuruf besar = exported, kecil = unexported.\n\n### go.mod\n`go mod init`, `go mod tidy` untuk dependency management.',
    explanationEn: '### Pointers\n`&` address-of, `*` dereference.\n\n### Packages & Visibility\nUppercase = exported, lowercase = unexported.\n\n### go.mod\nModule management with `go mod init`, `go mod tidy`.',
    experimentsId: [
      'Buat fungsi swap dengan pointer — swap dua variabel',
      'Coba package dengan multiple files',
      'Buat internal package dan coba import dari luar',
      'Tambah dependency eksternal dengan go get',
    ],
    experimentsEn: [
      'Create swap function with pointers — swap two variables',
      'Try package with multiple files',
      'Create internal package and try importing from outside',
      'Add external dependency with go get',
    ],
    challengeId: 'Buat library geometri sebagai package terpisah: Circle, Rectangle dengan method Area dan Perimeter. Gunakan pointer receiver.',
    challengeEn: 'Build a geometry library as separate package: Circle, Rectangle with Area and Perimeter methods. Use pointer receivers.',
    summaryId: 'Minggu 7 dari 13: **Pointer, Memory & Package** (Level: Menengah). Organisasi kode profesional. Minggu depan: **Goroutine & Channel**.',
    summaryEn: 'Week 7 of 13: **Pointers, Memory & Packages** (Level: Intermediate). Professional code organization. Next week: **Goroutines & Channels**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'goroutine-channel',
    titleId: 'Goroutine & Channel', titleEn: 'Goroutines & Channels',
    programId: 'Unduhan Paralel', programEn: 'Parallel Downloads',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'go',
    code: `package main

import (
    "fmt"
    "time"
)

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums { out <- n }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in { out <- n * n }
        close(out)
    }()
    return out
}

func main() {
    ch := make(chan string)
    go func() { ch <- "Halo dari goroutine" }()
    msg := <-ch
    fmt.Println("Channel:", msg)

    buf := make(chan int, 3)
    buf <- 1; buf <- 2; buf <- 3
    fmt.Println("Buffered:", <-buf, <-buf, <-buf)

    fmt.Print("Pipeline: ")
    nums := generate(1, 2, 3, 4, 5)
    squares := square(nums)
    for s := range squares { fmt.Printf("%d ", s) }
    fmt.Println()

    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() {
        time.Sleep(50 * time.Millisecond)
        ch1 <- "satu"
    }()
    go func() {
        time.Sleep(100 * time.Millisecond)
        ch2 <- "dua"
    }()

    select {
    case msg := <-ch1: fmt.Println("Dari ch1:", msg)
    case msg := <-ch2: fmt.Println("Dari ch2:", msg)
    case <-time.After(200 * time.Millisecond): fmt.Println("Timeout")
    }
}`,
    objectivesId: [
      'Menjalankan goroutine dengan go keyword (Go Tour: Concurrency)',
      'Unbuffered channel: sinkron, pengirim menunggu penerima',
      'Buffered channel: async sampai buffer penuh',
      'select untuk multiplexing multiple channel',
      'Pipeline pattern: generator → processor → collector',
    ],
    objectivesEn: [
      'Run goroutines with the go keyword (Go Tour: Concurrency)',
      'Unbuffered channels: synchronous, sender waits for receiver',
      'Buffered channels: async until buffer is full',
      'select for multiplexing multiple channels',
      'Pipeline pattern: generator → processor → collector',
    ],
    explanationId: '### Goroutine\n`go f()` — concurrent, ringan, dijadwalkan Go runtime.\n\n### Channel\nUnbuffered (sinkron) vs buffered (async). `ch <- v` kirim, `<-ch` terima.\n\n### Select & Pipeline\n`select` untuk multiplexing. Pipeline: generator → processor → collector.',
    explanationEn: '### Goroutines\n`go f()` — lightweight concurrent functions.\n\n### Channels\nUnbuffered (sync) vs buffered (async).\n\n### Select & Pipeline\nMultiplexing with select. Pipeline pattern.',
    experimentsId: [
      'Buat pipeline 3 stage: generate → double → print',
      'Coba select dengan default case (non-blocking)',
      'Buat fan-in: gabungkan 2 channel ke 1',
      'Implementasikan worker pool dengan WaitGroup',
    ],
    experimentsEn: [
      'Create 3-stage pipeline: generate → double → print',
      'Try select with default case (non-blocking)',
      'Create fan-in: merge 2 channels into 1',
      'Implement worker pool with WaitGroup',
    ],
    challengeId: 'Buat web crawler concurrent: fetch multiple URLs secara paralel dengan goroutine + channel. Batasi concurrency dengan worker pool.',
    challengeEn: 'Build a concurrent web crawler: fetch multiple URLs in parallel with goroutines + channels. Limit concurrency with worker pool.',
    summaryId: 'Minggu 8 dari 13: **Goroutine & Channel** (Level: Menengah). Ini yang membuat Go unik. Minggu depan: **Context & Sinkronisasi**.',
    summaryEn: 'Week 8 of 13: **Goroutines & Channels** (Level: Intermediate). This is what makes Go unique. Next week: **Context & Synchronization**.',
  },
  {
    week: 9, level: 'intermediate', topicId: 'context-sync',
    titleId: 'Context & Sinkronisasi', titleEn: 'Context & Synchronization',
    programId: 'Worker Pool', programEn: 'Worker Pool',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'go',
    code: `package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

func doWork(ctx context.Context, id int, wg *sync.WaitGroup) {
    defer wg.Done()
    select {
    case <-time.After(200 * time.Millisecond):
        fmt.Printf("Worker %d selesai\\n", id)
    case <-ctx.Done():
        fmt.Printf("Worker %d dibatalkan: %v\\n", id, ctx.Err())
    }
}

type Pool struct {
    jobs    chan int
    results chan int
    wg      sync.WaitGroup
}

func NewPool(numWorkers int) *Pool {
    p := &Pool{
        jobs:    make(chan int, 100),
        results: make(chan int, 100),
    }
    for i := 0; i < numWorkers; i++ {
        p.wg.Add(1)
        go p.worker(i)
    }
    return p
}

func (p *Pool) worker(id int) {
    defer p.wg.Done()
    for job := range p.jobs {
        p.results <- job * job
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go doWork(ctx, i, &wg)
    }
    wg.Wait()

    fmt.Println("\\nWorker Pool:")
    pool := NewPool(3)
    go func() {
        for i := 1; i <= 5; i++ { pool.jobs <- i }
        close(pool.jobs)
    }()

    go func() {
        pool.wg.Wait()
        close(pool.results)
    }()

    for r := range pool.results {
        fmt.Printf("Hasil: %d\\n", r)
    }
}`,
    objectivesId: [
      'context.Context untuk cancellation dan timeout',
      'context.WithCancel, WithTimeout, WithDeadline',
      'sync.WaitGroup untuk menunggu goroutine selesai',
      'sync.Mutex untuk proteksi data race',
      'Worker pool pattern dan fan-in/fan-out',
    ],
    objectivesEn: [
      'context.Context for cancellation and timeouts',
      'context.WithCancel, WithTimeout, WithDeadline',
      'sync.WaitGroup to wait for goroutines to finish',
      'sync.Mutex to protect against data races',
      'Worker pool pattern and fan-in/fan-out',
    ],
    explanationId: '### context.Context\nCancellation, timeout, nilai antar API. `WithCancel`, `WithTimeout`.\n\n### sync Package\n`WaitGroup` untuk tunggu goroutine. `Mutex` untuk proteksi data race.\n\n### Worker Pool\nN worker proses jobs dari channel terbatas.',
    explanationEn: '### context.Context\nCancellation and timeouts.\n\n### sync Package\nWaitGroup and Mutex.\n\n### Worker Pool\nBounded concurrency with worker pools.',
    experimentsId: [
      'Buat context dengan value: ctx = context.WithValue(ctx, "key", val)',
      'Coba race condition: hapus Mutex, jalankan dengan -race',
      'Buat fan-out: distribusikan jobs ke multiple workers',
      'Implementasikan graceful shutdown dengan signal handling',
    ],
    experimentsEn: [
      'Create context with value: ctx = context.WithValue(ctx, "key", val)',
      'Try race condition: remove Mutex, run with -race',
      'Create fan-out: distribute jobs to multiple workers',
      'Implement graceful shutdown with signal handling',
    ],
    challengeId: 'Buat HTTP server dengan graceful shutdown: handle SIGINT, cancel context, tunggu active requests selesai.',
    challengeEn: 'Build an HTTP server with graceful shutdown: handle SIGINT, cancel context, wait for active requests to complete.',
    summaryId: 'Minggu 9 dari 13: **Context & Sinkronisasi** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Stdlib: I/O, Time & Encoding** (Advanced).',
    summaryEn: 'Week 9 of 13: **Context & Synchronization** (Level: Intermediate). Intermediate phase complete! Next week: **Stdlib: I/O, Time & Encoding** (Advanced).',
  },
  // ── ADVANCED (weeks 10-13) ────────────────────────────────────────────────
  {
    week: 10, level: 'advanced', topicId: 'stdlib-io-encoding',
    titleId: 'Stdlib: I/O, Time & Encoding', titleEn: 'Stdlib: I/O, Time & Encoding',
    programId: 'Pembaca Log & JSON', programEn: 'Log Reader & JSON',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'go',
    code: `package main

import (
    "bufio"
    "encoding/json"
    "fmt"
    "strings"
    "time"
)

type Task struct {
    ID     int    \`json:"id"\`
    Title  string \`json:"title"\`
    Done   bool   \`json:"done"\`
}

func main() {
    data := "baris pertama\\nbaris kedua\\nbaris ketiga"
    scanner := bufio.NewScanner(strings.NewReader(data))
    lineNum := 1
    for scanner.Scan() {
        fmt.Printf("%d: %s\\n", lineNum, scanner.Text())
        lineNum++
    }

    now := time.Now()
    fmt.Println("\\nSekarang:", now.Format("2006-01-02 15:04:05"))

    tasks := []Task{
        {ID: 1, Title: "Belajar Go", Done: false},
        {ID: 2, Title: "Membuat API", Done: true},
    }
    jsonData, _ := json.MarshalIndent(tasks, "", "  ")
    fmt.Println("\\n=== JSON Output ===")
    fmt.Println(string(jsonData))

    jsonInput := \`[{"id":3,"title":"Testing","done":false}]\`
    var newTasks []Task
    json.Unmarshal([]byte(jsonInput), &newTasks)
    fmt.Println("\\n=== Parsed JSON ===")
    for _, t := range newTasks {
        fmt.Printf("Task %d: %s (done: %v)\\n", t.ID, t.Title, t.Done)
    }
}`,
    objectivesId: [
      'io.Reader dan io.Writer sebagai interface fundamental I/O',
      'bufio.Scanner untuk membaca baris per baris',
      'time: Duration, Format layout, Ticker, Timer',
      'json.Marshal dan json.Unmarshal: Go struct ↔ JSON',
      'Struct tags: `json:"name,omitempty"` untuk kontrol field',
    ],
    objectivesEn: [
      'io.Reader and io.Writer as fundamental I/O interfaces',
      'bufio.Scanner for line-by-line reading',
      'time: Duration, Format layout, Ticker, Timer',
      'json.Marshal and json.Unmarshal: Go struct ↔ JSON',
      'Struct tags: `json:"name,omitempty"` for field control',
    ],
    explanationId: '### io.Reader/Writer\nInterface fundamental I/O. `bufio.Scanner` untuk baca baris.\n\n### time Package\n`time.Now()`, Format layout `2006-01-02 15:04:05`.\n\n### JSON\n`Marshal`/`Unmarshal`. Struct tags: `json:"name,omitempty"`.',
    explanationEn: '### io.Reader/Writer\nFundamental I/O interfaces.\n\n### time Package\nTime formatting with reference layout.\n\n### JSON\nMarshal/Unmarshal with struct tags.',
    experimentsId: [
      'Baca file dengan os.ReadFile dan parse JSON',
      'Buat custom time format: "Monday, 2 January 2006"',
      'Coba json.Encoder untuk streaming write',
      'Buat struct dengan nested JSON dan custom tags',
    ],
    experimentsEn: [
      'Read file with os.ReadFile and parse JSON',
      'Create custom time format: "Monday, 2 January 2006"',
      'Try json.Encoder for streaming write',
      'Create struct with nested JSON and custom tags',
    ],
    challengeId: 'Buat program log parser: baca file log, parse timestamp, filter by level (INFO/ERROR), output sebagai JSON.',
    challengeEn: 'Build a log parser: read log file, parse timestamps, filter by level (INFO/ERROR), output as JSON.',
    summaryId: 'Minggu 10 dari 13: **Stdlib: I/O, Time & Encoding** (Level: Lanjutan). Standard library yang powerful. Minggu depan: **HTTP Server & Middleware**.',
    summaryEn: 'Week 10 of 13: **Stdlib: I/O, Time & Encoding** (Level: Advanced). Powerful standard library. Next week: **HTTP Server & Middleware**.',
  },
  {
    week: 11, level: 'advanced', topicId: 'http-server',
    titleId: 'HTTP Server & Middleware', titleEn: 'HTTP Server & Middleware',
    programId: 'REST API', programEn: 'REST API',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'go',
    code: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Item struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

var items = []Item{
    {ID: 1, Name: "Belajar Go"},
    {ID: 2, Name: "Membuat HTTP Server"},
}

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Printf("[%s] %s %s\\n", r.Method, r.URL.Path, r.RemoteAddr)
        next.ServeHTTP(w, r)
    })
}

func itemsHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    switch r.Method {
    case "GET":
        json.NewEncoder(w).Encode(items)
    case "POST":
        var item Item
        if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        item.ID = len(items) + 1
        items = append(items, item)
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(item)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/items", itemsHandler)
    handler := loggingMiddleware(mux)

    fmt.Println("Server berjalan di :8080")
    fmt.Println("Endpoint: GET/POST /items")

    req := &http.Request{Method: "GET", URL: nil}
    _ = req
    fmt.Printf("\\nSimulasi GET /items -> %d items\\n", len(items))
    for _, item := range items {
        fmt.Printf("  - %d: %s\\n", item.ID, item.Name)
    }
}`,
    objectivesId: [
      'net/http: ServeMux, HandleFunc, ListenAndServe',
      'http.Handler interface dan handler chaining',
      'Middleware pattern: logging, recovery, CORS',
      'JSON API endpoint: encode/decode request body',
      'Routing: path params, query string, method dispatch',
    ],
    objectivesEn: [
      'net/http: ServeMux, HandleFunc, ListenAndServe',
      'http.Handler interface and handler chaining',
      'Middleware pattern: logging, recovery, CORS',
      'JSON API endpoints: encode/decode request body',
      'Routing: path params, query string, method dispatch',
    ],
    explanationId: '### net/http\n`HandleFunc`, `ListenAndServe`. Handler: `func(w, r)`.\n\n### Middleware\nWrap handler: `loggingMiddleware(recoveryMiddleware(handler))`.\n\n### JSON API\n`json.NewEncoder(w).Encode(data)`, `json.NewDecoder(r.Body).Decode(&data)`.',
    explanationEn: '### net/http\nHandleFunc, ListenAndServe.\n\n### Middleware\nHandler wrapping pattern.\n\n### JSON API\nEncode/decode JSON requests and responses.',
    experimentsId: [
      'Tambah endpoint DELETE /items/:id',
      'Buat middleware CORS: set Access-Control-Allow-Origin',
      'Tambah query string filter: /items?limit=10',
      'Implementasikan graceful shutdown dengen Shutdown()',
    ],
    experimentsEn: [
      'Add DELETE /items/:id endpoint',
      'Create CORS middleware: set Access-Control-Allow-Origin',
      'Add query string filter: /items?limit=10',
      'Implement graceful shutdown with Shutdown()',
    ],
    challengeId: 'Buat REST API lengkap untuk Task Manager: CRUD endpoints, middleware (logging, auth), JSON responses, proper HTTP status codes.',
    challengeEn: 'Build a complete REST API for Task Manager: CRUD endpoints, middleware (logging, auth), JSON responses, proper HTTP status codes.',
    summaryId: 'Minggu 11 dari 13: **HTTP Server & Middleware** (Level: Lanjutan). Backend development dengan Go. Minggu depan: **Testing & CLI Tools**.',
    summaryEn: 'Week 11 of 13: **HTTP Server & Middleware** (Level: Advanced). Backend development with Go. Next week: **Testing & CLI Tools**.',
  },
  {
    week: 12, level: 'advanced', topicId: 'testing-cli',
    titleId: 'Testing & CLI Tools', titleEn: 'Testing & CLI Tools',
    programId: 'Unit Test & Flag', programEn: 'Unit Test & Flags',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'go',
    code: `package main

import (
    "flag"
    "fmt"
)

func Add(a, b int) int { return a + b }

func Divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

func main() {
    name := flag.String("name", "World", "Nama untuk sapaan")
    count := flag.Int("count", 1, "Jumlah pengulangan")
    verbose := flag.Bool("v", false, "Mode verbose")

    fmt.Println("=== CLI Flag (simulasi) ===")
    fmt.Printf("Name: %s, Count: %d, Verbose: %v\\n", *name, *count, *verbose)

    for i := 0; i < *count; i++ {
        fmt.Printf("Halo, %s! (%d)\\n", *name, i+1)
    }

    fmt.Println("\\n=== Test Simulation ===")
    fmt.Printf("Add(2,3) = %d (expected 5)\\n", Add(2, 3))
    fmt.Printf("Add(-1,-1) = %d (expected -2)\\n", Add(-1, -1))

    result, err := Divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("Divide(10,2) = %.1f\\n", result)
    }

    _, err = Divide(5, 0)
    if err != nil {
        fmt.Println("Divide(5,0) error:", err)
    }
}`,
    objectivesId: [
      'testing package: func TestXxx(t *testing.T)',
      'Table-driven tests: array struct input/expect (Effective Go)',
      'httptest.NewRecorder dan httptest.NewServer untuk HTTP test',
      'flag package: flag.String, flag.Int, flag.Parse',
      'go test -cover, -race, -bench untuk kualitas kode',
    ],
    objectivesEn: [
      'testing package: func TestXxx(t *testing.T)',
      'Table-driven tests: struct array input/expect (Effective Go)',
      'httptest.NewRecorder and httptest.NewServer for HTTP tests',
      'flag package: flag.String, flag.Int, flag.Parse',
      'go test -cover, -race, -bench for code quality',
    ],
    explanationId: '### Testing\n`func TestXxx(t *testing.T)`. Table-driven tests dengan `t.Run`.\n\n### httptest\n`NewRecorder()` mock ResponseWriter, `NewServer()` untuk integration test.\n\n### flag Package\n`flag.String`, `flag.Int`, `flag.Parse`.',
    explanationEn: '### Testing\nTest functions and table-driven tests.\n\n### httptest\nMock ResponseWriter and test server.\n\n### flag Package\nCLI flag definitions.',
    experimentsId: [
      'Buat table-driven test untuk Add dan Divide',
      'Coba benchmark: func BenchmarkAdd(b *testing.B)',
      'Buat test dengan httptest.NewRecorder',
      'Implementasikan sub-tests dengan t.Run',
    ],
    experimentsEn: [
      'Create table-driven tests for Add and Divide',
      'Try benchmark: func BenchmarkAdd(b *testing.B)',
      'Create test with httptest.NewRecorder',
      'Implement sub-tests with t.Run',
    ],
    challengeId: 'Buat CLI tool dengan flag: calculator (add, sub, mul, div) dengan proper error handling dan unit tests.',
    challengeEn: 'Build a CLI tool with flags: calculator (add, sub, mul, div) with proper error handling and unit tests.',
    summaryId: 'Minggu 12 dari 13: **Testing & CLI Tools** (Level: Lanjutan). Kualitas kode dan tooling. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 12 of 13: **Testing & CLI Tools** (Level: Advanced). Code quality and tooling. Next week: **Capstone Project**!',
  },
  {
    week: 13, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: REST API + CLI', titleEn: 'Capstone: REST API + CLI',
    programId: 'Manajemen Catatan', programEn: 'Note Manager',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'go',
    code: `package main

import (
    "encoding/json"
    "fmt"
    "os"
    "sort"
)

type Note struct {
    ID      int    \`json:"id"\`
    Title   string \`json:"title"\`
    Content string \`json:"content"\`
}

type NoteManager struct {
    notes  []Note
    nextID int
}

func New() *NoteManager {
    return &NoteManager{notes: []Note{}, nextID: 1}
}

func (nm *NoteManager) Add(title, content string) Note {
    n := Note{ID: nm.nextID, Title: title, Content: content}
    nm.nextID++
    nm.notes = append(nm.notes, n)
    return n
}

func (nm *NoteManager) Get(id int) (Note, bool) {
    for _, n := range nm.notes {
        if n.ID == id { return n, true }
    }
    return Note{}, false
}

func (nm *NoteManager) Delete(id int) bool {
    for i, n := range nm.notes {
        if n.ID == id {
            nm.notes = append(nm.notes[:i], nm.notes[i+1:]...)
            return true
        }
    }
    return false
}

func (nm *NoteManager) List() []Note {
    sort.Slice(nm.notes, func(i, j int) bool {
        return nm.notes[i].ID < nm.notes[j].ID
    })
    return nm.notes
}

func (nm *NoteManager) SaveJSON(filename string) error {
    data, err := json.MarshalIndent(nm.notes, "", "  ")
    if err != nil { return fmt.Errorf("marshal error: %w", err) }
    return os.WriteFile(filename, data, 0644)
}

func main() {
    nm := New()
    nm.Add("Belajar Go", "Materi package, function, dan testing")
    nm.Add("REST API", "Buat handler dengan net/http")
    nm.Add("CLI Tool", "Gunakan package flag")

    fmt.Println("=== Daftar Catatan ===")
    for _, n := range nm.List() {
        fmt.Printf("%d. %s\\n  %s\\n", n.ID, n.Title, n.Content)
    }

    fmt.Println("\\n=== CLI Flag (simulasi) ===")
    fmt.Println("go run note.go -add 'Judul Baru'")
    fmt.Println("go run note.go -list")
    fmt.Println("go run note.go -delete 1")

    filename := "notes.json"
    if err := nm.SaveJSON(filename); err != nil {
        fmt.Println("Save error:", err)
    } else {
        fmt.Printf("\\nData tersimpan ke %s\\n", filename)
    }

    args := []string{"note", "-list"}
    if len(args) > 1 && args[1] == "-list" {
        fmt.Println("\\n=== Hasil CLI: -list ===")
        for _, n := range nm.List() {
            fmt.Printf("[%d] %s\\n", n.ID, n.Title)
        }
    }
}`,
    objectivesId: [
      'Menggabungkan semua konsep: struct, interface, concurrency, HTTP',
      'Repository pattern: pemisahan data access dan business logic',
      'CLI dengan flag + REST API dengan net/http',
      'Penyimpanan data JSON file dan in-memory',
      'Testing: unit test, table-driven test, HTTP test',
    ],
    objectivesEn: [
      'Combine all concepts: structs, interfaces, concurrency, HTTP',
      'Repository pattern: separate data access and business logic',
      'CLI with flags + REST API with net/http',
      'JSON file and in-memory data storage',
      'Testing: unit tests, table-driven tests, HTTP tests',
    ],
    explanationId: '### Repository Pattern\nPemisahan data access dan business logic.\n\n### CLI + REST API\nSatu binary untuk server dan CLI tool.\n\n### Testing Integration\nUnit test, table-driven test, HTTP test, coverage.',
    explanationEn: '### Repository Pattern\nSeparate data access from business logic.\n\n### CLI + REST API\nSingle binary for both.\n\n### Testing Integration\nUnit, table-driven, HTTP tests.',
    experimentsId: [
      'Tambah method Update untuk NoteManager',
      'Implementasikan LoadJSON untuk load dari file',
      'Buat HTTP handler untuk NoteManager',
      'Tambah unit test untuk semua method',
    ],
    experimentsEn: [
      'Add Update method for NoteManager',
      'Implement LoadJSON to load from file',
      'Create HTTP handler for NoteManager',
      'Add unit tests for all methods',
    ],
    challengeId: 'Buat aplikasi capstone lengkap: REST API + CLI + JSON storage + testing. Pilih domain: Task Manager, Blog, atau Inventory.',
    challengeEn: 'Build a complete capstone application: REST API + CLI + JSON storage + testing. Choose domain: Task Manager, Blog, or Inventory.',
    summaryId: 'Minggu 13 dari 13: **Capstone: REST API + CLI** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Go dari nol hingga production-ready.',
    summaryEn: 'Week 13 of 13: **Capstone: REST API + CLI** (Level: Advanced). Complete! 🎉 You\'ve mastered Go from scratch to production-ready.',
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
