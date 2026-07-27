import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'public', 'data', 'course', 'golang');

const weeks = [
  { w: 1, f: 'pengenalan-go', lid: 'Pengenalan Go & Toolchain', len: 'Introduction to Go & Toolchain', cid: 'Halo Dunia' },
  { w: 2, f: 'tipe-data-kontrol', lid: 'Variabel, Tipe Data & Control Flow', len: 'Variables, Data Types & Control Flow', cid: 'Data Diri' },
  { w: 3, f: 'fungsi-error', lid: 'Fungsi & Error Handling', len: 'Functions & Error Handling', cid: 'Kalkulator' },
  { w: 4, f: 'array-slice-map', lid: 'Array, Slice & Map', len: 'Arrays, Slices & Maps', cid: 'Manajemen Koleksi' },
  { w: 5, f: 'struct-pointer', lid: 'Struct, Method & Pointer', len: 'Structs, Methods & Pointers', cid: 'Data Pengguna' },
  { w: 6, f: 'interface-package', lid: 'Interface & Package', len: 'Interfaces & Packages', cid: 'Polimorfisme' },
  { w: 7, f: 'defer-file-io', lid: 'Defer, Panic & File I/O', len: 'Defer, Panic & File I/O', cid: 'Manajemen Sumber Daya' },
  { w: 8, f: 'goroutine-waitgroup', lid: 'Goroutine & WaitGroup', len: 'Goroutines & WaitGroups', cid: 'Eksekusi Paralel' },
  { w: 9, f: 'channel-context', lid: 'Channel, Select & Context', len: 'Channels, Select & Context', cid: 'Komunikasi Goroutine' },
  { w: 10, f: 'testing-stdlib', lid: 'Testing & Standard Library', len: 'Testing & Standard Library', cid: 'Pengujian & JSON' },
  { w: 11, f: 'cli-http-server', lid: 'CLI Tool & HTTP Server', len: 'CLI Tools & HTTP Server', cid: 'Server CLI' },
  { w: 12, f: 'rest-api-middleware', lid: 'REST API & Middleware', len: 'REST API & Middleware', cid: 'API Task' },
  { w: 13, f: 'database-deploy', lid: 'Database & Deployment', len: 'Database & Deployment', cid: 'Konfigurasi Aplikasi' },
  { w: 14, f: 'advanced-final', lid: 'Pattern Lanjutan & Proyek Akhir', len: 'Advanced Patterns & Final Project', cid: 'Proyek Akhir' },
];

const levels = {
  beginer: { nid: 'Pemula', nen: 'Beginner', first: 1, last: 6 },
  intermediate: { nid: 'Menengah', nen: 'Intermediate', first: 7, last: 10 },
  advanced: { nid: 'Lanjutan', nen: 'Advanced', first: 11, last: 14 },
};

function getLevel(weekNum) {
  for (const [lv, info] of Object.entries(levels)) {
    if (weekNum >= info.first && weekNum <= info.last) return lv;
  }
  return 'beginer';
}

// ── Content: Objectives ──

const OBJ = {
  1: { id: ['Memahami konsep bahasa compiled vs interpreted', 'Menginstal Go dan menulis program pertama', 'Mengenal toolchain: go run, build, fmt, test', 'Memahami struktur file .go dan func main', 'Membedakan export vs unexport (huruf besar/kecil)'], en: ['Understand compiled vs interpreted languages', 'Install Go and write your first program', 'Learn the toolchain: go run, build, fmt, test', 'Understand .go file structure and func main', 'Distinguish exported vs unexported names'] },
  2: { id: ['Mendeklarasikan variabel dengan var dan :=', 'Mengenal tipe dasar: int, float64, string, bool', 'Menggunakan perulangan for', 'Menerapkan if/else dan switch tanpa break', 'Memahami zero values dan konstanta'], en: ['Declare variables with var and :=', 'Learn basic types: int, float64, string, bool', 'Use for loops', 'Apply if/else and switch without break', 'Understand zero values and constants'] },
  3: { id: ['Membuat fungsi dengan parameter dan return value', 'Menggunakan multiple return values dan named returns', 'Mengenal tipe error dan pola if err != nil', 'Membuat error dengan fmt.Errorf', 'Menulis fungsi variadic'], en: ['Create functions with parameters and return values', 'Use multiple return values and named returns', 'Learn the error type and if err != nil pattern', 'Create errors with fmt.Errorf', 'Write variadic functions'] },
  4: { id: ['Membedakan array (fixed) dan slice (dinamis)', 'Menggunakan append, make, len, cap pada slice', 'Membuat dan memanipulasi map', 'Melakukan iterasi dengan range', 'Memahami operasi slice: slicing, copy, delete'], en: ['Distinguish arrays (fixed) vs slices (dynamic)', 'Use append, make, len, cap on slices', 'Create and manipulate maps', 'Iterate with range', 'Understand slice operations'] },
  5: { id: ['Mendefinisikan struct sebagai tipe data kustom', 'Menambahkan method dengan value vs pointer receiver', 'Memahami pointer (& dan *)', 'Menggunakan constructor function New...', 'Menerapkan method chaining'], en: ['Define structs as custom data types', 'Add methods with value vs pointer receivers', 'Understand pointers (& and *)', 'Use constructor functions', 'Apply method chaining'] },
  6: { id: ['Mendefinisikan interface implisit', 'Menggunakan interface sebagai parameter fungsi', 'Menerapkan empty interface (any)', 'Melakukan type assertion dan type switch', 'Memahami composition dengan embedding'], en: ['Define interfaces with implicit satisfaction', 'Use interfaces as function parameters', 'Apply empty interfaces (any)', 'Perform type assertions and type switches', 'Understand composition with embedding'] },
  7: { id: ['Menggunakan defer untuk menjadwalkan eksekusi', 'Memahami stack LIFO pada multiple defer', 'Menerapkan panic dan recover', 'Membaca dan menulis file dengan os package', 'Menggunakan bufio.Scanner'], en: ['Use defer to schedule execution', 'Understand LIFO stack with multiple defers', 'Apply panic and recover', 'Read and write files with the os package', 'Use bufio.Scanner'] },
  8: { id: ['Menjalankan goroutine dengan keyword go', 'Menggunakan sync.WaitGroup', 'Menerapkan sync.Mutex', 'Mendeteksi race condition', 'Memahami model concurrency Go'], en: ['Run goroutines with the go keyword', 'Use sync.WaitGroup', 'Apply sync.Mutex', 'Detect race conditions', 'Understand Go concurrency model'] },
  9: { id: ['Membuat unbuffered dan buffered channel', 'Mengirim (ch <-) dan menerima (<-ch) data', 'Menggunakan select untuk multiplexing', 'Menerapkan context.WithTimeout', 'Menggunakan close() dan range channel'], en: ['Create unbuffered and buffered channels', 'Send (ch <-) and receive (<-ch) data', 'Use select for multiplexing', 'Apply context.WithTimeout', 'Use close() and range over channels'] },
  10: { id: ['Menulis unit test dengan package testing', 'Menerapkan table-driven test', 'Menggunakan encoding/json', 'Memanipulasi string dengan strings', 'Menulis benchmark test'], en: ['Write unit tests with testing package', 'Apply table-driven tests', 'Use encoding/json', 'Manipulate strings with strings package', 'Write benchmark tests'] },
  11: { id: ['Membangun CLI tool dengan flag', 'Membuat HTTP server dengan net/http', 'Memahami handler dan ServeMux', 'Menggabungkan mode CLI dan HTTP', 'Membaca environment variable'], en: ['Build CLI tools with flag', 'Create HTTP servers with net/http', 'Understand handlers and ServeMux', 'Combine CLI and HTTP modes', 'Read environment variables'] },
  12: { id: ['Membangun REST API dengan method routing', 'Menerapkan JSON request/response', 'Membuat middleware pattern', 'Menambahkan structured logging (slog)', 'Menulis API yang terstruktur'], en: ['Build REST APIs with method routing', 'Apply JSON request/response', 'Create middleware patterns', 'Add structured logging (slog)', 'Write structured APIs'] },
  13: { id: ['Menghubungkan Go ke database SQL', 'Menggunakan database/sql', 'Membaca konfigurasi dari environment', 'Menulis Dockerfile multi-stage', 'Men-deploy aplikasi Go'], en: ['Connect Go to SQL databases', 'Use database/sql', 'Read config from environment', 'Write multi-stage Dockerfiles', 'Deploy Go applications'] },
  14: { id: ['Menerapkan worker pool pattern', 'Menggunakan fan-in/fan-out', 'Melakukan profiling dengan pprof', 'Mengintegrasikan semua komponen', 'Menulis kode Go production-ready'], en: ['Apply worker pool pattern', 'Use fan-in/fan-out', 'Profile with pprof', 'Integrate all components', 'Write production-ready Go code'] },
};

