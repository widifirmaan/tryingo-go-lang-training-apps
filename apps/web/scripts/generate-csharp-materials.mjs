import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/csharp/csharp');

const MODULES = [
  { id: 1, f: 'pengenalan-csharp', lid: 'Pengenalan C# & .NET', len: 'Introduction to C# & .NET', pid: 'Hello C#', pen: 'Hello C#' },
  { id: 2, f: 'variables-types', lid: 'Variables & Data Types', len: 'Variables & Data Types', pid: 'Data Types', pen: 'Data Types' },
  { id: 3, f: 'control-flow', lid: 'Control Flow', len: 'Control Flow', pid: 'Conditionals & Loops', pen: 'Conditionals & Loops' },
  { id: 4, f: 'oop-basics', lid: 'OOP: Classes & Objects', len: 'OOP: Classes & Objects', pid: 'Classes', pen: 'Classes' },
  { id: 5, f: 'oop-advanced', lid: 'OOP: Inheritance & Polymorphism', len: 'OOP: Inheritance & Polymorphism', pid: 'Inheritance', pen: 'Inheritance' },
  { id: 6, f: 'generics', lid: 'Generics & Collections', len: 'Generics & Collections', pid: 'Generic Types', pen: 'Generic Types' },
  { id: 7, f: 'linq', lid: 'LINQ Queries', len: 'LINQ Queries', pid: 'Data Queries', pen: 'Data Queries' },
  { id: 8, f: 'async-await', lid: 'Async/Await & Tasks', len: 'Async/Await & Tasks', pid: 'Async Programming', pen: 'Async Programming' },
  { id: 9, f: 'dependency-injection', lid: 'Dependency Injection', len: 'Dependency Injection', pid: 'DI Pattern', pen: 'DI Pattern' },
  { id: 10, f: 'minimal-apis', lid: 'Minimal APIs', len: 'Minimal APIs', pid: 'Web API', pen: 'Web API' },
  { id: 11, f: 'entity-framework', lid: 'Entity Framework Core', len: 'Entity Framework Core', pid: 'Database Access', pen: 'Database Access' },
  { id: 12, f: 'middleware', lid: 'Middleware & HTTP Pipeline', len: 'Middleware & HTTP Pipeline', pid: 'HTTP Pipeline', pen: 'HTTP Pipeline' },
  { id: 13, f: 'testing', lid: 'Testing with xUnit', len: 'Testing with xUnit', pid: 'Test Suite', pen: 'Test Suite' },
  { id: 14, f: 'configuration', lid: 'Configuration & Logging', len: 'Configuration & Logging', pid: 'App Config', pen: 'App Config' },
  { id: 15, f: 'deployment', lid: 'Deployment & Docker', len: 'Deployment & Docker', pid: 'Containerize App', pen: 'Containerize App' },
  { id: 16, f: 'capstone', lid: 'Capstone: API Project', len: 'Capstone: .NET API Project', pid: 'Complete API', pen: 'Complete API' },
];

