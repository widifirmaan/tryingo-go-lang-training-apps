# Interaktivitas Sisi Klien: Stimulus JS, Targets, Values & Drag-and-Drop

> **Kategori:** Ruby on Rails 8 | **Level:** Menengah | **Minggu 6:** Interaktivitas Sisi Klien: Stimulus JS, Targets, Values & Drag-and-Drop
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi Stimulus JS: "The modest JavaScript framework" untuk melengkapi Hotwire HTML.
- Menguasai 3 konsep inti Stimulus: Controllers (`data-controller`), Targets (`data-...-target`), dan Actions (`data-action`).
- Menggunakan Stimulus Values API untuk transmisi data konfigurasi dari server ke JavaScript secara type-safe.
- Membangun interaktivitas drag-and-drop canggih pada papan Kanban dengan integrasi Fetch API.

---

## Program: Pengurut Kartu Kanban Drag-and-Drop Interaktif dengan Stimulus JS Controller

```javascript
// app/javascript/controllers/kanban_sort_controller.js
// Stimulus JS: JavaScript Modest untuk Hotwire Stack
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  // Targets: Elemen DOM yang dipantau oleh controller
  static targets = ['column', 'taskCard'];
  
  // Values: Konfigurasi data terikat tipe otomatis dari atribut HTML
  static values = {
    updateUrl: String,
    projectId: Number
  };

  connect() {
    console.log('[STIMULUS CONNECTED] KanbanSortController aktif pada Project #' + this.projectIdValue);
    this.initializeDragEvents();
  }

  initializeDragEvents() {
    this.taskCardTargets.forEach(card => {
      card.setAttribute('draggable', 'true');
      card.addEventListener('dragstart', this.handleDragStart.bind(this));
      card.addEventListener('dragend', this.handleDragEnd.bind(this));
    });

    this.columnTargets.forEach(col => {
      col.addEventListener('dragover', (e) => e.preventDefault());
      col.addEventListener('drop', this.handleDrop.bind(this));
    });
  }

  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
    event.target.classList.add('opacity-50', 'border-dashed');
  }

  handleDragEnd(event) {
    event.target.classList.remove('opacity-50', 'border-dashed');
  }

  async handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const newStatus = event.currentTarget.dataset.columnStatus;

    console.log(`[DRAG & DROP] Tugas #${taskId} dipindahkan ke kolom status: ${newStatus}`);

    // Kirim pembaruan status ke backend Rails melalui Fetch API dengan token CSRF
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    await fetch(`/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'Accept': 'text/vnd.turbo-stream.html'
      },
      body: JSON.stringify({ task: { status: newStatus } })
    });
  }
}
```

---

## Konsep Kunci

Hotwire menangani 80% kebutuhan interaktivitas web melalui rendering HTML dari server (Turbo Drive, Turbo Frames, Turbo Streams). Namun untuk 20% sisanya—seperti interaksi drag-and-drop, animasi transisi, atau copy-to-clipboard—kita tetap membutuhkan sedikit JavaScript. Di sinilah peran **Stimulus JS**.

### Filosofi Stimulus: Modest JavaScript
Tidak seperti framework frontend raksasa yang mencoba menguasai seluruh halaman web, Stimulus tidak me-render HTML. Stimulus dirancang untuk **menghidupkan HTML yang sudah ada**:
1. **Controller**: Kelas JavaScript yang terikat pada elemen HTML via atribut `data-controller="kanban-sort"`.
2. **Targets**: Mereferensikan elemen DOM spesifik (`data-kanban-sort-target="column"`), mengeliminasi kebutuhan `document.getElementById` yang berantakan.
3. **Values API**: Menerima data dari Rails ke JavaScript secara otomatis (misal `this.projectIdValue`).

### Siklus Hidup connect() & disconnect()
Ketika Turbo Frame me-render ulang elemen HTML, Stimulus secara otomatis mendeteksi elemen baru tersebut dan memicu method `connect()`. Tidak ada lagi bug klasik event listener yang hilang saat halaman diperbarui!


---

---

## Penjelasan untuk Pemula

Bayangkan rumah pintar. Dinding, pintu, dan jendela rumah dibangun kokoh oleh tukang kayu (Rails & Turbo). Stimulus JS seperti memasang saklar lampu pintar otomatis di dinding: saklar tersebut tidak mengubah bentuk rumah, hanya bertugas menyalakan lampu ketika ada orang lewat di depannya.

## Eksperimen

- Tambahkan target baru `counterTarget` dan perbarui angka jumlah tugas secara dinamis saat drag-and-drop selesai.
- Gunakan Stimulus Action `data-action="click->kanban-sort#copyShareLink"` untuk fitur copy-to-clipboard.
- Amati bagaimana Stimulus Controller otomatis di-reconnect ketika Turbo Frame me-replace isi kartu.

---

## Tantangan

Integrasikan pustaka JavaScript `SortableJS` di dalam Stimulus controller untuk memberikan animasi perpindahan kartu kanban yang sangat halus dan mendukung layar sentuh smartphone.

---

## Model Mental & Diagram Alur Visual

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

### 1. N+1 Queries pada Active Record
- **Gejala / Masalah:** Me-render tampilan tabel memicu puluhan query SQL tambahan yang memperlambat respon.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method `includes(:relation)` pada controller query untuk melakukan eager loading.

### 2. Migrasi Database yang Mengubah Kolom Tanpa Reversibility
- **Gejala / Masalah:** Perintah `rails db:rollback` gagal dieksekusi saat proses deployment dibatalkan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method migrasi eksplisit `up` dan `down` jika operasi kolom tidak dapat dibalik secara otomatis.

### 3. Menyimpan Credential Sensitif di Direktori Publik
- **Gejala / Masalah:** API key pihak ketiga bocor ke publik melalui repositori git.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Manfaatkan sistem enkripsi `rails credentials:edit` untuk menyimpan API key produksi.

---

## Ringkasan

Kamu telah menguasai Stimulus JS Controllers, Targets, Values, dan drag-and-drop. Minggu depan kita mempelajari background processing dengan Rails 8 Solid Queue.
