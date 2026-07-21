# Quotations, Citations & Inline Text Tags

## `<blockquote>` — Block-Level Quotation

Used for longer quotations that should be displayed as a separate block.

```html
<blockquote cite="https://example.com/source">
  <p>The web is not a platform for documents, but a platform for applications.</p>
  <footer>— Someone, <cite>Important Speech</cite></footer>
</blockquote>
```

| Attribute | Purpose |
|-----------|---------|
| `cite` | URL of the source document |

## `<q>` — Inline Quotation

For short, inline quotations. Browsers automatically add quotation marks.

```html
<p>As Shakespeare wrote, <q>To be or not to be</q>.</p>
```

## `<cite>` — Citation

Represents the title of a creative work (book, article, film, etc.).

```html
<p>For more details, see <cite>HTML5: The Definitive Guide</cite>.</p>
```

## `<abbr>` — Abbreviation

Provides an expansion for abbreviations and acronyms.

```html
<p><abbr title="HyperText Markup Language">HTML</abbr> is the foundation of the web.</p>
<p>The <abbr title="World Health Organization">WHO</abbr> issued new guidelines.</p>
```

## `<address>` — Contact Information

Represents contact information for the author/owner of the document.

```html
<address>
  Written by Jane Doe<br>
  Email: <a href="mailto:jane@example.com">jane@example.com</a><br>
  Twitter: <a href="https://twitter.com/janedoe">@janedoe</a>
</address>
```

## Inline Text Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `<strong>` | Strong importance (bold) | `<strong>Warning:</strong> Do not touch` |
| `<em>` | Emphasized text (italic) | `I <em>really</em> mean it` |
| `<mark>` | Highlighted text | `<mark>Important</mark> deadline` |
| `<small>` | Fine print, disclaimers | `<small>Terms apply</small>` |
| `<ins>` | Inserted text (underline) | `Price: <ins>$9.99</ins>` |
| `<del>` | Deleted text (strikethrough) | `Was <del>$19.99</del>` |
| `<sub>` | Subscript | `H<sub>2</sub>O` |
| `<sup>` | Superscript | `E = mc<sup>2</sup>` |

### Combined Example

```html
<p>
  <strong>IMPORTANT NOTICE:</strong>
  The <em>final</em> deadline is <mark>July 31, 2026</mark>.
  <small>Late submissions will not be accepted.</small>
</p>

<p>
  Original price: <del>$49.99</del>
  <ins>Now $29.99</ins>
</p>

<p>
  Water: H<sub>2</sub>O &nbsp; | &nbsp; Area: 25m<sup>2</sup>
</p>
```

## All Elements Example

```html
<article>
  <h1>Review: A Great Book</h1>

  <p>
    In <cite>The Art of Learning</cite>, the author writes:
  </p>

  <blockquote cite="https://example.com/book">
    <p>Mistakes are not just learning opportunities — they are the only way
    to truly understand something deeply.</p>
  </blockquote>

  <p>
    This idea <em>strongly</em> resonates with me. The <abbr title="Professor">
    Prof.</abbr> argues that we should <mark>embrace failure</mark> as part of
    the process. I <strong>highly recommend</strong> this book to anyone learning
    a new skill.
  </p>

  <p>
    Last updated: <time datetime="2026-07-20">July 20, 2026</time>
    <small>(v2.1)</small>
  </p>

  <address>
    Review by Alex, <a href="mailto:alex@example.com">alex@example.com</a>
  </address>
</article>
```

## Practice

1. Write a blog post excerpt that uses `<blockquote>`, `<q>`, and `<cite>`
2. Add an `<address>` with email and social links
3. Create a pricing table row using `<ins>`, `<del>`, and `<small>`
4. Use `<abbr>` for at least 3 abbreviations
5. Write chemical formulas with `<sub>` and mathematical expressions with `<sup>`
