# Computed Properties: Intelligent Caching, watch & watchEffect for Side Effects

> **Kategori:** Vue | **Level:** Composition API, Reactivity & Components | **Minggu 2:** Computed Properties: Intelligent Caching, watch & watchEffect for Side Effects
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Distinguish plain template methods from computed properties equipped with smart caching heuristics
- Deploy computed properties for deterministic derived data pipelines free of side effects
- Utilize watch() to react to explicit state mutations accessing previous and next values
- Leverage watchEffect() for automatic implicit dependency collection and immediate startup runs
- Eliminate redundant evaluation overhead across complex Vue template hierarchies

---

## Program: Sales Commission Calculator & Lead Health Score Watcher

```vue
<script setup>
import { ref, computed, watch, watchEffect } from "vue";

const nilaiKesepakatan = ref(150000000); // 150 Juta
const tierSales = ref("SENIOR"); // "JUNIOR" (5%) | "SENIOR" (10%) | "LEAD" (15%)
const catatanAuditLog = ref([]);

// 1. computed: Otomatis di-cache! Hanya dihitung ulang jika dependensi (nilai/tier) berubah
const persentaseKomisi = computed(() => {
  switch (tierSales.value) {
    case "LEAD": return 0.15;
    case "SENIOR": return 0.10;
    default: return 0.05;
  }
});

const totalKomisiDiterima = computed(() => {
  return nilaiKesepakatan.value * persentaseKomisi.value;
});

// 2. watch: Mengamati perubahan variabel spesifik dengan akses ke nilai (baru, lama)
watch(tierSales, (tierBaru, tierLama) => {
  const log = `[AUDIT] Promosi Sales terdeteksi: dari ${tierLama} menjadi ${tierBaru}`;
  catatanAuditLog.value.unshift(log);
});

// 3. watchEffect: Berjalan langsung saat inisialisasi dan melacak otomatis variabel apapun di dalamnya
watchEffect(() => {
  if (totalKomisiDiterima.value > 20000000) {
    console.log(`[Peringatan HR] Komisi besar di atas 20 Juta membutuhkan otorisasi Direktur!`);
  }
});
</script>

<template>
  <div style="max-width: 480px; margin: 20px auto; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 16px; borderRadius: 8px;">
    <h3>Kalkulator Komisi Sales Eksekutif</h3>

    <div style="margin-bottom: 12px;">
      <label style="display: block; font-size: 13px; font-weight: bold;">Nilai Kesepakatan (IDR):</label>
      <input type="number" v-model.number="nilaiKesepakatan" style="width: 100%; padding: 8px; box-sizing: border-box;" />
    </div>

    <div style="margin-bottom: 16px;">
      <label style="display: block; font-size: 13px; font-weight: bold;">Tier Akun Sales:</label>
      <select v-model="tierSales" style="width: 100%; padding: 8px;">
        <option value="JUNIOR">Junior Account Exec (5%)</option>
        <option value="SENIOR">Senior Account Exec (10%)</option>
        <option value="LEAD">Sales Director / Lead (15%)</option>
      </select>
    </div>

    <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 16px;">
      <div>Persentase: <strong>{{ persentaseKomisi * 100 }}%</strong></div>
      <div style="font-size: 18px; color: #16a34a; font-weight: bold; margin-top: 4px;">
        Hak Komisi: Rp {{ totalKomisiDiterima.toLocaleString('id-ID') }}
      </div>
    </div>

    <div v-if="catatanAuditLog.length > 0">
      <small style="color: #64748b; font-weight: bold;">Riwayat Audit:</small>
      <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 12px; color: #475569;">
        <li v-for="(log, idx) in catatanAuditLog" :key="idx">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>
```

---

## Key Concepts

### Why `computed` Trumps Plain Template Methods
Invoking plain methods in templates (`{{ calculateCommission() }}`) triggers **re-execution on EVERY single unrelated render pass**, even when deal valuations remain untouched.
In contrast, **`computed` properties feature intelligent dependency caching**:
The output is cached in memory. As long as reactive inputs (`dealValue`, `salesTier`) remain identical, Vue returns the cached scalar instantly without touching CPU cycles!

### `watch` vs `watchEffect`
- **`watch(source, callback)`**:
  - *Lazy*: Dormant during mount unless flagged with `{ immediate: true }`.
  - Explicit: You specify target references to observe (`salesTier`).
  - Provides provenance: delivers `(newValue, oldValue)` parameters.
  - Ideal for: Network queries on query mutation, persisting records to LocalStorage.
- **`watchEffect(callback)`**:
  - *Immediate*: Runs instantly upon component initialization.
  - Implicit: Scans the closure, automatically collecting every reactive property accessed.

---

---

## Beginner Friendly Explanation

### Analogy: Desktop Calculator Memory Keys & Gate Access Logs
1. **Computed Properties** are memory recall buttons (`MR`) on a desktop calculator: the machine retains long product calculations; until you type fresh digits, the display serves memory instantly without re-crunching math.
2. **Watch** is a gatehouse security guard: "At 14:00, Officer Smith (*oldValue*) handed over the gate key to Officer Jones (*newValue*)". The guard acts only when the specific guard post turns over.

## Experiments

- Mutate the deal value to 250M to witness totalKomisiDiterima update reactively.
- Promote the Sales Tier from SENIOR to LEAD and verify a fresh audit record appends below.
- Inspect DevTools console to observe the automated HR warning fire when commissions breach 20M.
- Attach the { deep: true } configuration modifier when observing nested reactive object trees.

---

## Challenge

Author a computed `estimatedTax` property evaluating bracketed taxes (5% below 10M, 15% above 10M), rendering net commission take-home pay.

---

## Visual Mental Model & Architecture Flow

![Diagram Reaktivitas Komponen & Data Flow Vue](/diagrams/react-data-flow.svg)

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

### 1. Destructuring Loss of Reactivity
- **Symptom / Issue:** Unpacking fields from `reactive()` breaks Vue reactivity linkage.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Apply `toRefs(state)` prior to destructuring inside the Composition API.

### 2. Directly Mutating Child Component Props
- **Symptom / Issue:** Generates console warnings and violates unidirectional data flow.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Emit events `emit('update:modelValue', value)` back to the parent component.

### 3. Omitting `.value` in Script Setup
- **Symptom / Issue:** Passes the wrapper Ref object instead of the underlying value into calculations.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Remember `.value` is mandatory in script blocks and auto-unwrapped in `<template>`.

---

## Summary

You have mastered computed caching, watch, and watchEffect. Next week, we examine component communication: Props, Emits, and custom v-model.
