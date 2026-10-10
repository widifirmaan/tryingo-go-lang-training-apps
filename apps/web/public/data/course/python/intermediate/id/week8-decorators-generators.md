# Decorators & Generators

> **Kategori:** Python | **Level:** Menengah | **Minggu 8:** Decorators & Generators

## Tujuan Pembelajaran

- Membuat decorator dengan @functools.wraps
- Decorator dengan arguments: @decorator(arg)
- Generator dengan yield untuk lazy evaluation
- Generator expression: (x for x in iterable)
- yield from untuk delegate ke sub-generator

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

## Konsep Kunci

### Decorator
Function yang membungkus function lain. `@functools.wraps` preserve metadata.

### Decorator dengan Arguments
Nested function: `decorator(arg)` -> `decorator(func)` -> `wrapper(*args, **kwargs)`.

### Generator
`yield` pause dan return value. Resume saat next() dipanggil. Memory-efficient.

### Generator Expression
`(x**2 for x in range(1000000))` — lazy, tidak langsung di-memory.

### yield from
Delegate ke sub-generator: `yield from iterable`.

### Use Cases
@timer, @debug, @cache, @login_required, @route.

---

## Eksperimen

- Buat @cache decorator dengan dict
- Buat @retry decorator dengan max_attempts
- Implementasikan infinite generator: primes()
- Coba @property, @staticmethod, @classmethod
- Buat decorator yang bisa dipakai dengan atau tanpa arguments

---

## Tantangan

Buat pipeline data processing: generator untuk read file, decorator untuk timing dan logging, generator expression untuk transformasi.

---

## Ringkasan

Minggu 8 dari 12: **Decorators & Generators** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Libraries & Virtual Envs** (Advanced).
