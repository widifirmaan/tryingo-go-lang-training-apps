# Lifecycle Hooks: onMounted, onUnmounted & Template Refs (useTemplateRef)

> **Kategori:** Vue | **Level:** Composition API, Reactivity & Components | **Minggu 4:** Lifecycle Hooks: onMounted, onUnmounted & Template Refs (useTemplateRef)
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the sequential lifecycle stages of Vue components: onMounted, onUpdated, onUnmounted
- Acquire imperative DOM element handles safely via Template Refs (useTemplateRef)
- Initialize WebSocket streams and recurring polling timers within the onMounted phase
- Prevent catastrophic memory leaks by tearing down timers and subscriptions inside onUnmounted
- Avoid premature direct DOM queries prior to DOM mounting completion

---

## Program: Real-Time CRM Activity Stream with Interval Polling & DOM Autofocus

```vue
<script setup>
import { ref, onMounted, onUnmounted, useTemplateRef } from "vue";

const aktivitasList = ref([]);
const inputRef = useTemplateRef("inputAktivitasBaru"); // Vue 3.5+ Template Ref API
const teksAktivitas = ref("");
let timerPolling = null;

// 1. onMounted: Dijalankan setelah komponen terpasang di DOM browser
onMounted(() => {
  console.log("[Lifecycle] Komponen CRM Activity mounted. Memulai polling...");
  
  // Fokuskan kursor otomatis ke elemen input tanpa library pihak ketiga
  inputRef.value?.focus();

  // Simulasi polling data aktivitas baru setiap 4 detik
  timerPolling = setInterval(() => {
    const waktu = new Date().toLocaleTimeString("id-ID");
    aktivitasList.value.unshift({
      id: Date.now(),
      pesan: `Panggilan keluar ke klien pada ${waktu}`,
      tipe: "CALL"
    });
    // Batasi 5 riwayat teratas
    if (aktivitasList.value.length > 5) aktivitasList.value.pop();
  }, 4000);
});

// 2. onUnmounted: Pembersihan memori saat komponen dihancurkan (mencegah memory leak)
onUnmounted(() => {
  console.log("[Lifecycle] Membersihkan interval timer polling CRM.");
  if (timerPolling) clearInterval(timerPolling);
});

function kirimCatatan() {
  if (!teksAktivitas.value.trim()) return;
  aktivitasList.value.unshift({
    id: Date.now(),
    pesan: teksAktivitas.value,
    tipe: "MANUAL"
  });
  teksAktivitas.value = "";
  inputRef.value?.focus();
}
</script>

<template>
  <div style="max-width: 450px; margin: 20px auto; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
    <h3>Umpan Aktivitas Sales Real-Time</h3>

    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <input
        ref="inputAktivitasBaru"
        type="text"
        v-model="teksAktivitas"
        placeholder="Catat aktivitas manual..."
        style="flex: 1; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px;"
        @keyup.enter="kirimCatatan"
      />
      <button @click="kirimCatatan" style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
        Kirim
      </button>
    </div>

    <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
      Status: <span style="color: green;">● Polling Otomatis Aktif (4s)</span>
    </div>

    <ul style="list-style: none; padding: 0; margin: 0;">
      <li
        v-for="item in aktivitasList"
        :key="item.id"
        style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-size: 13px; display: flex; justify-content: space-between;"
      >
        <span>{{ item.pesan }}</span>
        <span style="font-size: 10px; background: #e2e8f0; padding: 2px 6px; border-radius: 3px;">{{ item.tipe }}</span>
      </li>
    </ul>
  </div>
</template>
```

---

## Key Concepts

### The Vue 3 Component Lifecycle Pipeline
Components progress through deterministic lifecycle milestones:
1. **Setup Phase**: Logic in `<script setup>` initializes. Reactive state binds, yet **browser DOM nodes do not yet exist!** (Never execute query selectors here).
2. **`onMounted()`**: Component markup commits to the browser DOM. The prime opportunity to: autofocus inputs, trigger network fetches, or mount external canvases (Chart.js, Leaflet).
3. **`onUpdated()`**: Fires following state mutations after the DOM reconciles.
4. **`onUnmounted()`**: Component prunes from memory. **You must clear intervals, global window listeners, and open sockets** to prevent memory accumulation.

