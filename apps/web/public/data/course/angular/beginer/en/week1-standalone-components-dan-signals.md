# Modern Angular: Standalone Components, Zero NgModule & Reactive signal()

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Modern Control Flow | **Minggu 1:** Modern Angular: Standalone Components, Zero NgModule & Reactive signal()

## Learning Objectives

- Master modern Standalone Component architecture completely omitting legacy NgModule boilerplate
- Master the Angular Signals reactivity model: signal() declarations, getter reading (), set(), and update()
- Contrast fine-grained signal notification pipelines against legacy zone.js dirty-checking overhead
- Bind reactive signals directly into HTML templates using getter interpolation {{ mySignal() }}
- Deploy canonical property [property] and event (event) bindings adhering to modern Angular conventions

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

## Summary

You have mastered Standalone Components and Angular Signals. Next week, we examine Modern Control Flow (@if, @for) and computed signals.
