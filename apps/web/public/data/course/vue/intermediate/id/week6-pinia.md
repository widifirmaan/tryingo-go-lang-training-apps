# Pinia State Management

> **Kategori:** Vue | **Level:** Menengah | **Minggu 6:** Pinia State Management

## Tujuan Pembelajaran

- defineStore: setup function atau options style
- State: ref() untuk reactive state
- Getters: computed() untuk derived state
- Actions: functions untuk mutate state
- Stores di multiple components

---

## Program: Store & Cart

```vue
// Pinia = official state management untuk Vue
// export const useCartStore = defineStore("cart", () => {
//   const items = ref([]);
//   const totalItems = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
//   function addItem(product) { ... }
//   function removeItem(id) { ... }
//   return { items, totalItems, addItem, removeItem };
// });
console.log('Pinia State Management siap digunakan');
```

---

## Konsep Kunci

### Setup Store
defineStore("id", () => { ... }) = setup function style.

### State
ref() = reactive. Akses langsung di template.

### Getters
computed() = derived value. Cached.

### Actions
Functions untuk mutate state. Bisa async.

---

## Eksperimen

- Buat multiple stores (cart, user, products)
- Implementasikan async action
- Tambah store persistence
- Buat store dengan modules pattern

---

## Tantangan

Buat e-commerce dengan Pinia: product store, cart store, user store.

---

## Ringkasan

Minggu 6 dari 12: **Pinia State Management** (Level: Menengah). Minggu depan: **Lifecycle & Watchers**.
