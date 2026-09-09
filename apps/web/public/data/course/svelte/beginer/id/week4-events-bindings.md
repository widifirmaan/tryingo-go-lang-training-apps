# Events & Bindings — Telinga & Tali Svelte

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 4:** Events & Bindings
> **Prasyarat:** Minggu 3 — **Props & Components**.

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

## Tantangan

**Events & Bindings di Warungmu:** pakai `tambah` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `tambah`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Props & Components** (Minggu 3): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 4: **Telinga & Tali** — `on:` dan `bind:`. Minggu depan: **Stores**.
