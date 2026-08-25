# Reactivity & Composition — Kotak Pintar yang Saling Ikut

> **Kategori:** Vue | **Level:** Pemula | **Minggu 2:** Reactivity & Composition API

## Tujuan Pembelajaran

- Bedakan `ref` (kotak untuk angka/teks) vs `reactive` (kotak untuk object/daftar)
- Pakai `computed` untuk hitungan otomatis (total, diskon) yang cache
- Pantau perubahan dengan `watch` (seperti satpam lihat CCTV)
- Tulis logika di `setup` / `<script setup>` biar rapi per fitur (composition)

---

## Kenapa Ini Penting Buat Kamu?

Keranjang warung: `qty` berubah → `total` harus ikut berubah tanpa panggil manual. `computed` = kasir otomatis. `watch` = alarm "jika total > 100rb, beri gratis ongkir" tanpa tombol.

---

## Program: Keranjang Reaktif

```vue
<script setup>
import { ref, reactive, computed, watch } from "vue";

const pelanggan = ref("Budi");
// reactive untuk object besar (tidak perlu .value per field)
const keranjang = reactive([
  { id: 1, nama: "Beras", harga: 62000, qty: 1 },
  { id: 2, nama: "Bayam", harga: 5000, qty: 2 },
]);

const total = computed(() =>
  keranjang.reduce((s, item) => s + item.harga * item.qty, 0)
);

const gratisOngkir = computed(() => total.value > 100000);

// watch = satpam: jika pelanggan ganti, log
watch(pelanggan, (baru, lama) => {
  console.log(`Pelanggan ganti ${lama} → ${baru}`);
});

function tambah(id) {
  const item = keranjang.find(i => i.id === id);
  if (item) item.qty++;
}
function hapus(id) {
  const idx = keranjang.findIndex(i => i.id === id);
  if (idx !== -1) keranjang.splice(idx, 1);
}
</script>

<template>
  <div style="padding: 24px;">
    <input v-model="pelanggan" placeholder="Nama" />
    <p>Halo {{ pelanggan }}, total: Rp {{ total.toLocaleString("id-ID") }}</p>
    <p v-if="gratisOngkir" style="color: green;">🎉 Gratis ongkir!</p>

    <div v-for="item in keranjang" :key="item.id" style="display: flex; gap: 8; margin: 8px 0;">
      <span>{{ item.nama }} x{{ item.qty }}</span>
      <button @click="tambah(item.id)">+</button>
      <button @click="hapus(item.id)">Hapus</button>
    </div>
  </div>
</template>
```

---

## Konsep Kunci

### `ref` vs `reactive`
- `ref(0)` untuk primitif, akses `.value` di script, auto di template
- `reactive({ nama: "Budi" })` untuk object/array, akses langsung `keranjang.push()` tanpa `.value`

### `computed` = Kalkulator Cache
Hanya hitung ulang jika bahan (`keranjang`) berubah. Lebih cepat dari `method`.

### `watch` = CCTV
`watch(pelanggan, (baru, lama) => ...)` jalan setiap `pelanggan` ganti. `watchEffect` jalan jika apapun di dalamnya berubah (otomatis).

### Composition = Kelompokkan per Fitur
`<script setup>` kumpulkan `keranjang` + `total` + `tambah/hapus` berdekatan, tidak loncat Options `data/methods/computed` terpisah.

---

## Penjelasan untuk Pemula

### Analogi

- **`reactive` = keranjang belanja**: taruh apel, total di kasir otomatis update (computed).
- **`watch` = alarm**: jika total >100rb, bel berbunyi gratis ongkir.

---

## Eksperimen

- **Hijau:** `keranjang.push({id:3,nama:"Telur",harga:28000,qty:1})` → total?
- **Kuning:** `watch(total, v => console.log("Total baru", v))`
- **Merah:** `reactive` lalu `keranjang.value.push` → error, reactive tidak pakai `.value`.

---

## Tantangan

**Kalkulator Ongkir Reaktif:** `berat = ref(2)`, `jarak = ref(5)`, `ongkir = computed(() => berat.value*5000 + jarak.value*2000)`, tampilkan `{{ ongkir }}` + 2 input `v-model.number`. `watch(ongkir, v => if(v>50000) alert("Mahal"))`.

---

## Glosarium Mini

- **ref/reactive**: reaktif
- **computed/watch**: hitung & pantau

---

## Ringkasan

Minggu 2: **Reactivity** — kotak pintar saling ikut. Minggu depan: **Directives & Events** — `v-if/v-for` dan `@click`.
