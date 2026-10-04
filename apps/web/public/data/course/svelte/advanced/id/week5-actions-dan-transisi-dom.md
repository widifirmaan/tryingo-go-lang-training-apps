# Svelte Actions (use:action): Manipulasi DOM Tingkat Rendah & Rotary Knob Dial

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 5:** Svelte Actions (use:action): Manipulasi DOM Tingkat Rendah & Rotary Knob Dial
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Svelte Actions (use:action) sebagai cara resmi memasang perilaku DOM kustom
- Menulis Action mandiri dengan antarmuka siklus hidup: inisialisasi, update, dan destroy
- Membangun pengendali interaksi gestur mouse (drag rotary dial) untuk aplikasi audio/kreatif
- Menghindari memory leak dengan membersihkan event listener global window pada callback destroy
- Menghubungkan parameter reaktif Svelte dengan Action menggunakan method update()

---

## Program: Knob Putar Parameter Synthesizer dengan Drag Mouse Gesture

```svelte
<script>
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
```

---

## Konsep Kunci

### Apa itu Svelte Action?
Svelte Action adalah **fungsi tingkat elemen yang dipasang menggunakan direktif `use:namaAction`**.
Action menerima referensi node DOM fisik (`node`) dan objek parameter.
Keunggulannya:
1. Tidak memerlukan library pembungkus komponen yang rumit.
2. Sangat mudah digunakan kembali: pasang `use:rotaryDrag` pada tombol apa saja.
3. Memiliki siklus hidup bersih: method `destroy()` otomatis dipanggil saat elemen dilepas dari DOM, memastikan pembersihan event listener 100% aman.

---

---

## Penjelasan untuk Pemula

### Analogi: Sakelar Kenop Putar Kompor Gas
**use:action** seperti memasang kenop putar fisik ke katup pipa gas: Anda tidak membuat kompor baru dari nol (*tidak perlu komponen baru*), melainkan cukup menempelkan aksesori kenop putar (*use:rotaryDrag*) ke katup yang sudah ada di dinding dapur.

## Eksperimen

- Klik dan tahan mouse pada kenop dial, geser ke atas dan amati jarum penunjuk berputar searah jarum jam.
- Geser ke bawah dan perhatikan nilai Hertz turun hingga batas minimum 100 Hz.
- Buka inspector browser dan amati perubahan CSS Variable --rotasi pada elemen dial.
- Tambahkan parameter sensitivitas pada objek action options.

---

## Tantangan

Buat Action `use:longPress(duration, callback)` yang memicu aksi reset nilai ke 1000 Hz jika pengguna menahan klik mouse selama lebih dari 1.5 detik.

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

Kamu telah menguasai Svelte Actions use:action dan manipulasi DOM gestur. Minggu depan kita mempelajari Svelte Context dan modul reaktivitas universal .svelte.js.
