# TypeScript in Backend

> TypeScript | Module 15

## Learning Objectives

- Type Express request and response
- Create middleware with types
- Use Zod for runtime validation
- Type database query results
- Apply DTO pattern

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

## Explanation

Backend TypeScript: Express Request and Response types. Middleware with type signatures. Zod for type-safe runtime validation. DTO pattern separates input/output types. Database query results must be typed to prevent undefined property access.

---

## Experiments

- Change data types in each function and see compilation errors
- Add new properties to interfaces and update implementations
- Replace `any` with `unknown` and add type guards
- Try different union and intersection type combinations

---

## Challenge

Build a program applying this week's concepts in a real case study. Use explicit type annotations on every variable and function. Ensure no `any`. Add comments explaining the types used.

---

## Summary

Module 15 of 16: **TypeScript in Backend**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **TypeScript Final Project**.
