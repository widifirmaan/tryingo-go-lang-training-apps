# Interceptors: Logging & Transformation

> NestJS | Auth & Advanced | Lesson 11

## Learning Objectives

- Explain interceptors: wrapping handlers before & after
- Write a LoggingInterceptor with RxJS (tap)
- Write a TransformInterceptor to shape responses
- Choose between interceptor vs middleware vs guard vs pipe

---

## Program: Interceptors: Logging & Transformation

```ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// Interceptor 2: membungkus respons menjadi { data, waktu, jalur }
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data,
        waktu: new Date().toISOString(),
        jalur: context.switchToHttp().getRequest().url,
      })),
    );
  }
}
```

---

## Explanation

## Interceptors: The Two Sides of a Handler
An interceptor wraps a handler: code before next.handle() = BEFORE the handler, next.handle().pipe() = AFTER the handler. The key is RxJS: the handler's response is an observable stream - observable (tap), transformable (map), delayable (delay), cacheable, even cancellable. This is the difference from middleware: interceptors see THE RESPONSE after the handler finishes.
## Logging & Execution Time
LoggingInterceptor records method, URL, and duration: starting before the handler, finishing via tap() reading Date.now() once the stream completes. Without interceptors this must be rewritten in every handler - with one, it applies once to the whole app.
## TransformInterceptor: A Consistent Response Shape
map() turns the handler result into a standard shape { data, waktu, jalur }. Consistent responses = the frontend never guesses the shape of each endpoint. Interceptors are also the right place for: error wrapping, adding headers, global pagination, caching (with RxJS), and timeouts.
## When to Use What
Middleware: raw HTTP (body, headers, CORS) - outside the Nest pipeline. Guards: allowed or not. Pipes: INPUT validation & transformation. Interceptors: before/after the handler, modifying RESPONSES or stream behavior. Rule of thumb: need the handler result → interceptor; only permission → guard; pure HTTP → middleware.

---

## Experiments

1. **Interceptors: The Two Sides of a Handler**
2. **Logging & Execution Time**
3. **TransformInterceptor: A Consistent Response Shape**
4. **When to Use What**

---

## Challenge

Experiment with interceptors: (1) build a TimeoutInterceptor cancelling requests longer than 3 seconds (race with an RxJS timer), (2) build a simple CacheInterceptor: Map<url, data>, return the cache when present (conditional map), (3) add an X-Response-Time header in TransformInterceptor, (4) mount an interceptor on a single route (@UseInterceptors) and compare its behavior with the global one.

---

## Summary

Interceptors = both sides of a handler via RxJS. tap to observe, map to transform. Consistent responses. Choose the right tool. Next: config, Swagger & logging.
