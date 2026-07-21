# Lists

HTML provides three types of lists: unordered, ordered, and description lists.

## Unordered Lists (`<ul>`)

For items that do not have a specific sequence.

```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Cherries</li>
</ul>
```

Rendered as:
- Apples
- Bananas
- Cherries

### Changing Bullet Styles with CSS

```css
ul {
  list-style-type: square; /* disc, circle, square, none */
}
```

## Ordered Lists (`<ol>`)

For items that follow a sequence or priority.

```html
<ol>
  <li>Preheat oven to 350°F</li>
  <li>Mix dry ingredients</li>
  <li>Add wet ingredients</li>
  <li>Bake for 30 minutes</li>
</ol>
```

Ordered list attributes:

| Attribute | Values | Effect |
|-----------|--------|--------|
| `type` | `1`, `A`, `a`, `I`, `i` | Numbering style |
| `start` | Number | Starting value |
| `reversed` | (boolean) | Descending order |

```html
<ol type="I" start="5">
  <li>Fifth</li>
  <li>Sixth</li>
  <li>Seventh</li>
</ol>
```

## Nested Lists

Lists can contain other lists to create hierarchies.

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apples</li>
      <li>Bananas</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrots</li>
      <li>Broccoli</li>
    </ul>
  </li>
</ul>
```

```html
<ol>
  <li>Chapter 1: Introduction
    <ol>
      <li>Welcome</li>
      <li>Prerequisites</li>
    </ol>
  </li>
  <li>Chapter 2: Getting Started
    <ol>
      <li>Installation</li>
      <li>Configuration</li>
    </ol>
  </li>
</ol>
```

## Description Lists (`<dl>`, `<dt>`, `<dd>`)

For name-value groups such as terms and definitions, metadata, or FAQs.

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — the standard language for creating web pages.</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets — used for styling HTML elements.</dd>

  <dt>JavaScript</dt>
  <dd>A programming language that enables interactive web pages.</dd>
</dl>
```

### Multiple descriptions for a single term

```html
<dl>
  <dt>Brush</dt>
  <dd>A tool for painting</dd>
  <dd>Dense undergrowth in a forest</dd>
  <dd>To clean or groom</dd>
</dl>
```

## List Comparison

| Feature | `<ul>` | `<ol>` | `<dl>` |
|---------|--------|--------|--------|
| Order matters | No | Yes | N/A |
| Default marker | Bullet | Number | None |
| Items | `<li>` | `<li>` | `<dt>` + `<dd>` |
| Use case | Shopping list | Instructions | Glossary |

## Practice

1. Create a nested unordered list showing a site navigation with categories and subcategories
2. Write a top 10 list using `<ol>` with a `start` attribute
3. Build a description list of 5 programming terms with definitions
4. Combine all three list types in a single HTML document