const OBJ = {
  1: { id: ['Mengenal C# sebagai bahasa pemrograman .NET', 'Menginstall .NET SDK', 'Memahami struktur proyek C#', 'Menulis program C# pertama'], en: ['Understand C# as a .NET programming language', 'Install .NET SDK', 'Understand C# project structure', 'Write your first C# program'] },
  2: { id: ['Mendeklarasikan variabel dengan tipe data', 'Memahami tipe value dan reference', 'Menggunakan var dan explicit typing', 'Mengkonversi tipe data (casting)'], en: ['Declare variables with data types', 'Understand value and reference types', 'Use var and explicit typing', 'Convert data types (casting)'] },
  3: { id: ['Menggunakan if/else dan switch', 'Menggunakan for, while, dan foreach loop', 'Memahami break dan continue', 'Menggunakan pattern matching'], en: ['Use if/else and switch', 'Use for, while, and foreach loops', 'Understand break and continue', 'Use pattern matching'] },
  4: { id: ['Membuat class dan object', 'Memahami properties dan methods', 'Menggunakan constructor', 'Memahami access modifiers'], en: ['Create class and object', 'Understand properties and methods', 'Use constructors', 'Understand access modifiers'] },
  5: { id: ['Memahami inheritance dengan base dan derived', 'Menggunakan override dan virtual', 'Memahami abstract class dan interface', 'Menggunakan sealed keyword'], en: ['Understand inheritance with base and derived', 'Use override and virtual', 'Understand abstract class and interface', 'Use sealed keyword'] },
  6: { id: ['Memahami generic types', 'Menggunakan List, Dictionary, dan HashSet', 'Memahami nullable reference types', 'Menggunakan tuples dan records'], en: ['Understand generic types', 'Use List, Dictionary, and HashSet', 'Understand nullable reference types', 'Use tuples and records'] },
  7: { id: ['Menggunakan LINQ to Objects', 'Memahami query syntax dan method syntax', 'Menggunakan Where, Select, GroupBy', 'Memahami deferred execution'], en: ['Use LINQ to Objects', 'Understand query syntax and method syntax', 'Use Where, Select, GroupBy', 'Understand deferred execution'] },
  8: { id: ['Memahami async/await pattern', 'Menggunakan Task dan Task<T>', 'Memahami CancellationToken', 'Mengimplementasi async file I/O'], en: ['Understand async/await pattern', 'Use Task and Task<T>', 'Understand CancellationToken', 'Implement async file I/O'] },
  9: { id: ['Memahami Dependency Injection pattern', 'Menggunakan IServiceCollection', 'Mengimplementasi constructor injection', 'Memahami service lifetimes'], en: ['Understand Dependency Injection pattern', 'Use IServiceCollection', 'Implement constructor injection', 'Understand service lifetimes'] },
  10: { id: ['Membuat Minimal API dengan .NET', 'Menggunakan MapGet, MapPost, MapPut, MapDelete', 'Menggunakan route parameters', 'Mengimplementasi request/response models'], en: ['Create Minimal API with .NET', 'Use MapGet, MapPost, MapPut, MapDelete', 'Use route parameters', 'Implement request/response models'] },
  11: { id: ['Memahami Entity Framework Core', 'Menggunakan code-first migrations', 'Memahami DbContext dan DbSet', 'Mengimplementasi CRUD dengan EF Core'], en: ['Understand Entity Framework Core', 'Use code-first migrations', 'Understand DbContext and DbSet', 'Implement CRUD with EF Core'] },
  12: { id: ['Memahami middleware pipeline', 'Membuat custom middleware', 'Menggunakan logging middleware', 'Memahami exception handling middleware'], en: ['Understand middleware pipeline', 'Create custom middleware', 'Use logging middleware', 'Understand exception handling middleware'] },
  13: { id: ['Menulis unit test dengan xUnit', 'Menggunakan assertions', 'Menggunakan mocking dengan Moq', 'Mengimplementasi integration testing'], en: ['Write unit tests with xUnit', 'Use assertions', 'Use mocking with Moq', 'Implement integration testing'] },
  14: { id: ['Menggunakan IConfiguration untuk app settings', 'Mengimplementasi logging dengan ILogger', 'Menggunakan environment variables', 'Memahami appsettings.json'], en: ['Use IConfiguration for app settings', 'Implement logging with ILogger', 'Use environment variables', 'Understand appsettings.json'] },
  15: { id: ['Mempersiapkan deployment', 'Membuat Docker container', 'Menggunakan Docker Compose', 'Memahami production configuration'], en: ['Prepare for deployment', 'Create Docker container', 'Use Docker Compose', 'Understand production configuration'] },
  16: { id: ['Menggabungkan semua konsep C#', 'Membangun REST API lengkap', 'Mengimplementasi authentication', 'Mempersiapkan production deployment'], en: ['Combine all C# concepts', 'Build a complete REST API', 'Implement authentication', 'Prepare for production deployment'] },
};

