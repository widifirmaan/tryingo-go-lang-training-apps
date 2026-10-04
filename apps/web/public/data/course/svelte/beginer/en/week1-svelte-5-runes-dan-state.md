# Svelte 5 Runes: Zero-Virtual DOM Architecture & Reactive $state

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Compiler Reactivity | **Minggu 1:** Svelte 5 Runes: Zero-Virtual DOM Architecture & Reactive $state
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Svelte compiler architecture: transforming declarative templates into surgical direct DOM mutations without Virtual DOM overhead
- Master the core Svelte 5 Runes paradigm: universal reactive state declaration via $state()
- Deploy bind:value for zero-boilerplate two-way data binding across sliders, selects, and inputs
- Utilize clean conditional class directives class:active={condition}
- Recognize why Svelte achieves industry-leading bundle footprints and runtime execution speeds

---

## Program: Audio Oscillator Tone Generator with Svelte 5 $state

```svelte
<script>
  // 1. Svelte 5 Runes: $state menggantikan let variabel reaktif lama
  let frekuensi = $state(440); // 440 Hz = Nada A4 standar konser
  let volume = $state(0.5);    // 0.0 sampai 1.0
  let jenisGelombang = $state("sine"); // "sine" | "square" | "sawtooth" | "triangle"
  let isMenyala = $state(false);

  function toggleAudio() {
    isMenyala = !isMenyala;
  }

  function setPresetFrekuensi(hz) {
    frekuensi = hz;
  }
</script>

<div class="synth-panel">
  <header>
    <h2>Osilator Audio Svelte 5</h2>
    <span class="status-indicator" class:active={isMenyala}>
      {isMenyala ? "● SUARA AKTIF" : "○ Hening"}
    </span>
  </header>

  <div class="control-group">
    <label>Frekuensi: <strong>{frekuensi} Hz</strong></label>
    <input type="range" min="100" max="2000" step="10" bind:value={frekuensi} />
  </div>

  <div class="control-group">
    <label>Volume: <strong>{Math.round(volume * 100)}%</strong></label>
    <input type="range" min="0" max="1" step="0.05" bind:value={volume} />
  </div>

  <div class="control-group">
    <label>Bentuk Gelombang:</label>
    <select bind:value={jenisGelombang}>
      <option value="sine">Sine (Murni & Lembut)</option>
      <option value="square">Square (Retro 8-Bit Chiptune)</option>
      <option value="sawtooth">Sawtooth (Tajam & Agresif)</option>
      <option value="triangle">Triangle (Hangat)</option>
    </select>
  </div>

  <div class="presets">
    <button onclick={() => setPresetFrekuensi(261.63)}>C4 (Do)</button>
    <button onclick={() => setPresetFrekuensi(329.63)}>E4 (Mi)</button>
    <button onclick={() => setPresetFrekuensi(392.00)}>G4 (Sol)</button>
    <button onclick={() => setPresetFrekuensi(440.00)}>A4 (La)</button>
  </div>

  <button class="toggle-btn" class:playing={isMenyala} onclick={toggleAudio}>
    {isMenyala ? "Hentikan Osilator" : "Nyalakan Nada"}
  </button>
</div>

<style>
  .synth-panel {
    max-width: 440px;
    margin: 20px auto;
    font-family: system-ui, sans-serif;
    padding: 20px;
    background: #18181b;
    color: #f4f4f5;
    border-radius: 12px;
    border: 1px solid #27272a;
  }
  header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  h2 { margin: 0; font-size: 18px; color: #38bdf8; }
  .status-indicator { font-size: 12px; color: #71717a; font-weight: bold; }
  .status-indicator.active { color: #4ade80; }
  .control-group { margin-bottom: 14px; }
  label { display: block; font-size: 13px; margin-bottom: 6px; }
  input[type="range"], select { width: 100%; box-sizing: border-box; }
  .presets { display: flex; gap: 6px; margin-bottom: 16px; }
  .presets button { flex: 1; padding: 6px; background: #27272a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
  .toggle-btn { width: 100%; padding: 12px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; background: #38bdf8; color: #09090b; }
  .toggle-btn.playing { background: #ef4444; color: white; }
</style>
```

---

## Key Concepts

### Svelte Rewrites the Paradigm: Zero Virtual DOM
React and Vue rely on a *Virtual DOM*: reconciling memory tree representations on every state modification before committing DOM mutations.
**Svelte is not a browser runtime framework; it is a COMPILER.**
During compilation, Svelte converts declarative components into surgical, pinpoint JavaScript instructions directly mutating affected DOM nodes.
Output: Zero Virtual DOM memory consumption, zero runtime framework weight, and raw vanilla JavaScript performance!

### The Svelte 5 Revolution: Runes (`$state`)
Svelte 5 introduces **Runes** (declarative compiler directives prefixed with `$`).
- `let x = $state(0)`: Declares that variable `x` is an explicit reactive signal.
- Unlike Svelte 4 where reactivity was confined strictly to `.svelte` files, Svelte 5 Runes function universally across plain `.svelte.js` modules!

---

---

## Beginner Friendly Explanation

### Analogy: Precision Formula Cars vs Crane Trucks
1. **Virtual DOM Frameworks** resemble heavy industrial crane trucks: to adjust a single brick on a wall, engineers operate a diesel crane mechanism (*reconciliation diffing pass*).
2. **Svelte (Compiler)** is a master mason equipped with a precision chisel: walking directly to the target brick, swapping it in milliseconds with zero mechanical overhead.

## Experiments

- Drag the Frequency slider to witness real-time scalar updates via reactive $state bindings.
- Click preset buttons (e.g. A4 440Hz) and observe the range slider track reactively.
- Switch waveform to "sawtooth" inspecting stored state values.
- Inspect Svelte build outputs to confirm the complete absence of a Virtual DOM runtime library.

---

## Challenge

Add a reactive slider bound to `$state(0)` governing `detune` parameters spanning -100 to +100 pitch cents.

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

You have mastered Svelte compiler mechanics and reactive $state Runes. Next week, we examine $derived and $effect.
