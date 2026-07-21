# Custom JSON Encoding

## Custom MarshalJSON

```go
type Temperature float64

func (t Temperature) MarshalJSON() ([]byte, error) {
    return json.Marshal(fmt.Sprintf("%.1f°C", float64(t)))
}

func main() {
    temp := Temperature(23.5)
    data, _ := json.Marshal(temp)
    fmt.Println(string(data)) // "23.5°C"
}
```

## Custom UnmarshalJSON

```go
func (t *Temperature) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    s = strings.TrimSuffix(s, "°C")
    val, err := strconv.ParseFloat(s, 64)
    if err != nil {
        return err
    }
    *t = Temperature(val)
    return nil
}
```

## Custom Time Format

```go
type CustomTime struct {
    time.Time
}

const layout = "2006-01-02 15:04:05"

func (ct CustomTime) MarshalJSON() ([]byte, error) {
    return json.Marshal(ct.Format(layout))
}

func (ct *CustomTime) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    t, err := time.Parse(layout, s)
    if err != nil {
        return err
    }
    ct.Time = t
    return nil
}
```

## Wrapper Types for Transforms

```go
type SafeString string

func (s SafeString) MarshalJSON() ([]byte, error) {
    sanitized := strings.ReplaceAll(string(s), "<", "&lt;")
    return json.Marshal(sanitized)
}
```

## Custom Map Keys

```go
type Color struct {
    R, G, B uint8
}

func (c Color) MarshalText() ([]byte, error) {
    return []byte(fmt.Sprintf("#%02x%02x%02x", c.R, c.G, c.B)), nil
}

func (c *Color) UnmarshalText(data []byte) error {
    _, err := fmt.Sscanf(string(data), "#%02x%02x%02x", &c.R, &c.G, &c.B)
    return err
}
```

## MarshalJSON vs MarshalText

| Interface | Used By | Output |
|-----------|---------|--------|
| `json.Marshaler` | `json.Marshal` | JSON-encoded bytes |
| `encoding.TextMarshaler` | `json.Marshal`, XML, others | Text bytes |

## Exercises

1. **Hex Color**: Create a `HexColor` type that marshals/unmarshals as `"#FF00FF"`.

2. **Money Type**: Implement `type Cents int64` that marshals as `"$12.99"` and parses back.

3. **Flexible Date**: Create a `DateOnly` type that handles both `"2006-01-02"` and `"01/02/2006"` formats.

4. **Enum Validation**: Build a `Status` type with custom marshal/unmarshal that validates allowed values.