const CODE = {
  1: `using System;\n\nnamespace HelloCSharp\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Console.WriteLine("Hello, C#!");\n            Console.WriteLine(".NET is a powerful platform.");\n        }\n    }\n}`,
  2: `int number = 42;\nstring name = "Budi";\ndouble price = 99.99;\nbool isActive = true;\n\nvar message = "Hello";\nvar count = 10;\n\nConsole.WriteLine($"Number: {number}");\nConsole.WriteLine($"Name: {name}");\nConsole.WriteLine($"Price: {price:C}");`,
  3: `int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };\n\nforeach (var num in numbers)\n{\n    if (num % 2 == 0)\n        Console.WriteLine($"{num} is even");\n    else\n        Console.WriteLine($"{num} is odd");\n}\n\nswitch (DateTime.Now.DayOfWeek)\n{\n    case DayOfWeek.Monday:\n        Console.WriteLine("Monday");\n        break;\n    default:\n        Console.WriteLine("Other day");\n        break;\n}`,
  4: `public class Person\n{\n    public string Name { get; set; }\n    public int Age { get; set; }\n\n    public Person(string name, int age)\n    {\n        Name = name;\n        Age = age;\n    }\n\n    public void Greet()\n    {\n        Console.WriteLine($"Hello, I am {Name}, {Age} years old.");\n    }\n}\n\nvar person = new Person("Budi", 25);\nperson.Greet();`,
  5: `public class Animal\n{\n    public string Name { get; set; }\n    public virtual void Speak()\n    {\n        Console.WriteLine("Some sound");\n    }\n}\n\npublic class Dog : Animal\n{\n    public override void Speak()\n    {\n        Console.WriteLine("Woof!");\n    }\n}\n\npublic class Cat : Animal\n{\n    public override void Speak()\n    {\n        Console.WriteLine("Meow!");\n    }\n}`,
  6: `List<string> names = new List<string> { "Budi", "Alice", "Siti" };\nDictionary<string, int> scores = new Dictionary<string, int>\n{\n    { "Budi", 90 },\n    { "Alice", 85 },\n    { "Siti", 92 }\n};\n\nforeach (var kvp in scores)\n{\n    Console.WriteLine($"{kvp.Key}: {kvp.Value}");\n}\n\nrecord Point(int X, int Y);\nvar p = new Point(10, 20);`,
  7: `int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };\n\nvar evens = numbers.Where(n => n % 2 == 0).ToList();\nvar squares = numbers.Select(n => n * n).ToList();\nvar grouped = numbers.GroupBy(n => n % 2 == 0 ? "Even" : "Odd");\n\nforeach (var g in grouped)\n{\n    Console.WriteLine($"{g.Key}: {string.Join(", ", g)}");\n}`,
  8: `using System.Net.Http;\n\nvar client = new HttpClient();\n\nasync Task<string> FetchDataAsync(string url)\n{\n    var response = await client.GetAsync(url);\n    response.EnsureSuccessStatusCode();\n    return await response.Content.ReadAsStringAsync();\n}\n\nvar data = await FetchDataAsync("https://api.example.com/data");\nConsole.WriteLine(data);`,
  9: `public interface IMessageService\n{\n    void Send(string message);\n}\n\npublic class EmailService : IMessageService\n{\n    public void Send(string message)\n    {\n        Console.WriteLine($"Email sent: {message}");\n    }\n}\n\n// In Program.cs or Startup.cs:\nservices.AddScoped<IMessageService, EmailService>();`,
  10: `var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\napp.MapGet("/", () => "Hello World!");\napp.MapGet("/api/users", () => new[] { "Budi", "Alice" });\napp.MapPost("/api/users", (User user) =>\n{\n    return Results.Created($"/api/users/{user.Id}", user);\n});\n\napp.Run();`,
  11: `public class AppDbContext : DbContext\n{\n    public DbSet<User> Users { get; set; }\n    public DbSet<Post> Posts { get; set; }\n\n    protected override void OnConfiguring(DbContextOptionsBuilder options)\n        => options.UseNpgsql("Host=localhost;Database=mydb");\n}\n\npublic class User\n{\n    public int Id { get; set; }\n    public string Name { get; set; }\n}\n\n// Migration:\n// dotnet ef migrations add InitialCreate\n// dotnet ef database update`,
  12: `app.UseHttpsRedirection();\napp.UseAuthentication();\napp.UseAuthorization();\n\napp.Use(async (context, next) =>\n{\n    Console.WriteLine($"[{DateTime.Now}] {context.Request.Method} {context.Request.Path}");\n    await next(context);\n});\n\napp.MapGet("/", () => "Hello");`,
  13: `public class MathTests\n{\n    [Fact]\n    public void Add_TwoNumbers_ReturnsSum()\n    {\n        var calculator = new Calculator();\n        var result = calculator.Add(2, 3);\n        Assert.Equal(5, result);\n    }\n\n    [Fact]\n    public void Divide_ByZero_ThrowsException()\n    {\n        var calculator = new Calculator();\n        Assert.Throws<DivideByZeroException>(() => calculator.Divide(10, 0));\n    }\n}`,
  14: `var builder = WebApplication.CreateBuilder(args);\n\nbuilder.Configuration\n    .AddJsonFile("appsettings.json")\n    .AddEnvironmentVariables();\n\nbuilder.Logging\n    .AddConsole()\n    .AddDebug()\n    .SetMinimumLevel(LogLevel.Information);`,
  15: `FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build\nWORKDIR /app\nCOPY . .\nRUN dotnet publish -c Release -o out\n\nFROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime\nWORKDIR /app\nCOPY --from=build /app/out .\nENTRYPOINT ["dotnet", "MyApp.dll"]`,
  16: `# Full .NET API Project\n# - Minimal API with CRUD endpoints\n# - Entity Framework Core for database\n# - Dependency Injection\n# - Authentication middleware\n# - Logging and configuration\n# - Docker containerization\n# - Unit and integration tests`,
};

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => '- ' + o).join('\n');
  const code = CODE[mod.id];
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? mod.id + 1 + '. ' + nextModule.lid : nextModule.len)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const summary = isId
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. C# adalah bahasa pemrograman modern untuk platform .NET. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. C# is a modern programming language for the .NET platform. Next week: **${nextWeek}**.`;

  return '# ' + title + '\n\n'
    + '> C# | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```csharp\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + (isId
      ? 'C# adalah bahasa pemrograman modern dari Microsoft untuk platform .NET.\nC# mendukung OOP, generics, LINQ, async/await, dan banyak fitur modern lainnya.\n.NET adalah framework yang cross-platform dan open-source.'
      : 'C# is a modern programming language from Microsoft for the .NET platform.\nC# supports OOP, generics, LINQ, async/await, and many other modern features.\n.NET is a cross-platform, open-source framework.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + '- ' + (isId ? 'Ubah kode di atas dan jalankan' : 'Change the code above and run it') + '\n'
    + '- ' + (isId ? 'Tambah class baru dengan inheritance' : 'Add a new class with inheritance') + '\n'
    + '- ' + (isId ? 'Coba LINQ query pada array' : 'Try a LINQ query on an array') + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + (isId
      ? 'Buat aplikasi C# sederhana menggunakan konsep minggu ini.\nJalankan dengan: dotnet run'
      : 'Build a simple C# application using this weeks concepts.\nRun with: dotnet run')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Ringkasan' : 'Summary') + '\n\n'
    + summary + '\n';
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', 'week' + mod.id + '-' + mod.f + '.md'), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', 'week' + mod.id + '-' + mod.f + '.md'), enContent, 'utf8');
  console.log('  ' + mod.id + '. ' + mod.lid + ' / ' + mod.len);
}

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' C# curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);