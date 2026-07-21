# Week 3: Control Flow

Control flow determines the order in which your program executes code. This week you'll learn how to make decisions, repeat operations, and manage resource cleanup in Go.

## Learning Objectives

- Write conditional logic using `if`, `else if`, and `else`
- Use the compact `if` with initialization statement
- Build loops with `for`, including while-style and infinite loops
- Iterate over collections with `range`
- Control loop execution with `break` and `continue`
- Switch between execution paths with `switch` statements
- Match types using `switch` with type assertions
- Defer function calls for cleanup and understand LIFO order

## Lessons

| Lesson | Topic | Key Concepts |
|--------|-------|--------------|
| 01 | if-else | if/else if/else, comparison operators, if with initialization |
| 02 | for loops | for loop syntax, while pattern, infinite loop, range, break/continue |
| 03 | switch | expression switch, type switch, fallthrough, default case |
| 04 | defer | defer statement, LIFO stack, practical use cases |

## Weekly Project: Number Guessing Game

Build a terminal-based number guessing game that applies all control flow concepts:

- The program picks a random number between 1 and 100
- The user guesses numbers in a loop until they get it right
- `if/else` tells the user "too high" or "too low"
- `for` loop keeps the game running until correct
- `switch` handles different response messages based on guess count
- `defer` prints a goodbye message when the game ends

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano())
    target := rand.Intn(100) + 1
    var guess int
    attempts := 0

    defer fmt.Println("Thanks for playing!")

    for {
        fmt.Print("Enter your guess (1-100): ")
        fmt.Scan(&guess)
        attempts++

        if guess < target {
            fmt.Println("Too low!")
        } else if guess > target {
            fmt.Println("Too high!")
        } else {
            switch {
            case attempts <= 3:
                fmt.Println("Excellent!")
            case attempts <= 7:
                fmt.Println("Good job!")
            default:
                fmt.Println("You got it!")
            }
            fmt.Printf("You guessed it in %d attempts.\n", attempts)
            break
        }
    }
}
```

## Prerequisites

- Week 1: Variables, types, and constants
- Week 2: fmt package, basic input/output, `Hello, World!`
