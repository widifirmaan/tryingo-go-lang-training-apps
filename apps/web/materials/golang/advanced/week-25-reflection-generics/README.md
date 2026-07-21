# Week 25: Reflection & Generics

Go 1.18 introduced generics, a major language feature. Combined with reflection, these tools enable powerful abstractions and code reuse.

## Topics

- Generics: type parameters and constraints
- Type constraints and interfaces
- Reflection with `reflect` package
- Reflection patterns and use cases

## Goals

- Write generic functions and types
- Define and use type constraints
- Inspect types and values at runtime
- Apply reflection for serialization and validation

## Key Concepts

| Concept | Description |
|---------|-------------|
| Type Parameter | `[T any]` syntax for generic code |
| Constraint | Interface that restricts type parameters |
| Interface | Set of methods a type must implement |
| reflect.Value | Runtime representation of a value |
| reflect.Type | Runtime representation of a type |

## Practice Exercises

1. Write a generic `Map` function for slices
2. Create a constraint for numeric types
3. Use reflection to implement a generic validator
4. Build a simple ORM-like struct scanner
