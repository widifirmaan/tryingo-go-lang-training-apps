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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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
