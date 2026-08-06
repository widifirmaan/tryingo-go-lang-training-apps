# Controllers & Routing

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 1:** Controllers & Routing

## Tujuan Pembelajaran

- Memahami arsitektur Controller di NestJS
- Routing: @Get, @Post, @Put, @Delete
- Decorators: @Controller, @Param, @Query, @Body
- Request handling: params, query, body
- Response formatting dan status codes

---

## Program: Controller Pertama

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

## Konsep Kunci

### Controller
Class dengan decorator @Controller('path'). Handle HTTP requests.

### Routing
@Get(), @Post(), @Put(), @Delete() untuk HTTP methods.

### Decorators
@Param('id') ambil URL param, @Body() ambil request body, @Query() ambil query string.

### Response
Return object langsung, NestJS auto-serialize ke JSON.

---

## Eksperimen

- Tambah route PUT dan DELETE
- Buat controller baru untuk products
- Tambah query string filtering
- Implementasikan response interceptor

---

## Tantangan

Buat Users Controller lengkap: CRUD dengan validation, pagination, dan error handling.

---

## Ringkasan

Minggu 1 dari 12: **Controllers & Routing** (Level: Pemula). Minggu depan: **Providers & Services**.
