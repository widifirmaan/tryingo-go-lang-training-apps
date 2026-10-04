# Lifecycle Hooks: onMounted, onUnmounted & Template Refs (useTemplateRef)

> **Kategori:** Vue | **Level:** Composition API, Reaktivitas & Komponen | **Minggu 4:** Lifecycle Hooks: onMounted, onUnmounted & Template Refs (useTemplateRef)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami urutan siklus hidup komponen Vue: onMounted, onUpdated, onUnmounted
- Mengakses elemen DOM browser secara aman menggunakan Template Refs (useTemplateRef)
- Menginisialisasi koneksi websocket atau timer interval di dalam hook onMounted
- Mencegah memory leak fatal dengan membersihkan event listener dan timer di onUnmounted
- Menghindari manipulasi DOM langsung sebelum hook onMounted terpanggil

---

## Program: Umpan Aktivitas CRM Real-Time dengan Polling & Auto-Focus DOM

```vue
<script setup>
import { ref, onMounted, onUnmounted, useTemplateRef } from "vue";

const aktivitasList = ref([]);
const inputRef = useTemplateRef("inputAktivitasBaru"); // Vue 3.5+ Template Ref API
const teksAktivitas = ref("");
let timerPolling = null;

// 1. onMounted: Dijalankan setelah komponen terpasang di DOM browser
onMounted(() => {
  console.log("[Lifecycle] Komponen CRM Activity mounted. Memulai polling...");
  
  // Fokuskan kursor otomatis ke elemen input tanpa library pihak ketiga
  inputRef.value?.focus();

  // Simulasi polling data aktivitas baru setiap 4 detik
  timerPolling = setInterval(() => {
    const waktu = new Date().toLocaleTimeString("id-ID");
    aktivitasList.value.unshift({
      id: Date.now(),
      pesan: `Panggilan keluar ke klien pada ${waktu}`,
      tipe: "CALL"
    });
    // Batasi 5 riwayat teratas
    if (aktivitasList.value.length > 5) aktivitasList.value.pop();
  }, 4000);
});

// 2. onUnmounted: Pembersihan memori saat komponen dihancurkan (mencegah memory leak)
onUnmounted(() => {
  console.log("[Lifecycle] Membersihkan interval timer polling CRM.");
  if (timerPolling) clearInterval(timerPolling);
});

function kirimCatatan() {
  if (!teksAktivitas.value.trim()) return;
  aktivitasList.value.unshift({
    id: Date.now(),
    pesan: teksAktivitas.value,
    tipe: "MANUAL"
  });
  teksAktivitas.value = "";
  inputRef.value?.focus();
}
</script>

<template>
  <div style="max-width: 450px; margin: 20px auto; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
    <h3>Umpan Aktivitas Sales Real-Time</h3>

    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <input
        ref="inputAktivitasBaru"
        type="text"
        v-model="teksAktivitas"
        placeholder="Catat aktivitas manual..."
        style="flex: 1; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px;"
        @keyup.enter="kirimCatatan"
      />
      <button @click="kirimCatatan" style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
        Kirim
      </button>
    </div>

    <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
      Status: <span style="color: green;">● Polling Otomatis Aktif (4s)</span>
    </div>

    <ul style="list-style: none; padding: 0; margin: 0;">
      <li
        v-for="item in aktivitasList"
        :key="item.id"
        style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-size: 13px; display: flex; justify-content: space-between;"
      >
        <span>{{ item.pesan }}</span>
        <span style="font-size: 10px; background: #e2e8f0; padding: 2px 6px; border-radius: 3px;">{{ item.tipe }}</span>
      </li>
    </ul>
  </div>
</template>
```

---

## Konsep Kunci

### Siklus Hidup Komponen Vue 3
Sebuah komponen Vue melewati beberapa fase:
1. **Setup / Creation**: Kode di dalam `<script setup>` dieksekusi. State reaktif dibuat, namun **elemen DOM HTML belum ada di layar!** (Jangan panggil `.focus()` atau `document.querySelector` di sini).
2. **`onMounted()`**: Komponen selesai dirender dan dipasang ke DOM browser. Ini adalah waktu yang tepat untuk: auto-focus input, mengambil data dari API, atau menginisialisasi chart grafik (Chart.js / Leaflet).
3. **`onUpdated()`**: Dipanggil saat data reaktif berubah dan DOM telah selesai diperbarui.
4. **`onUnmounted()`**: Komponen dihapus dari layar. **Wajib membersihkan `clearInterval`, `removeEventListener`, dan koneksi socket** agar browser pengguna tidak melambat.

### Template Refs Modern (`useTemplateRef`)
Di Vue 3.5+, cara terbaik mengambil referensi elemen DOM adalah menggunakan macro `useTemplateRef('namaRef')`. Ini menghasilkan ref yang akan otomatis terisi dengan elemen HTML asli begitu komponen mencapai tahap `onMounted`.

---

---

## Penjelasan untuk Pemula

### Analogi: Panggung Teater Sandiwara
1. **`<script setup>`** seperti ruang ganti di belakang panggung: para aktor menghafal naskah (*state*), tetapi penonton belum melihat apapun di panggung.
2. **`onMounted`** seperti tirai panggung dibuka: lampu sorot menyala, aktor melangkah ke panggung (*DOM siap*), dan musik orkestra mulai dimainkan (*polling timer*).
3. **`onUnmounted`** seperti pementasan selesai dan lampu gedung dimatikan: pemusik berhenti bermain biola dan merapikan alat musik (*clearInterval*) agar gedung tidak boros listrik semalaman.

## Eksperimen

- Buka halaman dan perhatikan kursor otomatis fokus ke input tanpa perlu Anda klik berkat template ref.
- Tunggu selama 4 detik dan saksikan aktivitas baru muncul otomatis dari simulasi polling.
- Tinggalkan halaman komponen ini dan amati pesan log onUnmounted membersihkan timer di konsol.
- Gunakan hook onUpdated untuk mendeteksi kapan saja aktivitasList selesai dirender ke DOM.

---

## Tantangan

Gunakan `useTemplateRef` untuk membuat scroll otomatis ke bagian paling bawah daftar aktivitas setiap kali ada aktivitas baru yang masuk, menggunakan method `element.scrollTop = element.scrollHeight`.

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

Kamu telah menguasai lifecycle hooks onMounted/onUnmounted dan template refs DOM. Minggu depan kita memasuki Level 2: Composables dan Pinia State Management.
