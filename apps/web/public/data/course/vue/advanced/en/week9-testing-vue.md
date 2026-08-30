# Testing Vue — Uji Kartu

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 9:** Testing Vue

## Tujuan Pembelajaran

- `vitest` + `Vue Test Utils` — `mount(Kartu, { props: { nama: "Beras" } })`

---

## Program

```vue
<!-- Kartu.vue -->
<template><div>{{ nama }}</div></template>
<script setup> defineProps({ nama: String }); </script>

<!-- Kartu.test.js -->
import { mount } from "@vue/test-utils";
import Kartu from "./Kartu.vue";
import { test, expect } from "vitest";
test("tampil nama", () => {
  const w = mount(Kartu, { props: { nama: "Beras" } });
  expect(w.text()).toContain("Beras");
});
```

---

## Ringkasan

Minggu 9: **Uji Vue** — `mount` + `props`.
