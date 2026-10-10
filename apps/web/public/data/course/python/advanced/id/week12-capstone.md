# Capstone: Python Application

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 12:** Capstone: Python Application

## Tujuan Pembelajaran

- Menggabungkan semua konsep: OOP, file I/O, error handling, testing
- Design patterns: Repository, Singleton, Factory
- Clean code: type hints, docstrings, modular design
- CLI + Library: dual interface untuk aplikasi
- Testing: unit test, integration test, coverage

---

## Program: URL Shortener

```python

# Capstone: URL Shortener
import hashlib
import json
import os
from datetime import datetime

class URLShortener:
    """URL Shortener dengan persistence."""

    def __init__(self, db_file="urls.json"):
        self.db_file = db_file
        self.urls = {}
        self._load()

    def _load(self):
        if os.path.exists(self.db_file):
            with open(self.db_file) as f:
                self.urls = json.load(f)

    def _save(self):
        with open(self.db_file, "w") as f:
            json.dump(self.urls, f, indent=2)

    def shorten(self, url: str, alias: str = None) -> str:
        if alias is None:
            short_code = hashlib.md5(url.encode()).hexdigest()[:6]
        else:
            short_code = alias
        self.urls[short_code] = {
            "url": url, "clicks": 0,
            "created": datetime.now().isoformat()
        }
        self._save()
        return short_code

    def expand(self, short_code: str) -> str:
        if short_code in self.urls:
            self.urls[short_code]["clicks"] += 1
            self._save()
            return self.urls[short_code]["url"]
        return None

    def stats(self, short_code: str) -> dict:
        return self.urls.get(short_code)

    def list_all(self) -> list:
        return [{"code": k, **v} for k, v in self.urls.items()]

    def delete(self, short_code: str) -> bool:
        if short_code in self.urls:
            del self.urls[short_code]
            self._save()
            return True
        return False

# Demo
print("=== URL Shortener Capstone ===")
shortener = URLShortener()

code1 = shortener.shorten("https://python.org/doc")
code2 = shortener.shorten("https://github.com/python", alias="gh-py")
code3 = shortener.shorten("https://realpython.com")

print(f"Shortened URLs:")
print(f"  python.org/doc -> {code1}")
print(f"  github.com -> {code2}")
print(f"  realpython.com -> {code3}")

# Expand
print(f"\nExpanding:")
print(f"  {code1} -> {shortener.expand(code1)}")
print(f"  {code2} -> {shortener.expand(code2)}")
print(f"  {code1} -> {shortener.expand(code1)}")

# Stats
print(f"\nStats:")
for code in [code1, code2, code3]:
    s = shortener.stats(code)
    print(f"  {code}: {s['clicks']} clicks, created {s['created'][:10]}")

# List all
print(f"\nAll URLs ({len(shortener.list_all())}):")
for item in shortener.list_all():
    print(f"  [{item['code']}] {item['url']}")

# Delete
shortener.delete(code3)
print(f"\nAfter delete: {len(shortener.list_all())} URLs")

# Cleanup
os.remove("urls.json")
print("\nCapstone demo complete!")
    
```

---

## Konsep Kunci

### Capstone Project
Menggabungkan 12 minggu pembelajaran menjadi aplikasi nyata.

### Design Patterns
Repository (data access), Singleton (one instance), Factory (object creation).

### Clean Code
Type hints, docstrings, modular file structure, separation of concerns.

### Dual Interface
Library (import dan pakai di code) + CLI (jalankan dari terminal).

### Testing Strategy
Unit test untuk functions, integration test untuk database/API, coverage report.

### Project Ideas
URL Shortener, Task Manager, Blog Engine, Chat Bot, Data Pipeline.

---

## Eksperimen

- Tambah expiry date untuk short URLs
- Implementasikan custom domain support
- Buat web interface dengan Flask
- Tambah analytics: referrer, browser, location
- Deploy ke cloud: Heroku, Railway, atau AWS

---

## Tantangan

Buat aplikasi capstone lengkap: pilih domain (URL Shortener, Task Manager, Blog), implementasikan dengan OOP, CLI, testing 80%+, dokumentasi.

---

## Ringkasan

Minggu 12 dari 12: **Capstone: Python Application** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Python dari nol hingga production-ready.
