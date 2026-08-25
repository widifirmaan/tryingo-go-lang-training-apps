# Components & Props — Bagi Warung Jadi Bata LEGO

> **Kategori:** Vue | **Level:** Pemula | **Minggu 4:** Components & Props

## Tujuan Pembelajaran

- Bagi `App.vue` jadi `KartuProduk.vue` + `Keranjang.vue` — 1 bata pakai 100x
- Kirim data induk→anak via **props** `defineProps<{ nama: string }>`
- Anak lapor balik via **emit** `defineEmits` + `@tambah`
- `slot` untuk isi bebas (seperti lubang LEGO)
- `props` read-only, validasi `required`, `default`

---

## Kenapa Ini Penting Buat Kamu?

Warung 50 produk jika semua di `App.vue` → 500 baris berantakan. Bagi jadi `KartuProduk` → `App` hanya `v-for="p in daftar" <Kartu :nama="p.nama" @beli="tambah" />` — rapi, bisa dipakai di halaman lain.

---

## Program: Katalog Bagi Komponen

```vue
<!-- src/components/KartuProduk.vue — bata -->
<script setup>
const props = defineProps({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, default: 10 }
});
const emit = defineEmits(["beli"]);
</script>

<template>
  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 12px;">
    <h3>{{ nama }}</h3>
    <p>Rp {{ harga.toLocaleString("id-ID") }} — Stok: {{ stok }}</p>
    <button @click="emit('beli', nama)" :disabled="stok <= 0">
      {{ stok > 0 ? "Beli" : "Habis" }}
    </button>
    <!-- slot = lubang LEGO -->
    <slot>Default jika tidak diisi</slot>
  </div>
</template>

<!-- src/App.vue — susun LEGO -->
<script setup>
import { ref } from "vue";
import KartuProduk from "./components/KartuProduk.vue";

const daftar = ref([
  { id: 1, nama: "Beras 5kg", harga: 62000, stok: 5 },
  { id: 2, nama: "Bayam", harga: 5000, stok: 0 },
]);
const keranjang = ref([]);

function handleBeli(nama) {
  keranjang.value.push(nama);
  console.log("Beli:", nama);
}
</script>

<template>
  <div style="padding: 24px;">
    <h1>Warung — Components</h1>
    <div style="display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 12px;">
      <KartuProduk
        v-for="p in daftar" :key="p.id"
        :nama="p.nama" :harga="p.harga" :stok="p.stok"
        @beli="handleBeli"
      >
        <small style="color: gray;">Gratis ongkir >100rb</small>
      </KartuProduk>
    </div>
    <p>Keranjang: {{ keranjang.join(", ") || "kosong" }}</p>
  </div>
</template>
```

---

## Konsep Kunci

### `defineProps` = Amplop Masuk
Anak `KartuProduk` terima `nama, harga` dari induk. `required: true` wajib, `default: 10` jika tidak dikirim.

### `defineEmits` = Lapor Balik
Anak `emit('beli', nama)` → induk dengar `@beli="handleBeli"` dengan `nama`.

### `slot` = Lubang LEGO
Induk tulis `<Kartu>isi bebas</Kartu>` → anak tampilkan `<slot />`.

### Props Read-Only
Anak **jangan** `props.harga = 0` → salah, induk yang ubah.

---

## Penjelasan untuk Pemula

### Analogi: Bata LEGO Bertulis

- **Props = tulisan di bata**: `nama="Beras"` stiker di bata.
- **Emit = bel**: anak tekan bel `beli`, induk dengar.
- **Slot = kotak kosong**: bisa isi apa saja.

---

## Eksperimen

- **Hijau:** Tambah `stok: 2` ke 1 produk → tombol `Beli` aktif?
- **Kuning:** Di `App` ganti `:stok="p.stok"` jadi `:stok="0"` semua → semua `Habis`?
- **Merah:** Anak `props.nama = "X"` → warning, jangan ubah props.

---

## Tantangan

**Warung Lengkap:** Buat `Keranjang.vue` terima `items: Array` via props, emit `hapus`, di `App` susun `KartuProduk` + `Keranjang` berdampingan.

Kriteria: 1 komponen anak `defineProps` + `defineEmits` + `slot`, induk `v-for` + `@event`.

---

## Glosarium Mini

- **Props/Emits**: masuk/keluar
- **Slot**: isi bebas

---

## Ringkasan

Minggu 4: **Components** — bagi warung jadi LEGO. **Selesai Beginner Vue!** Minggu depan: **Vue Router** — pindah halaman tanpa reload.
