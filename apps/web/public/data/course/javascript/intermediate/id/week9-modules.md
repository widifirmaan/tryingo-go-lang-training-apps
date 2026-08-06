# Modules

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 9:** Modules

## Tujuan Pembelajaran

- ES Modules: import dan export syntax
- Named exports vs default exports
- Dynamic import() untuk lazy loading
- Private class fields dengan #
- Module patterns: ES Modules vs CommonJS

---

## Program: ES Modules

```javascript
// Simulasi ES Modules (di browser/native Node)
// File: math.js
// export const PI = 3.14159;
// export function add(a, b) { return a + b; }
// export function multiply(a, b) { return a * b; }
// export default class Calculator { ... }

// File: main.js
// import Calculator, { PI, add, multiply } from "./math.js";
// import * as MathUtils from "./math.js";

// Simulasi module system
const MathUtils = (() => {
    const PI = 3.14159;

    function add(a, b) { return a + b; }
    function multiply(a, b) { return a * b; }
    function subtract(a, b) { return a - b; }

    class Calculator {
        #result = 0; // private field

        add(n) { this.#result += n; return this; }
        subtract(n) { this.#result -= n; return this; }
        getResult() { return this.#result; }
    }

    // Named exports
    return { PI, add, multiply, subtract, Calculator };
})();

// Gunakan module
console.log("=== ES Modules Simulation ===");
console.log("PI:", MathUtils.PI);
console.log("Add:", MathUtils.add(5, 3));
console.log("Multiply:", MathUtils.multiply(4, 7));

const calc = new MathUtils.Calculator();
calc.add(10).subtract(3).add(5);
console.log("Calculator:", calc.getResult());

// Dynamic import (simulasi)
async function loadModule(moduleName) {
    console.log("\n=== Dynamic Import ===");
    console.log("Loading module:", moduleName);
    // const module = await import("./" + moduleName + ".js");
    return MathUtils;
}

loadModule("math").then(mod => {
    console.log("Loaded, PI:", mod.PI);
});

// Module patterns:
// 1. ES Modules (modern): import/export
// 2. CommonJS (Node): require/module.exports
// 3. AMD (legacy): define/require
// 4. UMD: universal module

// Tree shaking: bundler hapus unused exports
// Bundlers: Webpack, Rollup, Vite, esbuild
```

---

## Konsep Kunci

### ES Modules
`export const x` named export. `export default class` default export. `import { x } from "mod"`.

### Named vs Default
Named: multiple per module, harus pakai kurung kurawal. Default: satu per module, bebas nama.

### Dynamic Import
`await import("./module.js")` — load module saat dibutuhkan (lazy loading).

### Private Fields
`#field` — benar-benar private, tidak bisa diakses dari luar class.

### Bundlers
Webpack, Rollup, Vite — bundle modules untuk production. Tree shaking hapus unused code.

---

## Eksperimen

- Buat module dengan multiple named exports
- Coba dynamic import dengan conditional
- Eksperimen private fields dan methods
- Buat barrel file (index.js) untuk re-export
- Coba circular dependency — apa yang terjadi?

---

## Tantangan

Buat module library: math, string, date utilities — dengan named exports, default export, dan dynamic import.

---

## Ringkasan

Minggu 9 dari 14: **Modules** (Level: Menengah). Organisasi kode. Minggu depan: **Error Handling**.