// ── Content: Code (ID) ──

const CODE_ID = {
  1: `package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Program pertama Anda.")

    var nama string = "Gopher"
    var versi float64 = 1.24
    var aktif bool = true

    tahun := 2009
    pesan := "Go adalah bahasa open-source"

    fmt.Println("Nama:", nama)
    fmt.Println("Versi:", versi)
    fmt.Println("Aktif:", aktif)
    fmt.Println("Tahun rilis:", tahun)
    fmt.Println("Pesan:", pesan)
}`,

  2: `package main

import "fmt"

func main() {
    var namaDepan string = "Budi"
    var usia int = 25
    tinggi := 175.5
    var menikah bool

    fmt.Println("Nama:", namaDepan)
    fmt.Println("Usia:", usia)
    fmt.Println("Tinggi:", tinggi, "cm")
    fmt.Println("Menikah:", menikah)

    const phi = 3.14159
    fmt.Println("Phi:", phi)

    fmt.Print("Angka: ")
    for i := 1; i <= 5; i++ {
        fmt.Print(i, " ")
    }
    fmt.Println()

    nilai := 85
    if nilai >= 90 {
        fmt.Println("Grade: A")
    } else if nilai >= 75 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: C")
    }

    hari := "Senin"
    switch hari {
    case "Sabtu", "Minggu":
        fmt.Println("Akhir pekan")
    default:
        fmt.Println("Hari kerja")
    }
}`,

  3: `package main

import (
    "fmt"
    "errors"
)

func sapa(nama string) string {
    return "Halo, " + nama
}

func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa membagi dengan nol")
    }
    return a / b, nil
}

func jumlahkan(angka ...int) (total int) {
    for _, n := range angka {
        total += n
    }
    return
}

func main() {
    fmt.Println(sapa("Budi"))

    hasil, err := bagi(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("10 / 2 =", hasil)
    }

    _, err = bagi(5, 0)
    if err != nil {
        fmt.Println("Error:", err)
    }

    fmt.Println("1+2+3+4+5 =", jumlahkan(1, 2, 3, 4, 5))
}`,

  4: `package main

import "fmt"

func main() {
    var hari [5]string
    hari[0] = "Senin"
    hari[1] = "Selasa"
    fmt.Println("Array:", hari)

    buah := []string{"apel", "mangga", "pisang"}
    fmt.Println("Slice awal:", buah)

    buah = append(buah, "jeruk", "anggur")
    fmt.Println("Setelah append:", buah)
    fmt.Println("Panjang:", len(buah), "Kapasitas:", cap(buah))
    fmt.Println("Buah[1:3]:", buah[1:3])

    nilai := map[string]int{
        "Alice": 90,
        "Bob":   78,
        "Eve":   85,
    }
    fmt.Println("Nilai siswa:")
    for nama, n := range nilai {
        fmt.Printf("  %s: %d\\n", nama, n)
    }

    if n, ok := nilai["Alice"]; ok {
        fmt.Println("Nilai Alice:", n)
    }
    delete(nilai, "Bob")

    fmt.Print("Daftar buah: ")
    for i, b := range buah {
        fmt.Printf("%d:%s ", i, b)
    }
    fmt.Println()
}`,

  5: `package main

import "fmt"

type User struct {
    ID       int
    Nama     string
    Email    string
    IsActive bool
}

func NewUser(id int, nama, email string) User {
    return User{ID: id, Nama: nama, Email: email, IsActive: true}
}

func (u User) Sapa() string {
    return "Halo, saya " + u.Nama
}

func (u *User) Nonaktifkan() {
    u.IsActive = false
}

type Counter struct {
    Value int
}

func (c *Counter) Tambah(n int) *Counter {
    c.Value += n
    return c
}

func main() {
    x := 42
    p := &x
    fmt.Println("x:", x, "*p:", *p)
    *p = 21
    fmt.Println("Setelah *p = 21, x:", x)

    u1 := NewUser(1, "Alice", "alice@example.com")
    fmt.Println(u1.Sapa())
    fmt.Println("Aktif:", u1.IsActive)
    u1.Nonaktifkan()
    fmt.Println("Setelah dinonaktifkan:", u1.IsActive)

    c := &Counter{}
    c.Tambah(5).Tambah(10).Tambah(3)
    fmt.Println("Counter:", c.Value)
}`,

  6: `package main

import "fmt"

type Greeter interface {
    Greet() string
}

type Indonesia struct {
    Nama string
}

func (i Indonesia) Greet() string {
    return "Halo, " + i.Nama
}

type Inggris struct {
    Nama string
}

func (i Inggris) Greet() string {
    return "Hello, " + i.Nama
}

func sambut(g Greeter) {
    fmt.Println(g.Greet())
}

func cetakApapun(v any) {
    fmt.Printf("Nilai: %v, Tipe: %T\\n", v, v)
}

func identifikasi(v any) {
    switch t := v.(type) {
    case int:
        fmt.Println("Ini integer:", t*2)
    case string:
        fmt.Println("Ini string:", len(t), "karakter")
    default:
        fmt.Println("Tipe lain:", t)
    }
}

func main() {
    sambut(Indonesia{Nama: "Budi"})
    sambut(Inggris{Nama: "John"})

    cetakApapun(42)
    cetakApapun("Halo")
    cetakApapun(3.14)

    identifikasi(10)
    identifikasi("Go")
    identifikasi(true)
}`,

  7: `package main

import "fmt"

func main() {
    fmt.Println("Mulai")
    defer fmt.Println("1. defer: pertama")
    defer fmt.Println("2. defer: kedua")
    defer fmt.Println("3. defer: ketiga")
    fmt.Println("Selesai -- defer akan dijalankan:")

    hasil := bagiAman(10, 2)
    fmt.Println("10 / 2 =", hasil)

    hasil = bagiAman(10, 0)
    fmt.Println("10 / 0 =", hasil)

    data := bacaFile("contoh.txt")
    fmt.Println("Isi file:", data)

    fmt.Println("Program selesai tanpa crash!")
}

func bagiAman(a, b int) (hasil int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recover dari panic:", r)
            hasil = 0
        }
    }()
    return a / b
}

func bacaFile(nama string) string {
    defer fmt.Println("(file ditutup di sini)")
    if nama == "" {
        return "Error: nama file kosong"
    }
    return "[simulasi konten file]"
}`,

  8: `package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    go func() {
        fmt.Println("Hello dari goroutine!")
    }()
    time.Sleep(10 * time.Millisecond)

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Worker %d mulai\\n", id)
            time.Sleep(50 * time.Millisecond)
            fmt.Printf("Worker %d selesai\\n", id)
        }(i)
    }
    wg.Wait()
    fmt.Println("Semua worker selesai!")

    type Akun struct {
        mu    sync.Mutex
        Saldo int
    }
    akun := &Akun{}
    var wg2 sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            akun.mu.Lock()
            akun.Saldo += 100
            akun.mu.Unlock()
        }()
    }
    wg2.Wait()
    fmt.Println("Saldo akhir:", akun.Saldo)
}`,

  9: `package main

import (
    "fmt"
    "time"
    "context"
)

func main() {
    ch := make(chan string)
    go func() {
        ch <- "pesan dari goroutine"
    }()
    msg := <-ch
    fmt.Println("Terima:", msg)

    buf := make(chan int, 3)
    buf <- 10; buf <- 20; buf <- 30
    close(buf)
    fmt.Print("Buffered: ")
    for v := range buf {
        fmt.Print(v, " ")
    }
    fmt.Println()

    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() {
        time.Sleep(20 * time.Millisecond)
        ch1 <- "data dari ch1"
    }()
    go func() {
        time.Sleep(10 * time.Millisecond)
        ch2 <- "data dari ch2"
    }()
    select {
    case v := <-ch1:
        fmt.Println("ch1:", v)
    case v := <-ch2:
        fmt.Println("ch2:", v)
    case <-time.After(100 * time.Millisecond):
        fmt.Println("timeout!")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 15*time.Millisecond)
    defer cancel()
    select {
    case <-time.After(30 * time.Millisecond):
        fmt.Println("Selesai tepat waktu")
    case <-ctx.Done():
        fmt.Println("Context timeout:", ctx.Err())
    }
}`,

  10: `package main

import (
    "fmt"
    "strings"
    "encoding/json"
)

func Tambah(a, b int) int { return a + b }

func Bagi(a, b float64) (float64, error) {
    if b == 0 { return 0, fmt.Errorf("cannot divide by zero") }
    return a / b, nil
}

type Orang struct {
    Nama  string \`json:"nama"\`
    Usia  int    \`json:"usia"\`
    Aktif bool   \`json:"aktif"\`
}

func main() {
    fmt.Println("2 + 3 =", Tambah(2, 3))
    fmt.Println("7 + 12 =", Tambah(7, 12))

    h, err := Bagi(10, 3)
    if err == nil { fmt.Printf("10 / 3 = %.2f\\n", h) }

    kata := "  hello, Go!  "
    fmt.Println("Trim:", strings.TrimSpace(kata))
    fmt.Println("Upper:", strings.ToUpper(kata))
    fmt.Println("Contains Go:", strings.Contains(kata, "Go"))
    fmt.Println("Split:", strings.Split("a,b,c", ","))

    o := Orang{Nama: "Alice", Usia: 30, Aktif: true}
    jsonData, _ := json.MarshalIndent(o, "", "  ")
    fmt.Println("JSON output:")
    fmt.Println(string(jsonData))

    jsonStr := \`{"nama":"Bob","usia":25,"aktif":false}\`
    var o2 Orang
    json.Unmarshal([]byte(jsonStr), &o2)
    fmt.Printf("Decoded: %+v\\n", o2)
}`,

  11: `package main

import (
    "flag"
    "fmt"
    "log"
    "net/http"
    "os"
)

func main() {
    isServer := false
    for _, arg := range os.Args[1:] {
        if arg == "serve" { isServer = true; break }
    }
    if isServer { startServer() } else { runCLI() }
}

func runCLI() {
    nama := flag.String("name", "World", "nama untuk disapa")
    count := flag.Int("count", 1, "jumlah pengulangan")
    flag.Parse()
    for i := 0; i < *count; i++ {
        fmt.Printf("Hello, %s!\\n", *nama)
    }
}

func startServer() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
    })
    mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Write([]byte(\`{"status":"ok"}\`))
    })
    port := os.Getenv("PORT")
    if port == "" { port = "8080" }
    log.Printf("Server running on :%s", port)
    log.Fatal(http.ListenAndServe(":"+port, mux))
}`,

  12: `package main

import (
    "encoding/json"
    "log"
    "log/slog"
    "net/http"
    "os"
    "sync"
    "time"
)

type Task struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
    Done bool   \`json:"done"\`
}

var (
    tasks  []Task
    nextID = 1
    mu     sync.Mutex
)

func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        slog.Info("request", "method", r.Method, "path", r.URL.Path, "duration", time.Since(start))
    })
}

func auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Header.Get("Authorization") == "" {
            http.Error(w, \`{"error":"unauthorized"}\`, http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

func getTasks(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    defer mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
    var task Task
    if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
        http.Error(w, \`{"error":"invalid json"}\`, http.StatusBadRequest)
        return
    }
    mu.Lock()
    task.ID = nextID; nextID++
    tasks = append(tasks, task)
    mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}

func main() {
    slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))
    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/tasks", getTasks)
    mux.HandleFunc("POST /api/tasks", createTask)
    app := logging(auth(mux))
    port := os.Getenv("PORT")
    if port == "" { port = "8080" }
    slog.Info("server starting", "port", port)
    log.Fatal(http.ListenAndServe(":"+port, app))
}`,

  13: `package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "log/slog"
    "net/http"
    "os"
    _ "github.com/lib/pq"
)

type Config struct {
    Port   string
    DBHost string
    DBPort string
    DBUser string
    DBPass string
    DBName string
}

func getEnv(key, fallback string) string {
    if v := os.Getenv(key); v != "" { return v }
    return fallback
}

func LoadConfig() Config {
    return Config{
        Port: getEnv("PORT", "8080"), DBHost: getEnv("DB_HOST", "localhost"),
        DBPort: getEnv("DB_PORT", "5432"), DBUser: getEnv("DB_USER", "postgres"),
        DBPass: getEnv("DB_PASS", ""), DBName: getEnv("DB_NAME", "tryngo"),
    }
}

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func main() {
    slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))
    cfg := LoadConfig()
    slog.Info("configuration loaded", "port", cfg.Port, "db_host", cfg.DBHost)

    dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable",
        cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBName)
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        slog.Warn("database not available in playground", "error", err)
    } else {
        defer db.Close()
        slog.Info("database connection established")
    }
    _ = db

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })
    slog.Info("server starting", "port", cfg.Port)
    log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}`,

  14: `package main

import (
    "fmt"
    "sync"
)

func workerPool(numWorkers int, jobs <-chan int, results chan<- int) {
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for job := range jobs { results <- job * 2 }
        }(i)
    }
    wg.Wait()
    close(results)
}

func fanIn(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for msg := range c { out <- msg }
        }(ch)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    fmt.Println("-- Worker Pool --")
    jobs := make(chan int, 10)
    results := make(chan int, 10)
    for i := 1; i <= 5; i++ { jobs <- i }
    close(jobs)
    go workerPool(3, jobs, results)
    for r := range results { fmt.Printf("Hasil: %d\\n", r) }

    fmt.Println("\\n-- Fan-in --")
    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() { ch1 <- "data A1"; ch1 <- "data A2"; close(ch1) }()
    go func() { ch2 <- "data B1"; ch2 <- "data B2"; close(ch2) }()
    merged := fanIn(ch1, ch2)
    for msg := range merged { fmt.Println(msg) }

    fmt.Println("\\nProyek akhir siap dikembangkan!")
}`,
};

