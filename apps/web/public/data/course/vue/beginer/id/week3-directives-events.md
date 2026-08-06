# Directives & Events

> **Kategori:** Vue | **Level:** Pemula | **Minggu 3:** Directives & Events

## Tujuan Pembelajaran

- v-model: two-way binding untuk form inputs
- v-show vs v-if: kapan pakai masing-masing
- v-for: list rendering dengan :key
- Event modifiers: .prevent, .stop, .once
- Key modifiers: .enter, .tab, .delete

---

## Program: Form Interaktif

```vue
// Directives = special attributes dengan prefix v-
const { createApp, ref } = Vue;
const app = createApp({
  setup() {
    const text = ref('');
    const isVisible = ref(true);
    const items = ref(['Vue', 'React', 'Angular']);
    const newItem = ref('');
    function addItem() { if (newItem.value.trim()) { items.value.push(newItem.value); newItem.value = ''; } }
    function removeItem(index) { items.value.splice(index, 1); }
    return { text, isVisible, items, newItem, addItem, removeItem };
  },
});
app.mount('#app');
console.log('Directives & Events siap digunakan');
```

---

## Konsep Kunci

### v-model
Two-way binding: input -> state, state -> input. Otomatis sync.

### v-show vs v-if
v-show = toggle CSS display (selalu render).
v-if = conditional render (destroy/create element).

### v-for
Render list. :key = unique identifier untuk tracking.

---

## Eksperimen

- Buat form dengan multiple input types
- Implementasikan keyboard shortcuts
- Buat conditional rendering kompleks
- Tambah transition saat item muncul/hilang

---

## Tantangan

Buat shopping cart: tambah item, hapus item, update quantity, total price.

---

## Ringkasan

Minggu 3 dari 12: **Directives & Events** (Level: Pemula). Minggu depan: **Components & Props**.
