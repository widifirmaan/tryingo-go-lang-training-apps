# Semantic HTML Structure for the Project

This page guides you through writing the semantic HTML for your project using all the elements from Weeks 2-5.

## Page Template

Use this template as the starting point for every page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Your project description">
  <meta name="author" content="Your Name">

  <!-- Open Graph -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com">

  <title>Page Title | Site Name</title>

  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" href="images/favicon.ico" type="image/x-icon">
</head>
<body>
  <header>
    <nav>
      <!-- logo and navigation links -->
    </nav>
  </header>

  <main>
    <!-- page-specific content -->
  </main>

  <footer>
    <!-- footer content -->
  </footer>
</body>
</html>
```

## Navigation

```html
<header>
  <nav>
    <a href="index.html" class="logo">
      <img src="images/logo.svg" alt="Site Logo" width="40" height="40">
      <span>Site Name</span>
    </a>

    <ul class="nav-links">
      <li><a href="index.html" class="active">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
</header>
```

## Home Page (index.html)

```html
<main>
  <!-- Hero Section -->
  <section id="hero">
    <h1>Welcome to My Portfolio</h1>
    <p>I build accessible, responsive websites with HTML5 and CSS.</p>
    <a href="projects.html" class="btn">View My Work</a>
  </section>

  <!-- Featured Projects -->
  <section id="featured">
    <h2>Featured Projects</h2>

    <div class="project-grid">
      <article class="card">
        <img src="images/project1.jpg" alt="Screenshot of Project One" loading="lazy">
        <h3>Project One</h3>
        <p>A brief description of the project and technologies used.</p>
        <a href="projects.html">Learn more</a>
      </article>

      <article class="card">
        <img src="images/project2.jpg" alt="Screenshot of Project Two" loading="lazy">
        <h3>Project Two</h3>
        <p>A brief description of the project and technologies used.</p>
        <a href="projects.html">Learn more</a>
      </article>
    </div>
  </section>

  <!-- Skills -->
  <section id="skills">
    <h2>Skills</h2>
    <dl>
      <dt>HTML5</dt>
      <dd>Semantic markup, accessibility, forms, tables</dd>
      <dt>CSS3</dt>
      <dd>Flexbox, Grid, animations, responsive design</dd>
      <dt>JavaScript</dt>
      <dd>DOM manipulation, ES6+, async programming</dd>
    </dl>
  </section>
</main>
```

## About Page

```html
<main>
  <section>
    <h1>About Me</h1>

    <figure>
      <img
        src="images/profile.jpg"
        alt="Photo of [Your Name]"
        width="300"
        height="300"
        loading="lazy"
      >
      <figcaption>[Your Name] — Web Developer</figcaption>
    </figure>

    <article>
      <h2>Background</h2>
      <p>Write your background story here...</p>

      <blockquote cite="https://example.com">
        <p>"The web is for everyone, and building for everyone is our responsibility."</p>
      </blockquote>

      <h2>Experience</h2>

      <table>
        <caption>Work Experience</caption>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Role</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-2026</td>
            <td>Frontend Developer</td>
            <td>Tech Co.</td>
          </tr>
          <tr>
            <td>2023-2024</td>
            <td>Junior Developer</td>
            <td>Startup Inc.</td>
          </tr>
        </tbody>
      </table>
    </article>

    <aside>
      <h3>Fun Facts</h3>
      <ul>
        <li>Learned HTML5 in 2026</li>
        <li>Built 10+ projects</li>
      </ul>
    </aside>
  </section>
</main>
```

## Contact Page

```html
<main>
  <section>
    <h1>Get In Touch</h1>
    <p>Fill out the form below and I'll get back to you within 24 hours.</p>

    <form action="/submit" method="post">
      <fieldset>
        <legend>Your Information</legend>

        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" required minlength="2">

        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>

        <label for="phone">Phone (optional)</label>
        <input type="tel" id="phone" name="phone">
      </fieldset>

      <fieldset>
        <legend>Message</legend>

        <label for="subject">Subject</label>
        <select id="subject" name="subject">
          <option value="">Select a subject</option>
          <option value="project">Project Inquiry</option>
          <option value="collaboration">Collaboration</option>
          <option value="other">Other</option>
        </select>

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="6" required></textarea>
      </fieldset>

      <fieldset>
        <legend>Preferences</legend>

        <label>
          <input type="checkbox" name="newsletter" value="yes">
          Subscribe to newsletter
        </label>

        <label>
          <input type="radio" name="priority" value="standard" checked>
          Standard reply
        </label>
        <label>
          <input type="radio" name="priority" value="urgent">
          Urgent (within 12 hours)
        </label>

        <label for="reply-by">Reply by</label>
        <input type="date" id="reply-by" name="reply_by">
      </fieldset>

      <input type="hidden" name="form_id" value="contact_form">
      <button type="submit">Send Message</button>
    </form>
  </section>
</main>
```

## Footer

```html
<footer>
  <p>&copy; 2026 Your Name. All rights reserved.</p>

  <address>
    <a href="mailto:hello@example.com">hello@example.com</a>
    <a href="tel:+1234567890">+1 (234) 567-890</a>
  </address>

  <nav aria-label="Social links">
    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
  </nav>
</footer>
```

## Practice

1. Write the complete HTML for your chosen project
2. Ensure every page has the `<head>` section with meta tags and OG tags
3. Include a table (schedule, pricing, or comparison)
4. Include a form with at least 5 different input types and proper `<fieldset>` grouping
5. Validate all HTML with the W3C validator
