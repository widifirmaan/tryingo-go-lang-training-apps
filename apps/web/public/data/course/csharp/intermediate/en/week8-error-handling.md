# Error Handling

> **Kategori:** C# | **Level:** Intermediate | **Minggu 8:** Error Handling

## Learning Objectives

- try-catch-finally for exception handling
- Multiple catch blocks with specific exception types
- Custom exception classes with inheritance
- Throw expressions and null checks
- Using statement for IDisposable pattern

---

## Program: Exception Handling

```csharp
using System;

// Custom exception
class AppException : Exception
{
    public string ErrorCode { get; }

    public AppException(string message, string errorCode)
        : base(message)
    {
        ErrorCode = errorCode;
    }

    public AppException(string message, string errorCode, Exception inner)
        : base(message, inner)
    {
        ErrorCode = errorCode;
    }
}

class ProductNotFoundException : AppException
{
    public int ProductId { get; }

    public ProductNotFoundException(int id)
        : base($"Produk {id} tidak ditemukan", "PROD_NOT_FOUND")
    {
        ProductId = id;
    }
}

class Program
{
    static double Bagi(double a, double b)
    {
        if (b == 0)
            throw new DivideByZeroException("Tidak bisa dibagi nol");
        return a / b;
    }

    static int CariProduk(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID harus positif", nameof(id));
        if (id > 100)
            throw new ProductNotFoundException(id);
        return id;
    }

    static void Main()
    {
        // Try-catch
        try
        {
            var result = Bagi(10, 2);
            Console.WriteLine($"10 / 2 = {result}");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }

        // Multiple catch
        try
        {
            var result = Bagi(5, 0);
            Console.WriteLine($"Hasil: {result}");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Divide error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"General error: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Finally block selalu dijalankan");
        }

        // Custom exception
        try
        {
            CariProduk(200);
        }
        catch (ProductNotFoundException ex)
        {
            Console.WriteLine($"Custom error [{exErrorCode}]: {ex.Message}");
        }
        catch (AppException ex)
        {
            Console.WriteLine($"App error [{ex.ErrorCode}]: {ex.Message}");
        }

        // Try pattern (C# 7+)
        if (int.TryParse("42", out int parsed))
        {
            Console.WriteLine($"\nParsed: {parsed}");
        }

        // Null check dengan throw
        string? name = null;
        try
        {
            string safeName = name ?? throw new ArgumentNullException(nameof(name));
            Console.WriteLine(safeName);
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"Null error: {ex.Message}");
        }

        // Using statement (IDisposable)
        using (var writer = new System.IO.StringWriter())
        {
            writer.WriteLine("Hello using statement");
            Console.WriteLine(writer.ToString());
        }
    }
}
```

---

## Key Concepts

### Try-Catch
Handle exceptions with try-catch-finally.

### Multiple Catch
Specific exceptions first, general last.

### Custom Exceptions
Inherit from Exception for domain-specific errors.

### Throw Expressions
Inline throw with null-coalescing operator.

### Using Statement
Automatic disposal of IDisposable resources.

---

## Experiments

- Create custom exception with inner exception
- Experiment with multiple catch order
- Try finally block with return statement
- Create using declaration (C# 8+)
- Experiment with exception filters

---

## Challenge

Build a product management program with custom exceptions: ProductNotFoundException, InvalidPriceException, DuplicateProductException. Handle all cases.

---

## Summary

Week 8 of 12: **Error Handling** (Level: Intermediate). Intermediate phase complete! Next week: **Design Patterns** (Advanced).
