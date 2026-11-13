# Pengantar TypeScript

## Kenapa Materi Ini Penting

TypeScript adalah JavaScript dengan sistem tipe - kini standar de facto di proyek frontend maupun backend modern. Menangkap bug waktu compile, bukan waktu demo, adalah skill yang membuat Anda dipercaya menyelesaikan proyek besar.

Program latihan: *"Halo TypeScript"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- Perbedaan TypeScript vs JavaScript: static typing
- Tipe dasar: string, number, boolean, array, tuple
- Type inference: TypeScript otomatis deteksi tipe
- Enum untuk set nilai tetap
- Any, unknown, void, never types


## Fondasi: Sebelum Menulis Kode

Panduan dasar berikut merangkum konsep pemrograman inti yang berlaku universal.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: `belajar.md`). File punya **ekstensi** yang menunjukkan bahasanya: `.md`, `.go`, `.py`, `.html`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: `cd folder` (pindah folder), `ls` / `dir` (lihat isi folder), `go run main.go` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan - cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung - cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis - error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan - lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis - itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung - inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan - tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: `let nama = "Budi"`; `rupiah = 250000`), lalu jalankan.

---

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

> **Coba langsung di browser tanpa instalasi.** Semua blok kode dapat dijalankan langsung di Playground.

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Instalasi Runtime & Dependency (Node.js LTS (v20+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v20.x.x
10.x.x
```

> **Tips Prasyarat:** VS Code memiliki dukungan native engine TypeScript langsung dari Microsoft.

---

### 2. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-ts-project && cd my-ts-project
npm init -y
npm install -D typescript tsx @types/node
npx tsc --init
```
- **Keterangan:** Menyiapkan compiler TypeScript (tsc) dengan tsconfig.json berkonfigurasi strict mode.
- **Pindah ke direktori project:**
```bash
cd my-ts-project
```

---

### 3. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npx tsx src/index.ts
```
Akses di browser atau terminal: `Terminal Console`

> ℹ️ Output tercetak langsung di terminal tanpa perlu langkah build terpisah.

**File Titik Masuk Utama (`src/index.ts`):**
```ts
interface User {
  id: number;
  name: string;
  role: 'admin' | 'developer' | 'guest';
}

function formatGreeting(user: User): string {
  return `Halo ${user.name}, peran Anda adalah ${user.role.toUpperCase()}.`;
}

const me: User = { id: 1, name: 'Antigravity Dev', role: 'developer' };
console.log(formatGreeting(me));
```
Contoh program TypeScript dengan interface dan string literal union types.

---

### 4. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-ts-project/
├── src/
│   ├── index.ts         # Titik masuk eksekusi kode
│   └── types.ts         # Definisi interface & types
├── tsconfig.json        # Konfigurasi compiler TypeScript
└── package.json         # Package configuration
```
Direktori src/ menampung seluruh file .ts yang akan dicek tipenya oleh compiler.

---

### 5. Tips & Best Practice untuk Pemula
- Selalu aktifkan `"strict": true` di tsconfig.json untuk keamanan tipe maksimal.
- Gunakan utility types bawaan seperti `Partial<T>`, `Pick<T, K>`, dan `Record<K, T>`.

---

## Program: Halo TypeScript

```typescript
// Dasar Tipe Data
const nama: string = "Budi";
const umur: number = 25;
const aktif: boolean = true;

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Aktif:", aktif);

// Type Inference (TypeScript otomatis deteksi tipe)
const kota = "Jakarta"; // string
const tinggi = 175.5;  // number
const setuju = true;   // boolean

// Array
const angka: number[] = [1, 2, 3, 4, 5];
const buah: Array<string> = ["apel", "mangga"];

// Tuple
const koordinat: [number, number] = [106.8, -6.2];
const userTuple: [string, number, boolean] = ["Budi", 25, true];

// Enum
enum Warna {
    Merah = "red",
    Hijau = "green",
    Biru = "blue"
}
const favColor: Warna = Warna.Hijau;

// Any & Unknown
let flexible: any = "bisa apa saja";
flexible = 42;
flexible = true;

let safeUnknown: unknown = "type-safe any";
if (typeof safeUnknown === "string") {
    console.log("String length:", safeUnknown.length);
}

// Void & Never
function logMessage(msg: string): void {
    console.log(msg);
}

function throwError(msg: string): never {
    throw new Error(msg);
}

console.log("\n=== Enum ===");
console.log("Warna favorit:", favColor);
console.log("Koordinat:", koordinat);
```

---

## Konsep Kunci

### TypeScript vs JavaScript
TypeScript = JavaScript + Static Types. Dikompilasi ke JS. Catch errors di compile-time.

### Tipe Dasar
`string`, `number`, `boolean`, `null`, `undefined`, `symbol`.

### Type Inference
`const x = 10` otomatis `number`. Tidak perlu selalu explicitly type.

### Array & Tuple
`number[]` atau `Array<number>`. Tuple `[string, number]` fixed-length.

### Enum
Set nilai named: `enum Warna { Merah = "red" }`.

### Any vs Unknown
`any` bypass type checking. `unknown` type-safe - harus cek dulu sebelum pakai.

---

## Eksperimen

- Coba assign string ke variabel number - lihat error
- Buat enum untuk hari dalam seminggu
- Eksperimen unknown dengan type guard
- Buat tuple dengan 4 elemen berbeda
- Coba union type: string | number

---

## Tantangan

Buat program konversi suhu: function dengan typed parameters, enum untuk unit, dan type-safe output.

---

## Ringkasan

Minggu 1 dari 12: **Pengantar TypeScript** (Level: TypeScript Lengkap). Fondasi tipe data. Minggu depan: **Advanced Types**.
