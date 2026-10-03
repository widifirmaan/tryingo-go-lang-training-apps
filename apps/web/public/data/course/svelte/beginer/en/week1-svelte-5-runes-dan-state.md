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
