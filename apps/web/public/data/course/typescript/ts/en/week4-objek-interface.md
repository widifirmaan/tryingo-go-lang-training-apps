# Objects & Interfaces

> TypeScript | Module 4

## Learning Objectives

- Create interfaces for object shapes
- Use type aliases vs interfaces
- Apply readonly and optional properties
- Extend interfaces and intersection types
- Use index signatures

---

## Program: Product Catalog

```typescript
// Interface — object shape contract
interface Product {
  id: number;
  name: string;
  price: number;
  readonly sku: string;      // cannot be changed
  stock?: number;            // optional
}

const laptop: Product = {
  id: 1,
  name: 'Laptop Pro',
  price: 15000000,
  sku: 'LAP-001',
};

laptop.price = 14000000;  // OK
// laptop.sku = 'NEW-SKU'; // Error: readonly

// Extending interfaces
interface Electronics extends Product {
  warrantyYears: number;
  powerConsumption: number;
}

const monitor: Electronics = {
  id: 2,
  name: 'Monitor 4K',
  price: 5000000,
  sku: 'MON-001',
  warrantyYears: 3,
  powerConsumption: 65,
};

// Type alias — alternative to interface
type Category = {
  id: number;
  name: string;
  parentId?: number;
};

// Intersection type
type DetailedProduct = Product & { category: Category };

const item: DetailedProduct = {
  ...laptop,
  category: { id: 1, name: 'Elektronik' },
};

console.log('Monitor:', monitor);
console.log('Item:', item);

// Index signature
interface Dictionary {
  [key: string]: string;
}
const translations: Dictionary = { hello: 'halo', world: 'dunia' };
console.log('Translate:', translations['hello']);

```

---

## Explanation

`interface` defines object shapes. `type` aliases work for unions/intersections. `readonly` prevents property modification. `?` for optional properties. `extends` inherits from other interfaces. Index signatures `[key: string]: Type` for dynamic properties.

---

## Experiments

- Change data types in each function and see compilation errors
- Add new properties to interfaces and update implementations
- Replace `any` with `unknown` and add type guards
- Try different union and intersection type combinations

---

## Challenge

Build a program applying this week's concepts in a real case study. Use explicit type annotations on every variable and function. Ensure no `any`. Add comments explaining the types used.

---

## Summary

Module 4 of 16: **Objects & Interfaces**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Union, Intersection & Literal Types**.