// ── Content: Code (EN) ──

const CODE_EN = {
  1: `package main

import "fmt"

func main() {
    fmt.Println("Welcome to Go!")
    fmt.Println("Your first Go program.")

    var name string = "Gopher"
    var version float64 = 1.24
    var active bool = true

    year := 2009
    message := "Go is an open-source language"

    fmt.Println("Name:", name)
    fmt.Println("Version:", version)
    fmt.Println("Active:", active)
    fmt.Println("Release year:", year)
    fmt.Println("Message:", message)
}`,

  2: `package main

import "fmt"

func main() {
    var firstName string = "John"
    var age int = 25
    height := 175.5
    var married bool

    fmt.Println("Name:", firstName)
    fmt.Println("Age:", age)
    fmt.Println("Height:", height, "cm")
    fmt.Println("Married:", married)

    const pi = 3.14159
    fmt.Println("Pi:", pi)

    fmt.Print("Numbers: ")
    for i := 1; i <= 5; i++ {
        fmt.Print(i, " ")
    }
    fmt.Println()

    score := 85
    if score >= 90 { fmt.Println("Grade: A")
    } else if score >= 75 { fmt.Println("Grade: B")
    } else { fmt.Println("Grade: C") }

    day := "Monday"
    switch day {
    case "Saturday", "Sunday": fmt.Println("Weekend")
    default: fmt.Println("Weekday")
    }
}`,

  3: `package main

import (
    "fmt"
    "errors"
)

func greet(name string) string { return "Hello, " + name }

func divide(a, b float64) (float64, error) {
    if b == 0 { return 0, errors.New("cannot divide by zero") }
    return a / b, nil
}

func sum(numbers ...int) (total int) {
    for _, n := range numbers { total += n }
    return
}

func main() {
    fmt.Println(greet("John"))
    result, err := divide(10, 2)
    if err != nil { fmt.Println("Error:", err)
    } else { fmt.Println("10 / 2 =", result) }
    _, err = divide(5, 0)
    if err != nil { fmt.Println("Error:", err) }
    fmt.Println("1+2+3+4+5 =", sum(1, 2, 3, 4, 5))
}`,

  4: `package main

import "fmt"

func main() {
    var days [5]string
    days[0] = "Monday"; days[1] = "Tuesday"
    fmt.Println("Array:", days)

    fruits := []string{"apple", "mango", "banana"}
    fruits = append(fruits, "orange", "grape")
    fmt.Println("Slice:", fruits)
    fmt.Println("Len:", len(fruits), "Cap:", cap(fruits))
    fmt.Println("Fruits[1:3]:", fruits[1:3])

    scores := map[string]int{"Alice": 90, "Bob": 78, "Eve": 85}
    fmt.Println("Scores:")
    for name, s := range scores { fmt.Printf("  %s: %d\\n", name, s) }
    if s, ok := scores["Alice"]; ok { fmt.Println("Alice score:", s) }
    delete(scores, "Bob")

    fmt.Print("Fruits: ")
    for i, f := range fruits { fmt.Printf("%d:%s ", i, f) }
    fmt.Println()
}`,

  5: `package main

import "fmt"

type User struct {
    ID       int
    Name     string
    Email    string
    IsActive bool
}

func NewUser(id int, name, email string) User {
    return User{ID: id, Name: name, Email: email, IsActive: true}
}

func (u User) Greet() string { return "Hello, I'm " + u.Name }
func (u *User) Deactivate() { u.IsActive = false }

type Counter struct{ Value int }
func (c *Counter) Add(n int) *Counter { c.Value += n; return c }

func main() {
    x := 42; p := &x
    fmt.Println("x:", x, "*p:", *p)
    *p = 21; fmt.Println("After *p=21, x:", x)

    u1 := NewUser(1, "Alice", "alice@example.com")
    fmt.Println(u1.Greet())
    fmt.Println("Active:", u1.IsActive)
    u1.Deactivate()
    fmt.Println("After deactivate:", u1.IsActive)

    c := &Counter{}
    c.Add(5).Add(10).Add(3)
    fmt.Println("Counter:", c.Value)
}`,

  6: `package main

import "fmt"

type Greeter interface { Greet() string }

type Indonesian struct{ Name string }
func (i Indonesian) Greet() string { return "Halo, " + i.Name }

type English struct{ Name string }
func (e English) Greet() string { return "Hello, " + e.Name }

func greet(g Greeter) { fmt.Println(g.Greet()) }

func printAnything(v any) { fmt.Printf("Value: %v, Type: %T\\n", v, v) }

func identify(v any) {
    switch t := v.(type) {
    case int: fmt.Println("This is an int:", t*2)
    case string: fmt.Println("This is a string:", len(t), "chars")
    default: fmt.Println("Other type:", t)
    }
}

func main() {
    greet(Indonesian{Name: "Budi"})
    greet(English{Name: "John"})
    printAnything(42)
    printAnything("Hello")
    printAnything(3.14)
    identify(10)
    identify("Go")
    identify(true)
}`,

  7: `package main

import "fmt"

func main() {
    fmt.Println("Start")
    defer fmt.Println("1. defer: first")
    defer fmt.Println("2. defer: second")
    defer fmt.Println("3. defer: third")
    fmt.Println("End -- defers will run:")

    result := safeDivide(10, 2)
    fmt.Println("10 / 2 =", result)
    result = safeDivide(10, 0)
    fmt.Println("10 / 0 =", result)

    data := readFile("example.txt")
    fmt.Println("File contents:", data)
    fmt.Println("Program finished without crash!")
}

func safeDivide(a, b int) (result int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r); result = 0
        }
    }()
    return a / b
}

func readFile(name string) string {
    defer fmt.Println("(file closed here)")
    if name == "" { return "Error: empty filename" }
    return "[simulated file content]"
}`,

  8: `package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    go func() { fmt.Println("Hello from goroutine!") }()
    time.Sleep(10 * time.Millisecond)

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Worker %d starting\\n", id)
            time.Sleep(50 * time.Millisecond)
            fmt.Printf("Worker %d done\\n", id)
        }(i)
    }
    wg.Wait()
    fmt.Println("All workers done!")

    type Account struct {
        mu      sync.Mutex
        Balance int
    }
    acc := &Account{}
    var wg2 sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            acc.mu.Lock()
            acc.Balance += 100
            acc.mu.Unlock()
        }()
    }
    wg2.Wait()
    fmt.Println("Final balance:", acc.Balance)
}`,

  9: `package main

import (
    "fmt"
    "time"
    "context"
)

func main() {
    ch := make(chan string)
    go func() { ch <- "message from goroutine" }()
    msg := <-ch
    fmt.Println("Received:", msg)

    buf := make(chan int, 3)
    buf <- 10; buf <- 20; buf <- 30
    close(buf)
    fmt.Print("Buffered: ")
    for v := range buf { fmt.Print(v, " ") }
    fmt.Println()

    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() { time.Sleep(20 * time.Millisecond); ch1 <- "data from ch1" }()
    go func() { time.Sleep(10 * time.Millisecond); ch2 <- "data from ch2" }()
    select {
    case v := <-ch1: fmt.Println("ch1:", v)
    case v := <-ch2: fmt.Println("ch2:", v)
    case <-time.After(100 * time.Millisecond): fmt.Println("timeout!")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 15*time.Millisecond)
    defer cancel()
    select {
    case <-time.After(30 * time.Millisecond): fmt.Println("Finished on time")
    case <-ctx.Done(): fmt.Println("Context timeout:", ctx.Err())
    }
}`,

  10: `package main

import (
    "fmt"
    "strings"
    "encoding/json"
)

func Add(a, b int) int { return a + b }

func Divide(a, b float64) (float64, error) {
    if b == 0 { return 0, fmt.Errorf("cannot divide by zero") }
    return a / b, nil
}

type Person struct {
    Name   string \`json:"name"\`
    Age    int    \`json:"age"\`
    Active bool   \`json:"active"\`
}

func main() {
    fmt.Println("2 + 3 =", Add(2, 3))
    fmt.Println("7 + 12 =", Add(7, 12))
    r, err := Divide(10, 3)
    if err == nil { fmt.Printf("10 / 3 = %.2f\\n", r) }

    word := "  hello, Go!  "
    fmt.Println("Trim:", strings.TrimSpace(word))
    fmt.Println("Upper:", strings.ToUpper(word))
    fmt.Println("Contains Go:", strings.Contains(word, "Go"))
    fmt.Println("Split:", strings.Split("a,b,c", ","))

    p := Person{Name: "Alice", Age: 30, Active: true}
    jsonData, _ := json.MarshalIndent(p, "", "  ")
    fmt.Println("JSON output:")
    fmt.Println(string(jsonData))

    jsonStr := \`{"name":"Bob","age":25,"active":false}\`
    var p2 Person
    json.Unmarshal([]byte(jsonStr), &p2)
    fmt.Printf("Decoded: %+v\\n", p2)
}`,

  11: `package main

import (
    "flag"
    "fmt"
    "log"
    "net/http"
    "os"
)

func main() {
    isServer := false
    for _, arg := range os.Args[1:] { if arg == "serve" { isServer = true; break } }
    if isServer { startServer() } else { runCLI() }
}

func runCLI() {
    name := flag.String("name", "World", "name to greet")
    count := flag.Int("count", 1, "repeat count")
    flag.Parse()
    for i := 0; i < *count; i++ { fmt.Printf("Hello, %s!\\n", *name) }
}

func startServer() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
    })
    mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Write([]byte(\`{"status":"ok"}\`))
    })
    port := os.Getenv("PORT")
    if port == "" { port = "8080" }
    log.Printf("Server running on :%s", port)
    log.Fatal(http.ListenAndServe(":"+port, mux))
}`,

  12: `package main

import (
    "encoding/json"
    "log"
    "log/slog"
    "net/http"
    "os"
    "sync"
    "time"
)

type Task struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
    Done bool   \`json:"done"\`
}

var (
    tasks  []Task
    nextID = 1
    mu     sync.Mutex
)

func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        slog.Info("request", "method", r.Method, "path", r.URL.Path, "duration", time.Since(start))
    })
}

func auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Header.Get("Authorization") == "" {
            http.Error(w, \`{"error":"unauthorized"}\`, http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

func getTasks(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    defer mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
    var task Task
    if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
        http.Error(w, \`{"error":"invalid json"}\`, http.StatusBadRequest)
        return
    }
    mu.Lock()
    task.ID = nextID; nextID++
    tasks = append(tasks, task)
    mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}

func main() {
    slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))
    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/tasks", getTasks)
    mux.HandleFunc("POST /api/tasks", createTask)
    app := logging(auth(mux))
    port := os.Getenv("PORT")
    if port == "" { port = "8080" }
    slog.Info("server starting", "port", port)
    log.Fatal(http.ListenAndServe(":"+port, app))
}`,

  13: `package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "log/slog"
    "net/http"
    "os"
    _ "github.com/lib/pq"
)

type Config struct {
    Port   string
    DBHost string
    DBPort string
    DBUser string
    DBPass string
    DBName string
}

func getEnv(key, fallback string) string {
    if v := os.Getenv(key); v != "" { return v }
    return fallback
}

func LoadConfig() Config {
    return Config{
        Port: getEnv("PORT", "8080"), DBHost: getEnv("DB_HOST", "localhost"),
        DBPort: getEnv("DB_PORT", "5432"), DBUser: getEnv("DB_USER", "postgres"),
        DBPass: getEnv("DB_PASS", ""), DBName: getEnv("DB_NAME", "tryngo"),
    }
}

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func main() {
    slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))
    cfg := LoadConfig()
    slog.Info("config loaded", "port", cfg.Port, "db_host", cfg.DBHost)

    dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable",
        cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBName)
    db, err := sql.Open("postgres", dsn)
    if err != nil { slog.Warn("db unavailable", "error", err)
    } else { defer db.Close(); slog.Info("db connected") }
    _ = db

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })
    slog.Info("server starting", "port", cfg.Port)
    log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}`,

  14: `package main

import (
    "fmt"
    "sync"
)

func workerPool(numWorkers int, jobs <-chan int, results chan<- int) {
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for job := range jobs { results <- job * 2 }
        }(i)
    }
    wg.Wait()
    close(results)
}

func fanIn(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for msg := range c { out <- msg }
        }(ch)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    fmt.Println("-- Worker Pool --")
    jobs := make(chan int, 10)
    results := make(chan int, 10)
    for i := 1; i <= 5; i++ { jobs <- i }
    close(jobs)
    go workerPool(3, jobs, results)
    for r := range results { fmt.Printf("Result: %d\\n", r) }

    fmt.Println("\\n-- Fan-in --")
    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() { ch1 <- "data A1"; ch1 <- "data A2"; close(ch1) }()
    go func() { ch2 <- "data B1"; ch2 <- "data B2"; close(ch2) }()
    merged := fanIn(ch1, ch2)
    for msg := range merged { fmt.Println(msg) }

    fmt.Println("\\nFinal project ready to be built!")
}`,
};

