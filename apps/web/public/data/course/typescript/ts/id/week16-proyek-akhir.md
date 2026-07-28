# Proyek Akhir TypeScript

> TypeScript | Modul 16

## Tujuan Pembelajaran

- Menggabungkan semua konsep TypeScript
- Mendesain arsitektur type-safe
- Mengelola state dengan tipe yang ketat
- Membangun API layer dengan tipe end-to-end
- Men-deploy project TypeScript

---

## Program: Aplikasi Full-Stack

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

## Penjelasan

Proyek akhir menggabungkan: generic API client, repository pattern, discriminated union untuk state management, type assertion, dan interface contracts. Type-safe dari database hingga UI. End-to-end type safety adalah tujuan utama TypeScript.

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

Modul 16 dari 16: **Proyek Akhir TypeScript**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **Selesai! 🎉**.
