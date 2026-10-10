# Components & Props

> **Kategori:** Vue | **Level:** Pemula | **Minggu 4:** Components & Props

## Tujuan Pembelajaran

- Membuat dan meregister komponen
- Props: definisi, type validation, required, default
- Emits: custom events dari child ke parent
- One-way data flow: parent -> child via props
- Slots: konten dinamis di dalam komponen

---

## Program: Komponen Produk

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

## Konsep Kunci

### Components
Reusable UI blocks. Register di components: {}.

### Props
Definisikan type, required, default. Validasi otomatis.

### Emits
$emit("event", data) = kirim event ke parent.

### Slots
<slot /> = konten dari parent.

---

## Eksperimen

- Buat komponen dengan multiple props
- Tambah named slots
- Implementasikan prop validation custom
- Buat komponen dengan emit events

---

## Tantangan

Buat product catalog: ProductCard, ProductList, CartSummary.

---

## Ringkasan

Minggu 4 dari 12: **Components & Props** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Vue Router**.
