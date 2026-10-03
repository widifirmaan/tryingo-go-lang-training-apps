# Modern Component Communication: input(), input.required() & output() Signals

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Modern Control Flow | **Minggu 3:** Modern Component Communication: input(), input.required() & output() Signals

## Learning Objectives

- Trace the evolution from legacy @Input/@Output decorators to functional input() and output() primitives
- Enforce mandatory parent contracts via input.required() checked at TypeScript compile time
- Consume input signals reactively via function call syntax (myInput()) within components and computed derivations
- Deploy output() emitting type-safe events to parent components without EventEmitter overhead
- Combine input signals directly within computed() derivation graphs seamlessly

---

## Program: Emergency Triage Badge Component with Signal Inputs & Output Events

```typescript
// ============================================================================
// File: src/app/triage-badge.component.ts (Komponen Anak Berbasis Signal Inputs)
// ============================================================================
import { Component, input, output, computed } from '@angular/core';

export type TingkatTriase = 'MERAH' | 'KUNING' | 'HIJAU' | 'HITAM';

@Component({
  selector: 'app-triage-badge',
  standalone: true,
  template: `
    <div class="triage-card" [style.border-color]="warnaAksen()">
      <div class="header">
        <span class="kode-triase" [style.background]="warnaAksen()">{{ tingkat() }}</span>
        <span class="pasien-nama">{{ namaPasien() }}</span>
      </div>

      <div class="desc">{{ deskripsiKlinis() }}</div>

      <div class="actions">
        <button (click)="eskalasiKasus()" class="btn-escalate">Eskalasi Triase ↑</button>
        <button (click)="selesaikanTriase()" class="btn-resolve">Tangani Segera ✓</button>
      </div>
    </div>
  `,
  styles: [`
    .triage-card { border-left: 6px solid #cbd5e1; background: white; padding: 12px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 8px; }
    .header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .kode-triase { color: white; font-weight: bold; font-size: 11px; padding: 2px 6px; border-radius: 3px; }
    .pasien-nama { font-weight: bold; font-size: 14px; color: #0f172a; }
    .desc { font-size: 12px; color: #64748b; margin-bottom: 10px; }
    .actions { display: flex; gap: 6px; }
    button { padding: 4px 8px; font-size: 11px; border-radius: 4px; border: 1px solid #cbd5e1; cursor: pointer; }
    .btn-escalate { background: #fef2f2; color: #b91c1c; border-color: #fca5a5; }
    .btn-resolve { background: #f0fdf4; color: #15803d; border-color: #86efac; }
  `]
})
export class TriageBadgeComponent {
  // 1. input.required(): Input wajib dari parent sebagai Sinyal Murni (Read-Only)
  namaPasien = input.required<string>();
  
  // 2. input() dengan nilai default
  tingkat = input<TingkatTriase>('HIJAU');

  // 3. output(): Menggantikan @Output() EventEmitter lama dengan fungsi emisi bersih
  triageChanged = output<{ nama: string; tingkatBaru: TingkatTriase }>();
  patientResolved = output<string>();

  // 4. computed() turunan dari input signal
  warnaAksen = computed(() => {
    switch (this.tingkat()) {
      case 'MERAH': return '#dc2626'; // Darurat Kritis (Resusitasi)
      case 'KUNING': return '#d97706'; // Mendesak
      case 'HIJAU': return '#16a34a';  // Non-Mendesak
      case 'HITAM': return '#18181b';  // Meninggal / Fatal
    }
  });

  deskripsiKlinis = computed(() => {
    switch (this.tingkat()) {
      case 'MERAH': return 'Ancaman nyawa langsung! Butuh penanganan dalam 0 menit.';
      case 'KUNING': return 'Kondisi stabil dengan risiko memburuk dalam 30 menit.';
      case 'HIJAU': return 'Cedera ringan, pasien dapat menunggu di ruang observasi.';
      case 'HITAM': return 'Pasien tiba tanpa tanda-tanda vital yang dapat diselamatkan.';
    }
  });

  eskalasiKasus(): void {
    const urutan: Record<TingkatTriase, TingkatTriase> = {
      'HIJAU': 'KUNING',
      'KUNING': 'MERAH',
      'MERAH': 'HITAM',
      'HITAM': 'HITAM'
    };
    this.triageChanged.emit({ nama: this.namaPasien(), tingkatBaru: urutan[this.tingkat()] });
  }

  selesaikanTriase(): void {
    this.patientResolved.emit(this.namaPasien());
  }
}
```

---

## Key Concepts

### Signal Inputs & Outputs: The Modern Angular Paradigm
Previously, component inputs required decorators: `@Input() name: string = '';`.
Major limitation: tracking parent changes required implementing cumbersome `ngOnChanges` lifecycle interfaces.

### Why `input()` Signals Triumph:
1. **`input<T>()`**: Returns a first-class reactive Signal.
2. Composes natively inside `computed()` derivations:
   `accentColor = computed(() => this.level() === 'MERAH' ? 'red' : 'green')`.
   When parents alter `[level]="'MERAH'"`, child derivations recalculate immediately with zero lifecycle ceremony!
3. **`output()`**: Replaces legacy RxJS `EventEmitter` classes with lean, performant event dispatcher handles.

---

---

## Beginner Friendly Explanation

### Analogy: Emergency ER Wristbands & Nurse Call Sirens
1. **`input()`** is a digital patient ER wristband: physicians scan the electronic barcode (*input signal*). If central triage elevates priority from ambulatory to ICU (*parent mutation*), the digital wristband display reflects the alert instantly.
2. **`output()`** is the bedside nurse emergency call button: hitting the escalation switch (*emit*) rings an alarm at the trauma attending station (*parent event handler*).

## Experiments

- Pass tingkat="MERAH" from parent to observe the card adopt red styling with critical alerts.
- Click "Eskalasi Triase" verifying the triageChanged event emits with elevated status.
- Omit namaPasien to verify the compiler flags compile-time errors via input.required().
- Explore the modern model() signal primitive for two-way signal binding between components.

---

## Challenge

Deploy the `model()` two-way signal primitive creating an `isConfirmed = model(false)` toggle synchronizing bidirectionally with parent components.

---

## Summary

You have mastered signal-driven input(), input.required(), and output(). Next week, we examine Deferrable Views (@defer) for high-performance lazy loading.
