import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/golang/go');

const MODULES = [
  { id: 1,  f: 'pengenalan-go',    lid: 'Pengenalan Go & Toolchain',         len: 'Introduction to Go & Toolchain',        pid: 'Halo Go',            pen: 'Hello Go' },
  { id: 2,  f: 'variabel-tipe',     lid: 'Variabel, Tipe & Konstanta',        len: 'Variables, Types & Constants',         pid: 'Data Diri',          pen: 'Personal Data' },
  { id: 3,  f: 'control-flow',      lid: 'Control Flow: if, for, switch',    len: 'Control Flow: if, for, switch',        pid: 'Bilangan Prima',     pen: 'Prime Numbers' },
  { id: 4,  f: 'fungsi-error',      lid: 'Fungsi & Error Handling',           len: 'Functions & Error Handling',           pid: 'Kalkulator',         pen: 'Calculator' },
  { id: 5,  f: 'array-slice-map',   lid: 'Array, Slice & Map',               len: 'Arrays, Slices & Maps',                pid: 'Manajemen Data',     pen: 'Data Manager' },
  { id: 6,  f: 'struct-method',     lid: 'Struct & Method',                   len: 'Structs & Methods',                    pid: 'Data Produk',        pen: 'Product Data' },
  { id: 7,  f: 'interface-generik', lid: 'Interface & Generik',               len: 'Interfaces & Generics',                pid: 'Polimorfisme',       pen: 'Polymorphism' },
  { id: 8,  f: 'pointer-memory',    lid: 'Pointer & Memory Model',            len: 'Pointers & Memory Model',              pid: 'Manipulasi Nilai',   pen: 'Value Manipulation' },
  { id: 9,  f: 'package-module',    lid: 'Package & Module',                  len: 'Packages & Modules',                   pid: 'Struktur Proyek',    pen: 'Project Structure' },
  { id: 10, f: 'goroutine-basic',   lid: 'Goroutine & WaitGroup',            len: 'Goroutines & WaitGroups',              pid: 'Unduhan Paralel',    pen: 'Parallel Downloads' },
  { id: 11, f: 'channel-select',    lid: 'Channel & Select',                  len: 'Channels & Select',                    pid: 'Pipeline Data',      pen: 'Data Pipeline' },
  { id: 12, f: 'context-sync',      lid: 'Context & Sinkronisasi Lanjutan',   len: 'Context & Advanced Sync',              pid: 'Worker Pool',        pen: 'Worker Pool' },
  { id: 13, f: 'stdlib-io',         lid: 'Standard Library: I/O & Waktu',     len: 'Standard Library: I/O & Time',         pid: 'Pembaca Log',        pen: 'Log Reader' },
  { id: 14, f: 'encoding-data',     lid: 'Encoding: JSON & Data',            len: 'Encoding: JSON & Data',                pid: 'Marshal Data',       pen: 'Data Marshal' },
  { id: 15, f: 'http-testing',      lid: 'HTTP Server & Testing',             len: 'HTTP Server & Testing',                pid: 'API Task',           pen: 'Task API' },
  { id: 16, f: 'proyek-akhir',      lid: 'Proyek Akhir: CLI + API',          len: 'Final Project: CLI + API',             pid: 'Manajemen Catatan',  pen: 'Note Manager' },
];

