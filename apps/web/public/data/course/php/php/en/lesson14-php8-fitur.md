# PHP 8: Enum, Match & Attributes

> PHP | Lesson 14

## Learning Objectives

- Use backed enums with methods\n- Create custom attributes with #[Attribute]\n- Read attributes via ReflectionClass\n- Use match(true) for complex conditions

---

## Program: PHP 8: Enum, Match & Attributes

```php
<?php

enum Status: string {
    case Pending = "pending";
    case InProgress = "in_progress";
    case Done = "done";

    public function label(): string {
        return match($this) {
            self::Pending => "Menunggu",
            self::InProgress => "Dalam Proses",
            self::Done => "Selesai",
        };
    }
}

#[Attribute]
class Todo {
    public function __construct(public string $priority) {}
}

#[Todo("high")]
class BuatLaporan {
    public function jalankan(): string {
        return "Laporan prioritas tinggi selesai";
    }
}

$status = Status::Pending;
echo $status->label() . "\n";

$ref = new ReflectionClass(BuatLaporan::class);
$attr = $ref->getAttributes(Todo::class)[0] ?? null;
if ($attr) {
    echo "Priority: " . $attr->newInstance()->priority . "\n";
}

$nilai = 85;
$result = match(true) {
    $nilai >= 90 => "A",
    $nilai >= 80 => "B",
    $nilai >= 70 => "C",
    default => "D",
};
echo "Grade: $result\n";

```

---

## Explanation

## Enum: A Type with a Fixed Set of Values
enum Status: string { case Pending = "pending"; ... } — a backed enum: each case has a string value. $status = Status::Pending; $status->value = "pending". Add methods (label(), color()) directly in the enum — enums are not just constants, but first-class classes.
## Attribute: Code Metadata
#[Attribute] class Todo { public function __construct(public string $priority) {} } — defines a custom attribute. #[Todo("high")] above a class — metadata readable at runtime via ReflectionClass. Attributes = a declarative way to add metadata without changing logic.
## match(true): The Modern Switch
match(true) { $nilai >= 90 => "A", ... } — evaluates boolean conditions in order. Great for range checks (cleaner than stacked if/elseif). match returns a value (not a statement).

---

## Experiments

1. **## Enum: A Type with a Fixed Set of Values
enum Status: string { case Pending = "pending"; ... } — a backed enum: each case has a string value. $status = Status::Pending; $status->value = "pending". Add methods (label(), color()) directly in the enum — enums are not just constants, but first-class classes.
## Attribute: Code Metadata
#[Attribute] class Todo { public function __construct(public string $priority) {} } — defines a custom attribute. #[Todo("high")] above a class — metadata readable at runtime via ReflectionClass. Attributes = a declarative way to add metadata without changing logic.
## match(true): The Modern Switch
match(true) { $nilai >= 90 => "A", ... } — evaluates boolean conditions in order. Great for range checks (cleaner than stacked if/elseif). match returns a value (not a statement).**

---

## Challenge

Explore PHP 8: (1) create a Priority enum with a color() method that returns a hex color, (2) create a #[Route("/api/tasks", methods: ["GET"])] attribute and read the method and path via ReflectionClass, (3) use named arguments when calling the constructor: new BuatLaporan(priority: "high"), (4) use the nullsafe operator (?->) for chaining: $user?->getTask()?->getStatus()?->label().

---

## Summary

Enum = fixed type. Attribute = metadata. match(true) = modern switch. nullsafe = safe chaining. Next: testing.
