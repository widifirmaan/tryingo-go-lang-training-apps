# Dasar Python & Sintaks

> **Kategori:** Python | **Level:** Pemula | **Minggu 1:** Dasar Python & Sintaks

## Tujuan Pembelajaran

- Memahami Python sebagai bahasa interpreted, dynamically typed (Python.org tutorial)
- Menjalankan file Python dengan python command dan IDE
- Mendeklarasikan variabel tanpa tipe eksplisit — duck typing
- Mengenal tipe data dasar: int, float, str, bool, None
- Menggunakan f-strings untuk string formatting modern

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Python for VS Code** (`ms-python.python`): Dukungan resmi Microsoft: linter, debugger, autocomplete
- **Ruff** (`charliermarsh.ruff`): Linter dan formatter Python super cepat berbasis Rust

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension ms-python.python --install-extension charliermarsh.ruff
```

---

### 2. Instalasi Runtime & Dependency (Python 3.12+)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install Python.Python.3.12
```

**macOS (Terminal / Homebrew):**
```bash
brew install python@3.12
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install python3 python3-pip python3-venv
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
python --version || python3 --version
```

Output yang diharapkan:
```output
Python 3.12.x
```

> 💡 **Tips Prasyarat:** Pastikan mencentang "Add python.exe to PATH" jika menginstal via Windows installer resmi.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-python-app && cd my-python-app
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
```
- **Keterangan:** Virtual environment (.venv) mengisolasi package proyek agar tidak bentrok dengan instalasi sistem.
- **Pindah ke direktori project:**
```bash
cd my-python-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
python main.py
```
Akses di browser atau terminal: `Terminal Console`

> ℹ️ Program dieksekusi langsung oleh Python interpreter.

**File Titik Masuk Utama (`main.py`):**
```py
import sys
from datetime import datetime

def greet(name: str) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"🐍 Halo {name}! Waktu server: {now} (Python {sys.version.split()[0]})"

if __name__ == "__main__":
    print(greet("Developer"))
```
Skrip Python modern dengan type hints dan datetime.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-python-app/
├── .venv/               # Virtual environment isolasi package
├── src/
│   └── main.py          # Entrypoint program
├── requirements.txt     # Daftar package dependensi
└── pyproject.toml       # Metadata konfigurasi modern
```
Struktur project Python modern dengan isolasi venv.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan perintah `pip freeze > requirements.txt` untuk menyimpan daftar dependensi proyek.
- Gunakan `uv` (`pip install uv`) sebagai package manager alternatif yang 10-100x lebih cepat dari pip standar.

---

## Program: Halo, Python!

```python

# Dasar Python & Sintaks
print("Selamat datang di Python!")
print("Python adalah bahasa interpreted, dynamically typed.")

# Variabel — tidak perlu deklarasi tipe
nama = "Pyverse"
versi = 3.12
aktif = True
tahun = 2024

# f-strings untuk formatting
print(f"Nama: {nama}")
print(f"Versi: {versi}")
print(f"Aktif: {aktif}")
print(f"Tahun: {tahun}")

# Tipe data dengan type()
print(f"\nTipe variabel:")
print(f"nama: {type(nama).__name__}")
print(f"versi: {type(versi).__name__}")
print(f"aktif: {type(aktif).__name__}")
print(f"tahun: {type(tahun).__name__}")

# Multiple assignment
x, y, z = 10, 20, 30
print(f"\nx={x}, y={y}, z={z}")

# Swap tanpa variabel temporary
a, b = 5, 10
a, b = b, a
print(f"Setelah swap: a={a}, b={b}")

# Konversi tipe
angka_str = "42"
angka_int = int(angka_str)
angka_float = float(angka_str)
print(f"\nKonversi: '{angka_str}' -> int={angka_int}, float={angka_float}")
    
```

---

## Konsep Kunci

### Apa Itu Python
Python adalah bahasa interpreted, dynamically typed yang dibuat Guido van Rossum. Tidak perlu kompilasi — kode dijalankan baris per baris. Indentation (spasi) menentukan blok kode, bukan kurung kurawal.

### Variabel & Tipe Data
Tidak perlu deklarasi tipe: `x = 5` otomatis int. Python cek tipe saat runtime. Tipe dasar: `int`, `float`, `str`, `bool`, `None`.

### f-strings
`f"Hello {name}"` — cara modern formatting string di Python 3.6+. Lebih readable daripada `%` atau `.format()`.

### Multiple Assignment
`a, b = 10, 20` dan swap `a, b = b, a` — fitur elegan Python.

### Konversi Tipe
`int("42")`, `str(100)`, `float("3.14")` — konversi eksplisit antar tipe.

---

## Eksperimen

- Ubah nilai variabel dan lihat output berubah
- Coba type() pada berbagai variabel
- Buat konversi tipe: str ke float, int ke str
- Eksperimen dengan multiple assignment
- Buat program kecil gabungan 2-3 konsep

---

## Tantangan

Buat program konversi mata uang: input Rupiah, konversi ke USD, EUR, JPY. Gunakan f-strings dan konversi tipe.

---

## Ringkasan

Minggu 1 dari 12: **Dasar Python & Sintaks** (Level: Pemula). Python mudah dibaca dan ditulis. Minggu depan: **Data Types & Operasi**.
