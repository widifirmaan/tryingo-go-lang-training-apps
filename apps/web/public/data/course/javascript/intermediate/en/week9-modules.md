# Modules

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 9:** Modules

## Learning Objectives

- ES Modules: import and export syntax
- Named exports vs default exports
- Dynamic import() for lazy loading
- Private class fields with #
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

## Key Concepts

### ES Modules
`export const x` named export. `export default class` default export. `import { x } from "mod"`.

### Named vs Default
Named: multiple per module, needs curly braces. Default: one per module, any name.

### Dynamic Import
`await import("./module.js")` — load module when needed (lazy loading).

### Private Fields
`#field` — truly private, not accessible outside class.

### Bundlers
Webpack, Rollup, Vite — bundle modules for production. Tree shaking removes unused code.

---

## Experiments

- Create module with multiple named exports
- Try dynamic import with conditional
- Experiment private fields and methods
- Create barrel file (index.js) for re-export
- Try circular dependency — what happens?

---

## Challenge

Create a module library: math, string, date utilities — with named exports, default export, and dynamic import.

---

## Summary

Week 9 of 14: **Modules** (Level: Intermediate). Code organization. Next week: **Error Handling**.
