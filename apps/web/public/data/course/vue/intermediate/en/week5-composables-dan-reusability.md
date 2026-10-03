# Modern Composables: Stateful Reusable Logic Extraction (useSalesLeads)

> **Kategori:** Vue | **Level:** Composables, Pinia & Vue Router | **Minggu 5:** Modern Composables: Stateful Reusable Logic Extraction (useSalesLeads)
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the Composable design philosophy in Vue 3 equivalent to React Custom Hooks
- Follow canonical Composable naming conventions (mandatory `use` prefix, e.g. useSalesLeads)
- Encapsulate reactive state slices (leads, loading, error) and mutations inside cohesive modules
- Consume identical Composables across disparate components with zero code duplication
- Preserve reactive Proxy integrity when destructuring Composable return values

---

## Program: CRM Lead Fetcher Composable with Async State & Error Handling

```js
// ============================================================================
// File: composables/useSalesLeads.js (Composable Logic Ber-State Mandiri)
// ============================================================================
import { ref } from "vue";

export function useSalesLeads() {
  const leads = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchLeads() {
    loading.value = true;
    error.value = null;

    try {
      // Simulasi latency jaringan 800ms
      await new Promise((r) => setTimeout(r, 800));

      leads.value = [
        { id: "L1", nama: "PT Sinarmas Agro", nilai: 120000000, tahap: "DEAL" },
        { id: "L2", nama: "Bank Syariah Nusantara", nilai: 450000000, tahap: "NEGOSIASI" },
        { id: "L3", nama: "Startup EduTech Maju", nilai: 75000000, tahap: "PROSPEK" }
      ];
    } catch (err) {
      error.value = "Gagal menyinkronkan data leads dari server.";
    } finally {
      loading.value = false;
    }
  }

  function tambahLead(leadBaru) {
    leads.value.unshift({ id: `L-${Date.now()}`, ...leadBaru });
  }

  function hitungTotalPipeline() {
    return leads.value.reduce((total, item) => total + item.nilai, 0);
  }

  // Kembalikan state dan fungsi aksi dalam bentuk objek
  return {
    leads,
    loading,
    error,
    fetchLeads,
    tambahLead,
    hitungTotalPipeline
  };
}
```

---

## Key Concepts

### Understanding Vue 3 Composables
In modern Vue architecture, **a Composable is a function leveraging Vue Composition APIs to encapsulate and distribute stateful logic**.
Prior to Composables, developers relied on *Mixins*, infamous for silent property collisions and obfuscated data origins.

### Advantages of Composables:
1. **Explicit Lineage**: Output states and actions declare with complete transparency: `const { leads, loading } = useSalesLeads()`.
2. **Collision-Free Ergonomics**: You can rename properties during destructuring: `const { leads: clientList } = useSalesLeads()`.
3. **Hierarchical Composability**: Composables seamlessly nest within other composables (e.g. `useSalesLeads` orchestrating `useLocalStorage`).

---

---

## Beginner Friendly Explanation

### Analogy: Standardized Spice Sachets
1. **Without Composables**, kitchen staff across 10 franchise branches hand-measure salt, pepper, and spices from raw jars for every single order (repetitive, human error prone).
2. **Composables** are sealed factory spice sachets: quality control blends the recipe into a convenient packet (*useSalesLeads*). Any franchise cook tears open the sachet into the pan, guaranteeing flawless, identical culinary output.

## Experiments

- Import useSalesLeads into a .vue SFC, trigger fetchLeads() in onMounted, and display the loading spinner.
- Invoke hitungTotalPipeline() confirming accurate total pipeline valuation math.
- Instantiate the composable within two independent components to verify state isolation.
- Chain useSalesLeads with useLocalStorage to persist lead drafts to the browser cache.

---

## Challenge

Author a `useDebouncedSearch(initialQuery, delay)` composable exporting `query` and `debouncedQuery` governed by an automated debounce timer.

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

You have mastered authoring modern Composables for business logic reuse. Next week, we examine Global State Management with Pinia.
