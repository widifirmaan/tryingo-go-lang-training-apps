# Route Handlers & API

> Next.js | Rendering & Data | Pelajaran 12

## Tujuan Pembelajaran

- Membuat API Route Handler
- Menangani GET, POST, PUT, DELETE
- Menggunakan NextResponse
- Memahami kapan pakai Route Handler vs Server Actions

---

## Program: Route Handlers & API

```tsx
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js!', timestamp: new Date().toISOString() });
}
```

---

## Penjelasan

## Route Handler
File `app/api/hello/route.ts` = `/api/hello`. Export fungsi `GET`, `POST`, `PUT`, `DELETE`. Menerima `Request`, return `NextResponse`.

## Request & Response
`export async function GET(request: NextRequest) { return NextResponse.json({...}) }`. Akses query: `request.nextUrl.searchParams.get('q')`.

## Route Handler vs Server Actions
Route Handler: untuk webhooks, third-party callback, atau perlu endpoint URL publik. Server Actions: untuk form dan mutasi internal.

## Edge Runtime
Route Handler bisa jalan di Edge Runtime untuk latency rendah. Tambahkan `export const runtime = 'edge'`. Keterbatasan: tidak ada Node.js API.

---

## Eksperimen

1. **Route Handler**
2. **Request & Response**
3. **Route Handler vs Server Actions**
4. **Edge Runtime**

---

## Tantangan

Buat API untuk task manager: GET /api/tasks (list), POST /api/tasks (tambah), DELETE /api/tasks/[id] (hapus). Gunakan in-memory storage.

---

## Ringkasan

Route Handler = API endpoint di app/api/. Export GET/POST/PUT/DELETE. NextResponse.json(). Untuk webhooks dan public endpoints.
