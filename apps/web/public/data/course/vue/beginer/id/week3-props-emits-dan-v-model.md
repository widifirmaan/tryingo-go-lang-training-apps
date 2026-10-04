# Komunikasi Komponen: defineProps, defineEmits & Custom v-model Binding

> **Kategori:** Vue | **Level:** Composition API, Reaktivitas & Komponen | **Minggu 3:** Komunikasi Komponen: defineProps, defineEmits & Custom v-model Binding
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami pola komunikasi komponen Vue: Props Down (Data mengalir ke bawah), Events Up (Aksi memancar ke atas)
- Menggunakan compiler macro defineProps() dengan validasi tipe ketat dan nilai default
- Menggunakan defineEmits() untuk memancarkan event kustom ke komponen induk
- Membangun Custom v-model pada komponen anak menggunakan konvensi prop modelValue dan event update:modelValue
- Menghindari anti-pattern mutasi props secara langsung di komponen anak

---

## Program: Baris Lead CRM yang Dapat Diedit Langsung (Inline Editing)

```vue
<!-- ===================================================================== -->
<!-- File: EditableLeadRow.vue (Komponen Anak)                                -->
<!-- ===================================================================== -->
<script setup>
// 1. defineProps: Menerima data dari Parent dengan validasi tipe
const props = defineProps({
  id: { type: String, required: true },
  nama: { type: String, required: true },
  nilai: { type: Number, default: 0 },
  modelValue: { type: String, default: "" } // Standar nama prop untuk v-model
});

// 2. defineEmits: Mendeklarasikan event yang dapat dipancarkan ke Parent
const emit = defineEmits(["update:modelValue", "hapus-lead"]);

function onInputKomentar(e) {
  // Pancarkan event update:modelValue untuk sinkronisasi dua arah v-model
  emit("update:modelValue", e.target.value);
}
</script>

<template>
  <div style="display: flex; gap: 8px; align-items: center; padding: 8px; border-bottom: 1px solid #e2e8f0;">
    <span style="font-weight: bold; width: 140px;">{{ nama }}</span>
    <span style="color: #16a34a; width: 100px;">Rp {{ (nilai / 1000000).toFixed(0) }} Juta</span>
    
    <!-- Custom Two-Way Binding Input -->
    <input
      type="text"
      placeholder="Catatan status..."
      :value="modelValue"
      @input="onInputKomentar"
      style="flex: 1; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px;"
    />

    <button
      @click="emit('hapus-lead', id)"
      style="background: #fee2e2; color: #dc2626; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;"
    >
      Hapus
    </button>
  </div>
</template>
```

---

## Konsep Kunci

### Komunikasi Antar Komponen di Vue 3
Arsitektur Vue menganut prinsip **"Props Down, Events Up"**:
1. **Parent ke Child**: Komponen induk mengirimkan data menggunakan atribut props: `<LeadRow :nama="item.nama" :nilai="item.nilai" />`.
2. **Child ke Parent**: Komponen anak **dilarang keras mengubah props tersebut secara langsung**. Jika anak ingin melakukan perubahan atau aksi (misal menghapus item), anak memancarkan event menggunakan `emit('hapus-lead', id)`. Komponen induk menangkap event tersebut via `@hapus-lead="prosesHapus"`.

### Rahasia Custom `v-model` pada Komponen
Di Vue 3, ketika Anda menulis `<Komponen v-model="teksCatatan" />`, Vue secara otomatis memperluas sintaks tersebut menjadi:
`<Komponen :modelValue="teksCatatan" @update:modelValue="val => teksCatatan = val" />`.
Dengan mendeklarasikan prop `modelValue` dan memancarkan event `update:modelValue`, komponen kustom Anda kini memiliki kemampuan sinkronisasi dua arah (*two-way binding*) yang sangat elegan!

---

---

## Penjelasan untuk Pemula

### Analogi: Walkie-Talkie Komandan dan Prajurit Lapangan
1. **Props (Komandan -> Prajurit)** seperti perintah misi tertulis dari komandan: prajurit membawa kertas perintah tersebut (*read-only*), tidak boleh mencoret atau mengubah isi misi sesuka hati di lapangan.
2. **Emits (Prajurit -> Komandan)** seperti tombol bicara di walkie-talkie prajurit: saat prajurit menekan tombol 'Lapor' (*emit*), sinyal suara terkirim ke markas komando, dan komandan yang mengambil keputusan strategis.

## Eksperimen

- Ketik catatan di input dan amati bagaimana state parent ikut terupdate secara real-time via v-model.
- Klik tombol "Hapus" dan buktikan baris dihapus oleh parent melalui event emit.
- Coba ubah props.nama = "Nama Baru" di dalam script anak dan perhatikan peringatan konsol Vue yang melarang mutasi props.
- Gunakan argumen v-model:judul="judul" untuk membuat multiple v-model pada satu komponen yang sama.

---

## Tantangan

Buat komponen `LeadRatingStar.vue` yang menerima prop `modelValue: number` (1 sampai 5) dan me-render 5 bintang interaktif yang saat diklik memancarkan nilai rating baru ke parent via v-model.

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

Kamu telah menguasai defineProps, defineEmits, dan custom v-model dua arah. Minggu depan kita mempelajari Lifecycle Hooks dan Template Refs.