// ── Content: Explanations ──

const EXP_ID = {
  1: `### Struktur Program Go

Setiap file .go dimulai dengan \`package main\`. Fungsi \`main()\` adalah entry point -- eksekusi dimulai dari sini.

\`import "fmt"\` membawa package fmt untuk format input/output. \`fmt.Println()\` mencetak teks dengan baris baru.

### Variabel

Dua cara deklarasi: **eksplisit** (\`var nama string = "Gopher"\`) dan **short declaration** (\`tahun := 2009\`). Go menebak tipe dari nilai.

### Ekspor vs Unekospor

**Huruf besar = publik (diekspor)**, huruf kecil = privat. \`fmt.Println\` bisa dipanggil karena \`Println\` huruf besar.`,

  2: `### Variabel dan Tipe Data

Go **statically typed** -- tipe ditentukan di compile time. \`string\`, \`int\`, \`float64\`, \`bool\` adalah tipe dasar.

**Zero values**: variabel tanpa nilai awal punya default: \`0\` untuk int, \`""\` untuk string, \`false\` untuk bool.

### Konstanta dan Perulangan

\`const phi = 3.14159\` -- nilai tetap. Go hanya punya \`for\` -- format: \`for init; kondisi; increment\`.

### if/else dan switch

\`if\` dan \`switch\` tanpa kurung. \`switch\` di Go tidak perlu \`break\` -- hanya satu case yang dieksekusi.`,

  3: `### Fungsi

Fungsi dengan \`func\`. Parameter: \`nama tipe\`. Return type di akhir.

**Multiple return**: \`func bagi(a, b float64) (float64, error)\` -- pola result + error.

**Named return**: \`func jumlahkan(...) (total int)\` -- variabel \`total\` otomatis di-return.

### Error Handling

Go tidak pakai exception. Error dikembalikan sebagai nilai. Pola idiomatis: \`if err != nil { return err }\`.

### Variadic

\`func jumlahkan(angka ...int)\` -- jumlah argumen tidak tetap.`,

  4: `### Array vs Slice

**Array**: ukuran tetap. \`var hari [5]string\`.

**Slice**: dinamis, lebih sering digunakan. Bisa di-\`append\`. Fungsi penting: \`len()\`, \`cap()\`, \`append()\`.

**Slicing**: \`buah[1:3]\` -- elemen index 1 sampai 2.

### Map

Koleksi key-value. \`map[string]int\` = key string, value int. Cek key: \`nilai, ok := map["key"]\`.

### Range

\`for i, v := range koleksi\` -- iterasi array, slice, atau map.`,

  5: `### Struct

\`type User struct { ... }\` -- mengelompokkan data terkait. Mirip class tanpa inheritance.

### Method

Fungsi dengan \`receiver\`: **value receiver** (\`func (u User)\`) tidak bisa mengubah struct asli; **pointer receiver** (\`func (u *User)\`) bisa.

### Pointer

\`&\` membuat pointer, \`*\` mengakses nilai yang ditunjuk. Berguna untuk efisiensi dan mutasi.

### Method Chaining

Dengan mengembalikan \`*Counter\`, panggilan bisa dirantai: \`c.Tambah(5).Tambah(10)\`.`,

  6: `### Interface

Interface = **kontrak perilaku**. Di Go, implementasi **implisit** -- struct cukup memiliki method yang sesuai.

\`type Greeter interface { Greet() string }\` -- struct dengan method \`Greet() string\` otomatis menjadi Greeter.

### Empty Interface (\`any\`)

\`any\` bisa menampung tipe apapun. Berguna untuk fungsi generik.

### Type Switch

\`v.(type)\` di dalam \`switch\` memeriksa tipe asli dari nilai interface.`,

  7: `### Defer

\`defer\` menjadwalkan fungsi setelah fungsi induk selesai. Sering untuk cleanup. **LIFO**: defer terakhir = dieksekusi pertama.

### Panic & Recover

\`panic\` menghentikan eksekusi. \`recover()\` dalam \`defer\` menangkap panic. Untuk error tak terduga.

### File I/O

Di Go: \`os.ReadFile()\`, \`os.WriteFile()\`, \`bufio.NewScanner()\`. Karena playground tidak punya akses file sistem, kode di sini menggunakan simulasi.`,

  8: `### Goroutine

\`go func()\` menjalankan fungsi sebagai goroutine -- thread ringan Go runtime. Jauh lebih ringan dari OS thread.

### WaitGroup

\`sync.WaitGroup\`: \`Add(1)\` sebelum launch, \`Done()\` di akhir, \`Wait()\` untuk menunggu semua selesai.

### Mutex

\`sync.Mutex\` mencegah race condition. \`Lock()\` sebelum akses, \`Unlock()\` setelah. Pola: \`defer mu.Unlock()\`.`,

  9: `### Channel

Pipa komunikasi antar goroutine. \`make(chan int)\` = unbuffered (sinkron), \`make(chan int, 3)\` = buffered.

\`ch <- nilai\` mengirim, \`nilai := <-ch\` menerima. \`close(ch)\` = tidak ada data lagi.

### Select

Menunggu beberapa channel -- case yang siap pertama dieksekusi. \`time.After\` untuk timeout.

### Context

\`context.WithTimeout\` -- batas waktu. \`ctx.Done()\` mengembalikan channel yang terkirim saat timeout.`,

  10: `### Unit Testing

File test: \`*_test.go\`. Fungsi: \`func TestXxx(t *testing.T)\`. Jalankan: \`go test\`.

**Table-driven test**: slice struct dengan input dan expected output -- pola standar Go.

### JSON

\`encoding/json\`: \`Marshal\` struct ke JSON, \`Unmarshal\` sebaliknya. Gunakan tag \`json:"nama"\`.

### Strings

Package \`strings\`: \`TrimSpace\`, \`ToUpper\`, \`Contains\`, \`Split\`, dll.`,

  11: `### CLI dengan flag

\`flag.String("name", "default", "desc")\` -- nilai pointer diakses dengan \`*name\`. \`flag.Parse()\` untuk membaca argumen.

### HTTP Server

\`http.NewServeMux()\` -- router. \`HandleFunc("/path", handler)\`. Handler menerima \`http.ResponseWriter\` dan \`*http.Request\`.

### Mode Gabungan

Satu binary bisa CLI dan HTTP server. \`os.Args[1]\` memeriksa argumen pertama.`,

  12: `### REST API

Method-based routing (Go 1.22+): \`mux.HandleFunc("GET /api/tasks", handler)\`. Struct dengan JSON tags.

### Middleware

Fungsi yang menerima dan mengembalikan \`http.Handler\`. Bisa dirantai: \`logging(auth(mux))\`.

### Structured Logging

\`log/slog\` (Go 1.21+): \`slog.Info("msg", "key", value)\` -- output JSON.`,

  13: `### Konfigurasi

\`getEnv\` membaca environment variable dengan fallback. Pola standar aplikasi Go production.

### Database

\`database/sql\` -- interface umum SQL. \`sql.Open("postgres", dsn)\` untuk koneksi. \`QueryRow\` untuk single row.

### Docker

Multi-stage build: stage 1 kompilasi, stage 2 hanya binary + runtime minimal. Hasil: image kecil (~15MB).`,

  14: `### Worker Pool

Memproses banyak job dengan jumlah worker tetap. Jobs via channel, results via channel lain.

### Fan-in

Menggabungkan beberapa channel jadi satu. Berguna untuk data dari multiple sumber.

### Final Project

Integrasi: CLI, REST API, middleware, database, Docker, testing -- seluruh stack Go production.`,
};

