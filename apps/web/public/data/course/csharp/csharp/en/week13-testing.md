# Testing with xUnit

> C# | Module 13

## Learning Objectives

- Write unit tests with xUnit
- Use assertions
- Use mocking with Moq
- Implement integration testing

---

## Program: Test Suite

```csharp
public class MathTests
{
    [Fact]
    public void Add_TwoNumbers_ReturnsSum()
    {
        var calculator = new Calculator();
        var result = calculator.Add(2, 3);
        Assert.Equal(5, result);
    }

    [Fact]
    public void Divide_ByZero_ThrowsException()
    {
        var calculator = new Calculator();
        Assert.Throws<DivideByZeroException>(() => calculator.Divide(10, 0));
    }
}
```

---

## Explanation

C# is a modern programming language from Microsoft for the .NET platform.
C# supports OOP, generics, LINQ, async/await, and many other modern features.
.NET is a cross-platform, open-source framework.

---

## Experiments

- Change the code above and run it
- Add a new class with inheritance
- Try a LINQ query on an array

---

## Challenge

Build a simple C# application using this weeks concepts.
Run with: dotnet run

---

## Summary

Module 13 of 16: **Testing with xUnit**. C# is a modern programming language for the .NET platform. Next week: **Configuration & Logging**.
