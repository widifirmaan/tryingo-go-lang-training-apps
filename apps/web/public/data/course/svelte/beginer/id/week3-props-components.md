# Props & Components

## Kenapa Materi Ini Penting

Svelte meng-comple reaktivitas saat build time - tanpa virtual DOM, hasilnya bundle super kecil dan runtime cepat. Filosofi "it looks like writing HTML" membuatnya bahasa framework paling menyenangkan untuk dipelajari.

Program latihan: *"Komponen Produk"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- export let untuk definisi props
- Default values untuk props
- Spread props: {...props}
- Component composition
- Slot untuk konten dinamis

---

## Program: Props & Component Composition

Program menulis komponen ProductCard yang menerima props, memakai snippet {#each}, dan memakai console simulation.

```svelte
<!-- ProductCard.svelte -->
<script lang="ts">
  let { name, price, category = 'General' } = $props();
  let formatted = $derived(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price));
</script>

<div class="card">
  <span class="emoji">{emoji}</span>
  <h3>{name}</h3>
  <p class="price">{formatted}</p>
</div>

<!-- App.svelte -->
<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  const products = [
    { name: 'Laptop', price: 15_000_000, category: 'Electronics' },
    { name: 'Mouse', price: 250_000 },
    { name: 'Monitor', price: 4_500_000, category: 'Peripherals' },
  ];
</script>

{#each products as p (p.name)}
  <ProductCard name={p.name} price={p.price} emoji={p.emoji} />
{/each}
```

---

## Konsep Kunci

### Rune $props

let { name, price } = $props() mendestrukturisasi props; default value juga bisa (category='General').

### Keyed each

{#each items as item (item.id)} memberi identitas: elemen DOM dipakai ulang dengan cerdas saat daftar berubah.

### $derived

Nilai ter-derive otomatis diperbarui ketika input berubah - tanpa watch/effect manual.

### Composition

Komponen kecil reusable = design system; tiap parent bisa memasang banyak instance dengan props berbeda tanpa duplikasi markup.

---

## Eksperimen

- Tambah prop `badge` yang tampil bila price > 10.000.000.
- Ganti kategori default untuk Mouse jadi Aksesoris.
- Tambah tombol "checkout" pada kartu dan bandingkan reaksi tiap kartu.

---

## Tantangan

Buat komponen <StatBadge label value color /> dan gunakan di tiga kartu untuk menampilkan stok tersisa.

---

## Ringkasan

Materi minggu ini telah dibahas: Props & Component Composition. Lanjut ke pekan berikutnya untuk memperdalam.
