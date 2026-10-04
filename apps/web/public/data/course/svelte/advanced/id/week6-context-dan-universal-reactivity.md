# Svelte 5 Universal Reactivity: Modul .svelte.js & Context API (setContext/getContext)

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 6:** Svelte 5 Universal Reactivity: Modul .svelte.js & Context API (setContext/getContext)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami keunggulan revolusioner modul .svelte.js: menulis reaktivitas sinyal Svelte di luar file komponen
- Membangun state store berorientasi objek menggunakan kelas JavaScript modern dengan properti $state
- Menggunakan Context API Svelte (setContext dan getContext) untuk dependensi hierarkis pohon komponen
- Menghilangkan kebutuhan library state management pihak ketiga untuk sebagian besar aplikasi
- Menjaga sinkronisasi audio global tempo BPM di seluruh instrumen musik aplikasi

---

## Program: Mesin State Audio Global Mandiri Berbasis File .svelte.js

```js
// ============================================================================
// File: audioState.svelte.js (Universal Reactivity di Luar Komponen!)
// ============================================================================
// Di Svelte 5, Runes ($state, $derived) DAPAT DIGUNAKAN DI FILE JS BIASA berakhiran .svelte.js!

class GlobalAudioEngine {
  bpm = $state(128);
  masterVolume = $state(0.8);
  isPlaying = $state(false);
  activeStep = $state(0);

  // $derived di dalam kelas JS murni
  tempoIntervalMs = $derived((60 / this.bpm / 4) * 1000); // 16th note interval

  togglePlayback() {
    this.isPlaying = !this.isPlaying;
  }

  setBpm(newBpm) {
    if (newBpm >= 60 && newBpm <= 240) {
      this.bpm = newBpm;
    }
  }

  incrementStep() {
    this.activeStep = (this.activeStep + 1) % 16;
  }
}

// Ekspor instance singleton global yang dapat diakses oleh komponen apapun
export const audioMaster = new GlobalAudioEngine();
```

---

## Konsep Kunci

### Terobosan Besar Svelte 5: `.svelte.js`
Di Svelte 4 dan framework lain, reaktivitas sering terikat pada siklus hidup komponen UI. Jika Anda ingin membuat store global, Anda harus menggunakan API khusus (`writable()`, `readable()`).
Di **Svelte 5**:
Cukup beri nama file Anda dengan akhiran **`.svelte.js`** atau **`.svelte.ts`**!
Di dalam file tersebut, Anda bebas menggunakan `$state()`, `$derived()`, dan `$effect()`.
Anda dapat membuat kelas JavaScript biasa yang propertinya reaktif murni, mengimpornya ke komponen mana saja, dan UI akan ter-update secara otomatis saat properti kelas tersebut berubah!

### Kapan Menggunakan `setContext` vs Modul `.svelte.js`?
- **Modul `.svelte.js` (Singleton)**: Bagus untuk state yang benar-benar global di seluruh aplikasi (misal: Master Audio Engine, preferensi tema).
- **Context API (`setContext` / `getContext`)**: Bagus untuk membatasi state pada sub-pohon tertentu (misal: satu instans Synthesizer memiliki banyak kenop knob anak, namun ada 3 synthesizer independen di halaman yang sama).

---

---

## Penjelasan untuk Pemula

### Analogi: Konduktor Orkestra Musik & Metronom Pusat
1. **Modul `.svelte.js`** seperti metronom pusat di panggung orkestra: sebuah alat berdetak (*BPM $state*) yang diletakkan di tengah panggung. Semua pemain biola, drum, dan terompet (*komponen-komponen*) menatap metronom yang sama agar tempo musik mereka serempak sempurna.
2. **Context API** seperti partitur nada khusus divisi gesek: hanya dibagikan ke pemain biola di sudut kiri tanpa membingungkan pemain drum di sudut kanan.

## Eksperimen

- Impor audioMaster ke dalam dua file .svelte berbeda dan perhatikan bahwa mengubah BPM di satu komponen langsung mengubah tampilan di komponen lain.
- Panggil audioMaster.setBpm(140) dan amati nilai tempoIntervalMs menghitung ulang durasi milidetik otomatis.
- Gunakan audioMaster.incrementStep() di dalam interval timer untuk melihat activeStep berputar dari 0 sampai 15.
- Uji batas validasi BPM agar nilai tidak bisa disetel di bawah 60 atau di atas 240.

---

## Tantangan

Tambahkan array `$state` instrumen `daftarTrack` ke dalam kelas `GlobalAudioEngine` lengkap dengan method `tambahTrack(nama)` dan `hapusTrack(id)` yang reaktif universal.

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
```output
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
```output
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
```output
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
```output
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

Kamu telah menguasai reaktivitas universal .svelte.js dan Svelte Context. Minggu depan kita menghubungkan Web Audio API untuk menghasilkan suara fisik nyata.
