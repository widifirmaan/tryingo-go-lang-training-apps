# Pointers

A pointer holds the **memory address** of a value. Pointers let you share and modify data without copying it.

## The & and * Operators

| Operator | Name | Purpose |
|----------|------|---------|
| `&` | Address-of | Returns the memory address of a variable |
| `*` | Dereference | Accesses the value at a memory address |

```go
x := 42
p := &x   // p is a pointer to x (type *int)
fmt.Println(p) // 0xc0000a2000 (memory address)

y := *p   // y is 42 (value at address p)
fmt.Println(y) // 42

*p = 100  // change x through the pointer
fmt.Println(x) // 100
```

## Declaring Pointers

```go
var p *int       // nil pointer to int
var s *string    // nil pointer to string

x := 10
p = &x           // now p points to x
```

## Pointers to Structs

```go
type Person struct {
    Name string
    Age  int
}

p := Person{Name: "Alice", Age: 30}
ptr := &p

// Both access fields — Go automatically dereferences
fmt.Println((*ptr).Name) // Alice — explicit dereference
fmt.Println(ptr.Name)    // Alice — implicit (preferred)
```

Go allows **implicit dereferencing** for struct fields and method calls, so `ptr.Name` is equivalent to `(*ptr).Name`.

## Why Use Pointers?

### 1. Modify a Value in a Function

```go
func updateName(p *Person, name string) {
    p.Name = name // modifies original
}

func main() {
    person := Person{Name: "Alice"}
    updateName(&person, "Bob")
    fmt.Println(person.Name) // Bob
}
```

### 2. Avoid Copying Large Structs

```go
type LargeStruct struct {
    data [10000]int
}

func process(p *LargeStruct) { // passes pointer (8 bytes) not 80KB
    // ...
}
```

## Pointer to Literal

You cannot take the address of a literal directly:

```go
// p := &Person{"Alice", 30} // ❌ cannot take address of literal
```

Use a variable or the `new` function:

```go
// Using a variable
person := Person{"Alice", 30}
p := &person

// Using new
p := new(Person)
p.Name = "Alice"
p.Age = 30

// Using addressable literal with field initialization
p := &Person{Name: "Alice", Age: 30}
```

The third form works because Go creates a variable to hold the literal.

## nil Pointers

A nil pointer doesn't point to any value:

```go
var p *Person
fmt.Println(p == nil) // true
```

Dereferencing a nil pointer causes a **panic**:

```go
var p *Person
fmt.Println(p.Name) // panic: runtime error: invalid memory address or nil pointer dereference
```

Always check for nil:

```go
func printName(p *Person) {
    if p == nil {
        fmt.Println("no person")
        return
    }
    fmt.Println(p.Name)
}
```

## Pointer to Pointer

```go
x := 42
p := &x
pp := &p

fmt.Println(**pp) // 42
```

## Pointer Comparison

Two pointers are equal if they point to the same variable:

```go
a := 10
b := 10
p1 := &a
p2 := &b
p3 := &a

fmt.Println(p1 == p2) // false (different addresses)
fmt.Println(p1 == p3) // true (same address)
```

## Function with Pointer Return

```go
func newPerson(name string, age int) *Person {
    return &Person{Name: name, Age: age}
}

func main() {
    p := newPerson("Alice", 30)
    fmt.Println(p.Name) // Alice
}
```

## Arrays vs Slices with Pointers

| Type | Pass by Value | Pass by Pointer |
|------|---------------|-----------------|
| Array | Copies entire array | Shares array |
| Slice | Copies slice header (small) | Shares underlying array |
| Struct | Copies all fields | Shares struct |

Slices already contain a pointer to the underlying array, so they don't need explicit pointers as often.

## Common Mistakes

```go
// ❌ Wrong: dereferencing nil pointer
var p *int
fmt.Println(*p) // panic

// ✅ Correct: assign before dereferencing
x := 10
p = &x
fmt.Println(*p) // 10

// ❌ Wrong: taking address of literal
// p := &42

// ✅ Correct: assign to variable first
n := 42
p := &n

// ❌ Wrong: cannot use & with unaddressable values
// &Person{Name: "A"}.Name // ❌

// ✅ Correct
p := &Person{Name: "A"}
fmt.Println(p.Name)
```

## Practice

1. Write a function `swap(a, b *int)` that swaps two integers using pointers.
2. Create a function `double(n *int)` that doubles a value through a pointer.
3. Write a function that takes `*Person` and safely handles nil by printing "unknown".
4. Demonstrate the difference between passing a struct by value and by pointer to a function.
5. Create a function `square(v *float64)` that modifies the original float64 through a pointer.
6. Write a program that creates a linked list node struct and connects nodes using pointers.
7. Compare performance of passing a large array by value vs by pointer (use simple timing).
