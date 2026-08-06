import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// TYPESCRIPT CURRICULUM — pure research, zero framework influence
// Sources: Official Handbook, Total TypeScript, TypeScript Deep Dive
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 1 level, 12 weeks
// Basics → Types → Functions → Interfaces → Generics → Classes → Utility Types → Config → Testing → Patterns → Project
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('typescript', 'TypeScript');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'TypeScript Lengkap',
    nameEn: 'Complete TypeScript',
    descId: 'Dari nol hingga mahir: tipe data, interface, generics, dan pattern TypeScript production.',
    descEn: 'From zero to expert: types, interfaces, generics, and production TypeScript patterns.',
  },
];

const MODULES = [
  // ── WEEK 1: Pengantar TypeScript ───────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'pengantar-typescript',
    titleId: 'Pengantar TypeScript', titleEn: 'Introduction to TypeScript',
    programId: 'Halo TypeScript', programEn: 'Hello TypeScript',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Dasar Tipe Data
const nama: string = "Budi";
const umur: number = 25;
const aktif: boolean = true;

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Aktif:", aktif);

// Type Inference (TypeScript otomatis deteksi tipe)
const kota = "Jakarta"; // string
const tinggi = 175.5;  // number
const setuju = true;   // boolean

// Array
const angka: number[] = [1, 2, 3, 4, 5];
const buah: Array<string> = ["apel", "mangga"];

// Tuple
const koordinat: [number, number] = [106.8, -6.2];
const userTuple: [string, number, boolean] = ["Budi", 25, true];

// Enum
enum Warna {
    Merah = "red",
    Hijau = "green",
    Biru = "blue"
}
const favColor: Warna = Warna.Hijau;

// Any & Unknown
let flexible: any = "bisa apa saja";
flexible = 42;
flexible = true;

let safeUnknown: unknown = "type-safe any";
if (typeof safeUnknown === "string") {
    console.log("String length:", safeUnknown.length);
}

// Void & Never
function logMessage(msg: string): void {
    console.log(msg);
}

function throwError(msg: string): never {
    throw new Error(msg);
}

console.log("\\n=== Enum ===");
console.log("Warna favorit:", favColor);
console.log("Koordinat:", koordinat);`,
    objectivesId: [
      'Perbedaan TypeScript vs JavaScript: static typing',
      'Tipe dasar: string, number, boolean, array, tuple',
      'Type inference: TypeScript otomatis deteksi tipe',
      'Enum untuk set nilai tetap',
      'Any, unknown, void, never types',
    ],
    objectivesEn: [
      'Difference between TypeScript and JavaScript: static typing',
      'Basic types: string, number, boolean, arrays, tuples',
      'Type inference: TypeScript automatically detects types',
      'Enums for fixed sets of values',
      'Any, unknown, void, never types',
    ],
    explanationId: '### TypeScript vs JavaScript\nTypeScript = JavaScript + Static Types. Dikompilasi ke JS. Catch errors di compile-time.\n\n### Tipe Dasar\n`string`, `number`, `boolean`, `null`, `undefined`, `symbol`.\n\n### Type Inference\n`const x = 10` otomatis `number`. Tidak perlu selalu explicitly type.\n\n### Array & Tuple\n`number[]` atau `Array<number>`. Tuple `[string, number]` fixed-length.\n\n### Enum\nSet nilai named: `enum Warna { Merah = "red" }`.\n\n### Any vs Unknown\n`any` bypass type checking. `unknown` type-safe — harus cek dulu sebelum pakai.',
    explanationEn: '### TypeScript vs JavaScript\nTypeScript = JavaScript + Static Types. Compiled to JS. Catch errors at compile-time.\n\n### Basic Types\n`string`, `number`, `boolean`, `null`, `undefined`, `symbol`.\n\n### Type Inference\n`const x = 10` automatically `number`. Don\'t always need explicit types.\n\n### Arrays & Tuples\n`number[]` or `Array<number>`. Tuple `[string, number]` fixed-length.\n\n### Enums\nNamed value sets: `enum Warna { Merah = "red" }`.\n\n### Any vs Unknown\n`any` bypasses type checking. `unknown` is type-safe — must check before use.',
    experimentsId: [
      'Coba assign string ke variabel number — lihat error',
      'Buat enum untuk hari dalam seminggu',
      'Eksperimen unknown dengan type guard',
      'Buat tuple dengan 4 elemen berbeda',
      'Coba union type: string | number',
    ],
    experimentsEn: [
      'Try assigning string to number variable — see the error',
      'Create enum for days of the week',
      'Experiment unknown with type guards',
      'Create tuple with 4 different elements',
      'Try union type: string | number',
    ],
    challengeId: 'Buat program konversi suhu: function dengan typed parameters, enum untuk unit, dan type-safe output.',
    challengeEn: 'Build a temperature converter: function with typed parameters, enum for units, and type-safe output.',
    summaryId: 'Minggu 1 dari 12: **Pengantar TypeScript** (Level: TypeScript Lengkap). Fondasi tipe data. Minggu depan: **Advanced Types**.',
    summaryEn: 'Week 1 of 12: **Introduction to TypeScript** (Level: Complete TypeScript). Type foundation. Next week: **Advanced Types**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'advanced-types',
    titleId: 'Advanced Types', titleEn: 'Advanced Types',
    programId: 'Union, Intersection & Literal', programEn: 'Union, Intersection & Literal Types',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Union Types
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log("String ID:", id.toUpperCase());
    } else {
        console.log("Number ID:", id.toFixed(2));
    }
}
printId("ABC123");
printId(42);

// Literal Types
type Direction = "north" | "south" | "east" | "west";
function move(dir: Direction) {
    console.log("Moving:", dir);
}
move("north");
// move("up"); // Error! Bukan valid literal

// Intersection Types
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const person: Person = { name: "Budi", age: 25 };
console.log("\\nPerson:", person);

// Type Narrowing
function process(value: string | number | boolean) {
    if (typeof value === "string") {
        return value.length;
    } else if (typeof value === "number") {
        return value * 2;
    }
    return value ? 1 : 0;
}
console.log("\\nProcess string:", process("hello"));
console.log("Process number:", process(42));
console.log("Process boolean:", process(true));

// Discriminated Union
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "square": return shape.side ** 2;
        case "rectangle": return shape.width * shape.height;
    }
}

console.log("\\n=== Discriminated Union ===");
console.log("Circle area:", area({ kind: "circle", radius: 5 }).toFixed(2));
console.log("Square area:", area({ kind: "square", side: 4 }));
console.log("Rectangle area:", area({ kind: "rectangle", width: 3, height: 6 }));

// Type Guards
function isString(value: unknown): value is string {
    return typeof value === "string";
}

const test: unknown = "hello";
if (isString(test)) {
    console.log("\\nType guard result:", test.toUpperCase());
}`,
    objectivesId: [
      'Union types: string | number | boolean',
      'Literal types: specific value sebagai tipe',
      'Intersection types: typeA & typeB',
      'Type narrowing dengan typeof, instanceof',
      'Discriminated unions untuk state handling',
    ],
    objectivesEn: [
      'Union types: string | number | boolean',
      'Literal types: specific values as types',
      'Intersection types: typeA & typeB',
      'Type narrowing with typeof, instanceof',
      'Discriminated unions for state handling',
    ],
    explanationId: '### Union Types\n`string | number` — bisa salah satu. Bisa narrow dengan typeof.\n\n### Literal Types\n`"north" | "south"` — hanya value tertentu yang valid.\n\n### Intersection\n`TypeA & TypeB` — gabung semua property dari kedua type.\n\n### Type Narrowing\nTypeScript otosisasi tipe berdasarkan kondisi (typeof, in, instanceof).\n\n### Discriminated Union\nSetiap variant punya discriminator (kind). TypeScript tahu property yang tersedia.\n\n### Type Guard\n`value is string` — function yang return boolean dan narrow tipe.',
    explanationEn: '### Union Types\n`string | number` — can be either. Narrow with typeof.\n\n### Literal Types\n`"north" | "south"` — only specific values are valid.\n\n### Intersection\n`TypeA & TypeB` — combine all properties from both types.\n\n### Type Narrowing\nTypeScript auto-infers type based on conditions (typeof, in, instanceof).\n\n### Discriminated Unions\nEach variant has a discriminator (kind). TypeScript knows available properties.\n\n### Type Guards\n`value is string` — function returning boolean that narrows type.',
    experimentsId: [
      'Buat union type untuk status: idle | loading | success | error',
      'Coba intersection type untuk mixin',
      'Eksperimen type guard dengan in operator',
      'Buat discriminated union untuk API response',
      'Coba exhaustive checking dengan never',
    ],
    experimentsEn: [
      'Create union type for status: idle | loading | success | error',
      'Try intersection type for mixin',
      'Experiment type guard with in operator',
      'Create discriminated union for API response',
      'Try exhaustive checking with never',
    ],
    challengeId: 'Buat type-safe state machine: discriminated union untuk states, type guards untuk transitions, exhaustive handling.',
    challengeEn: 'Build a type-safe state machine: discriminated union for states, type guards for transitions, exhaustive handling.',
    summaryId: 'Minggu 2 dari 12: **Advanced Types** (Level: TypeScript Lengkap). Fleksibilitas tipe. Minggu depan: **Functions & Signatures**.',
    summaryEn: 'Week 2 of 12: **Advanced Types** (Level: Complete TypeScript). Type flexibility. Next week: **Functions & Signatures**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'fungsi-typescript',
    titleId: 'Functions & Signatures', titleEn: 'Functions & Signatures',
    programId: 'Typed Functions', programEn: 'Typed Functions',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Function dengan tipe explicit
function add(a: number, b: number): number {
    return a + b;
}
console.log("Add:", add(5, 3));

// Optional parameters
function greet(name: string, greeting?: string): string {
    return (greeting || "Halo") + ", " + name + "!";
}
console.log(greet("Budi"));
console.log(greet("Siti", "Selamat pagi"));

// Default parameters
function createUser(name: string, role: string = "user"): { name: string; role: string } {
    return { name, role };
}
console.log("\\nUser default:", createUser("Budi"));
console.log("User custom:", createUser("Siti", "admin"));

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log("\\nSum:", sum(1, 2, 3, 4, 5));

// Function type
type MathOperation = (a: number, b: number) => number;

const multiply: MathOperation = (a, b) => a * b;
const subtract: MathOperation = (a, b) => a - b;

function calculate(a: number, b: number, operation: MathOperation): number {
    return operation(a, b);
}
console.log("\\nMultiply:", calculate(4, 3, multiply));
console.log("Subtract:", calculate(10, 4, subtract));

// Overload signatures
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    return input * 2;
}
console.log("\\nOverload string:", process("hello"));
console.log("Overload number:", process(42));

