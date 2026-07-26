import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE = path.join(__dirname, '..', 'public', 'data', 'course', 'golang');

const weeks = [
  { w: 1, f: 'pengenalan-go', lid: 'Pengenalan Go & Toolchain', len: 'Introduction to Go & Toolchain' },
  { w: 2, f: 'tipe-data-kontrol', lid: 'Variabel, Tipe Data & Control Flow', len: 'Variables, Data Types & Control Flow' },
  { w: 3, f: 'fungsi-error', lid: 'Fungsi & Error Handling', len: 'Functions & Error Handling' },
  { w: 4, f: 'array-slice-map', lid: 'Array, Slice & Map', len: 'Arrays, Slices & Maps' },
  { w: 5, f: 'struct-pointer', lid: 'Struct, Method & Pointer', len: 'Structs, Methods & Pointers' },
  { w: 6, f: 'interface-package', lid: 'Interface & Package', len: 'Interfaces & Packages' },
  { w: 7, f: 'defer-file-io', lid: 'Defer, Panic & File I/O', len: 'Defer, Panic & File I/O' },
  { w: 8, f: 'goroutine-waitgroup', lid: 'Goroutine & WaitGroup', len: 'Goroutines & WaitGroups' },
  { w: 9, f: 'channel-context', lid: 'Channel, Select & Context', len: 'Channels, Select & Context' },
  { w: 10, f: 'testing-stdlib', lid: 'Testing & Standard Library', len: 'Testing & Standard Library' },
  { w: 11, f: 'cli-http-server', lid: 'CLI Tool & HTTP Server', len: 'CLI Tools & HTTP Server' },
  { w: 12, f: 'rest-api-middleware', lid: 'REST API & Middleware', len: 'REST API & Middleware' },
  { w: 13, f: 'database-deploy', lid: 'Database & Deployment', len: 'Database & Deployment' },
  { w: 14, f: 'advanced-final', lid: 'Pattern Lanjutan & Proyek Akhir', len: 'Advanced Patterns & Final Project' },
];

const levels = {
  beginer: { nid: 'Pemula', nen: 'Beginner', first: 1, last: 6 },
  intermediate: { nid: 'Menengah', nen: 'Intermediate', first: 7, last: 10 },
  advanced: { nid: 'Lanjutan', nen: 'Advanced', first: 11, last: 14 },
};

function getObjectives(weekNum, lang) {
  const objs = {
    1: lang === 'id'
      ? ['Memahami apa itu Go dan mengapa mempelajarinya', 'Menginstal Go dan mengkonfigurasi editor', 'Menulis dan menjalankan program Go pertama', 'Memahami struktur dasar file Go', 'Mengenal perintah go run, go build, go fmt']
      : ['Understand what Go is and why to learn it', 'Install Go and configure your editor', 'Write and run your first Go program', 'Understand basic Go file structure', 'Learn go run, go build, go fmt commands'],
    2: lang === 'id'
      ? ['Memahami variabel dan konstanta di Go', 'Mengenal tipe data dasar (int, float64, string, bool)', 'Menggunakan perulangan for', 'Menggunakan if/else dan switch', 'Memahami zero values']
      : ['Understand variables and constants in Go', 'Learn basic data types (int, float64, string, bool)', 'Use for loops', 'Use if/else and switch', 'Understand zero values'],
    3: lang === 'id'
      ? ['Membuat fungsi dengan multiple return values', 'Menggunakan variadic parameters', 'Memahami named return values', 'Mengenal error interface dan if err != nil', 'Menulis kode Go yang idiomatis']
      : ['Create functions with multiple return values', 'Use variadic parameters', 'Understand named return values', 'Learn the error interface and if err != nil', 'Write idiomatic Go code'],
    4: lang === 'id'
      ? ['Memahami perbedaan array, slice, dan map', 'Menggunakan make(), append(), dan len()', 'Melakukan iterasi dengan range', 'Mengelola koleksi data secara efisien', 'Mengenal operasi slice dan map lanjutan']
      : ['Understand arrays, slices, and maps differences', 'Use make(), append(), and len()', 'Iterate with range', 'Manage data collections efficiently', 'Learn advanced slice and map operations'],
    5: lang === 'id'
      ? ['Mendefinisikan struct dan method', 'Membedakan value receiver dan pointer receiver', 'Memahami pointer di Go', 'Menggunakan constructor function pattern', 'Menerapkan method chaining']
      : ['Define structs and methods', 'Distinguish value vs pointer receivers', 'Understand pointers in Go', 'Use constructor function pattern', 'Apply method chaining'],
    6: lang === 'id'
      ? ['Memahami interface implicit satisfaction', 'Menerapkan embedding struct', 'Membuat package sendiri', 'Mengelola dependensi dengan go.mod', 'Menulis kode yang modular dan testable']
      : ['Understand implicit interface satisfaction', 'Apply struct embedding', 'Create your own packages', 'Manage dependencies with go.mod', 'Write modular and testable code'],
    7: lang === 'id'
      ? ['Menggunakan defer untuk resource management', 'Memahami panic dan recover', 'Membaca dan menulis file', 'Menggunakan package os dan io', 'Mengelola error dengan errors.Is dan errors.As']
      : ['Use defer for resource management', 'Understand panic and recover', 'Read and write files', 'Use os and io packages', 'Handle errors with errors.Is and errors.As'],
    8: lang === 'id'
      ? ['Memahami goroutine dan scheduler Go', 'Menggunakan sync.WaitGroup', 'Menerapkan Mutex dan RWMutex', 'Menghindari race condition', 'Mengenal parallel vs concurrent execution']
      : ['Understand goroutines and Go scheduler', 'Use sync.WaitGroup', 'Apply Mutex and RWMutex', 'Avoid race conditions', 'Learn parallel vs concurrent execution'],
    9: lang === 'id'
      ? ['Membuat unbuffered dan buffered channel', 'Menggunakan select statement', 'Memahami context dan cancellation', 'Menerapkan pipeline pattern', 'Mengelola timeout dan deadline']
      : ['Create unbuffered and buffered channels', 'Use select statement', 'Understand context and cancellation', 'Apply pipeline pattern', 'Manage timeouts and deadlines'],
    10: lang === 'id'
      ? ['Menulis unit test dengan package testing', 'Menerapkan table-driven tests', 'Menggunakan package encoding/json', 'Memahami package strings dan strconv', 'Menulis benchmark test']
      : ['Write unit tests with testing package', 'Apply table-driven tests', 'Use encoding/json package', 'Understand strings and strconv packages', 'Write benchmark tests'],
    11: lang === 'id'
      ? ['Membangun CLI tool dengan package flag', 'Membuat HTTP server dengan net/http', 'Memahami ServeMux dan handler', 'Membaca environment variable', 'Mengombinasikan CLI dan HTTP dalam satu proyek']
      : ['Build CLI tools with flag package', 'Create HTTP server with net/http', 'Understand ServeMux and handlers', 'Read environment variables', 'Combine CLI and HTTP in one project'],
    12: lang === 'id'
      ? ['Membangun REST API dengan net/http', 'Menerapkan JSON encoding/decoding', 'Membuat middleware pattern', 'Menambahkan structured logging dengan slog', 'Menulis API yang terstruktur dan teruji']
      : ['Build REST API with net/http', 'Apply JSON encoding/decoding', 'Create middleware pattern', 'Add structured logging with slog', 'Write structured and tested APIs'],
    13: lang === 'id'
      ? ['Menghubungkan Go ke database SQL', 'Menggunakan database/sql dan driver', 'Menulis Dockerfile multi-stage untuk Go', 'Men-deploy aplikasi Go', 'Memahami environment-based configuration']
      : ['Connect Go to SQL databases', 'Use database/sql and drivers', 'Write multi-stage Dockerfile for Go', 'Deploy Go applications', 'Understand environment-based configuration'],
    14: lang === 'id'
      ? ['Menerapkan advanced concurrency patterns', 'Menggunakan sync.Pool dan singleflight', 'Melakukan profiling dengan pprof', 'Membangun proyek akhir yang production-ready', 'Mengaplikasikan semua materi dalam satu aplikasi']
      : ['Apply advanced concurrency patterns', 'Use sync.Pool and singleflight', 'Profile with pprof', 'Build a production-ready final project', 'Apply all materials in one application'],
  };
  return objs[weekNum] || ['Learn Go concepts'];
}

