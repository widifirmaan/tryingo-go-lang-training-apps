# Svelte 5 Runes: Arsitektur Tanpa Virtual DOM & $state Reaktif

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Reaktivitas Kompilasi | **Minggu 1:** Svelte 5 Runes: Arsitektur Tanpa Virtual DOM & $state Reaktif

## Tujuan Pembelajaran

- Memahami arsitektur compiler Svelte: mengubah kode deklaratif menjadi instruksi bedah DOM langsung tanpa Virtual DOM
- Menguasai fitur utama Svelte 5 Runes: deklarasi state reaktif universal dengan $state()
- Menggunakan bind:value untuk two-way data binding instan pada elemen form (range, select, text)
- Menggunakan binding kelas kondisional class:active={condition} yang sangat bersih
- Memahami mengapa Svelte memiliki runtime terkecil dan performa eksekusi tercepat di industri

---

## Program: Pengendali Generator Nada Audio (Audio Oscillator Node)

```svelte
<script>
  // 1. Svelte 5 Runes: $state menggantikan let variabel reaktif lama
  let frekuensi = $state(440); // 440 Hz = Nada A4 standar konser
  let volume = $state(0.5);    // 0.0 sampai 1.0
  let jenisGelombang = $state("sine"); // "sine" | "square" | "sawtooth" | "triangle"
  let isMenyala = $state(false);

  function toggleAudio() {
    isMenyala = !isMenyala;
  }

  function setPresetFrekuensi(hz) {
    frekuensi = hz;
  }
</script>

<div class="synth-panel">
  <header>
    <h2>Osilator Audio Svelte 5</h2>
    <span class="status-indicator" class:active={isMenyala}>
      {isMenyala ? "● SUARA AKTIF" : "○ Hening"}
    </span>
  </header>

  <div class="control-group">
    <label>Frekuensi: <strong>{frekuensi} Hz</strong></label>
    <input type="range" min="100" max="2000" step="10" bind:value={frekuensi} />
  </div>

  <div class="control-group">
    <label>Volume: <strong>{Math.round(volume * 100)}%</strong></label>
    <input type="range" min="0" max="1" step="0.05" bind:value={volume} />
  </div>

  <div class="control-group">
    <label>Bentuk Gelombang:</label>
    <select bind:value={jenisGelombang}>
      <option value="sine">Sine (Murni & Lembut)</option>
      <option value="square">Square (Retro 8-Bit Chiptune)</option>
      <option value="sawtooth">Sawtooth (Tajam & Agresif)</option>
      <option value="triangle">Triangle (Hangat)</option>
    </select>
  </div>

  <div class="presets">
    <button onclick={() => setPresetFrekuensi(261.63)}>C4 (Do)</button>
    <button onclick={() => setPresetFrekuensi(329.63)}>E4 (Mi)</button>
    <button onclick={() => setPresetFrekuensi(392.00)}>G4 (Sol)</button>
    <button onclick={() => setPresetFrekuensi(440.00)}>A4 (La)</button>
  </div>

  <button class="toggle-btn" class:playing={isMenyala} onclick={toggleAudio}>
    {isMenyala ? "Hentikan Osilator" : "Nyalakan Nada"}
  </button>
</div>

<style>
  .synth-panel {
    max-width: 440px;
    margin: 20px auto;
    font-family: system-ui, sans-serif;
    padding: 20px;
    background: #18181b;
    color: #f4f4f5;
    border-radius: 12px;
    border: 1px solid #27272a;
  }
  header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  h2 { margin: 0; font-size: 18px; color: #38bdf8; }
  .status-indicator { font-size: 12px; color: #71717a; font-weight: bold; }
  .status-indicator.active { color: #4ade80; }
  .control-group { margin-bottom: 14px; }
  label { display: block; font-size: 13px; margin-bottom: 6px; }
  input[type="range"], select { width: 100%; box-sizing: border-box; }
  .presets { display: flex; gap: 6px; margin-bottom: 16px; }
  .presets button { flex: 1; padding: 6px; background: #27272a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
  .toggle-btn { width: 100%; padding: 12px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; background: #38bdf8; color: #09090b; }
  .toggle-btn.playing { background: #ef4444; color: white; }
</style>
```

---

## Konsep Kunci

### Svelte Mengubah Cara Pandang Web: Tanpa Virtual DOM
React dan Vue menggunakan *Virtual DOM*: saat data berubah, mereka membuat salinan pohon JavaScript di memori, membandingkannya dengan pohon lama (*diffing*), baru kemudian memperbarui DOM asli.
**Svelte bukan framework yang berjalan di browser, melainkan COMPILER.**
Saat Anda menjalankan `npm run build`, Svelte mengompilasi kode Anda menjadi potongan JavaScript murni yang **membedah langsung node DOM yang berubah secara spesifik (*surgical DOM updates*)**.
Hasilnya: Tidak ada overhead memori Virtual DOM, tidak ada runtime raksasa, dan performa mencapai kecepatan JavaScript native!

### Revolusi Svelte 5: Runes (`$state`)
Di Svelte 5, sistem reaktivitas ditingkatkan menggunakan konsep **Runes** (simbol khusus berawalan tanda dolar `$`).
- `let x = $state(0)`: Menandai bahwa variabel `x` adalah sinyal reaktif (*signal-based reactivity*).
- Berbeda dengan Svelte 4 lama di mana reaktivitas hanya bekerja di file `.svelte`, Runes di Svelte 5 dapat ditulis di dalam file JavaScript biasa (`.svelte.js`), memberikan reaktivitas universal yang luar biasa rapi!

---

---

## Penjelasan untuk Pemula

### Analogi: Mobil Balap Ringan vs Mobil Pengangkut Berat
1. **React/Vue (Virtual DOM)** seperti mobil truk yang mengangkut mesin derek raksasa di bak belakangnya: setiap kali ingin memindahkan satu batu bata kecil, mesin derek harus dinyalakan dan dioperasikan.
2. **Svelte (Compiler)** seperti tukang batu ahli yang datang membawa palu mini: ia langsung menuju batu bata yang retak dan menukarnya dalam 1 detik tanpa perlu menyalakan mesin derek raksasa.

## Eksperimen

- Geser slider Frekuensi dan amati teks Hz berubah secara instan berkat reaktivitas $state.
- Klik salah satu tombol preset (misal A4 440Hz) dan perhatikan slider frekuensi melompat otomatis.
- Ganti jenis gelombang ke "sawtooth" dan periksa nilai yang tersimpan di state.
- Buka berkas bundle produksi yang dihasilkan Svelte dan amati bahwa tidak ada library runtime Virtual DOM di dalamnya.

---

## Tantangan

Tambahkan slider baru untuk parameter `detune` (penyimpangan nada mikro dari -100 sen hingga +100 sen) yang terikat pada state reaktif `$state(0)`.

---

## Ringkasan

Kamu telah menguasai kompilasi Svelte tanpa Virtual DOM dan Rune reaktif $state. Minggu depan kita mempelajari $derived dan $effect.
