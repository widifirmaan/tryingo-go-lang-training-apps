# Pinia: Manajemen State Global Modern, Actions, Getters & Store DevTools

> **Kategori:** Vue | **Level:** Composables, Pinia & Vue Router | **Minggu 6:** Pinia: Manajemen State Global Modern, Actions, Getters & Store DevTools

## Tujuan Pembelajaran

- Memahami mengapa Pinia menggantikan Vuex sebagai standar resmi manajemen state Vue
- Membuat Pinia Setup Store menggunakan sintaks reaktif modern (ref untuk state, computed untuk getters)
- Menulis Actions untuk mengkapsulasi mutasi sinkron maupun permintaan asinkron ke server
- Mengakses dan memodifikasi store dari komponen manapun tanpa prop drilling
- Menggunakan fitur time-travel debugging dan state inspection dengan Vue DevTools

---

## Program: Pipeline Penjualan Global CRM Menggunakan Pinia Store

```js
// ============================================================================
// File: stores/salesPipeline.js (Pinia Setup Store Modern)
// ============================================================================
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Setup Store Syntax (Identik dengan gaya <script setup>)
export const usePipelineStore = defineStore("salesPipeline", () => {
  // 1. State (ref)
  const deals = ref([
    { id: "D-1", klien: "Telkom Digital", nominal: 250000000, stage: "QUALIFIED" },
    { id: "D-2", klien: "Astra International", nominal: 600000000, stage: "PROPOSAL" },
    { id: "D-3", klien: "Gojek Tokopedia", nominal: 180000000, stage: "WON" }
  ]);
  const filterTahap = ref("ALL");

  // 2. Getters (computed)
  const totalOmsetWon = computed(() => {
    return deals.value
      .filter((d) => d.stage === "WON")
      .reduce((sum, d) => sum + d.nominal, 0);
  });

  const dealsTerfilter = computed(() => {
    if (filterTahap.value === "ALL") return deals.value;
    return deals.value.filter((d) => d.stage === filterTahap.value);
  });

  // 3. Actions (functions)
  function geserStage(dealId, stageBaru) {
    const target = deals.value.find((d) => d.id === dealId);
    if (target) {
      target.stage = stageBaru;
    }
  }

  function tambahDeal(klien, nominal) {
    deals.value.push({
      id: `D-${Date.now()}`,
      klien,
      nominal: Number(nominal),
      stage: "QUALIFIED"
    });
  }

  return {
    deals,
    filterTahap,
    totalOmsetWon,
    dealsTerfilter,
    geserStage,
    tambahDeal
  };
});
```

---

## Konsep Kunci

### Mengapa Pinia Menggantikan Vuex?
Vuex (standar lama) sangat bertele-tele: Anda harus memisahkan *mutations* (sinkron) dan *actions* (asinkron), serta tidak memiliki autokomplet TypeScript yang baik.
**Pinia** adalah penyempurnaan mutlak:
1. **Tidak ada Mutations**: Cukup tulis fungsi biasa (*actions*) yang dapat menangani mutasi langsung maupun operasi asinkron.
2. **Setup Store Syntax**: Anda mendefinisikan store persis seperti menulis komponen biasa dengan `<script setup>` (`ref` = state, `computed` = getters, `function` = actions).
3. **Sangat Ringan**: Ukuran file hanya ~1KB dan mendukung pemecahan kode otomatis (*code splitting*).

### Mengonsumsi Store di Komponen
Di komponen `.vue`:
```vue
<script setup>
import { usePipelineStore } from '@/stores/salesPipeline';
const pipeline = usePipelineStore();
</script>
<template>
  <div>Omset Deal: Rp {{ pipeline.totalOmsetWon }}</div>
</template>
```

---

---

## Penjelasan untuk Pemula

### Analogi: Rekening Bank Perusahaan Terpusat
1. **State Lokal (useState/ref)** seperti uang tunai di dompet masing-masing staf: staf divisi sales tidak tahu berapa uang di dompet staf divisi marketing.
2. **Pinia Store** seperti rekening koran pusat perusahaan: semua divisi (sales, HR, finance) melihat saldo kas yang persis sama. Jika sales menutup transaksi bernilai 1 Miliar, finance langsung melihat angka saldo kas bertambah di layar mereka saat itu juga.

## Eksperimen

- Panggil pipeline.tambahDeal("Unilever", 800000000) dan buktikan total deals bertambah di seluruh komponen.
- Pindahkan stage deal ke WON dan amati totalOmsetWon melonjak otomatis berkat Pinia getter.
- Buka Vue DevTools di browser dan periksa tab Pinia untuk melihat state tree secara visual.
- Gunakan fungsi pipeline.$reset() atau plugin pinia-plugin-persistedstate untuk menyimpan state ke LocalStorage.

---

## Tantangan

Tambahkan action `hapusDeal(id)` pada `usePipelineStore` dan buat getter `hitungPersentaseWinRate` yang menghitung persentase jumlah deal berstatus WON dibanding seluruh total deal.

---

## Ringkasan

Kamu telah menguasai Pinia global state management, getters, dan actions. Minggu depan kita mempelajari Vue Router 4 dan Navigation Guards.
