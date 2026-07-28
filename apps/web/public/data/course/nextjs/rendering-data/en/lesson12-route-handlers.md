# Route Handlers & API

> Next.js | Rendering & Data | Lesson 12

## Learning Objectives

- Create API Route Handlers
- Handle GET, POST, PUT, DELETE
- Use NextResponse
- Know when to use Route Handler vs Server Actions

---

## Program: Route Handlers & API

```tsx
import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js!', timestamp: new Date().toISOString() });
}
```

---

## Explanation

## Route Handler
File `app/api/hello/route.ts` = `/api/hello`. Export `GET`, `POST`, `PUT`, `DELETE` functions. Receives `Request`, returns `NextResponse`.

## Request & Response
`export async function GET(request: NextRequest) { return NextResponse.json({...}) }`. Access query: `request.nextUrl.searchParams.get('q')`.

## Route Handler vs Server Actions
Route Handler: for webhooks, third-party callbacks, or needing a public endpoint URL. Server Actions: for forms and internal mutations.

## Edge Runtime
Route Handler can run on Edge Runtime for low latency. Add `export const runtime = 'edge'`. Limitations: no Node.js APIs.

---

## Experiments

1. **Route Handler**
2. **Request & Response**
3. **Route Handler vs Server Actions**
4. **Edge Runtime**

---

## Challenge

Build a task manager API: GET /api/tasks (list), POST /api/tasks (add), DELETE /api/tasks/[id] (delete). Use in-memory storage.

---

## Summary

Route Handler = API endpoint at app/api/. Export GET/POST/PUT/DELETE. NextResponse.json(). For webhooks and public endpoints.
