# Component Communication: defineProps, defineEmits & Custom v-model

> **Kategori:** Vue | **Level:** Composition API, Reactivity & Components | **Minggu 3:** Component Communication: defineProps, defineEmits & Custom v-model
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Vue component communication topologies: Props Down, Events Up
- Deploy compiler macro defineProps() with strict type contracts and default fallbacks
- Leverage defineEmits() to dispatch custom semantic events up to parent boundaries
- Architect custom v-model bindings utilizing the modelValue prop and update:modelValue event conventions
- Eliminate direct child props mutation anti-patterns preserving immutable contracts

---

## Program: Inline-Editable CRM Lead Row Component with Custom v-model

```vue
<!-- ===================================================================== -->
<!-- File: EditableLeadRow.vue (Komponen Anak)                                -->
<!-- ===================================================================== -->
<script setup>
// 1. defineProps: Menerima data dari Parent dengan validasi tipe
const props = defineProps({
  id: { type: String, required: true },
  nama: { type: String, required: true },
  nilai: { type: Number, default: 0 },
  modelValue: { type: String, default: "" } // Standar nama prop untuk v-model
});

// 2. defineEmits: Mendeklarasikan event yang dapat dipancarkan ke Parent
const emit = defineEmits(["update:modelValue", "hapus-lead"]);

function onInputKomentar(e) {
  // Pancarkan event update:modelValue untuk sinkronisasi dua arah v-model
  emit("update:modelValue", e.target.value);
}
</script>

<template>
  <div style="display: flex; gap: 8px; align-items: center; padding: 8px; border-bottom: 1px solid #e2e8f0;">
    <span style="font-weight: bold; width: 140px;">{{ nama }}</span>
    <span style="color: #16a34a; width: 100px;">Rp {{ (nilai / 1000000).toFixed(0) }} Juta</span>
    
    <!-- Custom Two-Way Binding Input -->
    <input
      type="text"
      placeholder="Catatan status..."
      :value="modelValue"
      @input="onInputKomentar"
      style="flex: 1; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px;"
    />

    <button
      @click="emit('hapus-lead', id)"
      style="background: #fee2e2; color: #dc2626; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;"
    >
      Hapus
    </button>
  </div>
</template>
```

---

## Key Concepts

### Inter-Component Telemetry in Vue 3
Vue architectures follow the canonical **"Props Down, Events Up"** contract:
1. **Parent to Child**: Parents supply data downward via explicit props: `<LeadRow :nama="item.nama" :nilai="item.nilai" />`.
2. **Child to Parent**: Children **must never mutate incoming props directly**. When requesting modifications (e.g. deleting an item), the child emits an event upward via `emit('hapus-lead', id)`. The parent catches the notification via `@hapus-lead="processDeletion"`.

### Anatomy of Custom `v-model`
In Vue 3, declaring `<Component v-model="notes" />` expands sugar syntax into:
`<Component :modelValue="notes" @update:modelValue="val => notes = val" />`.
Declaring prop `modelValue` and dispatching `update:modelValue` endows bespoke components with native two-way binding ergonomics!

---

---

## Beginner Friendly Explanation

### Analogy: Command Directives & Tactical Radios
1. **Props (Command to Field)** are sealed mission orders issued by headquarters: field operatives carry the directive (*read-only*), prohibited from altering mission parameters on paper.
2. **Emits (Field to Command)** are push-to-talk tactical radio transmissions: operatives dispatch alerts (*emit*), streaming telemetry up to command who authorizes tactical responses.

## Experiments

- Type notes to observe parent state synchronize reactively via custom v-model pipelines.
- Click "Hapus" to verify deletion resolves cleanly at the parent tier via emit listeners.
- Attempt props.nama = "Tampered" in the child script to observe the strict mutation warning.
- Deploy argument syntax v-model:title="title" authoring multiple two-way bindings on a single component.

---

## Challenge

Build a `LeadRatingStar.vue` component receiving `modelValue: number` (1 to 5) rendering 5 clickable stars dispatching updated rating values via v-model.

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

You have mastered defineProps, defineEmits, and custom v-model bindings. Next week, we examine Lifecycle Hooks and Template Refs.
