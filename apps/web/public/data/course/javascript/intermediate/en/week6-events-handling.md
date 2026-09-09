# Events & Event Handling

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 6:** Events & Event Handling
> **Prerequisites:** Week 5 — **DOM Manipulation**.

## Learning Objectives

- Event phases: capture, target, bubble
- Event delegation: handle events on parent
- Custom events with EventEmitter pattern
- stopPropagation and preventDefault
- Once listeners and unsubscribe patterns

---

## Why This Matters (Non-IT)

A shop list with 100 products — attaching 100 `addEventListener` (one per row) is heavy and leaks when rows are removed. **Delegation** = 1 guard at the lobby (`ul`) checking `e.target` for who clicked. `preventDefault` stops form reload.

---

## Program: Event System

```javascript
// Simulasi Event System
class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event]
            .filter(cb => cb !== callback);
    }

    emit(event, ...args) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(cb => cb(...args));
    }

    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
}

// Demo Event System
const emitter = new EventEmitter();

// Subscribe
const unsub = emitter.on("user:login", (user) => {
    console.log("User login:", user);
});

emitter.on("user:login", (user) => {
    console.log("Log activity:", user);
});

emitter.once("app:start", () => {
    console.log("App started (once)");
});

// Emit events
console.log("=== Emit Events ===");
emitter.emit("app:start");
emitter.emit("app:start"); // tidak trigger once lagi
emitter.emit("user:login", "Budi");

// Unsubscribe
unsub();
console.log("\n=== After unsubscribe ===");
emitter.emit("user:login", "Siti"); // hanya 1 listener

// Event phases (browser):
// 1. Capture phase: dari target ke atas
// 2. Target phase: di elemen target
// 3. Bubble phase: dari target ke atas
// stopPropagation() — hentikan propagasi
// preventDefault() — cegah default behavior

// Event delegation pattern:
// parent.addEventListener("click", (e) => {
//     if (e.target.matches(".child-selector")) {
//         // handle child click
//     }
// });
```


---

## Beginner Friendly Explanation

### Analogy: Lobby Guard
- **100 listeners = 100 guards**, one per room — wasteful.
- **Delegation = 1 lobby guard**: click Delete in room 5 → guard checks `e.target` ID 5 → removes.

### Step 0 — Prepare Device
- Same as JS W1: browser + `index.html` with `<ul>` + form.

### How the Computer Reads It
1. Click Delete → bubbles to `ul` listener → `e.target.matches(".hapus")`? Yes → `closest("li").remove()`.

### 3 Must-Know Terms
1. **Delegation/preventDefault**: 1-guard/no-reload

---

## Mini Glossary

- **Delegation/preventDefault/stopPropagation**: one-guard/no-reload/no-leak

---
## Key Concepts

### Event Phases
1. Capture: window → target. 2. Target: target element. 3. Bubble: target → window.

### Event Delegation
One listener on parent for many children. Check `e.target.matches(selector)`.

### Custom Events
`EventEmitter` pattern: `on`, `off`, `emit`, `once`.

### Propagation
`stopPropagation()` stops bubbling. `preventDefault()` prevents default behavior.

### Unsubscribe
Return unsubscribe function from `on()` for cleanup.

---

## Experiments

- Create event bus for inter-module communication
- Try capture phase with addEventListener third arg
- Experiment event delegation on table
- Create custom event with detail data
- Implement throttle on scroll event

---

## Challenge

Build a keyboard shortcut system: register shortcut, trigger action, with EventEmitter pattern.
- **Link-up (Week 5 — DOM Manipulation):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Summary

Week 6 of 14: **Events & Event Handling** (Level: Intermediate). User interaction. Next week: **Async JavaScript**.
