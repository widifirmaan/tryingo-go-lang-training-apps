# CLI & Automation

> **Kategori:** Python | **Level:** Advanced | **Minggu 11:** CLI & Automation
> **Prerequisites:** Week 10 — **Testing**.

## Learning Objectives

- argparse: ArgumentParser, add_argument, subparsers
- CLI patterns: commands, flags, positional args
- JSON persistence for CLI apps
- click and typer: more modern argparse alternatives
- Automation: schedule tasks, file watching, web scraping

---

## Why This Matters (Non-IT)

Terminal cashier without a browser: `shop add --name Rice` is faster than opening admin. `argparse` + `subparsers` make a professional CLI (not `input()` asking 1-by-1).

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

## Key Concepts

### argparse
`ArgumentParser`, `add_argument`, `add_subparsers` for command-based CLI.

### CLI Patterns
Commands (add, list, delete), flags (--json, --verbose), positional args.

### click & typer
`@click.command()`, `@click.argument()`. typer: modern, type-hint based.

### Persistence
JSON file, SQLite, or database to persist state.

### Automation
`schedule` for periodic tasks, `watchdog` for file watching, `requests + BeautifulSoup` for scraping.

### Best Practice
`if __name__ == "__main__":` entry point. `setup.py` or `pyproject.toml` console_scripts.

---

## Experiments

- Build a CLI with subcommands: init, run, status
- Try click to build the same CLI
- Build a progress bar with tqdm
- Implement a config file (YAML/TOML)
- Build an automation script: backup files, send email

---

## Challenge

Build a complete CLI tool: task manager with add/list/done/delete, JSON persistence, colored output, --json flag. Package with pyproject.toml.


---

## Beginner Friendly Explanation

### Analogy: Real Terminal Cashier
- **`input()` asking 1-by-1 = interrogating cashier**: slow + unscriptable.
- **`argparse` + `subparsers` = professional cashier**: `shop add --name Rice` 1 line + automatic `--help` + `add/remove` command branches!

### Step 0 — Prepare Device
- Same as Python W1: `python --version` + project folder.

### How the Computer Reads It
- `add_argument('--name')` → `args.name`; `subparsers` splits commands `add/remove`.

### 3 Must-Know Terms
- 1. **argparse/subparsers**: buttons/command-branches

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11 of 12: **CLI & Automation** (Level: Advanced). Tooling and productivity. Next: **Capstone Project**!