const OBJ = {
  1: { id: ['Memahami peran Go sebagai bahasa compiled untuk backend', 'Menginstall Go dan menulis program pertama', 'Mengenal toolchain: go run, build, fmt, test', 'Memahami struktur file .go dan func main', 'Menggunakan fmt.Println dan fmt.Printf'], en: ['Understand Go as a compiled backend language', 'Install Go and write your first program', 'Learn the toolchain: go run, build, fmt, test', 'Understand .go file structure and func main', 'Use fmt.Println and fmt.Printf'] },
  2: { id: ['Mendeklarasikan variabel dengan var dan :=', 'Mengenal tipe dasar: int, float64, string, bool', 'Memahami zero values dan type inference', 'Membuat konstanta dengan const dan iota', 'Menggunakan fmt.Print, Println, Printf'], en: ['Declare variables with var and :=', 'Learn basic types: int, float64, string, bool', 'Understand zero values and type inference', 'Create constants with const and iota', 'Use fmt.Print, Println, Printf'] },
  3: { id: ['Menerapkan if/else dengan short statement', 'Menguasai for loop (classic, while, infinite)', 'Menggunakan switch tanpa break', 'Memahami scope dan block', 'Menggunakan label dan break/continue'], en: ['Apply if/else with short statement', 'Master for loops (classic, while, infinite)', 'Use switch without break', 'Understand scope and blocks', 'Use labels and break/continue'] },
  4: { id: ['Membuat fungsi dengan parameter dan return', 'Menggunakan multiple return dan named return', 'Mengenal tipe error dan error handling idiom', 'Membuat custom error dengan fmt.Errorf', 'Menulis fungsi variadic dan defer'], en: ['Create functions with parameters and returns', 'Use multiple returns and named returns', 'Learn the error type and error handling idiom', 'Create custom errors with fmt.Errorf', 'Write variadic functions and defer'] },
  5: { id: ['Membedakan array fixed vs slice dinamis', 'Menggunakan append, make, len, cap', 'Memanipulasi map dengan ok idiom', 'Mengiterasi dengan range', 'Melakukan slicing dan copy'], en: ['Distinguish fixed arrays vs dynamic slices', 'Use append, make, len, cap', 'Manipulate maps with the ok idiom', 'Iterate with range', 'Perform slicing and copy'] },
  6: { id: ['Mendefinisikan struct dengan field', 'Menambahkan method value dan pointer receiver', 'Menggunakan embedded fields', 'Menerapkan struct tags', 'Membuat constructor function'], en: ['Define structs with fields', 'Add value and pointer receiver methods', 'Use embedded fields', 'Apply struct tags', 'Create constructor functions'] },
  7: { id: ['Mendefinisikan interface implisit', 'Menggunakan interface sebagai parameter', 'Menerapkan empty interface (any)', 'Melakukan type assertion dan type switch', 'Menggunakan generics (type parameters)'], en: ['Define interfaces with implicit satisfaction', 'Use interfaces as parameters', 'Apply empty interfaces (any)', 'Perform type assertions and type switches', 'Use generics with type parameters'] },
  8: { id: ['Memahami operator & dan *', 'Membedakan pass by value vs pointer', 'Menggunakan pointer ke struct', 'Memahami stack vs heap', 'Menerapkan nil safety'], en: ['Understand & and * operators', 'Distinguish pass by value vs pointer', 'Use pointers to structs', 'Understand stack vs heap', 'Apply nil safety'] },
  9: { id: ['Membuat package dan module sendiri', 'Mengatur visibility (exported/unexported)', 'Menggunakan go.mod dan go.sum', 'Mengimpor package eksternal', 'Mengelola dependencies'], en: ['Create your own packages and modules', 'Manage visibility (exported/unexported)', 'Use go.mod and go.sum', 'Import external packages', 'Manage dependencies'] },
  10: { id: ['Menjalankan goroutine dengan go keyword', 'Mensinkronisasi dengan sync.WaitGroup', 'Mengamankan akses dengan sync.Mutex', 'Mendeteksi race condition dengan -race', 'Memahami concurrency model Go'], en: ['Run goroutines with the go keyword', 'Synchronize with sync.WaitGroup', 'Protect access with sync.Mutex', 'Detect race conditions with -race', 'Understand Go concurrency model'] },
  11: { id: ['Membuat unbuffered dan buffered channel', 'Mengirim (ch <-) dan menerima (<-ch) data', 'Menggunakan select untuk multiplexing', 'Menerapkan pipeline pattern', 'Menggunakan close dan range channel'], en: ['Create unbuffered and buffered channels', 'Send (ch <-) and receive (<-ch) data', 'Use select for multiplexing', 'Apply the pipeline pattern', 'Use close and range over channels'] },
  12: { id: ['Menggunakan context untuk cancellation', 'Menerapkan context.WithTimeout', 'Menggunakan errgroup untuk error propagation', 'Membuat worker pool pattern', 'Menerapkan fan-in/fan-out'], en: ['Use context for cancellation', 'Apply context.WithTimeout', 'Use errgroup for error propagation', 'Create the worker pool pattern', 'Apply fan-in/fan-out'] },
  13: { id: ['Memahami io.Reader dan io.Writer', 'Membaca file dengan os dan bufio', 'Memanipulasi string dan strconv', 'Menggunakan time (Duration, Format, Ticker)', 'Menerapkan log dan log/slog'], en: ['Understand io.Reader and io.Writer', 'Read files with os and bufio', 'Manipulate strings and strconv', 'Use time (Duration, Format, Ticker)', 'Apply log and log/slog'] },
  14: { id: ['Marshaling dan Unmarshaling JSON', 'Menggunakan JSON struct tags', 'Bekerja dengan encoding/csv', 'Menggunakan sort package', 'Menerapkan encoding/base64'], en: ['Marshal and Unmarshal JSON', 'Use JSON struct tags', 'Work with encoding/csv', 'Use the sort package', 'Apply encoding/base64'] },
  15: { id: ['Membuat HTTP handler dan ServeMux', 'Menerapkan middleware pattern', 'Menulis test dengan testing package', 'Membuat table-driven test', 'Menggunakan httptest untuk HTTP test'], en: ['Create HTTP handlers and ServeMux', 'Apply the middleware pattern', 'Write tests with the testing package', 'Create table-driven tests', 'Use httptest for HTTP testing'] },
  16: { id: ['Menggabungkan semua konsep Go', 'Membangun CLI tool dengan flag', 'Membuat REST API endpoint', 'Menyimpan data dengan JSON file', 'Menulis test untuk seluruh aplikasi'], en: ['Combine all Go concepts', 'Build a CLI tool with flags', 'Create REST API endpoints', 'Store data with JSON files', 'Write tests for the entire app'] },
};

