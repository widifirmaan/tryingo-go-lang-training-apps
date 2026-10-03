# Functional HTTP Interceptors (withInterceptors) & Signal effect()

> **Kategori:** Angular | **Level:** Functional Routing, Interceptors & Hospital Capstone | **Minggu 9:** Functional HTTP Interceptors (withInterceptors) & Signal effect()

## Learning Objectives

- Transition from class-based HttpInterceptor interfaces to functional HttpInterceptorFn functions
- Attach Bearer JWT authorization tokens across outgoing HTTP requests centrally via request cloning
- Configure provideHttpClient(withInterceptors([jwtAuthInterceptor])) inside application bootstrap settings
- Deploy the signal effect() primitive to observe signal mutations and trigger external telemetry side effects
- Enforce effect() execution rules: requiring invocation within an active injection context (constructor)

---

## Program: Automated JWT Bearer Interceptor & Pulse Telemetry Signal Effect

```typescript
// ============================================================================
// File: src/app/interceptors/jwt.interceptor.ts (Functional Interceptor Modern)
// ============================================================================
import { HttpInterceptorFn } from '@angular/common/http';

export const jwtAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('nusa_hospital_jwt');

  // Kloning request dan suntikkan header Authorization jika token ada
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log(`[HTTP Interceptor] Menyuntikkan Bearer token ke permintaan: ${req.url}`);
    return next(authReq);
  }

  return next(req);
};

// ============================================================================
// File: src/app/vital-monitor.component.ts (Penggunaan effect() Sinyal Modern)
// ============================================================================
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-vital-monitor',
  standalone: true,
  template: `
    <div style="max-width: 420px; margin: 20px auto; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
      <h4>Monitor Tanda Vital ICU (effect() Telemetri)</h4>
      <div style="font-size: 24px; font-weight: bold; color: #dc2626;">
        Denyut Jantung: {{ denyutJantungBpm() }} BPM
      </div>
      <button (click)="simulasiLonjakanDetak()" style="margin-top: 10px; padding: 6px 12px; cursor: pointer;">
        Simulasikan Lonjakan Takiakardi
      </button>
    </div>
  `
})
export class VitalMonitorComponent {
  denyutJantungBpm = signal<number>(75);

  constructor() {
    // Sinyal effect(): Berjalan otomatis saat sinyal di dalamnya (denyutJantungBpm) mengalami mutasi
    effect(() => {
      const bpm = this.denyutJantungBpm();
      console.log(`[Audit Medis ICU] Telemetri denyut diperbarui: ${bpm} BPM`);

      if (bpm > 120) {
        console.warn(`[ALARM KRITIS UGD] Pasien mengalami Takikardia Parah: ${bpm} BPM!`);
      }
    });
  }

  simulasiLonjakanDetak(): void {
    this.denyutJantungBpm.set(135);
  }
}
```

---

## Key Concepts

### Modern Functional HTTP Interceptors
Historically, intercepting HTTP calls required scaffolding full classes implementing `HttpInterceptor` and wiring them through arcane multi-provider injection tokens.
In modern Angular:
An interceptor is **a plain functional handler `HttpInterceptorFn = (req, next) => next(req)`**.
Register it during application bootstrapping cleanly:
```typescript
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([jwtAuthInterceptor]))]
});
```

### The `effect()` Signal Primitive
Never utilize `computed()` for side effects or logging; reserve `computed()` strictly for pure idempotent derivations.
Deploy **`effect(() => { ... })`** for:
1. Serializing signal state to LocalStorage upon mutation.
2. Triggering acoustic alarms when telemetry exceeds physiological thresholds.
3. Transmitting telemetry metrics to remote observability dashboards.

---

---

## Beginner Friendly Explanation

### Analogy: Customs Diplomatic Pouches & ICU Heart Monitors
1. **HTTP Interceptor** is a diplomatic courier checkpoint: every outbound diplomatic pouch (*HTTP request*) is inspected and stamped with verified embassy seal credentials (*Bearer JWT header*) prior to cargo loading.
2. **`effect()`** is an ICU electrocardiogram alarm: the sensor continuously tracks cardiac rhythms (*signal*); if heart rates breach red thresholds, sirens sound across the ward automatically (*side effect*).

## Experiments

- Trigger an HTTP call observing the Authorization: Bearer header populate inside DevTools Network headers.
- Simulate tachycardia spikes to observe the automated ICU alert warning log in the console.
- Evaluate effect teardown callbacks deploying Angular's native onCleanup() hook.
- Author an error-handling interceptor redirecting to login upon receiving HTTP 401 Unauthorized codes.

---

## Challenge

Author a functional `loggingMetricsInterceptor` benchmarking the millisecond round-trip latency of outgoing HTTP requests.

---

## Summary

You have mastered functional interceptors and signal effect(). Next week is our Capstone Project: Enterprise Hospital Management System.
