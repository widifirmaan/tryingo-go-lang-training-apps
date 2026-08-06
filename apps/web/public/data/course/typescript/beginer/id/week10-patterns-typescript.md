# Design Patterns TS

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 10:** Design Patterns TS

## Tujuan Pembelajaran

- Singleton pattern dengan private constructor
- Factory pattern dengan function overloads
- Type-safe observer dengan mapped event types
- Generic constraints pada class
- Pattern composition dengan interfaces

---

## Program: Pattern with Types

```typescript
// Singleton with TypeScript
class AppConfig {
    private static instance: AppConfig | null = null;
    private config: Map<string, string> = new Map();

    private constructor() {}

    static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }

    set(key: string, value: string): void {
        this.config.set(key, value);
    }

    get(key: string): string | undefined {
        return this.config.get(key);
    }
}

// Factory Pattern
interface Product {
    name: string;
    price: number;
}

class Book implements Product {
    constructor(public name: string, public price: number, public author: string) {}
}

class Electronics implements Product {
    constructor(public name: string, public price: number, public warranty: number) {}
}

type ProductType = "book" | "electronics";

class ProductFactory {
    static create(type: "book", name: string, price: number, author: string): Book;
    static create(type: "electronics", name: string, price: number, warranty: number): Electronics;
    static create(type: ProductType, name: string, price: number, extra?: string | number): Product {
        switch (type) {
            case "book": return new Book(name, price, extra as string);
            case "electronics": return new Electronics(name, price, extra as number);
        }
    }
}

// Observer Pattern (Type-Safe)
type Listener<T> = (data: T) => void;

class EventEmitter<T extends Record<string, unknown>> {
    private listeners: { [K in keyof T]?: Listener<T[K]>[] } = {};

    on<K extends keyof T>(event: K, listener: Listener<T[K]>): () => void {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event]!.push(listener);
        return () => this.off(event, listener);
    }

    off<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
        this.listeners[event] = this.listeners[event]?.filter(l => l !== listener);
    }

    emit<K extends keyof T>(event: K, data: T[K]): void {
        this.listeners[event]?.forEach(l => l(data));
    }
}

// Demo
console.log("=== Singleton ===");
const config = AppConfig.getInstance();
config.set("apiUrl", "https://api.example.com");
console.log("API URL:", config.get("apiUrl"));

console.log("\n=== Factory ===");
const book = ProductFactory.create("book", "TypeScript Guide", 50000, "John Doe");
const laptop = ProductFactory.create("electronics", "Laptop", 15000000, 24);
console.log("Book:", book);
console.log("Electronics:", laptop);

console.log("\n=== Type-Safe Observer ===");
interface AppEvents {
    "user:login": { name: string; id: string };
    "user:logout": { id: string };
    "error": { message: string };
}

const emitter = new EventEmitter<AppEvents>();

emitter.on("user:login", (data) => {
    console.log("Login:", data.name, "(ID: " + data.id + ")");
});

emitter.on("error", (data) => {
    console.log("Error:", data.message);
});

emitter.emit("user:login", { name: "Budi", id: "u1" });
emitter.emit("error", { message: "Network timeout" });
```

---

## Konsep Kunci

### Singleton
Private constructor mencegah instantiation dari luar. Static getInstance().

### Factory
Function overloads memberikan type safety berdasarkan parameter type.

### Type-Safe Observer
`EventEmitter<T extends Record>` — event types didefinisi di generic. emit() hanya terima valid events.

### Pattern Composition
Interface + abstract class + concrete class = flexible patterns.

### Advanced
Conditional types, template literal types, mapped types untuk powerful patterns.

---

## Eksperimen

- Buat builder pattern dengan fluent API
- Coba strategy pattern dengan discriminated union
- Eksperimen decorator pattern dengan TC39 decorators
- Buat state machine dengan type-safe transitions
- Coba repository pattern dengan generics

---

## Tantangan

Buat state management: type-safe store, actions dengan discriminated union, middleware dengan generics.

---

## Ringkasan

Minggu 10 dari 12: **Design Patterns TS** (Level: TypeScript Lengkap). Pattern teruji. Minggu depan: **Capstone Project**!
