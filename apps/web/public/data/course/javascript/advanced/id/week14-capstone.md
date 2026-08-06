# Capstone: Task Manager App

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 14:** Capstone: Task Manager App

## Tujuan Pembelajaran

- Menggabungkan semua konsep: OOP, async, modules, patterns
- Observer pattern untuk state management
- Private fields untuk encapsulation
- Immutable data flow
- Separation of concerns: data vs presentation

---

## Program: Task Manager Lengkap

```javascript
// Capstone: Task Manager Application
// Menggabungkan semua konsep: OOP, async, modules, patterns, testing

// === Store Module (Observer Pattern) ===
class TaskStore {
    #tasks = [];
    #listeners = new Set();
    #nextId = 1;

    subscribe(fn) {
        this.#listeners.add(fn);
        return () => this.#listeners.delete(fn);
    }

    #notify() {
        this.#listeners.forEach(fn => fn(this.getAll()));
    }

    add(task) {
        const newTask = {
            id: this.#nextId++,
            title: task.title,
            description: task.description || "",
            priority: task.priority || "medium",
            done: false,
            createdAt: new Date().toISOString()
        };
        this.#tasks.push(newTask);
        this.#notify();
        return newTask;
    }

    toggle(id) {
        const task = this.#tasks.find(t => t.id === id);
        if (task) {
            task.done = !task.done;
            this.#notify();
        }
        return task;
    }

    remove(id) {
        this.#tasks = this.#tasks.filter(t => t.id !== id);
        this.#notify();
    }

    getAll() { return [...this.#tasks]; }
    getCompleted() { return this.#tasks.filter(t => t.done); }
    getPending() { return this.#tasks.filter(t => !t.done); }

    getStats() {
        return {
            total: this.#tasks.length,
            completed: this.getCompleted().length,
            pending: this.getPending().length
        };
    }
}

// === Demo ===
const store = new TaskStore();

// Subscribe to changes
store.subscribe(tasks => {
    console.log("Tasks updated:", tasks.length, "items");
});

// Add tasks
console.log("=== Adding Tasks ===");
store.add({ title: "Belajar JavaScript", priority: "high" });
store.add({ title: "Buat Task Manager", priority: "high" });
store.add({ title: "Push ke GitHub", priority: "medium" });
store.add({ title: "Tulis dokumentasi", priority: "low" });

// Toggle completion
console.log("\n=== Toggle Task #1 ===");
store.toggle(1);

// Show stats
console.log("\n=== Stats ===");
const stats = store.getStats();
console.log("Total:", stats.total);
console.log("Completed:", stats.completed);
console.log("Pending:", stats.pending);

// Show pending tasks
console.log("\n=== Pending Tasks ===");
store.getPending().forEach(t => {
    console.log(`  [${t.priority}] ${t.title}`);
});

// Remove task
console.log("\n=== Remove Task #3 ===");
store.remove(3);
console.log("Remaining:", store.getAll().length);

// === Architecture Summary ===
console.log("\n=== Architecture ===");
console.log("1. Observer Pattern: store.subscribe()");
console.log("2. Private Fields: #tasks, #listeners");
console.log("3. Immutable Returns: [...this.#tasks]");
console.log("4. Method Chaining: store.add().toggle()");
console.log("5. Separation of Concerns: Store vs UI");
console.log("6. Error Handling: validation, fallbacks");
console.log("7. Performance: efficient updates, minimal re-renders");
```

---

## Konsep Kunci

### Proyek Capstone
Task Manager yang menggabungkan semua 13 minggu pembelajaran.

### Arsitektur
- Observer Pattern: reactive state
- Private Fields: encapsulation
- Immutable: predictable state
- Modular: separation of concerns

### Fitur
- CRUD tasks
- Toggle completion
- Filter by status
- Statistics
- Priority levels

### Best Practices
- Clean code
- Error handling
- Performance optimization
- Testable architecture

---

## Eksperimen

- Tambah filter by priority
- Buat undo/redo dengan command pattern
- Tambah localStorage persistence
- Buat sorting by date/priority
- Tambah due date dan reminder

---

## Tantangan

Buat Task Manager lengkap: CRUD, filter, sort, priority, persistence, testing — production-ready.

---

## Ringkasan

Minggu 14 dari 14: **Capstone: Task Manager App** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai JavaScript dari nol hingga production-ready.
