# Pengantar TypeScript

> **Kategori:** TypeScript | **Level:** Dasar Tipe & Interface | **Minggu 1:** Pengantar TypeScript

## Tujuan Pembelajaran

- Perbedaan TypeScript vs JavaScript: static typing
- Tipe dasar: string, number, boolean, array, tuple
- Type inference: TypeScript otomatis deteksi tipe
- Enum untuk set nilai tetap
- Any, unknown, void, never types

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **ESLint** (`dbaeumer.vscode-eslint`): Pemeriksaan aturan ketat tipe
- **Prettier** (`esbenp.prettier-vscode`): Formatting konsisten

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+))
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

> 💡 **Tips Prasyarat:** VS Code memiliki dukungan native engine TypeScript langsung dari Microsoft.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
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

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
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

### 5. Struktur Direktori Proyek Baru
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

### 6. Tips & Best Practice untuk Pemula
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
`any` bypass type checking. `unknown` type-safe — harus cek dulu sebelum pakai.

---

## Eksperimen

- Coba assign string ke variabel number — lihat error
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
