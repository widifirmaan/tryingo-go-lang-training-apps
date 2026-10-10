# Modern Angular: Standalone Components, Zero NgModule & Reactive signal()

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Modern Control Flow | **Minggu 1:** Modern Angular: Standalone Components, Zero NgModule & Reactive signal()
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master modern Standalone Component architecture completely omitting legacy NgModule boilerplate
- Master the Angular Signals reactivity model: signal() declarations, getter reading (), set(), and update()
- Contrast fine-grained signal notification pipelines against legacy zone.js dirty-checking overhead
- Bind reactive signals directly into HTML templates using getter interpolation {{ mySignal() }}
- Deploy canonical property [property] and event (event) bindings adhering to modern Angular conventions

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Angular Language Service** (`angular.ng-template`): Template syntax autocomplete and diagnostics

Or install all recommended extensions at once via terminal:
```bash
code --install-extension angular.ng-template
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+))
Make sure the required runtime or SDK is installed on your machine:

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

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v20.x.x
10.x.x
```

> 💡 **Prerequisite Note:** The Angular CLI requires the latest Node.js LTS release.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npx @angular/cli@latest new my-angular-app --routing --style=css --ssr=false
cd my-angular-app
```
- **Details:** Generates a modern Angular application using standalone components and client routing.
- **Navigate to the project directory:**
```bash
cd my-angular-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm start
```
Open in browser or terminal: `http://localhost:4200`

> ℹ️ Angular dev server runs by default on port 4200.

**Initial Entry File (`src/app/app.component.ts`):**
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
Standalone Angular component featuring reactive Angular Signals.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

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
Modern Angular defaults to Standalone Components, eliminating boilerplate NgModules.

---

### 6. Beginner Tips & Best Practices
- Use Angular Signals (`signal()`, `computed()`) for fine-grained reactivity without Zone.js overhead.
- Take advantage of new template control flow syntax (`@if`, `@for`, `@switch`).

---

## Program: Clinical Patient Outpatient Queue with Angular Signals

```typescript
// ============================================================================
// File: src/app/antrean-klinik.component.ts (Standalone Component Modern)
// ============================================================================
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-antrean-klinik',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="klinik-card">
      <header>
        <h2>Klinik Rawat Jalan Nusa Medika</h2>
        <span class="status-badge" [class.buka]="isKlinikBuka()">
          {{ isKlinikBuka() ? 'Buka Pelayanan' : 'Tutup' }}
        </span>
      </header>

      <div class="counter-box">
        <small>Nomor Antrean Sedang Dilayani:</small>
        <div class="nomor-display">A-{{ nomorAntreanAktif() }}</div>
        <div class="sisa-info">Total Pasien Menunggu: {{ sisaAntrean() }} Orang</div>
      </div>

      <div class="action-buttons">
        <button (click)="panggilPasienBerikutnya()" class="btn-primary" [disabled]="!isKlinikBuka() || sisaAntrean() === 0">
          Panggil Berikutnya →
        </button>
        <button (click)="tambahPasienBaru()" class="btn-secondary" [disabled]="!isKlinikBuka()">
          + Ambil Nomor Antrean
        </button>
      </div>

      <div class="footer-toggle">
        <button (click)="toggleKlinik()">
          {{ isKlinikBuka() ? 'Tutup Pendaftaran Hari Ini' : 'Buka Pendaftaran' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .klinik-card { max-width: 440px; margin: 24px auto; font-family: system-ui, sans-serif; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1; background: white; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
    h2 { margin: 0; font-size: 16px; color: #0f172a; }
    .status-badge { font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: bold; background: #fee2e2; color: #b91c1c; }
    .status-badge.buka { background: #dcfce7; color: #15803d; }
    .counter-box { text-align: center; margin: 24px 0; background: #f8fafc; padding: 16px; border-radius: 8px; }
    .nomor-display { font-size: 48px; font-weight: bold; color: #2563eb; margin: 8px 0; }
    .sisa-info { font-size: 13px; color: #64748b; }
    .action-buttons { display: flex; gap: 8px; margin-bottom: 16px; }
    button { padding: 10px 14px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer; font-weight: bold; }
    .btn-primary { flex: 1; background: #2563eb; color: white; border: none; }
    .btn-secondary { flex: 1; background: #f1f5f9; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .footer-toggle { text-align: center; }
    .footer-toggle button { font-size: 12px; background: none; border: none; color: #64748b; text-decoration: underline; }
  `]
})
export class AntreanKlinikComponent {
  // 1. Angular Signals: Reaktivitas fine-grained berbasis fungsi pemanggil ()
  nomorAntreanAktif = signal<number>(1);
  sisaAntrean = signal<number>(14);
  isKlinikBuka = signal<boolean>(true);

  panggilPasienBerikutnya(): void {
    // 2. update(): Memperbarui sinyal berdasarkan nilai sebelumnya
    this.nomorAntreanAktif.update((n) => n + 1);
    this.sisaAntrean.update((s) => Math.max(0, s - 1));
  }

  tambahPasienBaru(): void {
    this.sisaAntrean.update((s) => s + 1);
  }

