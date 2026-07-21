# Envconfig

Type-safe environment variable configuration.

## Basic Usage

```go
import "github.com/kelseyhightower/envconfig"

type Config struct {
    Port    int    `envconfig:"PORT" default:"8080"`
    Host    string `envconfig:"HOST" default:"0.0.0.0"`
    Debug   bool   `envconfig:"DEBUG" default:"false"`

    Database struct {
        Host     string `envconfig:"DB_HOST" required:"true"`
        Port     int    `envconfig:"DB_PORT" default:"5432"`
        Name     string `envconfig:"DB_NAME" default:"myapp"`
        User     string `envconfig:"DB_USER" required:"true"`
        Password string `envconfig:"DB_PASSWORD" required:"true"`
        SSLMode  string `envconfig:"DB_SSLMODE" default:"disable"`
    }

    Redis struct {
        Address  string `envconfig:"REDIS_ADDRESS" default:"localhost:6379"`
        Password string `envconfig:"REDIS_PASSWORD"`
        DB       int    `envconfig:"REDIS_DB" default:"0"`
    }

    Sentry struct {
        DSN string `envconfig:"SENTRY_DSN"`
    }
}

func Load() (*Config, error) {
    var cfg Config
    if err := envconfig.Process("myapp", &cfg); err != nil {
        return nil, fmt.Errorf("config: %w", err)
    }
    return &cfg, nil
}
```

## Custom Decoders

```go
type Duration time.Duration

func (d *Duration) Decode(v string) error {
    dur, err := time.ParseDuration(v)
    if err != nil {
        return err
    }
    *d = Duration(dur)
    return nil
}

type Config struct {
    Timeout Duration `envconfig:"TIMEOUT" default:"30s"`
    Rate    float64  `envconfig:"RATE_LIMIT" default:"100.0"`
}
```

## Validation

```go
import "github.com/go-playground/validator/v10"

type Config struct {
    Port    int    `envconfig:"PORT" validate:"required,min=1024,max=65535"`
    Host    string `envconfig:"HOST" validate:"required,hostname"`
    Timeout int    `envconfig:"TIMEOUT" validate:"min=1,max=300"`
}

func (c *Config) Validate() error {
    validate := validator.New()
    return validate.Struct(c)
}
```

## Practice
1. Create environment-specific config structs
2. Implement custom type decoders for complex types
3. Add structured validation with error messages
