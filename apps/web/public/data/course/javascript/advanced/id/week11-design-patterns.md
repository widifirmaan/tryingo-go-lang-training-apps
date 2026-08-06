# Design Patterns

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 11:** Design Patterns

## Tujuan Pembelajaran

- Singleton: satu instance global
- Factory: buat object tanpa expose logic
- Observer: subscribe/notify pattern
- Strategy: interchangeable algorithms
- Module pattern dengan IIFE dan closure

---

## Program: Pattern Implementation

```javascript
// Singleton Pattern
class Database {
    static #instance = null;

    constructor() {
        if (Database.#instance) return Database.#instance;
        this.connection = "connected";
        Database.#instance = this;
    }

    query(sql) {
        return "Result of: " + sql;
    }
}

// Factory Pattern
class UserFactory {
    static create(type, data) {
        switch (type) {
            case "admin": return { ...data, role: "admin", permissions: ["all"] };
            case "editor": return { ...data, role: "editor", permissions: ["read", "write"] };
            case "viewer": return { ...data, role: "viewer", permissions: ["read"] };
            default: throw new Error("Unknown type: " + type);
        }
    }
}

// Observer Pattern
class Store {
    #state = {};
    #listeners = new Set();

    getState() { return { ...this.#state }; }

    setState(newState) {
        this.#state = { ...this.#state, ...newState };
        this.#listeners.forEach(fn => fn(this.#state));
    }

    subscribe(fn) {
        this.#listeners.add(fn);
        return () => this.#listeners.delete(fn);
    }
}

// Strategy Pattern
const strategies = {
    bubble: (arr) => { /* bubble sort */ return arr.slice().sort((a, b) => a - b); },
    quick: (arr) => { /* quick sort */ return arr.slice().sort((a, b) => a - b); },
    merge: (arr) => { /* merge sort */ return arr.slice().sort((a, b) => a - b); }
};

class Sorter {
    constructor(strategy = "bubble") {
        this.strategy = strategies[strategy];
    }
    sort(arr) { return this.strategy(arr); }
}

// Demo
console.log("=== Singleton ===");
const db1 = new Database();
const db2 = new Database();
console.log("Same instance:", db1 === db2);
console.log(db1.query("SELECT * FROM users"));

console.log("\n=== Factory ===");
const admin = UserFactory.create("admin", { nama: "Budi" });
const viewer = UserFactory.create("viewer", { nama: "Siti" });
console.log(admin);
console.log(viewer);

console.log("\n=== Observer ===");
const store = new Store();
store.subscribe(state => console.log("Listener 1:", state));
store.subscribe(state => console.log("Listener 2:", state.count || "no count"));
store.setState({ user: "Budi" });
store.setState({ count: 5 });

console.log("\n=== Strategy ===");
const sorter = new Sorter("quick");
console.log("Sorted:", sorter.sort([3, 1, 4, 1, 5, 9, 2, 6]));
```

---

## Konsep Kunci

### Singleton
Satu instance untuk seluruh app. Database connection, config manager.

### Factory
Buat object berdasarkan type. Tidak perlu tahu class spesifik.

### Observer
Subscribe ke perubahan state. Notifikasi otomatis saat state berubah.

### Strategy
Bisa ganti algorithm runtime. Sort strategy, payment strategy.

### Module Pattern
IIFE + closure untuk encapsulation. Private variables, public API.

---

## Eksperimen

- Buat singleton logger dengan levels
- Coba abstract factory untuk UI components
- Eksperimen mediator pattern
- Buat decorator pattern dengan higher-order function
- Implementasikan command pattern

---

## Tantangan

Buat state management library: singleton store, observer pattern, actions/reducers, middleware support.

---

## Ringkasan

Minggu 11 dari 14: **Design Patterns** (Level: Lanjutan). Solusi teruji. Minggu depan: **Testing**.
