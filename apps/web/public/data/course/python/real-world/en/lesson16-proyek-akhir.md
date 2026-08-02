# Final Project: Library Manager CLI

> Python | Real-World Python | Lesson 16

## Learning Objectives

- Integrate classes, dicts, JSON, and error handling
- Apply read-save persistence patterns
- Use classmethods for deserialization
- Assess career paths after the track

---

## Program: Final Project: Library Manager CLI

```python
import json
from pathlib import Path

FILE_DATA = Path("perpustakaan.json")

class Buku:
    def __init__(self, judul, penulis, tahun):
        self.judul = judul
        self.penulis = penulis
        self.tahun = tahun
        self.dipinjam = False

    def __str__(self):
        status = "dipinjam" if self.dipinjam else "tersedia"
        return f"[{status}] {self.judul} ({self.penulis}, {self.tahun})"

    def to_dict(self):
        return {"judul": self.judul, "penulis": self.penulis,
                "tahun": self.tahun, "dipinjam": self.dipinjam}

    @classmethod
    def from_dict(cls, data):
        buku = cls(data["judul"], data["penulis"], data["tahun"])
        buku.dipinjam = data["dipinjam"]
        return buku

class Perpustakaan:
    def __init__(self, file_data=FILE_DATA):
        self.file_data = Path(file_data)
        self.buku = {}                # key: judul -> Buku
        self._muat()

    def tambah(self, buku):
        self.buku[buku.judul] = buku
        self._simpan()

    def cari(self, kata):
        return [b for b in self.buku.values()
                if kata.lower() in b.judul.lower()
                or kata.lower() in b.penulis.lower()]

    def pinjam(self, judul):
        buku = self.buku.get(judul)
        if buku is None:
            raise KeyError(f"'{judul}' tidak ditemukan")
        if buku.dipinjam:
            raise ValueError(f"'{judul}' sudah dipinjam")
        buku.dipinjam = True
        self._simpan()

    def kembalikan(self, judul):
        buku = self.buku.get(judul)
        if buku is None:
            raise KeyError(f"'{judul}' tidak ditemukan")
        buku.dipinjam = False
        self._simpan()

    def daftar(self):
        return sorted(self.buku.values(), key=lambda b: b.judul)

    def _simpan(self):
        with open(self.file_data, "w", encoding="utf-8") as f:
            json.dump([b.to_dict() for b in self.buku.values()], f, indent=2, ensure_ascii=False)

    def _muat(self):
        if not self.file_data.exists():
            return
        with open(self.file_data, "r", encoding="utf-8") as f:
            for data in json.load(f):
                buku = Buku.from_dict(data)
                self.buku[buku.judul] = buku

def demo():
    perpus = Perpustakaan("perpustakaan_demo.json")
    perpus.tambah(Buku("Belajar Python", "Ayu", 2025))
    perpus.tambah(Buku("Go untuk Pemula", "Budi", 2024))
    perpus.tambah(Buku("Rust Essentials", "Citra", 2026))

    print("=== Perpustakaan ===")
    for b in perpus.daftar():
        print(f"  {b}")

    print("\nTransaksi:")
    perpus.pinjam("Belajar Python")
    perpus.kembalikan("Belajar Python")
    perpus.pinjam("Go untuk Pemula")

    print("Setelah transaksi (tersimpan ke JSON):")
    for b in perpus.daftar():
        print(f"  {b}")

    print("\nPencarian 'python':")
    for b in perpus.cari("python"):
        print(f"  {b}")

if __name__ == "__main__":
    demo()

```

---

## Explanation

## Project Architecture
This capstone uses ALL the material: classes (Buku, Perpustakaan), special methods (__str__), dict storage, JSON persistence, sorted + lambda, try/except (KeyError, ValueError), the if __name__ guard. This is the same "domain object + repository" pattern used in production apps — just without frameworks.

## JSON Persistence
`to_dict()` serializes, `from_dict()` deserializes (a classmethod: builds instances from raw data). `_simpan()` writes after every mutation; `_muat()` reads on construction. Data outlives the program — the pattern used by todo apps, configs, save files.

## Demo vs UI Separation
`demo()` separates the runnable example from the domain structure. Challenge: replace demo() with an input() menu or an argparse CLI (add/borrow/return/search/list) — combining the L8 menu with L14 argparse.

## After This Track (researched career map)
All sources agree (CourseFacts, DataCamp, Scaler, Asmorix): after core Python, PICK ONE path — (A) Web: Flask/FastAPI/Django + database; (B) Data: NumPy/Pandas/Matplotlib/Jupyter; (C) Automation & CLI: os/shutil/subprocess/requests + scheduling; (D) AI: LLM APIs (Gemini SDK etc.). One path deep, not all shallow. Universal additions: Git, SQL, terminal.

---

## Experiments

1. **Arsitektur Proyek**
2. **JSON Persistence**
3. **Pemisahan Demo & UI**
4. **Setelah Track Ini (peta karier riset)**

---

## Challenge

Polish the project: (1) a full argparse CLI: add, borrow, return, search, list, stats; (2) collection stats: book count, borrowed percentage, oldest book; (3) pytest tests for Perpustakaan (add, double borrow must error); (4) commit + push to GitHub and share it.

---

## Summary

Capstone done: classes + dicts + JSON + error handling + CLI = a real Python tool. Next, pick your path: web/data/automation/AI. Congratulations, the Python track is complete!
