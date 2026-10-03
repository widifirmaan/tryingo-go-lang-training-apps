# Teleport Modals, <TransitionGroup> Animations & shallowRef Tuning

> **Kategori:** Vue | **Level:** Advanced Slots, Animations, Optimization & CRM Capstone | **Minggu 9:** Teleport Modals, <TransitionGroup> Animations & shallowRef Tuning
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Diagnose stacking context z-index clipping bugs and resolve them via <Teleport>
- Port modal overlays and sliding drawers cleanly into document body targets
- Deploy <Transition> to choreograph element enter/leave cycles with CSS transition states
- Apply <TransitionGroup> orchestrating smooth item additions, deletions, and layout reshuffling
- Optimize massive dataset performance using shallowRef() bypassing deep proxy instantiation

---

## Program: CRM Teleport Modal Drawer & Smooth Animated Pipeline List

```vue
<script setup>
import { ref, shallowRef } from "vue";

const isModalBuka = ref(false);

// shallowRef: Hanya melacak perubahan referensi tingkat atas (.value = baru), menghemat komputasi pada array 10.000 data
const listLeads = shallowRef([
  { id: 1, nama: "PT Telkom Akses", nilai: "Rp 150 Jt" },
  { id: 2, nama: "PT Bank Mandiri", nilai: "Rp 500 Jt" },
  { id: 3, nama: "PT Indofood CBP", nilai: "Rp 320 Jt" }
]);

function hapusItem(id) {
  // Karena shallowRef, kita wajib membuat salinan array baru untuk memicu reaktivitas
  listLeads.value = listLeads.value.filter((item) => item.id !== id);
}

function tambahCepat() {
  const baru = { id: Date.now(), nama: "Lead Baru Prospek", nilai: "Rp 100 Jt" };
  listLeads.value = [baru, ...listLeads.value];
}
</script>

<template>
  <div style="max-width: 480px; margin: 20px auto; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <h3>Pipeline Leads Aktif</h3>
      <div>
        <button @click="tambahCepat" style="margin-right: 6px; padding: 6px 10px; cursor: pointer;">+ Tambah</button>
        <button @click="isModalBuka = true" style="background: #0f172a; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
          Buka Drawer
        </button>
      </div>
    </div>

    <!-- TransitionGroup: Menghidupkan animasi penambahan, penghapusan, dan pergeseran list secara otomatis -->
    <TransitionGroup name="list" tag="ul" style="list-style: none; padding: 0; margin: 0;">
      <li
        v-for="item in listLeads"
        :key="item.id"
        style="padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; background: white;"
      >
        <span>{{ item.nama }} ({{ item.nilai }})</span>
        <button @click="hapusItem(item.id)" style="color: red; border: none; background: none; cursor: pointer;">✕</button>
      </li>
    </TransitionGroup>

    <!-- Teleport: Memindahkan elemen modal keluar dari hierarki DOM komponen ke <body> langsung -->
    <Teleport to="body">
      <div v-if="isModalBuka" style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: flex-end; z-index: 9999;">
        <div style="width: 320px; background: white; height: 100%; padding: 20px; box-shadow: -2px 0 8px rgba(0,0,0,0.2);">
          <h3>Drawer Pengaturan CRM</h3>
          <p style="font-size: 13px; color: #64748b;">Modal ini di-teleport langsung ke &lt;body&gt; agar tidak terjebak z-index parent!</p>
          <button @click="isModalBuka = false" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Tutup Drawer
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Animasi Transisi Halus untuk List */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

---

## Key Concepts

### Why `<Teleport>` Is Critical for Overlays
When embedding dialog modals inside child containers governed by `overflow: hidden` or `transform`, dialogs get clipped or submerged behind sibling components (*the z-index stacking trap*).
`<Teleport to="body">` **relocates the physical HTML output of the modal directly beneath `<body>`**, while retaining component logic, scope, and reactivity bindings!

### Choreographed Animations via `<TransitionGroup>`
Vue provides class-based animation pipelines:
1. `name-enter-from` -> `name-enter-to`
2. `name-leave-from` -> `name-leave-to`
When removing items, Vue injects transition utility classes and calculates layout shifts (*FLIP animation heuristics*), rendering smooth animations without heavy third-party animation engines.

### High-Throughput Tuning with `shallowRef`
When managing datasets exceeding 10,000 entities, deep `ref()` instantiates thousands of nested Proxy interceptors.
`shallowRef()` bounds reactivity strictly to the `.value` root pointer, yielding up to an 80% reduction in memory overhead.

---

---

## Beginner Friendly Explanation

### Analogy: Teleportation Portals & Orderly Queue Lines
1. **`<Teleport>`** is an architectural portal: you activate a switch inside a tiny bedroom (*child component*), but the doorway opens into an expansive city square (*document body*), allowing an enormous pavilion (*modal dialog*) to erect unobstructed by bedroom walls.
2. **TransitionGroup** is an orderly boarding queue: when the lead traveler steps forward, trailing passengers slide into position smoothly rather than instantly popping across space.

## Experiments

- Open Elements tab in DevTools, click "Buka Drawer", and observe the modal div mount directly under <body>.
- Delete an item to observe the smooth rightward slide transition governed by TransitionGroup.
- Click "+ Tambah" to witness the fresh entry slide in smoothly from the top.
- Compare shallowRef vs deep ref behavior when attempting in-place property mutations.

---

## Challenge

Implement a smooth backdrop fade transition utilizing `<Transition name="fade">` when the modal drawer toggles.

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

You have mastered Teleport, TransitionGroup animations, and shallowRef tuning. Next week is our Capstone Project: Enterprise CRM Dashboard.
