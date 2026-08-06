# DOM Manipulation

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 5:** DOM Manipulation

## Tujuan Pembelajaran

- Memahami DOM tree dan node types
- querySelector dan querySelectorAll untuk pilih elemen
- createElement dan appendChild untuk buat elemen baru
- textContent, innerHTML, classList untuk manipulasi
- Event listener: addEventListener untuk interaksi

---

## Program: To-Do List Sederhana

```javascript
// Simulasi DOM (untuk playground non-browser)
// Di browser, gunakan document.querySelector dll.

// Simulasi elemen DOM
const fakeDOM = {
    elements: {},
    createElement(tag) {
        return { tag, children: [], textContent: "", classList: [] };
    },
    appendChild(parent, child) {
        parent.children.push(child);
        return child;
    }
};

// Simulasi To-Do List
class TodoList {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }

    add(text) {
        const todo = { id: this.nextId++, text, done: false };
        this.todos.push(todo);
        return todo;
    }

    toggle(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) todo.done = !todo.done;
        return todo;
    }

    remove(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    getAll() {
        return this.todos;
    }

    getCompleted() {
        return this.todos.filter(t => t.done);
    }

    getPending() {
        return this.todos.filter(t => !t.done);
    }
}

// Demo
const todo = new TodoList();
todo.add("Belajar JavaScript");
todo.add("Buat To-Do App");
todo.add("Push ke GitHub");

console.log("=== Semua Todo ===");
console.log(todo.getAll());

todo.toggle(1);
console.log("\n=== Setelah toggle #1 ===");
console.log("Completed:", todo.getCompleted());
console.log("Pending:", todo.getPending());

todo.remove(2);
console.log("\n=== Setelah hapus #2 ===");
console.log(todo.getAll());

// DOM API yang di browser:
// document.querySelector("#id") — pilih elemen
// document.createElement("div") — buat elemen baru
// element.textContent = "text" — ubah teks
// element.classList.add("active") — tambah class
// element.addEventListener("click", fn) — event handler
// element.innerHTML = "<span>html</span>" — ubah HTML
```

---

## Konsep Kunci

### DOM Tree
Document Object Model — representasi tree dari HTML. Setiap node adalah object.

### Select Elemen
`querySelector(".class")` — CSS selector. `getElementById("id")` — by ID.

### Create & Append
`document.createElement("div")` — buat. `parent.appendChild(child)` — tambah.

### Manipulasi
`textContent` teks aman, `innerHTML` parse HTML, `classList.add/remove/toggle`.

### Events
`element.addEventListener("click", handler)` — responsif terhadap user action.

---

## Eksperimen

- Buat elemen div dengan JavaScript dan tambah ke body
- Coba classList.toggle untuk show/hide
- Eksperimen event delegation pada list
- Buat form input yang menambah item ke list
- Coba dataset attributes untuk simpan data

---

## Tantangan

Buat to-do list app: tambah, toggle selesai, hapus, filter — dengan DOM manipulation dan event listeners.

---

## Ringkasan

Minggu 5 dari 14: **DOM Manipulation** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Events & Event Handling** (Intermediate).
