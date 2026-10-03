# Svelte 5 Runes: $derived Computations & $effect Side Effects

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Compiler Reactivity | **Minggu 2:** Svelte 5 Runes: $derived Computations & $effect Side Effects
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Deploy the $derived Rune to calculate pure reactive derived expressions without manual sync
- Apply $derived.by(() => { ... }) for multiline conditional algorithmic blocks
- Master the $effect Rune to orchestrate side effects after the DOM reconciles
- Author cleanup teardown callbacks inside $effect preventing zombie audio oscillations
- Prevent redundant execution loops via Svelte automatic fine-grained dependency tracking

---

## Program: Musical Octave Calculator & Harmonic Frequency Spectrum with $derived

```svelte
<script>
  let nadaDasarHz = $state(220); // A3 (220 Hz)

  // 1. $derived: Nilai turunan otomatis (mirip computed di Vue / useMemo di React)
  // Tidak perlu tanda kurung fungsi, otomatis dihitung ulang saat nadaDasarHz berubah!
  let oktafAtas = $derived(nadaDasarHz * 2);      // A4 (440 Hz)
  let oktafBawah = $derived(nadaDasarHz / 2);     // A2 (110 Hz)
  let harmonikKelima = $derived(nadaDasarHz * 1.5); // Nada E

  // $derived.by: Untuk perhitungan multiline yang kompleks
  let labelKlasifikasiSuara = $derived.by(() => {
    if (nadaDasarHz < 150) return "Bass (Rendah Menggelegar)";
    if (nadaDasarHz < 350) return "Midrange / Tenor (Vokal Pria)";
    if (nadaDasarHz < 800) return "Alto / Soprano (Vokal Wanita)";
    return "Treble / High Pitch (Melengking)";
  });

  // 2. $effect: Menangani side effects (DOM luar, audio context, logging)
  $effect(() => {
    console.log(`[Audio Log] Nada dasar disetel ke: ${nadaDasarHz} Hz (Harmonik E: ${harmonikKelima} Hz)`);

    // Cleanup callback otomatis: Dipanggil saat nadaDasarHz berubah atau unmount
    return () => {
      // Membersihkan timer atau frekuensi sebelumnya jika diperlukan
    };
  });
</script>

<div class="octave-calculator">
  <h3>Penganalisis Harmonik & Spektrum Nada</h3>

  <div class="input-row">
    <label>Frekuensi Acuan: <strong>{nadaDasarHz} Hz</strong></label>
    <input type="range" min="55" max="880" step="5" bind:value={nadaDasarHz} />
  </div>

  <div class="classification-box">
    Klasifikasi Register: <strong>{labelKlasifikasiSuara}</strong>
  </div>

  <div class="grid-harmonics">
    <div class="card">
      <small>1 Oktaf Bawah</small>
      <div class="hz">{oktafBawah.toFixed(1)} Hz</div>
    </div>
    <div class="card active">
      <small>Nada Utama (Fundament)</small>
      <div class="hz">{nadaDasarHz} Hz</div>
    </div>
    <div class="card">
      <small>Harmonik ke-5 (Fifth)</small>
      <div class="hz">{harmonikKelima.toFixed(1)} Hz</div>
    </div>
    <div class="card">
      <small>1 Oktaf Atas</small>
      <div class="hz">{oktafAtas.toFixed(1)} Hz</div>
    </div>
  </div>
</div>

<style>
  .octave-calculator { max-width: 480px; margin: 20px auto; font-family: sans-serif; background: #09090b; color: white; padding: 20px; border-radius: 12px; }
  .input-row { margin-bottom: 16px; }
  .input-row input { width: 100%; }
  .classification-box { background: #27272a; padding: 10px; border-radius: 6px; font-size: 13px; color: #38bdf8; margin-bottom: 16px; text-align: center; }
  .grid-harmonics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .card { background: #18181b; padding: 12px; border-radius: 8px; border: 1px solid #27272a; text-align: center; }
  .card.active { border-color: #38bdf8; background: #032b44; }
  .card small { color: #a1a1aa; font-size: 11px; }
  .card .hz { font-size: 18px; font-weight: bold; margin-top: 4px; }
</style>
```

---

## Key Concepts

### Why `$derived` Replaced Legacy `$:` Labels
In Svelte 3 and 4, all derived reactivity overloaded JavaScript labels `$: doubled = count * 2`.
This syntax blurred boundaries between pure computations and side effects while making execution ordering ambiguous.

In **Svelte 5**:
1. **`$derived(expression)`**: Strictly dedicated to **pure derived values**. Evaluated lazily with zero overhead until dependencies diverge.
2. **`$effect(() => { ... })`**: Exclusively dedicated to **side effects** (audio nodes, window metrics, analytics). `$effect` executes purely client-side in the browser, omitting SSR passes.

---

---

## Beginner Friendly Explanation

### Analogy: Currency Conversion Sheets & Doorbell Chimes
1. **`$derived`** is a currency conversion table in your wallet: carrying 10 hundred-dollar bills (*state*) automatically yields 1,000 dollars (*derived*). The calculation exists as an organic consequence of the baseline asset.
2. **`$effect`** is an automated entry chime: when a visitor crosses the infrared sensor beam (*state changes*), the speaker rings a chime sound (*side effect*).

## Experiments

- Drag the reference frequency slider observing all 4 harmonic cards recalculate instantly.
- Shift pitch to 100Hz and observe the classification tag update reactively to Bass.
- Inspect DevTools console to observe $effect log statements stream on slider drags.
- Deploy $derived.by calculating Fibonacci pitch intervals across audio frequencies.

---

## Challenge

Author a `$derived` property `closestNoteName` mapping raw Hertz numbers to musical pitch notations (e.g. 440 Hz = "A4", 261.6 Hz = "C4").

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

You have mastered Svelte 5 $derived and $effect. Next week, we examine modern component communication with $props and function callbacks.
