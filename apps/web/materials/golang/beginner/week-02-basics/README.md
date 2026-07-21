# Week 2: Basics

## Learning Objectives
- Declare variables using var, short declaration, and const
- Understand Go's basic data types
- Work with zero values and nil
- Use the fmt package for output
- Format strings and numbers

## Lessons
1. [Variables & Declaration](01-variables.md) - var, :=, and scope
2. [Constants & Iota](02-constants.md) - Immutable values and enumerations
3. [Basic Data Types](03-data-types.md) - int, float, string, bool, byte, rune
4. [Zero Values](04-zero-values.md) - Default values for every type
5. [Printing & Formatting](05-fmt.md) - fmt.Println, Printf, Sprintf, and more

## Project: Temperature Converter
Build a program that converts between Celsius, Fahrenheit, and Kelvin.

## Key Takeaways
- Use `:=` for short variable declaration inside functions
- Use `var` for zero-value initialization or package-level variables
- Go has strong typing: no implicit conversions between types
- Every type has a zero value (no null/nil for basic types)
- `fmt` package provides powerful formatting verbs
