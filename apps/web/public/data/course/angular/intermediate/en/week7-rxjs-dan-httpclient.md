# Modern RxJS & HttpClient: switchMap, debounceTime & The toSignal() Bridge

> **Kategori:** Angular | **Level:** Dependency Injection, Reactive Forms & RxJS | **Minggu 7:** Modern RxJS & HttpClient: switchMap, debounceTime & The toSignal() Bridge
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand complementary roles: deploying RxJS for async event streams versus Signals for synchronous reactive state
- Utilize essential RxJS operators: debounceTime(300) and distinctUntilChanged() throttling network overhead
- Eliminate search race conditions deploying switchMap() canceling superseded in-flight requests
- Bridge RxJS Observables to modern Signals seamlessly using the official toSignal() interop primitive
- Eliminate legacy template async pipes (| async) in favor of ergonomic Signal getter evaluations

---

## Program: Real-Time Patient Telemetry & Medicine Lookup with toSignal()

```typescript
// ============================================================================
// File: src/app/pencarian-obat.component.ts (RxJS + toSignal() Bridge)
// ============================================================================
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, delay } from 'rxjs/operators';

interface ObatFarmasi {
  kode: string;
  nama: string;
  stok: number;
}

@Component({
  selector: 'app-pencarian-obat',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="farmasi-lookup">
      <h3>Pencarian Resep Obat Farmasi (RxJS + toSignal)</h3>
      
      <input
        type="text"
        [formControl]="queryControl"
        placeholder="Ketik nama obat (misal: Paracetamol, Amoxicillin)..."
        class="search-input"
      />

      <div class="results">
        <small style="color: #64748b;">Hasil Pencarian Real-Time (Debounced 300ms):</small>
        <ul>
          @for (item of hasilPencarianSinyal(); track item.kode) {
            <li>
              <strong>{{ item.nama }}</strong> (Kode: {{ item.kode }})
              <span class="stok" [class.kritis]="item.stok < 10">Stok: {{ item.stok }} botol</span>
            </li>
          } @empty {
            <li class="empty">Tidak ditemukan obat yang cocok.</li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .farmasi-lookup { max-width: 480px; margin: 20px auto; font-family: sans-serif; background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; }
    h3 { margin-top: 0; color: #0369a1; }
    .search-input { width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 16px; }
    ul { list-style: none; padding: 0; margin: 8px 0 0 0; }
    li { padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; font-size: 13px; }
    .stok { font-weight: bold; color: #16a34a; }
    .stok.kritis { color: #dc2626; }
    .empty { color: #94a3b8; font-style: italic; }
  `]
})
export class PencarianObatComponent {
  readonly queryControl = new FormControl<string>('', { nonNullable: true });

  // Database simulasi obat
  private masterObat: ObatFarmasi[] = [
    { kode: 'OB-01', nama: 'Paracetamol 500mg', stok: 120 },
    { kode: 'OB-02', nama: 'Amoxicillin 500mg', stok: 45 },
    { kode: 'OB-03', nama: 'Ibuprofen 400mg', stok: 8 },
    { kode: 'OB-04', nama: 'Cetirizine 10mg', stok: 60 }
  ];

  // Pipeline RxJS: debounce 300ms -> batalkan request lama jika user mengetik lagi (switchMap)
  private pencarianObservable$ = this.queryControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((teks) => {
      const q = teks.trim().toLowerCase();
      if (!q) return of(this.masterObat);
      const filtered = this.masterObat.filter((o) => o.nama.toLowerCase().includes(q));
      return of(filtered).pipe(delay(200)); // Simulasi latency jaringan
    })
  );

  // toSignal(): Mengubah aliran Observable RxJS menjadi Sinyal Reaktif murni untuk template!
  readonly hasilPencarianSinyal = toSignal(this.pencarianObservable$, { initialValue: this.masterObat });
}
```

---

## Key Concepts

### Signals vs RxJS: The Unified Paradigm
Many assumed Signals were engineered to eradicate RxJS. **This is a fundamental misunderstanding.**
They serve complementary operational domains:
- **Signals**: Ideal for **Synchronous State Representation in UI templates** (counters, toggle flags, displayed models). Effortless consumption without manual subscriptions.
- **RxJS**: Unrivaled for **Complex Time-Series Asynchronous Event Streams** (keystroke debouncing, request cancellation via *switchMap*, polling cascades, WebSockets).

### The Canonical Bridge: `toSignal()`
Rather than manually subscribing `this.stream$.subscribe()` and managing teardown boilerplates, deploy Angular's official interop bridge:
`const dataSignal = toSignal(myObservable$, { initialValue: [] })`.
Angular subscribes automatically, teardowns cleanly upon unmount, and exposes a pure read-only Signal interface in templates: `{{ dataSignal() }}`!

---

---

## Beginner Friendly Explanation

### Analogy: Live FM Radio Transmissions vs Wall Snapshots
1. **RxJS** is a continuous FM broadcast stream (*asynchronous time-series flow*): audio waves stream, advertisements interleave, and stations shift. Audio engineers tweak filter knobs (*switchMap, debounceTime*).
2. **Signals & toSignal()** is a photographer taking a polaroid snapshot of the live DJ and pinning it to the studio corkboard (*current state snapshot*): anyone walking into the room views the image instantly without carrying a tuner.

## Experiments

- Type "para" rapidly to observe the 300ms debounce buffer holding evaluation until typing settles.
- Type unmapped strings like "xyz" observing the @empty block render the fallback notice.
- Verify the complete absence of manual .subscribe() or teardown boilerplate thanks to toSignal().
- Explore the reverse bridge toObservable(mySignal) converting reactive Signals back into RxJS streams.

---

## Challenge

Integrate a loading indicator by driving an `isSearching = signal(false)` flag toggling across the switchMap pipeline.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered the synergy of RxJS and Signals using toSignal(). Next week, we enter Level 3: Functional Router Guards and Interceptors.
