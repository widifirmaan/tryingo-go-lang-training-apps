# Teleport Modal, Animasi <TransitionGroup> & Optimasi (shallowRef)

> **Kategori:** Vue | **Level:** Slots Lanjut, Animasi, Optimasi & Capstone CRM | **Minggu 9:** Teleport Modal, Animasi <TransitionGroup> & Optimasi (shallowRef)

## Tujuan Pembelajaran

- Memahami masalah stacking context z-index dan cara mengatasinya dengan <Teleport>
- Memindahkan modal dialog dan drawer langsung ke target DOM luar (misal: <body>)
- Menggunakan <Transition> untuk menganimasikan elemen masuk dan keluar dengan CSS kelas terprediksi
- Menerapkan <TransitionGroup> untuk animasi pergeseran, penambahan, dan penghapusan list halus
- Mengoptimalkan performa data raksasa menggunakan shallowRef() untuk menghindari deep proxy overhead

---

## Program: Modal Drawer CRM & Kanban Board Animasi Halus

```vue
<script setup>
import { ref, shallowRef } from "vue";

const isModalBuka = ref(false);

// shallowRef: Hanya melacak perubahan referensi tingkat atas (.value = baru), menghemat komputasi pada array 10.000 data
const listLeads = shallowRef([
  { id: 1, nama: "PT Telkom Akses", nilai: "Rp 150 Jt" },
  { id: 2, nama: "PT Bank Mandiri", nilai: "Rp 500 Jt" },
  { id: 3, nama: "PT Indofood CBP", nilai: "Rp 320 Jt" }
]);

function hapusItem(id) {
  // Karena shallowRef, kita wajib membuat salinan array baru untuk memicu reaktivitas
  listLeads.value = listLeads.value.filter((item) => item.id !== id);
}

function tambahCepat() {
  const baru = { id: Date.now(), nama: "Lead Baru Prospek", nilai: "Rp 100 Jt" };
  listLeads.value = [baru, ...listLeads.value];
}
</script>

<template>
  <div style="max-width: 480px; margin: 20px auto; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <h3>Pipeline Leads Aktif</h3>
      <div>
        <button @click="tambahCepat" style="margin-right: 6px; padding: 6px 10px; cursor: pointer;">+ Tambah</button>
        <button @click="isModalBuka = true" style="background: #0f172a; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
          Buka Drawer
        </button>
      </div>
    </div>

    <!-- TransitionGroup: Menghidupkan animasi penambahan, penghapusan, dan pergeseran list secara otomatis -->
    <TransitionGroup name="list" tag="ul" style="list-style: none; padding: 0; margin: 0;">
      <li
        v-for="item in listLeads"
        :key="item.id"
        style="padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; background: white;"
      >
        <span>{{ item.nama }} ({{ item.nilai }})</span>
        <button @click="hapusItem(item.id)" style="color: red; border: none; background: none; cursor: pointer;">✕</button>
      </li>
    </TransitionGroup>

    <!-- Teleport: Memindahkan elemen modal keluar dari hierarki DOM komponen ke <body> langsung -->
    <Teleport to="body">
      <div v-if="isModalBuka" style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: flex-end; z-index: 9999;">
        <div style="width: 320px; background: white; height: 100%; padding: 20px; box-shadow: -2px 0 8px rgba(0,0,0,0.2);">
          <h3>Drawer Pengaturan CRM</h3>
          <p style="font-size: 13px; color: #64748b;">Modal ini di-teleport langsung ke &lt;body&gt; agar tidak terjebak z-index parent!</p>
          <button @click="isModalBuka = false" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Tutup Drawer
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Animasi Transisi Halus untuk List */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

---

## Konsep Kunci

### Mengapa Membutuhkan `<Teleport>`?
Ketika Anda membangun komponen modal atau popup di dalam kartu kecil yang memiliki properti CSS `overflow: hidden` atau `transform`, modal Anda akan terpotong secara visual atau berada di bawah elemen lain (*z-index trap*).
`<Teleport to="body">` secara magis **memindahkan render fisik elemen HTML modal ke akhir tag `<body>`**, namun kode komponennya tetap berada di dalam komponen Vue Anda dan tetap dapat mengakses state reaktif yang sama!

### Animasi Halus dengan `<TransitionGroup>`
Vue memiliki sistem transisi bawaan terbaik di industri:
1. `name-enter-from` -> `name-enter-to`
2. `name-leave-from` -> `name-leave-to`
Ketika item dihapus dari list, Vue secara otomatis menyematkan kelas CSS transisi dan menghitung posisi pergeseran item lain (*FLIP animation*), menghasilkan animasi antarmuka yang sangat anggun tanpa library pihak ketiga.

### shallowRef untuk Performa Ekstrem
Jika Anda memuat data 10.000 log server atau data geospasial besar, `ref()` biasa akan membungkus setiap properti bersarang dengan Proxy (membutuhkan banyak RAM).
`shallowRef()` hanya membuat properti `.value` yang reaktif. Objek di dalamnya tidak di-proxy, menghemat memori hingga 80%.

---

---

## Penjelasan untuk Pemula

### Analogi: Pintu Kemana Saja Doraemon & Balon Mengambang
1. **`<Teleport>`** seperti Pintu Kemana Saja: Anda menyalakan sakelar di dalam kamar tidur sempit (*komponen kartu anak*), tetapi pintu langsung terbuka di tengah alun-alun kota yang luas (*body dokumen*) sehingga Anda bebas membentangkan tenda raksasa (*modal dialog*) tanpa terhalang dinding kamar.
2. **TransitionGroup** seperti antrean orang berbaris rapi: saat orang di depan keluar antrean, orang di belakangnya melangkah maju secara anggun dan teratur.

## Eksperimen

- Buka Elements tab di Chrome DevTools, klik tombol "Buka Drawer", dan perhatikan elemen div modal muncul tepat di bawah <body>.
- Hapus salah satu item dari list dan amati animasi menghilang ke kanan secara halus berkat TransitionGroup.
- Klik "+ Tambah" dan perhatikan item baru meluncur dari atas dengan animasi elegan.
- Uji perbedaan shallowRef vs ref biasa pada objek bertingkat saat Anda mengubah properti dalamnya.

---

## Tantangan

Implementasikan transisi fade untuk backdrop modal gelap menggunakan `<Transition name="fade">` saat drawer dibuka dan ditutup.

---

## Ringkasan

Kamu telah menguasai Teleport to body, animasi TransitionGroup, dan optimasi performa shallowRef. Minggu depan adalah Capstone Final: Enterprise CRM Dashboard.
