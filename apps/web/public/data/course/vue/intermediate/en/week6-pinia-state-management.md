# Pinia: Modern Global State Management, Actions, Getters & DevTools

> **Kategori:** Vue | **Level:** Composables, Pinia & Vue Router | **Minggu 6:** Pinia: Modern Global State Management, Actions, Getters & DevTools
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand why Pinia replaced Vuex as the definitive official state store standard
- Construct Pinia Setup Stores leveraging modern composition syntax (ref as state, computed as getters)
- Author Actions encapsulating both synchronous mutations and asynchronous HTTP operations
- Consume and mutate store data from arbitrary components without prop drilling
- Leverage time-travel debugging and state inspection within official Vue DevTools

---

## Program: Global Sales Pipeline State Store with Pinia & Dynamic Getters

```js
// ============================================================================
// File: stores/salesPipeline.js (Pinia Setup Store Modern)
// ============================================================================
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Setup Store Syntax (Identik dengan gaya <script setup>)
export const usePipelineStore = defineStore("salesPipeline", () => {
  // 1. State (ref)
  const deals = ref([
    { id: "D-1", klien: "Telkom Digital", nominal: 250000000, stage: "QUALIFIED" },
    { id: "D-2", klien: "Astra International", nominal: 600000000, stage: "PROPOSAL" },
    { id: "D-3", klien: "Gojek Tokopedia", nominal: 180000000, stage: "WON" }
  ]);
  const filterTahap = ref("ALL");

  // 2. Getters (computed)
  const totalOmsetWon = computed(() => {
    return deals.value
      .filter((d) => d.stage === "WON")
      .reduce((sum, d) => sum + d.nominal, 0);
  });

  const dealsTerfilter = computed(() => {
    if (filterTahap.value === "ALL") return deals.value;
    return deals.value.filter((d) => d.stage === filterTahap.value);
  });

  // 3. Actions (functions)
  function geserStage(dealId, stageBaru) {
    const target = deals.value.find((d) => d.id === dealId);
    if (target) {
      target.stage = stageBaru;
    }
  }

  function tambahDeal(klien, nominal) {
    deals.value.push({
      id: `D-${Date.now()}`,
      klien,
      nominal: Number(nominal),
      stage: "QUALIFIED"
    });
  }

  return {
    deals,
    filterTahap,
    totalOmsetWon,
    dealsTerfilter,
    geserStage,
    tambahDeal
  };
});
```

---

## Key Concepts

### Why Pinia Replaced Legacy Vuex
Vuex suffered from verbose boilerplate: artificially bifurcating updates into synchronous *mutations* versus asynchronous *actions*, alongside poor TypeScript typing.
**Pinia** re-engineers global state:
1. **No Mutations**: Regular functions (*actions*) perform both immediate mutations and asynchronous I/O transparently.
2. **Setup Store Syntax**: Store definitions look identical to standard `<script setup>` components (`ref` = state, `computed` = getters, `function` = actions).
3. **Ultra Lightweight**: Weighs ~1KB with native support for modular code-splitting.

### Consuming Stores in Components
Inside any `.vue` component:
```vue
<script setup>
import { usePipelineStore } from '@/stores/salesPipeline';
const pipeline = usePipelineStore();
</script>
<template>
  <div>Closed Revenue: Rp {{ pipeline.totalOmsetWon }}</div>
</template>
```

---

---

## Beginner Friendly Explanation

### Analogy: Corporate Central Banking Ledger
1. **Local State (ref)** is pocket petty cash in each sales agent's wallet: the marketing manager cannot observe cash inside the lead developer's pocket.
2. **Pinia Store** is the centralized corporate treasury: all departments (sales, HR, finance) view the identical ledger balance. When sales closes a 1-billion contract, finance witnesses the capital balance surge on their monitors simultaneously.

## Experiments

- Invoke pipeline.tambahDeal("Unilever", 800000000) and verify deals increment across all components.
- Transition a deal stage to WON observing totalOmsetWon jump automatically via the Pinia getter.
- Open Vue DevTools to inspect the active Pinia state tree visually.
- Evaluate store reset semantics ($reset) and explore pinia-plugin-persistedstate for browser persistence.

---

## Challenge

Add a `deleteDeal(id)` action to `usePipelineStore` alongside a `calculateWinRate` getter computing the percentage of WON deals relative to total deals.

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

You have mastered Pinia global state management, getters, and actions. Next week, we examine Vue Router 4 and Navigation Guards.
