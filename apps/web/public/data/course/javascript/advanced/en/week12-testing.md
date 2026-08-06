# Testing JavaScript

> **Kategori:** JavaScript | **Level:** Advanced | **Minggu 12:** Testing JavaScript

## Learning Objectives

- Unit tests: test individual functions
- Assertions: toBe, toEqual, toBeGreaterThan, toContain
- Test runners: run all tests, report results
- Setup and teardown: beforeEach, afterEach
- Testing frameworks: Jest, Vitest, Mocha

---

## Program: Unit & Integration Tests

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

## Key Concepts

### Unit Tests
Test isolated functions. Input → Output. No side effects.

### Assertions
`toBe` (===), `toEqual` (deep equal), `toContain`, `toThrow`.

### Test Runners
Collect tests, run them, report passed/failed.

### Setup/Teardown
`beforeEach` before each test, `afterEach` after. For clean state.

### Frameworks
Jest: batteries included. Vitest: fast, Vite-native. Mocha: flexible + Chai.

---

## Experiments

- Create test for async function
- Try mock function to isolate dependencies
- Experiment parameterized tests
- Create test for error cases
- Try snapshot testing

---

## Challenge

Build a test suite for a utility library: 20+ tests covering normal, edge, and error cases.

---

## Summary

Week 12 of 14: **Testing JavaScript** (Level: Advanced). Code quality. Next week: **Performance Optimization**.
