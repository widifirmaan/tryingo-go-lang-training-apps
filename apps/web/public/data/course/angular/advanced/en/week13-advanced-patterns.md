# Advanced Patterns

> **Kategori:** Angular | **Level:** Advanced | **Minggu 13:** Advanced Patterns

## Learning Objectives

- Smart/Dumb component pattern
- Feature module architecture
- Shared module for reusable components
- Core module for singleton services
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

## Key Concepts

### Smart/Dumb
Smart = logic, Dumb = display.

### Feature Module
Each feature = own module.

### Shared Module
Reusable components.

---

## Experiments

- Refactor to smart/dumb pattern
- Create feature module
- Setup shared module
- Implement lazy loading

---

## Challenge

Refactor Angular app to feature modules: products, cart, auth.

---

## Summary

Week 13 of 14: **Advanced Patterns** (Level: Advanced). Next week: **Capstone Project**!
