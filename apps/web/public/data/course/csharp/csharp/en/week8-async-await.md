# Async/Await & Tasks

> C# | Module 8

## Learning Objectives

- Understand async/await pattern
- Use Task and Task<T>
- Understand CancellationToken
- Implement async file I/O

---

## Program: Async Programming

```csharp
using System.Net.Http;

var client = new HttpClient();

async Task<string> FetchDataAsync(string url)
{
    var response = await client.GetAsync(url);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync();
}

var data = await FetchDataAsync("https://api.example.com/data");
Console.WriteLine(data);
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

Module 8 of 16: **Async/Await & Tasks**. C# is a modern programming language for the .NET platform. Next week: **Dependency Injection**.
