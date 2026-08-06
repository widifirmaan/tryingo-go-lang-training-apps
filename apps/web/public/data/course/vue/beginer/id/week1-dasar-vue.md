# Dasar Vue & Template Syntax

> **Kategori:** Vue | **Level:** Pemula | **Minggu 1:** Dasar Vue & Template Syntax

## Tujuan Pembelajaran

- Memahami Vue sebagai progressive framework
- Template syntax: {{ }} untuk text interpolation
- Directives: v-bind, v-on, v-if, v-for, v-model
- Reactivity: data() return object yang reaktif
- Methods dan Computed properties

---

## Program: Halo Vue

```vue
// Vue = progressive framework untuk membangun UI
const { createApp } = Vue;
const app = createApp({
  data() { return { message: 'Halo, Vue!', name: 'Tryngo', isDark: false, count: 0 }; },
  methods: { toggle() { this.isDark = !this.isDark; }, increment() { this.count++; } },
  computed: { greeting() { return this.message + ' Selamat datang, ' + this.name; } },
});
app.mount('#app');
console.log('Vue app siap dijalankan');
```

---

## Konsep Kunci

### Template Syntax
{{ }} = text interpolation. Update otomatis saat data berubah.

### Directives
v-bind, v-on, v-if, v-for, v-model.

### Reactivity
Data di-return dari data() jadi reactive.

### Computed vs Method
Computed = cached, hanya re-evaluate saat dependency berubah.

---

## Eksperimen

- Ubah data dan lihat UI update
- Tambah computed property baru
- Buat conditional rendering
- Render list dengan v-for

---

## Tantangan

Buat counter app dengan: increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.

---

## Ringkasan

Minggu 1 dari 12: **Dasar Vue & Template Syntax** (Level: Pemula). Minggu depan: **Reactivity & Composition API**.
