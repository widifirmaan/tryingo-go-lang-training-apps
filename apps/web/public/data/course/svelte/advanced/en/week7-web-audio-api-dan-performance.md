# Web Audio API: AudioContext, OscillatorNode, GainNode & Sample-Accurate Timing

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 7:** Web Audio API: AudioContext, OscillatorNode, GainNode & Sample-Accurate Timing
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Web Audio API audio-graph node topologies: Sources (Oscillators) -> Modifiers (Gain) -> Destination
- Handle browser Autoplay policies cleanly by resuming AudioContext upon initial user interaction
- Design dynamic pitch envelopes deploying exponentialRampToValueAtTime for punchy drum synthesis
- Eliminate digital audio pops and clicks with precise exponential gain decay envelopes
- Achieve sample-accurate audio scheduling utilizing hardware-locked audioCtx.currentTime clocks

---

## Program: Physical Sound Synthesis Engine with Web Audio API & Gain Automation

```js
// ============================================================================
// File: utils/audioSynthesis.js (Mesin Sintesis Suara Nyata Web Audio API)
// ============================================================================

let audioCtx = null;

// Inisialisasi AudioContext (Wajib dipicu oleh interaksi klik pengguna pertama kali)
export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Sintesis Suara Drum Tendang (Kick Drum Synthesizer via Pitch Drop)
export function mainkanKickDrum(waktuMulai = 0) {
  const ctx = getAudioContext();
  const startTime = waktuMulai || ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Pitch envelope: Dari 150 Hz meluncur cepat ke 0.01 Hz dalam 0.3 detik (efek dentuman punch)
  osc.frequency.setValueAtTime(150, startTime);
  osc.frequency.exponentialRampToValueAtTime(0.01, startTime + 0.3);

  // Gain envelope: Menurun tajam mencegah suara meletup (click artifact)
  gain.gain.setValueAtTime(1.0, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + 0.3);
}

// 2. Sintesis Suara Snare Drum (Noise Synthesizer + Triangle Tone)
export function mainkanSnareDrum(waktuMulai = 0) {
  const ctx = getAudioContext();
  const startTime = waktuMulai || ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, startTime);
  osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.15);

  gain.gain.setValueAtTime(0.7, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + 0.15);
}
```

---

## Key Concepts

### The Web Audio API Modular Graph
Modern browsers ship with an industrial digital signal processing engine: the **Web Audio API**.
Core paradigm: the **Audio Routing Node Graph**:
1. **Source Nodes**: `createOscillator()` emits periodic mathematical waveforms.
2. **Processing Nodes**: `createGain()` modulates amplitude (volume).
3. **Audio Destination**: `audioCtx.destination` routes directly to physical DACs and speakers.
Nodes chain like physical 1/4-inch patch cables: `osc.connect(gain).connect(destination)`.

### Sample-Accurate Timing vs Sloppy JS Timers
Vanilla JavaScript timers (`setTimeout`, `setInterval`) suffer jitter under heavy main-thread work.
The Web Audio API maintains an independent hardware-locked timeline: **`audioCtx.currentTime`**, executing on a high-priority audio thread with microsecond fidelity!

---

---

## Beginner Friendly Explanation

### Analogy: Electric Guitars & Stage Stompboxes
The Web Audio API matches a professional guitarist's stage rig:
1. **Oscillator** is the vibrating magnetic guitar string (*waveform source*).
2. **GainNode** is the volume/overdrive stompbox pedal on the pedalboard (*amplitude envelope*).
3. **Destination** is the 100-watt stage amplifier (*physical speaker cones*).
Quarter-inch cables patch guitar string -> pedal effect -> amplifier cabinet.

## Experiments

- Invoke mainkanKickDrum() from a button click to hear real bass drum synthesis pump through speakers.
- Shift initial kick pitch from 150 Hz to 300 Hz creating 80s synth-pop kick tones.
- Invoke mainkanSnareDrum() experiencing crisp snare percussion strikes.
- Explore authoring a melodic lead synthesizer tuned across minor pentatonic scales.

---

## Challenge

Author a `mainkanHiHat(isOpen)` synthesizer: if isOpen is true, decay gain across 0.4s (Open Hi-Hat); if false, clip abruptly at 0.05s (Closed Hi-Hat).

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

You have mastered the Web Audio API, drum envelope synthesis, and currentTime scheduling. Next week is our Capstone Project: 16-Step Audio Beat Sequencer.
