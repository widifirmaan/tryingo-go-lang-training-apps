# Testing Vue — Real Card Taste-Test

> **Kategori:** Vue | **Level:** Advanced | **Minggu 9:** Testing Vue Components
> **Prerequisites:** Week 8 — **Provide/Inject & Teleport**.

## Learning Objectives

- `npm install -D vitest @vue/test-utils` + `mount(Card, { props: { name: "Rice" } })` + `expect(wrapper.text()).toContain("Rice")` for real (source: test-utils.vuejs.org + vitest.dev)

---

## Why This Matters (Non-IT)

Without tests, editing `Card` → missing price found by customers. With `mount` + `expect`, edit → red → fix. `console.log` simulation isn't machine-checked!

---

## Program: Real Card Taste-Test

```bash
npm install -D vitest @vue/test-utils jsdom @vitejs/plugin-vue
```

```javascript
// vitest.config.js — MANDATORY 2 things: .vue plugin + fake DOM!
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue"; // without it: "Failed to parse .vue"!

export default defineConfig({
  plugins: [vue()],
  test: { environment: "jsdom" }, // without it: "document is not defined"!
});
```

```vue
<!-- Card.vue -->
<template>
  <div class="card"><h3>{{ name }}</h3><p>Rp {{ price }}</p></div>
  <button @click="emit('buy', name)">Buy</button>
</template>
<script setup>
defineProps({ name: String, price: Number });
const emit = defineEmits(["buy"]);
</script>
```

```javascript
// Card.test.js — for real!
import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import Card from "./Card.vue";

test("shows name and price", () => {
  const w = mount(Card, { props: { name: "Rice", price: 62000 } });
  expect(w.text()).toContain("Rice");
  expect(w.text()).toContain("62000");
});

test("BUY click sends event", async () => {
  const w = mount(Card, { props: { name: "Rice", price: 1 } });
  await w.find("button").trigger("click");
  expect(w.emitted("buy")[0]).toEqual(["Rice"]);
});
```

```bash
npx vitest run  # GREEN for real (not echo!)
```

---

## Key Concepts

### `mount` + `props` = Mount Mock Card
`mount(Card, { props })` truly renders in `jsdom`.

### `expect(text()).toContain` = Taste Text
Checks output, not `console.log`.

### `trigger("click")` + `emitted()` = Click & Listen
Mock click + check bell sent.

---

## Beginner Friendly Explanation

### Analogy: Mystery Shopper
- **mount = mock store**, **expect = taste**, **trigger = ring bell**.

### Step 0 — Prepare Device
- `npm install -D vitest @vue/test-utils jsdom` + `npx vitest run`.

### How the Computer Reads It
1. `mount` → renders `Card` to fake DOM.
2. `expect(...).toContain(...)` → match? Green : red + line.

### 3 Must-Know Terms
1. **mount/props/trigger**: mount/send/press

---

## Experiments

- **Green:** Change `name` to "Sugar" → test red? Fix it.
- **Yellow:** Delete 1 `expect` → still green (under-tasted)?
- **Red:** File without `.test.js` → not run? Rename.

---

## Challenge

**Tested Card:** `name` + `price` + `Buy` button → 3 tests (text, price, event) GREEN + screenshot.
- **Link-up (Week 8 — Provide/Inject & Teleport):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **mount/expect/trigger**: mount/taste/press

---

## Summary

Week 9 of 12: **Real Tasting** (Level: Advanced). No simulation. Next: **Performance**.
