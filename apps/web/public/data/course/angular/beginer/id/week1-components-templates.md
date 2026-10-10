# Components & Templates

> **Kategori:** Angular | **Level:** Pemula | **Minggu 1:** Components & Templates

## Tujuan Pembelajaran

- Memahami Angular sebagai platform web app
- Component: selector, template, class
- Interpolation: {{ }} untuk display data
- Event binding: (click)="method()"
- Structural directive: *ngIf, *ngFor

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Angular Language Service** (`angular.ng-template`): IntelliSense untuk template HTML Angular

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension angular.ng-template
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

> 💡 **Tips Prasyarat:** Angular CLI membutuhkan versi Node.js LTS terbaru.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npx @angular/cli@latest new my-angular-app --routing --style=css --ssr=false
cd my-angular-app
```
- **Keterangan:** Menghasilkan project Angular modern dengan Standalone Components (tanpa NgModule) dan routing.
- **Pindah ke direktori project:**
```bash
cd my-angular-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm start
```
Akses di browser atau terminal: `http://localhost:4200`

> ℹ️ Server Angular dev berjalan secara default di port 4200.

**File Titik Masuk Utama (`src/app/app.component.ts`):**
```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 3rem; font-family: system-ui;">
      <h1 style="color: #dd0031;">🅰️ Halo dari Angular!</h1>
      <p>Menggunakan Angular Signal untuk reaktivitas:</p>
      <button (click)="increment()" style="padding: 10px 20px; font-size: 16px;">
        Hitungan Signal: {{ count() }}
      </button>
    </div>
  `,
})
export class AppComponent {
  count = signal(0);

  increment() {
    this.count.update(c => c + 1);
  }
}
```
Komponen Standalone dengan Angular Signals (signal()).

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-angular-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts     # Root component standalone
│   │   ├── app.component.html   # Template HTML
│   │   ├── app.component.css    # Style spesifik
│   │   └── app.routes.ts        # Definisi route
│   ├── index.html               # Shell HTML
│   └── main.ts                  # Bootstrap Application
├── angular.json                 # Konfigurasi build Angular
└── package.json                 # Dependensi @angular/*
```
Angular versi terbaru mengadopsi Standalone Components sehingga tidak lagi memerlukan app.module.ts.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan Signals (`signal()`, `computed()`, `effect()`) untuk performa reaktivitas granular.
- Gunakan control flow syntax baru seperti `@if`, `@for`, dan `@switch` di template.

---

## Program: Halo Angular

```typescript
// Angular = platform untuk membangun mobile dan desktop web apps
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '<h1>Halo, {{ name }}!</h1><button (click)="greet()">Klik</button><p *ngIf="showMessage">{{ message }}</p>',
})
export class AppComponent {
  name = 'Tryngo';
  message = 'Tombol diklik!';
  showMessage = false;
  greet() { this.showMessage = true; console.log('Halo dari Angular!'); }
}
console.log('Angular app siap dijalankan');
```

---

## Konsep Kunci

### Component
Building block Angular. @Component decorator.

### Template
HTML + Angular syntax. Interpolation {{ }}, event binding ( ).

### Structural Directives
*ngIf = conditional. *ngFor = loop.

### Module
@NgModule mengorganisir components.

---

## Eksperimen

- Ubah property dan lihat template update
- Tambah method baru dengan event
- Buat conditional display
- Render list dengan *ngFor

---

## Tantangan

Buat counter app: increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.

---

## Ringkasan

Minggu 1 dari 14: **Components & Templates** (Level: Pemula). Minggu depan: **Directives & Pipes**.
