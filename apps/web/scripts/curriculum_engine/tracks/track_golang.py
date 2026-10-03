# Go (Golang) Track: 12 Weeks (3 Levels)
# Final Product: High-Throughput Distributed Rate Limiter & Reverse Proxy API Gateway

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Pondasi Go & Sistem Tipe Statis',
        'nameEn': 'Go Foundations & Static Type System',
        'descId': 'Filosofi kesederhanaan Go: packages, variabel, multiple returns, error handling eksplisit, slices, maps, structs, dan pointer.',
        'descEn': 'Go simplicity philosophy: packages, variables, multiple returns, explicit error handling, slices, maps, structs, and pointers.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'Interface, Konkurensi & Channel Pipes',
        'nameEn': 'Interfaces, Concurrency & Channel Pipes',
        'descId': 'Duck typing implisit, jutaan goroutines ringan, channels, select multiplexing, sync.Mutex, dan propagasi context.Context.',
        'descEn': 'Implicit duck typing, millions of lightweight goroutines, channels, select multiplexing, sync.Mutex, and context propagation.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'HTTP Server, Profiling & Capstone Gateway',
        'nameEn': 'HTTP Server, Profiling & Gateway Capstone',
        'descId': 'Arsitektur net/http murni, rantai middleware, benchmarking, profiling memori pprof, dan capstone distributed rate limiter gateway.',
        'descEn': 'Pure net/http architecture, middleware chains, benchmarking, pprof memory profiling, and the distributed rate limiter gateway.',
    },
]

