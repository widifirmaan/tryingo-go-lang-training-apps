# Svelte Actions (use:action): Manipulasi DOM Tingkat Rendah & Rotary Knob Dial

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Capstone Synthesizer | **Minggu 5:** Svelte Actions (use:action): Manipulasi DOM Tingkat Rendah & Rotary Knob Dial

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

## Ringkasan

Kamu telah menguasai Svelte Actions use:action dan manipulasi DOM gestur. Minggu depan kita mempelajari Svelte Context dan modul reaktivitas universal .svelte.js.