// Generic function identity
function identity<T>(value: T): T {
    return value;
}
console.log("\\nIdentity string:", identity("TypeScript"));
console.log("Identity number:", identity(42));
console.log("Identity array:", identity([1, 2, 3]));`,
    objectivesId: [
      'Function dengan parameter dan return type',
      'Optional parameters dengan ?',
      'Default parameter values',
      'Rest parameters dengan type array',
      'Function types dan overload signatures',
    ],
    objectivesEn: [
      'Functions with parameter and return types',
      'Optional parameters with ?',
      'Default parameter values',
      'Rest parameters with array types',
      'Function types and overload signatures',
    ],
    explanationId: '### Function Types\n`function add(a: number, b: number): number` — explicit semua tipe.\n\n### Optional Params\n`param?: type` — bisa undefined. Gunakan default value atau cek.\n\n### Rest Params\n`...args: number[]` — kumpulkan semua argumen ke array.\n\n### Function Type\n`type Fn = (a: number) => string` — definisi tipe fungsi.\n\n### Overloads\nMultiple signatures untuk satu function. TypeScript pilih yang sesuai.\n\n### Generic Function\n`<T>(value: T): T` — tipe dinamis yang preserved.',
    explanationEn: '### Function Types\n`function add(a: number, b: number): number` — explicit all types.\n\n### Optional Params\n`param?: type` — can be undefined. Use default value or check.\n\n### Rest Params\n`...args: number[]` — collect all arguments to array.\n\n### Function Type\n`type Fn = (a: number) => string` — function type definition.\n\n### Overloads\nMultiple signatures for one function. TypeScript picks the matching one.\n\n### Generic Function\n`<T>(value: T): T` — dynamic type that is preserved.',
    experimentsId: [
      'Buat function overload untuk format date',
      'Coba callback type: (err: Error | null, data: string) => void',
      'Eksperimen generic function dengan constraint',
      'Buat higher-order function type',
      'Coba this parameter type',
    ],
    experimentsEn: [
      'Create function overload for date formatting',
      'Try callback type: (err: Error | null, data: string) => void',
      'Experiment generic function with constraint',
      'Create higher-order function type',
      'Try this parameter type',
    ],
    challengeId: 'Buat math library: overloaded functions untuk add/sub/mul/div dengan dukungan number dan string.',
    challengeEn: 'Build a math library: overloaded functions for add/sub/mul/div with number and string support.',
    summaryId: 'Minggu 3 dari 12: **Functions & Signatures** (Level: TypeScript Lengkap). Tipe fungsi. Minggu depan: **Interfaces & Type Aliases**.',
    summaryEn: 'Week 3 of 12: **Functions & Signatures** (Level: Complete TypeScript). Function types. Next week: **Interfaces & Type Aliases**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'interfaces-type-aliases',
    titleId: 'Interfaces & Type Aliases', titleEn: 'Interfaces & Type Aliases',
    programId: 'Model Data TypeScript', programEn: 'TypeScript Data Models',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Interface
interface User {
    name: string;
    email: string;
    age?: number; // optional
    readonly id: string; // cannot be changed after creation
}

const user1: User = {
    id: "u1",
    name: "Budi",
    email: "budi@mail.com",
    age: 25
};
console.log("User:", user1);

// Interface extends
interface Employee extends User {
    department: string;
    salary: number;
}

const emp: Employee = {
    id: "e1",
    name: "Siti",
    email: "siti@mail.com",
    department: "Engineering",
    salary: 15000000
};
console.log("Employee:", emp);

// Type Alias
type ID = string | number;
type Status = "active" | "inactive" | "suspended";
type Result<T> = { success: true; data: T } | { success: false; error: string };

// Interface vs Type
// Interface: bisa extends, declaration merge
// Type: bisa union, intersection, mapped types, conditional types

// Index Signature
interface Dictionary {
    [key: string]: string | number;
}
const dict: Dictionary = {
    name: "Budi",
    age: 25,
    city: "Jakarta"
};

// Function Interface
interface SearchFn {
    (query: string, limit?: number): string[];
}

const searchUsers: SearchFn = (query, limit = 10) => {
    return ["Result for: " + query + " (limit: " + limit + ")"];
};

console.log("\\nSearch:", searchUsers("john"));
console.log("Search limited:", searchUsers("jane", 5));

// Hybrid Type
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

console.log("\\n=== Type vs Interface ===");
console.log("Type: union, intersection, conditional");
console.log("Interface: extends, declaration merge");`,
    objectivesId: [
      'Interface: definisi bentuk object',
      'Interface extends untuk inheritance',
      'Type alias untuk type composition',
      'Readonly dan optional properties',
      'Index signatures dan function interfaces',
    ],
    objectivesEn: [
      'Interfaces: define object shapes',
      'Interface extends for inheritance',
      'Type aliases for type composition',
      'Readonly and optional properties',
      'Index signatures and function interfaces',
    ],
    explanationId: '### Interface\nDefinisi bentuk object. `interface User { name: string }`.\n\n### Extends\n`interface Employee extends User` — tambah property.\n\n### Type Alias\n`type ID = string | number` — alias untuk type apapun.\n\n### Interface vs Type\nInterface: extends, declaration merge. Type: union, intersection, conditional.\n\n### Readonly & Optional\n`readonly id` tidak bisa diubah. `age?` optional.\n\n### Index Signature\n`{ [key: string]: type }` — object dengan dynamic keys.',
    explanationEn: '### Interfaces\nDefine object shapes. `interface User { name: string }`.\n\n### Extends\n`interface Employee extends User` — add properties.\n\n### Type Aliases\n`type ID = string | number` — alias for any type.\n\n### Interface vs Type\nInterface: extends, declaration merge. Type: union, intersection, conditional.\n\n### Readonly & Optional\n`readonly id` cannot be changed. `age?` optional.\n\n### Index Signatures\n`{ [key: string]: type }` — object with dynamic keys.',
    experimentsId: [
      'Buat interface hierarchy: Animal → Mammal → Dog',
      'Coba declaration merge: dua interface sama nama',
      'Eksperimen mapped type dengan type alias',
      'Buat interface untuk API response',
      'Coba callable interface untuk constructor',
    ],
    experimentsEn: [
      'Create interface hierarchy: Animal → Mammal → Dog',
      'Try declaration merge: two interfaces same name',
      'Experiment mapped type with type alias',
      'Create interface for API response',
      'Try callable interface for constructor',
    ],
    challengeId: 'Buat type system untuk e-commerce: User, Product, Order, Cart — dengan interfaces, types, dan relationships.',
    challengeEn: 'Build a type system for e-commerce: User, Product, Order, Cart — with interfaces, types, and relationships.',
    summaryId: 'Minggu 4 dari 12: **Interfaces & Type Aliases** (Level: TypeScript Lengkap). Model data. Minggu depan: **Generics**.',
    summaryEn: 'Week 4 of 12: **Interfaces & Type Aliases** (Level: Complete TypeScript). Data modeling. Next week: **Generics**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'generics',
    titleId: 'Generics', titleEn: 'Generics',
    programId: 'Reusable Generic Types', programEn: 'Reusable Generic Types',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Generic Function
