# Pipes & Data Transformation

> Angular | Pelajaran 9

## Tujuan Pembelajaran

- Menggunakan built-in pipes (uppercase, lowercase, date, number)\n- Membuat custom pipe dengan @Pipe decorator\n- Memahami pure vs impure pipes\n- Menggunakan pipe chaining (| pipe1 | pipe2)

---

## Program: Angular

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase',
  pure: true,
})
export class UppercasePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.toUpperCase() : '';
  }
}

```

---

## Penjelasan

## Built-in Pipes
uppercase — convert to uppercase. lowercase — convert to lowercase. date — format date. number — format number. percent — format as percentage. slice — extract substring.
## Custom Pipe
@Pipe({ name: 'myPipe' }) — decorator untuk pipe. implements PipeTransform — wajib implement transform method. pure: true (default) — hanya re-run when input changes.
## Pipe Chaining
{{ value | pipe1 | pipe2 }} — pipe output jadi input pipe berikutnya. {{ date | date:'short' | uppercase }}.

---

## Eksperimen

1. **## Built-in Pipes
uppercase — convert to uppercase. lowercase — convert to lowercase. date — format date. number — format number. percent — format as percentage. slice — extract substring.
## Custom Pipe
@Pipe({ name: 'myPipe' }) — decorator untuk pipe. implements PipeTransform — wajib implement transform method. pure: true (default) — hanya re-run when input changes.
## Pipe Chaining
{{ value | pipe1 | pipe2 }} — pipe output jadi input pipe berikutnya. {{ date | date:'short' | uppercase }}.**

---

## Tantangan

Tingkatkan pipes: (1) buat custom pipe untuk truncate text dengan parameter panjang, (2) buat impure pipe yang update setiap detik (untuk live clock), (3) buat custom pipe untuk currency formatting dengan simbol lokal, (4) buat custom pipe untuk masking nomor telepon.

---

## Ringkasan

Built-in pipes = uppercase, date, number. Custom pipe = @Pipe + PipeTransform. Pure = default. Chaining = | pipe1 | pipe2. Lanjut: component communication.
