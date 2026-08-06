# DOM Manipulation

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 5:** DOM Manipulation

## Learning Objectives

- Understand DOM tree and node types
- querySelector and querySelectorAll to select elements
- createElement and appendChild to create new elements
- textContent, innerHTML, classList for manipulation
- Event listeners: addEventListener for interaction

---

## Program: Simple To-Do List

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

## Key Concepts

### DOM Tree
Document Object Model — tree representation of HTML. Each node is an object.

### Select Elements
`querySelector(".class")` — CSS selector. `getElementById("id")` — by ID.

### Create & Append
`document.createElement("div")` — create. `parent.appendChild(child)` — add.

### Manipulation
`textContent` safe text, `innerHTML` parses HTML, `classList.add/remove/toggle`.

### Events
`element.addEventListener("click", handler)` — responsive to user actions.

---

## Experiments

- Create div element with JavaScript and add to body
- Try classList.toggle for show/hide
- Experiment event delegation on list
- Create form input that adds items to list
- Try dataset attributes to store data

---

## Challenge

Build a to-do list app: add, toggle complete, delete, filter — with DOM manipulation and event listeners.

---

## Summary

Week 5 of 14: **DOM Manipulation** (Level: Beginner). Beginner phase complete! Next week: **Events & Event Handling** (Intermediate).
