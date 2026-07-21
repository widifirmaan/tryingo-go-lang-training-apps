# Time Formatting & Parsing

## The Reference Time
Go uses a specific reference time for formatting: `Mon Jan 2 15:04:05 MST 2006` which is `01/02 03:04:05 PM '06 -0700`.

```
Month:   1, 01, Jan, January
Day:     2, 02
Hour:    3, 03, 15
Minute:  4, 04
Second:  5, 05
Year:    6, 06, 2006
Weekday: Mon, Monday
Zone:    MST, -0700, -07:00
```

## Formatting

```go
t := time.Now()

fmt.Println(t.Format("2006-01-02"))
// 2026-07-21

fmt.Println(t.Format("Monday, January 2, 2006"))
// Tuesday, July 21, 2026

fmt.Println(t.Format("15:04:05"))
// 15:04:05

fmt.Println(t.Format(time.RFC3339))
// 2026-07-21T15:04:05Z
```

## Parsing

```go
// Must match the reference time layout
t, err := time.Parse("2006-01-02", "2026-07-21")
if err != nil {
    log.Fatal(err)
}
fmt.Println(t) // 2026-07-21 00:00:00 +0000 UTC
```

## Parsing with Time Zone

```go
t, _ = time.Parse("2006-01-02 15:04:05 -0700",
    "2026-07-21 15:04:05 -0400")

t, _ = time.ParseInLocation("2006-01-02", "2026-07-21",
    time.FixedZone("EDT", -4*60*60))
```

## Common Layouts (Standard Library)

| Constant | Pattern | Example |
|----------|---------|---------|
| `time.RFC3339` | `2006-01-02T15:04:05Z07:00` | `2026-07-21T15:04:05Z` |
| `time.RFC822` | `02 Jan 06 15:04 MST` | `21 Jul 26 15:04 UTC` |
| `time.Kitchen` | `3:04PM` | `3:04PM` |
| `time.Stamp` | `Jan _2 15:04:05` | `Jul 21 15:04:05` |

## Custom Format Patterns

```go
func FormatRelative(t time.Time) string {
    now := time.Now()
    switch {
    case t.Year() == now.Year() && t.YearDay() == now.YearDay():
        return "Today at " + t.Format("3:04 PM")
    case t.Year() == now.Year() && t.YearDay() == now.YearDay()-1:
        return "Yesterday at " + t.Format("3:04 PM")
    case t.Year() == now.Year():
        return t.Format("Jan 2 at 3:04 PM")
    default:
        return t.Format("Jan 2, 2006 at 3:04 PM")
    }
}
```

## Parsing Multiple Formats

```go
func parseDate(s string) (time.Time, error) {
    formats := []string{
        "2006-01-02",
        "01/02/2006",
        "Jan 2, 2006",
        "January 2, 2006",
        time.RFC3339,
    }
    for _, layout := range formats {
        if t, err := time.Parse(layout, s); err == nil {
            return t, nil
        }
    }
    return time.Time{}, fmt.Errorf("unrecognized date: %s", s)
}
```

## Exercises

1. **Log Parser**: Parse log timestamps in format `2026/07/21 15:04:05` and convert to RFC3339.

2. **Flexible Date Input**: Write a function that accepts multiple date formats and returns a standardized string.

3. **Birthday Formatter**: Given a birth date, print it in 3 different formats (US, EU, ISO).

4. **Relative Time**: Implement a function that returns "5m ago", "2h ago", "3d ago", etc.