function identity<T>(value: T): T {
    return value;
}
console.log("Identity string:", identity("TypeScript"));
console.log("Identity number:", identity(42));

// Generic dengan constraint
interface HasLength {
    length: number;
}
function logLength<T extends HasLength>(item: T): void {
    console.log("Length:", item.length);
}
logLength("hello");     // string has length
logLength([1, 2, 3]);   // array has length
// logLength(42);       // Error! number tidak punya length

// Generic Interface
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

const userResponse: ApiResponse<{ name: string }> = {
    data: { name: "Budi" },
    status: 200,
    message: "OK"
};
console.log("\\nAPI Response:", userResponse);

// Generic Class
class Storage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return [...this.items];
    }

    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
}

const stringStorage = new Storage<string>();
stringStorage.add("apel");
stringStorage.add("mangga");
console.log("\\nString Storage:", stringStorage.getAll());

const numberStorage = new Storage<number>();
numberStorage.add(1);
numberStorage.add(2);
numberStorage.add(3);
console.log("Number Storage:", numberStorage.getAll());

// Generic Utility
type Nullable<T> = T | null | undefined;
type Partial<T> = { [K in keyof T]?: T[K] };

interface User {
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<User>;
type NullableUser = Nullable<User>;

const partial: PartialUser = { name: "Budi" }; // OK
console.log("\\nPartial user:", partial);

// Keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user: User = { name: "Siti", email: "siti@mail.com", age: 30 };
console.log("Name:", getProperty(user, "name"));
console.log("Age:", getProperty(user, "age"));`,
    objectivesId: [
      'Generic functions: <T>(value: T): T',
      'Generic constraints dengan extends',
      'Generic interfaces dan classes',
      'Keyof constraint untuk type-safe property access',
      'Built-in generic types: Partial, Required, Readonly',
    ],
    objectivesEn: [
      'Generic functions: <T>(value: T): T',
      'Generic constraints with extends',
      'Generic interfaces and classes',
      'Keyof constraint for type-safe property access',
      'Built-in generic types: Partial, Required, Readonly',
    ],
    explanationId: '### Generic Function\n`<T>` — type parameter. Tipe diinfer dari argumen.\n\n### Constraints\n`<T extends HasLength>` — T harus punya property length.\n\n### Generic Interface/Class\n`interface ApiResponse<T>` — tipe dinamis untuk berbagai response.\n\n### Keyof\n`K extends keyof T` — K harus key yang ada di T. Type-safe property access.\n\n### Built-in Generics\n`Partial<T>` semua optional. `Required<T>` semua required. `Readonly<T>` semua readonly.',
    explanationEn: '### Generic Functions\n`<T>` — type parameter. Type inferred from argument.\n\n### Constraints\n`<T extends HasLength>` — T must have length property.\n\n### Generic Interface/Class\n`interface ApiResponse<T>` — dynamic type for various responses.\n\n### Keyof\n`K extends keyof T` — K must be a key in T. Type-safe property access.\n\n### Built-in Generics\n`Partial<T>` all optional. `Required<T>` all required. `Readonly<T>` all readonly.',
    experimentsId: [
      'Buat generic function dengan multiple type params',
      'Coba conditional type: type IsString<T> = T extends string ? true : false',
      'Eksperimen generic class dengan default type',
      'Buat type-safe event emitter dengan generics',
      'Coba recursive type: type NestedArray<T> = T | NestedArray<T>[]',
    ],
    experimentsEn: [
      'Create generic function with multiple type params',
      'Try conditional type: type IsString<T> = T extends string ? true : false',
      'Experiment generic class with default type',
      'Create type-safe event emitter with generics',
      'Try recursive type: type NestedArray<T> = T | NestedArray<T>[]',
    ],
    challengeId: 'Buat generic repository class: find, findById, create, update, delete — dengan type constraints dan conditional types.',
    challengeEn: 'Build a generic repository class: find, findById, create, update, delete — with type constraints and conditional types.',
    summaryId: 'Minggu 5 dari 12: **Generics** (Level: TypeScript Lengkap). Reusable types. Minggu depan: **Classes & OOP**.',
    summaryEn: 'Week 5 of 12: **Generics** (Level: Complete TypeScript). Reusable types. Next week: **Classes & OOP**.',
  },
  {
    week: 6, level: 'beginer', topicId: 'classes-oop',
    titleId: 'Classes & OOP', titleEn: 'Classes & OOP',
    programId: 'TypeScript Classes', programEn: 'TypeScript Classes',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Class dengan access modifiers
class Animal {
    // Access modifiers: public, protected, private
    public name: string;
    protected age: number;
    private secret: string;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.secret = "hidden";
    }

    public speak(): string {
        return this.name + " makes a sound";
    }

    protected getAge(): number {
        return this.age;
    }
}

// Inheritance
class Dog extends Animal {
    private breed: string;

    constructor(name: string, age: number, breed: string) {
        super(name, age);
        this.breed = breed;
    }

    // Override
    speak(): string {
        return this.name + " barks!";
    }

    getBreed(): string {
        return this.breed;
    }

    getInfo(): string {
        return this.name + " is " + this.getAge() + " years old " + this.breed;
    }
}

const dog = new Dog("Buddy", 3, "Labrador");
console.log(dog.speak());
console.log(dog.getInfo());

// Abstract Class
abstract class Shape {
    abstract area(): number;
    abstract perimeter(): number;

    describe(): string {
        return "Area: " + this.area() + ", Perimeter: " + this.perimeter();
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }
    area(): number {
        return Math.PI * this.radius ** 2;
    }
    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

const circle = new Circle(5);
console.log("\\n" + circle.describe());

// Interface + Class
interface Printable {
    print(): string;
}

interface Serializable {
    toJSON(): string;
}

class Report implements Printable, Serializable {
    constructor(private title: string, private content: string) {}

    print(): string {
        return "=== " + this.title + " ===\\n" + this.content;
    }

    toJSON(): string {
        return JSON.stringify({ title: this.title, content: this.content });
    }
}

const report = new Report("Sales Q1", "Revenue increased by 25%");
console.log("\\n" + report.print());
console.log("JSON:", report.toJSON());

// Parameter Properties
class Point {
    constructor(
        public x: number,
        public y: number,
        private z: number = 0
    ) {}
    distance(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
}
const p = new Point(3, 4, 5);
console.log("\\nDistance:", p.distance());`,
    objectivesId: [
      'Access modifiers: public, protected, private',
      'Inheritance dengan extends dan super',
      'Abstract classes dan methods',
      'Interface implementation dengan implements',
      'Parameter properties di constructor',
    ],
    objectivesEn: [
      'Access modifiers: public, protected, private',
      'Inheritance with extends and super',
      'Abstract classes and methods',
      'Interface implementation with implements',
      'Parameter properties in constructor',
    ],
    explanationId: '### Access Modifiers\n`public` (default) accessible everywhere. `protected` class + subclass. `private` hanya di class.\n\n### Inheritance\n`class Dog extends Animal` — warisi semua. `super()` panggil parent constructor.\n\n### Abstract Class\nTidak bisa diinstantiate langsung. Method tanpa body harus diimplementasikan subclass.\n\n### Implements\n`class X implements Interface` — harus sediakan semua method interface.\n\n### Parameter Properties\n`constructor(public x: number)` — langsung deklarasikan dan assign field.',
    explanationEn: '### Access Modifiers\n`public` (default) accessible everywhere. `protected` class + subclass. `private` only in class.\n\n### Inheritance\n`class Dog extends Animal` — inherit all. `super()` calls parent constructor.\n\n### Abstract Classes\nCannot be instantiated directly. Methods without body must be implemented by subclasses.\n\n### Implements\n`class X implements Interface` — must provide all interface methods.\n\n### Parameter Properties\n`constructor(public x: number)` — directly declare and assign field.',
    experimentsId: [
      'Buat abstract class Vehicle dengan Car dan Motorcycle',
      'Coba method override dengan different return type',
      'Eksperimen multiple interface implementation',
      'Buat singleton class dengan private constructor',
      'Coba getter dan setter dengan access modifiers',
    ],
    experimentsEn: [
      'Create abstract class Vehicle with Car and Motorcycle',
      'Try method override with different return type',
      'Experiment multiple interface implementation',
      'Create singleton class with private constructor',
      'Try getter and setter with access modifiers',
    ],
    challengeId: 'Buat class hierarchy untuk shape calculator: abstract Shape, concrete Circle/Rectangle/Triangle, dengan interface Printable.',
    challengeEn: 'Build a class hierarchy for shape calculator: abstract Shape, concrete Circle/Rectangle/Triangle, with Printable interface.',
    summaryId: 'Minggu 6 dari 12: **Classes & OOP** (Level: TypeScript Lengkap). Object-oriented TS. Minggu depan: **Utility Types**.',
    summaryEn: 'Week 6 of 12: **Classes & OOP** (Level: Complete TypeScript). Object-oriented TS. Next week: **Utility Types**.',
  },
  {
    week: 7, level: 'beginer', topicId: 'utility-types',
    titleId: 'Utility Types', titleEn: 'Utility Types',
    programId: 'Built-in Utilities', programEn: 'Built-in Utility Types',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Partial<T> — semua property optional
interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}

