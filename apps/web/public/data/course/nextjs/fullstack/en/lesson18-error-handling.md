# Error Handling & Debugging

> Next.js | Full-Stack Next.js | Lesson 18

## Learning Objectives

- Create error boundaries with error.tsx
- Use global-error.tsx
- Log errors to monitoring service
- Debugging in development

---

## Program: Error Handling & Debugging

```tsx
'use client';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (<div style={{padding:'2rem',textAlign:'center'}}><h2>Something went wrong!</h2><p style={{color:'#666',margin:'1rem 0'}}>{error.message}</p><details style={{textAlign:'left',background:'#f5f5f5',padding:'1rem',borderRadius:8,margin:'1rem 0',fontSize:'.85em'}}><summary>Error Details</summary><pre>{error.stack}</pre></details><button onClick={reset} style={{padding:'.5rem 1.5rem',background:'#333',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:600}}>Try Again</button></div>);
}
```

---

## Explanation

## error.tsx
Client Component ('use client'). Props: `error` (Error object + digest) and `reset` (function). Reset retries rendering. Error is scoped to that segment.

## global-error.tsx
For FATAL errors in root layout. MUST define its own <html> and <body>. Rarely needed.

## notFound()
Call `notFound()` from `next/navigation` if data is missing. Renders `not-found.tsx`. `notFound()` throws — wrap in try/catch if needed.

## Logging
Send errors to monitoring (Sentry, Datadog, Logtail) in error.tsx. `useEffect` for side effect logging. Don't throw from error.tsx.

---

## Experiments

1. **error.tsx**
2. **global-error.tsx**
3. **notFound()**
4. **Logging**

---

## Challenge

Build a user profile page with error handling. If user not found, call notFound(). If API fails, show error.tsx with retry button.

---

## Summary

error.tsx for per-segment errors (Client Component). global-error.tsx for fatal errors. notFound() for missing data. Log to monitoring.
