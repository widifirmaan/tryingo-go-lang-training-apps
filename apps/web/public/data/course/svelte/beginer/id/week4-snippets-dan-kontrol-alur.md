# Snippets ({#snippet}), {@render} & Blok Kontrol ({#if}, {#each}, {#await})

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Reaktivitas Kompilasi | **Minggu 4:** Snippets ({#snippet}), {@render} & Blok Kontrol ({#if}, {#each}, {#await})
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami inovasi Svelte 5 Snippets ({#snippet}) yang menggantikan sistem slot lama
- Menggunakan tag {@render snippetName(args)} untuk me-render template reusable lokal berparameter
- Menguasai blok kontrol alur Svelte: {#if}, {#each item, index (key)}, dan {#await promise}
- Memahami pentingnya identitas key dalam blok {#each} untuk efisiensi kompilasi DOM
- Membangun grid matriks audio 16-langkah interaktif dengan manipulasi array $state

---

## Program: Grid 16-Step Audio Sequencer dengan Render Snippet Modular

```svelte
<script>
  let stepAktif = $state(0);
  let isSedangPlay = $state(false);

  // Matriks 16-Langkah untuk 3 Track Suara: Kick, Snare, Hi-Hat
  let tracks = $state([
    { id: "t1", nama: "Kick Drum", steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false] },
    { id: "t2", nama: "Snare", steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false] },
    { id: "t3", nama: "Closed Hat", steps: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true] }
  ]);

  function toggleStep(trackIndex, stepIndex) {
    tracks[trackIndex].steps[stepIndex] = !tracks[trackIndex].steps[stepIndex];
  }
</script>

<!-- 1. Svelte 5 Snippet: Template reusable lokal (menggantikan <slot> lama) -->
{#snippet tombolStep(trackIdx, stepIdx, aktif)}
  <button
    class="step-btn"
    class:active={aktif}
    class:current-play={stepAktif === stepIdx}
    onclick={() => toggleStep(trackIdx, stepIdx)}
  >
  </button>
{/snippet}

<div class="sequencer-matrix">
  <header>
    <h3>Matriks 16-Langkah Sequencer</h3>
    <span>Langkah Berjalan: <strong>#{stepAktif + 1}</strong></span>
  </header>

  <!-- 2. Blok Kontrol {#each} dengan Key Unik (track.id) -->
  {#each tracks as track, tIdx (track.id)}
    <div class="track-row">
      <span class="track-name">{track.nama}</span>
      <div class="steps-grid">
        {#each track.steps as isNyala, sIdx}
          <!-- 3. {@render}: Me-render snippet yang telah didefinisikan -->
          {@render tombolStep(tIdx, sIdx, isNyala)}
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .sequencer-matrix { max-width: 640px; margin: 20px auto; font-family: sans-serif; background: #18181b; color: white; padding: 16px; border-radius: 10px; }
  header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-size: 14px; }
  .track-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
  .track-name { width: 90px; font-size: 12px; font-weight: bold; color: #a1a1aa; }
  .steps-grid { display: grid; grid-template-columns: repeat(16, 1fr); gap: 4px; flex: 1; }
  .step-btn {
    height: 32px;
    background: #27272a;
    border: 1px solid #3f3f46;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.1s;
  }
  .step-btn.active { background: #38bdf8; border-color: #0284c7; }
  .step-btn.current-play { box-shadow: 0 0 8px #facc15; border-color: #facc15; }
</style>
```

---

## Konsep Kunci

### Revolusi Svelte 5 Snippets
Di Svelte versi sebelumnya, jika Anda ingin menggunakan kembali potongan template kecil di dalam komponen yang sama, Anda terpaksa membuat file `.svelte` baru atau menggunakan `<slot>` yang kaku.
**Svelte 5 memperkenalkan `{#snippet}` dan `{@render}`**:
```svelte
{#snippet namaSnippet(arg1, arg2)}
  <div>Halo {arg1}!</div>
{/snippet}

{@render namaSnippet('Budi')}
```
Snippet dapat menerima parameter, dapat dioper ke komponen anak sebagai props, dan dapat me-render markup apapun secara ekspresif!

### Blok Kontrol Alur Svelte:
1. `{#if kondisi} ... {:else} ... {/if}`: Percabangan logika kondisional.
2. `{#each items as item, index (item.id)}`: Perulangan daftar. **Wajib menyertakan `(item.id)`** sebagai key agar compiler hanya memutasi elemen yang benar-benar berubah.
3. `{#await promise} ... {:then data} ... {:catch err} ... {/await}`: Penanganan promise asinkron langsung di template tanpa memerlukan state `loading` manual!

---

---

## Penjelasan untuk Pemula

### Analogi: Stempel Pola Kain & Cetakan Kue
1. **`{#snippet}`** seperti cap stempel motif batik: Anda mendesain satu cetakan stempel bunga kecil (*snippet*).
2. **`{@render}`** seperti menempelkan stempel tersebut 16 kali di atas selembar kain sutra (*render*): motifnya 100% konsisten, dan jika Anda ingin mengubah warna bunganya, Anda cukup mengganti tinta pada stempel utama.

## Eksperimen

- Klik kotak-kotak step pada grid matriks dan perhatikan warna biru menyala/mati secara instan.
- Ubah nilai stepAktif dari 0 ke 1, 2, 3 dan amati kotak bersinar kuning (current-play) bergeser horizontal.
- Tambahkan track ke-4 berupa "Clap Perkusi" ke dalam array tracks.
- Uji penanganan asinkron menggunakan blok {#await fetch("/api/samples")} langsung di template.

---

## Tantangan

Tambahkan tombol "Hapus Semua Step" (Clear Grid) yang mereset seluruh langkah di semua track menjadi `false` menggunakan pemetaan array `$state`.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Mutasi Array Method In-Place Tanpa Assignment
- **Gejala / Masalah:** Memanggil `arr.push(x)` tidak memicu re-render di Svelte 4/5.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan syntax assignment: `arr = [...arr, x]` untuk memberi sinyal reaktivitas.

### 2. Unsubscribe Store / Lifecycle Memory Leak
- **Gejala / Masalah:** Berlangganan manual ke store tanpa membatalkannya menyebabkan memory leak.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan auto-subscription dengan prefix `$` (`$myStore`) agar Svelte mengelolanya secara otomatis.

### 3. Penggunaan `$state` vs State Biasa di Runes
- **Gejala / Masalah:** Nilai tidak reaktif saat berpindah antar modul tanpa pemanggilan signal yang benar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan rune `$state()` dan `$derived()` pada proyek modern Svelte 5.

---

## Ringkasan

Kamu telah menguasai Snippets, @render, dan blok kontrol alur. Minggu depan kita memasuki Level 2: Svelte Actions dan Web Audio API.
