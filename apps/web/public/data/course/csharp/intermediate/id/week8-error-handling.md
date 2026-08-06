# Error Handling

> **Kategori:** C# | **Level:** Menengah | **Minggu 8:** Error Handling

## Tujuan Pembelajaran

- try-catch-finally untuk handle exception
- Multiple catch blocks dengan exception type spesifik
- Custom exception class dengan inheritance
- Throw expression dan null check
- Using statement untuk IDisposable pattern

---

## Program: Penanganan Exception

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

## Konsep Kunci

### Try-Catch
`try { ... } catch (ExceptionType ex) { ... }` — handle error.

### Multiple Catch
Catch spesifik dulu, umum di akhir. `finally` selalu dijalankan.

### Custom Exception
Inherit dari `Exception`. Tambah properties spesifik.

### Throw Expression
`name ?? throw new ArgumentNullException()` — throw inline.

### Using Statement
`using (var x = new Disposable()) { ... }` — auto dispose saat keluar scope.

---

## Eksperimen

- Buat custom exception dengan inner exception
- Eksperimen dengan multiple catch order
- Coba finally block dengan return statement
- Buat using declaration (C# 8+)
- Eksperimen dengan exception filter

---

## Tantangan

Buat program manajemen produk dengan custom exception: ProductNotFoundException, InvalidPriceException, DuplicateProductException. Handle semua case.

---

## Ringkasan

Minggu 8 dari 12: **Error Handling** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Design Patterns** (Advanced).
