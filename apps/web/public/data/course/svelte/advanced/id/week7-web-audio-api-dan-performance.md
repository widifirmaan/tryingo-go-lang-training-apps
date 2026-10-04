# Web Audio API: AudioContext, OscillatorNode, GainNode & Timing Scheduling

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 7:** Web Audio API: AudioContext, OscillatorNode, GainNode & Timing Scheduling
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur node graf Web Audio API: Sumber (Oscillator) -> Pengubah (Gain) -> Tujuan (Destination)
- Mengatasi kebijakan Autoplay browser dengan menginisialisasi AudioContext saat interaksi klik pertama
- Merancang kurva suara dinamis menggunakan exponentialRampToValueAtTime untuk dentuman drum nyata
- Mencegah bunyi pop dan klik digital yang merusak telinga dengan gain decay envelope yang halus
- Mencapai presisi penataan waktu (Sample-Accurate Scheduling) menggunakan audioCtx.currentTime

---

## Program: Mesin Sintesis Suara Nyata (Web Audio Synthesizer Engine)

```js
// ============================================================================
// File: utils/audioSynthesis.js (Mesin Sintesis Suara Nyata Web Audio API)
// ============================================================================

let audioCtx = null;

// Inisialisasi AudioContext (Wajib dipicu oleh interaksi klik pengguna pertama kali)
export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Sintesis Suara Drum Tendang (Kick Drum Synthesizer via Pitch Drop)
export function mainkanKickDrum(waktuMulai = 0) {
  const ctx = getAudioContext();
  const startTime = waktuMulai || ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Pitch envelope: Dari 150 Hz meluncur cepat ke 0.01 Hz dalam 0.3 detik (efek dentuman punch)
  osc.frequency.setValueAtTime(150, startTime);
  osc.frequency.exponentialRampToValueAtTime(0.01, startTime + 0.3);

  // Gain envelope: Menurun tajam mencegah suara meletup (click artifact)
  gain.gain.setValueAtTime(1.0, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + 0.3);
}

// 2. Sintesis Suara Snare Drum (Noise Synthesizer + Triangle Tone)
export function mainkanSnareDrum(waktuMulai = 0) {
  const ctx = getAudioContext();
  const startTime = waktuMulai || ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, startTime);
  osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.15);

  gain.gain.setValueAtTime(0.7, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + 0.15);
}
```

---

## Konsep Kunci

### Graf Web Audio API: Standar Musik Digital
Browser modern memiliki mesin sintesis audio profesional bawaan: **Web Audio API**.
Konsep dasarnya adalah **Audio Routing Graph**:
1. **Audio Node Sumber**: `createOscillator()` menghasilkan gelombang frekuensi suara murni.
2. **Audio Node Modifikasi**: `createGain()` mengatur volume suara (amplifikasi).
3. **Audio Destination**: `audioCtx.destination` adalah speaker atau headphone fisik pengguna.
Anda menyambungkannya seperti kabel audio studio: `osc.connect(gain).connect(destination)`.

### Presisi Waktu Mutlak (`currentTime`)
JavaScript standar seperti `setTimeout` atau `setInterval` tidak presisi: mereka rentan melambat beberapa milidetik saat komputer sibuk, yang akan merusak tempo musik (*jitter*).
Web Audio API memiliki jam perangkat keras internal sendiri: **`audioCtx.currentTime`**. Jam ini berjalan di thread audio terpisah dengan presisi tingkat mikrodetik!

---

---

## Penjelasan untuk Pemula

### Analogi: Kabel Jack Gitar & Pedal Efek Panggung
Web Audio API persis seperti setup panggung gitaris rock:
1. **Oscillator** adalah senar gitar listrik yang dipetik (*sumber getaran*).
2. **GainNode** adalah pedal distorsi dan volume di lantai panggung (*pengatur intensitas*).
3. **Destination** adalah sound system amplifier panggung (*speaker suara keluar*).
Kabel jack menghubungkan senar gitar -> pedal volume -> speaker amplifier.

## Eksperimen

- Panggil fungsi mainkanKickDrum() dari tombol di template dan dengarkan dentuman bass drum nyata dari speaker Anda.
- Ubah frekuensi awal kick drum dari 150 Hz ke 300 Hz untuk mendengarkan dentuman bergaya synth pop 80-an.
- Panggil mainkanSnareDrum() dan rasakan pukulan tajam snare perkusi.
- Pelajari cara membuat synthesizer synthesizer melodi dengan tangga nada minor pentatonik.

---

## Tantangan

Buat fungsi `mainkanHiHat(isBuka)`: jika isBuka bernilai true, perpanjang waktu decay gain menjadi 0.4 detik (Open Hi-Hat), jika false potong tajam pada 0.05 detik (Closed Hi-Hat).

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

Kamu telah menguasai Web Audio API, perancangan envelope suara drum, dan scheduling currentTime. Minggu depan adalah Capstone Final: 16-Step Audio Beat Sequencer.
