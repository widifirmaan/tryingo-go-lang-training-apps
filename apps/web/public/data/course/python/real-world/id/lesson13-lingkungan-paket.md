# venv, pip & Packages

> Python | Dunia Nyata | Pelajaran 13

## Tujuan Pembelajaran

- Memisahkan kode ke modul sendiri
- Memahami if __name__ == "__main__"
- Membuat dan mengaktifkan virtual environment
- Mengelola dependensi dengan pip dan requirements.txt

---

## Program: venv, pip & Packages

```python
# ===== Modul sendiri: organisasi kode lintas file =====
import helpers

nilai = [85, 92, 78, 90, 88]
print(f"Rata-rata: {helpers.rata_rata(nilai):.1f}")
print(f"Median: {helpers.median(nilai)}")

# ===== if __name__ == "__main__" =====
# Kode di bawah hanya jalan saat index.py dieksekusi LANGSUNG,
# bukan saat di-import sebagai modul.
def main():
    print("Program dimulai dari index.py (bukan saat di-import)")

if __name__ == "__main__":
    main()

# ===== venv & pip (jalankan di terminal lokal / StackBlitz) =====
# python -m venv venv
# venv\Scripts\activate          (Windows)
# source venv/bin/activate        (macOS / Linux)
# pip install requests
# pip freeze > requirements.txt
# pip install -r requirements.txt

```

---

## Penjelasan

## Modul Sendiri
File .py = modul. `import helpers` mengeksekusi helpers.py dan memberi namespace. Ini cara profesional mengorganisasi: logika di helpers.py, "cerita" di index.py. Scaler M3 menempatkan modules bersama functions; travisjneuman level 3 menambah packaging.

## if __name__ == "__main__"
Saat file di-import, kode level-atas TURUT dieksekusi — kecuali dijaga guard ini. `__name__` = `"__main__"` hanya saat dieksekusi langsung. Setiap file dengan perilaku perlu guard ini.

## Virtual Environment
`venv` = lingkungan Python terisolasi per project: versi package project A tidak merusak project B. Setiap project serius WAJIB venv (Scaler, DataCamp, travisjneuman). `venv\Scripts\activate` (Windows) / `source venv/bin/activate` (Unix).

## pip & requirements.txt
`pip install <pkg>` memasang dari PyPI; `pip freeze > requirements.txt` mencatat dependensi + versi; `pip install -r requirements.txt` mengembalikan environment di mesin lain / CI. StackBlitz WebContainers saat ini hanya stdlib (python3 vanilla) — install pip di lingkungan lokal kamu.

## Common Mistakes
Import di tengah fungsi (biasanya tanda design buruk), circular import, tidak pakai venv (dependency hell), meng-commit venv/ folder (pakai .gitignore), `pip` vs `pip3` salah versi Python.

---

## Eksperimen

1. **Modul Sendiri**
2. **if __name__ == "__main__"**
3. **Virtual Environment**
4. **pip & requirements.txt**
5. **Common Mistakes**

---

## Tantangan

Refactor: pindahkan fungsi statistika (rata-rata, median, modus) ke modul `statistik.py`, tulis index.py yang import dan menjalankan laporan, lalu buat requirements.txt kosong untuk project. Latih: buat venv lokal, install satu package, freeze.

---

## Ringkasan

Modul sendiri + __name__ guard + venv + pip/requirements.txt = fondasi project nyata. Lanjut: CLI & automasi.