const EXP_EN = {
  1: `### Go Program Structure

Every .go file starts with \`package main\`. The \`main()\` function is the entry point.

\`import "fmt"\` brings the fmt package for formatted I/O. \`fmt.Println()\` prints text with a newline.

### Variables

Two declaration styles: **explicit** (\`var name string = "Gopher"\`) and **short declaration** (\`year := 2009\`). Go infers the type.

### Exported vs Unexported

**Capital letter = public (exported)**, lowercase = private. \`fmt.Println\` works because \`Println\` starts with a capital letter.`,

  2: `### Variables and Data Types

Go is **statically typed**. \`string\`, \`int\`, \`float64\`, \`bool\` are basic types.

**Zero values**: \`0\` for int, \`""\` for string, \`false\` for bool.

### Constants and Loops

\`const pi = 3.14159\` -- fixed values. Go only has \`for\`.

### if/else and switch

No parentheses around conditions. \`switch\` doesn't need \`break\`.`,

  3: `### Functions

Declared with \`func\`. Parameters: \`name type\`. Return type at end.

**Multiple returns**: \`func divide(a, b float64) (float64, error)\` -- result + error pattern.

**Named returns**: \`func sum(...) (total int)\` -- auto-declared and returned.

### Error Handling

No exceptions. Errors returned as values. Idiom: \`if err != nil\`.

### Variadic

\`func sum(numbers ...int)\` -- variable number of arguments.`,

  4: `### Array vs Slice

**Array**: fixed size. **Slice**: dynamic, more common. Supports \`append\`, \`len\`, \`cap\`.

**Slicing**: \`fruits[1:3]\` -- elements at index 1 through 2.

### Map

Key-value collection. \`map[string]int\`. Check: \`score, ok := map["key"]\`.

### Range

\`for i, v := range collection\` -- iterate arrays, slices, maps.`,

  5: `### Struct

\`type User struct { ... }\` -- groups related data. Like classes without inheritance.

### Methods

Functions with \`receiver\`: **value receiver** can't modify, **pointer receiver** can.

### Pointers

\`&\` creates pointer, \`*\` dereferences. Efficient and enables mutation.

### Method Chaining

Return \`*Counter\` to chain: \`c.Add(5).Add(10)\`.`,

  6: `### Interfaces

Interfaces = **behavioral contracts**. Go implements **implicitly** -- struct just needs matching methods.

\`type Greeter interface { Greet() string }\` -- any struct with \`Greet() string\` is a Greeter.

### Empty Interface (\`any\`)

\`any\` holds any type. Useful for generic functions.

### Type Switch

\`v.(type)\` inside \`switch\` checks actual type of an interface value.`,

  7: `### Defer

\`defer\` schedules a call after the parent function. Used for cleanup. **LIFO**: last deferred runs first.

### Panic & Recover

\`panic\` stops execution. \`recover()\` inside \`defer\` catches panics.

### File I/O

\`os.ReadFile()\`, \`os.WriteFile()\`, \`bufio.NewScanner()\`. Code here is simulated (no filesystem in playground).`,

  8: `### Goroutines

\`go func()\` runs a function as a lightweight thread. Much lighter than OS threads.

### WaitGroup

\`sync.WaitGroup\`: \`Add(1)\` before launch, \`Done()\` at end, \`Wait()\` to block.

### Mutex

\`sync.Mutex\` prevents race conditions. \`Lock()\` before access, \`Unlock()\` after. Pattern: \`defer mu.Unlock()\`.`,

  9: `### Channels

Communication pipes between goroutines. \`make(chan int)\` = unbuffered, \`make(chan int, 3)\` = buffered.

\`ch <- value\` sends, \`value := <-ch\` receives. \`close(ch)\` = no more data.

### Select

Waits on multiple channels. First ready case executes. \`time.After\` for timeout.

### Context

\`context.WithTimeout\` creates deadlines. \`ctx.Done()\` fires on timeout.`,

  10: `### Unit Testing

Test files: \`*_test.go\`. Functions: \`func TestXxx(t *testing.T)\`. Run: \`go test\`.

**Table-driven tests**: slice of structs with inputs and expected outputs -- Go standard.

### JSON

\`encoding/json\`: \`Marshal\` struct to JSON, \`Unmarshal\` back. Use \`json:"field"\` tags.

### Strings

\`strings\` package: \`TrimSpace\`, \`ToUpper\`, \`Contains\`, \`Split\`, etc.`,

  11: `### CLI with flag

\`flag.String("name", "default", "desc")\` -- pointer value accessed with \`*name\`. \`flag.Parse()\` reads args.

### HTTP Server

\`http.NewServeMux()\` -- router. \`HandleFunc("/path", handler)\`. Handler: \`http.ResponseWriter\` + \`*http.Request\`.

### Combined Mode

One binary = CLI + HTTP server. \`os.Args[1]\` checks first argument.`,

  12: `### REST API

Method-based routing (Go 1.22+): \`mux.HandleFunc("GET /api/tasks", handler)\`. Struct with JSON tags.

### Middleware

Function taking and returning \`http.Handler\`. Can be chained: \`logging(auth(mux))\`.

### Structured Logging

\`log/slog\` (Go 1.21+): \`slog.Info("msg", "key", value)\` -- JSON output.`,

  13: `### Configuration

\`getEnv\` reads env vars with fallback. Standard pattern in Go production apps.

### Database

\`database/sql\` -- common SQL interface. \`sql.Open("postgres", dsn)\` for connection. \`QueryRow\` for single row.

### Docker

Multi-stage build: stage 1 compiles, stage 2 = binary + minimal runtime. Small images (~15MB).`,

  14: `### Worker Pool

Process many jobs with fixed number of workers. Jobs via channels, results via other channels.

### Fan-in

Merge multiple channels into one. Useful for data from multiple sources.

### Final Project

Integrates: CLI, REST API, middleware, database, Docker, testing -- entire Go production stack.`,
};

