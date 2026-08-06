# Advanced Patterns

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 13:** Advanced Patterns

## Tujuan Pembelajaran

- Smart/Dumb component pattern
- Feature module architecture
- Shared module untuk reusable components
- Core module untuk singleton services
- Lazy-loaded feature modules

---

## Program: Architecture

```typescript
// Advanced Patterns: Smart/Dumb components, Feature Modules
// Smart: handle logic, data, state
// Dumb: only display, receive via @Input, emit via @Output
// @Component({ changeDetection: ChangeDetectionStrategy.OnPush })
console.log('Advanced Patterns siap digunakan');
```

---

## Konsep Kunci

### Smart/Dumb
Smart = logic & state. Dumb = display only.

### Feature Module
Setiap fitur = module sendiri.

### Shared Module
Components/directives/pipes yang dipakai banyak module.

---

## Eksperimen

- Refactor ke smart/dumb pattern
- Buat feature module
- Setup shared module
- Implementasikan lazy loading

---

## Tantangan

Refactor Angular app ke feature modules: products, cart, auth.

---

## Ringkasan

Minggu 13 dari 14: **Advanced Patterns** (Level: Lanjutan). Minggu depan: **Capstone Project**!
