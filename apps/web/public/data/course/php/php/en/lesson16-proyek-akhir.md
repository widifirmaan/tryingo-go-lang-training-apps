# Final Project: Task Manager CLI

> PHP | Lesson 16

## Learning Objectives

- Assemble all PHP concepts into one CLI project\n- Apply OOP with Task class and TaskService class\n- Use match expression for CLI command routing\n- Read CLI input with fgets(STDIN)

---

## Program: Final Project: Task Manager CLI

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

## Explanation

## Final Project: Bringing It All Together
20 PHP lessons summarized here: variables & types (Lesson 2), strings & arrays (Lesson 3), control flow (Lesson 4), functions (Lesson 5), OOP (Lessons 7-8), exceptions (Lesson 9), file & JSON (Lesson 10), PDO (Lesson 11), security (Lesson 12), Composer (Lesson 13), PHP 8 features (Lesson 14), testing (Lesson 15). The CLI Task Manager uses all of them.
## CLI Design
fgets(STDIN) reads a line of input from the terminal. match($cmd) { ... } routes the command to the appropriate TaskService method. The while(true) loop keeps the app running until the user types "quit".
## OOP in a Real Project
Task (data model — id, title, done) and TaskService (business logic — add, list, complete, remove). This separation makes it easy to test and add new features (e.g., add priority feature only in TaskService, not in Task).
## From CLI to Web
CLI is great practice. For a real web project: replace fgets(STDIN) with a route handler (like in Laravel), store tasks in a database (PDO from Lesson 11), and add an HTML template.

---

## Experiments

1. **## Final Project: Bringing It All Together
20 PHP lessons summarized here: variables & types (Lesson 2), strings & arrays (Lesson 3), control flow (Lesson 4), functions (Lesson 5), OOP (Lessons 7-8), exceptions (Lesson 9), file & JSON (Lesson 10), PDO (Lesson 11), security (Lesson 12), Composer (Lesson 13), PHP 8 features (Lesson 14), testing (Lesson 15). The CLI Task Manager uses all of them.
## CLI Design
fgets(STDIN) reads a line of input from the terminal. match($cmd) { ... } routes the command to the appropriate TaskService method. The while(true) loop keeps the app running until the user types "quit".
## OOP in a Real Project
Task (data model — id, title, done) and TaskService (business logic — add, list, complete, remove). This separation makes it easy to test and add new features (e.g., add priority feature only in TaskService, not in Task).
## From CLI to Web
CLI is great practice. For a real web project: replace fgets(STDIN) with a route handler (like in Laravel), store tasks in a database (PDO from Lesson 11), and add an HTML template.**

---

## Challenge

Level up the final project: (1) add an edit feature: edit [id] "new title" to change a task title, (2) add a filter feature: filter done/undone, (3) save tasks to a JSON file (Lesson 10) so data persists after the app closes, (4) add unit tests for TaskService using PHPUnit (Lesson 15) — minimum 4 tests: add, list, complete, delete.

---

## Summary

CLI = all concepts in one project. OOP = separate model & service. match = routing. fgets = CLI input. You are PHP-ready!
