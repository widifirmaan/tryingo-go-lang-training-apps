# Directives & Events — Switches and Ears

> **Kategori:** Vue | **Level:** Beginner | **Minggu 3:** Directives & Events

## Learning Objectives

- `v-if / v-else / v-show` difference hide vs remove
- `v-for` with `:key` and `v-for` object ` (value, key) in obj`
- `@click`, `@input`, `@submit` + modifiers `.prevent`, `.number`, `.trim`
- `v-bind` shorthand `:` for class/style `:class="{ active: yes }"`
- `v-model` 2-way for full form

---

## Why This Matters (Non-IT)

Shop form: if `stock==0` hide Buy button, typing name → `v-model` saves, submit → `.prevent` no reload.

---

## Program: Full Shop Form

```vue
<script setup>
import { ref } from "vue";
const name = ref("");
const qty = ref(1);
const category = ref("staple");
const agree = ref(false);
const list = ref([]);
function submit() {
  if (!name.value.trim()) return;
  list.value.push({ id: Date.now(), name: name.value.trim(), qty: qty.value, category: category.value });
  name.value = ""; qty.value = 1;
}
</script>

<template>
  <form @submit.prevent="submit" style="display: grid; gap: 8; max-width: 320px;">
    <input v-model.trim="name" placeholder="Product name" />
    <input v-model.number="qty" type="number" min="1" />
    <select v-model="category"><option>staple</option><option>vegetable</option></select>
    <label><input type="checkbox" v-model="agree" /> Agree</label>
    <button :disabled="!agree || !name.trim()">Add</button>
  </form>
  <p v-if="list.length === 0" style="color: gray;">Empty</p>
  <ul v-else>
    <li v-for="item in list" :key="item.id" :class="{ bold: item.qty > 5 }">
      {{ item.name }} x{{ item.qty }} ({{ item.category }})
      <span v-show="item.qty > 10" style="color: red;"> — Bulk!</span>
    </li>
  </ul>
</template>

<style scoped>.bold { font-weight: bold; }</style>
```

---

## Key Concepts

### `v-if` vs `v-show`
- `v-if` = **remove** from DOM
- `v-show` = **hide** `display:none` (stay, fast toggle)

### `v-for` + `:key`
`v-for="item in list" :key="item.id"` — ID required.

### Modifiers
- `@submit.prevent` = no reload
- `v-model.number` = number, `v-model.trim` = trim

### `:class` Dynamic
`:class="{ active: isActive }"` or `:class="[active ? 'a' : 'b']"`

---

## Beginner Friendly Explanation

### Analogy: Light Switch

- **`v-if` = unplug lamp**: gone, no power.
- **`v-show` = cover cloth**: lamp there but covered.

---

## Experiments

- **Green:** `v-model.trim` type "  rice  " → `name` = "rice"?
- **Yellow:** `:disabled="!name"` → button disabled if empty?
- **Red:** Forget `:key` → warning, add.

---

## Challenge

**Shop Filter:** Input `search` + `select category` + `v-for="item in list.filter(...)"`, `v-if` if 0 results "None".

---

## Mini Glossary

- **v-if/show/for**: show
- **@/.prevent/.number/.trim**: event & modifiers

---

## Summary

Week 3: **Directives** — switches & ears. Next: **Components & Props** — split shop into LEGO bricks.
