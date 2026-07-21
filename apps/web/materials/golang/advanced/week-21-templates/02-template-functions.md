# Template Functions

Custom functions extend template capabilities beyond field access.

## FuncMap

```go
import (
    "html/template"
    "strings"
    "time"
)

func formatDate(t time.Time) string {
    return t.Format("January 2, 2006")
}

func upper(s string) string {
    return strings.ToUpper(s)
}

func lower(s string) string {
    return strings.ToLower(s)
}

func main() {
    funcs := template.FuncMap{
        "formatDate": formatDate,
        "upper":      upper,
        "lower":      lower,
        "greet":      func(name string) string { return "Hello, " + name + "!" },
    }

    tmpl := template.Must(template.New("page").Funcs(funcs).Parse(`
        <h1>{{greet .Name | upper}}</h1>
        <p>Joined: {{.JoinedAt | formatDate}}</p>
    `))
}
```

## Pipeline Chaining

```go
// Functions can be chained via pipes
// {{.Name | upper | printf "User: %s"}}

tmpl, _ := template.New("").Funcs(template.FuncMap{
    "double": func(n int) int { return n * 2 },
    "add":    func(a, b int) int { return a + b },
}).Parse(`
    {{$n := 5}}
    {{$n | double | add 10}}   <!-- Output: 20 -->
`)
```

## Practical Functions

```go
funcs := template.FuncMap{
    "safeHTML": func(s string) template.HTML {
        return template.HTML(s) // Marks string as safe HTML
    },
    "json": func(v interface{}) string {
        b, _ := json.Marshal(v)
        return string(b)
    },
    "join": strings.Join,
    "seq": func(start, end int) []int {
        var s []int
        for i := start; i <= end; i++ {
            s = append(s, i)
        }
        return s
    },
    "mod": func(i, j int) bool { return i%j == 0 },
}

// Usage in template:
// {{range seq 1 10}}
//     {{if mod . 2}} even {{else}} odd {{end}}
// {{end}}
```

## Practice

1. Write functions for pluralization ("1 item", "2 items")
2. Create a truncate function for long text
3. Build a function that renders markdown to HTML
4. Implement a sort function for template slices
