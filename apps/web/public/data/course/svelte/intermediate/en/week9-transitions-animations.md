# Transitions & Animations — Smooth Svelte Shop (svelte.dev)

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 9:** Transitions & Animations
> **Prerequisites:** Week 8 — **Lifecycle & Context**.

## Learning Objectives

- `fade` fade, `slide` slide, `flip` move — `in:slide` enter, `out:fade` exit, `animate:flip` slide positions (source: svelte.dev/docs/svelte/svelte-transition)

---

## Why This Matters (Non-IT)

Product lists adding/removing instantly vanish → harsh. With `slide` + `fade` + `flip`, adds slide smoothly, removes fade — the shop feels premium.

---

## Program: Smooth Svelte List (svelte.dev)

```svelte
<script>
  import { slide, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  let list = [{ id: 1, name: "Rice" }];
  function add(){ list = [...list, { id: Date.now(), name: "Spinach" }]; }
  function remove(id){ list = list.filter(p => p.id !== id); }
</script>

<button on:click={add}>Add Spinach</button>
<ul>
  {#each list as item (item.id)}
    <li in:slide out:fade animate:flip>
      {item.name} <button on:click={() => remove(item.id)}>Remove</button>
    </li>
  {/each}
</ul>
```

**Source:** `svelte.dev/docs/svelte/svelte-transition` — `fade(node, {delay, duration})`, `slide(node, {axis})`.

---

## Key Concepts

### `in:`/`out:`/`animate:`
- `in:slide` slides on enter, `out:fade` fades on exit, `animate:flip` on position moves.

### `slide` vs `fade`
`slide` slides default `axis: "y"`, `fade` opacity.

---

## Beginner Friendly Explanation

### Analogy: Smooth Shop

- **`slide` = sliding drawer**: slides in, slides out.
- **`fade` = dimming lamp**: brightens in, fades out.
- **`flip` = position slide**: list glides smoothly on add/remove.

### Step 0 — Prepare Device

`npm create svelte@latest` + `npm run dev` on `5173` (done in W1).

### How the Computer Reads It

1. `in:slide` → Svelte animates `translate` as the `li` enters.
2. `out:fade` → animates `opacity` as the `li` exits.

### 3 Must-Know Terms

1. **in:/out:/animate:**: enter/exit/move
2. **slide/fade/flip**: slide/fade/shift

---

## Experiments

- **Green:** Change `in:slide` to `in:fade` → fades in?
- **Yellow:** Remove `animate:flip` → list moves harshly?
- **Red:** `out:slide` without `in:slide` → slides out, enters instantly?

---

## Challenge

**Complete Smooth Shop:** `{#each list as item (item.id)}` + `in:slide` + `out:fade` + `animate:flip`, add/remove `list`, `npm run dev` smooth screenshot.
- **Link-up (Week 8 — Lifecycle & Context):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **slide/fade/flip**: slide/fade/shift

---

## Summary

Week 9 of 12: **Smooth** — `slide`/`fade`/`flip`. Next: **Capstone**.
