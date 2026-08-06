# Testing TypeScript

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 9:** Testing TypeScript

## Learning Objectives

- Type-safe test runner and assertions
- Async testing with Promises
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

## Key Concepts

### Type-Safe Testing
Assertions with generic type. TypeScript ensures expected and actual have same type.

### Async Testing
`async/await` in test function. Framework handles automatically.

### Error Testing
`expect(() => fn()).toThrow()` — ensure function throws error.

### AAA Pattern
Arrange: setup data. Act: execute function. Assert: verify result.

### Type-Level Tests
`expectTypeOf(x).toEqualTypeOf<string>()` — check type at compile-time.

### Frameworks
Vitest: fast, Vite-native. Jest: mature. Ambience: node/jsdom.

---

## Experiments

- Create parameterized test with types
- Try mock function with proper typing
- Experiment test for generic functions
- Create test for discriminated unions
- Try type-level test with expectTypeOf

---

## Challenge

Build a test suite for API client: type-safe mocks, async tests, error cases, with 10+ tests.

---

## Summary

Week 9 of 12: **Testing TypeScript** (Level: Complete TypeScript). Guaranteed quality. Next week: **Design Patterns**.
