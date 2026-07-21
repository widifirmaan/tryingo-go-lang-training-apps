# Printing & Formatting with fmt

## Introduction
The `fmt` package implements formatted I/O. It's your primary tool for output in Go.

## Basic Printing

### Print
```go
fmt.Print("Hello")           // No newline
fmt.Print("World")
// Output: HelloWorld
```

### Println
```go
fmt.Println("Hello")         // Adds newline
fmt.Println("World")
// Output: Hello
// World
```

### Printf - Formatted Print
```go
name := "Alice"
age := 30
fmt.Printf("%s is %d years old\n", name, age)
// Output: Alice is 30 years old
```

## Formatting Verbs (Printf)

### General
```go
fmt.Printf("%v", 42)         // Default format → 42
fmt.Printf("%+v", data)      // Struct field names
fmt.Printf("%#v", 42)        // Go-syntax representation
fmt.Printf("%T", 42)         // Type → int
fmt.Printf("%%", 42)         // Literal % → %
```

### Integer
```go
fmt.Printf("%d", 42)         // Decimal → 42
fmt.Printf("%b", 42)         // Binary → 101010
fmt.Printf("%o", 42)         // Octal → 52
fmt.Printf("%x", 42)         // Hex (lower) → 2a
fmt.Printf("%X", 42)         // Hex (upper) → 2A
fmt.Printf("%5d", 42)        // Width 5 → "   42"
fmt.Printf("%05d", 42)       // Zero pad → "00042"
```

### Float
```go
fmt.Printf("%f", 3.14159)    // Decimal → 3.141590
fmt.Printf("%.2f", 3.14159)  // Precision 2 → 3.14
fmt.Printf("%6.2f", 3.14)    // Width 6, prec 2 → "  3.14"
fmt.Printf("%e", 3.14159)    // Scientific → 3.141590e+00
fmt.Printf("%g", 3.14159)    // Compact → 3.14159
```

### String
```go
fmt.Printf("%s", "hello")    // Plain → hello
fmt.Printf("%q", "hello")    // Quoted → "hello"
fmt.Printf("%10s", "hi")     // Width 10 → "        hi"
fmt.Printf("%-10s", "hi")    // Left justify → "hi        "
```

### Boolean
```go
fmt.Printf("%t", true)        // → true
fmt.Printf("%t", false)       // → false
```

## String Formatting (Not Printing)

### Sprintf
```go
result := fmt.Sprintf("%s is %d years old", "Alice", 30)
// result = "Alice is 30 years old"
```

### Errorf
```go
err := fmt.Errorf("user %d not found", 42)
// err.Error() = "user 42 not found"
```

## Reading Input

### Scan
```go
var name string
fmt.Print("Enter your name: ")
fmt.Scan(&name)  // Reads until whitespace
```

### Scanf
```go
var name string
var age int
fmt.Print("Enter name and age: ")
fmt.Scanf("%s %d", &name, &age)
```

### Scanner (buffered)
```go
import "bufio"
import "os"

scanner := bufio.NewScanner(os.Stdin)
fmt.Print("Enter your name: ")
scanner.Scan()
name := scanner.Text()
```

## Common Printf Patterns

```go
// Table-like output
fmt.Printf("%-15s %5s %10s\n", "Product", "Qty", "Price")
fmt.Printf("%-15s %5d %10.2f\n", "Widget A", 3, 29.99)
fmt.Printf("%-15s %5d %10.2f\n", "Widget B", 1, 49.99)

// Debug output
fmt.Printf("DEBUG: %+v\n", someStruct)

// Error messages
fmt.Fprintf(os.Stderr, "Error: %v\n", err)
```

## Fprintf - Write to Files
```go
import "os"

file, _ := os.Create("output.txt")
fmt.Fprintln(file, "Hello, File!")
fmt.Fprintf(file, "Value: %d\n", 42)
```

## Practice

```go
// 1. Print your name and age
name := "Alice"
age := 30
fmt.Printf("Name: %s, Age: %d\n", name, age)

// 2. Print with formatting
pi := 3.14159
fmt.Printf("Pi = %.3f\n", pi)

// 3. Table layout
fmt.Printf("%-10s %10s\n", "Item", "Price")
fmt.Printf("%-10s %10.2f\n", "Apple", 1.50)
fmt.Printf("%-10s %10.2f\n", "Banana", 0.75)
```
