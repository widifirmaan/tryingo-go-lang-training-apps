# Transitions & Animations

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 9:** Transitions & Animations

## Learning Objectives

- transition: for enter/leave
- in: and out: for separate transitions
- Built-in transitions: fade, fly, slide, scale
- each block animations with animate:flip
- Custom transition functions

---

## Program: Animated UI

```svelte
<!-- Svelte Transitions: built-in animation directives -->
<script>
  import { fade, fly, slide, scale, flip } from 'svelte/transition';
  let visible = true;
  let items = [1, 2, 3];
</script>
{#if visible}
  <div transition:fade={{ duration: 300 }}>Fade in/out</div>
  <div in:fly={{ y: -200 }} out:slide>Fly in, slide out</div>
{/if}
{#each items as item (item)}
  <div transition:scale>{{ item }}</div>
{/each}
```

---

## Key Concepts

### transition:
Same for in/out.

### in:/out:
Separate transitions.

### Built-in
fade, fly, slide, scale.

### animate:flip
Flip for list reorder.

---

## Experiments

- Create page transitions
- Implement modal animation
- Create staggered list animation
- Integrate spring motion

---

## Challenge

Build an animated dashboard: page transitions, list animations, modal animations.

---

## Summary

Week 9 of 10: **Transitions & Animations** (Level: Intermediate). Next week: **Capstone Project**!
