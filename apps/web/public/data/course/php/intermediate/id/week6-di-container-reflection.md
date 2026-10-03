# Inversion of Control: Kontainer DI (PSR-11) & Autowiring Berbasis Reflection

> **Kategori:** Modern PHP 8.3+ | **Level:** Menengah | **Minggu 6:** Inversion of Control: Kontainer DI (PSR-11) & Autowiring Berbasis Reflection
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai standar PSR-11 `ContainerInterface` (`get` dan `has`).
- Membangun Dependency Injection Container mandiri dari nol.
- Mengimplementasikan Autowiring otomatis menggunakan `ReflectionClass` dan `ReflectionParameter`.
- Mengelola Service Lifetimes: Singleton (instance tunggal) vs Transient (instance baru setiap saat).

---

## Program: Mesin Dependency Injection Container Mandiri dengan Resolusi Autowiring Otomatis

```php
<?php
declare(strict_types=1);

// Standar Resmi PSR-11 ContainerInterface
interface ContainerInterface {
    public function get(string $id): mixed;
    public function has(string $id): bool;
}

class NotFoundException extends Exception {}
class ContainerException extends Exception {}

// Kontainer Dependency Injection Canggih dengan Autowiring
class SimpleContainer implements ContainerInterface {
    private array $services = [];
    private array $instances = [];

    public function set(string $id, callable|string $concrete): void {
        $this->services[$id] = $concrete;
    }

    public function get(string $id): mixed {
        // Singleton pattern: kembalikan instance yang sudah ada
        if (isset($this->instances[$id])) {
            return $this->instances[$id];
        }

        if (!$this->has($id)) {
            // Coba resolusi otomatis jika berupa nama class nyata (Autowiring)
            if (class_exists($id)) {
                $instance = $this->autowire($id);
                $this->instances[$id] = $instance;
                return $instance;
            }
            throw new NotFoundException("Service '{$id}' tidak ditemukan di container.");
        }

        $entry = $this->services[$id];
        $instance = is_callable($entry) ? $entry($this) : $this->autowire($entry);
        $this->instances[$id] = $instance;
        return $instance;
    }

    public function has(string $id): bool {
        return isset($this->services[$id]) || class_exists($id);
    }

    // Resolusi Otomatis Dependensi Berdasarkan Tipe Parameter Konstruktor (Reflection)
    private function autowire(string $className): object {
        $reflector = new ReflectionClass($className);

        if (!$reflector->isInstantiable()) {
            throw new ContainerException("Class {$className} tidak dapat diinstansiasi.");
        }

        $constructor = $reflector->getConstructor();
        if ($constructor === null) {
            return new $className();
        }

        $dependencies = [];
        foreach ($constructor->getParameters() as $param) {
            $type = $param->getType();

            if ($type instanceof ReflectionNamedType && !$type->isBuiltin()) {
                // Rekursif: minta container menyelesaikan sub-dependensi!
                $dependencies[] = $this->get($type->getName());
            } elseif ($param->isDefaultValueAvailable()) {
                $dependencies[] = $param->getDefaultValue();
            } else {
                throw new ContainerException("Gagal autowire parameter '{$param->getName()}' pada {$className}.");
            }
        }

        return $reflector->newInstanceArgs($dependencies);
    }
}

// Demonstrasi Uji Coba Autowiring
class MailerService {
    public function send(string $to, string $msg): void {
        echo "[MAIL SENT] Kirim email ke {$to}: {$msg}\n";
    }
}

class UserRegistrationService {
    // Autowiring akan otomatis mendeteksi kebutuhan MailerService!
    public function __construct(public MailerService $mailer) {}

    public function register(string $email): void {
        echo "[REGISTER] Mendaftarkan pengguna baru: {$email}\n";
        $this->mailer->send($email, "Selamat datang di Tryngo Modern PHP Platform!");
    }
}

$container = new SimpleContainer();
// Tanpa konfigurasi manual, container langsung menyelesaikan seluruh rantai dependensi!
/** @var UserRegistrationService $regService */
$regService = $container->get(UserRegistrationService::class);
$regService->register('developer@tryngo.io');
```

---

## Konsep Kunci

Salah satu keajaiban terbesar framework modern seperti Laravel atau Symfony adalah kemampuannya menyelesaikan dependensi secara otomatis (**Autowiring**): Anda cukup menambahkan parameter tipe data pada constructor, dan objek tersebut langsung tersedia tanpa Anda perlu membuat `new` manual.

### Standar PSR-11 ContainerInterface
PSR-11 mendefinisikan dua method utama:
1. `get(string $id)`: Mengembalikan instance objek berdasarkan nama kelas atau identifier.
2. `has(string $id)`: Memeriksa apakah identifier terdaftar di dalam kontainer.

### Cara Kerja Autowiring Berbasis Reflection
1. Kontainer membuat `ReflectionClass($className)` dan membaca constructor-nya.
2. Kontainer mengiterasi setiap parameter constructor (`$param->getType()`).
3. Jika tipe parameter adalah kelas lain (misal `MailerService`), kontainer memanggil `$this->get('MailerService')` secara rekursif.
4. Setelah seluruh dependensi terkumpul, kontainer membuat objek menggunakan `$reflector->newInstanceArgs($dependencies)`.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda membeli robot lego otomatis. Daripada Anda harus mencari mur dan baut satu per satu di lantai, robot perakit otomatis (DI Container) membaca buku instruksi cetak biru robot (Reflection). Begitu melihat instruksi membutuhkan mesin baterai (MailerService), robot perakit mengambil baterai dari rak dan memasangnya langsung ke badan robot untuk Anda.

## Eksperimen

- Buat service ketiga `AuditLogger` dan suntikkan ke `MailerService` untuk membuktikan resolusi rekursif multi-tingkat.
- Ubah container agar mendukung pendaftaran antarmuka (interface mapping: `set(LoggerInterface::class, ConsoleLogger::class)`).
- Uji coba exception handling saat sebuah kelas memiliki parameter string tanpa nilai default.

---

## Tantangan

Tambahkan penanganan Circular Dependency Detection: jika Class A butuh Class B, dan Class B butuh Class A, lemparkan `ContainerException("Circular dependency detected: A -> B -> A")`.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. SQL Injection Akibat String Concatenation
- **Gejala / Masalah:** Peretas dapat memanipulasi query SQL dan mencuri seluruh isi database.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan Prepared Statements dengan PDO atau MySQLi parameterized query.

### 2. Mengabaikan Strict Types
- **Gejala / Masalah:** PHP melakukan konversi tipe data otomatis yang memicu bug logika angka/string.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tambahkan `declare(strict_types=1);` di baris pertama setiap berkas PHP modern.

### 3. Memasukkan Output Mentah ke HTML (XSS Vulnerability)
- **Gejala / Masalah:** Skrip berbahaya dieksekusi di browser pengunjung.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus variabel output dengan fungsi `htmlspecialchars($str, ENT_QUOTES, 'UTF-8')`.

---

## Ringkasan

Kamu telah menguasai PSR-11 Container dan Autowiring berbasis Reflection. Minggu depan kita membangun Router Engine dan Arsitektur MVC.
