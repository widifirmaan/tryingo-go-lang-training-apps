# Svelte 5 Runes: $derived untuk Nilai Turunan & $effect untuk Efek Samping

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Reaktivitas Kompilasi | **Minggu 2:** Svelte 5 Runes: $derived untuk Nilai Turunan & $effect untuk Efek Samping
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menggunakan Rune $derived untuk komputasi reaktif nilai turunan murni
- Menggunakan $derived.by(() => { ... }) untuk kalkulasi bersyarat multiline kompleks
- Memahami cara kerja Rune $effect untuk mengeksekusi side effects setelah DOM selesai diperbarui
- Menulis fungsi cleanup di dalam $effect untuk membatalkan listener atau oscillator timer
- Mencegah re-running yang tidak diinginkan dengan memahami pelacakan dependensi otomatis sinyal Svelte

---

## Program: Kalkulator Oktaf Nada & Spektrum Frekuensi Harmonik

```svelte
<script>
  let nadaDasarHz = $state(220); // A3 (220 Hz)

  // 1. $derived: Nilai turunan otomatis (mirip computed di Vue / useMemo di React)
  // Tidak perlu tanda kurung fungsi, otomatis dihitung ulang saat nadaDasarHz berubah!
  let oktafAtas = $derived(nadaDasarHz * 2);      // A4 (440 Hz)
  let oktafBawah = $derived(nadaDasarHz / 2);     // A2 (110 Hz)
  let harmonikKelima = $derived(nadaDasarHz * 1.5); // Nada E

  // $derived.by: Untuk perhitungan multiline yang kompleks
  let labelKlasifikasiSuara = $derived.by(() => {
    if (nadaDasarHz < 150) return "Bass (Rendah Menggelegar)";
    if (nadaDasarHz < 350) return "Midrange / Tenor (Vokal Pria)";
    if (nadaDasarHz < 800) return "Alto / Soprano (Vokal Wanita)";
    return "Treble / High Pitch (Melengking)";
  });

  // 2. $effect: Menangani side effects (DOM luar, audio context, logging)
  $effect(() => {
    console.log(`[Audio Log] Nada dasar disetel ke: ${nadaDasarHz} Hz (Harmonik E: ${harmonikKelima} Hz)`);

    // Cleanup callback otomatis: Dipanggil saat nadaDasarHz berubah atau unmount
    return () => {
      // Membersihkan timer atau frekuensi sebelumnya jika diperlukan
    };
  });
</script>

<div class="octave-calculator">
  <h3>Penganalisis Harmonik & Spektrum Nada</h3>

  <div class="input-row">
    <label>Frekuensi Acuan: <strong>{nadaDasarHz} Hz</strong></label>
    <input type="range" min="55" max="880" step="5" bind:value={nadaDasarHz} />
  </div>

  <div class="classification-box">
    Klasifikasi Register: <strong>{labelKlasifikasiSuara}</strong>
  </div>

  <div class="grid-harmonics">
    <div class="card">
      <small>1 Oktaf Bawah</small>
      <div class="hz">{oktafBawah.toFixed(1)} Hz</div>
    </div>
    <div class="card active">
      <small>Nada Utama (Fundament)</small>
      <div class="hz">{nadaDasarHz} Hz</div>
    </div>
    <div class="card">
      <small>Harmonik ke-5 (Fifth)</small>
      <div class="hz">{harmonikKelima.toFixed(1)} Hz</div>
    </div>
    <div class="card">
      <small>1 Oktaf Atas</small>
      <div class="hz">{oktafAtas.toFixed(1)} Hz</div>
    </div>
  </div>
</div>

<style>
  .octave-calculator { max-width: 480px; margin: 20px auto; font-family: sans-serif; background: #09090b; color: white; padding: 20px; border-radius: 12px; }
  .input-row { margin-bottom: 16px; }
  .input-row input { width: 100%; }
  .classification-box { background: #27272a; padding: 10px; border-radius: 6px; font-size: 13px; color: #38bdf8; margin-bottom: 16px; text-align: center; }
  .grid-harmonics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .card { background: #18181b; padding: 12px; border-radius: 8px; border: 1px solid #27272a; text-align: center; }
  .card.active { border-color: #38bdf8; background: #032b44; }
  .card small { color: #a1a1aa; font-size: 11px; }
  .card .hz { font-size: 18px; font-weight: bold; margin-top: 4px; }
</style>
```

---

## Konsep Kunci

### Mengapa `$derived` Menggantikan Sintaks `$:` Lama?
Di Svelte 3 dan 4, semua hal reaktif ditulis dengan label JavaScript `$: ganda = angka * 2`.
Sintaks lama tersebut memiliki kelemahan: tidak jelas apakah suatu baris adalah perhitungan nilai (*derived*) atau efek samping (*side effect*), serta urutan eksekusinya sulit diprediksi.