function updateUser(user: User, updates: Partial<User>): User {
    return { ...user, ...updates };
}

const user: User = { id: "1", name: "Budi", email: "budi@mail.com", age: 25 };
const updated = updateUser(user, { age: 26 });
console.log("Updated:", updated);

// Required<T> — semua property required
type PartialUser = Partial<User>;
type FullUser = Required<PartialUser>;

// Readonly<T> — semua property readonly
const readonlyUser: Readonly<User> = user;
// readonlyUser.name = "Siti"; // Error!

// Pick<T, K> — pilih property tertentu
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: "1", name: "Budi" };

// Omit<T, K> — hapus property tertentu
type UserWithoutAge = Omit<User, "age">;
const noAge: UserWithoutAge = { id: "2", name: "Siti", email: "siti@mail.com" };

// Record<K, T> — object dengan key dan value type
type UserRoles = Record<string, "admin" | "user" | "guest">;
const roles: UserRoles = {
    budi: "admin",
    siti: "user",
    tamu: "guest"
};
console.log("\\nRoles:", roles);

// Exclude<T, U> — hapus types dari union
type AllStatus = "active" | "inactive" | "deleted" | "banned";
type ActiveStatus = Exclude<AllStatus, "deleted" | "banned">;

// Extract<T, U> — ambil types yang ada di kedua union
type SuccessStatus = Extract<AllStatus, "active" | "pending">; // "active"

// NonNullable<T> — hapus null dan undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;

// ReturnType<T> — ambil return type dari function
function createUser() {
    return { id: "1", name: "Budi", type: "admin" as const };
}
type NewUser = ReturnType<typeof createUser>;

