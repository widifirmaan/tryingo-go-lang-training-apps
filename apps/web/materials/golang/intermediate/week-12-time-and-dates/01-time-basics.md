# Time Basics

## Getting the Current Time

```go
import "time"

func main() {
    now := time.Now()
    fmt.Println(now)
    // 2026-07-21 15:04:05.123456789 -0400 EDT
}
```

## Creating Time Values

```go
// Specific date (year, month, day, hour, min, sec, nsec, location)
t := time.Date(2026, time.July, 21, 15, 4, 5, 0, time.UTC)
fmt.Println(t) // 2026-07-21 15:04:05 +0000 UTC
```

## Extracting Time Components

```go
t := time.Now()

year := t.Year()        // 2026
month := t.Month()      // July
day := t.Day()          // 21
hour := t.Hour()        // 15
minute := t.Minute()    // 4
second := t.Second()    // 5
nanosecond := t.Nanosecond() // 123456789
weekday := t.Weekday()  // Tuesday
yearday := t.YearDay()  // 202
```

## Working with Time Zones

```go
// Load a location
loc, err := time.LoadLocation("America/New_York")
// or
loc := time.FixedZone("EDT", -4*60*60)

t := time.Now().In(loc)
fmt.Println(t)
```

## Comparing Times

```go
a := time.Date(2026, 7, 21, 10, 0, 0, 0, time.UTC)
b := time.Date(2026, 7, 22, 10, 0, 0, 0, time.UTC)

fmt.Println(a.Equal(b))    // false
fmt.Println(a.Before(b))   // true
fmt.Println(a.After(b))    // false
fmt.Println(a.Sub(b))      // -24h0m0s
```

## Time Constants

```go
const (
    Nanosecond  Duration = 1
    Microsecond          = 1000 * Nanosecond
    Millisecond          = 1000 * Microsecond
    Second               = 1000 * Millisecond
    Minute               = 60 * Second
    Hour                 = 60 * Minute
)
```

## Time Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `t.Add(d)` | Time | Add duration |
| `t.AddDate(y, m, d)` | Time | Add years/months/days |
| `t.Sub(t2)` | Duration | Difference t - t2 |
| `t.Before(u)` | bool | Before comparison |
| `t.After(u)` | bool | After comparison |
| `t.Equal(u)` | bool | Equality check |
| `t.In(loc)` | Time | Convert time zone |

## Exercises

1. **Age Calculator**: Given a birth date, calculate the person's current age.

2. **Time Zone Converter**: Write a function that converts a time between two time zones.

3. **Business Hours**: Check if a given time falls within business hours (9 AM - 5 PM Mon-Fri).

4. **Countdown**: Calculate the time remaining until a specific future date (New Year, birthday, etc.).
