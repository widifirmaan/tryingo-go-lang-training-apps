# Testing & Quality

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 9:** Testing & Quality

## Tujuan Pembelajaran

- Unit testing: test individual functions
- Test framework: Jest, Mocha, Vitest
- Assertion: toEqual, toBe, toThrow
- Mock dan stub untuk isolation
- Test coverage dan integration testing

---

## Program: Unit Test

```javascript
console.log("=== Testing Simulation ===");

function tambah(a, b) { return a + b; }
function bagi(a, b) { if (b === 0) throw new Error("Nol!"); return a / b; }
function kali(a, b) { return a * b; }

function assertEqual(actual, expected, testName) {
  if (actual === expected) {
    console.log("  PASS: " + testName);
    return true;
  } else {
    console.log("  FAIL: " + testName + " (expected " + expected + ", got " + actual + ")");
    return false;
  }
}

console.log("\nTest tambah:");
assertEqual(tambah(2, 3), 5, "2 + 3 = 5");
assertEqual(tambah(-1, 1), 0, "-1 + 1 = 0");
assertEqual(tambah(0, 0), 0, "0 + 0 = 0");

console.log("\nTest bagi:");
assertEqual(bagi(10, 2), 5, "10 / 2 = 5");
assertEqual(bagi(7, 2), 3.5, "7 / 2 = 3.5");
try {
  bagi(5, 0);
  console.log("  FAIL: should throw");
} catch (e) {
  console.log("  PASS: throws on zero");
}

console.log("\nTest kali:");
assertEqual(kali(3, 4), 12, "3 x 4 = 12");
assertEqual(kali(-2, 3), -6, "-2 x 3 = -6");
assertEqual(kali(0, 100), 0, "0 x 100 = 0");

console.log("\n=== Mock Pattern ===");
function fetchData(api) {
  return api.get("/data");
}
const mockApi = { get: (url) => ({ data: "mock response from " + url }) };
console.log("Mock result:", fetchData(mockApi));
```

---

## Konsep Kunci

### Unit Test
Test function secara isolated. Arrange, Act, Assert.

### Jest
test("name", () => { expect(fn()).toEqual(value) }).

### Mock
Simulasi dependency (API, database) dengan mock object.

### Coverage
npm test -- --coverage untuk lihat coverage.

---

## Eksperimen

- Buat test untuk edge cases: negative numbers, empty arrays
- Implementasikan mock untuk API call
- Buat integration test untuk Express route
- Tambah test coverage report

---

## Tantangan

Buat test suite lengkap untuk REST API: unit test, integration test, mock database.

---

## Ringkasan

Minggu 9 dari 12: **Testing & Quality** (Level: Lanjutan). Minggu depan: **Performance & Security**.