Di **Svelte 5**:
1. **`$derived(ekspresi)`**: Murni untuk **menghitung nilai turunan**. Svelte menjamin nilai ini dievaluasi secara malas (*lazy*) dan di-cache hingga dependensinya berubah.
2. **`$effect(() => { ... })`**: Khusus untuk **efek samping** (seperti memanggil audio API, mengubah `document.title`, atau logging). `$effect` hanya berjalan di browser (tidak berjalan saat SSR server-side rendering).

---

---

## Penjelasan untuk Pemula

### Analogi: Konversi Mata Uang & Alarm Bel Pintu
1. **`$derived`** seperti tabel konversi kurs mata uang di dompet: jika Anda membawa 10 lembar uang 100 Dollar (*state*), total uang rupiah Anda otomatis bernilai 16 Juta Rupiah (*derived*). Angka rupiah itu otomatis ada karena menghitung nilai dollarnya.
2. **`$effect`** seperti bel pintu otomatis: saat seseorang melangkah melewati sensor pintu (*state berubah*), bel berdering membunyikan suara (*side effect*).

## Eksperimen

- Geser frekuensi acuan dan amati keempat kotak harmonik menghitung angka frekuensi secara instan.
- Ubah frekuensi ke 100 Hz dan perhatikan label klasifikasi suara berganti menjadi Bass.
- Buka DevTools Console dan amati pesan log yang dicetak oleh $effect pada setiap pergeseran slider.
- Gunakan $derived.by untuk menghitung rasio matematis deret Fibonacci pada frekuensi audio.

---

## Tantangan

Tambahkan nilai `$derived` baru `notasiMusikTerdekat` yang mencocokkan angka Hertz saat ini dengan nama nada terdekat (misal: 440 Hz = "A4", 261.6 Hz = "C4").

---

## Model Mental & Diagram Alur Visual

![Diagram Universal Signals & Svelte 5 Runes State Flow](/diagrams/react-data-flow.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ SVELTE 5 RUNES & FINE-GRAINED REACTIVITY                 │
│                                                          │
│  let count = $state(0) ──► Signal Primer                 │
│       │                                                  │
│       ▼                                                  │
│  let double = $derived(count * 2) ──► Komputasi Turunan  │
│       │                                                  │
│       ▼ (Hanya memperbarui node teks spesifik di DOM!)   │
│  <h1>{double}</h1> ◄── Tanpa Virtual DOM Overhead        │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `let count = $state(0)`
- **Fungsi Utama:** Rune state reaktif Svelte 5.
- **Parameter / Atribut:** `initialValue`.
- **Perilaku & Efek Sistem:** Mendeklarasikan variabel reaktif murni tanpa pembungkus .value atau setter khusus..
- **Contoh Penggunaan Praktis:**
```svelte
<script>
  let count = $state(0);
  function inc() { count += 1; }
</script>
<button onclick={inc}>Klik: {count}</button>
```
- **Hasil Output yang Diharapkan:**
```text
Tombol reaktif memperbarui angka count
```

### 2. `let double = $derived(count * 2)`
- **Fungsi Utama:** Rune komputasi turunan Svelte 5.
- **Parameter / Atribut:** `Expression`.
- **Perilaku & Efek Sistem:** Otomatis menghitung ulang nilai turunan saat sinyal state primernya berubah..
- **Contoh Penggunaan Praktis:**
```svelte
<script>
  let count = $state(4);
  let double = $derived(count * 2);
</script>
<p>Hasil: {double}</p>
```
- **Hasil Output yang Diharapkan:**
```text
Hasil: 8
```

### 3. `$effect(() => { ... })`
- **Fungsi Utama:** Rune efek samping reaktif.
- **Parameter / Atribut:** `Effect Callback`.
- **Perilaku & Efek Sistem:** Menjalankan operasi DOM, API, atau timer saat state di dalamnya mengalami mutasi..
- **Contoh Penggunaan Praktis:**
```svelte
<script>
  let count = $state(0);
  $effect(() => {
    console.log('Nilai terkini:', count);
  });
</script>
```
- **Hasil Output yang Diharapkan:**
```text
Mencetak log otomatis setiap count berubah
```

### 4. `bind:value={variable}`
- **Fungsi Utama:** Sinkronisasi input form dua arah.
- **Parameter / Atribut:** `Target state variable`.
- **Perilaku & Efek Sistem:** Menautkan input form langsung ke state tanpa memerlukan event handler manual..
- **Contoh Penggunaan Praktis:**
```svelte
<script>
  let name = $state('Tryngo');
</script>
<input bind:value={name} />
```
- **Hasil Output yang Diharapkan:**
```text
Perubahan input langsung mengalir ke state name
```

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

Kamu telah menguasai $derived dan $effect di Svelte 5. Minggu depan kita mempelajari komunikasi komponen modern dengan $props dan callback functions.
