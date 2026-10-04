# Svelte 5 Universal Reactivity: .svelte.js Modules & Context API

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 6:** Svelte 5 Universal Reactivity: .svelte.js Modules & Context API
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master universal reactivity within .svelte.js files: authoring reactive signal state outside component templates
- Architect object-oriented state stores leveraging modern ES6 classes armed with $state fields
- Deploy Svelte Context primitives (setContext and getContext) for hierarchical component tree injection
- Eliminate third-party state management dependencies across typical production architectures
- Synchronize global audio BPM tempo parameters uniformly across modular instrument tracks

---

## Program: Global Audio Engine State Store with .svelte.js & Svelte Context

```js
// ============================================================================
// File: audioState.svelte.js (Universal Reactivity di Luar Komponen!)
// ============================================================================
// Di Svelte 5, Runes ($state, $derived) DAPAT DIGUNAKAN DI FILE JS BIASA berakhiran .svelte.js!

class GlobalAudioEngine {
  bpm = $state(128);
  masterVolume = $state(0.8);
  isPlaying = $state(false);
  activeStep = $state(0);

  // $derived di dalam kelas JS murni
  tempoIntervalMs = $derived((60 / this.bpm / 4) * 1000); // 16th note interval

  togglePlayback() {
    this.isPlaying = !this.isPlaying;
  }

  setBpm(newBpm) {
    if (newBpm >= 60 && newBpm <= 240) {
      this.bpm = newBpm;
    }
  }

  incrementStep() {
    this.activeStep = (this.activeStep + 1) % 16;
  }
}

// Ekspor instance singleton global yang dapat diakses oleh komponen apapun
export const audioMaster = new GlobalAudioEngine();
```

---

## Key Concepts

### The `.svelte.js` Universal Reactivity Breakthrough
In legacy frameworks, reactivity remains tightly shackled to component render pipelines. Distributing state required specialized store primitives (`writable()`, `readable()`).
In **Svelte 5**:
Append the **`.svelte.js`** or **`.svelte.ts`** extension!
Within these modules, Runes like `$state()`, `$derived()`, and `$effect()` function natively.
You author plain object-oriented ES6 classes holding reactive fields, import instances into arbitrary views, and UI templates reconcile automatically when class properties mutate!

### Module Singletons vs Context Boundaries
- **`.svelte.js` Singletons**: Tailored for universally ambient application states (Master Audio Clock, Authentication claims).
- **Context API (`setContext` / `getContext`)**: Reserved for scoped sub-tree isolation (e.g. isolating track parameters within one Synthesizer rack without colliding with adjacent synth racks).

---

---

## Beginner Friendly Explanation

### Analogy: Orchestra Conductors & Master Metronomes
1. **`.svelte.js` Singletons** are the master stage metronome: an illuminated digital clock ticking tempo (*BPM $state*) positioned at center stage. Violins, brass, and percussionists (*independent components*) track the identical pulse in locked synchronization.
2. **Context API** is sheet music distributed exclusively to the string section: scoped privately to first violins without confusing percussionists across the stage.

## Experiments

- Import audioMaster into two separate .svelte components verifying bidirectional tempo synchronization.
- Invoke audioMaster.setBpm(140) observing tempoIntervalMs recalculate millisecond durations reactively.
- Execute audioMaster.incrementStep() within an interval timer watching activeStep cycle 0 to 15.
- Verify BPM boundary validation guards rejecting values below 60 or above 240.

---

## Challenge

Add a reactive `$state` array `trackList` into `GlobalAudioEngine` alongside `addTrack(name)` and `removeTrack(id)` methods operating with universal reactivity.

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

You have mastered universal .svelte.js reactivity and Svelte Context. Next week, we integrate the native Web Audio API for physical sound generation.
