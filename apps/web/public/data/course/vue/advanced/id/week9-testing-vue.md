## Tujuan Pembelajaran

- Vitest + Vue Test Utils setup
- mount vs shallowMount: kapan pakai
- find, findAll: query DOM elements
- trigger, emit: simulate user interactions
- Mock stores dan router di test

---

## Program: Testing Komponen Vue

Vitest + @vue/test-utils: mount, find/stub, props, dan interaksi pengguna.

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

// Testing store (pinia):
import { setActivePinia, createPinia } from 'pinia';
beforeEach(() => setActivePinia(createPinia()));
it('cart total sums prices', () => {
  useCartStore().add({ id: 1, price: 100, name: 'A' });
  expect(useCartStore().total).toBe(100);
});
```

---

## Konsep Kunci

### mount vs shallowMount

mount() merender penuh (termasuk child); shallowMount men-stub child - pilih sesuai isolasi test.

### trigger() selalu async

await wrapper.find('button').trigger('click') - Vue flush update di microtask; tanpa await, assertion melihat DOM lama.

### Mocking API

vi.mock('./api') atau stub fetch via msw agar unit test berjalan tanpa network.

### Unit + E2E

Unit cepat dan murah; E2E (Playwright/Cypress) memeriksa integrasi penuh routing-server-page.

---

## Eksperimen

- Uji reset button mengembalikan nilai awal.
- Tabel uji semua varian props.
- Tambahkan visual regression sederhana.

---

## Tantangan

Upgrade Counter dengan kontrol stepper (min, max, step) lalu tulis 8 unit test.

---

## Ringkasan

Materi minggu ini telah dibahas: Testing Komponen Vue. Lanjut ke pekan berikutnya untuk memperdalam.
