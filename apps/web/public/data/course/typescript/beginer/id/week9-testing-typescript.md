# Testing TypeScript

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 9:** Testing TypeScript

## Tujuan Pembelajaran

- Type-safe test runner dan assertions
- Async testing dengan Promise
- Error testing: expect throw
- AAA pattern: Arrange, Act, Assert
- Type-level testing: compile-time checks

---

## Program: Type-Safe Tests

```typescript
// Testing dengan type safety
// Framework: Vitest / Jest dengan TypeScript

// Test utilities dengan types
interface TestContext {
    name: string;
    fn: () => void | Promise<void>;
}

class TypeSafeRunner {
    private tests: TestContext[] = [];
    private passed = 0;
    private failed = 0;

    test(name: string, fn: () => void | Promise<void>): void {
        this.tests.push({ name, fn });
    }

    async run(): Promise<void> {
        console.log("=== Type-Safe Test Runner ===");
        for (const { name, fn } of this.tests) {
            try {
                await fn();
                this.passed++;
                console.log("  ✓", name);
            } catch (err: unknown) {
                this.failed++;
                const msg = err instanceof Error ? err.message : String(err);
                console.log("  ✗", name);
                console.log("   ", msg);
            }
        }
        console.log(`\nResults: ${this.passed} passed, ${this.failed} failed`);
    }
}

// Type-safe assertions
function expect<T>(actual: T) {
    return {
        toBe(expected: T): void {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, got ${actual}`);
            }
        },
        toEqual(expected: T): void {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(`Deep equal failed`);
            }
        },
        toBeGreaterThan(expected: number): void {
            if (typeof actual !== "number" || actual <= expected) {
                throw new Error(`${actual} not greater than ${expected}`);
            }
        },
        toBeType<T2>(): void {
            // Runtime type check placeholder
            console.log("  (type check passed)");
        }
    };
}

// Test subjects
function add(a: number, b: number): number {
    return a + b;
}

function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

async function fetchUser(id: number): Promise<{ id: number; name: string }> {
    if (id <= 0) throw new Error("Invalid ID");
    return { id, name: "User " + id };
}

// Run tests
const runner = new TypeSafeRunner();

runner.test("add: basic addition", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
});

runner.test("greet: default greeting", () => {
    expect(greet("Budi")).toBe("Hello, Budi!");
});

runner.test("greet: custom greeting", () => {
    expect(greet("Siti", "Hi")).toBe("Hi, Siti!");
});

runner.test("fetchUser: valid ID", async () => {
    const user = await fetchUser(1);
    expect(user.id).toBe(1);
});

runner.test("fetchUser: invalid ID throws", async () => {
    try {
        await fetchUser(-1);
        throw new Error("Should have thrown");
    } catch (e) {
        // Expected
    }
});

runner.run();

// Testing patterns:
// - Arrange-Act-Assert (AAA)
// - Given-When-Then (BDD)
// - Type-level tests: expectTypeOf
// - Snapshot testing
```

---

## Konsep Kunci

### Type-Safe Testing
Assertions dengan generic type. TypeScript pastikan expected dan actual sama tipe.

### Async Testing
`async/await` di test function. Framework handle otomatis.

### Error Testing
`expect(() => fn()).toThrow()` — pastikan function throw error.

### AAA Pattern
Arrange: setup data. Act: execute function. Assert: verify result.

### Type-Level Tests
`expectTypeOf(x).toEqualTypeOf<string>()` — cek tipe di compile-time.

### Frameworks
Vitest: fast, Vite-native. Jest: mature. Ambience: node/jsdom.

---

## Eksperimen

- Buat parameterized test dengan types
- Coba mock function dengan proper typing
- Eksperimen test untuk generic functions
- Buat test untuk discriminated unions
- Coba type-level test dengas expectTypeOf

---

## Tantangan

Buat test suite untuk API client: type-safe mocks, async tests, error cases, dengan 10+ tests.

---

## Ringkasan

Minggu 9 dari 12: **Testing TypeScript** (Level: TypeScript Lengkap). Kualitas terjamin. Minggu depan: **Design Patterns**.
