# HTML Templates

`html/template` generates HTML output that is safe against code injection.

## Basic Template

```go
package main

import (
    "html/template"
    "os"
)

type User struct {
    Name  string
    Email string
    Age   int
}

func main() {
    tmpl, _ := template.New("user").Parse(
        `<h1>{{.Name}}</h1>
         <p>Email: {{.Email}}</p>
         <p>Age: {{.Age}}</p>`)

    user := User{Name: "John", Email: "john@example.com", Age: 30}
    tmpl.Execute(os.Stdout, user)
}
```

## Context-Aware Escaping

```go
// Go automatically escapes based on context
tmpl, _ := template.New("example").Parse(`
    <div>{{.UserInput}}</div>             <!-- HTML escaped -->
    <script>var x = {{.UserInput}}</script> <!-- JS escaped -->
    <a href="/?q={{.UserInput}}">link</a>   <!-- URL escaped -->
    <style>body { content: "{{.UserInput}}" }</style> <!-- CSS escaped -->
`)

data := map[string]string{
    "UserInput": `<script>alert("xss")</script>`,
}
tmpl.Execute(os.Stdout, data)
// Output: <div>&lt;script&gt;alert("xss")&lt;/script&gt;</div>
```

## Template Files

```html
<!-- views/user.html -->
<h1>{{.Name}}</h1>
<p>Email: <a href="mailto:{{.Email}}">{{.Email}}</a></p>
{{if .Bio}}
    <p>Bio: {{.Bio}}</p>
{{else}}
    <p>No bio yet.</p>
{{end}}
```

```go
tmpl := template.Must(template.ParseFiles("views/user.html"))
tmpl.Execute(w, user)
```

## Actions Reference

```go
// Conditionals
{{if .Active}} Active {{else}} Inactive {{end}}
{{if .Admin}} Admin {{else if .Moderator}} Mod {{end}}

// Loops
{{range .Items}}
    <li>{{.Name}}</li>
{{else}}
    <li>No items</li>
{{end}}

// Variables
{{$name := .Name}}
{{$name}}

// With (scoped context)
{{with .Profile}}
    <p>{{.Bio}}</p>
{{end}}
```

## Practice

1. Create a template that renders a table from a slice
2. Use nested fields and methods in templates
3. Implement conditional rendering based on user role
4. Build a form template with CSRF token injection
