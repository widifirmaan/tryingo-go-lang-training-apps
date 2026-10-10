# Transitions & Animations

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 9:** Transitions & Animations

## Tujuan Pembelajaran

- transition: directive untuk enter/leave
- in: dan out: untuk separate transitions
- Built-in transitions: fade, fly, slide, scale
- each block animations dengan animate:flip
- Custom transition functions

---

## Program: UI Animasi

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

## Konsep Kunci

### transition:
transition:name = same for in/out.

### in:/out:
Separate transitions.

### Built-in
fade, fly, slide, scale, blur, draw.

### animate:flip
Flip animation untuk reorder list.

---

## Eksperimen

- Buat page transition
- Implementasikan modal animation
- Buat staggered list animation
- Integrasikan spring motion

---

## Tantangan

Buat animated dashboard: page transitions, list animations, modal animations.

---

## Ringkasan

Minggu 9 dari 10: **Transitions & Animations** (Level: Menengah). Minggu depan: **Capstone Project**!
