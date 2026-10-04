# Pinia: Manajemen State Global Modern, Actions, Getters & Store DevTools

> **Kategori:** Vue | **Level:** Composables, Pinia & Vue Router | **Minggu 6:** Pinia: Manajemen State Global Modern, Actions, Getters & Store DevTools
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Model Mental & Diagram Alur Visual

![Diagram Reaktivitas Komponen & Data Flow Vue](/diagrams/react-data-flow.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ PROXY REAKTIVITAS VUE 3                                  │
│                                                          │
│  State: ref(0) / reactive({...})                         │
│       │                                                  │
│       ▼ (Trigger Mutation)                               │
│  Effect Dependency Tracker                               │
│       │                                                  │
│       ▼                                                  │
│  Virtual DOM Diffing & Patching ──► Real DOM Re-render   │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const count = ref(0)`
- **Fungsi Utama:** State reaktif primitif Vue 3.
- **Parameter / Atribut:** `initialValue`.
- **Perilaku & Efek Sistem:** Membungkus nilai ke dalam Reactive Ref. Di script diakses via `.value`, di template otomatis di-unwrap..
- **Contoh Penggunaan Praktis:**
```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
</script>
```
- **Hasil Output yang Diharapkan:**
```output
Nilai count bertambah secara reaktif
```

### 2. `const double = computed(() => count.value * 2)`
- **Fungsi Utama:** Komputasi nilai turunan ber-cache.
- **Parameter / Atribut:** `Getter function`.
- **Perilaku & Efek Sistem:** Menghitung nilai baru secara otomatis hanya ketika dependensi reaktifnya berubah..
- **Contoh Penggunaan Praktis:**
```vue
<script setup>
import { ref, computed } from 'vue';
const count = ref(5);
const double = computed(() => count.value * 2);
</script>
```
- **Hasil Output yang Diharapkan:**
```output
double otomatis bernilai 10
```

### 3. `defineProps<{ title: string }>()`
- **Fungsi Utama:** Deklarasi kontrak Props komponen anak.
- **Parameter / Atribut:** `Generic Type Schema`.
- **Perilaku & Efek Sistem:** Menerima kiriman data dari parent komponen dengan validasi tipe statis..
- **Contoh Penggunaan Praktis:**
```vue
<script setup>
defineProps<{
  title: string;
  inStock?: boolean;
}>();
</script>
```
- **Hasil Output yang Diharapkan:**
```output
Komponen siap menerima atribut title dari parent
```

### 4. `v-model="message"`
- **Fungsi Utama:** Two-way data binding dua arah.
- **Parameter / Atribut:** `Target state variable`.
- **Perilaku & Efek Sistem:** Menghubungkan nilai elemen input form dengan state JavaScript secara sinkron..
- **Contoh Penggunaan Praktis:**
```vue
<template>
  <input v-model="username" placeholder="Ketik nama..." />
  <p>Halo, {{ username }}</p>
</template>
```
- **Hasil Output yang Diharapkan:**
```output
Input teks sinkron seketika ke paragraf tampilan
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Destructuring Reaktif State Hilang
- **Gejala / Masalah:** Variabel yang di-destructure dari `reactive()` kehilangan sifat reaktivitasnya.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `toRefs(state)` sebelum melakukan destructuring pada Composition API.

### 2. Mengubah Prop Komponen Anak secara Langsung
- **Gejala / Masalah:** Memicu warning konsol Vue dan membuat data flow satu arah (one-way data flow) kacau.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Kirim event `emit('update:prop', value)` ke parent alih-alih memutasi prop.

### 3. Lupa `.value` pada Ref di JavaScript
- **Gejala / Masalah:** Objek `ref` dikirim alih-alih nilai aslinya ke logika komputasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Ingat bahwa `.value` wajib di dalam blok `<script setup>`, namun otomatis di-unwrap di template `<template>`.

---

## Ringkasan

Kamu telah menguasai Pinia global state management, getters, dan actions. Minggu depan kita mempelajari Vue Router 4 dan Navigation Guards.
