# Form & v-model

> Vue | Foundasi Vue | Pelajaran 5

## Tujuan Pembelajaran

- Mengikat input dengan v-model (two-way binding)
- Memahami v-model = :value + @input
- Menggunakan modifiers .trim / .number / .lazy
- Menggunakan v-model pada checkbox, select, textarea

---

## Program: Form & v-model

```vue
<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const level = ref('beginner')
const interests = ref(['vue'])
const bio = ref('')
const agree = ref(false)

const charCount = computed(() => bio.value.length)

const summary = computed(() => ({
  name: name.value,
  email: email.value,
  level: level.value,
  interests: interests.value,
  agree: agree.value,
}))
</script>

<template>
  <h1>Profil Belajar</h1>
  <form @submit.prevent>
    <label>Nama: <input v-model.trim="name" placeholder="Nama kamu" /></label>
    <label>Email: <input v-model.trim="email" type="email" /></label>
    <label>
      Level:
      <select v-model="level">
        <option value="beginner">Pemula</option>
        <option value="intermediate">Menengah</option>
        <option value="advanced">Lanjutan</option>
      </select>
    </label>
    <fieldset>
      <legend>Minat:</legend>
      <label><input type="checkbox" value="vue" v-model="interests" /> Vue</label>
      <label><input type="checkbox" value="ts" v-model="interests" /> TypeScript</label>
      <label><input type="checkbox" value="nuxt" v-model="interests" /> Nuxt</label>
    </fieldset>
    <label>
      Bio:
      <textarea v-model="bio" rows="3"></textarea>
      ({{ charCount }} karakter)
    </label>
    <label><input type="checkbox" v-model="agree" /> Setuju syarat</label>
  </form>

  <h2>Pratinjau Langsung</h2>
  <pre>{{ summary }}</pre>
  <p v-if="agree">Siap belajar! 👋</p>
</template>

<style scoped>
label, fieldset { display: block; margin: 0.6rem 0; }
pre { background: #f4f4f4; padding: 1rem; border-radius: 8px; }
</style>

```

---

## Penjelasan

## v-model = Dua Arah
`v-model` membaca nilai input DAN menulis kembali state saat user mengetik — sintaks gula dari `:value` + `@input`. Perubahan state langsung tercermin (contoh: pratinjau live).

## Modifiers
`.trim` menghapus spasi kiri/kanan otomatis (cocok untuk nama/email), `.number` mengubah input menjadi number (bukan string), `.lazy` memperbarui state saat event change, bukan setiap keystroke.

## Tipe Input Berbeda
Checkbox: `v-model` = boolean (atau array dengan `value` untuk multi-select — contoh interests). Select: `v-model` terikat pada `value` option. Textarea: sama seperti text biasa.

## Trap: Number vs String
Tanpa `.number`, `<input type="number">` tetap menghasilkan string ("12" bukan 12). Perbandingan `age > 18` akan salah arah saat umur = "9" vs 18 (string dibandingkan leksikografis). Gunakan `.number` atau parse eksplisit.

---

## Eksperimen

1. **v-model = Dua Arah**
2. **Modifiers**
3. **Tipe Input Berbeda**
4. **Trap: Number vs String**

---

## Tantangan

Buat form checkout mini: nama, alamat, jumlah item (dengan .number), metode pembayaran (radio). Tampilkan ringkasan pesanan live. Nonaktifkan tombol "Bayar" selama form belum lengkap (computed).

---

## Ringkasan

v-model = :value + @input. .trim/.number/.lazy. Checkbox boolean/array, select, textarea. Tanpa .number = string! Lanjut: computed & watch.
