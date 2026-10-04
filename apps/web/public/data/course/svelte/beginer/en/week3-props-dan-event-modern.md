# Modern Svelte 5 Components: $props, Fallbacks & Callback Functions

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Compiler Reactivity | **Minggu 3:** Modern Svelte 5 Components: $props, Fallbacks & Callback Functions
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Migrate from legacy export let declarations to the modern Svelte 5 $props() Rune
- Declare fallback prop defaults cleanly leveraging native JavaScript destructuring
- Replace cumbersome createEventDispatcher boilerplates with clean callback props (onTrigger)
- Inject dynamic CSS Custom Properties directly into styling blocks via style:--css-var directives
- Construct tactile audio buttons featuring low-latency visual feedback transitions

---

## Program: Synthesizer Drum Pad Button with Modern $props & Visual Feedback

```svelte
<!-- ===================================================================== -->
<!-- File: DrumPad.svelte (Komponen Pad Drum Modern Svelte 5)                 -->
<!-- ===================================================================== -->
<script>
  // 1. Svelte 5 $props: Menggantikan sintaks lama 'export let nama'
  // Destrukturisasi dengan nilai default langsung di dalam fungsi!
  let {
    label = "Kick",
    tombolShortcut = "Q",
    warnaAksen = "#ec4899",
    suaraSampleUrl = "",
    onTrigger = () => {} // Callback function menggantikan createEventDispatcher lama!
  } = $props();

  let isSedangDitekan = $state(false);

  function triggerPad() {
    isSedangDitekan = true;
    onTrigger({ label, waktu: Date.now() });

    setTimeout(() => {
      isSedangDitekan = false;
    }, 150);
  }
</script>

<button
  class="drum-pad"
  class:pressed={isSedangDitekan}
  style:--accent-color={warnaAksen}
  onclick={triggerPad}
>
  <span class="shortcut">[{tombolShortcut}]</span>
  <span class="label">{label}</span>
</button>

<style>
  .drum-pad {
    width: 100px;
    height: 100px;
    background: #18181b;
    border: 2px solid #27272a;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justifyContent: center;
    align-items: center;
    gap: 6px;
    transition: all 0.08s ease;
  }
  .drum-pad:hover { border-color: var(--accent-color); }
  .drum-pad.pressed {
    background: var(--accent-color);
    color: black;
    transform: scale(0.94);
    box-shadow: 0 0 16px var(--accent-color);
  }
  .shortcut { font-size: 11px; color: #a1a1aa; }
  .label { font-weight: bold; font-size: 14px; }
</style>
```

---

## Key Concepts

### Why Svelte 5 Deprecated `export let`
In legacy Svelte versions, props declared via `export let title = 'Default'`.
Using `export` baffled newcomers because standard JavaScript semantics imply exporting values out, whereas the component was **accepting values inward**.

In **Svelte 5**:
All incoming contracts resolve via the **`$props()`** Rune:
`let { title = "Default", active = false } = $props();`
This aligns with native JavaScript destructuring ergonomics with first-class TypeScript inference!

### Goodbye `createEventDispatcher`
In Svelte 5, the legacy `createEventDispatcher` package is obsolete.
Simply pass **plain callback functions** as props:
`<DrumPad onTrigger={(payload) => playSample(payload)} />`
Simpler, faster, and completely typed without runtime abstraction overhead.

---

---

## Beginner Friendly Explanation

### Analogy: Industrial Pushbuttons & Terminal Blocks
1. **$props** is the rear wiring terminal block of an industrial push button: labelled terminals accept 'LED Color' (*warnaAksen*) and 'Sample Source' (*suaraSampleUrl*).
2. **Callback onTrigger** is the relay signal wire: when an operator hits the button, the terminal emits a pulse to the master sequencer (*onTrigger executes*).

## Experiments

- Instantiate DrumPad with distinct accent colors (e.g. warnaAksen="#3b82f6") to observe dynamic styling.
- Click the pad observing tactile scale transitions and vibrant glow flashes.
- Bind a window keydown event triggering triggerPad() when keyboard letter Q is struck.
- Omit props from the parent to confirm default fallbacks populate flawlessly.

---

## Challenge

Build a 4x4 drum pad grid (16 pads) mapping unique percussion samples (Kick, Snare, HiHat, Clap) recording hit history into an array state.

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
```text
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
```text
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
```text
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
```text
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

You have mastered modern $props, fallbacks, and callback props. Next week, we examine Svelte 5 Snippets and control flow.
