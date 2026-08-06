# Classes & OOP

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 6:** Classes & OOP

## Tujuan Pembelajaran

- Access modifiers: public, protected, private
- Inheritance dengan extends dan super
- Abstract classes dan methods
- Interface implementation dengan implements
- Parameter properties di constructor

---

## Program: TypeScript Classes

```typescript
// Class dengan access modifiers
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
console.log("\n" + circle.describe());

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
        return "=== " + this.title + " ===\n" + this.content;
    }

    toJSON(): string {
        return JSON.stringify({ title: this.title, content: this.content });
    }
}

const report = new Report("Sales Q1", "Revenue increased by 25%");
console.log("\n" + report.print());
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
console.log("\nDistance:", p.distance());
```

---

## Konsep Kunci

### Access Modifiers
`public` (default) accessible everywhere. `protected` class + subclass. `private` hanya di class.

### Inheritance
`class Dog extends Animal` — warisi semua. `super()` panggil parent constructor.

### Abstract Class
Tidak bisa diinstantiate langsung. Method tanpa body harus diimplementasikan subclass.

### Implements
`class X implements Interface` — harus sediakan semua method interface.

### Parameter Properties
`constructor(public x: number)` — langsung deklarasikan dan assign field.

---

## Eksperimen

- Buat abstract class Vehicle dengan Car dan Motorcycle
- Coba method override dengan different return type
- Eksperimen multiple interface implementation
- Buat singleton class dengan private constructor
- Coba getter dan setter dengan access modifiers

---

## Tantangan

Buat class hierarchy untuk shape calculator: abstract Shape, concrete Circle/Rectangle/Triangle, dengan interface Printable.

---

## Ringkasan

Minggu 6 dari 12: **Classes & OOP** (Level: TypeScript Lengkap). Object-oriented TS. Minggu depan: **Utility Types**.
