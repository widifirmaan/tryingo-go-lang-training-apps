# HTTP Client & API Integration

> Angular | Pelajaran 8

## Tujuan Pembelajaran

- Menggunakan HttpClient untuk melakukan HTTP request\n- Memahami Observable dari RxJS\n- Menggunakan subscribe() untuk menerima data\n- Mengimplementasikan GET, POST, PUT, DELETE methods

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

## Penjelasan

## HttpClient
HttpClient dari @angular/common/http — module untuk melakukan HTTP request. Harus di-import di app.module.ts providers.
## Observable
Observable = lazy collection of multiple values. subscribe() = menjalankan Observable dan menerima data. Angular HTTP methods return Observable.
## HTTP Methods
get() — fetch data. post() — create data. put() — update data. delete() — remove data. Semua return Observable.
## Error Handling
.subscribe({ next: (data) => ..., error: (err) => ... }) — handle success dan error. catchError() operator dari RxJS untuk handle error di stream.

---

## Eksperimen

1. **## HttpClient
HttpClient dari @angular/common/http — module untuk melakukan HTTP request. Harus di-import di app.module.ts providers.
## Observable
Observable = lazy collection of multiple values. subscribe() = menjalankan Observable dan menerima data. Angular HTTP methods return Observable.
## HTTP Methods
get() — fetch data. post() — create data. put() — update data. delete() — remove data. Semua return Observable.
## Error Handling
.subscribe({ next: (data) => ..., error: (err) => ... }) — handle success dan error. catchError() operator dari RxJS untuk handle error di stream.**

---

## Tantangan

Tingkatkan HTTP client: (1) tambah error handling dengan catchError dan menampilkan pesan error di UI, (2) tambah loading state dengan isLoading flag, (3) implementasi HTTP interceptor untuk menambahkan auth header ke semua request, (4) buat service dengan retry logic untuk request yang gagal.

---

## Ringkasan

HttpClient = HTTP request. Observable = lazy data stream. subscribe() = execute. catchError = error handling. Lanjut: pipes.
