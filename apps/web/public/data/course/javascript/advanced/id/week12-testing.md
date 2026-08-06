# Testing JavaScript

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 12:** Testing JavaScript

## Tujuan Pembelajaran

- Unit test: test fungsi individual
- Assertions: toBe, toEqual, toBeGreaterThan, toContain
- Test runner: jalankan semua test, report hasil
- Setup dan teardown: beforeEach, afterEach
- Testing frameworks: Jest, Vitest, Mocha

---

## Program: Unit & Integration Test

```javascript
// Simple Test Framework (simulasi)
class TestRunner {
    #tests = [];
    #passed = 0;
    #failed = 0;

    test(name, fn) {
        this.#tests.push({ name, fn });
    }

    async run() {
        console.log("=== Running Tests ===");
        for (const { name, fn } of this.#tests) {
            try {
                await fn();
                this.#passed++;
                console.log("  ✓", name);
            } catch (err) {
                this.#failed++;
                console.log("  ✗", name);
                console.log("   ", err.message);
            }
        }
        console.log(`\nResults: ${this.#passed} passed, ${this.#failed} failed`);
    }
}

// Assertions
function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, got ${actual}`);
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
            }
        },
        toBeGreaterThan(n) {
            if (actual <= n) {
                throw new Error(`${actual} is not greater than ${n}`);
            }
        },
        toContain(item) {
            if (!actual.includes(item)) {
                throw new Error(`"${actual}" does not contain "${item}"`);
            }
        },
        toThrow(fn) {
            try { fn(); }
            catch { return; }
            throw new Error("Expected function to throw");
        }
    };
}

// Test subject
function add(a, b) { return a + b; }
function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}
function isPalindrome(str) {
    return str === str.split("").reverse().join("");
}

// Run tests
const runner = new TestRunner();

runner.test("add: 2 + 3 = 5", () => {
    expect(add(2, 3)).toBe(5);
});

runner.test("add: -1 + 1 = 0", () => {
    expect(add(-1, 1)).toBe(0);
});

runner.test("divide: 10 / 2 = 5", () => {
    expect(divide(10, 2)).toBe(5);
});

runner.test("divide: throws on zero", () => {
    expect(() => divide(5, 0)).toThrow();
});

runner.test("isPalindrome: racecar", () => {
    expect(isPalindrome("racecar")).toBe(true);
});

runner.test("isPalindrome: hello", () => {
    expect(isPalindrome("hello")).toBe(false);
});

runner.run();

// Real testing frameworks:
// Jest: test(), expect(), describe()
// Vitest: compatible dengan Jest, faster
// Mocha + Chai: flexible
// Testing Library: DOM testing
```

---

## Konsep Kunci

### Unit Test
Test fungsi terisolasi. Input → Output. Tidak ada side effects.

### Assertions
`toBe` (===), `toEqual` (deep equal), `toContain`, `toThrow`.

### Test Runner
Kumpulkan tests, jalankan, report passed/failed.

### Setup/Teardown
`beforeEach` sebelum setiap test, `afterEach` setelah. Untuk clean state.

### Frameworks
Jest: batteries included. Vitest: fast, Vite-native. Mocha: flexible + Chai.

---

## Eksperimen

- Buat test untuk async function
- Coba mock function untuk isolate dependencies
- Eksperimen parameterized tests
- Buat test untuk error cases
- Coba snapshot testing

---

## Tantangan

Buat test suite untuk utility library: 20+ tests covering normal, edge, dan error cases.

---

## Ringkasan

Minggu 12 dari 14: **Testing JavaScript** (Level: Lanjutan). Kualitas kode. Minggu depan: **Performance Optimization**.
