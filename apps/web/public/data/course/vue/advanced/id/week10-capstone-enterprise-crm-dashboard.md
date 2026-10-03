# Capstone: Dashboard CRM Enterprise & Pipeline Penjualan Interaktif

> **Kategori:** Vue | **Level:** Slots Lanjut, Animasi, Optimasi & Capstone CRM | **Minggu 10:** Capstone: Dashboard CRM Enterprise & Pipeline Penjualan Interaktif
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh kurikulum Vue 3 modern dari level pemula hingga mahir dalam aplikasi CRM produksi
- Mengelola alur pipeline penjualan dinamis dengan manipulasi state reaktif dan computed metrics
- Menerapkan kalkulasi finansial real-time (Closed Won, Total Pipeline, Conversion Win Rate)
- Membangun UI yang sangat modular, responsif, dan siap dikoneksikan ke backend REST / GraphQL
- Menghasilkan arsitektur frontend enterprise Vue 3 berkualitas tinggi dan mudah dirawat

---

## Program: Dashboard CRM Full-Feature dengan Drag & Drop Tahap, Pinia Store & Analitik

```vue
<!-- ===================================================================== -->
<!-- CAPSTONE: ENTERPRISE CRM DASHBOARD & SALES PIPELINE ENGINE             -->
<!-- ===================================================================== -->
<script setup>
import { ref, computed } from "vue";

// Data State Pipeline Penjualan
const stages = ["PROSPEK", "PROPOSAL", "NEGOSIASI", "DEAL"];

const leads = ref([
  { id: "L-1", nama: "PT Bank Mandiri Tbk", pic: "Agus Pratama", nilai: 450000000, stage: "NEGOSIASI" },
  { id: "L-2", nama: "Astra International", pic: "Siti Rahma", nilai: 750000000, stage: "PROPOSAL" },
  { id: "L-3", nama: "Telkomsel Solutions", pic: "Budi Santoso", nilai: 320000000, stage: "PROSPEK" },
  { id: "L-4", nama: "Unilever Indonesia", pic: "Dewi Lestari", nilai: 900000000, stage: "DEAL" }
]);

const stageFilter = ref("ALL");

// Metrik Finansial Reaktif (Computed)
const totalPipelineValue = computed(() => {
  return leads.value.reduce((sum, item) => sum + item.nilai, 0);
});

const totalWonDeal = computed(() => {
  return leads.value
    .filter((l) => l.stage === "DEAL")
    .reduce((sum, item) => sum + item.nilai, 0);
});

const filteredLeads = computed(() => {
  if (stageFilter.value === "ALL") return leads.value;
  return leads.value.filter((l) => l.stage === stageFilter.value);
});

function pindahkanStage(id, stageBaru) {
  const target = leads.value.find((l) => l.id === id);
  if (target) target.stage = stageBaru;
}

function hapusLead(id) {
  leads.value = leads.value.filter((l) => l.id !== id);
}
</script>

<template>
  <div style="max-width: 820px; margin: 24px auto; font-family: system-ui, sans-serif; padding: 0 16px;">
    <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px;">
      <div>
        <h2 style="margin: 0;">Nusa CRM Enterprise Dashboard</h2>
        <small style="color: #64748b;">Vue 3 Composition API • Reactive Sales Engine</small>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Closed Won Revenue</div>
        <div style="font-size: 20px; font-weight: bold; color: #16a34a;">
          Rp {{ (totalWonDeal / 1000000).toFixed(0) }} Juta
        </div>
      </div>
    </header>

    <!-- Bar Analitik Ringkasan -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0;">
      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
        <small style="color: #64748b;">Total Nilai Pipeline</small>
        <div style="font-size: 18px; font-weight: bold; margin-top: 4px;">Rp {{ (totalPipelineValue / 1000000).toFixed(0) }} Jt</div>
      </div>
      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
        <small style="color: #64748b;">Jumlah Leads Terdaftar</small>
        <div style="font-size: 18px; font-weight: bold; margin-top: 4px;">{{ leads.length }} Perusahaan</div>
      </div>
      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
        <small style="color: #64748b;">Win Rate Konversi</small>
        <div style="font-size: 18px; font-weight: bold; color: #2563eb; margin-top: 4px;">
          {{ leads.length > 0 ? ((leads.filter(l => l.stage === 'DEAL').length / leads.length) * 100).toFixed(0) : 0 }}%
        </div>
      </div>
    </div>

    <!-- Filter Tahapan -->
    <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center;">
      <span style="font-size: 13px; font-weight: bold;">Filter Tahap:</span>
      <select v-model="stageFilter" style="padding: 6px 12px; border-radius: 4px; border: 1px solid #cbd5e1;">
        <option value="ALL">Semua Tahap</option>
        <option v-for="s in stages" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <!-- Daftar Leads Pipeline -->
    <div style="display: grid; gap: 10px;">
      <div
        v-for="lead in filteredLeads"
        :key="lead.id"
        style="padding: 14px; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; background: white;"
      >
        <div>
          <div style="font-weight: bold; font-size: 16px;">{{ lead.nama }}</div>
          <small style="color: #64748b;">PIC: {{ lead.pic }} • Nilai: <strong>Rp {{ (lead.nilai / 1000000).toLocaleString('id-ID') }} Jt</strong></small>
        </div>

        <div style="display: flex; gap: 8px; align-items: center;">
          <select
            :value="lead.stage"
            @change="(e) => pindahkanStage(lead.id, e.target.value)"
            style="padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; border: 1px solid #cbd5e1;"
          >
            <option v-for="stg in stages" :key="stg" :value="stg">{{ stg }}</option>
          </select>

          <button @click="hapusLead(lead.id)" style="color: #dc2626; border: none; background: #fee2e2; padding: 6px 10px; border-radius: 4px; cursor: pointer;">
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## Konsep Kunci

### Arsitektur Capstone CRM Enterprise Dashboard
Aplikasi Capstone ini menyatukan seluruh pilar utama pengembangan Vue 3 modern:
1. **Reaktivitas Murni dan Performa**: Setiap kali tahap lead diubah (misalnya dari NEGOSIASI ke DEAL), seluruh metrik analitik (`totalWonDeal`, `totalPipelineValue`, dan `Win Rate %`) **dihitung ulang secara instan berkat caching reaktif `computed`**.
2. **Komposisi Deklaratif**: Pemfilteran tahapan pipeline dan pembaruan data terikat rapi melalui `v-model` dan dynamic bindings, tanpa satupun instruksi DOM manual.
3. **Kesiapan Integrasi Backend**: Struktur data `leads` dirancang modular sehingga mudah dihubungkan dengan Pinia Store, API Fetching, dan WebSocket untuk pembaruan multi-user secara real-time.

### Langkah Berikutnya: Svelte & Framework Lainnya
Dengan menyelesaikan track Vue 3 ini, Anda telah menguasai salah satu framework frontend paling elegan dan dicintai di dunia. Anda sekarang siap melanjutkan ke Svelte atau memperluas ke backend!

---

---

## Penjelasan untuk Pemula

### Analogi: Ruang Kendali Saham & Perdagangan Komoditas
Aplikasi CRM ini seperti ruang kendali bursa komoditas:
1. **Layar Atas (Computed Metrics)** adalah papan skor besar di dinding yang menghitung total nilai transaksi hari ini secara otomatis.
2. **Pipeline List** adalah meja perundingan: setiap kali pialang memindahkan berkas kontrak ke map 'DEAL' (*ganti stage*), papan skor di dinding langsung berbunyi dan menambahkan angka rupiah keuntungan perusahaan tanpa ada jeda.

## Eksperimen

- Ubah stage salah satu lead menjadi DEAL dan perhatikan Closed Won Revenue di pojok kanan atas bertambah instan.
- Gunakan dropdown Filter Tahap untuk melihat hanya lead yang berada di tahap NEGOSIASI.
- Hapus salah satu lead dan amati total nilai pipeline dan persentase win rate otomatis menyesuaikan.
- Hubungkan komponen ini dengan Pinia usePipelineStore yang sudah dibuat di materi Minggu 6.

---

## Tantangan

Tambahkan form modal kecil dengan `<Teleport to="body">` yang memungkinkan pengguna menambahkan prospek klien baru lengkap dengan validasi nama dan nominal.

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum Vue 3 Composition API dari nol hingga membangun Enterprise CRM Dashboard yang kaya fitur dan berkinerja tinggi.
