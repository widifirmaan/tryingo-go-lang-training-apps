# Capstone: Production 16-Step Audio Beat Sequencer & Synthesizer with Svelte 5

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 8:** Capstone: Production 16-Step Audio Beat Sequencer & Synthesizer with Svelte 5
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize the comprehensive Svelte 5 curriculum into a production-grade 16-step beat sequencer DAW
- Construct an adaptive audio sequencer clock delivering fluid BPM tempo modulation
- Drive native real-time drum synthesis (Kick, Snare, Hi-Hat) with ultra-low latency DAC output
- Optimize high-frequency 16-step visual cursor DOM updates with zero frame drops
- Deliver a studio-grade creative web application ready for Cloudflare Pages deployment

---

## Program: Full Beat Sequencer DAW with BPM Clock, Real-Time Audio Synthesis & Presets

```svelte
<!-- ===================================================================== -->
<!-- CAPSTONE PROJECT: SVELTE 5 INTERACTIVE 16-STEP BEAT SEQUENCER         -->
<!-- ===================================================================== -->
<script>
  import { onMount, onDestroy } from "svelte";

  // State Reaktif Utama (Svelte 5 Runes)
  let bpm = $state(124);
  let isPlaying = $state(false);
  let currentStep = $state(0);
  let audioContext = null;
  let timerId = null;

  // Matriks Sequencer 16-Langkah untuk 3 Instrumen
  let tracks = $state([
    {
      id: "kick",
      name: "Kick Drum",
      color: "#ec4899",
      steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]
    },
    {
      id: "snare",
      name: "Snare Crisp",
      color: "#38bdf8",
      steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false]
    },
    {
      id: "hihat",
      name: "Closed Hat",
      color: "#facc15",
      steps: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
  ]);

  // $derived: Interval durasi 1 langkah (1/16th note) dalam milidetik
  let stepIntervalMs = $derived((60 / bpm / 4) * 1000);

  // Inisialisasi Audio Context
  function getAudioCtx() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  // Sintesis Suara Drum Web Audio API
  function playSound(type) {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === "kick") {
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(1.0, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === "snare") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === "hihat") {
      osc.type = "square";
      osc.frequency.setValueAtTime(8000, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
  }

  function advanceStep() {
    currentStep = (currentStep + 1) % 16;
    
    // Picu suara jika step aktif pada track tersebut bernilai true
    tracks.forEach((track) => {
      if (track.steps[currentStep]) {
        playSound(track.id);
      }
    });

    if (isPlaying) {
      timerId = setTimeout(advanceStep, stepIntervalMs);
    }
  }

  function togglePlay() {
    getAudioCtx();
    isPlaying = !isPlaying;

    if (isPlaying) {
      advanceStep();
    } else {
      if (timerId) clearTimeout(timerId);
    }
  }

  function toggleCell(trackIdx, stepIdx) {
    tracks[trackIdx].steps[stepIdx] = !tracks[trackIdx].steps[stepIdx];
  }

  onDestroy(() => {
    if (timerId) clearTimeout(timerId);
  });
</script>

<div class="daw-workspace">
  <header class="daw-header">
    <div>
      <h2>Nusa Beats • Svelte 5 Sequencer</h2>
      <small>Web Audio Synthesis • Zero Virtual DOM</small>
    </div>

    <div class="transport-controls">
      <div class="tempo-box">
        <label>BPM: <strong>{bpm}</strong></label>
        <input type="range" min="80" max="160" bind:value={bpm} />
      </div>

      <button class="play-btn" class:playing={isPlaying} onclick={togglePlay}>
        {isPlaying ? "■ STOP" : "▶ PLAY"}
      </button>
    </div>
  </header>

  <main class="matrix-grid">
    {#each tracks as track, tIdx (track.id)}
      <div class="track-channel">
        <div class="track-info" style:--track-color={track.color}>
          <span class="indicator"></span>
          <strong>{track.name}</strong>
        </div>

        <div class="steps-row">
          {#each track.steps as isCellOn, sIdx}
            <button
              class="step-node"
              class:on={isCellOn}
              class:cursor={currentStep === sIdx}
              style:--active-color={track.color}
              onclick={() => toggleCell(tIdx, sIdx)}
            >
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </main>
</div>

<style>
  .daw-workspace {
    max-width: 720px;
    margin: 24px auto;
    font-family: system-ui, sans-serif;
    background: #09090b;
    color: #f4f4f5;
    padding: 24px;
    border-radius: 14px;
    border: 1px solid #27272a;
  }
  .daw-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 20px; }
  .daw-header h2 { margin: 0; color: #38bdf8; font-size: 20px; }
  .daw-header small { color: #71717a; }
  .transport-controls { display: flex; gap: 16px; align-items: center; }
  .tempo-box label { font-size: 12px; display: block; margin-bottom: 4px; }
  .play-btn {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background: #22c55e;
    color: black;
  }
  .play-btn.playing { background: #ef4444; color: white; }
  .track-channel { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .track-info { width: 120px; font-size: 13px; display: flex; align-items: center; gap: 8px; }
  .track-info .indicator { width: 8px; height: 8px; border-radius: 50%; background: var(--track-color); }
  .steps-row { display: grid; grid-template-columns: repeat(16, 1fr); gap: 4px; flex: 1; }
  .step-node {
    height: 36px;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.05s ease;
  }
  .step-node.on { background: var(--active-color); border-color: white; }
  .step-node.cursor { box-shadow: 0 0 10px #facc15; border-color: #facc15; }
</style>
```

---

## Key Concepts

### Capstone Beat Sequencer Architecture
This capstone underscores the definitive architectural advantages of Svelte 5:
1. **Zero-Virtual DOM High-Frequency Updates**: The sequencer clock ticks active step highlights every 120ms. In Virtual DOM frameworks, high-frequency diffing consumes CPU cycles. In Svelte 5, the compiler **surgically mutates target node classes without re-evaluating the parent tree**.
2. **Reactive BPM Clocks via `$derived`**: Adjusting the tempo slider recalculates `stepIntervalMs` intervals dynamically without synchronization boilerplate.
3. **Pure Mathematical Synthesis**: Synthesizes drum acoustics directly via Web Audio API oscillators, eliminating external MP3/WAV sample payload downloads.

### Ready for Next-Generation Interactive Web Applications
Congratulations! You have mastered the most efficient, elegant, and blazing-fast reactive web compilation technology in modern software engineering!

---

---

## Beginner Friendly Explanation

### Analogy: Antique Mechanical Cylinder Music Boxes
This Beat Sequencer functions like an antique mechanical music box:
1. **16-Step Matrix** is the rotating brass cylinder studded with steel pins: whenever a pin strikes a tuned comb tine (*step equals true*), an acoustic chime rings out (*Web Audio playSound*).
2. **BPM Slider** is the clockwork winding spring: tightening the governor speeds up cylinder rotation, accelerating the musical tempo seamlessly.

## Experiments

- Click "▶ PLAY" to experience the automated 124 BPM electronic drum rhythm loop through speakers.
- Click matrix step nodes toggling beats on and off to craft fresh rhythmic variations.
- Slide BPM to 140 accelerating playback tempo reactively.
- Record a Chrome DevTools Performance profile observing near-zero CPU consumption during playback thanks to Svelte compilation!

---

## Challenge

Add genre preset buttons ("House 4-on-the-Floor", "Trap Hip-Hop", "Drum & Bass") populating matrix steps with distinctive rhythm patterns on click.

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

Congratulations! You have completed the comprehensive Svelte 5 curriculum, culminating in a jaw-dropping, high-performance Web Audio Beat Sequencer DAW.