function getTheory(weekNum, lang) {
  const prefix = lang === 'id' ? 'id' : 'en';
  const t = {
    1: {
      id: `## Apa itu Go?

Go (atau Golang) adalah bahasa pemrograman open-source yang dikembangkan oleh Google pada tahun 2007 oleh Robert Griesemer, Rob Pike, dan Ken Thompson. Go dirancang untuk menggabungkan kemudahan pemrograman bahasa dinamis dengan efisiensi dan keamanan bahasa statis.

### Kenapa Go?

- **Sederhana**: Hanya 25 keyword, tidak ada inheritance atau generics kompleks
- **Cepat**: Kompilasi sangat cepat, eksekusi mendekati C/C++
- **Concurrency**: Goroutine dan channel membuat concurrent programming mudah
- **Standard Library**: Kaya dan matang, HTTP server, JSON, dan banyak lagi built-in
- **Static Binary**: Satu binary tanpa dependensi runtime

### Toolchain Go

Go menyediakan toolchain lengkap melalui perintah \`go\`:
- \`go run\` - Menjalankan program tanpa menghasilkan binary
- \`go build\` - Mengkompilasi menjadi binary executable
- \`go fmt\` - Memformat kode secara otomatis
- \`go test\` - Menjalankan unit test
- \`go mod\` - Mengelola dependensi

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Halo, Go!")
}
\`\`\``,
      en: `## What is Go?

Go (or Golang) is an open-source programming language developed by Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson. Go is designed to combine the ease of dynamic languages with the efficiency and safety of static languages.

### Why Go?

- **Simple**: Only 25 keywords, no inheritance or complex generics
- **Fast**: Very fast compilation, execution near C/C++
- **Concurrency**: Goroutines and channels make concurrent programming easy
- **Standard Library**: Rich and mature, HTTP server, JSON, and more built-in
- **Static Binary**: Single binary with no runtime dependencies

### Go Toolchain

Go provides a complete toolchain through the \`go\` command:
- \`go run\` - Run programs without producing a binary
- \`go build\` - Compile into executable binary
- \`go fmt\` - Format code automatically
- \`go test\` - Run unit tests
- \`go mod\` - Manage dependencies

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
\`\`\``,
    },
    2: {
      id: `## Variabel, Tipe Data & Control Flow

### Variabel dan Konstanta

Go mendukung deklarasi variabel eksplisit dan implisit (short declaration).

\`\`\`go
// Eksplisit
var name string = "Go"
var age int = 15

// Short declaration
language := "Golang"
version := 1.23

// Konstanta
const pi = 3.14159
\`\`\`

### Tipe Data Dasar

| Tipe | Deskripsi |
|------|-----------|
| \`int\` | Bilangan bulat (32/64 bit tergantung platform) |
| \`int8\`, \`int16\`, \`int32\`, \`int64\` | Bilangan bulat dengan ukuran spesifik |
| \`uint\` | Bilangan bulat positif |
| \`float32\`, \`float64\` | Bilangan desimal |
| \`string\` | Teks |
| \`bool\` | Boolean (true/false) |

### Control Flow

\`\`\`go
// Perulangan for (satu-satunya loop di Go)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// While-style
count := 0
for count < 5 {
    fmt.Println(count)
    count++
}

// if/else
if x > 10 {
    fmt.Println("Besar")
} else if x > 5 {
    fmt.Println("Sedang")
} else {
    fmt.Println("Kecil")
}

// switch
switch day {
case "Senin":
    fmt.Println("Hari kerja")
case "Sabtu", "Minggu":
    fmt.Println("Akhir pekan")
default:
    fmt.Println("Hari biasa")
}
\`\`\``,
      en: `## Variables, Data Types & Control Flow

### Variables and Constants

Go supports both explicit and implicit (short declaration) variable declarations.

\`\`\`go
// Explicit
var name string = "Go"
var age int = 15

// Short declaration
language := "Golang"
version := 1.23

// Constants
const pi = 3.14159
\`\`\`

### Basic Data Types

| Type | Description |
|------|-------------|
| \`int\` | Integer (32/64 bit depending on platform) |
| \`int8\`, \`int16\`, \`int32\`, \`int64\` | Fixed-size integers |
| \`uint\` | Unsigned integer |
| \`float32\`, \`float64\` | Floating-point numbers |
| \`string\` | Text |
| \`bool\` | Boolean (true/false) |

### Control Flow

\`\`\`go
// For loop (only loop in Go)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// While-style
count := 0
for count < 5 {
    fmt.Println(count)
    count++
}

// if/else
if x > 10 {
    fmt.Println("Large")
} else if x > 5 {
    fmt.Println("Medium")
} else {
    fmt.Println("Small")
}

// switch
switch day {
case "Monday":
    fmt.Println("Weekday")
case "Saturday", "Sunday":
    fmt.Println("Weekend")
default:
    fmt.Println("Regular day")
}
\`\`\``,
    },
    3: {
      id: `## Fungsi & Error Handling

### Fungsi di Go

\`\`\`go
// Fungsi sederhana
func greet(name string) string {
    return "Halo, " + name
}

// Multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("tidak bisa membagi dengan nol")
    }
    return a / b, nil
}

// Named return values
func sum(numbers ...int) (total int) {
    for _, n := range numbers {
        total += n
    }
    return
}

// Variadic function
func printAll(prefix string, items ...string) {
    for _, item := range items {
        fmt.Println(prefix, item)
    }
}
\`\`\`

### Error Handling

Go menggunakan error sebagai return value, bukan exception.

\`\`\`go
// Pattern idiomatis Go
result, err := doSomething()
if err != nil {
    // handle error
    log.Fatal(err)
}

// Membuat custom error
var ErrNotFound = errors.New("item tidak ditemukan")

func findItem(id int) (Item, error) {
    // ...
    return Item{}, ErrNotFound
}

// Error wrapping
if err != nil {
    return fmt.Errorf("gagal memproses: %w", err)
}
\`\`\``,
      en: `## Functions & Error Handling

### Functions in Go

\`\`\`go
// Simple function
func greet(name string) string {
    return "Hello, " + name
}

// Multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

// Named return values
func sum(numbers ...int) (total int) {
    for _, n := range numbers {
        total += n
    }
    return
}

// Variadic function
func printAll(prefix string, items ...string) {
    for _, item := range items {
        fmt.Println(prefix, item)
    }
}
\`\`\`

### Error Handling

Go uses errors as return values, not exceptions.

\`\`\`go
// Idiomatic Go pattern
result, err := doSomething()
if err != nil {
    // handle error
    log.Fatal(err)
}

// Custom error
var ErrNotFound = errors.New("item not found")

func findItem(id int) (Item, error) {
    // ...
    return Item{}, ErrNotFound
}

// Error wrapping
if err != nil {
    return fmt.Errorf("failed to process: %w", err)
}
\`\`\``,
    },
    4: {
      id: `## Array, Slice & Map

### Array

\`\`\`go
// Deklarasi array
var arr [5]int
arr[0] = 10

// Inisialisasi
arr2 := [3]string{"a", "b", "c"}
arr3 := [...]int{1, 2, 3, 4}
\`\`\`

### Slice (Collection Paling Umum)

\`\`\`go
// Membuat slice
var s []int
s = append(s, 1, 2, 3)

// Dengan make
s2 := make([]int, 5, 10) // length 5, capacity 10

// Slice dari array
arr := [5]int{1, 2, 3, 4, 5}
slice := arr[1:4] // [2, 3, 4]

// Iterate dengan range
numbers := []int{10, 20, 30}
for i, v := range numbers {
    fmt.Printf("index %d: %d\\n", i, v)
}
\`\`\`

### Map

\`\`\`go
// Membuat map
scores := make(map[string]int)
scores["Alice"] = 95

// Map literal
ages := map[string]int{
    "Bob":  30,
    "Eve":  25,
}

// Cek key
if score, ok := scores["Alice"]; ok {
    fmt.Println("Nilai:", score)
}

// Hapus key
delete(scores, "Alice")
\`\`\``,
      en: `## Arrays, Slices & Maps

### Array

\`\`\`go
// Array declaration
var arr [5]int
arr[0] = 10

// Initialization
arr2 := [3]string{"a", "b", "c"}
arr3 := [...]int{1, 2, 3, 4}
\`\`\`

### Slice (Most Common Collection)

\`\`\`go
// Create slice
var s []int
s = append(s, 1, 2, 3)

// With make
s2 := make([]int, 5, 10) // length 5, capacity 10

// Slice from array
arr := [5]int{1, 2, 3, 4, 5}
slice := arr[1:4] // [2, 3, 4]

// Iterate with range
numbers := []int{10, 20, 30}
for i, v := range numbers {
    fmt.Printf("index %d: %d\\n", i, v)
}
\`\`\`

### Map

\`\`\`go
// Create map
scores := make(map[string]int)
scores["Alice"] = 95

// Map literal
ages := map[string]int{
    "Bob":  30,
    "Eve":  25,
}

// Check key
if score, ok := scores["Alice"]; ok {
    fmt.Println("Score:", score)
}

// Delete key
delete(scores, "Alice")
\`\`\``,
    },
    5: {
      id: `## Struct, Method & Pointer

### Struct

\`\`\`go
// Definisi struct
type User struct {
    ID        int
    Name      string
    Email     string
    IsActive  bool
}

// Membuat instance
u := User{
    ID:    1,
    Name:  "Alice",
    Email: "alice@example.com",
}

// Mengakses field
fmt.Println(u.Name)
\`\`\`

### Method

\`\`\`go
// Value receiver
func (u User) Greet() string {
    return "Halo, saya " + u.Name
}

// Pointer receiver (bisa memodifikasi struct)
func (u *User) Activate() {
    u.IsActive = true
}

// Method chaining
type Counter struct {
    Value int
}

func (c *Counter) Add(n int) *Counter {
    c.Value += n
    return c
}
\`\`\`

### Pointer

\`\`\`go
x := 42
p := &x           // pointer ke x
fmt.Println(*p)   // dereference: 42
*p = 21           // mengubah x melalui pointer
fmt.Println(x)    // 21

// Pointer di parameter fungsi
func increment(n *int) {
    *n++
}
\`\`\``,
      en: `## Structs, Methods & Pointers

### Struct

\`\`\`go
// Struct definition
type User struct {
    ID        int
    Name      string
    Email     string
    IsActive  bool
}

// Create instance
u := User{
    ID:    1,
    Name:  "Alice",
    Email: "alice@example.com",
}

// Access field
fmt.Println(u.Name)
\`\`\`

### Method

\`\`\`go
// Value receiver
func (u User) Greet() string {
    return "Hello, I'm " + u.Name
}

// Pointer receiver (can modify struct)
func (u *User) Activate() {
    u.IsActive = true
}

// Method chaining
type Counter struct {
    Value int
}

func (c *Counter) Add(n int) *Counter {
    c.Value += n
    return c
}
\`\`\`

### Pointer

\`\`\`go
x := 42
p := &x           // pointer to x
fmt.Println(*p)   // dereference: 42
*p = 21           // modify x through pointer
fmt.Println(x)    // 21

// Pointer in function params
func increment(n *int) {
    *n++
}
\`\`\``,
    },
    6: {
      id: `## Interface & Package

### Interface (Implicit Satisfaction)

\`\`\`go
// Definisi interface
type Greeter interface {
    Greet() string
}

// Struct secara implisit mengimplementasi interface
type Indonesian struct {
    Name string
}

func (i Indonesian) Greet() string {
    return "Halo, " + i.Name
}

type English struct {
    Name string
}

func (e English) Greet() string {
    return "Hello, " + e.Name
}

// Interface sebagai parameter
func welcome(g Greeter) {
    fmt.Println(g.Greet())
}
\`\`\`

### Embedding Struct

\`\`\`go
type Reader struct{}
func (r Reader) Read() string { return "data" }

type Writer struct{}
func (w Writer) Write(s string) {}

// Composition over inheritance
type ReadWriter struct {
    Reader
    Writer
}
\`\`\`

### Package & Module

\`\`\`go
// mypackage/mypackage.go
package mypackage

func Hello() string {
    return "Hello from my package!"
}

// main.go
package main

import (
    "fmt"
    "yourmodule/mypackage"
)

func main() {
    fmt.Println(mypackage.Hello())
}
\`\`\``,
      en: `## Interfaces & Packages

### Interfaces (Implicit Satisfaction)

\`\`\`go
// Interface definition
type Greeter interface {
    Greet() string
}

// Struct implicitly implements interface
type Indonesian struct {
    Name string
}

func (i Indonesian) Greet() string {
    return "Halo, " + i.Name
}

type English struct {
    Name string
}

func (e English) Greet() string {
    return "Hello, " + e.Name
}

// Interface as parameter
func welcome(g Greeter) {
    fmt.Println(g.Greet())
}
\`\`\`

### Struct Embedding

\`\`\`go
type Reader struct{}
func (r Reader) Read() string { return "data" }

type Writer struct{}
func (w Writer) Write(s string) {}

// Composition over inheritance
type ReadWriter struct {
    Reader
    Writer
}
\`\`\`

### Package & Module

\`\`\`go
// mypackage/mypackage.go
package mypackage

func Hello() string {
    return "Hello from my package!"
}

// main.go
package main

import (
    "fmt"
    "yourmodule/mypackage"
)

func main() {
    fmt.Println(mypackage.Hello())
}
\`\`\``,
    },
    7: {
      id: `## Defer, Panic & File I/O

### Defer

\`\`\`go
func readFile(filename string) error {
    f, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer f.Close() // akan dijalankan saat fungsi selesai

    // baca file...
    return nil
}

// Multiple defer (LIFO)
func example() {
    defer fmt.Println("pertama")   // ketiga
    defer fmt.Println("kedua")     // kedua
    fmt.Println("ketiga")          // pertama
}
\`\`\`

### Panic & Recover

\`\`\`go
func safeDivision(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r)
            result = 0
        }
    }()
    return a / b
}
\`\`\`

### File I/O

\`\`\`go
// Membaca file
data, err := os.ReadFile("data.txt")
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(data))

// Menulis file
err = os.WriteFile("output.txt", []byte("Hello Go"), 0644)

// Membaca baris per baris
file, err := os.Open("file.txt")
scanner := bufio.NewScanner(file)
for scanner.Scan() {
    fmt.Println(scanner.Text())
}
\`\`\``,
      en: `## Defer, Panic & File I/O

### Defer

\`\`\`go
func readFile(filename string) error {
    f, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer f.Close() // runs when function completes

    // read file...
    return nil
}

// Multiple defer (LIFO)
func example() {
    defer fmt.Println("first")     // third
    defer fmt.Println("second")    // second
    fmt.Println("third")           // first
}
\`\`\`

### Panic & Recover

\`\`\`go
func safeDivision(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r)
            result = 0
        }
    }()
    return a / b
}
\`\`\`

### File I/O

\`\`\`go
// Read file
data, err := os.ReadFile("data.txt")
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(data))

// Write file
err = os.WriteFile("output.txt", []byte("Hello Go"), 0644)

// Read line by line
file, err := os.Open("file.txt")
scanner := bufio.NewScanner(file)
for scanner.Scan() {
    fmt.Println(scanner.Text())
}
\`\`\``,
    },
    8: {
      id: `## Goroutine & WaitGroup

### Goroutine

Goroutine adalah thread ringan yang dikelola oleh Go runtime.

\`\`\`go
func sayHello() {
    fmt.Println("Hello dari goroutine!")
}

func main() {
    go sayHello() // jalankan sebagai goroutine
    time.Sleep(100 * time.Millisecond)
}
\`\`\`

### WaitGroup

\`\`\`go
func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // tandai selesai
    fmt.Printf("Worker %d mulai\\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d selesai\\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait() // tunggu semua selesai
    fmt.Println("Semua worker selesai!")
}
\`\`\`

### Mutex

\`\`\`go
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
\`\`\``,
      en: `## Goroutines & WaitGroups

### Goroutine

Goroutines are lightweight threads managed by the Go runtime.

\`\`\`go
func sayHello() {
    fmt.Println("Hello from goroutine!")
}

func main() {
    go sayHello() // run as goroutine
    time.Sleep(100 * time.Millisecond)
}
\`\`\`

### WaitGroup

\`\`\`go
func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // mark as done
    fmt.Printf("Worker %d started\\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait() // wait for all
    fmt.Println("All workers done!")
}
\`\`\`

### Mutex

\`\`\`go
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
\`\`\``,
    },
    9: {
      id: `## Channel, Select & Context

### Channel

\`\`\`go
// Unbuffered channel
ch := make(chan int)

// Buffered channel
buffered := make(chan string, 3)

// Kirim dan terima
go func() {
    ch <- 42 // kirim
}()
value := <-ch // terima
fmt.Println(value)

// Range over channel
for msg := range ch {
    fmt.Println(msg)
}

// Close channel
close(ch)
\`\`\`

### Select

\`\`\`go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "satu"
    }()
    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "dua"
    }()

    select {
    case msg1 := <-ch1:
        fmt.Println("Terima:", msg1)
    case msg2 := <-ch2:
        fmt.Println("Terima:", msg2)
    case <-time.After(3 * time.Second):
        fmt.Println("Timeout!")
    }
}
\`\`\`

### Context

\`\`\`go
func handler(ctx context.Context) {
    select {
    case <-time.After(2 * time.Second):
        fmt.Println("Selesai")
    case <-ctx.Done():
        fmt.Println("Dibatalkan:", ctx.Err())
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()
    handler(ctx)
}
\`\`\``,
      en: `## Channels, Select & Context

### Channel

\`\`\`go
// Unbuffered channel
ch := make(chan int)

// Buffered channel
buffered := make(chan string, 3)

// Send and receive
go func() {
    ch <- 42 // send
}()
value := <-ch // receive
fmt.Println(value)

// Range over channel
for msg := range ch {
    fmt.Println(msg)
}

// Close channel
close(ch)
\`\`\`

### Select

\`\`\`go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "one"
    }()
    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "two"
    }()

    select {
    case msg1 := <-ch1:
        fmt.Println("Received:", msg1)
    case msg2 := <-ch2:
        fmt.Println("Received:", msg2)
    case <-time.After(3 * time.Second):
        fmt.Println("Timeout!")
    }
}
\`\`\`

### Context

\`\`\`go
func handler(ctx context.Context) {
    select {
    case <-time.After(2 * time.Second):
        fmt.Println("Done")
    case <-ctx.Done():
        fmt.Println("Cancelled:", ctx.Err())
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()
    handler(ctx)
}
\`\`\``,
    },
    10: {
      id: `## Testing & Standard Library

### Unit Testing

\`\`\`go
// math.go
func Add(a, b int) int {
    return a + b
}

// math_test.go
func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2,3) = %d; want %d", got, want)
    }
}
\`\`\`

### Table-Driven Tests

\`\`\`go
func TestDivide(t *testing.T) {
    tests := []struct {
        name string
        a, b float64
        want float64
        err  bool
    }{
        {"positive", 10, 2, 5, false},
        {"by zero", 10, 0, 0, true},
        {"decimal", 7, 2, 3.5, false},
    }

    for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
            got, err := Divide(tc.a, tc.b)
            if tc.err && err == nil {
                t.Error("expected error")
            }
            if !tc.err && got != tc.want {
                t.Errorf("got %f, want %f", got, tc.want)
            }
        })
    }
}
\`\`\`

### JSON

\`\`\`go
type Person struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

// Encode
p := Person{Name: "Alice", Age: 30}
jsonData, _ := json.Marshal(p)
fmt.Println(string(jsonData))

// Decode
var p2 Person
json.Unmarshal([]byte(\`{"name":"Bob","age":25}\`), &p2)
\`\`\``,
      en: `## Testing & Standard Library

### Unit Testing

\`\`\`go
// math.go
func Add(a, b int) int {
    return a + b
}

// math_test.go
func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2,3) = %d; want %d", got, want)
    }
}
\`\`\`

### Table-Driven Tests

\`\`\`go
func TestDivide(t *testing.T) {
    tests := []struct {
        name string
        a, b float64
        want float64
        err  bool
    }{
        {"positive", 10, 2, 5, false},
        {"by zero", 10, 0, 0, true},
        {"decimal", 7, 2, 3.5, false},
    }

    for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
            got, err := Divide(tc.a, tc.b)
            if tc.err && err == nil {
                t.Error("expected error")
            }
            if !tc.err && got != tc.want {
                t.Errorf("got %f, want %f", got, tc.want)
            }
        })
    }
}
\`\`\`

### JSON

\`\`\`go
type Person struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

// Encode
p := Person{Name: "Alice", Age: 30}
jsonData, _ := json.Marshal(p)
fmt.Println(string(jsonData))

// Decode
var p2 Person
json.Unmarshal([]byte(\`{"name":"Bob","age":25}\`), &p2)
\`\`\``,
    },
    11: {
      id: `## CLI Tool & HTTP Server

### CLI dengan flag

\`\`\`go
func main() {
    name := flag.String("name", "World", "nama untuk disapa")
    count := flag.Int("count", 1, "jumlah pengulangan")
    flag.Parse()

    for i := 0; i < *count; i++ {
        fmt.Printf("Hello, %s!\\n", *name)
    }
}
\`\`\`

### HTTP Server

\`\`\`go
func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
    })

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })

    log.Println("Server running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
\`\`\`

### Proyek Gabungan

\`\`\`go
func main() {
    if len(os.Args) > 1 && os.Args[1] == "serve" {
        // Mode server
        startServer()
    } else {
        // Mode CLI
        runCLI()
    }
}
\`\`\``,
      en: `## CLI Tools & HTTP Server

### CLI with flag

\`\`\`go
func main() {
    name := flag.String("name", "World", "name to greet")
    count := flag.Int("count", 1, "number of repetitions")
    flag.Parse()

    for i := 0; i < *count; i++ {
        fmt.Printf("Hello, %s!\\n", *name)
    }
}
\`\`\`

### HTTP Server

\`\`\`go
func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
    })

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })

    log.Println("Server running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
\`\`\`

### Combined Project

\`\`\`go
func main() {
    if len(os.Args) > 1 && os.Args[1] == "serve" {
        // Server mode
        startServer()
    } else {
        // CLI mode
        runCLI()
    }
}
\`\`\``,
    },
    12: {
      id: `## REST API & Middleware

### REST API

\`\`\`go
type Task struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
    Done bool   \`json:"done"\`
}

var tasks []Task
var nextID = 1

func getTasks(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
    var task Task
    json.NewDecoder(r.Body).Decode(&task)
    task.ID = nextID
    nextID++
    tasks = append(tasks, task)
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/tasks", getTasks)
    mux.HandleFunc("POST /api/tasks", createTask)
    log.Fatal(http.ListenAndServe(":8080", mux))
}
\`\`\`

### Middleware Pattern

\`\`\`go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}
\`\`\`

### Structured Logging

\`\`\`go
log := slog.New(slog.NewJSONHandler(os.Stdout, nil))
log.Info("server started", "port", 8080)
log.Error("request failed", "error", err, "path", r.URL.Path)
\`\`\``,
      en: `## REST API & Middleware

### REST API

\`\`\`go
type Task struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
    Done bool   \`json:"done"\`
}

var tasks []Task
var nextID = 1

func getTasks(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
    var task Task
    json.NewDecoder(r.Body).Decode(&task)
    task.ID = nextID
    nextID++
    tasks = append(tasks, task)
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/tasks", getTasks)
    mux.HandleFunc("POST /api/tasks", createTask)
    log.Fatal(http.ListenAndServe(":8080", mux))
}
\`\`\`

### Middleware Pattern

\`\`\`go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}
\`\`\`

### Structured Logging

\`\`\`go
log := slog.New(slog.NewJSONHandler(os.Stdout, nil))
log.Info("server started", "port", 8080)
log.Error("request failed", "error", err, "path", r.URL.Path)
\`\`\``,
    },
    13: {
      id: `## Database & Deployment

### Database SQL

\`\`\`go
import (
    "database/sql"
    _ "github.com/lib/pq"
)

type User struct {
    ID    int
    Name  string
    Email string
}

func main() {
    db, err := sql.Open("postgres",
        "host=localhost user=postgres dbname=tryngo sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Query
    rows, err := db.Query("SELECT id, name, email FROM users")
    
    // Prepared statement
    user := User{}
    err = db.QueryRow(
        "SELECT id, name, email FROM users WHERE id = $1", 1,
    ).Scan(&user.ID, &user.Name, &user.Email)
}
\`\`\`

### Docker Multi-stage

\`\`\`dockerfile
# Build stage
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o app .

# Runtime stage
FROM alpine:3.20
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/app .
EXPOSE 8080
CMD ["./app"]
\`\`\`

### Configuration

\`\`\`go
type Config struct {
    Port    string
    DBHost  string
    DBPort  string
    DBUser  string
    DBPass  string
    DBName  string
}

func LoadConfig() Config {
    return Config{
        Port:   getEnv("PORT", "8080"),
        DBHost: getEnv("DB_HOST", "localhost"),
        DBPort: getEnv("DB_PORT", "5432"),
        DBUser: getEnv("DB_USER", "postgres"),
        DBPass: getEnv("DB_PASS", ""),
        DBName: getEnv("DB_NAME", "tryngo"),
    }
}

func getEnv(key, fallback string) string {
    if v := os.Getenv(key); v != "" {
        return v
    }
    return fallback
}
\`\`\``,
      en: `## Database & Deployment

### Database SQL

\`\`\`go
import (
    "database/sql"
    _ "github.com/lib/pq"
)

type User struct {
    ID    int
    Name  string
    Email string
}

func main() {
    db, err := sql.Open("postgres",
        "host=localhost user=postgres dbname=tryngo sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Query
    rows, err := db.Query("SELECT id, name, email FROM users")
    
    // Prepared statement
    user := User{}
    err = db.QueryRow(
        "SELECT id, name, email FROM users WHERE id = $1", 1,
    ).Scan(&user.ID, &user.Name, &user.Email)
}
\`\`\`

### Docker Multi-stage

\`\`\`dockerfile
# Build stage
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o app .

# Runtime stage
FROM alpine:3.20
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/app .
EXPOSE 8080
CMD ["./app"]
\`\`\`

### Configuration

\`\`\`go
type Config struct {
    Port    string
    DBHost  string
    DBPort  string
    DBUser  string
    DBPass  string
    DBName  string
}

func LoadConfig() Config {
    return Config{
        Port:   getEnv("PORT", "8080"),
        DBHost: getEnv("DB_HOST", "localhost"),
        DBPort: getEnv("DB_PORT", "5432"),
        DBUser: getEnv("DB_USER", "postgres"),
        DBPass: getEnv("DB_PASS", ""),
        DBName: getEnv("DB_NAME", "tryngo"),
    }
}

func getEnv(key, fallback string) string {
    if v := os.Getenv(key); v != "" {
        return v
    }
    return fallback
}
\`\`\``,
    },
    14: {
      id: `## Pattern Lanjutan & Proyek Akhir

### Advanced Concurrency Patterns

\`\`\`go
// Worker pool pattern
func workerPool(numWorkers int, jobs <-chan int, results chan<- int) {
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for job := range jobs {
                results <- job * 2 // proses
            }
        }(i)
    }
    wg.Wait()
    close(results)
}

// Fan-in pattern
func fanIn(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for msg := range c {
                out <- msg
            }
        }(ch)
    }
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}

// Pipeline pattern
func pipeline() {
    numbers := make(chan int)
    squares := make(chan int)

    // Stage 1: generate
    go func() {
        for i := 1; i <= 10; i++ {
            numbers <- i
        }
        close(numbers)
    }()

    // Stage 2: square
    go func() {
        for n := range numbers {
            squares <- n * n
        }
        close(squares)
    }()

    // Stage 3: print
    for s := range squares {
        fmt.Println(s)
    }
}
\`\`\`

### Profiling

\`\`\`go
import "net/http/pprof"

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/debug/pprof/", pprof.Index)
    log.Fatal(http.ListenAndServe(":6060", mux))
}
\`\`\`

### Proyek Akhir

Bangun aplikasi production-ready yang mengintegrasikan:
- CLI tool untuk manajemen data
- REST API dengan middleware
- Database PostgreSQL
- Docker container
- Structured logging
- Unit test yang komprehensif`,
      en: `## Advanced Patterns & Final Project

### Advanced Concurrency Patterns

\`\`\`go
// Worker pool pattern
func workerPool(numWorkers int, jobs <-chan int, results chan<- int) {
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for job := range jobs {
                results <- job * 2 // process
            }
        }(i)
    }
    wg.Wait()
    close(results)
}

// Fan-in pattern
func fanIn(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for msg := range c {
                out <- msg
            }
        }(ch)
    }
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}

// Pipeline pattern
func pipeline() {
    numbers := make(chan int)
    squares := make(chan int)

    // Stage 1: generate
    go func() {
        for i := 1; i <= 10; i++ {
            numbers <- i
        }
        close(numbers)
    }()

    // Stage 2: square
    go func() {
        for n := range numbers {
            squares <- n * n
        }
        close(squares)
    }()

    // Stage 3: print
    for s := range squares {
        fmt.Println(s)
    }
}
\`\`\`

### Profiling

\`\`\`go
import "net/http/pprof"

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/debug/pprof/", pprof.Index)
    log.Fatal(http.ListenAndServe(":6060", mux))
}
\`\`\`

### Final Project

Build a production-ready application integrating:
- CLI tool for data management
- REST API with middleware
- PostgreSQL database
- Docker container
- Structured logging
- Comprehensive unit tests`,
    },
  };
  return t[weekNum]?.[prefix] || { id: '# Content', en: '# Content' };
}

