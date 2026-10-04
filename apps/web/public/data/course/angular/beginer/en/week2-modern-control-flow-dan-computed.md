# Modern Control Flow (@if, @for, @empty) & computed() Signals

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Modern Control Flow | **Minggu 2:** Modern Control Flow (@if, @for, @empty) & computed() Signals
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Migrate from legacy structural directives (*ngIf, *ngFor) to modern built-in control flow (@if, @for)
- Deploy the @for block with mandatory identity tracking (track item.id) guaranteeing optimal reconciliation
- Leverage the built-in @empty clause handling empty state collections declaratively
- Deploy computed() signals for automatic cached evaluations of hospital occupancy KPI metrics
- Enforce immutable array transformations within signal update() closures

---

## Program: Hospital Bed Occupancy Dashboard with @for & computed() Metrics

```typescript
// ============================================================================
// File: src/app/bed-occupancy.component.ts (Modern Control Flow & Computed Signals)
// ============================================================================
import { Component, signal, computed } from '@angular/core';

interface BedKamar {
  id: string;
  nomorKamar: string;
  bangsal: string;
  terisi: boolean;
  namaPasien?: string;
}

@Component({
  selector: 'app-bed-occupancy',
  standalone: true,
  template: `
    <div class="dashboard-bed">
      <header>
        <h3>Manajemen Tempat Tidur Rumah Sakit (BOR)</h3>
        <div class="kpi-rate">
          Tingkat Keterisian: <strong>{{ persentaseOkupansi() }}%</strong>
        </div>
      </header>

      <!-- 1. Sinyal Komputasi Cerdas (computed) -->
      <div class="metrics-row">
        <div class="stat">Total Bed: {{ totalBeds() }}</div>
        <div class="stat terisi">Terisi: {{ bedsTerisi() }}</div>
        <div class="stat kosong">Kosong: {{ bedsKosong() }}</div>
      </div>

      <!-- 2. Kontrol Alur Modern: @for dengan pelacakan wajib (track item.id) -->
      <div class="bed-grid">
        @for (bed of daftarBeds(); track bed.id) {
          <div class="bed-card" [class.occupied]="bed.terisi">
            <div class="bed-header">
              <strong>{{ bed.nomorKamar }}</strong>
              <small>{{ bed.bangsal }}</small>
            </div>
            
            <!-- 3. Kontrol Alur Modern: @if dan @else menggantikan *ngIf lama -->
            @if (bed.terisi) {
              <div class="pasien-info">Pasien: {{ bed.namaPasien }}</div>
              <button (click)="pulangkanPasien(bed.id)" class="btn-discharge">Discharge (Pulang)</button>
            } @else {
              <div class="kosong-info">Siap Digunakan</div>
              <button (click)="terimaPasien(bed.id)" class="btn-admit">+ Admisi Pasien</button>
            }
          </div>
        } @empty {
          <!-- 4. Blok @empty otomatis jika array kosong -->
          <div class="empty-state">Tidak ada data tempat tidur yang terdaftar di bangsal ini.</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard-bed { max-width: 620px; margin: 24px auto; font-family: sans-serif; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    h3 { margin: 0; font-size: 18px; color: #0f172a; }
    .kpi-rate { font-size: 15px; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; }
    .metrics-row { display: flex; gap: 12px; margin-bottom: 20px; }
    .stat { flex: 1; background: white; padding: 10px; border-radius: 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; }
    .stat.terisi { color: #dc2626; border-color: #fca5a5; }
    .stat.kosong { color: #16a34a; border-color: #86efac; }
    .bed-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .bed-card { background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; }
    .bed-card.occupied { border-color: #fca5a5; background: #fff5f5; }
    .bed-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .pasien-info { font-size: 13px; font-weight: bold; color: #991b1b; margin-bottom: 8px; }
    .kosong-info { font-size: 13px; color: #16a34a; margin-bottom: 8px; }
    button { width: 100%; padding: 6px; border-radius: 4px; border: none; cursor: pointer; font-size: 12px; font-weight: bold; }
    .btn-discharge { background: #fee2e2; color: #b91c1c; }
    .btn-admit { background: #dcfce7; color: #15803d; }
    .empty-state { text-align: center; padding: 24px; color: #94a3b8; grid-column: 1 / -1; }
  `]
})
export class BedOccupancyComponent {
  daftarBeds = signal<BedKamar[]>([
    { id: 'b1', nomorKamar: 'ICU-01', bangsal: 'Intensive Care', terisi: true, namaPasien: 'Hadi Sucipto' },
    { id: 'b2', nomorKamar: 'VIP-102', bangsal: 'Paviliun Melati', terisi: false },
    { id: 'b3', nomorKamar: 'K3-04', bangsal: 'Bangsal Umum Flamboyan', terisi: true, namaPasien: 'Siti Aminah' },
    { id: 'b4', nomorKamar: 'K3-05', bangsal: 'Bangsal Umum Flamboyan', terisi: false }
  ]);

  // Sinyal Komputasi (computed): Nilai turunan otomatis di-cache
  totalBeds = computed(() => this.daftarBeds().length);
  bedsTerisi = computed(() => this.daftarBeds().filter((b) => b.terisi).length);
  bedsKosong = computed(() => this.totalBeds() - this.bedsTerisi());
  persentaseOkupansi = computed(() => {
    if (this.totalBeds() === 0) return 0;
    return Math.round((this.bedsTerisi() / this.totalBeds()) * 100);
  });

  pulangkanPasien(id: string): void {
    this.daftarBeds.update((beds) =>
      beds.map((b) => (b.id === id ? { ...b, terisi: false, namaPasien: undefined } : b))
    );
  }

  terimaPasien(id: string): void {
    this.daftarBeds.update((beds) =>
      beds.map((b) => (b.id === id ? { ...b, terisi: true, namaPasien: 'Pasien Baru Rujukan' } : b))
    );
  }
}
```

---

## Key Concepts

### Why Modern Built-in Control Flow (@if / @for) Revolutionized Angular
Prior to Angular 17, developers imported `CommonModule`, relying upon archaic structural micro-syntax: `*ngIf="condition"` and `*ngFor="let item of list"`.
Flaws:
1. Mandated external module plumbing.
2. Developers frequently neglected `trackBy`, causing Angular to destructively remount entire DOM lists.

### The New Built-In Directives:
- **`@if (condition) { ... } @else { ... }`**: Parsed natively at compile time with zero runtime directive overhead.
- **`@for (item of items; track item.id) { ... } @empty { ... }`**:
  Tracking keys via `track item.id` is now **mandatory**, preventing list rendering regressions by design!
  The companion `@empty` block renders fallback state seamlessly when arrays empty out.

### `computed()` Signals
`computed()` declares read-only derived values subscribing to upstream signals.
Mutating bed occupancy causes `persentaseOkupansi()` to recalculate lazily and update the DOM automatically!

---

---

## Beginner Friendly Explanation

### Analogy: Hospital Key Cabinets & Automated Tallies
1. **`@for` with `track item.id`** is a precision numbered master key cabinet: retrieving the key for Suite 102 opens only locker slot 102 without rummaging through all 500 lockers.
2. **`computed()`** is the medical director's digital occupancy monitor: discharging a patient triggers the display board percentage to drop in real-time without administrative recalculations.

## Experiments

- Discharge a patient to observe occupied metrics decrease and occupancy percentages recalculate.
- Admit a patient into a vacant bed observing the visual border adapt to occupied red.
- Clear the bed array to verify the @empty block renders fallback empty state messaging.
- Benchmark @for rendering throughput against legacy *ngFor directives over 1,000 entities.

---

## Challenge

Introduce a "Show Vacant Only" filter via `filterVacantOnly = signal(false)` driving a derived `displayedBeds` computed signal.

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

You have mastered modern control flow (@if, @for, @empty) and computed() signals. Next week, we examine Signal Inputs and Outputs.