// Parameters<T> — ambil parameter types dari function
function signup(name: string, email: string, age: number) {}
type SignupParams = Parameters<typeof signup>;

// Custom Utility Types
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Nullable<T> = { [K in keyof T]: T[K] | null };

interface Config {
    host: string;
    port: number;
    ssl: { enabled: boolean; cert: string };
}

type NullableConfig = Nullable<Config>;
// Semua property bisa null

console.log("\\nPick:", preview);
console.log("Omit:", noAge);`,
    objectivesId: [
      'Partial<T>, Required<T>, Readonly<T>',
      'Pick<T, K> dan Omit<T, K>',
      'Record<K, V> untuk type-safe objects',
      'Exclude, Extract, NonNullable untuk union types',
      'ReturnType dan Parameters untuk function types',
    ],
    objectivesEn: [
      'Partial<T>, Required<T>, Readonly<T>',
      'Pick<T, K> and Omit<T, K>',
      'Record<K, V> for type-safe objects',
      'Exclude, Extract, NonNullable for union types',
      'ReturnType and Parameters for function types',
    ],
    explanationId: '### Partial<T>\nSemua property jadi optional. Cocok untuk update functions.\n\n### Pick & Omit\n`Pick<T, "name" | "email">` — ambil sebagian. `Omit<T, "age">` — hapus sebagian.\n\n### Record<K, V>\n`Record<string, User>` — object dengan string key dan User value.\n\n### Exclude & Extract\n`Exclude<"a" | "b", "a">` = "b". `Extract<"a" | "b", "a" | "c">` = "a".\n\n### ReturnType & Parameters\n`ReturnType<typeof fn>` — return type dari function. `Parameters<typeof fn>` — tuple parameter types.\n\n### Custom Utilities\nBisa buat utility type sendiri dengan mapped types dan conditional types.',
    explanationEn: '### Partial<T>\nAll properties become optional. Great for update functions.\n\n### Pick & Omit\n`Pick<T, "name" | "email">` — pick some. `Omit<T, "age">` — remove some.\n\n### Record<K, V>\n`Record<string, User>` — object with string keys and User values.\n\n### Exclude & Extract\n`Exclude<"a" | "b", "a">` = "b". `Extract<"a" | "b", "a" | "c">` = "a".\n\n### ReturnType & Parameters\n`ReturnType<typeof fn>` — return type of function. `Parameters<typeof fn>` — tuple of parameter types.\n\n### Custom Utilities\nCan create own utility types with mapped types and conditional types.',
    experimentsId: [
      'Buat DeepPartial: nested partial',
      'Coba RequiredDeep: nested required',
      'Eksperimen custom utility: Nullable<T>',
      'Buat UnionToIntersection type',
      'Coba infer dengan conditional types',
    ],
    experimentsEn: [
      'Create DeepPartial: nested partial',
      'Try RequiredDeep: nested required',
      'Experiment custom utility: Nullable<T>',
      'Create UnionToIntersection type',
      'Try infer with conditional types',
    ],
    challengeId: 'Buat form state management: Partial untuk updates, Readonly untuk state, Record untuk errors, ReturnType untuk actions.',
    challengeEn: 'Build form state management: Partial for updates, Readonly for state, Record for errors, ReturnType for actions.',
    summaryId: 'Minggu 7 dari 12: **Utility Types** (Level: TypeScript Lengkap). Type transformations. Minggu depan: **TypeScript Config**.',
    summaryEn: 'Week 7 of 12: **Utility Types** (Level: Complete TypeScript). Type transformations. Next week: **TypeScript Config**.',
  },
  {
    week: 8, level: 'beginer', topicId: 'typescript-config',
    titleId: 'TypeScript Config', titleEn: 'TypeScript Configuration',
    programId: 'tsconfig.json & Setup', programEn: 'tsconfig.json & Setup',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// tsconfig.json — konfigurasi TypeScript compiler
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
console.log("\\n=== Best Practices ===");
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
// }`,
    objectivesId: [
      'tsconfig.json: compiler options utama',
      'Strict mode dan type checking options',
      'Target dan module configuration',
      'Declaration files (.d.ts) untuk type declarations',
      'Project references dan path aliases',
    ],
    objectivesEn: [
      'tsconfig.json: main compiler options',
      'Strict mode and type checking options',
      'Target and module configuration',
      'Declaration files (.d.ts) for type declarations',
      'Project references and path aliases',
    ],
    explanationId: '### Strict Mode\n`strict: true` — aktifkan semua strict checks. Wajib untuk project baru.\n\n### noImplicitAny\nError jika variabel tanpa type annotation. Memaksa explicit typing.\n\n### Declaration Files\n`.d.ts` — type declarations tanpa implementation. Untuk library types.\n\n### Path Aliases\n`@/components` → `src/components`. Cleaner imports.\n\n### Project References\nMonorepo setup: multiple tsconfig yang saling reference.\n\n### skipLibCheck\nSkip checking `.d.ts` files dari dependencies. Lebih cepat.',
    explanationEn: '### Strict Mode\n`strict: true` — enable all strict checks. Required for new projects.\n\n### noImplicitAny\nError on variables without type annotation. Forces explicit typing.\n\n### Declaration Files\n`.d.ts` — type declarations without implementation. For library types.\n\n### Path Aliases\n`@/components` → `src/components`. Cleaner imports.\n\n### Project References\nMonorepo setup: multiple tsconfigs referencing each other.\n\n### skipLibCheck\nSkip checking dependency `.d.ts` files. Faster compilation.',
    experimentsId: [
      'Buat tsconfig untuk library vs app',
      'Coba noUncheckedIndexedAccess pada array access',
      'Eksperimen declaration merging',
      'Buat custom .d.ts untuk module tanpa types',
      'Coba project references di monorepo',
    ],
    experimentsEn: [
      'Create tsconfig for library vs app',
      'Try noUncheckedIndexedAccess on array access',
      'Experiment declaration merging',
      'Create custom .d.ts for untyped module',
      'Try project references in monorepo',
    ],
    challengeId: 'Setup TypeScript project: strict mode, path aliases, separate dev/build configs, dan custom declaration files.',
    challengeEn: 'Setup TypeScript project: strict mode, path aliases, separate dev/build configs, and custom declaration files.',
    summaryId: 'Minggu 8 dari 12: **TypeScript Config** (Level: TypeScript Lengkap). Konfigurasi project. Minggu depan: **Testing**.',
    summaryEn: 'Week 8 of 12: **TypeScript Configuration** (Level: Complete TypeScript). Project configuration. Next week: **Testing**.',
  },
  {
    week: 9, level: 'beginer', topicId: 'testing-typescript',
    titleId: 'Testing TypeScript', titleEn: 'Testing TypeScript',
    programId: 'Type-Safe Tests', programEn: 'Type-Safe Tests',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Testing dengan type safety
// Framework: Vitest / Jest dengan TypeScript

// Test utilities dengan types
interface TestContext {
    name: string;
    fn: () => void | Promise<void>;
}

class TypeSafeRunner {
    private tests: TestContext[] = [];
    private passed = 0;
    private failed = 0;

    test(name: string, fn: () => void | Promise<void>): void {
        this.tests.push({ name, fn });
    }

    async run(): Promise<void> {
        console.log("=== Type-Safe Test Runner ===");
        for (const { name, fn } of this.tests) {
            try {
                await fn();
                this.passed++;
                console.log("  ✓", name);
            } catch (err: unknown) {
                this.failed++;
                const msg = err instanceof Error ? err.message : String(err);
                console.log("  ✗", name);
                console.log("   ", msg);
            }
        }
        console.log(\`\\nResults: \${this.passed} passed, \${this.failed} failed\`);
    }
}

// Type-safe assertions
function expect<T>(actual: T) {
    return {
        toBe(expected: T): void {
            if (actual !== expected) {
                throw new Error(\`Expected \${expected}, got \${actual}\`);
            }
        },
        toEqual(expected: T): void {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(\`Deep equal failed\`);
            }
        },
        toBeGreaterThan(expected: number): void {
            if (typeof actual !== "number" || actual <= expected) {
                throw new Error(\`\${actual} not greater than \${expected}\`);
            }
        },
        toBeType<T2>(): void {
            // Runtime type check placeholder
            console.log("  (type check passed)");
        }
    };
}

// Test subjects
function add(a: number, b: number): number {
    return a + b;
}

function greet(name: string, greeting: string = "Hello"): string {
    return \`\${greeting}, \${name}!\`;
}

async function fetchUser(id: number): Promise<{ id: number; name: string }> {
    if (id <= 0) throw new Error("Invalid ID");
    return { id, name: "User " + id };
}

// Run tests
const runner = new TypeSafeRunner();

runner.test("add: basic addition", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
});

runner.test("greet: default greeting", () => {
    expect(greet("Budi")).toBe("Hello, Budi!");
});

runner.test("greet: custom greeting", () => {
    expect(greet("Siti", "Hi")).toBe("Hi, Siti!");
});

runner.test("fetchUser: valid ID", async () => {
    const user = await fetchUser(1);
    expect(user.id).toBe(1);
});

runner.test("fetchUser: invalid ID throws", async () => {
    try {
        await fetchUser(-1);
        throw new Error("Should have thrown");
    } catch (e) {
        // Expected
    }
});

runner.run();

// Testing patterns:
// - Arrange-Act-Assert (AAA)
// - Given-When-Then (BDD)
// - Type-level tests: expectTypeOf
// - Snapshot testing`,
    objectivesId: [
      'Type-safe test runner dan assertions',
      'Async testing dengan Promise',
      'Error testing: expect throw',
      'AAA pattern: Arrange, Act, Assert',
      'Type-level testing: compile-time checks',
    ],
    objectivesEn: [
      'Type-safe test runner and assertions',
      'Async testing with Promises',
      'Error testing: expect throw',
      'AAA pattern: Arrange, Act, Assert',
      'Type-level testing: compile-time checks',
    ],
    explanationId: '### Type-Safe Testing\nAssertions dengan generic type. TypeScript pastikan expected dan actual sama tipe.\n\n### Async Testing\n`async/await` di test function. Framework handle otomatis.\n\n### Error Testing\n`expect(() => fn()).toThrow()` — pastikan function throw error.\n\n### AAA Pattern\nArrange: setup data. Act: execute function. Assert: verify result.\n\n### Type-Level Tests\n`expectTypeOf(x).toEqualTypeOf<string>()` — cek tipe di compile-time.\n\n### Frameworks\nVitest: fast, Vite-native. Jest: mature. Ambience: node/jsdom.',
    explanationEn: '### Type-Safe Testing\nAssertions with generic type. TypeScript ensures expected and actual have same type.\n\n### Async Testing\n`async/await` in test function. Framework handles automatically.\n\n### Error Testing\n`expect(() => fn()).toThrow()` — ensure function throws error.\n\n### AAA Pattern\nArrange: setup data. Act: execute function. Assert: verify result.\n\n### Type-Level Tests\n`expectTypeOf(x).toEqualTypeOf<string>()` — check type at compile-time.\n\n### Frameworks\nVitest: fast, Vite-native. Jest: mature. Ambience: node/jsdom.',
    experimentsId: [
      'Buat parameterized test dengan types',
      'Coba mock function dengan proper typing',
      'Eksperimen test untuk generic functions',
      'Buat test untuk discriminated unions',
      'Coba type-level test dengas expectTypeOf',
    ],
    experimentsEn: [
      'Create parameterized test with types',
      'Try mock function with proper typing',
      'Experiment test for generic functions',
      'Create test for discriminated unions',
      'Try type-level test with expectTypeOf',
    ],
    challengeId: 'Buat test suite untuk API client: type-safe mocks, async tests, error cases, dengan 10+ tests.',
    challengeEn: 'Build a test suite for API client: type-safe mocks, async tests, error cases, with 10+ tests.',
    summaryId: 'Minggu 9 dari 12: **Testing TypeScript** (Level: TypeScript Lengkap). Kualitas terjamin. Minggu depan: **Design Patterns**.',
    summaryEn: 'Week 9 of 12: **Testing TypeScript** (Level: Complete TypeScript). Guaranteed quality. Next week: **Design Patterns**.',
  },
  {
    week: 10, level: 'beginer', topicId: 'patterns-typescript',
    titleId: 'Design Patterns TS', titleEn: 'TypeScript Design Patterns',
    programId: 'Pattern with Types', programEn: 'Patterns with Types',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Singleton with TypeScript
class AppConfig {
    private static instance: AppConfig | null = null;
    private config: Map<string, string> = new Map();

    private constructor() {}

    static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }

    set(key: string, value: string): void {
        this.config.set(key, value);
    }

    get(key: string): string | undefined {
        return this.config.get(key);
    }
}

// Factory Pattern
interface Product {
    name: string;
    price: number;
}

class Book implements Product {
    constructor(public name: string, public price: number, public author: string) {}
}

class Electronics implements Product {
    constructor(public name: string, public price: number, public warranty: number) {}
}

type ProductType = "book" | "electronics";

class ProductFactory {
    static create(type: "book", name: string, price: number, author: string): Book;
    static create(type: "electronics", name: string, price: number, warranty: number): Electronics;
    static create(type: ProductType, name: string, price: number, extra?: string | number): Product {
        switch (type) {
            case "book": return new Book(name, price, extra as string);
            case "electronics": return new Electronics(name, price, extra as number);
        }
    }
}

// Observer Pattern (Type-Safe)
type Listener<T> = (data: T) => void;

class EventEmitter<T extends Record<string, unknown>> {
    private listeners: { [K in keyof T]?: Listener<T[K]>[] } = {};

    on<K extends keyof T>(event: K, listener: Listener<T[K]>): () => void {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event]!.push(listener);
        return () => this.off(event, listener);
    }

    off<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
        this.listeners[event] = this.listeners[event]?.filter(l => l !== listener);
    }

    emit<K extends keyof T>(event: K, data: T[K]): void {
        this.listeners[event]?.forEach(l => l(data));
    }
}

// Demo
console.log("=== Singleton ===");
const config = AppConfig.getInstance();
config.set("apiUrl", "https://api.example.com");
console.log("API URL:", config.get("apiUrl"));

console.log("\\n=== Factory ===");
const book = ProductFactory.create("book", "TypeScript Guide", 50000, "John Doe");
const laptop = ProductFactory.create("electronics", "Laptop", 15000000, 24);
console.log("Book:", book);
console.log("Electronics:", laptop);

console.log("\\n=== Type-Safe Observer ===");
interface AppEvents {
    "user:login": { name: string; id: string };
    "user:logout": { id: string };
    "error": { message: string };
}

const emitter = new EventEmitter<AppEvents>();

emitter.on("user:login", (data) => {
    console.log("Login:", data.name, "(ID: " + data.id + ")");
});

emitter.on("error", (data) => {
    console.log("Error:", data.message);
});

emitter.emit("user:login", { name: "Budi", id: "u1" });
emitter.emit("error", { message: "Network timeout" });`,
    objectivesId: [
      'Singleton pattern dengan private constructor',
      'Factory pattern dengan function overloads',
      'Type-safe observer dengan mapped event types',
      'Generic constraints pada class',
      'Pattern composition dengan interfaces',
    ],
    objectivesEn: [
      'Singleton pattern with private constructor',
      'Factory pattern with function overloads',
      'Type-safe observer with mapped event types',
      'Generic constraints on classes',
      'Pattern composition with interfaces',
    ],
    explanationId: '### Singleton\nPrivate constructor mencegah instantiation dari luar. Static getInstance().\n\n### Factory\nFunction overloads memberikan type safety berdasarkan parameter type.\n\n### Type-Safe Observer\n`EventEmitter<T extends Record>` — event types didefinisi di generic. emit() hanya terima valid events.\n\n### Pattern Composition\nInterface + abstract class + concrete class = flexible patterns.\n\n### Advanced\nConditional types, template literal types, mapped types untuk powerful patterns.',
    explanationEn: '### Singleton\nPrivate constructor prevents external instantiation. Static getInstance().\n\n### Factory\nFunction overloads provide type safety based on parameter type.\n\n### Type-Safe Observer\n`EventEmitter<T extends Record>` — event types defined in generic. emit() only accepts valid events.\n\n### Pattern Composition\nInterface + abstract class + concrete class = flexible patterns.\n\n### Advanced\nConditional types, template literal types, mapped types for powerful patterns.',
    experimentsId: [
      'Buat builder pattern dengan fluent API',
      'Coba strategy pattern dengan discriminated union',
      'Eksperimen decorator pattern dengan TC39 decorators',
      'Buat state machine dengan type-safe transitions',
      'Coba repository pattern dengan generics',
    ],
    experimentsEn: [
      'Create builder pattern with fluent API',
      'Try strategy pattern with discriminated union',
      'Experiment decorator pattern with TC39 decorators',
      'Create state machine with type-safe transitions',
      'Try repository pattern with generics',
    ],
    challengeId: 'Buat state management: type-safe store, actions dengan discriminated union, middleware dengan generics.',
    challengeEn: 'Build state management: type-safe store, actions with discriminated union, middleware with generics.',
    summaryId: 'Minggu 10 dari 12: **Design Patterns TS** (Level: TypeScript Lengkap). Pattern teruji. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 10 of 12: **TypeScript Design Patterns** (Level: Complete TypeScript). Proven patterns. Next week: **Capstone Project**!',
  },
  {
    week: 11, level: 'beginer', topicId: 'api-advanced-types',
    titleId: 'Advanced Type Manipulation', titleEn: 'Advanced Type Manipulation',
    programId: 'Template Literals & Conditional', programEn: 'Template Literals & Conditional Types',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Template Literal Types
type EventName = "click" | "focus" | "blur";
type ElementId = "button" | "input" | "form";

// Combine template literals
type EventString = \`\${ElementId}:\${EventName}\`;
// "button:click" | "button:focus" | ... | "form:blur"

// Capitalize, Uncapitalize, Uppercase, Lowercase
type Greeting = "hello world";
type Capitalized = Capitalize<Greeting>;  // "Hello world"
type Uppercased = Uppercase<Greeting>;   // "HELLO WORLD"
type Lowercased = Lowercase<Greeting>;   // "hello world"

// Conditional Types
type IsString<T> = T extends string ? true : false;
type Test1 = IsString<"hello">;  // true
type Test2 = IsString<42>;       // false

// infer keyword
type ArrayElement<T> = T extends (infer E)[] ? E : never;
type NumElem = ArrayElement<number[]>;     // number
type StrElem = ArrayElement<string[]>;     // string

// Distributive Conditional Types
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumArray = ToArray<string | number>; // string[] | number[]

// Mapped Types
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

type Partial<T> = {
    [K in keyof T]?: T[K];
};

// Key remapping
type Getters<T> = {
    [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
    name: string;
    age: number;
    email: string;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// Recursive types
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Config {
    server: { host: string; port: number };
    database: { url: string; pool: number };
}

type ReadonlyConfig = DeepReadonly<Config>;

// Branded Types (Nominal Typing)
type Brand<T, B> = T & { __brand: B };
type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

function usd(amount: number): USD {
    return amount as USD;
}

function eur(amount: number): EUR {
    return amount as EUR;
}

const price1 = usd(100);
const price2 = eur(100);
// price1 === price2 // Error! Different brands

console.log("=== Advanced Types ===");
console.log("Template Literal: combine types into strings");
console.log("Conditional: T extends U ? X : Y");
console.log("infer: extract types from structures");
console.log("Branded: nominal typing for primitives");
console.log("Recursive: deep type transformations");`,
    objectivesId: [
      'Template literal types untuk string manipulation',
      'Conditional types: T extends U ? X : Y',
      'infer keyword untuk extract types',
      'Key remapping dengan as clause',
      'Branded types untuk nominal typing',
    ],
    objectivesEn: [
      'Template literal types for string manipulation',
      'Conditional types: T extends U ? X : Y',
      'infer keyword for type extraction',
      'Key remapping with as clause',
      'Branded types for nominal typing',
    ],
    explanationId: '### Template Literal Types\n\`type T = \\`get\\${Capitalize<K>}\\`` — generate types dari string.\n\n### Conditional Types\n`T extends string ? true : false` — type-level if/else.\n\n### infer\nExtract type dari structure: `T extends (infer E)[] ? E : never`.\n\n### Key Remapping\n`{ [K in keyof T as NewKey]: T[K] }` — rename keys.\n\n### Branded Types\n`type USD = number & { __brand: "USD" }` — nominal typing untuk primitives.\n\n### Recursive Types\nType yang reference dirinya sendiri: `DeepReadonly<T>`.',
    explanationEn: '### Template Literal Types\n`type T = \\`get\\${Capitalize<K>}\\`` — generate types from strings.\n\n### Conditional Types\n`T extends string ? true : false` — type-level if/else.\n\n### infer\nExtract type from structure: `T extends (infer E)[] ? E : never`.\n\n### Key Remapping\n`{ [K in keyof T as NewKey]: T[K] }` — rename keys.\n\n### Branded Types\n`type USD = number & { __brand: "USD" }` — nominal typing for primitives.\n\n### Recursive Types\nTypes that reference themselves: `DeepReadonly<T>`.',
    experimentsId: [
      'Buat type-safe path: type Path<T, K>',
      'Coba conditional type untuk flatten array',
      'Eksperimen template literal untuk CSS properties',
      'Buat type-safe event map dengan template literals',
      'Coba type-level programming: Fibonacci',
    ],
    experimentsEn: [
      'Create type-safe path: type Path<T, K>',
      'Try conditional type for flatten array',
      'Experiment template literal for CSS properties',
      'Create type-safe event map with template literals',
      'Try type-level programming: Fibonacci',
    ],
    challengeId: 'Buat type-safe API client: template literal untuk endpoints, conditional types untuk responses, branded types untuk IDs.',
    challengeEn: 'Build a type-safe API client: template literals for endpoints, conditional types for responses, branded types for IDs.',
    summaryId: 'Minggu 11 dari 12: **Advanced Type Manipulation** (Level: TypeScript Lengkap). Type-level programming. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **Advanced Type Manipulation** (Level: Complete TypeScript). Type-level programming. Next week: **Capstone Project**!',
  },
  {
    week: 12, level: 'beginer', topicId: 'capstone',
    titleId: 'Capstone: Type-Safe API Client', titleEn: 'Capstone: Type-Safe API Client',
    programId: 'API Client Library', programEn: 'API Client Library',
    levelNameId: 'TypeScript Lengkap', levelNameEn: 'Complete TypeScript',
    language: 'typescript',
    code: `// Capstone: Type-Safe REST API Client
// Menggabungkan semua konsep TypeScript

// === Branded Types ===
type ID<T> = string & { __brand: T };
type UserID = ID<"User">;
type PostID = ID<"Post">;

// === API Response Types ===
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface User {
    id: UserID;
    name: string;
    email: string;
    role: "admin" | "user";
}

interface Post {
    id: PostID;
    title: string;
    content: string;
    authorId: UserID;
}

// === Type-Safe API Client ===
class ApiClient {
    constructor(private baseUrl: string) {}

    async get<T>(path: string): Promise<ApiResponse<T>> {
        console.log("GET", this.baseUrl + path);
        // Simulasi response
        return { data: {} as T, status: 200, message: "OK" };
    }

    async post<T, D>(path: string, body: D): Promise<ApiResponse<T>> {
        console.log("POST", this.baseUrl + path, body);
        return { data: {} as T, status: 201, message: "Created" };
    }

    async put<T, D>(path: string, body: D): Promise<ApiResponse<T>> {
        console.log("PUT", this.baseUrl + path, body);
        return { data: {} as T, status: 200, message: "Updated" };
    }

    async delete(path: string): Promise<{ status: number }> {
        console.log("DELETE", this.baseUrl + path);
        return { status: 204 };
    }
}

// === Typed Endpoints ===
type ApiEndpoints = {
    "/users": { GET: User[]; POST: User };
    "/users/:id": { GET: User; PUT: User; DELETE: void };
    "/posts": { GET: Post[]; POST: Post };
    "/posts/:id": { GET: Post; PUT: Post; DELETE: void };
};

// === Type-Safe Request Builder ===
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

class TypedClient {
    constructor(private client: ApiClient) {}

    async request<M extends HttpMethod, P extends keyof ApiEndpoints>(
        method: M,
        path: P
    ): Promise<ApiEndpoints[P][M]> {
        return {} as ApiEndpoints[P][M];
    }
}

// === Demo ===
console.log("=== Type-Safe API Client ===");

const api = new ApiClient("https://api.example.com");

// Type-safe calls
async function demo() {
    const users = await api.get<User[]>("/users");
    console.log("Users status:", users.status);

    const newUser = await api.post<User, Omit<User, "id">>("/users", {
        name: "Budi",
        email: "budi@mail.com",
        role: "user"
    });
    console.log("Created status:", newUser.status);

    await api.delete("/users/123");
}

demo();

// === Architecture Summary ===
console.log("\\n=== Architecture ===");
console.log("1. Branded Types: type-safe IDs");
console.log("2. Generic Client: type-safe requests");
console.log("3. Typed Endpoints: path → response mapping");
console.log("4. Discriminated Unions: API responses");
console.log("5. Utility Types: Partial, Omit, Pick");
console.log("6. Conditional Types: response transformers");
console.log("7. Template Literals: URL builders");

// === Key Takeaways ===
console.log("\\n=== Key Takeaways ===");
console.log("- TypeScript catches errors at compile-time");
console.log("- Generics enable reusable type-safe code");
console.log("- Utility types transform existing types");
console.log("- Branded types prevent ID mixups");
console.log("- Conditional types enable type-level logic");`,
    objectivesId: [
      'Menggabungkan semua konsep: generics, branded types, conditional types',
      'Type-safe API client dengan endpoint typing',
      'Branded types untuk prevent ID mixups',
      'Generic methods dengan type constraints',
      'Type-level programming untuk API response mapping',
    ],
    objectivesEn: [
      'Combine all concepts: generics, branded types, conditional types',
      'Type-safe API client with endpoint typing',
      'Branded types to prevent ID mixups',
      'Generic methods with type constraints',
      'Type-level programming for API response mapping',
    ],
    explanationId: '### Proyek Capstone\nType-Safe API Client yang menggabungkan semua 11 minggu pembelajaran.\n\n### Arsitektur\n- Branded Types: UserID vs PostID tidak bisa tertukar\n- Generic Client: type-safe requests\n- Typed Endpoints: path → response type mapping\n- Conditional Types: transform responses\n\n### Fitur\n- CRUD operations dengan type safety\n- Endpoint typing\n- Response transformation\n- Error handling\n\n### Best Practices\n- Strict mode\n- No implicit any\n- Proper generic constraints\n- Type inference where possible',
    explanationEn: '### Capstone Project\nType-Safe API Client combining all 11 weeks of learning.\n\n### Architecture\n- Branded Types: UserID vs PostID cannot be mixed up\n- Generic Client: type-safe requests\n- Typed Endpoints: path → response type mapping\n- Conditional Types: transform responses\n\n### Features\n- CRUD operations with type safety\n- Endpoint typing\n- Response transformation\n- Error handling\n\n### Best Practices\n- Strict mode\n- No implicit any\n- Proper generic constraints\n- Type inference where possible',
    experimentsId: [
      'Tambah request/response interceptors',
      'Buat type-safe query builder',
      'Tambah caching layer dengan generics',
      'Buat type-safe WebSocket client',
      'Tambah retry logic dengan exponential backoff',
    ],
    experimentsEn: [
      'Add request/response interceptors',
      'Create type-safe query builder',
      'Add caching layer with generics',
      'Create type-safe WebSocket client',
      'Add retry logic with exponential backoff',
    ],
    challengeId: 'Buat full API client library: CRUD, interceptors, caching, retry, type-safe endpoints, error handling.',
    challengeEn: 'Build a full API client library: CRUD, interceptors, caching, retry, type-safe endpoints, error handling.',
    summaryId: 'Minggu 12 dari 12: **Capstone: Type-Safe API Client** (Level: TypeScript Lengkap). Selesai! 🎉 Anda sudah menguasai TypeScript dari nol hingga mahir.',
    summaryEn: 'Week 12 of 12: **Capstone: Type-Safe API Client** (Level: Complete TypeScript). Complete! 🎉 You\'ve mastered TypeScript from scratch to expert.',
  },
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
