# Headings (h1-h6)

HTML provides six levels of headings, from `<h1>` (most important) to `<h6>` (least important).

```html
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Sub-section Title</h3>
<h4>Sub-sub-section</h4>
<h5>Minor heading</h5>
<h6>Lowest level</h6>
```

## Heading Hierarchy

Headings create a document outline. Search engines and assistive technologies rely on this structure.

### Correct Hierarchy

```html
<h1>My Recipe Book</h1>
  <h2>Appetizers</h2>
    <h3>Bruschetta</h3>
    <h3>Spring Rolls</h3>
  <h2>Main Courses</h2>
    <h3>Pasta</h3>
    <h3>Grilled Salmon</h3>
  <h2>Desserts</h2>
```

### Common Mistakes

| Mistake | Example | Why It's Wrong |
|---------|---------|----------------|
| Skipping levels | `h1` → `h3` | Breaks document outline |
| Multiple h1 | Two `<h1>` on one page | Dilutes SEO value |
| Headings for styling | `<h3>` because it looks small | Use CSS instead |
| Empty headings | `<h2></h2>` | Confuses screen readers |

## SEO Impact

| Heading | SEO Significance |
|---------|------------------|
| `h1` | Most important — should contain primary keyword |
| `h2` | Major section topics |
| `h3`-`h6` | Decreasing importance, used for subsections |

### Best Practices

1. Use exactly one `<h1>` per page
2. Do not skip heading levels (h1 → h2 → h3, not h1 → h3)
3. Keep headings descriptive and concise
4. Use headings to create a logical outline

```html
<!-- Recommended -->
<h1>Complete Guide to HTML5</h1>
  <h2>Getting Started</h2>
    <h3>Setting Up Your Editor</h3>
    <h3>Your First HTML File</h3>
  <h2>Core Concepts</h2>
    <h3>Elements and Tags</h3>
    <h3>Attributes</h3>

<!-- Avoid -->
<h1>Complete Guide to HTML5</h1>
  <h3>Getting Started</h3> <!-- skipped h2 -->
    <h4>Setting Up Your Editor</h4>
```

## Practice

1. Write the HTML outline for a personal portfolio page with at least 3 levels of headings
2. Check your outline using the W3C HTML Validator or browser DevTools
3. Refactor a page that uses headings purely for font size, replacing styles with CSS
