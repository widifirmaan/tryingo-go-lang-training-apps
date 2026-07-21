# Week 21: Templates

Go's `html/template` and `text/template` packages provide a powerful template engine for generating dynamic content. Understanding templates is essential for server-side rendering, code generation, and text processing.

## Topics

- HTML templates with context-aware escaping
- Template functions and pipelines
- Template composition and inheritance
- Text templates for code generation

## Goals

- Render HTML templates safely (XSS protection)
- Create and use custom template functions
- Build reusable template layouts
- Generate text output (code, configs, reports)

## Key Concepts

| Concept | Description |
|---------|-------------|
| Template | Parsed template definition |
| Action | `{{ }}` delimiters with directives |
| Pipeline | Chain of values and functions `{{ .Name \| upper }}` |
| Context | Auto-escaping based on context (HTML, JS, CSS, URL) |
| Composition | Nested templates with `template` action |

## Practice Exercises

1. Render a user profile page using HTML templates
2. Create a custom function that formats dates
3. Build a layout system with header/footer/sidebar
4. Generate a markdown report using text/template
