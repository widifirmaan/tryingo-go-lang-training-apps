# CLI & Automasi

> Python | Dunia Nyata | Pelajaran 14

## Tujuan Pembelajaran

- Membangun CLI dengan argparse
- Memanipulasi file dengan os dan shutil
- Menggunakan pathlib vs os secara sadar
- Menerapkan pola dry-run yang aman

---

## Program: CLI & Automasi

```python
import argparse
import os
import shutil
import tempfile
from pathlib import Path

# ===== argparse: CLI profesional =====
# (jalankan: python3 index.py --dir <path> --dry-run)

ATURAN = {
    ".txt": "Dokumen", ".md": "Dokumen",
    ".png": "Gambar", ".jpg": "Gambar",
    ".csv": "Data", ".json": "Data",
}

def organisir(target_dir, dry_run=False):
    target = Path(target_dir)
    for file in target.iterdir():
        if file.is_dir():
            continue
        kategori = ATURAN.get(file.suffix.lower(), "Lainnya")
        folder = target / kategori
        print(f"  {file.name} -> {kategori}/")
        if not dry_run:
            folder.mkdir(exist_ok=True)
            shutil.move(str(file), str(folder / file.name))

def demo():
    demo_dir = Path(tempfile.mkdtemp(prefix="tryngo_"))
    for nama in ["laporan.txt", "foto.png", "data.csv", "catatan.md", "random.bin"]:
        (demo_dir / nama).write_text("contoh", encoding="utf-8")
    print(f"Demo dir: {demo_dir}")
    print("Sebelum:", sorted(f.name for f in demo_dir.iterdir()))
    organisir(demo_dir, dry_run=True)
    print("(rencana organisasi di atas, dry-run)")

def main():
    parser = argparse.ArgumentParser(description="Organisir file berdasarkan ekstensi")
    parser.add_argument("--dir", default=".", help="Direktori target")
    parser.add_argument("--dry-run", action="store_true", help="Hanya tampilkan rencana")
    args = parser.parse_args()
    organisir(args.dir, args.dry_run)

if __name__ == "__main__":
    demo()
    # Uncomment baris ini untuk CLI sungguhan:
    # main()

```

---

## Penjelasan

## argparse: CLI yang Benar
`argparse` = cara standar membuat command-line interface: flag (`--dir`), opsi boolean (`--dry-run`), help otomatis (`--help`). Ini bentuk 73-74% tool Python yang dikirim developer (research jalur karier: CLI + HTTP service). Asmorix menaruh otomasi + Git di minggu 6-8 kurikulumnya.

## os & shutil
`os.rename`, `os.walk` (jelajah rekursif), `shutil.move`, `shutil.copy`, `shutil.rmtree`. shutil = operasi level tinggi di atas os. Kombinasi keduanya = "Automate the Boring Stuff" (kurikulum automasi paling terkenal, gratis di automatetheboringstuff.com).

## pathlib vs os
`Path` modern dan ekspresif; `os` murah dan ada di mana-mana. Python 3.6+ menganjurkan pathlib untuk path, os untuk operasi sistem. Konsisten lebih penting daripada "benar".

## Pola Dry-Run
Tampilkan rencana SEBELUM mengeksekusi — pola produksi yang mencegah bencana (hapus file salah). `action="store_true"` membuat flag boolean. Demo di program memakai `tempfile.mkdtemp` agar aman di lingkungan apa pun.

## Common Mistakes
Mengubah file di direktori kerja tanpa cek is_dir, hardcode path, lupa mode file, dry-run yang tetap menulis, `shutil.move` ke folder yang belum dibuat (pakai mkdir(exist_ok=True)).

---

## Eksperimen

1. **argparse: CLI yang Benar**
2. **os & shutil**
3. **pathlib vs os**
4. **Pola Dry-Run**
5. **Common Mistakes**

---

## Tantangan

Buat tool `renama_batch.py`: argparse --prefix dan --dir, rename semua file .txt menjadi `{prefix}_{nama}.txt` dengan os.rename, dry-run default true, opsi --apply untuk eksekusi nyata. Tampilkan ringkasan sebelum/sesudah.

---

## Ringkasan

argparse CLI, os/shutil automasi, pathlib, dry-run pattern. Siap membuat tool nyata. Lanjut: testing & Git.
