# CLI & Automation

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 11:** CLI & Automation

## Tujuan Pembelajaran

- argparse: ArgumentParser, add_argument, subparsers
- CLI patterns: commands, flags, positional args
- JSON persistence untuk CLI apps
- click dan typer: alternatif argparse yang lebih modern
- Automation: schedule tasks, file watching, web scraping

---

## Program: Task CLI

```python

# CLI & Automation
import argparse
import json
import os
from datetime import datetime

# argparse
print("=== argparse ===")
parser = argparse.ArgumentParser(
    description="Task CLI - Manage your tasks",
    formatter_class=argparse.RawDescriptionHelpFormatter
)
parser.add_argument("--version", action="version", version="%(prog)s 1.0")
parser.add_argument("--json", action="store_true", help="Output as JSON")

subparsers = parser.add_subparsers(dest="command")

# Add command
add_parser = subparsers.add_parser("add", help="Add a new task")
add_parser.add_argument("title", help="Task title")
add_parser.add_argument("--priority", "-p", choices=["low", "medium", "high"], default="medium")

# List command
subparsers.add_parser("list", help="List all tasks")

# Done command
done_parser = subparsers.add_parser("done", help="Mark task as done")
done_parser.add_argument("id", type=int, help="Task ID")

# Delete command
delete_parser = subparsers.add_parser("delete", help="Delete a task")
delete_parser.add_argument("id", type=int, help="Task ID")

# Simulate parsing
args = parser.parse_args(["add", "Learn Python", "--priority", "high"])
print(f"Command: {args.command}")
print(f"Title: {args.title}")
print(f"Priority: {args.priority}")

# Task Manager
print("\n=== Task Manager ===")
TASKS_FILE = "tasks.json"

def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE) as f: return json.load(f)
    return []

def save_tasks(tasks):
    with open(TASKS_FILE, "w") as f: json.dump(tasks, f, indent=2)

def add_task(title, priority="medium"):
    tasks = load_tasks()
    task = {
        "id": len(tasks) + 1,
        "title": title,
        "priority": priority,
        "done": False,
        "created": datetime.now().isoformat()
    }
    tasks.append(task)
    save_tasks(tasks)
    return task

def mark_done(task_id):
    tasks = load_tasks()
    for t in tasks:
        if t["id"] == task_id:
            t["done"] = True
            save_tasks(tasks)
            return True
    return False

# Demo
add_task("Learn Python", "high")
add_task("Build CLI", "medium")
add_task("Write tests", "low")
mark_done(1)

tasks = load_tasks()
print(f"Tasks ({len(tasks)}):")
for t in tasks:
    status = "[x]" if t["done"] else "[ ]"
    print(f"  {status} {t['id']}. {t['title']} ({t['priority']})")

# Cleanup
os.remove(TASKS_FILE)
print("\nDemo complete")
    
```

---

## Konsep Kunci

### argparse
`ArgumentParser`, `add_argument`, `add_subparsers` untuk command-based CLI.

### CLI Patterns
Commands (add, list, delete), flags (--json, --verbose), positional args.

### click & typer
`@click.command()`, `@click.argument()`. typer: modern, type-hint based.

### Persistence
JSON file, SQLite, atau database untuk simpan state.

### Automation
`schedule` untuk periodic tasks, `watchdog` untuk file watching, `requests + BeautifulSoup` untuk scraping.

### Best Practice
`if __name__ == "__main__":` entry point. `setup.py` atau `pyproject.toml` console_scripts.

---

## Eksperimen

- Buat CLI dengan subcommands: init, run, status
- Coba click untuk membuat CLI yang sama
- Buat progress bar dengan tqdm
- Implementasikan config file (YAML/TOML)
- Buat automation script: backup files, send email

---

## Tantangan

Buat CLI tool lengkap: task manager dengan add/list/done/delete, JSON persistence, colored output, --json flag. Package dengan pyproject.toml.

---

## Ringkasan

Minggu 11 dari 12: **CLI & Automation** (Level: Lanjutan). Tooling dan produktivitas. Minggu depan: **Capstone Project**!
