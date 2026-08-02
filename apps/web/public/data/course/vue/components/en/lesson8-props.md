# Props: One-Way Data Flow

> Vue | Components & Communication | Lesson 8

## Learning Objectives

- Pass data parent → child with props
- Declare props: types, required, defaults
- Understand props are read-only (one-way flow)
- Avoid mutating props

---

## Program: Props: One-Way Data Flow

```vue
<script setup>
import ProductCard from './components/ProductCard.vue'

const products = [
  { id: 1, name: 'Vue Mug', price: 120000, rating: 4.5 },
  { id: 2, name: 'Vue T-Shirt', price: 185000, rating: 5 },
  { id: 3, name: 'Stiker Vue', price: 15000, rating: 3 },
]
</script>

<template>
  <h1>Katalog</h1>
  <div class="grid">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :name="p.name"
      :price="p.price"
      :rating="p.rating"
    />
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
</style>

```

---

## Explanation

## One-Way Flow
Props flow down from parent to child. Parent data does NOT change when the child edits props (it is forbidden!). Feedback child → parent goes through emits (lesson 9).

## Declaring Props
Two styles: array (`['name']`) or object with spec (`{ name: { type: String, required: true } }`). The spec adds validation + documentation + defaults. Defaults only apply when the parent sends nothing.

## Trap: Mutating Props
`name = 'x'` inside the child is an anti-pattern (silently changing the parent's data). If the child needs a local initial value from a prop: copy it to a local ref. If it must change the real data: emit an event (next lesson).

## Tips: Variables vs Literals
In templates with kebab-case, PascalCase prop declarations become kebab in usage (`:productName` = `:product-name`). Static props without ":" are sent as string literals.

---

## Experiments

1. **Aliran Satu Arah**
2. **Deklarasi Props**
3. **Trap: Mutasi Props**
4. **Tips: Variabel vs Literal**

---

## Challenge

Build a movie list: App has a films array; FilmCard receives title, year, genre, rating, watched props. Add a required prop (title) and a default prop (year = 2024). Try mutating a prop in the child — watch the console warning.

---

## Summary

Props: parent → child, one-way, read-only. Declare with types/required/defaults. Mutating props = anti-pattern (emit instead). Next: emits.
