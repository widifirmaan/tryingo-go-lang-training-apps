# TypeScript di Backend

> TypeScript | Modul 15

## Tujuan Pembelajaran

- Mengetik request dan response Express
- Membuat middleware dengan tipe
- Menggunakan Zod untuk validasi runtime
- Mengetik database query result
- Menerapkan DTO pattern

---

## Program: API Server

```typescript
// Express-like API types (conceptual — demonstrates backend TS)

// Request & Response types
interface ApiRequest<T = any> {
  body: T;
  params: Record<string, string>;
  query: Record<string, string>;
  headers: Record<string, string>;
}

interface ApiResponse {
  status(code: number): ApiResponse;
  json(data: unknown): string;
}

// Simple router type
type RouteHandler = (req: ApiRequest, res: ApiResponse) => string;

interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  handler: RouteHandler;
}

class Router {
  private routes: Route[] = [];
  get(path: string, handler: RouteHandler): void {
    this.routes.push({ method: 'GET', path, handler });
  }
  post(path: string, handler: RouteHandler): void {
    this.routes.push({ method: 'POST', path, handler });
  }
}

// DTO (Data Transfer Object) pattern
interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
}

// Zod-like validation (simplified)
function validateCreateUser(data: unknown): CreateUserDTO {
  const dto = data as CreateUserDTO;
  if (!dto.name || !dto.email || !dto.password) {
    throw new Error('Missing required fields');
  }
  return { name: dto.name, email: dto.email, password: dto.password };
}

try {
  const valid = validateCreateUser({
    name: 'Budi',
    email: 'budi@mail.com',
    password: 'secret123',
  });
  console.log('Validated DTO:', valid);
} catch (e) {
  console.error(e);
}

// Middleware type
type Middleware = (req: ApiRequest, res: ApiResponse, next: () => void) => void;

function loggerMiddleware(req: ApiRequest, _res: ApiResponse, next: () => void): void {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
}

```

---

## Penjelasan

Backend TypeScript: tipe Request dan Response Express. Middleware dengan type signature. Zod untuk validasi runtime yang type-safe. DTO pattern memisahkan input/output types. Database query result harus di-tipe untuk mencegah akses properti undefined.

---

## Eksperimen

- Ubah tipe data di setiap fungsi dan lihat error kompilasi
- Tambah properti baru ke interface dan update implementasinya
- Ganti `any` dengan `unknown` dan tambahkan type guard
- Coba kombinasi union dan intersection type yang berbeda

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan type annotation eksplisit di setiap variable dan function. Pastikan tidak ada `any`. Tambahkan komentar yang menjelaskan tipe yang digunakan.

---

## Ringkasan

Modul 15 dari 16: **TypeScript di Backend**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **16. Proyek Akhir TypeScript**.
