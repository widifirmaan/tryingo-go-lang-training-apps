# Week 6: Structs & Methods

Structs let you define custom data types by grouping related fields together. Methods add behavior to those types. This week covers the foundations of object-oriented programming in Go.

## Learning Objectives

- Define and initialize struct types
- Access and modify struct fields
- Define methods with value and pointer receivers
- Use pointers to share and modify structs
- Understand nil pointers and pointer safety
- Use struct tags for metadata and JSON serialization

## Lessons

| Lesson | Topic | Key Concepts |
|--------|-------|--------------|
| 01 | Structs | type definition, fields, initialization, accessing fields |
| 02 | Methods | Value receivers, pointer receivers, method sets |
| 03 | Pointers | & operator, * operator, pointer to struct, nil |
| 04 | Struct Tags | Tags, JSON tags, reflection, field metadata |

## Weekly Project: Employee Management System

Build a program that manages employee records using structs, methods, pointers, and JSON tags.

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Employee struct {
    ID     int     `json:"id"`
    Name   string  `json:"name"`
    Salary float64 `json:"salary"`
    Active bool    `json:"active"`
}

func (e *Employee) GiveRaise(amount float64) {
    e.Salary += amount
}

func (e *Employee) Deactivate() {
    e.Active = false
}

func main() {
    emp := Employee{
        ID:     1,
        Name:   "Alice Smith",
        Salary: 50000,
        Active: true,
    }

    emp.GiveRaise(5000)
    fmt.Printf("%s salary: %.2f\n", emp.Name, emp.Salary) // 55000

    data, _ := json.MarshalIndent(emp, "", "  ")
    fmt.Println(string(data))
}
```

## Prerequisites

- Week 4: Functions (parameters, return values)
- Week 5: Data structures (slices, maps)
