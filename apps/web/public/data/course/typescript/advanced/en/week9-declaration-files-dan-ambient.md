# Declaration Files (.d.ts), Ambient Types & Module Augmentation

> **Kategori:** TypeScript | **Level:** Advanced Type Systems & Portfolio Capstone | **Minggu 9:** Declaration Files (.d.ts), Ambient Types & Module Augmentation

## Learning Objectives

- Understand declaration files (.d.ts) and how npm @types registries resolve dependencies
- Deploy the `declare` keyword for ambient definitions spanning browser globals and Node runtime
- Execute Module Augmentation to extend third-party vendor interfaces (Express, Next.js)
- Configure critical enterprise tsconfig flags: strict, noImplicitAny, exactOptionalPropertyTypes
- Author ambient typings for legacy JavaScript packages lacking native type definitions

---

## Program: Typing Legacy Vanilla Libraries & Express Session Augmentation

```typescript
// 1. Ambient Declaration untuk Library JavaScript Warisan Tanpa Tipe
declare namespace WindowSDKWarisan {
  function hitungPajakInternasional(nominal: number, negara: string): number;
  const versiEngine: string;
}

// 2. Module Augmentation (Memperluas Tipe Library Tanpa Mengubah Source-nya)
// Bayangkan ini memperluas interface Express Request atau Session bawaan
declare global {
  namespace Express {
    interface Request {
      penggunaTervalidasi?: {
        userId: string;
        tierAkun: "RETAIL" | "INSTITUSI";
        ipAddress: string;
      };
    }
  }
}

// 3. Penggunaan Nyata dalam Handler Middleware
function middlewareAutentikasi(req: any) {
  // Melalui module augmentation, properti penggunaTervalidasi kini dikenal resmi
  req.penggunaTervalidasi = {
    userId: "USR-789",
    tierAkun: "INSTITUSI",
    ipAddress: "103.11.22.33"
  };
  console.log("User terautentikasi:", req.penggunaTervalidasi.userId);
  console.log("Tier Hak Akses:", req.penggunaTervalidasi.tierAkun);
}

const reqMock: any = {};
middlewareAutentikasi(reqMock);
```

---

## Key Concepts

### Demystifying `.d.ts` Declaration Files
Files with extension `.d.ts` hold strictly type metadata without executable logic. They act as **Rosetta stones** between plain JavaScript runtimes and the TypeScript compiler. When installing `@types/node` or `@types/react`, you are acquiring declaration files.

### Module Augmentation in Enterprise Architectures
Third-party HTTP frameworks such as Express expose a baseline `Request` shape. Production systems inject credentials via auth middleware (`req.user`).
Rather than compromising with `(req as any).user`, augment the vendor contract via **Declaration Merging**:
```typescript
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser;
  }
}
```
Your entire engineering org gains autocomplete and compiler guarantees without hacking `node_modules`.

---

---

## Beginner Friendly Explanation

### Analogy: Multilingual Hotel Guides & VIP Access Badges
1. **`.d.ts`** is a multilingual visitor brochure: the physical building operates in the regional tongue (*JavaScript*), while the brochure instructs foreign travelers (*TypeScript*) precisely where elevators and suites reside.
2. **Module Augmentation** is a VIP badge overlay: without altering the hotel keycard's hardware, security attaches an authorization badge granting elevator access to the penthouse suites.

## Experiments

- Declare an ambient variable declare const API_SECRET: string and reference it in console statements.
- Append an additional field to Express.Request and verify intellisense availability.
- Inspect tsconfig.json compiler options and enforce strict: true.
- Observe compilation performance when toggling skipLibCheck across large dependencies.

---

## Challenge

Author ambient declaration `window-env.d.ts` augmenting the global browser `Window` interface with `analyticsTracker: { trackEvent: (name: string, meta?: object) => void }`.

---

## Summary

You have mastered Declaration Files and Module Augmentation. Next week is our Capstone Project: Strongly-Typed Financial Portfolio Engine.
