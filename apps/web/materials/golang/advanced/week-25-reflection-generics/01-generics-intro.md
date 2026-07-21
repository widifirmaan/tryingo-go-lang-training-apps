# Generics Introduction

Generics allow writing type-safe, reusable code without sacrificing performance.

## Basic Generic Function

```go
package main

import "fmt"

func Reverse[T any](s []T) []T {
    result := make([]T, len(s))
    for i, v := range s {
        result[len(s)-1-i] = v
    }
    return result
}

func main() {
    ints := []int{1, 2, 3, 4, 5}
    fmt.Println(Reverse(ints)) // [5 4 3 2 1]

    strs := []string{"a", "b", "c"}
    fmt.Println(Reverse(strs)) // [c b a]
}
```

## Generic Types

```go
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

func (s *Stack[T]) Peek() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    return s.items[len(s.items)-1], true
}

func (s *Stack[T]) IsEmpty() bool {
    return len(s.items) == 0
}
```

## Generic Higher-Order Functions

```go
func Map[T, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

func Filter[T any](s []T, f func(T) bool) []T {
    var result []T
    for _, v := range s {
        if f(v) {
            result = append(result, v)
        }
    }
    return result
}

func Reduce[T, U any](s []T, initial U, f func(U, T) U) U {
    result := initial
    for _, v := range s {
        result = f(result, v)
    }
    return result
}

// Usage
numbers := []int{1, 2, 3, 4, 5, 6}
doubled := Map(numbers, func(n int) int { return n * 2 })
evens := Filter(numbers, func(n int) bool { return n%2 == 0 })
sum := Reduce(numbers, 0, func(acc, n int) int { return acc + n })
```

## Practice

1. Implement a generic `Set[T comparable]` type
2. Write a generic `BinaryTree[T any]` with comparison constraint
3. Create a generic `Cache[K comparable, V any]`
4. Build a generic `Tuple[A, B any]` type
