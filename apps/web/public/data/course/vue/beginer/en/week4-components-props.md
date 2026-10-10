# Components & Props

> **Kategori:** Vue | **Level:** Beginner | **Minggu 4:** Components & Props

## Learning Objectives

- Create and register components
- Props: definition, type validation, required, default
- Emits: custom events from child to parent
- One-way data flow: parent -> child via props
- Slots: dynamic content inside components

---

## Program: Product Components

```vue
// Components = reusable UI building blocks
const { createApp, ref } = Vue;
const ProductCard = {
  props: { name: { type: String, required: true }, price: { type: Number, required: true }, isAvailable: { type: Boolean, default: true } },
  emits: ['add-to-cart'],
  template: '<div><h3>{{ name }}</h3><p>Rp {{ price.toLocaleString("id-ID") }}</p><button @click="$emit('add-to-cart', name)" :disabled="!isAvailable">Tambah</button></div>',
};
const app = createApp({
  components: { ProductCard },
  setup() {
    const products = ref([{ name: 'Laptop', price: 15000000, isAvailable: true }, { name: 'Mouse', price: 250000, isAvailable: true }]);
    const cart = ref([]);
    function addToCart(name) { cart.value.push(name); }
    return { products, cart, addToCart };
  },
});
app.mount('#app');
console.log('Components & Props siap digunakan');
```

---

## Key Concepts

### Components
Reusable UI blocks.

### Props
Define type, required, default.

### Emits
$emit sends event to parent.

### Slots
<slot /> for parent content.

---

## Experiments

- Create component with multiple props
- Add named slots
- Implement custom prop validation
- Create component with emit events

---

## Challenge

Build a product catalog: ProductCard, ProductList, CartSummary.

---

## Summary

Week 4 of 12: **Components & Props** (Level: Beginner). Beginner phase complete! Next week: **Vue Router**.
