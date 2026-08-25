# Vue Basics — Shop with {{ }} Stickers

> **Kategori:** Vue | **Level:** Beginner | **Minggu 1:** Dasar Vue & Template Syntax

## Learning Objectives

- Vue like **magic stickers**: write `{{ name }}` in HTML, change `name` in JS → HTML auto updates
- Create `npm create vue@latest shop-vue` and run `npm run dev` at `localhost:5173`
- Use `{{ }}` for text, `v-bind` for attributes, `v-on` for clicks
- Difference `data` (box) vs `computed` (auto calculator) vs `method` (button)
- List with `v-for` and hide with `v-if`

---

## Why This Matters (Non-IT)

Vue most like plain HTML — no `className` or `useState`. Shop already knows HTML last week, just add `{{ price }}` alive. Friendliest for non-IT fearing braces.

---

## Program: Shop Catalog with Vue Stickers

`src/App.vue`

```vue
<script setup>
import { ref, computed } from "vue";
const shopName = ref("Siti's Shop");
const customer = ref("Budi");
const riceKg = ref(2);
const pricePerKg = ref(12500);
const total = computed(() => riceKg.value * pricePerKg.value);
const list = ref([{ id: 1, name: "Rice 5kg", price: 62000 }, { id: 2, name: "Spinach", price: 5000 }]);
function add() { list.value.push({ id: Date.now(), name: "Eggs 1kg", price: 28000 }); }
</script>

<template>
  <div style="padding: 24px;">
    <h1>{{ shopName }} 🥬</h1>
    <p>Hello {{ customer }}, total: Rp {{ total.toLocaleString("en-US") }}</p>
    <input v-model="customer" placeholder="Customer" />
    <button @click="riceKg++">+ Rice ({{ riceKg }}kg)</button>
    <button @click="riceKg--" :disabled="riceKg <= 0">−</button>
    <p v-if="total > 50000" style="color: green;">Free delivery!</p>
    <p v-else>Shop Rp {{ (50000 - total).toLocaleString("en-US") }} more for free delivery</p>
    <ul><li v-for="item in list" :key="item.id">{{ item.name }} — Rp {{ item.price.toLocaleString("en-US") }}</li></ul>
    <button @click="add">+ Add Eggs</button>
  </div>
</template>
```

> Run: `npm create vue@latest shop-vue` → Yes all → `cd shop-vue` → `npm install` → `npm run dev` → `http://localhost:5173` → replace `src/App.vue`.

---

## Key Concepts

### `{{ }}` = Auto Sticker
Write `{{ total }}` in HTML, change `total.value = 50000` in JS → HTML changes. No `getElementById`.

### `ref()` = Reactive Box
`const name = ref("Budi")` → read `name.value`, set `name.value = "Siti"`. `ref` for string/number.

### `computed` vs `method`
- `computed` = auto calculator, cached
- `method` = button, runs on click

### Directives `v-`
- `v-model="customer"` 2-way
- `v-bind` / `:` bind attribute `:disabled="riceKg<=0"`
- `v-on` / `@` ears `@click="add"`
- `v-if` / `v-for` show / repeat

---

## Beginner Friendly Explanation

### Analogy: Market Price Stickers

- **`{{ price }}` = price sticker**: write once `{{ total }}`, change number in warehouse (`total` computed), all shelf stickers auto change.
- **`ref` = magic box**: `riceKg = ref(2)` box 2, `riceKg.value++` → 3 → `{{ riceKg }}` 3.
- **`v-model` = 2-way string**: type in input → `customer` changes.
- **`v-for` = photocopy**: `v-for="item in list"` copy `<li>` per list.

---

## Experiments

- **Green:** Change `shopName = ref("Andi Shop")` → title?
- **Yellow:** `v-model` change `customer` to "Siti" → `Hello Siti` auto?
- **Red:** Forget `.value` → `riceKg++` fails, need `riceKg.value++` in script, but in template `{{ riceKg }}` auto.

---

## Challenge

**Mini Catalog:** Add `ref discount = 10` and `computed discounted = total * (1 - discount/100)`, show `{{ discounted }}` + input `v-model.number="discount"`. Button `Discount +5%` → `discount.value +=5`.

Done: 1 `ref`, 1 `computed`, 1 `v-model`, 1 `v-for` with `:key`.

---

## Mini Glossary

- **SFC**: Single File Component `.vue`
- **ref/computed**: reactive
- **v-model/bind/on**: directives
- **Vite**: dev server

---

## Summary

Week 1 of 12: **Vue Basics** (Level: Beginner). `{{ }}` closest to HTML. Next: **Reactivity** — `reactive`, `watch`, Composition API.
