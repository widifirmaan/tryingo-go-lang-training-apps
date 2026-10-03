# Modern Dependency Injection: The inject() Function & ProvidedIn Services

> **Kategori:** Angular | **Level:** Dependency Injection, Reactive Forms & RxJS | **Minggu 5:** Modern Dependency Injection: The inject() Function & ProvidedIn Services
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Angular hierarchical enterprise Dependency Injection (DI) container architecture
- Deploy @Injectable({ providedIn: 'root' }) establishing tree-shakable singleton services
- Master the modern functional inject() syntax replacing verbose constructor parameter injections
- Enforce service state encapsulation deploying .asReadonly() signal views to consumers
- Decouple medical domain mutation heuristics cleanly from presentation template tiers

---

## Program: Centralized Hospital Patient Records Service with inject()

```typescript
// ============================================================================
// File: src/app/services/patient-records.service.ts (Injectable Service Modern)
// ============================================================================
import { Injectable, signal } from '@angular/core';

export interface RekamMedis {
  idRekam: string;
  nomorRM: string;
  namaPasien: string;
  diagnosaUtama: string;
  dokterPJ: string;
}

@Injectable({
  providedIn: 'root' // Singleton Global: Tersedia di seluruh aplikasi tanpa deklarasi modul
})
export class PatientRecordsService {
  private records = signal<RekamMedis[]>([
    { idRekam: 'RM-01', nomorRM: '00-11-22', namaPasien: 'Anisa Rahmawati', diagnosaUtama: 'Hipertensi Primer', dokterPJ: 'dr. Hendra, Sp.PD' },
    { idRekam: 'RM-02', nomorRM: '00-11-23', namaPasien: 'Bambang Irawan', diagnosaUtama: 'Diabetes Melitus Tipe 2', dokterPJ: 'dr. Maya, Sp.PD' }
  ]);

  // Sinyal Readonly untuk dikonsumsi komponen luar
  readonly daftarRekamMedis = this.records.asReadonly();

  tambahRekamMedis(data: Omit<RekamMedis, 'idRekam'>): void {
    const baru: RekamMedis = {
      idRekam: `RM-${Date.now()}`,
      ...data
    };
    this.records.update((list) => [baru, ...list]);
  }

  cariBerdasarkanRM(nomor: string): RekamMedis | undefined {
    return this.records().find((r) => r.nomorRM === nomor);
  }
}

// ============================================================================
// File: src/app/rekam-medis-list.component.ts (Konsumsi via fungsi inject())
// ============================================================================
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-rekam-medis-list',
  standalone: true,
  template: `
    <div style="max-width: 500px; margin: 20px auto; font-family: sans-serif;">
      <h3>Sistem Rekam Medis Elektronik (RME)</h3>
      <p style="color: #64748b; font-size: 13px;">Ditenagai Dependency Injection inject(PatientRecordsService)</p>

      <ul>
        @for (item of recordService.daftarRekamMedis(); track item.idRekam) {
          <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
            <strong>[{{ item.nomorRM }}] {{ item.namaPasien }}</strong>
            <div style="font-size: 12px; color: #475569;">Diagnosa: {{ item.diagnosaUtama }} • Dokter: {{ item.dokterPJ }}</div>
          </li>
        }
      </ul>
    </div>
  `
})
export class RekamMedisListComponent {
  // Modern DI: Menggunakan fungsi inject() menggantikan constructor injection yang bertele-tele!
  readonly recordService = inject(PatientRecordsService);
}
```

---

## Key Concepts

### The `inject()` Revolution in Angular
Historically, injecting services into Angular components mandated verbose constructor signatures:
`constructor(private recordService: PatientRecordsService, private router: Router) {}`.
Modern Angular introduces the functional **`inject()`** primitive:
`readonly recordService = inject(PatientRecordsService);`
Benefits:
1. Concise, expressive, and declarative.
2. Operates outside component classes (within functional guards, interceptors, or factories).
3. Infers TypeScript types automatically without duplicating class names.

### Encapsulating Signal Stores with `.asReadonly()`
Prevent external components from executing rogue updates (`service.records.set([])`).
Keep writeable signals `private`, exposing read-only projections via `this.records.asReadonly()`.
Consumers read state transparently while modifications must pass through vetted service mutator methods.

---

---

## Beginner Friendly Explanation

### Analogy: Central Hospital Pharmacy & Dedicated Intercoms
1. **@Injectable Services** are the central hospital pharmacy: an audited, sterile dispensary (*global singleton*) housing pharmaceutical inventories.
2. **`inject()`** is the attending physician's desk intercom: doctors do not hike downstairs pushing medical utility carts; lifting the receiver (*inject(PharmacyService)*) orders medications dispatched directly to the examination table.

## Experiments

- Invoke recordService.tambahRekamMedis(...) from a component to witness real-time list synchronization.
- Attempt mutating recordService.daftarRekamMedis().push(...) to confirm asReadonly compile protections.
- Evaluate invoking inject() inside functional router guards without class boilerplates.
- Author a custom InjectionToken injecting dynamic API runtime configurations.

---

## Challenge

Expand `PatientRecordsService` with a reactive `findPatientByName(name: string)` query utility returning matching patient arrays.

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

You have mastered modern Dependency Injection with inject() and asReadonly services. Next week, we examine Strongly-Typed Reactive Forms.
