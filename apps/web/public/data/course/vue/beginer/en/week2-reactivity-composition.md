# Reactivity & Composition — Smart Boxes Following Each Other

> **Kategori:** Vue | **Level:** Beginner | **Minggu 2:** Reactivity & Composition API

## Learning Objectives

- Difference `ref` (box for number/text) vs `reactive` (box for object/list)
- Use `computed` for auto calc (total, discount) cached
- Watch with `watch` (guard watching CCTV)
- Write logic in `setup` / `<script setup>` grouped per feature (composition)

---

## Why This Matters (Non-IT)

Shop cart: `qty` changes → `total` must follow without manual call. `computed` = auto cashier. `watch` = alarm "if total > 100k, free delivery" without button.

---

## Program: Reactive Cart

```vue
<script setup>
import { ref, reactive, computed, watch } from "vue";
const customer = ref("Budi");
const cart = reactive([{ id: 1, name: "Rice", price: 62000, qty: 1 }, { id: 2, name: "Spinach", price: 5000, qty: 2 }]);
const total = computed(() => cart.reduce((s, i) => s + i.price * i.qty, 0));
const freeDelivery = computed(() => total.value > 100000);
watch(customer, (n, o) => console.log(`Customer ${o} → ${n}`));
function add(id) { const it = cart.find(i => i.id === id); if (it) it.qty++; }
function remove(id) { const idx = cart.findIndex(i => i.id === id); if (idx !== -1) cart.splice(idx, 1); }
</script>

<template>
  <div style="padding: 24px;">
    <input v-model="customer" placeholder="Name" />
    <p>Hello {{ customer }}, total: Rp {{ total.toLocaleString("en-US") }}</p>
    <p v-if="freeDelivery" style="color: green;">🎉 Free delivery!</p>
    <div v-for="item in cart" :key="item.id" style="display: flex; gap: 8; margin: 8px 0;">
      <span>{{ item.name }} x{{ item.qty }}</span>
      <button @click="add(item.id)">+</button>
      <button @click="remove(item.id)">Remove</button>
    </div>
  </div>
</template>
```

---

## Key Concepts

### `ref` vs `reactive`
- `ref(0)` for primitive, `.value` in script, auto in template
- `reactive({ name: "Budi" })` for object/array, direct `cart.push()` no `.value`

### `computed` = Cached Calculator
Only recalc if `cart` changes. Faster than `method`.

### `watch` = CCTV
`watch(customer, (n, o) => ...)` runs each `customer` change. `watchEffect` auto.

### Composition = Group per Feature
`<script setup>` groups `cart` + `total` + `add/remove` together.

---

## Beginner Friendly Explanation

### Analogy

- **`reactive` = shopping cart**: put apple, cashier total auto updates (computed).
- **`watch` = alarm**: if total >100k, bell free delivery.

---

## Experiments

- **Green:** `cart.push({id:3,name:"Eggs",price:28000,qty:1})` → total?
- **Yellow:** `watch(total, v => console.log("New total", v))`
- **Red:** `reactive` then `cart.value.push` → error, reactive no `.value`.

---

## Challenge

**Reactive Delivery:** `weight = ref(2)`, `distance = ref(5)`, `delivery = computed(() => weight.value*5000 + distance.value*2000)`, show `{{ delivery }}` + 2 inputs `v-model.number`. `watch(delivery, v => if(v>50000) alert("Expensive"))`.

---

## Mini Glossary

- **ref/reactive**: reactive
- **computed/watch**: calc & watch

---

## Summary

Week 2: **Reactivity** — smart boxes follow. Next: **Directives & Events** — `v-if/v-for` and `@click`.
