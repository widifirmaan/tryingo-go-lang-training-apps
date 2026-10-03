# Functional HTTP Interceptors (withInterceptors) & Signal effect()

> **Kategori:** Angular | **Level:** Functional Routing, Interceptors & Hospital Capstone | **Minggu 9:** Functional HTTP Interceptors (withInterceptors) & Signal effect()
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


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

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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

You have mastered functional interceptors and signal effect(). Next week is our Capstone Project: Enterprise Hospital Management System.
