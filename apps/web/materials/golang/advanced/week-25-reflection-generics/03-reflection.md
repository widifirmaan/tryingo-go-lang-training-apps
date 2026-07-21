# Reflection

Reflection allows inspecting and manipulating types and values at runtime.

## reflect.Type and reflect.Value

```go
import "reflect"

func inspect(v interface{}) {
    t := reflect.TypeOf(v)
    val := reflect.ValueOf(v)

    fmt.Printf("Type: %v\n", t)
    fmt.Printf("Kind: %v\n", t.Kind())
    fmt.Printf("Value: %v\n", val)
    fmt.Printf("Interface: %v\n", val.Interface())
}
```

## Inspecting Structs

```go
type User struct {
    Name  string `json:"name" validate:"required"`
    Email string `json:"email" validate:"required,email"`
    Age   int    `json:"age" validate:"gte=0,lte=150"`
}

func inspectStruct(v interface{}) {
    t := reflect.TypeOf(v)
    if t.Kind() == reflect.Ptr {
        t = t.Elem()
    }

    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fmt.Printf("Field: %s\n", field.Name)
        fmt.Printf("  Type: %v\n", field.Type)
        fmt.Printf("  Tag: %v\n", field.Tag)
        fmt.Printf("  JSON: %v\n", field.Tag.Get("json"))
        fmt.Printf("  Validate: %v\n", field.Tag.Get("validate"))
    }
}
```

## Setting Values

```go
func setField(obj interface{}, fieldName string, value interface{}) {
    v := reflect.ValueOf(obj)
    if v.Kind() == reflect.Ptr && !v.Elem().CanSet() {
        return
    }
    v = v.Elem()

    field := v.FieldByName(fieldName)
    if !field.IsValid() {
        return
    }

    if !field.CanSet() {
        return
    }

    val := reflect.ValueOf(value)
    if field.Type() != val.Type() {
        return
    }

    field.Set(val)
}

func main() {
    u := &User{}
    setField(u, "Name", "John")
    setField(u, "Age", 30)
    fmt.Printf("%+v\n", u) // &{Name:John Email: Age:30}
}
```

## Making Slices

```go
func makeSliceOf[T any](items ...interface{}) []T {
    result := make([]T, len(items))
    for i, item := range items {
        v := reflect.ValueOf(item)
        result[i] = v.Interface().(T)
    }
    return result
}

// Alternative with pure reflection
func makeSlice(items interface{}) interface{} {
    v := reflect.ValueOf(items)
    if v.Kind() != reflect.Slice {
        return nil
    }

    elemType := v.Type().Elem()
    newSlice := reflect.MakeSlice(reflect.SliceOf(elemType), v.Len(), v.Len())

    for i := 0; i < v.Len(); i++ {
        newSlice.Index(i).Set(v.Index(i))
    }

    return newSlice.Interface()
}
```

## Practice

1. Print all methods of a type using reflection
2. Implement a function that deep-copies a struct
3. Use reflection to check interface implementation
4. Build a generic struct-to-map converter
