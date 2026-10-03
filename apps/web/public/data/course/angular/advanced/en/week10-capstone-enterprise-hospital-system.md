# Capstone: Enterprise Multi-Tier Hospital Clinical Management System

> **Kategori:** Angular | **Level:** Functional Routing, Interceptors & Hospital Capstone | **Minggu 10:** Capstone: Enterprise Multi-Tier Hospital Clinical Management System
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize all modern Angular pillars (Standalone, Signals, Computed, Modern Control Flow @for/@empty) into an enterprise clinical hospital platform
- Compute real-time clinical KPIs (Bed Occupancy Rate %, Critical Counts, Available Beds) reactively via computed()
- Design an institutional-grade healthcare interface with high-contrast emergency triage visual hierarchies
- Orchestrate clinical state mutations immutably and surgically without legacy Zone.js dirty-checking overhead
- Deliver production-ready senior-grade Angular architecture engineered for enterprise microservice connectivity

---

## Program: Full Enterprise Clinical Suite with Signal Telemetry, Triage & Bed Allocation

```typescript
// ============================================================================
// CAPSTONE PROJECT: NUSA MEDIKA ENTERPRISE CLINICAL SUITE
// ============================================================================
import { Component, signal, computed } from '@angular/core';

interface PasienKlinis {
  id: string;
  nama: string;
  triase: 'KRITIS' | 'MENDESAK' | 'STABIL';
  lokasiBed: string;
  waktuMasuk: string;
}

@Component({
  selector: 'app-hospital-capstone',
  standalone: true,
  template: `
    <div class="hospital-shell">
      <header class="hospital-header">
        <div>
          <h2>Nusa Medika Executive Health Dashboard</h2>
          <small>Modern Angular Enterprise Architecture • Signal-Driven State</small>
        </div>
        <div class="header-stat">
          <div class="stat-label">Bed Occupancy Rate (BOR)</div>
          <div class="stat-value" [class.alert]="borPercentage() > 80">{{ borPercentage() }}%</div>
        </div>
      </header>

      <!-- KPI Summary Cards -->
      <section class="kpi-grid">
        <div class="kpi-card">
          <small>Pasien Rawat Inap Aktif</small>
          <div class="kpi-num">{{ totalPasien() }} Jiwa</div>
        </div>
        <div class="kpi-card critical">
          <small>Kasus Kritis UGD</small>
          <div class="kpi-num">{{ totalKritis() }} Pasien</div>
        </div>
        <div class="kpi-card">
          <small>Kapasitas Bed Tersisa</small>
          <div class="kpi-num">{{ bedTersisa() }} Bed</div>
        </div>
      </section>

      <!-- Panel Kontrol Admisi Pasien Cepat -->
      <section class="admission-panel">
        <h3>Admisi Cepat Pasien Baru</h3>
        <div class="input-row">
          <input #namaInput type="text" placeholder="Nama Pasien Lengkap..." />
          <select #triaseSelect>
            <option value="STABIL">Triase Hijau (Stabil)</option>
            <option value="MENDESAK">Triase Kuning (Mendesak)</option>
            <option value="KRITIS">Triase Merah (Kritis UGD)</option>
          </select>
          <button (click)="tambahPasien(namaInput.value, triaseSelect.value); namaInput.value = ''" class="btn-admit">
            + Daftarkan Pasien
          </button>
        </div>
      </section>

      <!-- Tabel Pasien Aktif -->
      <section class="table-section">
        <h3>Daftar Pasien Sedang Dirawat</h3>
        <table class="clinical-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pasien</th>
              <th>Status Triase</th>
              <th>Alokasi Bed</th>
              <th>Waktu Masuk</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            @for (p of daftarPasien(); track p.id) {
              <tr [class.row-critical]="p.triase === 'KRITIS'">
                <td><code>{{ p.id }}</code></td>
                <td><strong>{{ p.nama }}</strong></td>
                <td>
                  <span class="badge" [attr.data-triase]="p.triase">{{ p.triase }}</span>
                </td>
                <td>{{ p.lokasiBed }}</td>
                <td>{{ p.waktuMasuk }}</td>
                <td>
                  <button (click)="pulangkanPasien(p.id)" class="btn-discharge">Discharge</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="6" class="empty-msg">Seluruh bed rawat inap saat ini kosong.</td>
              </tr>
            }
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .hospital-shell { max-width: 860px; margin: 24px auto; font-family: system-ui, sans-serif; background: white; padding: 24px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.04); }
    .hospital-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; }
    h2 { margin: 0; color: #0f172a; font-size: 20px; }
    small { color: #64748b; }
    .header-stat { text-align: right; }
    .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; }
    .stat-value { font-size: 24px; font-weight: bold; color: #16a34a; }
    .stat-value.alert { color: #dc2626; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0; }
    .kpi-card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 14px; border-radius: 8px; }
    .kpi-card.critical { background: #fff5f5; border-color: #fca5a5; color: #b91c1c; }
    .kpi-num { font-size: 22px; font-weight: bold; margin-top: 4px; }
    .admission-panel { background: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
    .admission-panel h3 { margin: 0 0 10px 0; font-size: 14px; }
    .input-row { display: flex; gap: 8px; }
    .input-row input { flex: 1; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; }
    .input-row select { padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; }
    .btn-admit { background: #0f172a; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .clinical-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .clinical-table th, .clinical-table td { padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: left; }
    .clinical-table th { background: #f8fafc; font-size: 12px; color: #64748b; }
    .badge { font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 3px; }
    .badge[data-triase="KRITIS"] { background: #fee2e2; color: #b91c1c; }
    .badge[data-triase="MENDESAK"] { background: #fef3c7; color: #b45309; }
    .badge[data-triase="STABIL"] { background: #dcfce7; color: #15803d; }
    .row-critical { background: #fffbfb; }
    .btn-discharge { background: #fee2e2; color: #b91c1c; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
    .empty-msg { text-align: center; color: #94a3b8; padding: 24px; }
  `]
})
export class HospitalCapstoneComponent {
  readonly kapasitasMaksimalBed = 20;

  // Signal State Pasien Terintegrasi
  daftarPasien = signal<PasienKlinis[]>([
    { id: 'PX-101', nama: 'Suryadi Pratama', triase: 'KRITIS', lokasiBed: 'ICU Bed 01', waktuMasuk: '08:15' },
    { id: 'PX-102', nama: 'Ratna Wulandari', triase: 'MENDESAK', lokasiBed: 'Kamar VIP 204', waktuMasuk: '09:40' },
    { id: 'PX-103', nama: 'Gunawan Susanto', triase: 'STABIL', lokasiBed: 'Bangsal Melati B3', waktuMasuk: '11:05' }
  ]);

  // Derived Computed KPI Metrics
  totalPasien = computed(() => this.daftarPasien().length);
  totalKritis = computed(() => this.daftarPasien().filter((p) => p.triase === 'KRITIS').length);
  bedTersisa = computed(() => this.kapasitasMaksimalBed - this.totalPasien());
  borPercentage = computed(() => Math.round((this.totalPasien() / this.kapasitasMaksimalBed) * 100));

  tambahPasien(nama: string, triaseVal: string): void {
    if (!nama.trim()) return;

    const baru: PasienKlinis = {
      id: `PX-${Date.now().toString().slice(-4)}`,
      nama,
      triase: triaseVal as PasienKlinis['triase'],
      lokasiBed: `Bed Observasi ${Math.floor(Math.random() * 10) + 1}`,
      waktuMasuk: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    this.daftarPasien.update((list) => [baru, ...list]);
  }

  pulangkanPasien(id: string): void {
    this.daftarPasien.update((list) => list.filter((p) => p.id !== id));
  }
}
```

---

## Key Concepts

### Capstone Enterprise Clinical Suite Architecture
This capstone converges modern Angular architecture into an enterprise-ready system:
1. **Zero-NgModule Standalone Topology**: Components compile into lean, isolated units ready for cloud-edge distribution.
2. **Pure Signal Reactivity (Signals & Computed)**: Discharging patients triggers immediate synchronous recalculations across high-level hospital KPIs (`borPercentage`, `totalPasien`, `bedTersisa`) with zero DOM lag.
3. **Modern Control Flow Directives**: Leverages `@for (p of daftarPasien(); track p.id)` guaranteeing microsecond DOM tracking reconciliation.
4. **Enterprise Extensibility**: Architecture cleanly integrates with `PatientRecordsService`, `HttpClient` interceptors, and real-time telemetry WebSockets.

### Welcome to Senior Angular Engineering!
Congratulations! You have mastered the premier framework powering mission-critical banking, aerospace, and healthcare enterprise infrastructures worldwide.

---

---

## Beginner Friendly Explanation

### Analogy: Hospital Crisis Operations Center
This application mirrors a hospital crisis command center:
1. **BOR Header & KPI Display** are the massive wall-mounted telemetry screens: executive directors immediately spot hospital capacity breach warnings (*BOR > 80%*).
2. **Clinical Patient Table** is the digital ER intake roster: admitting new patients (*tambahPasien*) triggers immediate metric updates across master command displays.

## Experiments

- Admit a patient with "Triase Merah" to observe the row highlight in critical red alert styling.
- Admit patients until BOR exceeds 80% to watch the KPI badge transition into red alert mode.
- Discharge all patients down to zero verifying the @empty block renders the vacant bed message.
- Integrate this suite with the jwtAuthInterceptor and functional router guards from prior weeks.

---

## Challenge

Add real-time table filtering: introduce a search input filtering patient rows by name or bed location via a derived computed signal.

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

Congratulations! You have completed the comprehensive modern Angular curriculum, culminating in an enterprise-grade Clinical Hospital Management System.
