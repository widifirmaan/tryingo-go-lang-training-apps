# Other Encoding Formats

## XML

```go
import "encoding/xml"

type Person struct {
    XMLName xml.Name `xml:"person"`
    Name    string   `xml:"name"`
    Age     int      `xml:"age"`
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    data, _ := xml.MarshalIndent(p, "", "  ")
    fmt.Println(string(data))
}
```

## CSV

```go
import "encoding/csv"

func writeCSV(w io.Writer, records [][]string) error {
    writer := csv.NewWriter(w)
    defer writer.Flush()

    writer.Write([]string{"Name", "Age", "Email"})
    for _, record := range records {
        writer.Write(record)
    }
    return writer.Error()
}

func readCSV(r io.Reader) ([][]string, error) {
    reader := csv.NewReader(r)
    reader.FieldsPerRecord = -1 // variable columns
    return reader.ReadAll()
}
```

## Custom Text Encoding

```go
import "encoding"

type Person struct {
    Name string
    Age  int
}

func (p Person) MarshalText() ([]byte, error) {
    return []byte(fmt.Sprintf("%s,%d", p.Name, p.Age)), nil
}

func (p *Person) UnmarshalText(data []byte) error {
    parts := strings.Split(string(data), ",")
    if len(parts) != 2 {
        return fmt.Errorf("invalid format: %s", data)
    }
    p.Name = parts[0]
    p.Age, _ = strconv.Atoi(parts[1])
    return nil
}
```

## GOB (Go Binary)

```go
import "encoding/gob"

func saveToGOB(path string, data any) error {
    file, _ := os.Create(path)
    defer file.Close()
    return gob.NewEncoder(file).Encode(data)
}

func loadFromGOB(path string, data any) error {
    file, _ := os.Open(path)
    defer file.Close()
    return gob.NewDecoder(file).Decode(data)
}
```

## Format Comparison

| Format | Package | Readable | Size | Speed | Use Case |
|--------|---------|----------|------|-------|----------|
| JSON | `encoding/json` | Yes | Medium | Fast | Web APIs |
| XML | `encoding/xml` | Yes | Large | Slow | Legacy systems |
| CSV | `encoding/csv` | Yes | Small | Fast | Spreadsheets |
| GOB | `encoding/gob` | No | Small | Fast | Go internal |
| YAML | External (gopkg.in/yaml.v3) | Yes | Medium | Medium | Config files |

## Using YAML (External Package)

```go
import "gopkg.in/yaml.v3"

type Config struct {
    Server struct {
        Port int    `yaml:"port"`
        Host string `yaml:"host"`
    } `yaml:"server"`
}

data, _ := yaml.Marshal(config)
yaml.Unmarshal(yamlData, &config)
```

## Exercises

1. **CSV to JSON**: Read a CSV file and convert each row to a JSON object.

2. **Config Converter**: Write a tool that converts between JSON and YAML config files.

3. **XML RSS Parser**: Parse an RSS XML feed into Go structs.

4. **Multi-Format Export**: Build a report generator that can output the same data as JSON, XML, or CSV.
