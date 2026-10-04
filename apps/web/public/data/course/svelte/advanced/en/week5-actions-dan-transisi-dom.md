# Svelte Actions (use:action): Low-Level DOM Lifecycle & Rotary Knob Controls

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Synthesizer Capstone | **Minggu 5:** Svelte Actions (use:action): Low-Level DOM Lifecycle & Rotary Knob Controls
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Svelte Actions (use:action) as the canonical bridge for imperative DOM behaviors
- Author encapsulated Actions implementing full lifecycle contracts: mount, update, and destroy
- Construct tactile gesture-driven UI controls (rotary drag dials) for creative audio workflows
- Eliminate memory leak vulnerabilities by deregistering global window listeners inside destroy callbacks
- Synchronize reactive Svelte parameters with DOM Actions through the update() method

---

## Program: Synthesizer Rotary Knob Control with use:rotaryDrag Action

```svelte
<script>
  let cutoffFrekuensi = $state(1200); // 20 Hz - 20000 Hz

  // 1. Svelte Action: Fungsi siklus hidup DOM mandiri (node, parameter) => { update, destroy }
  function rotaryDrag(node, { min = 20, max = 5000, value, onChange }) {
    let startY = 0;
    let startVal = value;

    function onMouseDown(e) {
      startY = e.clientY;
      startVal = value;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(e) {
      const deltaY = startY - e.clientY; // Geser ke atas = naik, ke bawah = turun
      const step = (max - min) / 200;    // Sensitivitas drag
      let newVal = Math.min(max, Math.max(min, startVal + deltaY * step));
      onChange(Math.round(newVal));
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    node.addEventListener("mousedown", onMouseDown);

    return {
      update(newParams) {
        value = newParams.value;
      },
      destroy() {
        node.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }
    };
  }
</script>

<div class="knob-container">
  <h4>Filter Cutoff (Action Dial)</h4>

  <!-- 2. Penggunaan use:action pada elemen DOM -->
  <div
    class="knob-dial"
    use:rotaryDrag={{
      min: 100,
      max: 5000,
      value: cutoffFrekuensi,
      onChange: (val) => (cutoffFrekuensi = val)
    }}
    style:--rotasi={`${((cutoffFrekuensi - 100) / 4900) * 270 - 135}deg`}
  >
    <div class="pointer"></div>
  </div>

  <div class="val-display">{cutoffFrekuensi} Hz</div>
  <small style="color: #71717a;">* Klik & drag mouse ke atas/bawah</small>
</div>

<style>
  .knob-container {
    max-width: 260px;
    margin: 20px auto;
    font-family: sans-serif;
    text-align: center;
    background: #18181b;
    color: white;
    padding: 20px;
    border-radius: 12px;
  }
  .knob-dial {
    width: 80px;
    height: 80px;
    background: #27272a;
    border: 3px solid #3f3f46;
    border-radius: 50%;
    margin: 16px auto;
    position: relative;
    cursor: ns-resize;
    transform: rotate(var(--rotasi));
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.5);
  }
  .pointer {
    width: 4px;
    height: 18px;
    background: #38bdf8;
    position: absolute;
    top: 4px;
    left: calc(50% - 2px);
    border-radius: 2px;
  }
  .val-display { font-size: 20px; font-weight: bold; color: #38bdf8; }
</style>
```

---

## Key Concepts

### Understanding Svelte Actions
A Svelte Action is **an element-level lifecycle attachment declared via `use:actionName`**.
The Action receives the native HTML element handle (`node`) alongside parameter payloads.
Key strengths:
1. Bypasses bulky component wrapper wrappers.
2. Infinitely reusable: apply `use:rotaryDrag` to arbitrary DOM nodes.
3. Clean memory ergonomics: the `destroy()` hook fires automatically when the host node unmounts, guaranteeing flawless listener teardown.

---

---

## Beginner Friendly Explanation

### Analogy: Industrial Rotary Knobs on Valve Stems
**use:action** is fastening an ergonomic knurled metal dial directly onto an existing copper valve stem: you avoid rebuilding the furnace chassis (*no wrapper component needed*), simply anchoring the rotational interaction attachment (*use:rotaryDrag*) onto the native stem.

