# Deferrable Views: Lazy Loading Optimization with @defer & Triggers

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Modern Control Flow | **Minggu 4:** Deferrable Views: Lazy Loading Optimization with @defer & Triggers

## Learning Objectives

- Master Deferrable Views (@defer) as declarative template-driven code-splitting boundaries
- Deploy dynamic defer triggers: on viewport (intersection observer), on interaction, on hover, on timer
- Utilize the @placeholder block to reserve geometry layouts eliminating Cumulative Layout Shift (CLS)
- Tune @loading boundaries with minimum display thresholds (minimum 500ms) eliminating visual flicker
- Shrink initial JavaScript bundle footprints up to 60% across expansive enterprise portals

---

## Program: Specialist Doctor Timeline with On-Viewport Deferrable Views

```typescript
// ============================================================================
// File: src/app/jadwal-dokter.component.ts (Demonstrasi Deferrable Views)
// ============================================================================
import { Component } from '@angular/core';

@Component({
  selector: 'app-jadwal-dokter',
  standalone: true,
  template: `
    <div class="portal-dokter">
      <h2>Portal Jadwal Praktik Dokter Spesialis</h2>
      <p>Scroll ke bawah untuk melihat timeline detail dokter on-duty hari ini.</p>

      <div class="spacer-box">
        Area Konten Pembuka (Gulir Layar ke Bawah ↓)
      </div>

      <!-- 1. @defer: Komponen Berat HANYA Diunduh & Dirender saat terlihat di layar (on viewport) -->
      @defer (on viewport) {
        <div class="timeline-berat">
          <h3>Jadwal Dokter Spesialis Bedah Saraf & Jantung</h3>
          <ul class="timeline-list">
            <li><strong>08:00 - 11:30</strong>: dr. Hendra Gunawan, Sp.BS (Operasi Kraniotomi)</li>
            <li><strong>13:00 - 16:00</strong>: dr. Maya Puspita, Sp.JP (Konsultasi Kateterisasi)</li>
            <li><strong>19:00 - 21:00</strong>: dr. Faisal Riza, Sp.A (Poli Anak Siaga)</li>
          </ul>
        </div>
      } @placeholder {
        <!-- 2. @placeholder: Tampilan placeholder instan sebelum pemicu defer aktif -->
        <div class="placeholder-box">
          [Placeholder] Gulir mendekati area ini untuk mengunduh modul jadwal dokter...
        </div>
      } @loading (minimum 500ms) {
        <!-- 3. @loading: Tampilan skeleton saat chunk JS sedang diunduh dari server -->
        <div class="loading-box">
          Sedang mengunduh modul timeline dokter spesialis...
        </div>
      } @error {
        <!-- 4. @error: Penanganan jika unduhan paket JS gagal karena jaringan -->
        <div class="error-box">
          Gagal mengunduh modul jadwal. Periksa koneksi internet Anda.
        </div>
      }
    </div>
  `,
  styles: [`
    .portal-dokter { max-width: 580px; margin: 20px auto; font-family: sans-serif; }
    .spacer-box { height: 400px; background: #f1f5f9; border: 2px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; color: #64748b; font-weight: bold; margin-bottom: 24px; border-radius: 8px; }
    .timeline-berat { background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    h3 { margin-top: 0; color: #0284c7; }
    .timeline-list { list-style: none; padding: 0; margin: 0; }
    .timeline-list li { padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .placeholder-box { padding: 30px; background: #e2e8f0; border-radius: 8px; text-align: center; color: #475569; font-size: 13px; }
    .loading-box { padding: 30px; background: #fef9c3; border-radius: 8px; text-align: center; color: #854d0e; font-weight: bold; }
    .error-box { padding: 20px; background: #fee2e2; color: #991b1b; border-radius: 8px; text-align: center; }
  `]
})
export class JadwalDokterComponent {}
```

---

## Key Concepts

### The Architecture of Deferrable Views
Historically, embedding heavy charting engines or expansive scheduling matrices at the bottom of views forced browsers to download **entire megabytes of script up-front**, degrading initial load scores.

With **`@defer`**:
The Angular compiler isolates the enclosed template into an asynchronous lazy-loaded JavaScript chunk.
The browser fetches and hydrates markup strictly when triggered:
- `on viewport`: The placeholder crosses the viewport via IntersectionObserver.
- `on interaction`: Users focus or click target controls.
- `on hover`: Pointer cursors hover over related trigger nodes.
This declarative optimization occurs without configuring routing rules or authoring manual dynamic imports!

---

---

## Beginner Friendly Explanation

### Analogy: Progressive Dining Menus & Stage Curtains
Imagine a 100-page restaurant catalog:
1. **Without @defer**, waitstaff recite all 100 pages the millisecond diners cross the front doorway, overwhelming patrons (*sluggish initial hydration*).
2. **With @defer**, staff hand you a crisp single-page appetizer card. Only when you flip to dessert (*on viewport scroll*) do staff fetch the pastry menu from the pantry (*downloaded strictly on demand*).

## Experiments

- Inspect network activity while scrolling downward; watch the lazy JS chunk stream in the instant the viewport threshold trips!
- Switch trigger syntax to @defer (on interaction) and click the placeholder to trigger on-demand loading.
- Throttle network to Slow 3G in DevTools to observe the @loading yellow banner display for its minimum 500ms.
- Benchmark initial bundle distributions verifying code splitting occurs seamlessly.

---

## Challenge

Author a trigger element `<button #openBtn>` configuring `@defer (on interaction(openBtn))` delaying medical record imports until explicit button clicks.

---

## Summary

You have mastered Deferrable Views and lazy compilation. Next week, we enter Level 2: Modern Dependency Injection via inject() and Reactive Forms.
