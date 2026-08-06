# RxJS Fundamentals

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 9:** RxJS Fundamentals

## Learning Objectives

- Observable: stream of data
- Operators: map, filter, switchMap
- Subject and BehaviorSubject
- Subscription and unsubscribe
- Error handling with catchError

---

## Program: Reactive Programming

```typescript
// RxJS = Reactive Extensions untuk JavaScript
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { map, filter, switchMap, debounceTime } from 'rxjs/operators';
const numbers$ = of(1, 2, 3, 4, 5);
const doubled$ = numbers$.pipe(map(n => n * 2));
const searchSubject = new Subject<string>();
searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe(q => console.log(q));
const userSubject = new BehaviorSubject<{name: string} | null>(null);
console.log('RxJS Fundamentals siap digunakan');
```

---

## Key Concepts

### Observable
Lazy data stream.

### Operators
Transform streams.

### Subject
Multi-cast observable.

---

## Experiments

- Create observable from array
- Implement search with debounce
- Use BehaviorSubject for state
- Create custom operator

---

## Challenge

Build a search component with RxJS: debounce, distinctUntilChanged, switchMap to API.

---

## Summary

Week 9 of 14: **RxJS Fundamentals** (Level: Intermediate). Next week: **State Management**.
