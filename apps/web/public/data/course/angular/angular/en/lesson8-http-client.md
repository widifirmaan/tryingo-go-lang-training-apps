# HTTP Client & API Integration

> Angular | Lesson 8

## Learning Objectives

- Use HttpClient for HTTP requests\n- Understand RxJS Observable\n- Use subscribe() to receive data\n- Implement GET, POST, PUT, DELETE methods

---

## Program: Angular

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/posts');
  }

  getPost(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/posts/' + id);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(this.baseUrl + '/posts', post);
  }
}

```

---

## Explanation

## HttpClient
HttpClient from @angular/common/http — module for making HTTP requests. Must be imported in app.module.ts providers.
## Observable
Observable = lazy collection of multiple values. subscribe() = execute Observable and receive data. Angular HTTP methods return Observable.
## HTTP Methods
get() — fetch data. post() — create data. put() — update data. delete() — remove data. All return Observable.
## Error Handling
.subscribe({ next: (data) => ..., error: (err) => ... }) — handle success and error. catchError() RxJS operator for error handling in stream.

---

## Experiments

1. **## HttpClient
HttpClient from @angular/common/http — module for making HTTP requests. Must be imported in app.module.ts providers.
## Observable
Observable = lazy collection of multiple values. subscribe() = execute Observable and receive data. Angular HTTP methods return Observable.
## HTTP Methods
get() — fetch data. post() — create data. put() — update data. delete() — remove data. All return Observable.
## Error Handling
.subscribe({ next: (data) => ..., error: (err) => ... }) — handle success and error. catchError() RxJS operator for error handling in stream.**

---

## Challenge

Level up HTTP client: (1) add error handling with catchError and display error message in UI, (2) add loading state with isLoading flag, (3) implement HTTP interceptor to add auth header to all requests, (4) create service with retry logic for failed requests.

---

## Summary

HttpClient = HTTP request. Observable = lazy data stream. subscribe() = execute. catchError = error handling. Next: pipes.
