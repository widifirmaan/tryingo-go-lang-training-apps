# Services & Dependency Injection

> Angular | Lesson 6

## Learning Objectives

- Create service with @Injectable decorator\n- Use providedIn: root for root-level provider\n- Inject service via constructor\n- Understand singleton service in Angular

---

## Program: Angular

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: string[] = ['Item 1', 'Item 2', 'Item 3'];

  getData(): string[] {
    return this.data;
  }

  addItem(item: string): void {
    this.data.push(item);
  }

  removeItem(index: number): void {
    this.data.splice(index, 1);
  }
}

```

---

## Explanation

## @Injectable
@Injectable({ providedIn: 'root' }) — defines service available throughout the app. providedIn: 'root' makes service a singleton.
## Dependency Injection
constructor(private dataService: DataService) — Angular auto-injects DataService. No manual registration in providers array needed.
## Service Pattern
Service stores data and business logic. Component only responsible for displaying data and handling user interaction. This separation makes testing and reuse easier.
## providedIn Options
'root' — singleton for entire app. 'any' — new instance per lazy-loaded module. Component-level — instance per component.

---

## Experiments

1. **## @Injectable
@Injectable({ providedIn: 'root' }) — defines service available throughout the app. providedIn: 'root' makes service a singleton.
## Dependency Injection
constructor(private dataService: DataService) — Angular auto-injects DataService. No manual registration in providers array needed.
## Service Pattern
Service stores data and business logic. Component only responsible for displaying data and handling user interaction. This separation makes testing and reuse easier.
## providedIn Options
'root' — singleton for entire app. 'any' — new instance per lazy-loaded module. Component-level — instance per component.**

---

## Challenge

Expand service: (1) add updateItem() method in DataService, (2) create second service (AuthService) with login/logout methods, (3) create service with HttpClient for fetching data from API, (4) implement caching service that stores data in memory and returns cached data if available.

---

## Summary

@Injectable = service. providedIn: root = singleton. constructor = DI. Service = data + logic. Next: routing.
