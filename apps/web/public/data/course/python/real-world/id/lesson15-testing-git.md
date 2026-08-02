# Testing & Git

> Python | Dunia Nyata | Pelajaran 15

## Tujuan Pembelajaran

- Menulis test berbasis assert
- Menstrukturkan test sebagai fungsi
- Memahami pytest dan fixtures dasar
- Mengenal alur kerja Git: add, commit, push

---

## Program: Testing & Git

```python
# ===== Pengujian dasar: assert =====
import calculator

def uji():
    hasil = []
    hasil.append(("tambah", calculator.tambah(2, 3) == 5))
    hasil.append(("kurang", calculator.kurang(10, 4) == 6))
    hasil.append(("kali", calculator.kali(3, 4) == 12))
    hasil.append(("bagi", calculator.bagi(9, 3) == 3))
    try:
        calculator.bagi(1, 0)
        hasil.append(("bagi-nol", False))
    except ValueError:
        hasil.append(("bagi-nol", True))
    return hasil

hasil = uji()
for nama, ok in hasil:
    print(f"  [{'PASS' if ok else 'FAIL'}] {nama}")
print(f"\n{sum(ok for _, ok in hasil)}/{len(hasil)} lolos")

# ===== pytest (tool sungguhan, jalankan lokal) =====
# Buat file test_calculator.py:
#
#   from calculator import tambah, bagi
#   import pytest
#
#   def test_tambah():
#       assert tambah(2, 3) == 5
#
#   def test_bagi_nol():
#       with pytest.raises(ValueError):
#           bagi(1, 0)
#
# Jalankan:  pytest test_calculator.py -v

# ===== Git (konsep inti, jalankan lokal) =====
# git init
# git add calculator.py test_calculator.py
# git commit -m "feat: kalkulator + test"
# git branch -M main
# git remote add origin <url>
# git push -u origin main
# git log --oneline

```

---

## Penjelasan

## assert & Test Function
`assert` memeriksa kebenaran dan melempar AssertionError saat gagal. Struktur test: satu fungsi per perilaku, nama deskriptif (`test_tambah`). Pola 3 tahap: arrange (siapkan) -> act (panggil) -> assert (periksa). DataCamp menempatkan testing di bulan 3-4 roadmap 12 bulannya; travisjneuman level 3: "packages, logging, test-driven development".

## pytest
`pytest` = framework test de facto: temukan fungsi `test_*`, jalankan, lapor merah/hijau. `pytest.raises(ValueError)` untuk menguji error. Assertion bawaannya membaca pesan yang jelas — riset Springer: error message yang jelas menurunkan frustrasi pemula 73%.

## TDD Ringkas
TDD: tulis test yang gagal dulu, lalu implementasi minimal sampai hijau, lalu refactor. Untuk track ini: cukup tulis test BERSAMA implementasi — kebiasaan mengetes apa yang kamu bangun jauh lebih penting daripada urutannya.

## Git & GitHub
`git add` (staging) -> `git commit` (snapshot + pesan) -> `git push` (ke remote). `git log --oneline` melihat riwayat. Git muncul di hampir semua kurikulum riset: DataCamp bulan 1-2, Asmorix minggu 8, travisjneuman "Git Basics".

## Common Mistakes
Test menguji implementasi, bukan perilaku (menguji internal, bukan input->output), lupa edge case (bagi nol!), test yang selalu lolos, menge-commit file tidak relevan, commit tanpa pesan deskriptif.

---

## Eksperimen

1. **assert & Test Function**
2. **pytest**
3. **TDD Ringkas**
4. **Git & GitHub**
5. **Common Mistakes**

---

## Tantangan

Tambah fungsi `pangkat(a, b)` dan `sisa(a, b)` ke calculator.py, tulis test-nya di index.py, lalu buat test_calculator.py versi pytest dan jalankan lokal. Setelah hijau: git init, commit, buat repo GitHub, push.

---

## Ringkasan

assert + test functions, pytest, TDD ringkas, Git workflow. Kode teruji + ter-version-control = siap produksi. Lanjut: proyek akhir.