function getExercises(weekNum, lang) {
  const prefix = lang === 'id' ? 'id' : 'en';
  const e = {
    1: {
      id: `1. Instal Go dan verifikasi dengan \`go version\`
2. Buat program "Hello, [nama]!" dan jalankan dengan \`go run\`
3. Compile program menjadi binary dengan \`go build\`
4. Format kode dengan \`go fmt\`
5. Buat program yang mencetak nama dan umur Anda`,
      en: `1. Install Go and verify with \`go version\`
2. Create a "Hello, [name]!" program and run with \`go run\`
3. Compile the program into a binary with \`go build\`
4. Format code with \`go fmt\`
5. Create a program that prints your name and age`,
    },
    2: {
      id: `1. Buat variabel dengan tipe int, float64, string, dan bool
2. Program konversi suhu Celsius ke Fahrenheit
3. Program menentukan bilangan genap/ganjil
4. Program mencetak angka 1-100 dengan kondisi khusus (FizzBuzz)
5. Buat kalkulator sederhana dengan switch`,
      en: `1. Create variables with int, float64, string, and bool types
2. Celsius to Fahrenheit converter
3. Even/odd number detector
4. Print numbers 1-100 with special conditions (FizzBuzz)
5. Build a simple calculator with switch`,
    },
    3: {
      id: `1. Buat fungsi yang menerima slice dan mengembalikan nilai rata-rata
2. Buat fungsi dengan multiple return values untuk operasi aritmatika
3. Implementasi error handling untuk pembagian dengan nol
4. Buat fungsi variadic untuk mencari nilai maksimum
5. Buat fungsi dengan named return values`,
      en: `1. Create a function that takes a slice and returns the average
2. Create a function with multiple return values for arithmetic operations
3. Implement error handling for division by zero
4. Create a variadic function to find the maximum value
5. Create a function with named return values`,
    },
    4: {
      id: `1. Buat program yang menyimpan dan menampilkan daftar nama (slice)
2. Implementasi fungsi untuk menambah dan menghapus item dari slice
3. Buat map untuk menyimpan data siswa dan nilainya
4. Program menghitung frekuensi kata dalam kalimat
5. Buat fungsi untuk menggabungkan dua map`,
      en: `1. Create a program that stores and displays a list of names (slice)
2. Implement functions to add and remove items from a slice
3. Create a map to store student names and scores
4. Word frequency counter program
5. Create a function to merge two maps`,
    },
    5: {
      id: `1. Definisikan struct Product dengan field ID, Name, Price, Stock
2. Tambahkan method Display() dan ApplyDiscount(percent)
3. Buat constructor function NewProduct
4. Implementasi method chaining pada struct
5. Buat program inventaris sederhana dengan slice of struct`,
      en: `1. Define a Product struct with ID, Name, Price, Stock fields
2. Add Display() and ApplyDiscount(percent) methods
3. Create a NewProduct constructor function
4. Implement method chaining on a struct
5. Build a simple inventory program with slice of structs`,
    },
    6: {
      id: `1. Buat interface Shape dengan method Area() dan Perimeter()
2. Implementasi interface untuk Circle dan Rectangle
3. Buat fungsi yang menerima interface sebagai parameter
4. Buat package sendiri dan import di main
5. Buat program yang menggunakan embedding struct`,
      en: `1. Create a Shape interface with Area() and Perimeter() methods
2. Implement the interface for Circle and Rectangle
3. Create a function that takes an interface as parameter
4. Create your own package and import it in main
5. Create a program using struct embedding`,
    },
    7: {
      id: `1. Gunakan defer untuk menutup file setelah dibaca
2. Program yang membaca file dan mencetak jumlah baris
3. Implementasi panic/recover untuk pembagian aman
4. Program menyalin file dengan os.Copy
5. Buat program logging sederhana dengan penulisan file`,
      en: `1. Use defer to close a file after reading
2. Program that reads a file and prints line count
3. Implement panic/recover for safe division
4. File copy program with os.Copy
5. Build a simple logging program with file writing`,
    },
    8: {
      id: `1. Jalankan 3 goroutine yang mencetak pesan berbeda
2. Gunakan WaitGroup untuk menunggu beberapa goroutine
3. Implementasi Mutex untuk counter aman dari race condition
4. Program parallel worker untuk memproses daftar tugas
5. Deteksi race condition dengan \`go run -race\``,
      en: `1. Run 3 goroutines that print different messages
2. Use WaitGroup to wait for multiple goroutines
3. Implement Mutex for a race-safe counter
4. Parallel worker program to process a task list
5. Detect race conditions with \`go run -race\``,
    },
    9: {
      id: `1. Program producer-consumer dengan channel unbuffered
2. Implementasi worker pool dengan buffered channel
3. Gunakan select untuk menangani multiple channel
4. Implementasi timeout dengan context
5. Buat pipeline data processing sederhana`,
      en: `1. Producer-consumer program with unbuffered channel
2. Worker pool implementation with buffered channel
3. Use select to handle multiple channels
4. Implement timeout with context
5. Build a simple data processing pipeline`,
    },
    10: {
      id: `1. Tulis unit test untuk fungsi kalkulator
2. Implementasi table-driven test untuk berbagai kasus
3. Test JSON encoding dan decoding
4. Tulis benchmark test
5. Buat program yang menggunakan package strings dan strconv`,
      en: `1. Write unit tests for a calculator function
2. Implement table-driven tests for multiple cases
3. Test JSON encoding and decoding
4. Write benchmark tests
5. Create a program using strings and strconv packages`,
    },
    11: {
      id: `1. Buat CLI tool dengan flag untuk operasi CRUD sederhana
2. Buat HTTP server dengan endpoint /hello dan /time
3. Baca PORT dari environment variable
4. Gabungkan CLI dan HTTP mode dalam satu binary
5. Implementasi health check endpoint dengan JSON response`,
      en: `1. Create a CLI tool with flags for simple CRUD operations
2. Create an HTTP server with /hello and /time endpoints
3. Read PORT from environment variable
4. Combine CLI and HTTP modes in one binary
5. Implement health check endpoint with JSON response`,
    },
    12: {
      id: `1. Buat REST API CRUD untuk resource Book
2. Implementasi logging middleware
3. Tambahkan auth middleware dengan token statis
4. Gunakan structured logging (slog)
5. Tulis unit test untuk handler API`,
      en: `1. Create a REST API CRUD for Book resource
2. Implement logging middleware
3. Add auth middleware with static token
4. Use structured logging (slog)
5. Write unit tests for API handlers`,
    },
    13: {
      id: `1. Buat koneksi ke PostgreSQL dan jalankan query
2. Implementasi CRUD dengan database/sql
3. Buat Dockerfile multi-stage untuk aplikasi Go
4. Gunakan environment variable untuk konfigurasi
5. Buat migration script untuk skema database`,
      en: `1. Connect to PostgreSQL and run a query
2. Implement CRUD with database/sql
3. Create a multi-stage Dockerfile for Go app
4. Use environment variables for configuration
5. Create a migration script for database schema`,
    },
    14: {
      id: `1. Implementasi worker pool pattern
2. Buat fan-in/fan-out pipeline
3. Jalankan profiling dengan pprof
4. Bangun proyek akhir: REST API + CLI + Database
5. Tulis comprehensive test untuk seluruh aplikasi`,
      en: `1. Implement worker pool pattern
2. Build fan-in/fan-out pipeline
3. Run profiling with pprof
4. Build final project: REST API + CLI + Database
5. Write comprehensive tests for the entire application`,
    },
  };
  return e[weekNum]?.[prefix] || '1. Practice Go';
}

