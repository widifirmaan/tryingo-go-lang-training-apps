# Dasar Vue & Template — Toko dengan Stiker {{ }}

> **Kategori:** Vue | **Level:** Pemula | **Minggu 1:** Dasar Vue & Template Syntax

## Tujuan Pembelajaran

- Memahami Vue seperti **stiker ajaib**: tulis `{{ nama }}` di HTML, ganti `nama` di JS → HTML otomatis ganti
- Buat proyek `npm create vue@latest warung-vue` dan jalankan `npm run dev` di `localhost:5173`
- Pakai `{{ }}` untuk tampilkan teks, `v-bind` untuk atribut, `v-on` untuk klik
- Bedakan `data` (kotak) dengan `computed` (kalkulator otomatis) vs `method` (tombol)
- Tampilkan daftar dengan `v-for` dan sembunyikan dengan `v-if`

---

## Kenapa Ini Penting Buat Kamu?

Vue paling mirip HTML biasa — tidak perlu `className` atau `useState`. Warung yang sudah bisa HTML minggu lalu, tinggal tambah `{{ harga }}` langsung jadi hidup. Paling ramah untuk non-IT yang takut kurung kurawal React.

---

## Program: Katalog Warung dengan Stiker Vue

Buat file `src/App.vue` (SFC — 1 file berisi template + logika + gaya)

```vue
<!-- src/App.vue — stiker {{ }} otomatis update -->
<script setup>
import { ref, computed } from "vue";

// ref = kotak reaktif (seperti useState React, tapi cukup .value)
const namaWarung = ref("Warung Bu Siti");
const pelanggan = ref("Budi");
const berasKg = ref(2);
const hargaPerKg = ref(12500);

// computed = kalkulator otomatis (hitung ulang jika bahan berubah)
const total = computed(() => berasKg.value * hargaPerKg.value);

// Daftar untuk v-for
const daftar = ref([
  { id: 1, nama: "Beras 5kg", harga: 62000 },
  { id: 2, nama: "Bayam", harga: 5000 },
]);

function tambah() {
  daftar.value.push({ id: Date.now(), nama: "Telur 1kg", harga: 28000 });
}
</script>

<template>
  <div style="font-family: sans-serif; padding: 24px;">
    <h1>{{ namaWarung }} 🥬</h1>
    <p>Halo {{ pelanggan }}, total: Rp {{ total.toLocaleString("id-ID") }}</p>

    <!-- v-bind : sama dengan : — tempel atribut -->
    <input v-model="pelanggan" placeholder="Nama pelanggan" />

    <!-- v-on @ sama dengan @ — pasang telinga klik -->
    <button @click="berasKg++">+ Beras ({{ berasKg }}kg)</button>
    <button @click="berasKg--" :disabled="berasKg <= 0">−</button>

    <!-- v-if sembunyikan -->
    <p v-if="total > 50000" style="color: green;">Gratis ongkir!</p>
    <p v-else>Belanja lagi Rp {{ (50000 - total).toLocaleString("id-ID") }} untuk gratis ongkir</p>

    <!-- v-for daftar -->
    <h2>Produk</h2>
    <ul>
      <li v-for="item in daftar" :key="item.id">
        {{ item.nama }} — Rp {{ item.harga.toLocaleString("id-ID") }}
      </li>
    </ul>
    <button @click="tambah">+ Tambah Telur</button>
  </div>
</template>

<style scoped>
button { padding: 6px 12px; margin: 4px; border-radius: 8px; border: 1px solid #ccc; }
</style>
```

> Jalankan: `npm create vue@latest warung-vue` → pilih Yes semua → `cd warung-vue` → `npm install` → `npm run dev` → buka `http://localhost:5173` → ganti `src/App.vue` dengan kode atas.

---

## Konsep Kunci

### `{{ }}` = Stiker Tempel Otomatis
Tulis `{{ total }}` di HTML, ganti `total.value = 50000` di JS → HTML ganti sendiri. Tidak perlu `document.getElementById`.

### `ref()` = Kotak Reaktif
`const nama = ref("Budi")` → baca `nama.value`, ubah `nama.value = "Siti"`. `ref` untuk string/number/boolean. `reactive` untuk object besar (nanti).

### `computed` vs `method`
- `computed` = kalkulator otomatis, cache (hanya hitung jika `berasKg` berubah)
- `method` = tombol, jalan saat diklik

### Directives `v-`
- `v-model="pelanggan"` = input 2 arah (ketik → `pelanggan` berubah)
- `v-bind` / `:` = tempel atribut `:disabled="berasKg<=0"`
- `v-on` / `@` = telinga `@click="tambah"`
- `v-if` / `v-for` = tampilkan / ulang

---

## Penjelasan untuk Pemula

### Analogi: Stiker Harga Pasar

- **`{{ harga }}` = stiker harga**: tulis sekali `{{ total }}`, ganti angka di gudang (`total` computed), semua stiker di etalase otomatis ganti.
- **`ref` = kotak ajaib**: `berasKg = ref(2)` kotak isi 2, ubah `berasKg.value++` kotak jadi 3 → stiker `{{ berasKg }}` ikut 3.
- **`v-model` = tali 2 arah**: ketik di input → `pelanggan` berubah, ubah `pelanggan` di kode → input berubah.
- **`v-for` = fotokopi**: `v-for="item in daftar"` fotokopi `<li>` sebanyak daftar.

### Langkah Buat Proyek (5 Menit)

```
npm create vue@latest warung-vue
# Pilih: TypeScript? No (untuk pemula JS dulu)
# Pilih: JSX? No, Router? No, Pinia? No, ESLint? Yes
cd warung-vue
npm install
npm run dev
```

Buka `http://localhost:5173` → lihat `You did it!` → ganti `App.vue`.

### 3 Istilah Wajib

1. **`{{ }}`**: stiker interpolasi
2. **`ref`**: kotak reaktif
3. **`v-if/v-for`**: tampilkan/ulang

---

## Eksperimen

- **Hijau:** Ubah `namaWarung = ref("Toko Andi")` → judul ganti?
- **Kuning:** `v-model` ganti `pelanggan` jadi "Siti" → `Halo Siti` otomatis?
- **Merah:** Lupa `.value` → `berasKg++` tidak jalan, harus `berasKg.value++` di script, tapi di template cukup `{{ berasKg }}` (Vue auto unwrap).

---

## Tantangan

**Katalog Mini:** Tambah `ref` `diskon = 10` dan `computed totalDiskon = total * (1 - diskon/100)`, tampilkan `{{ totalDiskon }}` + input `v-model.number="diskon"` (number modifier). Tombol `Diskon +5%` → `diskon.value +=5`.

Kriteria: 1 `ref`, 1 `computed`, 1 `v-model`, 1 `v-for` dengan `:key`.

---

## Glosarium Mini

- **SFC**: Single File Component `.vue`
- **ref/computed**: reaktif
- **v-model/bind/on**: directives
- **Vite**: server dev Vue

---

## Ringkasan

Minggu 1 dari 12: **Dasar Vue** (Level: Pemula). Stiker `{{ }}` paling mirip HTML. Minggu depan: **Reactivity Lanjutan** — `reactive`, `watch`, dan `Composition API`.
