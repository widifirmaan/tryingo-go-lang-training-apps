# Komponen Tingkat Lanjut: Scoped Slots, Dinamis (<component :is>) & KeepAlive

> **Kategori:** Vue | **Level:** Slots Lanjut, Animasi, Optimasi & Capstone CRM | **Minggu 8:** Komponen Tingkat Lanjut: Scoped Slots, Dinamis (<component :is>) & KeepAlive
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Transklusi dan Slots untuk komposisi komponen tingkat tinggi
- Menggunakan Named Slots (v-slot:header atau #header) untuk multi-area konten fleksibel
- Menguasai Scoped Slots: komponen anak mengekspos data internal ke template parent
- Menggunakan elemen khusus <component :is="activeTab"> untuk render komponen dinamis
- Membungkus komponen dengan <KeepAlive> untuk mempertahankan state form saat berganti tab

---

## Program: Sistem Kartu Widget Dashboard CRM yang Dapat Disesuaikan (Customizable)

```vue
<!-- ===================================================================== -->
<!-- File: WidgetContainer.vue (Komponen Pembungkus dengan Scoped Slots)       -->
<!-- ===================================================================== -->
<script setup>
import { ref } from "vue";

defineProps({
  judul: String
});

const isCollapsed = ref(false);
const waktuDiperbarui = ref(new Date().toLocaleTimeString("id-ID"));

function refreshWidget() {
  waktuDiperbarui.value = new Date().toLocaleTimeString("id-ID");
}
</script>

<template>
  <div style="border: 1px solid #cbd5e1; border-radius: 8px; background: white; margin-bottom: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #f1f5f9;">
      <!-- Named Slot: Header Kustom -->
      <slot name="header" :judul="judul">
        <h4 style="margin: 0;">{{ judul }}</h4>
      </slot>

      <div style="display: flex; gap: 8px;">
        <button @click="refreshWidget" style="font-size: 11px; cursor: pointer;">↻ Refresh</button>
        <button @click="isCollapsed = !isCollapsed" style="font-size: 11px; cursor: pointer;">
          {{ isCollapsed ? "Buka" : "Tutup" }}
        </button>
      </div>
    </div>

    <!-- Scoped Slot Default: Mengalirkan data waktuDiperbarui ke Parent -->
    <div v-show="!isCollapsed" style="padding: 16px;">
      <slot :terakhirSync="waktuDiperbarui">
        <p style="color: #94a3b8; font-size: 13px;">Tidak ada konten widget.</p>
      </slot>
    </div>
  </div>
</template>
```

---

## Konsep Kunci

### Scoped Slots: Pola Desain Paling Kuat di Vue
Pada slot biasa, parent hanya menyisipkan markup ke dalam anak.
Pada **Scoped Slots**, komponen anak **mengirimkan data internalnya ke parent** untuk ditentukan bagaimana data tersebut harus ditampilkan!
Misalnya pada komponen tabel data: anak mengelola sorting dan pagination, namun anak memberikan data baris kepada parent melalui scoped slot: `<template #default="{ row }">`.
Parent memiliki kebebasan 100% mendesain tampilan kartu, teks tebal, atau avatar tanpa perlu mengubah kode komponen tabel!

### `<component :is="...">` dan `<KeepAlive>`
Ketika Anda memiliki navigasi multi-tab (Tab Lead, Tab Deals, Tab Kontak):
Daripada menulis banyak `v-if` / `v-else-if`, gunakan `<component :is="tabAktif" />`.
Jika Anda membungkusnya dengan `<KeepAlive>`:
Saat pengguna berpindah dari Tab 1 ke Tab 2 lalu kembali lagi ke Tab 1, **isi form yang sudah diketik pengguna tidak akan hilang**, karena Vue tidak menghancurkan (*unmount*) komponen tersebut melainkan hanya menonaktifkannya di memori!

---

---

## Penjelasan untuk Pemula

### Analogi: Bingkai Pigura Foto & Tempat Duduk Bioskop Bernomor
1. **Scoped Slot** seperti bingkai foto pintar: toko menyediakan bingkai kayu elegan (*komponen container*), namun Anda bebas memasukkan foto pernikahan, ijazah, atau lukisan pemandangan di dalamnya. Bingkai memberi tahu Anda ukuran fotonya (*slot props*).
2. **KeepAlive** seperti meletakkan jaket di kursi bioskop saat Anda keluar sebentar membeli popcorn: saat Anda kembali, kursi Anda masih tersimpan untuk Anda, tidak ada orang lain yang mendudukinya.

## Eksperimen

- Gunakan sintaks #header="{ judul }" di parent untuk mengubah judul widget menjadi huruf kapital merah.
- Gunakan data terakhirSync dari scoped slot default untuk menampilkan jam sinkronisasi di footer kartu.
- Uji perpindahan tab dengan dan tanpa <KeepAlive> untuk melihat bagaimana state input bertahan atau ter-reset.
- Kombinasikan komponen dinamis dengan dropdown select untuk beralih antar 3 widget yang berbeda.

---

## Tantangan

Buat komponen `DataTable.vue` yang menggunakan Scoped Slots untuk merender kolom tabel secara dinamis, sehingga parent dapat mengustomisasi isi kolom status dengan badge warna-warni.

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

Kamu telah menguasai Scoped Slots, komponen dinamis <component :is>, dan cache memori <KeepAlive>. Minggu depan kita mempelajari Teleport, Transition, dan Optimasi.