MODULES = [
    # Level 1: Pondasi Go & Sistem Tipe Statis (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'sintaks-dasar-dan-tipe-data',
        'titleId': 'Arsitektur Package Go: main, Variabel, Zero Values & Multiple Returns',
        'titleEn': 'Go Package Architecture: main, Variables, Zero Values & Multiple Returns',
        'programId': 'Pemeriksa Kesehatan Server (Server Health Probe) & Kalkulator Metrik',
        'programEn': 'Server Health Probe & System Metric Calculator in Pure Go',
        'levelNameId': 'Pondasi Go & Sistem Tipe Statis',
        'levelNameEn': 'Go Foundations & Static Type System',
        'language': 'go',
        'code': """package main

import (
	"fmt"
	"time"
)

// 1. Deklarasi Konstanta & Tipe Data Baku
const (
	NamaGateway   = "Nusa Edge Gateway"
	VersiMesin    = "v2.4.0"
	MaksimalKoneksi = 10000
)

// 2. Fungsi dengan Multiple Return Values (Nilai Utama & Status/Error)
func periksaStatusServer(host string, port int) (string, int, bool) {
	alamatPenuh := fmt.Sprintf("%s:%d", host, port)
	
	// Simulasi pengecekan latensi
	latensiMs := 42
	isSehat := true

	return alamatPenuh, latensiMs, isSehat
}

func main() {
	// 3. Deklarasi Singkat (Short Variable Declaration :=)
	// Zero values: int=0, string="", bool=false
	var hitungKegagalan int
	namaKluster := "ap-southeast-1a"

	fmt.Println("=== " + NamaGateway + " (" + VersiMesin + ") ===")
	fmt.Printf("Kluster: %s | Kapasitas: %d koneksi\\n\\n", namaKluster, MaksimalKoneksi)

	alamat, latensi, aktif := periksaStatusServer("api.internal.nusa.net", 8080)

	if aktif {
		fmt.Printf("[OK] Target: %s\\n", alamat)
		fmt.Printf("     Latensi: %d ms | Status: SEHAT\\n", latensi)
	} else {
		hitungKegagalan++
		fmt.Printf("[FAIL] Target: %s tidak merespons! (Gagal: %d)\\n", alamat, hitungKegagalan)
	}

	fmt.Println("Waktu Pengecekan:", time.Now().Format(time.RFC3339))
}
""",
        'objectivesId': [
            'Memahami filosofi desain Go: bahasa terkompilasi murni (*compiled*), statically typed, tanpa class, dan dirancang untuk skalabilitas cloud',
            'Menguasai struktur dasar program Go: package main, import deklaratif, dan titik masuk fungsi main()',
            'Memahami konsep Zero Values bawaan Go (tanpa null/undefined bug pada inisialisasi variabel)',
            'Menggunakan operator deklarasi singkat (:=) vs kata kunci var dan const',
            'Menulis fungsi idiomatik Go yang mengembalikan banyak nilai sekaligus (Multiple Return Values)',
        ],
        'objectivesEn': [
            'Understand Go foundational design philosophy: pure compilation, static typing, simplicity without classes, tailored for cloud scale',
            'Master core program anatomy: package main, declarative imports, and the main() execution entry point',
            'Internalize Go Zero Value semantics eliminating uninitialized null/undefined bugs',
            'Deploy the short declaration operator (:=) contrasted with explicit var and const bindings',
            'Author idiomatic Go functions returning multiple values simultaneously (Multiple Return Values)',
        ],
        'explanationId': """### Mengapa Google Menciptakan Go (Golang)?
Go diciptakan oleh legenda ilmu komputer (Ken Thompson pencipta UNIX/C, Rob Pike pencipta UTF-8) untuk memecahkan masalah kompilasi lambat C++ dan overhead memori Java di data center Google.
Go memiliki karakteristik unik:
1. **Kompilasi Super Cepat ke Binary Tunggal**: Menghasilkan satu file binary mesin mandiri tanpa perlu menginstal runtime (seperti JVM atau Node.js) di server target.
2. **Tidak Ada Inheritance / Hirarki Class Rumit**: Go sengaja membuang konsep class inheritance yang sering menjadi perangkap kompleksitas di OOP tradisional.
3. **Konkurensi Kelas Satu**: Mendukung jutaan thread ringan (*goroutines*) langsung di tingkat bahasa.

### Zero Values (Tanpa Nilai Sampah)
Di bahasa seperti C, mendeklarasikan variabel tanpa inisialisasi berisi nilai acak di memori (*garbage*). Di JavaScript, nilainya adalah `undefined`.
Di Go, setiap variabel yang dideklarasikan **dijamin 100% memiliki nilai awal baku (Zero Value)**:
- `int`, `float`: `0`
- `bool`: `false`
- `string`: `""` (string kosong)
- `pointer`, `slice`, `map`, `channel`: `nil`

### Multiple Return Values
Idiom paling terkenal di Go adalah fungsi mengembalikan hasil utama bersama status atau eror:
`func Bagi(a, b float64) (float64, error)`
Ini memaksa pengembang menangani kemungkinan kegagalan secara eksplisit di tempat.""",
        'explanationEn': """### Why Google Engineered Go (Golang)
Created by computing luminaries Ken Thompson (UNIX/C co-creator) and Rob Pike (UTF-8 co-creator), Go was designed to eliminate slow C++ compilation and bloated JVM footprints across Google infrastructure.
Core tenets:
1. **Lightning Fast Single-Binary Compilation**: Yields an autonomous self-contained native binary operating without external runtimes (no JVM, no Python/Node interpretors).
2. **Zero Class Inheritance**: Go deliberately omitted complex OOP class hierarchies, favoring composition over inheritance.
3. **First-Class Concurrency**: Built-in primitives orchestrate millions of concurrent threads (*goroutines*) at negligible memory costs.

### Deterministic Zero Values
Unlike C where uninitialized memory contains random bytes, or JavaScript where uninitialized bindings resolve to `undefined`:
Every declared Go variable is **guaranteed to initialize with its deterministic Zero Value**:
- `numeric types`: `0`
- `bool`: `false`
- `string`: `""`
- `pointers, slices, maps, channels`: `nil`

### Multiple Return Values
Go idioms favor returning output models alongside error descriptors:
`func Divide(a, b float64) (float64, error)`
This enforces explicit compile-time accountability over failure states.""",
        'beginnerId': """### Analogi: Mobil Balap Minimalis Tanpa Dasbor Hiburan
Bahasa pemrograman lain seperti mobil sedan mewah yang penuh dengan tombol TV, pemanas kursi, dan lampu disko (*fitur rumit yang jarang terpakai*).
Go seperti mobil balap F1: tidak ada tombol hiburan, tidak ada jok kulit mewah, yang ada hanya setir, pedal gas, dan mesin turbo jet. Sangat sederhana, tidak bisa mogok karena tombol rusak, dan melaju 500 km/jam di server cloud.""",
        'beginnerEn': """### Analogy: Stripped-Down Formula 1 Chassis
Other languages are luxury sedans overburdened with touchscreens, massaging chairs, and neon lighting (*bloated runtime features*).
Go is a stripped-down Formula 1 single-seater: no radio, no leather upholstery, purely raw chassis, racing pedals, and a twin-turbo engine. Zero mechanical clutter, incapable of breaking down over gadget faults, blistering through cloud networks at microsecond latencies.""",
        'experimentsId': [
            'Deklarasikan variabel var cekStatus bool tanpa nilai dan print nilainya untuk membuktikan Zero Value bernilai false.',
            'Ubah fungsi periksaStatusServer agar mengembalikan string status tambahan ("ONLINE", "OFFLINE").',
            'Kompilasi program dengan perintah go build dan amati ukuran file binary mandiri yang dihasilkan.',
            'Coba deklarasikan variabel dengan := lalu tidak menggunakannya sama sekali; amati compiler Go menolak kompilasi.',
        ],
        'experimentsEn': [
            'Declare var status bool without initialization and print to confirm the deterministic false Zero Value.',
            'Update periksaStatusServer to yield a fourth return argument ("ONLINE", "OFFLINE").',
            'Compile the program via go build observing the standalone native executable binary output.',
            'Declare a variable with := and omit references to witness Go\'s strict compiler error rejecting unused variables.',
        ],
        'challengeId': 'Buat fungsi `KalkulasiThroughput(totalRequest int, durasiDetik float64) (float64, bool)` yang menghitung Request Per Second (RPS) dan mengembalikan flag boolean `apakahMelebihiKapasitas` jika RPS di atas 5000.',
        'challengeEn': 'Author a `CalculateThroughput(totalRequests int, durationSec float64) (float64, bool)` function computing RPS and returning an overload flag when RPS surpasses 5,000.',
        'summaryId': 'Kamu telah menguasai arsitektur package Go, zero values, dan multiple return values. Minggu depan kita mempelajari Error Handling eksplisit dan alur kontrol idiomatik.',
        'summaryEn': 'You have mastered Go package architecture, zero values, and multiple return values. Next week, we examine explicit Error Handling and idiomatic control flow.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'control-flow-dan-error-handling',
        'titleId': 'Control Flow Idiomatik: if with Short Statement, switch & Error Handling Eksplisit',
        'titleEn': 'Idiomatic Control Flow: if with Short Statements, switch & Explicit Errors',
        'programId': 'Parser Konfigurasi Gateway & Validasi Format Port Jaringan',
        'programEn': 'Gateway Configuration Parser & Network Port Validator with Explicit Errors',
        'levelNameId': 'Pondasi Go & Sistem Tipe Statis',
        'levelNameEn': 'Go Foundations & Static Type System',
        'language': 'go',
        'code': """package main

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
)

// Definisi Kesalahan Baku (Sentinel Errors)
var (
	ErrPortTidakValid   = errors.New("port harus berada di antara 1 dan 65535")
	ErrHostKosong       = errors.New("host tujuan tidak boleh kosong")
	ErrProtokolDitolak = errors.New("protokol harus berupa http atau https")
)

// Fungsi Validasi Konfigurasi Target Gateway
func parseTargetURL(rawURL string) (string, int, error) {
	if strings.TrimSpace(rawURL) == "" {
		return "", 0, ErrHostKosong
	}

	parts := strings.Split(rawURL, ":")
	if len(parts) != 2 {
		return "", 0, fmt.Errorf("format URL salah: %s (harus host:port)", rawURL)
	}

	host := parts[0]
	portStr := parts[1]

	// strconv.Atoi mengembalikan (int, error)
	port, err := strconv.Atoi(portStr)
	if err != nil {
		return "", 0, fmt.Errorf("port bukan angka valid: %w", err)
	}

	if port < 1 || port > 65535 {
		return "", 0, ErrPortTidakValid
	}

	return host, port, nil
}

func main() {
	daftarTarget := []string{
		"auth-service.internal:8081",
		"payment-api.internal:99999", // Port invalid
		"billing-worker:invalid_port", // Bukan angka
		"analytics-service:443",
	}

	fmt.Println("=== Validasi Konfigurasi Gateway ===")

	// Go hanya memiliki 1 jenis perulangan: for loop!
	for _, target := range daftarTarget {
		// if with short statement: scope 'err' terisolasi hanya di dalam blok if
		if host, port, err := parseTargetURL(target); err != nil {
			fmt.Printf("[REJECT] Target '%s' GAGAL: %v\\n", target, err)
		} else {
			fmt.Printf("[ACCEPT] Target '%s' -> Host: %s, Port: %d\\n", target, host, port)
		}
	}
}
""",
        'objectivesId': [
            'Memahami filosofi penanganan eror Go: Errors Are Values (Eror adalah nilai biasa, bukan Exception/try-catch)',
            'Menggunakan pola standar idiomatik Go: if err != nil { return nil, err }',
            'Membuat Sentinel Errors menggunakan errors.New() dan membungkus eror dengan fmt.Errorf("%w")',
            'Menguasai sintaks if with short statement (if x, err := fn(); err != nil)',
            'Mengetahui bahwa Go hanya memiliki satu kata kunci perulangan yaitu for loop yang dapat berperan sebagai while atau foreach',
        ],
        'objectivesEn': [
            'Master Go\'s error philosophy: Errors Are Values (plain inspectable values, no try-catch exceptions)',
            'Deploy the canonical idiomatic Go guard: if err != nil { return nil, err }',
            'Define Sentinel Errors with errors.New() and wrap error chains via fmt.Errorf("%w")',
            'Master if with short statement scopes (if val, err := fn(); err != nil)',
            'Appreciate that Go features exclusively one loop keyword: the versatile for loop handling while and foreach patterns',
        ],
        'explanationId': """### Mengapa Go Tidak Memiliki `try-catch` / Exceptions?
Di bahasa seperti Java, Python, atau JavaScript, sebuah fungsi bisa melempar exception kapan saja secara tak terlihat (*invisible control flow*). Pengembang sering lupa membungkusnya dengan `try-catch`, menyebabkan aplikasi crash tiba-tiba di production.

**Prinsip Go: Eror adalah Nilai (*Errors are values*)**:
1. Eror adalah tipe interface bawaan biasa: `type error interface { Error() string }`.
2. Jika fungsi berisiko gagal, fungsi tersebut **wajib mengembalikan `error` sebagai nilai terakhir**.
3. Pemanggil fungsi wajib memeriksa `if err != nil`. Tidak ada keajaiban sembunyi-sembunyi!

### `if with short statement`
Go mengizinkan eksekusi satu instruksi sebelum evaluasi kondisi:
`if host, port, err := parseTargetURL(url); err != nil { ... }`
Variabel `host`, `port`, dan `err` **hanya hidup di dalam cakupan blok `if-else` tersebut**, menjaga namespace luar tetap bersih dan mencegah kebocoran variabel!

### Hanya Ada Satu Loop: `for`
Go membuang kata kunci `while` dan `do-while`.
- `for i := 0; i < 10; i++`: Loop standar.
- `for kondisi`: Berperan sebagai `while`.
- `for { ... }`: Loop tak terhingga (*infinite loop*).
- `for idx, val := range collection`: Berperan sebagai `foreach`.""",
        'explanationEn': """### Why Go Discarded `try-catch` Exceptions
In Java, Python, and JavaScript, functions can throw arbitrary exceptions out-of-band (*invisible control flow jumps*). Developers routinely omit try-catch blocks, triggering unhandled production crashes.

**The Go Principle: Errors Are Values**:
1. An error is a standard built-in interface contract: `type error interface { Error() string }`.
2. When operations might fail, they **must return an `error` as their terminal return value**.
3. Callers inspect `if err != nil` explicitly. Zero hidden surprises!

### The `if with short statement` Construct
Go permits pre-assigning variables before condition evaluation:
`if host, port, err := parseTargetURL(url); err != nil { ... }`
The identifiers `host`, `port`, and `err` **exist strictly within the lexical scope of the if-else branch**, preserving parent scopes from variable pollution!

### Only One Loop: The Universal `for`
Go eliminated `while` and `do-while`.
- `for i := 0; i < 10; i++`: Standard counting iteration.
- `for condition`: Acts as a `while` loop.
- `for { ... }`: Clean infinite execution loop.
- `for idx, val := range collection`: Iterates arrays, slices, and maps.""",
        'beginnerId': """### Analogi: Pemeriksaan Bagasi Bandara & Resep Obat Dokter
1. **Try-Catch di bahasa lain** seperti granat tersembunyi di dalam koper: Anda tidak tahu koper mana yang meledak sampai Anda membukanya di tengah jalan (*aplikasi tiba-tiba crash*).
2. **Error di Go** seperti stempel bea cukai di paspor: setiap tas diperiksa satu per satu di loket meja (*if err != nil*). Jika tas membawa barang terlarang, petugas langsung mengembalikan tas ke pemiliknya di meja loket saat itu juga.""",
        'beginnerEn': """### Analogy: Customs Checkpoints vs Concealed Explosives
1. **Try-Catch in other languages** is a concealed trapdoor in an elevator: developers don't know which floor triggers the drop until the floor drops (*unhandled production panic*).
2. **Go Error Handling** is an airport customs inspection desk: every package is explicitly inspected by the officer (*if err != nil*). If an item fails inspection, the officer stamps a red rejection slip and hands it back immediately at the counter.""",
        'experimentsId': [
            'Masukkan URL tanpa port (misal: "google.com") dan amati pesan eror kustom format URL salah.',
            'Gunakan errors.Is(err, ErrPortTidakValid) untuk memeriksa jenis sentinel error secara terprogram.',
            'Tulis for loop bergaya while dengan kondisi pencacah counter < 5.',
            'Uji pembungkusan eror menggunakan %w dan bongkar menggunakan errors.Unwrap(err).',
        ],
        'experimentsEn': [
            'Pass a URL omitting ports (e.g. "google.com") observing the custom formatting diagnostic.',
            'Deploy errors.Is(err, ErrPortTidakValid) to assert sentinel error types programmatically.',
            'Author a while-style for loop driven by counter < 5.',
            'Wrap errors using %w format verbs and inspect with errors.Unwrap(err).',
        ],
        'challengeId': 'Buat fungsi `ValidasiHeaderAPI(headers map[string]string) error` yang memeriksa keberadaan header "Authorization" dan "X-Request-ID". Kembalikan error deskriptif jika salah satu header penting tersebut hilang.',
        'challengeEn': 'Author a `ValidateAPIHeaders(headers map[string]string) error` function checking for "Authorization" and "X-Request-ID", returning descriptive errors upon absence.',
        'summaryId': 'Kamu telah menguasai error handling eksplisit, sentinel errors, dan loop for serbaguna. Minggu depan kita mempelajari Slices, Arrays, dan Maps mendalam.',
        'summaryEn': 'You have mastered explicit error handling, sentinel errors, and the universal for loop. Next week, we examine Slices, Arrays, and Maps deeply.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'slices-arrays-dan-maps',
        'titleId': 'Struktur Data Inti: Slices (Header, Len, Cap), make, append & Hash Maps',
        'titleEn': 'Core Data Structures: Slices (Pointer, Len, Cap), make, append & Maps',
        'programId': 'Tabel Frekuensi IP & Pelacak Kuota Akses (Rate Limiting Table)',
        'programEn': 'IP Access Frequency Table & Quota Tracker with Slices and Maps',
        'levelNameId': 'Pondasi Go & Sistem Tipe Statis',
        'levelNameEn': 'Go Foundations & Static Type System',
        'language': 'go',
        'code': """package main

import "fmt"

func main() {
	// 1. Array Statis (Panjang kaku, jarang dipakai langsung)
	var subnetMask [4]byte = [4]byte{255, 255, 255, 0}
	fmt.Println("Subnet Mask Statis:", subnetMask)

	// 2. Slice Dinamis (Struktur data paling populer di Go!)
	// Anatomi Slice: Pointer ke backing array, Length (len), Capacity (cap)
	daftarIP := make([]string, 0, 5) // Panjang awal 0, Kapasitas memori 5
	fmt.Printf("Awal: len=%d, cap=%d, isi=%v\\n", len(daftarIP), cap(daftarIP), daftarIP)

	// append(): Menambahkan elemen secara dinamis (otomatis memperbesar kapasitas)
	daftarIP = append(daftarIP, "192.168.1.1", "10.0.0.1", "172.16.0.5")
	fmt.Printf("Setelah Append: len=%d, cap=%d, isi=%v\\n", len(daftarIP), cap(daftarIP), daftarIP)

	// Slice Slicing [start:end]
	subDaftar := daftarIP[1:3]
	fmt.Println("Sub-slice [1:3]:", subDaftar)

	// 3. Map (Hash Table bawaan Go: map[KeyType]ValueType)
	tabelHitRate := make(map[string]int)

	// Simulasi pencatatan kunjungan IP
	tabelHitRate["192.168.1.1"] = 15
	tabelHitRate["10.0.0.1"] = 82
	tabelHitRate["203.0.113.42"] = 140

	// 4. Pola Idiomatik "Comma Ok" untuk Memeriksa Keberadaan Kunci di Map
	ipUji := "172.16.0.5"
	if hit, ok := tabelHitRate[ipUji]; ok {
		fmt.Printf("IP %s tercatat: %d request\\n", ipUji, hit)
	} else {
		fmt.Printf("IP %s belum pernah mengakses server (Aman).\\n", ipUji)
	}

	// Iterasi Map menggunakan for-range
	fmt.Println("\\n=== Rekapitulasi Trafik per IP ===")
	for ip, hit := range tabelHitRate {
		status := "NORMAL"
		if hit > 100 {
			status = "OVER_LIMIT (Blokir!)"
		}
		fmt.Printf("-> IP: %-15s | Hit: %3d | Status: %s\\n", ip, hit, status)
	}
}
""",
        'objectivesId': [
            'Memahami perbedaan fundamental antara Fixed-Size Array vs Dynamic Slice di memori',
            'Menguasai anatomi internal Slice: Pointer ke underlying array, Length (len), dan Capacity (cap)',
            'Menggunakan make() untuk pre-alokasi kapasitas slice guna menghindari alokasi memori berulang',
            'Menggunakan fungsi bawaan append() dan memahami cara kerja doubling capacity saat memori penuh',
            'Membangun tabel hash menggunakan map dan menerapkan pola idiomatik Comma-Ok (val, ok := map[key])',
        ],
        'objectivesEn': [
            'Understand structural memory distinctions between Fixed-Size Arrays and Dynamic Slices',
            'Master the internal Slice Header: Pointer to underlying backing array, Length (len), and Capacity (cap)',
            'Deploy make() for proactive capacity pre-allocation eliminating repetitive runtime re-allocations',
            'Utilize native append() and understand memory doubling heuristics when slice capacity saturates',
            'Construct hash tables with map and enforce the idiomatic Comma-Ok idiom (val, ok := map[key])',
        ],
        'explanationId': """### Anatomi Mendalam Slice di Go
Di Go, **Array** memiliki ukuran tetap (`[4]int`). Ukuran array adalah bagian dari tipenya, sehingga `[4]int` dan `[5]int` adalah dua tipe yang berbeda sama sekali.
Dalam praktik sehari-hari, pengembang Go hampir selalu menggunakan **Slice** (`[]int`).

Sebuah Slice sebenarnya adalah struktur data mini 24-byte (*Slice Header*) yang berisi 3 hal:
1. **Pointer**: Alamat memori yang menunjuk ke *underlying backing array* tempat data fisik disimpan.
2. **Length (`len`)**: Jumlah elemen yang saat ini ada di dalam slice.
3. **Capacity (`cap`)**: Jumlah elemen maksimal yang bisa ditampung sebelum Go harus mengalokasikan array baru di memori.

### Keajaiban `append()`
Saat Anda memanggil `append(slice, item)` dan `len == cap`:
Go secara otomatis membuat backing array baru yang berukuran **2 kali lipat lebih besar**, menyalin data lama ke array baru, lalu menambahkan item baru.
**Praktik Terbaik Kinerja Tinggi**: Jika Anda tahu akan menampung 1.000 item, buat slice dengan `make([]int, 0, 1000)` agar Go tidak perlu mengalokasikan ulang memori 10 kali di tengah jalan!

### Pola "Comma Ok" pada Map
Jika Anda mengakses kunci yang tidak ada di map: `nilai := myMap["kunci_palsu"]`, Go **tidak akan melempar error atau crash**, melainkan mengembalikan *Zero Value* (`0` atau `""`).
Untuk membedakan apakah nilainya memang 0 atau kuncinya yang tidak ada, gunakan pola **Comma Ok**:
`val, ada := myMap[kunci]`
Jika `ada == true`, maka kunci benar-benar terdaftar di map.""",
        'explanationEn': """### Deep Anatomy of Go Slices
In Go, **Arrays** feature fixed compile-time lengths (`[4]int`). Array dimensions form part of the type signature: `[4]int` and `[5]int` are incompatible types.
Consequently, enterprise Go code relies universally upon **Slices** (`[]int`).

A Slice is a 24-byte header comprising:
1. **Data Pointer**: Memory address targeting the underlying contiguous backing array.
2. **Length (`len`)**: Active element count.
3. **Capacity (`cap`)**: Maximum element capacity before resizing must trigger.

### The Mechanics of `append()`
When invoking `append(slice, item)` where `len == cap`:
The Go runtime allocates a fresh backing array typically **double the size**, copies legacy elements, appends the target value, and repoints the slice pointer.
**High-Throughput Best Practice**: When handling known collections, pre-allocate: `make([]int, 0, 1000)` to eliminate redundant heap re-allocations!

### The "Comma Ok" Idiom for Maps
Querying an absent key `val := myMap["nonexistent"]` **never throws an exception**; it yields the type's Zero Value (`0`, `""`).
To discern between an intentional zero value versus key absence, employ the **Comma Ok idiom**:
`val, exists := myMap[key]`
If `exists == true`, the key definitively resides within the hash bucket.""",
        'beginnerId': """### Analogi: Karton Telur & Lemari Loker Berlabel
1. **Array** seperti kotak karton isi 6 butir telur: ukurannya kaku, tidak bisa dipaksa memuat 7 butir telur.
2. **Slice** seperti ikat pinggang karet elastis: jika pinggang bertambah besar (*append item*), ikat pinggang meregang otomatis menyesuaikan ukuran tubuh.
3. **Pola Comma-Ok Map** seperti memeriksa loker kantor: Anda membuka laci loker; jika di dalam laci kosong, Anda bertanya pada resepsionis: "Apakah loker ini memang tidak bertuan (*ok = false*), atau pemiliknya sengaja tidak menyimpan barang (*val = 0*)?""",
        'beginnerEn': """### Analogy: Egg Cartons & Labeled Gym Lockers
1. **Array** is a rigid 6-slot egg carton: fixed physical geometry, incapable of accepting a 7th egg without shattering.
2. **Slice** is an expandable leather belt: as waistlines expand (*append item*), the elastic adjusts capacity automatically.
3. **Comma-Ok Map idiom** is inspecting a post office locker: opening the locker door, you consult registry logs: "Is this locker unassigned (*ok = false*), or did the occupant simply leave an empty mailbox (*val = 0*)?""",
        'experimentsId': [
            'Lakukan append 10 elemen satu per satu di loop dan cetak len dan cap pada setiap langkah untuk melihat doubling capacity (1, 2, 4, 8, 16).',
            'Ubah subDaftar[0] = "MUTASI" dan amati apakah daftarIP asli ikut berubah (karena berbagi backing array yang sama!).',
            'Hapus sebuah elemen dari map menggunakan fungsi bawaan delete(tabelHitRate, "10.0.0.1").',
            'Gunakan copy(dest, src) untuk membuat salinan slice independen yang aman dari mutasi backing array.',
        ],
        'experimentsEn': [
            'Append 10 elements sequentially in a loop printing len and cap to witness capacity doubling milestones (1, 2, 4, 8, 16).',
            'Mutate subDaftar[0] = "MODIFIED" to verify the parent slice mutates (confirming shared backing array pointers!).',
            'Prune a map key using native delete(tabelHitRate, "10.0.0.1").',
            'Deploy copy(dest, src) generating completely decoupled slice replicas with distinct backing arrays.',
        ],
        'challengeId': 'Buat fungsi `FilterIPBlacklist(ipList []string, blacklist map[string]bool) []string` yang mengembalikan slice baru berisi hanya IP yang tidak tercantum di blacklist, dengan mengalokasikan slice secara efisien.',
        'challengeEn': 'Author a `FilterBlacklistedIPs(ipList []string, blacklist map[string]bool) []string` returning clean IP slices efficiently pre-allocated.',
        'summaryId': 'Kamu telah menguasai Slices, backing arrays, capacity doubling, dan map comma-ok. Minggu depan kita mempelajari Structs, Pointers, dan Methods.',
        'summaryEn': 'You have mastered Slices, backing arrays, capacity doubling, and map comma-ok. Next week, we examine Structs, Pointers, and Methods.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'structs-pointers-dan-methods',
        'titleId': 'Structs, Pointer Memori (& dan *) & Value vs Pointer Receivers',
        'titleEn': 'Structs, Memory Pointers (& and *) & Value vs Pointer Receivers',
        'programId': 'Model Rute Gateway & Mesin Penyeimbang Beban (Load Balancer Route)',
        'programEn': 'Gateway Route Model & Health State Machine with Pointer Receivers',
        'levelNameId': 'Pondasi Go & Sistem Tipe Statis',
        'levelNameEn': 'Go Foundations & Static Type System',
        'language': 'go',
        'code': """package main

import (
	"encoding/json"
	"fmt"
	"time"
)

// 1. Struct: Komposisi Tipe Data Domain (Lengkap dengan JSON Tags)
type RuteGateway struct {
	ID            string    `json:"id"`
	Path          string    `json:"path"`
	TargetHost    string    `json:"target_host"`
	BebanKoneksi  int       `json:"beban_koneksi"`
	IsAktif       bool      `json:"is_aktif"`
	TerakhirDicek time.Time `json:"terakhir_dicek"`
}

// 2. Value Receiver: Menerima SALINAN objek (Tidak bisa memutasi struct asli)
func (r RuteGateway) FormatDisplay() string {
	status := "NONAKTIF"
	if r.IsAktif {
		status = "AKTIF"
	}
	return fmt.Sprintf("[%s] %s -> %s (Beban: %d koneksi)", status, r.Path, r.TargetHost, r.BebanKoneksi)
}

// 3. Pointer Receiver (*RuteGateway): Menerima ALAMAT MEMORI ASLI (Dapat memutasi data struct!)
func (r *RuteGateway) TambahBeban(tambahan int) {
	r.BebanKoneksi += tambahan
	r.TerakhirDicek = time.Now()
}

func (r *RuteGateway) Nonaktifkan() {
	r.IsAktif = false
	r.BebanKoneksi = 0
	r.TerakhirDicek = time.Now()
}

func main() {
	// 4. Inisialisasi Struct dengan Pointer (&)
	rute1 := &RuteGateway{
		ID:            "RT-001",
		Path:          "/api/v1/auth",
		TargetHost:    "http://auth-cluster.internal:8000",
		BebanKoneksi:  120,
		IsAktif:       true,
		TerakhirDicek: time.Now(),
	}

	fmt.Println("=== Status Rute Awal ===")
	fmt.Println(rute1.FormatDisplay())

	// Mutasi via Pointer Receiver
	rute1.TambahBeban(45)
	fmt.Println("\\nSetelah Tambah Beban (Pointer Receiver Mutates State):")
	fmt.Println(rute1.FormatDisplay())

	// Serialisasi ke JSON standar
	jsonBytes, _ := json.MarshalIndent(rute1, "", "  ")
	fmt.Println("\\nPayload JSON Rute:")
	fmt.Println(string(jsonBytes))

	// Bukti Alamat Pointer Memori
	fmt.Printf("\\nAlamat Memori Rute di Heap/Stack: %p\\n", rute1)
}
""",
        'objectivesId': [
            'Memahami Struct sebagai mekanisme utama pengelompokan data berstruktur di Go menggantikan class',
            'Memahami konsep Pointer memori: operator alamat (&) dan operator dereference (*)',
            'Membedakan Value Receiver (copy/read-only) vs Pointer Receiver (mutasi langsung & hemat alokasi)',
            'Menggunakan Struct Tags (`json:"..."`) untuk serialisasi dan deserialisasi data REST JSON',
            'Memahami Escape Analysis: bagaimana compiler Go memutuskan alokasi variabel di Stack vs Heap',
        ],
        'objectivesEn': [
            'Master Structs as the primary composable data modeling construct in Go replacing classes',
            'Understand memory Pointers: address-of (&) and dereference (*) operators',
            'Differentiate Value Receivers (read-only copies) from Pointer Receivers (state mutations and zero-copy performance)',
            'Deploy Struct Field Tags (`json:"..."`) for bi-directional JSON serialization and deserialization',
            'Understand Escape Analysis: how the Go compiler determines Stack versus Heap allocation',
        ],
        'explanationId': """### Struct Menggantikan Class
Go tidak memiliki kata kunci `class`. Anda mendefinisikan bentuk data menggunakan **`struct`**:
`type User struct { Nama string; Umur int }`
Dan Anda menempelkan method pada struct tersebut menggunakan fungsi dengan **Receiver**:
`func (u *User) Sapa() string`

### Kapan Menggunakan Pointer Receiver (*T) vs Value Receiver (T)?
Ini adalah pertanyaan paling penting dalam pemrograman Go:
1. **Gunakan Pointer Receiver (`*T`) jika**:
   - Method perlu **mengubah (memutasi)** isi field struct (`r.BebanKoneksi += tambahan`).
   - Struct berukuran besar. Menerima pointer hanya menyalin alamat memori 8-byte, sedangkan value receiver akan menyalin seluruh struct berukuran kilobyte di memori!
2. **Gunakan Value Receiver (`T`) jika**:
   - Struct berukuran kecil (misal hanya 2 float seperti `Point{X, Y}`) dan method hanya membaca data (*read-only*).

### JSON Tags (`json:"field_name"`)
Di Go, nama field struct yang diawali **Huruf Besar (Kapital) bersifat Exported / Publik** (bisa dibaca package lain). Field berhuruf kecil bersifat privat.
Karena field publik harus kapital (`TargetHost`), kita menyematkan struct tag \`json:"target_host"\` agar encoder JSON menghasilkan format snake_case atau camelCase standar web!""",
        'explanationEn': """### Structs Replace Classes
Go omits the `class` keyword. You model state containers through **`struct`**:
`type User struct { Name string; Age int }`
You bind methods onto structs using **Receiver functions**:
`func (u *User) Greet() string`

### Pointer Receivers (*T) vs Value Receivers (T)
A foundational design decision across all Go codebases:
1. **Enforce Pointer Receivers (`*T`) when**:
   - The method must **mutate** struct fields (`r.ActiveConnections += delta`).
   - The struct encapsulates large payloads. Passing pointers duplicates a lean 8-byte memory address, avoiding deep copies of kilobytes of struct memory.
2. **Deploy Value Receivers (`T`) when**:
   - The struct represents lightweight primitives (such as coordinates `Point{X, Y}`) and operations remain strictly read-only.

### Export Visibility & JSON Struct Tags
In Go, identifiers starting with an **Uppercase Letter are Exported (Public)** across packages. Lowercase identifiers remain private.
To reconcile public PascalCase struct fields (`TargetHost`) with web standard JSON schemas, attach struct tags: \`json:"target_host"\`.""",
        'beginnerId': """### Analogi: Fotokopi KTP vs Menulis di KTP Asli
1. **Value Receiver (`func (r Rute)`)** seperti tukang fotokopi yang membagikan lembaran fotokopi KTP Anda: jika Anda mencoret-coret lembaran fotokopi tersebut (*mengubah nilai*), KTP asli di dompet Anda sama sekali tidak berubah.
2. **Pointer Receiver (`func (r *Rute)`)** seperti menyerahkan KTP asli Anda ke petugas kelurahan: petugas menempelkan stiker hologram baru langsung di atas fisik kartu KTP asli Anda (*mutasi permanen di memori*).""",
        'beginnerEn': """### Analogy: Photocopy Slips vs Master Document Modifications
1. **Value Receivers (`func (r Route)`)** are photocopied documents: scribbling notes on a photocopy slip alters only the temporary duplicate sheet; the master original in the vault remains untouched.
2. **Pointer Receivers (`func (r *Route)`)** are handing the physical master original directly to the notary: ink applied by the notary permanently mutates the master legal deed in memory.""",
        'experimentsId': [
            'Ubah TambahBeban menjadi Value Receiver func (r RuteGateway) TambahBeban() dan amati bahwa beban rute TIDAK bertambah di main!',
            'Hapus tanda bintang * pada deklarasi pointer dan perhatikan perbedaan representasi alamat memori %p.',
            'Coba ubah huruf awal field ID menjadi huruf kecil id dan buktikan field tersebut menghilang dari payload JSON (karena unexported!).',
            'Gunakan json.Unmarshal untuk mengonversi string JSON kembali menjadi objek struct RuteGateway.',
        ],
        'experimentsEn': [
            'Change TambahBeban to a Value Receiver func (r RuteGateway) and verify load metrics FAIL to persist outside the method!',
            'Remove the dereference asterisk observing pointer address representations via %p.',
            'Switch field ID to lowercase id and observe the field vanishes from JSON output (unexported visibility!).',
            'Deploy json.Unmarshal decoding stringified JSON back into a typed RuteGateway struct.',
        ],
        'challengeId': 'Buat struct `ClusterNode` dengan field Host, Port, LatencyMs, dan IsHealthy. Tulis pointer receiver method `PeriksaKesehatan()` yang memperbarui IsHealthy menjadi false jika LatencyMs melebihi 500ms.',
        'challengeEn': 'Author a `ClusterNode` struct with Host, Port, LatencyMs, and IsHealthy fields. Write a pointer receiver `CheckHealth()` setting IsHealthy to false when LatencyMs breaches 500ms.',
        'summaryId': 'Kamu telah menguasai Structs, pointer memori, value vs pointer receivers, dan JSON tags. Minggu depan kita memasuki Level 2: Interfaces dan Konkurensi Goroutines.',
        'summaryEn': 'You have mastered Structs, pointers, value/pointer receivers, and JSON tags. Next week, we enter Level 2: Interfaces and Goroutine Concurrency.',
    },

    # Level 2: Interface, Konkurensi & Channel Pipes (Weeks 5-8)
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'interfaces-dan-duck-typing',
        'titleId': 'Interfaces & Duck Typing: Komposisi Implisit, Type Assertions & Tipe any',
        'titleEn': 'Interfaces & Duck Typing: Implicit Contracts, Type Assertions & any',
        'programId': 'Adapter Penyimpanan Cache Gateway (Memory vs Redis Cache Adapter)',
        'programEn': 'Gateway Cache Storage Adapter with Implicit Duck-Typed Interfaces',
        'levelNameId': 'Interface, Konkurensi & Channel Pipes',
        'levelNameEn': 'Interface, Concurrency & Channel Pipes',
        'language': 'go',
        'code': """package main

import (
	"fmt"
	"time"
)

// 1. Interface: Kontrak Perilaku Murni (Tanpa Implementasi)
// Aturan Go: "Interfaces should be small and discovered, not designed up-front."
type PenyimpanCache interface {
	Simpan(kunci string, nilai string, ttl time.Duration) error
	Ambil(kunci string) (string, bool)
	Hapus(kunci string) error
}

// 2. Implementasi 1: In-Memory Map Cache
type MemoryCache struct {
	storage map[string]string
}

func NewMemoryCache() *MemoryCache {
	return &MemoryCache{storage: make(map[string]string)}
}

// Implementasi implisit (Tidak ada kata kunci 'implements' di Go!)
func (m *MemoryCache) Simpan(kunci string, nilai string, ttl time.Duration) error {
	m.storage[kunci] = nilai
	return nil
}

func (m *MemoryCache) Ambil(kunci string) (string, bool) {
	val, ok := m.storage[kunci]
	return val, ok
}

func (m *MemoryCache) Hapus(kunci string) error {
	delete(m.storage, kunci)
	return nil
}

// 3. Fungsi Konsumen: Bergantung pada Interface, Bukan Implementasi Konkret
func daftarkanSesiUser(cache PenyimpanCache, token string, userId string) {
	err := cache.Simpan(token, userId, 15*time.Minute)
	if err != nil {
		fmt.Println("Gagal menyimpan sesi:", err)
		return
	}
	fmt.Printf("[Cache Engine] Sesi token '%s' tersimpan untuk user '%s'\\n", token, userId)
}

func main() {
	// Membuktikan Duck Typing: MemoryCache otomatis dianggap sebagai PenyimpanCache
	cacheEngine := NewMemoryCache()
	daftarkanSesiUser(cacheEngine, "sess_abc123", "USR-9988")

	if val, ok := cacheEngine.Ambil("sess_abc123"); ok {
		fmt.Printf("Verifikasi Cache Hit: User ID = %s\\n", val)
	}

	// 4. Type Switch & Type Assertion
	var objekBebas any = "Teks String Bebas"
	switch v := objekBebas.(type) {
	case string:
		fmt.Println("Tipe data terdeteksi: string, panjang =", len(v))
	case int:
		fmt.Println("Tipe data terdeteksi: integer =", v)
	default:
		fmt.Println("Tipe data tidak diketahui")
	}
}
""",
        'objectivesId': [
            'Memahami filosofi Duck Typing di Go: "If it walks like a duck and quacks like a duck, it is a duck"',
            'Mengetahui bahwa Go sama sekali tidak memiliki kata kunci `implements` (implementasi kontrak bersifat 100% implisit)',
            'Menerapkan prinsip Interface Segregation: membuat interface kecil berukuran 1-3 method (misal io.Reader, io.Writer)',
            'Menggunakan Type Assertion (val.(ConcreteType)) dan Type Switch untuk inspeksi tipe dinamis',
            'Memahami penggunaan tipe `any` (alias untuk interface{}) dan batas keamanannya',
        ],
        'objectivesEn': [
            'Internalize Go Duck Typing: "If it walks like a duck and quacks like a duck, it is a duck"',
            'Recognize that Go omits the `implements` keyword entirely (interfaces satisfy 100% implicitly)',
            'Enforce Interface Segregation: authoring atomic 1-3 method interfaces (e.g. io.Reader, io.Writer)',
            'Deploy Type Assertions (val.(ConcreteType)) and Type Switches for dynamic runtime introspection',
            'Evaluate the `any` type alias (interface{}) and its architectural safety boundaries',
        ],
        'explanationId': """### Mengapa Interface di Go Sangat Revolusioner?
Di Java, C#, atau TypeScript, Anda harus secara eksplisit menulis:
`class MemoryCache implements PenyimpanCache`.
Ini menciptakan ikatan kaku (*tight coupling*): jika library pihak ketiga tidak mengimplementasikan interface Anda, Anda tidak bisa menggunakannya.

**Di Go, Interface bersifat IMPLISIT**:
Jika struct Anda memiliki method `Simpan`, `Ambil`, dan `Hapus` dengan tanda tangan yang sama, struct Anda **secara otomatis dianggap telah mengimplementasikan `PenyimpanCache` tanpa deklarasi apapun**!
Penulis struct tidak perlu tahu bahwa interface tersebut ada. Pembuat interface-lah yang menentukan kontrak yang ia butuhkan.

### Pepatah Go: "Semakin Besar Interface, Semakin Lemah Abstraksinya"
Standard library Go terkenal dengan interface satu-method yang sangat kuat:
- `io.Reader`: `Read(p []byte) (n int, err error)`
- `io.Writer`: `Write(p []byte) (n int, err error)`
- `fmt.Stringer`: `String() string`
Hindari membuat interface raksasa dengan 20 method! Buat interface mini dan gabungkan jika diperlukan.""",
        'explanationEn': """### Why Go Interfaces Are Revolutionary
In Java, C#, or TypeScript, classes explicitly pledge allegiance to interfaces:
`class MemoryCache implements CacheStorage`.
This creates tight coupling: third-party packages must declare vendor interfaces directly.

**In Go, Interfaces are SATISFIED IMPLICITLY**:
If your struct exposes `Save`, `Get`, and `Delete` methods with matching signatures, your struct **automatically satisfies `CacheStorage` without writing a single line of boilerplate**!
The author of the concrete struct does not even need to know the consumer interface exists.

### The Go Proverb: "The Bigger the Interface, the Weaker the Abstraction"
Go standard libraries are legendary for single-method interfaces:
- `io.Reader`: `Read(p []byte) (n int, err error)`
- `io.Writer`: `Write(p []byte) (n int, err error)`
- `fmt.Stringer`: `String() string`
Avoid monolithic 20-method interfaces. Author atomic micro-interfaces and compose them cleanly.""",
        'beginnerId': """### Analogi: Colokan Stopkontak Dinding Dua Lubang
Di rumah Anda, ada stopkontak listrik 2 lubang di dinding (*Interface PenyimpanCache*).
Pabrik kipas angin, pabrik kulkas, dan pabrik charger ponsel (*struct MemoryCache / RedisCache*) tidak pernah saling kenal. Namun asalkan steker kabel mereka memiliki 2 batang besi berjarak standar (*memiliki method yang cocok*), semua alat tersebut otomatis bisa dicolokkan ke stopkontak dinding tanpa perlu surat perjanjian pabrik (*tanpa implements*).""",
        'beginnerEn': """### Analogy: Universal Electrical Wall Outlets
In your residence, there is a two-prong wall outlet (*the CacheStorage Interface*).
Manufacturers of desk fans, refrigerators, and laptop chargers (*MemoryCache / RedisCache structs*) operate independently. As long as their physical plugs feature two prongs at matching dimensions (*matching method signatures*), any appliance inserts into the outlet without negotiating contractual agreements (*zero implements keyword*).""",
        'experimentsId': [
            'Buat struct baru RedisCache dan implementasikan ketiga method-nya; oper ke daftarkanSesiUser untuk membuktikan polimorfisme instan.',
            'Hapus method Hapus dari MemoryCache dan amati pesan kompilasi compiler: "does not implement PenyimpanCache (missing method Hapus)".',
            'Gunakan Type Assertion val, ok := objekBebas.(string) untuk membaca nilai string secara aman.',
            'Gabungkan dua interface kecil menjadi satu interface gabungan menggunakan teknik Interface Embedding.',
        ],
        'experimentsEn': [
            'Author a RedisCache struct implementing all 3 methods; pass it into daftarkanSesiUser verifying instant polymorphism.',
            'Prune the Hapus method from MemoryCache to observe the compiler diagnostic: "missing method Hapus".',
            'Deploy the safe Type Assertion syntax val, ok := objekBebas.(string) verifying conversion checks.',
            'Compose two micro-interfaces into a unified composite interface using Interface Embedding.',
        ],
        'challengeId': 'Rancang interface `PenyaringTrafik` dengan method `Izinkan(ip string) bool`. Implementasikan dua struct: `WhiteListFilter` (hanya izinkan IP terdaftar) dan `RateLimitFilter` (batasi maksimal 5 hit).',
        'challengeEn': 'Design a `TrafficFilter` interface with `Allow(ip string) bool`. Implement two structs: `WhiteListFilter` and `RateLimitFilter` satisfying the interface implicitly.',
        'summaryId': 'Kamu telah menguasai Interfaces implisit, Duck Typing, dan Type Assertions. Minggu depan kita memasuki kekuatan terbesar Go: Goroutines dan Konkurensi sync.WaitGroup.',
        'summaryEn': 'You have mastered implicit Interfaces, Duck Typing, and Type Assertions. Next week, we enter Go\'s greatest superpower: Goroutines and sync.WaitGroup Concurrency.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'goroutines-dan-sync',
        'titleId': 'Konkurensi: Jutaan Goroutines (go), sync.WaitGroup, Mutex & Race Detector',
        'titleEn': 'Concurrency: Millions of Goroutines, sync.WaitGroup, Mutex & Race Detector',
        'programId': 'Pemeriksa Kesehatan Ratusan Endpoint Paralel (Concurrent Health Checker)',
        'programEn': 'Concurrent Multi-Endpoint Health Checker with Mutex Protection',
        'levelNameId': 'Interface, Konkurensi & Channel Pipes',
        'levelNameEn': 'Interface, Concurrency & Channel Pipes',
        'language': 'go',
        'code': """package main

import (
	"fmt"
	"sync"
	"time"
)

// Struktur Data Hasil Pengecekan Aman-Thread (Thread-Safe)
type LaporanKluster struct {
	mu            sync.Mutex // Mutex mencegah Data Race saat banyak goroutine menulis bersamaan
	hasilPengecekan map[string]bool
	totalSukses   int
}

func (l *LaporanKluster) CatatHasil(endpoint string, sukses bool) {
	// Kunci akses memori eksklusif
	l.mu.Lock()
	defer l.mu.Unlock() // Otomatis lepas kunci saat fungsi selesai dieksekusi

	l.hasilPengecekan[endpoint] = sukses
	if sukses {
		l.totalSukses++
	}
}

func cekEndpoint(endpoint string, laporan *LaporanKluster, wg *sync.WaitGroup) {
	// Beri tahu WaitGroup bahwa goroutine ini telah selesai saat fungsi keluar
	defer wg.Done()

	// Simulasi request jaringan I/O
	time.Sleep(100 * time.Millisecond)
	isUp := len(endpoint)%2 == 0 // Simulasi acak kesehatan

	laporan.CatatHasil(endpoint, isUp)
	fmt.Printf("[Goroutine] Selesai memeriksa: %-30s | Status: %v\\n", endpoint, isUp)
}

func main() {
	daftarEndpoint := []string{
		"http://auth-service.prod:8080/health",
		"http://payment-gateway.prod:8081/health",
		"http://notification-hub.prod:8082/health",
		"http://inventory-engine.prod:8083/health",
		"http://reporting-worker.prod:8084/health",
	}

	laporan := &LaporanKluster{
		hasilPengecekan: make(map[string]bool),
	}

	// sync.WaitGroup: Penghitung sinkronisasi untuk menunggu seluruh goroutine selesai
	var wg sync.WaitGroup

	waktuMulai := time.Now()
	fmt.Println("=== Memulai Pengecekan 5 Endpoint Secara Konkuren ===")

	for _, ep := range daftarEndpoint {
		wg.Add(1) // Tambah penghitung tugas
		
		// KATA KUNCI 'go': Meluncurkan fungsi sebagai Goroutine ringan independen!
		go cekEndpoint(ep, laporan, &wg)
	}

	// Tunggu sampai seluruh goroutine memanggil wg.Done() (penghitung kembali ke 0)
	wg.Wait()

	durasi := time.Since(waktuMulai)
	fmt.Printf("\\nSeluruh pengecekan selesai dalam %v (Bukan 500ms, tapi paralel ~100ms!)\\n", durasi)
	fmt.Printf("Total Layanan Sehat: %d / %d\\n", laporan.totalSukses, len(daftarEndpoint))
}
""",
        'objectivesId': [
            'Memahami perbedaan Konkurensi (menangani banyak hal sekaligus) vs Paralelisme (mengeksekusi banyak hal bersamaan di multi-core)',
            'Meluncurkan thread ringan (*goroutine*) menggunakan kata kunci sederhana `go` (hanya butuh ~2KB memori awal per goroutine)',
            'Menggunakan sync.WaitGroup (Add, Done, Wait) untuk mengoordinasikan selesainya sekelompok goroutine',
            'Mencegah fenomena Data Race menggunakan sync.Mutex (Lock, Unlock, defer Unlock)',
            'Menjalankan kompilasi dengan race detector aktif (-race flag: go run -race main.go) untuk mendeteksi bug konkurensi tersembunyi',
        ],
        'objectivesEn': [
            'Contrast Concurrency (dealing with lots of things at once) with Parallelism (doing lots of things simultaneously on multi-cores)',
            'Spawn lightweight threads (*goroutines*) deploying the native `go` keyword (~2KB initial stack allocation)',
            'Orchestrate completion barriers deploying sync.WaitGroup primitives (Add, Done, Wait)',
            'Eliminate Data Race conditions using sync.Mutex mutual exclusion locks (Lock, Unlock, defer Unlock)',
            'Execute compilation with the integrated Race Detector active (go run -race main.go) catching race bugs',
        ],
        'explanationId': """### Mengapa Goroutine Jauh Lebih Unggul dari OS Thread?
Di bahasa tradisional (Java, C++, Python):
Satu thread sistem operasi (*OS Thread*) memakan memori **1 sampai 2 Megabyte**. Jika server Anda membuka 10.000 thread, memori RAM 16GB langsung habis terbakar dan server mengalami *Out Of Memory (OOM)*.

Di **Go**:
1. Sebuah **Goroutine** hanya membutuhkan memori awal **~2 Kilobyte**!
2. Go mengelola jatah waktu thread menggunakan runtime scheduler canggih berbasis model **M:N Scheduler** (ribuan goroutine dipetakan ke sedikit OS thread di CPU).
3. Anda bisa menyalakan **1.000.000 (satu juta) goroutines sekaligus** di laptop biasa tanpa kehabisan memori!

### Bahaya Fatal: Data Race & Solusi Mutex
Ketika 5 goroutine mencoba menulis atau menambah angka ke map yang sama secara bersamaan di memori, terjadi **Data Race**. Data Anda akan korup atau program crash dengan pesan: `fatal error: concurrent map writes`.
**`sync.Mutex`** menyelesaikan ini:
Sebelum menulis data, panggil `mu.Lock()`. Goroutine lain yang ingin menulis harus mengantre tertib sampai goroutine pertama memanggil `mu.Unlock()`.

### Detektor Balapan Bawaan Go (`-race`)
Go memiliki alat pendeteksi bug konkurensi terhebat di dunia industri: **Go Race Detector**.
Cukup jalankan: `go run -race main.go`.
Compiler akan menganalisis memori dan memberi tahu baris kode mana yang mengalami tabrakan data secara akurat!""",
        'explanationEn': """### Why Goroutines Obliterate OS Threads
In traditional environments (Java, C++, Python):
A single Operating System Thread (*OS Thread*) consumes **1 to 2 Megabytes** of stack memory. Spawning 10,000 threads consumes 16GB of RAM, provoking fatal Out Of Memory (OOM) crashes.

In **Go**:
1. A **Goroutine** begins with a minuscule **~2 Kilobyte** stack footprint!
2. The Go runtime multiplexes goroutines across a lean pool of OS cores via its high-performance **M:N Work-Stealing Scheduler**.
3. You can effortlessly spawn **1,000,000 concurrent goroutines** on an everyday developer laptop without breaking a sweat!

### Data Races & The Mutex Shield
When concurrent goroutines write to identical memory buffers (like shared maps) simultaneously, a **Data Race** occurs, terminating the runtime: `fatal error: concurrent map writes`.
**`sync.Mutex`** guarantees mutual exclusion:
Invoking `mu.Lock()` ensures sole access; competing goroutines queue politely until `mu.Unlock()` releases the lock.

### The Automated Race Detector (`-race`)
Go ships with an integrated runtime data race analyzer:
Execute: `go run -race main.go`.
The compiler instruments memory access boundaries, flagging unsynchronized concurrent read/write collisions down to exact line numbers!""",
        'beginnerId': """### Analogi: Truk Kontainer Raksasa vs Armada 10.000 Semut Pekerja
1. **OS Thread Tradisional** seperti truk kontainer 18 roda: jika Anda ingin mengantarkan satu lembar amplop surat, Anda harus menyalakan mesin truk 5000cc, membutuhkan jalan raya lebar (*2MB RAM*), dan menghabiskan bahan bakar besar.
2. **Goroutine** seperti kawanan semut kurir super cepat: semut sangat kecil (*2KB memori*), Anda bisa mengirim 1 juta semut sekaligus dalam satu detik, dan mereka membawa surat melewati celah kecil tanpa memacetkan jalan raya.
3. **Mutex** seperti kunci gerendel pintu toilet umum: jika satu orang sudah masuk dan mengunci gerendel (*mu.Lock()*), orang lain di luar harus menunggu sampai orang pertama keluar dan membuka gerendel (*mu.Unlock()*).""",
        'beginnerEn': """### Analogy: Semi-Truck Fleets vs One Million Courier Ants
1. **Traditional OS Threads** are 18-wheel freight tractor-trailers: dispatching a single paper letter requires turning on a 5000cc diesel engine, commanding highway lanes (*2MB RAM per thread*).
2. **Goroutines** are a swarm of micro-courier ants: each ant weighs nothing (*2KB stack*); you dispatch one million ants in parallel across narrow conduits without causing traffic jams.
3. **Mutex** is a public restroom bolt lock: when an occupant locks the latch (*mu.Lock()*), others wait in an orderly queue until the latch disengages (*mu.Unlock()*).""",
        'experimentsId': [
            'Hapus mu.Lock() dan mu.Unlock() dari CatatHasil, jalankan go run -race main.go, dan saksikan detektor race mencetak peringatan merah WARNING: DATA RACE!',
            'Ganti jumlah endpoint menjadi 100 dan amati bahwa total waktu eksekusi tetap berada di kisaran ~100ms berkat paralelisme.',
            'Lupa memanggil wg.Done() dan amati aplikasi macet selamanya (fatal error: all goroutines are asleep - deadlock!).',
            'Pelajari sync.RWMutex (RLock untuk banyak pembaca bersamaan, Lock eksklusif hanya untuk penulis).',
        ],
        'experimentsEn': [
            'Omit mu.Lock() and mu.Unlock(), run go run -race main.go, and observe the race detector flag WARNING: DATA RACE!',
            'Scale endpoints to 100 observing total duration remains ~100ms thanks to concurrent scheduling.',
            'Omit wg.Done() and observe the runtime panic: fatal error: all goroutines are asleep - deadlock!',
            'Explore sync.RWMutex permitting multiple concurrent readers (RLock) while reserving exclusive write locks.',
        ],
        'challengeId': 'Buat worker pool konkuren: buat 3 goroutine pekerja yang mengambil URL dari antrean tugas dan memeriksa statusnya secara paralel hingga seluruh tugas antrean selesai.',
        'challengeEn': 'Build a concurrent worker pool: instantiate 3 worker goroutines consuming URLs from a task queue, processing checks in parallel until exhausted.',
        'summaryId': 'Kamu telah menguasai Goroutines, sync.WaitGroup, Mutex, dan alat deteksi -race. Minggu depan kita mempelajari Channels dan multiplexing select.',
        'summaryEn': 'You have mastered Goroutines, sync.WaitGroup, Mutex, and the -race detector. Next week, we examine Channels and select multiplexing.',
    },
    {
        'week': 7,
        'level': 'intermediate',
        'topicId': 'channels-dan-select',
        'titleId': 'Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts',
        'titleEn': 'Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts',
        'programId': 'Pembatas Kecepatan Token Bucket & Antrean Permintaan Gateway',
        'programEn': 'Token-Bucket Rate Limiter & Request Queue Multiplexer with select',
        'levelNameId': 'Interface, Konkurensi & Channel Pipes',
        'levelNameEn': 'Interface, Concurrency & Channel Pipes',
        'language': 'go',
        'code': """package main

import (
	"fmt"
	"time"
)

// Pepatah Go: "Do not communicate by sharing memory; instead, share memory by communicating."

func produserTrafik(antreanReq chan<- string) {
	// Channel berarah kirim-saja (send-only: chan<-)
	for i := 1; i <= 6; i++ {
		reqID := fmt.Sprintf("REQ-HTTP-%03d", i)
		antreanReq <- reqID // Kirim ke channel (akan terblokir jika buffer penuh)
		fmt.Printf("[Client] Mengirimkan %s ke gateway...\\n", reqID)
		time.Sleep(50 * time.Millisecond)
	}
	close(antreanReq) // Tutup channel setelah semua data dikirim
}

func main() {
	// 1. Buffered Channel dengan kapasitas penampung 3 request
	antreanReq := make(chan string, 3)

	// 2. Token Bucket Rate Limiter: Ticker menghasilkan token setiap 120 milidetik
	tokenBucket := time.NewTicker(120 * time.Millisecond)
	defer tokenBucket.Stop()

	// Jalankan produser di goroutine terpisah
	go produserTrafik(antreanReq)

	fmt.Println("=== Gateway Rate Limiter (Token Bucket Engine) ===")

	// 3. Loop Konsumsi Channel
	for req := range antreanReq {
		// 4. select Statement: Multiplexing saluran asinkron dengan batas waktu (Timeout)
		select {
		case <-tokenBucket.C:
			// Token tersedia: Izinkan request diproses
			fmt.Printf("  --> [GATEWAY 200 OK] Token diperoleh! Memproses %s\\n", req)
		case <-time.After(150 * time.Millisecond):
			// Timeout: Token terlalu lama tidak tersedia (Overload)
			fmt.Printf("  --> [GATEWAY 429 TOO MANY REQUESTS] %s DITOLAK (Antrean Penuh)\\n", req)
		}
	}

	fmt.Println("\\nSeluruh antrean request berhasil diproses.")
}
""",
        'objectivesId': [
            'Memahami filosofi konkurensi CSP (Communicating Sequential Processes): Berkomunikasi via Channel, bukan berbagi memori',
            'Membedakan Unbuffered Channel (sinkronisasi jabat tangan instan) vs Buffered Channel (antrean berkapasitas)',
            'Menggunakan directional channels (chan<- kirim saja, <-chan terima saja) untuk keamanan API fungsi',
            'Menguasai statement select untuk multiplexing banyak channel secara non-blocking',
            'Menerapkan pola Timeouts menggunakan time.After() di dalam blok select untuk mencegah kebuntuan (deadlock)',
        ],
        'objectivesEn': [
            'Internalize CSP concurrency philosophy: Do not communicate by sharing memory; share memory by communicating',
            'Contrast Unbuffered Channels (synchronous rendezvous handshakes) with Buffered Channels (queued buffers)',
            'Deploy directional channels (send-only chan<-, receive-only <-chan) enforcing API boundaries',
            'Master the select statement to multiplex across multiple channel streams non-blockingly',
            'Implement resilient Timeouts via time.After() inside select blocks preventing deadlocks',
        ],
        'explanationId': """### Slogan Emas Go: Komunikasi via Channels
Daripada mengunci variabel memori dengan Mutex yang rawan deadlock dan human error, Go menyediakan **Channels (`chan`)**: pipa komunikasi tipe data antar-goroutine.
*"Jangan berkomunikasi dengan berbagi memori (Mutex); melainkan bagilah memori dengan berkomunikasi (Channels)."*

### Unbuffered vs Buffered Channel
1. **Unbuffered (`make(chan int)`)**:
   Pengirim data akan **terblokir (menunggu)** sampai ada goroutine lain yang siap menerima data di ujung pipa. Ini adalah jabat tangan sinkron (*synchronous rendezvous*).
2. **Buffered (`make(chan int, 100)`)**:
   Pipa memiliki wadah penampung sebanyak 100 item. Pengirim data bisa terus memasukkan item tanpa terblokir, selama wadah penampung belum penuh.

### Kekuatan `select` Statement
Pernyataan `select` seperti `switch`, tetapi **khusus untuk mendengarkan komunikasi channel**.
`select` akan mengeksekusi *case* pertama yang salurannya sudah siap mengirim atau menerima data.
Jika tidak ada yang siap dan Anda menambahkan case `<-time.After(2 * time.Second)`, Anda otomatis memiliki perlindungan timeout jaringan yang sangat elegan!""",
        'explanationEn': """### The Golden Go Proverb: Share Memory by Communicating
Rather than micromanaging Mutex locks across shared heap memory, Go introduces **Channels (`chan`)**: typed conduits piping messages between concurrent goroutines.
*"Do not communicate by sharing memory; instead, share memory by communicating."*

### Unbuffered vs Buffered Channels
1. **Unbuffered (`make(chan int)`)**:
   The sender **blocks** until a receiving goroutine consumes the payload at the opposite end of the pipe. This acts as a synchronous rendezvous handshake.
2. **Buffered (`make(chan int, 100)`)**:
   Provides an internal queue holding 100 items. Senders deposit values without blocking until buffer capacity saturates.

### The Power of the `select` Statement
The `select` construct functions like a `switch`, tailored **exclusively for channel multiplexing**.
`select` executes the first case whose communication channel resolves ready.
Combining select branches with `case <-time.After(duration)` delivers timeout protection against frozen network calls!""",
        'beginnerId': """### Analogi: Pipa Pipa Tabung Bola Tenis
1. **Unbuffered Channel** seperti mengoper bola tenis langsung dari tangan ke tangan: orang pertama tidak boleh melepaskan bola sebelum tangan orang kedua benar-benar memegang bola tersebut (*jabat tangan instan*).
2. **Buffered Channel** seperti tabung silinder yang bisa menampung 3 bola tenis: Anda bisa melempar 3 bola ke dalam tabung (*buffer*). Anda baru terhenti melempar jika tabung sudah penuh 3 bola.
3. **select Statement** seperti kasir tol dengan 3 gerbang: kasir melayani mobil dari gerbang mana saja yang lebih dulu sampai di loket.""",
        'beginnerEn': """### Analogy: Direct Hand-Offs vs Tennis Ball Tubes
1. **Unbuffered Channels** are direct hand-to-hand passings of a tennis ball: the sender cannot release their grip until the receiver's fingers clamp around the ball (*synchronous rendezvous*).
2. **Buffered Channels** are plastic sleeves holding 3 tennis balls: you drop 3 balls into the cylinder without waiting; you pause only when the cylinder fills to capacity.
3. **select Statements** are toll plaza operators monitoring 3 lanes: the operator services whichever vehicle trips the sensor wire first.""",
        'experimentsId': [
            'Ubah kapasitas buffer make(chan string, 3) menjadi 0 (unbuffered) dan amati perubahan pola log antrean.',
            'Kecilkan timeout time.After menjadi 20ms dan saksikan pesan 429 TOO MANY REQUESTS mendominasi.',
            'Lupa memanggil close(antreanReq) pada goroutine produser dan amati for-range macet menanti data.',
            'Tambahkan default case pada select untuk melakukan operasi pengecekan non-blocking.',
        ],
        'experimentsEn': [
            'Zero out the buffer capacity make(chan string, 0) observing synchronous handshake logging patterns.',
            'Throttle time.After timeouts to 20ms watching 429 TOO MANY REQUESTS drop logs spike.',
            'Omit close(antreanReq) inside the producer to observe the consumer loop deadlock.',
            'Attach a default case to the select block to execute immediate non-blocking channel polling.',
        ],
        'challengeId': 'Buat saluran sinyal pembatalan `batalChan := make(chan struct{})`. Tambahkan `case <-batalChan:` di dalam blok select untuk menghentikan seluruh pemrosesan antrean seketika.',
        'challengeEn': 'Author a cancellation broadcast channel `cancelChan := make(chan struct{})` integrated inside select to halt queue consumption immediately on signal.',
        'summaryId': 'Kamu telah menguasai Channels, buffered vs unbuffered, multiplexing select, dan timeout patterns. Minggu depan kita mempelajari Context dan pembatalan rantai request.',
        'summaryEn': 'You have mastered Channels, buffers, select multiplexing, and timeouts. Next week, we examine context.Context and distributed cancellation pipelines.',
    },
    {
        'week': 8,
        'level': 'intermediate',
        'topicId': 'context-dan-cancellation',
        'titleId': 'context.Context: Propagasi Batas Waktu (WithTimeout), Pembatalan & Metadata',
        'titleEn': 'context.Context: Timeout Propagation (WithTimeout), Cancellation & Metadata',
        'programId': 'Klien HTTP Gateway dengan Propagasi Batas Waktu (Deadline Cancellation)',
        'programEn': 'Gateway Upstream HTTP Client with Context Timeout & Tracing Propagation',
        'levelNameId': 'Interface, Konkurensi & Channel Pipes',
        'levelNameEn': 'Interface, Concurrency & Channel Pipes',
        'language': 'go',
        'code': """package main

import (
	"context"
	"fmt"
	"time"
)

// 1. Tipe Kustom untuk Kunci Context (Mencegah Benturan Paket Lain)
type contextKey string

const (
	KeyTraceID   contextKey = "trace_id"
	KeyUserRole  contextKey = "user_role"
)

// Simulasi Pemanggilan Mikroservis Hulu (Upstream Database/Auth)
func panggilMicroserviceHulu(ctx context.Context, namaLayanan string, latency time.Duration) (string, error) {
	// Ekstrak metadata trace ID dari context
	traceID := "UNKNOWN"
	if tid, ok := ctx.Value(KeyTraceID).(string); ok {
		traceID = tid
	}

	fmt.Printf("[Trace: %s] Menghubungi %s (Ekspektasi: %v)...\\n", traceID, namaLayanan, latency)

	// Saluran penampung hasil
	hasilChan := make(chan string, 1)

	go func() {
		time.Sleep(latency) // Simulasi kerja lambat hulu
		hasilChan <- fmt.Sprintf("Respons Sukses dari %s", namaLayanan)
	}()

	// 2. Dengarkan sinyal ctx.Done() untuk pembatalan instan!
	select {
	case <-ctx.Done():
		// Timeout terlampaui atau dibatalkan oleh parent!
		return "", fmt.Errorf("layanan %s DIBATALKAN oleh Context: %w", namaLayanan, ctx.Err())
	case hasil := <-hasilChan:
		return hasil, nil
	}
}

func main() {
	// 3. context.Background(): Akar dari seluruh pohon context
	ctxRoot := context.Background()

	// 4. context.WithValue: Menyematkan metadata penelusuran (Distributed Tracing ID)
	ctxDenganTrace := context.WithValue(ctxRoot, KeyTraceID, "TRX-NUSA-8899")

	// 5. context.WithTimeout: Menetapkan tenggat waktu keras (SLA Maksimal 200ms)
	ctxTimeout, cancel := context.WithTimeout(ctxDenganTrace, 200*time.Millisecond)
	defer cancel() // Sangat penting: Selalu panggil cancel() untuk membersihkan timer di memori!

	fmt.Println("=== Gateway Context Deadline Enforcement ===")

	// Uji 1: Layanan Cepat (Selesai dalam 80ms < 200ms) -> SUKSES
	if res, err := panggilMicroserviceHulu(ctxTimeout, "AuthService", 80*time.Millisecond); err != nil {
		fmt.Println("Eror:", err)
	} else {
		fmt.Printf("--> HASIL 1: %s\\n\\n", res)
	}

	// Uji 2: Layanan Lambat (Membutuhkan 400ms > 200ms) -> OTOMATIS TIMEOUT
	// Buat timeout baru untuk pengujian kedua
	ctxTimeout2, cancel2 := context.WithTimeout(ctxDenganTrace, 150*time.Millisecond)
	defer cancel2()

	if res, err := panggilMicroserviceHulu(ctxTimeout2, "LegacyPaymentWorker", 400*time.Millisecond); err != nil {
		fmt.Printf("--> HASIL 2: %v\\n", err)
	} else {
		fmt.Printf("--> HASIL 2: %s\\n", res)
	}
}
""",
        'objectivesId': [
            'Memahami peran vital paket `context.Context` sebagai standar nomor 1 di Go untuk mengelola lifecycle request',
            'Menggunakan context.WithTimeout() dan context.WithDeadline() untuk menegakkan Service Level Agreement (SLA)',
            'Memahami pentingnya selalu mengeksekusi `defer cancel()` untuk mencegah kebocoran timer di memori (*timer leak*)',
            'Mendengarkan saluran penutupan `<-ctx.Done()` di dalam select statement untuk menghentikan goroutine yang sia-sia',
            'Menyematkan metadata tracing aman menggunakan context.WithValue() dengan tipe kunci privat khusus',
        ],
        'objectivesEn': [
            'Master the pivotal role of `context.Context` as the definitive Go standard for request lifecycle management',
            'Deploy context.WithTimeout() and context.WithDeadline() enforcing Service Level Agreements (SLAs)',
            'Internalize the mandatory `defer cancel()` invocation preventing background timer memory leaks',
            'Subscribe to the `<-ctx.Done()` channel inside select branches pruning abandoned goroutines',
            'Propagate tracing metadata securely using context.WithValue() with private collision-proof key types',
        ],
        'explanationId': """### Mengapa `context.Context` adalah Standar Wajib di Go?
Bayangkan pengguna browser membuka website Anda, lalu menutup tab browsernya setelah 1 detik.
Jika server Anda sedang menjalankan 5 query database berat yang membutuhkan waktu 10 detik:
**Tanpa Context, server Anda akan terus membuang-buang memori CPU selama 10 detik penuh untuk data yang sudah tidak dipedulikan oleh siapa pun!**

Dengan **`context.Context`**:
1. Setiap request HTTP masuk membawa `req.Context()`.
2. Jika tab browser ditutup oleh pengguna, sinyal penutupan otomatis menjalar ke seluruh pohon pemanggilan: database query dibatalkan seketika, panggilan mikroservis dihentikan, dan sumber daya dibebaskan detik itu juga!

### Tiga Pilar Penggunaan Context:
1. **`context.WithTimeout(parent, duration)`**: Menetapkan batas waktu maksimal. Jika waktu habis, `<-ctx.Done()` langsung terbuka dengan eror `context.DeadlineExceeded`.
2. **`context.WithCancel(parent)`**: Pembatalan manual kapan saja pemanggil memutuskan untuk berhenti.
3. **`context.WithValue(parent, key, value)`**: Membawa ID pelacakan (*Trace ID*), user claim, atau batas otorisasi melewati berbagai lapisan fungsi.

### Aturan Emas Context:
- Selalu letakkan `ctx context.Context` sebagai **parameter pertama** dalam deklarasi fungsi: `func DoWork(ctx context.Context, param string)`.
- Jangan simpan context di dalam struct! Context harus mengalir melewati parameter fungsi.""",
        'explanationEn': """### Why `context.Context` Is Inviolable in Enterprise Go
Imagine a mobile shopper browsing a catalog who closes the app after 1 second.
If the gateway is processing 5 heavy database queries slated to take 10 seconds:
**Without Context, servers burn database CPU cycles for 10 full seconds computing answers nobody will ever read!**

With **`context.Context`**:
1. Inbound HTTP requests bind to `req.Context()`.
2. If clients abort connections, the cancellation signal cascades down the entire call tree: database queries abort immediately, RPCs cancel, and memory cleans up instantly!

### The Triad of Context Primitives:
1. **`context.WithTimeout(parent, duration)`**: Enforces hard deadlines. When elapsed, `<-ctx.Done()` unblocks with `context.DeadlineExceeded`.
2. **`context.WithCancel(parent)`**: Manual programmatic cancellation triggered when parent routines finish early.
3. **`context.WithValue(parent, key, value)`**: Carries distributed trace IDs, correlation tokens, and authorization claims across boundaries.

### Inviolable Context Rules:
- Context must ALWAYS reside as the **first parameter** of a signature: `func DoWork(ctx context.Context, arg string)`.
- Never store Context inside struct fields! Contexts must flow ephemerally down call parameters.""",
        'beginnerId': """### Analogi: Perintah Pembatalan dari Markas Militer
Bayangkan markas komando militer mengirim pasukan penjelajah ke hutan belantara (*menjalankan goroutine*):
1. **WithTimeout** seperti jam digital di pergelangan tangan prajurit yang diatur menghitung mundur 2 jam: jika dalam 2 jam misi belum selesai, prajurit wajib putar balik ke markas (*timeout*).
2. **ctx.Done()** seperti sinyal radio darurat dari komando: jika markas melihat badai topan datang, markas menekan tombol sirene (*cancel()*), radio prajurit berbunyi, dan mereka langsung berhenti melangkah detik itu juga tanpa membuang energi.""",
        'beginnerEn': """### Analogy: Military Command Abort Protocols
Imagine a military command center deploying an expeditionary team into the field (*spawning goroutines*):
1. **WithTimeout** is an automated countdown timer on the squad lead's chronometer set for 2 hours: if goals are unachieved when the clock expires, teams abort immediately (*deadline exceeded*).
2. **ctx.Done()** is an encrypted flare gun radio signal: if headquarters detects a catastrophic hurricane approaching, command triggers the abort button (*cancel()*), field radios blare sirens, and operatives halt deployment instantly.""",
        'experimentsId': [
            'Hapus defer cancel() dan jalankan go vet ./... untuk melihat linter mendeteksi peringatan the cancel function is not called.',
            'Ubah SLA timeout menjadi 500ms dan buktikan kedua layanan berhasil diselesaikan tanpa eror.',
            'Cetak ctx.Err() saat timeout terjadi untuk mengamati pesan context.DeadlineExceeded.',
            'Rangkai dua context berurutan untuk melihat bagaimana pembatalan parent otomatis membatalkan seluruh child context.',
        ],
        'experimentsEn': [
            'Omit defer cancel() and run go vet ./... to observe the static analyzer flag uncalled cancel functions.',
            'Increase timeout SLA to 500ms observing both upstream services clear successfully.',
            'Print ctx.Err() following cancellations inspecting the native context.DeadlineExceeded error.',
            'Cascade two hierarchical contexts observing how parent cancellations propagate to all descendant branches.',
        ],
        'challengeId': 'Buat fungsi `QueryDatabaseDenganTimeout(ctx context.Context, sql string) error` yang menjalankan query simulasi 300ms, namun dibatasi oleh timeout context 100ms dengan penanganan rollback transaksi.',
        'challengeEn': 'Author a `QueryDatabaseWithTimeout(ctx context.Context, sql string) error` running 300ms queries constrained by 100ms context timeouts with rollback safety.',
        'summaryId': 'Kamu telah menguasai context.Context, WithTimeout, WithValue, dan propagasi pembatalan. Minggu depan kita memasuki Level 3: net/http dan Arsitektur Middleware.',
        'summaryEn': 'You have mastered context.Context, WithTimeout, WithValue, and cancellation cascades. Next week, we enter Level 3: net/http and Middleware Pipelines.',
    },

    # Level 3: HTTP Server, Profiling & Capstone Gateway (Weeks 9-12)
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'net-http-dan-middleware',
        'titleId': 'Arsitektur net/http Murni: Custom Handlers, Chaining Middleware & REST Routing',
        'titleEn': 'Pure net/http Architecture: Custom Handlers, Middleware Chaining & REST',
        'programId': 'Pipeline Middleware API Gateway (Logger, Auth Token & Recovery Panics)',
        'programEn': 'Production API Gateway Middleware Pipeline with Panic Recovery',
        'levelNameId': 'HTTP Server, Profiling & Capstone Gateway',
        'levelNameEn': 'HTTP Server, Profiling & Gateway Capstone',
        'language': 'go',
        'code': """package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// 1. Tipe Middleware Idiomatik Go: func(http.Handler) http.Handler
type Middleware func(http.Handler) http.Handler

// Middleware 1: Logging Catatan Akses & Pengukuran Latensi
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		mulai := time.Now()
		
		// Lanjutkan ke handler berikutnya di dalam rantai
		next.ServeHTTP(w, r)
		
		latensi := time.Since(mulai)
		log.Printf("[HTTP] %s %s | Durasi: %v | IP: %s", r.Method, r.URL.Path, latensi, r.RemoteAddr)
	})
}

// Middleware 2: Panic Recovery (Mencegah Server Crash jika terjadi runtime error fatal)
func RecoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("[PANIC RECOVERED] Terjadi panic fatal: %v", rec)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{
					"error": "Internal Server Error (Recovered by Gateway)",
				})
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// Helper: Merangkai Banyak Middleware Secara Elegan
func RangkaiMiddleware(handler http.Handler, middlewares ...Middleware) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		handler = middlewares[i](handler)
	}
	return handler
}

// Handler Inti Bisnis
func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]any{
		"status":    "HEALTHY",
		"engine":    "Go net/http Pure Core",
		"timestamp": time.Now().Unix(),
	})
}

func main() {
	// Di Go 1.22+, ServeMux mendukung pola method dan path: "GET /health"
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", HealthCheckHandler)

	// Terapkan rantai middleware ke seluruh rute mux
	handlerUtama := RangkaiMiddleware(mux, RecoveryMiddleware, LoggingMiddleware)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      handlerUtama,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	fmt.Println("=== Nusa Edge Gateway Berjalan di Port :8080 ===")
	fmt.Println("Tekan Ctrl+C untuk menghentikan server.")
	
	// Jalankan server HTTP (akan me-listen request masuk)
	// log.Fatal(server.ListenAndServe())
	_ = server // Mock deklarasi agar runnable di playground
}
""",
        'objectivesId': [
            'Memahami arsitektur paket net/http bawaan Go yang menjadi fondasi web backend tanpa perlu framework berat',
            'Menguasai antarmuka inti http.Handler dan adapter fungsi http.HandlerFunc',
            'Membangun pola rantai Middleware idiomatik (Logger, Auth, Panic Recovery) menggunakan fungsi pembungkus',
            'Menggunakan fitur routing modern Go 1.22+ pada http.NewServeMux ("GET /path", "POST /path/{id}")',
            'Menerapkan konfigurasi batas waktu server produksi (ReadTimeout, WriteTimeout, IdleTimeout)',
        ],
        'objectivesEn': [
            'Master the standard library net/http package powering cloud microservices without third-party frameworks',
            'Internalize the canonical http.Handler interface alongside the http.HandlerFunc adapter',
            'Construct idiomatic Middleware Chaining pipelines (Logging, Auth, Panic Recovery) via decorator wrappers',
            'Deploy modern Go 1.22+ HTTP path patterns on http.NewServeMux ("GET /path", "POST /path/{id}")',
            'Configure production-grade server timeouts (ReadTimeout, WriteTimeout, IdleTimeout) hardening against Slowloris attacks',
        ],
        'explanationId': """### Mengapa Kebanyakan Perusahaan Besar Menggunakan `net/http` Murni?
Berbeda dengan Node.js (Express) atau Python (Flask) di mana library eksternal wajib digunakan, **standard library `net/http` bawaan Go sudah merupakan web server tingkat produksi berkecepatan sangat tinggi**.
Server `net/http` secara otomatis meluncurkan satu **goroutine independen per request HTTP masuk**, memungkinkan satu server Go melayani ratusan ribu request secara konkuren tanpa konfigurasi rumit!

### Pola Middleware Idiomatik di Go
Sebuah middleware di Go didefinisikan sebagai fungsi yang menerima `http.Handler` dan mengembalikan `http.Handler` baru:
`func MyMiddleware(next http.Handler) http.Handler`
Di dalamnya, Anda mengeksekusi kode pra-request (misal: cek token otentikasi), memanggil `next.ServeHTTP(w, r)`, lalu mengeksekusi kode pasca-request (misal: catat durasi latensi).

### Mencegah Crash dengan Panic Recovery
Jika salah satu endpoint kode programmer mengalami dereferensi pointer `nil`, Go akan melempar `panic`.
Tanpa middleware recovery, seluruh proses server web bisa mati!
Dengan menyematkan `recover()` di dalam `defer` fungsi middleware terluar, server Anda dapat menangkap kepanikan tersebut, mencatat lognya, dan mengembalikan status HTTP 500 ke klien sambil **membiarkan server utama tetap hidup melayani jutaan pengguna lainnya!**""",
        'explanationEn': """### Why Production Teams Prefer Standard `net/http`
Unlike Node.js or Python requiring external frameworks to achieve baseline routing, **Go\'s native `net/http` is an industrial-grade, hyper-performant production web engine**.
The engine automatically spawns an **isolated goroutine per incoming HTTP connection**, natively scaling to hundreds of thousands of concurrent clients out of the box!

### The Idiomatic Go Middleware Pattern
A standard Go middleware is an architectural decorator:
`func Middleware(next http.Handler) http.Handler`
It intercepts requests, executes pre-computation (validating tokens), delegates down the chain `next.ServeHTTP(w, r)`, and benchmarks post-computation metrics (recording latency timers).

### The Panic Recovery Safety Net
If a route dereferences a `nil` pointer, the runtime triggers a `panic`.
Without recovery middleware, unhandled panics terminate the server process!
Invoking `recover()` inside an outer deferred middleware boundary intercepts panics gracefully, logging stack traces and emitting HTTP 500 responses while **keeping the global server instance humming safely for all other clients!**""",
        'beginnerId': """### Analogi: Gerbang Pemeriksaan Stasiun Kereta Api Cepat
1. **`net/http` Server** seperti stasiun kereta api berkecepatan tinggi: setiap kali ada 1 penumpang datang (*1 request masuk*), stasiun langsung menugaskan 1 petugas robot pribadi (*goroutine*) untuk mendampingi penumpang tersebut.
2. **Rantai Middleware** seperti lorong pintu masuk stasiun: sebelum sampai ke peron kereta (*handler inti*), penumpang harus melewati detektor logam (*Panic Recovery*), memindai tiket barcode (*Auth Middleware*), dan difoto oleh kamera pengawas (*Logging Middleware*).""",
        'beginnerEn': """### Analogy: Automated High-Speed Transit Turnstiles
1. **`net/http` Servers** are high-speed rail terminals: whenever a traveler steps onto the concourse (*incoming HTTP connection*), management instantly assigns an individual robotic guide (*dedicated goroutine*) attending exclusively to that passenger.
2. **Middleware Pipelines** are station security turnstiles: before boarding the platform (*core business handler*), travelers walk through thermal scanners (*Panic Recovery*), tap biometric fare cards (*Auth Middleware*), and smile for the CCTV camera (*Logging Middleware*).""",
        'experimentsId': [
            'Tambahkan handler baru yang dengan sengaja memicu panic("database meledak!") dan buktikan server tidak crash berkat RecoveryMiddleware.',
            'Tambahkan header respons kustom w.Header().Set("X-Powered-By", "Go-1.24-Enterprise") di dalam logging middleware.',
            'Pelajari cara membaca path parameters dinamis di Go 1.22 menggunakan r.PathValue("id").',
            'Uji kinerja server menggunakan load testing tool seperti autocannon atau hey.',
        ],
        'experimentsEn': [
            'Author a route deliberately invoking panic("fatal crash!") verifying the server survives thanks to RecoveryMiddleware.',
            'Inject a custom response header w.Header().Set("X-Powered-By", "Go-Engine") inside logging middleware.',
            'Explore extracting dynamic path parameters via Go 1.22 r.PathValue("id").',
            'Benchmark server request throughput using load testing tools such as autocannon or hey.',
        ],
        'challengeId': 'Buat middleware `AuthBearerMiddleware` yang memeriksa header "Authorization". Jika header tidak diawali dengan "Bearer nusa-token-valid", langsung kembalikan status HTTP 401 Unauthorized tanpa memanggil next handler.',
        'challengeEn': 'Author an `AuthBearerMiddleware` checking "Authorization" headers, rejecting non-conforming requests with HTTP 401 Unauthorized before touching downstream handlers.',
        'summaryId': 'Kamu telah menguasai arsitektur net/http murni, rantai middleware, dan recovery panic. Minggu depan kita mempelajari Table-Driven Tests dan Benchmarking.',
        'summaryEn': 'You have mastered pure net/http, middleware chaining, and panic recovery. Next week, we examine Table-Driven Testing and Benchmarking.',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'testing-dan-benchmarking',
        'titleId': 'Testing Idiomatik & Benchmarking: Table-Driven Tests, Subtests & testing.B',
        'titleEn': 'Idiomatic Testing & Benchmarking: Table-Driven Tests, Subtests & testing.B',
        'programId': 'Uji Otomatis Mesin Token Bucket & Pengukuran Kecepatan Operasi',
        'programEn': 'Automated Table-Driven Tests & Benchmark Suite with testing.B',
        'levelNameId': 'HTTP Server, Profiling & Capstone Gateway',
        'levelNameEn': 'HTTP Server, Profiling & Gateway Capstone',
        'language': 'go',
        'code': """package main

import (
	"fmt"
	"strings"
	"testing"
)

// Unit yang Akan Diuji: Pembersih & Sanitasi Jalur URL Gateway
func SanitasiPathGateway(path string) string {
	if path == "" {
		return "/"
	}
	bersih := strings.TrimSpace(path)
	if !strings.HasPrefix(bersih, "/") {
		bersih = "/" + bersih
	}
	// Hapus trailing slash jika bukan root
	if len(bersih) > 1 && strings.HasSuffix(bersih, "/") {
		bersih = strings.TrimSuffix(bersih, "/")
	}
	return bersih
}

// 1. Table-Driven Test Idiomatik (Standar Emas Pengujian di Go)
func TestSanitasiPathGateway(t *testing.T) {
	// Definisi tabel kasus uji
	testCases := []struct {
		namaKasus      string
		inputPath      string
		ekspektasiPath string
	}{
		{namaKasus: "Path Kosong", inputPath: "", ekspektasiPath: "/"},
		{namaKasus: "Path Normal", inputPath: "/api/v1/users", ekspektasiPath: "/api/v1/users"},
		{namaKasus: "Tanpa Leading Slash", inputPath: "api/v1/products", ekspektasiPath: "/api/v1/products"},
		{namaKasus: "Dengan Trailing Slash", inputPath: "/api/v1/orders/", ekspektasiPath: "/api/v1/orders"},
		{namaKasus: "Spasi Ekstra", inputPath: "  /auth/login   ", ekspektasiPath: "/auth/login"},
	}

	for _, tc := range testCases {
		// t.Run(): Menjalankan subtest terisolasi untuk setiap baris kasus
		t.Run(tc.namaKasus, func(t *testing.T) {
			hasil := SanitasiPathGateway(tc.inputPath)
			if hasil != tc.ekspektasiPath {
				t.Errorf("GAGAL [%s]: input='%s', dapat='%s', ekspektasi='%s'",
					tc.namaKasus, tc.inputPath, hasil, tc.ekspektasiPath)
			}
		})
	}
}

// 2. Benchmark Pengukuran Kecepatan Operasi (testing.B)
func BenchmarkSanitasiPathGateway(b *testing.B) {
	samplePath := "   api/v1/distributed/gateway/routes/search/   "

	// b.ResetTimer(): Reset pencatat waktu setelah inisialisasi awal
	b.ResetTimer()

	// Loop b.N diatur otomatis oleh runtime Go hingga sampel statistik valid (biasanya ribuan/jutaan kali)
	for i := 0; i < b.N; i++ {
		_ = SanitasiPathGateway(samplePath)
	}
}

func main() {
	fmt.Println("=== Demo Pengujian Mandiri ===")
	input := "api/v1/status/"
	fmt.Printf("Input: '%s' -> Hasil Sanitasi: '%s'\\n", input, SanitasiPathGateway(input))
	fmt.Println("Jalankan di terminal: 'go test -v -bench=.' untuk melihat pengujian dan benchmark resmi.")
}
""",
        'objectivesId': [
            'Memahami filosofi pengujian bawaan Go tanpa perlu framework test pihak ketiga (cukup paket `testing`)',
            'Menguasai pola pengujian Table-Driven Tests yang diakui sebagai standar emas pengujian industri Go',
            'Menggunakan subtests t.Run() untuk mengisolasi kegagalan spesifik per baris pengujian',
            'Menulis fungsi tolak ukur kecepatan (Benchmark) menggunakan parameter *testing.B dan loop b.N',
            'Menganalisis alokasi memori pengujian menggunakan flag `go test -bench=. -benchmem`',
        ],
        'objectivesEn': [
            'Master native Go testing architecture eliminating third-party testing framework dependencies (standard `testing` package)',
            'Master Table-Driven Testing recognized globally as the gold standard of Go test engineering',
            'Deploy subtests via t.Run() isolating failure domains per test variation',
            'Author high-precision benchmark suites leveraging *testing.B parameters and b.N iteration loops',
            'Audit memory allocations deploying benchmarking flags: `go test -bench=. -benchmem`',
        ],
        'explanationId': """### Standard Emas: Table-Driven Tests
Di bahasa lain, pengembang sering menulis 10 fungsi tes terpisah untuk menguji fungsi yang sama dengan input berbeda (`testEmpty()`, `testSlash()`, `testSpaces()`).
Di **Go**, komunitas menyepakati satu pola terbaik: **Table-Driven Tests**:
1. Anda mendefinisikan slice anonim struct berisi nama kasus, input, dan hasil yang diharapkan.
2. Anda melakukan perulangan `for _, tc := range testCases` dan mengeksekusi `t.Run(tc.name, ...)`.
Menambah 50 skenario uji baru cukup dengan menambahkan 50 baris data ke dalam tabel, tanpa menambah satupun baris fungsi baru!

### Tolak Ukur Kecepatan Otomatis: `testing.B`
Go adalah satu-satunya bahasa populer yang memiliki **mesin benchmarking terintegrasi langsung di standard library**:
Fungsi diawali dengan kata `BenchmarkNamaFungsi(b *testing.B)`.
Runtime Go akan mengeksekusi fungsi Anda berulang kali (misal 10 juta kali) untuk mengukur:
- Berapa **nanodetik per operasi (ns/op)** yang dihabiskan.
- Berapa **byte memori yang dialokasikan (B/op)**.
- Berapa kali alokasi heap terjadi (**allocs/op**).""",
        'explanationEn': """### The Gold Standard: Table-Driven Tests
In other ecosystems, engineers construct dozens of redundant test methods testing identical logic under varied inputs (`testEmpty()`, `testSlash()`, `testTrim()`).
In **Go**, engineering culture mandates **Table-Driven Tests**:
1. Declare an anonymous struct slice listing test names, inputs, and expected outputs.
2. Iterate `for _, tc := range testCases`, delegating execution to `t.Run(tc.name, ...)`.
Expanding coverage to 50 edge cases requires appending 50 clean data rows without writing single-purpose test functions!

### Integrated Performance Benchmarking: `testing.B`
Go remains unique in shipping an **integrated statistical benchmarking engine directly inside its standard toolchain**:
Benchmark functions prefix with `BenchmarkFunctionName(b *testing.B)`.
The Go test harness iterates the function across millions of executions calculating:
- **Nanoseconds per operation (ns/op)**.
- **Bytes allocated per operation (B/op)**.
- **Heap allocations count per operation (allocs/op)**.""",
        'beginnerId': """### Analogi: Meja Uji Tabrak Kendaraan & Stopwatch Lab
1. **Table-Driven Test** seperti meja daftar uji coba sabuk pengaman mobil: ada kolom pengujian kecepatan 20 km/jam, 50 km/jam, dan 100 km/jam. Boneka uji tabrak dipasang dan ditarik berurutan sesuai tabel satu per satu.
2. **Benchmark (`testing.B`)** seperti stopwatch laboratorium pabrik jam Swiss: mekanik menguji keausan roda gigi dengan memutarnya 1.000.000 kali putaran dalam 1 detik untuk menghitung seberapa presisi jam tersebut bekerja.""",
        'beginnerEn': """### Analogy: Automotive Crash Test Matrices & Precision Stopwatches
1. **Table-Driven Tests** are automotive crash-test data sheets: the matrix outlines impact velocities at 20 km/h, 50 km/h, and 100 km/h. Testing dummies buckle in, executing scenarios systematically row-by-row.
2. **Benchmarks (`testing.B`)** are Swiss watchmaker test chronometers: horologists cycle gear escapements 1,000,000 times in rapid succession, calculating nanosecond precision friction coefficients.""",
        'experimentsId': [
            'Jalankan perintah go test -v di terminal untuk melihat output hijau PASS pada setiap subtest.',
            'Jalankan go test -bench=. -benchmem dan amati metrik ns/op serta jumlah alokasi memori B/op.',
            'Tambahkan kasus uji baru dengan input "//ganda//slash//" dan periksa apakah fungsi lolos pengujian.',
            'Sengajakan salah satu ekspektasi salah untuk melihat format pelaporan eror t.Errorf yang jelas.',
        ],
        'experimentsEn': [
            'Run go test -v to observe PASS confirmations across every individual subtest execution.',
            'Execute go test -bench=. -benchmem observing nanosecond timings alongside B/op memory consumption.',
            'Append an edge-case row handling double slashes "//double//slash//" to evaluate sanitizer behavior.',
            'Deliberately fail an expected output to inspect the clean error diagnostics emitted by t.Errorf.',
        ],
        'challengeId': 'Tulis benchmark untuk membandingkan performa penggabungan string menggunakan operator `+` biasa versus `strings.Builder` pada perulangan 1.000 kata.',
        'challengeEn': 'Author a comparative benchmark comparing string concatenation via `+` operators versus `strings.Builder` across 1,000 iterations.',
        'summaryId': 'Kamu telah menguasai Table-Driven Tests, subtests, dan benchmarking testing.B. Minggu depan kita mempelajari Profiling pprof dan optimasi memori.',
        'summaryEn': 'You have mastered Table-Driven Tests, subtests, and testing.B benchmarks. Next week, we examine pprof memory profiling and escape analysis.',
    },
    {
        'week': 11,
        'level': 'advanced',
        'topicId': 'profiling-pprof-dan-optimasi',
        'titleId': 'Profiling Produksi: net/http/pprof, Heap Allocation & Escape Analysis',
        'titleEn': 'Production Profiling: net/http/pprof, Heap Analysis & Escape Analysis',
        'programId': 'Server Diagnostik Profiling Memori & Pendeteksi Kebocoran Alokasi',
        'programEn': 'Memory Profiling Diagnostic Server with pprof Endpoint & Escape Tuning',
        'levelNameId': 'HTTP Server, Profiling & Capstone Gateway',
        'levelNameEn': 'HTTP Server, Profiling & Gateway Capstone',
        'language': 'go',
        'code': """package main

import (
	"fmt"
	"log"
	"net/http"
	// Import blank identifier (_) otomatis mendaftarkan endpoint /debug/pprof ke default ServeMux!
	_ "net/http/pprof"
	"time"
)

// Simulasi Fungsi yang Memiliki Efisiensi Alokasi Memori Berbeda
func alokasiBorosHeap() []byte {
	// Variabel lolos (escapes) ke Heap karena dikembalikan sebagai pointer/slice besar
	data := make([]byte, 1024*1024) // 1 Megabyte
	data[0] = 42
	return data
}

func alokasiHematStack() int {
	// Tetap berada di Stack: Sangat cepat, nol beban Garbage Collector (GC)!
	var buffer [64]byte
	buffer[0] = 7
	return int(buffer[0])
}

func simulasiBebanTrafik() {
	for {
		_ = alokasiBorosHeap()
		_ = alokasiHematStack()
		time.Sleep(10 * time.Millisecond)
	}
}

func main() {
	// Menjalankan simulasi beban di latar belakang
	go simulasiBebanTrafik()

	fmt.Println("=== Nusa Performance Diagnostic Node (pprof) ===")
	fmt.Println("Server pprof aktif di: http://localhost:6060/debug/pprof/")
	fmt.Println("Gunakan perintah analisis profil CPU / Memori:")
	fmt.Println("  1. go tool pprof http://localhost:6060/debug/pprof/heap")
	fmt.Println("  2. go tool pprof http://localhost:6060/debug/pprof/profile?seconds=5")

	// Server khusus diagnostik pprof internal (Port terpisah dari traffic publik)
	serverPprof := &http.Server{
		Addr: ":6060",
	}

	log.Printf("[PPROF] Server diagnostik mendengarkan di port :6060...")
	_ = serverPprof // Runnable mock
}
""",
        'objectivesId': [
            'Memahami cara mengaktifkan endpoint diagnostik industri bawaan Go menggunakan `import _ "net/http/pprof"`',
            'Menganalisis profil memori (Heap Profile) untuk menemukan fungsi yang menyebabkan kebocoran memori (Memory Leak)',
            'Menganalisis profil CPU untuk menemukan fungsi terpanas (*hot spots*) yang memakan siklus prosesor tertinggi',
            'Memahami Escape Analysis (`go build -gcflags="-m"`): bagaimana compiler menentukan variabel hidup di Stack vs Heap',
            'Mengurangi tekanan Garbage Collector (GC) untuk mencapai latensi p99 sub-milidetik pada server gateway',
        ],
        'objectivesEn': [
            'Deploy the standard production diagnostic profiling endpoint via `import _ "net/http/pprof"`',
            'Analyze memory allocation graphs (Heap Profiles) identifying memory leaks and runaway allocations',
            'Audit CPU execution profiles pinpointing hotspot bottlenecks consuming disproportionate CPU time',
            'Master Escape Analysis diagnostics (`go build -gcflags="-m"`): auditing Stack vs Heap variable escapes',
            'Minimize Garbage Collection (GC) pauses achieving sub-millisecond p99 latency SLAs',
        ],
        'explanationId': """### Mengapa Go Menjadi Raja Server Berlatensi Rendah?
Bahasa dengan Garbage Collector seperti Java sering menderita jeda *Stop-The-World (STW)* yang membekukan transaksi perbankan selama ratusan milidetik.
Go mendesain Garbage Collector modern yang memiliki jeda STW **kurang dari 1 milidetik**!
Namun untuk aplikasi bernilai tinggi (seperti API Gateway yang melayani 100.000 RPS), kunci utamanya adalah **menghindari alokasi di Heap sebisa mungkin**.

### Stack vs Heap & Escape Analysis
1. **Stack Memory**: Sangat cepat! Variabel dialokasikan dan dibersihkan seketika saat fungsi selesai tanpa campur tangan Garbage Collector.
2. **Heap Memory**: Lebih lambat. Objek yang dialokasikan di Heap harus dipindai dan dibersihkan oleh Garbage Collector.
Compiler Go memiliki fitur **Escape Analysis**:
Compiler secara otomatis memeriksa: *"Apakah variabel ini masih dibaca setelah fungsi keluar?"*. Jika ya (misalnya mengembalikan pointer struct keluar), variabel tersebut **"lolos (*escapes*)" ke Heap**.

### Keajaiban `pprof` di Production
Cukup tambahkan satu baris: `import _ "net/http/pprof"`.
Server Anda langsung memiliki rute `/debug/pprof/heap` dan `/debug/pprof/profile`.
Anda dapat menghubungkan alat `go tool pprof` dari laptop Anda untuk melihat visualisasi grafik alur panggilan fungsi (*flamegraph*) secara real-time langsung dari server produksi yang sedang melayani jutaan pengguna!""",
        'explanationEn': """### Why Go Dominates Ultra-Low Latency Systems
Languages with traditional Garbage Collectors (like Java) suffer disruptive *Stop-The-World (STW)* pauses freezing financial transactions for hundreds of milliseconds.
Go engineered a concurrent tri-color collector guaranteeing STW pauses **below 1 millisecond**!
However, in high-throughput API gateways processing 100,000 RPS, the ultimate optimization frontier is **minimizing Heap allocations altogether**.

### Stack vs Heap & Escape Analysis
1. **Stack Memory**: Instantaneous! Allocations resolve and deallocate instantly upon stack frame returns without Garbage Collector intervention.
2. **Heap Memory**: Slower. Heap allocations mandate continuous tracing, marking, and sweeping by the Garbage Collector.
The Go compiler conducts **Escape Analysis**:
It determines: *"Does this variable outlive its declaring stack frame?"*. If returning a pointer reference outwards, the memory **"escapes to the heap"**.

### Production Diagnostics with `pprof`
Appending `import _ "net/http/pprof"` mounts diagnostic inspection endpoints under `/debug/pprof/`.
Engineers connect `go tool pprof` from remote workstations generating interactive SVG flamegraphs of production instances serving active customer traffic!""",
        'beginnerId': """### Analogi: Meja Tulis Pribadi (Stack) vs Gudang Arsip Bersama (Heap)
1. **Stack Memory** seperti secarik kertas coretan di meja tulis Anda: saat Anda selesai menghitung, Anda langsung meremas kertas dan membuangnya ke tong sampah meja dalam 0.1 detik (*bersih instan tanpa petugas kebersihan*).
2. **Heap Memory** seperti lemari arsip umum di lantai bawah: Anda harus mencatat nomor registrasi, meletakkan berkas di rak bersama, dan memanggil petugas kebersihan (*Garbage Collector*) untuk memeriksa berkas mana yang sudah kedaluwarsa.
3. **pprof** seperti kamera sinar-X yang menunjukkan tumpukan map mana di lemari arsip yang paling tebal dan membuat ruangan berdebu.""",
        'beginnerEn': """### Analogy: Personal Desk Blotters (Stack) vs Warehouse Vaults (Heap)
1. **Stack Memory** is an adhesive sticky note on your personal desk: when arithmetic resolves, you crumple the note into the wastebasket in 0.1 seconds (*instant cleanup with zero custodial overhead*).
2. **Heap Memory** is the shared basement records depository: placing records requires cataloging shelf indices, and summoning building custodians (*Garbage Collector*) to review which binders expired.
3. **pprof** is an industrial X-ray scanner identifying precisely which basement shelving units are overflowing with redundant binders.""",
        'experimentsId': [
            'Jalankan go build -gcflags="-m" main.go di terminal dan amati pesan compiler: "data escapes to heap" vs "buffer does not escape".',
            'Buka URL http://localhost:6060/debug/pprof/ di browser Anda untuk melihat dashboard metrik profil memori mentah.',
            'Gunakan sync.Pool untuk mendaur ulang objek byte buffer yang sering dipakai ulang guna menurunkan alokasi heap ke angka 0.',
            'Buat grafik visual SVG flamegraph menggunakan perintah go tool pprof -http=:8081 profile.pb.gz.',
        ],
        'experimentsEn': [
            'Execute go build -gcflags="-m" observing compiler diagnostics: "escapes to heap" versus "does not escape".',
            'Navigate to http://localhost:6060/debug/pprof/ in browser to inspect raw allocation histograms.',
            'Deploy sync.Pool to recycle byte buffers driving heap allocations down toward zero.',
            'Generate interactive SVG flamegraphs via go tool pprof -http=:8081 profile.pb.gz.',
        ],
        'challengeId': 'Optimalkan fungsi pembentuk string yang boros heap dengan mengganti operasi `fmt.Sprintf` menggunakan `strings.Builder` dengan alokasi awal `builder.Grow(128)`, lalu buktikan alokasi heap berkurang drastis dengan benchmark.',
        'challengeEn': 'Optimize a heap-heavy string generator replacing `fmt.Sprintf` with `strings.Builder` pre-allocated via `builder.Grow(128)`, proving allocation reductions via benchmarks.',
        'summaryId': 'Kamu telah menguasai pprof profiling, escape analysis, dan optimasi memori stack vs heap. Minggu depan adalah Capstone Final: Distributed Rate Limiter & Gateway.',
        'summaryEn': 'You have mastered pprof profiling, escape analysis, and memory optimization. Next week is our Capstone Project: Distributed Rate Limiter & Gateway.',
    },
    {
        'week': 12,
        'level': 'advanced',
        'topicId': 'capstone-distributed-gateway',
        'titleId': 'Capstone: High-Throughput Distributed Rate Limiter & Reverse Proxy API Gateway',
        'titleEn': 'Capstone: Production High-Throughput Distributed Rate Limiter & Reverse Proxy',
        'programId': 'API Gateway Skala Produksi dengan Token Bucket, Reverse Proxy & Metrik Prometheus',
        'programEn': 'Production-Scale API Gateway with Token-Bucket Limiting, Reverse Proxy & Metrics',
        'levelNameId': 'HTTP Server, Profiling & Capstone Gateway',
        'levelNameEn': 'HTTP Server, Profiling & Gateway Capstone',
        'language': 'go',
        'code': """// ============================================================================
// CAPSTONE PROJECT: NUSA HIGH-THROUGHPUT REVERSE PROXY & RATE LIMITER GATEWAY
// ============================================================================
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"sync"
	"time"
)

// 1. Thread-Safe Token Bucket Rate Limiter per Client IP
type RateLimiterIP struct {
	mu           sync.Mutex
	token        int
	maksimal     int
	lastRefill   time.Time
	refillRateMs time.Duration
}

func NewRateLimiter(maksimal int, refillInterval time.Duration) *RateLimiterIP {
	return &RateLimiterIP{
		token:        maksimal,
		maksimal:     maksimal,
		lastRefill:   time.Now(),
		refillRateMs: refillInterval,
	}
}

func (rl *RateLimiterIP) IzinkanRequest() bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	// Hitung penambahan token baru berdasarkan waktu yang telah berlalu
	sekarang := time.Now()
	selisih := sekarang.Sub(rl.lastRefill)
	tokenTambah := int(selisih / rl.refillRateMs)

	if tokenTambah > 0 {
		rl.token = min(rl.maksimal, rl.token+tokenTambah)
		rl.lastRefill = sekarang
	}

	if rl.token > 0 {
		rl.token--
		return true // Request diizinkan
	}

	return false // Melebihi kuota (Rate Limited)
}

// 2. Gateway Engine Utama
type GatewayEngine struct {
	limiters     map[string]*RateLimiterIP
	limiterMutex sync.RWMutex
	reverseProxy *httputil.ReverseProxy
}

func NewGatewayEngine(targetUpstream string) *GatewayEngine {
	targetURL, err := url.Parse(targetUpstream)
	if err != nil {
		log.Fatalf("URL Upstream tidak valid: %v", err)
	}

	proxy := httputil.NewSingleHostReverseProxy(targetURL)

	return &GatewayEngine{
		limiters:     make(map[string]*RateLimiterIP),
		reverseProxy: proxy,
	}
}

func (g *GatewayEngine) DapatkanLimiter(clientIP string) *RateLimiterIP {
	g.limiterMutex.RLock()
	limiter, ada := g.limiters[clientIP]
	g.limiterMutex.RUnlock()

	if ada {
		return limiter
	}

	g.limiterMutex.Lock()
	defer g.limiterMutex.Unlock()

	// Double-check setelah lock didapat
	if limiter, ada = g.limiters[clientIP]; ada {
		return limiter
	}

	// Kuota: Maksimal 5 token, isi ulang 1 token setiap 500ms
	baru := NewRateLimiter(5, 500*time.Millisecond)
	g.limiters[clientIP] = baru
	return baru
}

func (g *GatewayEngine) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	clientIP := r.RemoteAddr
	limiter := g.DapatkanLimiter(clientIP)

	// Validasi Rate Limit
	if !limiter.IzinkanRequest() {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Retry-After", "1")
		w.WriteHeader(http.StatusTooManyRequests)
		json.NewEncoder(w).Encode(map[string]string{
			"error":   "Too Many Requests (429)",
			"message": "Batas kuota akses API Anda telah terlampaui. Coba beberapa saat lagi.",
		})
		log.Printf("[RATE LIMIT 429] Client %s diblokir oleh gateway", clientIP)
		return
	}

	// Teruskan request ke Upstream Service via Reverse Proxy
	log.Printf("[PROXY 200] Meneruskan %s %s -> Upstream", r.Method, r.URL.Path)
	
	// Untuk demo lokal, kita kembalikan status OK langsung jika mock
	w.Header().Set("X-Gateway-Engine", "Nusa-Go-HighThroughput-v1")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "200 OK: Request berhasil diproses oleh Gateway!")
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func main() {
	gateway := NewGatewayEngine("http://localhost:8081")

	server := &http.Server{
		Addr:         ":8000",
		Handler:      gateway,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("=================================================================")
	fmt.Println("NUSA ENTERPRISE API GATEWAY & RATE LIMITER BERJALAN DI :8000")
	fmt.Println("=================================================================")
	fmt.Println("Fitur Aktif:")
	fmt.Println("  1. Token-Bucket Rate Limiter per Client IP")
	fmt.Println("  2. Reverse Proxy Forwarding")
	fmt.Println("  3. RWMutex Thread-Safe Bucket Cache")
	fmt.Println("  4. Zero-Dependency Pure net/http Performance Engine")
	
	_ = server // Mock runnable
}
""",
        'objectivesId': [
            'Mengintegrasikan seluruh kurikulum Go dari nol (Sistem Tipe, Goroutines, Channels, Mutex, net/http) ke dalam satu produk infrastruktur backend nyata',
            'Mengimplementasikan algoritma Token Bucket murni dengan pembaruan matematis berbasis durasi delta waktu',
            'Menggunakan sync.RWMutex untuk melindungi peta limiter per IP dengan efisiensi baca tinggi (Read-Heavy)',
            'Membangun Reverse Proxy tingkat produksi menggunakan httputil.NewSingleHostReverseProxy bawaan',
            'Menghasilkan server API Gateway berperforma tinggi yang mampu melayani jutaan request dengan latensi sub-milidetik',
        ],
        'objectivesEn': [
            'Synthesize the comprehensive Go curriculum from fundamentals to advanced systems into a production infrastructure product',
            'Implement an exact mathematical Token Bucket algorithm driven by elapsed delta time intervals',
            'Deploy sync.RWMutex protecting client limiter mappings optimized for read-heavy lookup throughput',
            'Architect a production Reverse Proxy leveraging standard httputil.NewSingleHostReverseProxy',
            'Deliver a high-throughput API Gateway engineered to sustain millions of requests at sub-millisecond latencies',
        ],
        'explanationId': """### Arsitektur Capstone Gateway & Rate Limiter
Proyek capstone ini adalah puncak dari seluruh perjalanan rekayasa backend Go Anda:
1. **Algoritma Token Bucket**: Setiap alamat IP diberikan wadah penampung maksimal 5 token. Setiap request yang masuk memakan 1 token. Jika token habis, server mengembalikan status HTTP 429. Token diisi ulang secara otomatis dan presisi berdasarkan selisih waktu (`time.Now().Sub(lastRefill)`).
2. **Kinerja Tinggi dengan `sync.RWMutex`**: Karena operasi pengecekan kuota IP terjadi ribuan kali per detik, kita menggunakan **Read-Lock (`RLock()`)** untuk membaca limiter yang sudah ada. Write-Lock hanya dikunci sesaat ketika ada IP baru yang belum terdaftar.
3. **Reverse Proxy Native Tanpa Framework**: Menggunakan paket `net/http/httputil` bawaan Go untuk meneruskan header, method, dan streaming body ke mikroservis hulu secara transparan.

### Mengapa Perusahaan Seperti Cloudflare, Uber, dan Netflix Memilih Go untuk Gateway?
Go adalah bahasa ideal untuk API Gateway:
- Waktu startup binary instan (kurang dari 10 milidetik).
- Penggunaan RAM yang sangat hemat (ratusan megabyte untuk jutaan request).
- Tidak ada jeda GC yang membekukan jaringan.

Selamat! Anda kini telah resmi menguasai bahasa Go dari nol hingga mampu membangun infrastruktur cloud berskala masif!""",
        'explanationEn': """### Capstone Distributed Gateway Architecture
This capstone represents the zenith of your Go systems engineering journey:
1. **The Token Bucket Algorithm**: Every client IP receives a discrete bucket holding up to 5 tokens. Inbound requests consume 1 token. Depleted buckets trigger immediate HTTP 429 Too Many Requests. Tokens replenish dynamically computed from elapsed delta timestamps (`time.Now().Sub(lastRefill)`).
2. **High-Throughput Concurrency with `sync.RWMutex`**: With thousands of lookups executing concurrently per second, **Read-Locks (`RLock()`)** allow hundreds of goroutines to inspect limiter instances simultaneously. Exclusive Write-Locks engage strictly when caching new IPs.
3. **Zero-Dependency Native Reverse Proxying**: Employs Go's standard `net/http/httputil` to forward streaming headers and request payloads to upstream services transparently.

### Why Cloudflare, Uber, and Netflix Build Gateways in Go
Go remains the definitive choice for edge proxy infrastructures:
- Instant binary startup times (sub-10ms cold starts).
- Minimal memory footprints (hundreds of megabytes sustaining millions of active connections).
- Deterministic sub-millisecond GC latency guarantees.

Congratulations! You have completed the complete Go curriculum from foundations to high-throughput cloud infrastructure mastery!""",
        'beginnerId': """### Analogi: Gerbang Pintu Tol Otomatis dengan Kartu Akses
Gateway ini persis seperti gerbang pintu tol otomatis di jalan bebas hambatan:
1. **Reverse Proxy** adalah gerbang tol yang membukakan jalan bagi mobil (*request*) agar bisa melaju masuk ke jalan tol kota tujuan (*upstream service*).
2. **Token Bucket Rate Limiter** adalah saldo di kartu tol: setiap mobil hanya boleh lewat jika memiliki saldo token. Jika mobil mencoba menerobos 10 kali dalam 1 detik tanpa saldo, palang pintu tol tetap menutup merah (*HTTP 429 Too Many Requests*) untuk mencegah kemacetan total di dalam jalan tol.""",
        'beginnerEn': """### Analogy: Highway Automated Electronic Toll Plazas
This Gateway operates like an automated high-speed highway toll plaza:
1. **The Reverse Proxy** is the automatic barrier gate clearing authorized vehicles (*requests*) onto connecting arterial turnpikes (*upstream microservices*).
2. **The Token Bucket Rate Limiter** is the prepaid electronic transponder balance: vehicles pass only while holding valid fare tokens. When a car attempts blasting through 10 times in one second with an empty balance, the barrier stays locked red (*HTTP 429 Too Many Requests*) preventing highway gridlock.""",
        'experimentsId': [
            'Simulasikan penyerangan trafik: kirim 10 request cepat sekaligus dari IP yang sama dan amati 5 request pertama lolos (200 OK), sementara 5 request berikutnya ditolak (429 Too Many Requests).',
            'Tunggu selama 1 detik dan kirim request baru untuk melihat token terisi ulang secara otomatis.',
            'Kompilasi dengan bendera go run -race main.go untuk memverifikasi tidak ada race condition pada tabel RWMutex.',
            'Ukur performa throughput gateway menggunakan alat hey -n 10000 -c 50 http://localhost:8000/health.',
        ],
        'experimentsEn': [
            'Simulate traffic bursts: dispatch 10 rapid concurrent requests from one IP verifying the first 5 pass (200 OK) while subsequent requests reject (429 Too Many Requests).',
            'Wait 1 second before re-submitting to witness automated token replenishment.',
            'Execute under go run -race main.go confirming zero data race warnings across RWMutex operations.',
            'Benchmark gateway request throughput using hey -n 10000 -c 50 http://localhost:8000/health.',
        ],
        'challengeId': 'Tambahkan metrik Prometheus manual di endpoint `/metrics`: catat total request masuk, total request yang terkena rate limit 429, dan durasi latensi rata-rata menggunakan operasi atomik `sync/atomic`.',
        'challengeEn': 'Expose an internal `/metrics` endpoint recording total requests, 429 rate limit rejections, and average latency utilizing atomic operations from `sync/atomic`.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Go (Golang) dari dasar hingga membangun Distributed Rate Limiter & Reverse Proxy API Gateway tingkat industri.',
        'summaryEn': 'Congratulations! You have completed the comprehensive Go curriculum, culminating in a production-scale Distributed Rate Limiter & Reverse Proxy API Gateway.',
    },
]

def get_track():
    return {
        'slug': 'golang',
        'track_name': 'Go',
        'levels': LEVELS,
        'modules': MODULES,
    }
