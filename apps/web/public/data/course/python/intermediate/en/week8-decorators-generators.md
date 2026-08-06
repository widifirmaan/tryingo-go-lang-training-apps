# Decorators & Generators

> **Kategori:** Python | **Level:** Intermediate | **Minggu 8:** Decorators & Generators

## Learning Objectives

- Create decorators with @functools.wraps
- Decorators with arguments: @decorator(arg)
- Generators with yield for lazy evaluation
- Generator expressions: (x for x in iterable)
- yield from to delegate to sub-generators

---

## Program: Pythonic Patterns

```python

# Decorators & Generators
import functools
import time

# Basic Decorator
def debug(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"  -> {result}")
        return result
    return wrapper

@debug
def add(a, b): return a + b

@debug
def greet(name, greeting="Hello"): return f"{greeting}, {name}!"

# Decorator with Arguments
def repeat(n):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def say_hello(): return "Hello!"

# Timing Decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)
    return "done"

# Generators
print("=== Generators ===")
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(f"Fibonacci(10): {list(fibonacci(10))}")

def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(f"Countdown: {list(countdown(5))}")

# Generator Expression
print("\n=== Generator Expression ===")
squares = (x**2 for x in range(10))
print(f"Squares: {list(squares)}")

# yield from
def combined():
    yield from range(3)
    yield from "abc"
    yield from [10, 20, 30]

print(f"Combined: {list(combined())}")

# Main
print("\n=== Decorator Results ===")
add(2, 3)
greet("Budi", greeting="Selamat pagi")
print(f"Repeat: {say_hello()}")
slow_function()
    
```

---

## Key Concepts

### Decorator
Function wrapping another function. `@functools.wraps` preserves metadata.

### Decorators with Arguments
Nested functions for parameterized decorators.

### Generator
`yield` pauses and returns value. Resumes on next() call.

### Generator Expression
Lazy evaluation with `(x for x in iterable)`.

### yield from
Delegate to sub-generators.

### Use Cases
Timing, debugging, caching, authentication.

---

## Experiments

- Build @cache decorator with dict
- Build @retry decorator with max_attempts
- Implement infinite generator: primes()
- Try @property, @staticmethod, @classmethod
- Build decorator usable with or without arguments

---

## Challenge

Build a data processing pipeline: generator for file reading, decorators for timing and logging, generator expression for transformations.

---

## Summary

Week 8 of 12: **Decorators & Generators** (Level: Intermediate). Intermediate phase complete! Next week: **Libraries & Virtual Environments** (Advanced).
