# Komponen Tingkat Lanjut: Scoped Slots, Dinamis (<component :is>) & KeepAlive

> **Kategori:** Vue | **Level:** Slots Lanjut, Animasi, Optimasi & Capstone CRM | **Minggu 8:** Komponen Tingkat Lanjut: Scoped Slots, Dinamis (<component :is>) & KeepAlive

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

## Ringkasan

Kamu telah menguasai Scoped Slots, komponen dinamis <component :is>, dan cache memori <KeepAlive>. Minggu depan kita mempelajari Teleport, Transition, dan Optimasi.
