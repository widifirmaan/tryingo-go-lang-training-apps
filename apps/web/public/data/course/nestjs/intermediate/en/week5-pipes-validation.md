# Pipes & Validation

> **Kategori:** NestJS | **Level:** Intermediate | **Minggu 5:** Pipes & Validation

## Learning Objectives

- DTO (Data Transfer Object) with class-validator
- ValidationPipe for auto-validation
- Built-in pipes: ParseInt, ParseBool, ParseUUID
- Custom Pipe: implement PipeTransform
- Error handling: BadRequestException

---

## Program: Input Validation

```javascript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { IsString, IsEmail, MinLength, MaxLength, IsInt, Min, Max } from 'class-validator';

class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  nama: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(1)
  @Max(150)
  umur: number;
}

@Injectable()
class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: { metatype: any }) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    return value;
  }
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

console.log('NestJS Pipes & Validation:');
console.log('');
console.log('=== DTO (Data Transfer Object) ===');
console.log('class CreateUserDto {');
console.log('  @IsString() @MinLength(3) nama: string');
console.log('  @IsEmail() email: string');
console.log('  @IsInt() @Min(1) umur: number');
console.log('}');
console.log('');
console.log('=== Built-in Pipes ===');
const pipes = [
  'ValidationPipe — validate request body',
  'ParseIntPipe — convert string to int',
  'ParseBoolPipe — convert string to bool',
  'ParseUUIDPipe — validate UUID format',
  'DefaultValuePipe — set default value',
];
for (const p of pipes) console.log('  - ' + p);

console.log('');
console.log('=== Custom Pipe ===');
console.log('@Injectable()');
console.log('class ParseDatePipe implements PipeTransform {');
console.log('  transform(value: string) {');
console.log('    return new Date(value);');
console.log('  }');
console.log('}');
console.log('');
console.log('=== Usage ===');
console.log("@Post()
create(@Body(new ValidationPipe()) dto: CreateUserDto) {}");
```

---

## Key Concepts

### DTO
class-validator decorators.

### ValidationPipe
Auto-validates against DTO.

### Custom Pipes
Implement PipeTransform.

### Usage
Apply pipes to parameters.

---

## Experiments

- Create Product DTO with validation rules
- Implement custom pipe for date parsing
- Add whitelist: strip non-DTO properties
- Create global validation pipe

---

## Challenge

Build comprehensive validation: CreateUserDto, UpdateUserDto, custom pipes, error messages.

---

## Summary

Week 5 of 12: **Pipes & Validation** (Level: Intermediate). Next week: **Guards & Authentication**.
