import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/typescript/ts');

const MODULES = [
  { id: 1,  f: 'pengenalan-typescript', lid: 'Pengenalan TypeScript',                         len: 'Introduction to TypeScript',                pid: 'Halo TypeScript',             pen: 'Hello TypeScript' },
  { id: 2,  f: 'tipe-dasar',             lid: 'Tipe Dasar',                                     len: 'Basic Types',                                pid: 'Demo Tipe Dasar',             pen: 'Basic Types Demo' },
  { id: 3,  f: 'fungsi',                 lid: 'Fungsi di TypeScript',                           len: 'Functions in TypeScript',                    pid: 'Koleksi Fungsi',              pen: 'Function Collection' },
  { id: 4,  f: 'objek-interface',        lid: 'Object & Interface',                             len: 'Objects & Interfaces',                       pid: 'Katalog Produk',              pen: 'Product Catalog' },
  { id: 5,  f: 'union-literal',          lid: 'Union, Intersection & Literal',                  len: 'Union, Intersection & Literal Types',         pid: 'Sistem Status',               pen: 'Status System' },
  { id: 6,  f: 'type-narrowing',         lid: 'Type Narrowing & Guard',                         len: 'Type Narrowing & Guards',                    pid: 'Validasi Input',              pen: 'Input Validator' },
  { id: 7,  f: 'generik-dasar',          lid: 'Generik Dasar',                                  len: 'Generics Basics',                            pid: 'Koleksi Aman Tipe',           pen: 'Type-Safe Collections' },
  { id: 8,  f: 'generik-lanjutan',       lid: 'Generik Lanjutan',                               len: 'Advanced Generics',                          pid: 'Transformasi Tipe',           pen: 'Type Transformations' },
  { id: 9,  f: 'utility-types',          lid: 'Utility Types',                                  len: 'Utility Types',                              pid: 'Manipulasi Data',             pen: 'Data Manipulation' },
  { id: 10, f: 'class',                  lid: 'Class di TypeScript',                            len: 'Classes in TypeScript',                      pid: 'Sistem Peminjaman',           pen: 'Library System' },
  { id: 11, f: 'module-deklarasi',       lid: 'Module & Deklarasi',                             len: 'Modules & Declarations',                     pid: 'Struktur Proyek',             pen: 'Project Structure' },
  { id: 12, f: 'tipe-lanjutan',          lid: 'Tipe Lanjutan',                                  len: 'Advanced Types',                             pid: 'Validasi Canggih',            pen: 'Advanced Validation' },
  { id: 13, f: 'konfigurasi-tools',      lid: 'Konfigurasi & Tools',                            len: 'Configuration & Tooling',                    pid: 'Setup Proyek',                pen: 'Project Setup' },
  { id: 14, f: 'frontend-typescript',    lid: 'TypeScript di Frontend',                         len: 'TypeScript in Frontend',                     pid: 'Komponen Ter-tipe',           pen: 'Typed Components' },
  { id: 15, f: 'backend-typescript',     lid: 'TypeScript di Backend',                          len: 'TypeScript in Backend',                      pid: 'API Server',                  pen: 'API Server' },
  { id: 16, f: 'proyek-akhir',           lid: 'Proyek Akhir TypeScript',                        len: 'TypeScript Final Project',                   pid: 'Aplikasi Full-Stack',         pen: 'Full-Stack App' },
];

