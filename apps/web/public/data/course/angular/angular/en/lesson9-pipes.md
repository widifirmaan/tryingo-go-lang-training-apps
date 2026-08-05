# Pipes & Data Transformation

> Angular | Lesson 9

## Learning Objectives

- Use built-in pipes (uppercase, lowercase, date, number)\n- Create custom pipe with @Pipe decorator\n- Understand pure vs impure pipes\n- Use pipe chaining (| pipe1 | pipe2)

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

## Explanation

## Built-in Pipes
uppercase — convert to uppercase. lowercase — convert to lowercase. date — format date. number — format number. percent — format as percentage. slice — extract substring.
## Custom Pipe
@Pipe({ name: 'myPipe' }) — decorator for pipe. implements PipeTransform — must implement transform method. pure: true (default) — only re-run when input changes.
## Pipe Chaining
{{ value | pipe1 | pipe2 }} — pipe output becomes input for next pipe. {{ date | date:'short' | uppercase }}.

---

## Experiments

1. **## Built-in Pipes
uppercase — convert to uppercase. lowercase — convert to lowercase. date — format date. number — format number. percent — format as percentage. slice — extract substring.
## Custom Pipe
@Pipe({ name: 'myPipe' }) — decorator for pipe. implements PipeTransform — must implement transform method. pure: true (default) — only re-run when input changes.
## Pipe Chaining
{{ value | pipe1 | pipe2 }} — pipe output becomes input for next pipe. {{ date | date:'short' | uppercase }}.**

---

## Challenge

Level up pipes: (1) create custom pipe for text truncation with length parameter, (2) create impure pipe that updates every second (for live clock), (3) create custom pipe for currency formatting with local symbol, (4) create custom pipe for phone number masking.

---

## Summary

Built-in pipes = uppercase, date, number. Custom pipe = @Pipe + PipeTransform. Pure = default. Chaining = | pipe1 | pipe2. Next: component communication.