### Modern Template Refs (`useTemplateRef`)
In Vue 3.5+, access DOM nodes declaratively with `useTemplateRef('refIdentifier')`. This returns a typed ref populating with the native DOM element instance upon completion of the `onMounted` lifecycle step.

---

---

## Beginner Friendly Explanation

### Analogy: Live Theatrical Productions
1. **`<script setup>`** is backstage dressing room rehearsal: actors review scripts (*state*), invisible to audience view.
2. **`onMounted`** is the curtain opening: stage lighting illuminates, actors step onto the stage floor (*DOM ready*), and the live orchestra plays the opening score (*polling timer*).
3. **`onUnmounted`** is the final curtain fall: musicians pack instruments and shut off power feeds (*clearInterval*) preventing unnecessary overnight utility consumption.

## Experiments

- Load the view to observe the input autofocus imperatively without user clicks via template ref.
- Wait 4 seconds to observe real-time activity entries stream in from the simulated polling loop.
- Unmount the component to verify the onUnmounted hook logs timer cleanup in the dev console.
- Deploy the onUpdated hook to benchmark when DOM reconciliations finalize.

---

## Challenge

Deploy `useTemplateRef` to enforce automatic downward scrolling whenever fresh activity arrives via `element.scrollTop = element.scrollHeight`.

---

## Visual Mental Model & Architecture Flow

![Diagram Reaktivitas Komponen & Data Flow Vue](/diagrams/react-data-flow.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ PROXY REAKTIVITAS VUE 3                                  │
│                                                          │
│  State: ref(0) / reactive({...})                         │
│       │                                                  │
│       ▼ (Trigger Mutation)                               │
│  Effect Dependency Tracker                               │
│       │                                                  │
│       ▼                                                  │
│  Virtual DOM Diffing & Patching ──► Real DOM Re-render   │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const count = ref(0)`
- **Core Functionality:** State reaktif primitif Vue 3.
- **Parameters / Attributes:** `initialValue`.
- **System Behavior & Return:** Membungkus nilai ke dalam Reactive Ref. Di script diakses via `.value`, di template otomatis di-unwrap..
- **Practical Code Example:**
```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
</script>
```
- **Expected Execution Output:**
```text
Nilai count bertambah secara reaktif
```

### 2. `const double = computed(() => count.value * 2)`
- **Core Functionality:** Komputasi nilai turunan ber-cache.
- **Parameters / Attributes:** `Getter function`.
- **System Behavior & Return:** Menghitung nilai baru secara otomatis hanya ketika dependensi reaktifnya berubah..
- **Practical Code Example:**
```vue
<script setup>
import { ref, computed } from 'vue';
const count = ref(5);
const double = computed(() => count.value * 2);
</script>
```
- **Expected Execution Output:**
```text
double otomatis bernilai 10
```

### 3. `defineProps<{ title: string }>()`
- **Core Functionality:** Declaration of kontrak Props komponen anak.
- **Parameters / Attributes:** `Generic Type Schema`.
- **System Behavior & Return:** Menerima kiriman data dari parent komponen dengan validasi tipe statis..
- **Practical Code Example:**
```vue
<script setup>
defineProps<{
  title: string;
  inStock?: boolean;
}>();
</script>
```
- **Expected Execution Output:**
```text
Komponen siap menerima atribut title dari parent
```

### 4. `v-model="message"`
- **Core Functionality:** Two-way data binding dua arah.
- **Parameters / Attributes:** `Target state variable`.
- **System Behavior & Return:** Menghubungkan nilai elemen input form dengan state JavaScript secara sinkron..
- **Practical Code Example:**
```vue
<template>
  <input v-model="username" placeholder="Ketik nama..." />
  <p>Halo, {{ username }}</p>
</template>
```
- **Expected Execution Output:**
```text
Input teks sinkron seketika ke paragraf tampilan
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

You have mastered lifecycle hooks onMounted/onUnmounted and DOM template refs. Next week, we enter Level 2: Composables and Pinia State Management.
