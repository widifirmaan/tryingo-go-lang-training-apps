# Capstone: Python Application

> **Kategori:** Python | **Level:** Advanced | **Minggu 12:** Capstone: Python Application

## Learning Objectives

- Combine all concepts: OOP, file I/O, error handling, testing
- Design patterns: Repository, Singleton, Factory
- Clean code: type hints, docstrings, modular design
- CLI + Library: dual interface for applications
- Testing: unit tests, integration tests, coverage

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

## Key Concepts

### Capstone Project
Combine 12 weeks of learning into a real application.

### Design Patterns
Repository, Singleton, Factory patterns.

### Clean Code
Type hints, docstrings, modular structure.

### Dual Interface
Library + CLI interfaces.

### Testing Strategy
Unit, integration tests, and coverage.

### Project Ideas
URL Shortener, Task Manager, Blog Engine, Chat Bot, Data Pipeline.

---

## Experiments

- Add expiry date for short URLs
- Implement custom domain support
- Build web interface with Flask
- Add analytics: referrer, browser, location
- Deploy to cloud: Heroku, Railway, or AWS

---

## Challenge

Build a complete capstone application: choose domain (URL Shortener, Task Manager, Blog), implement with OOP, CLI, testing 80%+, documentation.

---

## Summary

Week 12 of 12: **Capstone: Python Application** (Level: Advanced). Complete! 🎉 You've mastered Python from scratch to production-ready.
