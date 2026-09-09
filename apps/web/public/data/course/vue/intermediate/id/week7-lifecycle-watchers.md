# Lifecycle & Watchers — Buka, Pantau, Tutup Warung Vue

> **Kategori:** Vue | **Level:** Menengah | **Minggu 7:** Lifecycle & Watchers
> **Prasyarat:** Minggu 6 — **Pinia**.

## Tujuan Pembelajaran

- `onMounted` buka (fetch) + `onUnmounted` tutup (bersih timer) (sumber: vuejs.org/guide/essentials/lifecycle)
- `watch(cari, fn)` pantau 1 + `watchEffect` pantau otomatis

---

## Kenapa Ini Penting Buat Kamu?

Fetch di luar `onMounted` jalan saat SSR (server) → error `window`. Timer tanpa `onUnmounted` jalan terus meski halaman pindah (bocor!). `watch` cari otomatis tanpa tombol.

---

## Program: Toko Buka-Pantau-Tutup

```vue
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const daftar = ref([]);
const cari = ref("");
const hasil = ref([]);
let timer = null;

onMounted(async () => {           // buka: ambil sekali
  const res = await fetch("/api/produk");
  daftar.value = await res.json();
  hasil.value = daftar.value;
  timer = setInterval(() => console.log("cek stok..."), 10000);
});

onUnmounted(() => clearInterval(timer));  // tutup: matikan!

watch(cari, (baru) => {           // pantau cari → saring
  hasil.value = daftar.value.filter(p =>
    p.nama.toLowerCase().includes(baru.toLowerCase()));
});
</script>

<template>
  <input v-model="cari" placeholder="Cari..." />
  <ul><li v-for="p in hasil" :key="p.id">{{ p.nama }}</li></ul>
</template>
```

---

## Konsep Kunci

### `onMounted` / `onUnmounted` = Buka / Tutup
`onMounted` setelah tampil (fetch aman), `onUnmounted` sebelum hilang (bersih timer).

### `watch` vs `watchEffect` = Pantau 1 / Otomatis
`watch(cari, fn)` pantau `cari`. `watchEffect` pantau semua yang dibaca di dalamnya.

---

## Penjelasan untuk Pemula

### Analogi: Buka-Tutup Toko + CCTV
- **onMounted = buka pintu jam 7** (ambil stok), **onUnmounted = tutup jam 20** (matikan lampu/timer).
- **watch = CCTV cari**: gerak → rekam (saring).

### Langkah 0 — Siapkan Device
- Sama Vue W1.

### Cara Komputer Membaca
1. Mount → `onMounted` → fetch → `daftar` isi.
2. Ketik → `cari` berubah → `watch` → `hasil` saring.
3. Pindah halaman → `onUnmounted` → timer mati.

### 3 Istilah Wajib
1. **onMounted/onUnmounted**: buka/tutup
2. **watch/watchEffect**: pantau-1/otomatis

---

## Eksperimen

- **Hijau:** Ketik "ber" → hasil saring tanpa tombol?
- **Kuning:** Hapus `onUnmounted` → pindah halaman, console masih "cek stok"? (Bocor! Pasang.)
- **Merah:** Fetch di luar `onMounted` (langsung setup) → jalan 2x (SSR+client)? Pindah ke dalam.

---

## Tantangan

**Toko Hidup:** `onMounted` fetch + `watch` cari + `onUnmounted` matikan interval + loading tampil saat fetch.

---

## Glosarium Mini

- **onMounted/onUnmounted/watch**: buka/tutup/pantau

---

## Ringkasan

Minggu 7 dari 12: **Buka-Pantau-Tutup** (Level: Menengah). Tanpa bocor. Minggu depan: **Provide/Inject**.
