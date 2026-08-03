# File I/O & JSON

> PHP | Lesson 10

## Learning Objectives

- Read and write files with file_get_contents / file_put_contents\n- Encode and decode JSON (json_encode / json_decode)\n- Read file line by line with file()\n- Append to a file with FILE_APPEND

---

## Program: File I/O & JSON

```php
<?php

$data = ["nama" => "Tryngo", "kota" => "Jakarta", "tags" => ["php", "web", "backend"]];

$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
echo "JSON:\n" . $json . "\n\n";

file_put_contents("data.json", $json);

$isi = file_get_contents("data.json");
$decode = json_decode($isi, true);

echo "Dibaca dari file: " . $decode["nama"] . "\n";

$lines = file("data.json");
echo "Baris: " . count($lines) . "\n";

file_put_contents("log.txt", "[" . date("Y-m-d H:i:s") . "] Data diakses\n", FILE_APPEND);

```

---

## Explanation

## file_get_contents / file_put_contents
file_get_contents($path) = read entire file as a string. file_put_contents($path, $data) = write string to file (overwrite). Options: FILE_APPEND to append, LOCK_EX for exclusive lock.
## json_encode / json_decode
json_encode($data) = array/object to JSON string. JSON_PRETTY_PRINT = pretty format. JSON_UNESCAPED_SLASHES = don't escape /. json_decode($json, true) = JSON to associative array (without true = stdClass object).
## file() & fwrite
file($path) = read line by line (array). fopen/fwrite/fclose = finer control (write line by line, read per chunk). Always close files with fclose or use file_put_contents for simple operations.
## File Security
Never trust file names from user input (path traversal: ../../etc/passwd). Use basename() for sanitization. For production: restrict directories and use is_writable() to check.

---

## Experiments

1. **## file_get_contents / file_put_contents
file_get_contents($path) = read entire file as a string. file_put_contents($path, $data) = write string to file (overwrite). Options: FILE_APPEND to append, LOCK_EX for exclusive lock.
## json_encode / json_decode
json_encode($data) = array/object to JSON string. JSON_PRETTY_PRINT = pretty format. JSON_UNESCAPED_SLASHES = don't escape /. json_decode($json, true) = JSON to associative array (without true = stdClass object).
## file() & fwrite
file($path) = read line by line (array). fopen/fwrite/fclose = finer control (write line by line, read per chunk). Always close files with fclose or use file_put_contents for simple operations.
## File Security
Never trust file names from user input (path traversal: ../../etc/passwd). Use basename() for sanitization. For production: restrict directories and use is_writable() to check.**

---

## Challenge

Expand file I/O: (1) build a simple program: read data.json, add a new item (name, price), write back to data.json, (2) create a CSV exporter: array of data to .csv file using fputcsv, (3) build a log viewer that reads log.txt and displays each line in HTML with nl2br, (4) add validation: check if data.json exists before reading (file_exists) and show an error message if not.

---

## Summary

file_get_contents = read. file_put_contents = write. json_encode/decode = data exchange. Next: PDO database.
