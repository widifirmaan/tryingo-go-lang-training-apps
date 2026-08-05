# Pengenalan Svelte & Setup

> Svelte | Pelajaran 1

## Tujuan Pembelajaran

- Memahami posisi Svelte: framework compile-time untuk web\n- Mengenal struktur proyek Svelte (src/App.svelte, src/main.ts)\n- Memahami komponen Svelte: script, markup, dan style\n- Menjalankan Svelte app via Vite dan melihat output di browser

---

## Program: Svelte

```svelte
<script>
  let name = "Svelte";
</script>

<h1>Hello, {name}!</h1>
<p>Welcome to Svelte 5.</p>
```

---

## Penjelasan

## Struktur Komponen Svelte
Setiap komponen Svelte memiliki 3 bagian: <script> (logika), markup (HTML), dan <style> (CSS).
## Reactivity
Svelte 5 menggunakan runes: $state, $derived, $effect. Tidak perlu reactive declarations seperti Svelte 4.
## Menjalankan Svelte
npm install && npm run dev — instal dependency dan jalankan Vite dev server. Buka http://localhost:5173.

---

## Eksperimen

1. **## Struktur Komponen Svelte
Setiap komponen Svelte memiliki 3 bagian: <script> (logika), markup (HTML), dan <style> (CSS).
## Reactivity
Svelte 5 menggunakan runes: $state, $derived, $effect. Tidak perlu reactive declarations seperti Svelte 4.
## Menjalankan Svelte
npm install && npm run dev — instal dependency dan jalankan Vite dev server. Buka http://localhost:5173.**

---

## Tantangan

Eksplorasi: (1) ubah "Svelte" menjadi nama framework Anda di variabel name, (2) tambah h2 dengan judul proyek Anda, (3) coba akses http://localhost:5173 dan lihat perubahan, (4) tambah tombol yang mengubah nama saat diklik.

---

## Ringkasan

Svelte = framework compile-time. Komponen = script + markup + style. Runes = $state, $derived, $effect. Lanjut: props dan events.
