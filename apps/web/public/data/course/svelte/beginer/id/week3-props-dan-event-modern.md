# Svelte 5 Komponen Modern: $props, Nilai Default & Callback Functions

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Reaktivitas Kompilasi | **Minggu 3:** Svelte 5 Komponen Modern: $props, Nilai Default & Callback Functions
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami migrasi dari export let (Svelte 4) ke Rune $props() modern di Svelte 5
- Menetapkan nilai default props menggunakan destrukturisasi JavaScript standar
- Menggantikan createEventDispatcher yang rumit dengan fungsi callback props murni (onTrigger)
- Menggunakan direktif style:--css-var untuk injeksi CSS Variables langsung dari state komponen
- Membangun komponen tombol audio yang responsif dengan efek feedback visual instan

---

## Program: Tombol Pad Drum Perkusi (Percussion Drum Pad)

```svelte
<!-- ===================================================================== -->
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
```

---

## Konsep Kunci

### Mengapa Svelte 5 Menghapus `export let`?
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
Lebih sederhana, lebih cepat, dan 100% aman secara tipe data.

---

---

## Penjelasan untuk Pemula

### Analogi: Sakelar Bel Pintu & Kabel Lampu Sorot
1. **$props** seperti kotak sambungan kabel di belakang bel: ada colokan bertuliskan 'Warna Lampu' (*warnaAksen*) dan colokan 'Suara' (*suaraSampleUrl*). Anda bisa memasang kabel sesuai selera.
2. **Callback onTrigger** seperti kabel lonceng: begitu tombol pad ditekan, kabel menarik bel di dapur komandan (*onTrigger terpanggil*).

## Eksperimen

- Panggil komponen DrumPad dengan warna aksen berbeda (misal warnaAksen="#3b82f6") dan amati glow warnanya.
- Tekan tombol pad dan perhatikan animasi mengecil (scale 0.94) dan kilatan warna menyala.
- Daftarkan event window keydown untuk memicu triggerPad() saat tombol huruf Q ditekan pada keyboard.
- Beri nilai fallback pada $props dan uji saat parent tidak mengirimkan satupun prop.

---

## Tantangan

Buat grid 4x4 drum pad (16 tombol) yang masing-masing memiliki sampel perkusi unik (Kick, Snare, HiHat, Clap, Tom, Rimshot) dan rekam riwayat ketukan ke dalam array state.

---

## Model Mental & Diagram Alur Visual

![Diagram Universal Signals & Svelte 5 Runes State Flow](/diagrams/react-data-flow.svg)

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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

Kamu telah menguasai $props modern, nilai fallback, dan fungsi callback. Minggu depan kita mempelajari Snippets dan alur kontrol lanjutan.
