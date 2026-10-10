# Vue 3 Single File Components (.vue): <script setup>, ref vs reactive

> **Kategori:** Vue | **Level:** Composition API, Reaktivitas & Komponen | **Minggu 1:** Vue 3 Single File Components (.vue): <script setup>, ref vs reactive
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi Single File Components (.vue) yang menyatukan template, script, dan style
- Menguasai sintaks modern Vue 3 <script setup> tanpa boilerplate export default
- Membedakan kapan menggunakan ref() (primitif, .value) vs reactive() (objek bersarang)
- Menggunakan Template Directives: v-bind (:), v-on (@), dan v-model
- Mengisolasi gaya CSS menggunakan atribut scoped untuk mencegah kebocoran styling global

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Vue - Official (Volar)** (`vue.volar`): Dukungan bahasa, intellisense, & TypeScript untuk .vue
- **ESLint** (`dbaeumer.vscode-eslint`): Linting kode JavaScript/Vue

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension vue.volar --install-extension dbaeumer.vscode-eslint
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v20.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** Ekstensi Volar akan mengambil alih TypeScript server untuk mendeteksi tipe dalam template SFC.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npm create vue@latest my-vue-app
cd my-vue-app
npm install
```
- **Keterangan:** Menjalankan generator resmi Vue CLI untuk memilih TypeScript, Vue Router, Pinia, dan ESLint.
- **Pindah ke direktori project:**
```bash
cd my-vue-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm run dev
```
Akses di browser atau terminal: `http://localhost:5173`

> ℹ️ Buka http://localhost:5173 untuk melihat aplikasi Vue aktif.

**File Titik Masuk Utama (`src/App.vue`):**
```vue
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const title = 'Halo dari Vue 3 & Composition API!';
</script>

<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <button @click="count++">
      Ditekan: {{ count }} kali
    </button>
  </main>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 4rem;
  font-family: system-ui, sans-serif;
}
button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: #42b883;
  color: white;
  border: none;
  font-weight: bold;
}
</style>
```
Komponen SFC Vue 3 dengan <script setup> dan reactive ref().

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-vue-app/
├── src/
│   ├── assets/          # Logo dan gambar
│   ├── components/      # Komponen Vue reusable
│   ├── App.vue          # Root Single-File Component
│   └── main.ts          # Mount instance Vue ke DOM
├── index.html           # Shell HTML utama
├── vite.config.ts       # Vite config dengan plugin @vitejs/plugin-vue
└── package.json         # Dependensi Vue 3 & Pinia
```
File .vue menggabungkan <template>, <script setup>, dan <style scoped> dalam satu file.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `ref()` untuk tipe primitif (angka, boolean, string) dan `reactive()` untuk objek.
- Gunakan Pinia (`npm i pinia`) sebagai store global resmi pengganti Vuex.

---

## Program: Kartu Calon Pelanggan (CRM Lead Card) Reaktif

```vue
<script setup>
import { ref, reactive } from "vue";

// 1. ref: Membungkus nilai primitif ke dalam objek reaktif (.value)
const judulKartu = ref("Lead Prospek Enterprise");
const sedangFollowUp = ref(false);

// 2. reactive: Membungkus objek data terstruktur secara mendalam (deep reactivity)
const lead = reactive({
  id: "LEAD-101",
  namaPerusahaan: "PT Nusa Teknologi Mandiri",
  kontakPerson: "Dewi Lestari",
  estimasiNilai: 85000000,
  status: "PROSPEK" // "PROSPEK" | "NEGOSIASI" | "DEAL" | "LOST"
});

function toggleFollowUp() {
  sedangFollowUp.value = !sedangFollowUp.value;
}

function naikkanStatus() {
  if (lead.status === "PROSPEK") lead.status = "NEGOSIASI";
  else if (lead.status === "NEGOSIASI") lead.status = "DEAL";
}
</script>