  toggleKlinik(): void {
    // 3. set(): Menetapkan nilai sinyal secara langsung
    this.isKlinikBuka.set(!this.isKlinikBuka());
  }
}
```

---

## Key Concepts

### The Modern Angular Renaissance: Standalone & Signals
Angular has reinvented itself starting in v17+. The two core architectural triumphs:
1. **The Deprecation of `NgModule`**: Developers no longer register components across unwieldy `AppModule` manifests. Every component is **`standalone: true`**, declaring its isolated dependencies directly (`imports: [...]`).
2. **The Signals Revolution (`signal()`)**:
   Historically, Angular leaned upon *Zone.js*, monkey-patching async APIs and diffing the entire application tree top-to-bottom on every user interaction.
   With **Signals**, Angular tracks exact template interpolation nodes, executing **surgical fine-grained updates** yielding breakthrough performance!

### Signal Primitives:
- Read: Evaluate as a function invocation `this.queueNumber()` or in templates `{{ queueNumber() }}`.
- Absolute Mutation: `this.isOpen.set(false)`.
- Functional Transition: `this.remaining.update(prev => prev + 1)`.

---

---

## Beginner Friendly Explanation

### Analogy: Hospital Call Bells & Circuit Switches
1. **Zone.js (Legacy)** is a hospital orderly sprinting across all 500 patient wards every time a visitor opens the lobby door, simply to check if a light bulb flickered anywhere in the building. Wasteful and inefficient.
2. **Signals (Modern)** are dedicated direct copper wiring: when the nurse desk taps the queue bell (*signal update*), only LED Display #3 updates its numeric digits (*surgical DOM commit*), leaving the remaining 499 wards completely undisturbed.

## Experiments

- Click "Panggil Berikutnya" observing current queue increment while remaining tallies decrement instantly.
- Toggle clinic status to closed observing call buttons disable reactively.
- Omit invocation parentheses in templates to observe how Angular renders function references.
- Inspect main.ts in modern Angular CLI projects confirming bootstrapApplication operates without AppModule.

---

## Challenge

Introduce an `averageWaitMinutes = signal(15)` state, computing the estimated wait time for the last queued patient by multiplying remaining queue count by average duration.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR KOMPONEN ANGULAR                              │
│                                                          │
│  @Component({ standalone: true })                        │
│       │                                                  │
│  Template HTML ◄── [Property Binding] ── Signals (State) │
│       │                                                  │
│  User Action   ─── (Event Binding)   ──► Method Callback │
│       │                                                  │
│  Dependency Injection: Injeksi Service via inject()      │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `count = signal(0)`
- **Core Functionality:** State reaktif Angular Signals.
- **Parameters / Attributes:** `initialValue`.
- **System Behavior & Return:** Provides variabel sinyal reaktif granular yang memicu deteksi perubahan performa tinggi..
- **Practical Code Example:**
```typescript
import { signal } from '@angular/core';
export class CounterComponent {
  count = signal(0);
  inc() { this.count.update(n => n + 1); }
}
```
- **Expected Execution Output:**
```output
Komponen Angular merender sinyal reaktif
```

### 2. `double = computed(() => this.count() * 2)`
- **Core Functionality:** Sinyal komputasi memoized.
- **Parameters / Attributes:** `Compute Callback`.
- **System Behavior & Return:** Menghitung nilai turunan otomatis dengan cache pintar tanpa re-evaluasi redundan..
- **Practical Code Example:**
```typescript
import { signal, computed } from '@angular/core';
count = signal(10);
double = computed(() => this.count() * 2);
```
- **Expected Execution Output:**
```output
double() mengembalikan nilai 20
```

### 3. `@Component({ standalone: true, ... })`
- **Core Functionality:** Declaration of Komponen Standalone Modern.
- **Parameters / Attributes:** `Selector, Imports, Template`.
- **System Behavior & Return:** Mendefinisikan komponen modular mandiri tanpa memerlukan NgModules yang rumit..
- **Practical Code Example:**
```typescript
@Component({
  selector: 'app-user',
  standalone: true,
  template: `<h2>{{ title() }}</h2>`
})
export class UserComponent {}
```
- **Expected Execution Output:**
```output
Komponen siap dirender di aplikasi Angular
```

### 4. `inject(HttpClient)`
- **Core Functionality:** Injeksi dependensi fungsional.
- **Parameters / Attributes:** `Service Token`.
- **System Behavior & Return:** Retrieves instance service dependensi secara fungsional tanpa constructor boilerplate..
- **Practical Code Example:**
```typescript
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
private http = inject(HttpClient);
```
- **Expected Execution Output:**
```output
Service HttpClient siap digunakan untuk pemanggilan API
```

---

## Common Pitfalls & Debugging Tips

### 1. RxJS Subscription Memory Leaks
- **Symptom / Issue:** Subscriptions lingering after component destruction cause memory bloat and duplicate work.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `takeUntilDestroyed()` or resolve observables directly via the template `async` pipe.

### 2. Suboptimal Default Change Detection
- **Symptom / Issue:** Forces Angular to verify every single component on every browser event.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Switch to `ChangeDetectionStrategy.OnPush` and adopt Angular Signals.

### 3. Bloated Shared Modules
- **Symptom / Issue:** Impairs code splitting and inflates initial JavaScript bundle size.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Adopt Standalone Components and import only specific directives into the `imports: []` array.

---

## Summary

You have mastered Standalone Components and Angular Signals. Next week, we examine Modern Control Flow (@if, @for) and computed signals.
