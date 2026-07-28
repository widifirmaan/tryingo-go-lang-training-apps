# TypeScript Final Project

> TypeScript | Module 16

## Learning Objectives

- Combine all TypeScript concepts
- Design type-safe architecture
- Manage state with strict types
- Build end-to-end typed API layer
- Deploy a TypeScript project

---

## Program: Full-Stack App

```typescript
// Full-stack TypeScript demo — combines all concepts

// === Shared Types ===
interface User {
  id: number;
  name: string;
  email: string;
}

type ApiResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
  | { status: 'loading' };

// === Generic API Client ===
class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(path: string): Promise<ApiResult<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`);
      const data = await res.json();
      return { status: 'success', data };
    } catch (err) {
      return {
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
}

// === Repository Pattern ===
interface Repository<T> {
  findAll(): Promise<ApiResult<T[]>>;
  findById(id: number): Promise<ApiResult<T>>;
  create(data: Partial<T>): Promise<ApiResult<T>>;
}

class UserRepository implements Repository<User> {
  constructor(private client: ApiClient) {}
  async findAll() { return this.client.get<User[]>('/users'); }
  async findById(id: number) { return this.client.get<User>(`/users/${id}`); }
  async create(data: Partial<User>) { return this.client.get<User>('/users'); }
}

// === Usage demo (no actual network call) ===
const repo = new UserRepository(new ApiClient('https://api.example.com'));
console.log('Repository pattern ready');
console.log('Type-safe from API to UI layer');

// === Type-safe state reducer ===
type Action =
  | { type: 'SET_USER'; user: User }
  | { type: 'CLEAR_USER' }
  | { type: 'SET_LOADING'; loading: boolean };

type State = {
  user: User | null;
  loading: boolean;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.user, loading: false };
    case 'CLEAR_USER': return { ...state, user: null };
    case 'SET_LOADING': return { ...state, loading: action.loading };
    default: return state;
  }
}

const initialState: State = { user: null, loading: false };
const newState = reducer(initialState, {
  type: 'SET_USER',
  user: { id: 1, name: 'Budi', email: 'budi@mail.com' },
});
console.log('State after reducer:', newState);
console.log('✅ Final Project — all TypeScript concepts applied!');

```

---

## Explanation

Final project combines: generic API client, repository pattern, discriminated unions for state management, type assertions, and interface contracts. Type-safe from database to UI. End-to-end type safety is TypeScript's primary goal.

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

Module 16 of 16: **TypeScript Final Project**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Complete! 🎉**.
