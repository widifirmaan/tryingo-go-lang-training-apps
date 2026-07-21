# Introduction to HTML

## What is HTML?
HTML (HyperText Markup Language) is the standard language for creating web pages. It describes the structure of a web page semantically.

## HTML Tags and Elements

### Basic Syntax
```html
<tagname>Content goes here...</tagname>
```

Most HTML elements have:
- An **opening tag**: `<tagname>`
- **Content**: Text or other elements
- A **closing tag**: `</tagname>`

### Self-Closing Tags
Some tags don't have content:
```html
<br />     <!-- Line break -->
<hr />     <!-- Horizontal rule -->
<img />    <!-- Image -->
<input />  <!-- Input field -->
<meta />   <!-- Metadata -->
```

## HTML Attributes

Attributes provide additional information about elements:

```html
<!-- href attribute for links -->
<a href="https://example.com">Visit Example</a>

<!-- src and alt attributes for images -->
<img src="photo.jpg" alt="A beautiful photo" />

<!-- class and id for styling/scripting -->
<div class="container" id="main-content">...</div>

<!-- style for inline CSS -->
<p style="color: blue;">Blue text</p>
```

## Common HTML Tags

### Document Structure
```html
<!DOCTYPE html>       <!-- Tells browser it's HTML5 -->
<html>                <!-- Root element -->
<head>                <!-- Metadata, title, links -->
<body>                <!-- Visible content -->
```

### Text Content
```html
<h1>Heading 1</h1>    <!-- Main heading -->
<h2>Heading 2</h2>    <!-- Subheading -->
<h3>Heading 3</h3>    <!-- Sub-subheading -->
<p>Paragraph text</p> <!-- Paragraph -->
```

### Lists
```html
<!-- Unordered list -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Ordered list -->
<ol>
    <li>First step</li>
    <li>Second step</li>
</ol>
```

### Links and Images
```html
<a href="url">Link Text</a>
<img src="image.jpg" alt="description" />
```

## Nesting Elements

HTML elements can be nested inside each other:

```html
<div>
    <h1>Welcome</h1>
    <p>This is a <strong>very important</strong> message.</p>
    <ul>
        <li>Item <em>one</em></li>
        <li>Item two</li>
    </ul>
</div>
```

**Rules for nesting:**
- Close tags in reverse order: `<div><p>Text</p></div>` ✅
- Never overlap: `<div><p>Text</div></p>` ❌
- Block elements can contain inline elements
- Inline elements should not contain block elements

## Block vs Inline Elements

### Block Elements
- Start on a new line
- Take up full width available
- Examples: `<div>`, `<p>`, `<h1>`, `<ul>`, `<table>`

### Inline Elements
- Don't start on a new line
- Take up only as much width as needed
- Examples: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`

## HTML Comments

```html
<!-- This is a comment -->
<!-- 
    Multi-line
    comment
-->
```

## Practice
Create a simple HTML structure:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
    <ul>
        <li>HTML is fun</li>
        <li>I want to learn more</li>
    </ul>
    <a href="https://tryngo.dev">Visit Tryngo</a>
</body>
</html>
```