function getSummary(weekNum, lang) {
  const nextWeek = weekNum + 1;
  const nextTopic = weeks.find(w => w.w === nextWeek);
  const prefix = lang === 'id' ? 'id' : 'en';
  const s = {
    1: {
      id: `Kita telah belajar tentang asal-usul Go, toolchain-nya, dan program pertama. Go adalah bahasa yang sederhana namun powerful untuk backend dan systems programming. Selanjutnya kita akan mempelajari variabel, tipe data, dan control flow.`,
      en: `We've learned about Go's origins, its toolchain, and our first program. Go is a simple yet powerful language for backend and systems programming. Next we'll learn variables, data types, and control flow.`,
    },
    2: {
      id: `Kita telah menguasai variabel, tipe data dasar, dan control flow di Go. Go memiliki sintaks yang bersih dan hanya satu jenis perulangan (for). Selanjutnya kita akan mempelajari fungsi dan error handling.`,
      en: `We've mastered variables, basic data types, and control flow in Go. Go has clean syntax and only one loop type (for). Next we'll learn functions and error handling.`,
    },
    3: {
      id: `Kita telah mempelajari fungsi dengan multiple return values, variadic parameters, dan error handling idiomatis Go. Tidak ada exception di Go — error adalah value. Selanjutnya kita akan mempelajari array, slice, dan map.`,
      en: `We've learned functions with multiple return values, variadic parameters, and idiomatic Go error handling. There are no exceptions in Go — errors are values. Next we'll learn arrays, slices, and maps.`,
    },
    4: {
      id: `Kita telah menguasai array, slice, dan map — tiga collection utama di Go. Slice adalah yang paling fleksibel dan sering digunakan. Selanjutnya kita akan mempelajari struct, method, dan pointer.`,
      en: `We've mastered arrays, slices, and maps — three main collections in Go. Slices are the most flexible and commonly used. Next we'll learn structs, methods, and pointers.`,
    },
    5: {
      id: `Kita telah mempelajari struct untuk mengelompokkan data, method untuk memberikan perilaku, dan pointer untuk referensi. Go menggunakan komposisi, bukan inheritance. Selanjutnya kita akan mempelajari interface dan package.`,
      en: `We've learned structs for grouping data, methods for behavior, and pointers for references. Go uses composition, not inheritance. Next we'll learn interfaces and packages.`,
    },
    6: {
      id: `Kita telah menguasai interface (implicit satisfaction), embedding struct, dan pembuatan package sendiri. Ini adalah fondasi untuk menulis kode Go yang modular. Selanjutnya kita akan masuk ke intermediate: defer, panic, recover, dan file I/O.`,
      en: `We've mastered interfaces (implicit satisfaction), struct embedding, and creating our own packages. This is the foundation for writing modular Go code. Next we'll enter intermediate: defer, panic, recover, and file I/O.`,
    },
    7: {
      id: `Kita telah mempelajari defer untuk cleanup, panic/recover untuk error fatal, dan file I/O dengan package os. Go menangani resource management dengan elegan. Selanjutnya kita akan belajar goroutine dan WaitGroup.`,
      en: `We've learned defer for cleanup, panic/recover for fatal errors, and file I/O with os package. Go handles resource management elegantly. Next we'll learn goroutines and WaitGroups.`,
    },
    8: {
      id: `Kita telah menguasai goroutine (thread ringan), WaitGroup, dan Mutex. Concurrency di Go aman dan mudah. Selanjutnya kita akan belajar channel, select, dan context.`,
      en: `We've mastered goroutines (lightweight threads), WaitGroups, and Mutexes. Concurrency in Go is safe and easy. Next we'll learn channels, select, and context.`,
    },
    9: {
      id: `Kita telah mempelajari channel untuk komunikasi antar goroutine, select untuk multiplexing, dan context untuk cancellation. Ini adalah fondasi concurrent programming di Go. Selanjutnya kita akan belajar testing dan standard library.`,
      en: `We've learned channels for goroutine communication, select for multiplexing, and context for cancellation. This is the foundation of concurrent programming in Go. Next we'll learn testing and standard library.`,
    },
    10: {
      id: `Kita telah menguasai testing, table-driven tests, JSON handling, dan package-package penting di standard library. Go memiliki testing tools built-in yang powerful. Selanjutnya kita akan membangun CLI tools dan HTTP server.`,
      en: `We've mastered testing, table-driven tests, JSON handling, and important standard library packages. Go has powerful built-in testing tools. Next we'll build CLI tools and HTTP servers.`,
    },
    11: {
      id: `Kita telah membangun CLI tool dengan flag package dan HTTP server dengan net/http. Go membuat pembuatan tool command-line dan web server sangat mudah. Selanjutnya kita akan belajar REST API dan middleware.`,
      en: `We've built CLI tools with the flag package and HTTP servers with net/http. Go makes creating command-line tools and web servers very easy. Next we'll learn REST APIs and middleware.`,
    },
    12: {
      id: `Kita telah membangun REST API lengkap dengan middleware pattern dan structured logging. Go standard library sudah cukup untuk production API. Selanjutnya kita akan belajar database dan deployment.`,
      en: `We've built a complete REST API with middleware pattern and structured logging. The Go standard library is sufficient for production APIs. Next we'll learn databases and deployment.`,
    },
    13: {
      id: `Kita telah mempelajari koneksi database SQL, Docker multi-stage build, dan environment-based configuration. Go dan Docker adalah kombinasi sempurna untuk microservices. Selanjutnya kita akan mempelajari pattern lanjutan dan menyelesaikan proyek akhir.`,
      en: `We've learned SQL database connections, multi-stage Docker builds, and environment-based configuration. Go and Docker are a perfect combination for microservices. Next we'll learn advanced patterns and complete the final project.`,
    },
    14: {
      id: `Selamat! Kita telah menyelesaikan seluruh kurikulum Go. Dari sintaks dasar hingga production-ready application, kamu sekarang memiliki fondasi kuat sebagai Go developer. Teruslah membangun dan berkontribusi di komunitas Go!`,
      en: `Congratulations! We've completed the entire Go curriculum. From basic syntax to production-ready applications, you now have a solid foundation as a Go developer. Keep building and contributing to the Go community!`,
    },
  };
  return s[weekNum]?.[prefix] || 'Summary of the week.';
}

