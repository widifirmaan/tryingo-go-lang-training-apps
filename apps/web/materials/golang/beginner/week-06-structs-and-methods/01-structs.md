# Structs

A **struct** is a composite data type that groups together fields of different types. Think of it as a way to define a custom type with named properties.

## Defining a Struct

```go
type Person struct {
    Name string
    Age  int
    Email string
}
```

Field order doesn't matter semantically — all fields are accessible by name.

## Creating Struct Instances

### Using a Literal (field order)

```go
p := Person{"Alice", 30, "alice@example.com"}
```

This requires values in the exact field order and is **not recommended** — it breaks if fields are reordered.

### Using Field Names (recommended)

```go
p := Person{
    Name:  "Alice",
    Age:   30,
    Email: "alice@example.com",
}
```

### Zero Values

```go
var p Person
fmt.Printf("%+v\n", p) // {Name: Age:0 Email:}
```

All fields are initialized to their zero values.

### Partial Initialization

```go
p := Person{Name: "Bob"}
fmt.Printf("%+v\n", p) // {Name:Bob Age:0 Email:}
```

### Using new

```go
p := new(Person) // returns *Person, all fields zero
p.Name = "Carol"
```

## Accessing Fields

Use dot notation:

```go
p := Person{Name: "Alice", Age: 30}
fmt.Println(p.Name) // Alice
fmt.Println(p.Age)  // 30

p.Age = 31
fmt.Println(p.Age) // 31
```

## Structs are Value Types

Like arrays, structs are **value types** — assigning or passing a struct copies all fields:

```go
p1 := Person{Name: "Alice", Age: 30}
p2 := p1
p2.Name = "Bob"

fmt.Println(p1.Name) // Alice — unchanged
fmt.Println(p2.Name) // Bob
```

## Struct with Embedded Fields (Anonymous Fields)

```go
type Address struct {
    City  string
    State string
}

type Employee struct {
    Name    string
    Address // embedded (anonymous) field
}
```

Fields of the embedded struct are **promoted** to the outer struct:

```go
e := Employee{
    Name: "Alice",
    Address: Address{
        City:  "New York",
        State: "NY",
    },
}

fmt.Println(e.Name)     // Alice
fmt.Println(e.City)     // New York — promoted field
fmt.Println(e.State)    // NY — promoted field
fmt.Println(e.Address.City) // also works
```

## Struct Comparison

Structs are comparable if all their fields are comparable:

```go
type Point struct {
    X int
    Y int
}

a := Point{1, 2}
b := Point{1, 2}
c := Point{3, 4}

fmt.Println(a == b) // true
fmt.Println(a == c) // false
```

Structs with slice or map fields are **not** comparable:

```go
type NotComparable struct {
    Data []int
}
// a == b // ❌ compile error
```

## Struct as Function Parameter

```go
type Rectangle struct {
    Width  float64
    Height float64
}

func area(r Rectangle) float64 {
    return r.Width * r.Height
}

func main() {
    rect := Rectangle{Width: 10, Height: 5}
    fmt.Println(area(rect)) // 50
}
```

The struct is **copied** when passed to a function.

## Nested Structs

```go
type Company struct {
    Name    string
    Address Address // reuse the Address type
    CEO     Person  // reuse the Person type
}
```

## Anonymous Structs

For one-off use without defining a named type:

```go
car := struct {
    Make  string
    Model string
    Year  int
}{
    Make:  "Toyota",
    Model: "Corolla",
    Year:  2020,
}

fmt.Println(car.Make)
```

## Constructor Function Pattern

Go doesn't have classes or constructors, but it's common to write a constructor function:

```go
func NewPerson(name string, age int) Person {
    return Person{
        Name: name,
        Age:  age,
        Email: fmt.Sprintf("%s@example.com", strings.ToLower(name)),
    }
}

p := NewPerson("Alice", 30)
```

## Practice

1. Define a `Book` struct with fields: Title, Author, Pages, ISBN.
2. Create a `Library` struct that contains a name and a slice of `Book` structs.
3. Write a function that takes a `Book` and returns a formatted string.
4. Create an anonymous struct for a one-time use configuration object.
5. Demonstrate struct comparison by creating two equal and two unequal `Point` structs.
6. Use the embeddding pattern to create a `Circle` struct that embeds a `Point` and adds a `Radius` field.
7. Write a constructor function `NewBook` that validates the ISBN length before returning a `Book`.
