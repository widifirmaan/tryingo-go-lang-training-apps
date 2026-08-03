# Testing dengan PHPUnit

> PHP | Pelajaran 15

## Tujuan Pembelajaran

- Menulis test PHPUnit: assertEquals, assertTrue, expectException\n- Memahami struktur test class yang extends TestCase\n- Menguji perilaku sukses dan gagal (edge case)\n- Menjalankan test di terminal dan membaca hasilnya

---

## Program: Testing dengan PHPUnit

```php
<?php

namespace Tests\Feature;

use App\Models\Task;
use PHPUnit\Framework\TestCase;

class TaskTest extends TestCase
{
    public function test_task_dapat_dibuat(): void
    {
        $task = new Task("Belajar PHPUnit", "Tulis test pertama");

        $this->assertEquals("Belajar PHPUnit", $task->getJudul());
        $this->assertFalse($task->isSelesai());
    }

    public function test_task_dapat_diselesaikan(): void
    {
        $task = new Task("Tugas", "Deskripsi");
        $task->complete();

        $this->assertTrue($task->isSelesai());
    }

    public function test_judul_tidak_boleh_kosong(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        new Task("", "Deskripsi");
    }
}

```

---

## Penjelasan

## Test: Kontrak yang Dieksekusi
assertEquals($expected, $actual) — membandingkan nilai. assertTrue($condition) — memastikan kondisi benar. expectException(\InvalidArgumentException::class) — memastikan kode melempar exception tertentu. Test membuktikan PERILAKU, bukan detail implementasi.
## Test Class Structure
class TaskTest extends TestCase { public function test_nama_tes(): void { ... } } — setiap method yang diawali test_ adalah satu test case. PHPUnit menjalankan setiap method secara independen.
## Red-Green-Refactor
Tulis test yang gagal (red), buat kode agar lewat (green), rapikan (refactor). vendor/bin/phpunit menjalankan semua test. vendor/bin/phpunit --filter test_nama_tes menjalankan satu test.

---

## Eksperimen

1. **## Test: Kontrak yang Dieksekusi
assertEquals($expected, $actual) — membandingkan nilai. assertTrue($condition) — memastikan kondisi benar. expectException(\InvalidArgumentException::class) — memastikan kode melempar exception tertentu. Test membuktikan PERILAKU, bukan detail implementasi.
## Test Class Structure
class TaskTest extends TestCase { public function test_nama_tes(): void { ... } } — setiap method yang diawali test_ adalah satu test case. PHPUnit menjalankan setiap method secara independen.
## Red-Green-Refactor
Tulis test yang gagal (red), buat kode agar lewat (green), rapikan (refactor). vendor/bin/phpunit menjalankan semua test. vendor/bin/phpunit --filter test_nama_tes menjalankan satu test.**

---

## Tantangan

Tingkatkan testing: (1) tambah test untuk method complete() yang memastikan tugas bisa di-complete berkali-kali tanpa error, (2) tambah data provider (@dataProvider) untuk menguji berbagai input judul (kosong, spasi, sangat panjang), (3) buat test untuk kelas Task yang menguji semua method sekaligus (integration test), (4) tambahkan coverage report: vendor/bin/phpunit --coverage-text dan targetkan minimal 80%.

---

## Ringkasan

assertEquals = bandingkan nilai. expectException = uji error. Red-Green-Refactor = alur test. Lanjut: proyek akhir.
