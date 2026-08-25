# Components & Props — Split Shop into LEGO Bricks

> **Kategori:** Vue | **Level:** Beginner | **Minggu 4:** Components & Props

## Learning Objectives

- Split `App.vue` into `ProductCard.vue` + `Cart.vue` — 1 brick use 100x
- Send parent→child via **props** `defineProps<{ name: string }>`
- Child reports back via **emit** `defineEmits` + `@buy`
- `slot` for free content (like LEGO hole)
- `props` read-only, validation `required`, `default`

---

## Why This Matters (Non-IT)

Shop 50 products if all in `App.vue` → 500 messy lines. Split into `ProductCard` → `App` only `v-for="p in list" <Card :name="p.name" @buy="add" />` — neat, reusable elsewhere.

---

## Program: Catalog Split Components

```vue
<!-- src/components/ProductCard.vue — brick -->
<script setup>
const props = defineProps({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 10 }
});
const emit = defineEmits(["buy"]);
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 12px;">
    <h3>{{ name }}</h3>
    <p>Rp {{ price.toLocaleString("en-US") }} — Stock: {{ stock }}</p>
    <button @click="emit('buy', name)" :disabled="stock <= 0">
      {{ stock > 0 ? "Buy" : "Out" }}
    </button>
    <slot>Default if empty</slot>
  </div>
</template>

<!-- src/App.vue — arrange LEGO -->
<script setup>
import { ref } from "vue";
import ProductCard from "./components/ProductCard.vue";
const list = ref([{ id: 1, name: "Rice 5kg", price: 62000, stock: 5 }, { id: 2, name: "Spinach", price: 5000, stock: 0 }]);
const cart = ref([]);
function handleBuy(name) { cart.value.push(name); console.log("Buy:", name); }
</script>

<template>
  <div style="padding: 24px;">
    <h1>Shop — Components</h1>
    <div style="display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 12px;">
      <ProductCard v-for="p in list" :key="p.id" :name="p.name" :price="p.price" :stock="p.stock" @buy="handleBuy">
        <small style="color: gray;">Free delivery >100k</small>
      </ProductCard>
    </div>
    <p>Cart: {{ cart.join(", ") || "empty" }}</p>
  </div>
</template>
```

---

## Key Concepts

### `defineProps` = In Envelope
Child `ProductCard` receives `name, price` from parent. `required: true` must, `default: 10` if not sent.

### `defineEmits` = Report Back
Child `emit('buy', name)` → parent hears `@buy="handleBuy"` with `name`.

### `slot` = LEGO Hole
Parent writes `<Card>free content</Card>` → child shows `<slot />`.

### Props Read-Only
Child **don't** `props.price = 0` → wrong, parent changes.

---

## Beginner Friendly Explanation

### Analogy: Labeled LEGO Brick

- **Props = writing on brick**: `name="Rice"` sticker on brick.
- **Emit = bell**: child rings `buy` bell, parent hears.
- **Slot = empty box**: can fill anything.

---

## Experiments

- **Green:** Add `stock: 2` to 1 product → `Buy` active?
- **Yellow:** In `App` change `:stock="p.stock"` to `:stock="0"` all → all `Out`?
- **Red:** Child `props.name = "X"` → warning, don't mutate props.

---

## Challenge

**Full Shop:** Make `Cart.vue` receives `items: Array` via props, emits `remove`, in `App` arrange `ProductCard` + `Cart` side by side.

Done: 1 child `defineProps` + `defineEmits` + `slot`, parent `v-for` + `@event`.

---

## Mini Glossary

- **Props/Emits**: in/out
- **Slot**: free content

---

## Summary

Week 4: **Components** — split shop into LEGO. **Beginner Vue done!** Next: **Vue Router** — move pages without reload.
