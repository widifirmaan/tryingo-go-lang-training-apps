# Capstone: 16-Step Audio Beat Sequencer & Synthesizer dengan Svelte 5 Runes

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 8:** Capstone: 16-Step Audio Beat Sequencer & Synthesizer dengan Svelte 5 Runes
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh kurikulum Svelte 5 (Runes, $state, $derived, Snippets, Web Audio) ke dalam produk beat sequencer produksi
- Membangun jam sequencer audio reaktif dengan kontrol tempo BPM yang halus
- Memicu sintesis audio drum nyata (Kick, Snare, HiHat) berlatensi ultra-rendah
- Mengoptimalkan pembaruan DOM berbasis 16 langkah berkecepatan tinggi tanpa lag atau frame drops
- Menghasilkan aplikasi audio berbasis web berkualitas studio yang siap dideploy ke Cloudflare Pages

---

## Program: Aplikasi Beat Sequencer Lengkap dengan Kontrol BPM, Preset & Web Audio Nyata

```svelte
<!-- ===================================================================== -->
<!-- CAPSTONE PROJECT: SVELTE 5 INTERACTIVE 16-STEP BEAT SEQUENCER         -->
<!-- ===================================================================== -->
<script>
  import { onMount, onDestroy } from "svelte";

  // State Reaktif Utama (Svelte 5 Runes)
  let bpm = $state(124);
  let isPlaying = $state(false);
  let currentStep = $state(0);
  let audioContext = null;
  let timerId = null;

  // Matriks Sequencer 16-Langkah untuk 3 Instrumen
  let tracks = $state([
    {
      id: "kick",
      name: "Kick Drum",
      color: "#ec4899",
      steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]
    },
    {
      id: "snare",
      name: "Snare Crisp",
      color: "#38bdf8",
      steps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false]
    },
    {
      id: "hihat",
      name: "Closed Hat",
      color: "#facc15",
      steps: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
    }
  ]);

  // $derived: Interval durasi 1 langkah (1/16th note) dalam milidetik
  let stepIntervalMs = $derived((60 / bpm / 4) * 1000);

  // Inisialisasi Audio Context
  function getAudioCtx() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  // Sintesis Suara Drum Web Audio API
  function playSound(type) {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === "kick") {
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(1.0, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === "snare") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === "hihat") {
      osc.type = "square";
      osc.frequency.setValueAtTime(8000, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
  }

  function advanceStep() {
    currentStep = (currentStep + 1) % 16;
    
    // Picu suara jika step aktif pada track tersebut bernilai true
    tracks.forEach((track) => {
      if (track.steps[currentStep]) {
        playSound(track.id);
      }
    });

    if (isPlaying) {
      timerId = setTimeout(advanceStep, stepIntervalMs);
    }
  }

  function togglePlay() {
    getAudioCtx();
    isPlaying = !isPlaying;

    if (isPlaying) {
      advanceStep();
    } else {
      if (timerId) clearTimeout(timerId);
    }
  }

  function toggleCell(trackIdx, stepIdx) {
    tracks[trackIdx].steps[stepIdx] = !tracks[trackIdx].steps[stepIdx];
  }

  onDestroy(() => {
    if (timerId) clearTimeout(timerId);
  });
</script>

<div class="daw-workspace">
  <header class="daw-header">
    <div>
      <h2>Nusa Beats • Svelte 5 Sequencer</h2>
      <small>Web Audio Synthesis • Zero Virtual DOM</small>
    </div>

    <div class="transport-controls">
      <div class="tempo-box">
        <label>BPM: <strong>{bpm}</strong></label>
        <input type="range" min="80" max="160" bind:value={bpm} />
      </div>

      <button class="play-btn" class:playing={isPlaying} onclick={togglePlay}>
        {isPlaying ? "■ STOP" : "▶ PLAY"}
      </button>
    </div>
  </header>

  <main class="matrix-grid">
    {#each tracks as track, tIdx (track.id)}
      <div class="track-channel">
        <div class="track-info" style:--track-color={track.color}>
          <span class="indicator"></span>
          <strong>{track.name}</strong>
        </div>

        <div class="steps-row">
          {#each track.steps as isCellOn, sIdx}
            <button
              class="step-node"
              class:on={isCellOn}
              class:cursor={currentStep === sIdx}
              style:--active-color={track.color}
              onclick={() => toggleCell(tIdx, sIdx)}
            >
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </main>
</div>

<style>
  .daw-workspace {
    max-width: 720px;
    margin: 24px auto;
    font-family: system-ui, sans-serif;
    background: #09090b;
    color: #f4f4f5;
    padding: 24px;
    border-radius: 14px;
    border: 1px solid #27272a;
  }
  .daw-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 20px; }
  .daw-header h2 { margin: 0; color: #38bdf8; font-size: 20px; }
  .daw-header small { color: #71717a; }
  .transport-controls { display: flex; gap: 16px; align-items: center; }
  .tempo-box label { font-size: 12px; display: block; margin-bottom: 4px; }
  .play-btn {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background: #22c55e;
    color: black;
  }
  .play-btn.playing { background: #ef4444; color: white; }
  .track-channel { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .track-info { width: 120px; font-size: 13px; display: flex; align-items: center; gap: 8px; }
  .track-info .indicator { width: 8px; height: 8px; border-radius: 50%; background: var(--track-color); }
  .steps-row { display: grid; grid-template-columns: repeat(16, 1fr); gap: 4px; flex: 1; }
  .step-node {
    height: 36px;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.05s ease;
  }
  .step-node.on { background: var(--active-color); border-color: white; }
  .step-node.cursor { box-shadow: 0 0 10px #facc15; border-color: #facc15; }
</style>
```