const CODE = {
  1: `package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Go adalah bahasa compiled, statically typed.")

    // Deklarasi variabel
    var nama string = "Gopher"
    versi := 1.24
    aktif := true

    // fmt.Printf dengan verb
    fmt.Printf("Nama: %s\\n", nama)
    fmt.Printf("Versi: %.2f\\n", versi)
    fmt.Printf("Aktif: %t\\n", aktif)
    fmt.Printf("Tipe: %T %T %T\\n", nama, versi, aktif)
}`,

  2: `package main

import "fmt"

func main() {
    // var declaration
    var name string = "Budi"
    var age int = 25
    var height float64 = 175.5

    // short declaration
    city := "Jakarta"
    isStudent := false

    // Zero values
    var zeroInt int
    var zeroStr string
    var zeroBool bool

    fmt.Println("=== Variabel ===")
    fmt.Printf("Nama: %s, Umur: %d, Tinggi: %.1f\\n", name, age, height)
    fmt.Printf("Kota: %s, Pelajar: %t\\n", city, isStudent)

    fmt.Println("\\n=== Zero Values ===")
    fmt.Printf("int: %d, string: %q, bool: %t\\n", zeroInt, zeroStr, zeroBool)

    // Constants
    const pi = 3.14159
    const greeting = "Halo Go!"

    // iota
    const (
        Red = iota
        Green
        Blue
    )
    fmt.Printf("\\nKonstanta: %s, Pi = %.5f\\n", greeting, pi)
    fmt.Printf("Warna: Red=%d, Green=%d, Blue=%d\\n", Red, Green, Blue)
}`,

  3: `package main

import "fmt"

func main() {
    // if/else dengan short statement
    score := 85
    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 75 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: C")
    }

    // for classic
    fmt.Println("\\n=== For Classic ===")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    // for while-style
    fmt.Println("\\n=== For While ===")
    n := 1
    for n <= 3 {
        fmt.Printf("%d ", n)
        n++
    }
    fmt.Println()

    // for infinite + break
    fmt.Println("\\n=== Break ===")
    sum := 0
    for {
        sum++
        if sum > 5 {
            break
        }
        fmt.Printf("%d ", sum)
    }
    fmt.Println()

    // switch
    day := 3
    switch day {
    case 1:
        fmt.Println("Senin")
    case 2:
        fmt.Println("Selasa")
    case 3:
        fmt.Println("Rabu")
    default:
        fmt.Println("Hari lain")
    }

    // tagless switch
    x := 10
    switch {
    case x < 10:
        fmt.Println("Kecil")
    case x == 10:
        fmt.Println("Tepat 10")
    default:
        fmt.Println("Besar")
    }
}`,

  4: `package main

import (
    "errors"
    "fmt"
)

// Fungsi dengan multiple return
func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa dibagi nol")
    }
    return a / b, nil
}

// Named return
func hitung(a, b int) (jumlah int, kali int) {
    jumlah = a + b
    kali = a * b
    return // naked return
}

// Variadic function
func rataRata(angka ...float64) float64 {
    total := 0.0
    for _, n := range angka {
        total += n
    }
    return total / float64(len(angka))
}

// Defer
func main() {
    defer fmt.Println("Program selesai")

    // Error handling
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

    // Named return
    j, k := hitung(4, 5)
    fmt.Printf("Jumlah: %d, Kali: %d\\n", j, k)

    // Variadic
    r := rataRata(80, 90, 75, 85)
    fmt.Printf("Rata-rata: %.1f\\n", r)
}`,

  5: `package main

import "fmt"

func main() {
    // Array (fixed size)
    var arr [3]int = [3]int{1, 2, 3}
    fmt.Println("Array:", arr)

    // Slice (dynamic)
    fruits := []string{"apel", "mangga", "pisang"}
    fruits = append(fruits, "jeruk")
    fmt.Println("Slice:", fruits)
    fmt.Printf("Len: %d, Cap: %d\\n", len(fruits), cap(fruits))

    // Make slice
    scores := make([]int, 3, 5)
    scores[0] = 85
    scores[1] = 90
    scores[2] = 78
    fmt.Println("Scores:", scores)

    // Slicing
    angka := []int{10, 20, 30, 40, 50}
    sub := angka[1:4]
    fmt.Println("Sub-slice [1:4]:", sub)

    // Map
    ages := make(map[string]int)
    ages["Budi"] = 25
    ages["Siti"] = 23

    // ok idiom
    val, ok := ages["Budi"]
    if ok {
        fmt.Printf("Umur Budi: %d\\n", val)
    }

    // Delete
    delete(ages, "Siti")

    // Range
    fmt.Println("\\n=== Range ===")
    for i, v := range fruits {
        fmt.Printf("%d: %s\\n", i, v)
    }

    for key, val := range ages {
        fmt.Printf("%s -> %d\\n", key, val)
    }
}`,

  6: `package main

import "fmt"

// Struct definition
type Product struct {
    ID    int
    Name  string
    Price float64
    Stock int
}

// Value receiver method
func (p Product) Info() string {
    return fmt.Sprintf("%s: Rp%.0f (stok: %d)", p.Name, p.Price, p.Stock)
}

// Pointer receiver method
func (p *Product) ApplyDiscount(percent float64) {
    p.Price -= p.Price * (percent / 100)
}

// Embedded struct
type Electronics struct {
    Product
    WarrantyYears int
}

// Constructor
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

  7: `package main

import "fmt"

// Interface definition — implemented implicitly
type Speaker interface {
    Speak() string
}

type Dog struct{ Name string }
func (d Dog) Speak() string { return "Woof! I'm " + d.Name }

type Cat struct{ Name string }
func (c Cat) Speak() string { return "Meow! I'm " + c.Name }

// Interface as parameter
func MakeSound(s Speaker) {
    fmt.Println(s.Speak())
}

// Empty interface (any)
func PrintAny(v any) {
    switch val := v.(type) {
    case int:
        fmt.Printf("Integer: %d\\n", val)
    case string:
        fmt.Printf("String: %s\\n", val)
    default:
        fmt.Printf("Unknown: %T - %v\\n", val, val)
    }
}

// Generics
func First[T any](items []T) T {
    return items[0]
}

type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

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

  8: `package main

import "fmt"

func zeroVal(val int) {
    val = 0
}

func zeroPtr(ptr *int) {
    *ptr = 0
}

type Person struct {
    Name string
    Age  int
}

func updatePerson(p *Person) {
    p.Age = 30
}

func main() {
    x := 42
    fmt.Printf("Nilai x: %d\\n", x)
    fmt.Printf("Alamat x: %p\\n", &x)

    // Pass by value
    zeroVal(x)
    fmt.Println("Setelah zeroVal:", x) // masih 42

    // Pass by pointer
    zeroPtr(&x)
    fmt.Println("Setelah zeroPtr:", x) // 0

    // Pointer ke struct
    p := Person{Name: "Budi", Age: 25}
    updatePerson(&p)
    fmt.Printf("%s berumur %d\\n", p.Name, p.Age)

    // new function
    num := new(int)
    *num = 100
    fmt.Println("Melalui new:", *num)

    // Nil safety
    var ptr *int
    if ptr != nil {
        fmt.Println(*ptr)
    } else {
        fmt.Println("Pointer nil, aman")
    }
}`,

  9: `package main

import (
    "fmt"
    "math"
    "strings"
)

// Exported function (huruf besar)
func Greet(name string) string {
    return "Hello, " + name + "!"
}

// Unexported function (huruf kecil)
func formatNumber(n float64) string {
    return fmt.Sprintf("%.2f", n)
}

func main() {
    // Menggunakan package math
    fmt.Println("Pi:", math.Pi)
    fmt.Println("Sin(0):", math.Sin(0))
    fmt.Println("Sqrt(16):", math.Sqrt(16))

    // Menggunakan package strings
    text := "Go Programming Language"
    fmt.Println("Upper:", strings.ToUpper(text))
    fmt.Println("Contains 'Go':", strings.Contains(text, "Go"))
    fmt.Println("Split:", strings.Split(text, " "))

    // Package sendiri
    msg := Greet("Budi")
    fmt.Println(msg)

    // Unexported — hanya bisa dipakai dalam package yang sama
    fmt.Println("Formatted:", formatNumber(3.14159))

    // go.mod example (simulated)
    fmt.Println("\\nModule: contoh-module")
    fmt.Println("Go version: go 1.22")
}`,

  10: `package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d mulai\\n", id)
    time.Sleep(100 * time.Millisecond)
    fmt.Printf("Worker %d selesai\\n", id)
}

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    // WaitGroup
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    wg.Wait()
    fmt.Println("Semua worker selesai")

    // Mutex
    counter := Counter{}
    var wg2 sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            counter.Increment()
        }()
    }
    wg2.Wait()
    fmt.Printf("Counter: %d (seharusnya 1000)\\n", counter.Value())
}`,

  11: `package main

import (
    "fmt"
    "time"
)

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    // Unbuffered channel
    ch := make(chan string)
    go func() {
        ch <- "Halo dari goroutine"
    }()
    msg := <-ch
    fmt.Println("Channel:", msg)

    // Buffered channel
    buf := make(chan int, 3)
    buf <- 1
    buf <- 2
    buf <- 3
    fmt.Println("Buffered:", <-buf, <-buf, <-buf)

    // Pipeline pattern
    fmt.Println("\\nPipeline:")
    nums := generate(1, 2, 3, 4, 5)
    squares := square(nums)
    for s := range squares {
        fmt.Printf("%d ", s)
    }
    fmt.Println()

    // Select
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
    case msg := <-ch1:
        fmt.Println("Dari ch1:", msg)
    case msg := <-ch2:
        fmt.Println("Dari ch2:", msg)
    case <-time.After(200 * time.Millisecond):
        fmt.Println("Timeout")
    }
}`,

  12: `package main

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

// Worker pool
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
    // Context timeout
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go doWork(ctx, i, &wg)
    }
    wg.Wait()

    // Worker pool
    fmt.Println("\\nWorker Pool:")
    pool := NewPool(3)
    go func() {
        for i := 1; i <= 5; i++ {
            pool.jobs <- i
        }
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

  13: `package main

import (
    "bufio"
    "fmt"
    "log"
    "strings"
    "time"
)

// io.Reader with strings
func processData(data string) {
    scanner := bufio.NewScanner(strings.NewReader(data))
    lineNum := 1
    for scanner.Scan() {
        line := scanner.Text()
        fmt.Printf("%d: %s\\n", lineNum, line)
        lineNum++
    }
}

func main() {
    // String manipulation
    text := "  Go Programming Language  "
    fmt.Println("Trimmed:", strings.TrimSpace(text))
    fmt.Println("Replace:", strings.ReplaceAll(text, "Go", "Go"))
    fmt.Println("Fields:", strings.Fields(text))

    // strconv (simulasi)
    numStr := "42"
    var num int = 0
    _, _ = fmt.Sscanf(numStr, "%d", &num)
    fmt.Printf("Parsed int: %d\\n", num)

    // bufio.Scanner
    data := "baris pertama\\nbaris kedua\\nbaris ketiga"
    fmt.Println("\\n=== Scanner ===")
    processData(data)

    // time
    now := time.Now()
    fmt.Println("\\nSekarang:", now.Format("2006-01-02 15:04:05"))
    fmt.Println("Tanggal:", now.Format("Monday, 2 January 2006"))

    duration := 2*time.Hour + 30*time.Minute
    fmt.Printf("Durasi: %v (menit: %.0f)\\n", duration, duration.Minutes())

    // log
    log.Println("Aplikasi berjalan")
    log.Printf("Memproses %d item\\n", 10)
}`,

  14: `package main

import (
    "encoding/json"
    "fmt"
    "sort"
)

type Task struct {
    ID     int    \`json:"id"\`
    Title  string \`json:"title"\`
    Done   bool   \`json:"done"\`
    Priority int  \`json:"priority"\`
}

func main() {
    // Marshal (struct -> JSON)
    tasks := []Task{
        {ID: 1, Title: "Belajar Go", Done: false, Priority: 1},
        {ID: 2, Title: "Membuat API", Done: true, Priority: 2},
    }

    jsonData, err := json.MarshalIndent(tasks, "", "  ")
    if err != nil {
        fmt.Println("Error marshaling:", err)
        return
    }
    fmt.Println("=== JSON Output ===")
    fmt.Println(string(jsonData))

    // Unmarshal (JSON -> struct)
    jsonInput := \`[{"id":3,"title":"Testing","done":false,"priority":3}]\`
    var newTasks []Task
    err = json.Unmarshal([]byte(jsonInput), &newTasks)
    if err != nil {
        fmt.Println("Error unmarshaling:", err)
        return
    }
    fmt.Println("\\n=== Parsed JSON ===")
    for _, t := range newTasks {
        fmt.Printf("Task %d: %s (done: %v)\\n", t.ID, t.Title, t.Done)
    }

    // Sort
    nums := []int{5, 2, 8, 1, 9}
    sort.Ints(nums)
    fmt.Println("\\nSorted:", nums)

    names := []string{"Budi", "Alex", "Siti"}
    sort.Strings(names)
    fmt.Println("Sorted names:", names)

    // Custom sort by priority
    sort.Slice(tasks, func(i, j int) bool {
        return tasks[i].Priority < tasks[j].Priority
    })
    fmt.Println("By priority:")
    for _, t := range tasks {
        fmt.Printf("  %s (prioritas %d)\\n", t.Title, t.Priority)
    }
}`,

  15: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "strings"
)

type Item struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

// In-memory store
var items = []Item{
    {ID: 1, Name: "Belajar Go"},
    {ID: 2, Name: "Membuat HTTP Server"},
}

// Middleware
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Printf("[%s] %s %s\\n", r.Method, r.URL.Path, r.RemoteAddr)
        next.ServeHTTP(w, r)
    })
}

