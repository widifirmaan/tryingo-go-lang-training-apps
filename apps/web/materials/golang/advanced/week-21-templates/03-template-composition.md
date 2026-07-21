# Template Composition

Building reusable template layouts and components.

## Layout Pattern

```go
// views/layout.html
<!DOCTYPE html>
<html>
<head>
    <title>{{block "title" .}}Default Title{{end}}</title>
</head>
<body>
    <header>
        <nav>Site Navigation</nav>
    </header>
    <main>
        {{template "content" .}}
    </main>
    <footer>
        <p>&copy; 2026</p>
    </footer>
</body>
</html>
```

## Defining Templates

```go
// views/home.html
{{define "title"}}Home Page{{end}}

{{define "content"}}
    <h1>Welcome, {{.Name}}</h1>
    <p>This is the home page content.</p>
{{end}}
```

## Rendering Composed Templates

```go
func render(w http.ResponseWriter, name string, data interface{}) {
    tmpl := template.Must(template.ParseFiles(
        "views/layout.html",
        "views/"+name+".html",
    ))
    tmpl.ExecuteTemplate(w, "layout", data)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    render(w, "home", map[string]string{"Name": "John"})
}
```

## Template Blocks (Go 1.6+)

```go
{{define "layout"}}
    <html>
    <body>
        {{block "sidebar" .}}
            <aside>Default sidebar</aside>
        {{end}}
        {{block "content" .}}
            <main>Default content</main>
        {{end}}
    </body>
    </html>
{{end}}

{{define "sidebar"}}
    <aside>Custom sidebar for this page</aside>
{{end}}
```

## Component Pattern

```go
{{define "pagination"}}
    {{if gt .TotalPages 1}}
    <div class="pagination">
        {{if gt .CurrentPage 1}}
            <a href="?page={{sub .CurrentPage 1}}">Previous</a>
        {{end}}
        <span>Page {{.CurrentPage}} of {{.TotalPages}}</span>
        {{if lt .CurrentPage .TotalPages}}
            <a href="?page={{add .CurrentPage 1}}">Next</a>
        {{end}}
    </div>
    {{end}}
{{end}}

{{define "post-card"}}
    <article class="post-card">
        <h2><a href="/posts/{{.ID}}">{{.Title}}</a></h2>
        <p class="meta">By {{.Author}} on {{.Date | formatDate}}</p>
        <p>{{.Excerpt}}</p>
    </article>
{{end}}

{{/* Usage */}}
{{range .Posts}}
    {{template "post-card" .}}
{{end}}
{{template "pagination" .}}
```

## Practice

1. Build a three-tier layout (header, content, footer)
2. Create reusable card and list components
3. Implement a sidebar that can be overridden per page
4. Build a template that includes other templates dynamically
