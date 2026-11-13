# RxJS Fundamentals

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 9:** RxJS Fundamentals

## Learning Objectives

- Observable: stream of data
- Operators: map, filter, switchMap
- Subject and BehaviorSubject
- Subscription and unsubscribe
- Error handling with catchError

---

## Program: RxJS Fundamentals

Core operators plus combineLatest and Subjects.

```typescript
import { fromEvent, interval, Subject, BehaviorSubject, of } from 'rxjs';
import {
  map, filter, debounceTime, switchMap, take,
  catchError, combineLatest,
} from 'rxjs/operators';

// 1) Typing → search
const input = document.querySelector('#search') as HTMLInputElement;
const results$ = fromEvent(input, 'input').pipe(
  debounceTime(400),
  map(() => input.value),
  filter((q) => q.length >= 2),
  switchMap((q) => fetch('/api/search?q=' + q).then((r) => r.json())
    .catch(() => of([]))),
);
results$.subscribe((items) => console.log('Search:', items));

// 2) Behavior subject: current user
const user$ = new BehaviorSubject<{ id: number; name: string } | null>(null);
user$.subscribe((u) => console.log('User:', u));
user$.next({ id: 1, name: 'Budi' });

// 3) combineLatest: drives the cart summary
const cart$ = new Subject<{ total: number; count: number }>();
const discounts$ = interval(5000).pipe(map((i) => 0.1 + i * 0.01), take(3));

combineLatest([cart$, discounts$])
  .pipe(map(([cart, discount]) => cart.total * (1 - discount)))
  .subscribe((total) => console.log('Final total', total));

cart$.next({ total: 200000, count: 3 });
```

---

## Key Concepts

### Observable contract

cold vs hot; subscribe memulai eksekusi; selalu teardown lewat unsubscribe/takeUntil.

### Operator inti: map/switchMap/combineLatest

map memetakan nilai; switchMap membatalkan request lama saat request baru datang; combineLatest menggabungkan nilai terkini.

### Subject vs BehaviorSubject

Subject hanya broadcast ke event berikutnya; BehaviorSubject menyimpan nilai terakhir untuk subscriber baru - pas untuk state user.

### take/takeUntil

Batasi langganan: take(1) untuk one-shot, takeUntil(destroy$) saat unmount.

---

## Experiments

- Debounce a filter with a length limit
- Merge two data loaders
- chain and retry with backoff

---

## Challenge

Search as user types, cancel outstanding requests, and render best matches.

---

## Summary

This week's material has been covered: RxJS Fundamentals. Continue to the following week to deepen.
