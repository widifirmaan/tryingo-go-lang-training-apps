# How the Internet Works

## Client-Server Model

The web uses a client-server architecture. Your browser (client) requests files from a remote computer (server), and the server sends back the response.

```html
<!-- Browser request flow (conceptual) -->
<!-- 1. You type a URL -->
<!-- 2. Browser asks DNS: "Where is this website?" -->
<!-- 3. DNS replies with the server's IP address -->
<!-- 4. Browser sends HTTP request to that IP -->
<!-- 5. Server responds with HTML, CSS, JS -->
```

## What is DNS?

The Domain Name System (DNS) translates human-readable domain names (like `tryngo.dev`) into IP addresses (like `192.0.2.1`) that computers use to identify each other.

```html
<!-- Without DNS you'd need to remember numbers -->
<!-- Instead of: https://tryngo.dev -->
<!-- You'd type: https://192.0.2.1 -->

<!-- DNS lookup steps -->
<!-- 1. Browser checks local cache -->
<!-- 2. Asks your ISP's DNS resolver -->
<!-- 3. Resolver queries root, TLD, and authoritative servers -->
<!-- 4. IP address returned to browser -->
```

## HTTP and HTTPS

HTTP (HyperText Transfer Protocol) is the protocol browsers and servers use to communicate. HTTPS adds encryption via SSL/TLS.

```html
<!-- HTTP Request structure -->
<!-- GET /index.html HTTP/1.1 -->
<!-- Host: tryngo.dev -->
<!-- User-Agent: Mozilla/5.0 -->

<!-- HTTP Response structure -->
<!-- HTTP/1.1 200 OK -->
<!-- Content-Type: text/html -->
<!-- 
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello!</h1>
  </body>
</html>
-->
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Request succeeded |
| 301 | Moved Permanently | Page has a new URL |
| 404 | Not Found | Page doesn't exist |
| 500 | Internal Server Error | Server crashed |

## What is HTML?

HTML (HyperText Markup Language) is the language used to structure content on the web. The server sends HTML to the browser, which renders it visually.

```html
<!-- Minimal HTML document the server sends -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This HTML was sent by a server and rendered by your browser.</p>
</body>
</html>
```

## How a Page Loads

1. Browser parses the HTML
2. Discovers external resources (images, CSS, JS)
3. Requests each resource separately
4. Renders the page progressively

```html
<!-- The browser loads resources referenced in HTML -->
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css" /> <!-- Browser fetches this too -->
</head>
<body>
    <img src="photo.jpg" alt="Photo" />       <!-- And this -->
    <script src="app.js"></script>             <!-- And this -->
</body>
</html>
```

## Practice

Write a brief explanation of what happens when you visit `https://tryngo.dev`:

1. What does the browser do first?
2. What protocol is used?
3. What kind of file does the server respond with?
4. Create a simple HTML page that could be the response.
