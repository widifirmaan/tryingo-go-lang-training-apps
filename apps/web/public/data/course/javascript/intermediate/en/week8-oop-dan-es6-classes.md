# Object-Oriented JavaScript: ES6 Classes, Prototypes & Inheritance

> **Kategori:** JavaScript | **Level:** DOM, Events & Object Architecture | **Minggu 8:** Object-Oriented JavaScript: ES6 Classes, Prototypes & Inheritance

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

## Summary

You have mastered Object-Oriented Programming with ES6 classes. Next week we enter Level 3: the V8 Event Loop and asynchronous programming.
