# RxJS Fundamentals

> **Kategori:** Angular | **Level:** Menengah | **Minggu 9:** RxJS Fundamentals

## Tujuan Pembelajaran

- Observable: stream of data
- Operators: map, filter, switchMap
- Subject dan BehaviorSubject
- Subscription dan unsubscribe
- Error handling dengan catchError

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

## Konsep Kunci

### Observable
Lazy stream of data.

### Operators
Transform stream: map, filter, switchMap.

### Subject
Multi-cast observable.

---

## Eksperimen

- Buat observable dari array
- Implementasikan search dengan debounce
- Gunakan BehaviorSubject untuk state
- Buat custom operator

---

## Tantangan

Buat search component dengan RxJS: debounce, distinctUntilChanged, switchMap ke API.

---

## Ringkasan

Minggu 9 dari 14: **RxJS Fundamentals** (Level: Menengah). Minggu depan: **State Management**.
