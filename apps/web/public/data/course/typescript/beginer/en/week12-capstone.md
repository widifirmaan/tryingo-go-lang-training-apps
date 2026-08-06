# Capstone: Type-Safe API Client

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 12:** Capstone: Type-Safe API Client

## Learning Objectives

- Combine all concepts: generics, branded types, conditional types
- Type-safe API client with endpoint typing
- Branded types to prevent ID mixups
- Generic methods with type constraints
- Type-level programming for API response mapping

---

## Program: API Client Library

```typescript
// Capstone: Type-Safe REST API Client
// Menggabungkan semua konsep TypeScript

// === Branded Types ===
type ID<T> = string & { __brand: T };
type UserID = ID<"User">;
type PostID = ID<"Post">;

// === API Response Types ===
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface User {
    id: UserID;
    name: string;
    email: string;
    role: "admin" | "user";
}

interface Post {
    id: PostID;
    title: string;
    content: string;
    authorId: UserID;
}

// === Type-Safe API Client ===
class ApiClient {
    constructor(private baseUrl: string) {}

    async get<T>(path: string): Promise<ApiResponse<T>> {
        console.log("GET", this.baseUrl + path);
        // Simulasi response
        return { data: {} as T, status: 200, message: "OK" };
    }

    async post<T, D>(path: string, body: D): Promise<ApiResponse<T>> {
        console.log("POST", this.baseUrl + path, body);
        return { data: {} as T, status: 201, message: "Created" };
    }

    async put<T, D>(path: string, body: D): Promise<ApiResponse<T>> {
        console.log("PUT", this.baseUrl + path, body);
        return { data: {} as T, status: 200, message: "Updated" };
    }

    async delete(path: string): Promise<{ status: number }> {
        console.log("DELETE", this.baseUrl + path);
        return { status: 204 };
    }
}

// === Typed Endpoints ===
type ApiEndpoints = {
    "/users": { GET: User[]; POST: User };
    "/users/:id": { GET: User; PUT: User; DELETE: void };
    "/posts": { GET: Post[]; POST: Post };
    "/posts/:id": { GET: Post; PUT: Post; DELETE: void };
};

// === Type-Safe Request Builder ===
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

class TypedClient {
    constructor(private client: ApiClient) {}

    async request<M extends HttpMethod, P extends keyof ApiEndpoints>(
        method: M,
        path: P
    ): Promise<ApiEndpoints[P][M]> {
        return {} as ApiEndpoints[P][M];
    }
}

// === Demo ===
console.log("=== Type-Safe API Client ===");

const api = new ApiClient("https://api.example.com");

// Type-safe calls
async function demo() {
    const users = await api.get<User[]>("/users");
    console.log("Users status:", users.status);

    const newUser = await api.post<User, Omit<User, "id">>("/users", {
        name: "Budi",
        email: "budi@mail.com",
        role: "user"
    });
    console.log("Created status:", newUser.status);

    await api.delete("/users/123");
}

demo();

// === Architecture Summary ===
console.log("\n=== Architecture ===");
console.log("1. Branded Types: type-safe IDs");
console.log("2. Generic Client: type-safe requests");
console.log("3. Typed Endpoints: path → response mapping");
console.log("4. Discriminated Unions: API responses");
console.log("5. Utility Types: Partial, Omit, Pick");
console.log("6. Conditional Types: response transformers");
console.log("7. Template Literals: URL builders");

// === Key Takeaways ===
console.log("\n=== Key Takeaways ===");
console.log("- TypeScript catches errors at compile-time");
console.log("- Generics enable reusable type-safe code");
console.log("- Utility types transform existing types");
console.log("- Branded types prevent ID mixups");
console.log("- Conditional types enable type-level logic");
```

---

## Key Concepts

### Capstone Project
Type-Safe API Client combining all 11 weeks of learning.

### Architecture
- Branded Types: UserID vs PostID cannot be mixed up
- Generic Client: type-safe requests
- Typed Endpoints: path → response type mapping
- Conditional Types: transform responses

### Features
- CRUD operations with type safety
- Endpoint typing
- Response transformation
- Error handling

### Best Practices
- Strict mode
- No implicit any
- Proper generic constraints
- Type inference where possible

---

## Experiments

- Add request/response interceptors
- Create type-safe query builder
- Add caching layer with generics
- Create type-safe WebSocket client
- Add retry logic with exponential backoff

---

## Challenge

Build a full API client library: CRUD, interceptors, caching, retry, type-safe endpoints, error handling.

---

## Summary

Week 12 of 12: **Capstone: Type-Safe API Client** (Level: Complete TypeScript). Complete! 🎉 You've mastered TypeScript from scratch to expert.
