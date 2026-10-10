# Controllers & Routing

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 1:** Controllers & Routing

## Tujuan Pembelajaran

- Memahami arsitektur Controller di NestJS
- Routing: @Get, @Post, @Put, @Delete
- Decorators: @Controller, @Param, @Query, @Body
- Request handling: params, query, body
- Response formatting dan status codes

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Jest Runner** (`firsttris.vscode-jest-runner`): Menjalankan unit test NestJS dengan 1 klik
- **Prettier** (`esbenp.prettier-vscode`): Format kode TypeScript

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension firsttris.vscode-jest-runner --install-extension esbenp.prettier-vscode
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

> 💡 **Tips Prasyarat:** NestJS dikompilasi menggunakan TypeScript compiler bawaan atau SWC untuk performa tinggi.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npx @nestjs/cli new my-nest-app --package-manager npm
cd my-nest-app
```
- **Keterangan:** Menjalankan CLI NestJS untuk men-generate starter app berstruktur modul, service, dan controller.
- **Pindah ke direktori project:**
```bash
cd my-nest-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm run start:dev
```
Akses di browser atau terminal: `http://localhost:3000`

> ℹ️ Server NestJS aktif dengan auto-reload file watch di port 3000.

**File Titik Masuk Utama (`src/app.controller.ts`):**
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): { status: string; message: string; timestamp: string } {
    return {
      status: 'success',
      message: 'Halo dari Nest.js Enterprise API!',
      timestamp: new Date().toISOString(),
    };
  }
}
```
Controller HTTP dengan decorator @Controller dan @Get.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-nest-app/
├── src/
│   ├── app.controller.ts    # Endpoint HTTP route handler
│   ├── app.service.ts       # Logika bisnis & pengolahan data
│   ├── app.module.ts        # Root module penyusun aplikasi
│   └── main.ts              # Bootstrap entrypoint aplikasi
├── test/                    # End-to-end (e2e) tests
├── tsconfig.json            # Konfigurasi TypeScript & decorators
├── nest-cli.json            # Konfigurasi CLI NestJS
└── package.json             # Dependensi @nestjs/core
```
Pemisahan tanggung jawab yang jelas antara Controller (HTTP) dan Service (Bisnis).

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan perintah CLI `nest g resource users` untuk membuat modul CRUD lengkap otomatis.
- Tambahkan `ValidationPipe` global di `main.ts` untuk validasi otomatis DTO berbasis `class-validator`.

---

## Program: Controller Pertama

```javascript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  private users = [
    { id: 1, nama: 'Budi', email: 'budi@mail.com' },
    { id: 2, nama: 'Siti', email: 'siti@mail.com' },
  ];

  @Get()
  findAll() {
    return { success: true, data: this.users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.users.find(u => u.id === parseInt(id));
    return { success: true, data: user };
  }

  @Post()
  create(@Body() createUserDto: { nama: string; email: string }) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return { success: true, data: newUser };
  }
}

console.log('NestJS Controller Simulation:');
console.log('GET /users -> Returns all users');
console.log('GET /users/1 -> Returns user by ID');
console.log('POST /users -> Creates new user');
console.log('Decorators: @Controller, @Get, @Post, @Param, @Body');
```

---

## Konsep Kunci

### Controller
Class dengan decorator @Controller('path'). Handle HTTP requests.

### Routing
@Get(), @Post(), @Put(), @Delete() untuk HTTP methods.

### Decorators
@Param('id') ambil URL param, @Body() ambil request body, @Query() ambil query string.

### Response
Return object langsung, NestJS auto-serialize ke JSON.

---

## Eksperimen

- Tambah route PUT dan DELETE
- Buat controller baru untuk products
- Tambah query string filtering
- Implementasikan response interceptor

---

## Tantangan

Buat Users Controller lengkap: CRUD dengan validation, pagination, dan error handling.

---

## Ringkasan

Minggu 1 dari 12: **Controllers & Routing** (Level: Pemula). Minggu depan: **Providers & Services**.
