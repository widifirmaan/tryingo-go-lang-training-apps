# Fungsi & Scope — Resep Warung PHP

> **Kategori:** PHP | **Level:** Pemula | **Minggu 3:** Fungsi & Scope

## Tujuan Pembelajaran

- `function sapa($nama){ return "Halo $nama"; }`, `return`, default `$nama="Tamu"`, `...$angka`

---

## Program

```php
<?php
function sapa($nama="Tamu"){ return "Halo, $nama!"; }
function total(...$angka){ return array_sum($angka); }
function hitungTotal($belanja, $diskon=0){
  $total = 0; foreach($belanja as $item) $total += $item["harga"]*$item["qty"];
  return $total * (1 - $diskon/100);
}
echo sapa("Budi");
echo total(1,2,3,4);
$keranjang = [["harga"=>62000,"qty"=>1],["harga"=>5000,"qty"=>2]];
echo hitungTotal([["harga"=>62000,"qty"=>1]], 10);
?>
```

---

## Ringkasan

Minggu 3: **Fungsi PHP** — resep pakai ulang.
