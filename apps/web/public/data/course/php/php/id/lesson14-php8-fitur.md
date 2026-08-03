# PHP 8: Enum, Match & Attributes

> PHP | Pelajaran 14

## Tujuan Pembelajaran

- Menggunakan enum bertipe (backed enum) dengan method\n- Membuat custom attribute dengan #[Attribute]\n- Membaca attribute via ReflectionClass\n- Menggunakan match(true) untuk kondisi kompleks

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

## Penjelasan

## Enum: Tipe dengan Himpunan Nilai Tetap
enum Status: string { case Pending = "pending"; ... } — backed enum: setiap case punya nilai string. $status = Status::Pending; $status->value = "pending". Tambahkan method (label(), color()) langsung di enum — enum bukan sekadar konstanta, tapi class pertama.
## Attribute: Metadata Kode
#[Attribute] class Todo { public function __construct(public string $priority) {} } — mendefinisikan custom attribute. #[Todo("high")] di atas class — metadata yang bisa dibaca saat runtime via ReflectionClass. Attribute = cara deklaratif menambahkan metadata tanpa mengubah logika.
## match(true): Switch Modern
match(true) { $nilai >= 90 => "A", ... } — mengevaluasi kondisi boolean berurutan. Cocok untuk range checks (lebih rapi dari if/elseif bertumpuk). match mengembalikan nilai (bukan statement).

---

## Eksperimen

1. **## Enum: Tipe dengan Himpunan Nilai Tetap
enum Status: string { case Pending = "pending"; ... } — backed enum: setiap case punya nilai string. $status = Status::Pending; $status->value = "pending". Tambahkan method (label(), color()) langsung di enum — enum bukan sekadar konstanta, tapi class pertama.
## Attribute: Metadata Kode
#[Attribute] class Todo { public function __construct(public string $priority) {} } — mendefinisikan custom attribute. #[Todo("high")] di atas class — metadata yang bisa dibaca saat runtime via ReflectionClass. Attribute = cara deklaratif menambahkan metadata tanpa mengubah logika.
## match(true): Switch Modern
match(true) { $nilai >= 90 => "A", ... } — mengevaluasi kondisi boolean berurutan. Cocok untuk range checks (lebih rapi dari if/elseif bertumpuk). match mengembalikan nilai (bukan statement).**

---

## Tantangan

Eksplorasi PHP 8: (1) buat enum Priority: string dengan method color() yang mengembalikan hex color, (2) buat attribute #[Route("/api/tugas", methods: ["GET"])] dan baca method serta path via ReflectionClass, (3) gunakan named arguments saat memanggil constructor: new BuatLaporan(priority: "high"), (4) gunakan nullsafe operator (?->) untuk chaining: $user?->getTask()?->getStatus()?->label().

---

## Ringkasan

Enum = tipe tetap. Attribute = metadata. match(true) = switch modern. nullsafe = chaining aman. Lanjut: testing.