// Handler
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
    fmt.Println("\\nJalankan dengan 'go run' untuk test sebenarnya")
    fmt.Println("Contoh: curl http://localhost:8080/items")

    // Simulasi langsung
    req := &http.Request{Method: "GET", URL: nil}
    _ = req
    fmt.Printf("\\nSimulasi request GET /items -> %d items\\n", len(items))
    for _, item := range items {
        fmt.Printf("  - %d: %s\\n", item.ID, item.Name)
    }

    // Test function (simulasi)
    testGetItems()
}

// Simulasi table-driven test
func testGetItems() {
    tests := []struct {
        name string
        method string
        want int
    }{
        {"get all items", "GET", 2},
    }
    for _, tt := range tests {
        fmt.Printf("Test: %s -> expected %d items\\n", tt.name, tt.want)
        _ = strings.ToUpper(tt.method)
    }
}`,

  16: `package main

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
    notes []Note
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
        if n.ID == id {
            return n, true
        }
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
    if err != nil {
        return fmt.Errorf("marshal error: %w", err)
    }
    return os.WriteFile(filename, data, 0644)
}

func (nm *NoteManager) LoadJSON(filename string) error {
    data, err := os.ReadFile(filename)
    if err != nil {
        return fmt.Errorf("read error: %w", err)
    }
    return json.Unmarshal(data, &nm.notes)
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
    fmt.Println("Go run note.go -add 'Judul Baru'")
    fmt.Println("Go run note.go -list")
    fmt.Println("Go run note.go -delete 1")

    // Simpan ke JSON
    filename := "notes.json"
    if err := nm.SaveJSON(filename); err != nil {
        fmt.Println("Save error:", err)
    } else {
        fmt.Printf("\\nData tersimpan ke %s\\n", filename)
    }

    // CLI-like command simulation
    args := []string{"note", "-list"}
    if len(args) > 1 && args[1] == "-list" {
        fmt.Println("\\n=== Hasil CLI: -list ===")
        for _, n := range nm.List() {
            fmt.Printf("[%d] %s\\n", n.ID, n.Title)
        }
    }
}`,
};

function getExplanation(mod, isId) {
  const E = {
    1: { id: 'Go adalah bahasa compiled, statically typed yang dikembangkan Google. Toolchain utama: `go run` (jalankan langsung), `go build` (kompilasi ke binary), `go fmt` (format kode), `go test` (jalankan test). Struktur file Go: `package main`, `import`, `func main()`. `fmt.Println` mencetak dengan newline, `fmt.Printf` dengan format verb.', en: 'Go is a compiled, statically typed language developed by Google. Main toolchain: `go run` (run directly), `go build` (compile to binary), `go fmt` (format code), `go test` (run tests). Go file structure: `package main`, `import`, `func main()`. `fmt.Println` prints with newline, `fmt.Printf` uses format verbs.' },
    2: { id: '`var nama tipe = nilai` untuk deklarasi eksplisit. `:=` untuk short declaration dengan type inference. Tipe dasar: `int`, `float64`, `string`, `bool`. Zero values: 0 untuk numerik, "" untuk string, false untuk bool. `const` untuk konstanta. `iota` untuk increment otomatis dalam blok const.', en: '`var name type = value` for explicit declaration. `:=` for short declaration with type inference. Basic types: `int`, `float64`, `string`, `bool`. Zero values: 0 for numeric, "" for string, false for bool. `const` for constants. `iota` for auto-increment in const blocks.' },
    3: { id: '`if` bisa punya short statement: `if x := 10; x > 5 {}`. `for` adalah satu-satunya loop di Go — bisa classic, while-style, atau infinite. `switch` tidak perlu `break`; setiap case berhenti otomatis. Tagless switch bisa untuk kondisi kompleks. `defer` menjadwalkan eksekusi fungsi setelah fungsi sekitarnya selesai.', en: '`if` can have a short statement: `if x := 10; x > 5 {}`. `for` is the only loop in Go — classic, while-style, or infinite. `switch` doesn\'t need `break`; each case stops automatically. Tagless switch works for complex conditions. `defer` schedules function execution after the surrounding function returns.' },
    4: { id: 'Fungsi Go bisa multiple return values. Error handling idiomatis: `if err != nil { return err }`. `fmt.Errorf` dengan `%w` untuk wrapping error. `defer` dipakai untuk cleanup (tutup file, unlock mutex). Variadic function: `func sum(nums ...int)`. Named return memudahkan dokumentasi.', en: 'Go functions can return multiple values. Idiomatic error handling: `if err != nil { return err }`. `fmt.Errorf` with `%w` for error wrapping. `defer` is used for cleanup (close files, unlock mutex). Variadic functions: `func sum(nums ...int)`. Named returns improve documentation.' },
    5: { id: 'Array: `[3]int` — fixed size, jarang langsung dipakai. Slice: `[]int` — dynamic, backbone Go. `append` untuk menambah, `make` untuk alokasi. Map: `map[string]int` — key-value, dengan ok idiom untuk cek keberadaan. `range` untuk iterasi slice, map, channel.', en: 'Arrays: `[3]int` — fixed size, rarely used directly. Slices: `[]int` — dynamic, Go\'s backbone. `append` to add, `make` to allocate. Maps: `map[string]int` — key-value, with ok idiom for existence check. `range` for iterating slices, maps, channels.' },
    6: { id: 'Struct mengelompokkan field terkait. Method: fungsi dengan receiver — value receiver tidak mengubah struct, pointer receiver bisa. Embedded field untuk komposisi (Go tidak punya inheritance). Struct tags memberi metadata untuk encoding. Constructor function mengembalikan pointer.', en: 'Structs group related fields. Methods: functions with receivers — value receivers don\'t modify the struct, pointer receivers can. Embedded fields for composition (Go has no inheritance). Struct tags provide metadata for encoding. Constructor functions return pointers.' },
    7: { id: 'Interface di Go bersifat implisit — struct cukup implement method interface tanpa kata kunci `implements`. Interface kosong `any` bisa menampung tipe apapun. Type assertion `x.(T)` dan type switch untuk memeriksa tipe konkret. Generics (Go 1.18+) membuat fungsi dan tipe reusable dengan type parameters.', en: 'Go interfaces are implicit — a struct just needs to implement the methods without an `implements` keyword. Empty interface `any` can hold any type. Type assertion `x.(T)` and type switch check concrete types. Generics (Go 1.18+) make functions and types reusable with type parameters.' },
    8: { id: '`&` mengambil alamat memori, `*` mengakses nilai di alamat. Go pass by value — fungsi mendapat salinan. Pointer memungkinkan modifikasi original. Stack untuk lokal kecil, heap untuk data yang di-share. Nil pointer harus dicek sebelum dereference.', en: '`&` takes the memory address, `*` accesses the value at an address. Go is pass by value — functions get a copy. Pointers allow modifying the original. Stack for small locals, heap for shared data. Nil pointers must be checked before dereferencing.' },
    9: { id: 'Setiap file Go milik sebuah package. Huruf besar = exported (public), huruf kecil = unexported (private). `go mod init nama-module` memulai module. `go mod tidy` membersihkan dependencies. Package standard seperti `fmt`, `strings`, `math`, `time` sudah built-in.', en: 'Every Go file belongs to a package. Uppercase = exported (public), lowercase = unexported (private). `go mod init module-name` starts a module. `go mod tidy` cleans up dependencies. Standard packages like `fmt`, `strings`, `math`, `time` are built-in.' },
    10: { id: 'Goroutine: fungsi yang jalan concurrent dengan `go f()`. `sync.WaitGroup` menunggu goroutine selesai. `sync.Mutex` mencegah data race. Race detector `go run -race` mendeteksi akses concurrent berbahaya. Go\'s concurrency model: "Do not communicate by sharing memory; share memory by communicating."', en: 'Goroutines: functions running concurrently with `go f()`. `sync.WaitGroup` waits for goroutines to finish. `sync.Mutex` prevents data races. Race detector `go run -race` detects dangerous concurrent access. Go\'s concurrency model: "Do not communicate by sharing memory; share memory by communicating."' },
    11: { id: 'Channel adalah pipe komunikasi antar goroutine. Unbuffered: sinkron (pengirim menunggu penerima). Buffered: async sampai buffer penuh. `select` menunggu multiple channel. Pipeline pattern: generator → process → collector. `close(ch)` menandai channel selesai.', en: 'Channels are communication pipes between goroutines. Unbuffered: synchronous (sender waits for receiver). Buffered: async until buffer is full. `select` waits on multiple channels. Pipeline pattern: generator → process → collector. `close(ch)` marks channel as done.' },
    12: { id: '`context.Context` membawa cancellation, timeout, dan nilai. `WithCancel`, `WithTimeout`, `WithDeadline` untuk kontrol. `errgroup` menggabungkan error dari multiple goroutine. Worker pool membatasi concurrency. Fan-in menggabungkan channel, fan-out mendistribusikan.', en: '`context.Context` carries cancellation, timeout, and values. `WithCancel`, `WithTimeout`, `WithDeadline` for control. `errgroup` combines errors from multiple goroutines. Worker pool limits concurrency. Fan-in merges channels, fan-out distributes.' },
    13: { id: '`io.Reader` dan `io.Writer` adalah interface fundamental untuk I/O. `bufio.Scanner` membaca baris per baris. `strings` package untuk manipulasi teks. `strconv` untuk konversi string⇄number. `time` untuk waktu, durasi, dan ticker. `log/slog` untuk structured logging.', en: '`io.Reader` and `io.Writer` are fundamental I/O interfaces. `bufio.Scanner` reads line by line. `strings` package for text manipulation. `strconv` for string⇄number conversion. `time` for time, duration, and tickers. `log/slog` for structured logging.' },
    14: { id: '`encoding/json` — Marshal untuk Go→JSON, Unmarshal untuk JSON→Go. Struct tags `\`json:"name"\`` mengontrol nama field. `sort` package: `sort.Ints`, `sort.Strings`, `sort.Slice` dengan custom comparator. `encoding/csv` untuk data tabular.', en: '`encoding/json` — Marshal for Go→JSON, Unmarshal for JSON→Go. Struct tags `\`json:"name"\`` control field names. `sort` package: `sort.Ints`, `sort.Strings`, `sort.Slice` with custom comparators. `encoding/csv` for tabular data.' },
    15: { id: '`net/http`: `HandleFunc` mendaftarkan handler, `ListenAndServe` menjalankan server. Middleware: fungsi yang membungkus http.Handler. Testing: `go test`, file `_test.go`. Table-driven test: array struct dengan input/ekspektasi. `httptest` untuk test HTTP tanpa server nyata.', en: '`net/http`: `HandleFunc` registers handlers, `ListenAndServe` starts the server. Middleware: functions wrapping http.Handler. Testing: `go test`, `_test.go` files. Table-driven tests: struct arrays with input/expectations. `httptest` for HTTP tests without a real server.' },
    16: { id: 'Proyek akhir menggabungkan: struct, method, pointer, interface, slice, map, error handling, encoding/json, file I/O, sort, dan testing. CLI dengan `flag` package, REST API dengan `net/http`, penyimpanan JSON. Pattern repository memisahkan data dan logic.', en: 'Final project combines: structs, methods, pointers, interfaces, slices, maps, error handling, encoding/json, file I/O, sort, and testing. CLI with `flag` package, REST API with `net/http`, JSON storage. Repository pattern separates data and logic.' },
  };
  return E[mod][isId ? 'id' : 'en'];
}

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => '- ' + o).join('\n');
  const code = CODE[mod.id];
  const explanation = getExplanation(mod.id, isId);
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? mod.id + 1 + '. ' + nextModule.lid : nextModule.len)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const experiments = isId
    ? 'Ubah nilai variabel dan lihat perubahannya,Tambah fungsi baru dengan tipe return berbeda,Ganti for loop dengan range, Coba tipe data yang belum dicoba'
    : 'Change variable values and observe the changes,Add a new function with different return types,Replace for loops with range,Try data types you haven\'t used yet';

  const experimentBullets = experiments.split(',')
    .filter(Boolean)
    .map(e => '- ' + e.trim())
    .join('\n');

  const expBullets = experimentBullets || (isId ? '- Eksperimen dengan kode di atas' : '- Experiment with the code above');

  const challenge = isId
    ? 'Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan `go run`.'
    : 'Build a program applying this week\'s concepts in a real case study. Use proper error handling. Ensure the code runs with `go run`.' + (mod.id === 10 ? '\nJalankan dengan: go run -race untuk deteksi race condition.' : '');

  const summary = isId
    ? 'Modul ' + mod.id + ' dari 16: **' + mod.lid + '**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **' + nextWeek + '**.'
    : 'Module ' + mod.id + ' of 16: **' + mod.len + '**. Go delivers high performance with simple syntax. Next week: **' + nextWeek + '**.';

  return '# ' + title + '\n\n'
    + '> Go | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```go\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + explanation + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + expBullets + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + challenge + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Ringkasan' : 'Summary') + '\n\n'
    + summary + '\n';
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', 'week' + mod.id + '-' + mod.f + '.md'), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', 'week' + mod.id + '-' + mod.f + '.md'), enContent, 'utf8');
  console.log('  ' + mod.id + '. ' + mod.lid + ' / ' + mod.len);
}

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' Go curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);
