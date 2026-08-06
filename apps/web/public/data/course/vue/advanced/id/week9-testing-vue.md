# Testing Vue Components

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 9:** Testing Vue Components

## Tujuan Pembelajaran

- Vitest + Vue Test Utils setup
- mount vs shallowMount: kapan pakai
- find, findAll: query DOM elements
- trigger, emit: simulate user interactions
- Mock stores dan router di test

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

## Konsep Kunci

### Setup
Vitest + @vue/test-utils. mount() = full render.

### Queries
find() = pertama cocok. findAll() = semua.

### Interactions
trigger("click") = klik. setValue() = isi input.

### Best Practices
Test behavior, bukan implementation.

---

## Eksperimen

- Test form submission
- Test async component dengan fetch
- Test dengan mocked store
- Test navigation dengan router

---

## Tantangan

Buat test suite untuk TodoApp: add todo, toggle complete, delete todo, filter.

---

## Ringkasan

Minggu 9 dari 12: **Testing Vue** (Level: Lanjutan). Minggu depan: **Performance & Nuxt**.
