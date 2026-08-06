# TypeScript Config

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 8:** TypeScript Config

## Tujuan Pembelajaran

- tsconfig.json: compiler options utama
- Strict mode dan type checking options
- Target dan module configuration
- Declaration files (.d.ts) untuk type declarations
- Project references dan path aliases

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

## Konsep Kunci

### Strict Mode
`strict: true` — aktifkan semua strict checks. Wajib untuk project baru.

### noImplicitAny
Error jika variabel tanpa type annotation. Memaksa explicit typing.

### Declaration Files
`.d.ts` — type declarations tanpa implementation. Untuk library types.

### Path Aliases
`@/components` → `src/components`. Cleaner imports.

### Project References
Monorepo setup: multiple tsconfig yang saling reference.

### skipLibCheck
Skip checking `.d.ts` files dari dependencies. Lebih cepat.

---

## Eksperimen

- Buat tsconfig untuk library vs app
- Coba noUncheckedIndexedAccess pada array access
- Eksperimen declaration merging
- Buat custom .d.ts untuk module tanpa types
- Coba project references di monorepo

---

## Tantangan

Setup TypeScript project: strict mode, path aliases, separate dev/build configs, dan custom declaration files.

---

## Ringkasan

Minggu 8 dari 12: **TypeScript Config** (Level: TypeScript Lengkap). Konfigurasi project. Minggu depan: **Testing**.
