# Testing Vue Components

> **Kategori:** Vue | **Level:** Advanced | **Minggu 9:** Testing Vue Components

## Learning Objectives

- Vitest + Vue Test Utils setup
- mount vs shallowMount: when to use
- find, findAll: query DOM elements
- trigger, emit: simulate user interactions
- Mock stores and router in tests

---

## Program: Unit & Integration

```vue
// Testing Vue: Vitest + Vue Test Utils
// import { mount } from "@vue/test-utils";
// import { describe, it, expect } from "vitest";
// describe("Counter", () => {
//   it("renders initial count", () => {
//     const wrapper = mount(Counter);
//     expect(wrapper.find("[data-testid=count]").text()).toBe("0");
//   });
// });
console.log('Testing Vue siap digunakan');
```

---

## Key Concepts

### Setup
Vitest + @vue/test-utils.

### Queries
find() = first match, findAll() = all.

### Interactions
trigger, setValue for user simulation.

### Best Practices
Test behavior, not implementation.

---

## Experiments

- Test form submission
- Test async component with fetch
- Test with mocked store
- Test navigation with router

---

## Challenge

Build a test suite for TodoApp: add todo, toggle complete, delete todo, filter.

---

## Summary

Week 9 of 12: **Testing Vue** (Level: Advanced). Next week: **Performance & Nuxt**.
