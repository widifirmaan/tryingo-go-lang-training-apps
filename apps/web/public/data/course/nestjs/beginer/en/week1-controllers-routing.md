# Controllers & Routing

## Why This Matters

NestJS brings Angular/Spring-style architectural discipline to Node: modules, dependency injection, decorators. Its strict structure keeps growing applications maintainable for whole teams.

Practice program: *"First Controller"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand NestJS Controller architecture
- Routing: @Get, @Post, @Put, @Delete
- Decorators: @Controller, @Param, @Query, @Body
- Request handling: params, query, body
- Response formatting and status codes


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Node.js LTS (v20+))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v20.x.x
10.x.x
```

> **Prerequisite Note:** NestJS compiles via the TypeScript compiler or SWC for high-speed builds.

---

### 2. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npx @nestjs/cli new my-nest-app --package-manager npm
cd my-nest-app
```
- **Details:** Invokes NestJS CLI to scaffold modular architecture with controllers and services.
- **Navigate to the project directory:**
```bash
cd my-nest-app
```

---

### 3. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm run start:dev
```
Open in browser or terminal: `http://localhost:3000`

> ℹ️ NestJS server runs with automatic file-watch reloading at port 3000.

**Initial Entry File (`src/app.controller.ts`):**
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): { status: string; message: string; timestamp: string } {
    return {
      status: 'success',
      message: 'Halo dari Nest.js Enterprise API!',
      timestamp: new Date().toISOString(),
    };
  }
}
```
HTTP Controller featuring standard NestJS decorators.

---

### 4. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-nest-app/
├── src/
│   ├── app.controller.ts    # Endpoint HTTP route handler
│   ├── app.service.ts       # Logika bisnis & pengolahan data
│   ├── app.module.ts        # Root module penyusun aplikasi
│   └── main.ts              # Bootstrap entrypoint aplikasi
├── test/                    # End-to-end (e2e) tests
├── tsconfig.json            # Konfigurasi TypeScript & decorators
├── nest-cli.json            # Konfigurasi CLI NestJS
└── package.json             # Dependensi @nestjs/core
```
Clean separation of concerns between Controllers (HTTP routing) and Services (business logic).

---

### 5. Beginner Tips & Best Practices
- Use `nest g resource users` to scaffold a complete CRUD module with DTOs in seconds.
- Enable global validation using `ValidationPipe` in `main.ts` with `class-validator`.

---

## Program: First Controller

```javascript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  private users = [
    { id: 1, nama: 'Budi', email: 'budi@mail.com' },
    { id: 2, nama: 'Siti', email: 'siti@mail.com' },
  ];

  @Get()
  findAll() {
    return { success: true, data: this.users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.users.find(u => u.id === parseInt(id));
    return { success: true, data: user };
  }

  @Post()
  create(@Body() createUserDto: { nama: string; email: string }) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return { success: true, data: newUser };
  }
}

console.log('NestJS Controller Simulation:');
console.log('GET /users -> Returns all users');
console.log('GET /users/1 -> Returns user by ID');
console.log('POST /users -> Creates new user');
console.log('Decorators: @Controller, @Get, @Post, @Param, @Body');
```

---

## Key Concepts

### Controller
Class decorated with @Controller('path').

### Routing
HTTP method decorators.

### Decorators
@Param, @Body, @Query for extracting data.

### Response
Auto-serialized to JSON.

---

## Experiments

- Add PUT and DELETE routes
- Create new controller for products
- Add query string filtering
- Implement response interceptor

---

## Challenge

Build complete Users Controller: CRUD with validation, pagination, and error handling.

---

## Summary

Week 1 of 12: **Controllers & Routing** (Level: Beginner). Next week: **Providers & Services**.
