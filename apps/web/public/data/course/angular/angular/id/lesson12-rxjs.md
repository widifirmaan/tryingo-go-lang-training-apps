# Reactive Programming with RxJS

> Angular | Pelajaran 12

## Tujuan Pembelajaran

- Memahami Observable dari RxJS\n- Menggunakan operator map, filter, debounceTime\n- Menggunakan Subject untuk custom Observable\n- Menggunakan switchMap untuk request cancellation

---

## Program: Angular

```typescript
import { Injectable } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RxJsService {
  getNumbers(): Observable<number[]> {
    return of([1, 2, 3, 4, 5]);
  }

  getProcessedNumbers(): Observable<number[]> {
    return of([1, 2, 3, 4, 5]).pipe(
      map(n => n * 2),
      filter(n => n > 4),
    );
  }

  search(terms: Observable<string>): Observable<any[]> {
    return terms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.fetchResults(term)),
    );
  }

  private fetchResults(term: string): Observable<any[]> {
    return of([{ title: 'Result for ' + term }]);
  }
}

```

---

## Penjelasan

## Observable
Observable = lazy collection of multiple values over time. of() — create Observable from static values. fromEvent() — create Observable from DOM events.
## Operators
map() — transform values. filter() — filter values. debounceTime(300) — wait 300ms between emissions. distinctUntilChanged() — skip duplicate values. switchMap() — cancel previous inner Observable.
## Subject
Subject = both Observable and Observer. new Subject<string>() — create Subject. subject.next(value) — emit value. subject.subscribe() — listen for values.
## Common Patterns
debounceTime + distinctUntilChanged — untuk search input. switchMap — untuk autocomplete/search. forkCombine — untuk parallel requests.

---

## Eksperimen

1. **## Observable
Observable = lazy collection of multiple values over time. of() — create Observable from static values. fromEvent() — create Observable from DOM events.
## Operators
map() — transform values. filter() — filter values. debounceTime(300) — wait 300ms between emissions. distinctUntilChanged() — skip duplicate values. switchMap() — cancel previous inner Observable.
## Subject
Subject = both Observable and Observer. new Subject<string>() — create Subject. subject.next(value) — emit value. subject.subscribe() — listen for values.
## Common Patterns
debounceTime + distinctUntilChanged — untuk search input. switchMap — untuk autocomplete/search. forkCombine — untuk parallel requests.**

---

## Tantangan

Tingkatkan RxJS: (1) buat custom operator untuk retry dengan max retry count, (2) implementasi BehaviorSubject untuk state management sederhana, (3) buat autocomplete search dengan switchMap dan debounceTime, (4) implementasi WebSocket connection dengan Observable dan reconnect logic.

---

## Ringkasan

Observable = lazy data stream. map/filter = transform/filter. Subject = custom Observable. switchMap = cancel previous. Lanjut: route guards.
