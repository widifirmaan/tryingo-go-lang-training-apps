# Transitions & Animations

## Learning Objectives

- transition: for enter/leave
- in: and out: for separate transitions
- Built-in transitions: fade, fly, slide, scale
- each block animations with animate:flip
- Custom transition functions

---

## Program: Transitions, Animations & Motion

Built-in transitions (fade, fly), spring & tweened, and the FLIP animate directive for reordering.

```svelte
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { spring, tweened, cubicOut } from 'svelte/motion';
  import { flip } from 'svelte/animate';

  let visible = $state(true);
  let items = $state(['alpha', 'beta', 'gamma']);
  let progress = tweened(0, { duration: 400, easing: cubicOut });
  let pos = spring({ x: 0, y: 0, stiffness: 0.3, damping: 0.8 });
  progress.set(100);
</script>

{#if visible}
  <div transition:fade={{ duration: 200 }}>Fading out</div>
  <div in:fly={{ y: 20, duration: 300 }}>Flying in from below</div>
{/if}
<button onclick={() => visible = !visible}>Toggle</button>

<ul>
  {#each items as item (item)}
    <li animate:flip={{ duration: 250 }}>{item}</li>
  {/each}
</ul>
<button onclick={() => items = items.slice().reverse()}>
    Reverse order (FLIP animation)
</button>

<progress value={progress} max="100"></progress>
```

---

## Key Concepts

### In/out/custom transitions

transition: == enter+exit BOTH, in:/out: masing-masing arah. Parameters: duration, delay, easing (cubicOut).

### FLIP animate

animate:flip bekerja dengan keyed {#each}: Kalau order berubah, bersih rekruten (first last invert) animasi DOM reorder ikut alernative leadership.

### tweened vs spring

tweened menginterpolasi A→B dalam durasi tertentu; spring bergerak dengan fisika (stiffness/damping). Spring untuk drag, tweened untuk progress.

### CSS vs JS animasi

Untuk hover/active state, normal CSS animations & transitions sudah cukup; transitions Svelte untuk enter/exit DOM yang makin kompling.

---

## Experiments

- Replace fade with scale at 600ms duration.
- Tweak spring stiffness/damping and compare the settle behavior.
- Add an item to the list while it animates - measure smoothness.

---

## Challenge

Write a modal using transition:fly that closes on overlay click; verify enter/exit choreography.

---

## Summary

This week's material has been covered: Transitions, Animations & Motion. Continue to the following week to deepen.
