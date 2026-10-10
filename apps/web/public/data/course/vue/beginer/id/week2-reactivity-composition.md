# Reactivity & Composition API

> **Kategori:** Vue | **Level:** Pemula | **Minggu 2:** Reactivity & Composition API

## Tujuan Pembelajaran

- ref() untuk reactive primitive values
- reactive() untuk reactive objects
- computed() untuk derived values
- watch() untuk side effects saat value berubah
- .value untuk ref di JavaScript

---

## Program: Todo App

```vue
// Composition API = cara modern menulis komponen Vue 3
const { createApp, ref, reactive, computed, watch } = Vue;
const app = createApp({
  setup() {
    const count = ref(0);
    const message = ref('Halo Vue!');
    const user = reactive({ name: 'Budi', age: 25 });
    const doubled = computed(() => count.value * 2);
    const greeting = computed(() => message.value + ' ' + user.name);
    watch(count, (newVal, oldVal) => { console.log('Count berubah dari ' + oldVal + ' ke ' + newVal); });
    function increment() { count.value++; }
    function updateName(name) { user.name = name; }
    return { count, message, user, doubled, greeting, increment, updateName };
  },
});
app.mount('#app');
console.log('Composition API siap digunakan');
```

---

## Konsep Kunci

### ref vs reactive
ref = primitive (number, string, boolean). Harus .value di JS.
reactive = object. Langsung akses field.

### computed
Derived value. Cached, re-evaluate saat dependency berubah.

### watch
Side effect saat value berubah. Dapat newVal dan oldVal.

---

## Eksperimen

- Buat ref untuk string dan ubah nilainya
- Watch multiple sources dengan array
- Buat computed dengan getter dan setter
- Bandingkan ref dan reactive untuk object

---

## Tantangan

Buat form dengan validasi reaktif: nama (min 3 char), email (harus @), password (min 6 char).

---

## Ringkasan

Minggu 2 dari 12: **Reactivity & Composition API** (Level: Pemula). Minggu depan: **Directives & Events**.
