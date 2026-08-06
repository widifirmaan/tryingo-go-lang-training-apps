# Controllers & Routing

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 1:** Controllers & Routing

## Learning Objectives

- Understand NestJS Controller architecture
- Routing: @Get, @Post, @Put, @Delete
- Decorators: @Controller, @Param, @Query, @Body
- Request handling: params, query, body
- Response formatting and status codes

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
