# Directives & Events — Saklar dan Telinga

> **Kategori:** Vue | **Level:** Pemula | **Minggu 3:** Directives & Events

## Tujuan Pembelajaran

- `v-if / v-else / v-show` bedakan sembunyikan vs buang
- `v-for` dengan `:key` dan `v-for` object ` (value, key) in obj`
- `@click`, `@input`, `@submit` + modifier `.prevent`, `.number`, `.trim`
- `v-bind` shorthand `:` untuk class/style dinamis `:class="{ aktif: ya }"`
- `v-model` 2 arah untuk form lengkap

---

## Kenapa Ini Penting Buat Kamu?

Form warung: jika `stok==0` sembunyikan tombol Beli, jika ketik nama → `v-model` langsung simpan, submit → `.prevent` jangan reload.

---

## Program: Form Warung Lengkap

```vue
<script setup>
import { ref } from "vue";
const nama = ref("");
const qty = ref(1);
const kategori = ref("sembako");
const setuju = ref(false);
const daftar = ref([]);

function submit() {
  if (!nama.value.trim()) return;
  daftar.value.push({ id: Date.now(), nama: nama.value.trim(), qty: qty.value, kategori: kategori.value });
  nama.value = ""; qty.value = 1;
}
</script>

<template>
  <form @submit.prevent="submit" style="display: grid; gap: 8; max-width: 320px;">
    <input v-model.trim="nama" placeholder="Nama produk" />
    <input v-model.number="qty" type="number" min="1" />
    <select v-model="kategori">
      <option>sembako</option><option>sayur</option>
    </select>
    <label><input type="checkbox" v-model="setuju" /> Setuju syarat</label>
    <button :disabled="!setuju || !nama.trim()">Tambah</button>
  </form>

  <p v-if="daftar.length === 0" style="color: gray;">Belum ada</p>
  <ul v-else>
    <li v-for="item in daftar" :key="item.id" :class="{ tebal: item.qty > 5 }">
      {{ item.nama }} x{{ item.qty }} ({{ item.kategori }})
      <span v-show="item.qty > 10" style="color: red;"> — Grosir!</span>
    </li>
  </ul>
</template>

<style scoped>
.tebal { font-weight: bold; }
</style>
```

---

## Konsep Kunci

### `v-if` vs `v-show`
- `v-if` = **buang** dari DOM (tidak ada di HTML)
- `v-show` = **sembunyikan** `display:none` (tetap ada, cepat toggle)

### `v-for` + `:key`
`v-for="item in daftar" :key="item.id"` — KTP wajib.

### Modifier
- `@submit.prevent` = jangan reload (seperti `e.preventDefault()`)
- `v-model.number` = jadi number, `v-model.trim` = buang spasi

### `:class` Dinamis
`:class="{ aktif: isAktif }"` atau `:class="[aktif ? 'a' : 'b']"`

---

## Penjelasan untuk Pemula

### Analogi: Saklar Lampu

- **`v-if` = cabut lampu**: tidak ada, tidak makan listrik.
- **`v-show` = tutup kain**: lampu ada tapi ditutup.

---

## Eksperimen

- **Hijau:** `v-model.trim` ketik "  beras  " → `nama` jadi "beras"?
- **Kuning:** `:disabled="!nama"` → tombol mati jika kosong?
- **Merah:** Lupa `:key` → warning, tambah.

---

## Tantangan

**Filter Warung:** Input `cari` + `select kategori` + `v-for="item in daftar.filter(...)"`, `v-if` jika hasil 0 tampil "Tidak ada".

---

## Glosarium Mini

- **v-if/show/for**: tampil
- **@/.prevent/.number/.trim**: event & modifier

---

## Ringkasan

Minggu 3: **Directives** — saklar & telinga. Minggu depan: **Components & Props** — bagi warung jadi bata LEGO.
