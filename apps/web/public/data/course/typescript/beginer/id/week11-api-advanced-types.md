# Advanced Types — Template Literal Warung (typescriptlang.org)

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 11:** Advanced Type Manipulation

## Tujuan Pembelajaran

- `` `on${Capitalize<key>}` `` buat `onBeras` dari `"beras"`, `` `/api/${string}` `` rute aman, `infer` parsing (sumber: typescriptlang.org/docs/handbook/2/template-literal-types)

---

## Kenapa Ini Penting Buat Kamu?

Rute warung `/produk/123` typo `/produk//123` → 404. Dengan `` `/produk/${string}` `` typo merah sebelum run. `onBeras` dari `"beras"` otomatis, tidak tulis manual 20x.

---

## Program: Rute & Event Warung (typescriptlang.org)

```typescript
type Produk = "beras" | "bayam";
type Kejadian = `on${Capitalize<Produk>}`; // "onBeras" | "onBayam"

function on(kejadian: Kejadian, cb: () => void) {}
on("onBeras", () => console.log("Beras"));
// on("onberas", () => {}); // ❌ harus Capitalize

type Route = `/api/${string}`;
const a: Route = "/api/produk"; // ✅
 // const b: Route = "api/produk"; // ❌ harus /api/

type ExtractId<S extends string> = S extends `/produk/${infer Id}` ? Id : never;
type Id = ExtractId<"/produk/123">; // "123"
```

**Sumber:** `typescriptlang.org/docs/handbook/2/template-literal-types` — `` `${string}` `` + `Capitalize` + `infer`.

---

## Konsep Kunci

### `` `on${Capitalize<T>}` `` = Stempel Event
`"beras"` → `"onBeras"`.

### `` `/api/${string}` `` = Rute Aman
Harus `/api/` di depan.

### `infer` = Bongkar
`` `/produk/${infer Id}` `` ambil `Id`.

---

## Penjelasan untuk Pemula

### Analogi: Stempel Rute

- **`` `on${Capitalize<Produk>}` `` = stempel event**: `beras` → cap `onBeras`.
- **`` `/api/${string}` `` = jalan aman**: harus `/api/` di depan.

---

## Tantangan

**Warung Rute Aman:** `type Route = `/warung/${string}`` → `const r: Route = "/warung/beras"` ✅, `"warung/beras"` ❌. `type Id = ExtractId<"/warung/123">` → `"123"`.

---

## Glosarium Mini

- **Template literal/infer/Capitalize**: stempel/bongkar/huruf besar

---

## Ringkasan

Minggu 11 dari 12: **Rute Aman** — template literal. Minggu depan: **Capstone**.
