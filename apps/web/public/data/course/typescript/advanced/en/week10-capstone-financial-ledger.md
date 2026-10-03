# Capstone: Strongly-Typed Financial Portfolio & Audit Engine

> **Kategori:** TypeScript | **Level:** Advanced Type Systems & Portfolio Capstone | **Minggu 10:** Capstone: Strongly-Typed Financial Portfolio & Audit Engine
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize all TypeScript concepts from fundamentals through advanced metaprogramming into a cohesive engine
- Enforce rigorous financial immutability using readonly modifiers and runtime Object.freeze
- Architect an immutable transactional audit ledger verified at compile time
- Compute critical portfolio metrics (ROI, Capital Gain, Unrealized PnL) with type precision
- Deliver clean, enterprise-ready TypeScript architecture ready for cloud deployment

---

## Program: Multi-Asset Portfolio Engine with Immutable Auditing & Compile Verification

```typescript
// ============================================================================
// CAPSTONE: MESIN ANALITIK PORTOFOLIO KEUANGAN DENGAN KESELAMATAN TIPE PENUH
// ============================================================================

type KelasAset = "SAHAM" | "OBLIGASI" | "KRIPTO" | "KAS";

interface PosisiAset {
  readonly id: string;
  readonly simbol: string;
  readonly kelas: KelasAset;
  jumlahUnit: number;
  hargaPerolehanRataRata: number;
  hargaPasarSekarang: number;
}

type AksiTransaksi = "BELI" | "JUAL" | "DIVIDEN";

interface RekorAuditTransaksi {
  readonly idTransaksi: string;
  readonly waktu: Date;
  readonly aksi: AksiTransaksi;
  readonly simbol: string;
  readonly nominalTotal: number;
}

class MesinPortofolio {
  private posisiMap: Map<string, PosisiAset> = new Map();
  private auditLog: RekorAuditTransaksi[] = [];

  tambahPosisi(aset: PosisiAset): void {
    this.posisiMap.set(aset.simbol, { ...aset });
    this.catatAudit({
      idTransaksi: `TX-${Date.now()}`,
      waktu: new Date(),
      aksi: "BELI",
      simbol: aset.simbol,
      nominalTotal: aset.jumlahUnit * aset.hargaPerolehanRataRata
    });
  }

  private catatAudit(rekor: RekorAuditTransaksi): void {
    this.auditLog.push(Object.freeze(rekor));
  }

  hitungKinerja(): { totalModal: number; nilaiPasarSekarang: number; labaRugiNominal: number; roiPersen: number } {
    let totalModal = 0;
    let nilaiPasarSekarang = 0;

    for (const p of this.posisiMap.values()) {
      totalModal += p.jumlahUnit * p.hargaPerolehanRataRata;
      nilaiPasarSekarang += p.jumlahUnit * p.hargaPasarSekarang;
    }

    const labaRugiNominal = nilaiPasarSekarang - totalModal;
    const roiPersen = totalModal > 0 ? (labaRugiNominal / totalModal) * 100 : 0;

    return { totalModal, nilaiPasarSekarang, labaRugiNominal, roiPersen };
  }

  dapatkanAuditTrail(): readonly RekorAuditTransaksi[] {
    return this.auditLog;
  }
}

// Inisialisasi Portofolio Produksi
const portofolio = new MesinPortofolio();

portofolio.tambahPosisi({
  id: "AST-01",
  simbol: "BBCA",
  kelas: "SAHAM",
  jumlahUnit: 5000,
  hargaPerolehanRataRata: 9200,
  hargaPasarSekarang: 10100
});

portofolio.tambahPosisi({
  id: "AST-02",
  simbol: "BTC",
  kelas: "KRIPTO",
  jumlahUnit: 0.15,
  hargaPerolehanRataRata: 950_000_000,
  hargaPasarSekarang: 1_050_000_000
});

const kinerja = portofolio.hitungKinerja();
console.log("=== LAPORAN KINERJA PORTOFOLIO ===");
console.log("Total Modal Investasi : Rp", kinerja.totalModal.toLocaleString("id-ID"));
console.log("Nilai Pasar Terkini   : Rp", kinerja.nilaiPasarSekarang.toLocaleString("id-ID"));
console.log("Laba / Rugi Bersih    : Rp", kinerja.labaRugiNominal.toLocaleString("id-ID"));
console.log("ROI (Return on Invest):", kinerja.roiPersen.toFixed(2), "%");
console.log("Total Riwayat Audit   :", portofolio.dapatkanAuditTrail().length, "transaksi");
```

---

## Key Concepts

