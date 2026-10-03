# Web Audio API: AudioContext, OscillatorNode, GainNode & Sample-Accurate Timing

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 7:** Web Audio API: AudioContext, OscillatorNode, GainNode & Sample-Accurate Timing

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

## Summary

You have mastered the Web Audio API, drum envelope synthesis, and currentTime scheduling. Next week is our Capstone Project: 16-Step Audio Beat Sequencer.
