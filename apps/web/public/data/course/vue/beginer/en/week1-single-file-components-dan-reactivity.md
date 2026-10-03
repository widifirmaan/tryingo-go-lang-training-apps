# Vue 3 Single File Components (.vue): <script setup>, ref vs reactive

> **Kategori:** Vue | **Level:** Composition API, Reactivity & Components | **Minggu 1:** Vue 3 Single File Components (.vue): <script setup>, ref vs reactive
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Vue 3 Single File Component architecture unifying template, script, and style blocks
- Adopt the concise <script setup> compiler sugar eliminating boilerplate export default wrappers
- Discern when to employ ref() (.value wrapping) versus reactive() (deep object proxies)
- Deploy core template directives: dynamic bindings (:), event listeners (@), and two-way models
- Enforce style encapsulation via scoped attributes preventing global CSS cascade pollution

---

## Program: Interactive CRM Lead Card with Composition Reactivity

```vue
<script setup>
import { ref, reactive } from "vue";

// 1. ref: Membungkus nilai primitif ke dalam objek reaktif (.value)
const judulKartu = ref("Lead Prospek Enterprise");
const sedangFollowUp = ref(false);

// 2. reactive: Membungkus objek data terstruktur secara mendalam (deep reactivity)
const lead = reactive({
  id: "LEAD-101",
  namaPerusahaan: "PT Nusa Teknologi Mandiri",
  kontakPerson: "Dewi Lestari",
  estimasiNilai: 85000000,
  status: "PROSPEK" // "PROSPEK" | "NEGOSIASI" | "DEAL" | "LOST"
});

function toggleFollowUp() {
  sedangFollowUp.value = !sedangFollowUp.value;
}

function naikkanStatus() {
  if (lead.status === "PROSPEK") lead.status = "NEGOSIASI";
  else if (lead.status === "NEGOSIASI") lead.status = "DEAL";
}
</script>

<template>
  <div class="lead-card" :class="{ 'highlight': sedangFollowUp }">
    <div class="header">
      <h3>{{ judulKartu }}</h3>
      <span class="badge" :data-status="lead.status">{{ lead.status }}</span>
    </div>

    <p class="company">{{ lead.namaPerusahaan }}</p>
    <p class="contact">PIC: <strong>{{ lead.kontakPerson }}</strong></p>
    <div class="value">Rp {{ lead.estimasiNilai.toLocaleString('id-ID') }}</div>

    <div class="actions">
      <button @click="toggleFollowUp">
        {{ sedangFollowUp ? "Selesai Kontak" : "Tandai Follow-Up" }}
      </button>
      <button @click="naikkanStatus" class="btn-primary" :disabled="lead.status === 'DEAL'">
        {{ lead.status === 'DEAL' ? "Sudah Deal ✓" : "Progres Status →" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.lead-card {
  max-width: 420px;
  margin: 20px auto;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: white;
  font-family: sans-serif;
  transition: all 0.2s ease;
}
.lead-card.highlight {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.header { display: flex; justify-content: space-between; align-items: center; }
.header h3 { margin: 0; font-size: 16px; }
.badge { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: bold; background: #e2e8f0; }
.badge[data-status="DEAL"] { background: #dcfce7; color: #15803d; }
.badge[data-status="NEGOSIASI"] { background: #fef3c7; color: #b45309; }
.company { font-weight: bold; font-size: 18px; margin: 12px 0 4px 0; }
.contact { font-size: 13px; color: #64748b; margin: 0 0 12px 0; }
.value { font-size: 20px; color: #0f172a; font-weight: bold; margin-bottom: 16px; }
.actions { display: flex; gap: 8px; }
button { padding: 8px 12px; border-radius: 4px; border: 1px solid #cbd5e1; cursor: pointer; }
.btn-primary { background: #0f172a; color: white; border: none; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
```

---

## Key Concepts

### Why Vue 3 Composition API & `<script setup>`
In legacy Vue 2 (Options API), components fragmented across disparate option blocks (`data`, `methods`, `computed`, `watch`). In large 500-line components, a single logical concern (such as checkout cart math) spanned 4 distant regions.
With **Composition API (`<script setup>`)**:
1. Code colocates by **feature concern**, rather than arbitrary syntax buckets.
2. The confusing JavaScript `this` contextual binding is entirely discarded.
3. Compiler performance excels with first-class TypeScript inference.

### Dissecting `ref` vs `reactive`
Reactivity in Vue 3 is orchestrated through **JavaScript ES6 Proxies**:
- **`ref(val)`**: Envelops any scalar or complex value inside a reactive container. Within `<script>`, properties mutate via `.value` (`isActive.value = true`). Inside `<template>`, Vue auto-unwraps references, so typing `{{ isActive }}` suffices.
- **`reactive(obj)`**: Strictly accepts objects or arrays. Access omits `.value` (`lead.status = 'DEAL'`). Warning: never destructure reactive objects (`const { status } = lead`) as destructuring severs Proxy tracking!

---

---

## Beginner Friendly Explanation

### Analogy: Self-Contained Townhomes & Smart Thermostats
1. **Single File Components (.vue)** are self-contained townhomes: `<template>` is the furnished parlor (visual layer), `<script>` is the electrical utility panel (logic), and `<style scoped>` is interior wallpaper completely isolated from the neighbor's wall.
2. **Reactivity (ref/reactive)** is a smart thermostat: when room temperature climbs one degree (*state mutation*), digital sensors trigger the condenser and update the LCD thermostat screen instantaneously (*DOM re-render*).

## Experiments

- Click "Tandai Follow-Up" to observe the reactive border outline trigger via conditional class binding.
- Advance status to DEAL to observe the button transition into a disabled state.
- Attempt mutating judulKartu omitting .value inside script to observe why reactivity breaks.
- Bind an input via v-model="lead.namaPerusahaan" inside template and witness two-way real-time data sync.

---

## Challenge

Add a `sumberLead` field ("WEBSITE" | "REFERRAL" | "COLD_CALL") into the reactive `lead` object, rendering distinct badges via `v-if` / `v-else-if` directives.

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

You have mastered Single File Components, <script setup>, ref vs reactive, and template directives. Next week, we examine Computed Properties and Watchers.
