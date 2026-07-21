# Your First Webpage

## Creating a Complete HTML Page

Let's create a complete HTML document from scratch.

## The Minimal HTML Document

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
</body>
</html>
```

### Breaking It Down

**Line 1: DOCTYPE**
```html
<!DOCTYPE html>
```
Tells the browser this is an HTML5 document. Always the first line.

**Line 2: html element**
```html
<html lang="en">
```
The root element. The `lang` attribute specifies the language.

**Lines 4-7: head element**
```html
<head>
    <meta charset="UTF-8">      <!-- Character encoding -->
    <meta name="viewport"...>   <!-- Mobile responsiveness -->
    <title>My First Page</title> <!-- Browser tab title -->
</head>
```

**Lines 9-12: body element**
```html
<body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
</body>
```

## Your First Enhanced Page

Create a file called `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="My personal introduction page" />
    <meta name="author" content="Your Name" />
    <title>About Me</title>
</head>
<body>
    <h1>Hi, I'm [Your Name]</h1>
    <p>Welcome to my personal webpage!</p>
    
    <h2>About Me</h2>
    <p>I'm learning HTML5 and web development with Tryngo.</p>
    
    <h2>My Hobbies</h2>
    <ul>
        <li>Coding</li>
        <li>Reading</li>
        <li>Gaming</li>
    </ul>
    
    <h2>Contact</h2>
    <p>
        Find me on 
        <a href="https://github.com/yourusername">GitHub</a>
    </p>
    
    <p>&copy; 2026 Your Name</p>
</body>
</html>
```

## How to View Your Page

1. Save the file as `index.html`
2. Open it in a web browser (File → Open, or drag into browser)
3. Make changes, save, and refresh the browser

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Page not updating | Refresh browser (Ctrl+F5 for hard refresh) |
| Chinese characters | Add `<meta charset="UTF-8">` |
| Content not centered | Add CSS later, HTML only structures content |
| Images not showing | Check file path is correct |

## Validating Your HTML

Use the W3C validator: https://validator.w3.org/

```html
<!-- Invalid HTML -->
<img src="photo.jpg">  <!-- Missing alt attribute -->

<!-- Valid HTML -->
<img src="photo.jpg" alt="Description of photo" />
```

## Exercise

Create a webpage about your favorite subject (movie, book, game):
1. Include a heading with the title
2. Add paragraphs describing it
3. Include a list of key features
4. Add a link to more information
5. Validate your HTML
