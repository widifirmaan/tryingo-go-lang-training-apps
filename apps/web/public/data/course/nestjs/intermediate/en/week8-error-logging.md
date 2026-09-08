# Error & Logging — NestJS Shop Alarm + CCTV

> **Kategori:** NestJS | **Level:** Intermediate | **Minggu 8:** Error Handling & Logging

## Learning Objectives

- `@Catch()` + `ExceptionFilter` global error guard + `HttpException` neat codes (source: docs.nestjs.com/exception-filters)
- `Logger` CCTV (`log/warn/error`) — not blind `console.log`

---

## Why This Matters (Non-IT)

Without filters, errors become random HTML 500s → phones crash unclearly. With filters, all errors are consistent JSON `{ status, message }`. Without logs, production bugs = guessing. With `Logger`, clear trails.

---

## Program: Shop Alarm + CCTV

```typescript
// global filter — 1 guard for all errors
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllErrorsFilter implements ExceptionFilter {
  private log = new Logger("Error");

  catch(err: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const status = err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err instanceof HttpException ? err.message : "Server busy, retry";
    this.log.error(message); // CCTV records!
    res.status(status).json({ status, message, when: new Date() });
  }
}
```

```typescript
// main.ts — install 1x
app.useGlobalFilters(new AllErrorsFilter());
```

```typescript
// use in controller
import { NotFoundException } from "@nestjs/common";

one(id: number) {
  const p = this.find(id);
  if (!p) throw new NotFoundException(`Product ${id} missing`); // → neat 404 JSON!
}
```

---

## Key Concepts

### `@Catch()` = Global Safety Net
Catches all unhandled errors → neat JSON (not HTML 500).

### `HttpException` = Coded Alarm
`NotFoundException` (404), `BadRequestException` (400), `UnauthorizedException` (401).

### `Logger` = Leveled CCTV
`log` info, `warn` caution, `error` danger (different colors + filters).

---

## Beginner Friendly Explanation

### Analogy: Mall Guard + CCTV
- **Filter = central guard**: all issues report to 1 door, same format.
- **Logger = CCTV**: records every event per level.

### Step 0 — Prepare Device
- Same as W1. Watch the terminal: colored Nest logs.

### How the Computer Reads It
1. `throw new NotFoundException` → filter catches → `404 { status, message }`.
2. Foreign error → `500 { message: "Server busy" }` (hides details from hackers!).

### 3 Must-Know Terms
1. **Filter/Catch**: net/catch
2. **Logger/log-warn-error**: CCTV/levels

---

## Experiments

- **Green:** Without filter, `throw` → HTML 500? With → JSON?
- **Yellow:** `Logger` `error` vs `log` → different terminal colors?
- **Red:** Leak `err.stack` to client? Don't! (Hackers read structure!)

---

## Challenge

**Safe Monitored Shop:** Global filter + 3 different `HttpException`s + `Logger` per action + `curl` verifying neat JSON everywhere. **Intermediate NestJS DONE!**

---

## Mini Glossary

- **Filter/Logger/HttpException**: net/CCTV/coded-alarm

---

## Summary

Week 8 of 12: **Alarm + CCTV** (Level: Intermediate). **Intermediate NestJS DONE!** Next: **Testing** (Advanced).
