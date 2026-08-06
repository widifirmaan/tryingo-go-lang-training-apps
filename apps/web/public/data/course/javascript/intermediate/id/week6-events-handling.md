# Events & Event Handling

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 6:** Events & Event Handling

## Tujuan Pembelajaran

- Event phases: capture, target, bubble
- Event delegation: handle event di parent
- Custom events dengan EventEmitter pattern
- stopPropagation dan preventDefault
- once listener dan unsubscribe pattern

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

## Konsep Kunci

### Event Phases
1. Capture: window → target. 2. Target: elemen target. 3. Bubble: target → window.

### Event Delegation
Satu listener di parent untuk banyak child. Cek `e.target.matches(selector)`.

### Custom Events
`EventEmitter` pattern: `on`, `off`, `emit`, `once`.

### Propagation
`stopPropagation()` hentikan bubbling. `preventDefault()` cegah default behavior.

### Unsubscribe
Return fungsi unsubscribe dari `on()` untuk cleanup.

---

## Eksperimen

- Buat event bus untuk komunikasi antar module
- Coba capture phase dengan addEventListener third arg
- Eksperimen event delegation pada table
- Buat custom event dengan detail data
- Implementasikan throttle pada scroll event

---

## Tantangan

Buat keyboard shortcut system: register shortcut, trigger action, dengan EventEmitter pattern.

---

## Ringkasan

Minggu 6 dari 14: **Events & Event Handling** (Level: Menengah). Interaksi pengguna. Minggu depan: **Async JavaScript**.
