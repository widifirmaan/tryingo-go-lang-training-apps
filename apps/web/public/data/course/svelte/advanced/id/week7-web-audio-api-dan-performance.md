# Web Audio API: AudioContext, OscillatorNode, GainNode & Timing Scheduling

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 7:** Web Audio API: AudioContext, OscillatorNode, GainNode & Timing Scheduling

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

## Ringkasan

Kamu telah menguasai Web Audio API, perancangan envelope suara drum, dan scheduling currentTime. Minggu depan adalah Capstone Final: 16-Step Audio Beat Sequencer.
