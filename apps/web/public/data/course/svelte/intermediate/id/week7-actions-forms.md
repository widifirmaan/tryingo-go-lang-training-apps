# Actions & Forms — Stempel & Formulir Svelte (svelte.dev)

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 7:** Actions & Forms
> **Prasyarat:** Minggu 6 — **SvelteKit Routing**.

## Tujuan Pembelajaran

- `use:action` stempel di elemen — `use:klikLuar` panggil `node` saat mount, ` $effect` cleanup saat unmount (sumber: svelte.dev/docs/svelte/use)
- `bind:value` tali 2 arah + `on:submit|preventDefault` tanpa reload

---

## Kenapa Ini Penting Buat Kamu?

Form warung tanpa `bind:value` = ketik tidak masuk `pelanggan`. Dengan `bind:value`, ketik → `pelanggan` otomatis. `use:klikLuar` untuk tutup dropdown saat klik di luar tanpa `document.addEventListener` manual di tiap komponen.

---

## Program: Form & Stempel Warung Svelte (svelte.dev)

```svelte
<script>
  let pelanggan = "";
  let daftar = [];
  function tambah(){ if(!pelanggan.trim()) return; daftar = [...daftar, { id: Date.now(), pelanggan }]; pelanggan = ""; }

  // Action: stempel klik luar (svelte.dev)
  /** @type {import('svelte/action').Action} */
  function klikLuar(node) {
    $effect(() => {
      function handle(e){ if(!node.contains(e.target)) node.dispatchEvent(new CustomEvent("klikLuar")); }
      document.addEventListener("click", handle);
      return () => document.removeEventListener("click", handle);
    });
  }
</script>

<form on:submit|preventDefault={tambah}>
  <input bind:value={pelanggan} placeholder="Nama" />
  <button>Tambah</button>
</form>

<div use:klikLuar on:klikLuar={() => console.log("klik luar")}>
  <p>Klik di luar kotak ini → log</p>
</div>

<ul>{#each daftar as p}<li>{p.pelanggan}</li>{/each}</ul>
```

**Sumber:** `svelte.dev/docs/svelte/use` — `use:action` + `$effect` cleanup.

---

## Konsep Kunci

### `use:klikLuar` = Stempel
`use:klikLuar` panggil `klikLuar(node)` saat `div` mount, `return () => removeEventListener` saat unmount.

### `bind:value` = Tali 2 Arah
`bind:value={pelanggan}` ketik ↔ `pelanggan` otomatis.

---

## Penjelasan untuk Pemula

### Analogi: Stempel & Tali

- **`use:klikLuar` = stempel**: tempel di `div`, stempel aktif saat `div` ada, hilang saat `div` hilang.
- **`bind:value` = tali**: tarik tali `input` ↔ `pelanggan`.

### Langkah 0 — Device

`npm create svelte@latest` + `npm run dev` di `5173` (sudah W1).

### Cara Komputer Membaca

1. `<div use:klikLuar>` → panggil `klikLuar(div)` → `addEventListener`.
2. Klik di luar `div` → `dispatchEvent("klikLuar")` → `on:klikLuar` jalan.

### 3 Istilah Wajib

1. **Action `use:`**: stempel mount
2. **bind:value**: tali 2 arah
3. **$effect**: setup/cleanup

---

## Eksperimen

- **Hijau:** `bind:value={pelanggan}` ketik "Budi" → `pelanggan` jadi "Budi"?
- **Kuning:** Hapus `$effect` cleanup → `removeEventListener` tidak jalan, memory leak?
- **Merah:** `use:klikLuar` tanpa `on:klikLuar` → tidak log.

---

## Tantangan

**Warung Stempel Lengkap:** `use:klikLuar` untuk tutup `dropdown` kategori + `bind:value` 3 input (`nama`, `qty`, `kategori`) + `on:submit|preventDefault` tambah ke `daftar`.
- **Sambungan (Minggu 6 — SvelteKit Routing):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **use:action/$effect**: stempel/cleanup
- **bind:value**: tali

---

## Ringkasan

Minggu 7 dari 12: **Stempel & Formulir** (Level: Menengah). Bisa `use:` dan `bind`. Selesai? Lanjut W8.