### Portfolio Capstone Architecture
This capstone demonstrates how TypeScript secures mission-critical financial systems:
1. **Audit Ledger Immutability**: Historical audit records are typed as `readonly RekorAuditTransaksi[]` and sealed with `Object.freeze()`. Malicious or accidental retroactive mutations are rejected at compile and runtime.
2. **Discriminated Domain Bounds**: Asset classes are constrained strictly to `"SAHAM" | "OBLIGASI" | "KRIPTO" | "KAS"`, rejecting arbitrary unvalidated asset types.
3. **Segregation of Mutable Position and Append-Only Logs**: Market prices float dynamically while historical state mutations preserve provenance inside the append-only ledger.

### Next Step: Modern Framework Engineering
Mastering static compilation, generics, mapped types, and ambient augmentation positions you squarely at the senior engineering tier, primed for React, Next.js, Vue, and NestJS development.

---

---

## Beginner Friendly Explanation

### Analogy: A High-Security Vault with Triple-Entry Ledgers
This portfolio engine functions like an institutional depository vault:
1. **Asset Positions** are secure shelving units where market values reflect real-time bullion and foreign reserve rates.
2. **The Audit Trail** is the tamper-proof security log and notarized ledger: every asset transfer permanently records timestamps, operator signatures, and valuations in indelible ink.

## Experiments

- Attempt mutating auditLog outside dapatkanAuditTrail() to witness readonly compile errors.
- Add a new sovereign BOND position with fixed coupon interest yields.
- Simulate falling market valuations to observe negative PnL and drawdown ROI computations.
- Author an asset allocation breakdown method calculating the portfolio percentage per asset class.

---

## Challenge

Expand MesinPortofolio with `rebalancePortofolio(targetAllocation: Record<KelasAset, number>)`: compute buy/sell unit deltas required to rebalance the portfolio safely.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `interface Name { prop: Type; }`
- **Core Functionality:** Strongly typed object contract definition.
- **Parameters / Attributes:** `Field names, Types, Optional (?)`.
- **System Behavior & Return:** Enforces compile-time structural contracts across object literals, classes, and function parameters.
- **Practical Code Example:**
```javascript
interface User {
  id: string;
  name: string;
  role?: string;
}
const u: User = { id: 'u1', name: 'Alex' };
```
- **Expected Execution Output:**
```text
Compile-time validation succeeds with zero type errors
```

### 2. `type Union = TypeA | TypeB`
- **Core Functionality:** Disjoint union type combination.
- **Parameters / Attributes:** `Two or more distinct types`.
- **System Behavior & Return:** Restricts variable assignments strictly to predefined variants or primitive literal choices.
- **Practical Code Example:**
```javascript
type Status = 'idle' | 'loading' | 'success';
let s: Status = 'loading';
```
- **Expected Execution Output:**
```text
Guarantees only one of the 3 specified string literals can be assigned
```

### 3. `function genericFn<T>(arg: T): T`
- **Core Functionality:** Type-safe reusable generic abstraction.
- **Parameters / Attributes:** `Type Parameter T`.
- **System Behavior & Return:** Enables creation of parameterized functions and collections while preserving concrete type information.
- **Practical Code Example:**
```javascript
function wrap<T>(item: T): { data: T } {
  return { data: item };
}
const w = wrap(42); // Type: { data: number }
```
- **Expected Execution Output:**
```text
{ data: 42 }
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Core Functionality:** Built-in utility type transformations.
- **Parameters / Attributes:** `Base Type T, Selected Keys K`.
- **System Behavior & Return:** Transforms existing types into optional variants (`Partial`) or selects field subsets cleanly.
- **Practical Code Example:**
```javascript
interface Item { id: string; name: string; price: number; }
type PatchItem = Partial<Item>;
```
- **Expected Execution Output:**
```text
All properties become optional for update requests
```


---

## Common Pitfalls & Debugging Tips

### 1. Overusing the 'any' Escape Hatch
- **Symptom / Issue:** Completely disables TypeScript compile-time safety across downstream code.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `unknown` for dynamic values and narrow types using type guards.

### 2. Reckless Non-Null Assertions (!)
- **Symptom / Issue:** Causes runtime `Cannot read property of undefined` crashes when assumptions fail.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Rely on optional chaining (`?.`) or explicit defensive guard statements.

### 3. Inconsistent Type vs Interface Usage
- **Symptom / Issue:** Hinders declaration merging and confuses team conventions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `interface` for extensible object contracts and `type` for unions, primitives, and tuples.

---

## Summary

Congratulations! You have completed the comprehensive TypeScript curriculum, culminating in an enterprise-grade, strongly-typed Financial Portfolio Analytics Engine.
