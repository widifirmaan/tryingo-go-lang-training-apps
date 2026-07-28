# Classes in TypeScript

> TypeScript | Module 10

## Learning Objectives

- Create classes with typed properties
- Use public, private, protected
- Apply implements for contracts
- Create abstract classes and methods
- Use parameter properties

---

## Program: Library System

```typescript
// Class dengan typed properties
class Animal {
  constructor(
    public name: string,      // parameter property
    private age: number,
    protected species: string
  ) {}

  public speak(): string {
    return `${this.name} makes a sound`;
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
  info(): string { return `Vehicle: ${this.brand}`; }
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

```

---

## Explanation

TypeScript classes: properties must be declared with types. Access modifiers: `public`, `private`, `protected`. Parameter properties: `constructor(public name: string)`. `implements` forces a class to follow an interface. Abstract classes cannot be instantiated directly.

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

Module 10 of 16: **Classes in TypeScript**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Modules & Declarations**.
