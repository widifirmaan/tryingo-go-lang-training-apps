# Week 22: Web Frameworks

While Go's standard library is sufficient for many web applications, frameworks provide additional structure, middleware, and routing capabilities. This week compares popular Go web frameworks.

## Topics

- Framework comparison (Gin, Echo, Chi, Fiber)
- Gin: performance and productivity
- Echo: minimalistic and extensible
- Chi: idiomatic and composable

## Goals

- Evaluate frameworks based on project requirements
- Build applications with Gin, Echo, and Chi
- Understand tradeoffs between frameworks
- Write framework-agnostic middleware

## Framework Comparison

| Feature | Gin | Echo | Chi |
|---------|-----|------|-----|
| Router | Radix tree | Radix tree | Radix tree |
| Middleware | Built-in | Built-in | net/http compatible |
| Performance | Excellent | Excellent | Excellent |
| Community | Largest | Large | Growing |
| Stdlib Compat | No | No | Yes |

## Practice Exercises

1. Build the same todo API in all three frameworks
2. Compare routing, middleware, and error handling
3. Implement custom middleware portable across frameworks
4. Benchmark each framework with a simple endpoint
