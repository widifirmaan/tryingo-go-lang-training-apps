# Animations & Transitions

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 11:** Animations & Transitions

## Tujuan Pembelajaran

- <transition>: enter/leave animations
- CSS classes: -enter-active, -leave-to
- <transition-group>: list animations
- JavaScript hooks: before-enter, enter, leave
- GSAP integration untuk complex animations

---

## Program: UI Animasi

```vue
// Vue Transitions: built-in component untuk animasi
// <transition name="fade"><p v-if="show">Hello</p></transition>
// <transition-group name="list" tag="ul"><li v-for="item in items" :key="item.id">{{ item }}</li></transition-group>
console.log('Animations & Transitions siap digunakan');
```

---

## Konsep Kunci

### Transition
Built-in component. Auto apply CSS classes.

### CSS Classes
-enter-from, -enter-active, -enter-to, -leave-from, -leave-active, -leave-to.

### Transition Group
Animasi list (add/remove items).

---

## Eksperimen

- Buat page transition
- Implementasikan modal animation
- Buat staggered list animation
- Integrasikan GSAP

---

## Tantangan

Buat animated dashboard: page transitions, list animations, modal animations.

---

## Ringkasan

Minggu 11 dari 12: **Animations & Transitions** (Level: Lanjutan). Minggu depan: **Capstone Project**!
