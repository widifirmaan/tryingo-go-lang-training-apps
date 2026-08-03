# Exception & Error Handling

> PHP | Lesson 9

## Learning Objectives

- Throw exceptions with throw new\n- Catch exceptions with try/catch\n- Use the finally block for code that always runs\n- Customize error handling with set_error_handler

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

## Explanation

## throw & try/catch
throw new InvalidArgumentException("message") — stops normal execution and searches for a matching catch block. try { ... } catch (ExceptionType $e) { ... } — catches a specific exception type. Multiple catch blocks can handle different types.
## finally
The finally block always executes — whether an exception occurred or not. Useful for cleanup: close files, close database connections, etc.
## Custom Exception
class DatabaseException extends Exception {} — create your own exception type. catch (DatabaseException $e) is more specific than catch (Exception $e). Order catch blocks: most specific first.
## Error Handler
set_error_handler() changes how PHP handles warnings/notices. Return true to indicate the handler has handled the error (suppress the default display).

---

## Experiments

1. **## throw & try/catch
throw new InvalidArgumentException("message") — stops normal execution and searches for a matching catch block. try { ... } catch (ExceptionType $e) { ... } — catches a specific exception type. Multiple catch blocks can handle different types.
## finally
The finally block always executes — whether an exception occurred or not. Useful for cleanup: close files, close database connections, etc.
## Custom Exception
class DatabaseException extends Exception {} — create your own exception type. catch (DatabaseException $e) is more specific than catch (Exception $e). Order catch blocks: most specific first.
## Error Handler
set_error_handler() changes how PHP handles warnings/notices. Return true to indicate the handler has handled the error (suppress the default display).**

---

## Challenge

Practice exceptions: (1) create a custom ValidationException class with an $errors (array) property and override getMessage() to display all errors, (2) create a validateForm($data) function that throws ValidationException if name is empty or email is invalid, (3) use multiple catch blocks: catch (InvalidArgumentException) for division by zero, catch (ValidationException) for form errors, catch (Exception $e) as fallback, (4) create a readFile($path) function that try/catches FileNotFoundException and returns null if the file is not found.

---

## Summary

throw = throw error. try/catch = catch. finally = always runs. set_error_handler = custom handler. Next: file I/O.
