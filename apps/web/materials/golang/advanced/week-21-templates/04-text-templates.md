# Text Templates

`text/template` generates plain text output for code generation, configuration files, and reports.

## Basic Text Template

```go
import (
    "os"
    "text/template"
)

func main() {
    tmpl := `Name: {{.Name}}
Email: {{.Email}}
Joined: {{.JoinedAt.Format "2006-01-02"}}
{{if .Active}}Status: Active{{end}}`

    t := template.Must(template.New("user").Parse(tmpl))
    t.Execute(os.Stdout, user)
}
```

## Code Generation

```go
const structTmpl = `
package models

// {{.Name}} represents a {{.Name}} entity
type {{.Name}} struct {
{{range .Fields}}    {{.Name}} {{.Type}} ` + "`json:\"{{.Tag}}\"`" + `
{{end}}}

func ({{.ShortName}} *{{.Name}}) TableName() string {
    return "{{.TableName}}"
}
`

type Field struct {
    Name string
    Type string
    Tag  string
}

type ModelDef struct {
    Name      string
    ShortName string
    TableName string
    Fields    []Field
}

func generateModel(def ModelDef) (string, error) {
    tmpl := template.Must(template.New("model").Parse(structTmpl))
    var buf bytes.Buffer
    if err := tmpl.Execute(&buf, def); err != nil {
        return "", err
    }
    return buf.String(), nil
}
```

## Config File Generation

```go
const nginxConfig = `
server {
    listen 80;
    server_name {{.Domain}};
    root /var/www/{{.Domain}};

    location / {
        proxy_pass http://localhost:{{.Port}};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        expires {{.StaticCacheDuration}};
    }
}
`

type NginxConfig struct {
    Domain              string
    Port                int
    StaticCacheDuration string
}
```

## Report Generation

```go
const report = `Report: {{.Title}}
Date: {{.GeneratedAt.Format "2006-01-02 15:04"}}
{{"=" .TitleLen "="}}

{{range .Sections}}
{{.Header}}
{{"-" .HeaderLen "-"}}
{{.Content}}

{{end}}

Summary:
{{.Summary}}
`

func generateReport(r Report) string {
    funcs := template.FuncMap{
        "=": func(n int) string { return strings.Repeat("=", n) },
        "-": func(n int) string { return strings.Repeat("-", n) },
    }
    tmpl := template.Must(template.New("report").Funcs(funcs).Parse(report))
    var buf bytes.Buffer
    tmpl.Execute(&buf, r)
    return buf.String()
}
```

## Practice

1. Generate Go source code from a template (e.g., repository pattern)
2. Create a Dockerfile generator
3. Build a CSV export template
4. Generate SQL migration files from a template
