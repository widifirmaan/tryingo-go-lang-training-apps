# Testing Vue Components

> **Kategori:** Vue | **Level:** Advanced | **Minggu 9:** Testing Vue Components

## Learning Objectives

- Vitest + Vue Test Utils setup
- mount vs shallowMount: when to use
- find, findAll: query DOM elements
- trigger, emit: simulate user interactions
- Mock stores and router in tests

---

## Program: Testing Vue Components

Vitest + @vue/test-utils: mount, find/findAll, props, and user interaction testing.

```vue
// tests/Counter.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter', () => {
  it('renders initial value from props', () => {
    const wrapper = mount(Counter, { props: { start: 5 } });
    expect(wrapper.text()).toContain('5');
  });

  it('increments on button click', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.inc').trigger('click');
    expect(wrapper.find('output').text()).toBe('1');
  });

  it('emits change event', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.inc').trigger('click');
    expect(wrapper.emitted('change')).toEqual([[1]]);
  });

  it('does not allow negative', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.dec').trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
  });
});

// Testing a pinia store:
import { setActivePinia, createPinia } from 'pinia';
beforeEach(() => setActivePinia(createPinia()));
it('cart total sums prices', () => {
  useCartStore().add({ id: 1, price: 100, name: 'A' });
  expect(useCartStore().total).toBe(100);
});
```

---

## Key Concepts

### mount vs shallowMount

mount() merender penuh (termasuk child); shallowMount men-stub child - pilih sesuai isolasi test.

### trigger() selalu async

await wrapper.find('button').trigger('click') - Vue flush update di microtask; tanpa await, assertion melihat DOM lama.

### Mocking API

vi.mock('./api') atau stub fetch via msw agar unit test berjalan tanpa network.

### Unit + E2E

Unit cepat dan murah; E2E (Playwright/Cypress) memeriksa integrasi penuh routing-server-page.

---

## Experiments

- Test the reset button restoring the start value
- Test all prop variants in a table-driven test
- Add visual regression check.

---

## Challenge

Improve the Counter with stepper controls (min, max, step) and write 8 unit tests.

---

## Summary

This week's material has been covered: Testing Vue Components. Continue to the following week to deepen.
