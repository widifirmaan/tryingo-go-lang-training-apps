# Interface Basics

## What is an Interface?
An interface is a type that defines a **contract** through a set of method signatures. Any type that implements all those methods satisfies the interface **implicitly** — no `implements` keyword needed.

```go
type Speaker interface {
    Speak() string
}
```

## Defining and Implementing

```go
type Dog struct{ Name string }

func (d Dog) Speak() string {
    return d.Name + " says Woof!"
}

type Cat struct{ Name string }

func (c Cat) Speak() string {
    return c.Name + " says Meow!"
}
```

## Using Interfaces

```go
func Greet(s Speaker) {
    fmt.Println(s.Speak())
}

func main() {
    dog := Dog{Name: "Buddy"}
    cat := Cat{Name: "Kitty"}

    Greet(dog) // Buddy says Woof!
    Greet(cat) // Kitty says Meow!
}
```

## Interface Values
An interface value holds a **concrete type** and its **value** (type, value tuple).

```go
var s Speaker
fmt.Printf("%T %v\n", s, s) // <nil> <nil>

s = Dog{"Rex"}
fmt.Printf("%T %v\n", s, s) // main.Dog {Rex}
```

## Multiple Methods
An interface can have multiple methods — a type must implement all of them.

| Interface | Methods | Example Types |
|-----------|---------|---------------|
| `Speaker` | `Speak()` | `Dog`, `Cat` |
| `Shape` | `Area()`, `Perimeter()` | `Circle`, `Rect` |
| `Stringer` | `String()` | Any type |

## Pointer vs Value Receiver
If a method uses a **pointer receiver**, only a pointer type satisfies the interface.

```go
type Counter struct{ Value int }

func (c *Counter) Increment() { c.Value++ }

type Incrementer interface {
    Increment()
}

var c Counter
// var inc Incrementer = c  // ERROR: Counter does not implement Incrementer
var inc Incrementer = &c    // OK
```

## Embedded Interfaces
Interfaces can embed other interfaces to compose behaviors.

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type ReadWriter interface {
    Reader
    Writer
}
```

## The `io.Reader` and `io.Writer` Interfaces
These are the most widely used interfaces in Go.

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}
```

## Exercises

1. **Animal Sounds**: Define an `Animal` interface with `Speak()` and `Move()` methods. Implement `Dog`, `Bird`, `Fish`.

2. **Payment Processor**: Create a `PaymentMethod` interface with `Pay(amount float64) string`. Implement `CreditCard`, `PayPal`, `Bitcoin`.

3. **Stringer Practice**: Implement `fmt.Stringer` on a `Person` struct and a `Book` struct.

4. **Interface Composition**: Build a `Logger` interface from embedded `InfoLogger` and `ErrorLogger` interfaces.
