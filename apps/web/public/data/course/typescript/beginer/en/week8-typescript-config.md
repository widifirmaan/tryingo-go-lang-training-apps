# TypeScript Configuration

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 8:** TypeScript Configuration

## Learning Objectives

- tsconfig.json: main compiler options
- Strict mode and type checking options
- Target and module configuration
- Declaration files (.d.ts) for type declarations
- Project references and path aliases

---

## Program: tsconfig.json & Setup

```typescript
// tsconfig.json — konfigurasi TypeScript compiler
// File: tsconfig.json
const tsconfig = {
    "compilerOptions": {
        // Target & Module
        "target": "ES2020",           // Output JS version
        "module": "ESNext",           // Module system
        "moduleResolution": "node",   // How to resolve modules

        // Strict Mode (recommended: all true)
        "strict": true,               // Enable all strict checks
        "noImplicitAny": true,        // Error on implicit any
        "strictNullChecks": true,     // null/undefined checks
        "noImplicitReturns": true,    // All code paths must return
        "noUncheckedIndexedAccess": true, // Array[index] bisa undefined

        // Output
        "outDir": "./dist",           // Output directory
        "rootDir": "./src",           // Source directory
        "declaration": true,          // Generate .d.ts files
        "sourceMap": true,            // Generate source maps

        // Interop
        "esModuleInterop": true,      // CommonJS/ESM interop
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,

        // Linting
        "noUnusedLocals": true,       // Error on unused variables
        "noUnusedParameters": true,   // Error on unused params
        "noImplicitOverride": true,   // Must use override keyword

        // Advanced
        "skipLibCheck": true,         // Skip .d.ts checking
        "resolveJsonModule": true,    // Import JSON files
        "isolatedModules": true       // Required for Babel/esbuild
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "**/*.test.ts"]
};

console.log("=== TypeScript Config ===");
console.log("Target:", tsconfig.compilerOptions.target);
console.log("Strict:", tsconfig.compilerOptions.strict);
console.log("OutDir:", tsconfig.compilerOptions.outDir);

// Triple-slash directives
// /// <reference path="./types.d.ts" />
// /// <reference types="node" />

// Declaration files (.d.ts)
// File: types.d.ts
// declare module "my-module" {
//     export function doSomething(): void;
// }

// Ambient declarations
// declare const process: { env: Record<string, string | undefined> };
// declare function fetch(input: string): Promise<Response>;

// Project references
// tsconfig.json
// {
//   "references": [
//     { "path": "./packages/core" },
//     { "path": "./packages/ui" }
//   ]
// }

// Best Practices
console.log("\n=== Best Practices ===");
console.log("1. Always enable strict: true");
console.log("2. Use noImplicitAny untuk avoid any");
console.log("3. Set noUncheckedIndexedAccess untuk array safety");
console.log("4. Use skipLibCheck untuk compile speed");
console.log("5. Separate build config from test config");
console.log("6. Use path aliases: @/components → src/components");

// Path aliases
// tsconfig.json
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "@/*": ["src/*"],
//       "@components/*": ["src/components/*"]
//     }
//   }
// }
```

---

## Key Concepts

### Strict Mode
`strict: true` — enable all strict checks. Required for new projects.

### noImplicitAny
Error on variables without type annotation. Forces explicit typing.

### Declaration Files
`.d.ts` — type declarations without implementation. For library types.

### Path Aliases
`@/components` → `src/components`. Cleaner imports.

### Project References
Monorepo setup: multiple tsconfigs referencing each other.

### skipLibCheck
Skip checking dependency `.d.ts` files. Faster compilation.

---

## Experiments

- Create tsconfig for library vs app
- Try noUncheckedIndexedAccess on array access
- Experiment declaration merging
- Create custom .d.ts for untyped module
- Try project references in monorepo

---

## Challenge

Setup TypeScript project: strict mode, path aliases, separate dev/build configs, and custom declaration files.

---

## Summary

Week 8 of 12: **TypeScript Configuration** (Level: Complete TypeScript). Project configuration. Next week: **Testing**.
