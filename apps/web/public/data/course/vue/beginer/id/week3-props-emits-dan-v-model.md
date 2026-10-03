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

Kamu telah menguasai defineProps, defineEmits, dan custom v-model dua arah. Minggu depan kita mempelajari Lifecycle Hooks dan Template Refs.
