# Interaktivitas Sisi Klien: Stimulus JS, Targets, Values & Drag-and-Drop

> **Kategori:** Ruby on Rails 8 | **Level:** Menengah | **Minggu 6:** Interaktivitas Sisi Klien: Stimulus JS, Targets, Values & Drag-and-Drop

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

## Ringkasan

Kamu telah menguasai Stimulus JS Controllers, Targets, Values, dan drag-and-drop. Minggu depan kita mempelajari background processing dengan Rails 8 Solid Queue.
