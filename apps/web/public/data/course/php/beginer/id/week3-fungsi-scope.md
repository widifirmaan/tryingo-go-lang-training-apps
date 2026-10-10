# Fungsi & Lingkup Variabel

> **Kategori:** PHP | **Level:** Pemula | **Minggu 3:** Fungsi & Lingkup Variabel

## Tujuan Pembelajaran

- Membuat fungsi dengan function keyword, parameter, dan return
- Default parameter value dan named arguments (PHP 8+)
- Variable scope: global, static, dan local
- Anonymous functions (closure) dan arrow functions (fn)
- Recursive function untuk perulangan mandiri

---

## Program: Kalkulator Fungsi

```php
<?php
function tambah($a, $b) {
    return $a + $b;
}

function bagi($a, $b) {
    if ($b == 0) {
        return "Error: tidak bisa dibagi nol";
    }
    return $a / $b;
}

function sapa($nama = "Tamu", $salam = "Halo") {
    return "$salam, $nama!";
}

function &getReference() {
    static $value = 10;
    return $value;
}

echo "Tambah: " . tambah(10, 5) . "<br>";
echo "Bagi: " . bagi(10, 3) . "<br>";
echo "Bagi nol: " . bagi(5, 0) . "<br>";
echo sapa("Budi") . "<br>";
echo sapa("Siti", "Selamat pagi") . "<br>";

$hitung = 0;
function counter() {
    global $hitung;
    $hitung++;
    return $hitung;
}
counter(); counter(); counter();
echo "Counter: $hitung<br>";

$faktorial = function($n) {
    if ($n <= 1) return 1;
    return $n * ($faktorial($n - 1));
};
echo "Faktorial 5: " . $faktorial(5) . "<br>";

$angka = [3, 1, 4, 1, 5];
$doubled = array_map(fn($n) => $n * 2, $angka);
echo "Doubled: " . implode(", ", $doubled) . "<br>";
>
```

---

## Konsep Kunci

### Deklarasi Fungsi
`function nama($param) { return $value; }`. Default value: `$nama = "Tamu"`.

### Scope
Local (di dalam fungsi), `global` keyword untuk akses variabel global, `static` untuk pertahankan value.

### Closure & Arrow
Anonymous function: `$f = function() {}`. Arrow function: `fn($x) => $x * 2`.

### Recursion
Fungsi memanggil dirinya sendiri. Base case untuk berhenti.

---

## Eksperimen

- Buat fungsi dengan type declaration: function tambah(int $a, int $b): int
- Coba variadic function: function sum(...$numbers)
- Buat closure dengan use() untuk capture variabel luar
- Implementasikan Fibonacci dengan recursion
- Gunakan array_filter dengan arrow function

---

## Tantangan

Buat library matematika: fungsi pangkat, faktorial, prima check, dan FizzBuzz. Gunakan recursion dan type hints.

---

## Ringkasan

Minggu 3 dari 12: **Fungsi & Lingkup Variabel** (Level: Pemula). Modularitas kode dimulai. Minggu depan: **Array & Manipulasi**.
