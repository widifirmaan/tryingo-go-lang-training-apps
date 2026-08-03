# Proyek Akhir: Task Manager CLI

> PHP | Pelajaran 16

## Tujuan Pembelajaran

- Merangkai semua konsep PHP ke dalam satu proyek CLI\n- Menerapkan OOP dengan class Task dan class TaskService\n- Menggunakan match expression untuk routing perintah CLI\n- Membaca input dari CLI dengan fgets(STDIN)

---

## Program: Proyek Akhir: Task Manager CLI

```php
<?php

require_once __DIR__ . "/vendor/autoload.php";

use App\Models\Task;
use App\Services\TaskService;

$service = new TaskService();

echo "=== Task Manager CLI ===\n";
echo "Perintah: add, list, done, delete, quit\n\n";

while (true) {
    echo "> ";
    $input = trim(fgets(STDIN));
    $parts = explode(" ", $input, 2);
    $cmd = $parts[0];
    $arg = $parts[1] ?? "";

    match ($cmd) {
        "add" => $service->add($arg),
        "list" => $service->list(),
        "done" => $service->complete((int) $arg),
        "delete" => $service->remove((int) $arg),
        "quit" => exit("Selesai.\n"),
        default => echo "Perintah tidak dikenal: $cmd\n",
    };
}

```

---

## Penjelasan

## Proyek Akhir: Menyatukan Semua
20 pelajaran PHP dirangkum di sini: variabel & tipe (Lesson 2), string & array (Lesson 3), control flow (Lesson 4), fungsi (Lesson 5), OOP (Lesson 7-8), exception (Lesson 9), file & JSON (Lesson 10), PDO (Lesson 11), keamanan (Lesson 12), Composer (Lesson 13), PHP 8 features (Lesson 14), testing (Lesson 15). CLI Task Manager menggunakan semuanya.
## Desain CLI
fgets(STDIN) membaca input baris dari terminal. match($cmd) { ... } mengarahkan perintah ke method TaskService yang sesuai. Loop while(true) menjaga aplikasi berjalan sampai pengguna mengetik "quit".
## OOP dalam Proyek Nyata
Task (model data — id, judul, selesai) dan TaskService (logika bisnis — add, list, complete, remove). Pemisahan ini memudahkan pengujian dan pengembangan fitur baru (mis. tambah fitur prioritas hanya di TaskService, bukan di Task).
## Dari CLI ke Web
CLI adalah latihan yang bagus. Untuk proyek web sesungguhnya: ganti fgets(STDIN) dengan route handler (seperti di Laravel), simpan tugas di database (PDO dari Lesson 11), dan tambah HTML template.

---

## Eksperimen

1. **## Proyek Akhir: Menyatukan Semua
20 pelajaran PHP dirangkum di sini: variabel & tipe (Lesson 2), string & array (Lesson 3), control flow (Lesson 4), fungsi (Lesson 5), OOP (Lesson 7-8), exception (Lesson 9), file & JSON (Lesson 10), PDO (Lesson 11), keamanan (Lesson 12), Composer (Lesson 13), PHP 8 features (Lesson 14), testing (Lesson 15). CLI Task Manager menggunakan semuanya.
## Desain CLI
fgets(STDIN) membaca input baris dari terminal. match($cmd) { ... } mengarahkan perintah ke method TaskService yang sesuai. Loop while(true) menjaga aplikasi berjalan sampai pengguna mengetik "quit".
## OOP dalam Proyek Nyata
Task (model data — id, judul, selesai) dan TaskService (logika bisnis — add, list, complete, remove). Pemisahan ini memudahkan pengujian dan pengembangan fitur baru (mis. tambah fitur prioritas hanya di TaskService, bukan di Task).
## Dari CLI ke Web
CLI adalah latihan yang bagus. Untuk proyek web sesungguhnya: ganti fgets(STDIN) dengan route handler (seperti di Laravel), simpan tugas di database (PDO dari Lesson 11), dan tambah HTML template.**

---

## Tantangan

Tingkatkan proyek akhir: (1) tambah fitur edit: edit [id] "judul baru" untuk mengubah judul tugas, (2) tambah fitur filter: filter selesai/belum selesai, (3) simpan tugas ke file JSON (Lesson 10) agar data tetap ada setelah aplikasi ditutup, (4) tambah unit test untuk TaskService menggunakan PHPUnit (Lesson 15) — minimal 4 test: add, list, complete, delete.

---

## Ringkasan

CLI = semua konsep dalam satu proyek. OOP = pemisahan model & service. match = routing. fgets = input CLI. Anda siap PHP!
