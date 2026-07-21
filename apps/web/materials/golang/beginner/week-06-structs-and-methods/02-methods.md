# Methods

A **method** is a function with a special **receiver** argument. Methods let you attach behavior to your types, similar to classes in other languages.

## Value Receiver

A method with a **value receiver** operates on a copy of the struct:

```go
type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

func main() {
    rect := Rectangle{Width: 10, Height: 5}
    fmt.Println(rect.Area())       // 50
    fmt.Println(rect.Perimeter())  // 30
}
```

The receiver `r` is a **copy** of `Rectangle`. Any changes to `r` inside the method do **not** affect the original.

## Pointer Receiver

A method with a **pointer receiver** can modify the original struct:

```go
func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}

func main() {
    rect := Rectangle{Width: 10, Height: 5}
    rect.Scale(2)
    fmt.Println(rect.Width)  // 20
    fmt.Println(rect.Height) // 10
}
```

## When to Use Pointer vs Value Receiver

```go
type Counter struct {
    value int
}

// Value receiver — cannot modify
func (c Counter) Value() int {
    return c.value
}

// Pointer receiver — can modify
func (c *Counter) Increment() {
    c.value++
}
```

| Use Pointer Receiver When | Use Value Receiver When |
|---------------------------|------------------------|
| Need to modify the receiver | Type is a small value type |
| Receiver is a large struct (avoid copying) | Type is map, slice, or function |
| Method should work with nil receiver | Receiver is immutable by design |
| Consistency with other methods on the type | Method doesn't modify state |

## Method Calling — Automatic Conversion

Go automatically converts between value and pointer to call methods:

```go
rect := Rectangle{Width: 10, Height: 5}

// Both work for a value receiver
rect.Area()        // OK
(&rect).Area()     // OK

// Both work for a pointer receiver
rect.Scale(2)      // OK — Go takes address automatically
(&rect).Scale(2)   // OK
```

## Method with Multiple Receivers Not Allowed

```go
// ❌ Cannot define methods on non-local types
func (s string) Shout() string { ... } // compile error

// ✅ Must define a type in the same package
type MyString string
func (s MyString) Shout() string {
    return strings.ToUpper(string(s))
}
```

## Method Sets

- **Value type** `T` has methods with value receivers `T`
- **Pointer type** `*T` has methods with both value receivers `T` and pointer receivers `*T`

```go
type MyType struct{ value int }

func (m MyType) Value() int  { return m.value }   // value receiver
func (m *MyType) Set(v int) { m.value = v }        // pointer receiver

var t MyType
var p *MyType = &t

t.Value() // OK
t.Set(5)  // OK (Go takes &t)
p.Value() // OK (Go dereferences)
p.Set(5)  // OK
```

## Chaining Methods

Methods can return the receiver to enable chaining:

```go
type Builder struct {
    content string
}

func (b *Builder) Add(s string) *Builder {
    b.content += s
    return b
}

func (b *Builder) Build() string {
    return b.content
}

func main() {
    result := (&Builder{}).Add("Hello, ").Add("World!").Build()
    fmt.Println(result) // Hello, World!
}
```

## Methods on Any Local Type

You can define methods on any type defined in the same package, not just structs:

```go
type Celsius float64
type Fahrenheit float64

func (c Celsius) ToFahrenheit() Fahrenheit {
    return Fahrenheit(c*9/5 + 32)
}

func (f Fahrenheit) ToCelsius() Celsius {
    return Celsius((f - 32) * 5 / 9)
}

func main() {
    boiling := Celsius(100)
    fmt.Println(boiling.ToFahrenheit()) // 212
}
```

## Pointer Receiver Consistency

If **any** method on a type uses a pointer receiver, it's idiomatic to use pointer receivers for **all** methods that might mutate:

```go
type BankAccount struct {
    balance float64
}

func (a *BankAccount) Deposit(amount float64) {
    a.balance += amount
}

func (a *BankAccount) Withdraw(amount float64) error {
    if amount > a.balance {
        return fmt.Errorf("insufficient funds")
    }
    a.balance -= amount
    return nil
}

func (a *BankAccount) Balance() float64 {
    return a.balance
}
```

Even though `Balance()` doesn't modify, having a value receiver alongside pointer receivers can be confusing. Usually, if the type needs pointer receivers, use them consistently.

## Practice

1. Add an `Area()` method to a `Circle` struct from previous practice.
2. Add a `Scale(factor float64)` method with a pointer receiver to a `Rectangle` struct.
3. Create a `Temperature` type with `ToCelsius` and `ToFahrenheit` methods.
4. Implement a `Counter` type with `Increment()`, `Decrement()`, and `Value()` methods.
5. Write a method on a `BankAccount` struct that returns a formatted string with the balance.
6. Use method chaining to build a string step by step.
7. Create a `Stack` type with `Push(int)`, `Pop() (int, error)` and `Peek() (int, error)` methods.
