# Arrays

An array is a **fixed-length** sequence of elements of the same type. Arrays in Go have a fixed size that is part of the type.

## Declaration

```go
var numbers [5]int // array of 5 ints, all initialized to 0
```

The size is part of the type: `[5]int` and `[10]int` are different types.

## Initialization

```go
// Zero values
var a [3]int // [0 0 0]

// Literal
var b [3]int = [3]int{1, 2, 3}

// Short declaration
c := [3]int{4, 5, 6}

// Partial initialization — remaining are zero
d := [5]int{1, 2} // [1 2 0 0 0]

// Elipsis — compiler counts
e := [...]int{10, 20, 30, 40} // [4]int

// Indexed initialization
f := [5]int{0: 100, 3: 200} // [100 0 0 200 0]
```

## Indexing

```go
arr := [5]int{10, 20, 30, 40, 50}

fmt.Println(arr[0]) // 10
fmt.Println(arr[4]) // 50

arr[2] = 35
fmt.Println(arr) // [10 20 35 40 50]
```

## Length

```go
arr := [4]int{1, 2, 3, 4}
fmt.Println(len(arr)) // 4
```

`len()` is a built-in function that returns the number of elements.

## Iteration

```go
arr := [3]string{"a", "b", "c"}

// Using index
for i := 0; i < len(arr); i++ {
    fmt.Println(arr[i])
}

// Using range
for i, v := range arr {
    fmt.Printf("index=%d, value=%s\n", i, v)
}
```

## Arrays are Value Types

Unlike some languages, Go arrays are **values**, not references. Assigning or passing an array **copies** all elements:

```go
original := [3]int{1, 2, 3}
copy := original
copy[0] = 999

fmt.Println(original) // [1 2 3] — unchanged
fmt.Println(copy)     // [999 2 3]
```

Same goes for function parameters:

```go
func modify(arr [3]int) {
    arr[0] = 999
}

func main() {
    nums := [3]int{1, 2, 3}
    modify(nums)
    fmt.Println(nums) // [1 2 3] — unchanged
}
```

## Comparing Arrays

Arrays are comparable if their element type is comparable:

```go
a := [3]int{1, 2, 3}
b := [3]int{1, 2, 3}
c := [3]int{4, 5, 6}

fmt.Println(a == b) // true
fmt.Println(a == c) // false
```

## Multidimensional Arrays

```go
var matrix [3][3]int
matrix = [3][3]int{
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9},
}

fmt.Println(matrix[1][2]) // 6
```

## Array Limitations

Because size is part of the type, arrays are inflexible:

- Cannot resize
- Cannot pass to a function expecting a different size
- Usually avoided in favor of slices

```go
// These are DIFFERENT types
var a [3]int
var b [4]int
// a = b // ❌ compile error: cannot use [4]int as [3]int
```

## Common Mistakes

```go
// ❌ Wrong: indexing out of bounds
arr := [3]int{1, 2, 3}
fmt.Println(arr[3]) // panic: index out of range [3] with length 3

// ✅ Correct: valid indices 0, 1, 2
fmt.Println(arr[2])

// ❌ Wrong: comparing different sizes
// [3]int and [4]int are not comparable
```

## Practice

1. Declare an array of 5 integers and initialize it with values.
2. Write a program that finds the largest element in an array.
3. Reverse an array in place (without using a second array).
4. Calculate the sum and average of all elements in an array.
5. Create a 3x3 matrix and print it in a grid format.
6. Write a function that takes an `[5]int` array and returns the sum of all elements.
7. Check if an array is a palindrome (reads same forward and backward).
