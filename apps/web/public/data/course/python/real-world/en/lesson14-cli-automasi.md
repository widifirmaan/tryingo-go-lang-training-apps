# CLI & Automation

> Python | Real-World Python | Lesson 14

## Learning Objectives

- Build CLIs with argparse
- Manipulate files with os and shutil
- Use pathlib vs os deliberately
- Apply the safe dry-run pattern

---

## Program: CLI & Automation

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

## Explanation

## argparse: The Proper CLI
`argparse` is the standard way to build command-line interfaces: flags (`--dir`), boolean options (`--dry-run`), automatic help (`--help`). This is the shape of 73-74% of shipped Python tools (career-path research: CLI + HTTP services). Asmorix places automation + Git in weeks 6-8 of its curriculum.

## os & shutil
`os.rename`, `os.walk` (recursive traversal), `shutil.move`, `shutil.copy`, `shutil.rmtree`. shutil = high-level operations on top of os. The pair = "Automate the Boring Stuff" (the most famous automation curriculum, free at automatetheboringstuff.com).

## pathlib vs os
`Path` is modern and expressive; `os` is cheap and everywhere. Python 3.6+ recommends pathlib for paths, os for system operations. Consistency beats "being right".

## The Dry-Run Pattern
Show the plan BEFORE executing — a production pattern that prevents disasters (deleting the wrong files). `action="store_true"` makes a boolean flag. The demo uses `tempfile.mkdtemp` so it is safe in any environment.

## Common Mistakes
Modifying files in the working directory without an is_dir check, hardcoded paths, forgetting file modes, dry-runs that still write, `shutil.move` into a folder that doesn't exist yet (use mkdir(exist_ok=True)).

---

## Experiments

1. **argparse: CLI yang Benar**
2. **os & shutil**
3. **pathlib vs os**
4. **Pola Dry-Run**
5. **Common Mistakes**

---

## Challenge

Build `renama_batch.py`: argparse --prefix and --dir, rename all .txt files to `{prefix}_{nama}.txt` with os.rename, dry-run true by default, --apply for real execution. Show before/after summaries.

---

## Summary

argparse CLIs, os/shutil automation, pathlib, the dry-run pattern. Ready to build real tools. Next: testing & Git.
