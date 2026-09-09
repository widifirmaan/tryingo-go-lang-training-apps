# Provide/Inject & Teleport — Vue Shop Boards & Portals

> **Kategori:** Vue | **Level:** Intermediate | **Minggu 8:** Provide/Inject & Teleport
> **Prerequisites:** Week 7 — **Lifecycle & Watchers**.

## Learning Objectives

- `provide("shop", data)` board at parent + `inject("shop")` read in 10-deep child (no props!) (source: vuejs.org/guide/components/provide-inject)
- `<Teleport to="body">` portal popup to `body` (escapes tight parent CSS)

---

## Why This Matters (Non-IT)

Shop names used by 10 deep components → 10-level prop relay (1 forgotten = broken). With `provide/inject`, write 1x at top, read anywhere. Modals inside `overflow: hidden` get clipped → `Teleport` moves to `body`.

---

## Program: Boards & Portals

```vue
<!-- App.vue — mount board -->
<script setup>
import { ref, provide } from "vue";
const shop = ref({ name: "Siti", promo: "Free delivery" });
provide("shop", shop);
</script>
<template><router-view /></template>
```

```vue
<!-- Deep/Deep/Card.vue — 3 levels, no props! -->
<script setup>
import { inject } from "vue";
const shop = inject("shop");
</script>
<template><p>{{ shop.name }} — {{ shop.promo }}</p></template>
```

```vue
<!-- Modal.vue — portal out -->
<template>
  <button @click="open = true">Promo</button>
  <Teleport to="body">
    <div v-if="open" class="popup">10% off! <button @click="open = false">Close</button></div>
  </Teleport>
</template>
```

---

## Key Concepts

### `provide` / `inject` = Board / Read
`provide("shop", data)` at parent, `inject("shop")` in any child below.

### `<Teleport to="body">` = Portal
Moves rendering to `body` (out of squeezing parent CSS).

---

## Beginner Friendly Explanation

### Analogy: Notice Board & Magic Door
- **provide/inject = board**: write 1x in lobby, read on floor 10.
- **Teleport = magic door**: modal appears in `body` though coded inside a card.

### Step 0 — Prepare Device
- Same as Vue W1.

### How the Computer Reads It
1. `provide` stores in component context.
2. `inject` searches upward until found (not found → `undefined`! give default `inject("x", "def")`).

### 3 Must-Know Terms
1. **provide/inject**: board/read
2. **Teleport/to**: portal/target

---

## Experiments

- **Green:** `inject` at 3 levels without props → works?
- **Yellow:** `inject("wrong")` → `undefined`? Add default.
- **Red:** Modal without `Teleport` inside `overflow: hidden` → clipped? Wrap Teleport.

---

## Challenge

**Complete Board Shop:** `provide` shop + theme + 3-level `inject` + `Teleport` modal + change theme from child (provide a function!).
- **Link-up (Week 7 — Lifecycle & Watchers):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **provide/inject/Teleport**: board/read/portal

---

## Summary

Week 8 of 12: **Boards & Portals** (Level: Intermediate). No relay. **Intermediate Vue DONE!** Next: **Testing** (Advanced).