weeks.forEach(({ w, f, lid, len }) => {
  const level = Object.entries(levels).find(([, v]) => w >= v.first && w <= v.last)?.[0] || 'beginer';
  
  // ID version
  const idContent = `# ${lid}

> Kategori: Go, Bahasa Pemrograman | Level: ${levels[level].nid} | Week ${w}

## Learning Objectives

${getObjectives(w, 'id').map(o => `- ${o}`).join('\n')}

## Materi

${getTheory(w, 'id').id}

## Practice Exercises

${getExercises(w, 'id').id}

## Summary

${getSummary(w, 'id').id}
`;

  // EN version
  const enContent = `# ${len}

> Category: Go, Programming Language | Level: ${levels[level].nen} | Week ${w}

## Learning Objectives

${getObjectives(w, 'en').map(o => `- ${o}`).join('\n')}

## Materials

${getTheory(w, 'en').en}

## Practice Exercises

${getExercises(w, 'en').en}

## Summary

${getSummary(w, 'en').en}
`;

  fs.writeFileSync(path.join(BASE, level, 'id', `week${w}-${f}.md`), idContent);
  fs.writeFileSync(path.join(BASE, level, 'en', `week${w}-${f}.md`), enContent);
  console.log(`Created week${w} (${level})`);
});

console.log('\nAll 28 Go curriculum files created!');
