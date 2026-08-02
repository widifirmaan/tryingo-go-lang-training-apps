# Proyek: E-commerce

> Vue | Production-Grade | Pelajaran 23

## Tujuan Pembelajaran

- Membangun app e-commerce dengan Pinia store
- Mengelola kuantitas & total dengan getters
- Memisahkan komponen presentasi vs state global
- Menerapkan semua pola: props, emits, store, computed

---

## Program: Proyek: E-commerce

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )
  const count = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  function add(product) {
    const found = items.value.find((i) => i.id === product.id)
    if (found) found.qty += 1
    else items.value.push({ ...product, qty: 1 })
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, total, count, add, remove, clear }
})

```

---

## Penjelasan

## Checkpoint Fase 4
Proyek ini merangkum semuanya: computed (total/count), store actions (add/remove/clear), storeToRefs (destructuring aman), komponen presentasi murni (ProductList hanya memanggil action store). Jika semua berjalan, kamu siap fase produksi.

## Cart Logic di Store
Kuantitas = logika bisnis → hidup di store (getters + actions), bukan di komponen. ProductList dan CartDrawer berbagi satu cart; keduanya update otomatis karena membaca ref yang sama (state global Pinia).

## Presentasi vs State
`ProductList` hanya UI + memanggil `cart.add(p)` — tidak menyimpan apa pun. Ini pola smart/dumb: komponen "dumb" menerima/memanggil, komponen "smart" (App) mengatur. Konsisten dan mudah dites.

## Lanjut ke Capstone
Semua bahan sudah lengkap: form validation (19), transisi (20), performansi (21), testing (22). Capstone (fase 5) menggabungkan dengan ecosystem tools (Nuxt, i18n, deploy).

---

## Eksperimen

1. **Checkpoint Fase 4**
2. **Cart Logic di Store**
3. **Presentasi vs State**
4. **Lanjut ke Capstone**

---

## Tantangan

Perluas: (1) filter kategori di ProductList (computed), (2) tombol -/+ per item di drawer, (3) checkout form (nama, email, alamat) dengan validasi → pesan sukses + cart.clear(), (4) tes Vitest untuk store cart (pola pelajaran 22).

---

## Ringkasan

E-commerce: store berisi logika bisnis, komponen presentasi murni. storeToRefs + getters. Checkpoint fase 4 lengkap. Lanjut: fase ekosistem.
