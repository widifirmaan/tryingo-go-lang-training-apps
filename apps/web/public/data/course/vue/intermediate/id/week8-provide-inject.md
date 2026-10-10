# Provide/Inject & Teleport

> **Kategori:** Vue | **Level:** Menengah | **Minggu 8:** Provide/Inject & Teleport

## Tujuan Pembelajaran

- provide: share data ke semua descendants
- inject: terima data dari ancestor
- Kapan pakai provide/inject vs props
- Teleport: render ke DOM tree berbeda
- Slots: default, named, scoped slots

---

## Program: Theme & Modal

```vue
// Provide/Inject = share state tanpa prop drilling
const { createApp, ref, provide, inject } = Vue;
const App = {
  setup() {
    const theme = ref('light');
    const user = ref({ name: 'Budi', role: 'admin' });
    provide('theme', theme);
    provide('user', user);
    provide('toggleTheme', () => { theme.value = theme.value === 'light' ? 'dark' : 'light'; });
    return { theme };
  },
};
const ChildComponent = {
  setup() {
    const theme = inject('theme');
    const user = inject('user');
    const toggleTheme = inject('toggleTheme');
    return { theme, user, toggleTheme };
  },
};
console.log('Provide/Inject & Teleport siap digunakan');
```

---

## Konsep Kunci

### Provide/Inject
Parent provide("key", value). Child inject("key"). Bypass intermediate.

### Kapan Pakai
Props: parent -> direct child. Provide/Inject: ancestor -> deep descendant.

### Teleport
<Teleport to="body"> = render di body.

---

## Eksperimen

- Buat theme switcher dengan provide/inject
- Implementasikan modal dengan Teleport
- Buat card component dengan named slots
- Buat scoped slot untuk data table

---

## Tantangan

Buat UI library: Modal (Teleport), Card (named slots), ThemeProvider (provide/inject).

---

## Ringkasan

Minggu 8 dari 12: **Provide/Inject & Teleport** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Testing Vue**.