// ── Content: Experiments ──

const EXP_ID_E = {
  1: `1. **Ubah \`nama\`** -- ganti \"Gopher\" dengan nama Anda
2. **Tambah variabel baru** -- deklarasikan \`kota := "Jakarta"\` dan cetak
3. **Ubah \`aktif\`** -- set ke \`false\` dan lihat perbedaannya`,
  2: `1. **Ubah \`nilai\`** -- coba 92, 70, 45 dan lihat grade berbeda
2. **Tambah case switch** -- tambahkan "Jumat" sebagai akhir pekan
3. **Ganti \`hari\`** -- coba "Sabtu" dan lihat output berubah`,
  3: `1. **Ubah argumen \`jumlahkan\`** -- coba deret Fibonacci: \`1, 1, 2, 3, 5, 8\`
2. **Bagi dengan 0** -- coba \`bagi(1, 0)\` dan lihat error
3. **Buat fungsi baru** -- \`kali(a, b int) int\` yang mengalikan`,
  4: `1. **Tambah buah baru** -- \`buah = append(buah, "durian")\`
2. **Ubah slicing** -- coba \`buah[2:]\` atau \`buah[:2]\`
3. **Tambah data map** -- tambahkan "Charlie" dengan nilai 88`,
  5: `1. **Tambah field** -- tambahkan \`Umur int\` ke struct User
2. **Method baru** -- buat \`(u User) Info() string\` untuk semua field
3. **Chain lebih panjang** -- tambah \`.Tambah(7)\` di chaining`,
  6: `1. **Tambah bahasa baru** -- buat struct \`Sunda\` dengan Greet() sendiri
2. **Cetak apapun** -- panggil \`cetakApapun\` dengan \`[]int{1,2,3}\`
3. **Type assertion** -- panggil \`identifikasi\` dengan \`3.14\``,
  7: `1. **Ubah urutan defer** -- pindahkan posisi defer dan lihat urutan output
2. **Bagi dengan 0** -- coba pembagian lain yang menghasilkan panic
3. **File kosong** -- panggil \`bacaFile("")\` dan lihat error handling`,
  8: `1. **Tambah worker** -- ubah loop dari 3 jadi 5 goroutine
2. **Hapus Mutex** -- komentari \`Lock()/Unlock()\`, lihat hasil tak terduga
3. **Ubah delay** -- ganti \`50ms\` jadi \`100ms\``,
  9: `1. **Ubah buffer** -- ganti \`make(chan int, 3)\` jadi \`make(chan int)\`
2. **Tambah channel** -- buat ch3 dan tambahkan case select baru
3. **Ubah timeout** -- ganti \`15ms\` jadi lebih besar/kecil dari 30ms`,
  10: `1. **Ubah input Tambah** -- coba \`Tambah(-5, 3)\` atau \`Tambah(0, 0)\`
2. **Modifikasi JSON** -- tambah field \`Email string\` ke struct Orang
3. **Eksperimen strings** -- coba \`strings.ReplaceAll(kata, "Go", "Golang")\``,
  11: `1. **Ubah default flag** -- ganti \`"World"\` jadi \`"Go Developer"\`
2. **Tambah route** -- tambahkan \`/about\` handler yang mengembalikan JSON
3. **Ganti port** -- set \`PORT=9090\` dan lihat log berubah`,
  12: `1. **Tambah field Task** -- tambahkan \`Priority int\` ke Task
2. **Tambah middleware** -- buat middleware CORS
3. **Ubah format log** -- ganti \`NewJSONHandler\` jadi \`NewTextHandler\``,
  13: `1. **Tambah konfigurasi** -- tambahkan \`LogLevel\` ke Config
2. **Ubah DSN** -- ganti host/port dan lihat log berubah
3. **Tambah endpoint** -- tambahkan \`/version\``,
  14: `1. **Ubah jumlah worker** -- ganti \`3\` jadi \`5\` atau \`1\`
2. **Tambah data fan-in** -- buat ch3 dengan data sendiri
3. **Ubah operasi** -- ganti \`job * 2\` jadi \`job * job\` (kuadrat)`,
};

