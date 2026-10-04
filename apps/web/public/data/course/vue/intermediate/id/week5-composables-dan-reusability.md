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

Kamu telah menguasai pembuatan Composables modern untuk ekstraksi logika bisnis. Minggu depan kita mempelajari Manajemen State Global dengan Pinia.
