# Snippets ({#snippet}), {@render} & Control Flow ({#if}, {#each}, {#await})

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Compiler Reactivity | **Minggu 4:** Snippets ({#snippet}), {@render} & Control Flow ({#if}, {#each}, {#await})
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Svelte 5 Snippets ({#snippet}) replacing legacy slot transclusion mechanisms
- Deploy the {@render snippetName(args)} directive rendering parameterized local templates
- Master core control flow directives: {#if}, {#each item, index (key)}, and {#await promise}
- Enforce keyed identity within {#each} collections guaranteeing surgical DOM performance
- Construct an interactive 16-step sequencer matrix driving reactive $state array mutations

---

## Program: 16-Step Audio Sequencer Matrix with Svelte 5 Snippets & Control Flow

```svelte
<script>
  let stepAktif = $state(0);
  let isSedangPlay = $state(false);

  // Matriks 16-Langkah untuk 3 Track Suara: Kick, Snare, Hi-Hat
  let tracks = $state([
    { id: "t1", nama: "Kick Drum", steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false] },
    { id: "t2", nama: "Snare", steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false] },
    { id: "t3", nama: "Closed Hat", steps: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true] }
  ]);

  function toggleStep(trackIndex, stepIndex) {
    tracks[trackIndex].steps[stepIndex] = !tracks[trackIndex].steps[stepIndex];
  }
</script>

<!-- 1. Svelte 5 Snippet: Template reusable lokal (menggantikan <slot> lama) -->
{#snippet tombolStep(trackIdx, stepIdx, aktif)}
  <button
    class="step-btn"
    class:active={aktif}
    class:current-play={stepAktif === stepIdx}
    onclick={() => toggleStep(trackIdx, stepIdx)}
  >
  </button>
{/snippet}

<div class="sequencer-matrix">
  <header>
    <h3>Matriks 16-Langkah Sequencer</h3>
    <span>Langkah Berjalan: <strong>#{stepAktif + 1}</strong></span>
  </header>

  <!-- 2. Blok Kontrol {#each} dengan Key Unik (track.id) -->
  {#each tracks as track, tIdx (track.id)}
    <div class="track-row">
      <span class="track-name">{track.nama}</span>
      <div class="steps-grid">
        {#each track.steps as isNyala, sIdx}
          <!-- 3. {@render}: Me-render snippet yang telah didefinisikan -->
          {@render tombolStep(tIdx, sIdx, isNyala)}
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .sequencer-matrix { max-width: 640px; margin: 20px auto; font-family: sans-serif; background: #18181b; color: white; padding: 16px; border-radius: 10px; }
  header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-size: 14px; }
  .track-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .track-name { width: 90px; font-size: 12px; font-weight: bold; color: #a1a1aa; }
  .steps-grid { display: grid; grid-template-columns: repeat(16, 1fr); gap: 4px; flex: 1; }
  .step-btn {
    height: 32px;
    background: #27272a;
    border: 1px solid #3f3f46;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.1s;
  }
  .step-btn.active { background: #38bdf8; border-color: #0284c7; }
  .step-btn.current-play { box-shadow: 0 0 8px #facc15; border-color: #facc15; }
</style>
```

---

## Key Concepts

### The Svelte 5 Snippets Architecture
In previous Svelte releases, duplicating markup templates within the same view mandated authoring separate `.svelte` files or fighting rigid `<slot>` semantics.
**Svelte 5 delivers `{#snippet}` and `{@render}`**:
```svelte
{#snippet mySnippet(param)}
  <div>Hello {param}!</div>
{/snippet}

{@render mySnippet('Budi')}
```
Snippets accept arguments, pass down through props to children, and render arbitrary declarative structures with zero boilerplate!

### Canonical Control Flow Matrix:
1. `{#if condition} ... {:else} ... {/if}`: Conditional template branching.
2. `{#each list as item, i (item.id)}`: List iterations. **Mandating `(item.id)`** guarantees surgical reconciliation.
3. `{#await promise} ... {:then res} ... {:catch err} ... {/await}`: Direct template Promise consumption eliminating manual `loading` booleans!

---

---

## Beginner Friendly Explanation

### Analogy: Batik Fabric Stamps & Cookie Cutters
1. **`{#snippet}`** is an artisan batik copper stamp: you carve the floral rosette pattern once into the metal plate (*snippet definition*).
2. **`{@render}`** is pressing the stamp 16 times across a silk canvas (*render execution*): patterns reproduce with millimeter precision, and altering the rosette alters every stamped impression across the sheet.

## Experiments

- Click matrix step nodes observing active cyan lighting toggle instantaneously.
- Increment stepAktif from 0 to 1, 2, 3 observing the yellow playback highlight sweep horizontally.
- Append a fourth percussion track "Hand Clap" to the tracks state array.
- Evaluate inline asynchronous data resolution leveraging the template {#await} block.

---

## Challenge

Add a "Clear Grid" action resetting all track step nodes back to `false` via immutable array mapping.

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

You have mastered Snippets, @render, and control flow. Next week, we enter Level 2: Svelte Actions and Web Audio API.
