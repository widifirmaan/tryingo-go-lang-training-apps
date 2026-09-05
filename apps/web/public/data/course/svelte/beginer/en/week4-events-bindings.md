# Events & Bindings — Telinga & Tali Svelte

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 4:** Events & Bindings

## Tujuan Pembelajaran

- `on:click` telinga, `bind:value` tali 2 arah, `bind:group` untuk radio, `on:input` ketik

---

## Kenapa Ini Penting Buat Kamu?

Form warung tanpa `bind` = ketik tidak masuk `pelanggan`. Dengan `bind:value`, ketik → `pelanggan` otomatis.

---

## Program: Form Warung Svelte

```svelte
<script>
  let pelanggan = "";
  let qty = 1;
  let kategori = "sembako";
  let daftar = [];
  function tambah(){ if(!pelanggan.trim()) return; daftar = [...daftar, { id: Date.now(), pelanggan, qty, kategori }]; pelanggan = ""; }
</script>

<input bind:value={pelanggan} placeholder="Nama" />
<input type="number" bind:value={qty} min="1" />
<select bind:value={kategori}><option>sembako</option><option>sayur</option></select>
<button on:click={tambah}>Tambah</button>

<ul>{#each daftar as p}<li>{p.pelanggan} x{p.qty} ({p.kategori})</li>{/each}</ul>
```

---

## Ringkasan

Minggu 4: **Telinga & Tali** — `on:` dan `bind:`.
