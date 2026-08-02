# Transisi & Teleport

> Vue | Production-Grade | Pelajaran 20

## Tujuan Pembelajaran

- Menganimasikan masuk/keluar elemen dengan Transition
- Menganimasikan list dengan TransitionGroup (+key!)
- Menukar komponen dengan <component :is>
- Merender ke luar pohon DOM dengan Teleport

---

## Program: Transisi & Teleport

```vue
<script setup>
import { ref } from 'vue'

const show = ref(false)
const items = ref(['Item 1', 'Item 2', 'Item 3'])
const dynamic = ref('card-a')

const components = {
  'card-a': { template: '<p class="dyn">Kartu A</p>' },
  'card-b': { template: '<p class="dyn">Kartu B</p>' },
}
</script>

<template>
  <h1>Transisi & Teleport</h1>

  <button @click="show = !show">Toggle Kotak</button>
  <Transition name="fade">
    <div v-if="show" class="box">Muncul & hilang dengan animasi</div>
  </Transition>

  <h2>TransitionGroup (list)</h2>
  <button @click="items.push('Item ' + (items.length + 1))">Tambah</button>
  <button @click="items.shift()">Hapus pertama</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </TransitionGroup>

  <h2>Komponen Dinamis</h2>
  <select v-model="dynamic">
    <option value="card-a">Kartu A</option>
    <option value="card-b">Kartu B</option>
  </select>
  <component :is="components[dynamic]" />

  <h2>Teleport</h2>
  <Teleport to="body">
    <p class="teletip">Saya di-render di &lt;body&gt;, bukan di sini!</p>
  </Teleport>
</template>

<style scoped>
.box { padding: 1rem; border: 1px solid #42B883; border-radius: 8px; margin: 0.5rem 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.list-enter-active, .list-leave-active { transition: all 0.3s; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(20px); }
.dyn { border: 1px dashed #42B883; padding: 0.6rem; border-radius: 8px; }
.teletip { position: fixed; bottom: 1rem; right: 1rem; background: #42B883; color: #fff; padding: 0.6rem 1rem; border-radius: 8px; }
</style>

```

---

## Penjelasan

## Transition
`<Transition>` membungkus satu elemen: kelas `enter-from/enter-active/enter-to` dan `leave-*` otomatis saat v-if/v-show berubah. Animasi CSS di stylesheet komponen. Untuk elemen yang bertukar (counter), tambahkan :key agar transisi antar nilai berjalan.

## TransitionGroup
Untuk LIST: memerlukan `:key` (identitas! pelajaran 4) di tiap item — tanpa key, Vue tidak tahu item mana masuk/keluar/pindah. Class `list-*` + `move` untuk animasi posisi.

## Komponen Dinamis
`<component :is="...">` menukar komponen saat nilai :is berubah. Sering dipakai dengan `<KeepAlive>` (state tersimpan saat beralih) dan tab panel.

## Teleport
`<Teleport to="body">` memindahkan render DOM ke target (body, modal root) tanpa mengubah logika komponen. Dipakai: modal (bebas overflow), tooltip, toast. Modal pelajaran 12 memakai pola ini.

---

## Eksperimen

1. **Transition**
2. **TransitionGroup**
3. **Komponen Dinamis**
4. **Teleport**

---

## Tantangan

Buat toast notification system: Teleport ke body + TransitionGroup, list toasts {id, pesan, tipe}, auto-hilang 3 detik (setTimeout + hapus). Animasi slide dari kanan. Bonus: tombol "hapus semua" dengan animasi.

---

## Ringkasan

Transition (1 elemen), TransitionGroup (list + :key!), <component :is> dinamis, Teleport (body). Modal + toast = pola nyata. Lanjut: performansi.
