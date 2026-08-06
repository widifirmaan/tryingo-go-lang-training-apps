# Classes & OOP

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 6:** Classes & OOP

## Learning Objectives

- Access modifiers: public, protected, private
- Inheritance with extends and super
- Abstract classes and methods
- Interface implementation with implements
- Parameter properties in constructor

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

## Key Concepts

### Access Modifiers
`public` (default) accessible everywhere. `protected` class + subclass. `private` only in class.

### Inheritance
`class Dog extends Animal` — inherit all. `super()` calls parent constructor.

### Abstract Classes
Cannot be instantiated directly. Methods without body must be implemented by subclasses.

### Implements
`class X implements Interface` — must provide all interface methods.

### Parameter Properties
`constructor(public x: number)` — directly declare and assign field.

---

## Experiments

- Create abstract class Vehicle with Car and Motorcycle
- Try method override with different return type
- Experiment multiple interface implementation
- Create singleton class with private constructor
- Try getter and setter with access modifiers

---

## Challenge

Build a class hierarchy for shape calculator: abstract Shape, concrete Circle/Rectangle/Triangle, with Printable interface.

---

## Summary

Week 6 of 12: **Classes & OOP** (Level: Complete TypeScript). Object-oriented TS. Next week: **Utility Types**.
