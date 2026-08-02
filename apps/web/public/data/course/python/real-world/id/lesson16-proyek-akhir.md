# Proyek Akhir: Library Manager CLI

> Python | Dunia Nyata | Pelajaran 16

## Tujuan Pembelajaran

- Mengintegrasikan kelas, dict, JSON, dan error handling
- Menerapkan pola persistence baca-simpan
- Menggunakan classmethod untuk deserialisasi
- Menilai jalur karier setelah track selesai

---

## Program: Proyek Akhir: Library Manager CLI

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

## Penjelasan

## Arsitektur Proyek
Capstone ini memakai SEMUA materi: class (Buku, Perpustakaan), special methods (__str__), dict storage, JSON persistence, sorted + lambda, try/except (KeyError, ValueError), if __name__ guard. Ini pola "domain object + repository" yang sama dengan aplikasi produksi — hanya tanpa framework.

## JSON Persistence
`to_dict()` serialisasi, `from_dict()` deserialisasi (classmethod: membangun instance dari data mentah). `_simpan()` menulis setelah setiap mutasi; `_muat()` membaca saat konstruksi. Data hidup lebih lama dari program — pola yang dipakai di todo apps, config, save files.

## Pemisahan Demo & UI
`demo()` memisahkan contoh jalan dari struktur domain. Challenge: ganti demo() dengan menu input() atau argparse CLI (tambah/pinjam/kembalikan/cari/daftar) — mengombinasikan L8 menu + L14 argparse.

## Setelah Track Ini (peta karier riset)
Research semua sumber (CourseFacts, DataCamp, Scaler, Asmorix): setelah inti Python, PILIH satu jalur — (A) Web: Flask/FastAPI/Django + database; (B) Data: NumPy/Pandas/Matplotlib/Jupyter; (C) Automasi & CLI: os/shutil/subprocess/requests + scheduling; (D) AI: LLM API (Gemini SDK dll). Satu jalur dalam, bukan semua dangkal. Tambahan universal: Git, SQL, terminal.

---

## Eksperimen

1. **Arsitektur Proyek**
2. **JSON Persistence**
3. **Pemisahan Demo & UI**
4. **Setelah Track Ini (peta karier riset)**

---

## Tantangan

Sempurnakan proyek: (1) CLI argparse penuh: tambah, pinjam, kembalikan, cari, daftar, statistik; (2) statistik koleksi: jumlah buku, persentase dipinjam, buku tertua; (3) test pytest untuk Perpustakaan (tambah, pinjam dua kali harus error); (4) commit + push ke GitHub dan bagikan.

---

## Ringkasan

Capstone selesai: kelas + dict + JSON + error handling + CLI = tool Python nyata. Lanjut pilih jalur: web/data/automasi/AI. Selamat, track Python selesai!
