# IDE & Editor Configuration

## Overview

Go has strong support across multiple editors. This guide covers the most popular setups: Visual Studio Code and GoLand.

## Visual Studio Code

### Installation

1. Download VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Install and launch the editor

### Installing the Go Extension

1. Open the Extensions panel (`Ctrl+Shift+X`)
2. Search for "Go" by the Go team at Google
3. Click **Install**

### Setting Up the Go Tools

After installing the extension, open any `.go` file. VS Code will prompt you to install the Go tools:

- `gopls` — the Go language server (completions, navigation, refactoring)
- `dlv` — debugger
- `staticcheck` — linter
- `goimports` — automatic import formatting

Click "Install All" when prompted, or manually run:

```bash
go install golang.org/x/tools/gopls@latest
go install github.com/go-delve/delve/cmd/dlv@latest
go install honnef.co/go/tools/cmd/staticcheck@latest
go install golang.org/x/tools/cmd/goimports@latest
```

### Useful Extensions

| Extension | Purpose |
|-----------|---------|
| Go (official) | Language support, `gopls`, debugging |
| Error Lens | Inline error highlighting |
| GitLens | Git blame and history |
| Material Icon Theme | Improved file icons |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+\`` | Toggle terminal |
| `F5` | Start debugging |
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+Shift+B` | Run build task |
| `Ctrl+` (click) | Go to definition |
| `Alt+Shift+F` | Format code |
| `Ctrl+Shift+I` | Organize imports |

### Debugging with VS Code

1. Open your Go file
2. Set a breakpoint by clicking the gutter (left of line numbers)
3. Press `F5` and select "Go" environment
4. VS Code creates a `launch.json` automatically

The debugger lets you:
- Step through code (`F10` step over, `F11` step into)
- Inspect variables in the left panel
- Watch expressions
- View the call stack

## GoLand

GoLand is JetBrains' dedicated Go IDE.

1. Download from [https://www.jetbrains.com/go/](https://www.jetbrains.com/go/)
2. Launch and open or create a Go project
3. GoLand automatically detects Go SDK and `gopls`

### Key Features

- Built-in debugger with visual UI
- Refactoring tools (rename, extract, inline)
- Code generation (getters, constructors, tests)
- Test runner with coverage
- Database tools and HTTP client

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+F10` | Run current file |
| `Shift+F10` | Run last configuration |
| `Ctrl+F8` | Toggle breakpoint |
| `Shift+F9` | Debug |
| `Ctrl+Alt+L` | Format code |
| `Ctrl+Shift+I` | Quick definition |
| `Alt+F7` | Find usages |

## Other Editors

| Editor | Setup |
|--------|-------|
| Neovim / Vim | `vim-go` plugin or `gopls` via LSP client |
| Emacs | `go-mode` + `lsp-mode` |
| Sublime Text | `GoSublime` package |
| IntelliJ IDEA | Go plugin (lite alternative to GoLand) |

## Checklist

After setup, verify everything works:

```bash
# Check gopls is installed
gopls version

# Check debugger
dlv version

# Try formatting
go fmt ./...

# Try linting
staticcheck ./...
```

## Practice

1. Install VS Code (or your preferred editor) and the Go extension
2. Open any Go file and verify that `gopls` provides autocompletion
3. Set a breakpoint and run the debugger with `F5`
4. Install `staticcheck` and run it on your project
5. Configure the format-on-save setting in VS Code (search `editor.formatOnSave` in settings)