const EXP_EN_E = {
  1: `1. **Change \`name\`** -- replace \"Gopher\" with your name
2. **Add a variable** -- declare \`city := "Jakarta"\` and print it
3. **Change \`active\`** -- set to \`false\` and see the difference`,
  2: `1. **Change \`score\`** -- try 92, 70, 45 and see different grades
2. **Add switch case** -- add "Friday" as weekend
3. **Change \`day\`** -- try "Saturday" and see output change`,
  3: `1. **Change \`sum\` args** -- try Fibonacci: \`1, 1, 2, 3, 5, 8\`
2. **Divide by 0** -- try \`divide(1, 0)\` and see the error
3. **New function** -- \`multiply(a, b int) int\``,
  4: `1. **Add fruit** -- \`fruits = append(fruits, "durian")\`
2. **Change slicing** -- try \`fruits[2:]\` or \`fruits[:2]\`
3. **Add map data** -- add "Charlie" with score 88`,
  5: `1. **Add field** -- add \`Age int\` to User struct
2. **New method** -- create \`(u User) Info() string\` for all fields
3. **Longer chain** -- add \`.Add(7)\` to chaining`,
  6: `1. **Add new language** -- create \`French\` struct with Greet()
2. **Print anything** -- call \`printAnything\` with \`[]int{1,2,3}\`
3. **Type assertion** -- call \`identify\` with \`3.14\``,
  7: `1. **Change defer order** -- move defer positions and see output order
2. **Divide by 0** -- try another panic-inducing division
3. **Empty filename** -- call \`readFile("")\` and see error handling`,
  8: `1. **Add workers** -- change loop from 3 to 5 goroutines
2. **Remove Mutex** -- comment out Lock/Unlock, see unexpected results
3. **Change delay** -- replace \`50ms\` with \`100ms\``,
  9: `1. **Change buffer** -- change \`make(chan int, 3)\` to \`make(chan int)\`
2. **Add channel** -- create ch3 and add select case
3. **Change timeout** -- change \`15ms\` to larger/smaller than 30ms`,
  10: `1. **Change Add input** -- try \`Add(-5, 3)\` or \`Add(0, 0)\`
2. **Modify JSON** -- add \`Email string\` field to Person struct
3. **String experiments** -- try \`strings.ReplaceAll(word, "Go", "Golang")\``,
  11: `1. **Change flag default** -- replace \"World\" with \"Go Developer\"
2. **Add route** -- add \`/about\` handler returning JSON
3. **Change port** -- set \`PORT=9090\` and see log change`,
  12: `1. **Add Task field** -- add \`Priority int\` to Task struct
2. **Add middleware** -- create a CORS middleware
3. **Change log format** -- replace \`NewJSONHandler\` with \`NewTextHandler\``,
  13: `1. **Add config** -- add \`LogLevel\` to Config struct
2. **Change DSN** -- change host/port and see log change
3. **Add endpoint** -- add \`/version\` endpoint`,
  14: `1. **Change worker count** -- replace \`3\` with \`5\` or \`1\`
2. **Add fan-in data** -- create ch3 with your own data
3. **Change operation** -- replace \`job * 2\` with \`job * job\` (square)`,
};

// ── Content: Challenges ──

const CHALL_ID = {
  1: 'Buat program yang mencetak biodata singkat: nama, umur, kota, dan hobi. Gunakan variabel dengan tipe berbeda (`string`, `int`, `bool`).',
  2: 'Buat program kalkulator suhu: input Celsius, output Fahrenheit, Reamur, dan Kelvin. Gunakan `const` untuk rumus konversi.',
  3: 'Buat fungsi `hitungRataRata(angka ...float64) (float64, error)` yang mengembalikan rata-rata. Error jika slice kosong.',
  4: 'Buat program menghitung frekuensi kata (gunakan map), lalu cetak kata yang paling sering muncul.',
  5: 'Buat struct `Product` (ID, Name, Price, Stock). Tambahkan method `ApplyDiscount(percent)` yang mengurangi Price. Implementasikan method chaining.',
  6: 'Buat interface `Shape` dengan `Area() float64`. Implementasi untuk `Circle` (Radius) dan `Rectangle` (Width, Height). Fungsi menerima slice of Shape.',
  7: 'Buat simulasi operasi file: `saveData(filename, content string) error` dengan defer, `loadData(filename string) (string, error)` dengan error handling. Gunakan panic/recover untuk validasi.',
  8: 'Buat worker pool: 5 worker, 20 job (angka), worker menghitung kuadrat. Gunakan WaitGroup dan channel.',
  9: 'Buat pipeline 3 tahap: (1) generate angka 1-10, (2) kalikan 2, (3) cetak. Setiap tahap goroutine terhubung channel. Context timeout 50ms.',
  10: 'Tulis fungsi `FilterGenap(angka []int) []int` (kembalikan slice genap). Tulis table-driven test dengan 5 test case.',
  11: 'Buat program dual-mode: `go run main.go greet -name=Alice` (sapaan) dan `go run main.go serve` (HTTP server port 8080 dengan /hello dan /time).',
  12: 'Kembangkan REST API todo: GET/POST/PUT/DELETE /api/todos. Tambahkan middleware logging dan validasi.',
  13: 'Buat Config struct (AppName, Port, LogLevel, DBHost, DBPort, DBName, DBUser, DBPass) dengan LoadConfig() dari env vars. Tambahkan method `DSN() string`.',
  14: 'Bangun micro-blog: CLI `add "judul" "isi"` untuk menambah, `serve` untuk API. Gunakan middleware logging dan graceful shutdown dengan context.',
};