const OBJ = {
  1: { id: ['Memahami peran TypeScript sebagai superset JavaScript', 'Menginstall TypeScript dan menjalankan tsc', 'Mengenal type annotation dan type inference', 'Mengkonfigurasi tsconfig.json dasar', 'Mengompilasi .ts ke .js'], en: ['Understand TypeScript as a JavaScript superset', 'Install TypeScript and run tsc', 'Learn type annotations and type inference', 'Configure basic tsconfig.json', 'Compile .ts to .js'] },
  2: { id: ['Menguasai tipe primitif: string, number, boolean', 'Menggunakan array dan tuple', 'Membedakan any vs unknown vs never', 'Memahami null, undefined, dan void', 'Menerapkan enum untuk konstanta bernama'], en: ['Master primitive types: string, number, boolean', 'Use arrays and tuples', 'Distinguish any vs unknown vs never', 'Understand null, undefined, and void', 'Apply enums for named constants'] },
  3: { id: ['Menentukan tipe parameter dan return function', 'Menggunakan optional dan default parameter', 'Membuat function overloads', 'Memahami this type pada method', 'Menerapkan rest parameter dan spread'], en: ['Define parameter and return types', 'Use optional and default parameters', 'Create function overloads', 'Understand this type in methods', 'Apply rest parameters and spread'] },
  4: { id: ['Membuat interface untuk shape objek', 'Menggunakan type alias vs interface', 'Menerapkan readonly dan optional properties', 'Meng-extend interface dan intersection type', 'Menggunakan index signatures'], en: ['Create interfaces for object shapes', 'Use type aliases vs interfaces', 'Apply readonly and optional properties', 'Extend interfaces and intersection types', 'Use index signatures'] },
  5: { id: ['Membuat union type dari beberapa tipe', 'Menggunakan intersection type', 'Menerapkan literal type untuk nilai spesifik', 'Menggunakan template literal types', 'Menggabungkan union dan intersection'], en: ['Create union types from multiple types', 'Use intersection types', 'Apply literal types for specific values', 'Use template literal types', 'Combine union and intersection'] },
  6: { id: ['Mempersempit tipe dengan typeof guard', 'Menggunakan instanceof untuk class', 'Menerapkan discriminated union pattern', 'Membuat custom type predicate', 'Menggunakan in operator narrowing'], en: ['Narrow types with typeof guards', 'Use instanceof for classes', 'Apply discriminated union pattern', 'Create custom type predicates', 'Use in operator narrowing'] },
  7: { id: ['Membuat generic function', 'Menggunakan generic constraint dengan extends', 'Membuat generic interface dan type', 'Menerapkan generic default type', 'Menggunakan multiple type parameters'], en: ['Create generic functions', 'Use generic constraints with extends', 'Create generic interfaces and types', 'Apply generic default types', 'Use multiple type parameters'] },
  8: { id: ['Menggunakan conditional types', 'Membuat mapped types', 'Menggunakan keyof dan typeof operator', 'Menerapkan indexed access types', 'Menggunakan infer dalam conditional types'], en: ['Use conditional types', 'Create mapped types', 'Use keyof and typeof operators', 'Apply indexed access types', 'Use infer in conditional types'] },
  9: { id: ['Menguasai Partial, Required, Readonly', 'Menggunakan Pick dan Omit', 'Menerapkan Record untuk dictionary', 'Menggunakan Exclude, Extract, NonNullable', 'Menggunakan ReturnType dan Parameters'], en: ['Master Partial, Required, Readonly', 'Use Pick and Omit', 'Apply Record for dictionaries', 'Use Exclude, Extract, NonNullable', 'Use ReturnType and Parameters'] },
  10: { id: ['Membuat class dengan typed properties', 'Menggunakan public, private, protected', 'Menerapkan implements untuk contract', 'Membuat abstract class dan method', 'Menggunakan parameter properties'], en: ['Create classes with typed properties', 'Use public, private, protected', 'Apply implements for contracts', 'Create abstract classes and methods', 'Use parameter properties'] },
  11: { id: ['Mengimpor dan mengekspor tipe', 'Membuat declaration file (.d.ts)', 'Menggunakan @types packages', 'Memahami ambient module declarations', 'Mengatur module resolution'], en: ['Import and export types', 'Create declaration files (.d.ts)', 'Use @types packages', 'Understand ambient module declarations', 'Configure module resolution'] },
  12: { id: ['Menggunakan satisfies operator', 'Membuat branded types untuk ID', 'Menerapkan assertion function', 'Menggunakan never untuk exhaustive check', 'Mengelola covariance dan contravariance'], en: ['Use the satisfies operator', 'Create branded types for IDs', 'Apply assertion functions', 'Use never for exhaustive checks', 'Manage covariance and contravariance'] },
  13: { id: ['Menguasai konfigurasi tsconfig strict flags', 'Mengintegrasikan ESLint typescript-eslint', 'Menulis unit test dengan Vitest + TypeScript', 'Menggunakan project references', 'Mengoptimalkan kompilasi dengan isolatedModules'], en: ['Master tsconfig strict flags', 'Integrate ESLint with typescript-eslint', 'Write unit tests with Vitest + TypeScript', 'Use project references', 'Optimize compilation with isolatedModules'] },
  14: { id: ['Mengetik props dan state React', 'Menggunakan generic components', 'Mengetik event handlers', 'Membuat custom hooks dengan tipe', 'Menggunakan Context dengan TypeScript'], en: ['Type React props and state', 'Use generic components', 'Type event handlers', 'Create custom hooks with types', 'Use Context with TypeScript'] },
  15: { id: ['Mengetik request dan response Express', 'Membuat middleware dengan tipe', 'Menggunakan Zod untuk validasi runtime', 'Mengetik database query result', 'Menerapkan DTO pattern'], en: ['Type Express request and response', 'Create middleware with types', 'Use Zod for runtime validation', 'Type database query results', 'Apply DTO pattern'] },
  16: { id: ['Menggabungkan semua konsep TypeScript', 'Mendesain arsitektur type-safe', 'Mengelola state dengan tipe yang ketat', 'Membangun API layer dengan tipe end-to-end', 'Men-deploy project TypeScript'], en: ['Combine all TypeScript concepts', 'Design type-safe architecture', 'Manage state with strict types', 'Build end-to-end typed API layer', 'Deploy a TypeScript project'] },
};

