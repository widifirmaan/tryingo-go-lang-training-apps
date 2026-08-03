# Exception & Error Handling

> PHP | Pelajaran 9

## Tujuan Pembelajaran

- Melempar exception dengan throw new\n- Menangkap exception dengan try/catch\n- Menggunakan blok finally untuk kode yang selalu jalan\n- Mengubah handler error dengan set_error_handler

---

## Program: Exception & Error Handling

```php
<?php

function bagi($a, $b) {
    if ($b == 0) {
        throw new InvalidArgumentException("Pembagi tidak boleh nol");
    }
    return $a / $b;
}

try {
    echo bagi(10, 2) . "\n";
    echo bagi(10, 0) . "\n";
} catch (InvalidArgumentException $e) {
    echo "Error: " . $e->getMessage() . "\n";
} finally {
    echo "Blok finally selalu jalan\n";
}

set_error_handler(function ($errno, $errstr) {
    echo "Warning ditangkap: $errstr\n";
    return true;
});
echo $undefined_var . "\n";

```

---

## Penjelasan

## throw & try/catch
throw new InvalidArgumentException("Pesan") — menghentikan eksekusi normal dan berpindah ke blok catch terdekat. try { ... } catch (ExceptionType $e) { ... } — menangkap exception spesifik. Beberapa catch bisa menangani tipe berbeda.
## finally
Blok finally selalu dieksekusi — apakah exception terjadi atau tidak. Berguna untuk cleanup: tutup file, tutup koneksi database, dll.
## Custom Exception
class DatabaseException extends Exception {} — buat tipe exception sendiri. catch (DatabaseException $e) lebih spesifik daripada catch (Exception $e). Urutan catch: yang paling spesifik dulu.
## Error Handler
set_error_handler() mengubah bagaimana PHP menangani warnings/notices. Return true untuk menandakan handler telah menangani error (jangan tampilkan default).

---

## Eksperimen

1. **## throw & try/catch
throw new InvalidArgumentException("Pesan") — menghentikan eksekusi normal dan berpindah ke blok catch terdekat. try { ... } catch (ExceptionType $e) { ... } — menangkap exception spesifik. Beberapa catch bisa menangani tipe berbeda.
## finally
Blok finally selalu dieksekusi — apakah exception terjadi atau tidak. Berguna untuk cleanup: tutup file, tutup koneksi database, dll.
## Custom Exception
class DatabaseException extends Exception {} — buat tipe exception sendiri. catch (DatabaseException $e) lebih spesifik daripada catch (Exception $e). Urutan catch: yang paling spesifik dulu.
## Error Handler
set_error_handler() mengubah bagaimana PHP menangani warnings/notices. Return true untuk menandakan handler telah menangani error (jangan tampilkan default).**

---

## Tantangan

Latih exception: (1) buat custom exception class ValidationException dengan properti $errors (array) dan override getMessage() untuk menampilkan semua error, (2) buat fungsi validateForm($data) yang melempar ValidationException jika nama kosong atau email tidak valid, (3) gunakan beberapa catch block: catch (InvalidArgumentException) untuk pembagian nol, catch (ValidationException) untuk form, catch (Exception $e) sebagai fallback, (4) buat fungsi bacaFile($path) yang try/catch FileNotFoundException dan mengembalikan null jika file tidak ditemukan.

---

## Ringkasan

throw = lempar error. try/catch = tangkap. finally = selalu jalan. set_error_handler = custom handler. Lanjut: file I/O.
