# Composables Modern: Ekstraksi Logika Ber-State Reusable (useSalesLeads)

> **Kategori:** Vue | **Level:** Composables, Pinia & Vue Router | **Minggu 5:** Composables Modern: Ekstraksi Logika Ber-State Reusable (useSalesLeads)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi Composables di Vue 3 sebagai padanan Custom Hooks di React
- Mengetahui konvensi penamaan baku Composable (selalu diawali dengan use, misal useSalesLeads)
- Mengemas state reaktif (leads, loading, error) dan fungsi mutasi ke dalam satu modul terisolasi
- Mengonsumsi Composable yang sama di berbagai komponen berbeda tanpa duplikasi kode
- Menjaga reaktivitas data saat diekspor dari Composable tanpa merusak Proxy tracking

---

## Program: Composable Pengambilan Data CRM dengan Auto-Fetch & Error Handling

```js
// ============================================================================
// File: composables/useSalesLeads.js (Composable Logic Ber-State Mandiri)
// ============================================================================
import { ref } from "vue";

export function useSalesLeads() {
  const leads = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchLeads() {
    loading.value = true;
    error.value = null;

    try {
      // Simulasi latency jaringan 800ms
      await new Promise((r) => setTimeout(r, 800));

      leads.value = [
        { id: "L1", nama: "PT Sinarmas Agro", nilai: 120000000, tahap: "DEAL" },
        { id: "L2", nama: "Bank Syariah Nusantara", nilai: 450000000, tahap: "NEGOSIASI" },
        { id: "L3", nama: "Startup EduTech Maju", nilai: 75000000, tahap: "PROSPEK" }
      ];
    } catch (err) {
      error.value = "Gagal menyinkronkan data leads dari server.";
    } finally {
      loading.value = false;
    }
  }

  function tambahLead(leadBaru) {
    leads.value.unshift({ id: `L-${Date.now()}`, ...leadBaru });
  }

  function hitungTotalPipeline() {
    return leads.value.reduce((total, item) => total + item.nilai, 0);
  }

  // Kembalikan state dan fungsi aksi dalam bentuk objek
  return {
    leads,
    loading,
    error,
    fetchLeads,
    tambahLead,
    hitungTotalPipeline
  };
}
```

---

## Konsep Kunci

### Apa itu Composable di Vue 3?
Dalam pengembangan aplikasi Vue modern, **Composable adalah fungsi yang memanfaatkan Composition API Vue untuk mengkapsulasi dan menggunakan kembali logika yang memiliki state (*stateful logic*)**.
Sebelum ada Composable, pengembang Vue menggunakan *Mixins* yang terkenal dengan masalah benturan nama (*namespace collisions*) dan sumber data yang tidak jelas (*implicit dependencies*).

### Keunggulan Composable:
1. **Eksplisit**: Semua state dan fungsi yang dikembalikan dideklarasikan dengan jelas: `const { leads, loading } = useSalesLeads()`.
2. **Tidak ada benturan nama**: Anda bebas me-rename variabel saat destrukturisasi: `const { leads: daftarKlien } = useSalesLeads()`.
3. **Fleksibel**: Composable dapat memanggil Composable lain di dalamnya (misal `useSalesLeads` memanggil `useLocalStorage`).

---

---

## Penjelasan untuk Pemula

### Analogi: Resep Bumbu Masak Kemasan Sachet
1. **Tanpa Composable**, setiap koki di 10 cabang restoran harus menakar garam, merica, dan rempah secara manual dari awal di setiap masakan (kode berulang dan rawan salah takaran).
2. **Composable** seperti bumbu instan sachet buatan pabrik: pabrik mengemas bumbu lezat dalam satu sachet (*useSalesLeads*). Koki di cabang mana saja cukup merobek sachet tersebut dan memasukkannya ke wajan untuk rasa masakan yang 100% konsisten.

## Eksperimen

- Impor useSalesLeads ke dalam komponen .vue, panggil fetchLeads() di onMounted, dan tampilkan indikator loading.
- Panggil hitungTotalPipeline() dan buktikan total nominal dihitung dengan tepat dari seluruh leads.
- Gunakan composable yang sama di dua komponen terpisah untuk membuktikan independensi state lokalnya.
- Kombinasikan useSalesLeads dengan useLocalStorage untuk menyimpan draf lead ke browser.

---

## Tantangan

Buat composable `useDebouncedSearch(initialQuery, delay)` yang mengembalikan `query` dan `debouncedQuery` dengan debounce timer otomatis.

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

Kamu telah menguasai pembuatan Composables modern untuk ekstraksi logika bisnis. Minggu depan kita mempelajari Manajemen State Global dengan Pinia.
