# Controllers & Routing

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 1:** Controllers & Routing

## Learning Objectives

- Understand NestJS Controller architecture
- Routing: @Get, @Post, @Put, @Delete
- Decorators: @Controller, @Param, @Query, @Body
- Request handling: params, query, body
- Response formatting and status codes

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Jest Runner** (`firsttris.vscode-jest-runner`): Run unit & e2e tests right from editor
- **Prettier** (`esbenp.prettier-vscode`): Prettier code formatting

Or install all recommended extensions at once via terminal:
```bash
code --install-extension firsttris.vscode-jest-runner --install-extension esbenp.prettier-vscode
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+))
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

> 💡 **Prerequisite Note:** NestJS compiles via the TypeScript compiler or SWC for high-speed builds.

---

### 3. Initializing a Blank Project (Scaffolding)
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

### 4. Running the Local Dev Server & First Entry File
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

### 5. New Project Directory Structure
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

### 6. Beginner Tips & Best Practices
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