---

## Konsep Kunci

### Arsitektur Capstone Beat Sequencer Svelte 5
Aplikasi capstone ini mendemonstrasikan keunggulan absolut Svelte 5:
1. **Reaktivitas Tanpa Beban Virtual DOM**: Sequencer audio memperbarui langkah kursor kuning setiap 120 milidetik (*high-frequency updates*). Pada framework berbasis Virtual DOM, hal ini dapat menyebabkan lag CPU. Pada Svelte 5, kompilator **langsung mengubah kelas CSS pada tombol step tertentu tanpa me-render ulang seluruh halaman**.
2. **Kalkulasi BPM Berbasis `$derived`**: Setiap kali slider BPM digeser, interval milidetik `stepIntervalMs` langsung terhitung secara otomatis dan akurat.
3. **Sintesis Audio Digital Nyata**: Menggunakan Web Audio API native tanpa memerlukan file audio MP3/WAV eksternal berukuran besar. Seluruh suara drum dihasilkan dari rumus matematika frekuensi secara instan!

### Siap Membangun Aplikasi Interaktif Generasi Baru
Dengan menyelesaikan kurikulum Svelte 5 ini, Anda telah menguasai teknologi frontend paling efisien, modern, dan menyenangkan di dunia web modern!

---

---

## Penjelasan untuk Pemula

### Analogi: Kotak Musik Silinder Berputar Kuno
Aplikasi Beat Sequencer ini persis seperti kotak musik antik berputar:
1. **Matriks 16-Step** adalah silinder logam dengan tonjolan gigi kecil: setiap kali tonjolan gigi menyentuh sisir logam (*step bernilai true*), nada dentingan berbunyi (*Web Audio playSound*).
2. **Slider BPM** adalah tuas pemutar pegas: memutar tuas lebih cepat membuat silinder berputar lebih kencang sehingga musik bermain dengan tempo riang cepat.

## Eksperimen

- Klik tombol "▶ PLAY" dan dengarkan ritme drum elektronik 124 BPM bermain berulang secara otomatis.
- Klik kotak-kotak step untuk menambah atau mematikan dentuman drum dan dengarkan variasi ritme baru.
- Geser slider BPM ke 140 dan rasakan tempo musik bertambah cepat secara instan.
- Buka tab Performance di Chrome DevTools saat beat bermain dan amati CPU usage yang hampir 0% berkat kompilasi Svelte!

---

## Tantangan

Tambahkan preset ritme bawaan (tombol "House 4-on-the-Floor", "Trap Hip-Hop", dan "Drum & Bass") yang mengisi pola matriks langkah secara instan saat diklik.

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum Svelte 5 dari dasar Runes hingga membangun Web Audio Beat Sequencer interaktif yang menakjubkan.
