# Testing Vue — Cicip Kartu Beneran

> **Kategori:** Vue | **Level:** Lanjutan | **Minggu 9:** Testing Vue Components

## Tujuan Pembelajaran

- `npm install -D vitest @vue/test-utils` + `mount(Kartu, { props: { nama: "Beras" } })` + `expect(wrapper.text()).toContain("Beras")` beneran (sumber: test-utils.vuejs.org + vitest.dev)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa uji, ubah `Kartu` → harga hilang ketahuan pelanggan. Dengan `mount` + `expect`, ubah → merah → perbaiki. Simulasi `console.log` tidak dicek mesin!

---

## Program: Cicip Kartu Beneran

```bash
npm install -D vitest @vue/test-utils jsdom @vitejs/plugin-vue
```

```javascript
// vitest.config.js — WAJIB 2 hal: plugin .vue + DOM palsu!
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue"; // tanpa ini: "Failed to parse .vue"!

export default defineConfig({
  plugins: [vue()],
  test: { environment: "jsdom" }, // tanpa ini: "document is not defined"!
});
```

```vue
<!-- Kartu.vue -->
<template>
  <div class="kartu"><h3>{{ nama }}</h3><p>Rp {{ harga }}</p></div>
  <button @click="emit('beli', nama)">Beli</button>
</template>
<script setup>
defineProps({ nama: String, harga: Number });
const emit = defineEmits(["beli"]);
</script>
```

```javascript
// Kartu.test.js — beneran!
import { mount } from "@vue/test-utils";
import { test, expect } from "vitest";
import Kartu from "./Kartu.vue";

test("tampil nama dan harga", () => {
  const w = mount(Kartu, { props: { nama: "Beras", harga: 62000 } });
  expect(w.text()).toContain("Beras");
  expect(w.text()).toContain("62000");
});

test("klik BELI kirim event", async () => {
  const w = mount(Kartu, { props: { nama: "Beras", harga: 1 } });
  await w.find("button").trigger("click");
  expect(w.emitted("beli")[0]).toEqual(["Beras"]);
});
```

```bash
npx vitest run  # HIJAU beneran (bukan echo!)
```

---

## Konsep Kunci

### `mount` + `props` = Pasang Kartu Bohongan
`mount(Kartu, { props })` render sungguhan di `jsdom`.

### `expect(text()).toContain` = Cicip Teks
Cek output, bukan `console.log`.

### `trigger("click")` + `emitted()` = Klik & Dengar
Klik bohongan + cek bel terkirim.

---

## Penjelasan untuk Pemula

### Analogi: Mystery Shopper
- **mount = toko bohongan**, **expect = cicip**, **trigger = pencet bel**.

### Langkah 0 — Siapkan Device
- `npm install -D vitest @vue/test-utils jsdom` + `npx vitest run`.

### Cara Komputer Membaca
1. `mount` → render `Kartu` ke DOM palsu.
2. `expect(...).toContain(...)` → cocok? Hijau : merah + baris.

### 3 Istilah Wajib
1. **mount/props/trigger**: pasang/kirim/pencet

---

## Eksperimen

- **Hijau:** Ubah `nama` jadi "Gula" → test merah? Betulkan.
- **Kuning:** Hapus 1 `expect` → tetap hijau (kurang cicip)?
- **Merah:** File tanpa `.test.js` → tidak jalan? Ganti nama.

---

## Tantangan

**Kartu Teruji:** `nama` + `harga` + tombol `Beli` → 3 test (teks, harga, event) HIJAU + screenshot.

---

## Glosarium Mini

- **mount/expect/trigger**: pasang/cicip/pencet

---

## Ringkasan

Minggu 9 dari 12: **Cicip Beneran** (Level: Lanjutan). Tanpa simulasi. Minggu depan: **Performance**.
