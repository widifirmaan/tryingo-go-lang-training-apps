# Reactive Programming with RxJS

> Angular | Lesson 12

## Learning Objectives

- Understand RxJS Observable\n- Use operators map, filter, debounceTime\n- Use Subject for custom Observable\n- Use switchMap for request cancellation

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

## Explanation

## Observable
Observable = lazy collection of multiple values over time. of() — create Observable from static values. fromEvent() — create Observable from DOM events.
## Operators
map() — transform values. filter() — filter values. debounceTime(300) — wait 300ms between emissions. distinctUntilChanged() — skip duplicate values. switchMap() — cancel previous inner Observable.
## Subject
Subject = both Observable and Observer. new Subject<string>() — create Subject. subject.next(value) — emit value. subject.subscribe() — listen for values.
## Common Patterns
debounceTime + distinctUntilChanged — for search input. switchMap — for autocomplete/search. forkCombine — for parallel requests.

---

## Experiments

1. **## Observable
Observable = lazy collection of multiple values over time. of() — create Observable from static values. fromEvent() — create Observable from DOM events.
## Operators
map() — transform values. filter() — filter values. debounceTime(300) — wait 300ms between emissions. distinctUntilChanged() — skip duplicate values. switchMap() — cancel previous inner Observable.
## Subject
Subject = both Observable and Observer. new Subject<string>() — create Subject. subject.next(value) — emit value. subject.subscribe() — listen for values.
## Common Patterns
debounceTime + distinctUntilChanged — for search input. switchMap — for autocomplete/search. forkCombine — for parallel requests.**

---

## Challenge

Level up RxJS: (1) create custom operator for retry with max retry count, (2) implement BehaviorSubject for simple state management, (3) create autocomplete search with switchMap and debounceTime, (4) implement WebSocket connection with Observable and reconnect logic.

---

## Summary

Observable = lazy data stream. map/filter = transform/filter. Subject = custom Observable. switchMap = cancel previous. Next: route guards.
