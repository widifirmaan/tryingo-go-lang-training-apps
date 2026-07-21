# Reflection Patterns

Practical applications of reflection for serialization, validation, and more.

## Struct Validation

```go
func Validate(v interface{}) error {
    t := reflect.TypeOf(v)
    val := reflect.ValueOf(v)

    if t.Kind() == reflect.Ptr {
        t = t.Elem()
        val = val.Elem()
    }

    if t.Kind() != reflect.Struct {
        return fmt.Errorf("expected struct, got %s", t.Kind())
    }

    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fieldVal := val.Field(i)

        rules := field.Tag.Get("validate")
        if rules == "" {
            continue
        }

        for _, rule := range strings.Split(rules, ",") {
            rule = strings.TrimSpace(rule)
            switch {
            case rule == "required":
                if isEmpty(fieldVal) {
                    return fmt.Errorf("%s is required", field.Name)
                }
            case strings.HasPrefix(rule, "min="):
                min, _ := strconv.Atoi(strings.TrimPrefix(rule, "min="))
                if fieldVal.Len() < min {
                    return fmt.Errorf("%s must be at least %d characters", field.Name, min)
                }
            case strings.HasPrefix(rule, "max="):
                max, _ := strconv.Atoi(strings.TrimPrefix(rule, "max="))
                if fieldVal.Len() > max {
                    return fmt.Errorf("%s must be at most %d characters", field.Name, max)
                }
            case rule == "email":
                if !strings.Contains(fieldVal.String(), "@") {
                    return fmt.Errorf("%s is not a valid email", field.Name)
                }
            }
        }
    }
    return nil
}

func isEmpty(v reflect.Value) bool {
    switch v.Kind() {
    case reflect.String, reflect.Array:
        return v.Len() == 0
    case reflect.Ptr, reflect.Interface:
        return v.IsNil()
    case reflect.Slice, reflect.Map:
        return v.IsNil() || v.Len() == 0
    default:
        return false
    }
}
```

## Struct to Map

```go
func StructToMap(v interface{}) map[string]interface{} {
    result := make(map[string]interface{})
    val := reflect.ValueOf(v)

    if val.Kind() == reflect.Ptr {
        val = val.Elem()
    }

    if val.Kind() != reflect.Struct {
        return result
    }

    t := val.Type()
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fieldVal := val.Field(i)

        // Skip unexported fields
        if !field.IsExported() {
            continue
        }

        name := field.Tag.Get("json")
        if name == "" {
            name = field.Name
        }
        if name == "-" {
            continue
        }

        result[name] = fieldVal.Interface()
    }

    return result
}
```

## Generic Equal Comparator

```go
func DeepEqual(a, b interface{}) bool {
    va := reflect.ValueOf(a)
    vb := reflect.ValueOf(b)

    if va.Type() != vb.Type() {
        return false
    }

    switch va.Kind() {
    case reflect.Struct:
        for i := 0; i < va.NumField(); i++ {
            if !DeepEqual(va.Field(i).Interface(), vb.Field(i).Interface()) {
                return false
            }
        }
        return true

    case reflect.Slice, reflect.Array:
        if va.Len() != vb.Len() {
            return false
        }
        for i := 0; i < va.Len(); i++ {
            if !DeepEqual(va.Index(i).Interface(), vb.Index(i).Interface()) {
                return false
            }
        }
        return true

    case reflect.Map:
        if va.Len() != vb.Len() {
            return false
        }
        for _, key := range va.MapKeys() {
            if !DeepEqual(va.MapIndex(key).Interface(), vb.MapIndex(key).Interface()) {
                return false
            }
        }
        return true

    default:
        return va.Interface() == vb.Interface()
    }
}
```

## Practice

1. Implement a tag-based default value setter
2. Build a struct diff tool using reflection
3. Create an automatic SQL INSERT/UPDATE generator
4. Implement a generic caching proxy with reflection