## Experiments

- Click and drag upward over the knob observing the pointer rotate clockwise reactively.
- Drag downward observing frequency values descend to the 100 Hz minimum bound.
- Inspect DevTools observing the inline CSS Variable --rotasi update during drags.
- Introduce custom drag sensitivity configuration parameters to the action.

---

## Challenge

Author a `use:longPress(duration, callback)` Action triggering an automated parameter reset to 1000 Hz when clicks hold beyond 1.5 seconds.

---

## Visual Mental Model & Architecture Flow

![Diagram Universal Signals & Svelte 5 Runes State Flow](/diagrams/react-data-flow.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ SVELTE 5 RUNES & FINE-GRAINED REACTIVITY                 │
│                                                          │
│  let count = $state(0) ──► Signal Primer                 │
│       │                                                  │
│       ▼                                                  │
│  let double = $derived(count * 2) ──► Komputasi Turunan  │
│       │                                                  │
│       ▼ (Hanya memperbarui node teks spesifik di DOM!)   │
│  <h1>{double}</h1> ◄── Tanpa Virtual DOM Overhead        │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `let count = $state(0)`
- **Core Functionality:** Rune state reaktif Svelte 5.
- **Parameters / Attributes:** `initialValue`.
- **System Behavior & Return:** Mendeklarasikan variabel reaktif murni tanpa pembungkus .value atau setter khusus..
- **Practical Code Example:**
```svelte
<script>
  let count = $state(0);
  function inc() { count += 1; }
</script>
<button onclick={inc}>Klik: {count}</button>
```
- **Expected Execution Output:**
```output
Tombol reaktif memperbarui angka count
```

### 2. `let double = $derived(count * 2)`
- **Core Functionality:** Rune komputasi turunan Svelte 5.
- **Parameters / Attributes:** `Expression`.
- **System Behavior & Return:** Otomatis menghitung ulang nilai turunan saat sinyal state primernya berubah..
- **Practical Code Example:**
```svelte
<script>
  let count = $state(4);
  let double = $derived(count * 2);
</script>
<p>Hasil: {double}</p>
```
- **Expected Execution Output:**
```output
Hasil: 8
```

### 3. `$effect(() => { ... })`
- **Core Functionality:** Rune efek samping reaktif.
- **Parameters / Attributes:** `Effect Callback`.
- **System Behavior & Return:** Menjalankan operasi DOM, API, atau timer saat state di dalamnya mengalami mutasi..
- **Practical Code Example:**
```svelte
<script>
  let count = $state(0);
  $effect(() => {
    console.log('Nilai terkini:', count);
  });
</script>
```
- **Expected Execution Output:**
```output
Mencetak log otomatis setiap count berubah
```

### 4. `bind:value={variable}`
- **Core Functionality:** Sinkronisasi input form dua arah.
- **Parameters / Attributes:** `Target state variable`.
- **System Behavior & Return:** Menautkan input form langsung ke state tanpa memerlukan event handler manual..
- **Practical Code Example:**
```svelte
<script>
  let name = $state('Tryngo');
</script>
<input bind:value={name} />
```
- **Expected Execution Output:**
```output
Perubahan input langsung mengalir ke state name
```

---

## Common Pitfalls & Debugging Tips

### 1. In-Place Array Mutation Without Assignment
- **Symptom / Issue:** Calling `arr.push()` fails to trigger reactive UI updates in Svelte.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Reassign the array reference: `arr = [...arr, newItem]` to signal reactivity.

### 2. Store Subscription Memory Leaks
- **Symptom / Issue:** Manual store subscriptions that are never cancelled consume memory indefinitely.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use Svelte auto-subscriptions with the `$` prefix (`$myStore`).

### 3. Runes State Boundaries
- **Symptom / Issue:** Passing reactive signals across module borders without `$state()` or `$derived()` signals.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use modern Svelte 5 runes consistently.

---

## Summary

You have mastered Svelte Actions and gesture DOM bindings. Next week, we examine Svelte Context and universal .svelte.js reactivity modules.
