# Svelte Track: 8 Weeks (2 Levels)
# Final Product: Interactive 16-Step Web Audio Synthesizer & Beat Sequencer with Svelte 5 Runes

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Svelte 5 Runes & Reaktivitas Kompilasi',
        'nameEn': 'Svelte 5 Runes & Compiler Reactivity',
        'descId': 'Revolusi Svelte 5: Tanpa Virtual DOM, Runes ($state, $derived, $effect), $props modern, snippets, dan kontrol alur.',
        'descEn': 'The Svelte 5 revolution: Zero Virtual DOM, Runes ($state, $derived, $effect), modern $props, snippets, and control flow.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Web Audio, Actions & Capstone Synthesizer',
        'nameEn': 'Web Audio, Actions & Synthesizer Capstone',
        'descId': 'Svelte Actions (use:action), modul .svelte.js, integrasi Web Audio API berkecepatan tinggi, dan capstone 16-step beat sequencer.',
        'descEn': 'Svelte Actions (use:action), .svelte.js modules, high-performance Web Audio API, and the 16-step beat sequencer capstone.',
    },
]

MODULES = [
    # Level 1: Svelte 5 Runes & Reaktivitas Kompilasi (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'svelte-5-runes-dan-state',
        'titleId': 'Svelte 5 Runes: Arsitektur Tanpa Virtual DOM & $state Reaktif',
        'titleEn': 'Svelte 5 Runes: Zero-Virtual DOM Architecture & Reactive $state',
        'programId': 'Pengendali Generator Nada Audio (Audio Oscillator Node)',
        'programEn': 'Audio Oscillator Tone Generator with Svelte 5 $state',
        'levelNameId': 'Svelte 5 Runes & Reaktivitas Kompilasi',
        'levelNameEn': 'Svelte 5 Runes & Compiler Reactivity',
        'language': 'svelte',
        'code': """<script>
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
""",
        'objectivesId': [
            'Memahami arsitektur compiler Svelte: mengubah kode deklaratif menjadi instruksi bedah DOM langsung tanpa Virtual DOM',
            'Menguasai fitur utama Svelte 5 Runes: deklarasi state reaktif universal dengan $state()',
            'Menggunakan bind:value untuk two-way data binding instan pada elemen form (range, select, text)',
            'Menggunakan binding kelas kondisional class:active={condition} yang sangat bersih',
            'Memahami mengapa Svelte memiliki runtime terkecil dan performa eksekusi tercepat di industri',
        ],
        'objectivesEn': [
            'Understand Svelte compiler architecture: transforming declarative templates into surgical direct DOM mutations without Virtual DOM overhead',
            'Master the core Svelte 5 Runes paradigm: universal reactive state declaration via $state()',
            'Deploy bind:value for zero-boilerplate two-way data binding across sliders, selects, and inputs',
            'Utilize clean conditional class directives class:active={condition}',
            'Recognize why Svelte achieves industry-leading bundle footprints and runtime execution speeds',
        ],
        'explanationId': """### Svelte Mengubah Cara Pandang Web: Tanpa Virtual DOM
React dan Vue menggunakan *Virtual DOM*: saat data berubah, mereka membuat salinan pohon JavaScript di memori, membandingkannya dengan pohon lama (*diffing*), baru kemudian memperbarui DOM asli.
**Svelte bukan framework yang berjalan di browser, melainkan COMPILER.**
Saat Anda menjalankan `npm run build`, Svelte mengompilasi kode Anda menjadi potongan JavaScript murni yang **membedah langsung node DOM yang berubah secara spesifik (*surgical DOM updates*)**.
Hasilnya: Tidak ada overhead memori Virtual DOM, tidak ada runtime raksasa, dan performa mencapai kecepatan JavaScript native!

### Revolusi Svelte 5: Runes (`$state`)
Di Svelte 5, sistem reaktivitas ditingkatkan menggunakan konsep **Runes** (simbol khusus berawalan tanda dolar `$`).
- `let x = $state(0)`: Menandai bahwa variabel `x` adalah sinyal reaktif (*signal-based reactivity*).
- Berbeda dengan Svelte 4 lama di mana reaktivitas hanya bekerja di file `.svelte`, Runes di Svelte 5 dapat ditulis di dalam file JavaScript biasa (`.svelte.js`), memberikan reaktivitas universal yang luar biasa rapi!""",
        'explanationEn': """### Svelte Rewrites the Paradigm: Zero Virtual DOM
React and Vue rely on a *Virtual DOM*: reconciling memory tree representations on every state modification before committing DOM mutations.
**Svelte is not a browser runtime framework; it is a COMPILER.**
During compilation, Svelte converts declarative components into surgical, pinpoint JavaScript instructions directly mutating affected DOM nodes.
Output: Zero Virtual DOM memory consumption, zero runtime framework weight, and raw vanilla JavaScript performance!

### The Svelte 5 Revolution: Runes (`$state`)
Svelte 5 introduces **Runes** (declarative compiler directives prefixed with `$`).
- `let x = $state(0)`: Declares that variable `x` is an explicit reactive signal.
- Unlike Svelte 4 where reactivity was confined strictly to `.svelte` files, Svelte 5 Runes function universally across plain `.svelte.js` modules!""",
        'beginnerId': """### Analogi: Mobil Balap Ringan vs Mobil Pengangkut Berat
1. **React/Vue (Virtual DOM)** seperti mobil truk yang mengangkut mesin derek raksasa di bak belakangnya: setiap kali ingin memindahkan satu batu bata kecil, mesin derek harus dinyalakan dan dioperasikan.
2. **Svelte (Compiler)** seperti tukang batu ahli yang datang membawa palu mini: ia langsung menuju batu bata yang retak dan menukarnya dalam 1 detik tanpa perlu menyalakan mesin derek raksasa.""",
        'beginnerEn': """### Analogy: Precision Formula Cars vs Crane Trucks
1. **Virtual DOM Frameworks** resemble heavy industrial crane trucks: to adjust a single brick on a wall, engineers operate a diesel crane mechanism (*reconciliation diffing pass*).
2. **Svelte (Compiler)** is a master mason equipped with a precision chisel: walking directly to the target brick, swapping it in milliseconds with zero mechanical overhead.""",
        'experimentsId': [
            'Geser slider Frekuensi dan amati teks Hz berubah secara instan berkat reaktivitas $state.',
            'Klik salah satu tombol preset (misal A4 440Hz) dan perhatikan slider frekuensi melompat otomatis.',
            'Ganti jenis gelombang ke "sawtooth" dan periksa nilai yang tersimpan di state.',
            'Buka berkas bundle produksi yang dihasilkan Svelte dan amati bahwa tidak ada library runtime Virtual DOM di dalamnya.',
        ],
        'experimentsEn': [
            'Drag the Frequency slider to witness real-time scalar updates via reactive $state bindings.',
            'Click preset buttons (e.g. A4 440Hz) and observe the range slider track reactively.',
            'Switch waveform to "sawtooth" inspecting stored state values.',
            'Inspect Svelte build outputs to confirm the complete absence of a Virtual DOM runtime library.',
        ],
        'challengeId': 'Tambahkan slider baru untuk parameter `detune` (penyimpangan nada mikro dari -100 sen hingga +100 sen) yang terikat pada state reaktif `$state(0)`.',
        'challengeEn': 'Add a reactive slider bound to `$state(0)` governing `detune` parameters spanning -100 to +100 pitch cents.',
        'summaryId': 'Kamu telah menguasai kompilasi Svelte tanpa Virtual DOM dan Rune reaktif $state. Minggu depan kita mempelajari $derived dan $effect.',
        'summaryEn': 'You have mastered Svelte compiler mechanics and reactive $state Runes. Next week, we examine $derived and $effect.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'derived-dan-effect-runes',
        'titleId': 'Svelte 5 Runes: $derived untuk Nilai Turunan & $effect untuk Efek Samping',
        'titleEn': 'Svelte 5 Runes: $derived Computations & $effect Side Effects',
        'programId': 'Kalkulator Oktaf Nada & Spektrum Frekuensi Harmonik',
        'programEn': 'Musical Octave Calculator & Harmonic Frequency Spectrum with $derived',
        'levelNameId': 'Svelte 5 Runes & Reaktivitas Kompilasi',
        'levelNameEn': 'Svelte 5 Runes & Compiler Reactivity',
        'language': 'svelte',
        'code': """<script>
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
""",
        'objectivesId': [
            'Menggunakan Rune $derived untuk komputasi reaktif nilai turunan murni',
            'Menggunakan $derived.by(() => { ... }) untuk kalkulasi bersyarat multiline kompleks',
            'Memahami cara kerja Rune $effect untuk mengeksekusi side effects setelah DOM selesai diperbarui',
            'Menulis fungsi cleanup di dalam $effect untuk membatalkan listener atau oscillator timer',
            'Mencegah re-running yang tidak diinginkan dengan memahami pelacakan dependensi otomatis sinyal Svelte',
        ],
        'objectivesEn': [
            'Deploy the $derived Rune to calculate pure reactive derived expressions without manual sync',
            'Apply $derived.by(() => { ... }) for multiline conditional algorithmic blocks',
            'Master the $effect Rune to orchestrate side effects after the DOM reconciles',
            'Author cleanup teardown callbacks inside $effect preventing zombie audio oscillations',
            'Prevent redundant execution loops via Svelte automatic fine-grained dependency tracking',
        ],
        'explanationId': """### Mengapa `$derived` Menggantikan Sintaks `$:` Lama?
Di Svelte 3 dan 4, semua hal reaktif ditulis dengan label JavaScript `$: ganda = angka * 2`.
Sintaks lama tersebut memiliki kelemahan: tidak jelas apakah suatu baris adalah perhitungan nilai (*derived*) atau efek samping (*side effect*), serta urutan eksekusinya sulit diprediksi.

Di **Svelte 5**:
1. **`$derived(ekspresi)`**: Murni untuk **menghitung nilai turunan**. Svelte menjamin nilai ini dievaluasi secara malas (*lazy*) dan di-cache hingga dependensinya berubah.
2. **`$effect(() => { ... })`**: Khusus untuk **efek samping** (seperti memanggil audio API, mengubah `document.title`, atau logging). `$effect` hanya berjalan di browser (tidak berjalan saat SSR server-side rendering).""",
        'explanationEn': """### Why `$derived` Replaced Legacy `$:` Labels
In Svelte 3 and 4, all derived reactivity overloaded JavaScript labels `$: doubled = count * 2`.
This syntax blurred boundaries between pure computations and side effects while making execution ordering ambiguous.

In **Svelte 5**:
1. **`$derived(expression)`**: Strictly dedicated to **pure derived values**. Evaluated lazily with zero overhead until dependencies diverge.
2. **`$effect(() => { ... })`**: Exclusively dedicated to **side effects** (audio nodes, window metrics, analytics). `$effect` executes purely client-side in the browser, omitting SSR passes.""",
        'beginnerId': """### Analogi: Konversi Mata Uang & Alarm Bel Pintu
1. **`$derived`** seperti tabel konversi kurs mata uang di dompet: jika Anda membawa 10 lembar uang 100 Dollar (*state*), total uang rupiah Anda otomatis bernilai 16 Juta Rupiah (*derived*). Angka rupiah itu otomatis ada karena menghitung nilai dollarnya.
2. **`$effect`** seperti bel pintu otomatis: saat seseorang melangkah melewati sensor pintu (*state berubah*), bel berdering membunyikan suara (*side effect*).""",
        'beginnerEn': """### Analogy: Currency Conversion Sheets & Doorbell Chimes
1. **`$derived`** is a currency conversion table in your wallet: carrying 10 hundred-dollar bills (*state*) automatically yields 1,000 dollars (*derived*). The calculation exists as an organic consequence of the baseline asset.
2. **`$effect`** is an automated entry chime: when a visitor crosses the infrared sensor beam (*state changes*), the speaker rings a chime sound (*side effect*).""",
        'experimentsId': [
            'Geser frekuensi acuan dan amati keempat kotak harmonik menghitung angka frekuensi secara instan.',
            'Ubah frekuensi ke 100 Hz dan perhatikan label klasifikasi suara berganti menjadi Bass.',
            'Buka DevTools Console dan amati pesan log yang dicetak oleh $effect pada setiap pergeseran slider.',
            'Gunakan $derived.by untuk menghitung rasio matematis deret Fibonacci pada frekuensi audio.',
        ],
        'experimentsEn': [
            'Drag the reference frequency slider observing all 4 harmonic cards recalculate instantly.',
            'Shift pitch to 100Hz and observe the classification tag update reactively to Bass.',
            'Inspect DevTools console to observe $effect log statements stream on slider drags.',
            'Deploy $derived.by calculating Fibonacci pitch intervals across audio frequencies.',
        ],
        'challengeId': 'Tambahkan nilai `$derived` baru `notasiMusikTerdekat` yang mencocokkan angka Hertz saat ini dengan nama nada terdekat (misal: 440 Hz = "A4", 261.6 Hz = "C4").',
        'challengeEn': 'Author a `$derived` property `closestNoteName` mapping raw Hertz numbers to musical pitch notations (e.g. 440 Hz = "A4", 261.6 Hz = "C4").',
        'summaryId': 'Kamu telah menguasai $derived dan $effect di Svelte 5. Minggu depan kita mempelajari komunikasi komponen modern dengan $props dan callback functions.',
        'summaryEn': 'You have mastered Svelte 5 $derived and $effect. Next week, we examine modern component communication with $props and function callbacks.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'props-dan-event-modern',
        'titleId': 'Svelte 5 Komponen Modern: $props, Nilai Default & Callback Functions',
        'titleEn': 'Modern Svelte 5 Components: $props, Fallbacks & Callback Functions',
        'programId': 'Tombol Pad Drum Perkusi (Percussion Drum Pad)',
        'programEn': 'Synthesizer Drum Pad Button with Modern $props & Visual Feedback',
        'levelNameId': 'Svelte 5 Runes & Reaktivitas Kompilasi',
        'levelNameEn': 'Svelte 5 Runes & Compiler Reactivity',
        'language': 'svelte',
        'code': """<!-- ===================================================================== -->
<!-- File: DrumPad.svelte (Komponen Pad Drum Modern Svelte 5)                 -->
<!-- ===================================================================== -->
<script>
  // 1. Svelte 5 $props: Menggantikan sintaks lama 'export let nama'
  // Destrukturisasi dengan nilai default langsung di dalam fungsi!
  let {
    label = "Kick",
    tombolShortcut = "Q",
    warnaAksen = "#ec4899",
    suaraSampleUrl = "",
    onTrigger = () => {} // Callback function menggantikan createEventDispatcher lama!
  } = $props();

  let isSedangDitekan = $state(false);

  function triggerPad() {
    isSedangDitekan = true;
    onTrigger({ label, waktu: Date.now() });

    setTimeout(() => {
      isSedangDitekan = false;
    }, 150);
  }
</script>

<button
  class="drum-pad"
  class:pressed={isSedangDitekan}
  style:--accent-color={warnaAksen}
  onclick={triggerPad}
>
  <span class="shortcut">[{tombolShortcut}]</span>
  <span class="label">{label}</span>
</button>

<style>
  .drum-pad {
    width: 100px;
    height: 100px;
    background: #18181b;
    border: 2px solid #27272a;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justifyContent: center;
    align-items: center;
    gap: 6px;
    transition: all 0.08s ease;
  }
  .drum-pad:hover { border-color: var(--accent-color); }
  .drum-pad.pressed {
    background: var(--accent-color);
    color: black;
    transform: scale(0.94);
    box-shadow: 0 0 16px var(--accent-color);
  }
  .shortcut { font-size: 11px; color: #a1a1aa; }
  .label { font-weight: bold; font-size: 14px; }
</style>
""",
        'objectivesId': [
            'Memahami migrasi dari export let (Svelte 4) ke Rune $props() modern di Svelte 5',
            'Menetapkan nilai default props menggunakan destrukturisasi JavaScript standar',
            'Menggantikan createEventDispatcher yang rumit dengan fungsi callback props murni (onTrigger)',
            'Menggunakan direktif style:--css-var untuk injeksi CSS Variables langsung dari state komponen',
            'Membangun komponen tombol audio yang responsif dengan efek feedback visual instan',
        ],
        'objectivesEn': [
            'Migrate from legacy export let declarations to the modern Svelte 5 $props() Rune',
            'Declare fallback prop defaults cleanly leveraging native JavaScript destructuring',
            'Replace cumbersome createEventDispatcher boilerplates with clean callback props (onTrigger)',
            'Inject dynamic CSS Custom Properties directly into styling blocks via style:--css-var directives',
            'Construct tactile audio buttons featuring low-latency visual feedback transitions',
        ],
        'explanationId': """### Mengapa Svelte 5 Menghapus `export let`?
Di Svelte versi lama, untuk mendeklarasikan prop Anda menulis: `export let judul = 'Default'`.
Kata kunci `export` ini sering membingungkan pengembang pemula karena tampak seperti mengekspor variabel ke luar, padahal sebenarnya sedang **menerima data dari luar**.

Di **Svelte 5**:
Semua props diterima melalui Rune **`$props()`**:
`let { judul = "Default", aktif = false } = $props();`
Sintaks ini 100% konsisten dengan destrukturisasi JavaScript modern dan mendukung TypeScript secara elegan!

### Kematian `createEventDispatcher`
Di Svelte 5, Anda tidak perlu lagi mengimpor `createEventDispatcher` dan menulis `dispatch('customEvent')`.
Gunakan **fungsi callback biasa** sebagai prop:
`<DrumPad onTrigger={(data) => mainkanSuara(data)} />`
Lebih sederhana, lebih cepat, dan 100% aman secara tipe data.""",
        'explanationEn': """### Why Svelte 5 Deprecated `export let`
In legacy Svelte versions, props declared via `export let title = 'Default'`.
Using `export` baffled newcomers because standard JavaScript semantics imply exporting values out, whereas the component was **accepting values inward**.

In **Svelte 5**:
All incoming contracts resolve via the **`$props()`** Rune:
`let { title = "Default", active = false } = $props();`
This aligns with native JavaScript destructuring ergonomics with first-class TypeScript inference!

### Goodbye `createEventDispatcher`
In Svelte 5, the legacy `createEventDispatcher` package is obsolete.
Simply pass **plain callback functions** as props:
`<DrumPad onTrigger={(payload) => playSample(payload)} />`
Simpler, faster, and completely typed without runtime abstraction overhead.""",
        'beginnerId': """### Analogi: Sakelar Bel Pintu & Kabel Lampu Sorot
1. **$props** seperti kotak sambungan kabel di belakang bel: ada colokan bertuliskan 'Warna Lampu' (*warnaAksen*) dan colokan 'Suara' (*suaraSampleUrl*). Anda bisa memasang kabel sesuai selera.
2. **Callback onTrigger** seperti kabel lonceng: begitu tombol pad ditekan, kabel menarik bel di dapur komandan (*onTrigger terpanggil*).""",
        'beginnerEn': """### Analogy: Industrial Pushbuttons & Terminal Blocks
1. **$props** is the rear wiring terminal block of an industrial push button: labelled terminals accept 'LED Color' (*warnaAksen*) and 'Sample Source' (*suaraSampleUrl*).
2. **Callback onTrigger** is the relay signal wire: when an operator hits the button, the terminal emits a pulse to the master sequencer (*onTrigger executes*).""",
        'experimentsId': [
            'Panggil komponen DrumPad dengan warna aksen berbeda (misal warnaAksen="#3b82f6") dan amati glow warnanya.',
            'Tekan tombol pad dan perhatikan animasi mengecil (scale 0.94) dan kilatan warna menyala.',
            'Daftarkan event window keydown untuk memicu triggerPad() saat tombol huruf Q ditekan pada keyboard.',
            'Beri nilai fallback pada $props dan uji saat parent tidak mengirimkan satupun prop.',
        ],
        'experimentsEn': [
            'Instantiate DrumPad with distinct accent colors (e.g. warnaAksen="#3b82f6") to observe dynamic styling.',
            'Click the pad observing tactile scale transitions and vibrant glow flashes.',
            'Bind a window keydown event triggering triggerPad() when keyboard letter Q is struck.',
            'Omit props from the parent to confirm default fallbacks populate flawlessly.',
        ],
        'challengeId': 'Buat grid 4x4 drum pad (16 tombol) yang masing-masing memiliki sampel perkusi unik (Kick, Snare, HiHat, Clap, Tom, Rimshot) dan rekam riwayat ketukan ke dalam array state.',
        'challengeEn': 'Build a 4x4 drum pad grid (16 pads) mapping unique percussion samples (Kick, Snare, HiHat, Clap) recording hit history into an array state.',
        'summaryId': 'Kamu telah menguasai $props modern, nilai fallback, dan fungsi callback. Minggu depan kita mempelajari Snippets dan alur kontrol lanjutan.',
        'summaryEn': 'You have mastered modern $props, fallbacks, and callback props. Next week, we examine Svelte 5 Snippets and control flow.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'snippets-dan-kontrol-alur',
        'titleId': 'Snippets ({#snippet}), {@render} & Blok Kontrol ({#if}, {#each}, {#await})',
        'titleEn': 'Snippets ({#snippet}), {@render} & Control Flow ({#if}, {#each}, {#await})',
        'programId': 'Grid 16-Step Audio Sequencer dengan Render Snippet Modular',
        'programEn': '16-Step Audio Sequencer Matrix with Svelte 5 Snippets & Control Flow',
        'levelNameId': 'Svelte 5 Runes & Reaktivitas Kompilasi',
        'levelNameEn': 'Svelte 5 Runes & Compiler Reactivity',
        'language': 'svelte',
        'code': """<script>
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
""",
        'objectivesId': [
            'Memahami inovasi Svelte 5 Snippets ({#snippet}) yang menggantikan sistem slot lama',
            'Menggunakan tag {@render snippetName(args)} untuk me-render template reusable lokal berparameter',
            'Menguasai blok kontrol alur Svelte: {#if}, {#each item, index (key)}, dan {#await promise}',
            'Memahami pentingnya identitas key dalam blok {#each} untuk efisiensi kompilasi DOM',
            'Membangun grid matriks audio 16-langkah interaktif dengan manipulasi array $state',
        ],
        'objectivesEn': [
            'Master Svelte 5 Snippets ({#snippet}) replacing legacy slot transclusion mechanisms',
            'Deploy the {@render snippetName(args)} directive rendering parameterized local templates',
            'Master core control flow directives: {#if}, {#each item, index (key)}, and {#await promise}',
            'Enforce keyed identity within {#each} collections guaranteeing surgical DOM performance',
            'Construct an interactive 16-step sequencer matrix driving reactive $state array mutations',
        ],
        'explanationId': """### Revolusi Svelte 5 Snippets
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
3. `{#await promise} ... {:then data} ... {:catch err} ... {/await}`: Penanganan promise asinkron langsung di template tanpa memerlukan state `loading` manual!""",
        'explanationEn': """### The Svelte 5 Snippets Architecture
In previous Svelte releases, duplicating markup templates within the same view mandated authoring separate `.svelte` files or fighting rigid `<slot>` semantics.
**Svelte 5 delivers `{#snippet}` and `{@render}`**:
```svelte
{#snippet mySnippet(param)}
  <div>Hello {param}!</div>
{/snippet}

{@render mySnippet('Budi')}
```
Snippets accept arguments, pass down through props to children, and render arbitrary declarative structures with zero boilerplate!

### Canonical Control Flow Matrix:
1. `{#if condition} ... {:else} ... {/if}`: Conditional template branching.
2. `{#each list as item, i (item.id)}`: List iterations. **Mandating `(item.id)`** guarantees surgical reconciliation.
3. `{#await promise} ... {:then res} ... {:catch err} ... {/await}`: Direct template Promise consumption eliminating manual `loading` booleans!""",
        'beginnerId': """### Analogi: Stempel Pola Kain & Cetakan Kue
1. **`{#snippet}`** seperti cap stempel motif batik: Anda mendesain satu cetakan stempel bunga kecil (*snippet*).
2. **`{@render}`** seperti menempelkan stempel tersebut 16 kali di atas selembar kain sutra (*render*): motifnya 100% konsisten, dan jika Anda ingin mengubah warna bunganya, Anda cukup mengganti tinta pada stempel utama.""",
        'beginnerEn': """### Analogy: Batik Fabric Stamps & Cookie Cutters
1. **`{#snippet}`** is an artisan batik copper stamp: you carve the floral rosette pattern once into the metal plate (*snippet definition*).
2. **`{@render}`** is pressing the stamp 16 times across a silk canvas (*render execution*): patterns reproduce with millimeter precision, and altering the rosette alters every stamped impression across the sheet.""",
        'experimentsId': [
            'Klik kotak-kotak step pada grid matriks dan perhatikan warna biru menyala/mati secara instan.',
            'Ubah nilai stepAktif dari 0 ke 1, 2, 3 dan amati kotak bersinar kuning (current-play) bergeser horizontal.',
            'Tambahkan track ke-4 berupa "Clap Perkusi" ke dalam array tracks.',
            'Uji penanganan asinkron menggunakan blok {#await fetch("/api/samples")} langsung di template.',
        ],
        'experimentsEn': [
            'Click matrix step nodes observing active cyan lighting toggle instantaneously.',
            'Increment stepAktif from 0 to 1, 2, 3 observing the yellow playback highlight sweep horizontally.',
            'Append a fourth percussion track "Hand Clap" to the tracks state array.',
            'Evaluate inline asynchronous data resolution leveraging the template {#await} block.',
        ],
        'challengeId': 'Tambahkan tombol "Hapus Semua Step" (Clear Grid) yang mereset seluruh langkah di semua track menjadi `false` menggunakan pemetaan array `$state`.',
        'challengeEn': 'Add a "Clear Grid" action resetting all track step nodes back to `false` via immutable array mapping.',
        'summaryId': 'Kamu telah menguasai Snippets, @render, dan blok kontrol alur. Minggu depan kita memasuki Level 2: Svelte Actions dan Web Audio API.',
        'summaryEn': 'You have mastered Snippets, @render, and control flow. Next week, we enter Level 2: Svelte Actions and Web Audio API.',
    },

    # Level 2: Web Audio, Actions & Capstone Synthesizer (Weeks 5-8)
    {
        'week': 5,
        'level': 'advanced',
        'topicId': 'actions-dan-transisi-dom',
        'titleId': 'Svelte Actions (use:action): Manipulasi DOM Tingkat Rendah & Rotary Knob Dial',
        'titleEn': 'Svelte Actions (use:action): Low-Level DOM Lifecycle & Rotary Knob Controls',
        'programId': 'Knob Putar Parameter Synthesizer dengan Drag Mouse Gesture',
        'programEn': 'Synthesizer Rotary Knob Control with use:rotaryDrag Action',
        'levelNameId': 'Web Audio, Actions & Capstone Synthesizer',
        'levelNameEn': 'Web Audio, Actions & Synthesizer Capstone',
        'language': 'svelte',
        'code': """<script>
  let cutoffFrekuensi = $state(1200); // 20 Hz - 20000 Hz

  // 1. Svelte Action: Fungsi siklus hidup DOM mandiri (node, parameter) => { update, destroy }
  function rotaryDrag(node, { min = 20, max = 5000, value, onChange }) {
    let startY = 0;
    let startVal = value;

    function onMouseDown(e) {
      startY = e.clientY;
      startVal = value;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(e) {
      const deltaY = startY - e.clientY; // Geser ke atas = naik, ke bawah = turun
      const step = (max - min) / 200;    // Sensitivitas drag
      let newVal = Math.min(max, Math.max(min, startVal + deltaY * step));
      onChange(Math.round(newVal));
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    node.addEventListener("mousedown", onMouseDown);

    return {
      update(newParams) {
        value = newParams.value;
      },
      destroy() {
        node.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }
    };
  }
</script>

<div class="knob-container">
  <h4>Filter Cutoff (Action Dial)</h4>

  <!-- 2. Penggunaan use:action pada elemen DOM -->
  <div
    class="knob-dial"
    use:rotaryDrag={{
      min: 100,
      max: 5000,
      value: cutoffFrekuensi,
      onChange: (val) => (cutoffFrekuensi = val)
    }}
    style:--rotasi={`${((cutoffFrekuensi - 100) / 4900) * 270 - 135}deg`}
  >
    <div class="pointer"></div>
  </div>

  <div class="val-display">{cutoffFrekuensi} Hz</div>
  <small style="color: #71717a;">* Klik & drag mouse ke atas/bawah</small>
</div>

<style>
  .knob-container {
    max-width: 260px;
    margin: 20px auto;
    font-family: sans-serif;
    text-align: center;
    background: #18181b;
    color: white;
    padding: 20px;
    border-radius: 12px;
  }
  .knob-dial {
    width: 80px;
    height: 80px;
    background: #27272a;
    border: 3px solid #3f3f46;
    border-radius: 50%;
    margin: 16px auto;
    position: relative;
    cursor: ns-resize;
    transform: rotate(var(--rotasi));
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.5);
  }
  .pointer {
    width: 4px;
    height: 18px;
    background: #38bdf8;
    position: absolute;
    top: 4px;
    left: calc(50% - 2px);
    border-radius: 2px;
  }
  .val-display { font-size: 20px; font-weight: bold; color: #38bdf8; }
</style>
""",
        'objectivesId': [
            'Memahami konsep Svelte Actions (use:action) sebagai cara resmi memasang perilaku DOM kustom',
            'Menulis Action mandiri dengan antarmuka siklus hidup: inisialisasi, update, dan destroy',
            'Membangun pengendali interaksi gestur mouse (drag rotary dial) untuk aplikasi audio/kreatif',
            'Menghindari memory leak dengan membersihkan event listener global window pada callback destroy',
            'Menghubungkan parameter reaktif Svelte dengan Action menggunakan method update()',
        ],
        'objectivesEn': [
            'Master Svelte Actions (use:action) as the canonical bridge for imperative DOM behaviors',
            'Author encapsulated Actions implementing full lifecycle contracts: mount, update, and destroy',
            'Construct tactile gesture-driven UI controls (rotary drag dials) for creative audio workflows',
            'Eliminate memory leak vulnerabilities by deregistering global window listeners inside destroy callbacks',
            'Synchronize reactive Svelte parameters with DOM Actions through the update() method',
        ],
        'explanationId': """### Apa itu Svelte Action?
Svelte Action adalah **fungsi tingkat elemen yang dipasang menggunakan direktif `use:namaAction`**.
Action menerima referensi node DOM fisik (`node`) dan objek parameter.
Keunggulannya:
1. Tidak memerlukan library pembungkus komponen yang rumit.
2. Sangat mudah digunakan kembali: pasang `use:rotaryDrag` pada tombol apa saja.
3. Memiliki siklus hidup bersih: method `destroy()` otomatis dipanggil saat elemen dilepas dari DOM, memastikan pembersihan event listener 100% aman.""",
        'explanationEn': """### Understanding Svelte Actions
A Svelte Action is **an element-level lifecycle attachment declared via `use:actionName`**.
The Action receives the native HTML element handle (`node`) alongside parameter payloads.
Key strengths:
1. Bypasses bulky component wrapper wrappers.
2. Infinitely reusable: apply `use:rotaryDrag` to arbitrary DOM nodes.
3. Clean memory ergonomics: the `destroy()` hook fires automatically when the host node unmounts, guaranteeing flawless listener teardown.""",
        'beginnerId': """### Analogi: Sakelar Kenop Putar Kompor Gas
**use:action** seperti memasang kenop putar fisik ke katup pipa gas: Anda tidak membuat kompor baru dari nol (*tidak perlu komponen baru*), melainkan cukup menempelkan aksesori kenop putar (*use:rotaryDrag*) ke katup yang sudah ada di dinding dapur.""",
        'beginnerEn': """### Analogy: Industrial Rotary Knobs on Valve Stems
**use:action** is fastening an ergonomic knurled metal dial directly onto an existing copper valve stem: you avoid rebuilding the furnace chassis (*no wrapper component needed*), simply anchoring the rotational interaction attachment (*use:rotaryDrag*) onto the native stem.""",
        'experimentsId': [
            'Klik dan tahan mouse pada kenop dial, geser ke atas dan amati jarum penunjuk berputar searah jarum jam.',
            'Geser ke bawah dan perhatikan nilai Hertz turun hingga batas minimum 100 Hz.',
            'Buka inspector browser dan amati perubahan CSS Variable --rotasi pada elemen dial.',
            'Tambahkan parameter sensitivitas pada objek action options.',
        ],
        'experimentsEn': [
            'Click and drag upward over the knob observing the pointer rotate clockwise reactively.',
            'Drag downward observing frequency values descend to the 100 Hz minimum bound.',
            'Inspect DevTools observing the inline CSS Variable --rotasi update during drags.',
            'Introduce custom drag sensitivity configuration parameters to the action.',
        ],
        'challengeId': 'Buat Action `use:longPress(duration, callback)` yang memicu aksi reset nilai ke 1000 Hz jika pengguna menahan klik mouse selama lebih dari 1.5 detik.',
        'challengeEn': 'Author a `use:longPress(duration, callback)` Action triggering an automated parameter reset to 1000 Hz when clicks hold beyond 1.5 seconds.',
        'summaryId': 'Kamu telah menguasai Svelte Actions use:action dan manipulasi DOM gestur. Minggu depan kita mempelajari Svelte Context dan modul reaktivitas universal .svelte.js.',
        'summaryEn': 'You have mastered Svelte Actions and gesture DOM bindings. Next week, we examine Svelte Context and universal .svelte.js reactivity modules.',
    },
    {
        'week': 6,
        'level': 'advanced',
        'topicId': 'context-dan-universal-reactivity',
        'titleId': 'Svelte 5 Universal Reactivity: Modul .svelte.js & Context API (setContext/getContext)',
        'titleEn': 'Svelte 5 Universal Reactivity: .svelte.js Modules & Context API',
        'programId': 'Mesin State Audio Global Mandiri Berbasis File .svelte.js',
        'programEn': 'Global Audio Engine State Store with .svelte.js & Svelte Context',
        'levelNameId': 'Web Audio, Actions & Capstone Synthesizer',
        'levelNameEn': 'Web Audio, Actions & Capstone Synthesizer',
        'language': 'js',
        'code': """// ============================================================================
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
""",
        'objectivesId': [
            'Memahami keunggulan revolusioner modul .svelte.js: menulis reaktivitas sinyal Svelte di luar file komponen',
            'Membangun state store berorientasi objek menggunakan kelas JavaScript modern dengan properti $state',
            'Menggunakan Context API Svelte (setContext dan getContext) untuk dependensi hierarkis pohon komponen',
            'Menghilangkan kebutuhan library state management pihak ketiga untuk sebagian besar aplikasi',
            'Menjaga sinkronisasi audio global tempo BPM di seluruh instrumen musik aplikasi',
        ],
        'objectivesEn': [
            'Master universal reactivity within .svelte.js files: authoring reactive signal state outside component templates',
            'Architect object-oriented state stores leveraging modern ES6 classes armed with $state fields',
            'Deploy Svelte Context primitives (setContext and getContext) for hierarchical component tree injection',
            'Eliminate third-party state management dependencies across typical production architectures',
            'Synchronize global audio BPM tempo parameters uniformly across modular instrument tracks',
        ],
        'explanationId': """### Terobosan Besar Svelte 5: `.svelte.js`
Di Svelte 4 dan framework lain, reaktivitas sering terikat pada siklus hidup komponen UI. Jika Anda ingin membuat store global, Anda harus menggunakan API khusus (`writable()`, `readable()`).
Di **Svelte 5**:
Cukup beri nama file Anda dengan akhiran **`.svelte.js`** atau **`.svelte.ts`**!
Di dalam file tersebut, Anda bebas menggunakan `$state()`, `$derived()`, dan `$effect()`.
Anda dapat membuat kelas JavaScript biasa yang propertinya reaktif murni, mengimpornya ke komponen mana saja, dan UI akan ter-update secara otomatis saat properti kelas tersebut berubah!

### Kapan Menggunakan `setContext` vs Modul `.svelte.js`?
- **Modul `.svelte.js` (Singleton)**: Bagus untuk state yang benar-benar global di seluruh aplikasi (misal: Master Audio Engine, preferensi tema).
- **Context API (`setContext` / `getContext`)**: Bagus untuk membatasi state pada sub-pohon tertentu (misal: satu instans Synthesizer memiliki banyak kenop knob anak, namun ada 3 synthesizer independen di halaman yang sama).""",
        'explanationEn': """### The `.svelte.js` Universal Reactivity Breakthrough
In legacy frameworks, reactivity remains tightly shackled to component render pipelines. Distributing state required specialized store primitives (`writable()`, `readable()`).
In **Svelte 5**:
Append the **`.svelte.js`** or **`.svelte.ts`** extension!
Within these modules, Runes like `$state()`, `$derived()`, and `$effect()` function natively.
You author plain object-oriented ES6 classes holding reactive fields, import instances into arbitrary views, and UI templates reconcile automatically when class properties mutate!

### Module Singletons vs Context Boundaries
- **`.svelte.js` Singletons**: Tailored for universally ambient application states (Master Audio Clock, Authentication claims).
- **Context API (`setContext` / `getContext`)**: Reserved for scoped sub-tree isolation (e.g. isolating track parameters within one Synthesizer rack without colliding with adjacent synth racks).""",
        'beginnerId': """### Analogi: Konduktor Orkestra Musik & Metronom Pusat
1. **Modul `.svelte.js`** seperti metronom pusat di panggung orkestra: sebuah alat berdetak (*BPM $state*) yang diletakkan di tengah panggung. Semua pemain biola, drum, dan terompet (*komponen-komponen*) menatap metronom yang sama agar tempo musik mereka serempak sempurna.
2. **Context API** seperti partitur nada khusus divisi gesek: hanya dibagikan ke pemain biola di sudut kiri tanpa membingungkan pemain drum di sudut kanan.""",
        'beginnerEn': """### Analogy: Orchestra Conductors & Master Metronomes
1. **`.svelte.js` Singletons** are the master stage metronome: an illuminated digital clock ticking tempo (*BPM $state*) positioned at center stage. Violins, brass, and percussionists (*independent components*) track the identical pulse in locked synchronization.
2. **Context API** is sheet music distributed exclusively to the string section: scoped privately to first violins without confusing percussionists across the stage.""",
        'experimentsId': [
            'Impor audioMaster ke dalam dua file .svelte berbeda dan perhatikan bahwa mengubah BPM di satu komponen langsung mengubah tampilan di komponen lain.',
            'Panggil audioMaster.setBpm(140) dan amati nilai tempoIntervalMs menghitung ulang durasi milidetik otomatis.',
            'Gunakan audioMaster.incrementStep() di dalam interval timer untuk melihat activeStep berputar dari 0 sampai 15.',
            'Uji batas validasi BPM agar nilai tidak bisa disetel di bawah 60 atau di atas 240.',
        ],
        'experimentsEn': [
            'Import audioMaster into two separate .svelte components verifying bidirectional tempo synchronization.',
            'Invoke audioMaster.setBpm(140) observing tempoIntervalMs recalculate millisecond durations reactively.',
            'Execute audioMaster.incrementStep() within an interval timer watching activeStep cycle 0 to 15.',
            'Verify BPM boundary validation guards rejecting values below 60 or above 240.',
        ],
        'challengeId': 'Tambahkan array `$state` instrumen `daftarTrack` ke dalam kelas `GlobalAudioEngine` lengkap dengan method `tambahTrack(nama)` dan `hapusTrack(id)` yang reaktif universal.',
        'challengeEn': 'Add a reactive `$state` array `trackList` into `GlobalAudioEngine` alongside `addTrack(name)` and `removeTrack(id)` methods operating with universal reactivity.',
        'summaryId': 'Kamu telah menguasai reaktivitas universal .svelte.js dan Svelte Context. Minggu depan kita menghubungkan Web Audio API untuk menghasilkan suara fisik nyata.',
        'summaryEn': 'You have mastered universal .svelte.js reactivity and Svelte Context. Next week, we integrate the native Web Audio API for physical sound generation.',
    },
    {
        'week': 7,
        'level': 'advanced',
        'topicId': 'web-audio-api-dan-performance',
        'titleId': 'Web Audio API: AudioContext, OscillatorNode, GainNode & Timing Scheduling',
        'titleEn': 'Web Audio API: AudioContext, OscillatorNode, GainNode & Sample-Accurate Timing',
        'programId': 'Mesin Sintesis Suara Nyata (Web Audio Synthesizer Engine)',
        'programEn': 'Physical Sound Synthesis Engine with Web Audio API & Gain Automation',
        'levelNameId': 'Web Audio, Actions & Capstone Synthesizer',
        'levelNameEn': 'Web Audio, Actions & Capstone Synthesizer',
        'language': 'js',
        'code': """// ============================================================================
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
""",
        'objectivesId': [
            'Memahami arsitektur node graf Web Audio API: Sumber (Oscillator) -> Pengubah (Gain) -> Tujuan (Destination)',
            'Mengatasi kebijakan Autoplay browser dengan menginisialisasi AudioContext saat interaksi klik pertama',
            'Merancang kurva suara dinamis menggunakan exponentialRampToValueAtTime untuk dentuman drum nyata',
            'Mencegah bunyi pop dan klik digital yang merusak telinga dengan gain decay envelope yang halus',
            'Mencapai presisi penataan waktu (Sample-Accurate Scheduling) menggunakan audioCtx.currentTime',
        ],
        'objectivesEn': [
            'Master Web Audio API audio-graph node topologies: Sources (Oscillators) -> Modifiers (Gain) -> Destination',
            'Handle browser Autoplay policies cleanly by resuming AudioContext upon initial user interaction',
            'Design dynamic pitch envelopes deploying exponentialRampToValueAtTime for punchy drum synthesis',
            'Eliminate digital audio pops and clicks with precise exponential gain decay envelopes',
            'Achieve sample-accurate audio scheduling utilizing hardware-locked audioCtx.currentTime clocks',
        ],
        'explanationId': """### Graf Web Audio API: Standar Musik Digital
Browser modern memiliki mesin sintesis audio profesional bawaan: **Web Audio API**.
Konsep dasarnya adalah **Audio Routing Graph**:
1. **Audio Node Sumber**: `createOscillator()` menghasilkan gelombang frekuensi suara murni.
2. **Audio Node Modifikasi**: `createGain()` mengatur volume suara (amplifikasi).
3. **Audio Destination**: `audioCtx.destination` adalah speaker atau headphone fisik pengguna.
Anda menyambungkannya seperti kabel audio studio: `osc.connect(gain).connect(destination)`.

### Presisi Waktu Mutlak (`currentTime`)
JavaScript standar seperti `setTimeout` atau `setInterval` tidak presisi: mereka rentan melambat beberapa milidetik saat komputer sibuk, yang akan merusak tempo musik (*jitter*).
Web Audio API memiliki jam perangkat keras internal sendiri: **`audioCtx.currentTime`**. Jam ini berjalan di thread audio terpisah dengan presisi tingkat mikrodetik!""",
        'explanationEn': """### The Web Audio API Modular Graph
Modern browsers ship with an industrial digital signal processing engine: the **Web Audio API**.
Core paradigm: the **Audio Routing Node Graph**:
1. **Source Nodes**: `createOscillator()` emits periodic mathematical waveforms.
2. **Processing Nodes**: `createGain()` modulates amplitude (volume).
3. **Audio Destination**: `audioCtx.destination` routes directly to physical DACs and speakers.
Nodes chain like physical 1/4-inch patch cables: `osc.connect(gain).connect(destination)`.

### Sample-Accurate Timing vs Sloppy JS Timers
Vanilla JavaScript timers (`setTimeout`, `setInterval`) suffer jitter under heavy main-thread work.
The Web Audio API maintains an independent hardware-locked timeline: **`audioCtx.currentTime`**, executing on a high-priority audio thread with microsecond fidelity!""",
        'beginnerId': """### Analogi: Kabel Jack Gitar & Pedal Efek Panggung
Web Audio API persis seperti setup panggung gitaris rock:
1. **Oscillator** adalah senar gitar listrik yang dipetik (*sumber getaran*).
2. **GainNode** adalah pedal distorsi dan volume di lantai panggung (*pengatur intensitas*).
3. **Destination** adalah sound system amplifier panggung (*speaker suara keluar*).
Kabel jack menghubungkan senar gitar -> pedal volume -> speaker amplifier.""",
        'beginnerEn': """### Analogy: Electric Guitars & Stage Stompboxes
The Web Audio API matches a professional guitarist's stage rig:
1. **Oscillator** is the vibrating magnetic guitar string (*waveform source*).
2. **GainNode** is the volume/overdrive stompbox pedal on the pedalboard (*amplitude envelope*).
3. **Destination** is the 100-watt stage amplifier (*physical speaker cones*).
Quarter-inch cables patch guitar string -> pedal effect -> amplifier cabinet.""",
        'experimentsId': [
            'Panggil fungsi mainkanKickDrum() dari tombol di template dan dengarkan dentuman bass drum nyata dari speaker Anda.',
            'Ubah frekuensi awal kick drum dari 150 Hz ke 300 Hz untuk mendengarkan dentuman bergaya synth pop 80-an.',
            'Panggil mainkanSnareDrum() dan rasakan pukulan tajam snare perkusi.',
            'Pelajari cara membuat synthesizer synthesizer melodi dengan tangga nada minor pentatonik.',
        ],
        'experimentsEn': [
            'Invoke mainkanKickDrum() from a button click to hear real bass drum synthesis pump through speakers.',
            'Shift initial kick pitch from 150 Hz to 300 Hz creating 80s synth-pop kick tones.',
            'Invoke mainkanSnareDrum() experiencing crisp snare percussion strikes.',
            'Explore authoring a melodic lead synthesizer tuned across minor pentatonic scales.',
        ],
        'challengeId': 'Buat fungsi `mainkanHiHat(isBuka)`: jika isBuka bernilai true, perpanjang waktu decay gain menjadi 0.4 detik (Open Hi-Hat), jika false potong tajam pada 0.05 detik (Closed Hi-Hat).',
        'challengeEn': 'Author a `mainkanHiHat(isOpen)` synthesizer: if isOpen is true, decay gain across 0.4s (Open Hi-Hat); if false, clip abruptly at 0.05s (Closed Hi-Hat).',
        'summaryId': 'Kamu telah menguasai Web Audio API, perancangan envelope suara drum, dan scheduling currentTime. Minggu depan adalah Capstone Final: 16-Step Audio Beat Sequencer.',
        'summaryEn': 'You have mastered the Web Audio API, drum envelope synthesis, and currentTime scheduling. Next week is our Capstone Project: 16-Step Audio Beat Sequencer.',
    },
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'capstone-audio-beat-sequencer',
        'titleId': 'Capstone: 16-Step Audio Beat Sequencer & Synthesizer dengan Svelte 5 Runes',
        'titleEn': 'Capstone: Production 16-Step Audio Beat Sequencer & Synthesizer with Svelte 5',
        'programId': 'Aplikasi Beat Sequencer Lengkap dengan Kontrol BPM, Preset & Web Audio Nyata',
        'programEn': 'Full Beat Sequencer DAW with BPM Clock, Real-Time Audio Synthesis & Presets',
        'levelNameId': 'Web Audio, Actions & Capstone Synthesizer',
        'levelNameEn': 'Web Audio, Actions & Capstone Synthesizer',
        'language': 'svelte',
        'code': """<!-- ===================================================================== -->
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
""",
        'objectivesId': [
            'Mengintegrasikan seluruh kurikulum Svelte 5 (Runes, $state, $derived, Snippets, Web Audio) ke dalam produk beat sequencer produksi',
            'Membangun jam sequencer audio reaktif dengan kontrol tempo BPM yang halus',
            'Memicu sintesis audio drum nyata (Kick, Snare, HiHat) berlatensi ultra-rendah',
            'Mengoptimalkan pembaruan DOM berbasis 16 langkah berkecepatan tinggi tanpa lag atau frame drops',
            'Menghasilkan aplikasi audio berbasis web berkualitas studio yang siap dideploy ke Cloudflare Pages',
        ],
        'objectivesEn': [
            'Synthesize the comprehensive Svelte 5 curriculum into a production-grade 16-step beat sequencer DAW',
            'Construct an adaptive audio sequencer clock delivering fluid BPM tempo modulation',
            'Drive native real-time drum synthesis (Kick, Snare, Hi-Hat) with ultra-low latency DAC output',
            'Optimize high-frequency 16-step visual cursor DOM updates with zero frame drops',
            'Deliver a studio-grade creative web application ready for Cloudflare Pages deployment',
        ],
        'explanationId': """### Arsitektur Capstone Beat Sequencer Svelte 5
Aplikasi capstone ini mendemonstrasikan keunggulan absolut Svelte 5:
1. **Reaktivitas Tanpa Beban Virtual DOM**: Sequencer audio memperbarui langkah kursor kuning setiap 120 milidetik (*high-frequency updates*). Pada framework berbasis Virtual DOM, hal ini dapat menyebabkan lag CPU. Pada Svelte 5, kompilator **langsung mengubah kelas CSS pada tombol step tertentu tanpa me-render ulang seluruh halaman**.
2. **Kalkulasi BPM Berbasis `$derived`**: Setiap kali slider BPM digeser, interval milidetik `stepIntervalMs` langsung terhitung secara otomatis dan akurat.
3. **Sintesis Audio Digital Nyata**: Menggunakan Web Audio API native tanpa memerlukan file audio MP3/WAV eksternal berukuran besar. Seluruh suara drum dihasilkan dari rumus matematika frekuensi secara instan!

### Siap Membangun Aplikasi Interaktif Generasi Baru
Dengan menyelesaikan kurikulum Svelte 5 ini, Anda telah menguasai teknologi frontend paling efisien, modern, dan menyenangkan di dunia web modern!""",
        'explanationEn': """### Capstone Beat Sequencer Architecture
This capstone underscores the definitive architectural advantages of Svelte 5:
1. **Zero-Virtual DOM High-Frequency Updates**: The sequencer clock ticks active step highlights every 120ms. In Virtual DOM frameworks, high-frequency diffing consumes CPU cycles. In Svelte 5, the compiler **surgically mutates target node classes without re-evaluating the parent tree**.
2. **Reactive BPM Clocks via `$derived`**: Adjusting the tempo slider recalculates `stepIntervalMs` intervals dynamically without synchronization boilerplate.
3. **Pure Mathematical Synthesis**: Synthesizes drum acoustics directly via Web Audio API oscillators, eliminating external MP3/WAV sample payload downloads.

### Ready for Next-Generation Interactive Web Applications
Congratulations! You have mastered the most efficient, elegant, and blazing-fast reactive web compilation technology in modern software engineering!""",
        'beginnerId': """### Analogi: Kotak Musik Silinder Berputar Kuno
Aplikasi Beat Sequencer ini persis seperti kotak musik antik berputar:
1. **Matriks 16-Step** adalah silinder logam dengan tonjolan gigi kecil: setiap kali tonjolan gigi menyentuh sisir logam (*step bernilai true*), nada dentingan berbunyi (*Web Audio playSound*).
2. **Slider BPM** adalah tuas pemutar pegas: memutar tuas lebih cepat membuat silinder berputar lebih kencang sehingga musik bermain dengan tempo riang cepat.""",
        'beginnerEn': """### Analogy: Antique Mechanical Cylinder Music Boxes
This Beat Sequencer functions like an antique mechanical music box:
1. **16-Step Matrix** is the rotating brass cylinder studded with steel pins: whenever a pin strikes a tuned comb tine (*step equals true*), an acoustic chime rings out (*Web Audio playSound*).
2. **BPM Slider** is the clockwork winding spring: tightening the governor speeds up cylinder rotation, accelerating the musical tempo seamlessly.""",
        'experimentsId': [
            'Klik tombol "▶ PLAY" dan dengarkan ritme drum elektronik 124 BPM bermain berulang secara otomatis.',
            'Klik kotak-kotak step untuk menambah atau mematikan dentuman drum dan dengarkan variasi ritme baru.',
            'Geser slider BPM ke 140 dan rasakan tempo musik bertambah cepat secara instan.',
            'Buka tab Performance di Chrome DevTools saat beat bermain dan amati CPU usage yang hampir 0% berkat kompilasi Svelte!',
        ],
        'experimentsEn': [
            'Click "▶ PLAY" to experience the automated 124 BPM electronic drum rhythm loop through speakers.',
            'Click matrix step nodes toggling beats on and off to craft fresh rhythmic variations.',
            'Slide BPM to 140 accelerating playback tempo reactively.',
            'Record a Chrome DevTools Performance profile observing near-zero CPU consumption during playback thanks to Svelte compilation!',
        ],
        'challengeId': 'Tambahkan preset ritme bawaan (tombol "House 4-on-the-Floor", "Trap Hip-Hop", dan "Drum & Bass") yang mengisi pola matriks langkah secara instan saat diklik.',
        'challengeEn': 'Add genre preset buttons ("House 4-on-the-Floor", "Trap Hip-Hop", "Drum & Bass") populating matrix steps with distinctive rhythm patterns on click.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Svelte 5 dari dasar Runes hingga membangun Web Audio Beat Sequencer interaktif yang menakjubkan.',
        'summaryEn': 'Congratulations! You have completed the comprehensive Svelte 5 curriculum, culminating in a jaw-dropping, high-performance Web Audio Beat Sequencer DAW.',
    },
]

def get_track():
    return {
        'slug': 'svelte',
        'track_name': 'Svelte',
        'levels': LEVELS,
        'modules': MODULES,
    }
