## Tujuan Pembelajaran

- Observable: stream of data
- Operators: map, filter, switchMap
- Subject dan BehaviorSubject
- Subscription dan unsubscribe
- Error handling dengan catchError

---

## Program: Rxjs fundamentals

Operator inti + combineLatest dan pola Subjects.

```typescript
import { fromEvent, interval, Subject, BehaviorSubject, of } from 'rxjs';
import {
  map, filter, debounceTime, switchMap, take,
  scan, catchError, combineLatest, merge,
} from 'rxjs/operators';

// 1) User typing → search
const input = document.querySelector('#search') as HTMLInputElement;
const results$ = fromEvent(input, 'input').pipe(
  debounceTime(400),
  map(() => (input as HTMLInputElement).value),
  filter((q) => q.length >= 2),
  switchMap((q) => fetch('/api/search?q=' + q).then((r) => r.json())
    .catch(() => of([]))),
);
results$.subscribe((items) => console.log('Search:', items));

// 2) Behavioral subject: current user state
const user$ = new BehaviorSubject<{ id: number; name: string } | null>(null);
user$.subscribe((u) => console.log('User:', u));
user$.next({ id: 1, name: 'Budi' });

// 3) combineLatest: what drives the cart bar
const cart$ = new Subject<{ total: number; count: number }>();
const discounts$ = interval(5000).pipe(map((i) => 0.1 + i * 0.01), take(3));

combineLatest([cart$, discounts$])
  .pipe(map(([cart, diskon]) => cart.total * (1 - diskon)))
  .subscribe((total) => console.log('Final total', total));

cart$.next({ total: 200000, count: 3 });
```

---

## Konsep Kunci

### Observable contract

cold vs hot; subscribe memulai eksekusi; selalu teardown lewat unsubscribe/takeUntil.

### Operator inti: map/switchMap/combineLatest

map memetakan nilai; switchMap membatalkan request lama saat request baru datang; combineLatest menggabungkan nilai terkini.

### Subject vs BehaviorSubject

Subject hanya broadcast ke event berikutnya; BehaviorSubject menyimpan nilai terakhir untuk subscriber baru - pas untuk state user.

### take/takeUntil

Batasi langganan: take(1) untuk one-shot, takeUntil(destroy$) saat unmount.

---

## Eksperimen

- Debounce input dan batasi panjang query.
- Gabungkan dua source data via merge.
- Tulis retry with backoff.

---

## Tantangan

Bangun typeahead: cari saat ketik, batalkan request basi (switchMap), tampilkan hasil terbaik.

---

## Ringkasan

Materi minggu ini telah dibahas: Rxjs fundamentals. Lanjut ke pekan berikutnya untuk memperdalam.
