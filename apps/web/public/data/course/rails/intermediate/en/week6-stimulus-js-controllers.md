# Client-Side Interactivity: Stimulus JS, Targets, Values & Drag-and-Drop

> **Kategori:** Ruby on Rails 8 | **Level:** Intermediate | **Minggu 6:** Client-Side Interactivity: Stimulus JS, Targets, Values & Drag-and-Drop

## Learning Objectives

- Understand Stimulus JS philosophy: "The modest JavaScript framework" designed to augment server HTML.
- Master the 3 core Stimulus primitives: Controllers (`data-controller`), Targets (`data-...-target`), and Actions (`data-action`).
- Deploy the Stimulus Values API for type-safe data attribute synchronization.
- Construct advanced drag-and-drop Kanban interactivity integrating asynchronous Fetch mutations.

---

## Program: Interactive Drag-and-Drop Kanban Task Sorter with Stimulus JS Controller

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

## Key Concepts

Hotwire services 80% of application interactivity via server-rendered HTML streams (Turbo Drive, Frames, Streams). For the remaining 20%—drag-and-drop canvas manipulation, ephemeral animations, clipboard integration—applications deploy **Stimulus JS**.

### The Stimulus Philosophy: Augmenting Server HTML
Rather than usurping the entire DOM tree like heavyweight client frameworks, Stimulus is engineered to **animate pre-existing server-rendered HTML**:
1. **Controllers**: JavaScript classes mapped declaratively via `data-controller="kanban-sort"`.
2. **Targets**: Exposes DOM pointers (`data-kanban-sort-target="column"`), eliminating brittle `document.querySelector` searches.
3. **Values API**: Ingests typed configuration attributes seamlessly from Rails models (`this.projectIdValue`).

### Lifecycle Hooks: connect() & disconnect()
When Turbo replaces a DOM sub-tree, Stimulus audits new nodes reactively, invoking `connect()` on attached controllers. This eradicates stale event listener bugs prevalent in unmanaged JavaScript setups.


---

---

## Beginner Friendly Explanation

Imagine a smart home. The foundation, walls, and timber framing are built durably by master carpenters (Rails & Turbo). Stimulus JS acts like installing automated motion-detector light switches on the walls: it does not re-architect the house; it simply toggles illumination when movement is detected.

## Experiments

- Add a `counterTarget` target and update column task tallies dynamically upon drop completion.
- Deploy a Stimulus Action `data-action="click->kanban-sort#copyShareLink"` implementing clipboard copying.
- Observe Stimulus controllers reconnecting automatically when Turbo Frames update task cards.

---

## Challenge

Integrate `SortableJS` within the Stimulus controller provisioning smooth fluid drag animations with mobile touch support.

---

## Summary

You have mastered Stimulus JS Controllers, Targets, Values, and drag-and-drop. Next week we cover background processing with Rails 8 Solid Queue.
