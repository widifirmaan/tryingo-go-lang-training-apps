# Directives & Bindings

> Vue | Vue Foundations | Lesson 3

## Learning Objectives

- Bind dynamic attributes with v-bind (:)
- Use class & style bindings (object and array syntax)
- Render conditions with v-if / v-else / v-show
- Understand the v-if vs v-show difference

---

## Program: Directives & Bindings

```vue
<script setup>
import { ref } from 'vue'

const product = ref({
  name: 'Vue Mug',
  price: 120000,
  inStock: false,
})

const theme = ref('light')
const isMember = ref(true)
const discount = ref(15)
</script>

<template>
  <div :class="['card', theme === 'dark' ? 'card-dark' : 'card-light']">
    <h1>{{ product.name }}</h1>
    <p>Harga: Rp{{ product.price.toLocaleString('id-ID') }}</p>
    <p :style="{ color: product.inStock ? '#2e7d32' : '#c62828' }">
      {{ product.inStock ? 'Tersedia' : 'Stok habis' }}
    </p>
    <p v-if="isMember">Member: diskon {{ discount }}%</p>
    <p v-else>Belum jadi member.</p>
    <button @click="theme = theme === 'dark' ? 'light' : 'dark'">
      Ganti tema: {{ theme }}
    </button>
  </div>
</template>

<style scoped>
.card { border-radius: 12px; padding: 1.5rem; border: 1px solid #ddd; max-width: 360px; }
.card-light { background: #fff; color: #222; }
.card-dark { background: #1e1e1e; color: #eee; }
button { margin-top: 0.75rem; }
</style>

```

---

## Explanation

## v-bind (:)
`v-bind:attribute` or `:` binds an attribute to a JS expression. `:style="{ color: ... }"` and `:class="[...]"` are special forms: objects for per-property conditions, arrays to combine multiple classes.

## v-if / v-else / v-show
`v-if` REMOVES the element from the DOM when false; `v-show` only hides it (display:none) but the element stays. Rule of thumb: `v-if` for conditions that rarely change (cheaper), `v-show` for fast toggles.

## Writing Conditions
`v-else` must directly follow the `v-if` element with nothing in between. For many branches: `v-else-if`. Templates can hold complex expressions, but move them to computed when they get long.

## Trap: Static vs Dynamic Attributes
An attribute without `:` is a string literal ("theme", not the theme variable). Forgetting the colon is a classic bug: `class="theme"` binds the string "theme", not the class from a variable.

---

## Experiments

1. **v-bind (:)**
2. **v-if / v-else / v-show**
3. **Penulisan Kondisi**
4. **Jebakan: Atribut Statis vs Dinamis**

---

## Challenge

Build a product card with state: name, price, rating (1-5), promo status. Use v-if/v-else for a "PROMO" badge, :class for rating colors, and v-show for an "Add to cart" button that appears only when in stock.

---

## Summary

v-bind (:) for dynamic attributes. Class/style binding: object & array. v-if/v-else remove DOM; v-show hides. No ":" = string literal. Next: lists & events.