const CODE = {
  1: `interface Student {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const student: Student = {
  name: 'Budi',
  level: 'beginner',
};

// Type inference — TypeScript guesses the type
const course = 'TypeScript';  // inferred as string
const duration = 16;          // inferred as number

// TypeScript catches type errors at compile time
function greet(s: Student): string {
  return \`Halo \${s.name}! Selamat belajar \${course} selama \${duration} minggu.\`;
}

console.log(greet(student));

// Try changing 'level' to an invalid value!
`,
  2: `// Primitive types
let name: string = 'Budi';
let age: number = 20;
let isActive: boolean = true;

// Arrays & Tuples
let scores: number[] = [85, 90, 78];
let pair: [string, number] = ['Budi', 20]; // tuple

// any — avoid when possible
let flexible: any = 'bisa apa saja';
flexible = 42;

// unknown — safer than any, must narrow
let input: unknown = 'some data';
if (typeof input === 'string') {
  console.log(input.toUpperCase());
}

// never — function that never returns
function fail(msg: string): never {
  throw new Error(msg);
}

// void — function returns nothing
function log(msg: string): void {
  console.log(msg);
}

// null & undefined
let nullable: string | null = null;
let undef: string | undefined = undefined;

// Enum
enum Color { Red, Green, Blue }
let c: Color = Color.Green;

console.log('Scores:', scores);
console.log('Pair:', pair);
console.log('Color:', c);  // 1
`,
  3: `// Parameter & return types
function add(a: number, b: number): number {
  return a + b;
}

// Optional & default parameters
function greet(name: string, title?: string, prefix: string = 'Halo'): string {
  return \`\${prefix} \${title ? title + ' ' : ''}\${name}!\`;
}

console.log(greet('Budi'));           // Halo Budi!
console.log(greet('Siti', 'Dr.'));    // Halo Dr. Siti!

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log('Sum:', sum(1, 2, 3, 4, 5));

// Function overloads
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  if (typeof x === 'string') return x.toUpperCase();
  return x * 10;
}

console.log(process('hello'));  // HELLO
console.log(process(5));        // 50

// Arrow function type
const multiply: (a: number, b: number) => number = (x, y) => x * y;
console.log('Multiply:', multiply(4, 3));
`,
  4: `// Interface — object shape contract
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
`,
  5: `// Union type
type Status = 'idle' | 'loading' | 'success' | 'error';
let currentStatus: Status = 'idle';
currentStatus = 'loading';
// currentStatus = 'unknown'; // Error

// Union with different types
type Result = number | string;
const parseInput = (val: string): Result => {
  const n = Number(val);
  return isNaN(n) ? val : n;
};
console.log('Parsed:', parseInput('42'), parseInput('abc'));

// Intersection type
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = { name: 'Budi', age: 20 };

// Literal types
type Direction = 'up' | 'down' | 'left' | 'right';
function move(d: Direction): string {
  return \`Moving \${d}\`;
}
console.log(move('up'));

// Template literal types
type EventName = \`on\${Capitalize<string>}\`;
type ClickEvent = \`onClick\`;  // type is "onClick"

// Type alias with union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rectangle'; width: number; height: number };

function area(s: Shape): number {
  if (s.kind === 'circle') return Math.PI * s.radius ** 2;
  if (s.kind === 'square') return s.side ** 2;
  return s.width * s.height;
}

console.log('Circle area:', area({ kind: 'circle', radius: 5 }));
console.log('Square area:', area({ kind: 'square', side: 4 }));
`,
  6: `// typeof narrowing
function processValue(val: string | number): string {
  if (typeof val === 'string') {
    return val.toUpperCase();  // TS knows val is string
  }
  return val.toFixed(2);       // TS knows val is number
}
console.log(processValue('hello'));
console.log(processValue(3.14159));

// instanceof narrowing
class Dog { bark() { return 'Woof!'; } }
class Cat { meow() { return 'Meow!'; } }

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) return animal.bark();
  return animal.meow();
}
console.log(makeSound(new Dog()));

// Discriminated union
type ApiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: string };

function handleState(state: ApiState): string {
  switch (state.status) {
    case 'idle': return 'Menunggu...';
    case 'loading': return 'Memuat...';
    case 'success': return \`Data: \${state.data}\`;
    case 'error': return \`Error: \${state.error}\`;
  }
}
console.log(handleState({ status: 'idle' }));
console.log(handleState({ status: 'success', data: 'Halo' }));

// Custom type predicate
interface Fish { swim(): string; }
interface Bird { fly(): string; }
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
`,
  7: `// Generic function — reusable type-safe code
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(first([1, 2, 3]));           // number
console.log(first(['a', 'b']));           // string
console.log(first<number>([10, 20]));     // explicit

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Budi', age: 20, city: 'Jakarta' };
console.log(getProperty(user, 'name'));   // Budi
// getProperty(user, 'email'); // Error

// Generic interface
interface Repository<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  add(item: T): void;
}

class InMemoryRepo<T> implements Repository<T> {
  private items: T[] = [];
  getAll(): T[] { return this.items; }
  getById(id: number): T | undefined { return this.items[id]; }
  add(item: T): void { this.items.push(item); }
}

const repo = new InMemoryRepo<string>();
repo.add('TypeScript');
repo.add('React');
console.log('All items:', repo.getAll());

// Generic default type
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
console.log(createArray(3, 'a'));  // string[]
`,
  8: `// Conditional types
type IsString<T> = T extends string ? 'yes' : 'no';
type A = IsString<string>;   // 'yes'
type B = IsString<number>;   // 'no'

// Conditional with infer
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;
function example(): boolean { return true; }
type ExampleReturn = ReturnTypeOf<typeof example>;  // boolean

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };

interface Person { name: string; age: number; }
type ReadonlyPerson = Readonly<Person>;
type OptionalPerson = Optional<Person>;

// keyof & typeof
type PersonKeys = keyof Person;  // 'name' | 'age'
const personObj = { name: 'Budi', age: 20 };
type PersonType = typeof personObj;

// Indexed access types
type PersonName = Person['name'];  // string

// Practical: pick specific keys
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => result[key] = obj[key]);
  return result;
}

const picked = pick({ name: 'Budi', age: 20, city: 'JKT' }, 'name', 'city');
console.log('Picked:', picked);
`,
  9: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial — semua properti opsional
function updateUser(id: number, updates: Partial<User>): void {
  console.log(\`Mengupdate user \${id}:\`, updates);
}
updateUser(1, { name: 'Budi Updated' });

// Required — semua properti wajib
type CompleteUser = Required<Partial<User>>;

// Readonly — tidak bisa diubah
const frozen: Readonly<User> = {
  id: 1, name: 'Budi', email: 'budi@mail.com',
  password: 'secret', createdAt: new Date(),
};
// frozen.name = 'Baru'; // Error

// Pick & Omit
type PublicUser = Omit<User, 'password'>;
type UserCredentials = Pick<User, 'email' | 'password'>;

function getProfile(): PublicUser {
  return { id: 1, name: 'Budi', email: 'b@m.com', createdAt: new Date() };
}
console.log('Profile:', getProfile());

// Record — dictionary type
const scores: Record<string, number> = {
  Budi: 85, Siti: 92, Alex: 78,
};
console.log('Scores:', scores);

// Exclude, Extract, NonNullable
type T1 = Exclude<'a' | 'b' | 'c', 'a'>;   // 'b' | 'c'
type T2 = Extract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'
type T3 = NonNullable<string | null | undefined>; // string

// ReturnType & Parameters
function calc(a: number, b: number): number { return a + b; }
type CalcReturn = ReturnType<typeof calc>;     // number
type CalcParams = Parameters<typeof calc>;      // [number, number]

console.log('Utility types demo completed');
`,
  10: `// Class dengan typed properties
class Animal {
  constructor(
    public name: string,      // parameter property
    private age: number,
    protected species: string
  ) {}

  public speak(): string {
    return \`\${this.name} makes a sound\`;
  }

  protected getAge(): number {
    return this.age;
  }
}

const dog = new Animal('Dog', 3, 'Canine');
console.log(dog.speak());
// dog.age; // Error: private

// Abstract class
abstract class Vehicle {
  constructor(public brand: string) {}
  abstract start(): string;
  abstract stop(): string;
  info(): string { return \`Vehicle: \${this.brand}\`; }
}

class Car extends Vehicle {
  start(): string { return 'Engine started'; }
  stop(): string { return 'Engine stopped'; }
}

const myCar = new Car('Toyota');
console.log(myCar.info());
console.log(myCar.start());

// implements — contract from interface
interface Flyable {
  fly(): string;
  land(): string;
}

class Airplane implements Flyable {
  fly(): string { return 'Flying at 30,000 ft'; }
  land(): string { return 'Landing gear deployed'; }
}

// Static typed property
class Config {
  static readonly VERSION: string = '1.0.0';
  static getAppName(): string { return 'Tryngo App'; }
}
console.log(Config.VERSION);
console.log(Config.getAppName());
`,
  11: `// ES Module syntax with types
// File: types.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoStatus = 'active' | 'completed';

export function createTodo(title: string): Todo {
  return { id: Date.now(), title, completed: false };
}

// File: store.ts
export class TodoStore {
  private todos: Todo[] = [];

  add(title: string): void {
    this.todos.push(createTodo(title));
  }

  getAll(): Todo[] {
    return [...this.todos];
  }

  toggle(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }
}

// Re-export
export type { Todo as TodoItem } from './types';

// Declaration merging (ambient)
// Normally in a .d.ts file:
declare module 'my-library' {
  export function doSomething(): void;
  export const VERSION: string;
}
`,
  12: `// satisfies operator — check type without widening
type Palette = { [key: string]: string | string[] };

const colors = {
  primary: '#3178C6',
  secondary: ['#fff', '#000'],
} satisfies Palette;

// colors.primary is still string (not string | string[])
console.log(colors.primary.toUpperCase());

// Branded types — nominal typing
type Brand<T, B extends string> = T & { __brand: B };
type UserId = Brand<number, 'UserId'>;
type OrderId = Brand<number, 'OrderId'>;

function getUser(id: UserId): string {
  return \`User \${id}\`;
}

const uid = 1 as UserId;
const oid = 1 as OrderId;
console.log(getUser(uid));
// getUser(oid); // Error: type mismatch

// Assertion functions
function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw new Error('Not a string');
}

function process(input: unknown): void {
  assertIsString(input);
  console.log(input.toUpperCase()); // TS knows input is string
}

process('hello');
// process(42); // Would throw

// never for exhaustive checks
type Shape2 = 'circle' | 'square' | 'triangle';
function area2(s: Shape2): number {
  if (s === 'circle') return 1;
  if (s === 'square') return 2;
  // if (s === 'triangle') return 3;
  // const _exhaustive: never = s; // Error if unhandled
  return 0;
}
`,
  13: `// tsconfig strict mode demo
// strict: true enables: noImplicitAny, strictNullChecks, etc.

// With strictNullChecks:
function greetName(name: string | null): string {
  if (name === null) return 'No name';
  return name.toUpperCase(); // TS knows name is string here
}
console.log(greetName('Budi'));
console.log(greetName(null));

// noImplicitAny — every parameter must be typed
function multiply(a: number, b: number): number {
  return a * b;
}
console.log(multiply(3, 4));

// noUnusedLocals — catches unused variables
function calculate(): number {
  const result = 42;
  // const unused = 'will warn'; // Would cause error with the flag
  return result;
}
console.log(calculate());

// Unit test example (Vitest style)
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// In a real test file:
// import { describe, it, expect } from 'vitest';
// describe('Calculator', () => {
//   it('should add correctly', () => {
//     expect(calc.add(2, 3)).toBe(5);
//   });
// });

console.log('Calc add:', calc.add(5, 3));
console.log('Calc subtract:', calc.subtract(10, 4));
`,
  14: `// React component types (conceptual — for learning)
// This demonstrates TS patterns used in React

// Props type
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: () => void;
}

function Button(props: ButtonProps): string {
  const { label, variant = 'primary', disabled, onClick } = props;
  return \`<button class="\${variant}" \${disabled ? 'disabled' : ''}>\${label}</button>\`;
}

console.log(Button({ label: 'Submit', onClick: () => {} }));

// Generic component pattern
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => string;
}

function List<T>(props: ListProps<T>): string {
  return props.items.map(props.renderItem).join('\\n');
}

const numbers = [1, 2, 3];
const rendered = List<number>({
  items: numbers,
  renderItem: (n) => \`Item: \${n}\`,
});
console.log(rendered);

// Custom hook type pattern
function useCounter(initial: number = 0) {
  let count = initial;
  return {
    get count(): number { return count; },
    increment: () => { count++; },
    decrement: () => { count--; },
    reset: () => { count = initial; },
  };
}

const counter = useCounter(10);
counter.increment();
counter.increment();
console.log('Counter:', counter.count);
counter.decrement();
console.log('Counter after dec:', counter.count);
counter.reset();
console.log('Counter after reset:', counter.count);
`,
  15: `// Express-like API types (conceptual — demonstrates backend TS)

// Request & Response types
interface ApiRequest<T = any> {
  body: T;
  params: Record<string, string>;
  query: Record<string, string>;
  headers: Record<string, string>;
}

interface ApiResponse {
  status(code: number): ApiResponse;
  json(data: unknown): string;
}

// Simple router type
type RouteHandler = (req: ApiRequest, res: ApiResponse) => string;

interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  handler: RouteHandler;
}

class Router {
  private routes: Route[] = [];
  get(path: string, handler: RouteHandler): void {
    this.routes.push({ method: 'GET', path, handler });
  }
  post(path: string, handler: RouteHandler): void {
    this.routes.push({ method: 'POST', path, handler });
  }
}

// DTO (Data Transfer Object) pattern
interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
}

// Zod-like validation (simplified)
function validateCreateUser(data: unknown): CreateUserDTO {
  const dto = data as CreateUserDTO;
  if (!dto.name || !dto.email || !dto.password) {
    throw new Error('Missing required fields');
  }
  return { name: dto.name, email: dto.email, password: dto.password };
}

try {
  const valid = validateCreateUser({
    name: 'Budi',
    email: 'budi@mail.com',
    password: 'secret123',
  });
  console.log('Validated DTO:', valid);
} catch (e) {
  console.error(e);
}

// Middleware type
type Middleware = (req: ApiRequest, res: ApiResponse, next: () => void) => void;

function loggerMiddleware(req: ApiRequest, _res: ApiResponse, next: () => void): void {
  console.log(\`\${new Date().toISOString()} \${req.method} \${req.path}\`);
  next();
}
`,
  16: `// Full-stack TypeScript demo — combines all concepts

// === Shared Types ===
interface User {
  id: number;
  name: string;
  email: string;
}

type ApiResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
  | { status: 'loading' };

// === Generic API Client ===
class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(path: string): Promise<ApiResult<T>> {
    try {
      const res = await fetch(\`\${this.baseUrl}\${path}\`);
      const data = await res.json();
      return { status: 'success', data };
    } catch (err) {
      return {
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
}

// === Repository Pattern ===
interface Repository<T> {
  findAll(): Promise<ApiResult<T[]>>;
  findById(id: number): Promise<ApiResult<T>>;
  create(data: Partial<T>): Promise<ApiResult<T>>;
}

class UserRepository implements Repository<User> {
  constructor(private client: ApiClient) {}
  async findAll() { return this.client.get<User[]>('/users'); }
  async findById(id: number) { return this.client.get<User>(\`/users/\${id}\`); }
  async create(data: Partial<User>) { return this.client.get<User>('/users'); }
}

// === Usage demo (no actual network call) ===
const repo = new UserRepository(new ApiClient('https://api.example.com'));
console.log('Repository pattern ready');
console.log('Type-safe from API to UI layer');

// === Type-safe state reducer ===
type Action =
  | { type: 'SET_USER'; user: User }
  | { type: 'CLEAR_USER' }
  | { type: 'SET_LOADING'; loading: boolean };

type State = {
  user: User | null;
  loading: boolean;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.user, loading: false };
    case 'CLEAR_USER': return { ...state, user: null };
    case 'SET_LOADING': return { ...state, loading: action.loading };
    default: return state;
  }
}

const initialState: State = { user: null, loading: false };
const newState = reducer(initialState, {
  type: 'SET_USER',
  user: { id: 1, name: 'Budi', email: 'budi@mail.com' },
});
console.log('State after reducer:', newState);
console.log('✅ Final Project — all TypeScript concepts applied!');
`,
};

// Explanation content per module
function getExplanation(mod, isId) {
  const E = {
    1: { id: 'TypeScript adalah superset JavaScript yang menambahkan tipe statis. Kode TypeScript dikompilasi menjadi JavaScript biasa. Gunakan `tsc nama-file.ts` untuk kompilasi. File `tsconfig.json` mengatur opsi kompilasi seperti `strict`, `target`, dan `module`. Type inference memungkinkan TypeScript menebak tipe secara otomatis.', en: 'TypeScript is a JavaScript superset that adds static types. TypeScript code compiles to plain JavaScript. Use `tsc filename.ts` to compile. The `tsconfig.json` file configures options like `strict`, `target`, and `module`. Type inference lets TypeScript guess types automatically.' },
    2: { id: 'Tipe primitif: `string`, `number`, `boolean`. Array: `number[]` atau `Array<number>`. Tuple: `[string, number]` untuk array dengan panjang tetap. `any` mematikan type checking — hindari. `unknown` aman karena harus dipersempit dulu. `never` untuk fungsi yang tidak pernah selesai. `void` untuk fungsi tanpa return.', en: 'Primitive types: `string`, `number`, `boolean`. Arrays: `number[]` or `Array<number>`. Tuples: `[string, number]` for fixed-length arrays. `any` disables type checking — avoid it. `unknown` is safe because it must be narrowed first. `never` for functions that never complete. `void` for functions with no return.' },
    3: { id: 'Tipe fungsi: `(param: Tipe) => ReturnType`. Parameter opsional dengan `?`. Default parameter: `nama = "default"`. Rest parameter: `...args: number[]`. Function overloads memungkinkan beberapa signature untuk satu fungsi. Arrow function bisa diberi tipe eksplisit.', en: 'Function types: `(param: Type) => ReturnType`. Optional params with `?`. Default params: `name = "default"`. Rest params: `...args: number[]`. Function overloads allow multiple signatures for one function. Arrow functions can have explicit types.' },
    4: { id: '`interface` mendefinisikan bentuk objek. `type` alias bisa untuk union/intersection. `readonly` mencegah modifikasi properti. `?` untuk properti opsional. `extends` mewarisi interface lain. Index signature `[key: string]: Tipe` untuk properti dinamis.', en: '`interface` defines object shapes. `type` aliases work for unions/intersections. `readonly` prevents property modification. `?` for optional properties. `extends` inherits from other interfaces. Index signatures `[key: string]: Type` for dynamic properties.' },
    5: { id: 'Union `A | B` berarti bisa A atau B. Intersection `A & B` menggabungkan kedua tipe. Literal type membatasi nilai spesifik seperti `"active" | "inactive"`. Template literal types membuat string pattern. Discriminated union menggunakan field `kind` untuk membedakan varian.', en: 'Union `A | B` means either A or B. Intersection `A & B` combines both types. Literal types restrict to specific values like `"active" | "inactive"`. Template literal types create string patterns. Discriminated unions use a `kind` field to distinguish variants.' },
    6: { id: 'Type narrowing mempersempit tipe union berdasarkan kondisi. `typeof` guard untuk primitif. `instanceof` untuk class. Discriminated union dengan switch sangat ampuh. Type predicate (`pet is Fish`) memberi tahu TypeScript tentang tipe hasil fungsi.', en: 'Type narrowing narrows union types based on conditions. `typeof` guards for primitives. `instanceof` for classes. Discriminated unions with switch are powerful. Type predicates (`pet is Fish`) tell TypeScript about function return types.' },
    7: { id: 'Generik membuat kode reusable tanpa kehilangan type safety. `<T>` menangkap tipe yang digunakan. Constraint `extends` membatasi tipe yang bisa digunakan. Generic interface membuat struktur data type-safe. Default type menyediakan tipe fallback.', en: 'Generics make code reusable without losing type safety. `<T>` captures the type used. `extends` constraints limit usable types. Generic interfaces create type-safe data structures. Default types provide fallback types.' },
    8: { id: 'Conditional types: `T extends U ? X : Y`. Mapped types: `{ [K in keyof T]: NewType }`. `keyof` mengambil key union. `typeof` mengambil tipe runtime. Indexed access: `T["key"]`. `infer` menangkap tipe dalam conditional untuk ekstraksi.', en: 'Conditional types: `T extends U ? X : Y`. Mapped types: `{ [K in keyof T]: NewType }`. `keyof` gets key union. `typeof` gets runtime type. Indexed access: `T["key"]`. `infer` captures types inside conditionals for extraction.' },
    9: { id: 'Utility types bawaan TypeScript: `Partial<T>` — semua opsional, `Required<T>` — semua wajib, `Readonly<T>` — semua tidak bisa diubah, `Pick<T,K>` — pilih properti, `Omit<T,K>` — kecualikan properti, `Record<K,T>` — dictionary, `Exclude/Extract` — manipulasi union.', en: 'Built-in TypeScript utility types: `Partial<T>` — all optional, `Required<T>` — all required, `Readonly<T>` — all immutable, `Pick<T,K>` — select properties, `Omit<T,K>` — exclude properties, `Record<K,T>` — dictionary, `Exclude/Extract` — union manipulation.' },
    10: { id: 'Class TypeScript: properti harus dideklarasikan dengan tipe. Access modifiers: `public`, `private`, `protected`. Parameter properties: `constructor(public nama: string)`. `implements` memaksa class mengikuti interface. Abstract class tidak bisa diinstansiasi langsung.', en: 'TypeScript classes: properties must be declared with types. Access modifiers: `public`, `private`, `protected`. Parameter properties: `constructor(public name: string)`. `implements` forces a class to follow an interface. Abstract classes cannot be instantiated directly.' },
    11: { id: 'Module ES6: `export` dan `import` untuk berbagi kode dan tipe. Declaration file `.d.ts` untuk library JavaScript tanpa tipe. `@types` packages menyediakan tipe untuk library populer. Ambient declarations dengan `declare module` untuk kode global.', en: 'ES6 modules: `export` and `import` for sharing code and types. Declaration files `.d.ts` for JavaScript libraries without types. `@types` packages provide types for popular libraries. Ambient declarations with `declare module` for global code.' },
    12: { id: '`satisfies` mengecek tipe tanpa mengubah inferred type. Branded types menambahkan nominal typing. Assertion functions: `asserts val is Type`. `never` untuk exhaustive checking di switch. Covariance/contravariance mengatur kompatibilitas tipe kompleks.', en: '`satisfies` checks types without changing inferred types. Branded types add nominal typing. Assertion functions: `asserts val is Type`. `never` for exhaustive checking in switches. Covariance/contravariance govern complex type compatibility.' },
    13: { id: '`strict: true` mengaktifkan semua strict flag. `noImplicitAny` mewajibkan tipe eksplisit. `strictNullChecks` membedakan `T | null`. `noUnusedLocals` membersihkan kode. `typescript-eslint` menegakkan aturan TypeScript. Vitest mendukung TypeScript natively.', en: '`strict: true` enables all strict flags. `noImplicitAny` requires explicit types. `strictNullChecks` distinguishes `T | null`. `noUnusedLocals` cleans up code. `typescript-eslint` enforces TypeScript rules. Vitest supports TypeScript natively.' },
    14: { id: 'TypeScript di React: tipe props dengan interface. Generic components untuk reusable UI. Event types: `React.ChangeEvent`, `React.MouseEvent`. Custom hooks bisa memiliki tipe parameter dan return yang ketat. Context dengan tipe mengurangi runtime error.', en: 'TypeScript in React: type props with interfaces. Generic components for reusable UI. Event types: `React.ChangeEvent`, `React.MouseEvent`. Custom hooks can have strict parameter and return types. Context with types reduces runtime errors.' },
    15: { id: 'Backend TypeScript: tipe Request dan Response Express. Middleware dengan type signature. Zod untuk validasi runtime yang type-safe. DTO pattern memisahkan input/output types. Database query result harus di-tipe untuk mencegah akses properti undefined.', en: 'Backend TypeScript: Express Request and Response types. Middleware with type signatures. Zod for type-safe runtime validation. DTO pattern separates input/output types. Database query results must be typed to prevent undefined property access.' },
    16: { id: 'Proyek akhir menggabungkan: generic API client, repository pattern, discriminated union untuk state management, type assertion, dan interface contracts. Type-safe dari database hingga UI. End-to-end type safety adalah tujuan utama TypeScript.', en: 'Final project combines: generic API client, repository pattern, discriminated unions for state management, type assertions, and interface contracts. Type-safe from database to UI. End-to-end type safety is TypeScript\'s primary goal.' },
  };
  return E[mod][isId ? 'id' : 'en'];
}

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => `- ${o}`).join('\n');
  const code = CODE[mod.id];
  const explanation = getExplanation(mod.id, isId);
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? `${mod.id + 1}. ${nextModule.lid}` : `${nextModule.len}`)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const experiments = isId
    ? `Ubah tipe data di setiap fungsi dan lihat error kompilasi,Tambah properti baru ke interface dan update implementasinya,Ganti \`any\` dengan \`unknown\` dan tambahkan type guard,Coba kombinasi union dan intersection type yang berbeda`
    : `Change data types in each function and see compilation errors,Add new properties to interfaces and update implementations,Replace \`any\` with \`unknown\` and add type guards,Try different union and intersection type combinations`;

  const challenge = isId
    ? `Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan type annotation eksplisit di setiap variable dan function. Pastikan tidak ada \`any\`. Tambahkan komentar yang menjelaskan tipe yang digunakan.`
    : `Build a program applying this week's concepts in a real case study. Use explicit type annotations on every variable and function. Ensure no \`any\`. Add comments explaining the types used.`;

  const summary = isId
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **${nextWeek}**.`;

  const experimentBullets = experiments.split(',')
    .filter(Boolean)
    .map((e) => `- ${e.trim()}`)
    .join('\n');

  const expBullets = experimentBullets || (isId ? '- Eksperimen dengan kode di atas' : '- Experiment with the code above');

  return `# ${title}

> TypeScript | ${isId ? `Modul ${mod.id}` : `Module ${mod.id}`}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objectives}

---

## ${isId ? 'Program' : 'Program'}: ${programTitle}

\`\`\`typescript
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${explanation}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${expBullets}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${challenge}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${summary}
`;
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', `week${mod.id}-${mod.f}.md`), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', `week${mod.id}-${mod.f}.md`), enContent, 'utf8');
  console.log(`  ${mod.id}. ${mod.lid} / ${mod.len}`);
}

console.log(`\n✓ Generated ${MODULES.length * 2} TypeScript curriculum files (${MODULES.length} modules × 2 languages)`);
console.log(`  Output: ${BASE}`);