<template>
  <div class="lead-card" :class="{ 'highlight': sedangFollowUp }">
    <div class="header">
      <h3>{{ judulKartu }}</h3>
      <span class="badge" :data-status="lead.status">{{ lead.status }}</span>
    </div>

    <p class="company">{{ lead.namaPerusahaan }}</p>
    <p class="contact">PIC: <strong>{{ lead.kontakPerson }}</strong></p>
    <div class="value">Rp {{ lead.estimasiNilai.toLocaleString('id-ID') }}</div>

    <div class="actions">
      <button @click="toggleFollowUp">
        {{ sedangFollowUp ? "Selesai Kontak" : "Tandai Follow-Up" }}
      </button>
      <button @click="naikkanStatus" class="btn-primary" :disabled="lead.status === 'DEAL'">
        {{ lead.status === 'DEAL' ? "Sudah Deal ✓" : "Progres Status →" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.lead-card {
  max-width: 420px;
  margin: 20px auto;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: white;
  font-family: sans-serif;
  transition: all 0.2s ease;
}
.lead-card.highlight {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.header { display: flex; justify-content: space-between; align-items: center; }
.header h3 { margin: 0; font-size: 16px; }
.badge { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: bold; background: #e2e8f0; }
.badge[data-status="DEAL"] { background: #dcfce7; color: #15803d; }
.badge[data-status="NEGOSIASI"] { background: #fef3c7; color: #b45309; }
.company { font-weight: bold; font-size: 18px; margin: 12px 0 4px 0; }
.contact { font-size: 13px; color: #64748b; margin: 0 0 12px 0; }
.value { font-size: 20px; color: #0f172a; font-weight: bold; margin-bottom: 16px; }
.actions { display: flex; gap: 8px; }
button { padding: 8px 12px; border-radius: 4px; border: 1px solid #cbd5e1; cursor: pointer; }
.btn-primary { background: #0f172a; color: white; border: none; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
```

---

## Konsep Kunci

### Mengapa Vue 3 Composition API dengan `<script setup>`?
Di Vue 2 (Options API), kode dipecah ke dalam opsi terpisah (`data`, `methods`, `computed`, `watch`). Ketika komponen membesar hingga 500 baris, logika untuk satu fitur (misalnya fitur keranjang belanja) tersebar di 4 tempat berbeda.
Dengan **Composition API (`<script setup>`)**:
1. Anda mengelompokkan kode berdasarkan **fitur logika**, bukan berdasarkan opsi struktur.
2. Tidak perlu kata kunci `this` yang membingungkan.
3. Kinerja kompilasi lebih cepat dan dukungan TypeScript yang sempurna.

### Memahami `ref` vs `reactive`
Sistem reaktivitas Vue 3 ditenagai oleh **JavaScript Proxy**:
- **`ref(initialValue)`**: Membungkus nilai apa saja (angka, string, boolean, objek). Di dalam `<script>`, Anda wajib mengaksesnya via `.value` (`sedangFollowUp.value = true`). Namun di dalam `<template>`, Vue **membongkar (.value) secara otomatis**, sehingga Anda cukup menulis `{{ sedangFollowUp }}`.
- **`reactive(object)`**: Hanya menerima objek/array. Anda tidak perlu menulis `.value` (`lead.status = 'DEAL'`). Namun hati-hati: Anda tidak boleh melakukan destrukturisasi `const { status } = lead` karena reaktivitasnya akan terputus!

---

---

## Penjelasan untuk Pemula

### Analogi: Kartu Nama Pintar & Sensor Alarm Rumah
1. **SFC (.vue)** seperti rumah lengkap: `<template>` adalah ruang tamu (yang dilihat tamu), `<script>` adalah mesin listrik di garasi (logika), dan `<style scoped>` adalah warna cat dinding kamar sendiri yang tidak mencoreti dinding rumah tetangga.
2. **Reaktivitas ref/reactive** seperti termostat pendingin ruangan (AC): begitu suhu ruangan naik 1 derajat (*data berubah*), sensor otomatis menyalakan kompresor dan mengubah tampilan angka di layar remote seketika (*template update otomatis*).

## Eksperimen

- Klik tombol "Tandai Follow-Up" dan perhatikan border kartu berubah biru menyala berkat class binding reaktif.
- Klik tombol "Progres Status" hingga status menjadi DEAL dan buktikan tombol otomatis terkunci (disabled).
- Coba ubah judulKartu tanpa .value di dalam fungsi toggleFollowUp dan amati mengapa reaktivitas gagal.
- Tambahkan input teks dengan v-model="lead.namaPerusahaan" di dalam template dan amati perubahan nama secara instan.

---

## Tantangan

Tambahkan properti `sumberLead` ("WEBSITE" | "REFERRAL" | "COLD_CALL") ke dalam objek reactive `lead`, dan tampilkan ikon unik di samping nama kontak menggunakan direktif `v-if` / `v-else-if`.

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

Kamu telah menguasai Single File Components, <script setup>, ref vs reactive, dan template directives. Minggu depan kita mempelajari Computed Properties dan Watchers.