const CHALL_EN = {
  1: 'Create a program that prints a short bio: name, age, city, and hobby. Use different variable types (`string`, `int`, `bool`).',
  2: 'Create a temperature converter: Celsius input, Fahrenheit/Reamur/Kelvin output. Use `const` for conversion formulas.',
  3: 'Create `calculateAverage(numbers ...float64) (float64, error)` returning the average. Error if slice is empty.',
  4: 'Create a word frequency counter (use maps), then print the most frequent word.',
  5: 'Create `Product` struct (ID, Name, Price, Stock). Add `ApplyDiscount(percent)` method. Implement method chaining.',
  6: 'Create `Shape` interface with `Area() float64`. Implement for `Circle` (Radius) and `Rectangle` (Width, Height). Function accepts slice of Shape.',
  7: 'Simulate file ops: `saveData(filename, content string) error` with defer, `loadData(filename string) (string, error)` with error handling. Use panic/recover for validation.',
  8: 'Build a worker pool: 5 workers, 20 jobs (numbers), workers calculate squares. Use WaitGroup and channels.',
  9: 'Build 3-stage pipeline: (1) generate 1-10, (2) multiply by 2, (3) print. Each stage is a goroutine + channels. Context timeout 50ms.',
  10: 'Write `FilterEven(numbers []int) []int` (return even numbers). Write table-driven test with 5 cases.',
  11: 'Build dual-mode program: `go run main.go greet -name=Alice` (greeting) and `go run main.go serve` (HTTP server port 8080 with /hello and /time).',
  12: 'Develop REST API todo: GET/POST/PUT/DELETE /api/todos. Add logging and validation middleware.',
  13: 'Create Config struct (AppName, Port, LogLevel, DBHost, DBPort, DBName, DBUser, DBPass) with LoadConfig() from env vars. Add `DSN() string` method.',
  14: 'Build micro-blog: CLI `add "title" "content"` to create, `serve` for API. Use logging middleware and graceful shutdown with context.',
};

// ── Content: Summary ──

const SUM_ID = {
  1: 'Go adalah bahasa modern yang menggabungkan kemudahan dengan performa. Toolchain: `go run` untuk develop, `go build` untuk produksi, `go fmt` untuk konsistensi. Minggu depan: variabel, tipe data, control flow.',
  2: 'Go menggunakan tipe statis dengan type inference. Hanya `for` untuk perulangan. `switch` tanpa `break`. Zero values membuat kode lebih aman. Minggu depan: fungsi dan error handling.',
  3: 'Fungsi Go dengan multiple return values -- pola result+error. Named returns dan variadic function. Error handling: `if err != nil`. Minggu depan: array, slice, map.',
  4: 'Slice dan map adalah tulang punggung koleksi data Go. `append`, `make`, `range` alat utama. Map untuk key-value lookup cepat. Minggu depan: struct, method, pointer.',
  5: 'Struct mengelompokkan data, method menambahkan perilaku. Pointer receiver untuk mutasi. Method chaining. Constructor (New...) pola standar Go. Minggu depan: interface dan package.',
  6: 'Interface Go bersifat implisit tanpa `implements`. Polimorfisme fleksibel. `any` dan type switch. Embedding untuk komposisi. Minggu depan: defer, panic, file I/O.',
  7: 'Defer menjamin resource cleanup. Panic/recover untuk error tak terduga. `defer f.Close()` pola standar Go. Minggu depan: goroutine dan konkurensi.',
  8: 'Goroutine = concurrent programming ringan. WaitGroup untuk sinkronisasi. Mutex untuk akses aman. `go run -race` deteksi race condition. Minggu depan: channel, select, context.',
  9: 'Channel untuk komunikasi goroutine. Select multiplexing channel. Context timeout/cancellation. Pipeline: goroutine + channel = streaming. Minggu depan: testing dan standard library.',
  10: 'Testing integral di Go. Table-driven test pola standar. JSON dengan struct tags. Strings untuk teks. Benchmark untuk optimasi. Minggu depan: CLI tools dan HTTP server.',
  11: 'Flag untuk CLI, net/http untuk server. Satu binary = CLI + server. Environment variable untuk konfigurasi. Minggu depan: REST API dan middleware.',
  12: 'REST API dengan method routing. Middleware untuk cross-cutting concerns. Structured logging. JSON format. Minggu depan: database dan deployment.',
  13: 'Konfigurasi dari env var. database/sql interface standar. Docker multi-stage. Pola production: env + logging + health check. Minggu depan: advanced patterns dan final project.',
  14: 'Worker pool, fan-in, pipeline -- pola konkurensi esensial. Final project integrasi: CLI + API + database + Docker + testing. Selamat menyelesaikan kurikulum Go!',
};

const SUM_EN = {
  1: 'Go combines ease of use with high performance. Toolchain: `go run` for dev, `go build` for production, `go fmt` for consistency. Next week: variables, data types, control flow.',
  2: 'Go uses static typing with inference. Only `for` for loops. `switch` without `break`. Zero values make code safer. Next week: functions and error handling.',
  3: 'Go functions with multiple returns -- result+error pattern. Named returns and variadic functions. Error handling: `if err != nil`. Next week: arrays, slices, maps.',
  4: 'Slices and maps are the backbone of Go collections. `append`, `make`, `range` are key tools. Maps for fast key-value lookup. Next week: structs, methods, pointers.',
  5: 'Structs group data, methods add behavior. Pointer receivers enable mutation. Method chaining. Constructors (New...) are Go standard. Next week: interfaces and packages.',
  6: 'Go interfaces are implicit without `implements`. Flexible polymorphism. `any` and type switches. Embedding for composition. Next week: defer, panic, file I/O.',
  7: 'Defer guarantees resource cleanup. Panic/recover for unexpected errors. `defer f.Close()` is Go standard. Next week: goroutines and concurrency.',
  8: 'Goroutines = lightweight concurrent programming. WaitGroup for sync. Mutex for safe access. `go run -race` detects races. Next week: channels, select, context.',
  9: 'Channels for goroutine communication. Select for multiplexing. Context for timeouts. Pipeline: goroutine + channel = streaming. Next week: testing and standard library.',
  10: 'Testing is integral to Go. Table-driven tests are standard. JSON with struct tags. Strings package for text. Benchmarks for optimization. Next week: CLI tools and HTTP server.',
  11: 'Flag for CLI, net/http for server. One binary = CLI + server. Environment variables for config. Next week: REST API and middleware.',
  12: 'REST APIs with method routing. Middleware for cross-cutting concerns. Structured logging. JSON format. Next week: database and deployment.',
  13: 'Configuration from env vars. database/sql standard interface. Multi-stage Docker. Production pattern: env + logging + health check. Next week: advanced patterns and final project.',
  14: 'Worker pool, fan-in, pipeline -- essential concurrency patterns. Final project: CLI + API + database + Docker + testing. Congratulations completing Go!',
};

// ── Generate ──

for (const { w, f, lid, len, cid } of weeks) {
  const level = getLevel(w);
  const ln = levels[level];

  const dir = path.join(BASE, level);
  for (const l of ['id', 'en']) {
    const d = path.join(dir, l);
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  }

  const idObjs = OBJ[w].id.map(o => `- ${o}`).join('\n');
  const enObjs = OBJ[w].en.map(o => `- ${o}`).join('\n');

  const idContent = `# ${lid}

> Kategori: Go, Bahasa Pemrograman | Level: ${ln.nid} | Week ${w}

## Tujuan Pembelajaran

${idObjs}

---

## Program: ${cid}

\`\`\`go
${CODE_ID[w]}
\`\`\`

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

${EXP_ID[w]}

---

## Eksperimen

Coba modifikasi kode di samping:

${EXP_ID_E[w].split('\n').filter(l => l.trim()).join('\n')}

---

## Tantangan

${CHALL_ID[w]}

---

## Ringkasan

${SUM_ID[w]}
`;

  const enContent = `# ${len}

> Category: Go, Programming Language | Level: ${ln.nen} | Week ${w}

## Learning Objectives

${enObjs}

---

## Program: ${cid}

\`\`\`go
${CODE_EN[w]}
\`\`\`

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

${EXP_EN[w]}

---

## Experiments

Try modifying the code:

${EXP_EN_E[w].split('\n').filter(l => l.trim()).join('\n')}

---

## Challenge

${CHALL_EN[w]}

---

## Summary

${SUM_EN[w]}
`;

  const idPath = path.join(dir, 'id', `week${w}-${f}.md`);
  const enPath = path.join(dir, 'en', `week${w}-${f}.md`);
  fs.writeFileSync(idPath, idContent, 'utf8');
  fs.writeFileSync(enPath, enContent, 'utf8');
  console.log(`Created week${w} (${level})`);
}

console.log('\nAll 28 Go curriculum files created with new format!');
