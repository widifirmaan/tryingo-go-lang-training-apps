# Object-Oriented JavaScript: ES6 Classes, Prototypes & Inheritance

> **Kategori:** JavaScript | **Level:** DOM, Events & Object Architecture | **Minggu 8:** Object-Oriented JavaScript: ES6 Classes, Prototypes & Inheritance
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Object-Oriented JavaScript: constructors, methods, getters, and setters via ES6 classes
- Enforce true private encapsulation using private fields (#balance)
- Implement class inheritance leveraging extends and super() chaining
- Apply Polymorphism by overriding superclass methods in child classes
- Understand the link between ES6 class syntax and underlying Prototype delegation

---

## Program: Banking Account Domain Model System via ES6 Classes

```javascript
class RekeningBank {
  #saldo;
  #nomorRekening;

  constructor(pemilik, nomorRekening, saldoAwal = 0) {
    this.pemilik = pemilik;
    this.#nomorRekening = nomorRekening;
    this.#saldo = Math.max(0, saldoAwal);
  }

  get saldoSaatIni() {
    return this.#saldo;
  }

  get nomorRekeningPublik() {
    return "REK-***" + this.#nomorRekening.slice(-4);
  }

  setor(jumlah) {
    if (jumlah <= 0) throw new Error("Nominal setoran tidak valid.");
    this.#saldo += jumlah;
    return this.#saldo;
  }

  tarik(jumlah) {
    if (jumlah <= 0 || jumlah > this.#saldo) throw new Error("Saldo tidak mencukupi.");
    this.#saldo -= jumlah;
    return this.#saldo;
  }
}

class RekeningBisnis extends RekeningBank {
  constructor(pemilik, nomorRekening, saldoAwal, limitOverdraft = 5000000) {
    super(pemilik, nomorRekening, saldoAwal);
    this.limitOverdraft = limitOverdraft;
  }

  tarik(jumlah) {
    if (jumlah > (this.saldoSaatIni + this.limitOverdraft)) {
      throw new Error("Penarikan melebihi plafon limit bisnis.");
    }
    return super.tarik(jumlah);
  }
}

const akun = new RekeningBisnis("PT Nusa Digital", "1234567890", 10000000);
akun.setor(2500000);
console.log("Pemilik   :", akun.pemilik);
console.log("Rekening  :", akun.nomorRekeningPublik);
console.log("Saldo     : Rp", akun.saldoSaatIni.toLocaleString("id-ID"));
```

---

## Key Concepts

### ES6 Classes & Private Fields (#)
ES6 classes wrap prototypal inheritance in ergonomic syntax. Private fields (`#property`) provide hard runtime encapsulation: attempting external access throws an immediate compiler SyntaxError.

---

---

## Beginner Friendly Explanation

### Analogy: An ATM Safe Box
Private field `#balance` is the steel safe inside an ATM: users query values through authenticated buttons (`.tarik()` / `.setor()`) rather than prying open the cash drawer.

## Experiments

- Attempt to log akun.#saldo in console to witness the hard SyntaxError.
- Withdraw funds exceeding balance to test error throwing.
- Check akun instanceof RekeningBank to verify prototype chain inheritance.
- Declare a static helper method on the class.

---

## Challenge

Build a base `Kendaraan` class and derived `MobilListrik` class with a private field `#batteryCapacity` and `isiDaya()` method.

---

## Visual Mental Model & Architecture Flow

![Diagram JavaScript Event Loop & Asynchronous Architecture](/diagrams/js-event-loop.svg)

```diagram
┌──────────────┐     Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Coordinator)   │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operation (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variabel`
- **Core Functionality:** Declaration of variabel modern lingkup blok.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` untuk referensi konstan yang tidak diubah; `let` untuk nilai dinamis reassignable..
- **Practical Code Example:**
```javascript
const app = 'Tryngo';
let count = 0;
count += 1;
console.log(app, count);
```
- **Expected Execution Output:**
```output
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Sintaks fungsi ringkas dengan lexical this.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup luar..
- **Practical Code Example:**
```javascript
const square = (n) => n * n;
console.log(square(7));
```
- **Expected Execution Output:**
```output
49
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Penanganan operasi asinkron linear.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Membaca data HTTP API secara asinkron tanpa callback hell..
- **Practical Code Example:**
```javascript
async function loadData() {
  const res = Promise.resolve({ user: 'Alex', status: 'active' });
  return await res;
}
loadData().then(data => console.log(JSON.stringify(data)));
```
- **Expected Execution Output:**
```output
{"user":"Alex","status":"active"}
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Transformasi array fungsional immutable.
- **Parameters / Attributes:** `callback(item, index)`.
- **System Behavior & Return:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring data..
- **Practical Code Example:**
```javascript
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```output
[2, 4]
```

---

## Common Pitfalls & Debugging Tips

### 1. Loose Equality Bugs (== vs ===)
- **Symptom / Issue:** Unintended type coercion leads to subtle logic bugs (e.g. `0 == ''` is true).
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Consistently use strict equality operators (`===` and `!==`).

### 2. Direct State & Array Mutation
- **Symptom / Issue:** Prevents reactive UI frameworks from detecting updates and causes hard-to-track bugs.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Embrace immutable updates using spread syntax (`{ ...obj }`, `[...arr]`) or `.map()` and `.filter()`.

### 3. Unhandled Asynchronous Rejections
- **Symptom / Issue:** Uncaught promise failures crash backend processes or leave user interfaces frozen.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap `await` calls in explicit `try { ... } catch (err) { ... }` blocks.

---

## Summary

You have mastered Object-Oriented Programming with ES6 classes. Next week we enter Level 3: the V8 Event Loop and asynchronous programming.
